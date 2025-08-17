# NeuraForge OS Project Structure

## Monorepo Organization
The project follows a Turborepo monorepo structure with clear separation of concerns between applications and shared packages.

## Root Structure
```
neuraforge-os/
├── apps/                    # Application packages
│   ├── web/                # Next.js frontend application
│   ├── api/                # Fastify backend API
│   └── ai-service/         # Python AI microservice
├── packages/               # Shared packages
│   ├── core/              # Business logic and entities
│   ├── database/          # Database layer with Prisma
│   ├── ui/                # Shared UI components
│   ├── ai/                # AI integration layer
│   └── shared/            # Common utilities and types
├── tools/                 # Development tools and configs
├── .qodo/                 # Project guidelines and standards
└── .kiro/                 # Kiro steering rules and settings
```

## Application Structure

### Frontend App (`apps/web/`)
```
web/
├── src/
│   ├── app/               # Next.js App Router pages
│   ├── components/        # React components
│   │   ├── ui/           # Basic UI components
│   │   ├── forms/        # Form components
│   │   └── research/     # Research-specific components
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions and configs
│   ├── stores/           # Zustand state stores
│   └── types/            # TypeScript type definitions
├── public/               # Static assets
└── package.json
```

### Backend API (`apps/api/`)
```
api/
├── src/
│   ├── routes/           # API route handlers
│   │   ├── auth/        # Authentication endpoints
│   │   ├── projects/    # Research project endpoints
│   │   └── collaboration/ # Real-time collaboration
│   ├── services/         # Business logic services
│   ├── middleware/       # Custom middleware
│   ├── plugins/          # Fastify plugins
│   └── types/            # API type definitions
└── package.json
```

## Shared Packages Structure

### Core Package (`packages/core/`)
Contains domain entities, business logic, and shared services that are framework-agnostic.

### Database Package (`packages/database/`)
```
database/
├── prisma/
│   ├── schema.prisma     # Database schema definition
│   ├── migrations/       # Database migration files
│   └── seed.ts          # Database seeding scripts
├── src/
│   ├── client.ts        # Prisma client configuration
│   └── repositories/    # Data access layer
└── package.json
```

### UI Package (`packages/ui/`)
Shared React components following atomic design principles:
- **Atoms**: Basic UI elements (buttons, inputs, icons)
- **Molecules**: Component combinations (search bars, cards)
- **Organisms**: Complex components (headers, forms, data tables)

### AI Package (`packages/ai/`)
AI integration layer with agent interfaces and provider abstractions for easy swapping of AI services.

## Naming Conventions

### Files and Directories
- **Components**: PascalCase (e.g., `ResearchTree.tsx`)
- **Utilities**: camelCase (e.g., `formatDate.ts`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_ENDPOINTS.ts`)
- **Types**: PascalCase with descriptive suffixes (e.g., `UserProfile.types.ts`)

### Code Organization
- **Imports**: External libraries → Internal packages → Relative imports
- **Exports**: Named exports preferred over default exports
- **Barrel Exports**: Use index.ts files for clean package interfaces

## Configuration Files
- **TypeScript**: Shared configs in `tools/tsconfig/`
- **ESLint**: Shared configs in `tools/eslint-config/`
- **Tailwind**: Extended configuration with design tokens
- **Turborepo**: Centralized build pipeline configuration

## Development Workflow
1. **Feature Development**: Create feature branches from main
2. **Package Changes**: Use `bun changeset` for version management
3. **Testing**: All packages must maintain 80%+ test coverage
4. **Documentation**: Update relevant docs with code changes
5. **Quality Gates**: All commits must pass linting, testing, and type checking

## Import Patterns
```typescript
// External dependencies first
import React from 'react';
import { NextPage } from 'next';

// Internal packages
import { Button } from '@neuraforge/ui';
import { useAuth } from '@neuraforge/core';

// Relative imports last
import { ResearchTree } from '../components/ResearchTree';
import { useResearchData } from './hooks/useResearchData';
```

## Package Dependencies
- **Apps** can depend on any package
- **Packages** should minimize cross-dependencies
- **Core** package should have minimal external dependencies
- **UI** package should only depend on design tokens and utilities