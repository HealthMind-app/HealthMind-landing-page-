import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: __dirname,
  images: {
    unoptimized: true,
  },
  async redirects() {
    // Takes effect once www.healthmindgroup.com is added to the Vercel project.
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.healthmindgroup.com" }],
        destination: "https://healthmindgroup.com/:path*",
        permanent: true,
      },
    ]
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
        ],
      },
    ]
  },
}

export default nextConfig
