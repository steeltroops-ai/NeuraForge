import { CheckCircle } from 'lucide-react'

const steps = [
  {
    name: 'Create Your Project',
    description: 'Start by creating a new research project and defining your initial research question or hypothesis.',
    status: 'complete',
  },
  {
    name: 'Branch & Explore',
    description: 'Create branches to explore different hypotheses and approaches. Each branch maintains its own version history.',
    status: 'complete',
  },
  {
    name: 'AI-Powered Insights',
    description: 'Get intelligent suggestions for experiments, literature, and potential research directions from our AI assistant.',
    status: 'complete',
  },
  {
    name: 'Collaborate & Merge',
    description: 'Invite collaborators, work together in real-time, and merge successful research branches back to main.',
    status: 'complete',
  },
]

export function HowItWorksSection() {
  return (
    <section className="py-24 sm:py-32 bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-primary-600">Simple workflow</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            How NeuraForge OS works
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our intuitive workflow is designed to match how researchers naturally think and work, 
            enhanced with AI-powered capabilities.
          </p>
        </div>
        
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-2">
            {steps.map((step, stepIdx) => (
              <div key={step.name} className="relative flex gap-x-3">
                <div className="flex h-6 w-6 flex-none items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-primary-600" aria-hidden="true" />
                </div>
                <div className="flex-auto">
                  <h3 className="text-base font-semibold leading-7 text-gray-900">
                    <span className="text-primary-600 font-bold">{stepIdx + 1}.</span> {step.name}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}