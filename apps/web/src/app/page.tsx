import { MinimalistHeader } from '@/components/layout/minimalist-header'
import { MinimalistHero } from '@/components/landing/minimalist-hero'
import { OverviewSection } from '@/components/landing/overview-section'
import { ResearchFeaturesSection } from '@/components/landing/research-features-section'
import { CollaborationSection } from '@/components/landing/collaboration-section'
import { InnovationAreasSection } from '@/components/landing/innovation-areas-section'
import { CommunitySection } from '@/components/landing/community-section'
import { MinimalistFooter } from '@/components/layout/minimalist-footer'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <MinimalistHeader />
      <main id="main-content">
        <MinimalistHero />
        <OverviewSection />
        <ResearchFeaturesSection />
        <CollaborationSection />
        <InnovationAreasSection />
        <CommunitySection />
      </main>
      <MinimalistFooter />
    </div>
  )
}