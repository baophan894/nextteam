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
  title: "Control Solution - Your Software Development Partner",
  description: "Control Solution is a network of connected, young and passionate software engineers. We simplify complexity and provide master control solutions for your business.",
  generator: "controlsolution.com",
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
