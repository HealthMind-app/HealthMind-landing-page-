"use client"

import { motion } from "framer-motion"
import Logo from "./logo"

export default function AnimatedHeart() {
    return (
        <motion.div
            className="flex items-center justify-center"
            animate={{
                scale: [1, 1.04, 1],
            }}
            transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
            }}
        >
            <Logo imageUrl="/company-logo.png" size="xl" />
        </motion.div>
    )
}
