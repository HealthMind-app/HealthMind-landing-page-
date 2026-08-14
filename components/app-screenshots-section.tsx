"use client"

import Image from "next/image"
import { ChevronLeft, ChevronRight, Images, Smartphone, Sparkles } from "lucide-react"
import { useState } from "react"

const screenshots = [
  {
    title: "Meet Alverna",
    description: "Open HealthMind’s AI companion from a dedicated support screen.",
    src: "/screenshots/alverna-companion-screen.webp",
    alt: "HealthMind Alverna companion screen showing the assistant as active",
    kind: "Product screen",
    panel: "from-cyan-100 via-sky-50 to-violet-100",
  },
  {
    title: "Personalized wellness view",
    description: "Review reflections and wellness trends from a focused mobile dashboard.",
    src: "/screenshots/personalized-wellness-preview.webp",
    alt: "HealthMind promotional preview of a personalized wellness dashboard",
    kind: "Product preview",
    panel: "from-sky-100 via-cyan-50 to-blue-100",
  },
  {
    title: "Supportive AI chat",
    description: "Use the Alverna chat interface for supportive, non-emergency conversation.",
    src: "/screenshots/supportive-ai-chat-preview.webp",
    alt: "HealthMind promotional preview of a supportive Alverna AI chat",
    kind: "Product preview",
    panel: "from-cyan-100 via-white to-violet-100",
  },
  {
    title: "Symptom checker",
    description: "Select symptoms for an informational check that does not replace medical care.",
    src: "/screenshots/symptom-checker-screen.webp",
    alt: "HealthMind symptom checker screen with selectable symptom categories",
    kind: "Product screen",
    panel: "from-emerald-100 via-cyan-50 to-sky-100",
  },
  {
    title: "Medication reminders",
    description: "Schedule medication reminders and review upcoming doses in one place.",
    src: "/screenshots/medication-reminders-preview.webp",
    alt: "HealthMind medication reminder preview showing a daily schedule",
    kind: "Product preview",
    panel: "from-cyan-100 via-sky-50 to-emerald-100",
  },
  {
    title: "Journal and progress",
    description: "Review wellness progress and access private journal tools from one view.",
    src: "/screenshots/wellness-progress-journal-preview.webp",
    alt: "HealthMind wellness progress and journal promotional preview",
    kind: "Product preview",
    panel: "from-blue-100 via-cyan-50 to-violet-100",
  },
  {
    title: "HealthMind home",
    description: "Start from a clear home screen with shortcuts to everyday wellness tools.",
    src: "/screenshots/healthmind-home-preview.webp",
    alt: "HealthMind mobile home screen promotional preview",
    kind: "Product preview",
    panel: "from-cyan-100 via-sky-50 to-fuchsia-100",
  },
  {
    title: "Your AI companion",
    description: "See how the AI companion sits alongside check-ins and wellbeing tools.",
    src: "/screenshots/ai-companion-overview.webp",
    alt: "HealthMind overview featuring the Alverna AI companion and mood check-in interface",
    kind: "Product preview",
    panel: "from-sky-100 via-cyan-50 to-violet-100",
  },
] as const

export default function AppScreenshotsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeScreenshot = screenshots[activeIndex] ?? screenshots[0]

  const showPrevious = () => setActiveIndex((current) => (current - 1 + screenshots.length) % screenshots.length)
  const showNext = () => setActiveIndex((current) => (current + 1) % screenshots.length)

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-cyan-50/60 to-violet-50/60 py-16 sm:py-20" aria-labelledby="experience-title">
      <div className="pointer-events-none absolute -left-32 top-24 h-80 w-80 rounded-full bg-cyan-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-20 h-80 w-80 rounded-full bg-violet-200/30 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-violet-600 text-white shadow-lg shadow-cyan-200/60">
            <Smartphone className="h-6 w-6" />
          </div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-700">Inside the app</p>
          <h2 id="experience-title" className="mt-3 text-3xl font-bold text-slate-950 sm:text-4xl">Experience HealthMind</h2>
          <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">Explore HealthMind-supplied interfaces and product previews for everyday wellness tools.</p>
        </div>

        <div className="grid items-stretch gap-6 lg:grid-cols-[1.05fr_.95fr]">
          <article className="overflow-hidden rounded-[2rem] border border-white/80 bg-white/90 shadow-xl shadow-slate-200/70 backdrop-blur">
            <div className={`relative flex min-h-[31rem] items-center justify-center overflow-hidden bg-gradient-to-br p-5 sm:min-h-[38rem] sm:p-8 ${activeScreenshot.panel}`}>
              <div className="absolute left-5 top-5 z-10 inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/90 px-3 py-1.5 text-xs font-bold text-slate-700 shadow-sm backdrop-blur">
                <Sparkles className="h-3.5 w-3.5 text-violet-600" />
                {activeScreenshot.kind}
              </div>
              <div className="relative h-[28rem] w-full sm:h-[34rem]">
                <Image
                  key={activeScreenshot.src}
                  src={activeScreenshot.src}
                  alt={activeScreenshot.alt}
                  fill
                  priority={activeIndex === 0}
                  sizes="(min-width: 1024px) 520px, 92vw"
                  className="object-contain drop-shadow-2xl"
                />
              </div>
            </div>
            <div className="flex flex-col gap-4 border-t border-slate-100 p-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-950">{activeScreenshot.title}</h3>
                <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600">{activeScreenshot.description}</p>
              </div>
              <div className="flex shrink-0 gap-2">
                <button type="button" onClick={showPrevious} className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:border-cyan-300 hover:bg-cyan-50 hover:text-cyan-800" aria-label="Show previous HealthMind screen">
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button type="button" onClick={showNext} className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r from-cyan-600 to-violet-700 text-white shadow-md transition hover:brightness-105" aria-label="Show next HealthMind screen">
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </article>

          <div className="rounded-[2rem] border border-white/80 bg-white/75 p-4 shadow-lg shadow-slate-200/60 backdrop-blur sm:p-5">
            <div className="mb-4 flex items-center justify-between px-1">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-800"><Images className="h-4 w-4 text-cyan-700" />Choose a screen</div>
              <span className="text-xs font-semibold text-slate-500">{activeIndex + 1} of {screenshots.length}</span>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2">
              {screenshots.map((screenshot, index) => (
                <button
                  key={screenshot.src}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`group overflow-hidden rounded-2xl border text-left transition ${activeIndex === index ? "border-cyan-400 bg-cyan-50 shadow-md ring-2 ring-cyan-200" : "border-slate-200 bg-white hover:-translate-y-0.5 hover:border-violet-300 hover:shadow-md"}`}
                  aria-label={`Show ${screenshot.title}`}
                  aria-pressed={activeIndex === index}
                >
                  <div className={`relative h-36 overflow-hidden bg-gradient-to-br p-2 ${screenshot.panel}`}>
                    <Image src={screenshot.src} alt="" fill sizes="(min-width: 1024px) 210px, (min-width: 640px) 22vw, 44vw" className="object-contain p-2 transition duration-300 group-hover:scale-[1.03]" />
                  </div>
                  <div className="p-3">
                    <p className="text-xs font-bold leading-5 text-slate-900">{screenshot.title}</p>
                    <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-500">{screenshot.kind}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <p className="mx-auto mt-6 max-w-3xl text-center text-xs leading-5 text-slate-500">Screens supplied by HealthMind. Visible profile names and conversation text are illustrative product-preview content—not live user records, testimonials, or impact evidence.</p>

        <div className="mt-10 text-center">
          <a href="https://play.google.com/store/apps/details?id=com.healthmind.app" target="_blank" rel="noopener noreferrer" className="inline-flex items-center rounded-full bg-slate-950 px-7 py-3 font-semibold text-white shadow-lg transition hover:bg-violet-800">Download on Google Play</a>
        </div>
      </div>
    </section>
  )
}
