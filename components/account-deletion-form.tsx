"use client";

import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";

export default function AccountDeletionForm() {
  const [email, setEmail] = useState("");
  const [details, setDetails] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [company, setCompany] = useState(""); // honeypot
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [requestId, setRequestId] = useState("");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    if (!confirm) {
      setError("Please confirm that you want your account deleted.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("/api/account-deletion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, details, confirm, company }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        setError(typeof data.error === "string" ? data.error : "Something went wrong. Please try again.");
        return;
      }
      setRequestId(typeof data.requestId === "string" ? data.requestId : "received");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (requestId) {
    return (
      <div role="status" className="mt-6 rounded-xl border border-green-200 bg-green-50 p-5 text-green-900">
        <p className="flex items-center gap-2 font-semibold">
          <CheckCircle2 className="h-5 w-5" /> Request received
        </p>
        <p className="mt-2 text-sm leading-6">
          We&apos;ll contact you at <strong>{email}</strong> to verify that you own the account before anything is deleted.
          {requestId !== "received" && <> Your reference is <code className="rounded bg-white px-1">{requestId}</code>.</>}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="relative mt-6 space-y-4">
      <input
        type="text"
        name="company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />
      <div>
        <label htmlFor="deletion-email" className="block text-sm font-medium text-gray-800">
          Email address on your HealthMind account
        </label>
        <input
          id="deletion-email"
          type="email"
          required
          maxLength={254}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-100"
        />
      </div>
      <div>
        <label htmlFor="deletion-details" className="block text-sm font-medium text-gray-800">
          Anything we should know? <span className="font-normal text-gray-500">(optional)</span>
        </label>
        <textarea
          id="deletion-details"
          rows={3}
          maxLength={1000}
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          disabled={loading}
          className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-100"
        />
      </div>
      <label className="flex items-start gap-3 text-sm text-gray-700">
        <input
          type="checkbox"
          checked={confirm}
          onChange={(e) => setConfirm(e.target.checked)}
          disabled={loading}
          className="mt-1 h-4 w-4 accent-green-600"
        />
        I understand that deleting my account permanently removes my HealthMind data and cannot be undone.
      </label>
      {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="inline-flex items-center gap-2 rounded-full bg-green-600 px-6 py-3 text-sm font-semibold text-white hover:bg-green-700 disabled:opacity-60"
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        Submit deletion request
      </button>
    </form>
  );
}
