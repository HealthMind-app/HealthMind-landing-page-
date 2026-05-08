"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"

export default function SocialProofSection() {
  return (
    <section className="py-16 sm:py-24 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 sm:mb-16"
        >
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-[#0A0A0A] mb-3 sm:mb-6 text-pretty tracking-tight">
            Trusted by Forward-Thinking People
          </h2>
          <p className="text-sm sm:text-lg text-[#575757]">Join a community committed to smarter health management</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8 mb-8 sm:mb-12">
          {[
            {
              quote: "HealthMind has completely transformed how I manage my wellness. The AI insights are incredible.",
              author: "Sarah Nakimuli",
              role: "Health Enthusiast",
            },
            {
              quote: "Finally, an app that understands the complexity of health management. Highly recommended.",
              author: "Dr. Michael Kato",
              role: "Healthcare Professional",
            },
            {
              quote: "The personalization is unmatched. It feels like having a dedicated health coach available 24/7.",
              author: "Joshua Owiny",
              role: "Tech Professional",
            },
          ].map((testimonial, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="bg-gradient-to-br from-[#F9FAFB] to-white rounded-xl sm:rounded-2xl p-5 sm:p-8 border border-[#E5E7EB]"
            >
              <div className="flex gap-1 mb-3 sm:mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 sm:w-4 h-3 sm:h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-[#575757] mb-4 sm:mb-6 leading-relaxed text-xs sm:text-base">"{testimonial.quote}"</p>
              <div>
                <p className="font-semibold text-[#0A0A0A] text-sm sm:text-base">{testimonial.author}</p>
                <p className="text-xs text-[#999]">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-br from-[#1E6FFB]/5 to-[#1AD4B8]/5 rounded-xl sm:rounded-2xl p-5 sm:p-12 border border-[#1E6FFB]/20 text-center"
        >
          <p className="text-base sm:text-xl font-semibold text-[#0A0A0A] mb-3 sm:mb-4 italic">
            "Your Health, Your Mind, Your Future"
          </p>
          <p className="text-xs sm:text-base text-[#575757] font-semibold">– Founder, HealthMind</p>
        </motion.div>
      </div>
    </section>
  )
}
