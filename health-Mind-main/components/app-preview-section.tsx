"use client";

import { motion } from "framer-motion";

export default function AppPreviewSection() {
  return (
    <section className="py-16 sm:py-24 px-4 bg-gradient-to-b from-white to-[#F5F8FE]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-[#0A0A0A] mb-2 sm:mb-4 text-pretty tracking-tight">
            A New Kind of Health Experience
          </h2>
          <p className="text-base sm:text-xl text-[#575757]">
            Intelligent. Connected. Personalized.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex justify-center"
        >
          <div className="relative w-full max-w-2xl">
            {/* Main Preview Card */}
            <div className="w-full min-h-[320px] bg-gradient-to-br from-[#1E6FFB] via-[#0B5EDC] to-[#1AD4B8] rounded-2xl sm:rounded-3xl flex items-center justify-center text-white p-4 sm:p-8 shadow-2xl overflow-hidden">
              {/* Background animation elements */}
              <motion.div
                className="absolute inset-0 opacity-20"
                animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
                transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
                style={{
                  backgroundImage:
                    "radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)",
                  backgroundSize: "50px 50px",
                }}
              />

              <div className="relative z-10 text-center">
                <p className="text-lg sm:text-2xl font-semibold mb-3">
                  A Note From the Founder
                </p>
                <div className="text-xs sm:text-sm leading-relaxed text-white/90 space-y-3 max-w-xl mx-auto">
                  <p>
                    HealthMind was created with care, intention, and deep
                    respect for the quiet struggles people carry every day.
                  </p>
                  <p>
                    I built HealthMind because too many people feel they have to
                    face their emotions alone—especially in moments when
                    speaking out feels difficult. This space exists to offer
                    personalized, private, and supportive mental health
                    guidance, without judgment and without pressure.
                  </p>
                  <p>
                    “Mental health is the foundational infrastructure to human
                    progress”
                  </p>
                  <p className="text-white font-semibold">Joshua Ahabwe</p>
                  <p className="font-semibold text-white">
                    — Founder, HealthMind
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      z
    </section>
  );
}
