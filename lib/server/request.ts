import "server-only";
import { createHash } from "node:crypto";

export class RequestError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

export const EMAIL_PATTERN = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[^\s@<>()[\]\\,;:"]{2,}$/;

export function normalizeEmail(value: unknown): string {
  const email = typeof value === "string" ? value.trim().toLowerCase() : "";
  if (!email || email.length > 254 || !EMAIL_PATTERN.test(email)) {
    throw new RequestError(400, "Please enter a valid email address.");
  }
  return email;
}

export function sha256(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

/** Vercel sets x-forwarded-for; the first entry is the client address. */
export function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || request.headers.get("x-real-ip") || "unknown";
}

/**
 * Browsers always send Origin on cross-origin POSTs. Reject writes from other
 * sites so a third-party page cannot submit forms on a visitor's behalf.
 */
export function assertSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return;
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  let originHost = "";
  try {
    originHost = new URL(origin).host;
  } catch {
    throw new RequestError(403, "Request not allowed.");
  }
  if (!host || originHost !== host) throw new RequestError(403, "Request not allowed.");
}

/** Reads a JSON object body, refusing anything over `maxBytes`. */
export async function readJson(request: Request, maxBytes = 4096): Promise<Record<string, unknown>> {
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    throw new RequestError(415, "Unsupported request.");
  }
  const reader = request.body?.getReader();
  if (!reader) throw new RequestError(400, "Missing request body.");
  const chunks: Uint8Array[] = [];
  let size = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.length;
    if (size > maxBytes) {
      await reader.cancel();
      throw new RequestError(413, "Request too large.");
    }
    chunks.push(value);
  }
  try {
    const parsed = JSON.parse(Buffer.concat(chunks).toString("utf8"));
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error();
    return parsed as Record<string, unknown>;
  } catch {
    throw new RequestError(400, "Invalid request.");
  }
}
