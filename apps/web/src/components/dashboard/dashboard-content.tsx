'use client'
import {
  TrendingUp,
  Users,
  Zap,
  Target,
  GitBranch,
  Activity,
  Award,
  Play,
  CheckCircle,
  Plus,
  Clock
} from 'lucide-react'
import { Button } from '@/components/ui/design-system-button'

import { mockProjects, mockExperiments, mockRecommendations, mockMetrics } from '@/lib/mock-data'

export function DashboardContent() {

  // Use mock data
  const activeProjects = mockProjects.slice(0, 3)
  const runningExperiments = mockExperiments.slice(0, 3)
  const aiRecommendations = mockRecommendations.slice(0, 3)
  const metrics = mockMetrics


  const renderProjectCard = (project: typeof activeProjects[0]) => (
    <div key={project.id} className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="mb-1 text-lg font-semibold text-gray-900">
              {project.title}
            </h3>
            <p className="mb-2 text-sm text-gray-600">
              {project.description}
            </p>
            <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 border border-gray-200 rounded-full font-medium">
              {project.domain}
            </span>
          </div>
          <div className={`w-3 h-3 rounded-full ${
            project.status === 'active' ? 'bg-green-500' :
            project.status === 'review' ? 'bg-yellow-500' : 'bg-gray-400'
          }`} />
        </div>
      </div>
      <div>
        <div className="space-y-3">
          <div>
            <div className="flex items-center justify-between mb-1 text-sm">
              <span className="text-gray-600">Progress</span>
              <span className="text-gray-900 font-medium">{project.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${project.progress}%` }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">{project.collaborators}</span>
              </div>
              <div className="flex items-center gap-1">
                <GitBranch className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">{project.experiments}</span>
              </div>
              <div className="flex items-center gap-1">
                <Award className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">{project.citations}</span>
              </div>
            </div>
            <span className="text-gray-500">{project.lastActivity}</span>
          </div>

          <div className="flex gap-2 pt-2">
            <Button size="sm" variant="secondary" className="flex-1">
              View Details
            </Button>
            <Button size="sm" variant="primary" className="flex-1">
              Continue Work
            </Button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderExperimentCard = (experiment: typeof runningExperiments[0]) => (
    <div key={experiment.id} className="p-4 bg-white border rounded-lg border-gray-200 hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-medium text-gray-900">{experiment.name}</h4>
        <div className="flex items-center gap-2">
          {experiment.status === 'running' && <Play className="w-4 h-4 text-green-500" />}
          {experiment.status === 'queued' && <Clock className="w-4 h-4 text-yellow-500" />}
          {experiment.status === 'completed' && <CheckCircle className="w-4 h-4 text-green-500" />}
          <span className={`text-xs px-2 py-1 rounded-full font-medium ${
            experiment.status === 'running' ? 'bg-green-100 text-green-700' :
            experiment.status === 'completed' ? 'bg-gray-100 text-gray-700' :
            'bg-yellow-100 text-yellow-700'
          }`}>
            {experiment.status}
          </span>
        </div>
      </div>

      <p className="mb-3 text-sm text-gray-600">{experiment.project}</p>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Progress</span>
          <span className="text-gray-900 font-medium">{experiment.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1.5">
          <div
            className="bg-purple-600 h-1.5 rounded-full transition-all duration-300"
            style={{ width: `${experiment.progress}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-500">
            {experiment.resources?.[0]?.type || 'No resources'}
          </span>
          <span className="text-gray-500">ETA: {experiment.eta}</span>
        </div>
      </div>
    </div>
  )

  const renderRecommendationCard = (rec: typeof aiRecommendations[0]) => (
    <div key={rec.id} className="p-4 border rounded-lg bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <h4 className="mb-1 font-medium text-gray-900">{rec.title}</h4>
          <p className="mb-2 text-sm text-gray-600">{rec.description}</p>
          <div className="flex items-center gap-2">
            <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full font-medium">
              {rec.relevance}% match
            </span>
            <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 border border-purple-200 rounded-full font-medium capitalize">
              {rec.type}
            </span>
          </div>
        </div>
      </div>

      <Button size="sm" variant="primary" className="w-full mt-3">
        {rec.action}
      </Button>
    </div>
  )

  return (
    <div className="h-full overflow-auto bg-gray-50">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Research Dashboard
            </h1>
            <p className="mt-1 text-gray-600">
              Welcome back, Dr. Sarah Chen. Here&apos;s your research overview.
            </p>
          </div>
          <Button variant="primary" className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            New Project
          </Button>
        </div>

        {/* Metrics Overview */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-2xl font-bold text-gray-900">{metrics.totalProjects}</p>
                <p className="text-xs text-gray-600">Projects</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-2xl font-bold text-gray-900">{metrics.activeExperiments}</p>
                <p className="text-xs text-gray-600">Experiments</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-2xl font-bold text-gray-900">{metrics.collaborations}</p>
                <p className="text-xs text-gray-600">Collaborations</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-500" />
              <div>
                <p className="text-2xl font-bold text-gray-900">{metrics.citations}</p>
                <p className="text-xs text-gray-600">Citations</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-purple-500" />
              <div>
                <p className="text-2xl font-bold text-gray-900">{metrics.impactScore}</p>
                <p className="text-xs text-gray-600">Impact Score</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-orange-500" />
              <div>
                <p className="text-2xl font-bold text-gray-900">${(metrics.fundingSecured / 1000).toFixed(0)}K</p>
                <p className="text-xs text-gray-600">Funding</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Active Projects */}
          <div className="space-y-4 lg:col-span-2">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Active Projects</h2>
              <Button variant="secondary" size="sm">View All</Button>
            </div>
            <div className="space-y-4">
              {activeProjects.map(renderProjectCard)}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Running Experiments */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Running Experiments</h2>
                <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full font-medium">{runningExperiments.length}</span>
              </div>
              <div className="space-y-3">
                {runningExperiments.map(renderExperimentCard)}
              </div>
            </div>

            {/* AI Recommendations */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">AI Recommendations</h2>
                <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full font-medium">New</span>
              </div>
              <div className="space-y-3">
                {aiRecommendations.map(renderRecommendationCard)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
