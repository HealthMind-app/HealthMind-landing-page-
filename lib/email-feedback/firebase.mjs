import { cert, getApps, initializeApp } from "firebase-admin/app";
import { initializeFirestore } from "firebase-admin/firestore";

export function feedbackDb() {
  const name = "healthmind-feedback";
  let app = getApps().find(app => app.name === name);
  if (!app) {
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");
    if (!projectId || !clientEmail || !privateKey) throw new Error("Firebase feedback credentials are not configured.");
    app = initializeApp({ credential: cert({ projectId, clientEmail, privateKey }) }, name);
  }
  return initializeFirestore(app, { preferRest: true });
}
