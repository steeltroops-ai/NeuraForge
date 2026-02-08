'use client'

import { useToast } from '@/hooks/use-toast'
import { X, CheckCircle, AlertCircle, XCircle, AlertTriangle, Info } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * Toast Notification System
 * 
 * Features:
 * - Multiple variants: success, error, warning, info, default
 * - Auto-dismiss after 5 seconds (configurable)
 * - Stacking behavior with smooth animations
 * - Accessible with role="alert" and ARIA labels
 * - Click to dismiss
 * - Keyboard accessible close button
 * 
 * Requirements: 9.2
 */
export function Toaster() {
  const { toasts, dismiss } = useToast()

  return (
    <div
      className="fixed top-0 right-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px] pointer-events-none"
      aria-live="polite"
      aria-label="Notifications"
    >
      <AnimatePresence mode="popLayout">
        {toasts.map((toast, index) => {
          // Select icon based on variant
          const Icon = toast.variant === 'success'
            ? CheckCircle
            : toast.variant === 'destructive'
              ? XCircle
              : toast.variant === 'warning'
                ? AlertTriangle
                : toast.variant === 'info'
                  ? Info
                  : AlertCircle

          // Get variant-specific styles using design tokens
          const getVariantStyles = () => {
            switch (toast.variant) {
              case 'destructive':
                return {
                  container: 'border-[var(--color-error-200)] bg-[var(--color-error-50)] text-[var(--color-error-900)]',
                  icon: 'text-[var(--color-error-600)]',
                  close: 'text-[var(--color-error-500)] hover:text-[var(--color-error-900)] focus:ring-[var(--color-error-400)]'
                }
              case 'success':
                return {
                  container: 'border-[var(--color-success-200)] bg-[var(--color-success-50)] text-[var(--color-success-900)]',
                  icon: 'text-[var(--color-success-600)]',
                  close: 'text-[var(--color-success-500)] hover:text-[var(--color-success-900)] focus:ring-[var(--color-success-400)]'
                }
              case 'warning':
                return {
                  container: 'border-[var(--color-warning-200)] bg-[var(--color-warning-50)] text-[var(--color-warning-900)]',
                  icon: 'text-[var(--color-warning-600)]',
                  close: 'text-[var(--color-warning-500)] hover:text-[var(--color-warning-900)] focus:ring-[var(--color-warning-400)]'
                }
              case 'info':
                return {
                  container: 'border-[var(--color-primary-200)] bg-[var(--color-primary-50)] text-[var(--color-primary-900)]',
                  icon: 'text-[var(--color-primary-600)]',
                  close: 'text-[var(--color-primary-500)] hover:text-[var(--color-primary-900)] focus:ring-[var(--color-primary-400)]'
                }
              default:
                return {
                  container: 'border-[var(--color-border-default)] bg-[var(--color-surface)] text-[var(--color-text-primary)]',
                  icon: 'text-[var(--color-primary-600)]',
                  close: 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] focus:ring-[var(--color-primary-400)]'
                }
            }
          }

          const styles = getVariantStyles()

          return (
            <motion.div
              key={toast.id}
              layout
              initial={{ opacity: 0, y: 50, scale: 0.3 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{
                opacity: 0,
                scale: 0.5,
                transition: { duration: 0.2 }
              }}
              transition={{
                type: 'spring',
                stiffness: 500,
                damping: 40
              }}
              style={{
                marginBottom: index > 0 ? 'var(--space-2)' : 0
              }}
              className={`
                group pointer-events-auto relative flex w-full items-center justify-between 
                space-x-4 overflow-hidden rounded-xl border p-4 pr-8 shadow-lg 
                transition-all ${styles.container}
              `}
              role="alert"
              aria-live="assertive"
              aria-atomic="true"
            >
              <div className="flex items-start space-x-3 flex-1 min-w-0">
                <Icon
                  className={`h-5 w-5 mt-0.5 flex-shrink-0 ${styles.icon}`}
                  aria-hidden="true"
                />
                <div className="grid gap-1 flex-1 min-w-0">
                  <div className="text-sm font-semibold break-words">
                    {toast.title}
                  </div>
                  {toast.description && (
                    <div className="text-sm opacity-90 break-words">
                      {toast.description}
                    </div>
                  )}
                </div>
              </div>
              <button
                onClick={() => dismiss(toast.id)}
                className={`
                  absolute right-2 top-2 rounded-md p-1 
                  opacity-0 transition-opacity 
                  focus:opacity-100 focus:outline-none focus:ring-2 
                  group-hover:opacity-100 ${styles.close}
                `}
                aria-label="Close notification"
                type="button"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}