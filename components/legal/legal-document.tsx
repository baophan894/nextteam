import Image from "next/image"
import Link from "next/link"

import type { LegalApp, LegalDocument } from "@/lib/legal-apps"

type LegalDocumentPageProps = {
  app: LegalApp
  document: LegalDocument
  documentType: "privacy" | "terms"
}

export function LegalDocumentPage({
  app,
  document,
  documentType,
}: LegalDocumentPageProps) {
  const otherDocument = documentType === "privacy" ? "terms" : "privacy"
  const otherLabel = documentType === "privacy" ? "Terms of Service" : "Privacy Policy"

  return (
    <main
      className="min-h-screen bg-slate-50 px-4 py-8 text-slate-800 sm:px-6 sm:py-12"
      style={{ "--app-accent": app.accentColor } as React.CSSProperties}
    >
      <article className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <header className="border-b border-slate-200 bg-slate-950 px-6 py-8 text-white sm:px-10">
          <Link
            href={`/${app.slug}`}
            className="inline-flex items-center gap-3 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            <Image
              src={app.appIconUrl}
              alt={`${app.appName} icon`}
              width={52}
              height={52}
              unoptimized
              className="rounded-xl"
            />
            <span>
              <span className="block text-sm text-slate-300">Legal center</span>
              <span className="block text-lg font-semibold">{app.appName}</span>
            </span>
          </Link>
        </header>

        <div className="px-6 py-10 sm:px-10 sm:py-12">
          <div className="mb-10 border-b border-slate-200 pb-8">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--app-accent)]">
              {app.appName}
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
              {document.title}
            </h1>
            <p className="mt-4 text-sm text-slate-500">Last updated: {document.lastUpdated}</p>
          </div>

          <div className="space-y-5 text-base leading-7 text-slate-700">
            {document.introduction.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-12 space-y-10">
            {document.sections.map((section) => (
              <section key={section.title}>
                <h2 className="mb-4 text-2xl font-semibold tracking-tight text-slate-950">
                  {section.title}
                </h2>
                {section.paragraphs && (
                  <div className="space-y-4 leading-7 text-slate-700">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                )}
                {section.bullets && (
                  <ul className="mt-4 list-disc space-y-2 pl-6 leading-7 text-slate-700 marker:text-[var(--app-accent)]">
                    {section.bullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
                {section.links && (
                  <ul className="mt-4 space-y-2">
                    {section.links.map((link) => (
                      <li key={link.href}>
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noreferrer"
                          className="font-medium text-[var(--app-accent)] underline-offset-4 hover:underline"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            <section>
              <h2 className="mb-4 text-2xl font-semibold tracking-tight text-slate-950">
                Contact Us
              </h2>
              <p className="leading-7 text-slate-700">
                Questions about this document can be sent to{" "}
                <a
                  href={`mailto:${app.contactAddress}`}
                  className="font-medium text-[var(--app-accent)] underline-offset-4 hover:underline"
                >
                  {app.contactAddress}
                </a>
                .
              </p>
            </section>
          </div>

          <footer className="mt-12 flex flex-col gap-3 border-t border-slate-200 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href={`/${app.slug}`}
              className="font-medium text-slate-700 underline-offset-4 hover:text-slate-950 hover:underline"
            >
              Back to {app.appName}
            </Link>
            <Link
              href={`/${app.slug}/${otherDocument}`}
              className="font-semibold text-[var(--app-accent)] underline-offset-4 hover:underline"
            >
              Read {otherLabel}
            </Link>
          </footer>
        </div>
      </article>
    </main>
  )
}
