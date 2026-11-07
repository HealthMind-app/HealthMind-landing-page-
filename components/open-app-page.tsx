import type { ReactNode } from "react"
import Link from "next/link"
import { Smartphone } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import OpenAppButton from "@/components/open-app-button"

interface OpenAppPageProps {
  title: string
  description: string
  appPath: string
  note?: string
  children?: ReactNode
}

export default function OpenAppPage({ title, description, appPath, note, children }: OpenAppPageProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="mx-auto flex min-h-[75vh] max-w-3xl items-center px-4 pb-20 pt-32">
        <section className="w-full rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-12">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-50 text-violet-700"><Smartphone className="h-7 w-7" /></div>
          <h1 className="mt-6 text-3xl font-bold text-slate-950 sm:text-4xl">{title}</h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-slate-600">{description}</p>
          {note && <p className="mx-auto mt-4 max-w-xl rounded-xl bg-amber-50 p-4 text-sm leading-6 text-amber-900">{note}</p>}
          {children}
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <OpenAppButton appPath={appPath} />
            <a href="https://play.google.com/store/apps/details?id=com.healthmind.app" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-3 font-semibold text-slate-800 hover:bg-slate-50">Get the Android app</a>
          </div>
          <p className="mt-6 text-xs text-slate-500">If the app does not open, install it and return to the original email link.</p>
          <Link href="/" className="mt-6 inline-block text-sm font-semibold text-violet-700 hover:underline">Return to HealthMind</Link>
        </section>
      </main>
      <Footer />
    </div>
  )
}
