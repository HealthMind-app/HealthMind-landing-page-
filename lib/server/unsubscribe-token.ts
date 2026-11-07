import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { ServerConfigError } from "./firestore";
import { RequestError } from "./request";

/**
 * Token format: `v1.<base64url(uid)>.<base64url(HMAC-SHA256(secret, "unsubscribe:v1:" + uid))>`.
 * The app's Cloud Functions sign tokens with the same UNSUBSCRIBE_TOKEN_SECRET
 * (see docs/unsubscribe.md); this site only verifies them.
 */
function secret(): string {
  const value = process.env.UNSUBSCRIBE_TOKEN_SECRET;
  if (!value || value.length < 32) throw new ServerConfigError("UNSUBSCRIBE_TOKEN_SECRET is not configured.");
  return value;
}

export function signUnsubscribeToken(uid: string): string {
  const sig = createHmac("sha256", secret()).update(`unsubscribe:v1:${uid}`).digest("base64url");
  return `v1.${Buffer.from(uid, "utf8").toString("base64url")}.${sig}`;
}

export function verifyUnsubscribeToken(token: unknown): string {
  if (typeof token !== "string" || token.length > 512) throw new RequestError(400, "This unsubscribe link is invalid.");
  const [version, encodedUid, sig] = token.split(".");
  if (version !== "v1" || !encodedUid || !sig) throw new RequestError(400, "This unsubscribe link is invalid.");
  const uid = Buffer.from(encodedUid, "base64url").toString("utf8");
  if (!/^[A-Za-z0-9_-]{1,128}$/.test(uid)) throw new RequestError(400, "This unsubscribe link is invalid.");
  const expected = Buffer.from(signUnsubscribeToken(uid).split(".")[2]);
  const actual = Buffer.from(sig);
  if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) {
    throw new RequestError(400, "This unsubscribe link is invalid.");
  }
  return uid;
}
