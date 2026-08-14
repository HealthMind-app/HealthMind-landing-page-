"use client"

import { ImageIcon, Smartphone } from "lucide-react"
import { useState } from "react"

const screenshots = [
  ["AI-powered support", "A reviewed, privacy-safe product screen will appear here."],
  ["Personalized experience", "A reviewed, privacy-safe product screen will appear here."],
  ["Support resources", "A reviewed, privacy-safe product screen will appear here."],
  ["Wellness tools", "A reviewed, privacy-safe product screen will appear here."],
  ["Medication reminders", "A reviewed, privacy-safe product screen will appear here."],
  ["Journal and progress", "A reviewed, privacy-safe product screen will appear here."],
] as const

export default function AppScreenshotsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [activeTitle, activeDescription] = screenshots[activeIndex] ?? screenshots[0]

  const card = (title: string, description: string) => (
    <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="mx-auto my-6 flex aspect-[9/16] w-[min(72%,15rem)] items-center justify-center rounded-[2rem] border-[6px] border-slate-900 bg-gradient-to-br from-violet-50 to-sky-50 p-6">
        <div className="text-center text-slate-500">
          <ImageIcon className="mx-auto mb-4 h-9 w-9 text-violet-500" />
          <p className="text-sm font-semibold text-slate-700">Screenshot coming soon</p>
          <p className="mt-2 text-xs leading-5">No user data or sample conversations will be placed here.</p>
        </div>
      </div>
      <div className="border-t border-slate-100 p-5">
        <h3 className="font-bold text-slate-950">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
      </div>
    </article>
  )

  return (
    <section className="bg-white py-16 sm:py-20" aria-labelledby="experience-title">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <Smartphone className="mx-auto mb-4 h-8 w-8 text-violet-700" />
          <h2 id="experience-title" className="text-3xl font-bold text-slate-950 sm:text-4xl">Experience HealthMind</h2>
          <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">Real product screenshots are being prepared. Only sanitized screens with no personal or sensitive content will be published.</p>
        </div>

        <div className="hidden gap-6 md:grid md:grid-cols-2 lg:grid-cols-3">
          {screenshots.map(([title, description]) => <div key={title}>{card(title, description)}</div>)}
        </div>

        <div className="md:hidden">
          {card(activeTitle, activeDescription)}
          <div className="mt-6 flex justify-center gap-2">
            {screenshots.map(([title], index) => (
              <button key={title} type="button" onClick={() => setActiveIndex(index)} className={`h-2.5 rounded-full transition-all ${activeIndex === index ? "w-8 bg-violet-700" : "w-2.5 bg-slate-300"}`} aria-label={`Show screenshot placeholder ${index + 1}`} />
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <a href="https://play.google.com/store/apps/details?id=com.healthmind.app" target="_blank" rel="noopener noreferrer" className="inline-flex items-center rounded-full bg-violet-700 px-7 py-3 font-semibold text-white transition hover:bg-violet-800">Download on Google Play</a>
        </div>
      </div>
    </section>
  )
}
