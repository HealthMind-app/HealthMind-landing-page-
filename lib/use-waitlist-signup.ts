"use client";

import { useState } from "react";

export type WaitlistSource = "hero" | "navbar" | "final-cta";

/** Shared submit logic for every waitlist form on the site. */
export function useWaitlistSignup(source: WaitlistSource) {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState(""); // honeypot
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function submit(): Promise<boolean> {
    if (!email.trim()) {
      setError("Email is required");
      return false;
    }
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, company, source }),
      });
      if (response.ok) {
        setSuccess(true);
        setEmail("");
        return true;
      }
      const data = await response.json().catch(() => ({}));
      setError(typeof data.error === "string" ? data.error : "Something went wrong. Please try again.");
      return false;
    } catch {
      setError("Network error. Please try again.");
      return false;
    } finally {
      setLoading(false);
    }
  }

  return { email, setEmail, company, setCompany, loading, success, setSuccess, error, submit };
}
