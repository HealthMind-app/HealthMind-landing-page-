export type MetricStatus =
  | "loading"
  | "verified"
  | "unavailable"
  | "insufficient_sample"
  | "stale"
  | "error"

export interface PublicImpactMetric {
  id: string
  label: string
  value: number | null
  unit: string
  status: MetricStatus
  reportingPeriod: string | null
  lastVerifiedAt: string | null
  source: string | null
  methodologyUrl: string
  publicExplanation: string
}

export interface PublicImpactSnapshot {
  schemaVersion: number
  status: "latest_verified_data" | "reporting_in_progress" | "error"
  timezone: string
  reportingPeriod: string | null
  lastVerifiedAt: string | null
  metrics: PublicImpactMetric[]
  publicExplanation?: string
}

export const unavailableMetric = (
  id: string,
  label: string,
  explanation: string,
  unit = "count",
): PublicImpactMetric => ({
  id,
  label,
  value: null,
  unit,
  status: "unavailable",
  reportingPeriod: null,
  lastVerifiedAt: null,
  source: null,
  methodologyUrl: `/impact/methodology#${id}`,
  publicExplanation: explanation,
})

export const defaultImpactSnapshot: PublicImpactSnapshot = {
  schemaVersion: 1,
  status: "reporting_in_progress",
  timezone: "Africa/Nairobi",
  reportingPeriod: null,
  lastVerifiedAt: null,
  metrics: [
    unavailableMetric("registered-accounts", "Registered accounts", "The production aggregate is being connected."),
    unavailableMetric("monthly-active-users", "Monthly active users", "Firebase Analytics is configured, but reportable production data has not yet been verified."),
    unavailableMetric("ai-conversations", "AI conversations", "Event receipt and the definition of a meaningful conversation are being verified."),
    unavailableMetric("mood-check-ins", "Mood check-ins", "The current check-in flow is not yet centrally countable."),
    unavailableMetric("journal-entries", "Journal entries", "Journal data is stored on-device and is not centrally countable."),
    unavailableMetric("seven-day-retention", "Seven-day retention", "A reviewed cohort definition and verified Analytics data are required.", "percent"),
  ],
}

export function metricById(snapshot: PublicImpactSnapshot, id: string) {
  return snapshot.metrics.find((metric) => metric.id === id)
}

export function formatMetricValue(metric?: PublicImpactMetric) {
  if (!metric || metric.value === null || metric.status !== "verified") return null
  const value = new Intl.NumberFormat("en-US").format(metric.value)
  return metric.unit === "percent" ? `${value}%` : value
}
