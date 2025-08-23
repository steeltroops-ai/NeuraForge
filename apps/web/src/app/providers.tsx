'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from 'react'
import { ClerkProvider } from '@clerk/nextjs'
import { SocketProvider } from '@/lib/socket/socket-context'
import { ThemeProvider } from '@/components/theme-provider'
import { AuthProvider } from '@/contexts/auth-context'

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
            retry: (failureCount, error: any) => {
              // Don't retry on 4xx errors
              if (error?.status >= 400 && error?.status < 500) {
                return false
              }
              return failureCount < 3
            },
          },
        },
      })
  )

  return (
    <ClerkProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <SocketProvider>
              {children}
            </SocketProvider>
          </ThemeProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </AuthProvider>
    </ClerkProvider>
  )
}