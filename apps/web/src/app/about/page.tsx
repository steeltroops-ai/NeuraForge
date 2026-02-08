import { Metadata } from 'next'
import { Suspense } from 'react'
import { MinimalistHeader } from '@/components/layout/minimalist-header'
import { MinimalistFooter } from '@/components/layout/minimalist-footer'
import { AboutPageClient } from '@/components/about/about-page-client'
import { AboutPageSkeleton } from '@/components/about/about-page-skeleton'

export const metadata: Metadata = {
  title: 'About - NeuraForge OS | AI-Native Research Ecosystem',
  description: 'Learn about NeuraForge OS, the revolutionary AI-native research platform transforming how humanity tackles complex problems through collaborative intelligence.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[var(--color-surface)]">
      <MinimalistHeader />
      <Suspense fallback={<AboutPageSkeleton />}>
        <AboutPageClient />
      </Suspense>
      <MinimalistFooter />
    </div>
  )
}