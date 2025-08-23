'use client'

import Link from 'next/link'
import { Cpu, Stars, Orbit, Workflow } from 'lucide-react'
import { motion } from 'framer-motion'

interface AuthLayoutProps {
  children: React.ReactNode
  title: string
  subtitle: string
}

export function AuthLayout({ children, title: _title, subtitle: _subtitle }: AuthLayoutProps) {
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
    <div className="min-h-screen flex bg-gradient-to-br from-white via-primary-50/30 to-accent-50/20">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:flex-1 lg:flex-col lg:justify-center lg:px-12 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-neural-gradient opacity-90" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.05),transparent_50%)]" />
          
          {/* Floating Elements */}
          <motion.div
            variants={floatingVariants}
            animate="animate"
            className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"
          />
          <motion.div
            variants={floatingVariants}
            animate="animate"
            style={{ animationDelay: '2s' }}
            className="absolute top-40 right-20 w-32 h-32 bg-white/5 rounded-full blur-2xl"
          />
          <motion.div
            variants={floatingVariants}
            animate="animate"
            style={{ animationDelay: '4s' }}
            className="absolute bottom-20 left-1/4 w-24 h-24 bg-white/10 rounded-full blur-xl"
          />
        </div>

        <div className="relative z-10 mx-auto max-w-lg">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link href="/" className="flex items-center space-x-4 mb-12 group">
              <div className="relative">
                <div className="absolute -inset-2 bg-white/20 rounded-2xl blur group-hover:bg-white/30 transition duration-300" />
                <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-3 group-hover:bg-white/20 transition duration-300">
                  <Cpu className="h-8 w-8 text-white" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-white">NeuraForge OS</span>
                <span className="text-sm text-white/80">Research Platform</span>
              </div>
            </Link>
            
            <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
              AI-Native Research
              <span className="block text-white/90">Ecosystem</span>
            </h1>
            
            <p className="text-xl text-white/80 leading-relaxed mb-12">
              Transform your research with intelligent collaboration, version-controlled discovery trees, 
              and AI-powered insights that accelerate scientific breakthroughs.
            </p>
            
            <div className="space-y-6">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="flex items-center space-x-4 group"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:bg-white/20 transition duration-300">
                  <Orbit className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Real-time Collaboration</h3>
                  <p className="text-white/70 text-sm">Synchronized workspaces for global teams</p>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="flex items-center space-x-4 group"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:bg-white/20 transition duration-300">
                  <Stars className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">AI-Powered Insights</h3>
                  <p className="text-white/70 text-sm">Intelligent research suggestions and analysis</p>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="flex items-center space-x-4 group"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:bg-white/20 transition duration-300">
                  <Workflow className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Research Trees</h3>
                  <p className="text-white/70 text-sm">Version-controlled discovery workflows</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-12 relative">
        {/* Mobile Logo */}
        <div className="lg:hidden text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute -inset-1 bg-neural-gradient rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-300" />
              <div className="relative bg-white rounded-xl p-2 shadow-soft">
                <Cpu className="h-6 w-6 text-primary-600" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-secondary-900">NeuraForge OS</span>
              <span className="text-xs text-secondary-500 -mt-1">Research Platform</span>
            </div>
          </Link>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md mx-auto"
        >
          {children}
        </motion.div>
      </div>
    </div>
  )
}