'use client'

import React, { forwardRef } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'
import { designTokens } from '@/styles/design-tokens'

// Button Variants - Futuristic AI Theme
const buttonVariants = {
  // Primary Neural Button
  neural: {
    base: "bg-gradient-to-r from-neural-500 to-neural-600 text-white shadow-neural hover:shadow-glowLg",
    hover: "hover:from-neural-400 hover:to-neural-500 hover:scale-105",
    active: "active:scale-95",
    disabled: "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
  },
  
  // Quantum Processing Button
  quantum: {
    base: "bg-gradient-to-r from-quantum-500 to-quantum-600 text-white shadow-quantum",
    hover: "hover:from-quantum-400 hover:to-quantum-500 hover:scale-105",
    active: "active:scale-95",
    disabled: "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
  },
  
  // Glass Morphism Button
  glass: {
    base: "bg-surface-glass backdrop-blur-xl border border-white/10 text-white shadow-lg",
    hover: "hover:bg-white/10 hover:border-white/20 hover:scale-105",
    active: "active:scale-95",
    disabled: "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
  },
  
  // Ghost Button
  ghost: {
    base: "bg-transparent text-neutral-300 hover:bg-surface-secondary",
    hover: "hover:text-white hover:scale-105",
    active: "active:scale-95",
    disabled: "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
  },
  
  // Outline Button
  outline: {
    base: "bg-transparent border-2 border-neural-500 text-neural-400 hover:bg-neural-500 hover:text-white",
    hover: "hover:scale-105 hover:shadow-glow",
    active: "active:scale-95",
    disabled: "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
  },
} as const;

// Button Sizes
const buttonSizes = {
  sm: "px-4 py-2 text-sm rounded-lg",
  md: "px-6 py-3 text-base rounded-xl",
  lg: "px-8 py-4 text-lg rounded-2xl",
  xl: "px-12 py-6 text-xl rounded-3xl",
  icon: "p-3 rounded-xl",
} as const;

// Button Props Interface
interface FuturisticButtonProps extends Omit<HTMLMotionProps<"button">, "size"> {
  variant?: keyof typeof buttonVariants;
  size?: keyof typeof buttonSizes;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
  glowEffect?: boolean;
  pulseEffect?: boolean;
}

// Loading Spinner Component
const LoadingSpinner = ({ size = "md" }: { size?: string }) => {
  const spinnerSize = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
    xl: "w-8 h-8",
  }[size] || "w-5 h-5";

  return (
    <motion.div
      className={cn("border-2 border-current border-t-transparent rounded-full", spinnerSize)}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  );
};

// Futuristic Button Component
export const FuturisticButton = forwardRef<HTMLButtonElement, FuturisticButtonProps>(
  ({
    variant = "neural",
    size = "md",
    leftIcon,
    rightIcon,
    loading = false,
    disabled = false,
    children,
    className,
    glowEffect = false,
    pulseEffect = false,
    ...props
  }, ref) => {
    const variantStyles = buttonVariants[variant];
    const sizeStyles = buttonSizes[size];
    
    const baseClasses = cn(
      // Base styles
      "inline-flex items-center justify-center font-medium transition-all duration-300",
      "focus:outline-none focus:ring-2 focus:ring-neural-500 focus:ring-offset-2 focus:ring-offset-surface-background",
      "relative overflow-hidden",
      
      // Variant styles
      variantStyles.base,
      variantStyles.hover,
      variantStyles.active,
      variantStyles.disabled,
      
      // Size styles
      sizeStyles,
      
      // Conditional styles
      glowEffect && "shadow-md shadow-neural-500/10",
      pulseEffect && "animate-pulse",
      
      // Custom className
      className
    );

    const motionProps = {
      whileHover: { scale: disabled ? 1 : 1.05 },
      whileTap: { scale: disabled ? 1 : 0.95 },
      transition: { type: "spring", stiffness: 400, damping: 17 },
    };

    return (
      <motion.button
        ref={ref}
        className={baseClasses}
        disabled={disabled || loading}
        {...motionProps}
        {...props}
      >
        {/* Subtle professional glow effect */}
        {glowEffect && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-neural-400/8 to-neural-600/8 rounded-inherit"
            animate={{
              opacity: [0, 0.15, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}
        
        {/* Content Container */}
        <div className="relative flex items-center justify-center space-x-2">
          {/* Left Icon or Loading Spinner */}
          {loading ? (
            <LoadingSpinner size={size} />
          ) : leftIcon ? (
            <span className="flex-shrink-0">{leftIcon}</span>
          ) : null}
          
          {/* Button Text */}
          {children && (
            <span className={cn(
              "font-medium",
              (loading || leftIcon) && "ml-2",
              rightIcon && "mr-2"
            )}>
              {children}
            </span>
          )}
          
          {/* Right Icon */}
          {rightIcon && !loading && (
            <span className="flex-shrink-0">{rightIcon}</span>
          )}
        </div>
        
        {/* Ripple Effect on Click */}
        <motion.div
          className="absolute inset-0 bg-white/20 rounded-inherit"
          initial={{ scale: 0, opacity: 0 }}
          whileTap={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
      </motion.button>
    );
  }
);

FuturisticButton.displayName = "FuturisticButton";

// Export button variants and sizes for external use
export { buttonVariants, buttonSizes };
export type { FuturisticButtonProps };