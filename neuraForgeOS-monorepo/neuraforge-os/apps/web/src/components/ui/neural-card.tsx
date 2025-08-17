'use client'

import React, { forwardRef } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

// Neural Card Variants
const cardVariants = {
  // Glass Morphism Card
  glass: {
    base: "bg-surface-glass backdrop-blur-xl border border-white/10 shadow-lg",
    hover: "hover:bg-white/10 hover:border-white/20 hover:shadow-glowLg",
  },
  
  // Neural Glow Card
  neural: {
    base: "bg-surface-primary border border-neural-500/20 shadow-neural",
    hover: "hover:border-neural-400/20 hover:shadow-neural",
  },
  
  // Quantum Card
  quantum: {
    base: "bg-surface-primary border border-quantum-500/20 shadow-quantum",
    hover: "hover:border-quantum-400/40 hover:shadow-quantum",
  },
  
  // Elevated Card
  elevated: {
    base: "bg-surface-secondary border border-neutral-700 shadow-xl",
    hover: "hover:bg-surface-tertiary hover:border-neutral-600",
  },
  
  // Flat Card
  flat: {
    base: "bg-surface-primary border border-neutral-800",
    hover: "hover:bg-surface-secondary hover:border-neutral-700",
  },
} as const;

// Card Sizes
const cardSizes = {
  sm: "p-4 rounded-lg",
  md: "p-6 rounded-xl",
  lg: "p-8 rounded-2xl",
  xl: "p-12 rounded-3xl",
} as const;

// Neural Card Props
interface NeuralCardProps extends Omit<HTMLMotionProps<"div">, "size"> {
  variant?: keyof typeof cardVariants;
  size?: keyof typeof cardSizes;
  interactive?: boolean;
  glowEffect?: boolean;
  children?: React.ReactNode;
  className?: string;
}

// Neural Card Component
export const NeuralCard = forwardRef<HTMLDivElement, NeuralCardProps>(
  ({
    variant = "glass",
    size = "md",
    interactive = false,
    glowEffect = false,
    children,
    className,
    ...props
  }, ref) => {
    const variantStyles = cardVariants[variant];
    const sizeStyles = cardSizes[size];
    
    const baseClasses = cn(
      // Base styles
      "relative transition-all duration-300",
      
      // Variant styles
      variantStyles.base,
      interactive && variantStyles.hover,
      
      // Size styles
      sizeStyles,
      
      // Conditional styles
      interactive && "cursor-pointer",
      
      // Custom className
      className
    );

    const motionProps = interactive ? {
      whileHover: { 
        scale: 1.01,
        y: -2,
      },
      whileTap: { scale: 0.98 },
      transition: { type: "spring", stiffness: 400, damping: 17 },
    } : {};

    return (
      <motion.div
        ref={ref}
        className={baseClasses}
        {...motionProps}
        {...props}
      >
        {/* Subtle professional glow effect */}
        {glowEffect && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-neural-500/5 via-quantum-500/5 to-processing-500/5 rounded-inherit -z-10"
            animate={{
              opacity: [0, 0.1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}
        
        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
        
        {/* Interactive Ripple Effect */}
        {interactive && (
          <motion.div
            className="absolute inset-0 opacity-0 bg-white/5 rounded-inherit"
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </motion.div>
    );
  }
);

NeuralCard.displayName = "NeuralCard";

// Card Header Component
interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const CardHeader = ({ children, className }: CardHeaderProps) => (
  <div className={cn("mb-4", className)}>
    {children}
  </div>
);

// Card Title Component
interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

export const CardTitle = ({ children, className, level = 3 }: CardTitleProps) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  
  const levelStyles = {
    1: "text-3xl font-bold",
    2: "text-2xl font-bold",
    3: "text-xl font-semibold",
    4: "text-lg font-semibold",
    5: "text-base font-medium",
    6: "text-sm font-medium",
  };
  
  return (
    <Tag className={cn(
      "leading-tight text-white",
      levelStyles[level],
      className
    )}>
      {children}
    </Tag>
  );
};

// Card Description Component
interface CardDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export const CardDescription = ({ children, className }: CardDescriptionProps) => (
  <p className={cn("leading-relaxed text-neutral-400", className)}>
    {children}
  </p>
);

// Card Content Component
interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export const CardContent = ({ children, className }: CardContentProps) => (
  <div className={cn("space-y-4", className)}>
    {children}
  </div>
);

// Card Footer Component
interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const CardFooter = ({ children, className }: CardFooterProps) => (
  <div className={cn("pt-4 mt-6 border-t border-neutral-700", className)}>
    {children}
  </div>
);

// Export variants and sizes for external use
export { cardVariants, cardSizes };
export type { NeuralCardProps };