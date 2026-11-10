import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { ServerConfigError } from "./firestore";
import { RequestError } from "./request";

/**
 * Parent/guardian approval links signed by the app's `requestGuardianConsent`
 * Cloud Function (functions/guardian-consent.js):
 * `g1.<base64url(uid)>.<expiresUnixSeconds>.<base64url(HMAC-SHA256(secret, "guardian:v1:<uid>:<expires>:<guardianEmail>"))>`.
 * Uses the shared UNSUBSCRIBE_TOKEN_SECRET with a separate purpose prefix.
 * The guardian email is bound into the signature, so links stop working if
 * the teen changes their guardian's email.
 */
const INVALID = "This approval link is invalid or has expired. Ask for a new email from the HealthMind app.";

function secret(): string {
  const value = process.env.UNSUBSCRIBE_TOKEN_SECRET;
  if (!value || value.length < 32) throw new ServerConfigError("UNSUBSCRIBE_TOKEN_SECRET is not configured.");
  return value;
}

export type GuardianTokenClaims = { uid: string; expires: number; signature: string };

/** Checks shape and expiry. The signature needs the stored guardian email: see verifyGuardianSignature. */
export function parseGuardianToken(token: unknown, now = Date.now()): GuardianTokenClaims {
  if (typeof token !== "string" || token.length > 512) throw new RequestError(400, INVALID);
  const [version, encodedUid, expiresText, signature] = token.split(".");
  if (version !== "g1" || !encodedUid || !expiresText || !signature) throw new RequestError(400, INVALID);
  const uid = Buffer.from(encodedUid, "base64url").toString("utf8");
  const expires = Number(expiresText);
  if (!/^[A-Za-z0-9_-]{1,128}$/.test(uid) || !/^\d{9,11}$/.test(expiresText)) throw new RequestError(400, INVALID);
  if (expires * 1000 < now) throw new RequestError(400, INVALID);
  return { uid, expires, signature };
}

export function verifyGuardianSignature(claims: GuardianTokenClaims, guardianEmail: string) {
  const expected = Buffer.from(
    createHmac("sha256", secret())
      .update(`guardian:v1:${claims.uid}:${claims.expires}:${guardianEmail}`)
      .digest("base64url"),
  );
  const actual = Buffer.from(claims.signature);
  if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) {
    throw new RequestError(400, INVALID);
  }
}
