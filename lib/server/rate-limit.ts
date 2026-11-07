import "server-only";
import { Timestamp } from "firebase-admin/firestore";
import { adminDb } from "./firestore";
import { RequestError, sha256 } from "./request";

/**
 * Fixed-window rate limit stored in Firestore, so it holds across serverless
 * instances. Keys are hashed; raw IP addresses are never stored.
 */
export async function enforceRateLimit(bucket: string, key: string, limit: number, windowMs: number) {
  const db = adminDb();
  const ref = db.collection("website_rate_limits").doc(sha256(`${bucket}:${key}`));
  await db.runTransaction(async (transaction) => {
    const snapshot = await transaction.get(ref);
    const now = Date.now();
    const windowStartedAt = snapshot.get("windowStartedAt")?.toMillis?.() ?? 0;
    const sameWindow = now - windowStartedAt < windowMs;
    const count = sameWindow ? Number(snapshot.get("count") ?? 0) : 0;
    if (count >= limit) {
      throw new RequestError(429, "Too many requests. Please wait a few minutes and try again.");
    }
    transaction.set(ref, {
      bucket,
      count: count + 1,
      windowStartedAt: sameWindow ? snapshot.get("windowStartedAt") : Timestamp.fromMillis(now),
      // Lets a Firestore TTL policy on `expiresAt` clean these up automatically.
      expiresAt: Timestamp.fromMillis(now + windowMs * 2),
    });
  });
}
