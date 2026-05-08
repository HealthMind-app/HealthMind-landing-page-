"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  FileText,
  Shield,
  AlertTriangle,
  Users,
  Scale,
  Brain,
  Lock,
} from "lucide-react";

export default function TermsAndConditionsPage() {
  const sections = [
    {
      id: "introduction",
      title: "1. Introduction & Acceptance",
      icon: FileText,
      content: (
        <>
          <p>
            By downloading or using the HealthMind mobile application ("App"),
            run by HealthMind Group, you agree to these Terms and Conditions
            ("Terms"). If you don't agree, you must not use the App.
          </p>
          <p className="font-medium">These Terms apply to all users.</p>
        </>
      ),
    },
    {
      id: "eligibility",
      title: "2. Who Can Use This App",
      icon: Users,
      content: (
        <>
          <p className="mb-3">You must be:</p>
          <ul className="list-disc pl-6 space-y-1 mb-3">
            <li>At least 18 years old, or</li>
            <li>Using the App with parent or guardian permission</li>
          </ul>
          <p>
            You confirm that all information you give is accurate and legal.
          </p>
        </>
      ),
    },
    {
      id: "medical-disclaimer",
      title: "3. Medical & AI Disclaimer (IMPORTANT)",
      icon: AlertTriangle,
      content: (
        <>
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
            <p className="font-bold text-red-800 text-lg mb-3">
              ⚠️ IMPORTANT NOTICE:
            </p>
            <p className="text-red-800 mb-3">
              HealthMind helps with mental wellness and self-development using
              AI, but:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-red-800">
              <li>
                The App does <strong>NOT</strong> diagnose medical or mental
                health conditions
              </li>
              <li>
                The App does <strong>NOT</strong> replace real doctors or
                therapists
              </li>
              <li>
                All AI responses are for information only, not medical advice
              </li>
              <li>You must see a real doctor for diagnosis or treatment</li>
            </ul>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
            <p className="font-semibold text-yellow-900 mb-2">
              In an emergency or if you have thoughts of self-harm, call for
              help now:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-yellow-900">
              <li>Emergency: 112 or 999</li>
              <li>Mental Health Helpline: +256 800 100 066</li>
            </ul>
          </div>
        </>
      ),
    },
    {
      id: "account",
      title: "4. Your Account",
      icon: Lock,
      content: (
        <>
          <p className="mb-3">You are responsible for:</p>
          <ul className="list-disc pl-6 space-y-1 mb-3">
            <li>Keeping your login details secret</li>
            <li>All activity on your account</li>
          </ul>
          <p>
            HealthMind is not responsible for unauthorized access caused by your
            carelessness.
          </p>
        </>
      ),
    },
    {
      id: "conduct",
      title: "5. How to Behave",
      icon: Shield,
      content: (
        <>
          <p className="mb-3 font-medium">You agree NOT to:</p>
          <ul className="list-disc pl-6 space-y-1 mb-4">
            <li>Share harmful, illegal, abusive, or misleading content</li>
            <li>Harass, bully, threaten, or pretend to be others</li>
            <li>Misuse AI or community features</li>
            <li>Try to hack or break the App</li>
          </ul>

          <p className="mb-2 font-medium">
            Breaking these rules may result in:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Account suspension</li>
            <li>Permanent ban</li>
            <li>Legal action if needed</li>
          </ul>
        </>
      ),
    },
    {
      id: "ai-features",
      title: "6. AI Feature Use",
      icon: Brain,
      content: (
        <>
          <p className="mb-3">HealthMind's AI:</p>
          <ul className="list-disc pl-6 space-y-1 mb-4">
            <li>Creates wellbeing insights</li>
            <li>Is not perfect</li>
            <li>May give wrong or incomplete information</li>
          </ul>

          <p className="mb-4">
            You are responsible for decisions based on AI advice.
          </p>

          <div className="bg-orange-50 border-l-4 border-orange-500 p-4">
            <p className="font-semibold text-orange-800">
              ⚠️ Remember: AI is a tool to support you, not replace professional
              medical care.
            </p>
          </div>
        </>
      ),
    },
    {
      id: "intellectual-property",
      title: "7. Intellectual Property",
      icon: Scale,
      content: (
        <>
          <p className="mb-3">All content, including:</p>
          <ul className="list-disc pl-6 space-y-1 mb-4">
            <li>Logos</li>
            <li>Software</li>
            <li>Text</li>
            <li>Design</li>
            <li>AI models</li>
          </ul>

          <p className="mb-4">
            belongs to HealthMind Group and is protected by law.
          </p>

          <p className="font-semibold mb-4">
            Copyright © 2025 HealthMind Group. All rights reserved.
          </p>

          <p>
            You cannot copy, sell, or share this content without permission.
          </p>
        </>
      ),
    },
  ];

  const additionalSections = [
    {
      title: "8. Your Data",
      content: (
        <p>
          User data is handled according to our{" "}
          <Link
            href="/privacy-policy"
            className="text-green-600 hover:underline font-medium"
          >
            Privacy Policy
          </Link>
          . By using the App, you agree to how we process your data as described
          in that policy.
        </p>
      ),
    },
    {
      title: "9. Third-Party Services",
      content: (
        <>
          <p className="mb-3">The App may integrate:</p>
          <ul className="list-disc pl-6 space-y-1 mb-3">
            <li>APIs</li>
            <li>Analytics tools</li>
            <li>Payment processors</li>
          </ul>
          <p>
            HealthMind is not responsible for third-party services outside its
            control.
          </p>
        </>
      ),
    },
    {
      title: "10. App Updates",
      content: (
        <>
          <p className="mb-3">We may:</p>
          <ul className="list-disc pl-6 space-y-1 mb-3">
            <li>Update or change features</li>
            <li>Fix bugs or add security updates</li>
            <li>Remove services without notice</li>
          </ul>
          <p className="font-medium">We are NOT responsible for downtime.</p>
        </>
      ),
    },
    {
      title: "11. Closing Accounts",
      content: (
        <>
          <p className="mb-3">HealthMind can:</p>
          <ul className="list-disc pl-6 space-y-1 mb-3">
            <li>Suspend or close accounts that break the rules</li>
            <li>Remove harmful users without notice</li>
          </ul>
          <p>Users can also delete their accounts anytime.</p>
        </>
      ),
    },
    {
      title: "12. Our Limits of Responsibility",
      content: (
        <>
          <p className="mb-3">
            To the maximum extent allowed by law, HealthMind is{" "}
            <strong>NOT</strong> responsible for:
          </p>
          <ul className="list-disc pl-6 space-y-1 mb-3">
            <li>Emotional distress</li>
            <li>Data loss</li>
            <li>Financial losses</li>
            <li>Health decisions made using the App</li>
          </ul>
          <p className="font-semibold text-gray-700">
            You use the App at your own risk.
          </p>
        </>
      ),
    },
    {
      title: "13. Your Responsibility",
      content: (
        <>
          <p className="mb-3">
            You agree to protect HealthMind from any claims, damages, or legal
            actions that come from:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Your misuse of the App</li>
            <li>Breaking these Terms</li>
            <li>Harm to other users</li>
          </ul>
        </>
      ),
    },
    {
      title: "14. Governing Law & Dispute Resolution",
      content: (
        <>
          <p className="mb-4">
            These Terms follow the laws of the{" "}
            <strong>Republic of Uganda</strong>.
          </p>

          <p className="mb-4">
            If there is any dispute about the HealthMind App, both parties will
            first try to resolve it through friendly discussion.
          </p>

          <p className="mb-4">
            This does not limit any consumer protection rights or legal remedies
            in your country.
          </p>

          <p>
            HealthMind does not require mandatory arbitration where such rules
            are not allowed by law or platform policy.
          </p>
        </>
      ),
    },
    {
      title: "15. Changes to These Terms",
      content: (
        <>
          <p className="mb-3">We may update these Terms at any time.</p>
          <p>If you keep using the App, it means you accept the new Terms.</p>
        </>
      ),
    },
    {
      title: "16. Contact Information",
      content: (
        <>
          <p className="mb-4">
            For questions, concerns, or support regarding these Terms &
            Conditions:
          </p>
          <div className="bg-gray-50 p-4 rounded-lg space-y-2">
            <p>
              <strong>Email:</strong>{" "}
              <a
                href="mailto:healthmindgroup.app@gmail.com"
                className="text-green-600 hover:underline"
              >
                healthmindgroup.app@gmail.com
              </a>
            </p>
            <p>
              <strong>Phone:</strong>{" "}
              <a
                href="tel:+256761151329"
                className="text-green-600 hover:underline"
              >
                +256 761 151 329
              </a>
            </p>
            <p className="text-sm text-gray-600">
              Support Hours: Monday - Friday, 9:00 AM - 5:00 PM (EAT)
            </p>
          </div>
        </>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/30 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white py-12 sm:py-16 px-4">
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
              Terms and Conditions
            </h1>
            <p className="text-lg sm:text-xl text-white/90">
              Effective Date: December 22, 2025
            </p>
            <p className="text-sm sm:text-base text-white/80 mt-2">
              Last Updated: December 22, 2025
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12 sm:py-16">
        {/* Main Sections with Icons */}
        <div className="space-y-12">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <motion.section
                key={section.id}
                id={section.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                    {section.title}
                  </h2>
                </div>
                <div className="prose prose-gray max-w-none space-y-4 text-gray-700">
                  {section.content}
                </div>
              </motion.section>
            );
          })}

          {/* Additional Sections */}
          {additionalSections.map((section, index) => (
            <motion.section
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: (sections.length + index) * 0.1,
              }}
              className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                {section.title}
              </h2>
              <div className="prose prose-gray max-w-none space-y-4 text-gray-700">
                {section.content}
              </div>
            </motion.section>
          ))}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 pt-8 border-t border-gray-200 text-center"
        >
          <p className="text-gray-600 mb-4">
            Thank you for using HealthMind responsibly.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Return to HealthMind Home
            </Link>
            <span className="text-gray-400 hidden sm:inline">|</span>
            <Link
              href="/privacy-policy"
              className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              View Privacy Policy
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
