import { onRequest } from "firebase-functions/v2/https";
import * as handlers from "./generated/route.mjs";
import { randomBytes } from "node:crypto";
import { feedbackPage } from "./page.mjs";
import { SENDER } from "./generated/core.mjs";

export const healthmindEmailFeedback = onRequest({
  region: "us-central1", maxInstances: 2, minInstances: 0,
  memory: "256MiB", timeoutSeconds: 30, invoker: "public", cors: false,
}, async (req, res) => {
  const method = req.method;
  const view = req.query.view;
  if (view === "page" && method === "GET") {
    const nonce = randomBytes(18).toString("base64");
    res.set({ "Cache-Control": "no-store", "Referrer-Policy": "no-referrer", "X-Content-Type-Options": "nosniff",
      "X-Robots-Tag": "noindex, nofollow", "Content-Security-Policy": `default-src 'none'; script-src 'nonce-${nonce}'; style-src 'nonce-${nonce}'; connect-src 'self'; base-uri 'none'; frame-ancestors 'none'; form-action 'self'` });
    res.status(200).type("html").send(feedbackPage(nonce)); return;
  }
  if (!["GET", "POST", "OPTIONS"].includes(method)) {
    res.set("Allow", "GET, POST, OPTIONS").status(405).json({ error: "Method not allowed." });
    return;
  }
  if (req.rawBody?.length > 4096) {
    res.status(413).json({ error: "Feedback request too large." }); return;
  }
  const headers = new Headers();
  for (const [name, value] of Object.entries(req.headers)) {
    if (value !== undefined) headers.set(name, Array.isArray(value) ? value.join(", ") : value);
  }
  if (view === "web") {
    const allowedOrigins = ["https://us-central1-healthmind-app.cloudfunctions.net", "https://healthmindemailfeedback-huarushq7q-uc.a.run.app"];
    // Browser requests use the same token validation and transaction as AMP.
    // Reject cross-origin writes before adapting the request to the shared handler.
    if (method === "POST" && !allowedOrigins.includes(req.get("origin"))) {
      res.status(403).json({ error: "Unrecognized feedback request." }); return;
    }
    headers.set("AMP-Email-Sender", SENDER);
  }
  const request = new Request(`https://feedback.invalid${req.originalUrl}`, {
    method, headers, ...(method === "POST" ? { body: req.rawBody } : {}),
  });
  const result = await handlers[method](request);
  result.headers.forEach((value, name) => res.set(name, value));
  res.status(result.status).send(Buffer.from(await result.arrayBuffer()));
});
