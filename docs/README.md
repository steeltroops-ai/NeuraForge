# 📚 NeuraForge OS Documentation

Welcome to the comprehensive documentation for NeuraForge OS - the AI-native research ecosystem that transforms isolated research efforts into a connected, collaborative platform.

## 🎯 Quick Start

**New to NeuraForge OS?** Start here:

1. **[Project Overview](../README.md)** - Understand what NeuraForge OS is and why it matters
2. **[Getting Started Guide](#getting-started)** - Set up your development environment
3. **[Contributing Guidelines](CONTRIBUTING.md)** - Learn how to contribute to the project
4. **[Development Status](DEVELOPMENT_STATUS.md)** - See current progress and roadmap

## 📖 Documentation Index

### 🏗️ Architecture & Design

| Document | Description | Audience |
|----------|-------------|----------|
| **[Architecture & Testing](ARCHITECTURE_AND_TESTING.md)** | System architecture, design patterns, and testing strategies | Developers, Architects |
| **[Database Schema](DATABASE_SCHEMA.md)** | Complete database design and data models | Backend Developers, DBAs |
| **[Authentication System](AUTHENTICATION_SYSTEM.md)** | Authentication architecture and implementation | Security Engineers, Developers |

### 🔧 Development

| Document | Description | Audience |
|----------|-------------|----------|
| **[API Documentation](API_DOCUMENTATION.md)** | Complete REST API reference with examples | Frontend/Backend Developers |
| **[Component Library](COMPONENT_LIBRARY.md)** | UI component library and design system | Frontend Developers, Designers |
| **[Real-time Features](REALTIME_FEATURES.md)** | WebSocket implementation and collaboration features | Full-stack Developers |
| **[Development Status](DEVELOPMENT_STATUS.md)** | Current progress, roadmap, and sprint planning | Project Managers, Developers |

### 🚀 Deployment & Operations

| Document | Description | Audience |
|----------|-------------|----------|
| **[Deployment Guide](DEPLOYMENT.md)** | Comprehensive deployment strategies and configurations | DevOps Engineers, SysAdmins |

### 🤝 Contributing

| Document | Description | Audience |
|----------|-------------|----------|
| **[Contributing Guidelines](CONTRIBUTING.md)** | How to contribute to the project | New Contributors, Developers |

### 📋 Legacy Documentation

| Document | Description | Status |
|----------|-------------|--------|
| [Architecture Overview](./ARCHITECTURE.md) | Original architecture docs | Legacy |
| [Auth System Summary](./AUTH_SYSTEM_SUMMARY.md) | Authentication overview | Legacy |
| [Modern Design Implementation](./MODERN_DESIGN_IMPLEMENTATION.md) | UI/UX design system | Legacy |
| [MVP Implementation Plan](./MVP_IMPLEMENTATION_PLAN.md) | MVP development roadmap | Legacy |
| [NeuraForge OS Framework](./neuraForgeOS-framework.md) | Core framework documentation | Legacy |

## 🚀 Getting Started

### Prerequisites

- **Node.js 18+** and **Bun 1.0+**
- **PostgreSQL 14+** (Docker recommended)
- **Redis 6+** (Docker recommended)
- **Git** for version control

### Quick Setup

```bash
# 1. Clone the repository
git clone https://github.com/your-org/neuraforge-os.git
cd neuraforge-os

# 2. Install dependencies
bun install

# 3. Set up environment
cp .env.example .env
# Edit .env with your configuration

# 4. Start databases (Docker)
docker run --name neuraforge-postgres \
  -e POSTGRES_DB=neuraforge_dev \
  -e POSTGRES_USER=neuraforge \
  -e POSTGRES_PASSWORD=password \
  -p 5432:5432 -d postgres:14

docker run --name neuraforge-redis \
  -p 6379:6379 -d redis:6-alpine

# 5. Run database migrations
cd packages/database
bun run db:migrate
bun run db:seed

# 6. Start development servers
cd ../..
bun run dev
```

### Access the Application

- **Frontend**: http://localhost:3005
- **Backend API**: http://localhost:4000
- **Demo Login**: `demo@neuraforge.dev` / `demo123`

## 🏗️ Project Structure

```
neuraforge-os/
├── apps/
│   ├── web/                 # Next.js frontend application
│   └── api/                 # Fastify backend API
├── packages/
│   ├── ui/                  # Design system and UI components
│   ├── core/                # Core business logic
│   ├── database/            # Database layer with Prisma
│   ├── shared/              # Shared utilities and types
│   ├── ai/                  # AI/ML functionality
│   └── config/              # Shared configurations
├── docs/                    # Documentation (you are here!)
├── tools/                   # Build tools and scripts
└── .github/                 # GitHub workflows and templates
```

## 📊 Current Status

**Development Phase**: MVP Foundation
**Version**: 0.1.0-alpha
**Overall Progress**: 65% complete

### Recent Achievements

- ✅ **Console Debugging**: Fixed all browser console errors and warnings
- ✅ **Comprehensive Documentation**: Created complete technical documentation
- ✅ **Authentication System**: 100% complete with demo functionality
- ✅ **Frontend Foundation**: 95% complete with modern design system
- ✅ **Backend Infrastructure**: 90% complete with API endpoints

## 🤝 Contributing

We welcome contributions from developers of all skill levels!

**Quick Start for Contributors:**
1. Read the **[Contributing Guidelines](CONTRIBUTING.md)**
2. Check **[Development Status](DEVELOPMENT_STATUS.md)** for current priorities
3. Review **[Architecture & Testing](ARCHITECTURE_AND_TESTING.md)** for technical standards

## 📞 Support & Community

- **📖 Documentation**: Start with this documentation
- **💬 GitHub Discussions**: Ask questions and share ideas
- **📧 Email**: hello@neuraforge.dev for general inquiries

---

**Ready to contribute?** Start with our [Contributing Guidelines](CONTRIBUTING.md) and join the future of research collaboration! 🚀
