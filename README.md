# NeuraForge OS

NeuraForge OS is the world's first AI-native research ecosystem that transforms isolated research efforts into a connected, collaborative platform.

## Project Structure

The main project is located in `neuraForgeOS-monorepo/neuraforge-os/` which contains:

- `apps/web/` - Next.js frontend application
- `apps/api/` - Fastify backend API with Socket.io
- `packages/` - Shared packages (core, ui, database, etc.)

## Quick Start

```bash
# Install dependencies
npm run install-deps

# Start development servers
npm run dev

# Build for production
npm run build
```

## Development

The project uses:
- **Frontend**: Next.js 14 with React 18+ and TypeScript
- **Backend**: Fastify with Socket.io for real-time features
- **Package Manager**: Bun
- **Build System**: Turborepo
- **Styling**: Tailwind CSS

## Architecture

- **Monorepo**: Turborepo for efficient build orchestration
- **Real-time**: Socket.io for collaborative features
- **Authentication**: JWT-based auth system
- **Database**: PostgreSQL with Prisma ORM (planned)

## Getting Started

1. Navigate to the main project directory:
   ```bash
   cd neuraForgeOS-monorepo/neuraforge-os
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Start development servers:
   ```bash
   bun run dev
   ```

4. Access the application:
   - Frontend: http://localhost:3003
   - API: http://localhost:4000

## Demo Credentials

- Email: demo@neuraforge.dev
- Password: demo123