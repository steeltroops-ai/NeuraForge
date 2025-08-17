'use client'

import { useToast } from '@/hooks/use-toast'
import { X, CheckCircle, AlertCircle, XCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export function Toaster() {
  const { toasts, dismiss } = useToast()

  return (
    <div className="fixed top-0 right-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]">
      <AnimatePresence>
        {toasts.map((toast) => {
          const Icon = toast.variant === 'success' 
            ? CheckCircle 
            : toast.variant === 'destructive' 
            ? XCircle 
            : AlertCircle

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 50, scale: 0.3 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
              className={`group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-xl border p-4 pr-8 shadow-lg transition-all ${
                toast.variant === 'destructive'
                  ? 'border-error-200 bg-error-50 text-error-900'
                  : toast.variant === 'success'
                  ? 'border-success-200 bg-success-50 text-success-900'
                  : 'border-secondary-200 bg-white text-secondary-900'
              }`}
            >
              <div className="flex items-start space-x-3">
                <Icon className={`h-5 w-5 mt-0.5 ${
                  toast.variant === 'destructive'
                    ? 'text-error-600'
                    : toast.variant === 'success'
                    ? 'text-success-600'
                    : 'text-primary-600'
                }`} />
                <div className="grid gap-1">
                  <div className="text-sm font-semibold">{toast.title}</div>
                  {toast.description && (
                    <div className="text-sm opacity-90">{toast.description}</div>
                  )}
                </div>
              </div>
              <button
                onClick={() => dismiss(toast.id)}
                className="absolute right-2 top-2 rounded-md p-1 text-secondary-500 opacity-0 transition-opacity hover:text-secondary-900 focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100"
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