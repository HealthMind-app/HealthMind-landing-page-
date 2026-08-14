"use client"

import Link from "next/link"
import { Activity, ArrowRight, MessageCircle, NotebookPen, Users } from "lucide-react"
import { useEffect, useState, type ComponentType } from "react"
import {
  defaultImpactSnapshot,
  formatMetricValue,
  metricById,
  type PublicImpactSnapshot,
} from "@/lib/impact"

type Icon = ComponentType<{ className?: string }>

const cards: Array<[string, string, Icon]> = [
  ["registered-accounts", "Registered accounts", Users],
  ["monthly-active-users", "Monthly active users", Activity],
  ["ai-conversations", "AI conversations", MessageCircle],
  ["journal-entries", "Journal entries", NotebookPen],
]

export default function ScaleImpactDashboard() {
  const [snapshot, setSnapshot] = useState<PublicImpactSnapshot>(defaultImpactSnapshot)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()
    fetch("/api/impact", { signal: controller.signal })
      .then(async (response) => {
        const body = (await response.json()) as PublicImpactSnapshot
        if (body?.schemaVersion === 1 && Array.isArray(body.metrics)) setSnapshot(body)
      })
      .catch(() => undefined)
      .finally(() => setLoading(false))
    return () => controller.abort()
  }, [])

  return (
    <section className="bg-gradient-to-b from-blue-50 to-white py-16 sm:py-20" aria-labelledby="impact-summary-title">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-violet-700">
            {loading ? "Checking reporting status" : snapshot.status === "latest_verified_data" ? "Latest verified data" : "Reporting in progress"}
          </p>
          <h2 id="impact-summary-title" className="text-3xl font-bold text-slate-950 sm:text-4xl">HealthMind impact, reported transparently</h2>
          <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
            We publish only aggregated metrics that have an approved source and definition. Missing data stays visibly unavailable.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map(([id, label, Icon]) => {
            const metric = metricById(snapshot, id)
            const value = formatMetricValue(metric)
            return (
              <article key={id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-violet-700"><Icon className="h-5 w-5" /></div>
                <p className="text-3xl font-bold text-slate-950">{loading ? "…" : value ?? "—"}</p>
                <h3 className="mt-2 font-semibold text-slate-900">{label}</h3>
                <p className="mt-2 text-sm leading-5 text-slate-500">
                  {loading ? "Loading verified reporting data" : value ? "Verified production aggregate" : metric?.publicExplanation ?? "Data collection in progress"}
                </p>
              </article>
            )
          })}
        </div>

        <div className="mt-10 text-center">
          <Link href="/impact" className="inline-flex items-center gap-2 rounded-full bg-violet-700 px-6 py-3 font-semibold text-white transition hover:bg-violet-800">
            View the impact dashboard <ArrowRight className="h-4 w-4" />
          </Link>
          <p className="mt-3 text-xs text-slate-500">No sample figures are used when a source is unavailable.</p>
        </div>
      </div>
    </section>
  )
}
