'use client'

import React, { createContext, useContext, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore, type User } from './auth-store'
import { authService, type LoginRequest, type RegisterRequest } from './auth-service'

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, name: string) => Promise<void>
  logout: () => Promise<void>
  refreshToken: () => Promise<void>
  checkAuth: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { 
    user, 
    isLoading, 
    isAuthenticated, 
    setLoading, 
    clearAuth,
    accessToken,
    refreshToken: storedRefreshToken
  } = useAuthStore()

  // Initialize auth state on mount
  useEffect(() => {
    const initializeAuth = async () => {
      setLoading(true)
      
      try {
        // If we have tokens, try to get user profile
        if (accessToken && user) {
          // Verify token is still valid
          await authService.getProfile()
        } else if (storedRefreshToken) {
          // Try to refresh token
          await authService.refreshToken()
          await authService.getProfile()
        }
      } catch (error) {
        console.error('Auth initialization error:', error)
        // Clear invalid auth state
        clearAuth()
      } finally {
        setLoading(false)
      }
    }

    initializeAuth()
  }, []) // Only run on mount

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true)
    try {
      await authService.login({ email, password })
      router.push('/dashboard')
    } catch (error) {
      console.error('Login failed:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }, [router, setLoading])

  const register = useCallback(async (email: string, password: string, name: string) => {
    setLoading(true)
    try {
      await authService.register({ email, password, name })
      router.push('/dashboard')
    } catch (error) {
      console.error('Registration failed:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }, [router, setLoading])

  const logout = useCallback(async () => {
    setLoading(true)
    try {
      await authService.logout()
      router.push('/')
    } catch (error) {
      console.error('Logout error:', error)
      // Still redirect even if logout API fails
      router.push('/')
    } finally {
      setLoading(false)
    }
  }, [router, setLoading])

  const refreshTokenFn = useCallback(async () => {
    try {
      await authService.refreshToken()
    } catch (error) {
      console.error('Token refresh failed:', error)
      // Redirect to login on refresh failure
      router.push('/auth/login')
      throw error
    }
  }, [router])

  const checkAuth = useCallback(async () => {
    if (!isAuthenticated) {
      router.push('/auth/login')
      return
    }

    try {
      // Verify current session is valid
      await authService.getProfile()
    } catch (error) {
      console.error('Auth check failed:', error)
      // Try to refresh token
      try {
        await refreshTokenFn()
      } catch (refreshError) {
        // Refresh failed, redirect to login
        router.push('/auth/login')
      }
    }
  }, [isAuthenticated, router, refreshTokenFn])

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
    refreshToken: refreshTokenFn,
    checkAuth,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}