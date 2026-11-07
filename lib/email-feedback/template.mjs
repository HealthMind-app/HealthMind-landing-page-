import { OPTIONS, tokenId } from "./core.mjs";

export const SUBJECT = "One quick question about your HealthMind experience";
const intro = "We're working to improve HealthMind, and I'd like to hear directly from you.";
const question = "What is one problem, frustration, or issue you have personally experienced while using HealthMind?";
const closing = "Your feedback will help us identify what needs to improve.";
const thanks = "Thank you for being part of HealthMind.";
const motto = "Your Health, Your Mind, Your Future.";
const fallback = "Interactive selection is available in supported email apps with dynamic email enabled. These options are not interactive in this version of the email.";
const escape = value => value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
const button = "display:block;padding:16px 20px;margin:0 0 16px;border-radius:7px;background-color:#2D7DB8;background-image:linear-gradient(90deg,#2D51BE,#2D8BB7,#2DBAB1);color:#fff;text-align:center;font-size:15px;line-height:22px;font-weight:bold;";

export function buildEmail(token, origin, endpointUrl) {
  tokenId(token);
  const base = new URL(origin);
  if (base.protocol !== "https:" || base.username || base.password || base.search || base.hash || base.pathname !== "/") {
    throw new Error("FEEDBACK_BASE_URL must be the canonical HTTPS origin, without a path.");
  }
  const target = new URL(endpointUrl || `${base.origin}/api/email-feedback`);
  if (target.protocol !== "https:" || target.username || target.password || target.search || target.hash) {
    throw new Error("Feedback endpoint must be an HTTPS URL without credentials, query or fragment.");
  }
  target.searchParams.set("token", token);
  const endpoint = escape(target.href);
  const text = ["Hi,", intro, question, ...OPTIONS.map(([, label]) => label), "You can select more than one option.", fallback, closing, thanks, motto].join("\n\n");
  const html = `<!doctype html><html><head><meta charset="utf-8"></head><body style="margin:0;background:#fff;color:#172033;font-family:Arial,Helvetica,sans-serif"><div style="max-width:600px;padding:28px 20px;text-align:left;font-size:16px;line-height:1.6"><p>Hi,</p><p>${intro}</p><p><strong>${question}</strong></p>${OPTIONS.map(([, label]) => `<div style="${button}">${escape(label)}</div>`).join("")}<p>You can select more than one option.</p><p style="font-size:14px;color:#616b7e">${fallback}</p><p>${closing}</p><p>${thanks}</p><p style="border-top:1px solid #e5e7eb;padding-top:16px;font-size:13px;color:#616b7e">${motto}</p></div></body></html>`;
  const keys = ["speed", "navigation", "content"];
  const amp = `<!doctype html>
<html amp4email data-css-strict><head><meta charset="utf-8">
<script async src="https://cdn.ampproject.org/v0.js"></script>
<script async custom-element="amp-form" src="https://cdn.ampproject.org/v0/amp-form-0.1.js"></script>
<script async custom-element="amp-selector" src="https://cdn.ampproject.org/v0/amp-selector-0.1.js"></script>
<script async custom-element="amp-list" src="https://cdn.ampproject.org/v0/amp-list-0.1.js"></script>
<script async custom-element="amp-bind" src="https://cdn.ampproject.org/v0/amp-bind-0.1.js"></script>
<script async custom-template="amp-mustache" src="https://cdn.ampproject.org/v0/amp-mustache-0.2.js"></script>
<style amp4email-boilerplate>body{visibility:hidden}</style>
<style amp-custom>
body{margin:0;background:#fff;color:#172033;font-family:Arial,Helvetica,sans-serif}
.email{max-width:600px;padding:28px 20px;text-align:left}p{font-size:16px;line-height:1.6;margin:0 0 18px}
.choice{${button}cursor:pointer;box-sizing:border-box;width:100%}
.choice:focus{outline:2px solid #172033;outline-offset:2px}
.tick{display:none}.choice[selected] .label{display:none}.choice[selected] .tick{display:inline}
form.amp-form-submitting amp-selector{opacity:.75}
.status{font-size:13px;line-height:1.5;color:#616b7e}.footer{border-top:1px solid #e5e7eb;padding-top:16px;font-size:13px;color:#616b7e}
</style></head><body><div class="email"><p>Hi,</p><p>${intro}</p><p><strong>${question}</strong></p>
<amp-list src="${endpoint}" layout="fixed-height" height="330">
<div placeholder class="status">Loading your selections...</div>
<div fallback class="status">We couldn't load your selections. Please reopen this email to try again. Feedback is available for 30 days.</div>
<template type="amp-mustache">
<form id="feedbackForm" method="post" action-xhr="${endpoint}" on="submit:AMP.setState({saving: true});submit-success:AMP.setState({saving: false});submit-error:AMP.setState({saving: false})">
<input type="hidden" name="feedbackForm" value="1">
<amp-selector name="feedback" multiple layout="container" [disabled]="saving" on="select:feedbackForm.submit">
${OPTIONS.map(([id, label], i) => {
  const choice = selected => `<div class="choice" option="${id}" role="checkbox" tabindex="0" aria-label="${escape(label)}"${selected ? " selected" : ""}><span class="label">${escape(label)}</span><span class="tick" aria-hidden="true">✓</span></div>`;
  return `{{#${keys[i]}}}${choice(true)}{{/${keys[i]}}}{{^${keys[i]}}}${choice(false)}{{/${keys[i]}}}`;
}).join("\n")}
</amp-selector>
<div submitting class="status" role="status">Saving...</div>
<div submit-success class="status" role="status">Saved.</div>
<div submit-error class="status" role="alert">We couldn't save that selection. Please try again. <button type="button" on="tap:feedbackForm.submit">Try again</button></div>
</form></template></amp-list>
<p>You can select more than one option.</p><p>${closing}</p><p>${thanks}</p><p class="footer">${motto}</p>
</div></body></html>`;
  return { subject: SUBJECT, text, html, amp };
}
