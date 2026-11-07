import { getApps, initializeApp } from "firebase-admin/app";
import { initializeFirestore } from "firebase-admin/firestore";

export function feedbackDb() {
  const app = getApps()[0] || initializeApp();
  return initializeFirestore(app, { preferRest: true });
}
