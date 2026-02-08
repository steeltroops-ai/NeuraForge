# Technology Stack

## Build System & Package Management

- **Monorepo**: Turborepo for optimized builds and caching
- **Package Manager**: Bun (v1.0.0+) - fast dependency management and runtime
- **Node Version**: >=18.0.0

> **Important**: This is a Bun project. Always use `bun` commands instead of `npm` or `yarn`. Bun is both the package manager and runtime for this project.

## Frontend Stack

- **Framework**: Next.js 14 with App Router
- **Runtime**: React 18.2+
- **Language**: TypeScript 5.2+ (strict mode enabled)
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives
- **State Management**: Zustand
- **Forms**: React Hook Form with Zod validation
- **Data Fetching**: TanStack Query (React Query)
- **Real-time**: Socket.io client
- **Rich Text**: TipTap with collaboration extensions
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Visualizations**: D3.js

## Backend Stack

- **Framework**: Fastify 4.x
- **Runtime**: Bun
- **Language**: TypeScript 5.0+
- **Real-time**: Socket.io server
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Clerk

## Code Quality Tools

- **Linting**: ESLint with Next.js config
- **Formatting**: Prettier with Tailwind plugin
- **Pre-commit**: Husky + lint-staged
- **Type Checking**: TypeScript strict mode

## Prettier Configuration

- Single quotes, semicolons, 2-space indentation
- 80 character line width
- ES5 trailing commas
- Arrow function parens: avoid
- LF line endings

## Common Commands

```bash
# Development
bun install              # Install dependencies
bun run dev             # Start all dev servers
bun run dev:web         # Start web app only (localhost:3005)
bun run dev:api         # Start API only (localhost:4000)

# Building
bun run build           # Build all apps
bun run start           # Start production servers

# Code Quality
bun run lint            # Run linting
bun run lint:fix        # Fix linting issues
bun run type-check      # TypeScript type checking
bun run format          # Format all files
bun run format:check    # Check formatting

# Testing
bun run test            # Run tests
bun run test:watch      # Run tests in watch mode

# Cleanup
bun run clean           # Clean build artifacts
```

## Environment Variables

- Prefix public env vars with `NEXT_PUBLIC_` for Next.js
- Store in `.env.local` (gitignored) or `.env.example` (template)
- Required: `DATABASE_URL` for database connection
