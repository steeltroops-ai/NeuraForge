import * as React from 'react'
import { useState, useCallback } from 'react'

export interface Toast {
  id: string
  title: string
  description?: string
  variant?: 'default' | 'destructive' | 'success' | 'warning' | 'info'
  duration?: number
}

interface ToastState {
  toasts: Toast[]
}

const toastState: ToastState = {
  toasts: [],
}

const listeners: Array<(state: ToastState) => void> = []

let toastCount = 0

function genId() {
  toastCount = (toastCount + 1) % Number.MAX_VALUE
  return toastCount.toString()
}

const addToast = (toast: Omit<Toast, 'id'>) => {
  const id = genId()
  const newToast: Toast = {
    ...toast,
    id,
  }

  toastState.toasts = [newToast, ...toastState.toasts]
  listeners.forEach((listener) => listener(toastState))

  // Auto remove after duration
  const duration = toast.duration ?? 5000
  if (duration > 0) {
    setTimeout(() => {
      removeToast(id)
    }, duration)
  }

  return id
}

const removeToast = (id: string) => {
  toastState.toasts = toastState.toasts.filter((toast) => toast.id !== id)
  listeners.forEach((listener) => listener(toastState))
}

export function useToast() {
  const [state, setState] = useState<ToastState>(toastState)

  const subscribe = useCallback((listener: (state: ToastState) => void) => {
    listeners.push(listener)
    return () => {
      const index = listeners.indexOf(listener)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [])

  const toast = useCallback((props: Omit<Toast, 'id'>) => {
    return addToast(props)
  }, [])

  const dismiss = useCallback((id: string) => {
    removeToast(id)
  }, [])

  // Subscribe to state changes
  React.useEffect(() => {
    const unsubscribe = subscribe(setState)
    return unsubscribe
  }, [subscribe])

  return {
    toast,
    dismiss,
    toasts: state.toasts,
  }
}

