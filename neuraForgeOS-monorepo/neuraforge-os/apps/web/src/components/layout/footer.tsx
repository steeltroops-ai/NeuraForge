'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Cpu, Github, Twitter, Linkedin, Mail, ExternalLink } from 'lucide-react'
import { NeuralCard, CardContent } from '@/components/ui/neural-card'

const navigation = {
  product: [
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'API', href: '/api' },
    { name: 'Integrations', href: '/integrations' },
  ],
  company: [
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Careers', href: '/careers' },
    { name: 'Contact', href: '/contact' },
  ],
  resources: [
    { name: 'Documentation', href: '/docs' },
    { name: 'Help Center', href: '/help' },
    { name: 'Community', href: '/community' },
    { name: 'Status', href: '/status' },
  ],
  legal: [
    { name: 'Privacy', href: '/privacy' },
    { name: 'Terms', href: '/terms' },
    { name: 'Security', href: '/security' },
    { name: 'Cookies', href: '/cookies' },
  ],
}

const socialLinks = [
  { name: 'GitHub', href: '#', icon: Github },
  { name: 'Twitter', href: '#', icon: Twitter },
  { name: 'LinkedIn', href: '#', icon: Linkedin },
  { name: 'Email', href: 'mailto:hello@neuraforge.com', icon: Mail },
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

export function Footer() {
  return (
    <footer className="relative bg-surface-background border-t border-neutral-800" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>

      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-t from-surface-primary/50 to-surface-background" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(99,102,241,0.1),transparent_70%)]" />

      <div className="relative mx-auto max-w-7xl px-6 pb-8 pt-20 lg:px-8 lg:pt-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8"
        >
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="lg:col-span-4">
            <NeuralCard variant="glass" size="lg" className="h-full">
              <CardContent>
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-3 group mb-6">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-neural-500 to-quantum-500 rounded-xl blur opacity-20 group-hover:opacity-30 transition duration-300" />
                    <div className="relative bg-surface-glass backdrop-blur-xl rounded-xl p-3 border border-white/10">
                      <Cpu className="h-8 w-8 text-neural-400" />
                    </div>
                  </div>
                  <div>
                    <span className="text-2xl font-bold text-white">NeuraForge OS</span>
                    <div className="text-xs text-neural-400 tracking-wider uppercase">Research Platform</div>
                  </div>
                </Link>

                {/* Description */}
                <p className="text-neutral-300 leading-relaxed mb-8">
                  Revolutionizing research collaboration with AI-powered insights and version-controlled discovery trees.
                  Join the future of scientific discovery.
                </p>

                {/* Social Links */}
                <div className="flex space-x-4">
                  {socialLinks.map((social) => (
                    <Link
                      key={social.name}
                      href={social.href}
                      className="flex items-center justify-center w-10 h-10 bg-surface-glass backdrop-blur-sm rounded-xl border border-white/10 text-neutral-400 hover:text-neural-400 hover:border-neural-500/30 transition-all duration-300 group"
                    >
                      <social.icon className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                    </Link>
                  ))}
                </div>
              </CardContent>
            </NeuralCard>
          </motion.div>

          {/* Navigation Links */}
          <motion.div variants={itemVariants} className="lg:col-span-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {/* Product */}
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white mb-6 flex items-center">
                  <div className="w-2 h-2 bg-neural-400 rounded-full mr-2" />
                  Product
                </h3>
                <ul role="list" className="space-y-4">
                  {navigation.product.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm leading-6 text-neutral-400 hover:text-neural-300 transition-colors duration-300 flex items-center group"
                      >
                        {item.name}
                        <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company */}
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white mb-6 flex items-center">
                  <div className="w-2 h-2 bg-quantum-400 rounded-full mr-2" />
                  Company
                </h3>
                <ul role="list" className="space-y-4">
                  {navigation.company.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm leading-6 text-neutral-400 hover:text-quantum-300 transition-colors duration-300 flex items-center group"
                      >
                        {item.name}
                        <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Resources */}
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white mb-6 flex items-center">
                  <div className="w-2 h-2 bg-processing-400 rounded-full mr-2" />
                  Resources
                </h3>
                <ul role="list" className="space-y-4">
                  {navigation.resources.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm leading-6 text-neutral-400 hover:text-processing-300 transition-colors duration-300 flex items-center group"
                      >
                        {item.name}
                        <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white mb-6 flex items-center">
                  <div className="w-2 h-2 bg-neutral-400 rounded-full mr-2" />
                  Legal
                </h3>
                <ul role="list" className="space-y-4">
                  {navigation.legal.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm leading-6 text-neutral-400 hover:text-neutral-300 transition-colors duration-300 flex items-center group"
                      >
                        {item.name}
                        <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 pt-8 border-t border-neutral-800"
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-sm text-neutral-500">
              &copy; 2024 NeuraForge OS. All rights reserved. Built with ❤️ for researchers worldwide.
            </p>
            <div className="mt-4 md:mt-0 flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-xs text-neutral-500">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span>All systems operational</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}