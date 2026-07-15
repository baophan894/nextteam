import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { LegalDocumentPage } from "@/components/legal/legal-document"
import { getLegalApp } from "@/lib/legal-apps"

export const dynamic = "force-dynamic"

type TermsPageProps = {
  params: Promise<{ appSlug: string }>
}

export async function generateMetadata({ params }: TermsPageProps): Promise<Metadata> {
  const { appSlug } = await params
  const app = await getLegalApp(appSlug)

  if (!app) return {}

  return {
    title: `${app.terms.title} | ${app.appName}`,
    description: `Read the ${app.terms.title} for ${app.appName}.`,
  }
}

export default async function TermsPage({ params }: TermsPageProps) {
  const { appSlug } = await params
  const app = await getLegalApp(appSlug)

  if (!app) notFound()

  return <LegalDocumentPage app={app} document={app.terms} documentType="terms" />
}
