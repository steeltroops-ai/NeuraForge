'use client'

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-xl font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden group',
  {
    variants: {
      variant: {
        default: 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-soft hover:shadow-medium hover:from-primary-700 hover:to-primary-800 focus-visible:ring-primary-500',
        destructive: 'bg-gradient-to-r from-error-600 to-error-700 text-white shadow-soft hover:shadow-medium hover:from-error-700 hover:to-error-800 focus-visible:ring-error-500',
        outline: 'border-2 border-secondary-300 bg-white text-secondary-900 shadow-soft hover:bg-secondary-50 hover:border-primary-400 hover:shadow-medium focus-visible:ring-primary-500',
        secondary: 'bg-secondary-100 text-secondary-900 shadow-soft hover:bg-secondary-200 hover:shadow-medium focus-visible:ring-secondary-500',
        ghost: 'text-secondary-700 hover:bg-secondary-100 hover:text-secondary-900 focus-visible:ring-secondary-500',
        link: 'text-primary-600 underline-offset-4 hover:underline focus-visible:ring-primary-500',
        gradient: 'bg-neural-gradient text-white shadow-glow hover:shadow-glow-lg focus-visible:ring-primary-500',
        glass: 'bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 focus-visible:ring-white/50',
      },
      size: {
        sm: 'h-9 px-4 text-sm rounded-lg',
        default: 'h-11 px-6 text-sm',
        lg: 'h-13 px-8 text-base rounded-2xl',
        xl: 'h-16 px-10 text-lg rounded-2xl',
        icon: 'h-11 w-11',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading, leftIcon, rightIcon, children, disabled, ...props }, ref) => {
    const classes = cn(buttonVariants({ variant, size, className }))
    
    const content = (
      <>
        {/* Shimmer effect for gradient buttons */}
        {(variant === 'default' || variant === 'gradient') && (
          <div className="absolute inset-0 -top-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -skew-x-12 group-hover:animate-pulse" />
        )}
        
        {loading && (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        )}
        
        {!loading && leftIcon && (
          <span className="mr-2 flex-shrink-0">{leftIcon}</span>
        )}
        
        <span className="relative z-10">{children}</span>
        
        {!loading && rightIcon && (
          <span className="ml-2 flex-shrink-0">{rightIcon}</span>
        )}
      </>
    )

    if (asChild) {
      // For asChild, we need to ensure children is a single React element
      if (!React.isValidElement(children)) {
        console.warn('Button with asChild prop requires a single React element as children')
        return null
      }
      
      return (
        <Slot
          ref={ref}
          className={classes}
          {...props}
        >
          {children}
        </Slot>
      )
    }
    
    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled || loading}
        {...props}
      >
        {content}
      </button>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }