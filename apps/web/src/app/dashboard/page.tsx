import { Metadata } from 'next'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { DashboardContent } from '@/components/dashboard/dashboard-content'

export const metadata: Metadata = {
  title: 'Research Dashboard | NeuraForge',
  description: 'AI-native research platform dashboard for collaborative scientific research',
}

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <DashboardContent />
    </DashboardLayout>
  )
}
