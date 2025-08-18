import { auth, currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

/**
 * Server-side function to get the current user's authentication status
 * Use this in Server Components and API routes
 */
export async function getAuthUser() {
  const { userId } = await auth()
  
  if (!userId) {
    return null
  }

  const user = await currentUser()
  return user
}

/**
 * Server-side function to protect routes
 * Redirects to sign-in if user is not authenticated
 */
export async function requireAuth() {
  const { userId } = await auth()
  
  if (!userId) {
    redirect('/sign-in')
  }
  
  return userId
}

/**
 * Server-side function to get user ID
 * Returns null if not authenticated
 */
export async function getUserId() {
  const { userId } = await auth()
  return userId
}

/**
 * Server-side function to check if user is authenticated
 */
export async function isAuthenticated() {
  const { userId } = await auth()
  return !!userId
}
