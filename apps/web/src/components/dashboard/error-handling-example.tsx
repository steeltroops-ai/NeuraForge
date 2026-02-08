/**
 * Error Handling and Toast System Usage Examples
 * 
 * This file demonstrates how to use the error boundaries and toast notification system
 * in the dashboard. These examples show best practices for error handling and user feedback.
 * 
 * Requirements: 9.1, 9.2, 9.3, 9.4
 */

'use client'

import React from 'react'
import { DashboardErrorBoundary, ContentErrorBoundary, useRetry } from './dashboard-error-boundaries'
import { useToast } from '@/hooks/use-toast'
import { showSuccessToast, showErrorToast, showWarningToast, showInfoToast, ToastMessages } from '@/lib/toast-helpers'
import { Button } from '@/components/ui/design-system-button'

/**
 * Example 1: Wrapping the entire dashboard with error boundary
 * 
 * Usage in dashboard page:
 * ```tsx
 * import { DashboardErrorBoundary } from '@/components/dashboard/dashboard-error-boundaries'
 * 
 * export default function DashboardPage() {
 *   return (
 *     <DashboardErrorBoundary>
 *       <DashboardLayoutV2>
 *         <DashboardContent />
 *       </DashboardLayoutV2>
 *     </DashboardErrorBoundary>
 *   )
 * }
 * ```
 */

/**
 * Example 2: Wrapping individual content sections with error boundary
 * 
 * Usage in dashboard content:
 * ```tsx
 * import { ContentErrorBoundary } from '@/components/dashboard/dashboard-error-boundaries'
 * 
 * export function DashboardContent() {
 *   return (
 *     <div>
 *       <ContentErrorBoundary>
 *         <MetricsSection />
 *       </ContentErrorBoundary>
 *       
 *       <ContentErrorBoundary>
 *         <ProjectsList />
 *       </ContentErrorBoundary>
 *       
 *       <ContentErrorBoundary>
 *         <ExperimentsList />
 *       </ContentErrorBoundary>
 *     </div>
 *   )
 * }
 * ```
 */

/**
 * Example 3: Using toast notifications for user feedback
 */
export function ToastExamples() {
    const { toast } = useToast()

    const handleSuccess = () => {
        showSuccessToast('Success!', 'Your changes have been saved')
    }

    const handleError = () => {
        showErrorToast('Error', 'Failed to save changes')
    }

    const handleWarning = () => {
        showWarningToast('Warning', 'You have unsaved changes')
    }

    const handleInfo = () => {
        showInfoToast('Info', 'Processing your request...')
    }

    const handleCustomToast = () => {
        toast({
            title: 'Custom Toast',
            description: 'This is a custom toast with 10 second duration',
            variant: 'success',
            duration: 10000
        })
    }

    return (
        <div className="space-y-4 p-6">
            <h2 className="text-xl font-bold">Toast Examples</h2>
            <div className="flex gap-2">
                <Button onClick={handleSuccess} variant="primary">
                    Show Success
                </Button>
                <Button onClick={handleError} variant="accent">
                    Show Error
                </Button>
                <Button onClick={handleWarning} variant="outline">
                    Show Warning
                </Button>
                <Button onClick={handleInfo} variant="ghost">
                    Show Info
                </Button>
                <Button onClick={handleCustomToast} variant="secondary">
                    Custom Toast
                </Button>
            </div>
        </div>
    )
}

/**
 * Example 4: Using common toast messages
 */
export function CommonToastExamples() {
    const handleSave = async () => {
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000))
            ToastMessages.saved()
        } catch (error) {
            ToastMessages.error('Failed to save')
        }
    }

    const handleCreate = async () => {
        try {
            await new Promise(resolve => setTimeout(resolve, 1000))
            ToastMessages.created('Project')
        } catch (error) {
            ToastMessages.error()
        }
    }

    const handleCopy = () => {
        navigator.clipboard.writeText('Copied text')
        ToastMessages.copied()
    }

    return (
        <div className="space-y-4 p-6">
            <h2 className="text-xl font-bold">Common Toast Messages</h2>
            <div className="flex gap-2">
                <Button onClick={handleSave}>Save</Button>
                <Button onClick={handleCreate}>Create</Button>
                <Button onClick={handleCopy}>Copy</Button>
            </div>
        </div>
    )
}

/**
 * Example 5: Using retry logic with exponential backoff
 */
export function RetryExample() {
    const { execute, isLoading, error, data } = useRetry<{ message: string }>()

    const handleFetchWithRetry = async () => {
        try {
            await execute(async () => {
                // Simulate API call that might fail
                const random = Math.random()
                if (random < 0.7) {
                    throw new Error('Network error')
                }
                return { message: 'Success!' }
            })

            showSuccessToast('Success', 'Data fetched successfully')
        } catch (err) {
            showErrorToast('Failed', 'Failed to fetch data after 3 retries')
        }
    }

    return (
        <div className="space-y-4 p-6">
            <h2 className="text-xl font-bold">Retry with Exponential Backoff</h2>
            <Button onClick={handleFetchWithRetry} disabled={isLoading}>
                {isLoading ? 'Retrying...' : 'Fetch Data (70% fail rate)'}
            </Button>
            {error && (
                <div className="text-red-600">Error: {error.message}</div>
            )}
            {data && (
                <div className="text-green-600">Data: {data.message}</div>
            )}
        </div>
    )
}

/**
 * Example 6: Component that throws an error (for testing error boundary)
 */
function BuggyComponent() {
    const [shouldThrow, setShouldThrow] = React.useState(false)

    if (shouldThrow) {
        throw new Error('This is a test error from BuggyComponent')
    }

    return (
        <div className="p-6 border rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Buggy Component</h3>
            <p className="mb-4">Click the button to trigger an error</p>
            <Button onClick={() => setShouldThrow(true)} variant="accent">
                Throw Error
            </Button>
        </div>
    )
}

/**
 * Example 7: Testing error boundary with buggy component
 */
export function ErrorBoundaryExample() {
    return (
        <div className="space-y-4 p-6">
            <h2 className="text-xl font-bold">Error Boundary Example</h2>
            <ContentErrorBoundary>
                <BuggyComponent />
            </ContentErrorBoundary>
        </div>
    )
}

/**
 * Example 8: API call with error handling and toast notifications
 */
export function ApiCallExample() {
    const [isLoading, setIsLoading] = React.useState(false)

    const handleApiCall = async () => {
        setIsLoading(true)

        try {
            // Show loading toast
            const loadingToastId = showInfoToast('Loading', 'Fetching data...', 0)

            // Simulate API call
            await new Promise((resolve, reject) => {
                setTimeout(() => {
                    Math.random() > 0.5 ? resolve('success') : reject(new Error('API Error'))
                }, 2000)
            })

            // Success
            showSuccessToast('Success', 'Data fetched successfully')
        } catch (error) {
            // Error
            showErrorToast('Error', (error as Error).message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="space-y-4 p-6">
            <h2 className="text-xl font-bold">API Call with Toast Feedback</h2>
            <Button onClick={handleApiCall} disabled={isLoading}>
                {isLoading ? 'Loading...' : 'Make API Call (50% fail rate)'}
            </Button>
        </div>
    )
}

/**
 * Example 9: Complete dashboard integration
 * 
 * This shows how to integrate error boundaries and toasts in a real dashboard component
 */
export function DashboardIntegrationExample() {
    return (
        <DashboardErrorBoundary>
            <div className="space-y-6 p-6">
                <h1 className="text-2xl font-bold">Dashboard</h1>

                {/* Metrics Section with Error Boundary */}
                <ContentErrorBoundary>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <MetricCard title="Total Projects" value="24" />
                        <MetricCard title="Active Experiments" value="12" />
                        <MetricCard title="Collaborations" value="8" />
                    </div>
                </ContentErrorBoundary>

                {/* Projects Section with Error Boundary */}
                <ContentErrorBoundary>
                    <div className="border rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4">Recent Projects</h2>
                        <p>Project list content...</p>
                    </div>
                </ContentErrorBoundary>

                {/* Experiments Section with Error Boundary */}
                <ContentErrorBoundary>
                    <div className="border rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4">Running Experiments</h2>
                        <p>Experiment list content...</p>
                    </div>
                </ContentErrorBoundary>
            </div>
        </DashboardErrorBoundary>
    )
}

function MetricCard({ title, value }: { title: string; value: string }) {
    return (
        <div className="border rounded-lg p-4">
            <div className="text-sm text-gray-600">{title}</div>
            <div className="text-2xl font-bold">{value}</div>
        </div>
    )
}

/**
 * INTEGRATION CHECKLIST:
 * 
 * 1. Wrap your dashboard page with DashboardErrorBoundary
 * 2. Wrap individual content sections with ContentErrorBoundary
 * 3. Add Toaster component to your root layout
 * 4. Use toast notifications for user feedback
 * 5. Use retry logic for API calls that might fail
 * 6. Test error boundaries by throwing errors in components
 * 7. Test toast notifications with different variants
 * 8. Ensure accessibility with screen readers
 */
