'use client'

import { useState } from 'react'
import {
  Play,
  Pause,
  Square,
  CheckCircle,
  AlertTriangle,
  Clock,
  Filter,
  Search,
  MoreVertical,
  Eye,
  Copy,
  Download,
  Calendar,
  User,
  Cpu,
  Database,
  BarChart3
} from 'lucide-react'
import { Button } from '@/components/ui/design-system-button'

interface Experiment {
  id: string
  name: string
  description: string
  project: string
  status: 'planning' | 'queued' | 'running' | 'completed' | 'failed' | 'cancelled'
  progress: number
  startTime?: string
  endTime?: string
  duration?: string
  eta?: string
  assignee: string
  resources: {
    type: 'cpu' | 'gpu' | 'memory' | 'storage'
    allocated: string
    used: string
  }[]
  parameters: Record<string, string | number | boolean | string[]>
  metrics: Record<string, number>
  tags: string[]
  priority: 'low' | 'medium' | 'high' | 'critical'
}

interface ExperimentTrackerProps {
  experiments?: Experiment[]
  onExperimentClick?: (experiment: Experiment) => void
  onStatusChange?: (experimentId: string, status: Experiment['status']) => void
  className?: string
}

export function ExperimentTracker({ 
  experiments = [], 
  onExperimentClick,
  onStatusChange,
  className = '' 
}: ExperimentTrackerProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<Experiment['status'] | 'all'>('all')
  const [sortBy, setSortBy] = useState<'name' | 'status' | 'progress' | 'startTime'>('startTime')


  const getStatusIcon = (status: Experiment['status']) => {
    switch (status) {
      case 'running': return Play
      case 'queued': return Clock
      case 'completed': return CheckCircle
      case 'failed': return AlertTriangle
      case 'cancelled': return Square
      default: return Pause
    }
  }

  const getStatusColor = (status: Experiment['status']) => {
    switch (status) {
      case 'running': return 'text-purple-700 bg-purple-50 border-purple-200'
      case 'queued': return 'text-yellow-700 bg-yellow-50 border-yellow-200'
      case 'completed': return 'text-green-700 bg-green-50 border-green-200'
      case 'failed': return 'text-red-700 bg-red-50 border-red-200'
      case 'cancelled': return 'text-gray-700 bg-gray-50 border-gray-200'
      default: return 'text-gray-700 bg-gray-50 border-gray-200'
    }
  }

  const getPriorityColor = (priority: Experiment['priority']) => {
    switch (priority) {
      case 'critical': return 'border-red-500 bg-red-50 dark:bg-red-900/10'
      case 'high': return 'border-orange-500 bg-orange-50 dark:bg-orange-900/10'
      case 'medium': return 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/10'
      default: return 'border-neutral-300 dark:border-neutral-700'
    }
  }

  const filteredExperiments = experiments
    .filter(exp => 
      (statusFilter === 'all' || exp.status === statusFilter) &&
      (searchTerm === '' || 
       exp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       exp.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
       exp.assignee.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'name': return a.name.localeCompare(b.name)
        case 'status': return a.status.localeCompare(b.status)
        case 'progress': return b.progress - a.progress
        case 'startTime': return (b.startTime || '').localeCompare(a.startTime || '')
        default: return 0
      }
    })

  const renderExperimentCard = (experiment: Experiment) => {
    const StatusIcon = getStatusIcon(experiment.status)
    const statusColor = getStatusColor(experiment.status)
    const priorityColor = getPriorityColor(experiment.priority)

    return (
      <div
        key={experiment.id}
        className="hover:shadow-lg transition-all duration-300 cursor-pointer bg-white border border-gray-200 rounded-xl hover:border-purple-200 p-6"
        onClick={() => onExperimentClick?.(experiment)}
      >
        <div className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {experiment.name}
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                {experiment.description}
              </p>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 border border-gray-200 rounded-full font-medium">
                  {experiment.project}
                </span>
                <span className={`text-xs px-2 py-1 rounded-full font-medium flex items-center gap-1 ${statusColor}`}>
                  <StatusIcon className="h-3 w-3" />
                  {experiment.status}
                </span>
                <span className={`text-xs px-2 py-1 rounded-full font-medium capitalize ${
                  experiment.priority === 'critical' ? 'border border-red-500 text-red-600 bg-red-50' :
                  experiment.priority === 'high' ? 'border border-orange-500 text-orange-600 bg-orange-50' :
                  experiment.priority === 'medium' ? 'border border-yellow-500 text-yellow-600 bg-yellow-50' :
                  'border border-gray-300 text-gray-600 bg-gray-50'
                }`}>
                  {experiment.priority}
                </span>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="p-1 text-gray-600 hover:text-gray-900">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div>
          <div className="space-y-4">
            {/* Progress */}
            <div>
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-gray-600">Progress</span>
                <span className="text-gray-900 font-medium">{experiment.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${experiment.progress}%` }}
                />
              </div>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-sm font-medium text-neutral-900 dark:text-neutral-100 mb-2">Resources</h4>
              <div className="grid grid-cols-2 gap-2">
                {experiment.resources.map((resource, index) => (
                  <div key={index} className="flex items-center gap-2 text-xs">
                    {resource.type === 'cpu' && <Cpu className="h-3 w-3 text-blue-500" />}
                    {resource.type === 'gpu' && <Cpu className="h-3 w-3 text-green-500" />}
                    {resource.type === 'memory' && <Database className="h-3 w-3 text-purple-500" />}
                    {resource.type === 'storage' && <Database className="h-3 w-3 text-orange-500" />}
                    <span className="text-neutral-600 dark:text-neutral-400">
                      {resource.used}/{resource.allocated}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Metrics */}
            {Object.keys(experiment.metrics).length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-neutral-900 dark:text-neutral-100 mb-2">Key Metrics</h4>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(experiment.metrics).slice(0, 4).map(([key, value]) => (
                    <div key={key} className="text-xs">
                      <span className="text-neutral-600 dark:text-neutral-400">{key}:</span>
                      <span className="text-neutral-900 dark:text-neutral-100 ml-1 font-medium">
                        {typeof value === 'number' ? value.toFixed(3) : value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Metadata */}
            <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 pt-2 border-t border-neutral-200 dark:border-neutral-800">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  <span>{experiment.assignee}</span>
                </div>
                {experiment.startTime && (
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{experiment.startTime}</span>
                  </div>
                )}
              </div>
              {experiment.eta && (
                <span>ETA: {experiment.eta}</span>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-2">
              <Button size="sm" variant="outline" className="flex-1">
                <Eye className="h-3 w-3 mr-1" />
                View
              </Button>
              <Button size="sm" variant="outline">
                <Copy className="h-3 w-3" />
              </Button>
              <Button size="sm" variant="outline">
                <Download className="h-3 w-3" />
              </Button>
              {experiment.status === 'running' && (
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation()
                    onStatusChange?.(experiment.id, 'cancelled')
                  }}
                >
                  <Square className="h-3 w-3" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`experiment-tracker ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            Experiment Management
          </h2>
          <p className="text-gray-600 mt-2 text-lg">
            Monitor and manage your research experiments with real-time tracking
          </p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200">
          <Play className="h-5 w-5 mr-2" />
          New Experiment
        </Button>
      </div>

      {/* Filters and Search */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Search experiments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as any)}
          className="px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="all">All Status</option>
          <option value="planning">Planning</option>
          <option value="queued">Queued</option>
          <option value="running">Running</option>
          <option value="completed">Completed</option>
          <option value="failed">Failed</option>
          <option value="cancelled">Cancelled</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
          className="px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="startTime">Sort by Start Time</option>
          <option value="name">Sort by Name</option>
          <option value="status">Sort by Status</option>
          <option value="progress">Sort by Progress</option>
        </select>

        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        {['running', 'queued', 'completed', 'failed', 'planning'].map(status => {
          const count = experiments.filter(exp => exp.status === status).length
          const StatusIcon = getStatusIcon(status as Experiment['status'])
          const statusColor = getStatusColor(status as Experiment['status'])
          
          return (
            <div key={status} className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center gap-2">
                <div className={`p-2 rounded-lg ${statusColor}`}>
                  <StatusIcon className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{count}</p>
                  <p className="text-xs text-gray-600 capitalize">{status}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Experiments Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredExperiments.map(renderExperimentCard)}
      </div>

      {filteredExperiments.length === 0 && (
        <div className="text-center py-12">
          <BarChart3 className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-2">
            No experiments found
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">
            {searchTerm || statusFilter !== 'all' 
              ? 'Try adjusting your search or filters'
              : 'Get started by creating your first experiment'
            }
          </p>
          <Button>
            <Play className="h-4 w-4 mr-2" />
            Create Experiment
          </Button>
        </div>
      )}
    </div>
  )
}
