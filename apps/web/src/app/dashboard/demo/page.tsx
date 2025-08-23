'use client'

import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { ResearchTreeVisualization } from '@/components/research/research-tree-visualization'
import { ExperimentTracker } from '@/components/research/experiment-tracker'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import {
  mockProjects,
  mockExperiments,
  mockRecommendations,
  mockMetrics
} from '@/lib/mock-data'
import {
  GitBranch,
  Target,
  Microscope,
  Users,
  Award,
  TrendingUp,
  Zap,
  Activity,
  MessageCircle
} from 'lucide-react'



// Sample research tree data
const sampleResearchTree = {
  id: 'project-1',
  title: 'Neural Network Optimization',
  type: 'project' as const,
  status: 'active' as const,
  progress: 73,
  description: 'Improving deep learning model performance through architectural optimizations',
  assignee: 'Dr. Sarah Chen',
  dueDate: '2024-03-15',
  children: [
    {
      id: 'goal-1',
      title: 'Architecture Design',
      type: 'goal' as const,
      status: 'completed' as const,
      progress: 100,
      description: 'Design optimal neural network architecture',
      assignee: 'Dr. Sarah Chen',
      children: [
        {
          id: 'milestone-1',
          title: 'Literature Review',
          type: 'milestone' as const,
          status: 'completed' as const,
          progress: 100,
          assignee: 'Dr. Sarah Chen'
        },
        {
          id: 'milestone-2',
          title: 'Architecture Prototype',
          type: 'milestone' as const,
          status: 'completed' as const,
          progress: 100,
          assignee: 'Dr. Sarah Chen'
        }
      ]
    },
    {
      id: 'goal-2',
      title: 'Model Training',
      type: 'goal' as const,
      status: 'active' as const,
      progress: 60,
      description: 'Train and optimize the neural network model',
      assignee: 'Dr. Alex Kumar',
      children: [
        {
          id: 'experiment-1',
          title: 'Baseline Training',
          type: 'experiment' as const,
          status: 'completed' as const,
          progress: 100,
          assignee: 'Dr. Alex Kumar'
        },
        {
          id: 'experiment-2',
          title: 'Hyperparameter Tuning',
          type: 'experiment' as const,
          status: 'active' as const,
          progress: 45,
          assignee: 'Dr. Alex Kumar'
        }
      ]
    }
  ]
}

export default function DashboardDemoPage() {
  return (
    <DashboardLayout>
      <div className="h-full overflow-auto bg-neutral-50 dark:bg-neutral-900">
        <div className="p-6 space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
                NeuraForge Dashboard Demo
              </h1>
              <p className="text-neutral-600 dark:text-neutral-400 mt-2">
                Comprehensive showcase of all research dashboard components and features
              </p>
            </div>
            <Badge variant="secondary" className="text-sm">
              Demo Mode
            </Badge>
          </div>

          {/* Metrics Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary-500" />
                  <div>
                    <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">{mockMetrics.totalProjects}</p>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400">Projects</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">{mockMetrics.activeExperiments}</p>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400">Experiments</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">{mockMetrics.collaborations}</p>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400">Collaborations</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-yellow-500" />
                  <div>
                    <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">{mockMetrics.citations}</p>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400">Citations</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-purple-500" />
                  <div>
                    <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">{mockMetrics.impactScore}</p>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400">Impact Score</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-orange-500" />
                  <div>
                    <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">${(mockMetrics.fundingSecured / 1000).toFixed(0)}K</p>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400">Funding</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Research Tree Visualization */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GitBranch className="h-5 w-5" />
                Research Tree Visualization
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResearchTreeVisualization 
                data={sampleResearchTree}
                onNodeClick={(node) => console.log('Node clicked:', node)}
                onNodeExpand={(nodeId) => console.log('Node expanded:', nodeId)}
              />
            </CardContent>
          </Card>

          {/* Active Projects Grid */}
          <div>
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              Active Research Projects
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockProjects.slice(0, 3).map(project => (
                <Card key={project.id} className="hover:shadow-md transition-shadow duration-200">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                          {project.title}
                        </CardTitle>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
                          {project.description}
                        </p>
                        <Badge variant="outline" className="text-xs">
                          {project.domain}
                        </Badge>
                      </div>
                      <div className={`w-3 h-3 rounded-full ${
                        project.status === 'active' ? 'bg-green-500' : 
                        project.status === 'review' ? 'bg-yellow-500' : 'bg-neutral-400'
                      }`} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-neutral-600 dark:text-neutral-400">Progress</span>
                          <span className="text-neutral-900 dark:text-neutral-100">{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-2" />
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4 text-neutral-400" />
                            <span className="text-neutral-600 dark:text-neutral-400">{project.collaborators}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Microscope className="h-4 w-4 text-neutral-400" />
                            <span className="text-neutral-600 dark:text-neutral-400">{project.experiments}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Award className="h-4 w-4 text-neutral-400" />
                            <span className="text-neutral-600 dark:text-neutral-400">{project.citations}</span>
                          </div>
                        </div>
                        <span className="text-neutral-500 dark:text-neutral-400">{project.lastActivity}</span>
                      </div>
                      
                      <div className="flex gap-2 pt-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          View Details
                        </Button>
                        <Button size="sm" className="flex-1">
                          Continue Work
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Experiment Tracker */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Microscope className="h-5 w-5" />
                Experiment Tracker
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ExperimentTracker 
                experiments={mockExperiments}
                onExperimentClick={(experiment) => console.log('Experiment clicked:', experiment)}
                onStatusChange={(experimentId, status) => console.log('Status changed:', experimentId, status)}
              />
            </CardContent>
          </Card>

          {/* AI Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                AI Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockRecommendations.map(rec => (
                  <div key={rec.id} className="p-4 bg-gradient-to-r from-primary-50 to-purple-50 dark:from-primary-900/20 dark:to-purple-900/20 rounded-lg border border-primary-200 dark:border-primary-800">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="font-medium text-neutral-900 dark:text-neutral-100 mb-1">{rec.title}</h4>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">{rec.description}</p>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-xs">
                            {rec.relevance}% match
                          </Badge>
                          <Badge variant="outline" className="text-xs capitalize">
                            {rec.type}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <Button size="sm" className="w-full mt-3">
                      {rec.action}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
