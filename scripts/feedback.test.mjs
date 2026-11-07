import test from "node:test";
import assert from "node:assert/strict";
import nodemailer from "nodemailer";
import { CAMPAIGN, OPTIONS, SENDER, corsHeaders, parseChoices, tokenId, validateRecord } from "../lib/email-feedback/core.mjs";
import { buildEmail } from "../lib/email-feedback/template.mjs";

test("reject unknown values; deduplicate and permit clearing every choice", () => {
  assert.deepEqual(parseChoices([]), []);
  const values = OPTIONS.map(([id]) => id);
  assert.deepEqual(parseChoices([...values, values[0]]), values);
  assert.throws(() => parseChoices(["unrecognized"]), { status: 400 });
  assert.throws(() => parseChoices([{}]), { status: 400 });
});
test("token validation hashes identifiers; rejects malformed values", () => {
  assert.match(tokenId("A".repeat(43)), /^[a-f0-9]{64}$/);
  for (const token of [null, "", "../test", "A".repeat(44)]) assert.throws(() => tokenId(token), { status: 401 });
});
test("missing, expired, invalid and wrong-campaign records are rejected", () => {
  assert.throws(() => validateRecord(undefined), { status: 401 });
  assert.throws(() => validateRecord({ campaign: "other" }), { status: 401 });
  assert.throws(() => validateRecord({ campaign: CAMPAIGN }), { status: 410 });
  assert.throws(() => validateRecord({ campaign: CAMPAIGN, expiresAt: { toMillis: () => 50 } }, 50), { status: 410 });
  validateRecord({ campaign: CAMPAIGN, expiresAt: { toMillis: () => 51 } }, 50);
});
test("AMP CORS v2 sender and v1 sender+origin validation", () => {
  const request = (headers, query = "") => new Request(`https://example.com/api/email-feedback${query}`, { headers });
  assert.equal(corsHeaders(request({ "AMP-Email-Sender": SENDER })).get("AMP-Email-Allow-Sender"), SENDER);
  assert.throws(() => corsHeaders(request({ "AMP-Email-Sender": "attacker@example.com" })), { status: 403 });
  assert.throws(() => corsHeaders(request({})), { status: 403 });
  const query = `?__amp_source_origin=${SENDER}`;
  assert.equal(corsHeaders(request({ Origin: "https://mail.google.com" }, query)).get("Access-Control-Allow-Origin"), "https://mail.google.com");
  assert.throws(() => corsHeaders(request({ Origin: "https://evil.example" }, query)), { status: 403 });
  assert.throws(() => corsHeaders(request({ Origin: "https://mail.google.com" })), { status: 403 });
});
test("mail contains plain, AMP and HTML MIME alternatives in the right order", async () => {
  const email = buildEmail("A".repeat(43), "https://www.healthmindgroup.com");
  const info = await nodemailer.createTransport({ streamTransport: true, buffer: true }).sendMail({ from: SENDER, to: "test@example.com", ...email });
  const raw = info.message.toString();
  const positions = ["text/plain", "text/x-amp-html", "text/html"].map(type => raw.indexOf(`Content-Type: ${type}`));
  assert.ok(positions[0] > 0 && positions[1] > positions[0] && positions[2] > positions[1]);
  assert.equal(new Set([...email.amp.matchAll(/ option="([^"]+)"/g)].map(match => match[1])).size, 3);
  assert.doesNotMatch(email.amp, /<a\b|\baction=|type="submit"/);
  assert.doesNotMatch(email.text, /<[^>]+>/);
  assert.throws(() => buildEmail("A".repeat(43), "http://example.com"));
});
