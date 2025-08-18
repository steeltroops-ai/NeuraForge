# NeuraForge OS Architecture

## System Overview

NeuraForge OS is an AI-native research ecosystem built as a modern monorepo with the following architecture:

## Technology Stack

### Frontend (`apps/web`)
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design system
- **State Management**: Zustand
- **Forms**: React Hook Form with Zod validation
- **UI Components**: Radix UI primitives
- **Real-time**: Socket.io client
- **Animations**: Framer Motion

### Backend (`apps/api`)
- **Framework**: Fastify
- **Language**: TypeScript
- **Real-time**: Socket.io server
- **Database**: PostgreSQL with Prisma ORM (planned)
- **Authentication**: JWT-based auth system

### Shared Packages
- `@neuraforge/ui` - Design system and reusable components
- `@neuraforge/core` - Core business logic and utilities
- `@neuraforge/database` - Database layer and Prisma client
- `@neuraforge/shared` - Shared types and utilities
- `@neuraforge/ai` - AI/ML functionality and integrations
- `@neuraforge/config` - Shared configurations (TypeScript, ESLint, Tailwind)

## Monorepo Structure

```
neuraforge-os/
├── apps/
│   ├── web/          # Next.js frontend
│   └── api/          # Fastify backend
├── packages/
│   ├── ui/           # Design system
│   ├── core/         # Business logic
│   ├── database/     # Database layer
│   ├── shared/       # Shared utilities
│   ├── ai/           # AI functionality
│   └── config/       # Shared configs
├── docs/             # Documentation
└── tools/            # Build tools
```

## Build System

- **Package Manager**: Bun
- **Build Orchestration**: Turborepo
- **Development**: Hot reload with fast refresh
- **Production**: Optimized builds with code splitting
