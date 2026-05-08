"use client";

import { motion } from "framer-motion";
import { Heart, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Header */}
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-16 px-4 bg-gradient-to-b from-green-50/30 to-white">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#575757] hover:text-[#1E6FFB] transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm border border-green-100 mb-6">
              <Heart className="w-4 h-4 text-green-600 fill-green-600" />
              <span className="text-sm font-medium text-green-700">
                Our Story
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0A0A0A] mb-4">
              Why We Built HealthMind
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Story Content */}
      <section className="py-12 sm:py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8 text-[#2a2a2a]"
          >
            <p className="text-lg sm:text-xl leading-relaxed">
              HealthMind was born from a simple but painful truth:{" "}
              <span className="font-medium text-green-700">
                Too many people carry their struggles in silence.
              </span>{" "}
              In a world that moves fast and demands strength, millions wake up
              every day feeling overwhelmed, unheard, or emotionally
              exhausted—yet help often feels distant, expensive, stigmatized, or
              unavailable at the moment it's needed most.
            </p>

            <p className="text-lg sm:text-xl leading-relaxed italic text-[#3a3a3a]">
              We saw the quiet moments no one talks about. The late nights when
              thoughts feel heavier. The mornings when getting out of bed takes
              more courage than anyone realizes.{" "}
              <span className="not-italic font-semibold text-green-700">
                HealthMind exists for those moments.
              </span>
            </p>

            <p className="text-lg sm:text-xl leading-relaxed">
              We built HealthMind to be a{" "}
              <span className="font-semibold text-green-700">
                personalized, private, and supportive
              </span>{" "}
              mental health companion—one that listens without judgment,
              responds with care, and meets people exactly where they are,
              whenever they need support.
            </p>

            <div className="bg-gradient-to-br from-[#1E6FFB] via-[#0B5EDC] to-[#1AD4B8] rounded-2xl sm:rounded-3xl p-6 sm:p-10 text-white my-12">
              <p className="text-lg sm:text-2xl font-semibold mb-4">
                A Note From the Founder
              </p>
              <div className="text-sm sm:text-base leading-relaxed text-white/90 space-y-4">
                <p>
                  HealthMind was created with care, intention, and deep respect
                  for the quiet struggles people carry every day.
                </p>
                <p>
                  I built HealthMind because too many people feel they have to
                  face their emotions alone—especially in moments when speaking
                  out feels difficult. This space exists to offer personalized,
                  private, and supportive mental health guidance, without
                  judgment and without pressure.
                </p>
                <p className="font-semibold text-lg">
                  &ldquo;Mental health is the foundational infrastructure to
                  human progress&rdquo;
                </p>
                <p className="text-white font-semibold">Joshua Ahabwe</p>
                <p className="font-semibold">— Founder, HealthMind</p>
              </div>
            </div>

            <p className="text-lg sm:text-xl leading-relaxed">
              At the heart of HealthMind is{" "}
              <span className="font-semibold text-green-700">Alverna AI</span>,
              designed not to replace human care, but to stand beside it—
              offering daily emotional support, mood awareness, thoughtful
              journaling, smart medication reminders, and emergency-first safety
              flows when it matters most.
            </p>

            <p className="text-lg sm:text-xl leading-relaxed">
              We believe mental well-being should not be a privilege.{" "}
              <span className="font-medium text-green-700">
                It should be accessible, human, and safe.
              </span>{" "}
              That's why HealthMind is designed with strong encryption,
              transparent data practices, and user-first protections—because
              mental health support begins with trust.
            </p>

            <p className="text-xl sm:text-2xl font-medium text-[#0A0A0A] pt-4">
              HealthMind is not just an app.{" "}
              <span className="text-green-700">
                It is a reminder that you are not alone, that your feelings
                matter, and that support should be there before things become
                overwhelming—not after.
              </span>
            </p>

            <p className="text-2xl sm:text-3xl font-bold text-center bg-gradient-to-r from-green-600 via-green-500 to-blue-500 bg-clip-text text-transparent pt-8">
              Welcome to HealthMind.
            </p>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12"
          >
            <Link
              href="/download"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-gradient-to-r from-[#1E6FFB] to-[#1AD4B8] text-white font-semibold shadow-lg hover:shadow-xl transition-shadow"
            >
              Get HealthMind Today
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
