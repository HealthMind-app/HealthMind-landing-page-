import type { Metadata } from "next"
import OpenAppPage from "@/components/open-app-page"

export const metadata: Metadata = { title: "Email verified | HealthMind", robots: { index: false } }

// Firebase's action handler verifies the address before redirecting here.
export default function Page() {
  return <OpenAppPage title="Your email is verified" description="Thanks for confirming your email address. Open HealthMind to continue setting up your account." appPath="email-verified" />
}
