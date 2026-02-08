'use client'

import { useState, useCallback, ReactNode } from 'react'
import { DashboardContent } from './dashboard-content'

// Define available dashboard routes
export type DashboardRoute = 
  | 'dashboard' 
  | 'projects' 
  | 'experiments' 
  | 'datasets' 
  | 'artifacts'
  | 'discover'
  | 'search'
  | 'browse'
  | 'knowledge-graph'
  | 'literature'
  | 'collaborate'
  | 'teams'
  | 'messages'
  | 'marketplace'
  | 'funding'
  | 'settings'

interface DashboardSPARouterProps {
  initialRoute?: DashboardRoute
}

// Mock components for different routes (will be replaced with actual components)
const ProjectsContent = () => (
  <div className="h-full overflow-auto bg-[var(--color-background)]">
    <div className="p-6">
      <h1 className="text-3xl font-bold text-[var(--color-text-primary)] mb-4">Projects</h1>
      <p className="text-[var(--color-text-secondary)]">Manage your research projects here.</p>
    </div>
  </div>
)

const ExperimentsContent = () => (
  <div className="h-full overflow-auto bg-[var(--color-background)]">
    <div className="p-6">
      <h1 className="text-3xl font-bold text-[var(--color-text-primary)] mb-4">Experiments</h1>
      <p className="text-[var(--color-text-secondary)]">Track and manage your experiments.</p>
    </div>
  </div>
)

const DatasetsContent = () => (
  <div className="h-full overflow-auto bg-[var(--color-background)]">
    <div className="p-6">
      <h1 className="text-3xl font-bold text-[var(--color-text-primary)] mb-4">Datasets</h1>
      <p className="text-[var(--color-text-secondary)]">Manage your research datasets.</p>
    </div>
  </div>
)

const ArtifactsContent = () => (
  <div className="h-full overflow-auto bg-[var(--color-background)]">
    <div className="p-6">
      <h1 className="text-3xl font-bold text-[var(--color-text-primary)] mb-4">Artifacts</h1>
      <p className="text-[var(--color-text-secondary)]">View and manage research artifacts.</p>
    </div>
  </div>
)

const DiscoverContent = () => (
  <div className="h-full overflow-auto bg-[var(--color-background)]">
    <div className="p-6">
      <h1 className="text-3xl font-bold text-[var(--color-text-primary)] mb-4">Discover</h1>
      <p className="text-[var(--color-text-secondary)]">Discover new research and collaborations.</p>
    </div>
  </div>
)

const SearchContent = () => (
  <div className="h-full overflow-auto bg-[var(--color-background)]">
    <div className="p-6">
      <h1 className="text-3xl font-bold text-[var(--color-text-primary)] mb-4">Search</h1>
      <p className="text-[var(--color-text-secondary)]">Search across all research content.</p>
    </div>
  </div>
)

const BrowseContent = () => (
  <div className="h-full overflow-auto bg-[var(--color-background)]">
    <div className="p-6">
      <h1 className="text-3xl font-bold text-[var(--color-text-primary)] mb-4">Browse</h1>
      <p className="text-[var(--color-text-secondary)]">Browse research by category.</p>
    </div>
  </div>
)

const KnowledgeGraphContent = () => (
  <div className="h-full overflow-auto bg-[var(--color-background)]">
    <div className="p-6">
      <h1 className="text-3xl font-bold text-[var(--color-text-primary)] mb-4">Knowledge Graph</h1>
      <p className="text-[var(--color-text-secondary)]">Explore the research knowledge graph.</p>
    </div>
  </div>
)

const LiteratureContent = () => (
  <div className="h-full overflow-auto bg-[var(--color-background)]">
    <div className="p-6">
      <h1 className="text-3xl font-bold text-[var(--color-text-primary)] mb-4">Literature</h1>
      <p className="text-[var(--color-text-secondary)]">Access research literature and papers.</p>
    </div>
  </div>
)

const CollaborateContent = () => (
  <div className="h-full overflow-auto bg-[var(--color-background)]">
    <div className="p-6">
      <h1 className="text-3xl font-bold text-[var(--color-text-primary)] mb-4">Collaborate</h1>
      <p className="text-[var(--color-text-secondary)]">Collaborate with other researchers.</p>
    </div>
  </div>
)

const MarketplaceContent = () => (
  <div className="h-full overflow-auto bg-[var(--color-background)]">
    <div className="p-6">
      <h1 className="text-3xl font-bold text-[var(--color-text-primary)] mb-4">Marketplace</h1>
      <p className="text-[var(--color-text-secondary)]">Browse the research marketplace.</p>
    </div>
  </div>
)

const FundingContent = () => (
  <div className="h-full overflow-auto bg-[var(--color-background)]">
    <div className="p-6">
      <h1 className="text-3xl font-bold text-[var(--color-text-primary)] mb-4">Funding</h1>
      <p className="text-[var(--color-text-secondary)]">Find and manage research funding.</p>
    </div>
  </div>
)

const SettingsContent = () => (
  <div className="h-full overflow-auto bg-[var(--color-background)]">
    <div className="p-6">
      <h1 className="text-3xl font-bold text-[var(--color-text-primary)] mb-4">Settings</h1>
      <p className="text-[var(--color-text-secondary)]">Manage your account and preferences.</p>
    </div>
  </div>
)

// Route component mapping
const routeComponents: Record<DashboardRoute, ReactNode> = {
  dashboard: <DashboardContent />,
  projects: <ProjectsContent />,
  experiments: <ExperimentsContent />,
  datasets: <DatasetsContent />,
  artifacts: <ArtifactsContent />,
  discover: <DiscoverContent />,
  search: <SearchContent />,
  browse: <BrowseContent />,
  'knowledge-graph': <KnowledgeGraphContent />,
  literature: <LiteratureContent />,
  collaborate: <CollaborateContent />,
  teams: <CollaborateContent />, // Reuse collaborate for now
  messages: <CollaborateContent />, // Reuse collaborate for now
  marketplace: <MarketplaceContent />,
  funding: <FundingContent />,
  settings: <SettingsContent />
}

export function DashboardSPARouter({ initialRoute = 'dashboard' }: DashboardSPARouterProps) {
  const [currentRoute, setCurrentRoute] = useState<DashboardRoute>(initialRoute)

  const navigateTo = useCallback((route: DashboardRoute) => {
    setCurrentRoute(route)
    // Update URL without page reload
    window.history.pushState({}, '', `/dashboard/${route === 'dashboard' ? '' : route}`)
  }, [])

  // Expose navigation function globally for sidebar components
  if (typeof window !== 'undefined') {
    (window as any).dashboardNavigate = navigateTo
  }

  return (
    <>
      {routeComponents[currentRoute]}
    </>
  )
}
