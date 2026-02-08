'use client'
import { useState } from 'react'
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
  Clock,
  Calendar,
  Bell,
  Search,
  Filter,
  MoreHorizontal,
  ArrowUpRight,
  Bookmark,
  Share2,
  RefreshCw,
  ChevronRight,
  CheckCircle2,
  BarChart3,
  Brain,
  Lightbulb,
  Rocket,
  Database,
  FileText
} from 'lucide-react'
import { Button } from '@/components/ui/design-system-button'
import { mockProjects, mockExperiments, mockRecommendations, mockMetrics } from '@/lib/mock-data'
import {
  MetricsGridSkeleton,
  ProjectsListSkeleton,
  ExperimentsListSkeleton,
  RecommendationsListSkeleton
} from './dashboard-skeletons'
import {
  EmptyProjectsState,
  EmptyExperimentsState,
  EmptyRecommendationsState
} from './dashboard-empty-states'

export function DashboardContent() {
  // Loading states
  const [isLoadingMetrics, setIsLoadingMetrics] = useState(false)
  const [isLoadingProjects, setIsLoadingProjects] = useState(false)
  const [isLoadingExperiments, setIsLoadingExperiments] = useState(false)
  const [isLoadingRecommendations, setIsLoadingRecommendations] = useState(false)

  // Use mock data
  const activeProjects = mockProjects.slice(0, 3)
  const runningExperiments = mockExperiments.slice(0, 3)
  const aiRecommendations = mockRecommendations.slice(0, 3)
  const metrics = mockMetrics

  const renderProjectCard = (project: typeof activeProjects[0]) => (
    <div key={project.id} className="group bg-gradient-to-br from-[var(--color-background)] to-[var(--color-surface)] rounded-xl border border-[var(--color-border-subtle)] p-6 hover:border-[var(--color-primary-300)] hover:-translate-y-1 cursor-pointer transition-all" style={{ boxShadow: 'var(--shadow-sm)', transitionDuration: 'var(--duration-normal)' }} onMouseEnter={(e) => e.currentTarget.style.boxShadow = 'var(--shadow-lg)'} onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'var(--shadow-sm)'}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-primary-600)] transition-colors">
              {project.title}
            </h3>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${project.status === 'active' ? 'bg-green-500 animate-pulse' :
                project.status === 'review' ? 'bg-yellow-500' : 'bg-gray-400'
                }`} />
              <span className={`text-xs font-medium capitalize ${project.status === 'active' ? 'text-green-600' :
                project.status === 'review' ? 'text-yellow-600' : 'text-gray-500'
                }`}>
                {project.status}
              </span>
            </div>
          </div>
          <p className="text-sm text-[var(--color-text-secondary)] mb-3 line-clamp-2">
            {project.description}
          </p>
          <div className="flex items-center gap-2">
            <span className="text-xs px-3 py-1 bg-[var(--color-primary-100)] text-[var(--color-primary-700)] rounded-full font-medium">
              {project.domain}
            </span>
            <span className="text-xs px-3 py-1 bg-[var(--color-surface-elevated)] text-[var(--color-text-secondary)] rounded-full">
              Updated {project.lastActivity}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 ml-4">
          <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
            <Bookmark className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
            <Share2 className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {/* Progress Section */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-[var(--color-text-secondary)]">Progress</span>
            <span className="text-sm font-semibold text-[var(--color-text-primary)]">{project.progress}%</span>
          </div>
          <div className="w-full bg-[var(--color-surface-elevated)] rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-[var(--color-primary-500)] to-[var(--color-primary-600)] h-2 rounded-full transition-all ease-out"
              style={{ width: `${project.progress}%`, transitionDuration: 'var(--duration-slow)' }}
            />
          </div>
        </div>

        {/* Stats and Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <div className="p-1 bg-blue-100 rounded">
                <Users className="w-3 h-3 text-blue-600" />
              </div>
              <span className="text-sm text-[var(--color-text-secondary)]">{project.collaborators}</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="p-1 bg-green-100 rounded">
                <Activity className="w-3 h-3 text-green-600" />
              </div>
              <span className="text-sm text-[var(--color-text-secondary)]">{project.experiments}</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="p-1 bg-yellow-100 rounded">
                <Award className="w-3 h-3 text-yellow-600" />
              </div>
              <span className="text-sm text-[var(--color-text-secondary)]">{project.citations}</span>
            </div>
          </div>

          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="flex items-center gap-2">
              <BarChart3 className="w-3 h-3" />
              View Details
            </Button>
            <Button size="sm" variant="primary" className="flex items-center gap-2">
              <Play className="w-3 h-3" />
              Continue Work
            </Button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderExperimentCard = (experiment: typeof runningExperiments[0]) => (
    <div key={experiment.id} className="group p-4 bg-gradient-to-br from-[var(--color-background)] to-[var(--color-surface)] border rounded-xl border-[var(--color-border-subtle)] hover:border-[var(--color-primary-300)] hover:-translate-y-0.5 cursor-pointer transition-all" style={{ transitionDuration: 'var(--duration-normal)', boxShadow: 'var(--shadow-sm)' }} onMouseEnter={(e) => e.currentTarget.style.boxShadow = 'var(--shadow-md)'} onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'var(--shadow-sm)'}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h4 className="font-semibold text-[var(--color-text-primary)] mb-1 group-hover:text-[var(--color-primary-600)] transition-colors">
            {experiment.name}
          </h4>
          <p className="text-xs text-[var(--color-text-secondary)] mb-2">{experiment.project}</p>
        </div>
        <div className="flex items-center gap-2 ml-2">
          <div className={`p-1.5 rounded-lg ${experiment.status === 'running' ? 'bg-green-100' :
            experiment.status === 'completed' ? 'bg-blue-100' :
              experiment.status === 'queued' ? 'bg-yellow-100' : 'bg-gray-100'
            }`}>
            {experiment.status === 'running' && <Play className="w-3 h-3 text-green-600" />}
            {experiment.status === 'queued' && <Clock className="w-3 h-3 text-yellow-600" />}
            {experiment.status === 'completed' && <CheckCircle2 className="w-3 h-3 text-blue-600" />}
          </div>
          <span className={`text-xs px-2 py-1 rounded-full font-medium capitalize ${experiment.status === 'running' ? 'bg-green-100 text-green-700' :
            experiment.status === 'completed' ? 'bg-blue-100 text-blue-700' :
              experiment.status === 'queued' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'
            }`}>
            {experiment.status}
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {/* Progress Bar */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-[var(--color-text-secondary)]">Progress</span>
            <span className="text-xs font-semibold text-[var(--color-text-primary)]">{experiment.progress}%</span>
          </div>
          <div className="w-full bg-[var(--color-surface-elevated)] rounded-full h-1.5 overflow-hidden">
            <div
              className={`h-1.5 rounded-full transition-all ease-out ${experiment.status === 'running' ? 'bg-gradient-to-r from-[var(--color-success-500)] to-[var(--color-success-600)]' :
                experiment.status === 'completed' ? 'bg-gradient-to-r from-[var(--color-primary-500)] to-[var(--color-primary-600)]' :
                  'bg-gradient-to-r from-[var(--color-warning-500)] to-[var(--color-warning-600)]'
                }`}
              style={{ width: `${experiment.progress}%`, transitionDuration: 'var(--duration-slow)' }}
            />
          </div>
        </div>

        {/* Resource and ETA Info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`p-1 rounded text-xs font-medium ${experiment.resources?.[0]?.type === 'gpu' ? 'bg-green-100 text-green-700' :
              experiment.resources?.[0]?.type === 'cpu' ? 'bg-blue-100 text-blue-700' :
                'bg-gray-100 text-gray-700'
              }`}>
              {experiment.resources?.[0]?.type?.toUpperCase() || 'CPU'}
            </div>
            <span className="text-xs text-[var(--color-text-secondary)]">
              ETA: {experiment.eta || 'N/A'}
            </span>
          </div>
          <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
            <MoreHorizontal className="w-3 h-3" />
          </Button>
        </div>
      </div>
    </div>
  )

  const renderRecommendationCard = (rec: typeof aiRecommendations[0]) => (
    <div key={rec.id} className="group p-4 border rounded-xl bg-gradient-to-br from-[var(--color-primary-50)] to-[var(--color-primary-100)] border-[var(--color-primary-200)] hover:-translate-y-0.5 cursor-pointer transition-all" style={{ transitionDuration: 'var(--duration-normal)', boxShadow: 'var(--shadow-sm)' }} onMouseEnter={(e) => e.currentTarget.style.boxShadow = 'var(--shadow-md)'} onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'var(--shadow-sm)'}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h4 className="font-semibold text-[var(--color-text-primary)] mb-2 group-hover:text-[var(--color-primary-700)] transition-colors">
            {rec.title}
          </h4>
          <p className="text-sm text-[var(--color-text-secondary)] mb-3 line-clamp-2">
            {rec.description}
          </p>
          <div className="flex items-center gap-2">
            <span className="text-xs px-2 py-1 bg-[var(--color-primary-200)] text-[var(--color-primary-800)] rounded-full font-medium">
              {rec.relevance}% match
            </span>
            <span className="text-xs px-2 py-1 bg-white/50 text-[var(--color-primary-700)] border border-[var(--color-primary-300)] rounded-full font-medium capitalize">
              {rec.type}
            </span>
          </div>
        </div>
        <div className="ml-2">
          <div className="p-2 bg-[var(--color-primary-600)] rounded-lg">
            {rec.type === 'paper' && <FileText className="w-4 h-4 text-white" />}
            {rec.type === 'collaborator' && <Users className="w-4 h-4 text-white" />}
            {rec.type === 'funding' && <Zap className="w-4 h-4 text-white" />}
          </div>
        </div>
      </div>

      <Button size="sm" variant="primary" className="w-full flex items-center justify-center gap-2" style={{ boxShadow: 'var(--shadow-sm)' }}>
        <span>{rec.action}</span>
        <ArrowUpRight className="w-3 h-3" />
      </Button>
    </div>
  )

  return (
    <div className="h-full bg-[var(--color-background)]">
      <div className="p-6 pb-8 space-y-8">
        {/* Enhanced Header with Quick Actions */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-[var(--color-text-primary)]">
                Research Dashboard
              </h1>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-[var(--color-text-secondary)]">Live</span>
              </div>
            </div>
            <p className="text-[var(--color-text-secondary)] mb-3">
              Welcome back, Dr. Sarah Chen. Here&apos;s your research overview for today.
            </p>
            <div className="flex items-center gap-4 text-sm text-[var(--color-text-secondary)]">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>Last updated: 2 minutes ago</span>
              </div>
              <div className="flex items-center gap-1">
                <Bell className="w-4 h-4" />
                <span>3 new notifications</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Search className="w-4 h-4" />
                Search
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filter
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4" />
                Refresh
              </Button>
            </div>
            <div className="w-px h-6 bg-[var(--color-border-subtle)]"></div>
            <Button variant="primary" className="flex items-center gap-2" style={{ boxShadow: 'var(--shadow-lg)' }}>
              <Plus className="w-4 h-4" />
              New Project
            </Button>
          </div>
        </div>

        {/* Enhanced Metrics Overview - Responsive Grid */}
        {isLoadingMetrics ? (
          <MetricsGridSkeleton />
        ) : (
          <div className="grid gap-6 transition-all duration-300" style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))'
          }}>
            {/* Projects Metric */}
            <div className="group bg-gradient-to-br from-[var(--color-background)] to-[var(--color-surface)] rounded-xl border border-[var(--color-border-subtle)] p-6 hover:border-[var(--color-primary-300)] hover:-translate-y-1 cursor-pointer transition-all" style={{ boxShadow: 'var(--shadow-sm)', transitionDuration: 'var(--duration-normal)' }} onMouseEnter={(e) => e.currentTarget.style.boxShadow = 'var(--shadow-lg)'} onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'var(--shadow-sm)'}>
              <div className="flex items-start justify-between mb-4">
                <div className="p-2 bg-[var(--color-primary-100)] rounded-lg group-hover:bg-[var(--color-primary-200)] group-hover:scale-110 transition-all" style={{ transitionDuration: 'var(--duration-normal)' }}>
                  <Target className="w-5 h-5 text-[var(--color-primary-600)]" />
                </div>
                <div className="flex items-center gap-1 text-[var(--color-success-600)]">
                  <ArrowUpRight className="w-3 h-3" />
                  <span className="text-xs font-medium">+12%</span>
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-[var(--color-text-primary)] mb-1 group-hover:text-[var(--color-primary-600)] transition-colors">{metrics.totalProjects}</p>
                <p className="text-sm text-[var(--color-text-secondary)] mb-2">Active Projects</p>
                <div className="w-full bg-[var(--color-surface-elevated)] rounded-full h-1.5 overflow-hidden">
                  <div className="bg-[var(--color-primary-600)] h-1.5 rounded-full transition-all ease-out" style={{ width: '75%', transitionDuration: 'var(--duration-slow)' }}></div>
                </div>
              </div>
            </div>

            {/* Experiments Metric */}
            <div className="group bg-gradient-to-br from-[var(--color-background)] to-[var(--color-surface)] rounded-xl border border-[var(--color-border-subtle)] p-6 hover:border-[var(--color-primary-300)] hover:-translate-y-1 cursor-pointer transition-all" style={{ boxShadow: 'var(--shadow-sm)', transitionDuration: 'var(--duration-normal)' }} onMouseEnter={(e) => e.currentTarget.style.boxShadow = 'var(--shadow-lg)'} onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'var(--shadow-sm)'}>
              <div className="flex items-start justify-between mb-4">
                <div className="p-2 bg-[var(--color-success-100)] rounded-lg group-hover:bg-[var(--color-success-50)] group-hover:scale-110 transition-all" style={{ transitionDuration: 'var(--duration-normal)' }}>
                  <Activity className="w-5 h-5 text-[var(--color-success-600)]" />
                </div>
                <div className="flex items-center gap-1 text-[var(--color-success-600)]">
                  <ArrowUpRight className="w-3 h-3" />
                  <span className="text-xs font-medium">+8%</span>
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-[var(--color-text-primary)] mb-1 group-hover:text-[var(--color-success-600)] transition-colors">{metrics.activeExperiments}</p>
                <p className="text-sm text-[var(--color-text-secondary)] mb-2">Running Experiments</p>
                <div className="w-full bg-[var(--color-surface-elevated)] rounded-full h-1.5 overflow-hidden">
                  <div className="bg-[var(--color-success-600)] h-1.5 rounded-full transition-all ease-out" style={{ width: '60%', transitionDuration: 'var(--duration-slow)' }}></div>
                </div>
              </div>
            </div>

            {/* Collaborations Metric */}
            <div className="group bg-gradient-to-br from-[var(--color-background)] to-[var(--color-surface)] rounded-xl border border-[var(--color-border-subtle)] p-6 hover:border-[var(--color-primary-300)] hover:-translate-y-1 cursor-pointer transition-all" style={{ boxShadow: 'var(--shadow-sm)', transitionDuration: 'var(--duration-normal)' }} onMouseEnter={(e) => e.currentTarget.style.boxShadow = 'var(--shadow-lg)'} onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'var(--shadow-sm)'}>
              <div className="flex items-start justify-between mb-4">
                <div className="p-2 bg-[var(--color-primary-100)] rounded-lg group-hover:bg-[var(--color-primary-200)] group-hover:scale-110 transition-all" style={{ transitionDuration: 'var(--duration-normal)' }}>
                  <Users className="w-5 h-5 text-[var(--color-primary-600)]" />
                </div>
                <div className="flex items-center gap-1 text-[var(--color-success-600)]">
                  <ArrowUpRight className="w-3 h-3" />
                  <span className="text-xs font-medium">+5%</span>
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-[var(--color-text-primary)] mb-1 group-hover:text-[var(--color-primary-600)] transition-colors">{metrics.collaborations}</p>
                <p className="text-sm text-[var(--color-text-secondary)] mb-2">Active Collaborations</p>
                <div className="w-full bg-[var(--color-surface-elevated)] rounded-full h-1.5 overflow-hidden">
                  <div className="bg-[var(--color-primary-600)] h-1.5 rounded-full transition-all ease-out" style={{ width: '45%', transitionDuration: 'var(--duration-slow)' }}></div>
                </div>
              </div>
            </div>

            {/* Citations Metric */}
            <div className="group bg-gradient-to-br from-[var(--color-background)] to-[var(--color-surface)] rounded-xl border border-[var(--color-border-subtle)] p-6 hover:border-[var(--color-primary-300)] hover:-translate-y-1 cursor-pointer transition-all" style={{ boxShadow: 'var(--shadow-sm)', transitionDuration: 'var(--duration-normal)' }} onMouseEnter={(e) => e.currentTarget.style.boxShadow = 'var(--shadow-lg)'} onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'var(--shadow-sm)'}>
              <div className="flex items-start justify-between mb-4">
                <div className="p-2 bg-[var(--color-warning-100)] rounded-lg group-hover:bg-[var(--color-warning-50)] group-hover:scale-110 transition-all" style={{ transitionDuration: 'var(--duration-normal)' }}>
                  <Award className="w-5 h-5 text-[var(--color-warning-600)]" />
                </div>
                <div className="flex items-center gap-1 text-[var(--color-success-600)]">
                  <ArrowUpRight className="w-3 h-3" />
                  <span className="text-xs font-medium">+23%</span>
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-[var(--color-text-primary)] mb-1 group-hover:text-[var(--color-warning-600)] transition-colors">{metrics.citations}</p>
                <p className="text-sm text-[var(--color-text-secondary)] mb-2">Total Citations</p>
                <div className="w-full bg-[var(--color-surface-elevated)] rounded-full h-1.5 overflow-hidden">
                  <div className="bg-[var(--color-warning-600)] h-1.5 rounded-full transition-all ease-out" style={{ width: '85%', transitionDuration: 'var(--duration-slow)' }}></div>
                </div>
              </div>
            </div>

            {/* Impact Score Metric */}
            <div className="group bg-gradient-to-br from-[var(--color-background)] to-[var(--color-surface)] rounded-xl border border-[var(--color-border-subtle)] p-6 hover:border-[var(--color-primary-300)] hover:-translate-y-1 cursor-pointer transition-all" style={{ boxShadow: 'var(--shadow-sm)', transitionDuration: 'var(--duration-normal)' }} onMouseEnter={(e) => e.currentTarget.style.boxShadow = 'var(--shadow-lg)'} onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'var(--shadow-sm)'}>
              <div className="flex items-start justify-between mb-4">
                <div className="p-2 bg-[var(--color-primary-100)] rounded-lg group-hover:bg-[var(--color-primary-200)] group-hover:scale-110 transition-all" style={{ transitionDuration: 'var(--duration-normal)' }}>
                  <TrendingUp className="w-5 h-5 text-[var(--color-primary-600)]" />
                </div>
                <div className="flex items-center gap-1 text-[var(--color-success-600)]">
                  <ArrowUpRight className="w-3 h-3" />
                  <span className="text-xs font-medium">+15%</span>
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-[var(--color-text-primary)] mb-1 group-hover:text-[var(--color-primary-600)] transition-colors">{metrics.impactScore}</p>
                <p className="text-sm text-[var(--color-text-secondary)] mb-2">Impact Score</p>
                <div className="w-full bg-[var(--color-surface-elevated)] rounded-full h-1.5 overflow-hidden">
                  <div className="bg-[var(--color-primary-600)] h-1.5 rounded-full transition-all ease-out" style={{ width: '70%', transitionDuration: 'var(--duration-slow)' }}></div>
                </div>
              </div>
            </div>

            {/* Funding Metric */}
            <div className="group bg-gradient-to-br from-[var(--color-background)] to-[var(--color-surface)] rounded-xl border border-[var(--color-border-subtle)] p-6 hover:border-[var(--color-primary-300)] hover:-translate-y-1 cursor-pointer transition-all" style={{ boxShadow: 'var(--shadow-sm)', transitionDuration: 'var(--duration-normal)' }} onMouseEnter={(e) => e.currentTarget.style.boxShadow = 'var(--shadow-lg)'} onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'var(--shadow-sm)'}>
              <div className="flex items-start justify-between mb-4">
                <div className="p-2 bg-[var(--color-warning-100)] rounded-lg group-hover:bg-[var(--color-warning-50)] group-hover:scale-110 transition-all" style={{ transitionDuration: 'var(--duration-normal)' }}>
                  <Zap className="w-5 h-5 text-[var(--color-warning-600)]" />
                </div>
                <div className="flex items-center gap-1 text-[var(--color-success-600)]">
                  <ArrowUpRight className="w-3 h-3" />
                  <span className="text-xs font-medium">+32%</span>
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-[var(--color-text-primary)] mb-1 group-hover:text-[var(--color-warning-600)] transition-colors">${(metrics.fundingSecured / 1000).toFixed(0)}K</p>
                <p className="text-sm text-[var(--color-text-secondary)] mb-2">Funding Secured</p>
                <div className="w-full bg-[var(--color-surface-elevated)] rounded-full h-1.5 overflow-hidden">
                  <div className="bg-[var(--color-warning-600)] h-1.5 rounded-full transition-all ease-out" style={{ width: '90%', transitionDuration: 'var(--duration-slow)' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Main Content Grid */}
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Active Projects - Enhanced */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-[var(--color-background)] rounded-xl border border-[var(--color-border-subtle)] shadow-sm">
              <div className="p-6 border-b border-[var(--color-border-subtle)]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[var(--color-primary-100)] rounded-lg">
                      <GitBranch className="w-5 h-5 text-[var(--color-primary-600)]" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">Active Projects</h2>
                      <p className="text-sm text-[var(--color-text-secondary)]">Your ongoing research initiatives</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <BarChart3 className="w-4 h-4" />
                      Analytics
                    </Button>
                    <Button variant="secondary" size="sm" className="flex items-center gap-2">
                      View All
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="p-6">
                {isLoadingProjects ? (
                  <ProjectsListSkeleton />
                ) : activeProjects.length === 0 ? (
                  <EmptyProjectsState />
                ) : (
                  <div className="space-y-4">
                    {activeProjects.map(renderProjectCard)}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Enhanced Right Column */}
          <div className="lg:col-span-4 space-y-6">
            {/* Quick Actions Panel */}
            <div className="bg-gradient-to-br from-[var(--color-primary-50)] to-[var(--color-primary-100)] rounded-xl border border-[var(--color-primary-200)] p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-[var(--color-primary-600)] rounded-lg">
                  <Rocket className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--color-text-primary)]">Quick Actions</h3>
                  <p className="text-sm text-[var(--color-text-secondary)]">Start something new</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" size="sm" className="flex flex-col items-center gap-2 h-auto py-3">
                  <FileText className="w-4 h-4" />
                  <span className="text-xs">New Paper</span>
                </Button>
                <Button variant="outline" size="sm" className="flex flex-col items-center gap-2 h-auto py-3">
                  <Database className="w-4 h-4" />
                  <span className="text-xs">Import Data</span>
                </Button>
                <Button variant="outline" size="sm" className="flex flex-col items-center gap-2 h-auto py-3">
                  <Users className="w-4 h-4" />
                  <span className="text-xs">Invite Team</span>
                </Button>
                <Button variant="outline" size="sm" className="flex flex-col items-center gap-2 h-auto py-3">
                  <Brain className="w-4 h-4" />
                  <span className="text-xs">AI Assistant</span>
                </Button>
              </div>
            </div>

            {/* Running Experiments - Enhanced */}
            <div className="bg-[var(--color-background)] rounded-xl border border-[var(--color-border-subtle)] shadow-sm">
              <div className="p-4 border-b border-[var(--color-border-subtle)]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-green-100 rounded-lg">
                      <Activity className="w-4 h-4 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-[var(--color-text-primary)]">Running Experiments</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full font-medium">{runningExperiments.length} Active</span>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="p-4">
                {isLoadingExperiments ? (
                  <ExperimentsListSkeleton />
                ) : runningExperiments.length === 0 ? (
                  <EmptyExperimentsState />
                ) : (
                  <div className="space-y-3">
                    {runningExperiments.map(renderExperimentCard)}
                  </div>
                )}
              </div>
            </div>

            {/* AI Recommendations - Enhanced */}
            <div className="bg-gradient-to-br from-[var(--color-background)] to-[var(--color-surface)] rounded-xl border border-[var(--color-border-subtle)] shadow-sm">
              <div className="p-4 border-b border-[var(--color-border-subtle)]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-[var(--color-primary-100)] rounded-lg">
                      <Lightbulb className="w-4 h-4 text-[var(--color-primary-600)]" />
                    </div>
                    <h3 className="font-semibold text-[var(--color-text-primary)]">AI Recommendations</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-1 bg-[var(--color-primary-100)] text-[var(--color-primary-700)] rounded-full font-medium animate-pulse">New</span>
                    <Button variant="ghost" size="sm">
                      <RefreshCw className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="p-4">
                {isLoadingRecommendations ? (
                  <RecommendationsListSkeleton />
                ) : aiRecommendations.length === 0 ? (
                  <EmptyRecommendationsState />
                ) : (
                  <div className="space-y-3">
                    {aiRecommendations.map(renderRecommendationCard)}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
