import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { CartProvider } from "@/lib/cart-context"
import "./globals.css"

export const metadata: Metadata = {
  title: "Annapurna Foods - Fresh Indian Groceries",
  description: "Premium Indian groceries with convenient pickup service",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      style={
        {
          "--font-geist-sans": GeistSans.style.fontFamily,
          "--font-geist-mono": GeistMono.style.fontFamily,
        } as React.CSSProperties
      }
    >
      <body>
        <CartProvider>
          <Suspense fallback={null}>{children}</Suspense>
        </CartProvider>
        <Analytics />
      </body>
    </html>
  )
}
