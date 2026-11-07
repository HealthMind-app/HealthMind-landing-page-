import "server-only";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

const APP_NAME = "healthmind-web";

export class ServerConfigError extends Error {}

/**
 * Admin Firestore for website API routes. Uses the same service-account
 * variables as the email-feedback system so Vercel only needs one set.
 */
export function adminDb(): Firestore {
  let app = getApps().find((candidate) => candidate.name === APP_NAME);
  if (!app) {
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");
    if (!projectId || !clientEmail || !privateKey) {
      throw new ServerConfigError("Firebase admin credentials are not configured.");
    }
    app = initializeApp({ credential: cert({ projectId, clientEmail, privateKey }) }, APP_NAME);
  }
  return getFirestore(app);
}
