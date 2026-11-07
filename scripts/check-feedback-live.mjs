import assert from "node:assert/strict";
import { randomBytes } from "node:crypto";
import { Timestamp } from "firebase-admin/firestore";
import { feedbackDb } from "../lib/email-feedback/firebase.mjs";
import { CAMPAIGN, COLLECTION, SENDER, tokenId, OPTIONS } from "../lib/email-feedback/core.mjs";

process.loadEnvFile(".env.local");
const endpoint = process.env.FEEDBACK_ENDPOINT_URL;
if (!endpoint) throw new Error("FEEDBACK_ENDPOINT_URL is required.");
const token = randomBytes(32).toString("base64url");
const db = feedbackDb();
const ref = db.collection(COLLECTION).doc(tokenId(token));
const web = process.argv.includes("--web");
const url = `${endpoint}?token=${token}${web ? "&view=web" : ""}`;
const headers = web ? { Origin: new URL(endpoint).origin } : { "AMP-Email-Sender": SENDER };
try {
  console.log("Creating temporary live-test record...");
  await ref.create({ campaign: CAMPAIGN, email: "integration-test@example.invalid", choices: [], responseReceived: false,
    createdAt: Timestamp.now(), expiresAt: Timestamp.fromMillis(Date.now() + 3600000) });
  console.log("Testing deployed endpoint...");
  if (web) {
    const page = await fetch(`${endpoint}?view=page&token=${token}`, { redirect: "manual" });
    assert.equal(page.status, 200);
    assert.equal(page.headers.get("referrer-policy"), "no-referrer");
    assert.ok(page.headers.get("content-security-policy").includes("frame-ancestors 'none'"));
    const html = await page.text();
    assert.equal((html.match(/class="choice"/g) || []).length, 3);
    assert.equal((await ref.get()).data().responseReceived, false, "Opening a link must not submit feedback");
    const denied = await fetch(url, { method: "POST", headers: { Origin: "https://untrusted.example" }, body: new URLSearchParams({ feedbackForm: "1" }) });
    assert.equal(denied.status, 403);
  }
  for (const choices of [[], [OPTIONS[0][0]], [OPTIONS[0][0], OPTIONS[1][0]], OPTIONS.map(([id]) => id), [OPTIONS[0][0], OPTIONS[2][0]], []]) {
    const form = new URLSearchParams({ feedbackForm: "1" });
    choices.forEach(choice => form.append("feedback", choice));
    const response = await fetch(url, { method: "POST", headers, body: form, redirect: "manual", signal: AbortSignal.timeout(40000) });
    console.log(`Save ${choices.length} choices: HTTP ${response.status}`);
    assert.equal(response.status, 200, `Save failed: HTTP ${response.status}`);
    assert.equal(response.headers.get("AMP-Email-Allow-Sender"), SENDER);
    assert.equal(response.headers.get("location"), null);
    assert.deepEqual((await ref.get()).data().choices, choices);
    const restored = await fetch(url, { headers, redirect: "manual", signal: AbortSignal.timeout(40000) });
    assert.equal(restored.status, 200);
    const state = (await restored.json()).items[0];
    assert.equal(state.speed, choices.includes(OPTIONS[0][0]));
    assert.equal(state.navigation, choices.includes(OPTIONS[1][0]));
    assert.equal(state.content, choices.includes(OPTIONS[2][0]));
  }
  console.log("Live select, multi-select, deselect, clear and state restoration: PASS.");
  for (const [target, opts, expected] of [
    [`${endpoint}?token=${token}`, {}, 403],
    [`${endpoint}?token=invalid${web ? "&view=web" : ""}`, { headers }, 401],
    [url, { method: "POST", headers, body: new URLSearchParams({ feedbackForm: "1", feedback: "unknown" }) }, 400],
  ]) {
    const response = await fetch(target, { ...opts, redirect: "manual" });
    assert.equal(response.status, expected);
  }
  await ref.update({ expiresAt: Timestamp.fromMillis(Date.now() - 1000) });
  assert.equal((await fetch(url, { headers, redirect: "manual" })).status, 410);
  console.log("Live invalid sender/token/choice and expired token checks: PASS.");
} finally {
  console.log("Cleaning up live-test record...");
  await ref.delete();
  await db.terminate();
  console.log("Temporary integration-test record removed.");
}
