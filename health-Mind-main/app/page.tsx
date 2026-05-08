"use client";

import { motion } from "framer-motion";
import { ArrowRight, BrainCircuit, Shield, Sparkles, Users, Star } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import FeaturesSection from "@/components/features-section";
import WaitlistForm from "@/components/waitlist-form";
import EKGPulseLine from "@/components/ekg-pulse-line";
import AnimatedHeart from "@/components/animated-heart";

const testimonials = [
  {
    quote: "HealthMind has completely transformed how I manage my wellness.",
    author: "Sarah N.",
    role: "Health Enthusiast",
  },
  {
    quote: "Finally, an app that understands health management complexity.",
    author: "Dr. Michael K.",
    role: "Healthcare Professional",
  },
  {
    quote: "Like having a dedicated health coach available 24/7.",
    author: "Joshua O.",
    role: "Tech Professional",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center px-4 py-20 sm:py-32 overflow-hidden mt-16 sm:mt-20"
      >
        {/* Background Motion Blobs */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-10 sm:top-20 right-5 sm:right-10 w-40 sm:w-72 h-40 sm:h-72 bg-gradient-to-br from-[#1E6FFB]/15 to-[#1AD4B8]/15 rounded-full blur-3xl"
            animate={{ y: [0, 50, 0] }}
            transition={{ duration: 9, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-10 sm:bottom-20 left-5 sm:left-10 w-40 sm:w-72 h-40 sm:h-72 bg-gradient-to-br from-[#1AD4B8]/15 to-[#1E6FFB]/15 rounded-full blur-3xl"
            animate={{ y: [0, -50, 0] }}
            transition={{ duration: 9, repeat: Infinity, delay: 1 }}
          />
        </div>

        <div className="max-w-5xl w-full relative z-10 text-center">
          {/* Animated Heart */}
          <div className="flex justify-center mb-6 sm:mb-10">
            <AnimatedHeart />
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight text-[#0A0A0A] text-pretty mb-4 sm:mb-6"
          >
            Your Personalized AI{" "}
            <span className="bg-gradient-to-r from-[#1E6FFB] to-[#1AD4B8] bg-clip-text text-transparent">
              Mental Health Companion
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85 }}
            className="text-sm sm:text-base md:text-lg font-semibold bg-gradient-to-r from-[#1E6FFB] to-[#1AD4B8] bg-clip-text text-transparent mb-6 sm:mb-8"
          >
            Your Health, Your Mind, Your Future.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="text-base sm:text-lg md:text-xl text-[#575757] max-w-2xl mx-auto leading-relaxed text-pretty mb-8 sm:mb-10"
          >
            Understand symptoms instantly, stay on top of medications, track your
            wellness, and get personalized health insights powered by secure AI.
          </motion.p>

          {/* Animated EKG Divider */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mb-8 sm:mb-10"
          >
            <EKGPulseLine />
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
          >
            <Link
              href="/download"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#1E6FFB] to-[#1AD4B8] text-white font-semibold shadow-lg hover:shadow-xl transition-shadow"
            >
              Download Now
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/about"
              className="text-[#575757] hover:text-[#1E6FFB] font-medium transition-colors"
            >
              Learn Our Story →
            </Link>
          </motion.div>

          {/* Social Proof */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xs sm:text-sm font-semibold text-[#1E6FFB] mb-8 sm:mb-10 flex justify-center items-center gap-2"
          >
            <Users className="w-4 h-4 flex-shrink-0" />
            <span>4,000+ people already joined this month</span>
          </motion.p>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 text-xs sm:text-sm text-[#575757]"
          >
            <div className="flex items-center gap-2">
              <BrainCircuit className="w-4 h-4 sm:w-5 sm:h-5 text-[#22C55E] flex-shrink-0" />
              <span>AI Health Insights</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-[#22C55E] flex-shrink-0" />
              <span>End-to-End Encrypted</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#22C55E] flex-shrink-0" />
              <span>Personalized Care</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <FeaturesSection />

      {/* Testimonials Teaser */}
      <section className="py-12 sm:py-16 px-4 bg-[#F9FAFB]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0A0A0A] mb-2">
              Trusted by Forward-Thinking People
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8">
            {testimonials.map((testimonial, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="bg-white rounded-xl p-5 border border-[#E5E7EB]"
              >
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-[#575757] text-sm mb-3">&ldquo;{testimonial.quote}&rdquo;</p>
                <p className="font-semibold text-[#0A0A0A] text-sm">{testimonial.author}</p>
                <p className="text-xs text-[#999]">{testimonial.role}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/download"
              className="text-[#1E6FFB] hover:text-[#0B5EDC] font-medium"
            >
              See more reviews →
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section id="waitlist" className="py-16 sm:py-20 px-4 bg-gradient-to-r from-[#1E6FFB] to-[#1AD4B8]">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Transform Your Mental Health?
            </h2>
            <p className="text-white/90 mb-8">
              Download HealthMind today or join our waitlist for exclusive updates.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <a
                href="https://play.google.com/store/apps/details?id=com.healthmind.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-white text-[#1E6FFB] font-semibold shadow-lg hover:shadow-xl transition-shadow"
              >
                Download for Android
              </a>
              <span className="text-white/80 text-sm">or</span>
            </div>

            <WaitlistForm />
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

