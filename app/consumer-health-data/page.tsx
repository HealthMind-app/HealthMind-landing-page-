import type { Metadata } from "next"
import Link from "next/link"
import LegalPage, { LegalTable, type LegalSection } from "@/components/legal/legal-page"
import { LEGAL } from "@/lib/legal"

export const metadata: Metadata = {
  title: "Consumer Health Data Privacy Policy | HealthMind",
  description:
    "HealthMind's Consumer Health Data Privacy Policy for residents of Washington, Nevada and Connecticut.",
}

const email = <a href={`mailto:${LEGAL.privacyEmail}`}>{LEGAL.privacyEmail}</a>

const sections: LegalSection[] = [
  {
    id: "categories",
    title: "Consumer health data we collect and why",
    content: (
      <LegalTable
        head={["Category", "Purpose"]}
        rows={[
          [
            "Wellness check-ins and self-assessments (stress, mood, sleep, activity and similar scores)",
            "Show your progress, personalise insights and plans, and, if you allow it, give Alverna context",
          ],
          ["Journal entries and symptoms you record", "Let you keep a private journal and, if you allow it, give Alverna context"],
          ["Medications, doses, schedules and logs", "Send the reminders you set up, including optional phone calls"],
          ["Conversations with Alverna", "Generate replies and, if you choose, keep your chat history"],
          ["Goals, weekly plans, self-care activity and streaks", "Track progress and suggest activities"],
          [
            "Derived wellness signals (for example trends suggesting declining wellbeing)",
            "Decide when to suggest support resources or crisis information",
          ],
          ["App activity (features used, not content)", "Streaks, progress and, if you allow it, Alverna context"],
        ]}
      />
    ),
  },
  {
    id: "sources",
    title: "Where we get it",
    content: (
      <ul>
        <li>Directly from you, when you enter it in the app or talk to Alverna.</li>
        <li>Calculated by the app from information you entered (wellness signals and insights).</li>
      </ul>
    ),
  },
  {
    id: "sharing",
    title: "Who we share it with",
    content: (
      <>
        <p>
          We share consumer health data only with the processors below, who act on our instructions to provide the
          service. We do not sell consumer health data, and we do not share it with advertisers or any other third
          party.
        </p>
        <LegalTable
          head={["Processor", "Consumer health data shared"]}
          rows={[
            ["Google Firebase and Google Cloud", "All categories above, to store them and run app features"],
            [
              "Google Gemini API",
              "Your messages to Alverna and only the categories you allow in Alverna data & privacy settings",
            ],
            ["Twilio", "Medication name and dose, only if you turn on reminder phone calls"],
            ["Resend", "Summary statistics in optional emails, such as the weekly summary"],
          ]}
        />
        <p>We have no affiliates that receive consumer health data.</p>
      </>
    ),
  },
  {
    id: "consent",
    title: "Your consent",
    content: (
      <p>
        We collect consumer health data only after you give explicit consent in the app when you create your account,
        and only for the purposes above. We share it with the processors listed above only to provide the service you
        asked for. You can withdraw consent at any time by deleting your account; you can also limit what Alverna uses
        in Alverna data &amp; privacy settings.
      </p>
    ),
  },
  {
    id: "rights",
    title: "Your rights",
    content: (
      <>
        <ul>
          <li>Confirm whether we collect, share or sell your consumer health data, and access it.</li>
          <li>Get a list of all third parties and affiliates we shared it with, and how to contact them.</li>
          <li>Withdraw your consent.</li>
          <li>Have your consumer health data deleted, including by the processors above.</li>
        </ul>
        <p>
          You can delete your account in the app at any time, or use our{" "}
          <Link href="/account-deletion">account deletion page</Link>. For any other request, email {email}. We respond
          within 45 days. If we decline your request, you can appeal by replying to our decision; we answer appeals within
          45 days, and if you are not satisfied you may contact your state Attorney General.
        </p>
      </>
    ),
  },
  {
    id: "more",
    title: "More information",
    content: (
      <p>
        This page supplements our <Link href="/privacy-policy">Privacy Policy</Link>, which explains everything else
        about how we handle personal information. HealthMind is operated by {LEGAL.entityName}, {LEGAL.registeredAddress}.
      </p>
    ),
  },
]

export default function ConsumerHealthDataPage() {
  return (
    <LegalPage
      title="Consumer Health Data Privacy Policy"
      intro={
        <p>
          This policy is for residents of Washington (My Health My Data Act), Nevada and Connecticut, whose laws give
          extra protection to &quot;consumer health data&quot;. Because HealthMind is a wellbeing app, most information
          you put into it is consumer health data.
        </p>
      }
      sections={sections}
    />
  )
}
