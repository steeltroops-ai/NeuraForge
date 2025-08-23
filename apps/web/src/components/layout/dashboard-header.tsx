'use client'

import { useState } from 'react'
import Link from 'next/link'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/design-system-button'

export function DashboardHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navigation = [
    { name: 'About', href: '/about' },
    { name: 'Research', href: '/research' },
    { name: 'Docs', href: '/docs' },
    { name: 'Community', href: '/community' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Empty space where logo would be - keeps layout balanced */}
          <div className="w-8 h-8"></div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <SignedOut>
              <SignInButton mode="modal">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </SignInButton>
              <SignInButton mode="modal">
                <Button
                  variant="primary"
                  size="sm"
                >
                  Start Research
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8"
                  }
                }}
              />
            </SignedIn>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-100 flex flex-col space-y-2">
                <SignedOut>
                  <SignInButton mode="modal">
                    <Button variant="ghost" size="sm" fullWidth>
                      Sign In
                    </Button>
                  </SignInButton>
                  <SignInButton mode="modal">
                    <Button
                      variant="primary"
                      size="sm"
                      fullWidth
                    >
                      Start Research
                    </Button>
                  </SignInButton>
                </SignedOut>
                <SignedIn>
                  <div className="flex items-center space-x-2">
                    <UserButton
                      appearance={{
                        elements: {
                          avatarBox: "w-8 h-8"
                        }
                      }}
                    />
                    <span className="text-sm text-gray-600">Account</span>
                  </div>
                </SignedIn>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
