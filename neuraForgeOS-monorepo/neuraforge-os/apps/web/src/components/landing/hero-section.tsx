'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/modern-button'
import { EnhancedCard } from '@/components/ui/modern-card'
import { 
  Cpu, 
  ArrowRight, 
  Zap, 
  Users, 
  GitBranch, 
  Stars, 
  Network, 
  Target,
  Atom,
  Orbit,
  Layers3,
  Workflow,
  Sparkles
} from 'lucide-react'
import { motion } from 'framer-motion'

export function HeroSection() {
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
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-primary-50/30 to-accent-50/20 py-24 sm:py-32">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient Mesh */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(14,165,233,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.08),transparent_50%)]" />
        
        {/* Floating Elements */}
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-primary-400/20 to-accent-400/20 rounded-full blur-xl"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: '2s' }}
          className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-br from-accent-400/15 to-primary-400/15 rounded-full blur-2xl"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: '4s' }}
          className="absolute bottom-20 left-1/4 w-24 h-24 bg-gradient-to-br from-primary-300/20 to-accent-300/20 rounded-full blur-xl"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-5xl text-center"
        >
          {/* Announcement Badge */}
          <motion.div variants={itemVariants} className="mb-8 flex justify-center">
            <div className="group relative">
              <div className="absolute -inset-1 bg-neural-gradient rounded-full blur opacity-25 group-hover:opacity-40 transition duration-300" />
              <div className="relative flex items-center space-x-2 rounded-full bg-white/80 backdrop-blur-sm px-4 py-2 text-sm font-medium text-secondary-700 ring-1 ring-secondary-200 hover:ring-primary-300 transition-all duration-300">
                <Sparkles className="h-4 w-4 text-primary-600" />
                <span>Introducing the future of research collaboration</span>
                <ArrowRight className="h-4 w-4 text-primary-600 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </motion.div>
          
          {/* Main Heading */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h1 className="text-5xl font-bold tracking-tight text-secondary-900 sm:text-7xl lg:text-8xl">
              <span className="block">AI-Native</span>
              <span className="block bg-neural-gradient bg-clip-text text-transparent">
                Research Ecosystem
              </span>
            </h1>
            
            <p className="mx-auto max-w-3xl text-xl leading-8 text-secondary-600 sm:text-2xl">
              Transform your research with AI-powered insights, collaborative workflows, and version-controlled discovery trees. 
              <span className="font-semibold text-primary-700">Join thousands of researchers</span> accelerating scientific breakthroughs.
            </p>
          </motion.div>
          
          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/auth/register">
              <Button 
                size="xl" 
                variant="gradient"
                className="group"
                rightIcon={<ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />}
              >
                Start Research Journey
              </Button>
            </Link>
            
            <Link href="#demo">
              <Button 
                variant="glass" 
                size="xl" 
                className="backdrop-blur-sm"
                leftIcon={<Zap className="h-5 w-5" />}
              >
                Watch Demo
              </Button>
            </Link>
          </motion.div>

          {/* Feature Cards */}
          <motion.div 
            variants={itemVariants}
            className="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-3"
          >
            <EnhancedCard variant="glass" className="group hover:scale-105 transition-all duration-300">
              <div className="p-6 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 shadow-glow">
                  <Cpu className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-secondary-900 mb-2">AI-Powered Insights</h3>
                <p className="text-sm text-secondary-600 leading-relaxed">
                  Generate hypotheses and discover patterns with advanced AI that learns from your research
                </p>
              </div>
            </EnhancedCard>
            
            <EnhancedCard variant="glass" className="group hover:scale-105 transition-all duration-300">
              <div className="p-6 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-500 to-accent-600 shadow-glow">
                  <Orbit className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-secondary-900 mb-2">Real-time Collaboration</h3>
                <p className="text-sm text-secondary-600 leading-relaxed">
                  Work together seamlessly with researchers worldwide in synchronized workspaces
                </p>
              </div>
            </EnhancedCard>
            
            <EnhancedCard variant="glass" className="group hover:scale-105 transition-all duration-300">
              <div className="p-6 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-success-500 to-success-600 shadow-glow">
                  <Workflow className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-secondary-900 mb-2">Version Control</h3>
                <p className="text-sm text-secondary-600 leading-relaxed">
                  Track every hypothesis and experiment with research trees that preserve all knowledge
                </p>
              </div>
            </EnhancedCard>
          </motion.div>

          {/* Stats */}
          <motion.div 
            variants={itemVariants}
            className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-4"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary-900">10K+</div>
              <div className="text-sm text-secondary-600">Active Researchers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary-900">50K+</div>
              <div className="text-sm text-secondary-600">Research Projects</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary-900">500+</div>
              <div className="text-sm text-secondary-600">Institutions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary-900">99.9%</div>
              <div className="text-sm text-secondary-600">Uptime</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}