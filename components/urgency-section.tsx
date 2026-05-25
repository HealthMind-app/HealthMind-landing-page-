"use client";

import { motion } from "framer-motion";
import { Gift, Zap, Users } from "lucide-react";

export default function UrgencySection() {
  return (
    <section className="py-12 sm:py-16 px-4 bg-gradient-to-r from-[#1E6FFB]/5 to-[#1AD4B8]/5">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-6 sm:mb-8"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0A0A0A] mb-2 sm:mb-4 text-pretty tracking-tight">
            Why Join Today?
          </h2>
          <p className="text-xs sm:text-base text-[#575757]">
            Early adopters get exclusive benefits and lifetime advantages.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {[
            {
              icon: Gift,
              title: "Early Access",
              desc: "Get priority onboarding and exclusive beta features first.",
            },
            {
              icon: Zap,
              title: "Lifetime Benefits",
              desc: "Early users receive special pricing and premium features.",
            },
            {
              icon: Users,
              title: "Limited Slots",
              desc: "Only 1000 founding members will get these exclusive perks.",
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="bg-white rounded-lg p-4 sm:p-6 text-center border border-[#E5E7EB]"
              >
                <Icon className="w-7 sm:w-8 h-7 sm:h-8 text-[#1E6FFB] mx-auto mb-2 sm:mb-3" />
                <h3 className="text-sm sm:text-base font-bold text-[#0A0A0A] mb-1 sm:mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#575757]">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-[#1E6FFB] to-[#1AD4B8] rounded-lg sm:rounded-xl p-4 sm:p-6 text-center text-white"
        >
          <p className="text-xs font-semibold mb-1">NOW AVAILABLE</p>
          <h3 className="text-xl sm:text-2xl font-bold mb-1">
            Download HealthMind Today
          </h3>
          <p className="text-xs sm:text-sm text-white/90 mb-2">
            The app is live for everyone — start your journey now
          </p>
          <a
            href="https://play.google.com/store/apps/details?id=com.healthmind.app"
            className="inline-flex items-center justify-center rounded-full bg-white/15 px-4 py-2 text-xs sm:text-sm font-semibold text-white ring-1 ring-white/30 transition hover:bg-white/25"
          >
            Download the HealthMind App
          </a>
        </motion.div>
      </div>
    </section>
  );
}
