import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { formatRelativeTime } from '@/lib/utils'
import { Workflow, MessageSquare, Orbit, Cpu } from 'lucide-react'

// Mock data - in real app this would come from API
const activities = [
  {
    id: '1',
    type: 'branch_created',
    message: 'Created new branch "hypothesis-validation" in AI Ethics project',
    timestamp: new Date('2024-01-15T10:30:00'),
    icon: Workflow,
  },
  {
    id: '2',
    type: 'ai_suggestion',
    message: 'AI suggested 3 new research directions for Quantum Computing project',
    timestamp: new Date('2024-01-15T09:15:00'),
    icon: Cpu,
  },
  {
    id: '3',
    type: 'collaboration',
    message: 'Dr. Sarah Chen joined Climate Change Modeling project',
    timestamp: new Date('2024-01-14T16:45:00'),
    icon: Orbit,
  },
  {
    id: '4',
    type: 'comment',
    message: 'New comment on "Ethical Framework Analysis" branch',
    timestamp: new Date('2024-01-14T14:20:00'),
    icon: MessageSquare,
  },
  {
    id: '5',
    type: 'branch_merged',
    message: 'Merged "data-analysis" branch into main in Climate project',
    timestamp: new Date('2024-01-13T11:30:00'),
    icon: Workflow,
  },
]

export function ActivityFeed() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest updates from your research projects</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <activity.icon className="w-4 h-4 text-primary-600" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900">{activity.message}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {formatRelativeTime(activity.timestamp)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}