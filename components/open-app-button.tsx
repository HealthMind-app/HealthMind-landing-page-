"use client"

import { useEffect, useState } from "react"
import { ExternalLink } from "lucide-react"

/**
 * Deep link into the app that keeps the page's query string and hash, so
 * parameters from an email link (mode, oobCode, ids) reach the app intact.
 */
export default function OpenAppButton({ appPath }: { appPath: string }) {
  const base = `healthmind:///${appPath.replace(/^\//, "")}`
  const [href, setHref] = useState(base)

  useEffect(() => {
    setHref(`${base}${window.location.search}${window.location.hash}`)
  }, [base])

  return (
    <a href={href} className="inline-flex items-center justify-center gap-2 rounded-full bg-violet-700 px-6 py-3 font-semibold text-white hover:bg-violet-800">
      Open HealthMind <ExternalLink className="h-4 w-4" />
    </a>
  )
}
