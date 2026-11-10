import type { Metadata } from "next"
import Link from "next/link"
import GuardianConsentForm from "@/components/guardian-consent-form"
import { LEGAL } from "@/lib/legal"
import { loadGuardianRequest, type GuardianRequest } from "@/lib/server/guardian-consent"
import { RequestError } from "@/lib/server/request"

export const metadata: Metadata = {
  title: "Parent or guardian approval | HealthMind",
  robots: { index: false, follow: false },
  referrer: "no-referrer",
}
export const dynamic = "force-dynamic"

function Shell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50/30 to-white px-4 py-16">
      <main className="mx-auto max-w-2xl space-y-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-10">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">{title}</h1>
        {children}
      </main>
    </div>
  )
}

export default async function GuardianConsentPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string | string[] }>
}) {
  const { token } = await searchParams
  const value = typeof token === "string" ? token : ""

  let request: GuardianRequest
  try {
    request = await loadGuardianRequest(value)
  } catch (error) {
    const message =
      error instanceof RequestError ? error.message : "We could not load this request. Please try again later."
    return (
      <Shell title="This link can't be used">
        <p className="text-gray-700">{message}</p>
        <p className="text-sm text-gray-600">
          Questions? Email <a className="text-green-700 underline" href={`mailto:${LEGAL.privacyEmail}`}>{LEGAL.privacyEmail}</a>.
        </p>
      </Shell>
    )
  }

  const name = request.teenName
  return (
    <Shell title={`${name} would like to use HealthMind`}>
      {request.status !== "pending" && (
        <p className="rounded-xl bg-slate-100 p-4 text-sm text-slate-800">
          You already {request.status} this request. You can change your decision below.
        </p>
      )}
      <div className="space-y-4 text-gray-700 leading-relaxed">
        <p>
          {name} gave us this email address as their parent or guardian. HealthMind is for people aged{" "}
          {LEGAL.minimumAge} and over, and anyone under {LEGAL.adultAge} needs your approval first.
        </p>
        <h2 className="text-lg font-semibold text-gray-900">What HealthMind is</h2>
        <ul className="list-disc space-y-1.5 pl-6">
          <li>A mental wellbeing app for tracking mood, check-ins and goals, keeping a private journal, and self-care activities.</li>
          <li>It includes Alverna, an AI companion. For users under 18, Alverna follows extra safety rules and encourages talking to a trusted adult.</li>
          <li>It is <strong>not a medical service</strong> and cannot respond to emergencies.</li>
        </ul>
        <h2 className="text-lg font-semibold text-gray-900">What approving means</h2>
        <ul className="list-disc space-y-1.5 pl-6">
          <li>HealthMind will process {name}&apos;s information, including health and wellbeing information, as described in our <Link className="text-green-700 underline" href="/privacy-policy">Privacy Policy</Link>.</li>
          <li>We never sell their data or use it for advertising.</li>
          <li>Their journal and conversations stay private to them. Approving does not give you access to what they write.</li>
          <li>You can withdraw approval or ask us to delete their account at any time by emailing {LEGAL.privacyEmail}.</li>
        </ul>
      </div>
      <GuardianConsentForm token={value} teenName={name} />
      <p className="text-xs text-gray-500">
        HealthMind is operated by {LEGAL.entityName}, {LEGAL.registeredAddress}. If you did not expect this, you can
        ignore it and the account will stay inactive.
      </p>
    </Shell>
  )
}
