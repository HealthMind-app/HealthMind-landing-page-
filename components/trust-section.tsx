"use client"

import { motion } from "framer-motion"

export default function TrustSection() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-[#F5F8FE] rounded-2xl p-12 text-center"
        >
          <h3 className="text-2xl font-bold text-[#0A0A0A] mb-8">Trusted by Experts</h3>
          <div className="flex flex-col md:flex-row justify-center gap-8 items-center">
            <div className="flex items-center gap-2">
              <span className="text-2xl">✅</span>
              <span className="text-[#575757] font-medium">Backed by medical experts</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">✅</span>
              <span className="text-[#575757] font-medium">Built with privacy and security in mind</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">✅</span>
              <span className="text-[#575757] font-medium">Community-focused innovation</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
