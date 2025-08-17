import { Metadata } from 'next'
import { ProjectsHeader } from '@/components/projects/projects-header'
import { ProjectsList } from '@/components/projects/projects-list'
import { ProjectsFilters } from '@/components/projects/projects-filters'

export const metadata: Metadata = {
  title: 'Projects - NeuraForge OS',
  description: 'Manage your research projects',
}

export default function ProjectsPage() {
  return (
    <div className="space-y-8">
      <ProjectsHeader />
      
      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-64 flex-shrink-0">
          <ProjectsFilters />
        </aside>
        
        <main className="flex-1">
          <ProjectsList />
        </main>
      </div>
    </div>
  )
}