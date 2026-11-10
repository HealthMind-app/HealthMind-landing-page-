import { headers } from "next/headers"
import { MapPin } from "lucide-react"
import { countryName, visitorRegion, type VisitorRegion } from "@/lib/legal"

const TARGETS: Record<VisitorRegion, { anchor: string; label: string } | null> = {
  uganda: { anchor: "#region-uganda", label: "your rights under Uganda's Data Protection and Privacy Act" },
  africa: { anchor: "#region-africa", label: "your rights under data protection laws in Africa" },
  europe: { anchor: "#region-europe", label: "your rights under the GDPR and UK GDPR" },
  "us-health-state": {
    anchor: "/consumer-health-data",
    label: "your rights under your state's consumer health data law",
  },
  us: { anchor: "#region-us", label: "your rights under US state privacy laws" },
  other: null,
}

/**
 * Points visitors at the regional section most likely to apply to them,
 * based on Vercel's IP geolocation. It never hides or changes any text:
 * everyone sees the full policy, and the visitor's own residence decides
 * which law applies.
 */
export default async function RegionNotice() {
  const requestHeaders = await headers()
  const country = requestHeaders.get("x-vercel-ip-country")
  const region = visitorRegion(country, requestHeaders.get("x-vercel-ip-country-region"))
  const target = TARGETS[region]
  const name = countryName(country)
  if (!target || !name) return null

  return (
    <aside className="flex gap-3 items-start rounded-2xl border border-green-200 bg-green-50 p-4 sm:p-5 text-sm text-gray-700">
      <MapPin className="w-5 h-5 text-green-700 flex-shrink-0 mt-0.5" aria-hidden="true" />
      <p>
        It looks like you are visiting from <strong>{name}</strong>. This page applies to everyone;{" "}
        <a href={target.anchor} className="text-green-700 underline font-medium">
          see {target.label}
        </a>
        . If you live somewhere else, the section for where you live applies.
      </p>
    </aside>
  )
}
