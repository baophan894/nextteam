import { notFound, redirect } from "next/navigation"

import { getLegalApp } from "@/lib/legal-apps"

type LegacyTermPageProps = {
  params: Promise<{ appSlug: string }>
}

export default async function LegacyTermPage({ params }: LegacyTermPageProps) {
  const { appSlug } = await params

  if (!(await getLegalApp(appSlug))) notFound()

  redirect(`/${appSlug}/terms`)
}
