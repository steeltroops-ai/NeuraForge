'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import {
  MessageCircle,
  FileText,
  Users,
  BarChart3,
  Settings,
  X,
  Send
} from 'lucide-react'
import { Button } from '@/components/ui/design-system-button'
import { mockCollaborators } from '@/lib/mock-data'


// Constants
const PANEL_WIDTH = 320
const BUTTON_COLUMN_WIDTH = 40
const HEADER_HEIGHT = 64

type TabId = 'ai' | 'notes' | 'teams' | 'analytics' | 'settings'

interface UnifiedRightSidebarProps {
  onLayoutChange: (isExpanded: boolean) => void
}

// Enhanced color system for each tab using design tokens
const tabColors = {
  ai: {
    primary: 'var(--color-primary-500)', // Purple
    light: 'var(--color-primary-100)',
    dark: 'var(--color-primary-700)',
    text: 'var(--color-text-inverse)'
  },
  notes: {
    primary: 'var(--color-success-500)', // Emerald
    light: 'var(--color-success-100)',
    dark: 'var(--color-success-600)',
    text: 'var(--color-text-inverse)'
  },
  teams: {
    primary: 'var(--color-warning-500)', // Amber
    light: 'var(--color-warning-100)',
    dark: 'var(--color-warning-600)',
    text: 'var(--color-text-inverse)'
  },
  analytics: {
    primary: 'var(--color-primary-500)', // Blue (using primary)
    light: 'var(--color-primary-100)',
    dark: 'var(--color-primary-700)',
    text: 'var(--color-text-inverse)'
  },
  settings: {
    primary: 'var(--color-neutral-500)', // Gray
    light: 'var(--color-neutral-100)',
    dark: 'var(--color-neutral-600)',
    text: 'var(--color-text-inverse)'
  }
}

export function UnifiedRightSidebar({ onLayoutChange }: UnifiedRightSidebarProps) {
  const [activeTab, setActiveTab] = useState<TabId | null>(null)
  const [isExpanded, setIsExpanded] = useState(false)
  const [aiMessage, setAiMessage] = useState('')
  const sidebarRef = useRef<HTMLDivElement>(null)

  const tabs = [
    {
      id: 'ai' as TabId,
      label: 'AI Chat',
      icon: MessageCircle,
      description: 'AI-powered research assistant'
    },
    {
      id: 'notes' as TabId,
      label: 'Collab Notes',
      icon: FileText,
      description: 'Collaborative notes and comments'
    },
    {
      id: 'teams' as TabId,
      label: 'Teams',
      icon: Users,
      description: 'Team members and collaboration'
    },
    {
      id: 'analytics' as TabId,
      label: 'Analytics',
      icon: BarChart3,
      description: 'Project analytics and metrics'
    },
    {
      id: 'settings' as TabId,
      label: 'Settings',
      icon: Settings,
      description: 'User preferences and project settings'
    }
  ]

  // Handle button clicks
  const handleButtonClick = useCallback((tabId: TabId) => {
    if (activeTab === tabId && isExpanded) {
      // Close if same tab is already open
      setActiveTab(null)
      setIsExpanded(false)
      onLayoutChange(false)
    } else {
      // Open with new tab or switch content
      setActiveTab(tabId)
      setIsExpanded(true)
      onLayoutChange(true)
    }
  }, [activeTab, isExpanded, onLayoutChange])

  // Handle close
  const handleClose = useCallback(() => {
    setActiveTab(null)
    setIsExpanded(false)
    onLayoutChange(false)
  }, [onLayoutChange])

  // Ensure layout change callback is synchronized with expansion state
  useEffect(() => {
    onLayoutChange(isExpanded)
  }, [isExpanded, onLayoutChange])

  // Outside click handler
  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        handleClose()
      }
    }

    if (isExpanded) {
      document.addEventListener('mousedown', handleMouseDown)
    }

    return () => {
      document.removeEventListener('mousedown', handleMouseDown)
    }
  }, [isExpanded, handleClose])

  // Keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent, tabId: TabId) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleButtonClick(tabId)
    }
  }

  // Responsive behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        // Mobile: close sidebar
        handleClose()
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Check if mobile - use a more reliable method
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <>
      {/* Mobile Backdrop with Framer Motion */}
      {isMobile && isExpanded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          transition={{ duration: parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--duration-normal').replace('ms', '')) / 1000 || 0.3 }}
          className="fixed inset-0 bg-[var(--color-neutral-900)]"
          style={{
            zIndex: 1040 // Modal backdrop z-index
          }}
          onClick={handleClose}
          aria-label="Close sidebar"
        />
      )}

      {/* Right Sidebar Container - Desktop: Fixed sidebar, Mobile: Full-screen modal */}
      {isMobile ? (
        // Mobile: Full-screen modal with slide-up animation
        isExpanded && (
          <motion.aside
            ref={sidebarRef}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{
              duration: parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--duration-normal').replace('ms', '')) / 1000 || 0.3,
              ease: [0.4, 0, 0.2, 1]
            }}
            className="fixed inset-x-0 bottom-0 flex flex-col overflow-hidden bg-[var(--color-background)] rounded-t-2xl"
            style={{
              height: '90vh',
              zIndex: 1050, // Above backdrop
              margin: '0',
              padding: '0',
              boxShadow: 'var(--shadow-lg)'
            }}
          >
            {/* Mobile Handle Bar */}
            <div className="flex items-center justify-center py-2 bg-[var(--color-surface)]">
              <div className="w-12 h-1 bg-[var(--color-border-default)] rounded-full" />
            </div>

            {activeTab && (() => {
              const headerColors = tabColors[activeTab as TabId]
              return (
                <div className="flex flex-col h-full">
                  {/* Panel Header */}
                  <div
                    className="p-4 border-b"
                    style={{
                      backgroundColor: headerColors.primary,
                      borderBottomColor: headerColors.dark,
                      color: headerColors.text
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-semibold">
                        {tabs.find(t => t.id === activeTab)?.label}
                      </h2>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleClose}
                        className="p-1 hover:opacity-80"
                        style={{
                          color: headerColors.text,
                          backgroundColor: 'transparent'
                        }}
                        aria-label="Close panel"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Panel Content */}
                  <div
                    className="flex-1 bg-[var(--color-background)] overflow-y-auto"
                    style={{ padding: 'var(--space-4)' }}
                  >
                    {activeTab === 'ai' && <AIContent aiMessage={aiMessage} setAiMessage={setAiMessage} />}
                    {activeTab === 'notes' && <NotesContent />}
                    {activeTab === 'teams' && <TeamsContent />}
                    {activeTab === 'analytics' && <AnalyticsContent />}
                    {activeTab === 'settings' && <SettingsContent />}
                  </div>
                </div>
              )
            })()}
          </motion.aside>
        )
      ) : (
        // Desktop: Fixed right sidebar
        <aside
          ref={sidebarRef}
          className="fixed right-0 flex overflow-hidden"
          style={{
            top: 'var(--header-height)',
            right: '0',
            width: isExpanded ? PANEL_WIDTH + BUTTON_COLUMN_WIDTH : BUTTON_COLUMN_WIDTH,
            height: 'calc(100vh - var(--header-height))',
            zIndex: 'var(--z-index-docked)',
            margin: '0',
            padding: '0'
          }}
        >
          {/* Expandable Panel */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: isExpanded ? PANEL_WIDTH : 0 }}
            transition={{
              duration: parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--duration-normal').replace('ms', '')) / 1000 || 0.3,
              ease: "easeInOut"
            }}
            className="overflow-hidden bg-[var(--color-background)] border-l border-[var(--color-border-subtle)]"
            style={{
              overflow: 'hidden',
              boxShadow: 'var(--shadow-xl)',
              transformOrigin: 'right center' // Fix animation origin for right sidebar
            }}
          >
            {isExpanded && activeTab && (() => {
              const headerColors = tabColors[activeTab as TabId]
              return (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--duration-fast').replace('ms', '')) / 1000 || 0.15, delay: 0.1 }}
                  className="flex flex-col h-full"
                >
                  {/* Panel Header with Dynamic Color Background */}
                  <div
                    className="p-4 border-b"
                    style={{
                      backgroundColor: headerColors.primary,
                      borderBottomColor: headerColors.dark,
                      color: headerColors.text
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-semibold">
                        {tabs.find(t => t.id === activeTab)?.label}
                      </h2>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleClose}
                        className="p-1 hover:opacity-80"
                        style={{
                          color: headerColors.text,
                          backgroundColor: 'transparent'
                        }}
                        aria-label="Close panel"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Panel Content - No Internal Scrolling */}
                  <div
                    className="flex-1 bg-[var(--color-background)] overflow-hidden"
                    style={{ padding: 'var(--space-4)' }}
                  >
                    {activeTab === 'ai' && <AIContent aiMessage={aiMessage} setAiMessage={setAiMessage} />}
                    {activeTab === 'notes' && <NotesContent />}
                    {activeTab === 'teams' && <TeamsContent />}
                    {activeTab === 'analytics' && <AnalyticsContent />}
                    {activeTab === 'settings' && <SettingsContent />}
                  </div>
                </motion.div>
              )
            })()}
          </motion.div>

          {/* Button Column - Always Visible */}
          <div
            className="flex flex-col bg-[var(--color-background)] border-l border-[var(--color-border-subtle)]"
            style={{
              width: BUTTON_COLUMN_WIDTH,
              boxShadow: 'var(--shadow-xl)'
            }}
          >
            {tabs.map((tab, index) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id && isExpanded
              const colors = tabColors[tab.id as TabId]

              return (
                <button
                  key={tab.id}
                  onClick={() => handleButtonClick(tab.id)}
                  onKeyDown={(e) => handleKeyDown(e, tab.id)}
                  className={`
                  flex-1 flex items-center justify-center transition-all will-change-transform
                  focus-visible:outline-2 focus-visible:outline-offset-2
                  ${!isActive ? 'hover:opacity-80 hover:scale-105' : ''}
                  ${isActive ? 'shadow-lg' : 'hover:shadow-md'}
                `}
                  style={{
                    // Focus outline color matches the button's theme
                    ['--tw-ring-color' as any]: colors.primary,
                    // Color system
                    backgroundColor: isActive ? colors.primary : 'var(--color-background)',
                    color: isActive ? colors.text : 'var(--color-text-secondary)',
                    borderColor: isActive ? colors.dark : 'transparent',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    // Layout and positioning
                    width: `${BUTTON_COLUMN_WIDTH}px`,
                    minHeight: '80px', // Increased height to accommodate rotated text
                    transitionDuration: 'var(--duration-normal)',
                    boxShadow: isActive ? 'var(--shadow-lg)' : 'var(--shadow-md)',
                    borderRadius: '0', // REMOVED: All corner rounding for sharp, square corners
                    // Perfect vertical centering for icon-text unit
                    display: 'flex',
                    flexDirection: 'column', // Vertical stacking for narrow button column
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 'var(--space-1)', // Optimal gap between icon and text
                    padding: 'var(--space-2) var(--space-1)' // Balanced padding for better spacing
                  }}
                  aria-label={tab.description}
                  title={tab.label}
                  aria-pressed={isActive}
                >
                  <Icon
                    className="w-4 h-4"
                    style={{
                      flexShrink: 0, // Prevent icon from shrinking
                      marginBottom: '4px' // Space between icon and rotated text
                    }}
                    aria-hidden="true"
                  />
                  <span
                    className="font-medium text-center leading-tight"
                    style={{
                      fontSize: '11px', // Slightly larger for better readability when rotated
                      fontWeight: 'var(--font-weight-medium)',
                      flexShrink: 0, // Prevent text from shrinking
                      lineHeight: '1.2', // Better line height for rotated text
                      // VERTICAL TEXT ROTATION - 90 degrees
                      transform: 'rotate(90deg)',
                      transformOrigin: 'center center',
                      whiteSpace: 'nowrap', // Prevent text wrapping when rotated
                      textAlign: 'center',
                      // Ensure proper positioning after rotation
                      display: 'inline-block',
                      width: 'auto',
                      height: 'auto',
                      marginTop: '2px' // Fine-tune vertical alignment
                    }}
                  >
                    {tab.label}
                  </span>
                </button>
              )
            })}
          </div>
        </aside>
      )}

      {/* Mobile: Floating Button Column (only when not expanded) */}
      {isMobile && !isExpanded && (
        <div
          className="fixed bottom-4 right-4 flex flex-col gap-2 bg-[var(--color-background)] rounded-2xl shadow-2xl border border-[var(--color-border-subtle)] p-2"
          style={{
            zIndex: 1000
          }}
        >
          {tabs.map((tab) => {
            const Icon = tab.icon
            const colors = tabColors[tab.id as TabId]

            return (
              <button
                key={tab.id}
                onClick={() => handleButtonClick(tab.id)}
                onKeyDown={(e) => handleKeyDown(e, tab.id)}
                className="flex items-center justify-center transition-all hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 rounded-xl"
                style={{
                  backgroundColor: colors.light,
                  color: colors.primary,
                  width: '48px',
                  height: '48px',
                  transitionDuration: 'var(--duration-fast)'
                }}
                aria-label={tab.description}
                title={tab.label}
              >
                <Icon className="w-5 h-5" aria-hidden="true" />
              </button>
            )
          })}
        </div>
      )}
    </>
  )
}

// Content Components
const AIContent = ({ aiMessage, setAiMessage }: { aiMessage: string, setAiMessage: (msg: string) => void }) => (
  <div className="flex flex-col h-full">
    {/* AI Chat Messages */}
    <div className="flex-1 mb-4 space-y-4">
      <div className="flex gap-3">
        <div className="flex items-center justify-center flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-[var(--color-primary-500)] to-[var(--color-primary-600)]">
          <span className="text-xs font-bold text-[var(--color-text-inverse)]">AI</span>
        </div>
        <div className="bg-[var(--color-surface-elevated)] rounded-lg p-3 max-w-[80%]">
          <p className="text-sm text-[var(--color-text-primary)]">
            I&apos;ve analyzed your recent experiments and found 3 potential optimizations. Would you like me to explain them?
          </p>
          <span className="block mt-1 text-xs text-[var(--color-text-secondary)]">2 min ago</span>
        </div>
      </div>
    </div>

    {/* Message Input */}
    <div className="flex gap-2 p-3 border-t border-[var(--color-border-subtle)]">
      <input
        type="text"
        value={aiMessage}
        onChange={(e) => setAiMessage(e.target.value)}
        placeholder="Ask AI assistant..."
        className="flex-1 px-3 py-2 text-sm border border-[var(--color-border-default)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]"
      />
      <Button variant="primary" size="sm" className="px-3">
        <Send className="w-4 h-4" />
      </Button>
    </div>
  </div>
)

const NotesContent = () => (
  <div className="space-y-4">
    <h3 className="font-medium text-[var(--color-text-primary)]">Collaborative Notes</h3>
    <div className="space-y-3">
      <div className="p-3 border border-[var(--color-warning-100)] rounded-lg bg-[var(--color-warning-50)]">
        <p className="text-sm text-[var(--color-text-primary)]">Research hypothesis needs refinement</p>
        <span className="text-xs text-[var(--color-text-secondary)]">Sarah Chen • 1h ago</span>
      </div>
    </div>
  </div>
)

const TeamsContent = () => (
  <div className="space-y-4">
    <h3 className="font-medium text-[var(--color-text-primary)]">Team Members</h3>
    <div className="space-y-3">
      {mockCollaborators.slice(0, 3).map((member) => (
        <div key={member.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-[var(--color-surface)]">
          <div className="flex items-center justify-center w-8 h-8 bg-[var(--color-primary-100)] rounded-full">
            <span className="text-xs font-medium text-[var(--color-primary-600)]">{member.name.charAt(0)}</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-[var(--color-text-primary)]">{member.name}</p>
            <p className="text-xs text-[var(--color-text-secondary)]">{member.role}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
)

const AnalyticsContent = () => (
  <div className="space-y-4">
    <h3 className="font-medium text-[var(--color-text-primary)]">Project Analytics</h3>
    <div className="grid grid-cols-2 gap-3">
      <div className="p-3 rounded-lg bg-[var(--color-primary-50)]">
        <p className="text-lg font-semibold text-[var(--color-primary-600)]">127</p>
        <p className="text-xs text-[var(--color-text-secondary)]">Experiments</p>
      </div>
      <div className="p-3 rounded-lg bg-[var(--color-success-50)]">
        <p className="text-lg font-semibold text-[var(--color-success-600)]">89%</p>
        <p className="text-xs text-[var(--color-text-secondary)]">Success Rate</p>
      </div>
    </div>
  </div>
)

const SettingsContent = () => (
  <div className="space-y-4">
    <h3 className="font-medium text-[var(--color-text-primary)]">Settings</h3>
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm text-[var(--color-text-primary)]">Notifications</span>
        <input type="checkbox" className="rounded" defaultChecked />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm text-[var(--color-text-primary)]">Auto-save</span>
        <input type="checkbox" className="rounded" defaultChecked />
      </div>
    </div>
  </div>
)
