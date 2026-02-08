'use client'

import React, { createContext, useContext, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser, useAuth as useClerkAuth } from '@clerk/nextjs'
import {
  AuthContextType,
  User,
  SignInCredentials,
  SignUpCredentials
} from '@/types/auth'

// Helper function to convert Clerk user to our User type
const convertClerkUser = (clerkUser: {
  id: string;
  emailAddresses?: Array<{ emailAddress: string }>;
  fullName?: string | null;
  firstName?: string | null;
  imageUrl?: string;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}): User => {
  return {
    id: clerkUser.id,
    email: clerkUser.emailAddresses?.[0]?.emailAddress || '',
    name: clerkUser.fullName || clerkUser.firstName || 'User',
    role: 'Researcher', // Default role, could be customized based on user metadata
    avatar: clerkUser.imageUrl || '',
    createdAt: clerkUser.createdAt?.toISOString() || new Date().toISOString(),
    updatedAt: clerkUser.updatedAt?.toISOString() || new Date().toISOString()
  }
}

// Create Context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Auth Provider Component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user: clerkUser, isLoaded: clerkLoaded, isSignedIn } = useUser()
  const { signOut: clerkSignOut } = useClerkAuth()
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

  // Convert Clerk user to our User type
  const user = clerkUser ? convertClerkUser(clerkUser) : null

  const signIn = async (_credentials: SignInCredentials) => {
    // Clerk handles sign-in through its components, so this is mainly for compatibility
    setError('Please use the Sign In button to authenticate')
    throw new Error('Please use the Sign In button to authenticate')
  }

  const signUp = async (_credentials: SignUpCredentials) => {
    // Clerk handles sign-up through its components, so this is mainly for compatibility
    setError('Please use the Sign In button to create an account')
    throw new Error('Please use the Sign In button to create an account')
  }

  const signOut = async () => {
    try {
      await clerkSignOut()
      // Redirect to homepage after successful sign out
      router.push('/')
    } catch {
      setError('Sign out failed')
    }
  }

  const clearError = () => {
    setError(null)
  }

  const refreshAuth = async () => {
    // Clerk handles auth state automatically, so this is mainly for compatibility
    clearError()
  }

  const contextValue: AuthContextType = {
    user,
    isAuthenticated: isSignedIn || false,
    isLoading: !clerkLoaded,
    error,
    token: null, // Clerk manages tokens internally
    signIn,
    signUp,
    signOut,
    clearError,
    refreshAuth
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
