"use client"

import { useState } from "react"
import { CheckCircle2, Loader2 } from "lucide-react"

/** Requires a click so link-scanning mail filters can't unsubscribe people. */
export default function UnsubscribeConfirm({ token }: { token: string }) {
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle")
  const [error, setError] = useState("")

  async function confirm() {
    setState("loading")
    try {
      const response = await fetch(`/api/unsubscribe?token=${encodeURIComponent(token)}`, { method: "POST" })
      if (response.ok) {
        setState("done")
        return
      }
      const data = await response.json().catch(() => ({}))
      setError(typeof data.error === "string" ? data.error : "We couldn't update your preferences. Please try again.")
      setState("error")
    } catch {
      setError("Network error. Please try again.")
      setState("error")
    }
  }

  if (state === "done") {
    return (
      <p role="status" className="mx-auto mt-6 flex max-w-xl items-center justify-center gap-2 rounded-xl bg-green-50 p-4 text-sm font-medium text-green-900">
        <CheckCircle2 className="h-5 w-5" /> You&apos;re unsubscribed from HealthMind marketing emails.
      </p>
    )
  }

  return (
    <div className="mx-auto mt-6 max-w-xl">
      <button
        type="button"
        onClick={confirm}
        disabled={state === "loading"}
        className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 font-semibold text-white hover:bg-slate-800 disabled:opacity-60"
      >
        {state === "loading" && <Loader2 className="h-4 w-4 animate-spin" />}
        Unsubscribe from marketing emails
      </button>
      <p className="mt-3 text-xs text-slate-500">
        You&apos;ll still receive essential account emails, such as password resets and security notices.
      </p>
      {state === "error" && <p role="alert" className="mt-3 text-sm text-red-600">{error}</p>}
    </div>
  )
}
