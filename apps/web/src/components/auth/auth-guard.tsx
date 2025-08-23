'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

interface AuthGuardProps {
  children: React.ReactNode
  requireAuth?: boolean
  redirectTo?: string
}

export function AuthGuard({
  children,
  requireAuth = true,
  redirectTo = '/sign-in'
}: AuthGuardProps) {
  const { isSignedIn, isLoaded } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (isLoaded) {
      if (requireAuth && !isSignedIn) {
        router.push(redirectTo)
      } else if (!requireAuth && isSignedIn) {
        // Redirect authenticated users away from auth pages
        router.push('/dashboard')
      }
    }
  }, [isSignedIn, isLoaded, requireAuth, router, redirectTo])

  // Show loading spinner while checking auth
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-primary-50/30 to-accent-50/20">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mb-4" />
          <p className="text-secondary-600">Loading...</p>
        </div>
      </div>
    )
  }

  // Don't render children if auth requirements aren't met
  if (requireAuth && !isSignedIn) {
    return null
  }

  if (!requireAuth && isSignedIn) {
    return null
  }

  return <>{children}</>
}