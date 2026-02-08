'use client'

import { motion } from 'framer-motion'
import { Users, GraduationCap, Brain, Briefcase, Award, BookOpen, Lightbulb } from 'lucide-react'

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

const teamCategories = [
  {
    icon: GraduationCap,
    title: 'Research Scientists',
    subtitle: 'PhD researchers from MIT, Stanford, and Oxford',
    description: 'Our research team brings deep domain expertise from the world\'s leading institutions, with firsthand experience in the challenges of modern scientific research.',
    credentials: [
      'PhD holders from top-tier research universities',
      'Published authors in Nature, Science, Cell',
      'Former researchers at CERN, NIH, NASA',
      'Expertise in AI, biology, physics, chemistry'
    ],
    achievements: [
      '150+ peer-reviewed publications',
      '25+ years combined research experience',
      'Contributors to breakthrough discoveries'
    ]
  },
  {
    icon: Brain,
    title: 'AI Architects',
    subtitle: 'Former Google DeepMind and OpenAI engineers',
    description: 'World-class AI engineers who have built the systems powering today\'s most advanced AI applications, now focused on scientific discovery.',
    credentials: [
      'Former engineers at Google DeepMind, OpenAI, Anthropic',
      'Architects of large-scale AI systems',
      'Experts in transformer models and agent systems',
      'PhD in Computer Science and Machine Learning'
    ],
    achievements: [
      'Built systems serving 1B+ users',
      'Contributed to GPT and Gemini development',
      'Published at NeurIPS, ICML, ICLR'
    ]
  },
  {
    icon: Briefcase,
    title: 'Product Innovators',
    subtitle: 'Design leaders from Apple and Tesla',
    description: 'Product visionaries who believe that powerful research tools should be as intuitive and delightful as the best consumer products.',
    credentials: [
      'Former design leads at Apple, Tesla, Stripe',
      'Creators of award-winning user experiences',
      'Experts in human-computer interaction',
      'Masters in Design and Psychology'
    ],
    achievements: [
      'Designed products used by 100M+ people',
      'Recipients of design excellence awards',
      'Pioneers in AI-human collaboration UX'
    ]
  }
]

export default function TeamSection() {
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
        className="mx-auto max-w-7xl"
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
          <Users
            className="mx-auto text-[var(--color-primary-600)]"
            style={{
              width: 'var(--space-16)',
              height: 'var(--space-16)',
              marginBottom: 'var(--space-6)'
            }}
          />
          <h2
            className="font-bold text-[var(--color-text-primary)]"
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              marginBottom: 'var(--space-6)'
            }}
          >
            Built by Visionaries
          </h2>
          <p
            className="max-w-3xl mx-auto text-[var(--color-text-secondary)]"
            style={{ fontSize: 'var(--font-size-xl)' }}
          >
            Three core disciplines converging to create the future of research collaboration and scientific discovery.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {teamCategories.map((category, index) => {
            const IconComponent = category.icon
            return (
              <motion.div
                key={index}
                className="bg-white rounded-xl shadow-sm border border-[var(--color-border-subtle)] hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                style={{ padding: 'var(--space-8)' }}
                variants={fadeInUp}
              >
                <div className="text-center group">
                  <div
                    className="mx-auto bg-gradient-to-br from-[var(--color-primary-500)] to-[var(--color-primary-600)] rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform"
                    style={{
                      width: 'var(--space-24)',
                      height: 'var(--space-24)',
                      marginBottom: 'var(--space-6)'
                    }}
                  >
                    <IconComponent
                      className="text-white"
                      style={{
                        width: 'var(--space-12)',
                        height: 'var(--space-12)'
                      }}
                    />
                  </div>
                  <h3
                    className="font-semibold text-[var(--color-text-primary)]"
                    style={{
                      fontSize: 'var(--font-size-xl)',
                      marginBottom: 'var(--space-2)'
                    }}
                  >
                    {category.title}
                  </h3>
                  <p
                    className="text-[var(--color-primary-600)] font-medium"
                    style={{
                      fontSize: 'var(--font-size-sm)',
                      marginBottom: 'var(--space-4)'
                    }}
                  >
                    {category.subtitle}
                  </p>
                  <p
                    className="text-[var(--color-text-secondary)] text-left"
                    style={{
                      fontSize: 'var(--font-size-base)',
                      marginBottom: 'var(--space-6)'
                    }}
                  >
                    {category.description}
                  </p>
                </div>

                <div style={{ marginBottom: 'var(--space-4)' }}>
                  <h4
                    className="font-medium text-[var(--color-text-primary)] flex items-center"
                    style={{
                      fontSize: 'var(--font-size-sm)',
                      marginBottom: 'var(--space-3)'
                    }}
                  >
                    <BookOpen
                      className="mr-2"
                      style={{
                        width: 'var(--space-4)',
                        height: 'var(--space-4)'
                      }}
                    />
                    Credentials:
                  </h4>
                  <ul className="space-y-1">
                    {category.credentials.map((credential, credIndex) => (
                      <li
                        key={credIndex}
                        className="text-[var(--color-text-secondary)] flex items-start"
                        style={{ fontSize: 'var(--font-size-xs)' }}
                      >
                        <span className="text-[var(--color-primary-600)] mr-2 flex-shrink-0">•</span>
                        {credential}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4
                    className="font-medium text-[var(--color-text-primary)] flex items-center"
                    style={{
                      fontSize: 'var(--font-size-sm)',
                      marginBottom: 'var(--space-3)'
                    }}
                  >
                    <Award
                      className="mr-2"
                      style={{
                        width: 'var(--space-4)',
                        height: 'var(--space-4)'
                      }}
                    />
                    Achievements:
                  </h4>
                  <ul className="space-y-1">
                    {category.achievements.map((achievement, achIndex) => (
                      <li
                        key={achIndex}
                        className="text-[var(--color-text-secondary)] flex items-start"
                        style={{ fontSize: 'var(--font-size-xs)' }}
                      >
                        <span className="flex-shrink-0 mr-2 text-green-600">✓</span>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          className="text-center bg-[var(--color-primary-50)] rounded-2xl"
          style={{
            marginTop: 'var(--space-16)',
            padding: 'var(--space-8)'
          }}
          variants={fadeInUp}
        >
          <Lightbulb
            className="mx-auto text-[var(--color-primary-600)]"
            style={{
              width: 'var(--space-8)',
              height: 'var(--space-8)',
              marginBottom: 'var(--space-4)'
            }}
          />
          <h3
            className="font-bold text-[var(--color-text-primary)]"
            style={{
              fontSize: 'var(--font-size-xl)',
              marginBottom: 'var(--space-4)'
            }}
          >
            Our Mission-Driven Culture
          </h3>
          <p
            className="max-w-2xl mx-auto text-[var(--color-text-secondary)]"
            style={{ fontSize: 'var(--font-size-base)' }}
          >
            We're united by a shared belief that humanity's greatest challenges require unprecedented collaboration between human creativity and artificial intelligence. Every team member is committed to building tools that accelerate scientific breakthroughs and make research more accessible to brilliant minds worldwide.
          </p>
        </motion.div>
      </div>
    </motion.section>
  )
}
