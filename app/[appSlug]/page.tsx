import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

import { getLegalApp } from "@/lib/legal-apps"

export const dynamic = "force-dynamic"

type AppLegalCenterProps = {
  params: Promise<{ appSlug: string }>
}

export async function generateMetadata({ params }: AppLegalCenterProps): Promise<Metadata> {
  const { appSlug } = await params
  const app = await getLegalApp(appSlug)

  if (!app) return {}

  return {
    title: `${app.appName} | Legal Center`,
    description: `Privacy Policy and Terms of Service for ${app.appName}.`,
  }
}

export default async function AppLegalCenter({ params }: AppLegalCenterProps) {
  const { appSlug } = await params
  const app = await getLegalApp(appSlug)

  if (!app) notFound()

  return (
    <main
      className="min-h-screen bg-slate-950 px-4 py-12 text-white sm:px-6 sm:py-20"
      style={{ "--app-accent": app.accentColor } as React.CSSProperties}
    >
      <div className="mx-auto max-w-5xl">
        <div className="max-w-3xl">
          <Image
            src={app.appIconUrl}
            alt={`${app.appName} icon`}
            width={88}
            height={88}
            unoptimized
            priority
            className="rounded-2xl shadow-2xl"
          />
          <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-[var(--app-accent)]">
            Legal center
          </p>
          <h1 className="mt-3 text-5xl font-bold tracking-tight sm:text-7xl">{app.appName}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">{app.description}</p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          <Link
            href={`/${app.slug}/privacy`}
            className="group rounded-3xl border border-white/10 bg-white/5 p-7 transition hover:-translate-y-1 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            <span className="text-sm font-semibold text-[var(--app-accent)]">01</span>
            <h2 className="mt-8 text-2xl font-semibold">Privacy Policy</h2>
            <p className="mt-3 leading-7 text-slate-400">
              Learn what information {app.appName} processes and how it is protected.
            </p>
            <span className="mt-8 inline-block font-semibold text-white group-hover:text-[var(--app-accent)]">
              Read policy →
            </span>
          </Link>

          <Link
            href={`/${app.slug}/terms`}
            className="group rounded-3xl border border-white/10 bg-white/5 p-7 transition hover:-translate-y-1 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            <span className="text-sm font-semibold text-[var(--app-accent)]">02</span>
            <h2 className="mt-8 text-2xl font-semibold">Terms of Service</h2>
            <p className="mt-3 leading-7 text-slate-400">
              Review the rules and responsibilities that apply when using {app.appName}.
            </p>
            <span className="mt-8 inline-block font-semibold text-white group-hover:text-[var(--app-accent)]">
              Read terms →
            </span>
          </Link>
        </div>

        <a
          href={app.appUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-10 inline-flex font-semibold text-[var(--app-accent)] underline-offset-4 hover:underline"
        >
          View {app.appName} on Google Play ↗
        </a>
      </div>
    </main>
  )
}
