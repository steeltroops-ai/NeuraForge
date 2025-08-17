import { 
  Cpu, 
  Workflow, 
  Orbit, 
  Zap, 
  Radar, 
  ShieldCheck,
  Network,
  Layers3,
  Atom
} from 'lucide-react'

const features = [
  {
    name: 'AI Research Assistant',
    description: 'Get intelligent suggestions for hypotheses, experiments, and literature discovery powered by advanced AI models.',
    icon: Cpu,
  },
  {
    name: 'Research Trees',
    description: 'Visualize and manage your research journey with branching hypotheses and version-controlled experiments.',
    icon: Workflow,
  },
  {
    name: 'Real-time Collaboration',
    description: 'Work together with researchers worldwide in real-time with live editing and instant synchronization.',
    icon: Orbit,
  },
  {
    name: 'Lightning Fast',
    description: 'Built for speed with modern architecture ensuring sub-second response times for all operations.',
    icon: Zap,
  },
  {
    name: 'Knowledge Discovery',
    description: 'Discover cross-domain connections and related research through semantic search and AI-powered insights.',
    icon: Radar,
  },
  {
    name: 'Enterprise Security',
    description: 'Bank-grade security with end-to-end encryption, GDPR compliance, and institutional SSO integration.',
    icon: ShieldCheck,
  },
]

export function FeaturesSection() {
  return (
    <section className="py-24 sm:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-primary-600">Everything you need</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Accelerate your research workflow
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            From hypothesis generation to publication, NeuraForge OS provides all the tools you need 
            to conduct cutting-edge research efficiently and collaboratively.
          </p>
        </div>
        
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <feature.icon className="h-5 w-5 flex-none text-primary-600" aria-hidden="true" />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}