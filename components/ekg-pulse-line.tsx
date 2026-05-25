"use client"

import { motion } from "framer-motion"

export default function EKGPulseLine() {
    return (
        <div className="w-full h-32 flex items-center justify-center relative overflow-hidden">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 100" preserveAspectRatio="none">
                <defs>
                    <linearGradient id="ekgGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#1E6FFB" stopOpacity="0" />
                        <stop offset="30%" stopColor="#1E6FFB" stopOpacity="1" />
                        <stop offset="70%" stopColor="#1AD4B8" stopOpacity="1" />
                        <stop offset="100%" stopColor="#1AD4B8" stopOpacity="0" />
                    </linearGradient>
                    <filter id="glowFilter">
                        <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                <motion.path
                    d="M 0 50 L 100 50 L 120 35 L 140 65 L 160 50 L 300 50 L 320 45 L 340 55 L 360 50 L 1000 50"
                    stroke="url(#ekgGradient)"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    filter="url(#glowFilter)"
                    initial={{ strokeDasharray: 1000, strokeDashoffset: 1000 }}
                    animate={{ strokeDashoffset: -1000 }}
                    transition={{
                        duration: 7,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                    }}
                />

                <motion.circle
                    cx="140"
                    cy="65"
                    r="8"
                    fill="none"
                    stroke="#FF5A84"
                    strokeWidth="2"
                    opacity="0.4"
                    initial={{ r: 8, opacity: 0.4 }}
                    animate={{ r: 20, opacity: 0 }}
                    transition={{
                        duration: 1.5,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatDelay: 5.5,
                    }}
                />
            </svg>

            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white pointer-events-none" />
        </div>
    )
}
