"use client";

import type React from "react";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { PartyPopper } from "lucide-react";
import { useWaitlistSignup, type WaitlistSource } from "@/lib/use-waitlist-signup";

export default function WaitlistForm({ source = "hero" }: { source?: WaitlistSource }) {
  const { email, setEmail, company, setCompany, loading, success, setSuccess, error, submit } =
    useWaitlistSignup(source);

  useEffect(() => {
    if (!success) return;
    const timer = setTimeout(() => setSuccess(false), 3500);
    return () => clearTimeout(timer);
  }, [success, setSuccess]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submit();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative w-full max-w-xl mx-auto flex flex-col items-center gap-3 px-4 sm:px-0"
    >
      {/* Success bubble */}
      {success && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          role="status"
          className="bg-[#22C55E] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-md text-center text-xs sm:text-sm flex items-center gap-2"
        >
          <PartyPopper className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
          Welcome aboard! You&apos;re on the list for HealthMind updates.
        </motion.div>
      )}

      {/* Honeypot field, hidden from people and assistive technology */}
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

      <div className="flex flex-col sm:flex-row w-full items-stretch sm:items-center bg-white shadow-lg border border-gray-200 rounded-lg p-2 gap-2 sm:gap-0">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          disabled={loading}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 px-4 sm:px-6 py-3 bg-transparent focus:outline-none text-sm text-gray-700 placeholder-gray-400 rounded-md sm:rounded-full"
          required
          aria-label="Email address"
          suppressHydrationWarning
        />

        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="flex-shrink-0 px-4 sm:px-6 py-3 bg-gradient-to-r from-[#1E6FFB] to-[#1AD4B8] rounded-full text-white text-xs sm:text-sm font-semibold shadow-md whitespace-nowrap cursor-pointer"
        >
          {loading ? "Joining..." : "Join the Waitlist"}
        </motion.button>
      </div>

      {error && <p role="alert" className="text-red-500 text-xs sm:text-sm mt-1">{error}</p>}

      <p className="text-xs text-gray-500 text-center">
        We&apos;ll only email you about HealthMind updates. See our{" "}
        <a href="/privacy-policy" className="underline hover:text-gray-700">Privacy Policy</a>.
      </p>
    </form>
  );
}
