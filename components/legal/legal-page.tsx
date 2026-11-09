import Link from "next/link"
import type { ReactNode } from "react"
import { ArrowLeft } from "lucide-react"
import { LEGAL } from "@/lib/legal"

export type LegalSection = {
  id: string
  title: string
  content: ReactNode
}

/**
 * Shared layout for legal documents: header, optional notice, table of
 * contents, and numbered sections. Server-rendered and readable without
 * JavaScript, so the full text is always in the page source.
 */
export default function LegalPage({
  title,
  intro,
  notice,
  sections,
}: {
  title: string
  intro?: ReactNode
  notice?: ReactNode
  sections: LegalSection[]
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50/30 to-white">
      <header className="bg-gradient-to-r from-green-600 to-green-500 text-white py-12 sm:py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/90 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">{title}</h1>
          <p className="text-base sm:text-lg text-white/90">
            Effective and last updated: {LEGAL.effectiveDate}
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-10 sm:py-14 space-y-8">
        {notice}

        {intro && <div className="legal-body text-gray-700">{intro}</div>}

        <nav
          aria-label="Contents"
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <h2 className="text-lg font-bold text-gray-900 mb-3">Contents</h2>
          <ol className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5 text-sm">
            {sections.map((section, index) => (
              <li key={section.id}>
                <a href={`#${section.id}`} className="text-green-700 hover:underline">
                  {index + 1}. {section.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {sections.map((section, index) => (
          <section
            key={section.id}
            id={section.id}
            className="scroll-mt-24 bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              {index + 1}. {section.title}
            </h2>
            <div className="legal-body text-gray-700">{section.content}</div>
          </section>
        ))}

        <footer className="pt-8 border-t border-gray-200 text-center text-sm text-gray-600 space-y-3">
          <p>
            Questions? Email{" "}
            <a href={`mailto:${LEGAL.privacyEmail}`} className="text-green-700 hover:underline">
              {LEGAL.privacyEmail}
            </a>
          </p>
          <p className="flex flex-wrap justify-center gap-4">
            <Link href="/privacy-policy" className="text-green-700 hover:underline">Privacy Policy</Link>
            <Link href="/consumer-health-data" className="text-green-700 hover:underline">Consumer Health Data</Link>
            <Link href="/terms-and-conditions" className="text-green-700 hover:underline">Terms & Conditions</Link>
            <Link href="/account-deletion" className="text-green-700 hover:underline">Account Deletion</Link>
          </p>
        </footer>
      </main>
    </div>
  )
}

/** A two-column table that scrolls sideways on small screens. */
export function LegalTable({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
  return (
    <div className="overflow-x-auto -mx-2 px-2">
      <table className="w-full min-w-[560px] text-sm border-collapse">
        <thead>
          <tr>
            {head.map((cell) => (
              <th key={cell} className="text-left font-semibold text-gray-900 bg-green-50 border border-gray-200 px-3 py-2 align-top">
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="border border-gray-200 px-3 py-2 align-top">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
