import type { Metadata } from "next"
import OpenAppPage from "@/components/open-app-page"

export const metadata: Metadata = { title: "Continue in HealthMind", robots: { index: false } }

// Firebase's action handler resets the password before redirecting here.
export default function Page() {
  return <OpenAppPage title="Continue in HealthMind" description="If you just reset your password, open HealthMind and sign in with your new password." appPath="login" />
}
