'use client'

import { useState, useEffect } from 'react'
import { TopNavigation } from './top-navigation'
import { LeftSidebar } from './left-sidebar'
import { RightSidebar } from './right-sidebar'
import { RightSidebarButtons } from './right-sidebar-buttons'
import { DashboardRouteGuard } from '@/components/auth/protected-route'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [leftSidebarCollapsed, setLeftSidebarCollapsed] = useState(false)
  const [rightSidebarCollapsed, setRightSidebarCollapsed] = useState(true) // Start collapsed
  const [activeRightSection, setActiveRightSection] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      
      // Auto-collapse sidebars on mobile
      if (mobile) {
        setLeftSidebarCollapsed(true)
        setRightSidebarCollapsed(true)
        setActiveRightSection(null)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Handle right sidebar section changes
  const handleRightSectionChange = (section: string | null) => {
    setActiveRightSection(section)
    setRightSidebarCollapsed(section === null)
  }

  return (
    <DashboardRouteGuard>
      <div className="h-screen bg-white transition-colors duration-300">
      {/* CSS Grid Layout */}
      <div
        className="grid h-full transition-all duration-300 ease-out"
        style={{
          gridTemplateColumns: `
            ${leftSidebarCollapsed ? '64px' : '280px'}
            1fr
            ${rightSidebarCollapsed ? '0px' : '320px'}
          `,
          gridTemplateRows: '64px 1fr',
          gridTemplateAreas: `
            "left-sidebar top-nav right-sidebar"
            "left-sidebar main-content right-sidebar"
          `
        }}
      >
        {/* Top Navigation */}
        <div
          className="bg-white border-b border-gray-200 z-30"
          style={{ gridArea: 'top-nav' }}
          role="banner"
          aria-label="Top navigation"
        >
          <TopNavigation />
        </div>

        {/* Left Sidebar */}
        <div
          className="bg-gray-50 border-r border-gray-200 z-20 overflow-hidden"
          style={{ gridArea: 'left-sidebar' }}
          role="navigation"
          aria-label="Main navigation"
        >
          <LeftSidebar
            collapsed={leftSidebarCollapsed}
            isMobile={isMobile}
            onToggle={() => setLeftSidebarCollapsed(!leftSidebarCollapsed)}
          />
        </div>

        {/* Main Content Area */}
        <div
          className="bg-gray-50 overflow-auto z-10"
          style={{ gridArea: 'main-content' }}
        >
          <main className="h-full" role="main" aria-label="Main content">
            {children}
          </main>
        </div>

        {/* Right Sidebar */}
        {!rightSidebarCollapsed && (
          <div
            className="bg-white border-l border-gray-200 z-20 overflow-hidden"
            style={{ gridArea: 'right-sidebar' }}
            role="complementary"
            aria-label="Contextual tools and information"
          >
            <RightSidebar
              collapsed={rightSidebarCollapsed}
              isMobile={isMobile}
              activeSection={activeRightSection}
            />
          </div>
        )}
      </div>

      {/* Right Sidebar Vertical Buttons */}
      <RightSidebarButtons
        onSectionChange={handleRightSectionChange}
        activeSection={activeRightSection}
      />

      {/* Mobile Overlay */}
      {isMobile && (!leftSidebarCollapsed || !rightSidebarCollapsed) && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-50 z-40 lg:hidden transition-opacity duration-300"
          onClick={() => {
            setLeftSidebarCollapsed(true)
            setRightSidebarCollapsed(true)
          }}
        />
      )}
      </div>
    </DashboardRouteGuard>
  )
}
