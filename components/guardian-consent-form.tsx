"use client"

import { useState } from "react"
import { CheckCircle2, Loader2, XCircle } from "lucide-react"

type Decision = "approve" | "decline"

export default function GuardianConsentForm({ token, teenName }: { token: string; teenName: string }) {
  const [confirmed, setConfirmed] = useState(false)
  const [pending, setPending] = useState<Decision | null>(null)
  const [result, setResult] = useState<"approved" | "declined" | null>(null)
  const [error, setError] = useState("")

  async function submit(decision: Decision) {
    setError("")
    if (decision === "approve" && !confirmed) {
      setError("Please tick the box to confirm you are their parent or guardian.")
      return
    }
    setPending(decision)
    try {
      const response = await fetch("/api/guardian-consent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, decision, confirm: confirmed }),
      })
      const data = await response.json().catch(() => ({}))
      if (!response.ok) {
        setError(typeof data.error === "string" ? data.error : "Something went wrong. Please try again.")
        return
      }
      setResult(data.status === "approved" ? "approved" : "declined")
    } catch {
      setError("Network error. Please try again.")
    } finally {
      setPending(null)
    }
  }

  if (result === "approved") {
    return (
      <p role="status" className="flex items-start gap-3 rounded-xl bg-green-50 p-4 text-green-900">
        <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0" />
        <span>
          Thank you. {teenName} can now use HealthMind. They may need to tap &quot;They approved, check again&quot; in the
          app. You can withdraw approval at any time by emailing support@healthmindgroup.com.
        </span>
      </p>
    )
  }
  if (result === "declined") {
    return (
      <p role="status" className="flex items-start gap-3 rounded-xl bg-slate-100 p-4 text-slate-800">
        <XCircle className="mt-0.5 h-5 w-5 flex-shrink-0" />
        <span>
          You declined. {teenName}&apos;s account will stay inactive. To have it deleted, email
          support@healthmindgroup.com.
        </span>
      </p>
    )
  }

  return (
    <div className="space-y-4">
      <label className="flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-4 text-sm text-gray-700">
        <input
          type="checkbox"
          checked={confirmed}
          onChange={(event) => setConfirmed(event.target.checked)}
          className="mt-1 h-4 w-4 accent-green-600"
        />
        <span>
          I am {teenName}&apos;s parent or legal guardian. I have read the Privacy Policy and I consent to HealthMind
          processing their information, including health and wellbeing information, as it describes.
        </span>
      </label>
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => submit("approve")}
          disabled={pending !== null}
          className="inline-flex items-center gap-2 rounded-full bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700 disabled:opacity-60"
        >
          {pending === "approve" && <Loader2 className="h-4 w-4 animate-spin" />}
          Approve
        </button>
        <button
          type="button"
          onClick={() => submit("decline")}
          disabled={pending !== null}
          className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-800 hover:bg-gray-50 disabled:opacity-60"
        >
          {pending === "decline" && <Loader2 className="h-4 w-4 animate-spin" />}
          Decline
        </button>
      </div>
      {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
    </div>
  )
}
