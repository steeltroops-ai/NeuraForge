import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Layers3, Orbit, Cpu, TrendingUp } from 'lucide-react'

const stats = [
  {
    name: 'Active Projects',
    value: '12',
    change: '+2 this month',
    icon: Layers3,
  },
  {
    name: 'Collaborators',
    value: '8',
    change: '+1 this week',
    icon: Orbit,
  },
  {
    name: 'AI Suggestions',
    value: '47',
    change: '+12 today',
    icon: Cpu,
  },
  {
    name: 'Research Impact',
    value: '94%',
    change: '+5% this month',
    icon: TrendingUp,
  },
]

export function DashboardOverview() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.name}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}