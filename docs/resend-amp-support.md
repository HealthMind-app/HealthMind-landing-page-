# Resend support request — draft, not sent

Subject: SMTP AMP alternative exposed as attachment; Gmail rejected test email

Hello Resend Support,

We are testing an AMP for Email feedback message from HealthMind <noreply@healthmindgroup.com> to our own test inbox, jeffersonmagala@gmail.com.

Resend email ID: 01a0d691-2b1d-7694-9b89-e96c31ebf76c
Created: 2026-09-25 03:17:13 UTC

We submitted the message with Nodemailer over smtp.resend.com:587 using required STARTTLS. Nodemailer's `text`, `amp`, and `html` options generate multipart/alternative containing text/plain, text/x-amp-html, and text/html, in that order. Local MIME checks and the official AMP4EMAIL validator passed.

In the Resend dashboard, the message has an attachment named `attachment-0`. We downloaded it and confirmed it contains the AMP HTML document, including the amp-selector controls and amp-form endpoint. The dashboard's Raw tab shows the email JSON rather than the outbound RFC 5322 message, so we cannot establish the final MIME structure from that view.

Please confirm:

1. Does Resend SMTP preserve text/x-amp-html as a child of multipart/alternative alongside text/plain and text/html?
2. Does the attachment entry merely reflect how the dashboard stores the part, or was it sent with Content-Disposition: attachment or outside multipart/alternative?
3. Can you provide the outbound MIME headers/structure, or the supported configuration for sending AMP alternatives? Please redact bearer-token URLs.

The same test bounced with Gmail's response:

550-5.7.1 [54.240.6.245 12] Gmail has detected that this message is likely unsolicited mail. To reduce the amount of spam sent to Gmail, this message has been blocked. https://support.google.com/mail/?p=UnsolicitedMessageError

Please also check sender authentication and sending-IP reputation for this delivery. Public DNS contains SPF at send.healthmindgroup.com, a DKIM record at resend._domainkey.healthmindgroup.com, and DMARC at _dmarc.healthmindgroup.com; this does not establish whether the actual message passed authentication.

We need recipients to select multiple options inside a supported email client without opening a browser. A downloadable AMP attachment or an HTML link does not meet that requirement. We have paused further tests pending clarification.

Thank you.
