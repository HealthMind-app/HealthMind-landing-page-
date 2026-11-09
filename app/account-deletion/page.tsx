"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Mail, ShieldCheck, Trash2, Clock, Database, Smartphone, Globe } from "lucide-react";
import AccountDeletionForm from "@/components/account-deletion-form";
import { CONTACT_EMAIL } from "@/lib/site";

export default function AccountDeletionPage() {
  const email = CONTACT_EMAIL;

  const inAppSteps = [
    "Open the HealthMind app and sign in.",
    "Tap the “You” tab, then scroll to the bottom of your account screen.",
    "Tap the delete account button and confirm.",
    "If you haven’t signed in recently, the app will ask you to sign in again first.",
  ];

  const deletedData = [
    "Your sign-in account and profile information, including name and contact details",
    "Mood tracking entries, wellness check-ins, assessments, and streaks",
    "Journal entries, notes, and Alverna (AI companion) conversation history",
    "Medications, reminder settings, and reminder call logs",
    "Goals, weekly plans, self-care activity, and notifications",
    "Derived wellness insights and risk signals calculated from your data",
    "Files you uploaded, such as profile photos",
  ];

  const retainedData = [
    "A minimal record that your account was deleted and when",
    "Records of privacy requests, kept for up to 2 years to show they were handled",
    "Delivery and abuse-prevention logs kept for limited periods by our service providers",
    "Anonymous statistics that cannot identify you",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50/30 to-white">
      <div className="bg-gradient-to-r from-green-600 to-green-500 text-white py-12 sm:py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/90 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Account Deletion Request
            </h1>
            <p className="text-lg sm:text-xl text-white/90">
              Request deletion of your HealthMind account and associated personal data.
            </p>
            <p className="text-sm sm:text-base text-white/80 mt-2">
              Last Updated: November 9, 2026
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12 sm:py-16 space-y-8">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100"
        >
          <div className="flex items-start gap-4 mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Trash2 className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                How to delete your account
              </h2>
              <p className="text-gray-700">
                You can delete your HealthMind account at any time. The fastest way is inside the app. If you no longer have the app, use the form below.
              </p>
            </div>
          </div>

          <h3 className="mt-6 flex items-center gap-2 text-lg font-semibold text-gray-900">
            <Smartphone className="h-5 w-5 text-green-600" /> Option 1: Delete instantly in the app
          </h3>
          <ol className="list-decimal pl-6 space-y-2 text-gray-700 mt-3">
            {inAppSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          <p className="mt-3 text-sm text-gray-600">
            In-app deletion takes effect immediately and removes your data from our live systems right away.
          </p>

          <h3 className="mt-8 flex items-center gap-2 text-lg font-semibold text-gray-900">
            <Globe className="h-5 w-5 text-green-600" /> Option 2: Request deletion on the web
          </h3>
          <p className="mt-2 text-gray-700">
            Enter the email address you use for HealthMind. To protect you, we&apos;ll contact you at that address to confirm you own the account before anything is deleted.
          </p>
          <AccountDeletionForm />

          <div className="mt-8 bg-green-50 border border-green-100 rounded-xl p-4">
            <p className="text-gray-800 font-medium mb-2">Prefer email? Write to us at:</p>
            <p className="inline-flex items-center gap-2 text-green-700 font-semibold break-all">
              <Mail className="w-4 h-4 flex-shrink-0" />
              <a href={`mailto:${email}?subject=Account%20Deletion%20Request`} className="hover:text-green-800">
                {email}
              </a>
            </p>
            <p className="mt-2 text-sm text-gray-600">Use the subject &ldquo;Account Deletion Request&rdquo; and include the email address on your account.</p>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100"
        >
          <div className="flex items-start gap-4 mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Database className="w-5 h-5 text-green-600" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Data that will be deleted
            </h2>
          </div>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            {deletedData.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100"
        >
          <div className="flex items-start gap-4 mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-5 h-5 text-green-600" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Data that may be retained
            </h2>
          </div>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            {retainedData.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100"
        >
          <div className="flex items-start gap-4 mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Clock className="w-5 h-5 text-green-600" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Processing time
            </h2>
          </div>
          <p className="text-gray-700 mb-4">
            Deletion in the app is immediate. For web and email requests, we aim to respond within 48 hours, and after account ownership is verified, your account data will be deleted within 30 days.
          </p>
          <p className="text-gray-700">
            We do not currently keep database backups of user data, so deleted data cannot be restored.
          </p>
        </motion.section>

        <div className="pt-4 text-center">
          <Link
            href="/privacy-policy"
            className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium transition-colors"
          >
            View our Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  );
}
