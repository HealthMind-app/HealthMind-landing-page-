"use client";

import { motion } from "framer-motion";
import { Gift, Zap, Users, ArrowLeft, Download, Star } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import WaitlistForm from "@/components/waitlist-form";

const benefits = [
  {
    icon: Gift,
    title: "Early Access",
    desc: "Get priority onboarding and exclusive beta features first.",
  },
  {
    icon: Zap,
    title: "Lifetime Benefits",
    desc: "Early users receive special pricing and premium features forever.",
  },
  {
    icon: Users,
    title: "Limited Slots",
    desc: "Only 1,000 founding members will get these exclusive perks.",
  },
];

const testimonials = [
  {
    quote:
      "HealthMind has completely transformed how I manage my wellness. The AI insights are incredible.",
    author: "Sarah Nakimuli",
    role: "Health Enthusiast",
  },
  {
    quote:
      "Finally, an app that understands the complexity of health management. Highly recommended.",
    author: "Dr. Michael Kato",
    role: "Healthcare Professional",
  },
  {
    quote:
      "The personalization is unmatched. It feels like having a dedicated health coach available 24/7.",
    author: "Joshua Owiny",
    role: "Tech Professional",
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
              Join thousands who are already taking control of their mental
              health with AI-powered personalized support.
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
              Why Join Today?
            </h2>
            <p className="text-[#575757]">
              Early adopters get exclusive benefits and lifetime advantages.
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

      {/* Social Proof */}
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
              Trusted by Forward-Thinking People
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {testimonials.map((testimonial, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="bg-white rounded-xl p-6 border border-[#E5E7EB]"
              >
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-[#575757] mb-4 text-sm leading-relaxed">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div>
                  <p className="font-semibold text-[#0A0A0A] text-sm">
                    {testimonial.author}
                  </p>
                  <p className="text-xs text-[#999]">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
