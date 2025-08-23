'use client'

import { Users, Globe, Cpu, Award } from 'lucide-react'

const collaborationFeatures = [
  {
    icon: Users,
    title: 'Global Research Network',
    description: 'Connect with researchers worldwide in a decentralized ecosystem that breaks down geographical barriers.'
  },
  {
    icon: Globe,
    title: 'Real-time Collaboration',
    description: 'Work together on complex problems with instant synchronization and shared research environments.'
  },
  {
    icon: Cpu,
    title: 'AI-Human Partnership',
    description: 'Leverage the combined power of human creativity and artificial intelligence for breakthrough discoveries.'
  },
  {
    icon: Award,
    title: 'Merit-based Rewards',
    description: 'Earn recognition and rewards based on the quality and impact of your research contributions.'
  }
]

export function CollaborationSection() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-sm font-semibold text-purple-600 uppercase tracking-wide mb-4">
            Collaboration
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
            Research Without Boundaries
          </h3>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join a global community of researchers, scientists, and AI systems working together 
            to solve humanity&apos;s most pressing challenges through collaborative innovation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {collaborationFeatures.map((feature) => (
            <div key={feature.title} className="text-center group">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-6 group-hover:shadow-md transition-shadow duration-200">
                <feature.icon className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">
                {feature.title}
              </h4>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
