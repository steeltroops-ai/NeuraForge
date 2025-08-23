'use client'

import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { ResearchTreeExample } from '@/components/research/research-tree-visualization'
import { ExperimentTracker } from '@/components/research/experiment-tracker'
import { mockExperiments } from '@/lib/mock-data'
import { ArrowLeft, GitBranch, Microscope } from 'lucide-react'
import Link from 'next/link'

export default function ResearchPage() {
  return (
    <DashboardLayout>
      <div className="h-full overflow-auto bg-gray-50">
        <div className="p-6 space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Research Overview
              </h1>
              <p className="mt-2 text-gray-600">
                Manage your research projects, experiments, and collaborations in one place
              </p>
            </div>
            <Link href="/" className="inline-flex items-center font-medium text-purple-600 transition-colors duration-200 hover:text-purple-700">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </div>

          {/* Research Tree Visualization */}
          <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <GitBranch className="w-6 h-6 text-purple-600" />
                <h2 className="text-2xl font-bold text-gray-900">
                  Research Tree Visualization
                </h2>
              </div>
              <p className="text-gray-600">
                Interactive hierarchical view of research project structure and progress tracking
              </p>
            </div>
            <ResearchTreeExample />
          </div>

          {/* Experiment Tracker */}
          <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Microscope className="w-6 h-6 text-purple-600" />
                <h2 className="text-2xl font-bold text-gray-900">
                  Experiment Tracker
                </h2>
              </div>
              <p className="text-gray-600">
                Comprehensive experiment management with real-time monitoring and resource allocation
              </p>
            </div>
            <ExperimentTracker
              experiments={mockExperiments}
              onExperimentClick={(experiment) => {
                console.log('Experiment clicked:', experiment)
              }}
              onStatusChange={(experimentId, status) => {
                console.log('Status changed:', experimentId, status)
              }}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
