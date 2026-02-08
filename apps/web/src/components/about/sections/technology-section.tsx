'use client'

import { motion } from 'framer-motion'
import { Code, Server, Brain, Lock } from 'lucide-react'

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

export default function TechnologySection() {
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
        className="max-w-7xl mx-auto"
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
          <Code 
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
              marginBottom: 'var(--space-4)'
            }}
          >
            Technology & Architecture
          </h2>
          <p
            className="max-w-3xl mx-auto text-[var(--color-text-secondary)]"
            style={{ fontSize: 'var(--font-size-xl)' }}
          >
            Built on modern, scalable technology stack designed for enterprise-grade performance and AI-native capabilities.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <motion.div className="text-center" variants={fadeInUp}>
            <div 
              className="mx-auto bg-[var(--color-primary-100)] rounded-lg flex items-center justify-center"
              style={{
                width: 'var(--space-16)',
                height: 'var(--space-16)',
                marginBottom: 'var(--space-4)'
              }}
            >
              <Code 
                className="text-[var(--color-primary-600)]"
                style={{
                  width: 'var(--space-8)',
                  height: 'var(--space-8)'
                }}
              />
            </div>
            <h3 
              className="font-semibold text-[var(--color-text-primary)]"
              style={{
                fontSize: 'var(--font-size-lg)',
                marginBottom: 'var(--space-2)'
              }}
            >
              Frontend
            </h3>
            <p 
              className="text-[var(--color-text-secondary)]"
              style={{ fontSize: 'var(--font-size-sm)' }}
            >
              Next.js 14, TypeScript, Tailwind CSS, Framer Motion
            </p>
          </motion.div>

          <motion.div className="text-center" variants={fadeInUp}>
            <div 
              className="mx-auto bg-[var(--color-primary-100)] rounded-lg flex items-center justify-center"
              style={{
                width: 'var(--space-16)',
                height: 'var(--space-16)',
                marginBottom: 'var(--space-4)'
              }}
            >
              <Server 
                className="text-[var(--color-primary-600)]"
                style={{
                  width: 'var(--space-8)',
                  height: 'var(--space-8)'
                }}
              />
            </div>
            <h3 
              className="font-semibold text-[var(--color-text-primary)]"
              style={{
                fontSize: 'var(--font-size-lg)',
                marginBottom: 'var(--space-2)'
              }}
            >
              Backend
            </h3>
            <p 
              className="text-[var(--color-text-secondary)]"
              style={{ fontSize: 'var(--font-size-sm)' }}
            >
              Fastify, PostgreSQL, Redis, Docker, Kubernetes
            </p>
          </motion.div>

          <motion.div className="text-center" variants={fadeInUp}>
            <div 
              className="mx-auto bg-[var(--color-primary-100)] rounded-lg flex items-center justify-center"
              style={{
                width: 'var(--space-16)',
                height: 'var(--space-16)',
                marginBottom: 'var(--space-4)'
              }}
            >
              <Brain 
                className="text-[var(--color-primary-600)]"
                style={{
                  width: 'var(--space-8)',
                  height: 'var(--space-8)'
                }}
              />
            </div>
            <h3 
              className="font-semibold text-[var(--color-text-primary)]"
              style={{
                fontSize: 'var(--font-size-lg)',
                marginBottom: 'var(--space-2)'
              }}
            >
              AI/ML
            </h3>
            <p 
              className="text-[var(--color-text-secondary)]"
              style={{ fontSize: 'var(--font-size-sm)' }}
            >
              Transformer models, Vector databases, Agent orchestration
            </p>
          </motion.div>

          <motion.div className="text-center" variants={fadeInUp}>
            <div 
              className="mx-auto bg-[var(--color-primary-100)] rounded-lg flex items-center justify-center"
              style={{
                width: 'var(--space-16)',
                height: 'var(--space-16)',
                marginBottom: 'var(--space-4)'
              }}
            >
              <Lock 
                className="text-[var(--color-primary-600)]"
                style={{
                  width: 'var(--space-8)',
                  height: 'var(--space-8)'
                }}
              />
            </div>
            <h3 
              className="font-semibold text-[var(--color-text-primary)]"
              style={{
                fontSize: 'var(--font-size-lg)',
                marginBottom: 'var(--space-2)'
              }}
            >
              Security
            </h3>
            <p 
              className="text-[var(--color-text-secondary)]"
              style={{ fontSize: 'var(--font-size-sm)' }}
            >
              Enterprise SSO, GDPR/HIPAA compliance, End-to-end encryption
            </p>
          </motion.div>
        </div>

        <motion.div 
          className="bg-gray-50 rounded-2xl"
          style={{
            marginTop: 'var(--space-16)',
            padding: 'var(--space-8)'
          }}
          variants={fadeInUp}
        >
          <h3 
            className="font-bold text-[var(--color-text-primary)] text-center"
            style={{
              fontSize: 'var(--font-size-2xl)',
              marginBottom: 'var(--space-6)'
            }}
          >
            Performance & Scale
          </h3>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="text-center">
              <div 
                className="font-bold text-[var(--color-primary-600)]"
                style={{
                  fontSize: 'var(--font-size-3xl)',
                  marginBottom: 'var(--space-2)'
                }}
              >
                &lt;1s
              </div>
              <p className="text-[var(--color-text-secondary)]">Page load time (95th percentile)</p>
            </div>
            <div className="text-center">
              <div 
                className="font-bold text-[var(--color-primary-600)]"
                style={{
                  fontSize: 'var(--font-size-3xl)',
                  marginBottom: 'var(--space-2)'
                }}
              >
                99.9%
              </div>
              <p className="text-[var(--color-text-secondary)]">Uptime availability target</p>
            </div>
            <div className="text-center">
              <div 
                className="font-bold text-[var(--color-primary-600)]"
                style={{
                  fontSize: 'var(--font-size-3xl)',
                  marginBottom: 'var(--space-2)'
                }}
              >
                10K+
              </div>
              <p className="text-[var(--color-text-secondary)]">Concurrent users supported</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}
