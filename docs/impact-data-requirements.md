# HealthMind impact data requirements

This checklist defines the production data and approvals required to move each public metric from an unavailable state. Do not paste credentials, personal records, conversation text, journal content, or health disclosures into this document or a pull request.

## Connection pattern

The public landing page reads a single typed snapshot from `getPublicImpact`. Approved source systems should be aggregated server-side into `public_impact/current`; the browser must never query private user collections directly. A failed source stays unavailable or stale and never receives a sample fallback.

## Inputs needed now

### Google Analytics / Firebase Analytics

- Confirm the production GA4 property and Android stream linked to `com.healthmind.app`.
- Enable the Google Analytics Data API for the production Google Cloud project.
- Grant the aggregation service account read-only Analytics access through environment configuration; never commit a key.
- Confirm that the production app version is receiving `chat_started`, `journal_entry_created`, `user_engagement`, and other approved events.
- Supply the employee, developer, emulator, debug, QA, and automated-test exclusion rule.
- Approve the reporting timezone (`Africa/Nairobi` unless product decides otherwise), reporting window, consent rule, and public minimum-group threshold.

### Outreach and partner register

Provide a reviewed source—preferably an admin-managed Firestore collection or approved report import—with these public-safe fields:

- `eventId`, `title`, `eventType`, `status`, `startDate`, `endDate`, and reporting timezone.
- Stable `communityId`, coarse public location, country, and district where approved.
- `verifiedAttendeeCount` plus the approved duplicate-attendance rule; never attendee names.
- Stable partner and institution IDs with category (`school`, `university`, `NGO`, `hospital`, or approved alternative).
- `verifiedAt`, verifier or approval reference, source-report reference, and reporting period.
- Separate flags for `publishMetrics`, `publishName`, `publishLogo`, `publishStory`, and `publishMedia`.
- For every public image: approved caption, alt text, date, coarse location, photographer/source, and publication/participant consent reference.

### Outcomes and reports

- Wellness outcomes require an approved survey instrument, exact question wording, consent basis, sampling method, representative-sample review, minimum sample, exclusions, formula, period, and clinical/legal wording review.
- Public reports require the final approved PDF, title, reporting period, version, approval date, and download permission.
- Crisis-related aggregates remain withheld unless clinical, privacy, and legal reviewers approve a specific public-safe definition.

## Metric decisions to approve

| Metric | Decision required before connection |
| --- | --- |
| Monthly active users | Distinct-user identity, qualifying activity, trailing-30-day window, consent and exclusion filters, minimum group size |
| AI conversations | Whether one `chat_started` event is a conversation; completion, retry, debug/test, and failed-response rules |
| Mood check-ins | Permission to add a content-free completion event; do not transmit mood or symptom values for public reporting |
| Journal entries | Whether a successful local save followed by `journal_entry_created` qualifies; confirm event receipt and exclusions |
| Seven-day retention | Cohort entry event, return event, day/window boundaries, attribution, timezone, exclusions, minimum cohort size |
| People reached | Attendance definition and repeat-attendee deduplication |
| Communities engaged | Stable definition of a community and distinct-ID policy |
| Partner organizations | Active relationship definition and name/logo publication permission |
| Outreach events | Completed-event status, included event types, verification record, and reporting period |
| Global reach | Approved geographic granularity and institution-category definitions |

## Already connected

`registered-accounts` is currently calculated from non-disabled Firebase Authentication accounts and published with the reporting period and last verification time. An approved rule for excluding internal/test accounts is still needed before describing the number as people served or users reached.
