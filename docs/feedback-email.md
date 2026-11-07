# HealthMind feedback email: sending and finding responses

## Temporary browser-based feedback (approved by the user)

2026-09-26: Firebase reports the updated function ACTIVE (revision `healthmindemailfeedback-00003-rep`), despite the deployment CLI timing out. Live browser-endpoint checks passed for the HTML page, no write on opening a link, origin rejection, selection/deselection/clearing, state restoration and expired/invalid invitations. A single standard HTML/plain-text test was accepted by Resend's API for `jeffersonmagala@gmail.com`, subject `HealthMind feedback — a quick question`. Provider email ID: `01a0dc1c-3252-779f-96a4-994955531372`. Firestore record: `4e9334b31a37a906cd005b450314a4681760e5c7025c7df9cb4c32575f139068`. Acceptance is not inbox-delivery confirmation. No customer campaign was sent.

The user approved a standard email linking to a Firebase-served feedback page while AMP delivery is investigated. The existing function serves `?view=page&token=...`; its browser API uses `?view=web&token=...`. The paused landing page and Vercel are not involved, and no Firebase Hosting site is overwritten.

The page lets recipients select multiple categories, saves each change automatically, restores saved selections, and provides a retry after failures. Opening the link alone never records a response. Tokens still expire after 30 days. Browser writes require a permitted origin and the same secure invitation token. The page uses a restrictive Content Security Policy and no-referrer policy.

Validate and send the single, fixed-recipient test:

```powershell
node scripts/check-feedback-live.mjs --web
node scripts/send-feedback-web-test.mjs
```

The sender uses Resend's HTTPS API with HTML and plain text only: no AMP part or attachment. Recipient: `jeffersonmagala@gmail.com`. Subject: `HealthMind feedback — a quick question`. It refuses another web-link test if a record already exists, and uses a provider idempotency key. Acceptance still does not prove delivery; Gmail previously rejected the AMP test as likely unsolicited mail, so this test's delivery must be confirmed separately.

Results remain in `healthmind_email_feedback`; the invitation has `format: web-link-test`. Browser visual inspection was unavailable because the browser tool failed to initialize in this session.

## Firebase deployment (current path — no Vercel required)

The feedback endpoint was deployed on 2026-09-24:

`https://us-central1-healthmind-app.cloudfunctions.net/healthmindEmailFeedback`

The website is unchanged. Firebase runs only the feedback API using its built-in service identity, without a private key in the deployment. Its runtime account (`832799218874-compute@developer.gserviceaccount.com`) was granted `roles/datastore.user` to access Firestore. Local sending still uses the Git-ignored `.env.local` credentials. Set `FEEDBACK_ENDPOINT_URL` to the URL above; it overrides the website API URL in the email. Resend SMTP uses port 587 with mandatory STARTTLS because port 465 timed out on this network.

Deployment and live validation commands:

```powershell
npm ci --prefix ./feedback-functions
$env:FUNCTIONS_DISCOVERY_TIMEOUT = '60'
firebase deploy --only functions:healthmind-feedback:healthmindEmailFeedback --config firebase.feedback.json --project healthmind-app --non-interactive
node scripts/check-feedback-live.mjs
npm run feedback:send-test -- jeffersonmagala@gmail.com
```

The live check creates and removes its own synthetic Firestore record. It verifies multi-selection, deselection, clearing, restored state, invalid requests and expiration. The deploy command targets only the new function in its own codebase. `scripts/build-feedback-function.mjs` reuses the Next.js handler and validation code, changing only the credential provider. No website deployment or Vercel billing change is required. Existing production Firestore rules were inspected and do not grant clients access to the feedback collection.

Additional files: `firebase.feedback.json`, `feedback-functions/package.json`, `feedback-functions/package-lock.json`, `feedback-functions/index.mjs`, `feedback-functions/firebase.mjs`, `scripts/build-feedback-function.mjs`, and `scripts/check-feedback-live.mjs`. Generated deployment files and nested dependencies are ignored. The function package uses `firebase-admin` and `firebase-functions` on Node.js 22. TypeScript excludes the nested function dependencies.

The original Vercel instructions below are retained as an alternative; use the Firebase path above for this campaign.

## Current status

Delivery investigation, 2026-09-25: the corrected test bounced with Gmail `550-5.7.1` (likely unsolicited mail); SMTP acceptance was not delivery. The dashboard listed `attachment-0`, and inspection of the downloaded 4,871-byte file confirmed it contains our AMP document. This establishes that Resend exposes the AMP part as an attachment, but the outgoing MIME placement/disposition is not yet available. Do not assume AMP caused the spam rejection or that the interactive message works in Gmail. Further sends are paused pending investigation. A ready-to-send provider support draft is in `docs/resend-amp-support.md`; it has not been sent.

Recipient correction: the user's Gmail screenshot confirmed `jeffersonmagala@gmail.com` (with an `r`). The earlier invitation to the misspelled address below was invalidated by expiring its token. A single corrected test was accepted by Resend SMTP on 2026-09-25. Its response record is `3d749584345343a4f69f8dc5d1c251577bd608c89cf2c775d23cbbda940f3b67`. Inbox rendering and clicks still require recipient verification.

On 2026-09-25, one test was sent through Resend SMTP to `jeffesonmagala@gmail.com` and accepted by the SMTP server. Invitation record: `071f481a579fb0c341d25d34b0bedb2ed5c2269f86618a1c2545d600c7e785a3`. This confirms SMTP acceptance, not inbox delivery or Gmail rendering. Do not repeat the send command merely to check delivery; inspect the inbox and Resend logs. No bulk send was performed.

The endpoint is deployed to Firebase. Live Firestore integration tests passed on 2026-09-25: select, multi-select, deselect, clear, restore, invalid requests and expired tokens. Gmail desktop/mobile rendering and interaction still need verification in the recipient inbox. Browser preview inspection was unavailable in this session.

Local verification passed: official AMP4EMAIL validation, five automated security/MIME tests, TypeScript checking, production build, and lint (six existing warnings, zero errors). Six HTTP smoke checks against the built application passed: missing/wrong sender, invalid token, unknown choice, malformed body, and preflight; none redirected. The later live integration test also verified Firestore persistence. Inbox rendering remains to be checked.

This repository uses Next.js 15 App Router. It previously had no Firebase Admin or Resend utility. Its existing waitlist uses Google Sheets and is unchanged. The linked Vercel project is `landing-page`; Firebase CLI access was confirmed for `healthmind-app`. Vercel's saved credentials were invalid during setup. Firebase CLI login does not supply the service-account credentials needed by a deployed server.

## Configuration

Create `.env.local` (already ignored by Git) with these values. Obtain credentials through your provider dashboards; do not paste secrets into chat or commit them.

```dotenv
RESEND_API_KEY=your-resend-key
FIREBASE_PROJECT_ID=healthmind-app
FIREBASE_CLIENT_EMAIL=your-service-account-email
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nyour-key\n-----END PRIVATE KEY-----\n"
FEEDBACK_BASE_URL=https://www.healthmindgroup.com
```

Use the exact canonical HTTPS host that serves this Vercel project. Verify whether `www.healthmindgroup.com` or `healthmindgroup.com` is canonical before setting this value: the API must not redirect. No production host was assumed to be verified. Use a Firebase service account authorized for Firestore in the same project. Server initialization is lazy and centralized in `lib/email-feedback/firebase.mjs`.

In Vercel → `landing-page` → Settings → Environment Variables, add the three Firebase variables for Production. Do not overwrite existing values without inspecting their purpose. The Resend key and base URL are used by the local sender command; the deployed API does not need them. If running that sender elsewhere, configure them there instead.

In Firebase → Firestore Database → Rules, confirm that browser/mobile clients cannot read or write `healthmind_email_feedback`. Admin SDK calls bypass these rules. A collection rule can be:

```text
match /healthmind_email_feedback/{document} {
  allow read, write: if false;
}
```

An existing broad allow rule can override this denial: review overlapping rules. Do not replace the application's existing rules wholesale. The current production rules have not been audited or changed here.

## Local verification and deployment

From this repository in PowerShell:

```powershell
npm run feedback:test
npm run feedback:validate
npm run feedback:preview
npx tsc --noEmit
npm run lint
npm run build
```

The preview produces `.feedback-preview/email.html`, `email.amp.html`, and `email.eml`. Preview tokens are fictitious and do not create Firestore records. Open `email.html` for the ordinary HTML appearance; an ordinary browser cannot reproduce Gmail's AMP email environment. The AMP validator downloads the current official validator and needs internet access.

Restore Vercel access, check the linked project, then deploy the reviewed changes:

```powershell
vercel login
vercel whoami
vercel env ls
vercel --prod
```

The existing `.vercel/project.json` links to `landing-page`. Ensure the canonical HealthMind domain is attached to that deployment. Do not use a preview deployment with authentication protection for recipient-facing AMP requests. Build configuration skips built-in lint/type checks, so the explicit commands above matter.

## First test in Gmail

1. In the test recipient's Gmail web settings, choose **See all settings → General → Dynamic email**. Enable dynamic email, open **Developer settings**, and allow `noreply@healthmindgroup.com`. Save changes. Images must be enabled; Workspace administrators can restrict dynamic email.
2. Verify `healthmindgroup.com` in Resend, including its DNS authentication. Keep the exact sender `HealthMind <noreply@healthmindgroup.com>`.
3. Send to exactly one inbox:

   ```powershell
   npm run feedback:send-test -- your-test-address@gmail.com
   ```

   This command validates AMP, checks that the deployed endpoint responds without redirecting, verifies SMTP, creates the recipient record, and sends through Resend SMTP. It has no bulk mode. It prints a hashed feedback record ID, never the bearer token. SMTP acceptance is not proof of inbox delivery: check Resend's email logs. If delivery is marked `unknown`, check logs before retrying to avoid duplicates.
4. Open the original email in Gmail. Select speed, navigation, then content. Each selected label should turn into ✓ and the status should become “Saved.” Deselect navigation, then all options. Check Firestore after every step. Test quick repeated clicks and keyboard selection; controls should pause while a save is in progress. On failure, use “Try again” to resend the current selections.
5. Close and reopen the email. It fetches the stored state before showing controls. Confirm selections restore. Repeat on a supported Gmail mobile client. Verify the ordinary HTML fallback in a client with dynamic email disabled.
6. In Gmail → Show original, confirm the delivered message still contains `text/plain`, `text/x-amp-html`, and `text/html`, in that order, and that authentication passes. SMTP providers may transform MIME; local validation alone cannot establish delivered-message validity.

Expected stored states are `[]`, `["app-speed-performance"]`, then speed + navigation, then all three, then speed + content, then `[]`. After a save, `responseReceived` remains true even when every choice is deselected: this distinguishes a cleared response from someone who never responded.

## Where responses appear

Open [HealthMind Firestore](https://console.firebase.google.com/project/healthmind-app/firestore), select the **Data** tab and collection **healthmind_email_feedback**. The collection appears after the first test record is created. Filter `campaign == healthmind-product-feedback` and `responseReceived == true` to find respondents. `choices` always holds the latest selection set; documents are updated rather than appended for each click.

Each document ID is SHA-256 of a random 32-byte token. Fields:

| Field | Meaning |
| --- | --- |
| email | Recipient address, visible only to authorized administrators |
| campaign | `healthmind-product-feedback` |
| choices | Current category IDs: `app-speed-performance`, `navigation`, `content-variety` |
| responseReceived | Whether any successful save occurred |
| createdAt / lastUpdatedAt | Firestore timestamps |
| expiresAt | 30 days after creation; expiry is enforced server-side |
| deliveryStatus / messageId | SMTP tracking (`pending`, `accepted`, or `unknown`) |
| rateWindowAt / rateCount | Transactional per-token limit of 60 writes per minute |

Sending another test creates another invitation record. Do not use the test command as a bulk-send loop; an approved campaign sender would need audience suppression and deduplication. No public response dashboard or unsecured export route is created. Resend tracks email delivery, while Firestore stores selections.

## Before sending to customers

Complete the live test first. For Gmail production dynamic delivery, follow Google's sender registration: send a real production-system sample to the address in Google's current registration instructions and submit the registration form. That is a separate send requiring your instruction; this implementation does not submit it automatically.

Verify SPF, aligned DKIM, TLS, valid AMP MIME, sender reputation, and the domain's DMARC policy as required by the provider. Confirm Google approval for this exact sender. Determine the final audience source and exclude unsubscribed/suppressed recipients before preparing a bulk campaign. No customer send is authorized by this document.

Unsupported clients display the honest HTML/plain fallback and cannot save choices. Dynamic delivery may also be disabled by recipient settings, authentication failures, email age, or forwarding. The feedback token expires after 30 days. Anyone possessing the original bearer token can submit that invitation's feedback; the endpoint exposes no recipient email. CORS is checked but is not a substitute for token authentication.

Successful selections use background AMP XHR and return JSON: no links, website navigation, redirect, new tab, text input, or separate Submit button. “Try again” appears only after a failed save. State restoration uses `amp-list`; reliability in the actual receiving client still requires testing.

## Changed files and dependencies

Created: `app/api/email-feedback/route.ts`; `lib/email-feedback/core.mjs`, `firebase.mjs`, `template.mjs`; `scripts/feedback-email.mjs`, `validate-feedback.mjs`, `feedback.test.mjs`; this guide.

Modified: `package.json`, `package-lock.json`, `.gitignore`. Website pages and existing routes were not changed.

Installed runtime packages: `firebase-admin`, `nodemailer`. Development package: `amphtml-validator`.

## Official references

- [Gmail developer testing](https://developers.google.com/workspace/gmail/ampemail/testing-dynamic-email)
- [Gmail sender registration](https://developers.google.com/workspace/gmail/ampemail/register)
- [AMP email CORS](https://amp.dev/documentation/guides-and-tutorials/learn/cors-in-email/)
- [Resend SMTP](https://resend.com/docs/send-with-smtp)
- [AMP selector](https://amp.dev/documentation/components/amp-selector/)

## Sender correction — 1 October 2026

The three sender entry points now share `scripts/feedback-sender.mjs`. The email link is pinned to the Firebase function with `view=page` and a per-recipient token; Vercel configuration cannot override it. Resend sends use `https://api.resend.com/emails`. CSV parsing preserves the first headerless row and quoted fields and deduplicates addresses (298 in the current CSV).

`npm run feedback:preview` only creates a local preview. `npm run feedback:send-test` sends the fixed test to jeffersonmagala@gmail.com, once for this correction. `node scripts/send-feedback-production.mjs` is a dry run; sending requires explicit `--send`. No production emails were sent during this correction.

Persistent `healthmind_email_dispatches` records prevent reruns from sending the same correction twice. Unknown/pending sends stop and require reconciliation instead of automatic retry. Known bounced/complained/unsubscribed feedback recipients are skipped for production; this is not a substitute for importing any external suppression list before a future bulk send.

Validation: three sender tests passed; live Firebase select/multiselect/deselect/clear/state restoration and invalid/expired request checks passed. Synthetic record removed.

Test accepted by Resend: `01a0f45f-b54b-7703-b65a-38ee81628c21`.
Subject: `[TEST] HealthMind feedback - working Firebase link`.
Feedback record: `ae4a49d42e4fb6e5015202016015c92a926d959b692c01dc41dc163a88db4e13` in `healthmind_email_feedback`.
Acceptance does not confirm inbox delivery. Responses save to that Firestore record's `choices` and `responseReceived` fields.

## Reading the feedback results

`healthmind_email_dispatches` tracks sending: `accepted` means Resend accepted the request, not that someone answered or the inbox received it. Its `feedbackRecord` points to the document in `healthmind_email_feedback` containing the answer.

In `healthmind_email_feedback`, `responseReceived: true` means a selection was saved. `choices` holds the latest selections:
- `app-speed-performance`: App Speed & Performance.
- `navigation`: Finding Features / Navigation.
- `content-variety`: Exercises & Content Variety.

One person selecting all three contributes one respondent and one selection to each category. Category percentage = respondents selecting that category / total respondents x 100. Percentages can sum above 100 because this is multiple-choice. These are improvement priorities, not severity scores or clinical outcomes. A saved empty choices array means all options were cleared; it is not evidence of satisfaction. Exclude test responses and deduplicate recipients when combining campaigns; keep nonresponses separate from answers.

The 1 October rollout now reads current Firebase Authentication accounts instead of the old CSV. The preflight found 303 enabled accounts with 303 unique email addresses, including the requested test address. The test address is explicitly included despite its older AMP content bounce; unsubscribe/complaint exclusions still apply.

### Production rollout result

Resend accepted 204 messages in `firebase-correction-2026-10-01`, including jeffersonmagala@gmail.com. Sending stopped on HTTP 429 `monthly_quota_exceeded`. Firestore reconciliation confirms 204 accepted dispatches and one explicitly rejected dispatch. Of the 303 intended recipients, 99 remain (one quota rejection and 98 not attempted). Inbox delivery is not confirmed by these acceptance records.

After quota is restored, the same production command skips accepted dispatches and retries the explicit quota rejection plus unattempted recipients. No automatic retries are made for ambiguous failures. Do not change the run ID when resuming this rollout.
