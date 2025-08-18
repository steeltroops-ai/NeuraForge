'use client'

import { Brain, Atom, Heart, Leaf, Calculator, Microscope, Cpu, Beaker } from 'lucide-react'

const innovationAreas = [
  {
    icon: Brain,
    title: 'Artificial Intelligence',
    description: 'Advancing machine learning, neural networks, and cognitive computing'
  },
  {
    icon: Atom,
    title: 'Quantum Computing',
    description: 'Exploring quantum algorithms and computational breakthroughs'
  },
  {
    icon: Heart,
    title: 'Medicine',
    description: 'Developing new treatments, drugs, and medical technologies'
  },
  {
    icon: Leaf,
    title: 'Environment',
    description: 'Addressing climate change and sustainability challenges'
  },
  {
    icon: Calculator,
    title: 'Mathematics',
    description: 'Solving complex mathematical problems and proofs'
  },
  {
    icon: Microscope,
    title: 'Material Science',
    description: 'Discovering new materials and their applications'
  },
  {
    icon: Cpu,
    title: 'Biotechnology',
    description: 'Advancing genetic engineering and synthetic biology'
  },
  {
    icon: Beaker,
    title: 'Chemistry',
    description: 'Developing new compounds and chemical processes'
  }
]

export function InnovationAreasSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-sm font-semibold text-purple-600 uppercase tracking-wide mb-4">
            Popular Initiatives
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
            Research Domains
          </h3>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            NeuraForge organizes Research Interest Points (RIPs) under broad initiatives like 
            artificial intelligence, quantum computing, and medicine, offering a diverse spectrum 
            of fields to drive innovation.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {innovationAreas.map((area, index) => (
            <div 
              key={area.title} 
              className="group p-6 bg-gray-50 rounded-2xl hover:bg-purple-50 transition-all duration-200 cursor-pointer border border-transparent hover:border-purple-100"
            >
              <div className="text-center">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mx-auto mb-4 group-hover:shadow-md transition-shadow duration-200">
                  <area.icon className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="text-sm font-semibold text-gray-900 mb-2">
                  {area.title}
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {area.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
