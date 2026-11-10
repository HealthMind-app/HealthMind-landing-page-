import { FieldValue } from "firebase-admin/firestore";
import { adminDb } from "@/lib/server/firestore";
import { enforceRateLimit } from "@/lib/server/rate-limit";
import { assertSameOrigin, clientIp, normalizeEmail, readJson, sha256 } from "@/lib/server/request";
import { errorResponse } from "@/lib/server/respond";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SOURCES = new Set(["hero", "navbar", "final-cta"]);
// "production", "preview" or "development": lets test signups made on preview
// deployments (which share the production database) be found and removed.
const ENVIRONMENT = process.env.VERCEL_ENV ?? "development";

/**
 * Stores signups in Firestore `website_waitlist`, one document per email
 * (keyed by its SHA-256), so repeat signups are idempotent. Export with
 * `npm run waitlist:export`.
 */
export async function POST(request: Request) {
  try {
    assertSameOrigin(request);
    const body = await readJson(request);

    // Honeypot: real visitors never see or fill this field.
    if (typeof body.company === "string" && body.company.trim() !== "") {
      return Response.json({ success: true });
    }

    const email = normalizeEmail(body.email);
    const source = typeof body.source === "string" && SOURCES.has(body.source) ? body.source : "unknown";

    await enforceRateLimit("waitlist", clientIp(request), 5, 10 * 60_000);

    const db = adminDb();
    const ref = db.collection("website_waitlist").doc(sha256(email));
    await db.runTransaction(async (transaction) => {
      const existing = await transaction.get(ref);
      if (existing.exists) {
        transaction.update(ref, {
          lastSubmittedAt: FieldValue.serverTimestamp(),
          submissions: FieldValue.increment(1),
          lastEnvironment: ENVIRONMENT,
        });
      } else {
        transaction.create(ref, {
          email,
          source,
          environment: ENVIRONMENT,
          createdAt: FieldValue.serverTimestamp(),
          lastSubmittedAt: FieldValue.serverTimestamp(),
          submissions: 1,
          schemaVersion: 1,
        });
      }
    });

    // Same response whether or not the email was already listed.
    return Response.json({ success: true }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    return errorResponse("waitlist", error);
  }
}
