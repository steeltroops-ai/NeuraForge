'use client'

import { motion } from 'framer-motion'
import { Shield, Lock, Eye, Scale, MapPin, FileCheck, UserCheck, Server } from 'lucide-react'

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

const securityFeatures = [
  {
    icon: Lock,
    title: 'End-to-End Encryption',
    description: 'AES-256 encryption for data at rest, TLS 1.3 in transit',
    details: [
      'Zero-knowledge architecture',
      'Client-side encryption keys',
      'Hardware security modules (HSM)',
      'Perfect forward secrecy'
    ]
  },
  {
    icon: Scale,
    title: 'Compliance Ready',
    description: 'GDPR, HIPAA, SOC2 Type II certification',
    details: [
      'SOC 2 Type II certified',
      'GDPR Article 32 compliant',
      'HIPAA Business Associate Agreement',
      'ISO 27001 framework alignment'
    ]
  },
  {
    icon: Eye,
    title: 'Audit Logging',
    description: 'Complete audit trails for all research activities',
    details: [
      'Immutable audit logs',
      'Real-time activity monitoring',
      'Compliance reporting tools',
      'Forensic investigation support'
    ]
  },
  {
    icon: MapPin,
    title: 'Data Residency',
    description: 'Configurable data location for international compliance',
    details: [
      'Multi-region data centers',
      'Data sovereignty controls',
      'Cross-border transfer safeguards',
      'Local jurisdiction compliance'
    ]
  }
]

const complianceCertifications = [
  {
    name: 'SOC 2 Type II',
    description: 'Security, availability, and confidentiality controls',
    status: 'Certified'
  },
  {
    name: 'GDPR',
    description: 'European data protection regulation compliance',
    status: 'Compliant'
  },
  {
    name: 'HIPAA',
    description: 'Healthcare information privacy and security',
    status: 'BAA Available'
  },
  {
    name: 'ISO 27001',
    description: 'Information security management system',
    status: 'In Progress'
  }
]

export default function SecuritySection() {
  return (
    <motion.section
      className="bg-gradient-to-br from-blue-50 to-indigo-50"
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
          <Shield
            className="mx-auto text-blue-600"
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
            Enterprise-Grade Security
          </h2>
          <p
            className="max-w-3xl mx-auto text-[var(--color-text-secondary)]"
            style={{ fontSize: 'var(--font-size-xl)' }}
          >
            Built with privacy-by-design principles and comprehensive compliance frameworks to protect your most sensitive research.
          </p>
        </motion.div>

        <div
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
          style={{ marginBottom: 'var(--space-16)' }}
        >
          {securityFeatures.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <motion.div
                key={index}
                className="bg-white rounded-xl shadow-sm border border-blue-200 hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                style={{ padding: 'var(--space-6)' }}
                variants={fadeInUp}
              >
                <div
                  className="mx-auto bg-blue-100 rounded-lg flex items-center justify-center"
                  style={{
                    width: 'var(--space-16)',
                    height: 'var(--space-16)',
                    marginBottom: 'var(--space-4)'
                  }}
                >
                  <IconComponent
                    className="text-blue-600"
                    style={{
                      width: 'var(--space-8)',
                      height: 'var(--space-8)'
                    }}
                  />
                </div>
                <h3
                  className="font-semibold text-[var(--color-text-primary)] text-center"
                  style={{
                    fontSize: 'var(--font-size-lg)',
                    marginBottom: 'var(--space-2)'
                  }}
                >
                  {feature.title}
                </h3>
                <p
                  className="text-[var(--color-text-secondary)] text-center"
                  style={{
                    fontSize: 'var(--font-size-sm)',
                    marginBottom: 'var(--space-4)'
                  }}
                >
                  {feature.description}
                </p>
                <ul className="space-y-1">
                  {feature.details.map((detail, detailIndex) => (
                    <li
                      key={detailIndex}
                      className="text-[var(--color-text-secondary)] flex items-start"
                      style={{ fontSize: 'var(--font-size-xs)' }}
                    >
                      <span className="text-blue-600 mr-2 flex-shrink-0">•</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          className="bg-white rounded-2xl shadow-sm border border-blue-200"
          style={{ padding: 'var(--space-8)' }}
          variants={fadeInUp}
        >
          <div className="flex items-center justify-center mb-6">
            <FileCheck
              className="text-blue-600 mr-3"
              style={{
                width: 'var(--space-8)',
                height: 'var(--space-8)'
              }}
            />
            <h3
              className="font-bold text-[var(--color-text-primary)]"
              style={{ fontSize: 'var(--font-size-2xl)' }}
            >
              Compliance Certifications
            </h3>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {complianceCertifications.map((cert, index) => (
              <div key={index} className="text-center">
                <div
                  className="font-bold text-blue-600"
                  style={{
                    fontSize: 'var(--font-size-lg)',
                    marginBottom: 'var(--space-2)'
                  }}
                >
                  {cert.name}
                </div>
                <p
                  className="text-[var(--color-text-secondary)]"
                  style={{
                    fontSize: 'var(--font-size-sm)',
                    marginBottom: 'var(--space-2)'
                  }}
                >
                  {cert.description}
                </p>
                <span
                  className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    cert.status === 'Certified' || cert.status === 'Compliant'
                      ? 'bg-green-100 text-green-800'
                      : cert.status === 'BAA Available'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {cert.status}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="text-center bg-blue-100 rounded-2xl"
          style={{
            marginTop: 'var(--space-12)',
            padding: 'var(--space-6)'
          }}
          variants={fadeInUp}
        >
          <UserCheck
            className="mx-auto text-blue-600"
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
              marginBottom: 'var(--space-3)'
            }}
          >
            Privacy-by-Design Architecture
          </h3>
          <p
            className="max-w-2xl mx-auto text-[var(--color-text-secondary)]"
            style={{ fontSize: 'var(--font-size-base)' }}
          >
            Every component of NeuraForge is built with privacy as a fundamental requirement, not an afterthought. We implement zero-trust security models, minimize data collection, and give users complete control over their research data.
          </p>
        </motion.div>
      </div>
    </motion.section>
  )
}
