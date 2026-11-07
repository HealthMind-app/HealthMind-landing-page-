import type { Metadata } from "next"
import OpenAppPage from "@/components/open-app-page"
import UnsubscribeConfirm from "@/components/unsubscribe-confirm"

export const metadata: Metadata = { title: "Email preferences | HealthMind", robots: { index: false } }

export default async function Page({ searchParams }: { searchParams: Promise<{ token?: string | string[] }> }) {
  const { token } = await searchParams
  const value = typeof token === "string" ? token : undefined

  if (value) {
    return (
      <OpenAppPage
        title="Unsubscribe from HealthMind emails"
        description="Confirm below to stop receiving HealthMind marketing emails such as daily quotes and weekly summaries."
        appPath="settings"
      >
        <UnsubscribeConfirm token={value} />
      </OpenAppPage>
    )
  }

  return (
    <OpenAppPage
      title="Manage email preferences"
      description="Use the unsubscribe link at the bottom of any HealthMind email, or open the app to review your notification and email preferences."
      appPath="settings"
    />
  )
}
