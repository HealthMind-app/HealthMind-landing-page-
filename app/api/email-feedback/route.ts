import { Timestamp } from "firebase-admin/firestore";
import { feedbackDb } from "@/lib/email-feedback/firebase.mjs";
import { CAMPAIGN, COLLECTION, OPTIONS as CHOICES, FeedbackError, corsHeaders, parseChoices, tokenId, validateRecord } from "@/lib/email-feedback/core.mjs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function handle(request: Request, write: boolean) {
  let headers = new Headers({ "Cache-Control": "no-store" });
  try {
    headers = corsHeaders(request);
    const id = tokenId(new URL(request.url).searchParams.get("token"));
    let choices: string[] = [];
    if (write) {
      if (!request.headers.get("Content-Type")?.startsWith("application/x-www-form-urlencoded")) {
        throw new FeedbackError(415, "Unsupported feedback request.");
      }
      // Read at most 4 KiB, even when Content-Length is missing or inaccurate.
      const reader = request.body?.getReader();
      if (!reader) throw new FeedbackError(400, "Missing feedback request.");
      const chunks: Uint8Array[] = [];
      let size = 0;
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        size += value.length;
        if (size > 4096) { await reader.cancel(); throw new FeedbackError(413, "Feedback request too large."); }
        chunks.push(value);
      }
      const form = new URLSearchParams(Buffer.concat(chunks).toString("utf8"));
      if (form.get("feedbackForm") !== "1" || [...form.keys()].some(key => !["feedbackForm", "feedback"].includes(key))) {
        throw new FeedbackError(400, "Invalid feedback request.");
      }
      choices = parseChoices(form.getAll("feedback"));
    }
    const db = feedbackDb();
    const ref = db.collection(COLLECTION).doc(id);
    const stored = await db.runTransaction(async transaction => {
      const snapshot = await transaction.get(ref);
      const record = snapshot.data();
      validateRecord(record);
      if (write && record) {
        const now = Date.now();
        const sameWindow = now - (record.rateWindowAt?.toMillis() ?? 0) < 60_000;
        const count = sameWindow ? (record.rateCount ?? 0) + 1 : 1;
        if (count > 60) throw new FeedbackError(429, "Please wait a minute and try again.");
        transaction.update(ref, {
          choices, responseReceived: true, lastUpdatedAt: Timestamp.fromMillis(now),
          rateCount: count, rateWindowAt: sameWindow ? record.rateWindowAt : Timestamp.fromMillis(now),
        });
        return choices;
      }
      return parseChoices(record?.choices ?? []);
    });
    if (write) return Response.json({ ok: true, choices: stored }, { headers });
    return Response.json({ items: [{
      campaign: CAMPAIGN,
      speed: stored.includes(CHOICES[0][0]),
      navigation: stored.includes(CHOICES[1][0]),
      content: stored.includes(CHOICES[2][0]),
    }] }, { headers });
  } catch (error) {
    const known = error instanceof FeedbackError;
    if (!known) console.error("Email feedback operation failed.", {
      code: error && typeof error === "object" && "code" in error ? error.code : "unknown",
    });
    return Response.json({ ok: false, error: known ? error.message : "We couldn't save that selection. Please try again." }, {
      status: known ? error.status : 500, headers,
    });
  }
}

export async function GET(request: Request) { return handle(request, false); }
export async function POST(request: Request) { return handle(request, true); }
export async function OPTIONS(request: Request) {
  const origin = request.headers.get("Origin");
  const allowed = ["https://mail.google.com", "https://amp.gmail.dev", "https://mail.yahoo.com", "https://mail.aol.com"];
  if (!origin || !allowed.includes(origin)) return new Response(null, { status: 403 });
  return new Response(null, { status: 204, headers: {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, AMP-Email-Sender",
    "Cache-Control": "no-store", Vary: "Origin",
  } });
}
