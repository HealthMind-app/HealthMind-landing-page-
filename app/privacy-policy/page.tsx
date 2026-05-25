"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Shield,
  Lock,
  Eye,
  UserCheck,
  Database,
  Globe,
} from "lucide-react";

export default function PrivacyPolicyPage() {
  const sections = [
    {
      id: "introduction",
      title: "1. Introduction",
      icon: Shield,
      content: (
        <>
          <p>
            HealthMind ("we", "our", "us") operates the HealthMind mobile
            application ("App"). This Privacy Policy explains how we collect,
            use, store, protect, and share your personal information when you
            use the App.
          </p>
          <p>
            We are committed to protecting your privacy and keeping your data
            safe. By using HealthMind, you agree to the data practices described
            in this policy.
          </p>
        </>
      ),
    },
    {
      id: "information-collect",
      title: "2. Information We Collect",
      icon: Database,
      content: (
        <>
          <p className="font-medium mb-4">
            We collect different types of information to provide and improve our
            services.
          </p>

          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-green-700 mb-3">
                a. Personal Information (Initial Phase: No Account Credentials)
              </h4>
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-4">
                <p className="font-semibold text-yellow-800">
                  IMPORTANT: Until April 2026, we do NOT collect account
                  credentials (usernames, passwords).
                </p>
              </div>
              <p className="mb-2">
                During this initial phase, we only collect:
              </p>
              <ul className="list-disc pl-6 space-y-1 mb-4">
                <li>
                  Name (optional) - if you choose to personalize your experience
                </li>
                <li>Email (optional) - only if you contact support</li>
                <li>Phone number (optional) - only if you contact support</li>
                <li>
                  Age range or date of birth (optional) - for age-appropriate
                  content
                </li>
              </ul>
              <p className="mb-2 font-medium">Starting April 2026:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Email address (for account creation)</li>
                <li>Password (encrypted)</li>
                <li>Profile information (name, age, preferences)</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-green-700 mb-3">
                b. Health & Wellness Data
              </h4>
              <p className="mb-2">
                To provide you with personalized mental health support, we
                collect:
              </p>
              <ul className="list-disc pl-6 space-y-1 mb-3">
                <li>Mood tracking entries</li>
                <li>Symptoms you record (anxiety, stress, sleep, etc.)</li>
                <li>Wellness check-in answers</li>
                <li>Journal entries and notes</li>
                <li>AI chatbot conversations</li>
                <li>Medication reminders and logs</li>
                <li>Self-assessment answers</li>
                <li>Activity and habit tracking</li>
              </ul>
              <p className="text-sm italic text-gray-600">
                This data is stored securely and used only to provide
                personalized insights and improve your experience.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-green-700 mb-3">
                c. Automatically Collected Technical Data
              </h4>
              <p className="mb-2">
                When you use the App, we automatically collect:
              </p>
              <ul className="list-disc pl-6 space-y-1 mb-3">
                <li>Device information (type, model, operating system)</li>
                <li>App version and build number</li>
                <li>
                  Usage analytics (features used, time spent, navigation
                  patterns)
                </li>
                <li>Crash reports and error logs</li>
                <li>IP address and general location (city/country level)</li>
                <li>Device identifiers (for analytics and support)</li>
                <li>Network information (Wi-Fi vs mobile data)</li>
              </ul>
              <p className="text-sm italic text-gray-600">
                This data helps us improve app performance, fix bugs, and
                enhance user experience.
              </p>
            </div>
          </div>
        </>
      ),
    },
    {
      id: "how-we-use",
      title: "3. How We Use Your Information",
      icon: Eye,
      content: (
        <>
          <p className="mb-3">
            We use the collected information for the following purposes:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>To provide core App functionality and features</li>
            <li>To personalize your wellness insights and recommendations</li>
            <li>To track your mental health progress over time</li>
            <li>To improve AI chatbot responses and accuracy</li>
            <li>To provide customer support and respond to inquiries</li>
            <li>To enhance and optimize App performance</li>
            <li>To analyze usage patterns and improve features</li>
            <li>
              To send important notifications (medication reminders, wellness
              check-ins)
            </li>
            <li>To ensure security and prevent misuse</li>
            <li>To comply with legal obligations</li>
            <li>
              To conduct research for App improvement (anonymized data only)
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "data-protection",
      title: "4. Data Protection & Security",
      icon: Lock,
      content: (
        <>
          <p className="mb-4">
            We implement industry-standard security measures to protect your
            data:
          </p>

          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-green-700 mb-2">Encryption:</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  All data transmitted between your device and our servers is
                  encrypted using TLS/SSL
                </li>
                <li>
                  Data stored on our servers is encrypted at rest using AES-256
                  encryption
                </li>
                <li>
                  Sensitive information (if applicable) is additionally
                  encrypted
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-green-700 mb-2">
                Secure Infrastructure:
              </h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>Data stored on secure, trusted cloud platforms</li>
                <li>Regular security audits and vulnerability assessments</li>
                <li>Firewall protection and intrusion detection systems</li>
                <li>Automated backups with secure storage</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-green-700 mb-2">
                Access Controls:
              </h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>Strict access controls limiting who can view your data</li>
                <li>Multi-factor authentication for internal systems</li>
                <li>Regular employee security training</li>
                <li>Data access logging and monitoring</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-green-700 mb-2">
                Regular Audits:
              </h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>Periodic security reviews and penetration testing</li>
                <li>Compliance monitoring and updates</li>
                <li>Incident response procedures</li>
              </ul>
            </div>
          </div>
        </>
      ),
    },
    {
      id: "sharing",
      title: "5. Sharing of Information",
      icon: Globe,
      content: (
        <>
          <p className="mb-4">
            We respect your privacy and limit data sharing. Your information may
            be shared with:
          </p>

          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-green-700 mb-2">
                Trusted Service Providers:
              </h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>Cloud hosting services (AWS, Google Cloud, etc.)</li>
                <li>Analytics platforms (Firebase, Mixpanel, etc.)</li>
                <li>Customer support tools</li>
                <li>Payment processors (for premium features)</li>
                <li>
                  These providers are contractually bound to protect your data
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-green-700 mb-2">
                Development & Improvement:
              </h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>Aggregated, anonymized data for AI model improvement</li>
                <li>
                  Statistical analysis and research (no personal identifiers)
                </li>
                <li>Internal team members for App development and support</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-green-700 mb-2">
                Legal Requirements:
              </h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  Law enforcement or government authorities when legally
                  required
                </li>
                <li>To protect our rights, property, or safety</li>
                <li>To enforce our Terms & Conditions</li>
                <li>In case of business transfer or merger</li>
              </ul>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-4">
              <h4 className="font-semibold text-green-800 mb-2">WE DO NOT:</h4>
              <ul className="list-disc pl-6 space-y-1 text-green-800">
                <li>Sell your personal data to third parties</li>
                <li>Share identifiable health data with advertisers</li>
                <li>Use your data for marketing unrelated products</li>
                <li>Share your journal entries or private conversations</li>
              </ul>
            </div>
          </div>
        </>
      ),
    },
    {
      id: "rights",
      title: "6. Your Privacy Rights",
      icon: UserCheck,
      content: (
        <>
          <p className="mb-3">
            You have the following rights regarding your personal data:
          </p>
          <ul className="space-y-3">
            <li>
              <strong>Access:</strong> Request a copy of the data we hold about
              you
            </li>
            <li>
              <strong>Correction:</strong> Update or correct inaccurate
              information
            </li>
            <li>
              <strong>Deletion:</strong> Request deletion of your personal data
              ("Right to be Forgotten")
              <br />
              <span className="text-sm text-gray-600">
                Note: Some data may be retained for legal or security purposes
              </span>
            </li>
            <li>
              <strong>Data Portability:</strong> Export your data in a
              machine-readable format
            </li>
            <li>
              <strong>Withdrawal of Consent:</strong> Opt-out of optional data
              collection
            </li>
            <li>
              <strong>Processing Restriction:</strong> Limit how we process your
              data
            </li>
            <li>
              <strong>Object:</strong> Object to certain types of data
              processing
            </li>
          </ul>
          <p className="mt-4 font-medium">
            To exercise these rights, contact us at:{" "}
            <a
              href="mailto:healthmindgroup.app@gmail.com"
              className="text-green-600 hover:underline"
            >
              healthmindgroup.app@gmail.com
            </a>
          </p>
        </>
      ),
    },
  ];

  const additionalSections = [
    {
      title: "7. AI Features & Data Processing",
      content: (
        <>
          <p className="mb-4">
            HealthMind uses artificial intelligence to provide personalized
            mental wellness support:
          </p>

          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-green-700 mb-2">
                How AI Uses Your Data:
              </h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  Your conversations with the AI chatbot are processed to
                  generate responses
                </li>
                <li>
                  Mood patterns are analyzed to provide insights and trends
                </li>
                <li>Wellness data is used to personalize recommendations</li>
                <li>Anonymized data may be used to improve AI models</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-green-700 mb-2">
                Important AI Privacy Safeguards:
              </h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  Your data is processed ONLY to deliver HealthMind services
                </li>
                <li>
                  We do NOT use your data to train external third-party AI
                  models
                </li>
                <li>
                  AI responses are generated in real-time and not shared with
                  others
                </li>
                <li>Sensitive conversations are encrypted and protected</li>
                <li>You can delete AI chat history at any time</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-green-700 mb-2">
                AI Limitations:
              </h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  AI may not always be accurate or appropriate for your
                  situation
                </li>
                <li>AI does not replace professional mental health care</li>
                <li>
                  AI-generated advice should not be followed in emergencies
                </li>
              </ul>
            </div>
          </div>
        </>
      ),
    },
    {
      title: "8. Children's Privacy",
      content: (
        <>
          <p className="mb-3 font-semibold">
            HealthMind is NOT intended for users under the age of 13.
          </p>
          <ul className="list-disc pl-6 space-y-1 mb-4">
            <li>
              We do not knowingly collect personal information from children
              under 13
            </li>
            <li>
              If we discover that a child under 13 has provided personal data,
              we will delete it immediately
            </li>
            <li>
              Parents or guardians who believe their child has provided
              information should contact us at{" "}
              <a
                href="mailto:healthmindgroup.app@gmail.com"
                className="text-green-600 hover:underline"
              >
                healthmindgroup.app@gmail.com
              </a>
            </li>
          </ul>
          <p className="mb-2 font-medium">For users aged 13-17:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Parental or guardian consent is recommended</li>
            <li>Age-appropriate content and features are provided</li>
            <li>Additional privacy protections may apply</li>
          </ul>
        </>
      ),
    },
    {
      title: "9. Data Retention",
      content: (
        <>
          <p className="mb-3">
            We retain your data for as long as necessary to provide services and
            comply with legal obligations:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Active accounts: Data retained while you use the App</li>
            <li>
              Inactive accounts: Data may be deleted after 12 months of
              inactivity
            </li>
            <li>Deleted accounts: Most data deleted within 30 days</li>
            <li>
              Backups: Deleted data may remain in backups for up to 90 days
            </li>
            <li>
              Legal requirements: Some data retained longer for compliance
            </li>
            <li>Anonymized analytics: May be retained indefinitely</li>
          </ul>
        </>
      ),
    },
    {
      title: "10. International Data Transfers",
      content: (
        <>
          <p className="mb-3">
            Your data may be transferred to and processed in countries outside
            of Uganda:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>We use trusted cloud providers with global infrastructure</li>
            <li>Data transfers comply with applicable privacy laws</li>
            <li>Adequate safeguards are in place (encryption, contracts)</li>
            <li>Your data is protected regardless of location</li>
          </ul>
        </>
      ),
    },
    {
      title: "11. Cookies & Tracking Technologies",
      content: (
        <>
          <p className="mb-3">
            The App may use cookies and similar technologies:
          </p>
          <ul className="list-disc pl-6 space-y-1 mb-3">
            <li>Essential cookies: Required for App functionality</li>
            <li>Analytics cookies: Help us understand usage patterns</li>
            <li>Preference cookies: Remember your settings</li>
          </ul>
          <p>You can manage cookie preferences in your device settings.</p>
        </>
      ),
    },
    {
      title: "12. Changes to This Privacy Policy",
      content: (
        <>
          <p className="mb-3">
            We may update this Privacy Policy from time to time to reflect:
          </p>
          <ul className="list-disc pl-6 space-y-1 mb-4">
            <li>Changes in our data practices</li>
            <li>New features or services</li>
            <li>Legal or regulatory requirements</li>
            <li>User feedback and improvements</li>
          </ul>
          <p className="mb-2 font-medium">When we make changes:</p>
          <ul className="list-disc pl-6 space-y-1 mb-3">
            <li>The "Effective Date" at the top will be updated</li>
            <li>We will notify you via the App or email</li>
            <li>Material changes will require your consent</li>
            <li>Previous versions will be archived for reference</li>
          </ul>
          <p className="italic">
            We encourage you to review this policy periodically.
          </p>
        </>
      ),
    },
    {
      title: "13. Contact Us",
      content: (
        <>
          <p className="mb-4">
            If you have questions, concerns, or requests regarding this Privacy
            Policy or your personal data:
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
            <p>
              <strong>Website:</strong>{" "}
              <a
                href="http://www.healthmindgroup.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:underline"
              >
                www.healthmindgroup.com
              </a>
            </p>
            <p className="text-sm text-gray-600">
              Support Hours: Monday - Friday, 9:00 AM - 5:00 PM (EAT)
            </p>
          </div>
          <p className="mt-4 text-sm italic">
            We aim to respond to all inquiries within 48 hours.
          </p>
        </>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50/30 to-white">
      {/* Header */}
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
              Privacy Policy
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
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-green-600" />
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
            Thank you for trusting HealthMind with your mental wellness journey.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Return to HealthMind Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
