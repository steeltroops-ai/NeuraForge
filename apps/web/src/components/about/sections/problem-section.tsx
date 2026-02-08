'use client'

import { motion } from 'framer-motion'
import { AlertTriangle } from 'lucide-react'

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

const problemStats = [
  {
    percentage: '85%',
    title: 'Research Duplication',
    description: 'Massive redundancy wastes $280B+ annually in duplicated efforts'
  },
  {
    percentage: '40%',
    title: 'Forgotten Knowledge',
    description: 'Research projects abandoned mid-stream, insights lost forever'
  },
  {
    percentage: '17yr',
    title: 'Slow Translation',
    description: 'Average time from discovery to real-world application'
  },
  {
    percentage: '70%',
    title: 'Access Barriers',
    description: 'Global researchers lack modern computational resources'
  }
]

export default function ProblemSection() {
  return (
    <motion.section 
      id="problem"
      className="bg-gradient-to-br from-red-50 to-orange-50"
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
          <AlertTriangle 
            className="mx-auto text-red-600"
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
            The Global Research Crisis
          </h2>
          <p
            className="max-w-3xl mx-auto text-[var(--color-text-secondary)]"
            style={{ fontSize: 'var(--font-size-xl)' }}
          >
            The current research ecosystem is fundamentally broken, costing humanity decades of progress on critical challenges.
          </p>
        </motion.div>

        <div 
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
          style={{ marginBottom: 'var(--space-12)' }}
        >
          {problemStats.map((stat, index) => (
            <motion.div key={index} className="text-center" variants={fadeInUp}>
              <div 
                className="mx-auto bg-red-100 rounded-full flex items-center justify-center"
                style={{
                  width: 'var(--space-20)',
                  height: 'var(--space-20)',
                  marginBottom: 'var(--space-4)'
                }}
              >
                <span 
                  className="font-bold text-red-600"
                  style={{ fontSize: stat.percentage === '17yr' ? 'var(--font-size-xl)' : 'var(--font-size-2xl)' }}
                >
                  {stat.percentage}
                </span>
              </div>
              <h3 
                className="font-semibold text-[var(--color-text-primary)]"
                style={{
                  fontSize: 'var(--font-size-lg)',
                  marginBottom: 'var(--space-2)'
                }}
              >
                {stat.title}
              </h3>
              <p 
                className="text-[var(--color-text-secondary)]"
                style={{ fontSize: 'var(--font-size-sm)' }}
              >
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div className="text-center" variants={fadeInUp}>
          <p 
            className="font-medium text-red-700"
            style={{ fontSize: 'var(--font-size-lg)' }}
          >
            <strong>Critical Impact:</strong> Climate change, pandemic response, and AI safety research are progressing too slowly due to these systemic inefficiencies.
          </p>
        </motion.div>
      </div>
    </motion.section>
  )
}
