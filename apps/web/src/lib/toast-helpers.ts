/**
 * Toast Helper Utilities
 * 
 * Provides convenient functions for showing common toast notifications
 * with consistent messaging and styling.
 * 
 * Requirements: 9.2
 */

import { Toast } from '@/hooks/use-toast'

// Global toast function reference (will be set by useToast hook)
let globalToast: ((props: Omit<Toast, 'id'>) => string) | null = null

export function setGlobalToast(toastFn: (props: Omit<Toast, 'id'>) => string) {
    globalToast = toastFn
}

/**
 * Show a success toast notification
 */
export function showSuccessToast(title: string, description?: string, duration?: number) {
    if (!globalToast) {
        console.warn('Toast system not initialized')
        return
    }

    return globalToast({
        title,
        description,
        variant: 'success',
        duration: duration ?? 5000
    })
}

/**
 * Show an error toast notification
 */
export function showErrorToast(title: string, description?: string, duration?: number) {
    if (!globalToast) {
        console.warn('Toast system not initialized')
        return
    }

    return globalToast({
        title,
        description,
        variant: 'destructive',
        duration: duration ?? 5000
    })
}

/**
 * Show a warning toast notification
 */
export function showWarningToast(title: string, description?: string, duration?: number) {
    if (!globalToast) {
        console.warn('Toast system not initialized')
        return
    }

    return globalToast({
        title,
        description,
        variant: 'warning',
        duration: duration ?? 5000
    })
}

/**
 * Show an info toast notification
 */
export function showInfoToast(title: string, description?: string, duration?: number) {
    if (!globalToast) {
        console.warn('Toast system not initialized')
        return
    }

    return globalToast({
        title,
        description,
        variant: 'info',
        duration: duration ?? 5000
    })
}

/**
 * Show a default toast notification
 */
export function showToast(title: string, description?: string, duration?: number) {
    if (!globalToast) {
        console.warn('Toast system not initialized')
        return
    }

    return globalToast({
        title,
        description,
        variant: 'default',
        duration: duration ?? 5000
    })
}

/**
 * Common toast messages for typical scenarios
 */
export const ToastMessages = {
    // Success messages
    saved: () => showSuccessToast('Saved', 'Your changes have been saved successfully'),
    created: (item: string) => showSuccessToast('Created', `${item} has been created successfully`),
    updated: (item: string) => showSuccessToast('Updated', `${item} has been updated successfully`),
    deleted: (item: string) => showSuccessToast('Deleted', `${item} has been deleted successfully`),
    copied: () => showSuccessToast('Copied', 'Copied to clipboard'),

    // Error messages
    error: (message?: string) => showErrorToast('Error', message || 'An unexpected error occurred'),
    networkError: () => showErrorToast('Network Error', 'Unable to connect to the server. Please check your connection.'),
    unauthorized: () => showErrorToast('Unauthorized', 'You do not have permission to perform this action'),
    notFound: (item: string) => showErrorToast('Not Found', `${item} could not be found`),
    validationError: (message: string) => showErrorToast('Validation Error', message),

    // Warning messages
    unsavedChanges: () => showWarningToast('Unsaved Changes', 'You have unsaved changes that will be lost'),
    limitReached: (limit: string) => showWarningToast('Limit Reached', `You have reached the ${limit} limit`),

    // Info messages
    loading: (message?: string) => showInfoToast('Loading', message || 'Please wait...'),
    processing: (message?: string) => showInfoToast('Processing', message || 'Your request is being processed'),
}

/**
 * Show a toast for API errors with retry option
 */
export function showApiErrorToast(error: Error, onRetry?: () => void) {
    const message = error.message || 'An error occurred while communicating with the server'

    if (onRetry) {
        return showErrorToast('Request Failed', `${message}. Click retry to try again.`, 7000)
    }

    return showErrorToast('Request Failed', message)
}

/**
 * Show a loading toast that can be updated
 */
export function showLoadingToast(message: string = 'Loading...') {
    return showInfoToast('Loading', message, 0) // 0 duration = no auto-dismiss
}
