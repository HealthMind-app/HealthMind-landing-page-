#!/usr/bin/env node
// Builds web-ready gallery media from the outreach folders shared on Drive.
//
//   node scripts/build-gallery-media.mjs "<path to downloaded outreach folder>"
//
// For each event folder listed in EVENTS:
//   - photos  -> public/gallery/<slug>/photo-NN.jpg (max 1600px) + thumbs/photo-NN.jpg (max 640px)
//   - videos  -> public/gallery/<slug>/video-NN.mp4 (H.264, faststart) + video-NN.jpg poster
//   - files named IMG-n / VID-n are the curated picks and come first, in their number order
// Then writes lib/gallery-manifest.json, which components/impact-gallery.tsx reads.
// Needs ffmpeg and ffprobe on PATH. Re-running replaces the previous output.

import { execFileSync } from "node:child_process"
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const EVENTS = [
  { folder: "BILLI NOW YOUTH SUMMIT", slug: "billi-now-now-2026" },
  { folder: "KAYUNGA OUTREACH", slug: "kayunga-2026" },
]

// Muted, looping clips for the floating hero: [event slug, source file name].
const HERO_CLIPS = [["billi-now-now-2026", "VID-1.mp4"]]

const source = process.argv[2]
if (!source || !fs.existsSync(source)) {
  console.error("Usage: node scripts/build-gallery-media.mjs <outreach folder>")
  process.exit(1)
}

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const outRoot = path.join(root, "public", "gallery")

const run = (cmd, args) => execFileSync(cmd, args, { stdio: ["ignore", "pipe", "pipe"] }).toString()
const ffmpeg = (args) => run("ffmpeg", ["-hide_banner", "-loglevel", "error", "-y", ...args])

function probe(file) {
  const json = JSON.parse(run("ffprobe", ["-v", "error", "-print_format", "json", "-show_streams", "-show_format", file]))
  const video = json.streams.find((s) => s.codec_type === "video")
  let { width, height } = video
  const rotation = Math.abs(Number(video.tags?.rotate ?? video.side_data_list?.find((d) => d.rotation !== undefined)?.rotation ?? 0))
  if (rotation === 90 || rotation === 270) [width, height] = [height, width]
  return { width, height, duration: Number(json.format.duration) || 0, hasAudio: json.streams.some((s) => s.codec_type === "audio") }
}

// Curated IMG-n / VID-n first (by n), then the rest by name.
function order(files, prefix) {
  const pick = (f) => f.match(new RegExp(`^${prefix}-(\\d+)\\.`, "i"))
  return [
    ...files.filter(pick).sort((a, b) => Number(pick(a)[1]) - Number(pick(b)[1])),
    ...files.filter((f) => !pick(f)).sort(),
  ]
}

// Perceptual difference hash: 64 bits from a 9x8 grayscale thumbnail.
const DUPLICATE_DISTANCE = 4
function dHash(file) {
  const raw = execFileSync("ffmpeg", ["-loglevel", "error", "-i", file, "-vf", "scale=9:8,format=gray", "-f", "rawvideo", "-"])
  const bits = []
  for (let y = 0; y < 8; y++) for (let x = 0; x < 8; x++) bits.push(raw[y * 9 + x] > raw[y * 9 + x + 1])
  return bits
}
const hamming = (a, b) => a.reduce((n, bit, i) => n + (bit !== b[i]), 0)

const pad = (n) => String(n).padStart(2, "0")
const fitLong = (max) => `scale='if(gt(iw,ih),min(${max},iw),-2)':'if(gt(iw,ih),-2,min(${max},ih))'`

const manifest = { generatedAt: new Date().toISOString(), events: {}, hero: [] }

for (const { folder, slug } of EVENTS) {
  const dir = path.join(source, folder)
  const out = path.join(outRoot, slug)
  fs.rmSync(out, { recursive: true, force: true })
  fs.mkdirSync(path.join(out, "thumbs"), { recursive: true })

  const files = fs.readdirSync(dir)
  const photos = order(files.filter((f) => /\.(jpe?g|png)$/i.test(f)), "IMG")
  const videos = order(files.filter((f) => /\.mp4$/i.test(f)), "VID")
  const media = []

  // Skip photos that are re-saved copies of one already included (e.g. IMG-6 and its WhatsApp original).
  const kept = []
  for (const file of photos) {
    const h = dHash(path.join(dir, file))
    if (kept.some((k) => hamming(k.h, h) <= DUPLICATE_DISTANCE)) {
      console.log(`${slug}: ${file} skipped (duplicate)`)
      continue
    }
    kept.push({ file, h })
  }

  kept.forEach(({ file }, i) => {
    const name = `photo-${pad(i + 1)}.jpg`
    const src = path.join(dir, file)
    ffmpeg(["-i", src, "-vf", fitLong(1600), "-q:v", "4", path.join(out, name)])
    ffmpeg(["-i", src, "-vf", fitLong(640), "-q:v", "5", path.join(out, "thumbs", name)])
    const { width, height } = probe(path.join(out, name))
    media.push({ type: "image", src: `/gallery/${slug}/${name}`, thumb: `/gallery/${slug}/thumbs/${name}`, width, height, featured: /^IMG-/i.test(file), source: file })
    console.log(`${slug}: ${file} -> ${name}`)
  })

  videos.forEach((file, i) => {
    const name = `video-${pad(i + 1)}`
    const src = path.join(dir, file)
    const info = probe(src)
    // Long clips get a slightly lower quality target to keep them light on mobile data.
    const long = info.duration > 60
    const crf = long ? "32" : "28"
    ffmpeg([
      "-i", src, "-vf", fitLong(long ? 720 : 960), "-c:v", "libx264", "-preset", "slow", "-crf", crf,
      "-pix_fmt", "yuv420p", "-movflags", "+faststart",
      ...(info.hasAudio ? ["-c:a", "aac", "-b:a", long ? "64k" : "96k", "-ac", "2"] : ["-an"]),
      path.join(out, `${name}.mp4`),
    ])
    ffmpeg(["-ss", String(Math.min(1, info.duration / 2)), "-i", src, "-frames:v", "1", "-vf", fitLong(960), "-q:v", "4", path.join(out, `${name}.jpg`)])
    const { width, height } = probe(path.join(out, `${name}.mp4`))
    media.push({ type: "video", src: `/gallery/${slug}/${name}.mp4`, poster: `/gallery/${slug}/${name}.jpg`, width, height, duration: Math.round(info.duration), featured: /^VID-/i.test(file), source: file })
    console.log(`${slug}: ${file} -> ${name}.mp4 (${Math.round(info.duration)}s)`)

    if (HERO_CLIPS.some(([s, f]) => s === slug && f === file)) {
      const heroName = `hero-${name}.mp4`
      ffmpeg(["-i", src, "-vf", fitLong(540), "-c:v", "libx264", "-preset", "slow", "-crf", "30", "-pix_fmt", "yuv420p", "-movflags", "+faststart", "-an", path.join(out, heroName)])
      manifest.hero.push({ slug, src: `/gallery/${slug}/${heroName}`, poster: `/gallery/${slug}/${name}.jpg`, width, height })
    }
  })

  manifest.events[slug] = media
}

fs.writeFileSync(path.join(root, "lib", "gallery-manifest.json"), JSON.stringify(manifest, null, 2) + "\n")
console.log("Wrote lib/gallery-manifest.json")
