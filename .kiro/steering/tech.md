# NeuraForge OS Technical Stack

## Build System
- **Monorepo**: Turborepo for efficient build orchestration and caching
- **Package Manager**: Bun (primary) with npm fallback support
- **Runtime**: Node.js 18+ with TypeScript 5.0+
- **Bundler**: Next.js 14+ with App Router for frontend, Fastify for backend APIs

## Frontend Architecture
- **Framework**: Next.js 14 with React 18+ and TypeScript
- **Styling**: Tailwind CSS with custom design system tokens
- **State Management**: Zustand for client state, React Query for server state
- **Real-time**: Socket.io for WebSocket connections and collaborative features
- **Visualization**: D3.js for interactive research tree rendering
- **Testing**: Jest + React Testing Library + Playwright for E2E

## Backend Architecture
- **API Framework**: Fastify for high-performance REST APIs
- **Authentication**: JWT with RS256 signing, OAuth for institutional SSO
- **Database**: PostgreSQL (primary) with Prisma ORM
- **Caching**: Redis for session storage and performance optimization
- **Message Queue**: Apache Kafka for event streaming and real-time updates
- **AI Integration**: Python microservices with FastAPI for AI agents

## AI/ML Stack
- **Language Models**: OpenAI GPT-4 integration via official SDK
- **Vector Search**: pgvector extension for semantic search capabilities
- **ML Framework**: Python with FastAPI for AI service endpoints
- **Knowledge Graph**: Neo4j for research relationship mapping

## Development Tools
- **Code Quality**: ESLint + Prettier with TypeScript strict mode
- **Testing**: 80%+ unit test coverage requirement
- **CI/CD**: GitHub Actions with automated testing and deployment
- **Monitoring**: Comprehensive observability with error tracking

## Common Commands

### Development
```bash
# Install dependencies
bun install

# Start development servers
bun dev                    # Start all services
bun dev --filter=web      # Start frontend only
bun dev --filter=api      # Start backend only

# Build for production
bun build                 # Build all packages
bun build --filter=web    # Build frontend only
```

### Testing
```bash
# Run all tests
bun test

# Run tests with coverage
bun test:coverage

# Run E2E tests
bun test:e2e

# Run specific package tests
bun test --filter=@neuraforge/core
```

### Database
```bash
# Generate Prisma client
bun db:generate

# Run database migrations
bun db:migrate

# Reset database (development)
bun db:reset

# Seed database
bun db:seed
```

### Quality Assurance
```bash
# Lint all code
bun lint

# Fix linting issues
bun lint:fix

# Format code
bun format

# Type check
bun type-check
```

## Performance Targets
- **Load Time**: < 3 seconds on 3G networks
- **Bundle Size**: < 150KB per route
- **Core Web Vitals**: LCP < 2.5s, FID < 100ms, CLS < 0.1
- **Lighthouse Score**: 95+ across all categories
- **Test Coverage**: 80%+ unit tests, 70%+ integration tests

## Security Standards
- OWASP compliance with comprehensive input validation
- JWT tokens with automatic rotation and secure storage
- Rate limiting and DDoS protection
- Regular security audits and vulnerability scanning