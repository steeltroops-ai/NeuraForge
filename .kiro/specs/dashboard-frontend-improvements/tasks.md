# Implementation Plan

- [x] 1. Audit and analyze current dashboard implementation





  - Review both DashboardLayout and NewDashboardLayout components to identify overlapping functionality and best features
  - Document all props, state variables, and event handlers used in both components
  - Identify hardcoded values that should be replaced with design tokens
  - Create a feature comparison matrix between the two layouts
  - _Requirements: 1.1, 6.1_
-

- [x] 2. Create consolidated DashboardLayout component




  - Create new unified DashboardLayout component at `apps/web/src/components/dashboard/dashboard-layout-v2.tsx`
  - Implement responsive state management with mobile, tablet, and desktop breakpoints
  - Add hardware-accelerated CSS transforms for sidebar animations
  - Implement proper z-index layering to prevent conflicts
  - Add accessibility features including skip links and focus management
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 6.2, 6.3_

- [x] 2.1 Implement layout state management


  - Define LayoutState interface with leftSidebarCollapsed, rightSidebarExpanded, rightSidebarActiveTab, isMobile, and isTablet
  - Create useState hooks for all layout state variables
  - Implement debounced resize handler (150ms) to update responsive state
  - Add useEffect for initial responsive state detection
  - _Requirements: 2.1, 2.5_


- [x] 2.2 Implement sidebar animation system





  - Use CSS transforms (translateX) instead of width animations for smooth performance
  - Add will-change and backface-visibility properties to prevent flickering
  - Implement cubic-bezier(0.4, 0, 0.2, 1) easing for professional animations
  - Ensure animations complete within 300ms
  - _Requirements: 3.1, 3.2, 3.3, 3.5_


- [x] 2.3 Implement main content area margin calculations





  - Create getMainContentStyles function that calculates margins based on sidebar states
  - Adjust left margin: 64px (collapsed) or 280px (expanded)
  - Adjust right margin: 40px (buttons only) or 360px (expanded panel)
  - Add smooth transition for margin changes

  - _Requirements: 1.2, 1.4, 8.4_

- [x] 2.4 Add mobile overlay and backdrop





  - Implement mobile overlay for left sidebar with proper z-index
  - Add backdrop with 50% opacity that closes sidebar on click
  - Ensure backdrop only appears on mobile viewports (< 768px)
  - Add Escape key handler to close mobile menu
  - _Requirements: 2.1, 2.2, 4.2_

- [x] 3. Enhance LeftSidebar component





  - Fix icon centering in collapsed state using CSS Grid with place-items: center
  - Implement smooth accordion behavior for nested navigation items
  - Add keyboard navigation with Enter, Space, and Arrow keys
  - Implement focus trap for mobile overlay state
  - Enhance user profile dropdown with proper ARIA labels
  - _Requirements: 2.3, 4.1, 4.2, 4.4_

- [x] 3.1 Fix collapsed state icon centering


  - Update button styles to use display: grid and place-items: center for collapsed state
  - Ensure icons are perfectly centered both horizontally and vertically
  - Remove any margin or padding that causes misalignment
  - Test across different icon sizes
  - _Requirements: 1.1, 1.2_

- [x] 3.2 Implement keyboard navigation


  - Add onKeyDown handlers for Enter and Space to activate navigation items
  - Implement Arrow key navigation within navigation sections
  - Add Tab and Shift+Tab support for sequential navigation
  - Ensure visible focus indicators on all interactive elements
  - _Requirements: 4.1, 4.4_

- [x] 3.3 Enhance user profile dropdown


  - Add proper ARIA attributes (aria-expanded, aria-haspopup, role="menu")
  - Implement click outside detection to close dropdown
  - Add Escape key handler to close and return focus
  - Create mobile full-screen modal variant for small screens
  - _Requirements: 2.2, 2.3, 4.2, 4.4_

- [x] 4. Optimize TopNavigation component





  - Implement semantic search with autocomplete dropdown
  - Add keyboard shortcut (Cmd+K / Ctrl+K) to focus search
  - Enhance notification badge with real-time updates
  - Add focus management for search dropdown
  - _Requirements: 4.1, 4.2_

- [x] 4.1 Implement search autocomplete


  - Create dropdown that appears on search input focus
  - Display recent searches and suggestions
  - Add click outside and Escape key handlers to close
  - Implement Enter key to submit search
  - _Requirements: 4.1, 4.2_

- [x] 5. Refine UnifiedRightSidebar component





  - Fix panel expansion to properly notify parent of layout changes via onLayoutChange callback
  - Implement smooth Framer Motion animations for panel expansion
  - Add click outside detection to close expanded panel
  - Create mobile full-screen modal variant
  - Fix vertical text rotation for tab labels (90 degrees)
  - _Requirements: 1.4, 8.1, 8.2, 8.3, 8.4, 8.5_

- [x] 5.1 Implement proper layout change notifications


  - Ensure onLayoutChange callback is called when panel expands or collapses
  - Pass correct isExpanded boolean value to parent
  - Verify parent component adjusts main content margins accordingly
  - Test with all tab switches
  - _Requirements: 8.4_

- [x] 5.2 Add click outside detection


  - Implement useEffect with mousedown event listener
  - Check if click target is outside sidebar ref
  - Close panel and reset activeTab state
  - Clean up event listener on unmount
  - _Requirements: 8.3_

- [x] 5.3 Create mobile full-screen variant


  - Detect mobile viewport (< 768px)
  - Render full-screen modal instead of sidebar panel
  - Add backdrop overlay with proper z-index
  - Implement slide-up animation for mobile panel
  - _Requirements: 2.1, 2.2_

- [x] 6. Enhance DashboardContent component





  - Implement responsive grid for metrics (1-6 columns based on screen size)
  - Add smooth hover effects and transitions to all cards
  - Optimize progress bar animations
  - Create empty state components for no data scenarios
  - Add loading skeleton components
  - _Requirements: 5.1, 5.2, 5.3, 9.1, 9.5_

- [x] 6.1 Implement responsive metrics grid


  - Use CSS Grid with auto-fit and minmax for responsive columns
  - Mobile: 1 column, Tablet: 2-3 columns, Desktop: 6 columns
  - Ensure consistent spacing and alignment
  - Add smooth transitions when grid layout changes
  - _Requirements: 5.1_

- [x] 6.2 Create loading skeleton components


  - Design skeleton loaders for metrics cards (6 skeletons)
  - Design skeleton loaders for project cards (3 skeletons)
  - Design skeleton loaders for experiment cards (3 skeletons)
  - Add pulsing animation to skeletons
  - _Requirements: 9.1_

- [x] 6.3 Create empty state components


  - Design empty state for no projects with illustration and CTA
  - Design empty state for no experiments
  - Design empty state for no recommendations
  - Add clear call-to-action buttons
  - _Requirements: 9.5_
-

- [x] 7. Migrate all components to use design tokens




  - Audit all dashboard components for hardcoded color values
  - Replace hardcoded colors with var(--color-*) tokens
  - Replace hardcoded spacing with var(--space-*) tokens
  - Replace hardcoded timing with var(--duration-*) tokens
  - Replace hardcoded shadows with var(--shadow-*) tokens
  - _Requirements: 7.1, 7.2, 7.3_


- [x] 7.1 Audit and replace color values

  - Search for hex colors (#), rgb(), and rgba() in all dashboard components
  - Replace with appropriate CSS custom property tokens
  - Update Tailwind classes to use design system colors
  - Verify visual consistency after migration
  - _Requirements: 7.1, 7.2_


- [x] 7.2 Audit and replace spacing values

  - Search for hardcoded pixel values in padding and margin
  - Replace with var(--space-*) tokens
  - Update inline styles to use design tokens
  - Ensure consistent spacing throughout
  - _Requirements: 7.2_


- [x] 7.3 Audit and replace timing and shadow values

  - Replace hardcoded transition durations with var(--duration-*)
  - Replace hardcoded box-shadow values with var(--shadow-*)
  - Ensure consistent animation timing across components
  - _Requirements: 7.3_

- [x] 8. Implement error handling and loading states





  - Create ErrorBoundary components for dashboard and content areas
  - Implement error fallback UI components
  - Create loading indicator component for top-right corner
  - Add toast notification system for transient errors
  - Implement retry logic with exponential backoff
  - _Requirements: 9.1, 9.2, 9.3, 9.4_

- [x] 8.1 Create error boundary components


  - Create DashboardErrorBoundary with fallback UI
  - Create ContentErrorBoundary for content area errors
  - Implement error logging and reporting
  - Add retry button to error fallback UI
  - _Requirements: 9.2_

- [x] 8.2 Implement toast notification system


  - Create Toast component with success, error, warning, and info variants
  - Implement toast container with stacking behavior
  - Add auto-dismiss after 5 seconds
  - Ensure toasts are accessible with role="alert"
  - _Requirements: 9.2_

- [ ] 9. Optimize performance
  - Implement React.memo for ProjectCard, ExperimentCard, and RecommendationCard
  - Add useMemo for filtered and sorted data arrays
  - Implement useCallback for event handlers
  - Add code splitting with React.lazy for heavy components
  - Implement virtual scrolling for lists exceeding 50 items
  - _Requirements: 10.1, 10.2, 10.3, 10.5_

- [ ] 9.1 Implement memoization
  - Wrap ProjectCard, ExperimentCard, and RecommendationCard with React.memo
  - Add useMemo for filteredProjects, sortedExperiments, and other computed values
  - Wrap event handlers with useCallback to prevent re-creation
  - Verify reduced re-renders with React DevTools Profiler
  - _Requirements: 10.3_

- [ ] 9.2 Implement code splitting
  - Use React.lazy to lazy load AIChat component
  - Use React.lazy to lazy load Analytics component
  - Wrap lazy components with Suspense and loading fallback
  - Measure bundle size reduction
  - _Requirements: 10.5_

- [ ] 9.3 Implement virtual scrolling
  - Install react-window library
  - Implement FixedSizeList for project list when count > 50
  - Implement FixedSizeList for experiment list when count > 50
  - Test scrolling performance with large datasets
  - _Requirements: 5.4, 10.3_

- [ ] 10. Enhance accessibility compliance
  - Add skip links for main content and navigation
  - Implement focus trap for modals and overlays
  - Add comprehensive ARIA labels to all interactive elements
  - Implement keyboard shortcuts (Escape, Cmd+K, Arrow keys)
  - Add live regions for dynamic content updates
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

- [ ] 10.1 Implement skip links
  - Add "Skip to main content" link at top of page
  - Add "Skip to navigation" link
  - Style skip links to be visible on focus
  - Test with keyboard navigation
  - _Requirements: 4.5_

- [ ] 10.2 Implement focus trap
  - Create useFocusTrap hook for modals and overlays
  - Trap focus within mobile sidebar overlay
  - Trap focus within right sidebar panel
  - Trap focus within dropdown menus
  - _Requirements: 4.4_

- [ ] 10.3 Add comprehensive ARIA labels
  - Add aria-label to all navigation buttons
  - Add aria-expanded to collapsible sections
  - Add aria-current="page" to active navigation items
  - Add role="navigation", role="main", role="complementary" to sections
  - _Requirements: 4.3_

- [ ] 10.4 Implement keyboard shortcuts
  - Add Escape key handler to close all overlays
  - Add Cmd+K / Ctrl+K to focus global search
  - Add Arrow key navigation for menus
  - Document keyboard shortcuts in help section
  - _Requirements: 4.1, 4.2_

- [ ] 10.5 Add live regions
  - Add role="status" aria-live="polite" for loading messages
  - Add role="alert" aria-live="assertive" for error messages
  - Ensure screen readers announce dynamic content changes
  - Test with NVDA and VoiceOver
  - _Requirements: 4.3_

- [ ] 11. Replace old layout components
  - Update DashboardPage to use new consolidated DashboardLayout
  - Remove old DashboardLayout component file
  - Remove NewDashboardLayout component file
  - Update all imports to reference new component
  - Verify all routes still work correctly
  - _Requirements: 6.3, 6.4_

- [ ] 12. Add ESLint rules for design token enforcement
  - Create custom ESLint rule to detect hardcoded color values
  - Create custom ESLint rule to detect hardcoded pixel values in spacing
  - Add rules to ESLint configuration
  - Run linter and fix any violations
  - _Requirements: 7.4, 7.5_

- [ ] 13. Write comprehensive tests
  - Write unit tests for DashboardLayout component
  - Write unit tests for LeftSidebar component
  - Write unit tests for TopNavigation component
  - Write unit tests for UnifiedRightSidebar component
  - Write unit tests for DashboardContent component
  - Write integration tests for user flows
  - Run accessibility audits with axe-core
  - Run performance benchmarks with Lighthouse
  - _Requirements: 1.1, 2.1, 3.1, 4.1, 5.1, 10.1_

- [ ] 14. Perform final testing and validation
  - Test responsive behavior on mobile, tablet, and desktop
  - Test keyboard navigation and screen reader compatibility
  - Verify all animations run at 60fps
  - Check Cumulative Layout Shift (CLS) < 0.1
  - Verify First Contentful Paint (FCP) < 1.5s
  - Test with reduced motion preferences
  - Test in high contrast mode
  - _Requirements: 1.1, 2.1, 3.3, 4.1, 10.1_

- [ ] 15. Update documentation
  - Document new DashboardLayout component API
  - Create component usage examples
  - Document keyboard shortcuts
  - Update design system documentation
  - Create migration guide for future developers
  - _Requirements: 6.4, 7.5_
