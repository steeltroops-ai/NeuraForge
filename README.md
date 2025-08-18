# NeuraForge OS

NeuraForge OS is the world's first AI-native research ecosystem that transforms isolated research efforts into a connected, collaborative platform.

## 🚀 Quick Start

```bash
# Install dependencies
bun install

# Start development servers
bun run dev

# Build for production
bun run build
```

## 📁 Project Structure

```
neuraforge-os/
├── apps/
│   ├── web/          # Next.js frontend application
│   └── api/          # Fastify backend API with Socket.io
├── packages/
│   ├── ui/           # Design system and UI components
│   ├── core/         # Core business logic
│   ├── database/     # Database layer with Prisma
│   ├── shared/       # Shared utilities and types
│   ├── ai/           # AI/ML functionality
│   └── config/       # Shared configurations
├── docs/             # Documentation
├── tools/            # Build tools and scripts
└── .github/          # GitHub workflows
```

## 🛠️ Technology Stack

- **Frontend**: Next.js 14 with React 18+ and TypeScript
- **Backend**: Fastify with Socket.io for real-time features
- **Package Manager**: Bun
- **Build System**: Turborepo
- **Styling**: Tailwind CSS with custom design system
- **Database**: PostgreSQL with Prisma ORM (planned)
- **Authentication**: JWT-based auth system

## 🏃‍♂️ Development

1. **Install dependencies**
   ```bash
   bun install
   ```

2. **Start development servers**
   ```bash
   bun run dev
   ```

3. **Access the applications**
   - Frontend: http://localhost:3005
   - API: http://localhost:4000

## 📚 Documentation

- [Architecture Overview](./docs/ARCHITECTURE.md)
- [Development Guide](./docs/DEVELOPMENT.md)
- [Authentication System](./docs/AUTHENTICATION_SYSTEM.md)
- [Complete Documentation](./docs/README.md)

## 🔧 Available Scripts

- `bun run dev` - Start all development servers
- `bun run dev:web` - Start only the web app
- `bun run dev:api` - Start only the API server
- `bun run build` - Build all applications
- `bun run lint` - Run linting
- `bun run type-check` - Run TypeScript type checking
- `bun run test` - Run tests
- `bun run clean` - Clean build artifacts

## 🧪 Demo Credentials

- Email: demo@neuraforge.dev
- Password: demo123
