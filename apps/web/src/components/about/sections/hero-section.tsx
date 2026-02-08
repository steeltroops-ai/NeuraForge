'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/design-system-button'
import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs'
import { ArrowRight } from 'lucide-react'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

export default function HeroSection() {
  return (
    <motion.section 
      className="bg-gradient-to-br from-[var(--color-primary-50)] to-[var(--color-surface)]"
      style={{
        paddingTop: 'var(--space-24)',
        paddingBottom: 'var(--space-24)'
      }}
      initial="initial"
      animate="animate"
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
          <motion.div
            className="font-semibold text-[var(--color-primary-600)] uppercase"
            style={{
              fontSize: 'var(--font-size-sm)',
              letterSpacing: 'var(--letter-spacing-wide)',
              marginBottom: 'var(--space-4)'
            }}
            variants={fadeInUp}
          >
            About NeuraForge
          </motion.div>
          <motion.h1 
            className="font-bold text-[var(--color-text-primary)]"
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              lineHeight: '1.1',
              marginBottom: 'var(--space-8)'
            }}
            variants={fadeInUp}
          >
            The Operating System for{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary-600)] to-[var(--color-primary-800)]">
              Collaborative Intelligence
            </span>
          </motion.h1>
          <motion.p 
            className="max-w-4xl mx-auto text-[var(--color-text-secondary)] leading-relaxed"
            style={{
              fontSize: 'var(--font-size-xl)',
              marginBottom: 'var(--space-12)'
            }}
            variants={fadeInUp}
          >
            NeuraForge is the world's first AI-agent-native research platform that enables seamless collaboration between human researchers and autonomous AI agents, accelerating humanity's progress on critical challenges.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row justify-center"
            style={{ gap: 'var(--space-4)' }}
            variants={fadeInUp}
          >
            <SignedOut>
              <SignInButton mode="modal" forceRedirectUrl="/dashboard/research">
                <Button variant="primary" size="xl" rightIcon={<ArrowRight className="w-5 h-5" />}>
                  Start Research
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Button variant="primary" size="xl" rightIcon={<ArrowRight className="w-5 h-5" />} asChild>
                <a href="/dashboard/research">
                  Continue Research
                </a>
              </Button>
            </SignedIn>
            <Button variant="secondary" size="xl" asChild>
              <a href="#problem">Learn More</a>
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
