"use client";
import { motion } from "framer-motion";
import Logo from "./logo";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: "/instagram.png",
      label: "Instagram",
      url: "https://www.instagram.com/healthmind.app_01/?igsh=MWdjZWE2aHJwZHN4Zg%3D%3D&utm_source=qr",
    },
    {
      icon: "/tiktok.png",
      label: "TikTok",
      url: "https://www.tiktok.com/@healthmind01",
    },
    {
      icon: "/linkedin.png",
      label: "LinkedIn",
      url: "https://www.linkedin.com/company/healthmind-group/",
    },
    {
      icon: "/youtube.svg",
      label: "YouTube",
      url: "https://www.youtube.com/@HealthMind-app",
    },
  ];

  return (
    <footer className="bg-[#0A0A0A] text-white py-12 sm:py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 mb-8 sm:mb-12">
          {/* Brand & Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-lg sm:text-xl font-bold mb-2 bg-gradient-to-r from-[#1E6FFB] to-[#1AD4B8] bg-clip-text text-transparent">
              HealthMind
            </h3>

            <p className="text-xs sm:text-sm text-white/70 leading-relaxed text-pretty mb-4">
              Your Health, Your Mind, Your Future
            </p>

            {/* Founder's Quote */}
            {/* <div className="mt-6 pt-6 border-t border-white/10">
              <p className="text-xs italic text-white/60 mb-3 font-medium">
                A Note From the Founder
              </p>
              <div className="space-y-3 text-xs sm:text-sm text-white/70 leading-relaxed">
                <p>
                  HealthMind was created with care, intention, and deep respect
                  for the quiet struggles people carry every day. I built
                  HealthMind because too many people feel they have to face
                  their emotions alone—especially in moments when speaking out
                  feels difficult.
                </p>
                <p>
                  This space exists to offer personalized, private, and
                  supportive mental health guidance, without judgment and
                  without pressure. HealthMind is not here to replace human
                  care. It is here to listen, to support, and to remind you that
                  your feelings matter.
                </p>
                <p>
                  Your privacy, dignity, and safety are always our priority.
                  Thank you for trusting HealthMind with your journey.
                </p>
                <p className="font-semibold text-white/90 italic pt-1">
                  You are not alone, and you never have to face this quietly.
                </p>
              </div>
            </div> */}
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-sm font-semibold mb-4 text-white">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-white/70">
              <li>
                <a
                  href="#hero"
                  className="hover:text-[#1E6FFB] transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="hover:text-[#1E6FFB] transition-colors"
                >
                  Our Story
                </a>
              </li>
              <li>
                <a
                  href="/download"
                  className="hover:text-[#1E6FFB] transition-colors"
                >
                  Download
                </a>
              </li>
              <li>
                <a
                  href="/privacy-policy"
                  className="hover:text-[#1E6FFB] transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/terms-and-conditions"
                  className="hover:text-[#1E6FFB] transition-colors"
                >
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-sm font-semibold mb-4 text-white">Follow Us</h4>
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#1E6FFB] flex items-center justify-center transition-colors duration-300"
                    aria-label={social.label}
                  >
                    <Logo imageUrl={icon} size="sm" />
                  </a>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/10 mb-6 sm:mb-8" />

        {/* Copyright & Legal */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <p className="text-xs sm:text-sm text-white/60 mb-3">
            © {currentYear} HealthMind Group. All Rights Reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-xs text-white/50">
            <a href="/privacy-policy" className="hover:text-[#1E6FFB] transition-colors">
              Privacy Policy
            </a>
            <span>|</span>
            <a href="/terms-and-conditions" className="hover:text-[#1E6FFB] transition-colors">
              Terms & Conditions
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
