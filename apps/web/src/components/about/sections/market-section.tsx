'use client'

import { motion } from 'framer-motion'
import { DollarSign, TrendingUp, Target, Globe } from 'lucide-react'

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

const marketData = [
  {
    icon: Globe,
    value: '$47B',
    title: 'Total Addressable Market',
    description: 'Research Software, AI Infrastructure, and Scientific Collaboration Tools',
    color: 'text-green-600',
    bgColor: 'bg-green-100'
  },
  {
    icon: Target,
    value: '$13B',
    title: 'Serviceable Market',
    description: 'AI-native research platforms for academic institutions and enterprise R&D',
    color: 'text-green-600',
    bgColor: 'bg-green-100'
  },
  {
    icon: TrendingUp,
    value: '$640M',
    title: 'Obtainable Market',
    description: '5% market capture within 5 years across target segments',
    color: 'text-green-600',
    bgColor: 'bg-green-100'
  }
]

const growthMetrics = [
  {
    metric: '35%',
    label: 'Annual Market Growth',
    description: 'Research infrastructure market CAGR 2024-2029'
  },
  {
    metric: '2.5x',
    label: 'AI Research Investment',
    description: 'Expected growth in AI research funding by 2027'
  },
  {
    metric: '85%',
    label: 'Digital Transformation',
    description: 'Research institutions adopting cloud-native solutions'
  }
]

export default function MarketSection() {
  return (
    <motion.section
      className="bg-gradient-to-br from-green-50 to-emerald-50"
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
          <DollarSign
            className="mx-auto text-green-600"
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
            Market Opportunity
          </h2>
          <p
            className="max-w-3xl mx-auto text-[var(--color-text-secondary)]"
            style={{ fontSize: 'var(--font-size-xl)' }}
          >
            Positioned to capture significant market share in the rapidly growing research infrastructure space.
          </p>
        </motion.div>

        <div
          className="grid gap-8 md:grid-cols-3"
          style={{ marginBottom: 'var(--space-16)' }}
        >
          {marketData.map((market, index) => {
            const IconComponent = market.icon
            return (
              <motion.div
                key={index}
                className="text-center"
                variants={fadeInUp}
              >
                <div
                  className={`mx-auto ${market.bgColor} rounded-full flex items-center justify-center`}
                  style={{
                    width: 'var(--space-24)',
                    height: 'var(--space-24)',
                    marginBottom: 'var(--space-6)'
                  }}
                >
                  <IconComponent
                    className={market.color}
                    style={{
                      width: 'var(--space-12)',
                      height: 'var(--space-12)'
                    }}
                  />
                </div>
                <div
                  className="font-bold text-green-600"
                  style={{
                    fontSize: 'var(--font-size-3xl)',
                    marginBottom: 'var(--space-2)'
                  }}
                >
                  {market.value}
                </div>
                <h3
                  className="font-semibold text-[var(--color-text-primary)]"
                  style={{
                    fontSize: 'var(--font-size-xl)',
                    marginBottom: 'var(--space-2)'
                  }}
                >
                  {market.title}
                </h3>
                <p
                  className="text-[var(--color-text-secondary)]"
                  style={{ fontSize: 'var(--font-size-base)' }}
                >
                  {market.description}
                </p>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          className="bg-white rounded-2xl shadow-sm border border-green-200"
          style={{ padding: 'var(--space-8)' }}
          variants={fadeInUp}
        >
          <h3
            className="font-bold text-[var(--color-text-primary)] text-center"
            style={{
              fontSize: 'var(--font-size-2xl)',
              marginBottom: 'var(--space-8)'
            }}
          >
            Growth Projections & Market Dynamics
          </h3>
          <div className="grid gap-8 md:grid-cols-3">
            {growthMetrics.map((metric, index) => (
              <div key={index} className="text-center">
                <div
                  className="font-bold text-green-600"
                  style={{
                    fontSize: 'var(--font-size-3xl)',
                    marginBottom: 'var(--space-2)'
                  }}
                >
                  {metric.metric}
                </div>
                <h4
                  className="font-semibold text-[var(--color-text-primary)]"
                  style={{
                    fontSize: 'var(--font-size-lg)',
                    marginBottom: 'var(--space-1)'
                  }}
                >
                  {metric.label}
                </h4>
                <p
                  className="text-[var(--color-text-secondary)]"
                  style={{ fontSize: 'var(--font-size-sm)' }}
                >
                  {metric.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}
