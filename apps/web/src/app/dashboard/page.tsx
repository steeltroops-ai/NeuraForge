import { Metadata } from 'next'
import { DashboardOverview } from '@/components/dashboard/dashboard-overview'
import { RecentProjects } from '@/components/dashboard/recent-projects'
import { ActivityFeed } from '@/components/dashboard/activity-feed'
import { AIInsights } from '@/components/dashboard/ai-insights'
import { AuthGuard } from '@/components/auth/auth-guard'

export const metadata: Metadata = {
  title: 'Dashboard - NeuraForge OS',
  description: 'Your research dashboard with AI-powered insights',
}

export default function DashboardPage() {
  return (
    <AuthGuard requireAuth={true}>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Welcome back! Here's what's happening with your research.
          </p>
        </div>

        <DashboardOverview />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <RecentProjects />
            <ActivityFeed />
          </div>
          <div>
            <AIInsights />
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}