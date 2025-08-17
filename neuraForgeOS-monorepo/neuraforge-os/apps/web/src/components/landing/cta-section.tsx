'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Users, Zap } from 'lucide-react'
import { FuturisticButton } from '@/components/ui/futuristic-button'
import { NeuralCard, CardContent } from '@/components/ui/neural-card'

// Statistics data
const stats = [
  {
    value: '10K+',
    label: 'Active Researchers',
    icon: Users,
    gradient: 'from-neural-500 to-neural-600',
  },
  {
    value: '50K+',
    label: 'Research Projects',
    icon: Sparkles,
    gradient: 'from-quantum-500 to-quantum-600',
  },
  {
    value: '500+',
    label: 'Institutions',
    icon: Zap,
    gradient: 'from-processing-500 to-processing-600',
  },
  {
    value: '99.9%',
    label: 'Uptime',
    icon: ArrowRight,
    gradient: 'from-neural-400 to-quantum-500',
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

export function CTASection() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Neural Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-neural-600 via-quantum-600 to-processing-600" />
      <div className="absolute inset-0 bg-gradient-to-t from-surface-background/20 via-transparent to-surface-background/20" />

      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(255,255,255,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.1),transparent_50%)]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-4xl text-center"
        >
          {/* Main CTA Content */}
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-8">
              Ready to{' '}
              <span className="bg-gradient-to-r from-white via-neural-100 to-quantum-100 bg-clip-text text-transparent">
                revolutionize
              </span>{' '}
              your research?
            </h2>

            <p className="mx-auto max-w-2xl text-xl leading-relaxed text-white/90 mb-12">
              Join thousands of researchers who are already using NeuraForge OS to accelerate their discoveries.
              Start your free trial today and experience the future of research.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link href="/auth/register">
                <FuturisticButton
                  variant="glass"
                  size="xl"
                  rightIcon={<ArrowRight className="h-6 w-6" />}
                  glowEffect
                  className="min-w-[240px] bg-white/10 hover:bg-white/20 text-white border-white/20"
                >
                  Get started for free
                </FuturisticButton>
              </Link>

              <Link href="/contact">
                <FuturisticButton
                  variant="outline"
                  size="xl"
                  className="min-w-[200px] border-white/30 text-white hover:bg-white/10"
                >
                  Contact sales
                </FuturisticButton>
              </Link>
            </div>
          </div>

          {/* Statistics Section */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="relative"
          >
            {/* Divider */}
            <div className="relative mb-12">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20" />
              </div>
              <div className="relative flex justify-center">
                <div className="bg-gradient-to-r from-neural-600 via-quantum-600 to-processing-600 px-6 py-2 rounded-full">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div key={stat.label} variants={itemVariants}>
                  <NeuralCard
                    variant="glass"
                    size="md"
                    interactive
                    className="group hover:scale-105 transition-all duration-300 bg-white/5 border-white/10"
                  >
                    <CardContent>
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-4">
                          <div className={`flex items-center justify-center w-12 h-12 bg-gradient-to-br ${stat.gradient} rounded-xl shadow-lg`}>
                            <stat.icon className="h-6 w-6 text-white" />
                          </div>
                        </div>

                        <div className="text-3xl font-bold text-white mb-2 group-hover:text-neural-100 transition-colors duration-300">
                          {stat.value}
                        </div>

                        <div className="text-sm text-white/80 group-hover:text-white transition-colors duration-300">
                          {stat.label}
                        </div>
                      </div>
                    </CardContent>
                  </NeuralCard>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}