import { FieldValue } from "firebase-admin/firestore";
import { adminDb } from "@/lib/server/firestore";
import { SUPPORT_EMAIL, escapeHtml, sendEmail } from "@/lib/server/email";
import { enforceRateLimit } from "@/lib/server/rate-limit";
import { RequestError, assertSameOrigin, clientIp, normalizeEmail, readJson } from "@/lib/server/request";
import { errorResponse } from "@/lib/server/respond";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Web route for people who can no longer use the app (Google Play requires
 * one). It records the request and notifies support; it never deletes
 * anything by itself, because ownership must be verified first. Users who
 * still have the app can delete instantly in-app.
 */
export async function POST(request: Request) {
  try {
    assertSameOrigin(request);
    const body = await readJson(request, 8192);

    if (typeof body.company === "string" && body.company.trim() !== "") {
      return Response.json({ success: true });
    }

    const email = normalizeEmail(body.email);
    const details = typeof body.details === "string" ? body.details.trim().slice(0, 1000) : "";
    if (body.confirm !== true) {
      throw new RequestError(400, "Please confirm that you want your account deleted.");
    }

    await enforceRateLimit("account-deletion", clientIp(request), 3, 60 * 60_000);

    const db = adminDb();
    const ref = db.collection("account_deletion_requests").doc();
    await ref.set({
      email,
      details,
      status: "pending_verification",
      source: "website",
      createdAt: FieldValue.serverTimestamp(),
      schemaVersion: 1,
    });

    // The request is stored even if the notification fails, so support can
    // always find it in Firestore.
    try {
      await sendEmail({
        to: SUPPORT_EMAIL,
        replyTo: email,
        idempotencyKey: `account-deletion-${ref.id}`,
        subject: `Account deletion request (${ref.id})`,
        text: `A HealthMind account deletion request was submitted on the website.\n\nEmail: ${email}\nRequest ID: ${ref.id}\nDetails: ${details || "(none)"}\n\nVerify that the requester owns this account before deleting it. Reply to this email to contact them.`,
        html: `<p>A HealthMind account deletion request was submitted on the website.</p>
<p><strong>Email:</strong> ${escapeHtml(email)}<br><strong>Request ID:</strong> ${ref.id}<br><strong>Details:</strong> ${escapeHtml(details || "(none)")}</p>
<p>Verify that the requester owns this account before deleting it. Reply to this email to contact them.</p>`,
      });
      await ref.update({ supportNotifiedAt: FieldValue.serverTimestamp() });
    } catch (notifyError) {
      console.error("[account-deletion] support notification failed", notifyError);
      await ref.update({ supportNotificationFailed: true });
    }

    return Response.json({ success: true, requestId: ref.id }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    return errorResponse("account-deletion", error);
  }
}
