import { readFile } from "node:fs/promises"
import path from "node:path"

const [, , payloadPath, iconPath] = process.argv
const apiUrl = process.env.LEGAL_API_URL ?? "http://localhost:3009/api/legal-apps"
const apiKey = process.env.LEGAL_APPS_API_KEY

if (!payloadPath) {
  console.error("Usage: npm run legal:create -- <payload.json> [icon-file]")
  process.exit(1)
}

if (!apiKey) {
  console.error("LEGAL_APPS_API_KEY is required")
  process.exit(1)
}

const payloadContents = await readFile(path.resolve(payloadPath), "utf8")
JSON.parse(payloadContents)

let body
const headers = { Authorization: `Bearer ${apiKey}` }

if (iconPath) {
  const resolvedIconPath = path.resolve(iconPath)
  const extension = path.extname(resolvedIconPath).toLowerCase()
  const mimeTypes = {
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".webp": "image/webp",
    ".gif": "image/gif",
    ".avif": "image/avif",
  }
  const mimeType = mimeTypes[extension]

  if (!mimeType) {
    throw new Error("Icon must be PNG, JPEG, WebP, GIF, or AVIF")
  }

  const form = new FormData()
  const iconBytes = await readFile(resolvedIconPath)
  form.set("payload", payloadContents)
  form.set("icon", new Blob([iconBytes], { type: mimeType }), path.basename(iconPath))
  body = form
} else {
  headers["Content-Type"] = "application/json"
  body = payloadContents
}

const response = await fetch(apiUrl, {
  method: "POST",
  headers,
  body,
})
const responseBody = await response.json()

console.log(JSON.stringify(responseBody, null, 2))

if (!response.ok) process.exit(1)
