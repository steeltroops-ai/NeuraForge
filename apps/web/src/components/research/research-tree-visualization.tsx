'use client'

import { useState } from 'react'
import { 
  ChevronDown, 
  ChevronRight, 
  GitBranch, 
  Target, 
  Microscope, 
  FileText, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  Plus,
  MoreHorizontal
} from 'lucide-react'
import { Button } from '@/components/ui/design-system-button'

interface ResearchNode {
  id: string
  title: string
  type: 'project' | 'goal' | 'milestone' | 'experiment'
  status: 'planning' | 'active' | 'completed' | 'blocked' | 'failed'
  progress: number
  description?: string
  children?: ResearchNode[]
  assignee?: string
  dueDate?: string
  dependencies?: string[]
}

interface ResearchTreeVisualizationProps {
  data: ResearchNode
  onNodeClick?: (node: ResearchNode) => void
  onNodeExpand?: (nodeId: string) => void
  className?: string
}

export function ResearchTreeVisualization({ 
  data, 
  onNodeClick, 
  onNodeExpand,
  className = '' 
}: ResearchTreeVisualizationProps) {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set([data.id]))

  const toggleNode = (nodeId: string) => {
    const newExpanded = new Set(expandedNodes)
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId)
    } else {
      newExpanded.add(nodeId)
    }
    setExpandedNodes(newExpanded)
    onNodeExpand?.(nodeId)
  }

  const getNodeIcon = (type: ResearchNode['type']) => {
    switch (type) {
      case 'project': return GitBranch
      case 'goal': return Target
      case 'milestone': return CheckCircle
      case 'experiment': return Microscope
      default: return FileText
    }
  }

  const getStatusColor = (status: ResearchNode['status']) => {
    switch (status) {
      case 'completed': return 'text-green-700 bg-green-50 border-green-200'
      case 'active': return 'text-purple-700 bg-purple-50 border-purple-200'
      case 'planning': return 'text-yellow-700 bg-yellow-50 border-yellow-200'
      case 'blocked': return 'text-red-700 bg-red-50 border-red-200'
      case 'failed': return 'text-gray-700 bg-gray-50 border-gray-200'
      default: return 'text-gray-700 bg-gray-50 border-gray-200'
    }
  }

  const getStatusIcon = (status: ResearchNode['status']) => {
    switch (status) {
      case 'completed': return CheckCircle
      case 'active': return Clock
      case 'blocked': return AlertTriangle
      case 'failed': return AlertTriangle
      default: return Clock
    }
  }

  const renderNode = (node: ResearchNode, level: number = 0) => {
    const isExpanded = expandedNodes.has(node.id)
    const hasChildren = node.children && node.children.length > 0
    const Icon = getNodeIcon(node.type)
    const StatusIcon = getStatusIcon(node.status)
    const statusColor = getStatusColor(node.status)

    return (
      <div key={node.id} className="select-none">
        {/* Node Content */}
        <div
          className={`
            flex items-center gap-3 p-4 rounded-xl border border-gray-200
            bg-white hover:bg-gray-50 hover:border-purple-200
            transition-all duration-200 cursor-pointer group shadow-sm hover:shadow-md
            ${level > 0 ? 'ml-8 mt-3' : 'mb-2'}
          `}
          onClick={() => onNodeClick?.(node)}
        >
          {/* Expand/Collapse Button */}
          {hasChildren && (
            <Button
              variant="ghost"
              size="sm"
              className="p-1 h-6 w-6"
              onClick={(e) => {
                e.stopPropagation()
                toggleNode(node.id)
              }}
            >
              {isExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </Button>
          )}
          
          {/* Node Icon */}
          <div className={`p-3 rounded-xl ${statusColor} shadow-sm`}>
            <Icon className="h-5 w-5" />
          </div>

          {/* Node Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <h4 className="font-bold text-gray-900 truncate text-lg">
                {node.title}
              </h4>
              <span className="text-xs capitalize bg-purple-50 text-purple-700 border border-purple-200 px-2 py-1 rounded-full font-medium">
                {node.type}
              </span>
              <div className="flex items-center gap-1">
                <StatusIcon className="h-3 w-3" />
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColor}`}>
                  {node.status}
                </span>
              </div>
            </div>
            
            {node.description && (
              <p className="text-gray-600 mb-3 line-clamp-2 leading-relaxed">
                {node.description}
              </p>
            )}

            {/* Metadata */}
            <div className="flex items-center gap-6 text-sm text-gray-500 mb-3">
              {node.assignee && (
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                  {node.assignee}
                </span>
              )}
              {node.dueDate && (
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                  {node.dueDate}
                </span>
              )}
              {node.dependencies && node.dependencies.length > 0 && (
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                  {node.dependencies.length} deps
                </span>
              )}
            </div>

            {/* Progress Bar */}
            <div className="mt-3">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-600 font-medium">Progress</span>
                <span className="font-bold text-gray-900">{node.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${node.progress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button variant="ghost" size="sm" className="p-1 h-6 w-6">
              <Plus className="h-3 w-3" />
            </Button>
            <Button variant="ghost" size="sm" className="p-1 h-6 w-6">
              <MoreHorizontal className="h-3 w-3" />
            </Button>
          </div>
        </div>

        {/* Children */}
        {hasChildren && isExpanded && (
          <div className="mt-2 space-y-2">
            {node.children!.map(child => renderNode(child, level + 1))}
          </div>
        )}

        {/* Connection Lines */}
        {hasChildren && isExpanded && level === 0 && (
          <div className="ml-6 border-l-2 border-neutral-200 dark:border-neutral-800 pl-4 mt-2">
            {/* This creates a visual connection line */}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className={`research-tree-visualization ${className}`}>
      <div className="space-y-2">
        {renderNode(data)}
      </div>
    </div>
  )
}

// Example usage component
export function ResearchTreeExample() {
  const sampleData: ResearchNode = {
    id: 'project-1',
    title: 'Neural Network Optimization',
    type: 'project',
    status: 'active',
    progress: 73,
    description: 'Improving deep learning model performance through architectural optimizations',
    assignee: 'Dr. Sarah Chen',
    dueDate: '2024-03-15',
    children: [
      {
        id: 'goal-1',
        title: 'Architecture Design',
        type: 'goal',
        status: 'completed',
        progress: 100,
        description: 'Design optimal neural network architecture',
        assignee: 'Dr. Sarah Chen',
        children: [
          {
            id: 'milestone-1',
            title: 'Literature Review',
            type: 'milestone',
            status: 'completed',
            progress: 100,
            assignee: 'Dr. Sarah Chen'
          },
          {
            id: 'milestone-2',
            title: 'Architecture Prototype',
            type: 'milestone',
            status: 'completed',
            progress: 100,
            assignee: 'Dr. Sarah Chen'
          }
        ]
      },
      {
        id: 'goal-2',
        title: 'Model Training',
        type: 'goal',
        status: 'active',
        progress: 60,
        description: 'Train and optimize the neural network model',
        assignee: 'Dr. Alex Kumar',
        children: [
          {
            id: 'experiment-1',
            title: 'Baseline Training',
            type: 'experiment',
            status: 'completed',
            progress: 100,
            assignee: 'Dr. Alex Kumar'
          },
          {
            id: 'experiment-2',
            title: 'Hyperparameter Tuning',
            type: 'experiment',
            status: 'active',
            progress: 45,
            assignee: 'Dr. Alex Kumar'
          },
          {
            id: 'experiment-3',
            title: 'Performance Evaluation',
            type: 'experiment',
            status: 'planning',
            progress: 0,
            assignee: 'Dr. Alex Kumar'
          }
        ]
      },
      {
        id: 'goal-3',
        title: 'Results Analysis',
        type: 'goal',
        status: 'planning',
        progress: 0,
        description: 'Analyze and document experimental results',
        assignee: 'Prof. Maria Santos'
      }
    ]
  }

  const handleNodeClick = (node: ResearchNode) => {
    console.log('Node clicked:', node)
  }

  const handleNodeExpand = (nodeId: string) => {
    console.log('Node expanded:', nodeId)
  }

  return (
    <div className="p-8">
      <ResearchTreeVisualization
        data={sampleData}
        onNodeClick={handleNodeClick}
        onNodeExpand={handleNodeExpand}
        className="max-w-6xl mx-auto"
      />
    </div>
  )
}
