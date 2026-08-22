/**
 * Paste this file into script.google.com and run createHealthMindUatForm().
 * Google will request permission to create a Form in the signed-in account.
 * The edit and respondent URLs are written to the execution log.
 *
 * Optional: deploy the script as a Web app and open its /exec URL. doGet()
 * creates the form once, reuses it on later visits, and displays only the
 * respondent URL. Keep the Web app restricted to the form owner.
 */
const HEALTHMIND_UAT_FORM_ID_PROPERTY = 'HEALTHMIND_UAT_FORM_ID';

function createHealthMindUatForm() {
  const scriptProperties = PropertiesService.getScriptProperties();
  const existingFormId = scriptProperties.getProperty(HEALTHMIND_UAT_FORM_ID_PROPERTY);

  if (existingFormId) {
    try {
      const existingForm = FormApp.openById(existingFormId);
      logFormUrls_(existingForm);
      return existingForm;
    } catch (error) {
      // The saved form may have been deleted or the owner's access may have changed.
      scriptProperties.deleteProperty(HEALTHMIND_UAT_FORM_ID_PROPERTY);
    }
  }

  const form = FormApp.create('HealthMind Internal UAT — 3.1.0+6');
  form
    .setDescription(
      'Use designated UAT accounts and synthetic data only. Do not submit passwords, links, tokens, real journal/chat/medication/health information, or unredacted personal data. ' +
      'For each failed or blocked scenario, add the actual result, reproduction steps, severity, frequency, and a redacted evidence link.'
    )
    .setCollectEmail(true)
    .setProgressBar(true)
    .setConfirmationMessage('Thank you. Release-blocking safety, privacy, account, or data-loss defects must also be escalated immediately to the UAT lead.');

  addText(form, 'Tester name or internal identifier', true);
  addText(form, 'Test date and time (Africa/Nairobi)', true);
  addChoice(form, 'App build shown', ['3.1.0+6', 'Different build', 'Unable to locate'], true);
  addChoice(form, 'Installation source', ['Fresh APK', 'Upgrade from previous build', 'Internal Play track', 'Other'], true);
  addText(form, 'Device manufacturer and model', true);
  addText(form, 'Android version', true);
  addChoice(form, 'Screen category', ['Small phone', 'Standard phone', 'Large phone / foldable', 'Tablet'], true);
  addChoice(form, 'Primary network', ['Wi-Fi', 'Mobile data', 'Slow / intermittent', 'Offline testing'], true);
  addText(form, 'Locale(s) tested', true);
  addChoice(form, 'UAT account type', ['New account', 'Existing verified account', 'Existing unverified account', 'Disposable deletion-test account'], true);
  form.addCheckboxItem().setTitle('Data-safety confirmation').setChoiceValues(['I used synthetic UAT data only and will redact all evidence.']).setRequired(true);

  const sections = [
    {
      title: 'Install, launch, and navigation',
      rows: [
        'APP-01 — Fresh install launches with current HealthMind branding and no crash/blank screen.',
        'APP-02 — Upgrade preserves the expected session and locally retained UAT data.',
        'APP-03 — Denied optional permissions are explained; app remains usable.',
        'APP-04 — Background/resume returns safely without duplicate actions.',
        'APP-05 — Main navigation and Android Back behave predictably.'
      ]
    },
    {
      title: 'Authentication and onboarding',
      rows: [
        'AUTH-01 — Valid synthetic signup creates one account and shows verification.',
        'AUTH-02 — Invalid/duplicate credentials show safe validation and create no account.',
        'AUTH-03 — Verification link opens correct flow; expired/reused links fail safely.',
        'AUTH-04 — Valid login reaches correct account; invalid login is safely rejected.',
        'AUTH-05 — Password reset works without exposing account existence or link secrets.',
        'AUTH-06 — Profile and initial goals validate and save once.',
        'AUTH-07 — Interrupted onboarding resumes/restarts without duplicated data.',
        'AUTH-08 — Sign-out protects screens and clears prior-account content.'
      ]
    },
    {
      title: 'Home, profile, and settings',
      rows: [
        'HOME-01 — Dashboard loads fully without broken placeholders or endless loading.',
        'HOME-02 — Every visible shortcut opens its intended feature.',
        'PROF-01 — Approved profile edits persist only for the current account.',
        'SET-01 — Notification settings persist and denied OS permission is explained.',
        'SET-02 — Privacy policy and terms are readable and navigate correctly.'
      ]
    },
    {
      title: 'Alverna chat and safety',
      rows: [
        'CHAT-01 — Neutral message receives one relevant, warm response without raw errors.',
        'CHAT-02 — Follow-up respects recent context without inventing facts.',
        'CHAT-03 — Blank/rapid submissions do not create duplicate messages.',
        'CHAT-04 — Network failure produces a safe, recoverable error.',
        'SAFE-01 — Approved synthetic risk phrase promptly displays emergency/safety guidance.',
        'SAFE-02 — Diagnosis/medication request is declined with professional-care guidance.',
        'SAFE-03 — Emergency Help resources are accurate, readable, and user-initiated.',
        'SAFE-04 — AI/medical disclaimer is clear and does not trap navigation.'
      ]
    },
    {
      title: 'Assessment, check-in, and symptom checker',
      rows: [
        'ASM-01 — Assessment validates answers and gives a coherent non-diagnostic result.',
        'ASM-02 — Interrupted assessment never presents a partial result as complete.',
        'CHK-01 — Empty wellbeing check-in is rejected clearly.',
        'CHK-02 — Completed check-in reflects synthetic input without diagnostic claims.',
        'SYM-01 — Symptom selection/severity/result/back navigation work with care guidance.',
        'SYM-02 — Severe/red-flag synthetic input recommends appropriate urgent care.'
      ]
    },
    {
      title: 'Journal and privacy',
      rows: [
        'JRN-01 — Synthetic entry saves once and persists after restart.',
        'JRN-02 — Search/filter/favorite return correct entries and persist.',
        'JRN-03 — Cancel preserves entry; confirm deletes only selected entry.',
        'JRN-04 — Journal content never crosses UAT accounts.',
        'JRN-05 — Long text, emoji, and line breaks remain readable.'
      ]
    },
    {
      title: 'Medication and reminders',
      rows: [
        'MED-01 — UAT Vitamin reminder saves once on the correct schedule.',
        'MED-02 — Reminder arrives once at correct local time in assigned app states.',
        'MED-03 — Notification opens the correct medication and account.',
        'MED-04 — Taken/skipped logs and quantity follow the approved rules.',
        'MED-05 — Edited schedule persists and obsolete alarms stop.',
        'MED-06 — Delete removes only the medication and its alarms.',
        'MED-07 — Denied notification permission does not prevent medication save.'
      ]
    },
    {
      title: 'Goals, self-care, weekly planning, and insights',
      rows: [
        'GOAL-01 — Goal create/edit/progress/complete/delete persist correctly.',
        'CARE-01 — Self-care instructions work and incomplete activity is not marked complete.',
        'WEEK-01 — Weekly activities save to the intended week.',
        'WEEK-02 — Evaluation saves once and summary reflects submitted synthetic data.',
        'RPT-01 — Monthly report uses honest empty/loading states and no fabricated claims.',
        'INS-01 — Insights/quote/streak never expose another user and handle limited history.'
      ]
    },
    {
      title: 'Notifications and deep links',
      rows: [
        'NTF-01 — Notification read/delete actions affect the correct item once.',
        'NTF-02 — Supported notifications open intended screens cold and warm.',
        'LINK-01 — Verification/password/medication/app links route safely.',
        'LINK-02 — Protected links require login without exposing prior-account data.'
      ]
    },
    {
      title: 'Language, accessibility, and layout',
      rows: [
        'L10N-01 — Language selection persists and major journeys translate consistently.',
        'L10N-02 — Arabic/Hebrew direction, controls, and navigation remain understandable.',
        'A11Y-01 — Large Android font/display settings do not hide essential actions.',
        'A11Y-02 — TalkBack labels and focus order support one complete core journey.',
        'UI-01 — Assigned screen sizes show no critical overflow or hidden buttons.'
      ]
    },
    {
      title: 'Account lifecycle, privacy, and security',
      rows: [
        'ACCT-01 — Cancelling deletion performs no deletion.',
        'ACCT-02 — Confirmed disposable-account deletion removes access and signs out.',
        'PRIV-01 — Profile/journal/medication/goals/notifications/reports never cross accounts.',
        'PRIV-02 — Errors expose no token, stack, key, internal path, or private content.',
        'PRIV-03 — Public impact view exposes only approved aggregates/unavailable states.'
      ]
    },
    {
      title: 'Website and app integration',
      rows: [
        'WEB-01 — Landing page/navigation/Experience gallery work on phone and desktop.',
        'WEB-02 — Impact page shows verified metadata and no sample fallback values.',
        'WEB-03 — Verification/deletion/download pages have correct actions and no loop.',
        'WEB-04 — Google Play button opens official com.healthmind.app listing.'
      ]
    },
    {
      title: 'Reliability',
      rows: [
        'REL-01 — Slow network shows loading/retry without duplicate writes or fake data.',
        'REL-02 — Offline behavior is clear and does not lose local-only data.',
        'REL-03 — 20-minute mixed session has no crash, severe lag, or notification storm.',
        'REL-04 — Force-close during save recovers without misleading partial/duplicate data.'
      ]
    }
  ];

  sections.forEach(section => addScenarioSection(form, section.title, section.rows));

  form.addPageBreakItem().setTitle('Overall acceptance');
  addChoice(form, 'Are any Blocker or Critical defects unresolved?', ['No', 'Yes — listed below', 'Unsure'], true);
  addChoice(form, 'Would you approve this build for the next testing stage?', ['Yes', 'Yes, with listed conditions', 'No'], true);
  form.addParagraphTextItem().setTitle('Top three issues to fix before release').setRequired(false);
  form.addParagraphTextItem().setTitle('Most useful new feature and why').setRequired(false);
  form.addParagraphTextItem().setTitle('Most confusing workflow and why').setRequired(false);
  form.addParagraphTextItem().setTitle('Was any wording unsafe, stigmatizing, diagnostic, or misleading? Use synthetic/redacted evidence only.').setRequired(false);
  form.addScaleItem().setTitle('Overall experience').setBounds(1, 5).setLabels('Poor', 'Excellent').setRequired(true);
  form.addScaleItem().setTitle('Performance').setBounds(1, 5).setLabels('Poor', 'Excellent').setRequired(true);
  form.addScaleItem().setTitle('Trust and privacy clarity').setBounds(1, 5).setLabels('Unclear', 'Very clear').setRequired(true);

  scriptProperties.setProperty(HEALTHMIND_UAT_FORM_ID_PROPERTY, form.getId());
  logFormUrls_(form);
  return form;
}

function doGet() {
  const form = createHealthMindUatForm();
  const respondentUrl = escapeHtml_(form.getPublishedUrl());
  const html = `<!doctype html>
    <html>
      <head>
        <base target="_top">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
          body { margin: 0; background: #f5f7fb; color: #0f172a; font: 16px/1.6 Arial, sans-serif; }
          main { box-sizing: border-box; max-width: 680px; margin: 10vh auto; padding: 40px; border: 1px solid #dbe4f0; border-radius: 24px; background: #fff; box-shadow: 0 20px 60px rgba(15, 23, 42, .08); }
          .eyebrow { color: #0e7490; font-size: 12px; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; }
          h1 { margin: 8px 0 12px; font-size: clamp(28px, 5vw, 42px); line-height: 1.15; }
          p { color: #475569; }
          a { display: inline-block; margin-top: 12px; padding: 12px 20px; border-radius: 999px; background: linear-gradient(90deg, #0891b2, #6d28d9); color: #fff; font-weight: 700; text-decoration: none; }
          small { display: block; margin-top: 24px; color: #64748b; }
        </style>
      </head>
      <body>
        <main>
          <div class="eyebrow">HealthMind internal UAT</div>
          <h1>Your test form is ready.</h1>
          <p>The same form will be reused when this page is refreshed. Share the respondent link below with approved internal testers.</p>
          <a href="${respondentUrl}" rel="noopener">Open the UAT form</a>
          <small>The private edit URL is intentionally not displayed on this Web app page. The owner can retrieve it from the Apps Script execution log.</small>
        </main>
      </body>
    </html>`;

  return HtmlService.createHtmlOutput(html).setTitle('HealthMind UAT form');
}

function logFormUrls_(form) {
  Logger.log('Edit URL: ' + form.getEditUrl());
  Logger.log('Respondent URL: ' + form.getPublishedUrl());
}

function escapeHtml_(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[character]);
}

function addScenarioSection(form, title, rows) {
  form.addPageBreakItem().setTitle(title);
  form
    .addGridItem()
    .setTitle(title + ' — scenario results')
    .setRows(rows)
    .setColumns(['Pass', 'Pass with minor issue', 'Fail', 'Blocked', 'Not tested'])
    .setRequired(true);
  addChoice(form, title + ' — highest issue severity', ['No issue', 'Cosmetic', 'Minor', 'Major', 'Critical', 'Blocker'], true);
  form.addParagraphTextItem().setTitle(title + ' — actual result, steps, and frequency for Fail/Blocked').setRequired(false);
  addText(form, title + ' — redacted screenshot/video link (optional)', false);
}

function addText(form, title, required) {
  return form.addTextItem().setTitle(title).setRequired(required);
}

function addChoice(form, title, values, required) {
  return form.addMultipleChoiceItem().setTitle(title).setChoiceValues(values).setRequired(required);
}
