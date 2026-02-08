'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { TopNavigation } from './top-navigation'
import { LeftSidebar } from './left-sidebar'
import { UnifiedRightSidebar } from './unified-right-sidebar'
import { DashboardSPARouter } from './dashboard-spa-router'
import { DashboardRouteGuard } from '@/components/auth/protected-route'

/**
 * Layout State Interface
 * Defines all state variables needed for responsive layout management
 */
interface LayoutState {
    leftSidebarCollapsed: boolean
    rightSidebarExpanded: boolean
    rightSidebarActiveTab: string | null
    isMobile: boolean
    isTablet: boolean
}

interface DashboardLayoutV2Props {
    children?: React.ReactNode
}

/**
 * Consolidated DashboardLayout Component (V2)
 * 
 * This component merges the best features from both DashboardLayout and NewDashboardLayout
 * with enhanced performance, accessibility, and responsive behavior.
 * 
 * Key Features:
 * - Hardware-accelerated CSS transforms for smooth animations
 * - Proper z-index layering to prevent conflicts
 * - Responsive state management with mobile, tablet, and desktop breakpoints
 * - Accessibility features including skip links and focus management
 * - Debounced resize handler for optimal performance
 */
export function DashboardLayoutV2({ children }: DashboardLayoutV2Props) {
    // Layout State Management (Subtask 2.1)
    const [layoutState, setLayoutState] = useState<LayoutState>({
        leftSidebarCollapsed: false,
        rightSidebarExpanded: false,
        rightSidebarActiveTab: null,
        isMobile: false,
        isTablet: false
    })

    // Refs for cleanup
    const resizeTimeoutRef = useRef<NodeJS.Timeout>()

    /**
     * Debounced Resize Handler (150ms)
     * Updates responsive state based on viewport width
     */
    const handleResize = useCallback(() => {
        const width = window.innerWidth
        const mobile = width < 768
        const tablet = width >= 768 && width < 1024

        setLayoutState(prev => ({
            ...prev,
            isMobile: mobile,
            isTablet: tablet,
            // Auto-collapse sidebars on mobile
            ...(mobile && {
                leftSidebarCollapsed: true,
                rightSidebarExpanded: false
            }),
            // Auto-collapse left sidebar on tablet
            ...(tablet && {
                leftSidebarCollapsed: true
            })
        }))
    }, [])

    /**
     * Initial responsive state detection and resize listener setup
     */
    useEffect(() => {
        // Initial check
        handleResize()

        // Debounced resize listener (150ms)
        const debouncedResize = () => {
            if (resizeTimeoutRef.current) {
                clearTimeout(resizeTimeoutRef.current)
            }
            resizeTimeoutRef.current = setTimeout(handleResize, 150)
        }

        window.addEventListener('resize', debouncedResize)

        return () => {
            window.removeEventListener('resize', debouncedResize)
            if (resizeTimeoutRef.current) {
                clearTimeout(resizeTimeoutRef.current)
            }
        }
    }, [handleResize])

    /**
     * Left Sidebar Toggle Handler
     */
    const handleLeftSidebarToggle = useCallback(() => {
        setLayoutState(prev => ({
            ...prev,
            leftSidebarCollapsed: !prev.leftSidebarCollapsed
        }))
    }, [])

    /**
     * Right Sidebar Layout Change Handler
     * Called when right sidebar expands or collapses
     */
    const handleRightSidebarLayoutChange = useCallback((isExpanded: boolean) => {
        setLayoutState(prev => ({
            ...prev,
            rightSidebarExpanded: isExpanded
        }))
    }, [])

    /**
     * Main Content Area Margin Calculations (Subtask 2.3)
     * Calculates dynamic margins based on sidebar states
     * 
     * Animation Strategy:
     * - Synchronized with sidebar animations (300ms, same easing)
     * - Hardware-accelerated with will-change and backface-visibility
     * - Smooth margin transitions prevent content jumps
     */
    const getMainContentStyles = useCallback(() => {
        const { leftSidebarCollapsed, rightSidebarExpanded, isMobile } = layoutState

        // Left margin: var(--sidebar-width-collapsed) or var(--sidebar-width-expanded)
        const leftMargin = isMobile ? '0' : (leftSidebarCollapsed ? 'var(--sidebar-width-collapsed)' : 'var(--sidebar-width-expanded)')

        // Right margin: 40px (buttons only) or 360px (expanded panel)
        const rightMargin = isMobile ? '0' : (rightSidebarExpanded ? '360px' : '40px')

        return {
            marginLeft: leftMargin,
            marginRight: rightMargin,
            marginTop: 'var(--header-height)', // Header height
            height: 'calc(100vh - var(--header-height))',
            // Smooth transition for margin changes using design token
            transition: 'margin var(--duration-normal) var(--easing-ease-in-out)',
            // Performance optimizations to prevent flickering
            willChange: 'margin-left, margin-right',
            backfaceVisibility: 'hidden' as const,
            position: 'relative' as const,
            overflow: 'auto' as const,
            boxSizing: 'border-box' as const,
            // Enable GPU acceleration
            WebkitFontSmoothing: 'antialiased' as const,
            MozOsxFontSmoothing: 'grayscale' as const
        }
    }, [layoutState])

    /**
     * Header Position Calculations
     * Adjusts header position based on left sidebar state
     * 
     * Animation Strategy:
     * - Synchronized with sidebar animation (300ms, same easing)
     * - Hardware-accelerated with will-change and backface-visibility
     */
    const getHeaderStyles = useCallback(() => {
        const { leftSidebarCollapsed, isMobile } = layoutState

        const leftOffset = isMobile ? '0' : (leftSidebarCollapsed ? '64px' : '280px')

        return {
            position: 'fixed' as const,
            left: leftOffset,
            right: '0',
            top: '0',
            height: '64px',
            zIndex: 'var(--z-index-fixed)',
            // Smooth transition matching sidebar animation (300ms cubic-bezier)
            transition: 'left 300ms cubic-bezier(0.4, 0, 0.2, 1)',
            // Performance optimizations to prevent flickering
            willChange: 'left',
            backfaceVisibility: 'hidden' as const,
            boxSizing: 'border-box' as const,
            // Enable GPU acceleration
            WebkitFontSmoothing: 'antialiased' as const,
            MozOsxFontSmoothing: 'grayscale' as const
        }
    }, [layoutState])

    /**
     * Left Sidebar Styles with Transform Animations (Subtask 2.2)
     * Uses CSS transforms for hardware-accelerated animations
     * 
     * Animation Strategy:
     * - Uses translateX for mobile overlay (hardware-accelerated)
     * - Uses width transition for desktop collapse/expand
     * - cubic-bezier(0.4, 0, 0.2, 1) for professional easing
     * - 300ms duration for smooth, responsive feel
     * - will-change and backface-visibility to prevent flickering
     */
    const getLeftSidebarStyles = useCallback(() => {
        const { leftSidebarCollapsed, isMobile } = layoutState

        return {
            // Width changes for desktop collapse/expand
            width: leftSidebarCollapsed ? '64px' : '280px',
            height: '100vh',
            // Hardware-accelerated transform for mobile overlay
            // On mobile, slide sidebar off-screen when collapsed
            transform: isMobile && leftSidebarCollapsed ? 'translateX(-100%)' : 'translateX(0)',
            // Smooth cubic-bezier easing for professional animations (300ms)
            transition: 'width 300ms cubic-bezier(0.4, 0, 0.2, 1), transform 300ms cubic-bezier(0.4, 0, 0.2, 1)',
            // Performance optimizations to prevent flickering
            willChange: 'width, transform',
            backfaceVisibility: 'hidden' as const,
            // Transform origin for smooth scaling
            transformOrigin: 'left center' as const,
            // Ensure proper positioning
            position: 'fixed' as const,
            left: '0',
            top: '0',
            margin: '0',
            padding: '0',
            boxSizing: 'border-box' as const,
            // Enable GPU acceleration
            WebkitFontSmoothing: 'antialiased' as const,
            MozOsxFontSmoothing: 'grayscale' as const
        }
    }, [layoutState])

    /**
     * Escape Key Handler for Mobile Menu (Subtask 2.4)
     */
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                if (layoutState.isMobile && !layoutState.leftSidebarCollapsed) {
                    setLayoutState(prev => ({
                        ...prev,
                        leftSidebarCollapsed: true
                    }))
                }
            }
        }

        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [layoutState.isMobile, layoutState.leftSidebarCollapsed])

    return (
        <DashboardRouteGuard>
            {/* Skip Links for Accessibility */}
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

            {/* Main Layout Container */}
            <div className="h-screen bg-[var(--color-background)] overflow-hidden">

                {/* Fixed Left Sidebar - Full Viewport Height */}
                <aside
                    id="navigation"
                    className={`
            fixed left-0 top-0 border-r border-[var(--color-border-subtle)] bg-[var(--color-background)] overflow-hidden
            ${layoutState.isMobile && !layoutState.leftSidebarCollapsed ? 'z-[1050]' : 'z-20'}
          `}
                    style={getLeftSidebarStyles()}
                    role="navigation"
                    aria-label="Primary navigation"
                >
                    <LeftSidebar
                        collapsed={layoutState.leftSidebarCollapsed}
                        onToggle={handleLeftSidebarToggle}
                        isMobile={layoutState.isMobile}
                    />
                </aside>

                {/* Fixed Header - Positioned to Right of Sidebar */}
                <header
                    className="fixed top-0 bg-[var(--color-background)] border-b border-[var(--color-border-subtle)]"
                    style={getHeaderStyles()}
                >
                    <TopNavigation />
                </header>

                {/* Main Content Area - Scrollable */}
                <main
                    id="main-content"
                    className="bg-[var(--color-surface)] hide-scrollbar"
                    style={getMainContentStyles()}
                    role="main"
                    aria-label="Main content"
                >
                    {children || <DashboardSPARouter />}
                </main>

                {/* Fixed Right Sidebar */}
                <UnifiedRightSidebar onLayoutChange={handleRightSidebarLayoutChange} />

                {/* Mobile Overlay and Backdrop (Subtask 2.4) */}
                {layoutState.isMobile && !layoutState.leftSidebarCollapsed && (
                    <div
                        className="fixed inset-0 bg-black/50 lg:hidden"
                        style={{
                            zIndex: 1040, // var(--z-index-modal-backdrop)
                            // Smooth fade-in animation (300ms cubic-bezier)
                            transition: 'opacity 300ms cubic-bezier(0.4, 0, 0.2, 1)',
                            // Performance optimizations
                            willChange: 'opacity',
                            backfaceVisibility: 'hidden' as const,
                            WebkitFontSmoothing: 'antialiased' as const
                        }}
                        onClick={() => setLayoutState(prev => ({ ...prev, leftSidebarCollapsed: true }))}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault()
                                setLayoutState(prev => ({ ...prev, leftSidebarCollapsed: true }))
                            }
                        }}
                        role="button"
                        tabIndex={0}
                        aria-label="Close sidebar"
                    />
                )}

                {/* Mobile Floating Action Button */}
                {layoutState.isMobile && layoutState.leftSidebarCollapsed && (
                    <button
                        onClick={() => setLayoutState(prev => ({ ...prev, leftSidebarCollapsed: false }))}
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

                {/* Loading State Indicator */}
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

                {/* Notification Toast Container */}
                <div
                    id="toast-container"
                    className="fixed z-50 space-y-2 pointer-events-none top-20 right-6"
                    role="region"
                    aria-live="polite"
                    aria-label="Notifications"
                >
                    {/* Toast notifications will be dynamically inserted here */}
                </div>

                {/* Keyboard Navigation Helper */}
                <div className="sr-only" role="region" aria-label="Keyboard shortcuts">
                    <p>Press Escape to close panels, Tab to navigate between elements</p>
                </div>
            </div>
        </DashboardRouteGuard>
    )
}
