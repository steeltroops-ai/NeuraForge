'use client'

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

/**
 * NeuraForge Design System - Button Component
 * Comprehensive button system with proper hierarchy and consistent styling
 */

const buttonVariants = cva(
  // Base styles - consistent across all variants
  [
    'inline-flex items-center justify-center gap-2',
    'font-medium transition-all duration-300',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    'whitespace-nowrap rounded-lg',
    'select-none cursor-pointer'
  ],
  {
    variants: {
      variant: {
        // Primary - Main call-to-action (Start Research)
        primary: [
          'bg-neutral-900 text-white shadow-md',
          'hover:bg-neutral-800 hover:shadow-lg hover:scale-[1.02]',
          'active:bg-neutral-950 active:scale-[0.98]',
          'focus-visible:ring-neutral-900 focus-visible:ring-offset-2',
          'dark:bg-white dark:text-neutral-900',
          'dark:hover:bg-neutral-100'
        ],
        
        // Secondary - Supporting actions (Join Community)
        secondary: [
          'bg-white text-neutral-700 border border-neutral-300 shadow-sm',
          'hover:bg-neutral-50 hover:border-neutral-400 hover:shadow-md hover:scale-[1.02]',
          'active:bg-neutral-100 active:scale-[0.98]',
          'focus-visible:ring-neutral-500 focus-visible:ring-offset-2',
          'dark:bg-neutral-800 dark:text-neutral-200 dark:border-neutral-700',
          'dark:hover:bg-neutral-700 dark:hover:border-neutral-600'
        ],
        
        // Accent - Purple accent for special actions
        accent: [
          'bg-primary-500 text-white shadow-md',
          'hover:bg-primary-600 hover:shadow-lg hover:scale-[1.02]',
          'active:bg-primary-700 active:scale-[0.98]',
          'focus-visible:ring-primary-500 focus-visible:ring-offset-2'
        ],
        
        // Ghost - Minimal styling for subtle actions
        ghost: [
          'text-neutral-600 hover:text-neutral-900',
          'hover:bg-neutral-100 hover:scale-[1.02]',
          'active:bg-neutral-200 active:scale-[0.98]',
          'focus-visible:ring-neutral-500 focus-visible:ring-offset-2',
          'dark:text-neutral-400 dark:hover:text-neutral-100',
          'dark:hover:bg-neutral-800'
        ],
        
        // Outline - Outlined version for secondary actions
        outline: [
          'border border-neutral-300 text-neutral-700 bg-transparent',
          'hover:bg-neutral-50 hover:border-neutral-400 hover:scale-[1.02]',
          'active:bg-neutral-100 active:scale-[0.98]',
          'focus-visible:ring-neutral-500 focus-visible:ring-offset-2',
          'dark:border-neutral-700 dark:text-neutral-200',
          'dark:hover:bg-neutral-800 dark:hover:border-neutral-600'
        ],
        
        // Link - Text-only button for navigation
        link: [
          'text-primary-500 underline-offset-4',
          'hover:underline hover:text-primary-600',
          'active:text-primary-700',
          'focus-visible:ring-primary-500 focus-visible:ring-offset-2'
        ]
      },
      size: {
        sm: 'h-7 px-3 text-sm',
        md: 'h-7 px-4 text-sm',
        lg: 'h-12 px-6 text-base',
        xl: 'h-10 px-5 text-lg', // Further reduced by 10% from h-12 px-6
        'xl-reduced': 'h-12 px-6 text-lg', // Previous reduced size preserved
        'xl-original': 'h-14 px-8 text-lg', // Original XL size preserved
        icon: 'h-10 w-10'
      },
      fullWidth: {
        true: 'w-full',
        false: 'w-auto'
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false
    }
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
  ({
    className,
    variant,
    size,
    fullWidth,
    asChild = false,
    loading = false,
    leftIcon,
    rightIcon,
    children,
    disabled,
    ...props
  }, ref) => {
    const content = (
      <>
        {loading && (
          <svg
            className="w-4 h-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!loading && leftIcon && leftIcon}
        {children}
        {!loading && rightIcon && rightIcon}
      </>
    )

    if (asChild) {
      return (
        <Slot
          className={cn(buttonVariants({ variant, size, fullWidth, className }))}
          ref={ref}
          {...props}
        >
          {content}
        </Slot>
      )
    }

    return (
      <button
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        ref={ref}
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

/**
 * Button Usage Guidelines:
 * 
 * PRIMARY - Use for main call-to-action (Start Research, Sign Up)
 * - Maximum 1 per screen section
 * - Most important action user should take
 * 
 * SECONDARY - Use for supporting actions (Join Community, Learn More)
 * - Secondary importance actions
 * - Can have multiple per section
 * 
 * ACCENT - Use for special promotional actions
 * - Limited use for highlighting special features
 * - Purple accent color for brand emphasis
 * 
 * GHOST - Use for subtle actions (navigation, close buttons)
 * - Minimal visual weight
 * - Good for repeated actions
 * 
 * OUTLINE - Use for alternative secondary actions
 * - When you need visual distinction from secondary
 * - Good for cancel/alternative actions
 * 
 * LINK - Use for navigation and text-based actions
 * - Inline with text content
 * - Navigation between pages
 */
