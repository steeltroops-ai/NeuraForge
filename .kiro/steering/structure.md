# Project Structure

## Monorepo Organization

NeuraForge uses a Turborepo monorepo with workspaces for apps and shared packages.

```
neuraforge-os/
├── apps/                    # Application workspaces
│   ├── web/                # Next.js frontend (port 3005)
│   └── api/                # Fastify backend (port 4000)
├── packages/               # Shared packages
│   ├── ui/                 # Design system & UI components
│   ├── core/               # Core business logic
│   ├── database/           # Prisma schema & database layer
│   ├── shared/             # Shared utilities & types
│   ├── ai/                 # AI/ML functionality
│   └── config/             # Shared configurations (TypeScript, etc.)
├── docs/                   # Documentation
│   ├── business/
│   ├── design/
│   ├── marketing/
│   ├── operations/
│   ├── product/
│   ├── reports/
│   ├── technical/
│   └── ui/
├── tools/                  # Build tools & scripts
│   └── scripts/
└── .kiro/                  # Kiro AI assistant configuration
    └── steering/           # AI steering rules
```

## Package Naming Convention

All packages use the `@neuraforge/` scope:
- `@neuraforge/web` - Frontend application
- `@neuraforge/api` - Backend API
- `@neuraforge/ui` - UI component library
- `@neuraforge/core` - Core business logic
- `@neuraforge/database` - Database layer
- `@neuraforge/shared` - Shared utilities
- `@neuraforge/ai` - AI functionality

## Application Structure

### Web App (`apps/web/`)
- Next.js 14 with App Router
- `src/` directory for source code
- `public/` for static assets
- Individual `tailwind.config.js` and `next.config.js`

### API App (`apps/api/`)
- Fastify server with Socket.io
- `src/` directory for source code
- Bun runtime with `--watch` for hot reload
- Dockerfile for containerization

## Shared Packages

Each package in `packages/` follows a consistent structure:
- `src/` - Source code
- `package.json` - Package configuration
- `tsconfig.json` - TypeScript configuration
- Built artifacts in `dist/` (gitignored)

## Key Configuration Files

- `turbo.json` - Turborepo pipeline configuration
- `tsconfig.json` - Root TypeScript config (extended by packages)
- `eslint.config.mjs` - ESLint configuration
- `.prettierrc` - Prettier formatting rules
- `.lintstagedrc.js` - Pre-commit hooks configuration
- `package.json` - Root workspace configuration

## Path Aliases

TypeScript path aliases use `@/*` pattern pointing to `./src/*` within each package.

## Build Artifacts

Generated files (gitignored):
- `.next/` - Next.js build output
- `dist/` - TypeScript compiled output
- `node_modules/` - Dependencies
- `.turbo/` - Turborepo cache
- `*.tsbuildinfo` - TypeScript incremental build info

## Documentation Organization

The `docs/` folder is organized by department/function:
- `business/` - Business strategy and planning
- `design/` - Design specifications and assets
- `marketing/` - Marketing materials
- `operations/` - Operational procedures
- `product/` - Product requirements and specs
- `reports/` - Analysis and reports
- `technical/` - Technical documentation
- `ui/` - UI/UX documentation
