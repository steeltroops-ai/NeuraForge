'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useSignUp } from '@clerk/nextjs'
import { Button } from '@/components/ui/design-system-button'
import { Input } from '@/components/ui/modern-input'
import { EnhancedCard } from '@/components/ui/modern-card'
import { useToast } from '@/hooks/use-toast'
import { Mail, Lock, User, ArrowRight, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

type RegisterFormData = z.infer<typeof registerSchema>

export function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false)
  const { signUp, setActive, isLoaded } = useSignUp()
  const { toast } = useToast()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: RegisterFormData) => {
    if (!isLoaded) return

    setIsLoading(true)
    try {
      const result = await signUp.create({
        emailAddress: data.email,
        password: data.password,
        firstName: data.name,
      })

      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId })
        toast({
          title: 'Account created!',
          description: 'Welcome to NeuraForge OS. Your research journey begins now.',
          variant: 'success',
        })
        router.push('/dashboard')
      } else {
        // Handle email verification if needed
        console.log('Sign up incomplete:', result)
        toast({
          title: 'Account created!',
          description: 'Please check your email to verify your account.',
          variant: 'success',
        })
      }
    } catch (error: any) {
      console.error('Registration error:', error)
      toast({
        title: 'Registration failed',
        description: error?.errors?.[0]?.message || 'Failed to create account. Please try again.',
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
          <h2 className="text-2xl font-bold text-secondary-900 mb-2">Create your account</h2>
          <p className="text-secondary-600">Join the future of research collaboration</p>
        </motion.div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <motion.div variants={itemVariants}>
            <Input
              label="Full name"
              type="text"
              autoComplete="name"
              placeholder="Enter your full name"
              leftIcon={<User className="h-4 w-4" />}
              error={errors.name?.message}
              {...register('name')}
            />
          </motion.div>

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
              autoComplete="new-password"
              placeholder="Create a password"
              leftIcon={<Lock className="h-4 w-4" />}
              error={errors.password?.message}
              hint="Must be at least 8 characters"
              {...register('password')}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <Input
              label="Confirm password"
              type="password"
              autoComplete="new-password"
              placeholder="Confirm your password"
              leftIcon={<Lock className="h-4 w-4" />}
              error={errors.confirmPassword?.message}
              {...register('confirmPassword')}
            />
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-secondary-300 rounded transition-colors"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="terms" className="text-secondary-700">
                I agree to the{' '}
                <Link href="/terms" className="font-medium text-primary-600 hover:text-primary-700">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="font-medium text-primary-600 hover:text-primary-700">
                  Privacy Policy
                </Link>
              </label>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Button
              type="submit"
              loading={isLoading}
              variant="primary"
              size="lg"
              className="w-full group"
              rightIcon={<ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />}
            >
              {isLoading ? 'Creating account...' : 'Create account'}
            </Button>
          </motion.div>

          <motion.div variants={itemVariants} className="text-center">
            <span className="text-sm text-secondary-600">
              Already have an account?{' '}
              <Link 
                href="/auth/login" 
                className="font-medium text-primary-600 hover:text-primary-700 transition-colors"
              >
                Sign in
              </Link>
            </span>
          </motion.div>
        </form>
      </EnhancedCard>
    </motion.div>
  )
}