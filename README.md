# NeuraForge

**The AI-Native Research Operating System**

NeuraForge is the world's first AI-agent-native research platform that transforms how humanity conducts scientific discovery. By orchestrating specialized AI research agents alongside human researchers, we're building the infrastructure for accelerated knowledge creation and breakthrough discoveries.

## 🎯 Mission

**Solving Humanity's Hardest Problems through AI-Powered Research Collaboration**

We believe the next wave of scientific breakthroughs will come from seamless human-AI collaboration in research. NeuraForge provides the operating system for this future, where AI agents and human researchers work together to tackle complex challenges in medicine, climate, AI safety, and beyond.

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

## 🧠 Core Capabilities

### Multi-Agent Research Orchestration
- **Domain-Specialized AI Agents**: Math, coding, physics, biology, policy agents working in parallel
- **Long-Context Reasoning Memory**: Persistent knowledge graphs across research projects
- **Experiment Design Engine**: AI agents propose hypotheses and design methodologies
- **Literature Mining**: Auto-digest and cross-reference insights from academic databases

### Research Workflow Superpowers
- **Semantic Research Workspace**: Interactive research canvases with graphs, equations, AI commentary
- **Automated Citation & Verification**: Every claim linked to papers, datasets, experiment logs
- **Collaborative Agent-Human Papers**: AI co-writes, humans critique, near-submission-ready drafts
- **Lab Notebook Mode**: Version-controlled experiments with agent-generated summaries

### Network & Collaboration Layer
- **Researcher-Agent Pairs**: Persistent AI co-researchers tuned to specific domains
- **Cross-Lab Knowledge Federation**: Secure insight sharing between teams and organizations
- **Peer Review Simulation**: AI agents role-play reviewers to stress-test arguments
- **Debate Arena**: Multiple agents pressure-test hypotheses through structured debate

## 🛠️ Technology Stack

- **Frontend**: Next.js 14 with React 18+ and TypeScript
- **Backend**: Fastify with Socket.io for real-time collaboration
- **AI Infrastructure**: Multi-agent orchestration with specialized research agents
- **Package Manager**: Bun for fast dependency management
- **Build System**: Turborepo for monorepo optimization
- **Styling**: Tailwind CSS with comprehensive design system
- **Database**: PostgreSQL with Prisma ORM for research data
- **Authentication**: Clerk for secure researcher authentication
- **Real-time**: Socket.io for collaborative research sessions

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
