import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { formatDate } from '@/lib/utils'
import { Layers3, Orbit, Clock } from 'lucide-react'

// Mock data - in real app this would come from API
const recentProjects = [
  {
    id: '1',
    title: 'AI Ethics in Healthcare',
    description: 'Investigating ethical implications of AI systems in medical diagnosis',
    updatedAt: new Date('2024-01-15'),
    collaborators: 3,
    status: 'active' as const,
  },
  {
    id: '2',
    title: 'Quantum Computing Applications',
    description: 'Exploring quantum algorithms for optimization problems',
    updatedAt: new Date('2024-01-14'),
    collaborators: 2,
    status: 'active' as const,
  },
  {
    id: '3',
    title: 'Climate Change Modeling',
    description: 'Advanced climate prediction models using machine learning',
    updatedAt: new Date('2024-01-12'),
    collaborators: 5,
    status: 'completed' as const,
  },
]

export function RecentProjects() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Recent Projects</CardTitle>
          <CardDescription>Your latest research projects</CardDescription>
        </div>
        <Button asChild variant="outline" size="sm">
          <Link href="/projects">View all</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentProjects.map((project) => (
            <div key={project.id} className="flex items-start space-x-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Layers3 className="w-5 h-5 text-primary-600" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <Link href={`/projects/${project.id}`} className="block">
                  <h3 className="text-sm font-medium text-gray-900 hover:text-primary-600">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex items-center space-x-4 mt-2 text-xs text-gray-400">
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {formatDate(project.updatedAt)}
                    </div>
                    <div className="flex items-center">
                      <Orbit className="w-3 h-3 mr-1" />
                      {project.collaborators} collaborators
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs ${
                      project.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {project.status}
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}