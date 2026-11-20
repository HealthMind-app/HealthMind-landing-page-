"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion"
import { CalendarDays, ChevronDown, ChevronLeft, ChevronRight, Handshake, Images, MapPin, Play, Users, X } from "lucide-react"
import { floatingPicks, galleryEvents, type GalleryEvent, type GalleryImage, type GalleryMedia } from "@/lib/gallery"

type Open = { event: GalleryEvent; index: number | null }

const formatDuration = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`

/* ------------------------------------------------------------------ */
/* Background: soft summit-coloured blobs, rising balloons, zigzags     */
/* ------------------------------------------------------------------ */

const balloons = [
  { left: "6%", size: 46, color: "#ef4444", duration: 26, delay: 0 },
  { left: "17%", size: 30, color: "#facc15", duration: 21, delay: 6 },
  { left: "29%", size: 38, color: "#ffffff", duration: 30, delay: 12 },
  { left: "44%", size: 26, color: "#f97316", duration: 23, delay: 3 },
  { left: "58%", size: 42, color: "#ef4444", duration: 28, delay: 15 },
  { left: "69%", size: 32, color: "#facc15", duration: 24, delay: 9 },
  { left: "81%", size: 40, color: "#ffffff", duration: 27, delay: 1 },
  { left: "92%", size: 28, color: "#3b82f6", duration: 22, delay: 11 },
]

function SummitBackdrop({ still }: { still: boolean }) {
  const blob = (className: string, animate: Record<string, number[]>, duration: number) => (
    <motion.div
      aria-hidden
      className={`absolute rounded-full blur-3xl ${className}`}
      animate={still ? undefined : animate}
      transition={{ duration, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
    />
  )
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden bg-gradient-to-b from-[#fff7ed] via-[#fffbf5] to-[#eff6ff]">
      {blob("-left-24 top-[8%] h-80 w-80 bg-orange-400/35 sm:h-[28rem] sm:w-[28rem]", { x: [0, 60, -20], y: [0, 40, 10] }, 18)}
      {blob("right-[-6rem] top-[2%] h-72 w-72 bg-red-400/25 sm:h-96 sm:w-96", { x: [0, -50, 10], y: [0, 60, 0] }, 22)}
      {blob("bottom-[-4rem] left-[30%] h-80 w-80 bg-blue-500/20 sm:h-[30rem] sm:w-[30rem]", { x: [0, -40, 40], y: [0, -30, 0] }, 26)}
      {blob("bottom-[10%] right-[8%] h-64 w-64 bg-yellow-300/40", { x: [0, 30, -30], y: [0, -50, 0] }, 20)}

      {!still &&
        balloons.map((b, i) => (
          <motion.span
            key={i}
            className="absolute bottom-0 rounded-full shadow-[inset_-6px_-8px_0_rgba(0,0,0,0.08)]"
            style={{ left: b.left, width: b.size, height: b.size * 1.15, background: b.color, opacity: 0.45 }}
            initial={{ y: "110%" }}
            animate={{ y: ["10vh", "-120vh"], x: [0, 14, -10, 6] }}
            transition={{ duration: b.duration, delay: b.delay, repeat: Infinity, ease: "linear" }}
          />
        ))}

      <svg className="absolute left-[8%] top-[46%] hidden w-40 text-orange-500/40 sm:block" viewBox="0 0 160 20" fill="none">
        <path d="M0 10 L10 2 L20 18 L30 2 L40 18 L50 2 L60 18 L70 2 L80 18 L90 2 L100 18 L110 2 L120 18 L130 2 L140 18 L150 2 L160 10" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
      </svg>
      <svg className="absolute bottom-[22%] right-[6%] w-28 text-blue-500/35" viewBox="0 0 160 20" fill="none">
        <path d="M0 10 L10 2 L20 18 L30 2 L40 18 L50 2 L60 18 L70 2 L80 18 L90 2 L100 18 L110 2 L120 18 L130 2 L140 18 L150 2 L160 10" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
      </svg>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Floating stage                                                       */
/* ------------------------------------------------------------------ */

// Where each floating piece rests, and which way it drifts off as the visitor scrolls.
const slots = [
  // Top pieces start below the fixed navbar (about 100px tall).
  { className: "left-[3%] top-[108px] w-[26vw] max-w-[220px] sm:left-[6%] sm:top-[128px] sm:w-[16vw]", rotate: -6, drift: [-1, -0.6], bob: 7 },
  { className: "right-[3%] top-[116px] w-[44vw] max-w-[380px] sm:right-[5%] sm:top-[132px] sm:w-[27vw]", rotate: 5, drift: [1, -0.5], bob: 8.5 },
  { className: "bottom-[9%] left-[3%] w-[42vw] max-w-[360px] sm:bottom-[8%] sm:left-[9%] sm:w-[26vw]", rotate: 4, drift: [-1, 0.6], bob: 9 },
  { className: "bottom-[6%] right-[4%] w-[40vw] max-w-[340px] sm:bottom-[10%] sm:right-[8%] sm:w-[24vw]", rotate: -4, drift: [1, 0.7], bob: 7.5 },
]

function HeroClip({ src, poster, alt, still }: { src: string; poster: string; alt: string; still: boolean }) {
  const ref = useRef<HTMLVideoElement>(null)
  const inView = useInView(ref, { amount: 0.2 })
  useEffect(() => {
    const video = ref.current
    if (!video || still) return
    if (inView) video.play().catch(() => {})
    else video.pause()
  }, [inView, still])
  if (still) return <img src={poster} alt={alt} className="h-full w-full object-cover" />
  return <video ref={ref} src={src} poster={poster} muted loop playsInline preload="metadata" aria-label={alt} className="h-full w-full object-cover" />
}

function FloatingPiece({ index, progress, still, onOpen }: { index: number; progress: MotionValue<number>; still: boolean; onOpen: () => void }) {
  const pick = floatingPicks[index]
  const slot = slots[index % slots.length]
  const x = useTransform(progress, [0.35, 0.95], ["0vw", `${slot.drift[0] * 45}vw`])
  const y = useTransform(progress, [0.35, 0.95], ["0vh", `${slot.drift[1] * 45}vh`])
  const opacity = useTransform(progress, [0.55, 0.9], [1, 0])
  const { media } = pick
  const ratio = `${media.width} / ${media.height}`

  return (
    <motion.div className={`absolute z-10 ${slot.className}`} style={still ? undefined : { x, y, opacity }}>
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.9 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ type: "spring", stiffness: 60, damping: 14, delay: 0.15 * index }}
      >
        <motion.button
          type="button"
          onClick={onOpen}
          aria-label={`Open: ${media.alt}`}
          className="block w-full overflow-hidden rounded-2xl border-[5px] border-white bg-white shadow-[0_24px_60px_-20px_rgba(15,23,42,0.45)] outline-none ring-violet-500 focus-visible:ring-4 sm:rounded-3xl sm:border-8"
          style={{ aspectRatio: ratio, rotate: slot.rotate }}
          animate={still ? undefined : { y: [0, -14, 0], rotate: [slot.rotate, slot.rotate + 1.5, slot.rotate] }}
          transition={{ duration: slot.bob, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ scale: 1.04 }}
        >
          {media.type === "video" ? (
            <HeroClip src={pick.heroSrc ?? media.src} poster={media.poster} alt={media.alt} still={still} />
          ) : (
            <img src={media.thumb} alt={media.alt} className="h-full w-full object-cover" />
          )}
        </motion.button>
      </motion.div>
    </motion.div>
  )
}

function FloatingStage({ onOpen }: { onOpen: (slug: string, media: GalleryMedia) => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const still = !!useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })
  const textOpacity = useTransform(scrollYProgress, [0.6, 0.95], [1, 0])
  const textScale = useTransform(scrollYProgress, [0.6, 0.95], [1, 0.94])
  const cueOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0])

  return (
    <div ref={ref} className={still ? "relative" : "relative h-[190vh]"}>
      <div className={`${still ? "relative" : "sticky top-0"} h-[100svh] min-h-[560px] overflow-hidden`}>
        <SummitBackdrop still={still} />

        {floatingPicks.map((pick, i) => (
          <FloatingPiece key={pick.media.src} index={i} progress={scrollYProgress} still={still} onOpen={() => onOpen(pick.eventSlug, pick.media)} />
        ))}

        <motion.div className="relative z-20 flex h-full items-center justify-center px-6 pt-16 text-center" style={still ? undefined : { opacity: textOpacity, scale: textScale }}>
          <div className="max-w-md rounded-3xl bg-white/55 px-6 py-7 backdrop-blur-md sm:max-w-xl sm:bg-white/40 sm:px-10">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600">Our impact in action</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl">Out in the community</h2>
            <p className="mt-4 text-sm leading-6 text-slate-600 sm:text-base">Moments from the summits and outreaches where we&rsquo;ve shared HealthMind. Scroll to open the folders.</p>
          </div>
        </motion.div>

        {!still && (
          <motion.div aria-hidden className="absolute bottom-5 left-1/2 z-20 -translate-x-1/2 text-slate-500" style={{ opacity: cueOpacity }}>
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
              <ChevronDown className="h-7 w-7" />
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Folders                                                              */
/* ------------------------------------------------------------------ */

function counts(event: GalleryEvent) {
  const photos = event.media.filter((m) => m.type === "image").length
  const videos = event.media.length - photos
  return [photos && `${photos} photos`, videos && `${videos} video${videos === 1 ? "" : "s"}`].filter(Boolean).join(" · ")
}

const peekStyles = [
  "left-[8%] -rotate-[8deg] group-hover:-translate-y-6 group-hover:-rotate-[12deg]",
  "left-[30%] rotate-[2deg] group-hover:-translate-y-10",
  "left-[52%] rotate-[9deg] group-hover:-translate-y-6 group-hover:rotate-[13deg]",
]

function FolderCard({ event, index, onOpen }: { event: GalleryEvent; index: number; onOpen: () => void }) {
  const peeks = event.media.filter((m): m is GalleryImage => m.featured && m.type === "image").slice(0, 3)
  const { from, via, to } = event.accent
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: "easeOut" }}
      className="group relative block w-full pt-16 text-left outline-none focus-visible:[&>div:last-child]:ring-4 focus-visible:[&>div:last-child]:ring-violet-500"
      aria-label={`Open the ${event.name} folder (${counts(event)})`}
    >
      {/* folder back + tab */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 top-10 rounded-[1.75rem] opacity-90" style={{ background: `linear-gradient(135deg, ${from}, ${via})` }} />
      <div aria-hidden className="absolute left-6 top-4 h-10 w-36 rounded-t-2xl opacity-90" style={{ background: from }} />

      {/* photos peeking out */}
      <div aria-hidden className="absolute inset-x-0 top-6 h-44">
        {peeks.map((m, i) => (
          <img
            key={m.src}
            src={m.thumb}
            alt=""
            loading="lazy"
            className={`absolute top-0 aspect-[4/3] w-[40%] rounded-xl border-4 border-white object-cover shadow-lg transition-transform duration-500 ease-out ${peekStyles[i]}`}
          />
        ))}
      </div>

      {/* folder front */}
      <div className="relative mt-24 rounded-[1.75rem] border border-white/40 bg-white/85 p-6 shadow-xl backdrop-blur-md transition-shadow duration-300 group-hover:shadow-2xl sm:p-7">
        <span className="inline-flex rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white" style={{ background: `linear-gradient(90deg, ${via}, ${to})` }}>
          {event.kind}
        </span>
        <h3 className="mt-3 text-2xl font-bold text-slate-950">{event.name}</h3>
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-600">
          <span className="inline-flex items-center gap-1.5"><CalendarDays className="h-4 w-4" />{event.dateLabel}</span>
          <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4" />{event.place}</span>
        </div>
        <div className="mt-5 flex items-center justify-between border-t border-slate-200 pt-4 text-sm">
          <span className="inline-flex items-center gap-1.5 font-medium text-slate-700"><Images className="h-4 w-4" />{counts(event)}</span>
          <span className="font-semibold text-violet-700 transition-transform group-hover:translate-x-1">Open folder →</span>
        </div>
      </div>
    </motion.button>
  )
}

/* ------------------------------------------------------------------ */
/* Event viewer + lightbox                                              */
/* ------------------------------------------------------------------ */

function useEscape(handler: () => void, active: boolean) {
  useEffect(() => {
    if (!active) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && handler()
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [handler, active])
}

function EventViewer({ event, onClose, onPick, covered }: { event: GalleryEvent; onClose: () => void; onPick: (i: number) => void; covered: boolean }) {
  const closeRef = useRef<HTMLButtonElement>(null)
  useEffect(() => closeRef.current?.focus(), [])
  useEscape(onClose, !covered)
  const { from, via, to } = event.accent

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={event.name}
      className="fixed inset-0 z-50 overflow-y-auto bg-[#f8f8fc]"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.3 }}
    >
      <div className="h-2 w-full" style={{ background: `linear-gradient(90deg, ${from}, ${via}, ${to})` }} />
      <div className="mx-auto max-w-6xl px-4 pb-16 pt-6 sm:pt-10">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: via }}>{event.kind}</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">{event.name}</h2>
          </div>
          <button ref={closeRef} type="button" onClick={onClose} className="shrink-0 rounded-full bg-white p-3 text-slate-700 shadow-md hover:bg-slate-100" aria-label="Close folder">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-4 flex flex-wrap gap-2 text-sm text-slate-700">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 shadow-sm"><CalendarDays className="h-4 w-4" />{event.dateLabel}</span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 shadow-sm"><MapPin className="h-4 w-4" />{event.place}</span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 shadow-sm"><Users className="h-4 w-4" />{event.highlight}</span>
          {event.partner && <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 shadow-sm"><Handshake className="h-4 w-4" />With {event.partner}</span>}
        </div>

        <div className="mt-6 max-w-3xl space-y-3 text-base leading-7 text-slate-600">
          {event.summary.map((p) => <p key={p}>{p}</p>)}
        </div>

        <div className="mt-10 columns-2 gap-3 sm:columns-3 lg:columns-4">
          {event.media.map((m, i) => (
            <motion.button
              key={m.src}
              type="button"
              onClick={() => onPick(i)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.03, 0.6) }}
              className="group relative mb-3 block w-full overflow-hidden rounded-2xl bg-slate-200 outline-none ring-violet-500 focus-visible:ring-4"
              aria-label={m.type === "video" ? `Play video: ${m.alt}` : `View photo: ${m.alt}`}
            >
              <img
                src={m.type === "image" ? m.thumb : m.poster}
                alt=""
                width={m.width}
                height={m.height}
                loading="lazy"
                className="h-auto w-full transition-transform duration-500 group-hover:scale-105"
              />
              {m.type === "video" && (
                <>
                  <span className="absolute inset-0 flex items-center justify-center bg-black/15">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow-lg"><Play className="ml-0.5 h-5 w-5 fill-slate-900 text-slate-900" /></span>
                  </span>
                  <span className="absolute bottom-2 right-2 rounded-md bg-black/70 px-1.5 py-0.5 text-[11px] font-semibold text-white">{formatDuration(m.duration)}</span>
                </>
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function Lightbox({ event, index, onClose, onMove }: { event: GalleryEvent; index: number; onClose: () => void; onMove: (i: number) => void }) {
  const total = event.media.length
  const media = event.media[index]
  const prev = useCallback(() => onMove((index - 1 + total) % total), [index, total, onMove])
  const next = useCallback(() => onMove((index + 1) % total), [index, total, onMove])
  const closeRef = useRef<HTMLButtonElement>(null)
  useEffect(() => closeRef.current?.focus(), [])
  useEscape(onClose, true)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev()
      if (e.key === "ArrowRight") next()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [prev, next])

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={media.alt}
      className="fixed inset-0 z-[60] flex flex-col bg-slate-950/95"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex items-center justify-between px-4 py-3 text-sm text-white/80">
        <span>{index + 1} / {total}</span>
        <button ref={closeRef} type="button" onClick={onClose} className="rounded-full p-2 hover:bg-white/10" aria-label="Close">
          <X className="h-6 w-6 text-white" />
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-2 sm:px-16">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={media.src}
            className="flex h-full w-full items-center justify-center"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            drag={media.type === "image" ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.4}
            onDragEnd={(_, info) => {
              if (info.offset.x < -80) next()
              else if (info.offset.x > 80) prev()
            }}
          >
            {media.type === "image" ? (
              <img src={media.src} alt={media.alt} className="max-h-full max-w-full select-none rounded-lg object-contain" draggable={false} />
            ) : (
              <video key={media.src} src={media.src} poster={media.poster} controls autoPlay playsInline className="max-h-full max-w-full rounded-lg" aria-label={media.alt} />
            )}
          </motion.div>
        </AnimatePresence>

        <button type="button" onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 sm:left-4" aria-label="Previous">
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button type="button" onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 sm:right-4" aria-label="Next">
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      <p className="px-6 py-4 text-center text-sm text-white/75">{media.alt}</p>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */

export default function ImpactGallery() {
  const [open, setOpen] = useState<Open | null>(null)

  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = previous
    }
  }, [open])

  const openFromFloating = (slug: string, media: GalleryMedia) => {
    const event = galleryEvents.find((e) => e.slug === slug)
    if (event) setOpen({ event, index: event.media.indexOf(media) })
  }
  const closeAll = useCallback(() => setOpen(null), [])
  const closeLightbox = useCallback(() => setOpen((o) => (o ? { ...o, index: null } : o)), [])
  const move = useCallback((index: number) => setOpen((o) => (o ? { ...o, index } : o)), [])

  if (galleryEvents.every((e) => e.media.length === 0)) return null

  return (
    <section id="stories" aria-labelledby="gallery-folders-heading" className="relative">
      <FloatingStage onOpen={openFromFloating} />

      <div className="relative bg-gradient-to-b from-[#eff6ff] to-[#f8f8fc] px-4 pb-20 pt-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-4 text-center">
            <h2 id="gallery-folders-heading" className="text-2xl font-bold text-slate-950 sm:text-3xl">Event folders</h2>
            <p className="mt-2 text-sm text-slate-500">Open a folder to see every photo and video from the day.</p>
          </div>
          <div className="mx-auto grid max-w-5xl gap-x-10 gap-y-6 md:grid-cols-2">
            {galleryEvents.map((event, i) => (
              <FolderCard key={event.slug} event={event} index={i} onOpen={() => setOpen({ event, index: null })} />
            ))}
          </div>
          <p className="mt-10 text-center text-xs text-slate-400">Everyone pictured agreed to appear publicly.</p>
        </div>
      </div>

      <AnimatePresence>
        {open && <EventViewer key={open.event.slug} event={open.event} onClose={closeAll} onPick={move} covered={open.index !== null} />}
      </AnimatePresence>
      <AnimatePresence>
        {open && open.index !== null && <Lightbox event={open.event} index={open.index} onClose={closeLightbox} onMove={move} />}
      </AnimatePresence>
    </section>
  )
}
