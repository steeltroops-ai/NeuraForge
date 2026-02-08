'use client'

import { motion } from 'framer-motion'
import { Brain, GitBranch, Network, Database, Zap, Microscope } from 'lucide-react'

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

const features = [
  {
    icon: Brain,
    title: 'AI Research Assistant',
    description: 'Literature summarization, hypothesis generation, and experimental design suggestions powered by advanced AI models trained on millions of research papers.'
  },
  {
    icon: GitBranch,
    title: 'Research Trees',
    description: 'Version-controlled research workflows with branching and merging for experimental paths, dependency tracking between research components.'
  },
  {
    icon: Network,
    title: 'Collaborative Workspaces',
    description: 'Real-time collaborative editing, shared document management, live chat and video integration, whiteboard and diagramming tools.'
  },
  {
    icon: Database,
    title: 'Knowledge Graphs',
    description: 'AI-built interactive knowledge graphs mapping linked ideas, experiments, and contributors with cross-domain pattern detection.'
  },
  {
    icon: Zap,
    title: 'Autonomous AI Agents',
    description: 'Specialized research agents for literature mining, data analysis, experiment monitoring, and automated report generation.'
  },
  {
    icon: Microscope,
    title: 'Physical Lab Integration',
    description: 'Future integration with physical research labs, IoT-connected equipment, remote experiment control, and real-time data synchronization.'
  }
]

export default function FeaturesSection() {
  return (
    <motion.section 
      className="bg-gray-50"
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
          <h2
            className="font-bold text-[var(--color-text-primary)]"
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              marginBottom: 'var(--space-4)'
            }}
          >
            Revolutionary Research Infrastructure
          </h2>
          <p
            className="max-w-3xl mx-auto text-[var(--color-text-secondary)]"
            style={{ fontSize: 'var(--font-size-xl)' }}
          >
            Six core innovations that transform how research happens, from ideation to breakthrough discovery.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <motion.div 
                key={index}
                className="bg-white rounded-xl shadow-sm border border-[var(--color-border-subtle)] hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                style={{ padding: 'var(--space-8)' }}
                variants={fadeInUp}
              >
                <IconComponent 
                  className="text-[var(--color-primary-600)]"
                  style={{
                    width: 'var(--space-12)',
                    height: 'var(--space-12)',
                    marginBottom: 'var(--space-4)'
                  }}
                />
                <h3 
                  className="font-semibold text-[var(--color-text-primary)]"
                  style={{
                    fontSize: 'var(--font-size-xl)',
                    marginBottom: 'var(--space-3)'
                  }}
                >
                  {feature.title}
                </h3>
                <p 
                  className="text-[var(--color-text-secondary)]"
                  style={{ fontSize: 'var(--font-size-base)' }}
                >
                  {feature.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </motion.section>
  )
}
