'use client'

import { motion } from 'framer-motion'
import { Calendar, Rocket, Users, Building, Globe } from 'lucide-react'

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

const roadmapData = [
  {
    quarter: 'Q1',
    year: '2025',
    title: 'MVP Launch',
    icon: Rocket,
    status: 'current',
    description: 'Complete AI research assistant integration, launch real-time collaboration features, deploy basic research trees functionality.',
    features: [
      'AI-powered literature summarization',
      'Real-time collaborative editing',
      'Basic research tree structure',
      'User authentication & profiles'
    ],
    target: '500 beta users',
    completion: '75%'
  },
  {
    quarter: 'Q2',
    year: '2025',
    title: 'Feature Expansion',
    icon: Building,
    status: 'planned',
    description: 'Launch AI agent marketplace, implement advanced research trees, add enterprise security features.',
    features: [
      'AI agent marketplace',
      'Advanced research trees with branching',
      'Enterprise SSO integration',
      'Advanced analytics dashboard'
    ],
    target: '2,500 active users',
    completion: '0%'
  },
  {
    quarter: 'Q3',
    year: '2025',
    title: 'Enterprise Focus',
    icon: Users,
    status: 'planned',
    description: 'Deploy enterprise compliance features, launch partner integration program, implement advanced analytics.',
    features: [
      'GDPR/HIPAA compliance suite',
      'Partner API integrations',
      'Advanced user management',
      'Custom deployment options'
    ],
    target: '5,000 active users',
    completion: '0%'
  },
  {
    quarter: 'Q4',
    year: '2025',
    title: 'Physical Integration',
    icon: Globe,
    status: 'planned',
    description: 'Physical lab integration pilot, international expansion, advanced AI capabilities.',
    features: [
      'IoT lab equipment integration',
      'International data centers',
      'Advanced AI model training',
      'Mobile application launch'
    ],
    target: '10,000 active users',
    completion: '0%'
  }
]

export default function RoadmapSection() {
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
          <Calendar
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
            Development Roadmap
          </h2>
          <p
            className="max-w-3xl mx-auto text-[var(--color-text-secondary)]"
            style={{ fontSize: 'var(--font-size-xl)' }}
          >
            Our systematic approach to building the future of research collaboration.
          </p>
        </motion.div>

        <div style={{ gap: 'var(--space-8)' }} className="space-y-8">
          {roadmapData.map((phase, index) => {
            const IconComponent = phase.icon
            const isCurrentPhase = phase.status === 'current'

            return (
              <motion.div
                key={index}
                className="flex items-start"
                variants={fadeInUp}
              >
                <div
                  className={`flex-shrink-0 flex items-center justify-center font-bold text-white rounded-full ${
                    isCurrentPhase ? 'bg-[var(--color-primary-600)]' : 'bg-gray-400'
                  }`}
                  style={{
                    width: 'var(--space-12)',
                    height: 'var(--space-12)',
                    marginRight: 'var(--space-6)'
                  }}
                >
                  {phase.quarter}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <IconComponent
                      className={isCurrentPhase ? 'text-[var(--color-primary-600)]' : 'text-gray-500'}
                      style={{
                        width: 'var(--space-6)',
                        height: 'var(--space-6)'
                      }}
                    />
                    <h3
                      className="font-semibold text-[var(--color-text-primary)]"
                      style={{ fontSize: 'var(--font-size-xl)' }}
                    >
                      {phase.title} ({phase.year})
                    </h3>
                    {isCurrentPhase && (
                      <span
                        className="bg-[var(--color-primary-100)] text-[var(--color-primary-700)] px-2 py-1 rounded-full text-xs font-medium"
                      >
                        {phase.completion} Complete
                      </span>
                    )}
                  </div>
                  <p
                    className="text-[var(--color-text-secondary)]"
                    style={{
                      fontSize: 'var(--font-size-base)',
                      marginBottom: 'var(--space-4)'
                    }}
                  >
                    {phase.description}
                  </p>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h4
                        className="font-medium text-[var(--color-text-primary)]"
                        style={{
                          fontSize: 'var(--font-size-sm)',
                          marginBottom: 'var(--space-2)'
                        }}
                      >
                        Key Features:
                      </h4>
                      <ul className="space-y-1">
                        {phase.features.map((feature, featureIndex) => (
                          <li
                            key={featureIndex}
                            className="text-[var(--color-text-secondary)] flex items-start"
                            style={{ fontSize: 'var(--font-size-sm)' }}
                          >
                            <span className="text-[var(--color-primary-600)] mr-2">•</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div
                        className="font-medium text-[var(--color-primary-600)]"
                        style={{ fontSize: 'var(--font-size-sm)' }}
                      >
                        Target: {phase.target}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </motion.section>
  )
}
