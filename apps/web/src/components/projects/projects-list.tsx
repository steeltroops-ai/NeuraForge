import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { formatDate } from '@/lib/utils'
import { Layers3, Orbit, Clock, MoreHorizontal } from 'lucide-react'

// Mock data - in real app this would come from API
const projects = [
  {
    id: '1',
    title: 'AI Ethics in Healthcare',
    description: 'Investigating ethical implications of AI systems in medical diagnosis and treatment recommendations.',
    domain: 'Computer Science',
    status: 'active' as const,
    visibility: 'public' as const,
    updatedAt: new Date('2024-01-15'),
    collaborators: 3,
    branches: 5,
  },
  {
    id: '2',
    title: 'Quantum Computing Applications',
    description: 'Exploring quantum algorithms for optimization problems in logistics and supply chain management.',
    domain: 'Physics',
    status: 'active' as const,
    visibility: 'private' as const,
    updatedAt: new Date('2024-01-14'),
    collaborators: 2,
    branches: 3,
  },
  {
    id: '3',
    title: 'Climate Change Modeling',
    description: 'Advanced climate prediction models using machine learning and satellite data analysis.',
    domain: 'Environmental Science',
    status: 'completed' as const,
    visibility: 'public' as const,
    updatedAt: new Date('2024-01-12'),
    collaborators: 5,
    branches: 8,
  },
  {
    id: '4',
    title: 'Neural Network Optimization',
    description: 'Research into novel optimization techniques for deep neural networks in computer vision.',
    domain: 'Computer Science',
    status: 'active' as const,
    visibility: 'restricted' as const,
    updatedAt: new Date('2024-01-10'),
    collaborators: 4,
    branches: 6,
  },
]

export function ProjectsList() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <Layers3 className="h-5 w-5 text-primary-600" />
                    <CardTitle className="text-xl">
                      <Link href={`/projects/${project.id}`} className="hover:text-primary-600">
                        {project.title}
                      </Link>
                    </CardTitle>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      project.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : project.status === 'completed'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {project.status}
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      project.visibility === 'public' 
                        ? 'bg-green-100 text-green-800' 
                        : project.visibility === 'private'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {project.visibility}
                    </div>
                  </div>
                  <CardDescription className="text-base mb-3">
                    {project.description}
                  </CardDescription>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      Updated {formatDate(project.updatedAt)}
                    </div>
                    <div className="flex items-center">
                      <Orbit className="w-4 h-4 mr-1" />
                      {project.collaborators} collaborators
                    </div>
                    <div className="px-2 py-1 bg-gray-100 rounded text-xs">
                      {project.domain}
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  {project.branches} research branches
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/projects/${project.id}`}>
                      View Project
                    </Link>
                  </Button>
                  <Button size="sm" asChild>
                    <Link href={`/projects/${project.id}`}>
                      Open Workspace
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}