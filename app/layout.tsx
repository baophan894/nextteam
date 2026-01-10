import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import Script from "next/script"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"

const _inter = Inter({
  subsets: ["latin"],
  weight: "400"
})

export const metadata: Metadata = {
  title: "NEXT TEAM - Privacy Policy & Terms",
  description: "Privacy Policy and Terms and Conditions for NEXT TEAM applications.",
  generator: "nextteam.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4813848757804792"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`font-sans antialiased`}>
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
