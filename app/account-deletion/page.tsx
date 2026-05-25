"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Mail, ShieldCheck, Trash2, Clock, Database } from "lucide-react";

export default function AccountDeletionPage() {
  const email = "healthmindgroup.app@gmail.com";

  const steps = [
    "Open your email app and send a message to healthmindgroup.app@gmail.com.",
    "Use the subject line: Account Deletion Request.",
    "Include the email address or phone number connected to your HealthMind account.",
    "We may ask you to verify ownership of the account before deletion is completed.",
  ];

  const deletedData = [
    "Account profile information, including name and contact details",
    "Mood tracking entries, wellness check-ins, and habit tracking data",
    "Journal entries, notes, and AI chatbot conversation history",
    "Medication reminders, self-assessment answers, and app preferences",
  ];

  const retainedData = [
    "Records required for legal, fraud prevention, tax, payment, or security purposes",
    "Anonymized analytics that can no longer identify you",
    "Backup copies for up to 90 days before automatic removal from backup systems",
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
              Last Updated: May 25, 2026
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
                How to request account deletion
              </h2>
              <p className="text-gray-700">
                If you created a HealthMind account, you can request deletion at any time by contacting our support team.
              </p>
            </div>
          </div>
          <ol className="list-decimal pl-6 space-y-3 text-gray-700 mt-6">
            {steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          <div className="mt-6 bg-green-50 border border-green-100 rounded-xl p-4">
            <p className="text-gray-800 font-medium mb-3">Send your request to:</p>
            <a
              href={`mailto:${email}?subject=Account%20Deletion%20Request`}
              className="inline-flex items-center gap-2 text-green-700 hover:text-green-800 font-semibold break-all"
            >
              <Mail className="w-4 h-4 flex-shrink-0" />
              {email}
            </a>
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
            We aim to respond to account deletion requests within 48 hours. After account ownership is verified, most account data will be deleted within 30 days.
          </p>
          <p className="text-gray-700">
            Some deleted data may remain in encrypted backups for up to 90 days before automatic removal from backup systems.
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
