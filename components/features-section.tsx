"use client";

import { motion } from "framer-motion";
import { Clock, Shield, Zap, Monitor, PenLine } from "lucide-react";

const features = [
  {
    logoSrc: "/icon.svg",
    title: "Alverna AI",
    description:
      "Meet your personal mental health companion that understands you.",
    bgColor: "from-blue-50 to-blue-100",
    iconBg: "bg-blue-500",
  },
  {
    icon: Clock,
    title: "Smart Medication Reminders",
    description:
      "Never miss a dose — intelligent reminders adapt to your schedule and send alerts via email and push notifications.",
    bgColor: "from-green-50 to-green-100",
    iconBg: "bg-green-500",
  },
  {
    icon: PenLine,
    title: "Journal",
    description:
      "Journal your feelings and track your feelings, understand your mood and track progress.",
    bgColor: "from-purple-50 to-purple-100",
    iconBg: "bg-purple-500",
  },
  {
    icon: Shield,
    title: "Privacy & Security",
    description:
      "HealthMind uses authenticated access and the security controls provided by its production infrastructure. Sensitive data is not used for public impact reporting.",
    bgColor: "from-orange-50 to-orange-100",
    iconBg: "bg-orange-500",
  },
  {
    icon: Zap,
    title: "Emergency Features",
    description:
      "Quick access to emergency contacts, presence of health journaling to note down your health information and set plans, and critical health alerts when you need them most.",
    bgColor: "from-red-50 to-red-100",
    iconBg: "bg-red-500",
  },
  {
    icon: Monitor,
    title: "Mobile Ready",
    description:
      "Progressive mobile app that is compatible on both iOS and Android devices.",
    bgColor: "from-cyan-50 to-cyan-100",
    iconBg: "bg-cyan-500",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-12 sm:py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12"
        >
          <p className="text-xs sm:text-sm font-semibold text-[#1E6FFB] mb-2">
            Your AI-Powered Mental Health Companion
          </p>
          <p className="text-base sm:text-lg md:text-xl text-[#575757] mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed text-pretty">
            HealthMind combines artificial intelligence with personalized health
            tracking to give you intelligent medication reminders, symptom
            analysis, and health insights tailored just for you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className={`bg-gradient-to-br ${feature.bgColor} rounded-xl sm:rounded-2xl p-5 sm:p-8 border border-white/50 hover:shadow-lg transition-all duration-300 group`}
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`inline-flex items-center justify-center w-12 sm:w-16 h-12 sm:h-16 rounded-full ${feature.iconBg} mb-4 sm:mb-6 shadow-lg`}
                >
                  {feature.logoSrc ? (
                    <img
                      src={feature.logoSrc}
                      alt={`${feature.title} logo`}
                      className="w-6 sm:w-8 h-6 sm:h-8"
                    />
                  ) : Icon ? (
                    <Icon className="w-6 sm:w-8 h-6 sm:h-8 text-white" />
                  ) : null}
                </motion.div>
                <h3 className="text-base sm:text-xl font-bold text-[#0A0A0A] mb-2 sm:mb-3">
                  {feature.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#575757] leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
