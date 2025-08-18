'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useSignIn } from '@clerk/nextjs'
import { Button } from '@/components/ui/modern-button'
import { Input } from '@/components/ui/modern-input'
import { EnhancedCard } from '@/components/ui/modern-card'
import { useToast } from '@/hooks/use-toast'
import { Mail, Lock, ArrowRight, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type LoginFormData = z.infer<typeof loginSchema>

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const { signIn, setActive, isLoaded } = useSignIn()
  const { toast } = useToast()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'demo@neuraforge.dev',
      password: 'demo123'
    }
  })

  const onSubmit = async (data: LoginFormData) => {
    if (!isLoaded) return

    setIsLoading(true)
    try {
      const result = await signIn.create({
        identifier: data.email,
        password: data.password,
      })

      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId })
        toast({
          title: 'Welcome back!',
          description: 'You have been successfully logged in.',
          variant: 'success',
        })
        router.push('/dashboard')
      } else {
        console.error('Login incomplete:', result)
        toast({
          title: 'Login failed',
          description: 'Please complete the sign-in process.',
          variant: 'destructive',
        })
      }
    } catch (error: any) {
      console.error('Login error:', error)
      toast({
        title: 'Login failed',
        description: error?.errors?.[0]?.message || 'Invalid credentials. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-md mx-auto"
    >
      <EnhancedCard variant="elevated" className="p-8">
        <motion.div variants={itemVariants} className="text-center mb-8">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-neural-gradient shadow-glow">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-secondary-900 mb-2">Welcome back</h2>
          <p className="text-secondary-600">Sign in to your research workspace</p>
        </motion.div>

        {/* Demo Credentials Notice */}
        <motion.div variants={itemVariants}>
          <EnhancedCard variant="glow" className="p-4 mb-6 bg-primary-50/50 border-primary-200">
            <div className="text-center">
              <p className="text-sm font-medium text-primary-800 mb-2">Demo Credentials</p>
              <div className="text-xs text-primary-700 space-y-1">
                <p><strong>Email:</strong> demo@neuraforge.dev</p>
                <p><strong>Password:</strong> demo123</p>
              </div>
            </div>
          </EnhancedCard>
        </motion.div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <motion.div variants={itemVariants}>
            <Input
              label="Email address"
              type="email"
              autoComplete="email"
              placeholder="Enter your email"
              leftIcon={<Mail className="h-4 w-4" />}
              error={errors.email?.message}
              {...register('email')}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <Input
              label="Password"
              type="password"
              autoComplete="current-password"
              placeholder="Enter your password"
              leftIcon={<Lock className="h-4 w-4" />}
              error={errors.password?.message}
              {...register('password')}
            />
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-secondary-300 rounded transition-colors"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-secondary-700">
                Remember me
              </label>
            </div>

            <Link 
              href="/auth/forgot-password" 
              className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
            >
              Forgot password?
            </Link>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Button
              type="submit"
              loading={isLoading}
              variant="gradient"
              size="lg"
              className="w-full group"
              rightIcon={<ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />}
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>
          </motion.div>

          <motion.div variants={itemVariants} className="text-center">
            <span className="text-sm text-secondary-600">
              Don't have an account?{' '}
              <Link 
                href="/auth/register" 
                className="font-medium text-primary-600 hover:text-primary-700 transition-colors"
              >
                Sign up
              </Link>
            </span>
          </motion.div>
        </form>
      </EnhancedCard>
    </motion.div>
  )
}