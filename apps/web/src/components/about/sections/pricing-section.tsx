'use client'

import { motion } from 'framer-motion'
import { CreditCard, CheckCircle, Star, Zap, Building } from 'lucide-react'

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

const pricingTiers = [
  {
    name: 'Free',
    price: '$0',
    period: '/month',
    description: 'Perfect for individual researchers and students getting started',
    icon: Star,
    popular: false,
    features: [
      'Individual researcher account',
      'Basic AI research assistant',
      'Public research projects',
      'Community support',
      '5GB storage',
      'Basic collaboration tools'
    ],
    limitations: [
      'Limited to 3 active projects',
      'Basic AI model access',
      'Community support only'
    ],
    cta: 'Get Started Free',
    highlight: false
  },
  {
    name: 'Pro',
    price: '$49',
    period: '/month',
    description: 'Advanced features for professional researchers and small teams',
    icon: Zap,
    popular: true,
    features: [
      'Advanced AI research agents',
      'Private research labs',
      'Priority compute resources',
      'Advanced collaboration tools',
      '100GB storage',
      'Email support',
      'Research tree versioning',
      'Custom integrations',
      'Analytics dashboard'
    ],
    limitations: [
      'Up to 25 active projects',
      'Standard AI model access'
    ],
    cta: 'Start Pro Trial',
    highlight: true
  },
  {
    name: 'Enterprise',
    price: '$499',
    period: '/month',
    description: 'Full-scale solution for large research organizations',
    icon: Building,
    popular: false,
    features: [
      'Custom AI model training',
      'Enterprise compliance suite',
      'Dedicated support team',
      'Custom deployment options',
      'Unlimited storage',
      'Advanced security controls',
      'API access & integrations',
      'Custom branding',
      'SLA guarantees',
      'Training & onboarding'
    ],
    limitations: [],
    cta: 'Contact Sales',
    highlight: false
  }
]

export default function PricingSection() {
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
          <CreditCard
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
            Transparent Pricing Model
          </h2>
          <p
            className="max-w-3xl mx-auto text-[var(--color-text-secondary)]"
            style={{ fontSize: 'var(--font-size-xl)' }}
          >
            Flexible pricing designed to scale with your research needs, from individual researchers to enterprise organizations.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {pricingTiers.map((tier, index) => {
            const IconComponent = tier.icon
            return (
              <motion.div
                key={index}
                className={`bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 relative ${
                  tier.highlight
                    ? 'border-2 border-[var(--color-primary-500)] hover:-translate-y-2'
                    : 'border border-[var(--color-border-subtle)] hover:-translate-y-1'
                }`}
                style={{ padding: 'var(--space-8)' }}
                variants={fadeInUp}
              >
                {tier.popular && (
                  <div
                    className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[var(--color-primary-500)] text-white px-3 py-1 rounded-full text-xs font-medium"
                  >
                    Most Popular
                  </div>
                )}

                <div className="text-center" style={{ marginBottom: 'var(--space-6)' }}>
                  <IconComponent
                    className={tier.highlight ? 'text-[var(--color-primary-600)]' : 'text-gray-600'}
                    style={{
                      width: 'var(--space-12)',
                      height: 'var(--space-12)',
                      margin: '0 auto',
                      marginBottom: 'var(--space-4)'
                    }}
                  />
                  <h3
                    className="font-semibold text-[var(--color-text-primary)]"
                    style={{
                      fontSize: 'var(--font-size-xl)',
                      marginBottom: 'var(--space-2)'
                    }}
                  >
                    {tier.name}
                  </h3>
                  <div
                    className="font-bold text-[var(--color-text-primary)]"
                    style={{
                      fontSize: 'var(--font-size-3xl)',
                      marginBottom: 'var(--space-2)'
                    }}
                  >
                    {tier.price}
                    <span
                      className="text-sm font-normal text-[var(--color-text-secondary)]"
                    >
                      {tier.period}
                    </span>
                  </div>
                  <p
                    className="text-[var(--color-text-secondary)]"
                    style={{ fontSize: 'var(--font-size-sm)' }}
                  >
                    {tier.description}
                  </p>
                </div>

                <div style={{ marginBottom: 'var(--space-6)' }}>
                  <h4
                    className="font-medium text-[var(--color-text-primary)]"
                    style={{
                      fontSize: 'var(--font-size-sm)',
                      marginBottom: 'var(--space-3)'
                    }}
                  >
                    What's included:
                  </h4>
                  <ul className="space-y-2">
                    {tier.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-start"
                        style={{ fontSize: 'var(--font-size-sm)' }}
                      >
                        <CheckCircle
                          className="flex-shrink-0 text-green-600"
                          style={{
                            width: 'var(--space-4)',
                            height: 'var(--space-4)',
                            marginRight: 'var(--space-2)',
                            marginTop: '2px'
                          }}
                        />
                        <span className="text-[var(--color-text-secondary)]">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {tier.limitations.length > 0 && (
                  <div style={{ marginBottom: 'var(--space-6)' }}>
                    <h4
                      className="font-medium text-[var(--color-text-primary)]"
                      style={{
                        fontSize: 'var(--font-size-sm)',
                        marginBottom: 'var(--space-3)'
                      }}
                    >
                      Limitations:
                    </h4>
                    <ul className="space-y-1">
                      {tier.limitations.map((limitation, limitIndex) => (
                        <li
                          key={limitIndex}
                          className="flex items-start text-[var(--color-text-secondary)]"
                          style={{ fontSize: 'var(--font-size-xs)' }}
                        >
                          <span className="text-orange-500 mr-2 flex-shrink-0">•</span>
                          {limitation}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <button
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                    tier.highlight
                      ? 'bg-[var(--color-primary-600)] text-white hover:bg-[var(--color-primary-700)]'
                      : 'bg-gray-100 text-[var(--color-text-primary)] hover:bg-gray-200'
                  }`}
                  style={{ fontSize: 'var(--font-size-base)' }}
                >
                  {tier.cta}
                </button>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          className="text-center bg-gray-50 rounded-2xl"
          style={{
            marginTop: 'var(--space-16)',
            padding: 'var(--space-8)'
          }}
          variants={fadeInUp}
        >
          <h3
            className="font-bold text-[var(--color-text-primary)]"
            style={{
              fontSize: 'var(--font-size-xl)',
              marginBottom: 'var(--space-4)'
            }}
          >
            All Plans Include
          </h3>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex items-center justify-center">
              <CheckCircle
                className="text-green-600 mr-2"
                style={{
                  width: 'var(--space-5)',
                  height: 'var(--space-5)'
                }}
              />
              <span className="text-[var(--color-text-secondary)]">99.9% uptime SLA</span>
            </div>
            <div className="flex items-center justify-center">
              <CheckCircle
                className="text-green-600 mr-2"
                style={{
                  width: 'var(--space-5)',
                  height: 'var(--space-5)'
                }}
              />
              <span className="text-[var(--color-text-secondary)]">End-to-end encryption</span>
            </div>
            <div className="flex items-center justify-center">
              <CheckCircle
                className="text-green-600 mr-2"
                style={{
                  width: 'var(--space-5)',
                  height: 'var(--space-5)'
                }}
              />
              <span className="text-[var(--color-text-secondary)]">Regular backups</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}
