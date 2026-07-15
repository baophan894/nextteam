import { NextRequest, NextResponse } from "next/server"
import { ZodError } from "zod"

import {
  createLegalAppPayloadSchema,
  generateLegalAppInput,
  getLegalApps,
  persistLegalApp,
  type CreateLegalAppPayload,
} from "@/lib/legal-apps"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const MAX_ICON_SIZE = 2 * 1024 * 1024
const ALLOWED_ICON_TYPES = new Set([
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/gif",
  "image/avif",
])

function authorize(request: NextRequest) {
  const apiKey = process.env.LEGAL_APPS_API_KEY

  if (!apiKey) {
    return NextResponse.json(
      { error: "LEGAL_APPS_API_KEY is not configured on the server" },
      { status: 503 },
    )
  }

  if (request.headers.get("authorization") !== `Bearer ${apiKey}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
}

async function iconToDataUrl(icon: File) {
  if (!ALLOWED_ICON_TYPES.has(icon.type)) {
    throw new Error("Icon must be a PNG, JPEG, WebP, GIF, or AVIF image")
  }

  if (icon.size === 0 || icon.size > MAX_ICON_SIZE) {
    throw new Error("Icon must be larger than 0 bytes and no more than 2 MB")
  }

  const bytes = Buffer.from(await icon.arrayBuffer())
  return `data:${icon.type};base64,${bytes.toString("base64")}`
}

async function parsePayload(request: NextRequest): Promise<CreateLegalAppPayload> {
  const contentType = request.headers.get("content-type") ?? ""

  if (!contentType.includes("multipart/form-data")) {
    const payload = createLegalAppPayloadSchema.parse(await request.json())

    if (!payload.icon_url) {
      throw new Error('Send "icon_url" or upload an "icon" file')
    }

    return payload
  }

  const form = await request.formData()
  const data = form.get("payload")
  const icon = form.get("icon")

  if (typeof data !== "string") {
    throw new Error(
      'Multipart requests require a JSON string in the "payload" field',
    )
  }

  const payload = JSON.parse(data) as Record<string, unknown>

  if (icon instanceof File && icon.size > 0) {
    payload.icon_url = await iconToDataUrl(icon)
  }

  const parsedPayload = createLegalAppPayloadSchema.parse(payload)

  if (!parsedPayload.icon_url) {
    throw new Error('Send "icon_url" or upload an "icon" file')
  }

  return parsedPayload
}

export async function GET(request: NextRequest) {
  const authorizationError = authorize(request)
  if (authorizationError) return authorizationError

  const apps = Object.values(await getLegalApps()).map((app) => ({
    slug: app.slug,
    app_name: app.appName,
    app_legal_url: app.appLegalUrl,
    privacy_policy_url: app.privacyPolicyUrl,
    terms_url: app.termsUrl,
  }))

  return NextResponse.json({ apps })
}

export async function POST(request: NextRequest) {
  const authorizationError = authorize(request)
  if (authorizationError) return authorizationError

  try {
    const payload = await parsePayload(request)
    const siteUrl =
      process.env.LEGAL_SITE_URL ?? "https://policy.nextteam.site"
    const input = generateLegalAppInput(payload, siteUrl)
    const app = await persistLegalApp(input)

    return NextResponse.json(
      {
        app: {
          slug: app.slug,
          app_name: app.appName,
          legal_url: app.appLegalUrl,
          privacy_url: app.privacyPolicyUrl,
          terms_url: app.termsUrl,
          icon: app.appIconUrl.startsWith("data:") ? "uploaded" : app.appIconUrl,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "Invalid app data", issues: error.flatten() },
        { status: 400 },
      )
    }

    const message = error instanceof Error ? error.message : "Unable to create app"
    const status = message.includes("already exists") ? 409 : 400
    return NextResponse.json({ error: message }, { status })
  }
}
