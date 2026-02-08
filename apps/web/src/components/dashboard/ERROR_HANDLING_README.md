# Error Handling and Toast Notification System

This document describes the error handling and toast notification system implemented for the NeuraForge dashboard.

## Overview

The system provides comprehensive error handling and user feedback mechanisms:

1. **Error Boundaries** - Catch and recover from React component errors
2. **Toast Notifications** - Provide user feedback for actions and events
3. **Retry Logic** - Automatically retry failed operations with exponential backoff
4. **Loading States** - Visual feedback during async operations

## Components

### Error Boundaries

#### DashboardErrorBoundary

Wraps the entire dashboard layout to catch critical errors.

**Features:**
- Full-page error fallback UI
- Retry button to reset error state
- Navigation to home page
- Error logging and reporting
- Graceful degradation

**Usage:**
```tsx
import { DashboardErrorBoundary } from '@/components/dashboard/dashboard-error-boundaries'

export default function DashboardPage() {
  return (
    <DashboardErrorBoundary>
      <DashboardLayoutV2>
        <DashboardContent />
      </DashboardLayoutV2>
    </DashboardErrorBoundary>
  )
}
```

#### ContentErrorBoundary

Wraps individual content sections for localized error recovery.

**Features:**
- Inline error display
- Retry button
- Doesn't break entire dashboard
- Suitable for cards, widgets, and sections

**Usage:**
```tsx
import { ContentErrorBoundary } from '@/components/dashboard/dashboard-error-boundaries'

export function DashboardContent() {
  return (
    <div>
      <ContentErrorBoundary>
        <MetricsSection />
      </ContentErrorBoundary>
      
      <ContentErrorBoundary>
        <ProjectsList />
      </ContentErrorBoundary>
    </div>
  )
}
```

### Toast Notifications

#### Toaster Component

Displays toast notifications with stacking behavior.

**Features:**
- Multiple variants: success, error, warning, info, default
- Auto-dismiss after 5 seconds (configurable)
- Smooth animations with Framer Motion
- Accessible with ARIA labels and role="alert"
- Click to dismiss
- Keyboard accessible

**Variants:**
- `success` - Green, for successful operations
- `destructive` (error) - Red, for errors and failures
- `warning` - Yellow/Orange, for warnings
- `info` - Blue, for informational messages
- `default` - Neutral, for general notifications

**Usage:**
```tsx
import { useToast } from '@/hooks/use-toast'

function MyComponent() {
  const { toast } = useToast()
  
  const handleSave = () => {
    toast({
      title: 'Success',
      description: 'Your changes have been saved',
      variant: 'success',
      duration: 5000
    })
  }
  
  return <button onClick={handleSave}>Save</button>
}
```

#### Toast Helper Functions

Convenient functions for common toast patterns.

**Functions:**
```tsx
import { 
  showSuccessToast, 
  showErrorToast, 
  showWarningToast, 
  showInfoToast,
  ToastMessages 
} from '@/lib/toast-helpers'

// Simple toasts
showSuccessToast('Success!', 'Operation completed')
showErrorToast('Error', 'Something went wrong')
showWarningToast('Warning', 'Please review your changes')
showInfoToast('Info', 'Processing...')

// Common messages
ToastMessages.saved()
ToastMessages.created('Project')
ToastMessages.updated('Experiment')
ToastMessages.deleted('File')
ToastMessages.copied()
ToastMessages.error('Custom error message')
ToastMessages.networkError()
```

### Retry Logic

#### retryWithExponentialBackoff

Utility function for retrying failed operations.

**Features:**
- Exponential backoff (baseDelay × 2^attempt)
- Jitter to prevent thundering herd
- Configurable max retries and base delay
- Promise-based API

**Usage:**
```tsx
import { retryWithExponentialBackoff } from '@/components/dashboard/dashboard-error-boundaries'

async function fetchData() {
  return await retryWithExponentialBackoff(
    async () => {
      const response = await fetch('/api/data')
      if (!response.ok) throw new Error('Failed to fetch')
      return response.json()
    },
    3,    // max retries
    1000  // base delay (ms)
  )
}
```

#### useRetry Hook

React hook for retry logic with state management.

**Features:**
- Loading state
- Error state
- Data state
- Reset function

**Usage:**
```tsx
import { useRetry } from '@/components/dashboard/dashboard-error-boundaries'

function MyComponent() {
  const { execute, isLoading, error, data, reset } = useRetry()
  
  const handleFetch = async () => {
    try {
      await execute(async () => {
        const response = await fetch('/api/data')
        return response.json()
      })
      showSuccessToast('Success', 'Data loaded')
    } catch (err) {
      showErrorToast('Error', 'Failed to load data')
    }
  }
  
  return (
    <div>
      <button onClick={handleFetch} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Fetch Data'}
      </button>
      {error && <div>Error: {error.message}</div>}
      {data && <div>Data: {JSON.stringify(data)}</div>}
    </div>
  )
}
```

## Integration Guide

### Step 1: Add Toaster to Root Layout

Add the Toaster component to your root layout so it's available throughout the app.

```tsx
// app/layout.tsx
import { Toaster } from '@/components/ui/toaster'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
```

### Step 2: Wrap Dashboard with Error Boundary

Wrap your dashboard page with DashboardErrorBoundary.

```tsx
// app/dashboard/page.tsx
import { DashboardErrorBoundary } from '@/components/dashboard/dashboard-error-boundaries'
import { DashboardLayoutV2 } from '@/components/dashboard/dashboard-layout-v2'

export default function DashboardPage() {
  return (
    <DashboardErrorBoundary>
      <DashboardLayoutV2 />
    </DashboardErrorBoundary>
  )
}
```

### Step 3: Wrap Content Sections

Wrap individual content sections with ContentErrorBoundary.

```tsx
// components/dashboard/dashboard-content.tsx
import { ContentErrorBoundary } from '@/components/dashboard/dashboard-error-boundaries'

export function DashboardContent() {
  return (
    <div className="space-y-6">
      <ContentErrorBoundary>
        <MetricsSection />
      </ContentErrorBoundary>
      
      <ContentErrorBoundary>
        <ProjectsList />
      </ContentErrorBoundary>
      
      <ContentErrorBoundary>
        <ExperimentsList />
      </ContentErrorBoundary>
    </div>
  )
}
```

### Step 4: Add Toast Notifications

Use toast notifications for user feedback.

```tsx
import { useToast } from '@/hooks/use-toast'
import { showSuccessToast, showErrorToast } from '@/lib/toast-helpers'

function MyComponent() {
  const handleSave = async () => {
    try {
      await saveData()
      showSuccessToast('Saved', 'Your changes have been saved')
    } catch (error) {
      showErrorToast('Error', 'Failed to save changes')
    }
  }
  
  return <button onClick={handleSave}>Save</button>
}
```

### Step 5: Add Retry Logic for API Calls

Use retry logic for operations that might fail temporarily.

```tsx
import { useRetry } from '@/components/dashboard/dashboard-error-boundaries'
import { showSuccessToast, showErrorToast } from '@/lib/toast-helpers'

function MyComponent() {
  const { execute, isLoading } = useRetry()
  
  const handleFetch = async () => {
    try {
      const data = await execute(async () => {
        const response = await fetch('/api/data')
        if (!response.ok) throw new Error('Failed to fetch')
        return response.json()
      })
      showSuccessToast('Success', 'Data loaded')
    } catch (error) {
      showErrorToast('Error', 'Failed to load data after retries')
    }
  }
  
  return (
    <button onClick={handleFetch} disabled={isLoading}>
      {isLoading ? 'Loading...' : 'Load Data'}
    </button>
  )
}
```

## Design Tokens

All components use design tokens for consistent styling:

### Colors
- Success: `--color-success-*`
- Error: `--color-error-*`
- Warning: `--color-warning-*`
- Info: `--color-primary-*`

### Spacing
- `--space-*` for padding and margins

### Timing
- `--duration-normal` (300ms) for animations
- `--easing-ease-in-out` for smooth transitions

## Accessibility

All components follow WCAG 2.1 AA standards:

- **Error Boundaries**: Clear error messages with retry actions
- **Toasts**: 
  - `role="alert"` for screen reader announcements
  - `aria-live="assertive"` for important notifications
  - `aria-label` on close buttons
  - Keyboard accessible (Tab to focus, Enter/Space to close)
- **Focus Management**: Visible focus indicators on all interactive elements

## Testing

### Testing Error Boundaries

```tsx
// Create a component that throws an error
function BuggyComponent() {
  throw new Error('Test error')
}

// Wrap with error boundary
<ContentErrorBoundary>
  <BuggyComponent />
</ContentErrorBoundary>
```

### Testing Toasts

```tsx
import { showSuccessToast, showErrorToast } from '@/lib/toast-helpers'

// Test different variants
showSuccessToast('Success', 'Test success message')
showErrorToast('Error', 'Test error message')
showWarningToast('Warning', 'Test warning message')
showInfoToast('Info', 'Test info message')
```

### Testing Retry Logic

```tsx
import { retryWithExponentialBackoff } from '@/components/dashboard/dashboard-error-boundaries'

// Test with a function that fails sometimes
const result = await retryWithExponentialBackoff(
  async () => {
    if (Math.random() < 0.5) throw new Error('Random failure')
    return 'success'
  },
  3,
  1000
)
```

## Requirements Satisfied

This implementation satisfies the following requirements:

- **9.1**: Loading states with skeleton loaders and loading indicators
- **9.2**: Error handling with error boundaries and fallback UI
- **9.3**: Toast notifications for transient errors and user feedback
- **9.4**: Retry logic with exponential backoff for failed operations

## Future Enhancements

- Integration with error tracking service (e.g., Sentry)
- Persistent toast notifications for critical errors
- Toast action buttons for undo/retry
- Custom toast positions (top-left, bottom-left, etc.)
- Toast queue management for multiple simultaneous toasts
- Error boundary recovery strategies (partial recovery, fallback data)
