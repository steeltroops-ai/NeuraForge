# Development Guide

## Prerequisites

- Node.js 18+ 
- Bun 1.0+
- Git

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd neuraforge-os
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Start development servers**
   ```bash
   bun run dev
   ```

4. **Access the applications**
   - Frontend: http://localhost:3005
   - API: http://localhost:4000

## Available Scripts

- `bun run dev` - Start all development servers
- `bun run dev:web` - Start only the web app
- `bun run dev:api` - Start only the API server
- `bun run build` - Build all applications
- `bun run lint` - Run linting
- `bun run lint:fix` - Fix linting issues
- `bun run type-check` - Run TypeScript type checking
- `bun run test` - Run tests
- `bun run clean` - Clean build artifacts

## Project Structure

### Apps
- `apps/web/` - Next.js frontend application
- `apps/api/` - Fastify backend API

### Packages
- `packages/ui/` - Shared UI components and design system
- `packages/core/` - Core business logic
- `packages/database/` - Database layer with Prisma
- `packages/shared/` - Shared utilities and types
- `packages/ai/` - AI/ML functionality
- `packages/config/` - Shared configuration files

## Development Workflow

1. Create feature branches from `main`
2. Make changes in the appropriate app or package
3. Run tests and linting
4. Create pull request
5. Code review and merge

## Code Standards

- Use TypeScript for all new code
- Follow ESLint configuration
- Use Prettier for code formatting
- Write tests for new functionality
- Follow conventional commit messages
