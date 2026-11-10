import type { Metadata } from "next"
import Link from "next/link"
import LegalPage, { type LegalSection } from "@/components/legal/legal-page"
import { LEGAL } from "@/lib/legal"

export const metadata: Metadata = {
  title: "Terms & Conditions | HealthMind",
  description: "The terms for using the HealthMind app and website.",
}

const email = <a href={`mailto:${LEGAL.privacyEmail}`}>{LEGAL.privacyEmail}</a>

const sections: LegalSection[] = [
  {
    id: "agreement",
    title: "About these terms",
    content: (
      <>
        <p>
          These Terms are an agreement between you and <strong>{LEGAL.entityName}</strong>, {LEGAL.registeredAddress}{" "}
          (&quot;HealthMind&quot;, &quot;we&quot;, &quot;us&quot;), for using the HealthMind mobile app and website.
          You accept them when you create an account. If you do not agree, please do not use HealthMind.
        </p>
        <p>
          Our <Link href="/privacy-policy">Privacy Policy</Link> explains how we handle your information and forms part
          of these Terms.
        </p>
      </>
    ),
  },
  {
    id: "eligibility",
    title: "Who can use HealthMind",
    content: (
      <>
        <ul>
          <li>You must be at least <strong>{LEGAL.minimumAge} years old</strong> to use HealthMind.</li>
          <li>
            If you are under {LEGAL.adultAge}, a parent or guardian must approve your account and agree to these Terms
            for you. HealthMind stays inactive until they do.
          </li>
          <li>You must give accurate information, including your real date of birth, when you sign up.</li>
        </ul>
      </>
    ),
  },
  {
    id: "not-medical",
    title: "HealthMind is not a medical service",
    content: (
      <>
        <ul>
          <li>HealthMind supports mental wellbeing and self-reflection. It does <strong>not</strong> diagnose, treat or prevent any medical or mental health condition.</li>
          <li>It does not replace doctors, therapists or other professionals. Always seek professional advice about your health.</li>
          <li>Content in the app, including Alverna&apos;s replies, is general information, not medical advice.</li>
        </ul>
        <p>
          <strong>In an emergency</strong>, or if you are thinking about harming yourself or others, contact local
          emergency services now. In Uganda, call 999 or 112. Elsewhere, find a crisis line at{" "}
          <a href="https://findahelpline.com" target="_blank" rel="noopener noreferrer">findahelpline.com</a>.
          HealthMind cannot monitor conversations in real time or send help.
        </p>
      </>
    ),
  },
  {
    id: "ai",
    title: "Alverna and AI features",
    content: (
      <ul>
        <li>Alverna is an AI companion, not a person. Its replies are generated automatically by AI.</li>
        <li>AI can be wrong, incomplete or unsuitable for your situation. Use your own judgement and do not rely on it for medical, legal or financial decisions.</li>
        <li>Wellness insights and signals in the app are estimates to support you, not diagnoses.</li>
      </ul>
    ),
  },
  {
    id: "account",
    title: "Your account",
    content: (
      <ul>
        <li>Keep your password private and tell us at {email} if you think someone else has accessed your account.</li>
        <li>You are responsible for activity on your account, except where it results from our own failure.</li>
        <li>You can delete your account at any time in the app. See our <Link href="/account-deletion">account deletion page</Link>.</li>
      </ul>
    ),
  },
  {
    id: "acceptable-use",
    title: "Acceptable use",
    content: (
      <>
        <p>You agree not to:</p>
        <ul>
          <li>Use HealthMind for anything illegal, harmful, abusive or misleading.</li>
          <li>Harass, threaten or impersonate anyone.</li>
          <li>Try to get Alverna to produce harmful content, or misuse the AI features.</li>
          <li>Try to access other people&apos;s data, break our security, or overload or disrupt the service.</li>
          <li>Copy, resell or reverse-engineer the app, except where the law allows it.</li>
        </ul>
        <p>
          If you break these rules, we may suspend or close your account. Unless there is a safety or legal reason not
          to, we will tell you why and give you a chance to respond.
        </p>
      </>
    ),
  },
  {
    id: "ip",
    title: "Our content and yours",
    content: (
      <>
        <p>
          The HealthMind app, name, logos, design, text and software belong to {LEGAL.entityName} and are protected by
          law. We give you a personal, non-transferable licence to use the app for your own wellbeing.
        </p>
        <p>
          What you write in HealthMind, such as journal entries and messages, stays yours. You allow us to process it
          only to provide the service to you, as described in the Privacy Policy.
        </p>
      </>
    ),
  },
  {
    id: "service",
    title: "Changes to the service",
    content: (
      <p>
        HealthMind is currently free. We may add, change or remove features to improve the service or for security
        reasons. If we plan to stop providing HealthMind, we will give you reasonable notice so you can download your
        information. We try to keep HealthMind available but cannot promise it will always be uninterrupted or
        error-free.
      </p>
    ),
  },
  {
    id: "liability",
    title: "Liability",
    content: (
      <>
        <p>
          HealthMind is provided &quot;as is&quot;. To the extent the law allows, we are not liable for indirect or
          consequential losses, or for decisions you make based on content in the app.
        </p>
        <p>
          Nothing in these Terms limits liability that cannot be limited by law, such as liability for death or personal
          injury caused by negligence, for fraud, or your rights as a consumer under the law of the country where you
          live.
        </p>
      </>
    ),
  },
  {
    id: "law",
    title: "Governing law and disputes",
    content: (
      <p>
        These Terms are governed by the laws of the Republic of Uganda. If you have a concern, please contact us first
        so we can try to resolve it informally. If you are a consumer, you also keep the protection of the mandatory laws
        of the country where you live and may bring proceedings in your local courts.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to these terms",
    content: (
      <p>
        When we update these Terms, we change the date at the top. For significant changes, we tell you in the app or by
        email before they take effect and, where required, ask you to accept them again. If you do not agree, you can
        delete your account.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact us",
    content: (
      <ul>
        <li><strong>Company:</strong> {LEGAL.entityName}, {LEGAL.registeredAddress}</li>
        <li><strong>Email:</strong> {email}</li>
        <li><strong>Phone:</strong> {LEGAL.phone} (Monday to Friday, 9:00 to 17:00 East Africa Time)</li>
      </ul>
    ),
  },
]

export default function TermsPage() {
  return <LegalPage title="Terms & Conditions" sections={sections} />
}
