"use client"

import { motion } from "framer-motion"
import { FileCheck2, Quote, ShieldCheck } from "lucide-react"

const safeguards = [
  [Quote, "Reviewed stories only", "Names, quotations, photographs, and affiliations appear only after accuracy and publication permission are confirmed."],
  [ShieldCheck, "Privacy before publicity", "Stories must not reveal health disclosures or other sensitive personal information without an approved basis."],
  [FileCheck2, "Evidence-linked claims", "Any published outcome will point to its reporting period and reviewed measurement method."],
] as const

export default function SocialProofSection() {
  return (
    <section className="bg-white px-4 py-16 sm:py-24" aria-labelledby="stories-title">
      <div className="mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mx-auto mb-12 max-w-3xl text-center">
          <h2 id="stories-title" className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Community stories are being reviewed</h2>
          <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">We will not publish illustrative testimonials as though they came from real HealthMind users.</p>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-3">
          {safeguards.map(([Icon, title, description]) => (
            <article key={title} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <Icon className="mb-5 h-7 w-7 text-violet-700" />
              <h3 className="font-bold text-slate-950">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
