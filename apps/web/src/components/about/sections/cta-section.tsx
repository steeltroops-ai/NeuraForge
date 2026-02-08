'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/design-system-button'
import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs'
import { ArrowRight } from 'lucide-react'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

export default function CTASection() {
  return (
    <motion.section 
      className="bg-gradient-to-r from-[var(--color-primary-600)] to-[var(--color-primary-800)]"
      style={{
        paddingTop: 'var(--space-24)',
        paddingBottom: 'var(--space-24)'
      }}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      variants={fadeInUp}
    >
      <div
        className="max-w-7xl mx-auto"
        style={{
          paddingLeft: 'var(--space-4)',
          paddingRight: 'var(--space-4)'
        }}
      >
        <div className="text-center">
          <h2
            className="font-bold text-white"
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              marginBottom: 'var(--space-6)'
            }}
          >
            Join the Research Revolution
          </h2>
          <p
            className="max-w-3xl mx-auto text-purple-100"
            style={{
              fontSize: 'var(--font-size-xl)',
              marginBottom: 'var(--space-8)'
            }}
          >
            Be part of the community that's redefining how breakthrough discoveries happen. From climate solutions to medical breakthroughs, your research could change the world.
          </p>
          <div 
            className="flex flex-col sm:flex-row justify-center"
            style={{ gap: 'var(--space-4)' }}
          >
            <SignedOut>
              <SignInButton mode="modal" forceRedirectUrl="/dashboard/research">
                <Button variant="secondary" size="xl" rightIcon={<ArrowRight className="w-5 h-5" />}>
                  Start Research
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Button variant="secondary" size="xl" rightIcon={<ArrowRight className="w-5 h-5" />} asChild>
                <a href="/dashboard/research">
                  Continue Research
                </a>
              </Button>
            </SignedIn>
            <Button variant="ghost" size="xl" asChild className="text-white border-white hover:bg-white hover:text-[var(--color-primary-600)]">
              <a href="mailto:team@neuraforge.ai">
                Contact Us
              </a>
            </Button>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
