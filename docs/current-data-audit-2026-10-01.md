# HealthMind email and reporting audit

Checked 1 October 2026. No emails sent and no deployment changed during this audit.

## Email findings

- The configured feedback endpoint is `https://us-central1-healthmind-app.cloudfunctions.net/healthmindEmailFeedback`.
- Its `?view=page` page returns HTTP 200 without redirecting. Personalized links must also contain a valid invitation token. It does not depend on Vercel.
- A temporary live integration test passed selection, multiple selections, deselection, clearing, restoration, invalid request and expiry checks. The temporary record was deleted.
- Firestore contains 244 `production-broadcast` invitations, all marked `pending`, none with a response. These are not evidence that emails were delivered. The web test has one response; the two older invitations comprise one accepted and one bounced record.
- Both current bulk scripts (`scripts/feedback-email.mjs` and `scripts/send-feedback-production.mjs`) POST to `https://resend.com`, instead of the email API. They skip the first line of a headerless Auth export, parse CSV with string splitting, and create new tokens on every run, so their idempotency keys do not prevent duplicates across reruns. Do not run them unchanged.
- Current local endpoint configuration is already Firebase. The actual delivered HTML/link and Resend log are needed to establish why the user's delivered email leads to Vercel; the current scripts cannot establish the historical send payload.
- Resend read access was not established during this audit. API acceptance must not be described as delivery.

The correction is a normal email containing a personalized Firebase page link, with safe recipient parsing, deduplication, suppression handling and persistent send tracking. It still opens a browser. Already-delivered emails cannot be rewritten by changing the sender template. The working Firebase page needs neither Vercel restoration nor AMP support from Resend.

## Previous report located

`C:/Users/User/Desktop/HealthMindapp-V.1.00-main/docs/reports/healthmind_metrics_report_2026-09-12.md`

It covers 14 June–12 September 2026, collected 14 September. A GA4 Apps Script exporter also exists alongside it under `ga4-export`; its dates are still the old reporting window.

## Fresh accessible data

These are current stored-data counts, not September usage totals. Test accounts and records have not been excluded.

| Source | Current observation | Qualification |
| --- | ---: | --- |
| Firebase Auth accounts | 303 | None disabled; accounts are not people served |
| Email verified accounts | 206 | Current verification state |
| Accounts created in September | 39 | 1 September inclusive to 1 October exclusive, UTC |
| `conversations` documents | 933 | Schema and timestamps must be reviewed before calling these sessions or messages |
| `journals` documents | 85 | Cloud records only; excludes any on-device-only entries |
| `medications` documents | 44 | Stored records, not doses taken |
| `medication_logs` documents | 321 | Action/status breakdown requires metadata aggregation |
| `medication_call_logs` documents | 0 | Does not measure local notification delivery |
| `user_signals` documents | 193 | Not unique people or clinical outcomes |
| `assessments` documents | 116 | May overlap with signals; do not add the two as distinct check-ins |

Auth pagination and Firestore collection-group count aggregations were used. No health narrative content was retrieved. Period-specific feature totals, distinct contributing users, account growth and metadata breakdowns can be extracted for the agreed period. Auth latest sign-in is not MAU or retention.

The public impact endpoint also works, but its cached account value is 302, verified 29 September; use the fresh Auth snapshot for a current report.

## GA4 and other inputs

A live read request to GA4 property `534482444` returned HTTP 403: "User does not have sufficient permissions for this property." This is an access problem, not evidence of no Analytics data.

Grant the existing service account `firebase-adminsdk-fbsvc@healthmind-app.iam.gserviceaccount.com` Viewer access in GA4 Property Access Management, or provide an aggregate GA4 export for the report period. No new private key is needed. Google documents property access separately from Cloud/Firebase permissions: https://developers.google.com/analytics/devguides/reporting/data/v1/quickstart

Subject to actual event receipt and reporting availability, GA4 can supply daily/weekly/monthly active users, new users, sessions, engagement, event/feature totals, screen usage, country/platform/app-version distributions, acquisition and cohort retention. Account counts and stored record counts cannot substitute for these.

Additional inputs for a fuller report:

- Reporting dates and internal/test-account exclusions.
- One actual sent feedback button URL or Resend HTML/log export to diagnose the historical link; treat its token as private.
- Resend delivery/bounce/click exports for campaign outcomes. Feedback records alone do not supply delivery rates.
- Play Console exports for exact installs, acquisition, active devices, ratings, crashes and ANRs; App Store Connect equivalents if iOS is included.
- Outreach attendance, event dates, partner register and deduplication rules for community reach.
- Survey results with questions, sample and dates for reported outcomes; engagement is not evidence of clinical improvement.
- Revenue/cost/subscription records if financial performance is in scope.

Suggested new period: September 2026, plus a separately labelled 1 October snapshot. Confirm before making comparisons to the earlier 91-day report.
