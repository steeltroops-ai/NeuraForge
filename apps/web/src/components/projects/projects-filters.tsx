import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const filters = {
  status: [
    { label: 'All Projects', value: 'all', count: 12 },
    { label: 'Active', value: 'active', count: 8 },
    { label: 'Completed', value: 'completed', count: 3 },
    { label: 'Archived', value: 'archived', count: 1 },
  ],
  domain: [
    { label: 'Computer Science', value: 'cs', count: 5 },
    { label: 'Biology', value: 'bio', count: 3 },
    { label: 'Physics', value: 'physics', count: 2 },
    { label: 'Chemistry', value: 'chem', count: 2 },
  ],
  role: [
    { label: 'Owner', value: 'owner', count: 7 },
    { label: 'Collaborator', value: 'collaborator', count: 5 },
  ],
}

export function ProjectsFilters() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {filters.status.map((filter) => (
            <Button
              key={filter.value}
              variant="ghost"
              className="w-full justify-between text-left"
              size="sm"
            >
              <span>{filter.label}</span>
              <span className="text-gray-500">{filter.count}</span>
            </Button>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Domain</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {filters.domain.map((filter) => (
            <Button
              key={filter.value}
              variant="ghost"
              className="w-full justify-between text-left"
              size="sm"
            >
              <span>{filter.label}</span>
              <span className="text-gray-500">{filter.count}</span>
            </Button>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Your Role</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {filters.role.map((filter) => (
            <Button
              key={filter.value}
              variant="ghost"
              className="w-full justify-between text-left"
              size="sm"
            >
              <span>{filter.label}</span>
              <span className="text-gray-500">{filter.count}</span>
            </Button>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}