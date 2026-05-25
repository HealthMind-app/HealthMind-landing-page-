"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Logo from "./logo"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { PartyPopper, Menu, X } from "lucide-react"

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "Our Story" },
    { href: "/download", label: "Download" },
]

export default function Navbar() {
    const [showInput, setShowInput] = useState(false)
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState("")
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        if (!showInput) return

        const dismissTimer = setTimeout(() => {
            setShowInput(false)
        }, 60000)

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
            <div className="max-w-6xl mx-auto px-3 sm:px-4 py-3 sm:py-4 flex items-center justify-between gap-2 sm:gap-4">
                {/* LEFT — Logo + Nav Links */}
                <div className="flex items-center gap-4 sm:gap-8">
                    <Link href="/" className="flex items-center gap-2 cursor-pointer min-w-fit">
                        <Logo size="lg" imageUrl="company-logo.png" />
                        <span className="font-bold text-sm sm:text-lg bg-gradient-to-r from-[#1E6FFB] to-[#1AD4B8] bg-clip-text text-transparent">
                            HealthMind
                        </span>
                    </Link>

                    {/* Desktop Nav Links */}
                    <div className="hidden md:flex items-center gap-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`text-sm font-medium transition-colors ${
                                    pathname === link.href
                                        ? "text-[#1E6FFB]"
                                        : "text-[#575757] hover:text-[#1E6FFB]"
                                }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* RIGHT — Waitlist CTA + Mobile Menu */}
                <div className="flex items-center gap-2 sm:gap-3 relative flex-wrap justify-end">
                    {/* Desktop: Success + Waitlist Form */}
                    <div className="hidden sm:flex items-center gap-2">
                        <AnimatePresence>
                            {success && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8, y: -5 }}
                                    className="bg-[#22C55E] text-white px-3 sm:px-6 py-2 sm:py-3 rounded-full shadow-md text-center text-xs sm:text-sm flex items-center gap-2 whitespace-nowrap"
                                >
                                    <PartyPopper className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                                    <span>Welcome aboard!</span>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <AnimatePresence>
                            {showInput ? (
                                <motion.div
                                    initial={{ opacity: 0, x: 30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 30 }}
                                    transition={{ duration: 0.35 }}
                                    className="flex items-center bg-white shadow-lg border border-gray-200 rounded-full p-1 pl-3 sm:pl-4 gap-1 sm:gap-2"
                                >
                                    <input
                                        autoFocus
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter email"
                                        disabled={loading}
                                        className="flex-1 w-32 sm:w-40 px-2 py-2 bg-transparent focus:outline-none text-xs sm:text-sm text-gray-700 placeholder-gray-400 rounded-full"
                                    />
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
                            ) : (
                                <motion.button
                                    onClick={() => setShowInput(true)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-3 sm:px-6 py-2 rounded-full bg-gradient-to-r from-[#1E6FFB] to-[#1AD4B8] text-white font-semibold text-xs sm:text-sm hover:shadow-md cursor-pointer whitespace-nowrap flex-shrink-0"
                                >
                                    Join Waitlist
                                </motion.button>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Mobile: Menu Button + Simplified CTA */}
                    <div className="flex md:hidden items-center gap-2">
                        <Link
                            href="/download"
                            className="px-3 py-2 rounded-full bg-gradient-to-r from-[#1E6FFB] to-[#1AD4B8] text-white font-semibold text-xs hover:shadow-md"
                        >
                            Get App
                        </Link>
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2 text-[#575757] hover:text-[#1E6FFB] transition-colors"
                        >
                            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
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

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden border-t border-[#E5E7EB] bg-white"
                    >
                        <div className="px-4 py-4 space-y-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`block py-2 text-sm font-medium ${
                                        pathname === link.href
                                            ? "text-[#1E6FFB]"
                                            : "text-[#575757] hover:text-[#1E6FFB]"
                                    }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <div className="pt-2 border-t border-[#E5E7EB]">
                                <Link
                                    href="/privacy-policy"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="block py-2 text-xs text-[#575757] hover:text-[#1E6FFB]"
                                >
                                    Privacy Policy
                                </Link>
                                <Link
                                    href="/terms-and-conditions"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="block py-2 text-xs text-[#575757] hover:text-[#1E6FFB]"
                                >
                                    Terms & Conditions
                                </Link>
                                <Link
                                    href="/account-deletion"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="block py-2 text-xs text-[#575757] hover:text-[#1E6FFB]"
                                >
                                    Account Deletion
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}
