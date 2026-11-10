import "server-only";
import { FieldValue } from "firebase-admin/firestore";
import { adminDb } from "./firestore";
import { parseGuardianToken, verifyGuardianSignature } from "./guardian-token";
import { RequestError } from "./request";

export type GuardianRequest = {
  uid: string;
  teenName: string;
  guardianEmail: string;
  status: "pending" | "approved" | "declined";
};

const INVALID = "This approval link is invalid or has expired. Ask for a new email from the HealthMind app.";

/** Verifies a guardian link against the guardian email currently on the teen's profile. */
export async function loadGuardianRequest(token: unknown): Promise<GuardianRequest> {
  const claims = parseGuardianToken(token);
  const db = adminDb();
  const [profile, approval] = await Promise.all([
    db.collection("users").doc(claims.uid).get(),
    db.collection("guardian_consents").doc(claims.uid).get(),
  ]);
  const consent = profile.data()?.consent;
  const guardianEmail = typeof consent?.guardianEmail === "string" ? consent.guardianEmail.trim().toLowerCase() : "";
  if (!profile.exists || !guardianEmail) throw new RequestError(400, INVALID);
  verifyGuardianSignature(claims, guardianEmail);

  const data = profile.data() ?? {};
  const teenName = String(data.firstName || data.displayName || "Your child").slice(0, 60);
  const stored = approval.data();
  const status =
    stored?.guardianEmail === guardianEmail && (stored?.status === "approved" || stored?.status === "declined")
      ? stored.status
      : "pending";
  return { uid: claims.uid, teenName, guardianEmail, status };
}

export async function recordGuardianDecision(
  request: GuardianRequest,
  decision: "approved" | "declined",
  meta: { ipHash: string; userAgent: string },
) {
  await adminDb()
    .collection("guardian_consents")
    .doc(request.uid)
    .set(
      {
        status: decision,
        guardianEmail: request.guardianEmail,
        decidedAt: FieldValue.serverTimestamp(),
        consentVersion: 1,
        source: "website",
        // Evidence of how consent was given, without storing the raw IP.
        evidence: { ipHash: meta.ipHash, userAgent: meta.userAgent.slice(0, 200) },
      },
      { merge: true },
    );
}
