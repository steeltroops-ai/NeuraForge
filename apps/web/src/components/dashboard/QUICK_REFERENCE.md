# Error Handling & Toast System - Quick Reference

## Import Statements

```tsx
// Error Boundaries
import { 
  DashboardErrorBoundary, 
  ContentErrorBoundary, 
  useRetry,
  retryWithExponentialBackoff 
} from '@/components/dashboard/dashboard-error-boundaries'

// Toast System
import { useToast } from '@/hooks/use-toast'
import { 
  showSuccessToast, 
  showErrorToast, 
  showWarningToast, 
  showInfoToast,
  ToastMessages 
} from '@/lib/toast-helpers'

// Toaster Component
import { Toaster } from '@/components/ui/toaster'
```

## Common Patterns

### 1. Wrap Page with Error Boundary
```tsx
<DashboardErrorBoundary>
  <YourPageContent />
</DashboardErrorBoundary>
```

### 2. Wrap Section with Error Boundary
```tsx
<ContentErrorBoundary>
  <YourSection />
</ContentErrorBoundary>
```

### 3. Show Success Toast
```tsx
showSuccessToast('Success!', 'Operation completed')
// or
ToastMessages.saved()
```

### 4. Show Error Toast
```tsx
showErrorToast('Error', 'Something went wrong')
// or
ToastMessages.error('Custom error message')
```

### 5. Show Warning Toast
```tsx
showWarningToast('Warning', 'Please review')
// or
ToastMessages.unsavedChanges()
```

### 6. Show Info Toast
```tsx
showInfoToast('Info', 'Processing...')
// or
ToastMessages.loading('Fetching data...')
```

### 7. API Call with Toast
```tsx
const handleSave = async () => {
  try {
    await api.save(data)
    showSuccessToast('Saved', 'Changes saved successfully')
  } catch (error) {
    showErrorToast('Error', error.message)
  }
}
```

### 8. API Call with Retry
```tsx
const { execute, isLoading } = useRetry()

const handleFetch = async () => {
  try {
    const data = await execute(async () => {
      const res = await fetch('/api/data')
      if (!res.ok) throw new Error('Failed')
      return res.json()
    })
    showSuccessToast('Success', 'Data loaded')
  } catch (error) {
    showErrorToast('Error', 'Failed after retries')
  }
}
```

### 9. Custom Toast Duration
```tsx
const { toast } = useToast()

toast({
  title: 'Custom',
  description: 'This stays for 10 seconds',
  variant: 'info',
  duration: 10000
})
```

### 10. Loading Toast (No Auto-Dismiss)
```tsx
const loadingId = showInfoToast('Loading', 'Please wait...', 0)
// Later dismiss manually
const { dismiss } = useToast()
dismiss(loadingId)
```

## Toast Variants

| Variant | Color | Use Case |
|---------|-------|----------|
| `success` | Green | Successful operations |
| `destructive` | Red | Errors and failures |
| `warning` | Yellow | Warnings and cautions |
| `info` | Blue | Informational messages |
| `default` | Neutral | General notifications |

## Common Toast Messages

```tsx
ToastMessages.saved()                    // "Saved"
ToastMessages.created('Project')         // "Created: Project"
ToastMessages.updated('Experiment')      // "Updated: Experiment"
ToastMessages.deleted('File')            // "Deleted: File"
ToastMessages.copied()                   // "Copied to clipboard"
ToastMessages.error()                    // "Error: An unexpected error occurred"
ToastMessages.networkError()             // "Network Error"
ToastMessages.unauthorized()             // "Unauthorized"
ToastMessages.notFound('Item')           // "Not Found: Item"
ToastMessages.validationError('msg')     // "Validation Error: msg"
ToastMessages.unsavedChanges()           // "Unsaved Changes"
ToastMessages.limitReached('5 items')    // "Limit Reached: 5 items"
ToastMessages.loading()                  // "Loading"
ToastMessages.processing()               // "Processing"
```

## Retry Configuration

```tsx
// Default: 3 retries, 1000ms base delay
await retryWithExponentialBackoff(fn)

// Custom: 5 retries, 500ms base delay
await retryWithExponentialBackoff(fn, 5, 500)

// With hook
const { execute } = useRetry()
await execute(fn, 5, 500)
```

## Retry Delays

| Attempt | Delay (base=1000ms) |
|---------|---------------------|
| 1 | 1000ms + jitter |
| 2 | 2000ms + jitter |
| 3 | 4000ms + jitter |
| 4 | 8000ms + jitter |

*Jitter: Random 0-100ms to prevent thundering herd*

## Accessibility

All components are accessible:
- ✅ ARIA labels
- ✅ Keyboard navigation
- ✅ Screen reader support
- ✅ Focus management
- ✅ High contrast mode

## Design Tokens

All components use design tokens:
- Colors: `--color-success-*`, `--color-error-*`, `--color-warning-*`
- Spacing: `--space-*`
- Timing: `--duration-normal`, `--easing-ease-in-out`

## Integration Checklist

- [ ] Add `<Toaster />` to root layout
- [ ] Wrap dashboard with `<DashboardErrorBoundary>`
- [ ] Wrap sections with `<ContentErrorBoundary>`
- [ ] Replace console.log with toast notifications
- [ ] Add retry logic to API calls
- [ ] Test error scenarios
- [ ] Test accessibility
