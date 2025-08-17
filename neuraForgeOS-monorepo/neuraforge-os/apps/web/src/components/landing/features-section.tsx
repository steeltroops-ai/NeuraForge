'use client'

import { motion } from 'framer-motion'
import {
  Cpu,
  Workflow,
  Orbit,
  Zap,
  Radar,
  ShieldCheck
} from 'lucide-react'
import { NeuralCard, CardContent } from '@/components/ui/neural-card'

const features = [
  {
    name: 'AI Research Assistant',
    description: 'Get intelligent suggestions for hypotheses, experiments, and literature discovery powered by advanced AI models.',
    icon: Cpu,
    gradient: 'from-neural-500 to-neural-600',
    glowColor: 'neural',
  },
  {
    name: 'Research Trees',
    description: 'Visualize and manage your research journey with branching hypotheses and version-controlled experiments.',
    icon: Workflow,
    gradient: 'from-quantum-500 to-quantum-600',
    glowColor: 'quantum',
  },
  {
    name: 'Real-time Collaboration',
    description: 'Work together with researchers worldwide in real-time with live editing and instant synchronization.',
    icon: Orbit,
    gradient: 'from-processing-500 to-processing-600',
    glowColor: 'processing',
  },
  {
    name: 'Lightning Fast',
    description: 'Built for speed with modern architecture ensuring sub-second response times for all operations.',
    icon: Zap,
    gradient: 'from-neural-400 to-quantum-500',
    glowColor: 'neural',
  },
  {
    name: 'Knowledge Discovery',
    description: 'Discover cross-domain connections and related research through semantic search and AI-powered insights.',
    icon: Radar,
    gradient: 'from-quantum-400 to-processing-500',
    glowColor: 'quantum',
  },
  {
    name: 'Enterprise Security',
    description: 'Bank-grade security with end-to-end encryption, GDPR compliance, and institutional SSO integration.',
    icon: ShieldCheck,
    gradient: 'from-processing-400 to-neural-500',
    glowColor: 'processing',
  },
]

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

export function FeaturesSection() {
  return (
    <section className="relative py-32 bg-surface-background overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface-background via-surface-primary/50 to-surface-background" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.1),transparent_50%)]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl text-center mb-20"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-neural-500/10 border border-neural-500/20 mb-6">
            <span className="text-sm font-medium text-neural-400 tracking-wide uppercase">
              Everything you need
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
            Accelerate your{' '}
            <span className="bg-gradient-to-r from-neural-400 via-quantum-400 to-processing-400 bg-clip-text text-transparent">
              research workflow
            </span>
          </h2>

          <p className="text-xl leading-relaxed text-neutral-300 max-w-2xl mx-auto">
            From hypothesis generation to publication, NeuraForge OS provides all the tools you need
            to conduct cutting-edge research efficiently and collaboratively.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div key={feature.name} variants={itemVariants}>
              <NeuralCard
                variant="glass"
                size="lg"
                interactive
                glowEffect
                className="h-full group hover:scale-105 transition-all duration-300"
              >
                <CardContent>
                  {/* Icon Container */}
                  <div className="relative mb-8">
                    <div className="absolute -inset-2 bg-gradient-to-r from-neural-500/20 to-quantum-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className={`relative flex items-center justify-center w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl shadow-lg`}>
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-white group-hover:text-neural-300 transition-colors duration-300">
                      {feature.name}
                    </h3>

                    <p className="text-neutral-400 leading-relaxed group-hover:text-neutral-300 transition-colors duration-300">
                      {feature.description}
                    </p>
                  </div>

                  {/* Hover Effect Indicator */}
                  <div className="absolute bottom-4 right-4 w-2 h-2 bg-neural-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </CardContent>
              </NeuralCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}