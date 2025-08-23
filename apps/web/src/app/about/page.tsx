import { Metadata } from 'next'
import { MinimalistHeader } from '@/components/layout/minimalist-header'
import {
  Network,
  Cpu,
  GitBranch,
  Microscope,
  Shield,
  Sparkles,
  Database,
  Workflow,
  TrendingUp,
  Lightbulb,
  Atom
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'About - NeuraForge OS | AI-Native Research Ecosystem',
  description: 'Learn about NeuraForge OS, the revolutionary AI-native research platform transforming how humanity tackles complex problems through collaborative intelligence.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <MinimalistHeader />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-purple-50 to-white">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="mb-6 text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
                About <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-800">NeuraForge OS</span>
              </h1>
              <p className="max-w-3xl mx-auto text-lg sm:text-xl text-gray-600 leading-relaxed">
                We&apos;re building the world&apos;s first AI-native research ecosystem that transforms how humanity approaches complex problems through collaborative intelligence and systematic knowledge creation.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-12 sm:py-16 lg:py-20">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:gap-16 lg:grid-cols-2">
              <div>
                <div className="flex items-center mb-6">
                  <Lightbulb className="w-8 h-8 text-purple-600 mr-3" />
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Our Mission</h2>
                </div>
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                  To democratize breakthrough research by creating the world&apos;s first AI-native ecosystem where human creativity meets machine intelligence. We&apos;re building the infrastructure that transforms isolated research into collaborative discovery, accelerating solutions to humanity&apos;s greatest challenges.
                </p>
              </div>
              <div>
                <div className="flex items-center mb-6">
                  <Sparkles className="w-8 h-8 text-purple-600 mr-3" />
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Our Vision</h2>
                </div>
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                  A future where every researcher has access to AI-powered insights, where knowledge flows freely across disciplines, and where the next breakthrough in medicine, climate science, or technology emerges from collaborative intelligence rather than isolated genius.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="mb-4 text-3xl sm:text-4xl font-bold text-gray-900">Revolutionary Research Infrastructure</h2>
              <p className="max-w-2xl mx-auto text-base sm:text-lg text-gray-600">
                Six core innovations that transform how research happens, from ideation to breakthrough discovery.
              </p>
            </div>

            <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="p-6 sm:p-8 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <Cpu className="w-12 h-12 text-purple-600 mb-4" />
                <h3 className="mb-3 text-lg sm:text-xl font-semibold text-gray-900">Neural Discovery Engine</h3>
                <p className="text-sm sm:text-base text-gray-600">
                  AI that learns from millions of research papers to suggest novel hypotheses, identify research gaps, and predict breakthrough opportunities before they become obvious.
                </p>
              </div>

              <div className="p-6 sm:p-8 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <Network className="w-12 h-12 text-purple-600 mb-4" />
                <h3 className="mb-3 text-lg sm:text-xl font-semibold text-gray-900">Quantum Collaboration</h3>
                <p className="text-sm sm:text-base text-gray-600">
                  Real-time research environments where teams across continents work as if they&apos;re in the same lab, with synchronized data, shared insights, and collective intelligence.
                </p>
              </div>

              <div className="p-6 sm:p-8 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <GitBranch className="w-12 h-12 text-purple-600 mb-4" />
                <h3 className="mb-3 text-lg sm:text-xl font-semibold text-gray-900">Hypothesis Evolution Trees</h3>
                <p className="text-sm sm:text-base text-gray-600">
                  Version control for ideas - track how hypotheses evolve, branch into new directions, and merge insights from multiple research paths with complete transparency.
                </p>
              </div>

              <div className="p-6 sm:p-8 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <Database className="w-12 h-12 text-purple-600 mb-4" />
                <h3 className="mb-3 text-lg sm:text-xl font-semibold text-gray-900">Living Knowledge Graphs</h3>
                <p className="text-sm sm:text-base text-gray-600">
                  Dynamic maps of human knowledge that reveal hidden connections between disciplines, automatically updating as new research emerges worldwide.
                </p>
              </div>

              <div className="p-6 sm:p-8 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <Microscope className="w-12 h-12 text-purple-600 mb-4" />
                <h3 className="mb-3 text-lg sm:text-xl font-semibold text-gray-900">Digital-Physical Bridge</h3>
                <p className="text-sm sm:text-base text-gray-600">
                  Seamless integration between computational research and physical experimentation, with AI orchestrating lab equipment and analyzing results in real-time.
                </p>
              </div>

              <div className="p-6 sm:p-8 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <Shield className="w-12 h-12 text-purple-600 mb-4" />
                <h3 className="mb-3 text-lg sm:text-xl font-semibold text-gray-900">Ethical AI Governance</h3>
                <p className="text-sm sm:text-base text-gray-600">
                  Built-in ethical frameworks that ensure research integrity, protect intellectual property, and maintain the highest standards of scientific rigor and transparency.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Innovation Pillars */}
        <section className="py-12 sm:py-16 lg:py-20">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="mb-4 text-3xl sm:text-4xl font-bold text-gray-900">Built by Visionaries</h2>
              <p className="max-w-2xl mx-auto text-base sm:text-lg text-gray-600">
                Three core disciplines converging to create the future of research collaboration and scientific discovery.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <div className="text-center group">
                <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Atom className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                </div>
                <h3 className="mb-3 text-lg sm:text-xl font-semibold text-gray-900">Research Scientists</h3>
                <p className="text-sm sm:text-base text-gray-600">
                  PhD researchers from MIT, Stanford, and Oxford who understand the pain points of modern research and envision a better way forward.
                </p>
              </div>

              <div className="text-center group">
                <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Workflow className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                </div>
                <h3 className="mb-3 text-lg sm:text-xl font-semibold text-gray-900">AI Architects</h3>
                <p className="text-sm sm:text-base text-gray-600">
                  Former Google DeepMind and OpenAI engineers building the next generation of AI systems specifically designed for scientific discovery.
                </p>
              </div>

              <div className="text-center group">
                <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform">
                  <TrendingUp className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                </div>
                <h3 className="mb-3 text-lg sm:text-xl font-semibold text-gray-900">Product Innovators</h3>
                <p className="text-sm sm:text-base text-gray-600">
                  Design leaders from Apple and Tesla who believe that powerful research tools should be as intuitive as consumer products.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-purple-600 to-purple-800">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="mb-6 text-3xl sm:text-4xl font-bold text-white">
                Join the Research Revolution
              </h2>
              <p className="max-w-2xl mx-auto mb-8 text-base sm:text-lg lg:text-xl text-purple-100">
                Be part of the community that&apos;s redefining how breakthrough discoveries happen. From climate solutions to medical breakthroughs, your research could change the world.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <a
                  href="/dashboard"
                  className="inline-flex items-center justify-center px-6 sm:px-8 py-3 text-base sm:text-lg font-medium text-purple-600 bg-white rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Start Research
                </a>
                <a
                  href="mailto:team@neuraforge.ai"
                  className="inline-flex items-center justify-center px-6 sm:px-8 py-3 text-base sm:text-lg font-medium text-white border-2 border-white rounded-lg hover:bg-white hover:text-purple-600 transition-colors"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
