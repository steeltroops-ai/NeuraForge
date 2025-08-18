# 🏗️ NeuraForge OS Architecture & Testing Guide

## System Architecture Overview

NeuraForge OS follows a modern, scalable architecture designed for collaborative research with AI integration. The system is built using a monorepo structure with clear separation of concerns and microservices-ready design.

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend Layer                           │
├─────────────────────────────────────────────────────────────┤
│  Next.js 14 App Router │ React 18 │ Tailwind CSS │ Zustand │
│  Framer Motion │ Socket.io Client │ React Query │ TypeScript│
└─────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────┐
│                     API Gateway                             │
├─────────────────────────────────────────────────────────────┤
│           Fastify Server │ CORS │ Rate Limiting              │
│           Authentication │ Validation │ Error Handling       │
└─────────────────────────────────────────────────────────────┘
                                │
                ┌───────────────┼───────────────┐
                ▼               ▼               ▼
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│  Auth Service   │ │ Project Service │ │   AI Service    │
├─────────────────┤ ├─────────────────┤ ├─────────────────┤
│ JWT Management  │ │ CRUD Operations │ │ OpenAI API      │
│ Session Store   │ │ Collaboration   │ │ Embeddings      │
│ User Management │ │ Version Control │ │ Suggestions     │
└─────────────────┘ └─────────────────┘ └─────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────┐
│                    Data Layer                               │
├─────────────────────────────────────────────────────────────┤
│  PostgreSQL │ Redis │ Vector DB │ File Storage │ Search     │
│  Primary DB │ Cache │ Embeddings│ Documents    │ Elastic    │
└─────────────────────────────────────────────────────────────┘
```

## Design Patterns and Principles

### 1. Domain-Driven Design (DDD)

The codebase is organized around business domains:

```typescript
// Domain structure
packages/
├── core/                 # Core business logic
│   ├── entities/        # Domain entities
│   ├── repositories/    # Data access interfaces
│   ├── services/        # Business services
│   └── value-objects/   # Value objects
├── database/            # Data persistence layer
├── shared/              # Shared utilities
└── ui/                  # Presentation layer
```

### 2. Clean Architecture

```typescript
// Dependency flow: UI → Application → Domain → Infrastructure
interface ProjectRepository {
  create(project: Project): Promise<Project>
  findById(id: string): Promise<Project | null>
  update(id: string, data: Partial<Project>): Promise<Project>
  delete(id: string): Promise<void>
}

class ProjectService {
  constructor(
    private projectRepo: ProjectRepository,
    private aiService: AIService,
    private eventBus: EventBus
  ) {}

  async createProject(data: CreateProjectData): Promise<Project> {
    // Business logic here
    const project = Project.create(data)
    await this.projectRepo.create(project)
    this.eventBus.emit('project.created', project)
    return project
  }
}
```

### 3. Repository Pattern

```typescript
// Abstract repository interface
export interface Repository<T, ID> {
  findById(id: ID): Promise<T | null>
  findAll(criteria?: SearchCriteria): Promise<T[]>
  save(entity: T): Promise<T>
  delete(id: ID): Promise<void>
}

// Concrete implementation
export class PrismaProjectRepository implements ProjectRepository {
  constructor(private prisma: PrismaClient) {}

  async findById(id: string): Promise<Project | null> {
    const data = await this.prisma.project.findUnique({
      where: { id },
      include: { collaborators: true, branches: true }
    })
    return data ? Project.fromPersistence(data) : null
  }
}
```

### 4. Event-Driven Architecture

```typescript
// Event system for decoupled communication
interface DomainEvent {
  eventId: string
  eventType: string
  aggregateId: string
  timestamp: Date
  payload: any
}

class EventBus {
  private handlers = new Map<string, EventHandler[]>()

  subscribe(eventType: string, handler: EventHandler): void {
    if (!this.handlers.has(eventType)) {
      this.handlers.set(eventType, [])
    }
    this.handlers.get(eventType)!.push(handler)
  }

  async publish(event: DomainEvent): Promise<void> {
    const handlers = this.handlers.get(event.eventType) || []
    await Promise.all(handlers.map(handler => handler.handle(event)))
  }
}
```

## Frontend Architecture

### Component Architecture

```typescript
// Atomic Design Structure
components/
├── atoms/              # Basic building blocks
│   ├── Button/
│   ├── Input/
│   └── Icon/
├── molecules/          # Simple component combinations
│   ├── SearchBox/
│   ├── UserCard/
│   └── ProjectCard/
├── organisms/          # Complex component combinations
│   ├── Header/
│   ├── Sidebar/
│   └── ProjectList/
├── templates/          # Page layouts
│   ├── DashboardLayout/
│   └── AuthLayout/
└── pages/              # Complete pages
    ├── Dashboard/
    └── ProjectDetail/
```

### State Management Strategy

```typescript
// Zustand store structure
interface AppState {
  // Authentication state
  auth: {
    user: User | null
    isAuthenticated: boolean
    login: (credentials: LoginCredentials) => Promise<void>
    logout: () => void
  }
  
  // Project state
  projects: {
    items: Project[]
    currentProject: Project | null
    loading: boolean
    fetchProjects: () => Promise<void>
    createProject: (data: CreateProjectData) => Promise<void>
  }
  
  // Real-time collaboration state
  collaboration: {
    activeUsers: User[]
    cursors: Record<string, CursorData>
    updateCursor: (cursor: CursorData) => void
  }
}

// Store implementation with persistence
const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      auth: {
        user: null,
        isAuthenticated: false,
        login: async (credentials) => {
          const response = await authAPI.login(credentials)
          set(state => ({
            auth: {
              ...state.auth,
              user: response.user,
              isAuthenticated: true
            }
          }))
        },
        logout: () => {
          set(state => ({
            auth: {
              ...state.auth,
              user: null,
              isAuthenticated: false
            }
          }))
        }
      }
      // ... other state slices
    }),
    {
      name: 'neuraforge-storage',
      partialize: (state) => ({ auth: state.auth })
    }
  )
)
```

### Error Boundary Strategy

```typescript
// Global error boundary
class GlobalErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to monitoring service
    logger.error('React Error Boundary caught an error', {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack
    })
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />
    }

    return this.props.children
  }
}
```

## Backend Architecture

### Service Layer Pattern

```typescript
// Service interface
interface ProjectService {
  createProject(userId: string, data: CreateProjectData): Promise<Project>
  getProject(id: string, userId: string): Promise<Project>
  updateProject(id: string, userId: string, data: UpdateProjectData): Promise<Project>
  deleteProject(id: string, userId: string): Promise<void>
  addCollaborator(projectId: string, userId: string, collaboratorData: CollaboratorData): Promise<void>
}

// Service implementation
class ProjectServiceImpl implements ProjectService {
  constructor(
    private projectRepo: ProjectRepository,
    private userRepo: UserRepository,
    private permissionService: PermissionService,
    private eventBus: EventBus
  ) {}

  async createProject(userId: string, data: CreateProjectData): Promise<Project> {
    // Validate user permissions
    const user = await this.userRepo.findById(userId)
    if (!user) throw new UnauthorizedError('User not found')

    // Create project entity
    const project = Project.create({
      ...data,
      createdBy: userId,
      createdAt: new Date()
    })

    // Persist to database
    const savedProject = await this.projectRepo.save(project)

    // Publish domain event
    await this.eventBus.publish({
      eventId: generateId(),
      eventType: 'project.created',
      aggregateId: savedProject.id,
      timestamp: new Date(),
      payload: { project: savedProject, creator: user }
    })

    return savedProject
  }
}
```

### Middleware Architecture

```typescript
// Authentication middleware
export const authMiddleware = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const token = extractTokenFromHeader(request.headers.authorization)
    if (!token) {
      throw new UnauthorizedError('No token provided')
    }

    const payload = await verifyJWT(token)
    const user = await userRepository.findById(payload.userId)
    
    if (!user) {
      throw new UnauthorizedError('User not found')
    }

    request.user = user
  } catch (error) {
    reply.code(401).send({ error: 'Unauthorized' })
  }
}

// Validation middleware
export const validateSchema = (schema: ZodSchema) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const validatedData = schema.parse(request.body)
      request.body = validatedData
    } catch (error) {
      reply.code(400).send({ 
        error: 'Validation failed',
        details: error.errors 
      })
    }
  }
}
```

## Testing Strategy

### Testing Pyramid

```
                    ┌─────────────┐
                    │     E2E     │ 10%
                    │   Tests     │
                ┌───┴─────────────┴───┐
                │   Integration       │ 20%
                │     Tests           │
            ┌───┴─────────────────────┴───┐
            │        Unit Tests           │ 70%
            │                             │
            └─────────────────────────────┘
```

### Unit Testing

```typescript
// Example unit test with Jest
describe('ProjectService', () => {
  let projectService: ProjectService
  let mockProjectRepo: jest.Mocked<ProjectRepository>
  let mockEventBus: jest.Mocked<EventBus>

  beforeEach(() => {
    mockProjectRepo = {
      save: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
      delete: jest.fn()
    }
    
    mockEventBus = {
      publish: jest.fn(),
      subscribe: jest.fn()
    }

    projectService = new ProjectServiceImpl(
      mockProjectRepo,
      mockUserRepo,
      mockPermissionService,
      mockEventBus
    )
  })

  describe('createProject', () => {
    it('should create a project successfully', async () => {
      // Arrange
      const userId = 'user-123'
      const projectData = {
        title: 'Test Project',
        description: 'Test Description'
      }
      const expectedProject = Project.create({ ...projectData, createdBy: userId })
      
      mockProjectRepo.save.mockResolvedValue(expectedProject)

      // Act
      const result = await projectService.createProject(userId, projectData)

      // Assert
      expect(result).toEqual(expectedProject)
      expect(mockProjectRepo.save).toHaveBeenCalledWith(
        expect.objectContaining({
          title: projectData.title,
          description: projectData.description,
          createdBy: userId
        })
      )
      expect(mockEventBus.publish).toHaveBeenCalledWith(
        expect.objectContaining({
          eventType: 'project.created',
          aggregateId: expectedProject.id
        })
      )
    })

    it('should throw error when user not found', async () => {
      // Arrange
      mockUserRepo.findById.mockResolvedValue(null)

      // Act & Assert
      await expect(
        projectService.createProject('invalid-user', {})
      ).rejects.toThrow(UnauthorizedError)
    })
  })
})
```

### Integration Testing

```typescript
// API integration tests
describe('Project API', () => {
  let app: FastifyInstance
  let testUser: User
  let authToken: string

  beforeAll(async () => {
    app = await createTestApp()
    await setupTestDatabase()
    
    // Create test user and get auth token
    testUser = await createTestUser()
    authToken = await generateAuthToken(testUser.id)
  })

  afterAll(async () => {
    await cleanupTestDatabase()
    await app.close()
  })

  describe('POST /projects', () => {
    it('should create a new project', async () => {
      const projectData = {
        title: 'Integration Test Project',
        description: 'Test project for integration testing'
      }

      const response = await app.inject({
        method: 'POST',
        url: '/projects',
        headers: {
          authorization: `Bearer ${authToken}`
        },
        payload: projectData
      })

      expect(response.statusCode).toBe(201)
      
      const project = JSON.parse(response.payload)
      expect(project).toMatchObject({
        title: projectData.title,
        description: projectData.description,
        createdBy: testUser.id
      })
      expect(project.id).toBeDefined()
      expect(project.createdAt).toBeDefined()
    })

    it('should return 401 without authentication', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/projects',
        payload: { title: 'Test' }
      })

      expect(response.statusCode).toBe(401)
    })
  })
})
```

### End-to-End Testing

```typescript
// Playwright E2E tests
import { test, expect } from '@playwright/test'

test.describe('Project Management', () => {
  test.beforeEach(async ({ page }) => {
    // Login with demo user
    await page.goto('/auth/login')
    await page.fill('[data-testid="email-input"]', 'demo@neuraforge.dev')
    await page.fill('[data-testid="password-input"]', 'demo123')
    await page.click('[data-testid="login-button"]')
    
    // Wait for redirect to dashboard
    await expect(page).toHaveURL('/dashboard')
  })

  test('should create a new project', async ({ page }) => {
    // Navigate to projects page
    await page.click('[data-testid="projects-nav"]')
    await expect(page).toHaveURL('/projects')

    // Click create project button
    await page.click('[data-testid="create-project-button"]')

    // Fill project form
    await page.fill('[data-testid="project-title"]', 'E2E Test Project')
    await page.fill('[data-testid="project-description"]', 'Project created by E2E test')
    await page.selectOption('[data-testid="project-domain"]', 'Computer Science')

    // Submit form
    await page.click('[data-testid="submit-project"]')

    // Verify project was created
    await expect(page.locator('[data-testid="success-message"]')).toBeVisible()
    await expect(page.locator('text=E2E Test Project')).toBeVisible()
  })

  test('should collaborate in real-time', async ({ browser }) => {
    // Create two browser contexts for different users
    const context1 = await browser.newContext()
    const context2 = await browser.newContext()
    
    const page1 = await context1.newPage()
    const page2 = await context2.newPage()

    // Both users login and navigate to same project
    await loginUser(page1, 'user1@test.com', 'password')
    await loginUser(page2, 'user2@test.com', 'password')
    
    await page1.goto('/projects/test-project-id')
    await page2.goto('/projects/test-project-id')

    // User 1 makes a change
    await page1.fill('[data-testid="content-editor"]', 'User 1 content')

    // Verify User 2 sees the change in real-time
    await expect(page2.locator('[data-testid="content-editor"]')).toHaveValue('User 1 content')
    
    // Verify presence indicators
    await expect(page1.locator('[data-testid="active-users"]')).toContainText('2 users online')
    await expect(page2.locator('[data-testid="active-users"]')).toContainText('2 users online')
  })
})
```

### Performance Testing

```typescript
// Load testing with k6
import http from 'k6/http'
import { check, sleep } from 'k6'

export let options = {
  stages: [
    { duration: '2m', target: 100 }, // Ramp up to 100 users
    { duration: '5m', target: 100 }, // Stay at 100 users
    { duration: '2m', target: 200 }, // Ramp up to 200 users
    { duration: '5m', target: 200 }, // Stay at 200 users
    { duration: '2m', target: 0 },   // Ramp down to 0 users
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% of requests under 500ms
    http_req_failed: ['rate<0.01'],   // Error rate under 1%
  }
}

export default function() {
  // Login
  const loginResponse = http.post('http://localhost:4000/auth/login', {
    email: 'demo@neuraforge.dev',
    password: 'demo123'
  })
  
  check(loginResponse, {
    'login successful': (r) => r.status === 200,
    'login response time OK': (r) => r.timings.duration < 200
  })

  const authToken = JSON.parse(loginResponse.body).accessToken

  // Get projects
  const projectsResponse = http.get('http://localhost:4000/projects', {
    headers: { Authorization: `Bearer ${authToken}` }
  })

  check(projectsResponse, {
    'projects loaded': (r) => r.status === 200,
    'projects response time OK': (r) => r.timings.duration < 300
  })

  sleep(1)
}
```

## Performance Guidelines

### Frontend Performance

```typescript
// Code splitting with dynamic imports
const ProjectDetail = lazy(() => import('./ProjectDetail'))
const Dashboard = lazy(() => import('./Dashboard'))

// Memoization for expensive components
const ExpensiveComponent = React.memo(({ data, onUpdate }) => {
  const processedData = useMemo(() => {
    return data.map(item => expensiveProcessing(item))
  }, [data])

  return <div>{/* Render processed data */}</div>
})

// Virtual scrolling for large lists
import { FixedSizeList as List } from 'react-window'

const ProjectList = ({ projects }) => (
  <List
    height={600}
    itemCount={projects.length}
    itemSize={80}
    itemData={projects}
  >
    {ProjectItem}
  </List>
)
```

### Backend Performance

```typescript
// Database query optimization
const getProjectsWithCollaborators = async (userId: string) => {
  return await prisma.project.findMany({
    where: {
      OR: [
        { createdById: userId },
        { collaborators: { some: { userId } } }
      ]
    },
    include: {
      _count: {
        select: {
          collaborators: true,
          branches: true
        }
      },
      createdBy: {
        select: {
          id: true,
          name: true,
          avatar: true
        }
      }
    },
    orderBy: { updatedAt: 'desc' },
    take: 20
  })
}

// Caching strategy
const getCachedProjects = async (userId: string) => {
  const cacheKey = `projects:${userId}`
  
  let projects = await redis.get(cacheKey)
  if (!projects) {
    projects = await getProjectsWithCollaborators(userId)
    await redis.setex(cacheKey, 300, JSON.stringify(projects)) // 5 min cache
  } else {
    projects = JSON.parse(projects)
  }
  
  return projects
}
```

### Monitoring and Observability

```typescript
// Performance monitoring
import { performance } from 'perf_hooks'

const performanceMiddleware = (req, res, next) => {
  const start = performance.now()
  
  res.on('finish', () => {
    const duration = performance.now() - start
    
    // Log slow requests
    if (duration > 1000) {
      logger.warn('Slow request detected', {
        method: req.method,
        url: req.url,
        duration: `${duration.toFixed(2)}ms`,
        statusCode: res.statusCode
      })
    }
    
    // Send metrics to monitoring service
    metrics.histogram('http_request_duration', duration, {
      method: req.method,
      route: req.route?.path,
      status_code: res.statusCode
    })
  })
  
  next()
}
```

This architecture and testing guide provides a comprehensive foundation for building, testing, and maintaining a scalable, high-quality research collaboration platform.
