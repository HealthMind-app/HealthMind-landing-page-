import { createHash } from "node:crypto";

export const SENDER = "noreply@healthmindgroup.com";
export const CAMPAIGN = "healthmind-product-feedback";
export const COLLECTION = "healthmind_email_feedback";
export const OPTIONS = [
  ["app-speed-performance", "App Speed & Performance"],
  ["navigation", "Finding Features / Navigation"],
  ["content-variety", "Exercises & Content Variety"],
];
export class FeedbackError extends Error {
  constructor(status, message) { super(message); this.status = status; }
}
export function tokenId(token) {
  if (typeof token !== "string" || !/^[A-Za-z0-9_-]{43}$/.test(token)) {
    throw new FeedbackError(401, "Invalid feedback token.");
  }
  return createHash("sha256").update(token).digest("hex");
}
export function parseChoices(values) {
  if (values.length > 12 || values.some(value => !OPTIONS.some(([id]) => id === value))) {
    throw new FeedbackError(400, "Invalid feedback choice.");
  }
  return [...new Set(values)];
}
export function validateRecord(record, now = Date.now()) {
  if (!record || record.campaign !== CAMPAIGN) throw new FeedbackError(401, "Invalid feedback token.");
  if (!record.expiresAt?.toMillis || record.expiresAt.toMillis() <= now) {
    throw new FeedbackError(410, "This feedback email has expired.");
  }
}
const origins = new Set(["https://mail.google.com", "https://amp.gmail.dev", "https://mail.yahoo.com", "https://mail.aol.com"]);
export function corsHeaders(request) {
  const headers = new Headers({ "Cache-Control": "no-store", Vary: "Origin, AMP-Email-Sender" });
  const sender = request.headers.get("AMP-Email-Sender");
  if (sender !== null) {
    if (sender !== SENDER) throw new FeedbackError(403, "Unrecognized email sender.");
    headers.set("AMP-Email-Allow-Sender", SENDER);
  } else {
    const origin = request.headers.get("Origin");
    if (!origins.has(origin) || new URL(request.url).searchParams.get("__amp_source_origin") !== SENDER) {
      throw new FeedbackError(403, "Unrecognized email request.");
    }
    headers.set("Access-Control-Allow-Origin", origin);
    headers.set("AMP-Access-Control-Allow-Source-Origin", SENDER);
    headers.set("Access-Control-Expose-Headers", "AMP-Access-Control-Allow-Source-Origin");
  }
  return headers;
}
