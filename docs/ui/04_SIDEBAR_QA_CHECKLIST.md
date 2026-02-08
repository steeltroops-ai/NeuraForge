# NeuraForge Sidebar QA Testing Checklist

## Automated Testing

### Playwright E2E Tests

```typescript
// tests/sidebar.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Sidebar Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard')
    await page.waitForLoadState('networkidle')
  })

  test('Left sidebar toggle functionality', async ({ page }) => {
    // Test sidebar collapse/expand
    const sidebar = page.locator('[role="navigation"][aria-label="Primary navigation"]')
    const toggleButton = sidebar.locator('button[aria-expanded]').first()
    
    // Initial state - expanded
    await expect(sidebar).toHaveCSS('width', '280px')
    await expect(toggleButton).toHaveAttribute('aria-expanded', 'true')
    
    // Collapse sidebar
    await toggleButton.click()
    await expect(sidebar).toHaveCSS('width', '64px')
    await expect(toggleButton).toHaveAttribute('aria-expanded', 'false')
    
    // Expand sidebar
    await toggleButton.click()
    await expect(sidebar).toHaveCSS('width', '280px')
    await expect(toggleButton).toHaveAttribute('aria-expanded', 'true')
  })

  test('Navigation item activation', async ({ page }) => {
    const navItems = page.locator('[role="navigation"] button[aria-current]')
    const firstItem = navItems.first()
    
    // Click navigation item
    await firstItem.click()
    await expect(firstItem).toHaveAttribute('aria-current', 'page')
    
    // Verify visual active state
    await expect(firstItem).toHaveCSS('background-color', 'rgb(243, 241, 255)') // primary-50
  })

  test('Right sidebar panel functionality', async ({ page }) => {
    const rightSidebar = page.locator('aside').last()
    const tabButtons = rightSidebar.locator('button[aria-pressed]')
    const firstTab = tabButtons.first()
    
    // Initial state - collapsed
    await expect(rightSidebar).toHaveCSS('width', '40px')
    
    // Open panel
    await firstTab.click()
    await expect(rightSidebar).toHaveCSS('width', '360px')
    await expect(firstTab).toHaveAttribute('aria-pressed', 'true')
    
    // Close panel
    const closeButton = page.locator('[aria-label="Close panel"]')
    await closeButton.click()
    await expect(rightSidebar).toHaveCSS('width', '40px')
  })

  test('Keyboard navigation', async ({ page }) => {
    // Focus first navigation item
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab') // Skip logo, focus first nav item
    
    const focusedElement = page.locator(':focus')
    await expect(focusedElement).toHaveAttribute('role', 'button')
    
    // Navigate with arrow keys
    await page.keyboard.press('ArrowDown')
    const nextFocused = page.locator(':focus')
    await expect(nextFocused).not.toBe(focusedElement)
    
    // Activate with Enter
    await page.keyboard.press('Enter')
    await expect(nextFocused).toHaveAttribute('aria-current', 'page')
  })

  test('Mobile responsive behavior', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    
    const sidebar = page.locator('[role="navigation"]')
    const overlay = page.locator('[aria-label="Close sidebar"]')
    
    // Sidebar should be collapsed on mobile
    await expect(sidebar).toHaveCSS('width', '64px')
    
    // Open sidebar should show overlay
    const toggleButton = sidebar.locator('button[aria-expanded]').first()
    await toggleButton.click()
    await expect(overlay).toBeVisible()
    
    // Click overlay to close
    await overlay.click()
    await expect(sidebar).toHaveCSS('width', '64px')
  })
})
```

### Accessibility Tests with axe-core

```typescript
// tests/sidebar-accessibility.spec.ts
import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test.describe('Sidebar Accessibility', () => {
  test('should not have accessibility violations', async ({ page }) => {
    await page.goto('/dashboard')
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .include('[role="navigation"]')
      .include('aside')
      .analyze()
    
    expect(accessibilityScanResults.violations).toEqual([])
  })

  test('keyboard navigation compliance', async ({ page }) => {
    await page.goto('/dashboard')
    
    // Test tab order
    const tabOrder = [
      'button[aria-label*="Expand sidebar"]',
      '[role="navigation"] button[aria-current]',
      'button[aria-haspopup="menu"]',
      'aside button[aria-pressed]'
    ]
    
    for (const selector of tabOrder) {
      await page.keyboard.press('Tab')
      const focused = page.locator(':focus')
      await expect(focused).toMatchSelector(selector)
    }
  })

  test('screen reader announcements', async ({ page }) => {
    await page.goto('/dashboard')
    
    // Test aria-live regions
    const liveRegion = page.locator('[aria-live]')
    
    // Trigger sidebar collapse
    const toggleButton = page.locator('button[aria-expanded]').first()
    await toggleButton.click()
    
    // Verify announcement
    await expect(liveRegion).toContainText('Sidebar collapsed')
  })
})
```

## Manual Testing Checklist

### Visual Testing

#### Desktop (1024px+)
- [ ] Left sidebar expands/collapses smoothly
- [ ] Right sidebar panels open/close correctly
- [ ] Navigation items highlight on hover/focus
- [ ] Active states clearly visible
- [ ] Typography scales correctly
- [ ] Icons align properly
- [ ] Spacing consistent throughout

#### Tablet (768px - 1023px)
- [ ] Sidebar behavior appropriate for screen size
- [ ] Touch targets adequately sized (44px minimum)
- [ ] Content doesn't overflow containers
- [ ] Transitions smooth on touch devices

#### Mobile (320px - 767px)
- [ ] Sidebars auto-collapse appropriately
- [ ] Mobile overlays function correctly
- [ ] Touch gestures work as expected
- [ ] Content readable at small sizes
- [ ] No horizontal scrolling

### Keyboard Testing

#### Navigation Flow
- [ ] Tab order logical and complete
- [ ] All interactive elements reachable
- [ ] Focus indicators clearly visible
- [ ] Escape key closes overlays/menus
- [ ] Arrow keys navigate within lists

#### Keyboard Shortcuts
- [ ] Enter/Space activate buttons
- [ ] Arrow keys navigate navigation items
- [ ] Escape closes expanded sections
- [ ] Tab moves between major sections
- [ ] Shift+Tab reverses navigation

### Screen Reader Testing

#### NVDA (Windows)
- [ ] Navigation landmarks announced
- [ ] Button roles and states announced
- [ ] List structure communicated
- [ ] Dynamic content changes announced
- [ ] Error states communicated clearly

#### JAWS (Windows)
- [ ] Heading structure navigable
- [ ] Form controls properly labeled
- [ ] Table navigation (if applicable)
- [ ] Live regions announce changes
- [ ] Skip links functional

#### VoiceOver (macOS)
- [ ] Rotor navigation works
- [ ] Gesture navigation functional
- [ ] Voice commands responsive
- [ ] Braille display compatible
- [ ] Custom controls accessible

### Performance Testing

#### Load Performance
- [ ] Initial render under 100ms
- [ ] Sidebar animations 60fps
- [ ] No layout thrashing during transitions
- [ ] Memory usage stable during interactions
- [ ] Bundle size optimized

#### Interaction Performance
- [ ] Button clicks responsive (<100ms)
- [ ] Hover states immediate
- [ ] Scroll performance smooth
- [ ] Resize handling efficient
- [ ] No memory leaks on repeated interactions

### Cross-Browser Testing

#### Chrome
- [ ] All functionality works
- [ ] Animations smooth
- [ ] Focus indicators visible
- [ ] Design tokens applied correctly

#### Firefox
- [ ] Layout consistent with Chrome
- [ ] Keyboard navigation identical
- [ ] Accessibility features functional
- [ ] Performance comparable

#### Safari
- [ ] iOS compatibility verified
- [ ] Touch interactions work
- [ ] Webkit-specific issues resolved
- [ ] Performance optimized

#### Edge
- [ ] Windows integration smooth
- [ ] High contrast mode supported
- [ ] Narrator compatibility verified
- [ ] Legacy fallbacks functional

## Regression Testing

### Before Each Release
- [ ] All automated tests passing
- [ ] Manual accessibility audit completed
- [ ] Cross-browser testing verified
- [ ] Mobile testing completed
- [ ] Performance benchmarks met

### Critical User Flows
- [ ] Login → Dashboard navigation
- [ ] Sidebar collapse/expand workflow
- [ ] Panel opening/closing sequence
- [ ] Mobile responsive transitions
- [ ] Error state handling

### Edge Cases
- [ ] Very long navigation labels
- [ ] High badge counts (999+)
- [ ] Slow network conditions
- [ ] JavaScript disabled fallbacks
- [ ] Extreme viewport sizes

## Bug Reporting Template

```markdown
## Bug Report: Sidebar Issue

**Environment:**
- Browser: [Chrome 120.0.0]
- OS: [Windows 11]
- Viewport: [1920x1080]
- Device: [Desktop/Mobile]

**Steps to Reproduce:**
1. Navigate to dashboard
2. Click sidebar toggle
3. Observe behavior

**Expected Behavior:**
Sidebar should collapse smoothly to 64px width

**Actual Behavior:**
Sidebar jumps to collapsed state without animation

**Accessibility Impact:**
- [ ] Keyboard navigation affected
- [ ] Screen reader announcements incorrect
- [ ] Focus management broken
- [ ] Color contrast insufficient

**Screenshots/Video:**
[Attach visual evidence]

**Console Errors:**
[Include any JavaScript errors]

**Priority:**
- [ ] Critical (blocks core functionality)
- [ ] High (affects user experience)
- [ ] Medium (minor issue)
- [ ] Low (cosmetic)
```

## Test Data Requirements

### User Profiles
- Standard user with basic permissions
- Admin user with full access
- User with accessibility needs
- Mobile-only user
- Slow connection user

### Navigation Data
- Standard navigation items (5-10)
- Extended navigation (20+ items)
- Nested navigation (3+ levels)
- Items with long labels
- Items with high badge counts

### Content Scenarios
- Empty states
- Loading states
- Error states
- Success states
- Mixed content types
