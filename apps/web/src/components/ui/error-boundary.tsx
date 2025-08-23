'use client'

import React from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'
import { Button } from './design-system-button'

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<{ error?: Error; resetError: () => void }>
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined })
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

function DefaultErrorFallback({ error, resetError }: ErrorFallbackProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center border border-red-200 rounded-lg bg-red-50">
      <AlertTriangle className="w-12 h-12 mb-4 text-red-500" />
      <h2 className="mb-2 text-lg font-semibold text-red-900">Something went wrong</h2>
      <p className="max-w-md mb-4 text-red-700">
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

// Specialized error boundary for the animated sphere
export function AnimatedSphereErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary
      fallback={({ resetError }) => (
        <div className="flex items-center justify-center w-full h-full border border-purple-200 rounded-lg bg-gradient-to-br from-purple-50 to-purple-100">
          <div className="p-6 text-center">
            <AlertTriangle className="w-8 h-8 mx-auto mb-3 text-purple-500" />
            <p className="mb-3 text-sm text-purple-700">Animation failed to load</p>
            <Button
              onClick={resetError}
              variant="ghost"
              size="sm"
              className="text-purple-600 hover:text-purple-700"
            >
              Retry
            </Button>
          </div>
        </div>
      )}
    >
      {children}
    </ErrorBoundary>
  )
}
