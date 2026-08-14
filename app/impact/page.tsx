import type { Metadata } from "next"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ImpactDashboard from "@/components/impact-dashboard"

export const metadata: Metadata = {
  title: "Impact | HealthMind",
  description: "HealthMind's latest verified impact reporting and measurement methodology.",
}

export default function ImpactPage() {
  return <div className="min-h-screen bg-white"><Navbar /><ImpactDashboard /><Footer /></div>
}
