"use client"

import { useEffect, useMemo, useState, type ComponentType } from "react"
import Link from "next/link"
import {
  Activity,
  AlertCircle,
  BarChart3,
  Building2,
  CalendarDays,
  Clock3,
  FileText,
  Globe2,
  GraduationCap,
  HeartHandshake,
  Hospital,
  ImageIcon,
  Landmark,
  MessageCircle,
  NotebookPen,
  RefreshCw,
  School,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react"
import {
  defaultImpactSnapshot,
  formatMetricValue,
  metricById,
  type PublicImpactMetric,
  type PublicImpactSnapshot,
} from "@/lib/impact"

type Icon = ComponentType<{ className?: string }>

const communityMetrics = [
  ["people-reached", "People reached", Users, "Verified outreach attendance records are required."],
  ["communities-engaged", "Communities engaged", Landmark, "A reviewed definition of a community is required."],
  ["partner-organizations", "Partner organizations", HeartHandshake, "Partner records and publication permission are required."],
  ["outreach-events", "Outreach events", CalendarDays, "Approved completed-event records are required."],
] as const

const platformMetrics = [
  ["registered-accounts", "Registered accounts", Users],
  ["monthly-active-users", "Monthly active users", Activity],
  ["ai-conversations", "AI conversations", MessageCircle],
  ["mood-check-ins", "Mood check-ins", Sparkles],
  ["journal-entries", "Journal entries", NotebookPen],
  ["seven-day-retention", "Seven-day retention", RefreshCw],
] as const

const outcomeMetrics = [
  ["improved-wellbeing", "Reporting improved emotional wellbeing"],
  ["goal-progress", "Progressing toward wellness goals"],
  ["felt-supported", "Feeling better supported"],
  ["would-recommend", "Would recommend HealthMind"],
] as const

const globalReach = [
  ["Countries", Globe2],
  ["Districts", Landmark],
  ["Universities", GraduationCap],
  ["Schools", School],
  ["NGOs", Building2],
  ["Hospitals", Hospital],
] as const

function statusLabel(metric?: PublicImpactMetric) {
  if (!metric) return "Data collection in progress"
  switch (metric.status) {
    case "verified":
      return "Verified"
    case "stale":
      return "Previously verified — refresh delayed"
    case "insufficient_sample":
      return "Insufficient sample size"
    case "error":
      return "Reporting error"
    default:
      return "Data collection in progress"
  }
}

function MetricCard({ metric, label, icon: Icon }: { metric?: PublicImpactMetric; label: string; icon: Icon }) {
  const value = formatMetricValue(metric)
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-700">
        <Icon className="h-5 w-5" />
      </div>
      <p className="text-2xl font-bold text-slate-950">{value ?? "—"}</p>
      <h3 className="mt-1 text-sm font-semibold text-slate-900">{label}</h3>
      <p className="mt-2 text-xs leading-5 text-slate-500">{statusLabel(metric)}</p>
      {metric?.reportingPeriod && <p className="mt-2 text-[11px] text-slate-400">{metric.reportingPeriod}</p>}
    </article>
  )
}

function EmptyMetricCard({ label, icon: Icon, explanation }: { label: string; icon: Icon; explanation: string }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
        <Icon className="h-5 w-5" />
      </div>
      <p className="text-2xl font-bold text-slate-950">—</p>
      <h3 className="mt-1 text-sm font-semibold text-slate-900">{label}</h3>
      <p className="mt-2 text-xs leading-5 text-slate-500">{explanation}</p>
    </article>
  )
}

function OutcomeCard({ label }: { label: string }) {
  return (
    <article className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-[7px] border-slate-100 text-sm font-bold text-slate-400">—</div>
      <div>
        <h3 className="text-sm font-semibold text-slate-900">{label}</h3>
        <p className="mt-1 text-xs leading-5 text-slate-500">Awaiting an approved survey method and sufficient sample.</p>
      </div>
    </article>
  )
}

function SectionHeading({ title, description, href, linkLabel }: { title: string; description: string; href?: string; linkLabel?: string }) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h2 className="text-xl font-bold text-slate-950">{title}</h2>
        <p className="mt-1 text-sm text-slate-500">{description}</p>
      </div>
      {href && linkLabel && <Link href={href} className="text-sm font-semibold text-violet-700 hover:text-violet-900">{linkLabel} →</Link>}
    </div>
  )
}

export default function ImpactDashboard() {
  const [snapshot, setSnapshot] = useState<PublicImpactSnapshot>(defaultImpactSnapshot)
  const [loading, setLoading] = useState(true)
  const [requestError, setRequestError] = useState(false)

  useEffect(() => {
    const controller = new AbortController()
    fetch("/api/impact", { signal: controller.signal })
      .then(async (response) => {
        const data = (await response.json()) as PublicImpactSnapshot
        setSnapshot(data)
        setRequestError(!response.ok)
      })
      .catch((error) => {
        if (error?.name !== "AbortError") setRequestError(true)
      })
      .finally(() => setLoading(false))
    return () => controller.abort()
  }, [])

  const lastVerified = useMemo(() => {
    if (!snapshot.lastVerifiedAt) return null
    return new Intl.DateTimeFormat("en-GB", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: snapshot.timezone,
    }).format(new Date(snapshot.lastVerifiedAt))
  }, [snapshot.lastVerifiedAt, snapshot.timezone])

  return (
    <main className="bg-[#f8f8fc] text-slate-950">
      <section className="border-b border-violet-100 bg-gradient-to-br from-white via-white to-violet-50 px-4 pb-14 pt-32">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.15fr_.85fr] lg:items-center">
          <div>
            <div className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-bold uppercase tracking-wide ${requestError ? "border-amber-200 bg-amber-50 text-amber-800" : "border-emerald-200 bg-emerald-50 text-emerald-800"}`}>
              <span className={`h-2 w-2 rounded-full ${requestError ? "bg-amber-500" : "bg-emerald-500"}`} />
              {loading ? "Checking reporting status" : requestError ? "Reporting error" : snapshot.status === "latest_verified_data" ? "Latest verified data" : "Reporting in progress"}
            </div>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">Our impact, reported responsibly</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">A transparent view of HealthMind’s reach and platform activity. Unsupported figures remain visibly unavailable until their source and methodology are approved.</p>
            <div className="mt-7 flex flex-wrap gap-3 text-sm text-slate-600">
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm"><Clock3 className="h-4 w-4 text-violet-600" />{lastVerified ? `Last verified ${lastVerified}` : "Reporting connection in progress"}</span>
              <Link href="/impact/methodology" className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 font-semibold text-violet-700 shadow-sm"><ShieldCheck className="h-4 w-4" />How we measure impact</Link>
            </div>
          </div>
          <div className="relative min-h-72 overflow-hidden rounded-[2rem] border border-violet-100 bg-gradient-to-br from-violet-100 via-fuchsia-50 to-blue-50 p-8">
            <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-violet-300/30" />
            <div className="relative flex h-full min-h-56 flex-col items-center justify-center rounded-3xl border border-white/80 bg-white/70 text-center shadow-xl backdrop-blur">
              <BarChart3 className="h-12 w-12 text-violet-600" />
              <p className="mt-4 font-semibold text-slate-900">Verified aggregate reporting</p>
              <p className="mt-2 max-w-xs text-sm text-slate-500">No personal records, journal content, conversations, or individual health information are published.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-8 px-4 py-10">
        {requestError && <div className="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900"><AlertCircle className="mt-0.5 h-5 w-5 shrink-0" /><p>The production aggregate is temporarily unavailable. No sample figures have been substituted.</p></div>}

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <SectionHeading title="Community Reach" description="Expanding access through verified outreach activity" href="#stories" linkLabel="View outreach activities" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {communityMetrics.map(([id, label, Icon, explanation]) => <EmptyMetricCard key={id} label={label} icon={Icon} explanation={explanation} />)}
          </div>
        </section>

        <div className="grid gap-8 lg:grid-cols-2">
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <SectionHeading title="Platform Activity" description="Aggregated production-platform activity" href="/impact/methodology" linkLabel="View methodology" />
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {platformMetrics.map(([id, label, Icon]) => <MetricCard key={id} metric={metricById(snapshot, id)} label={label} icon={Icon} />)}
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <SectionHeading title="Wellness Outcomes (Self-Reported)" description="Displayed only after survey, consent, methodology, and sample review" href="/impact/methodology#wellness-outcomes" linkLabel="Learn more" />
            <div className="grid gap-4 sm:grid-cols-2">
              {outcomeMetrics.map(([id, label]) => <OutcomeCard key={id} label={label} />)}
            </div>
          </section>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.25fr_.75fr]">
          <section id="stories" className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <SectionHeading title="Our Impact in Action" description="Approved outreach stories and media" />
            <div className="grid gap-4 md:grid-cols-3">
              {["Outreach story", "Community programme", "Partner activity"].map((title) => (
                <article key={title} className="overflow-hidden rounded-2xl border border-slate-200">
                  <div className="flex aspect-[4/3] items-center justify-center bg-slate-100"><ImageIcon className="h-9 w-9 text-slate-400" /></div>
                  <div className="p-4"><h3 className="font-semibold text-slate-900">{title}</h3><p className="mt-2 text-xs leading-5 text-slate-500">Approved media, caption, date, location, and publication permission pending.</p></div>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <SectionHeading title="Crisis Support" description="Sensitive reporting requires additional review" />
            <div className="rounded-2xl border border-rose-100 bg-rose-50 p-5"><ShieldCheck className="h-7 w-7 text-rose-600" /><h3 className="mt-3 font-semibold text-slate-900">Public aggregate withheld</h3><p className="mt-2 text-sm leading-6 text-slate-600">Crisis-related usage will not be published until clinical, privacy, and legal review is complete.</p></div>
            <p className="mt-4 text-xs leading-5 text-slate-500">HealthMind encourages people in immediate danger to contact local emergency services or an appropriate qualified professional. HealthMind is not a replacement for emergency care.</p>
          </section>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <SectionHeading title="Global Reach" description="Approved programme regions and institutions" />
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {globalReach.map(([label, Icon]) => <div key={label} className="rounded-2xl border border-slate-200 p-4 text-center"><Icon className="mx-auto h-5 w-5 text-violet-600" /><p className="mt-2 text-xl font-bold">—</p><p className="text-xs text-slate-500">{label}</p></div>)}
            </div>
          </section>
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <SectionHeading title="Impact Reports" description="Only reports approved for public distribution appear here" />
            <div className="flex min-h-44 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 text-center"><FileText className="h-8 w-8 text-slate-400" /><p className="mt-3 font-semibold text-slate-800">No approved public reports yet</p><p className="mt-1 text-sm text-slate-500">Report cards will appear when reviewed files are supplied.</p></div>
          </section>
        </div>

        <section className="flex flex-col gap-6 rounded-3xl bg-gradient-to-r from-violet-100 to-fuchsia-50 p-7 sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div className="flex gap-4"><div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-violet-600 text-white"><HeartHandshake className="h-7 w-7" /></div><div><h2 className="text-2xl font-bold text-slate-950">Together, we can build healthier communities.</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">Partner with HealthMind to expand responsible, accessible emotional-wellness support.</p></div></div>
          <a href="mailto:support@healthmindgroup.com?subject=HealthMind%20partnership" className="shrink-0 rounded-full bg-violet-700 px-6 py-3 text-center text-sm font-semibold text-white hover:bg-violet-800">Partner with us</a>
        </section>

        <p className="text-center text-xs text-slate-500">{loading ? "Loading verified reporting status…" : snapshot.publicExplanation ?? "Metrics are published only after source and methodology verification."}</p>
      </div>
    </main>
  )
}
