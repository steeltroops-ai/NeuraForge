'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const cardVariants = cva(
  'rounded-2xl border bg-white transition-all duration-300 relative overflow-hidden group',
  {
    variants: {
      variant: {
        default: 'border-secondary-200 shadow-soft hover:shadow-medium',
        elevated: 'border-secondary-200 shadow-medium hover:shadow-large',
        interactive: 'border-secondary-200 shadow-soft hover:border-primary-300 hover:shadow-medium cursor-pointer hover:-translate-y-1',
        glass: 'bg-white/80 backdrop-blur-sm border-white/20 shadow-soft',
        gradient: 'bg-gradient-to-br from-white to-secondary-50 border-secondary-200 shadow-soft hover:shadow-medium',
        glow: 'border-primary-200 shadow-glow hover:shadow-glow-lg',
        success: 'border-success-200 bg-success-50/50 shadow-soft',
        warning: 'border-warning-200 bg-warning-50/50 shadow-soft',
        error: 'border-error-200 bg-error-50/50 shadow-soft',
      },
      padding: {
        none: 'p-0',
        sm: 'p-4',
        default: 'p-6',
        lg: 'p-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'default',
    },
  }
)

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof cardVariants>
>(({ className, variant, padding, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(cardVariants({ variant, padding, className }))}
    {...props}
  />
))
Card.displayName = 'Card'

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('flex flex-col space-y-2 pb-4', className)} {...props} />
))
CardHeader.displayName = 'CardHeader'

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      'text-xl font-semibold leading-tight tracking-tight text-secondary-900',
      className
    )}
    {...props}
  />
))
CardTitle.displayName = 'CardTitle'

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-secondary-600 leading-relaxed', className)}
    {...props}
  />
))
CardDescription.displayName = 'CardDescription'

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('', className)} {...props} />
))
CardContent.displayName = 'CardContent'

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('flex items-center pt-4', className)} {...props} />
))
CardFooter.displayName = 'CardFooter'

// Enhanced Card with built-in animations and states
interface EnhancedCardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {
  loading?: boolean
  disabled?: boolean
  selected?: boolean
}

const EnhancedCard = React.forwardRef<HTMLDivElement, EnhancedCardProps>(
  ({ className, variant, padding, loading, disabled, selected, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          cardVariants({ variant, padding }),
          {
            'opacity-50 pointer-events-none': disabled,
            'ring-2 ring-primary-500 ring-offset-2': selected,
            'animate-pulse': loading,
          },
          className
        )}
        {...props}
      >
        {loading && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-10">
            <div className="w-6 h-6 border-2 border-primary-600 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        {children}
      </div>
    )
  }
)
EnhancedCard.displayName = 'EnhancedCard'

export { 
  Card, 
  CardHeader, 
  CardFooter, 
  CardTitle, 
  CardDescription, 
  CardContent,
  EnhancedCard,
  cardVariants 
}