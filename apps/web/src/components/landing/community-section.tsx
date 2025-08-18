'use client'

import { SignedOut, SignInButton } from '@clerk/nextjs'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/design-system-button'

export function CommunitySection() {
  return (
    <section className="py-24 bg-gradient-to-br from-purple-600 to-purple-800">
      <div className="px-4 mx-auto text-center max-w-7xl sm:px-6 lg:px-8">
        <h2 className="mb-8 text-4xl font-bold text-white md:text-5xl">
          Join the NeuraForge Community
        </h2>
        <p className="max-w-3xl mx-auto mb-12 text-xl text-purple-100">
          Connect with thousands of researchers, scientists, and innovators who are 
          working together to solve humanity's most challenging problems.
        </p>

        <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
          <SignedOut>
            <SignInButton mode="modal">
              <Button
                variant="accent"
                size="xl"
                rightIcon={<ArrowRight className="w-5 h-5" />}
                className="bg-white text-primary-600 hover:bg-neutral-50"
              >
                Start Your Research Journey
              </Button>
            </SignInButton>
          </SignedOut>

          <Button
            variant="outline"
            size="xl"
            leftIcon={<MessageCircle className="w-5 h-5" />}
            className="text-white bg-transparent border-white/30 hover:bg-white/10"
            asChild
          >
            <a
              href="https://discord.gg/neuraforge"
              target="_blank"
              rel="noopener noreferrer"
            >
              Join Discord Community
            </a>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-8 mt-16 md:grid-cols-4">
          <div className="text-center">
            <div className="mb-2 text-3xl font-bold text-white md:text-4xl">
              10K+
            </div>
            <div className="text-sm tracking-wide text-purple-200 uppercase">
              Active Researchers
            </div>
          </div>
          <div className="text-center">
            <div className="mb-2 text-3xl font-bold text-white md:text-4xl">
              50K+
            </div>
            <div className="text-sm tracking-wide text-purple-200 uppercase">
              Research Projects
            </div>
          </div>
          <div className="text-center">
            <div className="mb-2 text-3xl font-bold text-white md:text-4xl">
              500+
            </div>
            <div className="text-sm tracking-wide text-purple-200 uppercase">
              Institutions
            </div>
          </div>
          <div className="text-center">
            <div className="mb-2 text-3xl font-bold text-white md:text-4xl">
              99.9%
            </div>
            <div className="text-sm tracking-wide text-purple-200 uppercase">
              Uptime
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
