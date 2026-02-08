# NeuraForge Sidebar Implementation Guide

## Component Architecture

### Dashboard Layout Structure

```typescript
// apps/web/src/components/dashboard/dashboard-layout.tsx
export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <DashboardRouteGuard>
      {/* Three-Column Fixed Layout Architecture */}
      <div className="h-screen bg-[var(--color-background)]">
        
        {/* Fixed Header */}
        <header 
          className="fixed top-0 left-0 right-0 bg-[var(--color-background)] border-b border-[var(--color-border-subtle)]"
          style={{ 
            height: 'var(--header-height)',
            zIndex: 'var(--z-index-fixed)'
          }}
        >
          <TopNavigation />
        </header>

        {/* Fixed Left Sidebar */}
        <aside
          className="fixed left-0 border-r border-[var(--color-border-subtle)] bg-[var(--color-background)] overflow-hidden transition-all ease-out"
          style={{
            top: 'var(--header-height)',
            width: leftSidebarCollapsed ? 'var(--sidebar-width-collapsed)' : 'var(--sidebar-width-expanded)',
            height: 'calc(100vh - var(--header-height))',
            transitionDuration: 'var(--duration-normal)'
          }}
        >
          <LeftSidebar />
        </aside>

        {/* Main Content Area */}
        <main 
          className="bg-[var(--color-surface)] overflow-auto transition-all ease-out"
          style={{
            marginLeft: leftSidebarCollapsed ? 'var(--sidebar-width-collapsed)' : 'var(--sidebar-width-expanded)',
            marginRight: rightSidebarExpanded ? '360px' : '40px',
            paddingTop: 'var(--header-height)',
            height: '100vh',
            transitionDuration: 'var(--duration-normal)'
          }}
        >
          {children}
        </main>

        {/* Fixed Right Sidebar */}
        <UnifiedRightSidebar />
      </div>
    </DashboardRouteGuard>
  )
}
```

### Left Sidebar Implementation

```typescript
// apps/web/src/components/dashboard/left-sidebar.tsx
export function LeftSidebar({ collapsed, onToggle, isMobile }: LeftSidebarProps) {
  return (
    <nav 
      role="navigation"
      aria-label="Primary navigation"
      className="h-full flex flex-col transition-all relative"
      style={{ transitionDuration: 'var(--duration-normal)' }}
    >
      {/* Logo Section - Fixed Top */}
      <div 
        className="border-b border-[var(--color-border-subtle)] flex-shrink-0"
        style={{ padding: 'var(--space-4)' }}
      >
        <div className="flex items-center" style={{ gap: 'var(--space-2)' }}>
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

      {/* Profile Section - Fixed Bottom */}
      <div 
        className="absolute border-t border-[var(--color-border-subtle)]" 
        style={{ 
          bottom: 'var(--space-16)',
          left: 'var(--space-4)',
          right: 'var(--space-4)',
          padding: 'var(--space-4)'
        }}
      >
        <ProfileComponent />
      </div>

      {/* Version Info - Below Profile */}
      <div 
        className="absolute text-center"
        style={{ 
          bottom: 'var(--space-4)',
          left: 'var(--space-4)',
          right: 'var(--space-4)',
          fontSize: 'var(--font-size-xs)',
          color: 'var(--color-text-tertiary)'
        }}
      >
        <VersionComponent />
      </div>
    </nav>
  )
}
```

### Navigation Item Component

```typescript
const renderNavigationItem = (item: NavigationItem, level: number = 0) => {
  const isExpanded = expandedSections.includes(item.id)
  const hasChildren = item.children && item.children.length > 0
  const paddingLeft = collapsed ? 'var(--space-4)' : level === 0 ? 'var(--space-4)' : 'var(--space-8)'

  return (
    <li key={item.id}>
      <button
        className={`
          w-full flex items-center transition-all focus-visible:outline-2 focus-visible:outline-[var(--color-primary-500)] focus-visible:outline-offset-2
          ${item.isActive 
            ? 'bg-[var(--color-primary-50)] text-[var(--color-primary-600)] border-r-2 border-[var(--color-primary-600)]' 
            : 'text-[var(--color-text-secondary)]'
          }
          hover:bg-[var(--color-surface-elevated)] hover:text-[var(--color-text-primary)]
          ${collapsed && level === 0 ? 'justify-center' : 'justify-start'}
        `}
        style={{ 
          paddingTop: 'var(--space-2)', 
          paddingBottom: 'var(--space-2)',
          paddingLeft: paddingLeft,
          paddingRight: 'var(--space-4)',
          transitionDuration: 'var(--duration-normal)',
          borderRadius: 'var(--radius-md)',
          margin: '0 var(--space-2)'
        }}
        onClick={() => handleNavigation(item)}
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
            <item.icon className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
            {!collapsed && (
              <>
                <span 
                  className="font-medium flex-1 text-left"
                  style={{ 
                    fontSize: 'var(--font-size-sm)',
                    fontWeight: 'var(--font-weight-medium)',
                    marginLeft: 'var(--space-3)'
                  }}
                >
                  {item.label}
                </span>
                {item.badge && (
                  <span 
                    className="rounded-full font-medium bg-[var(--color-surface-elevated)] text-[var(--color-text-secondary)]"
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
              </>
            )}
          </>
        )}
      </button>
    </li>
  )
}
```

### Right Sidebar Implementation

```typescript
// apps/web/src/components/dashboard/unified-right-sidebar.tsx
export function UnifiedRightSidebar({ onLayoutChange }: UnifiedRightSidebarProps) {
  return (
    <aside 
      className="fixed right-0 flex overflow-hidden"
      style={{
        top: 'var(--header-height)',
        height: 'calc(100vh - var(--header-height))',
        zIndex: 'var(--z-index-docked)',
        width: isExpanded ? '360px' : '40px',
        transitionDuration: 'var(--duration-normal)'
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
          boxShadow: 'var(--shadow-xl)'
        }}
      >
        {isExpanded && activeTab && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, delay: 0.1 }}
            className="flex flex-col h-full"
          >
            {/* Panel Header */}
            <div 
              className="text-[var(--color-neutral-0)] bg-[var(--color-primary-600)] border-b border-[var(--color-primary-700)]"
              style={{ padding: 'var(--space-4)' }}
            >
              <div className="flex items-center justify-between">
                <h2 
                  className="font-semibold"
                  style={{ 
                    fontSize: 'var(--font-size-lg)',
                    fontWeight: 'var(--font-weight-semibold)'
                  }}
                >
                  {tabs.find(t => t.id === activeTab)?.label}
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClose}
                  className="p-1 text-[var(--color-neutral-0)] hover:bg-[var(--color-primary-700)]"
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
              <PanelContent activeTab={activeTab} />
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Button Column - Always Visible */}
      <div 
        className="flex flex-col bg-[var(--color-background)] border-l border-[var(--color-border-subtle)]" 
        style={{ 
          width: BUTTON_COLUMN_WIDTH,
          boxShadow: 'var(--shadow-xl)'
        }}
      >
        {tabs.map((tab, index) => (
          <TabButton key={tab.id} tab={tab} index={index} />
        ))}
      </div>
    </aside>
  )
}
```

## CSS Classes Reference

### Layout Classes
```css
/* Fixed positioning */
.sidebar-fixed-left {
  position: fixed;
  left: 0;
  top: var(--header-height);
  width: var(--sidebar-width-collapsed);
  height: calc(100vh - var(--header-height));
  overflow: hidden;
}

.sidebar-fixed-right {
  position: fixed;
  right: 0;
  top: var(--header-height);
  width: 40px;
  height: calc(100vh - var(--header-height));
  overflow: hidden;
}

/* Responsive widths */
.sidebar-expanded {
  width: var(--sidebar-width-expanded);
}

.sidebar-collapsed {
  width: var(--sidebar-width-collapsed);
}
```

### Interactive Classes
```css
/* Navigation items */
.nav-item {
  display: flex;
  align-items: center;
  width: 100%;
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-md);
  transition: all var(--duration-normal);
  color: var(--color-text-secondary);
}

.nav-item:hover {
  background-color: var(--color-surface-elevated);
  color: var(--color-text-primary);
}

.nav-item[aria-current="page"] {
  background-color: var(--color-primary-50);
  color: var(--color-primary-600);
  border-right: 2px solid var(--color-primary-600);
}

.nav-item:focus-visible {
  outline: 2px solid var(--color-primary-500);
  outline-offset: 2px;
}
```

### Animation Classes
```css
/* Transitions */
.sidebar-transition {
  transition: all var(--duration-normal) var(--easing-ease-in-out);
}

.sidebar-transition-fast {
  transition: all var(--duration-fast) var(--easing-ease-in-out);
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .sidebar-transition,
  .sidebar-transition-fast {
    transition: none;
  }
}
```

## Implementation Checklist

### Development Setup
- [ ] Design tokens CSS imported
- [ ] TypeScript interfaces defined
- [ ] Component structure implemented
- [ ] Event handlers configured
- [ ] State management setup

### Styling Implementation
- [ ] Fixed positioning applied
- [ ] Design tokens used throughout
- [ ] Responsive breakpoints handled
- [ ] Animation transitions smooth
- [ ] Focus states implemented

### Accessibility Implementation
- [ ] ARIA attributes applied
- [ ] Keyboard navigation functional
- [ ] Screen reader labels provided
- [ ] Focus management implemented
- [ ] Color contrast validated

### Testing Implementation
- [ ] Unit tests written
- [ ] Integration tests passing
- [ ] Accessibility tests passing
- [ ] Cross-browser testing completed
- [ ] Mobile testing completed
