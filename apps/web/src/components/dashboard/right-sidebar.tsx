'use client'

import { useState } from 'react'
import {
  MessageCircle,
  Users,
  Bell,
  Zap,
  FolderOpen,
  Send,
  Paperclip,
  MoreVertical,
  Circle,
  Clock,
  CheckCircle
} from 'lucide-react'
import { Button } from '@/components/ui/design-system-button'
import { mockCollaborators, mockNotifications } from '@/lib/mock-data'

interface RightSidebarProps {
  collapsed: boolean
  isMobile: boolean
  activeSection: string | null
}

export function RightSidebar({ activeSection }: RightSidebarProps) {
  const activeTab = (activeSection as 'ai' | 'collaborators' | 'notifications' | 'actions' | 'context') || 'ai'
  const [aiMessage, setAiMessage] = useState('')

  const tabs = [
    { id: 'ai', label: 'AI Assistant', icon: MessageCircle, badge: null },
    { id: 'collaborators', label: 'Collaborators', icon: Users, badge: '5' },
    { id: 'notifications', label: 'Notifications', icon: Bell, badge: '12' },
    { id: 'actions', label: 'Quick Actions', icon: Zap, badge: null },
    { id: 'context', label: 'Project Context', icon: FolderOpen, badge: null }
  ]

  const collaborators = mockCollaborators
  const notifications = mockNotifications

  const quickActions = [
    { id: '1', label: 'Create Experiment', icon: MessageCircle, color: 'bg-blue-500' },
    { id: '2', label: 'Book Lab Time', icon: Clock, color: 'bg-green-500' },
    { id: '3', label: 'Invite Collaborator', icon: Users, color: 'bg-purple-500' },
    { id: '4', label: 'Export Data', icon: FolderOpen, color: 'bg-orange-500' },
    { id: '5', label: 'Fork Project', icon: Bell, color: 'bg-pink-500' },
    { id: '6', label: 'Schedule Meeting', icon: Clock, color: 'bg-indigo-500' }
  ]

  const renderAIAssistant = () => (
    <div className="flex flex-col h-full">
      {/* AI Chat Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
            <MessageCircle className="h-4 w-4 text-white" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">AI Research Assistant</h3>
            <p className="text-xs text-gray-600">Always ready to help</p>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="flex gap-3">
          <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white text-xs font-bold">AI</span>
          </div>
          <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
            <p className="text-sm text-gray-900">
              I&apos;ve analyzed your recent experiments and found 3 potential optimizations for your neural network architecture. Would you like me to explain them?
            </p>
            <span className="text-xs text-gray-600 mt-1 block">2 min ago</span>
          </div>
        </div>

        <div className="flex gap-3 justify-end">
          <div className="bg-purple-600 rounded-lg p-3 max-w-[80%]">
            <p className="text-sm text-white">
              Yes, please show me the optimizations.
            </p>
            <span className="text-xs text-purple-100 mt-1 block">1 min ago</span>
          </div>
          <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-gray-600 text-xs font-bold">SC</span>
          </div>
        </div>

        <div className="flex gap-3">
          <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white text-xs font-bold">AI</span>
          </div>
          <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
            <p className="text-sm text-gray-900 mb-2">
              Here are the 3 optimizations I recommend:
            </p>
            <ol className="text-sm text-gray-900 space-y-1 list-decimal list-inside">
              <li>Increase dropout rate to 0.3 for better regularization</li>
              <li>Use Adam optimizer with learning rate 0.001</li>
              <li>Add batch normalization after each hidden layer</li>
            </ol>
            <span className="text-xs text-gray-600 mt-2 block">Just now</span>
          </div>
        </div>
      </div>

      {/* Chat Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Ask me anything about your research..."
            value={aiMessage}
            onChange={(e) => setAiMessage(e.target.value)}
            className="flex-1 px-3 py-2 text-sm bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 placeholder-gray-500 transition-all duration-300"
          />
          <Button variant="primary" size="sm" className="px-3">
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex gap-2 mt-2">
          <Button variant="ghost" size="sm" className="text-xs text-gray-600 hover:text-gray-900">
            <Paperclip className="h-3 w-3 mr-1" />
            Attach
          </Button>
          <Button variant="ghost" size="sm" className="text-xs text-gray-600 hover:text-gray-900">
            Suggest experiments
          </Button>
        </div>
      </div>
    </div>
  )

  const renderCollaborators = () => (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-gray-900">Active Collaborators</h3>
        <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full font-medium">
          {collaborators.filter(c => c.status === 'online').length} online
        </span>
      </div>
      
      <div className="space-y-3">
        {collaborators.map(collaborator => (
          <div key={collaborator.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer">
            <div className="relative">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">{collaborator.avatar}</span>
              </div>
              <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${
                collaborator.status === 'online' ? 'bg-green-500' :
                collaborator.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'
              }`} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-900 truncate">
                  {collaborator.name}
                </span>
                {collaborator.name.includes('AI') && (
                  <span className="text-xs px-2 py-0.5 bg-purple-100 text-purple-700 border border-purple-200 rounded-full font-medium">AI</span>
                )}
              </div>
              <p className="text-xs text-gray-600 truncate">
                {collaborator.activity}
              </p>
            </div>
            <Button variant="ghost" size="sm" className="p-1">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  )

  const renderNotifications = () => (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-neutral-900 dark:text-neutral-100">Notifications</h3>
        <Button variant="ghost" size="sm" className="text-xs">
          Mark all read
        </Button>
      </div>
      
      <div className="space-y-3">
        {notifications.map(notification => (
          <div key={notification.id} className={`p-3 rounded-lg border transition-colors ${
            notification.read 
              ? 'border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900' 
              : 'border-primary-200 dark:border-primary-800 bg-primary-50 dark:bg-primary-900/20'
          }`}>
            <div className="flex items-start gap-3">
              <div className={`w-2 h-2 rounded-full mt-2 ${notification.read ? 'bg-neutral-400' : 'bg-primary-500'}`} />
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-neutral-900 dark:text-neutral-100 mb-1">
                  {notification.title}
                </h4>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-2">
                  {notification.content}
                </p>
                <span className="text-xs text-neutral-500 dark:text-neutral-400">
                  {notification.time}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderQuickActions = () => (
    <div className="p-4 space-y-4">
      <h3 className="font-medium text-neutral-900 dark:text-neutral-100">Quick Actions</h3>
      
      <div className="grid grid-cols-2 gap-3">
        {quickActions.map(action => (
          <Button
            key={action.id}
            variant="outline"
            className="h-auto p-3 flex flex-col items-center gap-2 hover:bg-neutral-50 dark:hover:bg-neutral-800"
          >
            <div className={`w-8 h-8 ${action.color} rounded-lg flex items-center justify-center`}>
              <action.icon className="h-4 w-4 text-white" />
            </div>
            <span className="text-xs text-center">{action.label}</span>
          </Button>
        ))}
      </div>
    </div>
  )

  const renderProjectContext = () => (
    <div className="p-4 space-y-4">
      <h3 className="font-medium text-neutral-900 dark:text-neutral-100">Current Project</h3>
      
      <div className="bg-neutral-100 dark:bg-neutral-800 rounded-lg p-3">
        <h4 className="font-medium text-neutral-900 dark:text-neutral-100 mb-2">
          Neural Network Optimization
        </h4>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
          Improving deep learning model performance through architectural optimizations
        </p>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-neutral-600 dark:text-neutral-400">Progress</span>
            <span className="text-neutral-900 dark:text-neutral-100">73%</span>
          </div>
          <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
            <div className="bg-primary-500 h-2 rounded-full" style={{ width: '73%' }} />
          </div>
        </div>
        
        <div className="mt-3 space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span className="text-neutral-600 dark:text-neutral-400">Data preprocessing completed</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Circle className="h-4 w-4 text-primary-500" />
            <span className="text-neutral-600 dark:text-neutral-400">Model training in progress</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Circle className="h-4 w-4 text-neutral-400" />
            <span className="text-neutral-600 dark:text-neutral-400">Results analysis pending</span>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'ai' && renderAIAssistant()}
        {activeTab === 'collaborators' && renderCollaborators()}
        {activeTab === 'notifications' && renderNotifications()}
        {activeTab === 'actions' && renderQuickActions()}
        {activeTab === 'context' && renderProjectContext()}
      </div>
    </div>
  )
}
