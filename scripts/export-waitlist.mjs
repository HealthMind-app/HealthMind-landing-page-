// Exports website_waitlist to CSV on stdout.
// Usage: node --env-file=.env.local scripts/export-waitlist.mjs > waitlist.csv
import { cert, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const { FIREBASE_PROJECT_ID: projectId, FIREBASE_CLIENT_EMAIL: clientEmail } = process.env;
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");
if (!projectId || !clientEmail || !privateKey) {
  console.error("Missing FIREBASE_PROJECT_ID / FIREBASE_CLIENT_EMAIL / FIREBASE_PRIVATE_KEY");
  process.exit(1);
}

const db = getFirestore(initializeApp({ credential: cert({ projectId, clientEmail, privateKey }) }));
const snapshot = await db.collection("website_waitlist").orderBy("createdAt").get();

// Prefix cells that a spreadsheet would treat as formulas.
const cell = (value) => {
  let text = String(value ?? "");
  if (/^[=+\-@\t\r]/.test(text)) text = `'${text}`;
  return `"${text.replaceAll('"', '""')}"`;
};

console.log(["email", "source", "environment", "createdAt", "submissions"].join(","));
for (const doc of snapshot.docs) {
  const d = doc.data();
  console.log([d.email, d.source, d.environment ?? "production", d.createdAt?.toDate().toISOString(), d.submissions].map(cell).join(","));
}
