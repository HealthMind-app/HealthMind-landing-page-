import "server-only";
import { CONTACT_EMAIL } from "@/lib/site";
import { ServerConfigError } from "./firestore";

/** Inbox that receives deletion requests; override per environment if needed. */
export const SUPPORT_EMAIL = process.env.SUPPORT_EMAIL || CONTACT_EMAIL;
const FROM = "HealthMind <noreply@healthmindgroup.com>";

export function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

/** Sends through the Resend REST API (same verified domain the app uses). */
export async function sendEmail(message: { to: string; subject: string; html: string; text: string; replyTo?: string; idempotencyKey?: string }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new ServerConfigError("RESEND_API_KEY is not configured.");
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    redirect: "error",
    signal: AbortSignal.timeout(15_000),
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      ...(message.idempotencyKey ? { "Idempotency-Key": message.idempotencyKey } : {}),
    },
    body: JSON.stringify({
      from: FROM,
      to: [message.to],
      subject: message.subject,
      html: message.html,
      text: message.text,
      ...(message.replyTo ? { reply_to: message.replyTo } : {}),
    }),
  });
  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(`Resend returned ${response.status}: ${detail.slice(0, 300)}`);
  }
}
