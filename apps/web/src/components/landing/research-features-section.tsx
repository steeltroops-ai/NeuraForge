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
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {features.map((feature, index) => (
            <div key={feature.title} className="group">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors duration-200">
                    <feature.icon className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors duration-200">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {feature.description}
                  </p>
                  <Link 
                    href={feature.href}
                    className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium transition-colors duration-200"
                  >
                    Learn more
                    <ArrowRight className="ml-2 w-4 h-4" />
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
