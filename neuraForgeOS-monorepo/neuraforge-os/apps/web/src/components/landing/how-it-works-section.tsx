'use client'

import { motion } from 'framer-motion'
import { CheckCircle, ArrowRight, Sparkles } from 'lucide-react'
import { NeuralCard, CardContent } from '@/components/ui/neural-card'

const steps = [
  {
    name: 'Create Your Project',
    description: 'Start by creating a new research project and defining your initial research question or hypothesis.',
    status: 'complete',
    gradient: 'from-neural-500 to-neural-600',
    delay: 0,
  },
  {
    name: 'Branch & Explore',
    description: 'Create branches to explore different hypotheses and approaches. Each branch maintains its own version history.',
    status: 'complete',
    gradient: 'from-quantum-500 to-quantum-600',
    delay: 0.1,
  },
  {
    name: 'AI-Powered Insights',
    description: 'Get intelligent suggestions for experiments, literature, and potential research directions from our AI assistant.',
    status: 'complete',
    gradient: 'from-processing-500 to-processing-600',
    delay: 0.2,
  },
  {
    name: 'Collaborate & Merge',
    description: 'Invite collaborators, work together in real-time, and merge successful research branches back to main.',
    status: 'complete',
    gradient: 'from-neural-400 to-quantum-500',
    delay: 0.3,
  },
]

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
}

const stepVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

const lineVariants = {
  hidden: { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
      delay: 0.5,
    },
  },
}

export function HowItWorksSection() {
  return (
    <section className="relative py-24 bg-surface-primary overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-surface-primary via-surface-secondary to-surface-primary" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(99,102,241,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.1),transparent_50%)]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-quantum-500/10 border border-quantum-500/20 mb-6">
            <Sparkles className="h-4 w-4 text-quantum-400 mr-2" />
            <span className="text-sm font-medium text-quantum-400 tracking-wide uppercase">
              Simple workflow
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6">
            How{' '}
            <span className="bg-gradient-to-r from-quantum-400 via-neural-400 to-processing-400 bg-clip-text text-transparent">
              NeuraForge OS
            </span>{' '}
            works
          </h2>

          <p className="text-lg md:text-xl leading-relaxed text-neutral-300 max-w-2xl mx-auto">
            Our intuitive workflow is designed to match how researchers naturally think and work,
            enhanced with AI-powered capabilities.
          </p>
        </motion.div>

        {/* Steps Timeline */}
        <div className="relative mx-auto max-w-4xl mt-8">
          {/* Connecting Line */}
          <motion.div
            variants={lineVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="absolute left-8 top-16 bottom-16 w-0.5 bg-gradient-to-b from-neural-500 via-quantum-500 to-processing-500 origin-top hidden lg:block"
          />

          {/* Steps Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-12"
          >
            {steps.map((step, stepIdx) => (
              <motion.div
                key={step.name}
                variants={stepVariants}
                className="relative"
              >
                <div className="flex items-start gap-8">
                  {/* Step Number & Icon */}
                  <div className="relative flex-shrink-0">
                    <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-neural-500/20 to-quantum-500/20 rounded-2xl border border-neural-500/30 backdrop-blur-sm">
                      <div className={`flex items-center justify-center w-10 h-10 bg-gradient-to-br ${step.gradient} rounded-xl`}>
                        <span className="text-white font-bold text-lg">{stepIdx + 1}</span>
                      </div>
                    </div>

                    {/* Connecting dot for mobile */}
                    <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-neural-400 rounded-full lg:hidden" />
                  </div>

                  {/* Step Content */}
                  <div className="flex-1 min-w-0">
                    <NeuralCard
                      variant="glass"
                      size="lg"
                      interactive
                      className="group hover:scale-[1.02] transition-all duration-300"
                    >
                      <CardContent>
                        <div className="flex items-start justify-between mb-4">
                          <h3 className="text-lg font-semibold text-white group-hover:text-neural-300 transition-colors duration-300">
                            {step.name}
                          </h3>
                          <CheckCircle className="h-6 w-6 text-neural-400 flex-shrink-0 ml-4" />
                        </div>

                        <p className="text-sm text-neutral-400 leading-relaxed group-hover:text-neutral-300 transition-colors duration-300 mb-4">
                          {step.description}
                        </p>

                        {/* Progress indicator */}
                        <div className="flex items-center text-sm text-neural-400">
                          <div className="w-2 h-2 bg-neural-400 rounded-full mr-2" />
                          <span>Step {stepIdx + 1} of {steps.length}</span>
                        </div>
                      </CardContent>
                    </NeuralCard>
                  </div>

                  {/* Arrow for larger screens */}
                  {stepIdx < steps.length - 1 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: step.delay + 0.3, duration: 0.4 }}
                      className="hidden xl:flex items-center justify-center w-12 h-12 bg-surface-glass backdrop-blur-sm rounded-full border border-white/10"
                    >
                      <ArrowRight className="h-5 w-5 text-neutral-400" />
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}