import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ProjectHeader } from '@/components/projects/project-header'
import { ResearchTree } from '@/components/research-tree/research-tree'
import { ProjectTabs } from '@/components/projects/project-tabs'
import { AIAssistant } from '@/components/ai/ai-assistant'

interface ProjectPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  // In a real app, you'd fetch the project data here
  return {
    title: `Project - NeuraForge OS`,
    description: 'Research project workspace',
  }
}

export default function ProjectPage({ params }: ProjectPageProps) {
  // In a real app, you'd validate the project ID and check permissions
  if (!params.id) {
    notFound()
  }

  return (
    <div className="h-full flex flex-col">
      <ProjectHeader projectId={params.id} />
      
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 flex flex-col">
          <div className="flex-1 p-6">
            <ResearchTree projectId={params.id} />
          </div>
          <div className="border-t bg-white">
            <ProjectTabs projectId={params.id} />
          </div>
        </div>
        
        <div className="w-80 border-l bg-gray-50 flex-shrink-0">
          <AIAssistant projectId={params.id} />
        </div>
      </div>
    </div>
  )
}