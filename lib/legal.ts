import { CONTACT_EMAIL } from "@/lib/site"

/**
 * Facts every legal page shares. Change them here only.
 *
 * Values marked CONFIRM must be checked by the company before this goes live.
 */
export const LEGAL = {
  /** CONFIRM exact registered spelling (and any "Ltd"/"Limited") before going live. */
  entityName: "AlverMind Technologies",
  registeredAddress: "Ntinda–Kira Road, Kampala, Uganda",
  /** Nobody younger may use HealthMind. Must match LegalConfig.minimumAge in the app. */
  minimumAge: 13,
  /** Younger users need verified parent or guardian approval. Matches LegalConfig.adultAge. */
  adultAge: 18,
  effectiveDate: "November 10, 2026",
  privacyEmail: CONTACT_EMAIL,
  phone: "+256 761 151 329",
} as const

export type VisitorRegion = "uganda" | "africa" | "europe" | "us-health-state" | "us" | "other"

const EUROPE = new Set([
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU", "IE", "IT",
  "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK", "SI", "ES", "SE",
  "IS", "LI", "NO", "GB", "CH",
])

const AFRICA = new Set([
  "DZ", "AO", "BJ", "BW", "BF", "BI", "CV", "CM", "CF", "TD", "KM", "CG", "CD", "CI", "DJ",
  "EG", "GQ", "ER", "SZ", "ET", "GA", "GM", "GH", "GN", "GW", "KE", "LS", "LR", "LY", "MG",
  "MW", "ML", "MR", "MU", "MA", "MZ", "NA", "NE", "NG", "RW", "ST", "SN", "SC", "SL", "SO",
  "ZA", "SS", "SD", "TZ", "TG", "TN", "ZM", "ZW",
])

/** US states with dedicated consumer health data laws. */
const US_HEALTH_STATES = new Set(["WA", "NV", "CT"])

/**
 * Best-guess region from Vercel's geolocation headers. Only used to point
 * visitors at the section most relevant to them; every visitor always sees
 * the complete policy, because the law that applies follows the person,
 * not their IP address.
 */
export function visitorRegion(country: string | null, region: string | null): VisitorRegion {
  const code = country?.toUpperCase()
  if (!code) return "other"
  if (code === "UG") return "uganda"
  if (AFRICA.has(code)) return "africa"
  if (EUROPE.has(code)) return "europe"
  if (code === "US") return region && US_HEALTH_STATES.has(region.toUpperCase()) ? "us-health-state" : "us"
  return "other"
}

export function countryName(code: string | null): string | null {
  if (!code) return null
  try {
    return new Intl.DisplayNames(["en"], { type: "region" }).of(code.toUpperCase()) ?? null
  } catch {
    return null
  }
}
