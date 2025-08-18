# 🎨 NeuraForge OS Component Library

## Overview

The NeuraForge OS component library is built with modern React patterns, TypeScript, and Tailwind CSS. It follows atomic design principles and provides a comprehensive set of reusable components for building research collaboration interfaces.

## Design System Foundation

### Color Palette

```typescript
// Neural Theme Colors
const colors = {
  neural: {
    50: '#f0f4ff',
    100: '#e0e9ff',
    200: '#c7d6fe',
    300: '#a5b8fc',
    400: '#8b93f8',
    500: '#7c6df2',
    600: '#6d4de6',
    700: '#5d3dcb',
    800: '#4c32a4',
    900: '#402d82',
  },
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  }
}
```

### Typography Scale

```typescript
const typography = {
  fontFamily: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    mono: ['JetBrains Mono', 'monospace'],
  },
  fontSize: {
    xs: ['0.75rem', { lineHeight: '1rem' }],
    sm: ['0.875rem', { lineHeight: '1.25rem' }],
    base: ['1rem', { lineHeight: '1.5rem' }],
    lg: ['1.125rem', { lineHeight: '1.75rem' }],
    xl: ['1.25rem', { lineHeight: '1.75rem' }],
    '2xl': ['1.5rem', { lineHeight: '2rem' }],
    '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
    '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
  }
}
```

### Spacing System

Based on 4px grid system:
- `1` = 4px
- `2` = 8px
- `4` = 16px
- `6` = 24px
- `8` = 32px
- `12` = 48px
- `16` = 64px

## Core Components

### Button Component

A versatile button component with multiple variants and sizes.

**Location**: `packages/ui/src/components/button.tsx`

#### Props

```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  asChild?: boolean
}
```

#### Usage Examples

```tsx
import { Button } from '@neuraforge/ui'

// Default button
<Button>Click me</Button>

// Primary action button
<Button variant="default" size="lg">
  Start Research
</Button>

// Destructive action
<Button variant="destructive">
  Delete Project
</Button>

// Outline button
<Button variant="outline">
  Cancel
</Button>

// Icon button
<Button variant="ghost" size="icon">
  <SearchIcon className="h-4 w-4" />
</Button>

// Link-style button
<Button variant="link">
  Learn more
</Button>
```

#### Variants

- **default**: Primary blue background with white text
- **destructive**: Red background for dangerous actions
- **outline**: Transparent background with border
- **secondary**: Gray background for secondary actions
- **ghost**: Transparent background, visible on hover
- **link**: Text-only appearance with underline on hover

#### Sizes

- **default**: Standard height (40px) with normal padding
- **sm**: Smaller height (36px) for compact layouts
- **lg**: Larger height (44px) for prominent actions
- **icon**: Square dimensions (40x40px) for icon-only buttons

### Input Component

A styled input component with consistent design and accessibility features.

**Location**: `packages/ui/src/components/input.tsx`

#### Props

```typescript
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}
```

#### Usage Examples

```tsx
import { Input } from '@neuraforge/ui'

// Basic text input
<Input 
  type="text" 
  placeholder="Enter project title"
  value={title}
  onChange={(e) => setTitle(e.target.value)}
/>

// Email input with validation
<Input 
  type="email" 
  placeholder="your@email.com"
  required
  aria-describedby="email-error"
/>

// Password input
<Input 
  type="password" 
  placeholder="Enter password"
  minLength={8}
/>

// Disabled input
<Input 
  type="text" 
  value="Read-only value"
  disabled
/>
```

#### Features

- Consistent styling with focus states
- Accessibility support with proper ARIA attributes
- Form validation styling
- Responsive design
- Support for all HTML input types

### Card Component

A flexible container component for grouping related content.

**Location**: `packages/ui/src/components/card.tsx`

#### Components

```typescript
// Main card container
Card

// Card sections
CardHeader
CardTitle
CardDescription
CardContent
CardFooter
```

#### Usage Examples

```tsx
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@neuraforge/ui'

// Basic card
<Card>
  <CardHeader>
    <CardTitle>Research Project</CardTitle>
    <CardDescription>
      AI-powered drug discovery research
    </CardDescription>
  </CardHeader>
  <CardContent>
    <p>Project details and content go here...</p>
  </CardContent>
  <CardFooter>
    <Button>View Project</Button>
  </CardFooter>
</Card>

// Project card with stats
<Card className="hover:shadow-lg transition-shadow">
  <CardHeader>
    <CardTitle className="flex items-center gap-2">
      <FlaskIcon className="h-5 w-5" />
      Protein Folding Study
    </CardTitle>
    <CardDescription>
      Machine learning approach to protein structure prediction
    </CardDescription>
  </CardHeader>
  <CardContent>
    <div className="grid grid-cols-3 gap-4 text-center">
      <div>
        <div className="text-2xl font-bold text-neural-600">15</div>
        <div className="text-sm text-gray-500">Experiments</div>
      </div>
      <div>
        <div className="text-2xl font-bold text-neural-600">3</div>
        <div className="text-sm text-gray-500">Collaborators</div>
      </div>
      <div>
        <div className="text-2xl font-bold text-neural-600">87%</div>
        <div className="text-sm text-gray-500">Accuracy</div>
      </div>
    </div>
  </CardContent>
  <CardFooter className="flex justify-between">
    <Button variant="outline">Share</Button>
    <Button>Open Project</Button>
  </CardFooter>
</Card>
```

## Advanced Components

### FuturisticHero Component

A visually striking hero section with animated particles and neural network aesthetics.

**Location**: `apps/web/src/components/landing/futuristic-hero.tsx`

#### Features

- Animated floating particles
- Responsive design
- Framer Motion animations
- Neural network visual theme
- Call-to-action integration

#### Usage

```tsx
import { FuturisticHero } from '@/components/landing/futuristic-hero'

<FuturisticHero />
```

### AuthForm Components

Comprehensive authentication forms with validation and error handling.

**Location**: `apps/web/src/components/auth/`

#### Components

- `LoginForm`: User login with email/password
- `RegisterForm`: User registration with validation
- `ForgotPasswordForm`: Password reset functionality

#### Usage Examples

```tsx
import { LoginForm, RegisterForm } from '@/components/auth'

// Login form
<LoginForm 
  onSuccess={(user) => router.push('/dashboard')}
  onError={(error) => toast.error(error.message)}
/>

// Registration form
<RegisterForm 
  onSuccess={(user) => router.push('/onboarding')}
  onError={(error) => toast.error(error.message)}
/>
```

### Dashboard Components

Specialized components for the research dashboard interface.

#### ProjectCard

Displays research project information with actions.

```tsx
import { ProjectCard } from '@/components/dashboard/project-card'

<ProjectCard 
  project={{
    id: 'proj_123',
    title: 'AI Drug Discovery',
    description: 'Machine learning for pharmaceutical research',
    domain: 'Biotechnology',
    collaborators: 3,
    lastUpdated: '2024-01-05'
  }}
  onOpen={(projectId) => router.push(`/projects/${projectId}`)}
  onShare={(projectId) => shareProject(projectId)}
/>
```

#### StatsCard

Displays key metrics and statistics.

```tsx
import { StatsCard } from '@/components/dashboard/stats-card'

<StatsCard 
  title="Active Projects"
  value={12}
  change={+2}
  changeType="increase"
  icon={<ProjectIcon />}
/>
```

## Form Components

### FormField

Wrapper component for form inputs with labels and error handling.

```tsx
import { FormField } from '@/components/ui/form-field'

<FormField 
  label="Project Title"
  error={errors.title?.message}
  required
>
  <Input 
    {...register('title')}
    placeholder="Enter project title"
  />
</FormField>
```

### SearchInput

Enhanced input component with search functionality.

```tsx
import { SearchInput } from '@/components/ui/search-input'

<SearchInput 
  placeholder="Search projects..."
  value={searchQuery}
  onChange={setSearchQuery}
  onClear={() => setSearchQuery('')}
/>
```

## Layout Components

### PageHeader

Consistent page header with title, description, and actions.

```tsx
import { PageHeader } from '@/components/layout/page-header'

<PageHeader 
  title="Research Projects"
  description="Manage and collaborate on your research projects"
  action={
    <Button onClick={() => setShowCreateModal(true)}>
      New Project
    </Button>
  }
/>
```

### Sidebar

Navigation sidebar with menu items and user profile.

```tsx
import { Sidebar } from '@/components/layout/sidebar'

<Sidebar 
  items={[
    { label: 'Dashboard', href: '/dashboard', icon: <DashboardIcon /> },
    { label: 'Projects', href: '/projects', icon: <ProjectIcon /> },
    { label: 'Collaborations', href: '/collaborations', icon: <UsersIcon /> },
  ]}
  user={currentUser}
/>
```

## Animation Components

### FadeIn

Wrapper component for fade-in animations.

```tsx
import { FadeIn } from '@/components/animations/fade-in'

<FadeIn delay={0.2}>
  <Card>Content that fades in</Card>
</FadeIn>
```

### SlideUp

Wrapper component for slide-up animations.

```tsx
import { SlideUp } from '@/components/animations/slide-up'

<SlideUp delay={0.1}>
  <div>Content that slides up</div>
</SlideUp>
```

## Accessibility Features

All components include:

- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Reader Support**: Proper ARIA labels and descriptions
- **Focus Management**: Visible focus indicators
- **Color Contrast**: WCAG 2.1 AA compliant color ratios
- **Responsive Design**: Works across all device sizes

## Component Development Guidelines

### 1. TypeScript First

All components must be written in TypeScript with proper type definitions:

```tsx
interface ComponentProps {
  title: string
  description?: string
  onAction?: () => void
}

const Component: React.FC<ComponentProps> = ({ title, description, onAction }) => {
  // Component implementation
}
```

### 2. Accessibility Standards

- Use semantic HTML elements
- Include proper ARIA attributes
- Support keyboard navigation
- Provide alternative text for images

### 3. Responsive Design

- Use Tailwind's responsive utilities
- Test on mobile, tablet, and desktop
- Consider touch interactions

### 4. Performance Optimization

- Use React.memo for expensive components
- Implement proper key props for lists
- Lazy load heavy components

### 5. Testing Requirements

- Unit tests with React Testing Library
- Accessibility tests with jest-axe
- Visual regression tests with Storybook

## Storybook Integration

All components are documented in Storybook for development and testing:

```bash
# Start Storybook
bun run storybook

# Build Storybook
bun run build-storybook
```

Access Storybook at: `http://localhost:6006`

## Contributing to the Component Library

1. **Create Component**: Add new component in appropriate package
2. **Add Types**: Define TypeScript interfaces
3. **Write Tests**: Include unit and accessibility tests
4. **Document**: Add Storybook stories and documentation
5. **Export**: Add to package index file

Example component structure:

```
packages/ui/src/components/
├── button/
│   ├── button.tsx
│   ├── button.test.tsx
│   ├── button.stories.tsx
│   └── index.ts
└── index.ts
```

## Design Tokens

Design tokens are defined in the Tailwind configuration and can be used consistently across all components:

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        neural: { /* neural color palette */ },
        primary: { /* primary color palette */ }
      },
      spacing: { /* custom spacing values */ },
      animation: { /* custom animations */ }
    }
  }
}
```

This component library provides a solid foundation for building consistent, accessible, and performant user interfaces in the NeuraForge OS ecosystem.
