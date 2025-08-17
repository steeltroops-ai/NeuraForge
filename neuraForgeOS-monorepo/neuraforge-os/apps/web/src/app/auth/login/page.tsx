import { Metadata } from 'next'
import { LoginForm } from '@/components/auth/login-form'
import { AuthLayout } from '@/components/auth/auth-layout'
import { AuthGuard } from '@/components/auth/auth-guard'

export const metadata: Metadata = {
  title: 'Login - NeuraForge OS',
  description: 'Sign in to your NeuraForge OS account',
}

export default function LoginPage() {
  return (
    <AuthGuard requireAuth={false}>
      <AuthLayout
        title="Welcome back"
        subtitle="Sign in to your account to continue your research journey"
      >
        <LoginForm />
      </AuthLayout>
    </AuthGuard>
  )
}