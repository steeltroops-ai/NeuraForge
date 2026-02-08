'use client'

import { useState, useRef, useEffect } from 'react'
import { useAuth } from '@/contexts/auth-context'
import { DashboardRoute } from './dashboard-spa-router'
import {
  Home,
  FolderOpen,
  Search,
  Users,
  ShoppingCart,
  DollarSign,
  Settings,
  ChevronDown,
  ChevronRight,
  Activity,
  Database,
  FileText,
  GitBranch,
  Microscope,
  Globe,
  BookOpen,
  UserPlus,
  MessageSquare,
  Briefcase,
  Cpu,
  Clock,
  Wrench,
  Target,
  FileCheck,
  PenTool,
  AlertCircle,
  LogOut,
  X
} from 'lucide-react'
import { Button } from '@/components/ui/design-system-button'


interface LeftSidebarProps {
  collapsed: boolean
  isMobile: boolean
  onToggle: () => void
}

interface NavigationItem {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  route: DashboardRoute
  badge?: string | number
  children?: NavigationItem[]
  isActive?: boolean
}

export function LeftSidebar({ collapsed, isMobile, onToggle }: LeftSidebarProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>(['research'])
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false)
  const profileDropdownRef = useRef<HTMLDivElement>(null)
  const navigationRef = useRef<HTMLElement>(null)
  const dropdownMenuRef = useRef<HTMLDivElement>(null)
  const profileButtonRef = useRef<HTMLButtonElement>(null)
  const { user, signOut } = useAuth()

  // Handle click outside to close dropdown, keyboard navigation, and focus trap
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false)
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isProfileDropdownOpen) {
        setIsProfileDropdownOpen(false)
        // Return focus to profile button
        profileButtonRef.current?.focus()
      }

      // Focus trap for dropdown menu
      if (isProfileDropdownOpen && dropdownMenuRef.current && (event.key === 'Tab')) {
        const focusableElements = Array.from(
          dropdownMenuRef.current.querySelectorAll('button:not([disabled])')
        ) as HTMLElement[]

        if (focusableElements.length === 0) return

        const firstElement = focusableElements[0]
        const lastElement = focusableElements[focusableElements.length - 1]

        if (event.shiftKey) {
          // Shift + Tab
          if (document.activeElement === firstElement) {
            event.preventDefault()
            lastElement.focus()
          }
        } else {
          // Tab
          if (document.activeElement === lastElement) {
            event.preventDefault()
            firstElement.focus()
          }
        }
      }
    }

    if (isProfileDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleKeyDown)

      // Focus first menu item when dropdown opens
      setTimeout(() => {
        const firstMenuItem = dropdownMenuRef.current?.querySelector('button') as HTMLElement
        firstMenuItem?.focus()
      }, 0)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isProfileDropdownOpen])

  // Handle arrow key navigation within navigation items
  const handleNavigationKeyDown = (event: React.KeyboardEvent) => {
    if (!navigationRef.current) return

    const focusableElements = Array.from(
      navigationRef.current.querySelectorAll('button:not([disabled])')
    ) as HTMLElement[]

    const currentIndex = focusableElements.indexOf(document.activeElement as HTMLElement)

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      const nextIndex = (currentIndex + 1) % focusableElements.length
      focusableElements[nextIndex]?.focus()
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      const prevIndex = currentIndex <= 0 ? focusableElements.length - 1 : currentIndex - 1
      focusableElements[prevIndex]?.focus()
    }
  }

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => {
      if (prev.includes(sectionId)) {
        // If clicking on already expanded section, collapse it
        return prev.filter(id => id !== sectionId)
      } else {
        // If clicking on collapsed section, close all others and open this one (accordion behavior)
        return [sectionId]
      }
    })
  }

  const handleSignOut = async () => {
    if (window.confirm('Are you sure you want to sign out?')) {
      await signOut()
      // The auth context will handle the redirect to homepage
    }
  }

  // Generate user initials for avatar fallback
  const getUserInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  // Handle keyboard navigation for profile button
  const handleProfileKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      setIsProfileDropdownOpen(!isProfileDropdownOpen)
    }
  }

  // Handle keyboard navigation for menu items
  const handleMenuItemKeyDown = (event: React.KeyboardEvent, action: () => void) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      action()
    }
  }

  const navigationItems: NavigationItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: Home,
      route: 'dashboard',
      isActive: true,
      badge: '2'
    },
    {
      id: 'research',
      label: 'My Research',
      icon: FolderOpen,
      route: 'projects',
      badge: '12',
      children: [
        { id: 'projects', label: 'Projects', icon: GitBranch, route: 'projects', badge: '8' },
        { id: 'experiments', label: 'Experiments', icon: Microscope, route: 'experiments', badge: '24' },
        { id: 'datasets', label: 'Datasets', icon: Database, route: 'datasets', badge: '156' },
        { id: 'artifacts', label: 'Artifacts', icon: FileText, route: 'artifacts', badge: '89' }
      ]
    },
    {
      id: 'discover',
      label: 'Discover',
      icon: Search,
      route: 'discover',
      children: [
        { id: 'search', label: 'Search', icon: Search, route: 'search' },
        { id: 'browse', label: 'Browse', icon: Globe, route: 'browse' },
        { id: 'knowledge-graph', label: 'Knowledge Graph', icon: Activity, route: 'knowledge-graph' },
        { id: 'literature', label: 'Literature', icon: BookOpen, route: 'literature', badge: '47' }
      ]
    },
    {
      id: 'collaborate',
      label: 'Collaborate',
      icon: Users,
      route: 'collaborate',
      badge: '5',
      children: [
        { id: 'team-matching', label: 'Team Matching', icon: UserPlus, route: 'collaborate', badge: '12' },
        { id: 'active-collaborations', label: 'Active Collaborations', icon: MessageSquare, route: 'collaborate', badge: '3' },
        { id: 'peer-review', label: 'Peer Review', icon: FileCheck, route: 'collaborate', badge: '7' },
        { id: 'workspaces', label: 'Workspaces', icon: Briefcase, route: 'collaborate', badge: '4' }
      ]
    },
    {
      id: 'marketplace',
      label: 'Marketplace',
      icon: ShoppingCart,
      route: 'marketplace',
      children: [
        { id: 'compute-booking', label: 'Compute Booking', icon: Cpu, route: 'marketplace', badge: 'Available' },
        { id: 'lab-time', label: 'Lab Time', icon: Clock, route: 'marketplace', badge: '2' },
        { id: 'equipment', label: 'Equipment', icon: Wrench, route: 'marketplace' },
        { id: 'services', label: 'Services', icon: Target, route: 'marketplace' }
      ]
    },
    {
      id: 'funding',
      label: 'Funding',
      icon: DollarSign,
      route: 'funding',
      badge: '3',
      children: [
        { id: 'bounties', label: 'Bounties', icon: Target, route: 'funding', badge: '18' },
        { id: 'grants', label: 'Grants', icon: FileText, route: 'funding', badge: '6' },
        { id: 'proposals', label: 'Proposals', icon: PenTool, route: 'funding', badge: '2' }
      ]
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      route: 'settings'
    }
  ]

  const renderNavigationItem = (item: NavigationItem, level: number = 0) => {
    const isExpanded = expandedSections.includes(item.id)
    const hasChildren = item.children && item.children.length > 0
    const paddingLeft = collapsed ? 'var(--space-4)' : level === 0 ? 'var(--space-4)' : 'var(--space-8)'

    return (
      <li key={item.id}>
        <button
          className={`
            w-full transition-all focus-visible:outline-2 focus-visible:outline-[var(--color-primary-500)] focus-visible:outline-offset-2
            ${item.isActive
              ? 'bg-[var(--color-primary-50)] text-[var(--color-primary-600)] border-r-2 border-[var(--color-primary-600)]'
              : 'text-[var(--color-text-secondary)]'
            }
            hover:bg-[var(--color-surface-elevated)] hover:text-[var(--color-text-primary)]
          `}
          style={{
            height: '44px',
            padding: collapsed && level === 0 ? '0' : `var(--space-2) var(--space-4) var(--space-2) ${paddingLeft}`,
            transitionDuration: 'var(--duration-normal)',
            borderRadius: 'var(--radius-md)',
            margin: collapsed && level === 0 ? 'var(--space-1) var(--space-2)' : '0 var(--space-2)',
            // Use CSS Grid for perfect centering in collapsed state
            display: collapsed && level === 0 ? 'grid' : 'flex',
            placeItems: collapsed && level === 0 ? 'center' : undefined,
            alignItems: collapsed && level === 0 ? undefined : 'center',
            justifyContent: collapsed && level === 0 ? undefined : 'flex-start'
          }}
          onClick={() => {
            if (hasChildren) {
              toggleSection(item.id)
            } else {
              // SPA Navigation
              if (typeof window !== 'undefined' && (window as any).dashboardNavigate) {
                (window as any).dashboardNavigate(item.route)
              }
            }
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              if (hasChildren) {
                toggleSection(item.id)
              } else {
                if (typeof window !== 'undefined' && (window as any).dashboardNavigate) {
                  (window as any).dashboardNavigate(item.route)
                }
              }
            }
          }}
          aria-current={item.isActive ? "page" : undefined}
          aria-expanded={hasChildren ? isExpanded : undefined}
          aria-label={`${item.label}${hasChildren ? (isExpanded ? ' (expanded)' : ' (collapsed)') : ''}`}
        >
          {collapsed && level === 0 ? (
            <>
              <item.icon className="w-5 h-5" aria-hidden="true" />
              <span className="sr-only">{item.label}</span>
            </>
          ) : (
            <>
              <item.icon className="flex-shrink-0 w-5 h-5" aria-hidden="true" />
              {!collapsed && (
                <>
                  <span
                    className="flex-1 font-medium text-left"
                    style={{
                      fontSize: 'var(--font-size-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                      marginLeft: 'var(--space-3)'
                    }}
                  >
                    {item.label}
                  </span>
                  <div
                    className="flex items-center"
                    style={{ gap: 'var(--space-2)' }}
                  >
                    {item.badge && (
                      <span
                        className={`
                          rounded-full font-medium
                          ${typeof item.badge === 'number' || !isNaN(Number(item.badge))
                            ? 'bg-[var(--color-surface-elevated)] text-[var(--color-text-secondary)]'
                            : 'bg-[var(--color-primary-100)] text-[var(--color-primary-700)] border border-[var(--color-primary-200)]'
                          }
                        `}
                        style={{
                          fontSize: 'var(--font-size-xs)',
                          paddingLeft: 'var(--space-2)',
                          paddingRight: 'var(--space-2)',
                          paddingTop: 'var(--space-1)',
                          paddingBottom: 'var(--space-1)',
                          fontWeight: 'var(--font-weight-medium)'
                        }}
                      >
                        {item.badge}
                      </span>
                    )}
                    {hasChildren && (
                      isExpanded ? (
                        <ChevronDown className="w-4 h-4 text-[var(--color-text-tertiary)]" aria-hidden="true" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-[var(--color-text-tertiary)]" aria-hidden="true" />
                      )
                    )}
                  </div>
                </>
              )}
            </>
          )}
        </button>

        {/* Render children */}
        {hasChildren && isExpanded && !collapsed && (
          <ul
            role="list"
            className="space-y-1"
            style={{
              marginTop: 'var(--space-1)'
            }}
          >
            {item.children!.map(child => renderNavigationItem(child, level + 1))}
          </ul>
        )}
      </li>
    )
  }

  return (
    <nav
      ref={navigationRef}
      role="navigation"
      aria-label="Primary navigation"
      className="relative flex flex-col h-full transition-all"
      style={{ transitionDuration: 'var(--duration-normal)' }}
      onKeyDown={handleNavigationKeyDown}
    >
      {/* Logo Section - Fixed Top, Same Height as Header */}
      <div
        className={`border-b border-[var(--color-border-subtle)] flex-shrink-0 flex items-center ${collapsed ? 'justify-center' : 'justify-start'
          }`}
        style={{
          height: 'var(--header-height)',
          padding: collapsed ? '0' : 'var(--space-4)'
        }}
      >
        <div
          className={`flex items-center ${collapsed ? 'justify-center' : ''}`}
          style={{ gap: collapsed ? '0' : 'var(--space-2)' }}
        >
          <button
            className="flex items-center justify-center flex-shrink-0 w-8 h-8 bg-gradient-to-br from-[var(--color-neutral-900)] to-[var(--color-neutral-600)] hover:opacity-80 hover:scale-[1.02] transition-all focus-visible:outline-2 focus-visible:outline-[var(--color-primary-500)] focus-visible:outline-offset-2"
            style={{
              borderRadius: 'var(--radius-lg)',
              transitionDuration: 'var(--duration-fast)'
            }}
            onClick={onToggle}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-expanded={!collapsed}
          >
            <div
              className="w-4 h-4 bg-[var(--color-neutral-0)]"
              style={{ borderRadius: 'var(--radius-sm)' }}
            />
          </button>
          {!collapsed && (
            <span
              className="select-none text-[var(--color-text-primary)]"
              style={{
                fontSize: 'var(--font-size-xl)',
                fontWeight: 'var(--font-weight-bold)'
              }}
            >
              NeuraForge
            </span>
          )}
        </div>
      </div>

      {/* Navigation Items - Scrollable Middle */}
      <div
        className="flex-1 overflow-hidden"
        style={{
          paddingTop: 'var(--space-4)',
          paddingBottom: 'var(--space-4)'
        }}
      >
        <ul role="list" className="space-y-1">
          {navigationItems.map(item => renderNavigationItem(item))}
        </ul>
      </div>

      {/* User Profile Section - Fixed at Very Bottom */}
      {user && (
        <div
          className="absolute border-t border-[var(--color-border-subtle)]"
          style={{
            bottom: '0',
            left: '0',
            right: '0',
            padding: collapsed ? 'var(--space-2)' : 'var(--space-4)'
          }}
          ref={profileDropdownRef}
        >

          <button
            ref={profileButtonRef}
            className={`flex items-center cursor-pointer transition-colors hover:bg-[var(--color-surface-elevated)] focus-visible:outline-2 focus-visible:outline-[var(--color-primary-500)] focus-visible:outline-offset-2 w-full ${collapsed ? 'justify-center' : ''
              }`}
            style={{
              padding: 'var(--space-2)',
              borderRadius: 'var(--radius-lg)',
              transitionDuration: 'var(--duration-fast)',
              gap: collapsed ? '0' : 'var(--space-3)'
            }}
            onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
            onKeyDown={handleProfileKeyDown}
            aria-expanded={isProfileDropdownOpen}
            aria-haspopup="menu"
            aria-label={`User menu for ${user.name}. Press Enter to open menu.`}
          >
            <div
              className="flex items-center justify-center flex-shrink-0 w-8 h-8 bg-gradient-to-br from-[var(--color-primary-500)] to-[var(--color-primary-600)]"
              style={{ borderRadius: 'var(--radius-full)' }}
            >
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="object-cover w-full h-full"
                  style={{ borderRadius: 'var(--radius-full)' }}
                />
              ) : (
                <span
                  className="font-bold text-[var(--color-neutral-0)]"
                  style={{
                    fontSize: 'var(--font-size-xs)',
                    fontWeight: 'var(--font-weight-bold)'
                  }}
                >
                  {getUserInitials(user.name)}
                </span>
              )}
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0 text-left">
                <div
                  className="truncate text-[var(--color-text-primary)]"
                  style={{
                    fontSize: 'var(--font-size-sm)',
                    fontWeight: 'var(--font-weight-medium)'
                  }}
                >
                  {user.name}
                </div>
                <div
                  className="truncate text-[var(--color-text-secondary)]"
                  style={{ fontSize: 'var(--font-size-xs)' }}
                >
                  {user.role}
                </div>
              </div>
            )}
          </button>

          {/* Profile Dropdown Menu */}
          {isProfileDropdownOpen && (
            <>
              {/* Mobile Full-Screen Modal */}
              {isMobile ? (
                <div className="fixed inset-0 z-50 flex items-end bg-black bg-opacity-50">
                  <div className="w-full overflow-y-auto bg-white rounded-t-lg max-h-96" ref={dropdownMenuRef}>
                    <div className="p-4 border-b border-gray-200">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900">Profile Menu</h3>
                        <button
                          onClick={() => setIsProfileDropdownOpen(false)}
                          className="p-2 text-gray-400 transition-colors duration-200 hover:text-gray-600"
                          aria-label="Close menu"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    <div className="py-2" role="menu" aria-label="User profile menu">
                      <button
                        className="flex items-center w-full gap-3 px-4 py-3 text-sm text-gray-700 transition-colors duration-200 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                        role="menuitem"
                        tabIndex={0}
                        onKeyDown={(e) => handleMenuItemKeyDown(e, () => console.log('Settings clicked'))}
                        aria-label="Open settings and preferences"
                      >
                        <Settings className="w-5 h-5" aria-hidden="true" />
                        <span>Settings & Preferences</span>
                      </button>
                      <button
                        className="flex items-center w-full gap-3 px-4 py-3 text-sm text-gray-700 transition-colors duration-200 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                        role="menuitem"
                        tabIndex={0}
                        onKeyDown={(e) => handleMenuItemKeyDown(e, () => console.log('Report issue clicked'))}
                        aria-label="Report an issue or bug"
                      >
                        <AlertCircle className="w-5 h-5" aria-hidden="true" />
                        <span>Report an Issue</span>
                      </button>
                      <button
                        className="flex items-center w-full gap-3 px-4 py-3 text-sm text-gray-700 transition-colors duration-200 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                        role="menuitem"
                        tabIndex={0}
                        onKeyDown={(e) => handleMenuItemKeyDown(e, () => console.log('Send feedback clicked'))}
                        aria-label="Send feedback about the application"
                      >
                        <MessageSquare className="w-5 h-5" aria-hidden="true" />
                        <span>Send Feedback</span>
                      </button>
                      <div className="my-2 border-t border-gray-200" role="separator" aria-hidden="true"></div>
                      <button
                        className="flex items-center w-full gap-3 px-4 py-3 text-sm text-red-600 transition-colors duration-200 hover:bg-red-50 focus:outline-none focus:bg-red-50"
                        onClick={handleSignOut}
                        onKeyDown={(e) => handleMenuItemKeyDown(e, handleSignOut)}
                        role="menuitem"
                        tabIndex={0}
                        aria-label="Sign out of your account"
                      >
                        <LogOut className="w-5 h-5" aria-hidden="true" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                /* Desktop Dropdown */
                <div className={`absolute z-50 mb-2 bg-white border border-gray-200 rounded-lg shadow-lg bottom-full ${collapsed ? 'left-0 w-48' : 'left-4 right-4'
                  }`} ref={dropdownMenuRef}>
                  <div className="py-2" role="menu" aria-label="User profile menu">
                    <button
                      className="flex items-center w-full gap-3 px-4 py-2 text-sm text-gray-700 transition-colors duration-200 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                      role="menuitem"
                      tabIndex={0}
                      onKeyDown={(e) => handleMenuItemKeyDown(e, () => console.log('Settings clicked'))}
                      aria-label="Open settings and preferences"
                    >
                      <Settings className="w-4 h-4" aria-hidden="true" />
                      <span>Settings & Preferences</span>
                    </button>
                    <button
                      className="flex items-center w-full gap-3 px-4 py-2 text-sm text-gray-700 transition-colors duration-200 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                      role="menuitem"
                      tabIndex={0}
                      onKeyDown={(e) => handleMenuItemKeyDown(e, () => console.log('Report issue clicked'))}
                      aria-label="Report an issue or bug"
                    >
                      <AlertCircle className="w-4 h-4" aria-hidden="true" />
                      <span>Report an Issue</span>
                    </button>
                    <button
                      className="flex items-center w-full gap-3 px-4 py-2 text-sm text-gray-700 transition-colors duration-200 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                      role="menuitem"
                      tabIndex={0}
                      onKeyDown={(e) => handleMenuItemKeyDown(e, () => console.log('Send feedback clicked'))}
                      aria-label="Send feedback about the application"
                    >
                      <MessageSquare className="w-4 h-4" aria-hidden="true" />
                      <span>Send Feedback</span>
                    </button>
                    <div className="my-2 border-t border-gray-200" role="separator" aria-hidden="true"></div>
                    <button
                      className="flex items-center w-full gap-3 px-4 py-2 text-sm text-red-600 transition-colors duration-200 hover:bg-red-50 focus:outline-none focus:bg-red-50"
                      onClick={handleSignOut}
                      onKeyDown={(e) => handleMenuItemKeyDown(e, handleSignOut)}
                      role="menuitem"
                      tabIndex={0}
                      aria-label="Sign out of your account"
                    >
                      <LogOut className="w-4 h-4" aria-hidden="true" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}



      {/* Collapsed tooltips would be handled by a tooltip provider */}
    </nav>
  )
}
