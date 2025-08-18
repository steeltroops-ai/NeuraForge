import Fastify from 'fastify'
import cors from '@fastify/cors'
import { Server } from 'socket.io'

const fastify = Fastify({
  logger: true
})

// Register CORS with more permissive settings for development
fastify.register(cors, {
  origin: ['http://localhost:3003', 'http://localhost:3002', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
})

// Mock user database
const users = new Map()
const sessions = new Map()

// Add demo user for testing
users.set('demo@neuraforge.dev', {
  id: 'user_demo',
  email: 'demo@neuraforge.dev',
  name: 'Demo User',
  password: 'demo123',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
})

console.log('🎯 Demo user created: demo@neuraforge.dev / demo123')

// Helper function to generate JWT-like token
function generateToken(userId: string) {
  return `mock_token_${userId}_${Date.now()}`
}

// Auth routes
fastify.post('/auth/register', async (request, reply) => {
  const { email, password, name } = request.body as any

  if (!email || !password || !name) {
    return reply.code(400).send({ message: 'Missing required fields' })
  }

  if (users.has(email)) {
    return reply.code(400).send({ message: 'User already exists' })
  }

  const user = {
    id: `user_${Date.now()}`,
    email,
    name,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }

  users.set(email, { ...user, password })
  
  const accessToken = generateToken(user.id)
  const refreshToken = generateToken(user.id + '_refresh')
  
  sessions.set(accessToken, user)

  return reply.send({
    user,
    accessToken,
    refreshToken
  })
})

fastify.post('/auth/login', async (request, reply) => {
  const { email, password } = request.body as any

  if (!email || !password) {
    return reply.code(400).send({ message: 'Missing email or password' })
  }

  const userData = users.get(email)
  if (!userData || userData.password !== password) {
    return reply.code(401).send({ message: 'Invalid credentials' })
  }

  const user = {
    id: userData.id,
    email: userData.email,
    name: userData.name,
    createdAt: userData.createdAt,
    updatedAt: userData.updatedAt
  }

  const accessToken = generateToken(user.id)
  const refreshToken = generateToken(user.id + '_refresh')
  
  sessions.set(accessToken, user)

  return reply.send({
    user,
    accessToken,
    refreshToken
  })
})

fastify.get('/auth/profile', async (request, reply) => {
  const authHeader = request.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return reply.code(401).send({ message: 'No token provided' })
  }

  const token = authHeader.substring(7)
  const user = sessions.get(token)
  
  if (!user) {
    return reply.code(401).send({ message: 'Invalid token' })
  }

  return reply.send(user)
})

fastify.post('/auth/refresh', async (request, reply) => {
  const { refreshToken } = request.body as any
  
  if (!refreshToken) {
    return reply.code(400).send({ message: 'Refresh token required' })
  }

  // Mock refresh logic
  const userId = refreshToken.split('_')[2]
  const newAccessToken = generateToken(userId)
  
  return reply.send({
    accessToken: newAccessToken
  })
})

fastify.post('/auth/logout', async (request, reply) => {
  const authHeader = request.headers.authorization
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7)
    sessions.delete(token)
  }
  
  return reply.send({ message: 'Logged out successfully' })
})

// Health check
fastify.get('/health', async (request, reply) => {
  return { status: 'ok', timestamp: new Date().toISOString() }
})

// Start server
const start = async () => {
  try {
    const server = await fastify.listen({ port: 4000, host: '0.0.0.0' })
    console.log('🚀 API Server running on http://localhost:4000')
    
    // Initialize Socket.io
    const io = new Server(fastify.server, {
      cors: {
        origin: ['http://localhost:3003', 'http://localhost:3002', 'http://localhost:3000'],
        credentials: true,
        methods: ['GET', 'POST']
      }
    })

    // Socket.io authentication middleware
    io.use((socket, next) => {
      const token = socket.handshake.auth.token
      if (token && sessions.has(token)) {
        const user = sessions.get(token)
        socket.data.user = user
        next()
      } else {
        next(new Error('Authentication error'))
      }
    })

    // Socket.io connection handling
    io.on('connection', (socket) => {
      const user = socket.data.user
      console.log(`🔌 User ${user.name} connected via WebSocket`)

      // Join user to their personal room
      socket.join(`user:${user.id}`)

      // Handle research collaboration events
      socket.on('join-research', (researchId) => {
        socket.join(`research:${researchId}`)
        socket.to(`research:${researchId}`).emit('user-joined', {
          userId: user.id,
          userName: user.name
        })
      })

      socket.on('leave-research', (researchId) => {
        socket.leave(`research:${researchId}`)
        socket.to(`research:${researchId}`).emit('user-left', {
          userId: user.id,
          userName: user.name
        })
      })

      // Handle real-time collaboration
      socket.on('research-update', (data) => {
        socket.to(`research:${data.researchId}`).emit('research-updated', {
          ...data,
          userId: user.id,
          userName: user.name,
          timestamp: new Date().toISOString()
        })
      })

      // Handle cursor position for collaborative editing
      socket.on('cursor-position', (data) => {
        socket.to(`research:${data.researchId}`).emit('cursor-update', {
          userId: user.id,
          userName: user.name,
          position: data.position,
          timestamp: new Date().toISOString()
        })
      })

      socket.on('disconnect', () => {
        console.log(`🔌 User ${user.name} disconnected from WebSocket`)
      })
    })

    console.log('🔌 Socket.io server initialized')
    
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()