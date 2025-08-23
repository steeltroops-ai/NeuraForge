'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useUser } from '@clerk/nextjs'

interface ProtectedRouteProps {
  children: React.ReactNode
  redirectTo?: string
  fallback?: React.ReactNode
}

export function ProtectedRoute({
  children,
  redirectTo = '/',
  fallback
}: ProtectedRouteProps) {
  const { isSignedIn, isLoaded } = useUser()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      // Redirect to sign-in or specified redirect path
      router.push(redirectTo)
    }
  }, [isSignedIn, isLoaded, router, pathname, redirectTo])

  // Show loading state while checking authentication
  if (!isLoaded) {
    return (
      fallback || (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Checking authentication...</p>
          </div>
        </div>
      )
    )
  }

  // Don't render children if not authenticated (will redirect)
  if (!isSignedIn) {
    return null
  }

  // Render protected content
  return <>{children}</>
}

// Higher-order component for page-level protection
export function withAuth<P extends object>(
  Component: React.ComponentType<P>,
  options?: {
    redirectTo?: string
    fallback?: React.ReactNode
  }
) {
  return function AuthenticatedComponent(props: P) {
    return (
      <ProtectedRoute 
        redirectTo={options?.redirectTo} 
        fallback={options?.fallback}
      >
        <Component {...props} />
      </ProtectedRoute>
    )
  }
}

// Route guard for dashboard pages
export function DashboardRouteGuard({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute 
      redirectTo="/"
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center max-w-md mx-auto p-8">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Accessing Research Dashboard
            </h2>
            <p className="text-gray-600 mb-6">
              Please wait while we verify your authentication...
            </p>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <p className="text-sm text-purple-700">
                If you're not signed in, you'll be redirected to the homepage to sign in.
              </p>
            </div>
          </div>
        </div>
      }
    >
      {children}
    </ProtectedRoute>
  )
}
