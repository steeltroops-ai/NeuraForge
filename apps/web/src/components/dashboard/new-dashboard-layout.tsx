'use client'

import { useState, useEffect } from 'react'
import { TopNavigation } from './top-navigation'
import { LeftSidebar } from './left-sidebar'
import { UnifiedRightSidebar } from './unified-right-sidebar'
import { DashboardSPARouter } from './dashboard-spa-router'
import { DashboardRouteGuard } from '@/components/auth/protected-route'

interface NewDashboardLayoutProps {
  children?: React.ReactNode
}

export function NewDashboardLayout({ children }: NewDashboardLayoutProps) {
  const [leftSidebarCollapsed, setLeftSidebarCollapsed] = useState(false)
  const [rightSidebarExpanded, setRightSidebarExpanded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Enhanced responsive behavior with improved breakpoint detection
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768
      const tablet = window.innerWidth >= 768 && window.innerWidth < 1024
      
      setIsMobile(mobile)

      // Enhanced auto-collapse logic for different screen sizes
      if (mobile) {
        setLeftSidebarCollapsed(true)
        setRightSidebarExpanded(false)
      } else if (tablet) {
        // On tablet, keep left sidebar collapsed but allow right sidebar
        setLeftSidebarCollapsed(true)
      }
    }

    // Initial check
    handleResize()
    
    // Add resize listener with debouncing
    let timeoutId: NodeJS.Timeout
    const debouncedResize = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(handleResize, 150)
    }

    window.addEventListener('resize', debouncedResize)
    return () => {
      window.removeEventListener('resize', debouncedResize)
      clearTimeout(timeoutId)
    }
  }, [])

  // Enhanced sidebar toggle handlers
  const handleLeftSidebarToggle = () => {
    setLeftSidebarCollapsed(!leftSidebarCollapsed)
  }

  const handleRightSidebarLayoutChange = (isExpanded: boolean) => {
    setRightSidebarExpanded(isExpanded)
  }

  // Enhanced layout calculations
  const getMainContentStyles = () => {
    const leftMargin = leftSidebarCollapsed ? '4rem' : '18rem' // 64px : 288px
    const rightMargin = rightSidebarExpanded ? '24rem' : '3rem' // 384px : 48px
    
    return {
      marginLeft: isMobile ? '0' : leftMargin,
      marginRight: isMobile ? '0' : rightMargin,
      marginTop: '4rem', // 64px for header
      height: 'calc(100vh - 4rem)',
      transition: 'margin 300ms cubic-bezier(0.4, 0, 0.2, 1)'
    }
  }

  const getHeaderStyles = () => {
    const leftOffset = isMobile ? '0' : (leftSidebarCollapsed ? '4rem' : '18rem')
    
    return {
      left: leftOffset,
      right: '0',
      height: '4rem', // 64px
      zIndex: 'var(--z-index-fixed)',
      transition: 'left 300ms cubic-bezier(0.4, 0, 0.2, 1)'
    }
  }

  return (
    <DashboardRouteGuard>
      <div className="h-screen bg-[var(--color-background)] overflow-hidden">
        
        {/* Enhanced Left Sidebar - Full Height */}
        <aside
          className={`
            fixed left-0 top-0 h-full z-20 transition-all duration-300 ease-in-out
            ${isMobile && !leftSidebarCollapsed ? 'z-50' : ''}
          `}
          style={{
            width: leftSidebarCollapsed ? '4rem' : '18rem',
            transform: isMobile && leftSidebarCollapsed ? 'translateX(-100%)' : 'translateX(0)'
          }}
        >
          <LeftSidebar
            collapsed={leftSidebarCollapsed}
            onToggle={handleLeftSidebarToggle}
            isMobile={isMobile}
          />
        </aside>

        {/* Enhanced Header - Positioned to Right of Sidebar */}
        <header
          className="fixed top-0 bg-[var(--color-background)] border-b border-[var(--color-border-subtle)] z-10"
          style={getHeaderStyles()}
        >
          <TopNavigation />
        </header>

        {/* Enhanced Main Content Area */}
        <main
          className="bg-[var(--color-surface)] overflow-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
          style={getMainContentStyles()}
          role="main"
          aria-label="Main content"
        >
          {children || <DashboardSPARouter />}
        </main>

        {/* Enhanced Right Sidebar */}
        <UnifiedRightSidebar onLayoutChange={handleRightSidebarLayoutChange} />

        {/* Enhanced Mobile Overlay for Left Sidebar */}
        {isMobile && !leftSidebarCollapsed && (
          <div
            className="fixed inset-0 z-40 transition-opacity duration-300 bg-black/50"
            onClick={() => setLeftSidebarCollapsed(true)}
            aria-label="Close sidebar"
          />
        )}

        {/* Enhanced Floating Action Button for Mobile */}
        {isMobile && leftSidebarCollapsed && (
          <button
            onClick={() => setLeftSidebarCollapsed(false)}
            className="fixed bottom-6 left-6 w-14 h-14 bg-[var(--color-primary-600)] text-white rounded-full shadow-lg hover:bg-[var(--color-primary-700)] focus:outline-none focus:ring-4 focus:ring-[var(--color-primary-200)] transition-all duration-200 z-30"
            aria-label="Open navigation menu"
          >
            <svg
              className="w-6 h-6 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        )}

        {/* Enhanced Accessibility Skip Links */}
        <div className="sr-only">
          <a
            href="#main-content"
            className="fixed top-4 left-4 bg-[var(--color-primary-600)] text-white px-4 py-2 rounded-md focus:not-sr-only focus:z-50"
          >
            Skip to main content
          </a>
          <a
            href="#navigation"
            className="fixed top-4 left-32 bg-[var(--color-primary-600)] text-white px-4 py-2 rounded-md focus:not-sr-only focus:z-50"
          >
            Skip to navigation
          </a>
        </div>

        {/* Enhanced Loading State Indicator */}
        <div
          id="loading-indicator"
          className="fixed top-20 right-6 bg-[var(--color-primary-600)] text-white px-4 py-2 rounded-full shadow-lg opacity-0 pointer-events-none transition-opacity duration-300 z-50"
          role="status"
          aria-live="polite"
        >
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 rounded-full border-white/30 border-t-white animate-spin"></div>
            <span className="text-sm font-medium">Loading...</span>
          </div>
        </div>

        {/* Enhanced Notification Toast Container */}
        <div
          id="toast-container"
          className="fixed z-50 space-y-2 pointer-events-none top-20 right-6"
          role="region"
          aria-live="polite"
          aria-label="Notifications"
        >
          {/* Toast notifications will be dynamically inserted here */}
        </div>

        {/* Enhanced Keyboard Navigation Helper */}
        <div className="sr-only" role="region" aria-label="Keyboard shortcuts">
          <p>Press Alt+N to open navigation, Alt+S to open settings, Escape to close panels</p>
        </div>

        {/* Enhanced Focus Management */}
        <div
          id="focus-trap-start"
          tabIndex={0}
          className="sr-only"
          onFocus={() => {
            // Focus management for modal states
            if (isMobile && !leftSidebarCollapsed) {
              const sidebar = document.querySelector('[role="navigation"]') as HTMLElement
              sidebar?.focus()
            }
          }}
        />

        <div
          id="focus-trap-end"
          tabIndex={0}
          className="sr-only"
          onFocus={() => {
            // Return focus to main content when tabbing past modal
            const mainContent = document.querySelector('[role="main"]') as HTMLElement
            mainContent?.focus()
          }}
        />
      </div>
    </DashboardRouteGuard>
  )
}
