import { Metadata } from 'next'
import { RegisterForm } from '@/components/auth/register-form'
import { AuthLayout } from '@/components/auth/auth-layout'
import { AuthGuard } from '@/components/auth/auth-guard'

export const metadata: Metadata = {
  title: 'Register - NeuraForge OS',
  description: 'Create your NeuraForge OS account',
}

export default function RegisterPage() {
  return (
    <AuthGuard requireAuth={false}>
      <AuthLayout
        title="Join NeuraForge OS"
        subtitle="Create your account and start revolutionizing your research workflow"
      >
        <RegisterForm />
      </AuthLayout>
    </AuthGuard>
  )
}