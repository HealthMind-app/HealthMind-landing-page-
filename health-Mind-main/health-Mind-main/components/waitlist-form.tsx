"use client";

import type React from "react";

import { useState } from "react";
import { motion } from "framer-motion";
import { PartyPopper } from "lucide-react";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError("Email is required");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setIsSuccess(true);
        setEmail("");
        setTimeout(() => setIsSuccess(false), 3500);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-xl mx-auto flex flex-col items-center gap-3 px-4 sm:px-0"
    >
      {/* Success bubble */}
      {isSuccess && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-[#22C55E] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-md text-center text-xs sm:text-sm flex items-center gap-2"
        >
          <PartyPopper className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
          Welcome aboard! You're officially on the waitlist.
        </motion.div>
      )}

      <div className="flex flex-col sm:flex-row w-full items-stretch sm:items-center bg-white shadow-lg border border-gray-200 rounded-lg p-2 gap-2 sm:gap-0">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          disabled={isLoading}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 px-4 sm:px-6 py-3 bg-transparent focus:outline-none text-sm text-gray-700 placeholder-gray-400 rounded-md sm:rounded-full"
          required
          aria-label="Email address"
          suppressHydrationWarning
        />

        <motion.button
          type="submit"
          disabled={isLoading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="flex-shrink-0 px-4 sm:px-6 py-3 bg-gradient-to-r from-[#1E6FFB] to-[#1AD4B8] rounded-full text-white text-xs sm:text-sm font-semibold shadow-md whitespace-nowrap cursor-pointer"
        >
          {isLoading ? "Joining..." : "Join the Waitlist"}
        </motion.button>
      </div>

      {error && <p className="text-red-500 text-xs sm:text-sm mt-1">{error}</p>}

      <p className="text-xs text-gray-500 text-center">
        7-day free trial · No credit card required · Cancel anytime
      </p>
    </form>
  );
}
