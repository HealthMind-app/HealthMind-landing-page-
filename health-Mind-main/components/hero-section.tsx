"use client";

import { motion } from "framer-motion";
import { Shield, BrainCircuit, Pill, Sparkles, Users } from "lucide-react";
import WaitlistForm from "./waitlist-form";
import EKGPulseLine from "./ekg-pulse-line";
import AnimatedHeart from "./animated-heart";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-4 py-20 sm:py-32 overflow-hidden mt-16 sm:mt-20"
    >
      {/* Background Motion Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-10 sm:top-20 right-5 sm:right-10 w-40 sm:w-72 h-40 sm:h-72 bg-gradient-to-br from-[#1E6FFB]/15 to-[#1AD4B8]/15 rounded-full blur-3xl"
          animate={{ y: [0, 50, 0] }}
          transition={{ duration: 9, repeat: Number.POSITIVE_INFINITY }}
        />
        <motion.div
          className="absolute bottom-10 sm:bottom-20 left-5 sm:left-10 w-40 sm:w-72 h-40 sm:h-72 bg-gradient-to-br from-[#1AD4B8]/15 to-[#1E6FFB]/15 rounded-full blur-3xl"
          animate={{ y: [0, -50, 0] }}
          transition={{
            duration: 9,
            repeat: Number.POSITIVE_INFINITY,
            delay: 1,
          }}
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
          wellness, and get personalized health insights all powered by
          intelligent and secure AI built for modern living.
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

        {/* Waitlist Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8 sm:mb-12"
        >
          <WaitlistForm />
        </motion.div>

        {/* Social Proof */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xs sm:text-sm font-semibold text-[#1E6FFB] mb-8 sm:mb-10 flex justify-center items-center gap-2 flex-wrap"
        >
          <Users className="w-4 h-4 flex-shrink-0" />
          <span>4,000+ people already joined this month</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 text-xs sm:text-sm text-[#575757] flex-wrap"
        >
          <div className="flex items-center gap-2">
            <BrainCircuit className="w-4 h-4 sm:w-5 sm:h-5 text-[#22C55E] flex-shrink-0" />
            <span>AI Health Insights</span>
          </div>
          <div className="flex items-center gap-2">
            <Pill className="w-4 h-4 sm:w-5 sm:h-5 text-[#22C55E] flex-shrink-0" />
            <span>Medication Reminders</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-[#22C55E] flex-shrink-0" />
            <span>End-to-End Encrypted</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#22C55E] flex-shrink-0" />
            <span>Personalized Care Guidance</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
