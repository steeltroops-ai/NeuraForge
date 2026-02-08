'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/design-system-button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Cpu, Send, Lightbulb, BookOpen, Zap } from 'lucide-react'

interface AIAssistantProps {
  projectId: string
}

export function AIAssistant({ projectId: _projectId }: AIAssistantProps) {
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Mock suggestions - in real app this would come from AI service
  const suggestions = [
    {
      id: '1',
      type: 'hypothesis',
      title: 'New Hypothesis',
      content: 'Consider exploring the relationship between AI transparency and user trust in medical settings.',
      confidence: 0.85,
      icon: Lightbulb,
    },
    {
      id: '2',
      type: 'literature',
      title: 'Relevant Papers',
      content: '3 new papers published this week on AI ethics in healthcare.',
      confidence: 0.92,
      icon: BookOpen,
    },
    {
      id: '3',
      type: 'insight',
      title: 'Research Insight',
      content: 'Your current approach aligns with recent trends in explainable AI research.',
      confidence: 0.78,
      icon: Zap,
    },
  ]

  const handleSendMessage = async () => {
    if (!message.trim()) return
    
    setIsLoading(true)
    try {
      // TODO: Implement AI chat functionality
      console.log('Sending message to AI:', message)
      setMessage('')
    } catch (error) {
      console.error('Error sending message:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b">
        <div className="flex items-center space-x-2">
          <Cpu className="h-5 w-5 text-primary-600" />
          <h2 className="text-lg font-semibold">AI Assistant</h2>
        </div>
        <p className="text-sm text-gray-600 mt-1">
          Get intelligent suggestions for your research
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3">Suggestions</h3>
          <div className="space-y-3">
            {suggestions.map((suggestion) => (
              <Card key={suggestion.id} className="p-3">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                      <suggestion.icon className="w-4 h-4 text-primary-600" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900">{suggestion.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{suggestion.content}</p>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center text-xs text-gray-500">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-1" />
                        {Math.round(suggestion.confidence * 100)}% confidence
                      </div>
                      <Button variant="ghost" size="sm">
                        Apply
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3">Chat with AI</h3>
          <Card>
            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm text-gray-700">
                    Hello! I&apos;m your AI research assistant. I can help you with hypothesis generation,
                    literature discovery, and research insights. What would you like to explore?
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="p-4 border-t">
        <div className="flex space-x-2">
          <Input
            placeholder="Ask me anything about your research..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <Button 
            onClick={handleSendMessage}
            disabled={isLoading || !message.trim()}
            size="sm"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}