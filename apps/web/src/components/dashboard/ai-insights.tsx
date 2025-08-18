import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Cpu, Lightbulb, TrendingUp, BookOpen } from 'lucide-react'

// Mock data - in real app this would come from AI service
const insights = [
  {
    id: '1',
    type: 'hypothesis',
    title: 'New Hypothesis Suggestion',
    description: 'Consider exploring the relationship between quantum entanglement and computational complexity',
    confidence: 0.85,
    icon: Lightbulb,
  },
  {
    id: '2',
    type: 'trend',
    title: 'Research Trend Alert',
    description: 'Increasing interest in ethical AI frameworks in your research domain',
    confidence: 0.92,
    icon: TrendingUp,
  },
  {
    id: '3',
    type: 'literature',
    title: 'Relevant Literature',
    description: '5 new papers published this week related to your active projects',
    confidence: 0.78,
    icon: BookOpen,
  },
]

export function AIInsights() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Cpu className="w-5 h-5 mr-2 text-primary-600" />
          AI Insights
        </CardTitle>
        <CardDescription>Personalized research recommendations</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {insights.map((insight) => (
            <div key={insight.id} className="p-4 border rounded-lg">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <insight.icon className="w-4 h-4 text-primary-600" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-900">{insight.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{insight.description}</p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center text-xs text-gray-500">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-1" />
                      {Math.round(insight.confidence * 100)}% confidence
                    </div>
                    <Button variant="ghost" size="sm">
                      Explore
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <Button variant="outline" className="w-full">
            View All Insights
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}