import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/components/auth-provider"
import { Toaster } from "@/components/toaster"
import { ErrorBoundary } from "@/components/error-boundary"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ParsFit™ EMS Studio - Türkiye'nin En Modern EMS Studio'su",
  description: "20 dakikada 3 saatlik antrenman etkisi. EMS teknolojisi ile kişiselleştirilmiş fitness deneyimi.",
  keywords: "EMS, fitness, antrenman, kilo verme, kas geliştirme, İstanbul",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        <ErrorBoundary>
          <AuthProvider>
            {children}
            <Toaster />
          </AuthProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
