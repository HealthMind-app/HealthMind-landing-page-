import type { Metadata } from "next"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "Impact Methodology | HealthMind",
  description: "How HealthMind classifies, verifies, and publishes public impact metrics.",
}

const inventory = [
  { id: "registered-accounts", cells: ["Registered accounts", "Created, non-disabled production Firebase Authentication accounts", "Firebase Authentication Admin API", "Count accounts where disabled is false; an approved test-account exclusion rule is still pending", "Cumulative through verification time", "Daily", "Low after aggregation; account status remains private", "Verified", "Show value with reporting period and last verified time"] },
  { id: "monthly-active-users", cells: ["Monthly active users", "Distinct app users active during the trailing 30-day period", "Google Analytics Data API or approved BigQuery export", "Approve the identity, qualifying activity event, timezone, employee/test-user, bot, and consent filters before querying", "Trailing 30 days", "Daily", "Publish only above an approved minimum-group threshold", "Unavailable — Analytics stream not yet verified", "Data collection in progress"] },
  { id: "ai-conversations", cells: ["AI conversations", "Completed, meaningful AI-support interactions", "Firebase Analytics chat_started event or approved server-side aggregate", "The app emits chat_started; approve the conversation boundary, completion rule, retries, debug traffic, and test-user exclusions, then verify production receipt", "Calendar month", "Daily", "Never publish message content, prompts, response text, conversation IDs, or individual-user counts", "Unavailable — event and definition need verification", "Data collection in progress"] },
  { id: "mood-check-ins", cells: ["Mood check-ins", "Completed structured mood or wellness check-ins", "Privacy-reviewed aggregate completion event", "A mood_logged analytics method exists, but the current production check-in flow does not call it; approve new tracking and log only completion, never mood values", "Calendar month", "Daily", "Mental-health disclosure; require consent review and a minimum-group threshold", "Unavailable — no verified production event", "Data collection in progress"] },
  { id: "journal-entries", cells: ["Journal entries", "Journal entries successfully saved on-device", "Firebase Analytics journal_entry_created completion event", "The app emits a content-free completion event after local save; verify production receipt and exclude debug/test traffic", "Calendar month", "Daily", "Never transmit or publish journal titles, text, sentiment, user IDs, or individual history", "Unavailable — event receipt not verified", "Data collection in progress"] },
  { id: "seven-day-retention", cells: ["Seven-day retention", "Users returning within an approved seven-day cohort window", "Google Analytics Data API or approved BigQuery export", "Approve cohort entry, qualifying return event, attribution, timezone, consent, test-user exclusions, and minimum sample size", "Monthly cohorts", "Monthly", "Publish only aggregated cohorts above the approved threshold", "Derived — formula not approved", "Data collection in progress"] },
  { id: "people-reached", cells: ["People reached", "Attendance across completed, approved outreach activities", "Reviewed outreach event register and attendance reports", "Sum approved attendee totals after an agreed duplicate-attendance rule", "Quarterly and cumulative", "Quarterly", "Do not publish attendee identities; apply small-group and consent rules", "Unavailable — source register required", "Data collection in progress"] },
  { id: "communities-engaged", cells: ["Communities engaged", "Distinct approved communities with completed HealthMind activity", "Reviewed outreach event register", "Count distinct stable community IDs after the public definition of community is approved", "Quarterly and cumulative", "Quarterly", "Avoid publishing small or identifiable groups without permission", "Derived — definition not approved", "Data collection in progress"] },
  { id: "partner-organizations", cells: ["Partner organizations", "Organizations with confirmed HealthMind activity", "Approved partner register", "Count unique active organizations marked publishable; names and logos require separate permission", "Current quarter and cumulative", "Quarterly", "Organization names, logos, and relationship status require publication approval", "Unavailable — approved register required", "Data collection in progress"] },
  { id: "outreach-events", cells: ["Outreach events", "Completed HealthMind workshops, campaigns, or activations", "Reviewed outreach event register", "Count events with completed status, an approved event type, date, and verification record", "Quarterly and cumulative", "Quarterly", "Media, captions, locations, and participant counts require review", "Unavailable — approved event records required", "Data collection in progress"] },
  { id: "global-reach", cells: ["Global reach", "Distinct countries, districts, institutions, and organization types reached", "Approved outreach and partner registers", "Count distinct approved location and institution IDs using reviewed category definitions", "Quarterly and cumulative", "Quarterly", "Coarse public geography only; suppress small or sensitive locations", "Derived — source and definitions not approved", "Data collection in progress"] },
  { id: "wellness-outcomes", cells: ["Wellness outcomes", "Self-reported change measured with an approved instrument", "Consent-based survey dataset", "Requires a defined instrument, consent, representative sample, minimum-sample rule, reporting period, exclusions, and clinical review", "To be approved", "To be approved", "Sensitive health data and risk of implying medical efficacy", "Sensitive / unavailable", "Omit outcome values"] },
  { id: "crisis-support", cells: ["Crisis support", "Use of crisis-information and professional-referral resources", "No public source approved", "No public calculation approved", "Not applicable", "Not applicable", "Crisis events are highly sensitive and require clinical, privacy, and legal review", "Sensitive / unsafe", "Withheld from public reporting"] },
  { id: "impact-reports", cells: ["Impact reports", "Reviewed reports approved for public distribution", "Approved final PDF and publication record", "No numerical calculation; publish only the exact approved file with its title, period, version, and approval date", "Per report", "When approved", "Reports must be checked for personal, partner, clinical, and confidential information", "Unavailable — no approved report supplied", "No download shown"] },
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
              <tbody>{inventory.map((row) => <tr key={row.id} className="align-top odd:bg-white even:bg-slate-50/60">{row.cells.map((cell, index) => <td key={`${row.id}-${index}`} id={index === 0 ? row.id : undefined} className="border-b border-slate-100 px-4 py-4 leading-6 text-slate-600 first:font-semibold first:text-slate-950">{cell}</td>)}</tr>)}</tbody>
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
