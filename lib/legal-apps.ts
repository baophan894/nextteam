import { mkdir, readFile, rename, writeFile } from "node:fs/promises"
import path from "node:path"

import { get as getBlob, list, put } from "@vercel/blob"
import { z } from "zod"

export type LegalLink = {
  href: string
  label: string
}

export type LegalSection = {
  title: string
  paragraphs?: string[]
  bullets?: string[]
  links?: LegalLink[]
}

export type LegalDocument = {
  title: string
  lastUpdated: string
  introduction: string[]
  sections: LegalSection[]
}

export type LegalDocumentOverrides = Partial<LegalDocument>

/** JSON shape accepted when registering a new app. */
export type CreateLegalAppInput = {
  app_name: string
  contact_address: string
  description: string
  app_icon_url: string
  app_url: string
  app_legal_url: string
  privacy_policy_url: string
  terms_url: string
  ccpa_url: string
  copyrights_url: string
  hide_tag?: string
  slug?: string
  accent_color?: string
  last_updated?: string
  privacy_overrides?: LegalDocumentOverrides
  terms_overrides?: LegalDocumentOverrides
}

const legalSectionSchema = z.object({
  title: z.string().min(1),
  paragraphs: z.array(z.string().min(1)).optional(),
  bullets: z.array(z.string().min(1)).optional(),
  links: z
    .array(z.object({ href: z.string().url(), label: z.string().min(1) }))
    .optional(),
})

const legalDocumentOverridesSchema = z.object({
  title: z.string().min(1).optional(),
  lastUpdated: z.string().min(1).optional(),
  introduction: z.array(z.string().min(1)).optional(),
  sections: z.array(legalSectionSchema).optional(),
})

export const createLegalAppInputSchema = z.object({
  app_name: z.string().min(1),
  contact_address: z.string().email(),
  description: z.string().min(1),
  app_icon_url: z.string().min(1),
  app_url: z.string().url(),
  app_legal_url: z.string().url(),
  privacy_policy_url: z.string().url(),
  terms_url: z.string().url(),
  ccpa_url: z.string().url(),
  copyrights_url: z.string().url(),
  hide_tag: z.string().optional(),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).optional(),
  accent_color: z.string().regex(/^#[0-9a-fA-F]{6}$/).optional(),
  last_updated: z.string().min(1).optional(),
  privacy_overrides: legalDocumentOverridesSchema.optional(),
  terms_overrides: legalDocumentOverridesSchema.optional(),
}) satisfies z.ZodType<CreateLegalAppInput>

export type CreateLegalAppPayload = {
  name: string
  slug: string
  contact_email: string
  description: string
  icon_url?: string
  store_url?: string
  accent_color?: string
  last_updated?: string
  hide_tag?: string
  privacy_overrides?: LegalDocumentOverrides
  terms_overrides?: LegalDocumentOverrides
}

export const createLegalAppPayloadSchema = z.object({
  name: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  contact_email: z.string().email(),
  description: z.string().min(1),
  icon_url: z.string().min(1).optional(),
  store_url: z.string().url().optional(),
  accent_color: z.string().regex(/^#[0-9a-fA-F]{6}$/).optional(),
  last_updated: z.string().min(1).optional(),
  hide_tag: z.string().optional(),
  privacy_overrides: legalDocumentOverridesSchema.optional(),
  terms_overrides: legalDocumentOverridesSchema.optional(),
}) satisfies z.ZodType<CreateLegalAppPayload>

/** Generates every internal URL and the complete legal config from a small API payload. */
export function generateLegalAppInput(
  payload: CreateLegalAppPayload,
  siteUrl: string,
): CreateLegalAppInput {
  const baseUrl = siteUrl.replace(/\/+$/, "")
  const legalUrl = `${baseUrl}/${payload.slug}`

  return {
    app_name: payload.name,
    contact_address: payload.contact_email,
    description: payload.description,
    app_icon_url: payload.icon_url ?? "",
    app_url: payload.store_url ?? legalUrl,
    app_legal_url: legalUrl,
    privacy_policy_url: `${legalUrl}/privacy`,
    terms_url: `${legalUrl}/terms`,
    ccpa_url: `${legalUrl}/ccpa`,
    copyrights_url: `${legalUrl}/copyrights`,
    hide_tag: payload.hide_tag,
    slug: payload.slug,
    accent_color: payload.accent_color,
    last_updated: payload.last_updated,
    privacy_overrides: payload.privacy_overrides,
    terms_overrides: payload.terms_overrides,
  }
}

export type LegalApp = {
  slug: string
  appName: string
  contactAddress: string
  description: string
  appIconUrl: string
  appUrl: string
  appLegalUrl: string
  privacyPolicyUrl: string
  termsUrl: string
  ccpaUrl: string
  copyrightsUrl: string
  hideTag?: string
  accentColor: string
  privacy: LegalDocument
  terms: LegalDocument
}

function formatCurrentDate() {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date())
}

function getSlug(input: CreateLegalAppInput) {
  if (input.slug) return input.slug

  const pathname = new URL(input.app_legal_url).pathname
  const slug = pathname.split("/").filter(Boolean).at(-1)

  if (!slug) {
    throw new Error(`Cannot determine an app slug from ${input.app_legal_url}`)
  }

  return slug
}

function applyOverrides(
  document: LegalDocument,
  overrides?: LegalDocumentOverrides,
): LegalDocument {
  return overrides ? { ...document, ...overrides } : document
}

function createDefaultPrivacy(
  input: CreateLegalAppInput,
  lastUpdated: string,
): LegalDocument {
  const appName = input.app_name

  return {
    title: "Privacy Policy",
    lastUpdated,
    introduction: [
      `This Privacy Policy explains how ${appName} handles information when you use the app. ${input.description}`,
      `By using ${appName}, you acknowledge the practices described in this policy. If you do not agree with this policy, please do not use the app.`,
    ],
    sections: [
      {
        title: "Information We Process",
        paragraphs: [
          `${appName} may process technical information needed to operate the service, such as app version, device type, operating system, connection status, feature usage, and diagnostic information when an error occurs.`,
          `When you contact support, we process the information you choose to include in your message and your email address so that we can respond.`,
        ],
      },
      {
        title: "Device Permissions",
        paragraphs: [
          `The app may request device permissions when they are required to provide a feature. You can revoke permissions in your device settings, although the related features may stop working.`,
        ],
      },
      {
        title: "How We Use Information",
        bullets: [
          `Provide, maintain, and improve ${appName}.`,
          "Diagnose errors and protect the reliability and security of the service.",
          "Respond to support requests and other communications.",
          "Comply with applicable legal obligations.",
        ],
      },
      {
        title: "Sharing of Information",
        paragraphs: [
          `We do not sell your personal information. Information may be shared with service providers only when needed to operate, analyze, secure, or support ${appName}, or when disclosure is required by law.`,
        ],
      },
      {
        title: "Data Retention and Security",
        paragraphs: [
          "We retain personal information only for as long as reasonably necessary for the purposes described in this policy or as required by law. We use reasonable safeguards, but no electronic transmission or storage method is completely secure.",
        ],
      },
      {
        title: "Children's Privacy",
        paragraphs: [
          `${appName} is not directed to children under 13, and we do not knowingly collect personal information from children under 13. Contact us if you believe a child has provided personal information.`,
        ],
      },
      {
        title: "Your Choices and Rights",
        paragraphs: [
          "Depending on where you live, you may have rights to request access to, correction of, or deletion of your personal information, or to object to or restrict certain processing. Contact us to submit a request.",
        ],
      },
      {
        title: "Changes to This Policy",
        paragraphs: [
          "We may update this Privacy Policy from time to time. The revised policy will be posted on this page with a new last-updated date.",
        ],
      },
    ],
  }
}

function createDefaultTerms(
  input: CreateLegalAppInput,
  lastUpdated: string,
): LegalDocument {
  const appName = input.app_name

  return {
    title: "Terms of Service",
    lastUpdated,
    introduction: [
      `These Terms of Service govern your use of ${appName}. By downloading, accessing, or using the app, you agree to these Terms.`,
      `If you do not agree to these Terms, do not use ${appName}.`,
    ],
    sections: [
      {
        title: `Use of ${appName}`,
        paragraphs: [
          `${appName} is provided for the following purpose: ${input.description} You are responsible for using the app safely, lawfully, and only on devices or accounts you are authorized to use.`,
        ],
      },
      {
        title: "Your Responsibilities",
        bullets: [
          "Keep your device, account, network, and credentials secure.",
          "Use the app only with devices, content, and accounts you own or are authorized to access.",
          "Follow applicable laws and relevant device or platform instructions.",
          "Do not use the app in a way that could cause injury, damage, disruption, or unauthorized access.",
        ],
      },
      {
        title: "Prohibited Conduct",
        bullets: [
          "Attempting to gain unauthorized access to another person's device, account, or network.",
          "Interfering with, disrupting, reverse engineering, or misusing the app, except where applicable law expressly permits it.",
          "Using the app to transmit malicious code or violate another person's rights.",
          "Using the app in an unlawful, unsafe, fraudulent, or abusive manner.",
        ],
      },
      {
        title: "Compatibility and Updates",
        paragraphs: [
          `Features may depend on your device, operating system, connectivity, and third-party services. We may update, change, suspend, or discontinue ${appName} features to improve the app or address technical, security, and legal requirements.`,
        ],
      },
      {
        title: "Third-Party Services",
        paragraphs: [
          `${appName} may rely on third-party platforms or services. Their availability is outside our control and may be governed by separate terms and policies.`,
        ],
      },
      {
        title: "Disclaimer",
        paragraphs: [
          `To the maximum extent permitted by law, ${appName} is provided on an “as is” and “as available” basis. We do not guarantee uninterrupted operation, compatibility with every device, or that the app will be free from errors.`,
        ],
      },
      {
        title: "Limitation of Liability",
        paragraphs: [
          `To the maximum extent permitted by law, we will not be liable for indirect, incidental, special, consequential, or punitive damages arising from your use of or inability to use ${appName}. Nothing in these Terms excludes liability that cannot lawfully be excluded.`,
        ],
      },
      {
        title: "Changes to These Terms",
        paragraphs: [
          "We may update these Terms from time to time. Updated Terms become effective when posted on this page unless a later date is stated.",
        ],
      },
    ],
  }
}

/**
 * Converts one app JSON object into a complete legal-page configuration.
 * Privacy and Terms are generated automatically and can be partially overridden.
 */
export function createLegalApp(input: CreateLegalAppInput): LegalApp {
  const lastUpdated = input.last_updated ?? formatCurrentDate()

  return {
    slug: getSlug(input),
    appName: input.app_name,
    contactAddress: input.contact_address,
    description: input.description,
    appIconUrl: input.app_icon_url,
    appUrl: input.app_url,
    appLegalUrl: input.app_legal_url,
    privacyPolicyUrl: input.privacy_policy_url,
    termsUrl: input.terms_url,
    ccpaUrl: input.ccpa_url,
    copyrightsUrl: input.copyrights_url,
    hideTag: input.hide_tag,
    accentColor: input.accent_color ?? "#7c3aed",
    privacy: applyOverrides(
      createDefaultPrivacy(input, lastUpdated),
      input.privacy_overrides,
    ),
    terms: applyOverrides(
      createDefaultTerms(input, lastUpdated),
      input.terms_overrides,
    ),
  }
}

// Production apps are created through POST /api/legal-apps, not hard-coded here.
const legalAppInputs: CreateLegalAppInput[] = []

export function createLegalApps(
  inputs: CreateLegalAppInput[],
): Record<string, LegalApp> {
  return Object.fromEntries(
    inputs.map((input) => {
      const app = createLegalApp(input)
      return [app.slug, app]
    }),
  )
}

export const legalApps = createLegalApps(legalAppInputs)

const legalAppsDataFile = path.join(process.cwd(), "data", "legal-apps.json")
const legalAppsBlobPrefix = "legal-apps/"
let mutationQueue: Promise<void> = Promise.resolve()

export function hasVercelBlobStorage() {
  return Boolean(
    process.env.BLOB_STORE_ID || process.env.BLOB_READ_WRITE_TOKEN,
  )
}

function assertProductionStorageIsConfigured() {
  if (process.env.VERCEL && !hasVercelBlobStorage()) {
    throw new Error(
      "Vercel Blob storage is not configured. Connect a Public Blob store to this project.",
    )
  }
}

async function readLocalLegalAppInputs(): Promise<CreateLegalAppInput[]> {
  try {
    const contents = await readFile(legalAppsDataFile, "utf8")
    return z.array(createLegalAppInputSchema).parse(JSON.parse(contents))
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return []
    throw error
  }
}

async function readBlobInput(pathname: string): Promise<CreateLegalAppInput | undefined> {
  const result = await getBlob(pathname, { access: "public" })
  if (!result?.stream) return undefined

  const value = await new Response(result.stream).json()
  return createLegalAppInputSchema.parse(value)
}

async function readBlobLegalAppInputs(): Promise<CreateLegalAppInput[]> {
  const inputs: CreateLegalAppInput[] = []
  let cursor: string | undefined

  do {
    const result = await list({
      prefix: legalAppsBlobPrefix,
      limit: 1000,
      cursor,
    })
    const pageInputs = await Promise.all(
      result.blobs
        .filter((blob) => blob.pathname.endsWith(".json"))
        .map((blob) => readBlobInput(blob.pathname)),
    )

    inputs.push(...pageInputs.filter((input) => input !== undefined))
    cursor = result.hasMore ? result.cursor : undefined
  } while (cursor)

  return inputs
}

async function readStoredLegalAppInputs(): Promise<CreateLegalAppInput[]> {
  assertProductionStorageIsConfigured()
  return hasVercelBlobStorage()
    ? readBlobLegalAppInputs()
    : readLocalLegalAppInputs()
}

export async function getLegalApps(): Promise<Record<string, LegalApp>> {
  const storedInputs = await readStoredLegalAppInputs()
  return createLegalApps([...legalAppInputs, ...storedInputs])
}

export async function getLegalApp(slug: string): Promise<LegalApp | undefined> {
  assertProductionStorageIsConfigured()

  if (hasVercelBlobStorage()) {
    const input = await readBlobInput(`${legalAppsBlobPrefix}${slug}.json`)
    return input ? createLegalApp(input) : undefined
  }

  const localInputs = await readLocalLegalAppInputs()
  const input = [...legalAppInputs, ...localInputs].find(
    (candidate) => getSlug(candidate) === slug,
  )
  return input ? createLegalApp(input) : undefined
}

export async function getLegalAppSlugs(): Promise<string[]> {
  return Object.keys(await getLegalApps())
}

function enqueueMutation<T>(operation: () => Promise<T>): Promise<T> {
  const result = mutationQueue.then(operation, operation)
  mutationQueue = result.then(
    () => undefined,
    () => undefined,
  )
  return result
}

export function persistLegalApp(input: CreateLegalAppInput): Promise<LegalApp> {
  return enqueueMutation(async () => {
    assertProductionStorageIsConfigured()
    const parsedInput = createLegalAppInputSchema.parse(input)
    const app = createLegalApp(parsedInput)
    const existingApp = await getLegalApp(app.slug)

    if (existingApp) {
      throw new Error(`An app with slug "${app.slug}" already exists`)
    }

    if (hasVercelBlobStorage()) {
      await put(
        `${legalAppsBlobPrefix}${app.slug}.json`,
        `${JSON.stringify(parsedInput, null, 2)}\n`,
        {
          access: "public",
          contentType: "application/json",
          cacheControlMaxAge: 60,
        },
      )
      return app
    }

    const storedInputs = await readLocalLegalAppInputs()
    const nextInputs = [...storedInputs, parsedInput]
    const temporaryFile = `${legalAppsDataFile}.${process.pid}.tmp`

    await mkdir(path.dirname(legalAppsDataFile), { recursive: true })
    await writeFile(temporaryFile, `${JSON.stringify(nextInputs, null, 2)}\n`, "utf8")
    await rename(temporaryFile, legalAppsDataFile)

    return app
  })
}
