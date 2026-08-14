import { NextResponse } from "next/server"
import { defaultImpactSnapshot, type PublicImpactSnapshot } from "@/lib/impact"

export const dynamic = "force-dynamic"

const impactEndpoint =
  process.env.HEALTHMIND_IMPACT_API_URL ??
  "https://us-central1-healthmind-app.cloudfunctions.net/getPublicImpact"

export async function GET() {
  try {
    const response = await fetch(impactEndpoint, {
      headers: { Accept: "application/json" },
      next: { revalidate: 900 },
    })

    if (!response.ok) throw new Error(`Impact endpoint returned ${response.status}`)
    const snapshot = (await response.json()) as PublicImpactSnapshot
    if (snapshot.schemaVersion !== 1 || !Array.isArray(snapshot.metrics)) {
      throw new Error("Unsupported impact response")
    }

    return NextResponse.json(snapshot, {
      headers: { "Cache-Control": "public, s-maxage=900, stale-while-revalidate=86400" },
    })
  } catch (error) {
    console.error("Impact data unavailable:", error)
    return NextResponse.json(
      {
        ...defaultImpactSnapshot,
        status: "error",
        metrics: defaultImpactSnapshot.metrics.map((metric) => ({
          ...metric,
          status: "error" as const,
          publicExplanation: "The verified source could not be reached. No sample value was substituted.",
        })),
        publicExplanation: "Verified impact data is temporarily unavailable.",
      },
      { status: 503 },
    )
  }
}
