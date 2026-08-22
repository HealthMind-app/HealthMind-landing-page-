/**
 * Focused HealthMind internal UAT form (approximately 10–15 minutes).
 * Paste into script.google.com and run createHealthMindUatForm().
 * Optional: deploy as a Web app and open the /exec URL.
 */
const HEALTHMIND_UAT_FORM_ID_PROPERTY = 'HEALTHMIND_FOCUSED_UAT_FORM_ID_V2';

function createHealthMindUatForm() {
  const scriptProperties = PropertiesService.getScriptProperties();
  const existingFormId = scriptProperties.getProperty(HEALTHMIND_UAT_FORM_ID_PROPERTY);

  if (existingFormId) {
    try {
      const existingForm = FormApp.openById(existingFormId);
      logFormUrls_(existingForm);
      return existingForm;
    } catch (error) {
      scriptProperties.deleteProperty(HEALTHMIND_UAT_FORM_ID_PROPERTY);
    }
  }

  const form = FormApp.create('HealthMind Focused Internal UAT — 3.1.0+6');
  form
    .setDescription(
      'Estimated time: 10–15 minutes. Focus on general app use and the latest HealthMind features. ' +
      'Use designated test accounts and synthetic data only. Do not submit passwords, verification links, tokens, or real health/journal/medication information.'
    )
    .setCollectEmail(true)
    .setProgressBar(true)
    .setConfirmationMessage('Thank you. Please escalate any safety, privacy, account-access, data-loss, or medication-reminder issue immediately.');

  addText(form, 'Tester name or internal identifier', true);
  addChoice(form, 'App build shown', ['3.1.0+6', 'Different build', 'Unable to locate'], true);
  addChoice(form, 'Installation type', ['Fresh install', 'Upgrade from earlier build', 'Internal Play track', 'Other'], true);
  addText(form, 'Device model and Android version', true);
  addChoice(form, 'Network used', ['Wi-Fi', 'Mobile data', 'Slow/intermittent', 'Offline testing'], true);
  addText(form, 'Language(s) tested', true);
  form
    .addCheckboxItem()
    .setTitle('Data-safety confirmation')
    .setChoiceValues(['I used synthetic UAT data and will redact any evidence.'])
    .setRequired(true);

  addScenarioGrid_(form, 'General app use', [
    'GEN-01 — Install and launch: current branding appears and the app reaches onboarding/login without a crash or blank screen.',
    'GEN-02 — Account access: signup, verification, login, password reset, and logout give clear success/error responses.',
    'GEN-03 — Onboarding: profile and initial goals validate, save once, and resume sensibly after interruption.',
    'GEN-04 — Navigation: home cards, bottom navigation, screen links, and Android Back open/return correctly.',
    'GEN-05 — Persistence: expected profile and feature data remain after backgrounding or restarting the app.',
    'GEN-06 — Network handling: slow/offline states are clear, recoverable, and do not create duplicate actions.',
    'GEN-07 — Usability: text, buttons, scrolling, keyboard, loading states, and small-screen layout remain usable.',
    'GEN-08 — Account separation: signing out or switching UAT accounts never shows the previous account’s private data.'
  ]);

  addScenarioGrid_(form, 'New and updated features', [
    'NEW-01 — Alverna: neutral messages receive one relevant response and follow-up messages respect recent context.',
    'NEW-02 — Journal: create, search, favorite, delete, and restart persistence work with synthetic entries.',
    'NEW-03 — Medication: add/edit/delete, reminders, and taken/skipped actions affect the correct test medication once.',
    'NEW-04 — Check-ins and symptom checker: selection, results, and Back navigation work without diagnostic claims.',
    'NEW-05 — Goals: create, edit, progress, complete, and delete actions persist correctly.',
    'NEW-06 — Self-care: exercises open, instructions are usable, and progress is not awarded before completion.',
    'NEW-07 — Weekly journey: scheduler, evaluation, and monthly report save/display only submitted synthetic information.',
    'NEW-08 — Notifications: settings persist and tapping a notification opens the correct screen or record.',
    'NEW-09 — Deep links: verification, password, medication, and approved app links open safely in cold/warm app states.',
    'NEW-10 — Languages: selected language persists and assigned screens remain readable without important clipping.',
    'NEW-11 — Profile/settings/feedback: changes submit once, show confirmation, and remain tied to the current account.',
    'NEW-12 — Website connection: landing gallery, download links, and impact dashboard work without sample impact figures.'
  ]);

  addScenarioGrid_(form, 'Safety, privacy, and release confidence', [
    'SAFE-01 — A designated synthetic crisis-risk test promptly shows emergency/safety guidance, not only an ordinary chat reply.',
    'SAFE-02 — Requests for diagnosis or medication changes receive clear AI limitations and professional-care guidance.',
    'PRIV-01 — Journal, medication, goals, notifications, profile, and reports never cross between UAT accounts.',
    'PRIV-02 — Disposable-account deletion signs out and removes access; cancelling deletion changes nothing.',
    'PRIV-03 — Errors reveal no password, token, private content, stack trace, API key, or internal system detail.',
    'IMPACT-01 — Public impact reporting shows verified aggregate metadata or honest unavailable/error states—never convincing sample values.'
  ]);

  addChoice(form, 'Highest issue severity observed', ['No issue', 'Cosmetic', 'Minor', 'Major', 'Critical', 'Blocker'], true);
  form.addParagraphTextItem().setTitle('For any Fail or Blocked result: scenario ID, what happened, steps, and frequency').setRequired(false);
  addText(form, 'Redacted screenshot/video link (optional)', false);
  form.addParagraphTextItem().setTitle('Which new or updated feature was most useful?').setRequired(false);
  form.addParagraphTextItem().setTitle('What was most confusing or frustrating?').setRequired(false);
  form.addParagraphTextItem().setTitle('Did any wording feel unsafe, diagnostic, stigmatizing, or misleading?').setRequired(false);
  form.addScaleItem().setTitle('Overall app experience').setBounds(1, 5).setLabels('Poor', 'Excellent').setRequired(true);
  form.addScaleItem().setTitle('Confidence in privacy and safety').setBounds(1, 5).setLabels('Low', 'High').setRequired(true);
  addChoice(form, 'Would you approve this build for the next internal testing stage?', ['Yes', 'Yes, with the issues listed above', 'No'], true);

  scriptProperties.setProperty(HEALTHMIND_UAT_FORM_ID_PROPERTY, form.getId());
  logFormUrls_(form);
  return form;
}

function addScenarioGrid_(form, title, rows) {
  form.addPageBreakItem().setTitle(title);
  form
    .addGridItem()
    .setTitle(title + ' — results')
    .setRows(rows)
    .setColumns(['Pass', 'Minor issue', 'Fail', 'Blocked', 'Not tested'])
    .setRequired(true);
}

function doGet() {
  const form = createHealthMindUatForm();
  const respondentUrl = escapeHtml_(form.getPublishedUrl());
  const html = '<!doctype html><html><head><base target="_top">' +
    '<meta name="viewport" content="width=device-width, initial-scale=1">' +
    '<style>body{margin:0;background:#f5f7fb;color:#0f172a;font:16px/1.6 Arial,sans-serif}' +
    'main{box-sizing:border-box;max-width:680px;margin:10vh auto;padding:40px;border:1px solid #dbe4f0;border-radius:24px;background:#fff;box-shadow:0 20px 60px rgba(15,23,42,.08)}' +
    'h1{margin:0 0 12px;font-size:36px;line-height:1.15}p{color:#475569}' +
    'a{display:inline-block;margin-top:12px;padding:12px 20px;border-radius:999px;background:#0e7490;color:#fff;font-weight:700;text-decoration:none}' +
    'small{display:block;margin-top:24px;color:#64748b}</style></head><body><main>' +
    '<h1>HealthMind UAT form is ready.</h1>' +
    '<p>This focused form takes approximately 10–15 minutes.</p>' +
    '<a href="' + respondentUrl + '" rel="noopener">Open the UAT form</a>' +
    '<small>The private edit URL is available only in the Apps Script execution log.</small>' +
    '</main></body></html>';

  return HtmlService.createHtmlOutput(html).setTitle('HealthMind UAT form');
}

function logFormUrls_(form) {
  Logger.log('Edit URL: ' + form.getEditUrl());
  Logger.log('Respondent URL: ' + form.getPublishedUrl());
}

function escapeHtml_(value) {
  return String(value).replace(/[&<>"']/g, function(character) {
    return {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[character];
  });
}

function addText(form, title, required) {
  return form.addTextItem().setTitle(title).setRequired(required);
}

function addChoice(form, title, values, required) {
  return form.addMultipleChoiceItem().setTitle(title).setChoiceValues(values).setRequired(required);
}
