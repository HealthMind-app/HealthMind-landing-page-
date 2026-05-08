"use client";

import { motion } from "framer-motion";
import WaitlistForm from "./waitlist-form";

export default function FinalCtaSection() {
  return (
    <section
      id="waitlist"
      className="py-16 sm:py-24 px-4 bg-gradient-to-r from-[#1E6FFB] to-[#1AD4B8]"
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4 text-pretty">
            HealthMind is here.
          </h2>
          <p className="text-base sm:text-xl text-white/90 mb-4 sm:mb-5 text-pretty">
            The world’s first centric, personalized AI mental health companion,
            designed privately and personally for you to understand, adapt to
            your wellbeing—everyday and in real life moments.
          </p>
          <p className="text-sm sm:text-lg text-white/90 mb-6 sm:mb-8 text-pretty">
            A new way to care for the mind. Built with intention. Powered by
            intelligence.
          </p>

          <motion.a
            href="https://play.google.com/store/apps/details?id=com.healthmind.app"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-white text-[#1E6FFB] font-semibold text-sm sm:text-base shadow-lg"
          >
            Download HealthMind and begin your journey
          </motion.a>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-8 sm:mt-10"
          >
            <WaitlistForm />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
