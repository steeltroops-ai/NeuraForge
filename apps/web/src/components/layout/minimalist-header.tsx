'use client'

import { useState } from 'react'
import Link from 'next/link'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/design-system-button'


export function MinimalistHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navigation = [
    { name: 'About', href: '/about' },
    { name: 'Research', href: '/research' },
    { name: 'Docs', href: '/docs' },
    { name: 'Community', href: '/community' },
  ]

  return (
    <header
      className="fixed top-0 left-0 right-0 border-b border-[var(--color-border-subtle)] backdrop-blur-md"
      style={{
        zIndex: 'var(--z-index-fixed)',
        backgroundColor: 'var(--color-surface-overlay)'
      }}
    >
      <div
        className="mx-auto max-w-7xl"
        style={{
          paddingLeft: 'var(--space-4)',
          paddingRight: 'var(--space-4)'
        }}
      >
        <div
          className="flex items-center justify-between"
          style={{ height: 'var(--header-height)' }}
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center"
            style={{ gap: 'var(--space-2)' }}
          >
            <div
              className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-[var(--color-neutral-900)] to-[var(--color-neutral-600)]"
              style={{ borderRadius: 'var(--radius-lg)' }}
            >
              <div
                className="w-4 h-4 bg-[var(--color-neutral-0)]"
                style={{ borderRadius: 'var(--radius-sm)' }}
              />
            </div>
            <span
              className="font-bold text-[var(--color-text-primary)]"
              style={{ fontSize: 'var(--font-size-xl)' }}
            >
              NeuraForge
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="items-center hidden md:flex"
            style={{ gap: 'var(--space-8)' }}
          >
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="font-medium text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)]"
                style={{ transitionDuration: 'var(--duration-fast)' }}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Auth Buttons */}
          <div className="items-center hidden space-x-4 md:flex">
            <SignedOut>
              <SignInButton mode="modal">                
                <Button
                  variant="primary"
                  size="sm"
                >
                  Sign In
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
            className="p-2 text-[var(--color-text-secondary)] rounded-md md:hidden hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-elevated)] transition-colors"
            style={{ transitionDuration: 'var(--duration-fast)' }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div
            className="py-4 border-t border-[var(--color-border-subtle)] md:hidden"
          >
            <div className="flex flex-col" style={{ gap: 'var(--space-4)' }}>
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="font-medium text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)]"
                  style={{ transitionDuration: 'var(--duration-fast)' }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div
                className="flex flex-col pt-4 border-t border-[var(--color-border-subtle)]"
                style={{ gap: 'var(--space-2)' }}
              >
                <SignedOut>
                  <SignInButton mode="modal">
                    <Button variant="ghost" size="sm" fullWidth>
                      Sign In
                    </Button>
                  </SignInButton>
                  <SignInButton
                    mode="modal"
                    forceRedirectUrl="/dashboard/research"
                    signUpForceRedirectUrl="/dashboard/research"
                  >
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
                  <div className="flex items-center" style={{ gap: 'var(--space-2)' }}>
                    <UserButton
                      appearance={{
                        elements: {
                          avatarBox: "w-8 h-8"
                        }
                      }}
                    />
                    <span
                      className="text-sm text-[var(--color-text-secondary)]"
                      style={{ fontSize: 'var(--font-size-sm)' }}
                    >
                      Account
                    </span>
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
