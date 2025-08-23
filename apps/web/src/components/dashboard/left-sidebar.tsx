'use client'

import { useState, useRef, useEffect } from 'react'
import { useAuth } from '@/contexts/auth-context'
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
  href?: string
  badge?: string | number
  children?: NavigationItem[]
  isActive?: boolean
}

export function LeftSidebar({ collapsed, isMobile, onToggle }: LeftSidebarProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>(['research'])
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false)
  const profileDropdownRef = useRef<HTMLDivElement>(null)
  const { user, signOut } = useAuth()

  // Handle click outside to close dropdown and keyboard navigation
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
        const profileButton = profileDropdownRef.current?.querySelector('[role="button"]') as HTMLElement
        profileButton?.focus()
      }
    }

    if (isProfileDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isProfileDropdownOpen])

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    )
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
      href: '/dashboard',
      isActive: true,
      badge: '2'
    },
    {
      id: 'research',
      label: 'My Research',
      icon: FolderOpen,
      badge: '12',
      children: [
        { id: 'projects', label: 'Projects', icon: GitBranch, href: '/research/projects', badge: '8' },
        { id: 'experiments', label: 'Experiments', icon: Microscope, href: '/research/experiments', badge: '24' },
        { id: 'datasets', label: 'Datasets', icon: Database, href: '/research/datasets', badge: '156' },
        { id: 'artifacts', label: 'Artifacts', icon: FileText, href: '/research/artifacts', badge: '89' }
      ]
    },
    {
      id: 'discover',
      label: 'Discover',
      icon: Search,
      children: [
        { id: 'search', label: 'Search', icon: Search, href: '/discover/search' },
        { id: 'browse', label: 'Browse', icon: Globe, href: '/discover/browse' },
        { id: 'knowledge-graph', label: 'Knowledge Graph', icon: Activity, href: '/discover/knowledge-graph' },
        { id: 'literature', label: 'Literature', icon: BookOpen, href: '/discover/literature', badge: '47' }
      ]
    },
    {
      id: 'collaborate',
      label: 'Collaborate',
      icon: Users,
      badge: '5',
      children: [
        { id: 'team-matching', label: 'Team Matching', icon: UserPlus, href: '/collaborate/teams', badge: '12' },
        { id: 'active-collaborations', label: 'Active Collaborations', icon: MessageSquare, href: '/collaborate/active', badge: '3' },
        { id: 'peer-review', label: 'Peer Review', icon: FileCheck, href: '/collaborate/review', badge: '7' },
        { id: 'workspaces', label: 'Workspaces', icon: Briefcase, href: '/collaborate/workspaces', badge: '4' }
      ]
    },
    {
      id: 'marketplace',
      label: 'Marketplace',
      icon: ShoppingCart,
      children: [
        { id: 'compute-booking', label: 'Compute Booking', icon: Cpu, href: '/marketplace/compute', badge: 'Available' },
        { id: 'lab-time', label: 'Lab Time', icon: Clock, href: '/marketplace/labs', badge: '2' },
        { id: 'equipment', label: 'Equipment', icon: Wrench, href: '/marketplace/equipment' },
        { id: 'services', label: 'Services', icon: Target, href: '/marketplace/services' }
      ]
    },
    {
      id: 'funding',
      label: 'Funding',
      icon: DollarSign,
      badge: '3',
      children: [
        { id: 'bounties', label: 'Bounties', icon: Target, href: '/funding/bounties', badge: '18' },
        { id: 'grants', label: 'Grants', icon: FileText, href: '/funding/grants', badge: '6' },
        { id: 'proposals', label: 'Proposals', icon: PenTool, href: '/funding/proposals', badge: '2' }
      ]
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      href: '/settings'
    }
  ]

  const renderNavigationItem = (item: NavigationItem, level: number = 0) => {
    const isExpanded = expandedSections.includes(item.id)
    const hasChildren = item.children && item.children.length > 0
    const paddingLeft = collapsed ? 'pl-4' : level === 0 ? 'pl-4' : 'pl-8'

    return (
      <div key={item.id}>
        <Button
          variant="ghost"
          className={`
            w-full py-2 h-auto
            ${item.isActive ? 'bg-purple-50 text-purple-600 border-r-2 border-purple-600' : 'text-gray-700'}
            hover:bg-gray-100 hover:text-gray-900
            transition-all duration-300
            ${collapsed && level === 0 ? 'justify-center px-2' : `justify-start ${paddingLeft}`}
          `}
          onClick={() => {
            if (hasChildren) {
              toggleSection(item.id)
            }
            // Handle navigation here
          }}
          aria-label={`${item.label}${hasChildren ? (isExpanded ? ' (expanded)' : ' (collapsed)') : ''}`}
          aria-expanded={hasChildren ? isExpanded : undefined}
        >
          {collapsed && level === 0 ? (
            <item.icon className="w-5 h-5" />
          ) : (
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-3">
                <item.icon className="w-5 h-5" />
                {!collapsed && (
                  <span className="text-sm font-medium">{item.label}</span>
                )}
              </div>

              {!collapsed && (
                <div className="flex items-center gap-2">
                  {item.badge && (
                    <span className={`
                      text-xs px-2 py-0.5 rounded-full font-medium
                      ${typeof item.badge === 'number' || !isNaN(Number(item.badge))
                        ? 'bg-gray-100 text-gray-700'
                        : 'bg-purple-100 text-purple-700 border border-purple-200'
                      }
                    `}>
                      {item.badge}
                    </span>
                  )}
                  {hasChildren && (
                    isExpanded ? (
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    )
                  )}
                </div>
              )}
            </div>
          )}
        </Button>

        {/* Render children */}
        {hasChildren && isExpanded && !collapsed && (
          <div className="mt-1 space-y-1">
            {item.children!.map(child => renderNavigationItem(child, level + 1))}
          </div>
        )}
      </div>
    )
  }

  return (
    <nav className={`h-full flex flex-col transition-all duration-300`}>
      {/* Logo Section */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <div
            className="flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-gray-900 to-gray-600 hover:opacity-80 hover:scale-[1.02] transition-all duration-200 cursor-pointer"
            onClick={onToggle}
            role="button"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onToggle()
              }
            }}
          >
            <div className="w-4 h-4 bg-white rounded-sm" />
          </div>
          {!collapsed && (
            <span className="text-xl font-bold text-gray-900 select-none">NeuraForge</span>
          )}
        </div>
      </div>

      {/* Navigation Header */}
      {!collapsed && (
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-sm font-semibold tracking-wide text-gray-900 uppercase">
            Navigation
          </h2>
        </div>
      )}

      {/* Navigation Items */}
      <div className="flex-1 py-4 space-y-1 overflow-y-auto">
        {navigationItems.map(item => renderNavigationItem(item))}
      </div>

      {/* User Profile Section */}
      {user && (
        <div className="relative p-4 border-t border-gray-200" ref={profileDropdownRef}>
          <div
            className={`flex items-center p-2 transition-colors duration-200 rounded-lg cursor-pointer hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
              collapsed ? 'justify-center' : 'gap-3'
            }`}
            onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
            onKeyDown={handleProfileKeyDown}
            role="button"
            tabIndex={0}
            aria-expanded={isProfileDropdownOpen}
            aria-haspopup="menu"
            aria-label={`User menu for ${user.name}. Press Enter to open menu.`}
          >
            <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-purple-600">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="object-cover w-full h-full rounded-full"
                />
              ) : (
                <span className="text-xs font-bold text-white">
                  {getUserInitials(user.name)}
                </span>
              )}
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-900 truncate">{user.name}</div>
                <div className="text-xs text-gray-600 truncate">{user.role}</div>
              </div>
            )}
          </div>

          {/* Profile Dropdown Menu */}
          {isProfileDropdownOpen && (
            <>
              {/* Mobile Full-Screen Modal */}
              {isMobile ? (
                <div className="fixed inset-0 z-50 flex items-end bg-black bg-opacity-50">
                  <div className="w-full overflow-y-auto bg-white rounded-t-lg max-h-96">
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
                <div className={`absolute z-50 mb-2 bg-white border border-gray-200 rounded-lg shadow-lg bottom-full ${
                  collapsed ? 'left-0 w-48' : 'left-4 right-4'
                }`}>
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

      {/* Footer */}
      {!collapsed && (
        <div className="p-4 border-t border-gray-200">
          <div className="text-xs text-gray-500">
            <div className="mb-1 font-medium">Research Platform v2.1</div>
            <div>Last sync: 2 min ago</div>
          </div>
        </div>
      )}

      {/* Collapsed tooltips would be handled by a tooltip provider */}
    </nav>
  )
}
