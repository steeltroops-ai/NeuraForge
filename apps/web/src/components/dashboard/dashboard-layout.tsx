'use client'

import { useState, useEffect } from 'react'
import { TopNavigation } from './top-navigation'
import { LeftSidebar } from './left-sidebar'
import { UnifiedRightSidebar } from './unified-right-sidebar'
import { DashboardSPARouter } from './dashboard-spa-router'
import { DashboardRouteGuard } from '@/components/auth/protected-route'


interface DashboardLayoutProps {
  children?: React.ReactNode // Make optional for SPA mode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [leftSidebarCollapsed, setLeftSidebarCollapsed] = useState(false)
  const [rightSidebarExpanded, setRightSidebarExpanded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      // Use design token breakpoint
      const breakpointMd = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--breakpoint-md').replace('px', '')) || 768
      const mobile = window.innerWidth < breakpointMd
      setIsMobile(mobile)

      // Auto-collapse sidebars on mobile
      if (mobile) {
        setLeftSidebarCollapsed(true)
        setRightSidebarExpanded(false)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Handle right sidebar layout changes
  const handleRightSidebarLayoutChange = (isExpanded: boolean) => {
    setRightSidebarExpanded(isExpanded)
  }

  return (
    <DashboardRouteGuard>
      {/* New Layout: Sidebar Full Height, Header to Right */}
      <div className="h-screen bg-[var(--color-background)]">

        {/* Fixed Left Sidebar - Full Viewport Height */}
        <aside
          className={`fixed left-0 top-0 border-r border-[var(--color-border-subtle)] bg-[var(--color-background)] overflow-hidden transition-all ease-out ${
            isMobile && !leftSidebarCollapsed ? 'z-[var(--z-index-modal)]' : ''
          }`}
          style={{
            left: '0', // Explicitly ensure flush against left edge
            width: leftSidebarCollapsed ? 'var(--sidebar-width-collapsed)' : 'var(--sidebar-width-expanded)',
            height: '100vh',
            transitionDuration: 'var(--duration-normal)',
            transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)', // Smooth easing
            transformOrigin: 'left center', // Fix animation origin
            margin: '0', // Ensure no margins
            padding: '0', // Ensure no padding
            boxSizing: 'border-box', // Prevent layout shifts
            willChange: 'width', // Optimize for width transitions
            backfaceVisibility: 'hidden' // Prevent flickering
          }}
        >
          <LeftSidebar
            collapsed={leftSidebarCollapsed}
            onToggle={() => setLeftSidebarCollapsed(!leftSidebarCollapsed)}
            isMobile={isMobile}
          />
        </aside>

        {/* Fixed Header - Positioned to Right of Sidebar */}
        <header
          className="fixed top-0 right-0 bg-[var(--color-background)] border-b border-[var(--color-border-subtle)] transition-all ease-out"
          style={{
            left: leftSidebarCollapsed ? 'var(--sidebar-width-collapsed)' : 'var(--sidebar-width-expanded)',
            height: 'var(--header-height)',
            zIndex: 'var(--z-index-fixed)',
            transitionDuration: 'var(--duration-normal)',
            transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)', // Match sidebar easing
            boxSizing: 'border-box', // Prevent layout shifts
            willChange: 'left', // Optimize for position transitions
            backfaceVisibility: 'hidden' // Prevent flickering
          }}
        >
          <TopNavigation />
        </header>

        {/* Main Content Area - Positioned Below Header and to Right of Sidebar */}
        <main
          className="bg-[var(--color-surface)] transition-all ease-out hide-scrollbar overflow-auto"
          style={{
            marginLeft: leftSidebarCollapsed ? 'var(--sidebar-width-collapsed)' : 'var(--sidebar-width-expanded)',
            marginRight: rightSidebarExpanded ? '360px' : '40px',
            marginTop: 'var(--header-height)',
            height: 'calc(100vh - var(--header-height))',
            transitionDuration: 'var(--duration-normal)',
            transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)', // Match sidebar easing
            boxSizing: 'border-box', // Prevent layout shifts
            willChange: 'margin-left, margin-right', // Optimize for margin transitions
            backfaceVisibility: 'hidden', // Prevent flickering
            position: 'relative', // Ensure proper positioning context
            overflow: 'auto' // Ensure proper scrolling
          }}
          role="main"
          aria-label="Main content"
        >
          {children || <DashboardSPARouter />}
        </main>

        {/* Fixed Right Sidebar */}
        <UnifiedRightSidebar onLayoutChange={handleRightSidebarLayoutChange} />

        {/* Mobile Overlay */}
        {isMobile && !leftSidebarCollapsed && (
          <div
            className="fixed inset-0 bg-[var(--color-neutral-900)] transition-opacity lg:hidden"
            style={{
              opacity: 'var(--opacity-50)',
              zIndex: 'var(--z-index-modal-backdrop)',
              transitionDuration: 'var(--duration-normal)'
            }}
            onClick={() => setLeftSidebarCollapsed(true)}
            aria-label="Close sidebar"
          />
        )}
      </div>
    </DashboardRouteGuard>
  )
}
