'use client'

import { ArrowRight, Brain, Zap, Network, Shield } from 'lucide-react'
import Link from 'next/link'


const features = [
  {
    icon: Brain,
    title: 'Research Interest Points',
    description: 'Research Interest Point (RIP) represents a precisely articulated scientific or research objective, designed to drive innovation in fields such as medicine, mathematics, or technology. Backed by community-staked rewards, RIPs incentivize groundbreaking advancements by offering substantial financial rewards upon successful resolution.',
    href: '/research-points'
  },
  {
    icon: Zap,
    title: 'AI-Powered Incentivization',
    description: 'NeuraForge incentivizes progress by rewarding both AI and human contributors for solving Research Interest Points (RIPs). Stakers direct rewards to RIPs, and solvers earn 50% of the emissions upon completion, with the rest benefiting nodes and stakers.',
    href: '/incentivization'
  },
  {
    icon: Network,
    title: 'Proof of Research',
    description: 'NeuraForge employs a "Proof of Research" mechanism where nodes validate the resolution of Research Interest Points (RIPs) by leveraging community-contributed data, solver proposals, and feedback from experts and AI systems.',
    href: '/proof-of-research'
  },
  {
    icon: Shield,
    title: 'Decentralized Validation',
    description: 'Nodes serve as the foundational layer of the NeuraForge network, ensuring the validation and integrity of data across all Research Interest Points (RIPs) while facilitating decentralized indexing for seamless search and retrieval.',
    href: '/validation'
  }
]

export function ResearchFeaturesSection() {
  return (
    <section
      className="bg-[var(--color-background)]"
      style={{
        paddingTop: 'var(--space-24)',
        paddingBottom: 'var(--space-24)'
      }}
    >
      <div
        className="max-w-7xl mx-auto"
        style={{
          paddingLeft: 'var(--space-4)',
          paddingRight: 'var(--space-4)'
        }}
      >
        <div
          className="grid grid-cols-1 lg:grid-cols-2"
          style={{ gap: 'var(--space-16)' }}
        >
          {features.map((feature) => (
            <div key={feature.title} className="group">
              <div
                className="flex items-start"
                style={{ gap: 'var(--space-4)' }}
              >
                <div className="flex-shrink-0">
                  <div
                    className="w-12 h-12 bg-[var(--color-primary-100)] flex items-center justify-center group-hover:bg-[var(--color-primary-200)] transition-colors"
                    style={{
                      borderRadius: 'var(--radius-lg)',
                      transitionDuration: 'var(--duration-fast)'
                    }}
                  >
                    <feature.icon className="w-6 h-6 text-[var(--color-primary-600)]" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3
                    className="font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-primary-600)] transition-colors"
                    style={{
                      fontSize: 'var(--font-size-xl)',
                      marginBottom: 'var(--space-4)',
                      transitionDuration: 'var(--duration-fast)'
                    }}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className="leading-relaxed text-[var(--color-text-secondary)]"
                    style={{ marginBottom: 'var(--space-6)' }}
                  >
                    {feature.description}
                  </p>
                  <Link
                    href={feature.href}
                    className="inline-flex items-center text-[var(--color-primary-600)] hover:text-[var(--color-primary-700)] font-medium transition-colors"
                    style={{ transitionDuration: 'var(--duration-fast)' }}
                  >
                    Learn more
                    <ArrowRight
                      className="w-4 h-4"
                      style={{ marginLeft: 'var(--space-2)' }}
                    />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
