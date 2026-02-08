'use client'

import React from 'react'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'
import { Button } from '@/components/ui/design-system-button'

interface ErrorBoundaryState {
    hasError: boolean
    error?: Error
    errorInfo?: React.ErrorInfo
}

interface ErrorBoundaryProps {
    children: React.ReactNode
    fallback?: React.ComponentType<{ error?: Error; resetError: () => void }>
    onError?: (error: Error, errorInfo: React.ErrorInfo) => void
}

/**
 * Base Error Boundary Component
 * Provides error catching and recovery functionality
 */
class BaseErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error }
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        // Log error to console
        console.error('ErrorBoundary caught an error:', error, errorInfo)

        // Store error info in state
        this.setState({ errorInfo })

        // Call custom error handler if provided
        if (this.props.onError) {
            this.props.onError(error, errorInfo)
        }

        // TODO: Send error to logging service (e.g., Sentry)
        // logErrorToService(error, errorInfo)
    }

    resetError = () => {
        this.setState({ hasError: false, error: undefined, errorInfo: undefined })
    }

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                const FallbackComponent = this.props.fallback
                return <FallbackComponent error={this.state.error} resetError={this.resetError} />
            }

            return <DefaultErrorFallback error={this.state.error} resetError={this.resetError} />
        }

        return this.props.children
    }
}

interface ErrorFallbackProps {
    error?: Error
    resetError: () => void
}

/**
 * Default Error Fallback UI
 * Generic error display with retry button
 */
function DefaultErrorFallback({ error, resetError }: ErrorFallbackProps) {
    return (
        <div className="flex flex-col items-center justify-center p-8 text-center border border-[var(--color-error-200)] rounded-lg bg-[var(--color-error-50)]">
            <AlertTriangle className="w-12 h-12 mb-4 text-[var(--color-error-500)]" />
            <h2 className="mb-2 text-lg font-semibold text-[var(--color-error-900)]">
                Something went wrong
            </h2>
            <p className="max-w-md mb-4 text-[var(--color-error-700)]">
                {error?.message || 'An unexpected error occurred while rendering this component.'}
            </p>
            <Button
                onClick={resetError}
                variant="outline"
                size="sm"
                leftIcon={<RefreshCw className="w-4 h-4" />}
            >
                Try again
            </Button>
        </div>
    )
}

/**
 * Dashboard Error Boundary
 * Wraps the entire dashboard layout with error recovery
 * 
 * Features:
 * - Full-page error fallback
 * - Retry button to reset error state
 * - Navigation to home page
 * - Error logging and reporting
 */
export function DashboardErrorBoundary({ children }: { children: React.ReactNode }) {
    const handleError = (error: Error, errorInfo: React.ErrorInfo) => {
        // Log to console in development
        if (process.env.NODE_ENV === 'development') {
            console.error('Dashboard Error:', error)
            console.error('Error Info:', errorInfo)
        }

        // TODO: Send to error tracking service
        // Example: Sentry.captureException(error, { contexts: { react: { componentStack: errorInfo.componentStack } } })
    }

    return (
        <BaseErrorBoundary
            onError={handleError}
            fallback={({ error, resetError }) => (
                <div className="flex items-center justify-center min-h-screen bg-[var(--color-background)]">
                    <div className="max-w-2xl p-8 mx-4 text-center border rounded-xl border-[var(--color-error-200)] bg-[var(--color-surface)] shadow-lg">
                        <div className="flex justify-center mb-6">
                            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-[var(--color-error-100)]">
                                <AlertTriangle className="w-10 h-10 text-[var(--color-error-600)]" />
                            </div>
                        </div>

                        <h1 className="mb-3 text-2xl font-bold text-[var(--color-text-primary)]">
                            Dashboard Error
                        </h1>

                        <p className="mb-2 text-[var(--color-text-secondary)]">
                            We encountered an unexpected error while loading the dashboard.
                        </p>

                        {error?.message && (
                            <div className="p-4 mb-6 text-sm text-left rounded-lg bg-[var(--color-error-50)] border border-[var(--color-error-200)]">
                                <p className="font-mono text-[var(--color-error-900)]">{error.message}</p>
                            </div>
                        )}

                        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                            <Button
                                onClick={resetError}
                                variant="primary"
                                size="md"
                                leftIcon={<RefreshCw className="w-4 h-4" />}
                            >
                                Try Again
                            </Button>

                            <Button
                                onClick={() => window.location.href = '/'}
                                variant="outline"
                                size="md"
                                leftIcon={<Home className="w-4 h-4" />}
                            >
                                Go to Home
                            </Button>
                        </div>

                        <p className="mt-6 text-sm text-[var(--color-text-tertiary)]">
                            If this problem persists, please contact support.
                        </p>
                    </div>
                </div>
            )}
        >
            {children}
        </BaseErrorBoundary>
    )
}

/**
 * Content Error Boundary
 * Wraps dashboard content areas with localized error recovery
 * 
 * Features:
 * - Inline error display
 * - Retry button to reset error state
 * - Doesn't break entire dashboard layout
 * - Suitable for content sections, cards, and widgets
 */
export function ContentErrorBoundary({ children }: { children: React.ReactNode }) {
    const handleError = (error: Error, errorInfo: React.ErrorInfo) => {
        // Log to console in development
        if (process.env.NODE_ENV === 'development') {
            console.error('Content Error:', error)
            console.error('Error Info:', errorInfo)
        }

        // TODO: Send to error tracking service
    }

    return (
        <BaseErrorBoundary
            onError={handleError}
            fallback={({ error, resetError }) => (
                <div className="flex flex-col items-center justify-center p-6 text-center border rounded-lg border-[var(--color-error-200)] bg-[var(--color-error-50)]">
                    <AlertTriangle className="w-10 h-10 mb-3 text-[var(--color-error-500)]" />

                    <h3 className="mb-2 text-base font-semibold text-[var(--color-error-900)]">
                        Failed to load content
                    </h3>

                    <p className="mb-4 text-sm text-[var(--color-error-700)]">
                        {error?.message || 'An error occurred while rendering this section.'}
                    </p>

                    <Button
                        onClick={resetError}
                        variant="outline"
                        size="sm"
                        leftIcon={<RefreshCw className="w-4 h-4" />}
                    >
                        Retry
                    </Button>
                </div>
            )}
        >
            {children}
        </BaseErrorBoundary>
    )
}

/**
 * Retry Logic with Exponential Backoff
 * Utility function for retrying failed operations
 * 
 * @param fn - Async function to retry
 * @param maxRetries - Maximum number of retry attempts (default: 3)
 * @param baseDelay - Base delay in milliseconds (default: 1000)
 * @returns Promise that resolves with the function result or rejects after max retries
 */
export async function retryWithExponentialBackoff<T>(
    fn: () => Promise<T>,
    maxRetries: number = 3,
    baseDelay: number = 1000
): Promise<T> {
    let lastError: Error

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
            return await fn()
        } catch (error) {
            lastError = error as Error

            // Don't retry on last attempt
            if (attempt === maxRetries) {
                break
            }

            // Calculate exponential backoff delay: baseDelay * 2^attempt
            const delay = baseDelay * Math.pow(2, attempt)

            // Add jitter (random 0-100ms) to prevent thundering herd
            const jitter = Math.random() * 100

            console.log(`Retry attempt ${attempt + 1}/${maxRetries} after ${delay + jitter}ms`)

            // Wait before retrying
            await new Promise(resolve => setTimeout(resolve, delay + jitter))
        }
    }

    throw lastError!
}

/**
 * Hook for using retry logic with exponential backoff
 * 
 * @example
 * const { execute, isLoading, error } = useRetry()
 * 
 * const handleFetch = async () => {
 *   await execute(async () => {
 *     const response = await fetch('/api/data')
 *     return response.json()
 *   })
 * }
 */
export function useRetry<T>() {
    const [isLoading, setIsLoading] = React.useState(false)
    const [error, setError] = React.useState<Error | null>(null)
    const [data, setData] = React.useState<T | null>(null)

    const execute = React.useCallback(
        async (fn: () => Promise<T>, maxRetries: number = 3, baseDelay: number = 1000) => {
            setIsLoading(true)
            setError(null)

            try {
                const result = await retryWithExponentialBackoff(fn, maxRetries, baseDelay)
                setData(result)
                return result
            } catch (err) {
                const error = err as Error
                setError(error)
                throw error
            } finally {
                setIsLoading(false)
            }
        },
        []
    )

    const reset = React.useCallback(() => {
        setIsLoading(false)
        setError(null)
        setData(null)
    }, [])

    return { execute, isLoading, error, data, reset }
}
