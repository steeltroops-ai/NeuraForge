# 🗄️ NeuraForge OS Database Schema

## Overview

NeuraForge OS uses PostgreSQL as the primary database with Prisma ORM for type-safe database operations. The schema is designed to support collaborative research, version control for research projects, and AI-powered features.

## Database Configuration

### Connection

```typescript
// Database URL format
DATABASE_URL="postgresql://username:password@localhost:5432/neuraforge_os"
```

### Prisma Configuration

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

## Core Entities

### User Model

Represents researchers and collaborators in the system.

```prisma
model User {
  id            String    @id @default(uuid())
  email         String    @unique
  name          String?
  avatar        String?
  bio           String?
  institution   String?
  department    String?
  orcidId       String?   @unique
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  // Relationships
  projects      Project[]
  collaborations ProjectCollaborator[]
  sessions      UserSession[]
  
  @@map("users")
}
```

#### Fields Description

- `id`: Unique identifier (UUID)
- `email`: User's email address (unique)
- `name`: Full name of the user
- `avatar`: URL to profile picture
- `bio`: Short biography or description
- `institution`: Academic or research institution
- `department`: Department within institution
- `orcidId`: ORCID identifier for academic verification
- `createdAt`: Account creation timestamp
- `updatedAt`: Last profile update timestamp

### Project Model

Represents research projects with collaboration features.

```prisma
model Project {
  id            String    @id @default(uuid())
  title         String
  description   String?
  domain        String?
  status        ProjectStatus @default(ACTIVE)
  visibility    Visibility @default(PUBLIC)
  tags          String[]
  metadata      Json?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  // Relationships
  createdBy     User      @relation(fields: [createdById], references: [id])
  createdById   String
  collaborators ProjectCollaborator[]
  branches      ResearchBranch[]
  
  @@map("projects")
}

enum ProjectStatus {
  ACTIVE
  ARCHIVED
  COMPLETED
  PAUSED
}

enum Visibility {
  PUBLIC
  PRIVATE
  RESTRICTED
}
```

#### Fields Description

- `id`: Unique project identifier
- `title`: Project title
- `description`: Detailed project description
- `domain`: Research domain (e.g., "Biotechnology", "AI/ML")
- `status`: Current project status
- `visibility`: Access level for the project
- `tags`: Array of searchable tags
- `metadata`: Additional project metadata (JSON)
- `createdById`: Reference to project creator

### ResearchBranch Model

Implements version control for research projects, similar to Git branches.

```prisma
model ResearchBranch {
  id              String    @id @default(uuid())
  name            String
  description     String?
  status          BranchStatus @default(ACTIVE)
  content         Json?
  parentBranchId  String?
  projectId       String
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  
  // Relationships
  project         Project   @relation(fields: [projectId], references: [id], onDelete: Cascade)
  parentBranch    ResearchBranch? @relation("BranchHierarchy", fields: [parentBranchId], references: [id])
  childBranches   ResearchBranch[] @relation("BranchHierarchy")
  
  @@unique([projectId, name])
  @@map("research_branches")
}

enum BranchStatus {
  ACTIVE
  MERGED
  ABANDONED
}
```

#### Fields Description

- `id`: Unique branch identifier
- `name`: Branch name (unique within project)
- `description`: Branch purpose description
- `status`: Current branch status
- `content`: Research content and data (JSON)
- `parentBranchId`: Reference to parent branch (for hierarchy)
- `projectId`: Reference to parent project

### ProjectCollaborator Model

Manages user permissions and roles within projects.

```prisma
model ProjectCollaborator {
  id        String    @id @default(uuid())
  role      Role      @default(VIEWER)
  project   Project   @relation(fields: [projectId], references: [id], onDelete: Cascade)
  projectId String
  user      User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  userId    String
  invitedBy String?
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt

  @@unique([projectId, userId])
  @@map("project_collaborators")
}

enum Role {
  OWNER
  EDITOR
  VIEWER
  REVIEWER
}
```

#### Role Permissions

- **OWNER**: Full project control, can delete project
- **EDITOR**: Can modify content, manage collaborators
- **VIEWER**: Read-only access to project content
- **REVIEWER**: Can view and comment, limited editing

### KnowledgeNode Model

Represents knowledge entities with AI-powered features.

```prisma
model KnowledgeNode {
  id        String    @id @default(uuid())
  nodeType  NodeType
  title     String
  content   String?
  summary   String?
  metadata  Json?
  embedding Vec(1536)? @postgres
  tags      String[]
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  
  @@map("knowledge_nodes")
}

enum NodeType {
  HYPOTHESIS
  EXPERIMENT
  OBSERVATION
  CONCLUSION
  LITERATURE
  METHODOLOGY
}
```

#### Fields Description

- `id`: Unique node identifier
- `nodeType`: Type of knowledge entity
- `title`: Node title or summary
- `content`: Full content or description
- `summary`: AI-generated summary
- `metadata`: Additional structured data
- `embedding`: Vector embedding for AI search (1536 dimensions)
- `tags`: Searchable tags

## Authentication & Sessions

### UserSession Model

Manages user authentication sessions.

```prisma
model UserSession {
  id           String    @id @default(uuid())
  userId       String
  accessToken  String    @unique
  refreshToken String    @unique
  expiresAt    DateTime
  createdAt    DateTime  @default(now())
  lastUsedAt   DateTime  @default(now())
  ipAddress    String?
  userAgent    String?
  
  // Relationships
  user         User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@map("user_sessions")
}
```

## AI & Analytics

### AIInteraction Model

Tracks AI-powered interactions and suggestions.

```prisma
model AIInteraction {
  id          String    @id @default(uuid())
  userId      String
  projectId   String?
  type        AIInteractionType
  input       Json
  output      Json
  confidence  Float?
  feedback    AIFeedback?
  createdAt   DateTime  @default(now())
  
  @@map("ai_interactions")
}

enum AIInteractionType {
  HYPOTHESIS_GENERATION
  LITERATURE_DISCOVERY
  EXPERIMENT_SUGGESTION
  DATA_ANALYSIS
  VALIDATION
}

enum AIFeedback {
  HELPFUL
  NOT_HELPFUL
  PARTIALLY_HELPFUL
}
```

### ProjectAnalytics Model

Stores project usage and collaboration analytics.

```prisma
model ProjectAnalytics {
  id              String    @id @default(uuid())
  projectId       String
  date            DateTime  @db.Date
  viewCount       Int       @default(0)
  editCount       Int       @default(0)
  collaboratorCount Int     @default(0)
  branchCount     Int       @default(0)
  aiInteractions  Int       @default(0)
  
  @@unique([projectId, date])
  @@map("project_analytics")
}
```

## Database Operations

### Common Queries

#### Create User

```typescript
const user = await prisma.user.create({
  data: {
    email: 'researcher@university.edu',
    name: 'Dr. Jane Smith',
    institution: 'MIT',
    department: 'Computer Science'
  }
});
```

#### Create Project with Collaborators

```typescript
const project = await prisma.project.create({
  data: {
    title: 'AI-Powered Drug Discovery',
    description: 'Research project exploring ML in pharmaceuticals',
    domain: 'Biotechnology',
    createdById: userId,
    collaborators: {
      create: [
        {
          userId: collaboratorId,
          role: 'EDITOR'
        }
      ]
    },
    branches: {
      create: {
        name: 'main',
        description: 'Main research branch'
      }
    }
  },
  include: {
    collaborators: {
      include: {
        user: true
      }
    },
    branches: true
  }
});
```

#### Get Project with Full Details

```typescript
const project = await prisma.project.findUnique({
  where: { id: projectId },
  include: {
    createdBy: {
      select: {
        id: true,
        name: true,
        email: true,
        institution: true
      }
    },
    collaborators: {
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true
          }
        }
      }
    },
    branches: {
      orderBy: {
        createdAt: 'asc'
      }
    }
  }
});
```

#### Search Projects with AI

```typescript
const projects = await prisma.project.findMany({
  where: {
    OR: [
      {
        title: {
          contains: searchQuery,
          mode: 'insensitive'
        }
      },
      {
        description: {
          contains: searchQuery,
          mode: 'insensitive'
        }
      },
      {
        tags: {
          hasSome: searchTags
        }
      }
    ],
    visibility: 'PUBLIC'
  },
  include: {
    createdBy: {
      select: {
        name: true,
        institution: true
      }
    },
    _count: {
      select: {
        collaborators: true,
        branches: true
      }
    }
  },
  orderBy: {
    updatedAt: 'desc'
  },
  take: 20
});
```

#### Vector Similarity Search

```typescript
// Find similar knowledge nodes using vector embeddings
const similarNodes = await prisma.$queryRaw`
  SELECT id, title, content, 
         1 - (embedding <=> ${embedding}::vector) as similarity
  FROM knowledge_nodes 
  WHERE 1 - (embedding <=> ${embedding}::vector) > 0.8
  ORDER BY similarity DESC
  LIMIT 10
`;
```

## Migrations

### Running Migrations

```bash
# Generate migration
npx prisma migrate dev --name add_knowledge_nodes

# Apply migrations to production
npx prisma migrate deploy

# Reset database (development only)
npx prisma migrate reset
```

### Seeding Data

```typescript
// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create demo user
  const demoUser = await prisma.user.create({
    data: {
      email: 'demo@neuraforge.dev',
      name: 'Demo User',
      institution: 'NeuraForge Research',
      department: 'AI Research'
    }
  });

  // Create demo project
  const demoProject = await prisma.project.create({
    data: {
      title: 'AI-Powered Drug Discovery',
      description: 'Exploring machine learning applications in pharmaceutical research',
      domain: 'Biotechnology',
      tags: ['AI', 'ML', 'Drug Discovery', 'Biotechnology'],
      createdById: demoUser.id,
      branches: {
        create: {
          name: 'main',
          description: 'Main research branch',
          content: {
            hypothesis: 'Machine learning can accelerate drug discovery',
            experiments: [],
            notes: 'Initial project setup'
          }
        }
      }
    }
  });

  console.log('Seed data created successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

## Performance Optimization

### Indexing Strategy

```sql
-- Frequently queried fields
CREATE INDEX idx_projects_created_by ON projects(created_by_id);
CREATE INDEX idx_projects_domain ON projects(domain);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_visibility ON projects(visibility);

-- Full-text search
CREATE INDEX idx_projects_title_search ON projects USING gin(to_tsvector('english', title));
CREATE INDEX idx_projects_description_search ON projects USING gin(to_tsvector('english', description));

-- Vector similarity search
CREATE INDEX idx_knowledge_nodes_embedding ON knowledge_nodes USING ivfflat (embedding vector_cosine_ops);

-- Composite indexes for common queries
CREATE INDEX idx_project_collaborators_project_user ON project_collaborators(project_id, user_id);
CREATE INDEX idx_research_branches_project_status ON research_branches(project_id, status);
```

### Connection Pooling

```typescript
// Database connection configuration
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
  log: ['query', 'info', 'warn', 'error'],
});

// Connection pool settings
export const dbConfig = {
  connectionLimit: 20,
  acquireTimeout: 60000,
  timeout: 60000,
  reconnect: true,
};
```

## Backup and Recovery

### Automated Backups

```bash
# Daily backup script
pg_dump -h localhost -U username -d neuraforge_os > backup_$(date +%Y%m%d).sql

# Restore from backup
psql -h localhost -U username -d neuraforge_os < backup_20240105.sql
```

### Data Retention Policies

- **User Sessions**: 30 days
- **AI Interactions**: 1 year
- **Project Analytics**: 2 years
- **User Data**: Indefinite (with GDPR compliance)
- **Project Data**: Indefinite (user-controlled)

This database schema provides a robust foundation for collaborative research with version control, AI integration, and comprehensive analytics capabilities.
