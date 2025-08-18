'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { Socket } from 'socket.io-client'
import { useUser, useAuth } from '@clerk/nextjs'

interface SocketContextType {
  socket: Socket | null
  isConnected: boolean
}

const SocketContext = createContext<SocketContextType | undefined>(undefined)

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const { user, isSignedIn } = useUser()
  const { getToken } = useAuth()

  useEffect(() => {
    // Temporarily disable socket connection to avoid CORS errors
    // TODO: Re-enable when API server is properly configured
    console.log('🔌 Socket connection disabled for now')

    // Clean up any existing socket
    if (socket) {
      socket.disconnect()
      setSocket(null)
      setIsConnected(false)
    }
  }, [isSignedIn, user, getToken, socket])

  const value: SocketContextType = {
    socket,
    isConnected,
  }

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
}

export function useSocket() {
  const context = useContext(SocketContext)
  if (context === undefined) {
    throw new Error('useSocket must be used within a SocketProvider')
  }
  return context.socket
}