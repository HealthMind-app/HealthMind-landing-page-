# Email unsubscribe

The website verifies unsubscribe links. The app's Cloud Functions sign them.

## Flow

1. A marketing email (daily quote, weekly summary, inactivity nudge, etc.) includes
   - a footer link `https://healthmindgroup.com/unsubscribe?token=<token>`
   - headers
     ```
     List-Unsubscribe: <https://healthmindgroup.com/api/unsubscribe?token=<token>>
     List-Unsubscribe-Post: List-Unsubscribe=One-Click
     ```
2. Clicking the footer link opens `/unsubscribe`. The visitor confirms with a button, so link scanners can't unsubscribe anyone.
3. Gmail/Yahoo one-click sends `POST /api/unsubscribe?token=...` with body `List-Unsubscribe=One-Click`.
4. Both paths write `email_preferences/{uid}` → `{ marketingEmails: false, unsubscribedAt, unsubscribeSource }`.
5. **The app's scheduled email functions must skip any user whose `email_preferences/{uid}.marketingEmails === false`.**

Transactional emails (verification, password reset, account deleted) are not affected.

## Token

```
v1.<base64url(uid)>.<base64url(HMAC-SHA256(UNSUBSCRIBE_TOKEN_SECRET, "unsubscribe:v1:" + uid))>
```

The same `UNSUBSCRIBE_TOKEN_SECRET` (at least 32 random characters) must be set in Vercel and in the
app's Cloud Functions environment. Node signing code for `functions/index.js`:

```js
const crypto = require('crypto');
function unsubscribeToken(uid) {
  const sig = crypto.createHmac('sha256', process.env.UNSUBSCRIBE_TOKEN_SECRET)
    .update(`unsubscribe:v1:${uid}`).digest('base64url');
  return `v1.${Buffer.from(uid, 'utf8').toString('base64url')}.${sig}`;
}
```

Generate a secret with: `node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))"`

## Firestore

`email_preferences` is written only with the Admin SDK. The app's `firestore.rules` has no match for it,
so mobile clients can't read or write it. If the app should show this preference, add an owner-read rule.
