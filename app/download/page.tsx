"use client";

import { motion } from "framer-motion";
import { ShieldCheck, BarChart3, Smartphone, ArrowLeft, Download } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import WaitlistForm from "@/components/waitlist-form";

const benefits = [
  {
    icon: Smartphone,
    title: "Available on Android",
    desc: "Install HealthMind from its official Google Play listing.",
  },
  {
    icon: ShieldCheck,
    title: "Privacy-conscious reporting",
    desc: "Public impact reporting uses only approved aggregates, never personal wellness content.",
  },
  {
    icon: BarChart3,
    title: "Transparent impact",
    desc: "Verified metrics include a reporting period, source, and measurement method.",
  },
];

export default function DownloadPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-16 px-4 bg-gradient-to-r from-[#1E6FFB] to-[#1AD4B8]">
        <div className="max-w-4xl mx-auto text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-white/80 font-medium mb-2">NOW AVAILABLE</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Get HealthMind Today
            </h1>
            <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Download HealthMind from its official Android listing for
              personalized wellness tools and support resources.
            </p>

            <motion.a
              href="https://play.google.com/store/apps/details?id=com.healthmind.app"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-[#1E6FFB] font-semibold shadow-lg"
            >
              <Download className="w-5 h-5" />
              Download for Android
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-12 sm:py-16 px-4 bg-gradient-to-r from-[#1E6FFB]/5 to-[#1AD4B8]/5">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8 sm:mb-10"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0A0A0A] mb-2">
              What to expect
            </h2>
            <p className="text-[#575757]">
              Clear product access and transparent public reporting.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {benefits.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="bg-white rounded-xl p-6 text-center border border-[#E5E7EB]"
              >
                <item.icon className="w-8 h-8 text-[#1E6FFB] mx-auto mb-3" />
                <h3 className="font-bold text-[#0A0A0A] mb-2">{item.title}</h3>
                <p className="text-sm text-[#575757]">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Waitlist Section */}
      <section className="py-12 sm:py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0A0A0A] mb-4">
              Can&apos;t Download Now?
            </h2>
            <p className="text-[#575757] mb-8">
              Join our waitlist and be the first to know when we launch on iOS
              and new features drop.
            </p>
            <WaitlistForm />
          </motion.div>
        </div>
      </section>

      {/* Publication standards */}
      <section className="py-12 sm:py-16 px-4 bg-[#F9FAFB]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0A0A0A] mb-2">
              Community stories require review
            </h2>
          </motion.div>

          <div className="mx-auto max-w-3xl rounded-2xl border border-[#E5E7EB] bg-white p-6 text-center sm:p-8">
            <p className="leading-7 text-[#575757]">HealthMind will publish testimonials, names, photographs, and organizational affiliations only after their accuracy and publication permission are confirmed. No illustrative review is presented as a real user statement.</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
