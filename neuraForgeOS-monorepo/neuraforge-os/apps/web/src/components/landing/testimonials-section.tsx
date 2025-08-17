'use client'

import { motion } from 'framer-motion'
import { Quote, Star } from 'lucide-react'
import { NeuralCard, CardContent } from '@/components/ui/neural-card'

const testimonials = [
  {
    body: 'NeuraForge OS has revolutionized how our lab conducts research. The AI suggestions have led to breakthrough discoveries we never would have considered.',
    author: {
      name: 'Dr. Sarah Chen',
      handle: 'sarahchen',
      imageUrl: '/avatars/sarah-chen.jpg',
      title: 'Professor of Computer Science, MIT',
      initials: 'SC',
    },
    rating: 5,
    gradient: 'from-neural-500 to-neural-600',
  },
  {
    body: 'The collaborative features are incredible. We can work with researchers across the globe as if they were sitting right next to us.',
    author: {
      name: 'Prof. Michael Rodriguez',
      handle: 'mrodriguez',
      imageUrl: '/avatars/michael-rodriguez.jpg',
      title: 'Research Director, Stanford AI Lab',
      initials: 'MR',
    },
    rating: 5,
    gradient: 'from-quantum-500 to-quantum-600',
  },
  {
    body: 'Version control for research was something I never knew I needed. Now I can\'t imagine working without it.',
    author: {
      name: 'Dr. Emily Watson',
      handle: 'emilywatson',
      imageUrl: '/avatars/emily-watson.jpg',
      title: 'Senior Researcher, Google DeepMind',
      initials: 'EW',
    },
    rating: 5,
    gradient: 'from-processing-500 to-processing-600',
  },
]

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

export function TestimonialsSection() {
  return (
    <section className="relative py-32 bg-surface-background overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-surface-background via-surface-primary/30 to-surface-background" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.1),transparent_70%)]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl text-center mb-20"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-processing-500/10 border border-processing-500/20 mb-6">
            <Star className="h-4 w-4 text-processing-400 mr-2" />
            <span className="text-sm font-medium text-processing-400 tracking-wide uppercase">
              Testimonials
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
            Trusted by{' '}
            <span className="bg-gradient-to-r from-processing-400 via-neural-400 to-quantum-400 bg-clip-text text-transparent">
              leading researchers
            </span>
          </h2>

          <p className="text-xl leading-relaxed text-neutral-300 max-w-2xl mx-auto">
            See what researchers from top institutions are saying about NeuraForge OS and how it's transforming their work.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, testimonialIdx) => (
            <motion.div key={testimonialIdx} variants={cardVariants}>
              <NeuralCard
                variant="glass"
                size="lg"
                interactive
                glowEffect
                className="h-full group hover:scale-105 transition-all duration-300"
              >
                <CardContent>
                  {/* Quote Icon */}
                  <div className="relative mb-6">
                    <div className="absolute -inset-2 bg-gradient-to-r from-neural-500/20 to-quantum-500/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative flex items-center justify-center w-12 h-12 bg-surface-glass backdrop-blur-sm rounded-xl border border-white/10">
                      <Quote className="h-6 w-6 text-neural-400" />
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-neural-400 fill-current" />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <blockquote className="mb-8">
                    <p className="text-neutral-300 leading-relaxed group-hover:text-neutral-200 transition-colors duration-300 text-lg">
                      "{testimonial.body}"
                    </p>
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div className={`flex items-center justify-center w-12 h-12 bg-gradient-to-br ${testimonial.gradient} rounded-xl shadow-lg`}>
                      <span className="text-white font-semibold text-sm">
                        {testimonial.author.initials}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold text-white group-hover:text-neural-300 transition-colors duration-300">
                        {testimonial.author.name}
                      </div>
                      <div className="text-neutral-400 text-sm group-hover:text-neutral-300 transition-colors duration-300">
                        {testimonial.author.title}
                      </div>
                    </div>
                  </div>

                  {/* Hover Effect Indicator */}
                  <div className="absolute top-4 right-4 w-2 h-2 bg-processing-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </CardContent>
              </NeuralCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}