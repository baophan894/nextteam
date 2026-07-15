import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { LegalDocumentPage } from "@/components/legal/legal-document"
import { getLegalApp } from "@/lib/legal-apps"

export const dynamic = "force-dynamic"

type PrivacyPageProps = {
  params: Promise<{ appSlug: string }>
}

export async function generateMetadata({ params }: PrivacyPageProps): Promise<Metadata> {
  const { appSlug } = await params
  const app = await getLegalApp(appSlug)

  if (!app) return {}

  return {
    title: `${app.privacy.title} | ${app.appName}`,
    description: `Read the ${app.privacy.title} for ${app.appName}.`,
  }
}

export default async function PrivacyPage({ params }: PrivacyPageProps) {
  const { appSlug } = await params
  const app = await getLegalApp(appSlug)

  if (!app) notFound()

  return <LegalDocumentPage app={app} document={app.privacy} documentType="privacy" />
}
