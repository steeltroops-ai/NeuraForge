# 🎨 Dashboard Design System Specification

## Overview

This specification document provides comprehensive guidelines for updating all dashboard components to match the homepage design system, ensuring visual consistency and cohesive user experience throughout NeuraForge OS.

## 🎯 Design System Foundation

### Core Design Philosophy
- **Modern Minimalist Research Platform** aesthetic
- **Monochromatic foundation (80%)** with strategic **purple accents (15%)** and **semantic colors (5%)**
- **Scientific precision** with 8px grid system
- **Professional, contemporary styling** suitable for research environments

### Color System Implementation

#### Primary Color Palette
```css
/* Purple Brand Color - Strategic Use Only */
--color-primary-500: #6B48FF;  /* Primary actions, brand elements */
--color-primary-600: #5b2cf5;  /* Hover states */
--color-primary-100: #ebe5ff;  /* Subtle backgrounds */

/* Neutral Foundation - Primary Usage */
--color-neutral-0: #ffffff;    /* Primary backgrounds */
--color-neutral-50: #fafafa;   /* Subtle section backgrounds */
--color-neutral-100: #f5f5f5;  /* Card backgrounds */
--color-neutral-200: #e5e5e5;  /* Borders, dividers */
--color-neutral-400: #a3a3a3;  /* Tertiary text */
--color-neutral-600: #525252;  /* Secondary text */
--color-neutral-900: #171717;  /* Primary text */
```

#### Text Color Hierarchy
- **Primary Text**: `text-gray-900` (#171717) - Headings, important content
- **Secondary Text**: `text-gray-600` (#525252) - Labels, descriptions
- **Tertiary Text**: `text-gray-400` (#a3a3a3) - Metadata, placeholders
- **Accent Text**: `text-purple-600` (#6B48FF) - Links, brand elements

#### Background Color System
- **Primary Background**: `bg-white` (#ffffff) - Main content areas
- **Subtle Background**: `bg-gray-50` (#fafafa) - Section backgrounds
- **Elevated Background**: `bg-gray-100` (#f5f5f5) - Cards, elevated surfaces
- **Border Colors**: `border-gray-200` (#e5e5e5) - Standard borders

### Typography System

#### Font Hierarchy
```css
/* Heading Sizes - Match Homepage */
.heading-hero: text-5xl md:text-6xl lg:text-7xl font-bold  /* 48px-72px */
.heading-major: text-4xl md:text-5xl font-bold            /* 36px-48px */
.heading-section: text-3xl font-bold                      /* 30px */
.heading-subsection: text-2xl font-bold                   /* 24px */
.heading-component: text-xl font-bold                     /* 20px */
.heading-small: text-lg font-semibold                     /* 18px */

/* Body Text Sizes */
.text-large: text-xl leading-relaxed                      /* 20px */
.text-base: text-base leading-normal                      /* 16px */
.text-small: text-sm                                      /* 14px */
.text-micro: text-xs                                      /* 12px */
```

#### Font Weight Standards
- **Bold (700)**: Primary headings, important emphasis
- **Semibold (600)**: Secondary headings, labels
- **Medium (500)**: Button text, navigation
- **Normal (400)**: Body text, standard content

### Spacing System (8px Grid)

#### Component Spacing Standards
```css
/* Section Spacing - Match Homepage */
.section-spacing: py-24        /* 96px - Major sections */
.container-spacing: py-20      /* 80px - Container sections */
.component-spacing: py-16      /* 64px - Large components */

/* Element Spacing */
.card-padding: p-6             /* 24px - Standard cards */
.card-padding-large: p-8       /* 32px - Large cards */
.button-padding: px-6 py-3     /* 24px/12px - Standard buttons */
.element-gap: gap-6            /* 24px - Standard element gaps */
.grid-gap: gap-8               /* 32px - Grid gaps */
```

#### Layout Container Standards
```css
.container-max: max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
.content-max: max-w-4xl mx-auto
.text-max: max-w-3xl mx-auto
```

## 🧩 Component Design Standards

### Button System Updates
```typescript
// Primary Button - Main actions (Start Research, Save, Submit)
variant="primary"   // Black background, white text
size="lg"          // Standard size for important actions

// Secondary Button - Supporting actions (Cancel, Learn More)
variant="secondary" // White background, gray text, border
size="md"          // Standard size for secondary actions

// Accent Button - Special actions (limited use)
variant="accent"   // Purple background, white text
size="lg"         // For promotional/special actions
```

### Card System Standards
```css
/* Standard Card */
.card-standard {
  @apply bg-white rounded-lg border border-gray-200 p-6 shadow-sm;
  @apply hover:shadow-md transition-shadow duration-300;
}

/* Elevated Card */
.card-elevated {
  @apply bg-white rounded-xl border border-gray-200 p-8 shadow-lg;
  @apply hover:shadow-xl transition-shadow duration-300;
}
```

### Interactive Element Standards
```css
/* Hover Effects */
.hover-scale {
  @apply hover:scale-[1.02] transition-transform duration-300;
}

.hover-shadow {
  @apply hover:shadow-lg transition-shadow duration-300;
}

/* Focus States */
.focus-ring {
  @apply focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2;
}
```

## 📋 Dashboard Component Update Checklist

### For Each Component:
- [ ] **Colors**: Replace hardcoded colors with design tokens
- [ ] **Typography**: Apply consistent font hierarchy and weights
- [ ] **Spacing**: Use 8px grid system for all spacing decisions
- [ ] **Backgrounds**: Use standard background color system
- [ ] **Borders**: Apply consistent border colors and radius
- [ ] **Shadows**: Use standard shadow system for elevation
- [ ] **Hover States**: Implement consistent hover effects
- [ ] **Focus States**: Apply proper focus indicators
- [ ] **Transitions**: Use 300ms duration with ease-out easing
- [ ] **Responsive**: Ensure proper responsive behavior

### Quality Assurance:
- [ ] **Visual Consistency**: Matches homepage design patterns
- [ ] **Accessibility**: WCAG 2.1 AA+ compliance maintained
- [ ] **TypeScript**: Zero compilation errors
- [ ] **Performance**: Optimized CSS and animations
- [ ] **Cross-browser**: Tested across major browsers

## 🎯 Implementation Priority Order

1. **Dashboard Layout Component** - Foundation structure
2. **Top Navigation Component** - Header consistency
3. **Left Sidebar Component** - Navigation and branding
4. **Right Sidebar Component** - Contextual tools
5. **Dashboard Content Component** - Main content areas
6. **Research Components** - Specialized research tools
7. **UI Design System Components** - Base components

## 🔍 Success Criteria

### Visual Consistency Achieved When:
- Dashboard components visually match homepage design language
- Color usage follows 80/15/5 distribution (neutral/purple/semantic)
- Typography hierarchy is consistent across all components
- Spacing follows 8px grid system throughout
- Interactive elements have consistent behavior
- Responsive design works seamlessly across breakpoints

### Technical Excellence Achieved When:
- All components use design tokens instead of hardcoded values
- TypeScript compilation passes with zero errors
- Accessibility standards are maintained or improved
- Performance metrics remain optimal
- Code follows established patterns and conventions

This specification serves as the definitive guide for creating visual consistency between the homepage and dashboard components, ensuring a cohesive user experience throughout NeuraForge OS.
