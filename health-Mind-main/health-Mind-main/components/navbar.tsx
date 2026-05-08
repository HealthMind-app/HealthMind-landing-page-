"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Logo from "./logo"
import { PartyPopper } from "lucide-react"

export default function Navbar() {
    const [showInput, setShowInput] = useState(false)
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {
        if (!showInput) return

        const dismissTimer = setTimeout(() => {
            setShowInput(false)
        }, 60000) // 1 minute

        return () => clearTimeout(dismissTimer)
    }, [showInput])

    const handleSubmit = async () => {
        if (!email) {
            setError("Email is required")
            return
        }

        setLoading(true)
        setError("")

        try {
            const res = await fetch("/api/waitlist", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            })

            if (res.ok) {
                setSuccess(true)
                setEmail("")
                setTimeout(() => {
                    setSuccess(false)
                    setShowInput(false)
                }, 1500)
            } else {
                setError("Something went wrong, please try again.")
            }
        } catch {
            setError("Network error, please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#E5E7EB]">
            <div className="max-w-6xl mx-auto px-3 sm:px-4 py-3 sm:py-4 flex items-center justify-between gap-2 sm:gap-3">
                {/* LEFT — Logo */}
                <div className="flex items-center gap-2 cursor-pointer min-w-fit">
                    <Logo size="lg" imageUrl="company-logo.png" />
                    <span className="font-bold text-sm sm:text-lg bg-gradient-to-r from-[#1E6FFB] to-[#1AD4B8] bg-clip-text text-transparent">
                        HealthMind
                    </span>
                </div>

                {/* RIGHT — Input + CTA */}
                <div className="flex items-center gap-2 sm:gap-3 relative flex-wrap justify-end w-full sm:w-auto">
                    {/* Success Bubble */}
                    <AnimatePresence>
                        {success && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8, y: -5 }}
                                className="bg-[#22C55E] text-white px-3 sm:px-6 py-2 sm:py-3 rounded-full shadow-md text-center text-xs sm:text-sm flex items-center gap-2 whitespace-nowrap"
                            >
                                <PartyPopper className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                                <span className="hidden sm:inline">Welcome aboard!</span>
                                <span className="sm:hidden">Success!</span>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Email Input + Join Button (Side by side) */}
                    <AnimatePresence>
                        {showInput && (
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 30 }}
                                transition={{ duration: 0.35 }}
                                className="
                                        flex flex-wrap 
                                        items-center 
                                        bg-white shadow-lg 
                                        border border-gray-200 
                                        rounded-full 
                                        p-1 pl-3 sm:pl-4 
                                        gap-1 sm:gap-2 
                                        max-w-full
"                            >
                                {/* Input field */}
                                <input
                                    autoFocus
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter email"
                                    disabled={loading}
                                    className="
                                            flex-1 
                                            w-full sm:w-auto
                                            px-2 py-2 
                                            bg-transparent 
                                            focus:outline-none 
                                            text-xs sm:text-sm 
                                            text-gray-700 
                                            placeholder-gray-400 
                                            rounded-full
                                            "
                                />

                                {/* Join Button Only */}
                                <motion.button
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    onClick={handleSubmit}
                                    disabled={loading}
                                    className="px-3 sm:px-5 py-2 bg-gradient-to-r from-[#1E6FFB] to-[#1AD4B8] rounded-full text-white text-xs font-semibold shadow-md whitespace-nowrap flex-shrink-0"
                                >
                                    {loading ? "Joining..." : "Join"}
                                </motion.button>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Main Waitlist Button - Toggles input visibility */}
                    {!showInput && (
                        <motion.button
                            onClick={() => setShowInput(true)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-3 sm:px-6 py-2 rounded-full bg-gradient-to-r from-[#1E6FFB] to-[#1AD4B8] text-white font-semibold text-xs sm:text-sm hover:shadow-md cursor-pointer whitespace-nowrap flex-shrink-0"
                        >
                            Waitlist
                        </motion.button>
                    )}
                </div>
            </div>

            {/* Error message */}
            {error && (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center text-red-500 text-xs mt-1 px-3"
                >
                    {error}
                </motion.p>
            )}
        </nav>
    )
}
