'use client'

import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser
} from '@clerk/nextjs'
import { Button } from '@/components/ui/design-system-button'

export function ClerkAuthButtons() {
  return (
    <div className="flex items-center gap-4">
      <SignedOut>
        <SignInButton mode="modal">
          <Button variant="outline">
            Sign In
          </Button>
        </SignInButton>
        <SignUpButton mode="modal">
          <Button>
            Get Started
          </Button>
        </SignUpButton>
      </SignedOut>
      <SignedIn>
        <UserButton 
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: "w-8 h-8"
            }
          }}
        />
      </SignedIn>
    </div>
  )
}

export function ClerkUserInfo() {
  const { user, isLoaded } = useUser()

  if (!isLoaded) {
    return <div className="animate-pulse bg-gray-200 h-4 w-24 rounded"></div>
  }

  return (
    <SignedIn>
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">
          Welcome, {user?.firstName || user?.emailAddresses[0]?.emailAddress}
        </span>
      </div>
    </SignedIn>
  )
}
