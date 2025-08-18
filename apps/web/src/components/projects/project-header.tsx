import { Button } from '@/components/ui/button'
import { Share, Settings, MoreHorizontal } from 'lucide-react'

interface ProjectHeaderProps {
  projectId: string
}

export function ProjectHeader({ projectId }: ProjectHeaderProps) {
  // Mock project data - in real app this would come from API
  const project = {
    id: projectId,
    title: 'AI Ethics in Healthcare',
    description: 'Investigating ethical implications of AI systems in medical diagnosis',
    status: 'active' as const,
    visibility: 'public' as const,
  }

  return (
    <div className="border-b bg-white px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{project.title}</h1>
          <p className="text-gray-600 mt-1">{project.description}</p>
          <div className="flex items-center space-x-2 mt-2">
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${
              project.status === 'active' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-gray-100 text-gray-800'
            }`}>
              {project.status}
            </div>
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${
              project.visibility === 'public' 
                ? 'bg-blue-100 text-blue-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {project.visibility}
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Share className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}