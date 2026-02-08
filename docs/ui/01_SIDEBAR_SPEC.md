# NeuraForge Sidebar Specification

## Overview

This document defines the comprehensive specification for the NeuraForge sidebar components, including structure, behavior, design tokens, and accessibility requirements.

## Architecture

### Three-Column Fixed Layout

```
┌─────────────────────────────────────────────────────────────┐
│                    Fixed Header (64px)                      │
├──────────┬─────────────────────────────────┬────────────────┤
│   Left   │                                 │     Right      │
│ Sidebar  │        Main Content             │   Sidebar      │
│ (Fixed)  │         (Fluid)                 │   (Fixed)      │
│          │                                 │                │
│          │                                 │                │
│          │                                 │                │
│          │                                 │                │
└──────────┴─────────────────────────────────┴────────────────┘
```

### Left Sidebar Structure

**Fixed Positioning:**
- `position: fixed`
- `left: 0`
- `top: var(--header-height)`
- `width: var(--sidebar-width-collapsed)` (64px) or `var(--sidebar-width-expanded)` (280px)
- `height: calc(100vh - var(--header-height))`
- `overflow: hidden`

**Component Hierarchy:**
```
nav[role="navigation"]
├── Logo Section (Fixed Top)
│   └── button[aria-expanded] - Logo/Toggle
├── Navigation Items (Scrollable Middle)
│   └── ul[role="list"]
│       └── li
│           └── button[aria-current="page"]
│               ├── Icon
│               ├── Label
│               └── Badge (optional)
├── Profile Section (Fixed Bottom - 64px from bottom)
│   └── button[aria-expanded][aria-haspopup="menu"]
│       ├── Avatar
│       ├── Name
│       └── Role
└── Version Info (Fixed Bottom - 16px from bottom)
    ├── Platform Version
    └── Last Sync Status
```

### Right Sidebar Structure

**Fixed Positioning:**
- `position: fixed`
- `right: 0`
- `top: var(--header-height)`
- `width: 40px` (collapsed) or `360px` (expanded)
- `height: calc(100vh - var(--header-height))`
- `overflow: hidden`

**Component Hierarchy:**
```
aside
├── Expandable Panel (320px when open)
│   ├── Header
│   │   ├── Title
│   │   └── Close Button
│   └── Content (NO internal scrolling)
└── Button Column (40px always visible)
    └── Vertical Tab Buttons
        ├── AI Chat
        ├── Collab Notes
        ├── Teams
        ├── Analytics
        └── Settings
```

## Design Token Usage

### Colors
- **Background**: `var(--color-background)`
- **Surface**: `var(--color-surface)`
- **Borders**: `var(--color-border-subtle)`
- **Text Primary**: `var(--color-text-primary)`
- **Text Secondary**: `var(--color-text-secondary)`
- **Primary Brand**: `var(--color-primary-600)`
- **Primary Light**: `var(--color-primary-100)`

### Spacing
- **Container Padding**: `var(--space-4)` (16px)
- **Item Spacing**: `var(--space-2)` (8px)
- **Section Spacing**: `var(--space-8)` (32px)
- **Profile Bottom**: `var(--space-16)` (64px)
- **Version Bottom**: `var(--space-4)` (16px)

### Typography
- **Logo**: `var(--font-size-xl)` + `var(--font-weight-bold)`
- **Nav Items**: `var(--font-size-sm)` + `var(--font-weight-medium)`
- **Profile Name**: `var(--font-size-sm)` + `var(--font-weight-medium)`
- **Profile Role**: `var(--font-size-xs)`
- **Version Info**: `var(--font-size-xs)` + `var(--color-text-tertiary)`

### Animations
- **Transitions**: `var(--duration-normal)` (300ms)
- **Fast Interactions**: `var(--duration-fast)` (150ms)
- **Easing**: `var(--easing-ease-in-out)`

### Layout Dimensions
- **Header Height**: `var(--header-height)` (64px)
- **Sidebar Collapsed**: `var(--sidebar-width-collapsed)` (64px)
- **Sidebar Expanded**: `var(--sidebar-width-expanded)` (280px)
- **Right Panel Width**: 320px + 40px = 360px total

### Z-Index
- **Fixed Elements**: `var(--z-index-fixed)` (1030)
- **Docked Elements**: `var(--z-index-docked)` (10)
- **Modal Backdrop**: `var(--z-index-modal-backdrop)` (1040)
- **Modal**: `var(--z-index-modal)` (1050)

## States and Behaviors

### Left Sidebar States
1. **Collapsed** (Mobile/Desktop)
   - Width: 64px
   - Shows only icons
   - Logo icon only
   - Profile avatar only
   - No version info

2. **Expanded** (Desktop)
   - Width: 280px
   - Shows icons + labels
   - Full logo text
   - Profile with name/role
   - Version information

### Right Sidebar States
1. **Collapsed** (Default)
   - Width: 40px
   - Button column only
   - No panel content

2. **Expanded** (Active Tab)
   - Width: 360px (320px panel + 40px buttons)
   - Shows selected panel content
   - Active button highlighted

### Responsive Behavior

**Mobile (320px - 767px):**
- Left sidebar auto-collapses
- Right sidebar full-width overlay when expanded
- Mobile backdrop overlay when sidebars open

**Tablet (768px - 1023px):**
- Left sidebar can toggle collapsed/expanded
- Right sidebar normal behavior

**Desktop (1024px+):**
- Full sidebar functionality
- Smooth transitions between states

## Overflow Rules

### Critical Constraints
- **Sidebars**: `overflow: hidden` - NO internal scrollbars
- **Main Content**: `overflow: auto` - Only main content scrolls
- **Panel Content**: `overflow: hidden` - Content must fit or be designed responsively

### Content Handling
- Navigation items that exceed viewport: Use responsive design, not scrolling
- Long panel content: Design for fixed height, use pagination or summary views
- Text overflow: Use `text-overflow: ellipsis` and tooltips

## Performance Requirements

### Animation Performance
- All animations use `transform` and `opacity` for GPU acceleration
- Transitions use `will-change: transform` during animation
- 60fps target for all sidebar interactions

### Bundle Size
- Design tokens loaded once globally
- Component code splitting for panel content
- Lazy loading for non-critical sidebar features

### Memory Usage
- Efficient event listener management
- Proper cleanup on component unmount
- Minimal DOM manipulation during transitions
