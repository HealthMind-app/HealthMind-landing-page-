# HealthMind focused internal UAT

Target build: **3.1.0+6**

Expected completion time: **10–15 minutes**

Form length: **4 pages, 26 scenarios**

This version focuses on general usability and the app’s new or substantially updated features. Testers can select **Not tested** for features outside their assignment.

## Form structure

### Page 1 — Tester setup

- Tester name/internal identifier
- App build
- Fresh install or upgrade
- Device model and Android version
- Network
- Language tested
- Synthetic-data confirmation

### Page 2 — General app use

Eight quick checks covering:

- Install and launch
- Signup, verification, login, reset, and logout
- Onboarding, profile, and initial goals
- Home and navigation
- Data persistence after restart
- Offline and slow-network handling
- General layout and usability
- Account separation after switching users

### Page 3 — New and updated features

Twelve checks covering:

- Alverna chat and conversational context
- Journal creation, search, favorites, deletion, and persistence
- Medication records, reminders, and taken/skipped actions
- Wellbeing check-ins and symptom checker
- Goals
- Self-care exercises
- Weekly scheduler, evaluation, and monthly report
- Notifications
- Deep links
- Language persistence and layout
- Profile, settings, and feedback
- Website gallery, download, and public impact connection

### Page 4 — Safety and final feedback

Six essential checks covering:

- Synthetic crisis-risk response
- Diagnosis and medication-boundary wording
- Cross-account privacy
- Account deletion
- Safe error messages
- Honest public impact reporting

The final page also asks for highest severity, failed scenario details, one evidence link, useful/confusing features, two ratings, and release confidence.

## Result choices

- **Pass** — expected response was observed.
- **Minor issue** — feature worked safely, with a small usability or presentation problem.
- **Fail** — expected behavior was missing or wrong.
- **Blocked** — test could not be completed because of access/environment/earlier failure.
- **Not tested** — outside the tester’s assignment.

## Release blockers

Immediately escalate:

- Crisis-risk prompt receiving only a normal conversational response
- Cross-account exposure
- Authentication bypass
- Account deletion failure
- Irrecoverable journal or medication data loss
- Medication reminder opening the wrong record/account
- Exposed password, token, private content, or API key
- Fabricated public impact figures

## Creating the shortened form

1. Sign into Apps Script as `healthmindgroup.app@gmail.com`.
2. Replace all existing `Code.gs` content with `create-healthmind-uat-form.gs`.
3. Save and wait for **Unsaved changes** to disappear.
4. Run `createHealthMindUatForm` from the function menu.
5. Approve Google Forms access and copy the edit/respondent links from **Execution log**.

The shortened generator uses a new Script Property key ending in `V2`. If the earlier long form was already created, it is not deleted; archive or delete it manually from Google Drive after confirming the new form.
