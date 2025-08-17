'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react'

const inputVariants = cva(
  'flex w-full rounded-xl border bg-white px-4 py-3 text-sm transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-secondary-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border-secondary-300 shadow-soft focus-visible:border-primary-500 focus-visible:ring-primary-500/20 hover:border-secondary-400',
        error: 'border-error-500 bg-error-50/50 focus-visible:ring-error-500/20 shadow-soft',
        success: 'border-success-500 bg-success-50/50 focus-visible:ring-success-500/20 shadow-soft',
        ghost: 'border-transparent bg-secondary-50 hover:bg-secondary-100 focus-visible:bg-white focus-visible:border-primary-500 focus-visible:ring-primary-500/20',
      },
      inputSize: {
        sm: 'h-9 px-3 py-2 text-sm rounded-lg',
        default: 'h-11 px-4 py-3 text-sm',
        lg: 'h-13 px-5 py-4 text-base rounded-2xl',
      },
    },
    defaultVariants: {
      variant: 'default',
      inputSize: 'default',
    },
  }
)

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  error?: string
  success?: string
  label?: string
  hint?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, inputSize, type, leftIcon, rightIcon, error, success, label, hint, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false)
    const isPassword = type === 'password'
    const inputType = isPassword && showPassword ? 'text' : type

    // Auto-detect variant based on error/success
    const computedVariant = error ? 'error' : success ? 'success' : variant

    return (
      <div className="space-y-2">
        {label && (
          <label className="text-sm font-medium text-secondary-900 block">
            {label}
          </label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary-500">
              {leftIcon}
            </div>
          )}
          
          <input
            type={inputType}
            className={cn(
              inputVariants({ variant: computedVariant, inputSize }),
              {
                'pl-10': leftIcon,
                'pr-10': rightIcon || isPassword || error || success,
              },
              className
            )}
            ref={ref}
            {...props}
          />
          
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center space-x-1">
            {error && (
              <AlertCircle className="h-4 w-4 text-error-500" />
            )}
            
            {success && !error && (
              <CheckCircle className="h-4 w-4 text-success-500" />
            )}
            
            {isPassword && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-secondary-500 hover:text-secondary-700 transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            )}
            
            {rightIcon && !isPassword && !error && !success && (
              <div className="text-secondary-500">
                {rightIcon}
              </div>
            )}
          </div>
        </div>
        
        {(error || success || hint) && (
          <div className="space-y-1">
            {error && (
              <p className="text-sm text-error-600 flex items-center space-x-1">
                <AlertCircle className="h-3 w-3 flex-shrink-0" />
                <span>{error}</span>
              </p>
            )}
            
            {success && !error && (
              <p className="text-sm text-success-600 flex items-center space-x-1">
                <CheckCircle className="h-3 w-3 flex-shrink-0" />
                <span>{success}</span>
              </p>
            )}
            
            {hint && !error && !success && (
              <p className="text-sm text-secondary-500">{hint}</p>
            )}
          </div>
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'

// Textarea component with similar styling
export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof inputVariants> {
  error?: string
  success?: string
  label?: string
  hint?: string
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, error, success, label, hint, ...props }, ref) => {
    const computedVariant = error ? 'error' : success ? 'success' : variant

    return (
      <div className="space-y-2">
        {label && (
          <label className="text-sm font-medium text-secondary-900 block">
            {label}
          </label>
        )}
        
        <div className="relative">
          <textarea
            className={cn(
              inputVariants({ variant: computedVariant }),
              'min-h-[80px] resize-y',
              {
                'pr-10': error || success,
              },
              className
            )}
            ref={ref}
            {...props}
          />
          
          {(error || success) && (
            <div className="absolute right-3 top-3">
              {error && <AlertCircle className="h-4 w-4 text-error-500" />}
              {success && !error && <CheckCircle className="h-4 w-4 text-success-500" />}
            </div>
          )}
        </div>
        
        {(error || success || hint) && (
          <div className="space-y-1">
            {error && (
              <p className="text-sm text-error-600 flex items-center space-x-1">
                <AlertCircle className="h-3 w-3 flex-shrink-0" />
                <span>{error}</span>
              </p>
            )}
            
            {success && !error && (
              <p className="text-sm text-success-600 flex items-center space-x-1">
                <CheckCircle className="h-3 w-3 flex-shrink-0" />
                <span>{success}</span>
              </p>
            )}
            
            {hint && !error && !success && (
              <p className="text-sm text-secondary-500">{hint}</p>
            )}
          </div>
        )}
      </div>
    )
  }
)
Textarea.displayName = 'Textarea'

export { Input, Textarea, inputVariants }