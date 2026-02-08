'use client'

import { lazy, Suspense, Component, ReactNode } from 'react'
import { AboutPageSkeleton } from './about-page-skeleton'

// Lazy load sections for optimal performance
const HeroSection = lazy(() => import('./sections/hero-section'))
const ProblemSection = lazy(() => import('./sections/problem-section'))
const SolutionSection = lazy(() => import('./sections/solution-section'))
const FeaturesSection = lazy(() => import('./sections/features-section'))
const TechnologySection = lazy(() => import('./sections/technology-section'))
const MarketSection = lazy(() => import('./sections/market-section'))
const RoadmapSection = lazy(() => import('./sections/roadmap-section'))
const TeamSection = lazy(() => import('./sections/team-section'))
const SecuritySection = lazy(() => import('./sections/security-section'))
const PricingSection = lazy(() => import('./sections/pricing-section'))
const CTASection = lazy(() => import('./sections/cta-section'))

// Simple Error Boundary Component
interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

class ErrorBoundary extends Component<
  { children: ReactNode; fallback?: ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: ReactNode; fallback?: ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div
          className="flex flex-col items-center justify-center bg-red-50 rounded-lg"
          style={{
            padding: 'var(--space-8)',
            margin: 'var(--space-4)'
          }}
        >
          <h2
            className="font-bold text-red-800"
            style={{
              fontSize: 'var(--font-size-xl)',
              marginBottom: 'var(--space-4)'
            }}
          >
            Something went wrong
          </h2>
          <p
            className="text-red-600 text-center"
            style={{
              fontSize: 'var(--font-size-base)',
              marginBottom: 'var(--space-4)'
            }}
          >
            {this.state.error?.message || 'An unexpected error occurred'}
          </p>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            style={{
              padding: 'var(--space-2) var(--space-4)',
              fontSize: 'var(--font-size-sm)'
            }}
          >
            Try again
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

// Section wrapper with error boundary and suspense
function SectionWrapper({
  children,
  fallback
}: {
  children: ReactNode
  fallback?: ReactNode
}) {
  return (
    <ErrorBoundary>
      <Suspense fallback={fallback || <div className="h-96 bg-gray-100 animate-pulse" />}>
        {children}
      </Suspense>
    </ErrorBoundary>
  )
}

export function AboutPageClient() {
  return (
    <main style={{ paddingTop: 'var(--header-height)' }}>
      <SectionWrapper>
        <HeroSection />
      </SectionWrapper>

      <SectionWrapper>
        <ProblemSection />
      </SectionWrapper>

      <SectionWrapper>
        <SolutionSection />
      </SectionWrapper>

      <SectionWrapper>
        <FeaturesSection />
      </SectionWrapper>

      <SectionWrapper>
        <TechnologySection />
      </SectionWrapper>

      <SectionWrapper>
        <MarketSection />
      </SectionWrapper>

      <SectionWrapper>
        <RoadmapSection />
      </SectionWrapper>

      <SectionWrapper>
        <TeamSection />
      </SectionWrapper>

      <SectionWrapper>
        <SecuritySection />
      </SectionWrapper>

      <SectionWrapper>
        <PricingSection />
      </SectionWrapper>

      <SectionWrapper>
        <CTASection />
      </SectionWrapper>
    </main>
  )
}
