# Design Document

## Overview

This design document outlines the comprehensive approach to analyzing, improving, and fixing the NeuraForge dashboard frontend. The dashboard serves as the primary interface for researchers to interact with AI agents, manage projects, run experiments, and collaborate with teams. The current implementation has two layout components (DashboardLayout and NewDashboardLayout) with overlapping functionality, potential UI/UX issues, and opportunities for performance optimization.

### Goals

1. **Consolidate Layout Components**: Merge DashboardLayout and NewDashboardLayout into a single, optimized component
2. **Fix UI/UX Bugs**: Identify and resolve layout shifts, animation glitches, and responsive behavior issues
3. **Enhance Performance**: Optimize rendering, reduce re-renders, and improve animation smoothness
4. **Improve Accessibility**: Ensure WCAG 2.1 AA compliance with keyboard navigation and screen reader support
5. **Standardize Design Tokens**: Enforce consistent use of CSS custom properties throughout the codebase
6. **Polish User Experience**: Refine interactions, transitions, and visual feedback

### Current State Analysis

**Existing Components:**
- `DashboardLayout` - Primary layout with sidebar, header, and content area
- `NewDashboardLayout` - Enhanced layout with improved responsive behavior and accessibility features
- `LeftSidebar` - Navigation sidebar with collapsible sections
- `TopNavigation` - Header with search and notifications
- `UnifiedRightSidebar` - Multi-tab sidebar for AI chat, notes, teams, analytics, and settings
- `DashboardContent` - Main content area with metrics, projects, and experiments

**Identified Issues:**
1. Duplicate layout components with overlapping functionality
2. Inconsistent use of design tokens (mix of CSS variables and hardcoded values)
3. Potential layout shifts during sidebar animations
4. Right sidebar expansion not properly adjusting main content area
5. Mobile overlay z-index conflicts
6. Inconsistent focus management and keyboard navigation
7. Missing loading states and error handling
8. Performance concerns with large lists and frequent re-renders

## Architecture

### Component Hierarchy

```
DashboardPage
└── DashboardLayout (Consolidated)
    ├── DashboardRouteGuard (Authentication)
    ├── LeftSidebar
    │   ├── Logo Section
    │   ├── Navigation Items (Collapsible)
    │   └── User Profile Section
    ├── TopNavigation
    │   ├── Global Search
    │   ├── Notifications
    │   └── Settings
    ├── Main Content Area
    │   ├── DashboardSPARouter
    │   └── DashboardContent
    │       ├── Metrics Overview
    │       ├── Active Projects
    │       ├── Running Experiments
    │       └── AI Recommendations
    └── UnifiedRightSidebar
        ├── Tab Buttons (AI, Notes, Teams, Analytics, Settings)
        └── Content Panels
```

### Layout System

The dashboard uses a fixed positioning system with the following structure:

```
┌─────────────────────────────────────────────────────────┐
│  Left Sidebar (Fixed)  │  Header (Fixed)                │
│  Full Height           │  Top Right                     │
├────────────────────────┼────────────────────────────────┤
│                        │  Main Content (Scrollable)     │
│  Navigation            │                                │
│  Items                 │  Dashboard Content             │
│                        │                                │
│                        │                                │
│                        ├────────────────────────────────┤
│                        │  Right Sidebar (Fixed)         │
│  User Profile          │  Tab Buttons + Panel           │
└────────────────────────┴────────────────────────────────┘
```

**Layout Dimensions:**
- Left Sidebar: 64px (collapsed) / 280px (expanded)
- Header Height: 64px
- Right Sidebar: 40px (buttons only) / 360px (expanded with panel)
- Main Content: Fluid with dynamic margins

### State Management

**Layout State:**
```typescript
interface LayoutState {
  leftSidebarCollapsed: boolean
  rightSidebarExpanded: boolean
  rightSidebarActiveTab: TabId | null
  isMobile: boolean
  isTablet: boolean
}
```

**Responsive Breakpoints:**
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

**State Transitions:**
- Mobile: Left sidebar collapsed by default, overlay on open
- Tablet: Left sidebar collapsed, right sidebar available
- Desktop: Left sidebar expanded, right sidebar available

## Components and Interfaces

### 1. Consolidated DashboardLayout

**Purpose:** Single unified layout component combining the best features from both existing layouts

**Props:**
```typescript
interface DashboardLayoutProps {
  children?: React.ReactNode
}
```

**Key Features:**
- Hardware-accelerated CSS transforms for smooth animations
- Proper z-index layering to prevent conflicts
- Responsive behavior with debounced resize handlers
- Accessibility features (skip links, focus management, ARIA labels)
- Performance optimizations (will-change, backface-visibility)

**Layout Calculations:**
```typescript
// Main content margins adjust based on sidebar states
const getMainContentStyles = () => ({
  marginLeft: leftSidebarCollapsed ? '64px' : '280px',
  marginRight: rightSidebarExpanded ? '360px' : '40px',
  marginTop: '64px',
  height: 'calc(100vh - 64px)',
  transition: 'margin 300ms cubic-bezier(0.4, 0, 0.2, 1)'
})
```

**Animation Strategy:**
- Use CSS transforms (translateX, scale) instead of width/margin animations where possible
- Apply `will-change` property to elements that will animate
- Use `backface-visibility: hidden` to prevent flickering
- Implement cubic-bezier easing for smooth, professional animations

### 2. Enhanced LeftSidebar

**Purpose:** Primary navigation with collapsible sections and user profile

**Props:**
```typescript
interface LeftSidebarProps {
  collapsed: boolean
  isMobile: boolean
  onToggle: () => void
}
```

**Navigation Structure:**
```typescript
interface NavigationItem {
  id: string
  label: string
  icon: React.ComponentType
  route: DashboardRoute
  badge?: string | number
  children?: NavigationItem[]
  isActive?: boolean
}
```

**Improvements:**
- Perfect icon centering in collapsed state using CSS Grid
- Smooth accordion behavior for nested navigation
- Keyboard navigation with arrow keys
- Focus trap for mobile overlay
- Accessible dropdown menu for user profile

**Icon Centering Solution:**
```css
/* Collapsed state uses CSS Grid for perfect centering */
.sidebar-button-collapsed {
  display: grid;
  place-items: center;
  width: 64px;
  height: 44px;
}
```

### 3. Optimized TopNavigation

**Purpose:** Global search, notifications, and quick actions

**Props:**
```typescript
interface TopNavigationProps {}
```

**Features:**
- Semantic search with autocomplete dropdown
- Real-time notification badge
- Keyboard shortcuts (Cmd+K for search)
- Focus management for search dropdown

**Search Behavior:**
- Dropdown appears on focus with recent searches
- Click outside to close
- Escape key to close and return focus
- Enter to submit search

### 4. Refined UnifiedRightSidebar

**Purpose:** Multi-tab sidebar for AI chat, notes, teams, analytics, and settings

**Props:**
```typescript
interface UnifiedRightSidebarProps {
  onLayoutChange: (isExpanded: boolean) => void
}

type TabId = 'ai' | 'notes' | 'teams' | 'analytics' | 'settings'
```

**Improvements:**
- Smooth panel expansion with Framer Motion
- Proper content area margin adjustment via callback
- Click outside to close behavior
- Mobile full-screen modal on small screens
- Vertical text rotation for tab labels (90 degrees)
- Color-coded tabs with theme system

**Tab Color System:**
```typescript
const tabColors = {
  ai: { primary: '#8B5CF6', light: '#EDE9FE', dark: '#7C3AED' },
  notes: { primary: '#10B981', light: '#D1FAE5', dark: '#059669' },
  teams: { primary: '#F59E0B', light: '#FEF3C7', dark: '#D97706' },
  analytics: { primary: '#3B82F6', light: '#DBEAFE', dark: '#2563EB' },
  settings: { primary: '#6B7280', light: '#F3F4F6', dark: '#4B5563' }
}
```

### 5. Enhanced DashboardContent

**Purpose:** Main content area displaying metrics, projects, experiments, and recommendations

**Features:**
- Responsive grid layout for metrics (1-6 columns based on screen size)
- Card-based design with hover effects
- Progress bars with smooth animations
- Quick action buttons
- Empty states for no data scenarios

**Performance Optimizations:**
- React.memo for card components
- useMemo for filtered/sorted data
- Virtualization for long lists (>50 items)
- Lazy loading for images and avatars

## Data Models

### Dashboard Metrics

```typescript
interface DashboardMetrics {
  totalProjects: number
  activeExperiments: number
  collaborations: number
  citations: number
  impactScore: number
  fundingSecured: number
}
```

### Project Model

```typescript
interface Project {
  id: string
  title: string
  description: string
  domain: string
  status: 'active' | 'review' | 'completed'
  progress: number
  lastActivity: string
  collaborators: number
  experiments: number
  citations: number
}
```

### Experiment Model

```typescript
interface Experiment {
  id: string
  name: string
  project: string
  status: 'running' | 'queued' | 'completed' | 'failed'
  progress: number
  eta: string
  resources: Array<{
    type: 'gpu' | 'cpu' | 'memory'
    usage: number
  }>
}
```

### AI Recommendation Model

```typescript
interface AIRecommendation {
  id: string
  type: 'paper' | 'collaborator' | 'funding' | 'dataset'
  title: string
  description: string
  relevance: number
  action: string
}
```

## Error Handling

### Error Boundaries

Implement React Error Boundaries at strategic levels:

```typescript
<ErrorBoundary fallback={<DashboardErrorFallback />}>
  <DashboardLayout>
    <ErrorBoundary fallback={<ContentErrorFallback />}>
      <DashboardContent />
    </ErrorBoundary>
  </DashboardLayout>
</ErrorBoundary>
```

### Loading States

**Skeleton Loaders:**
- Metrics: 6 skeleton cards with pulsing animation
- Projects: 3 skeleton project cards
- Experiments: 3 skeleton experiment cards

**Loading Indicators:**
- Global loading indicator in top-right corner
- Inline loading spinners for actions
- Progress bars for long-running operations

### Error States

**Error Types:**
1. Network errors (failed API calls)
2. Authentication errors (session expired)
3. Permission errors (insufficient access)
4. Data validation errors

**Error UI:**
```typescript
interface ErrorState {
  type: 'network' | 'auth' | 'permission' | 'validation'
  message: string
  action?: {
    label: string
    handler: () => void
  }
}
```

**Error Display:**
- Toast notifications for transient errors
- Inline error messages for form validation
- Full-page error states for critical failures
- Retry buttons with exponential backoff

## Testing Strategy

### Unit Tests

**Components to Test:**
1. DashboardLayout - responsive behavior, state management
2. LeftSidebar - navigation, collapse/expand, keyboard navigation
3. TopNavigation - search functionality, notifications
4. UnifiedRightSidebar - tab switching, panel expansion
5. DashboardContent - data rendering, empty states

**Test Cases:**
```typescript
describe('DashboardLayout', () => {
  it('should render without layout shifts', () => {})
  it('should handle sidebar toggle smoothly', () => {})
  it('should adjust content margins when sidebars change', () => {})
  it('should handle mobile overlay correctly', () => {})
  it('should trap focus in mobile menu', () => {})
})
```

### Integration Tests

**User Flows:**
1. Navigate through dashboard sections
2. Toggle sidebars and verify layout adjustments
3. Search for projects and experiments
4. Open AI chat and send messages
5. View project details and metrics

### Accessibility Tests

**Automated Testing:**
- axe-core for WCAG compliance
- jest-axe for component-level testing
- Lighthouse accessibility audits

**Manual Testing:**
- Keyboard-only navigation
- Screen reader testing (NVDA, JAWS, VoiceOver)
- High contrast mode
- Reduced motion preferences

### Performance Tests

**Metrics to Track:**
- First Contentful Paint (FCP) < 1.5s
- Time to Interactive (TTI) < 3.0s
- Cumulative Layout Shift (CLS) < 0.1
- Frame rate during animations (60fps)

**Tools:**
- Lighthouse performance audits
- React DevTools Profiler
- Chrome DevTools Performance tab
- Web Vitals library

## Design Token Enforcement

### CSS Custom Properties

**Current State:**
- Mix of CSS variables and hardcoded values
- Inconsistent naming conventions
- Some components bypass design tokens

**Target State:**
- All colors use `var(--color-*)` tokens
- All spacing uses `var(--space-*)` tokens
- All timing uses `var(--duration-*)` tokens
- All shadows use `var(--shadow-*)` tokens

**Migration Strategy:**
1. Audit all components for hardcoded values
2. Replace with design token variables
3. Add ESLint rule to prevent hardcoded values
4. Document design token usage in component guidelines

### Design Token Categories

**Colors:**
```css
/* Primary Colors */
--color-primary-50 through --color-primary-950

/* Neutral Colors */
--color-neutral-0 through --color-neutral-950

/* Semantic Colors */
--color-success-*, --color-warning-*, --color-error-*

/* Surface Colors */
--color-background, --color-surface, --color-surface-elevated

/* Text Colors */
--color-text-primary, --color-text-secondary, --color-text-tertiary

/* Border Colors */
--color-border-subtle, --color-border-default, --color-border-strong
```

**Spacing:**
```css
--space-1 (4px) through --space-24 (96px)
```

**Typography:**
```css
--font-size-xs through --font-size-5xl
--font-weight-normal, --font-weight-medium, --font-weight-bold
```

**Timing:**
```css
--duration-fast (150ms)
--duration-normal (300ms)
--duration-slow (500ms)
--easing-ease-in-out
```

## Performance Optimization

### React Performance

**Memoization Strategy:**
```typescript
// Memoize expensive computations
const filteredProjects = useMemo(() => 
  projects.filter(p => p.status === 'active'),
  [projects]
)

// Memoize callback functions
const handleSidebarToggle = useCallback(() => {
  setCollapsed(prev => !prev)
}, [])

// Memoize components
const ProjectCard = React.memo(({ project }) => {
  // Component implementation
})
```

**Code Splitting:**
```typescript
// Lazy load heavy components
const AIChat = lazy(() => import('./components/AIChat'))
const Analytics = lazy(() => import('./components/Analytics'))

// Use Suspense for loading states
<Suspense fallback={<LoadingSpinner />}>
  <AIChat />
</Suspense>
```

### Animation Performance

**Hardware Acceleration:**
```css
/* Use transforms instead of position/margin */
.sidebar {
  transform: translateX(0);
  will-change: transform;
  backface-visibility: hidden;
}

/* Avoid animating expensive properties */
/* ❌ Bad */
.element {
  transition: width 300ms;
}

/* ✅ Good */
.element {
  transition: transform 300ms;
  transform: scaleX(1);
}
```

**Animation Batching:**
- Group layout changes in single frame
- Use requestAnimationFrame for custom animations
- Debounce resize handlers (150ms)

### List Virtualization

For lists exceeding 50 items, implement virtual scrolling:

```typescript
import { FixedSizeList } from 'react-window'

<FixedSizeList
  height={600}
  itemCount={projects.length}
  itemSize={120}
  width="100%"
>
  {({ index, style }) => (
    <ProjectCard project={projects[index]} style={style} />
  )}
</FixedSizeList>
```

## Accessibility Implementation

### Keyboard Navigation

**Focus Management:**
```typescript
// Skip links for main content
<a href="#main-content" className="skip-to-main">
  Skip to main content
</a>

// Focus trap for modals
const trapFocus = (element: HTMLElement) => {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  )
  const firstElement = focusableElements[0]
  const lastElement = focusableElements[focusableElements.length - 1]
  
  element.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault()
        lastElement.focus()
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault()
        firstElement.focus()
      }
    }
  })
}
```

**Keyboard Shortcuts:**
- `Tab` / `Shift+Tab`: Navigate between interactive elements
- `Enter` / `Space`: Activate buttons and links
- `Escape`: Close modals, dropdowns, and overlays
- `Arrow Keys`: Navigate within menus and lists
- `Cmd+K` / `Ctrl+K`: Open global search

### Screen Reader Support

**ARIA Labels:**
```typescript
<nav role="navigation" aria-label="Primary navigation">
  <button
    aria-expanded={isExpanded}
    aria-controls="submenu-id"
    aria-label="Research menu"
  >
    Research
  </button>
</nav>

<main role="main" aria-label="Main content">
  <DashboardContent />
</main>

<aside role="complementary" aria-label="AI assistant">
  <AIChat />
</aside>
```

**Live Regions:**
```typescript
<div role="status" aria-live="polite" aria-atomic="true">
  {loadingMessage}
</div>

<div role="alert" aria-live="assertive">
  {errorMessage}
</div>
```

### Focus Indicators

```css
/* Visible focus indicators */
*:focus-visible {
  outline: 2px solid var(--color-primary-500);
  outline-offset: 2px;
  border-radius: var(--radius-md);
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  *:focus-visible {
    outline-width: 3px;
    outline-color: currentColor;
  }
}
```

## Responsive Design

### Breakpoint Strategy

```typescript
const breakpoints = {
  mobile: 768,
  tablet: 1024,
  desktop: 1280,
  wide: 1536
}

// Responsive hook
const useResponsive = () => {
  const [viewport, setViewport] = useState<'mobile' | 'tablet' | 'desktop'>('desktop')
  
  useEffect(() => {
    const handleResize = debounce(() => {
      const width = window.innerWidth
      if (width < breakpoints.mobile) setViewport('mobile')
      else if (width < breakpoints.tablet) setViewport('tablet')
      else setViewport('desktop')
    }, 150)
    
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  
  return viewport
}
```

### Mobile Optimizations

**Touch Targets:**
- Minimum 44x44px for all interactive elements
- Increased spacing between buttons
- Larger tap areas for small icons

**Mobile Menu:**
- Full-screen overlay for left sidebar
- Backdrop with 50% opacity
- Smooth slide-in animation
- Close on backdrop tap or Escape key

**Content Adjustments:**
- Single column layout for metrics
- Stacked project cards
- Simplified navigation (no nested menus)
- Bottom sheet for right sidebar

### Tablet Optimizations

**Layout:**
- Left sidebar collapsed by default
- 2-column grid for metrics
- Hybrid navigation (icons + labels)
- Right sidebar available but not expanded

## Migration Plan

### Phase 1: Analysis and Preparation

1. Audit both layout components
2. Identify best features from each
3. Document all props and state
4. Create migration checklist

### Phase 2: Consolidation

1. Create new unified DashboardLayout
2. Merge features from both components
3. Implement performance optimizations
4. Add accessibility features

### Phase 3: Design Token Migration

1. Audit all hardcoded values
2. Replace with CSS custom properties
3. Update component styles
4. Add linting rules

### Phase 4: Testing and Validation

1. Unit tests for all components
2. Integration tests for user flows
3. Accessibility audits
4. Performance benchmarks

### Phase 5: Deployment

1. Feature flag for new layout
2. Gradual rollout to users
3. Monitor performance metrics
4. Collect user feedback

## Success Metrics

### Performance Metrics

- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.0s
- Cumulative Layout Shift: < 0.1
- Animation frame rate: 60fps
- Bundle size reduction: > 20%

### Accessibility Metrics

- Lighthouse accessibility score: 100
- Keyboard navigation: 100% coverage
- Screen reader compatibility: NVDA, JAWS, VoiceOver
- WCAG 2.1 AA compliance: 100%

### Code Quality Metrics

- Lines of code reduction: > 30%
- Test coverage: > 80%
- ESLint errors: 0
- TypeScript errors: 0
- Design token usage: 100%

### User Experience Metrics

- User satisfaction score: > 4.5/5
- Task completion rate: > 95%
- Error rate: < 2%
- Support tickets: < 5/month
