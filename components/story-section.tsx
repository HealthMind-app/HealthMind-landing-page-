"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function StorySection() {
  return (
    <section
      id="story"
      className="py-20 sm:py-32 px-4 bg-gradient-to-b from-green-50/30 via-white to-green-50/30 relative overflow-hidden"
    >
      {/* Soft decorative background */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-40 left-20 w-96 h-96 bg-green-300 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-20 w-80 h-80 bg-blue-300 rounded-full blur-3xl" />
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm border border-green-100 mb-6">
            <Heart className="w-4 h-4 text-green-600 fill-green-600" />
            <span className="text-sm font-medium text-green-700">
              Our Story
            </span>
          </div>
          {/* <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0A0A0A] mb-4 leading-tight">
            HealthMind Brand Story
          </h2> */}
        </motion.div>

        {/* Single flowing story content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="prose prose-lg max-w-none"
        >
          {/* <div className="text-base sm:text-lg leading-relaxed text-[#2a2a2a] space-y-6 font-light"> */}
          <div className="text-base sm:text-lg leading-relaxed text-[#2a2a2a] space-y-6 font-light">
            <p>
              HealthMind was born from a simple but painful truth:{" "}
              <span className="font-medium text-green-700">
                Too many people carry their struggles in silence.
              </span>{" "}
              In a world that moves fast and demands strength, millions wake up
              every day feeling overwhelmed, unheard, or emotionally
              exhausted—yet help often feels distant, expensive, stigmatized, or
              unavailable at the moment it's needed most.
            </p>

            <p className="italic text-[#3a3a3a]">
              We saw the quiet moments no one talks about. The late nights when
              thoughts feel heavier. The mornings when getting out of bed takes
              more courage than anyone realizes.{" "}
              <span className="not-italic font-semibold text-green-700">
                HealthMind exists for those moments.
              </span>
            </p>

            <p>
              We built HealthMind to be a{" "}
              <span className="font-semibold text-green-700">
                personalized, private, and supportive
              </span>{" "}
              mental health companion—one that listens without judgment,
              responds with care, and meets people exactly where they are,
              whenever they need support.
            </p>

            <p>
              At the heart of HealthMind is{" "}
              <span className="font-semibold text-green-700">Alverna AI</span>,
              designed not to replace human care, but to stand beside
              it—offering daily emotional support, mood awareness, thoughtful
              journaling, smart medication reminders, and emergency-first safety
              flows when it matters most.
            </p>

            <p>
              Every interaction is built with empathy. Every feature is guided
              by responsibility. Every decision is shaped by respect for
              privacy, dignity, and trust.
            </p>

            <p>
              We believe mental well-being should not be a privilege.{" "}
              <span className="font-medium text-green-700">
                It should be accessible, human, and safe.
              </span>{" "}
              That's why HealthMind is designed with strong encryption,
              transparent data practices, and user-first protections—because
              mental health support begins with trust.
            </p>

            <p className="text-lg sm:text-xl font-medium text-[#0A0A0A] pt-4">
              HealthMind is not just an app.{" "}
              <span className="text-green-700">
                It is a reminder that you are not alone, that your feelings
                matter, and that support should be there before things become
                overwhelming—not after.
              </span>
            </p>

            <p>
              We are deeply grateful to every user who trusts HealthMind with
              their journey. Your courage, honesty, and presence are the reason
              HealthMind exists.
            </p>

            <p className="font-medium text-[#0A0A0A]">
              This is more than technology. This is care—reimagined for everyday
              life.
            </p>

            <p className="text-xl sm:text-2xl md:text-3xl font-bold text-center bg-gradient-to-r from-green-600 via-green-500 to-blue-500 bg-clip-text text-transparent pt-8">
              Welcome to HealthMind.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
