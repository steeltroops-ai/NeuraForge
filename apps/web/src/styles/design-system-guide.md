# NeuraForge Design System Guide

## Overview

The NeuraForge Design System provides a comprehensive set of design tokens, components, and guidelines to ensure visual consistency and excellent user experience across the platform.

## Design Philosophy

- **Clean Minimalism**: 80% minimal structure, 20% signature richness
- **Monochromatic Elegance**: Whites, grays, blacks with subtle purple accents
- **Accessibility First**: WCAG 2.1 AA+ compliance as baseline
- **Performance Focused**: Optimized animations and efficient rendering
- **Future-Ready**: Designed for emerging technologies

## Color System

### Primary Colors (Neon Purple Accent)
```css
--color-primary-500: #6B48FF; /* Main brand color */
```
- Use for primary call-to-action buttons
- Brand elements and accent highlights
- Maximum 1 primary action per screen section

### Neutral Colors (Monochromatic Palette)
```css
--color-neutral-0: #ffffff;    /* Pure white */
--color-neutral-900: #171717;  /* Near black */
```
- Foundation of the design system
- Text, backgrounds, and borders
- Provides excellent contrast ratios

### Semantic Colors
```css
--color-success: #10b981;
--color-warning: #f59e0b;
--color-error: #ef4444;
--color-info: var(--color-primary-500);
```

## Typography System

### Font Families
- **Primary**: Inter (sans-serif)
- **Display**: Inter Display (for headings)
- **Monospace**: JetBrains Mono (for code)

### Font Scale (Mathematical 1.25 ratio)
- **Base**: 1rem (16px)
- **Large**: 1.25rem (20px)
- **XL**: 1.5rem (24px)
- **2XL**: 1.875rem (30px)
- **3XL**: 2.25rem (36px)

## Button System Hierarchy

### Primary Button
```tsx
<Button variant="primary" size="lg">
  Start Research
</Button>
```
- **Usage**: Main call-to-action (Start Research, Sign Up)
- **Limit**: Maximum 1 per screen section
- **Style**: Dark background, white text, subtle hover effects

### Secondary Button
```tsx
<Button variant="secondary" size="lg">
  Join Community
</Button>
```
- **Usage**: Supporting actions (Join Community, Learn More)
- **Style**: Light background, dark text, border
- **Multiple**: Can have multiple per section

### Accent Button
```tsx
<Button variant="accent" size="lg">
  Special Action
</Button>
```
- **Usage**: Special promotional actions
- **Style**: Purple accent color for brand emphasis
- **Limited**: Use sparingly for highlighting special features

### Ghost Button
```tsx
<Button variant="ghost" size="md">
  Subtle Action
</Button>
```
- **Usage**: Subtle actions (navigation, close buttons)
- **Style**: Minimal visual weight, transparent background
- **Good for**: Repeated actions, secondary navigation

### Outline Button
```tsx
<Button variant="outline" size="md">
  Alternative Action
</Button>
```
- **Usage**: Alternative secondary actions
- **Style**: Transparent background with border
- **Good for**: Cancel/alternative actions

## Spacing System (8px Grid)

```css
--space-4: 0.5rem;    /* 8px */
--space-8: 1rem;      /* 16px */
--space-12: 1.5rem;   /* 24px */
--space-16: 2rem;     /* 32px */
--space-24: 3rem;     /* 48px */
```

### Usage Guidelines
- **Component padding**: `--space-4` (8px)
- **Section margins**: `--space-16` (32px)
- **Large section gaps**: `--space-24` (48px)

## Animation & Transitions

### Duration Scale
```css
--duration-fast: 150ms;     /* Quick interactions */
--duration-normal: 300ms;   /* Standard transitions */
--duration-slow: 500ms;     /* Emphasis transitions */
```

### Easing Functions
```css
--easing-ease-out: cubic-bezier(0, 0, 0.2, 1);     /* Standard */
--easing-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55); /* Playful */
```

## Component Usage Examples

### Header Authentication Buttons
```tsx
// Primary action in header
<SignInButton mode="modal">
  <Button variant="primary" size="sm">
    Start Research
  </Button>
</SignInButton>

// Secondary action in header
<SignInButton mode="modal">
  <Button variant="ghost" size="sm">
    Sign In
  </Button>
</SignInButton>
```

### Hero Section Buttons
```tsx
// Main call-to-action
<SignInButton mode="modal">
  <Button 
    variant="primary" 
    size="xl"
    rightIcon={<ArrowRight />}
  >
    Start Research
  </Button>
</SignInButton>

// Secondary action
<Button variant="secondary" size="xl">
  Join Community
</Button>
```

### Community Section Buttons
```tsx
// Special accent button
<Button 
  variant="accent" 
  size="xl"
  className="bg-white text-primary-600"
>
  Start Your Research Journey
</Button>

// Outline button for external links
<Button 
  variant="outline" 
  size="xl"
  className="border-white/30 text-white"
>
  Join Discord Community
</Button>
```

## Accessibility Guidelines

### Color Contrast
- **Minimum**: 4.5:1 for normal text
- **Enhanced**: 7:1 for enhanced accessibility
- **Large text**: 3:1 minimum ratio

### Focus Management
- Visible focus indicators on all interactive elements
- Logical tab order throughout the interface
- Skip links for keyboard navigation

### Screen Reader Support
- Semantic HTML elements
- Comprehensive ARIA labels
- Descriptive button text

## Responsive Design

### Breakpoints
```css
--breakpoint-sm: 640px;   /* Mobile */
--breakpoint-md: 768px;   /* Tablet */
--breakpoint-lg: 1024px;  /* Desktop */
--breakpoint-xl: 1280px;  /* Large Desktop */
```

### Button Sizing
- **Mobile**: Use `size="md"` or `size="lg"`
- **Desktop**: Use `size="lg"` or `size="xl"` for primary actions
- **Full width**: Use `fullWidth={true}` on mobile when appropriate

## Implementation Checklist

### Before Using Components
- [ ] Import design tokens CSS file
- [ ] Use design system button component
- [ ] Follow button hierarchy guidelines
- [ ] Ensure proper color contrast
- [ ] Test keyboard navigation

### Quality Assurance
- [ ] Validate WCAG 2.1 AA compliance
- [ ] Test across all target devices
- [ ] Verify performance meets targets
- [ ] Conduct usability testing
- [ ] Document any customizations

## Best Practices

1. **Consistency**: Always use design tokens instead of hardcoded values
2. **Hierarchy**: Maintain clear visual hierarchy with button variants
3. **Performance**: Use CSS custom properties for theme switching
4. **Accessibility**: Test with screen readers and keyboard navigation
5. **Documentation**: Document any deviations from the design system

This design system ensures NeuraForge maintains a professional, accessible, and consistent user experience across all touchpoints.
