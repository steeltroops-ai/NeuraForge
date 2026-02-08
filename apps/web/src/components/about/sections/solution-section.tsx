'use client'

import { motion } from 'framer-motion'
import { Target, Lightbulb, Sparkles, CheckCircle } from 'lucide-react'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function SolutionSection() {
  return (
    <motion.section 
      className="bg-[var(--color-surface)]"
      style={{
        paddingTop: 'var(--space-24)',
        paddingBottom: 'var(--space-24)'
      }}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      variants={staggerContainer}
    >
      <div
        className="mx-auto max-w-7xl"
        style={{
          paddingLeft: 'var(--space-4)',
          paddingRight: 'var(--space-4)'
        }}
      >
        <motion.div 
          className="text-center"
          style={{ marginBottom: 'var(--space-16)' }}
          variants={fadeInUp}
        >
          <Target 
            className="mx-auto text-[var(--color-primary-600)]"
            style={{
              width: 'var(--space-16)',
              height: 'var(--space-16)',
              marginBottom: 'var(--space-6)'
            }}
          />
          <h2
            className="font-bold text-[var(--color-text-primary)]"
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              marginBottom: 'var(--space-6)'
            }}
          >
            Our Solution: NeuraForge OS
          </h2>
          <p
            className="max-w-4xl mx-auto text-[var(--color-text-secondary)]"
            style={{ fontSize: 'var(--font-size-xl)' }}
          >
            The world's first AI-agent-native research operating system that enables seamless collaboration between human researchers and autonomous AI agents across distributed environments.
          </p>
        </motion.div>

        <div className="grid gap-12 lg:gap-16 lg:grid-cols-2">
          <motion.div variants={fadeInUp}>
            <div 
              className="flex items-center"
              style={{ marginBottom: 'var(--space-6)' }}
            >
              <Lightbulb 
                className="text-[var(--color-primary-600)]"
                style={{
                  width: 'var(--space-8)',
                  height: 'var(--space-8)',
                  marginRight: 'var(--space-3)'
                }}
              />
              <h3 
                className="font-bold text-[var(--color-text-primary)]"
                style={{ fontSize: 'var(--font-size-2xl)' }}
              >
                Mission Statement
              </h3>
            </div>
            <p 
              className="text-[var(--color-text-secondary)] leading-relaxed"
              style={{
                fontSize: 'var(--font-size-lg)',
                marginBottom: 'var(--space-6)'
              }}
            >
              To build the global brain for humanity's survival and advancement—an open, collaborative ecosystem relentlessly focused on solving the hardest, most important problems of our time.
            </p>
            <div style={{ gap: 'var(--space-3)' }} className="space-y-3">
              <div className="flex items-start">
                <CheckCircle 
                  className="flex-shrink-0 text-green-600"
                  style={{
                    width: 'var(--space-5)',
                    height: 'var(--space-5)',
                    marginRight: 'var(--space-3)',
                    marginTop: '2px'
                  }}
                />
                <span className="text-[var(--color-text-secondary)]">
                  Radical Openness: Default to open science while respecting privacy
                </span>
              </div>
              <div className="flex items-start">
                <CheckCircle 
                  className="flex-shrink-0 text-green-600"
                  style={{
                    width: 'var(--space-5)',
                    height: 'var(--space-5)',
                    marginRight: 'var(--space-3)',
                    marginTop: '2px'
                  }}
                />
                <span className="text-[var(--color-text-secondary)]">
                  Mission-Driven: Focus on impact, not individual recognition
                </span>
              </div>
              <div className="flex items-start">
                <CheckCircle 
                  className="flex-shrink-0 text-green-600"
                  style={{
                    width: 'var(--space-5)',
                    height: 'var(--space-5)',
                    marginRight: 'var(--space-3)',
                    marginTop: '2px'
                  }}
                />
                <span className="text-[var(--color-text-secondary)]">
                  Human-AI Symbiosis: Amplify human creativity with AI capabilities
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <div 
              className="flex items-center"
              style={{ marginBottom: 'var(--space-6)' }}
            >
              <Sparkles 
                className="text-[var(--color-primary-600)]"
                style={{
                  width: 'var(--space-8)',
                  height: 'var(--space-8)',
                  marginRight: 'var(--space-3)'
                }}
              />
              <h3 
                className="font-bold text-[var(--color-text-primary)]"
                style={{ fontSize: 'var(--font-size-2xl)' }}
              >
                Vision Statement
              </h3>
            </div>
            <p 
              className="text-[var(--color-text-secondary)] leading-relaxed"
              style={{
                fontSize: 'var(--font-size-lg)',
                marginBottom: 'var(--space-6)'
              }}
            >
              "Accelerating humanity to the next stage by breaking down silos in R&D and making frontier problem-solving open, fast, and collaborative."
            </p>
            <div 
              className="bg-[var(--color-primary-50)] rounded-lg"
              style={{ padding: 'var(--space-6)' }}
            >
              <h4 
                className="font-semibold text-[var(--color-text-primary)]"
                style={{ marginBottom: 'var(--space-3)' }}
              >
                We envision a future where:
              </h4>
              <ul 
                className="text-[var(--color-text-secondary)]"
                style={{ gap: 'var(--space-2)' }}
              >
                <li>• A climate scientist in Kenya co-develops breakthrough carbon capture with a materials engineer in Japan and an AI agent</li>
                <li>• Solutions accelerate from concept to deployment in months, not decades</li>
                <li>• Every researcher on Earth can contribute to solving humanity's greatest challenges</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
