import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { Toaster } from '@/components/ui/toaster'
import { ErrorBoundary } from '@/components/ui/error-boundary'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'NeuraForge OS - AI-Native Research Ecosystem',
  description: 'Transform research collaboration with AI-powered insights, version-controlled research trees, and real-time collaboration.',
  keywords: ['research', 'AI', 'collaboration', 'science', 'innovation'],
  authors: [{ name: 'NeuraForge Team' }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className={`${inter.className} h-full bg-gray-50 antialiased`}>
        <a href="#main-content" className="skip-to-main">
          Skip to main content
        </a>
        <Providers>
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}