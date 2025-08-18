'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { FileText, MessageSquare, History, Settings } from 'lucide-react'

interface ProjectTabsProps {
  projectId: string
}

export function ProjectTabs({ projectId }: ProjectTabsProps) {
  const [activeTab, setActiveTab] = useState('notes')

  const tabs = [
    { id: 'notes', label: 'Notes', icon: FileText },
    { id: 'discussions', label: 'Discussions', icon: MessageSquare },
    { id: 'history', label: 'History', icon: History },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

  return (
    <div className="h-80">
      <div className="border-b">
        <div className="flex space-x-1 p-2">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab(tab.id)}
              className="flex items-center space-x-2"
            >
              <tab.icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </Button>
          ))}
        </div>
      </div>
      
      <div className="p-4 h-full overflow-y-auto">
        {activeTab === 'notes' && (
          <Card>
            <CardContent className="p-4">
              <div className="prose max-w-none">
                <h3>Research Notes</h3>
                <p>This is where you can write and organize your research notes, observations, and findings.</p>
                <ul>
                  <li>Initial hypothesis formulation</li>
                  <li>Literature review findings</li>
                  <li>Experimental observations</li>
                  <li>Data analysis results</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        )}
        
        {activeTab === 'discussions' && (
          <Card>
            <CardContent className="p-4">
              <div className="text-center text-gray-500">
                <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium mb-2">No discussions yet</h3>
                <p>Start a discussion with your collaborators about this project.</p>
              </div>
            </CardContent>
          </Card>
        )}
        
        {activeTab === 'history' && (
          <Card>
            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium">Project created</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium">Initial hypothesis added</p>
                    <p className="text-xs text-gray-500">1 hour ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        
        {activeTab === 'settings' && (
          <Card>
            <CardContent className="p-4">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Project Settings</h3>
                  <p className="text-sm text-gray-600">Configure your project preferences and permissions.</p>
                </div>
                <div className="space-y-2">
                  <Button variant="outline" size="sm">Edit Project Details</Button>
                  <Button variant="outline" size="sm">Manage Collaborators</Button>
                  <Button variant="outline" size="sm">Export Data</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}