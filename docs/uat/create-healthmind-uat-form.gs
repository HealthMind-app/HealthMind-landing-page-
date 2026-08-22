/**
 * Plain-language HealthMind internal app test (approximately 10–15 minutes).
 * Paste into script.google.com and run createHealthMindUatForm().
 * Optional: deploy as a Web app and open the /exec URL.
 */
const HEALTHMIND_UAT_FORM_ID_PROPERTY = 'HEALTHMIND_PLAIN_LANGUAGE_UAT_FORM_ID_V3';

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

  const form = FormApp.create('HealthMind App Test and Feedback — 3.1.0+6');
  form
    .setDescription(
      'Estimated time: 10–15 minutes. Try the app normally and tell us what worked, what did not work, and what was confusing. ' +
      'Use only made-up test information. Do not enter passwords, private links, or real health, journal, or medication information.'
    )
    .setCollectEmail(true)
    .setProgressBar(true)
    .setConfirmationMessage('Thank you. Please escalate any safety, privacy, account-access, data-loss, or medication-reminder issue immediately.');

  addText(form, 'Your name', true);
  addChoice(form, 'Which app version are you testing?', ['3.1.0+6', 'A different version', 'I am not sure'], true)
    .setHelpText('Choose “I am not sure” if you cannot find the version number.');
  addChoice(form, 'How did you get this version of the app?', ['I installed it for the first time', 'I updated an existing copy', 'I installed it from the Google Play test link', 'I am not sure'], true);
  addText(form, 'What phone are you using?', true)
    .setHelpText('Example: Samsung A14 or Google Pixel 7. Add the Android version only if you know it.');
  addChoice(form, 'How were you connected?', ['Wi-Fi', 'Mobile data', 'The connection was slow or kept dropping', 'I tested without internet'], true);
  addChoice(form, 'Which language did you use in HealthMind?', ['English', 'Kiswahili', 'Another language', 'I am not sure'], true)
    .setHelpText('Choose English if the app was displayed in English.');
  addText(form, 'If you chose “Another language,” which one? (Optional)', false);
  form
    .addCheckboxItem()
    .setTitle('Please confirm before continuing')
    .setChoiceValues(['I used only made-up test information and did not enter private health information.'])
    .setRequired(true);

  addScenarioGrid_(form, 'General app use', [
    'The app installed and opened normally without crashing or showing a blank screen. [GEN-01]',
    'Creating an account, signing in, email verification, password reset, and signing out gave clear messages. [GEN-02]',
    'Setting up the profile and first goals was clear, and the information saved correctly. [GEN-03]',
    'Home buttons, bottom menu, links, and the phone Back button took me where I expected. [GEN-04]',
    'My test information was still there after closing and reopening the app. [GEN-05]',
    'The app explained connection problems clearly and worked again when the internet returned. [GEN-06]',
    'Text, buttons, scrolling, keyboard, and loading screens were easy to use on my phone. [GEN-07]',
    'After signing out or changing test accounts, I never saw information from the previous account. [GEN-08]'
  ]);

  addScenarioGrid_(form, 'New and updated features', [
    'Alverna gave one helpful response, and follow-up messages made sense in the conversation. [NEW-01]',
    'I could add, find, favorite, and delete a made-up journal entry, and it remained after reopening the app. [NEW-02]',
    'I could add and update a test medication, receive the correct reminder, mark it taken/skipped, and delete it. [NEW-03]',
    'The check-in and symptom checker were easy to complete, and the results did not pretend to be a diagnosis. [NEW-04]',
    'I could create, update, complete, and delete a test goal. [NEW-05]',
    'Self-care exercises opened clearly and were only marked complete after I finished them. [NEW-06]',
    'The weekly planner, weekly review, and monthly summary saved and showed my made-up test information correctly. [NEW-07]',
    'Notification choices stayed saved, and tapping a notification opened the correct place. [NEW-08]',
    'Links from verification, password reset, medication reminders, or the website opened the correct place safely. [NEW-09]',
    'My chosen language stayed selected, and the words and buttons remained readable. [NEW-10]',
    'Profile changes, settings, and feedback saved or submitted once and showed a clear confirmation. [NEW-11]',
    'The HealthMind website, app screenshots, download buttons, and Impact page opened and worked correctly. [NEW-12]'
  ]);

  addScenarioGrid_(form, 'Safety, privacy, and confidence', [
    'Using the agreed made-up safety test message quickly showed emergency or professional-help guidance. [SAFE-01]',
    'When asked for a diagnosis or medication change, Alverna explained its limits and suggested qualified help. [SAFE-02]',
    'I never saw another test account’s journal, medication, goals, notifications, profile, or reports. [PRIV-01]',
    'Cancelling account deletion changed nothing; confirming it on a disposable account signed me out and removed access. [PRIV-02]',
    'Error messages did not show private information, passwords, secret-looking values, or confusing technical details. [PRIV-03]',
    'The public Impact page showed verified information or clearly said data was unavailable; it did not show made-up numbers. [IMPACT-01]'
  ]);

  addChoice(form, 'How serious was the biggest problem you found?', ['I found no problem', 'Small visual issue', 'Small problem', 'Important problem', 'Very serious problem', 'I could not continue testing'], true);
  form.addParagraphTextItem().setTitle('If something did not work, tell us what happened and how to make it happen again').setRequired(false);
  addText(form, 'Optional link to a screenshot or video with private information hidden', false);
  form.addParagraphTextItem().setTitle('Which new or updated feature did you find most useful?').setRequired(false);
  form.addParagraphTextItem().setTitle('What was the most confusing or frustrating part?').setRequired(false);
  form.addParagraphTextItem().setTitle('Did any wording feel unsafe, judgmental, misleading, or too much like a medical diagnosis?').setRequired(false);
  form.addScaleItem().setTitle('Overall app experience').setBounds(1, 5).setLabels('Poor', 'Excellent').setRequired(true);
  form.addScaleItem().setTitle('Confidence in privacy and safety').setBounds(1, 5).setLabels('Low', 'High').setRequired(true);
  addChoice(form, 'Should this version move to the next testing stage?', ['Yes', 'Yes, after reviewing the issues I listed', 'No'], true);

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
    .setColumns(['Worked', 'Worked with a small issue', 'Did not work', 'Could not test', 'Did not try'])
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
    '<h1>HealthMind app test is ready.</h1>' +
    '<p>This simple feedback form takes approximately 10–15 minutes.</p>' +
    '<a href="' + respondentUrl + '" rel="noopener">Open the app test form</a>' +
    '<small>The private edit URL is available only in the Apps Script execution log.</small>' +
    '</main></body></html>';

  return HtmlService.createHtmlOutput(html).setTitle('HealthMind app test');
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
