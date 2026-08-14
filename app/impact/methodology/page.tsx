import type { Metadata } from "next"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "Impact Methodology | HealthMind",
  description: "How HealthMind classifies, verifies, and publishes public impact metrics.",
}

const inventory = [
  ["Registered accounts", "Created, non-disabled production Firebase Authentication accounts", "Firebase Authentication Admin API", "Count users where disabled is false", "Cumulative through verification time", "Daily", "Low after aggregation; account status remains private", "Verified", "Show value with last verified time"],
  ["Monthly active users", "Distinct app users active during the trailing 30-day period", "Firebase / Google Analytics", "Pending: approve identity, activity-event, timezone, bot, test-user, and employee filters", "Trailing 30 days", "Daily", "Minimum-group threshold and consent review required", "Unavailable", "Data collection in progress"],
  ["AI conversations", "Completed, meaningful AI support interactions", "Approved aggregate event or server logs", "Pending: define conversation boundary, completion, retries, tests, and deletions", "Calendar month", "Daily", "Never publish message content, prompts, response text, or conversation IDs", "Unavailable", "Data collection in progress"],
  ["Mood check-ins", "Completed structured wellness check-ins", "Production aggregate event or approved database record", "Pending: define completion and exclude drafts/tests", "Calendar month", "Daily", "Mental-health disclosure; publish only aggregate above approved threshold", "Unavailable", "Data collection in progress"],
  ["Journal entries", "Saved journal entries", "No approved central source; current records are on-device", "No calculation approved", "Not applicable", "Not applicable", "Highly sensitive content; never transmit content for this metric", "Unavailable", "Not yet available"],
  ["Seven-day retention", "Users returning within an approved seven-day cohort window", "Firebase / Google Analytics", "Pending: approve cohort entry, return event, attribution, timezone, and exclusions", "Monthly cohorts", "Monthly", "Publish only aggregated cohorts above threshold", "Derived — not approved", "Data collection in progress"],
  ["Community reach", "People participating in approved outreach activities", "Reviewed outreach attendance reports", "Pending deduplication and attendance definition", "Quarterly", "Quarterly", "Consent, duplicate attendance, and small-group risk", "Unavailable", "Data collection in progress"],
  ["Partner organizations", "Organizations with confirmed HealthMind activity", "Approved partner register", "Count unique active, publishable organizations", "Current reporting quarter", "Quarterly", "Names require publication permission", "Unavailable", "Data collection in progress"],
  ["Wellness outcomes", "Self-reported change measured with an approved instrument", "Consent-based survey dataset", "Not defined; requires instrument, representative sample, threshold, and clinical review", "To be approved", "To be approved", "Sensitive health data and risk of implying medical efficacy", "Sensitive / unavailable", "Omit outcome values"],
  ["Crisis support", "Use of crisis-information and professional-referral resources", "No public source approved", "No public calculation approved", "Not applicable", "Not applicable", "Crisis events are highly sensitive and require added clinical, privacy, and legal review", "Sensitive / unsafe", "Withheld from public reporting"],
] as const

export default function ImpactMethodologyPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 pb-20 pt-32 sm:px-6">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-700">How we measure impact</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">Metric inventory and publication rules</h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">This inventory separates metrics we can verify today from definitions and data sources that still require approval. A blank or unavailable result is never replaced with a sample statistic.</p>
        </div>

        <section className="mt-10 grid gap-4 md:grid-cols-2" aria-label="Status definitions">
          {[
            ["Verified", "Available from an approved production source and displayed with its reporting period and verification time."],
            ["Derived", "Calculated only after its formula, filters, exclusions, timezone, and reporting period are reviewed."],
            ["Unavailable", "Not collected or not validated; the public dashboard shows an explicit unavailable state, never a substitute zero."],
            ["Sensitive or unsafe", "Omitted or replaced with a reviewed aggregate statement when publication could expose or stigmatize people."],
          ].map(([title, description]) => <article key={title} className="rounded-2xl border border-slate-200 bg-white p-5"><h2 className="font-bold text-slate-950">{title}</h2><p className="mt-2 text-sm leading-6 text-slate-600">{description}</p></article>)}
        </section>

        <section className="mt-12" aria-labelledby="inventory-title">
          <h2 id="inventory-title" className="text-2xl font-bold text-slate-950">Current metric inventory</h2>
          <div className="mt-5 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
            <table className="min-w-[1450px] border-collapse text-left text-sm">
              <thead className="bg-slate-100 text-slate-700"><tr>{["Metric", "Intended meaning", "Proposed source", "Calculation", "Reporting period", "Update frequency", "Privacy risk", "Verification status", "Public display state"].map((heading) => <th key={heading} className="border-b border-slate-200 px-4 py-3 font-semibold">{heading}</th>)}</tr></thead>
              <tbody>{inventory.map((row) => <tr key={row[0]} className="align-top odd:bg-white even:bg-slate-50/60">{row.map((cell, index) => <td key={`${row[0]}-${index}`} id={index === 0 ? row[0].toLowerCase().replaceAll(" ", "-") : undefined} className="border-b border-slate-100 px-4 py-4 leading-6 text-slate-600 first:font-semibold first:text-slate-950">{cell}</td>)}</tr>)}</tbody>
            </table>
          </div>
        </section>

        <section className="mt-10 rounded-2xl border border-amber-200 bg-amber-50 p-6">
          <h2 className="font-bold text-amber-950">Approvals still required</h2>
          <p className="mt-2 text-sm leading-6 text-amber-900">Product and privacy approval is required for definitions, minimum-group thresholds, consent, filters, and publication rules. Clinical and legal review is additionally required before any wellness-outcome or crisis-related metric can appear publicly.</p>
        </section>
      </main>
      <Footer />
    </div>
  )
}
