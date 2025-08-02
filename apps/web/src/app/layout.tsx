import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Sports Talent Discovery Platform",
  description: "Discover and showcase sports talent across Africa with AI-powered analytics and scouting tools.",
  keywords: ["sports", "talent", "scouting", "africa", "football", "analytics"],
  authors: [{ name: "Sports Talent Team" }],
  openGraph: {
    title: "Sports Talent Discovery Platform",
    description: "Discover and showcase sports talent across Africa",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sports Talent Discovery Platform",
    description: "Discover and showcase sports talent across Africa",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <div id="root">{children}</div>
      </body>
    </html>
  )
}
