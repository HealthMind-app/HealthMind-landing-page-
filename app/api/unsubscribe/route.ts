import { FieldValue } from "firebase-admin/firestore";
import { adminDb } from "@/lib/server/firestore";
import { enforceRateLimit } from "@/lib/server/rate-limit";
import { clientIp } from "@/lib/server/request";
import { errorResponse } from "@/lib/server/respond";
import { verifyUnsubscribeToken } from "@/lib/server/unsubscribe-token";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * POST /api/unsubscribe?token=...
 *
 * Handles both the confirm button on /unsubscribe and RFC 8058 one-click
 * requests that mail providers send (body `List-Unsubscribe=One-Click`).
 * The signed token is the only authorization, so no Origin check here.
 * Writes `email_preferences/{uid}`; the app's scheduled email functions must
 * skip users whose `marketingEmails` is false.
 */
export async function POST(request: Request) {
  try {
    const uid = verifyUnsubscribeToken(new URL(request.url).searchParams.get("token"));
    await enforceRateLimit("unsubscribe", clientIp(request), 30, 10 * 60_000);

    const oneClick = request.headers.get("content-type")?.startsWith("application/x-www-form-urlencoded") ?? false;
    await adminDb().collection("email_preferences").doc(uid).set(
      {
        marketingEmails: false,
        unsubscribedAt: FieldValue.serverTimestamp(),
        unsubscribeSource: oneClick ? "one-click" : "website",
        schemaVersion: 1,
      },
      { merge: true },
    );
    return Response.json({ success: true }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    return errorResponse("unsubscribe", error);
  }
}
