# 🚀 NeuraForge OS Deployment Guide

## Overview

This guide covers deployment strategies for NeuraForge OS, from local development to production environments. The platform is designed for scalable, cloud-native deployment with containerization and microservices architecture.

## Prerequisites

### System Requirements

**Development Environment:**
- Node.js 18+ 
- Bun 1.0+
- PostgreSQL 14+
- Redis 6+
- Git

**Production Environment:**
- Docker & Docker Compose
- Kubernetes (recommended)
- PostgreSQL 14+ (managed service recommended)
- Redis 6+ (managed service recommended)
- Load balancer (nginx, AWS ALB, etc.)

### Environment Variables

Create environment files for each environment:

```bash
# .env.development
NODE_ENV=development
DATABASE_URL=postgresql://user:password@localhost:5432/neuraforge_dev
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-development-jwt-secret
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_WS_URL=ws://localhost:4000

# .env.production
NODE_ENV=production
DATABASE_URL=postgresql://user:password@prod-db:5432/neuraforge_prod
REDIS_URL=redis://prod-redis:6379
JWT_SECRET=your-production-jwt-secret-256-bit
NEXT_PUBLIC_API_URL=https://api.neuraforge.dev
NEXT_PUBLIC_WS_URL=wss://api.neuraforge.dev
```

## Local Development Setup

### 1. Clone and Install

```bash
# Clone repository
git clone https://github.com/your-org/neuraforge-os.git
cd neuraforge-os

# Install dependencies
bun install

# Copy environment file
cp .env.example .env
```

### 2. Database Setup

```bash
# Start PostgreSQL (using Docker)
docker run --name neuraforge-postgres \
  -e POSTGRES_DB=neuraforge_dev \
  -e POSTGRES_USER=neuraforge \
  -e POSTGRES_PASSWORD=password \
  -p 5432:5432 \
  -d postgres:14

# Start Redis
docker run --name neuraforge-redis \
  -p 6379:6379 \
  -d redis:6-alpine

# Run database migrations
cd packages/database
bun run db:migrate
bun run db:seed
```

### 3. Start Development Servers

```bash
# Start all services
bun run dev

# Or start individually
bun run dev:web    # Frontend on :3005
bun run dev:api    # Backend on :4000
```

## Docker Deployment

### Dockerfile Configuration

**Frontend Dockerfile** (`apps/web/Dockerfile`):

```dockerfile
FROM node:18-alpine AS base
RUN npm install -g bun

# Dependencies
FROM base AS deps
WORKDIR /app
COPY package.json bun.lock ./
COPY packages/ui/package.json ./packages/ui/
COPY packages/shared/package.json ./packages/shared/
RUN bun install --frozen-lockfile

# Build
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN bun run build:web

# Production
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/apps/web/public ./apps/web/public
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000
CMD ["node", "apps/web/server.js"]
```

**Backend Dockerfile** (`apps/api/Dockerfile`):

```dockerfile
FROM node:18-alpine AS base
RUN npm install -g bun

# Dependencies
FROM base AS deps
WORKDIR /app
COPY package.json bun.lock ./
COPY packages/database/package.json ./packages/database/
COPY packages/shared/package.json ./packages/shared/
RUN bun install --frozen-lockfile

# Build
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN bun run build:api

# Production
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 fastify

COPY --from=builder --chown=fastify:nodejs /app/apps/api/dist ./dist
COPY --from=builder --chown=fastify:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=fastify:nodejs /app/packages ./packages

USER fastify
EXPOSE 4000
ENV PORT=4000
CMD ["node", "dist/index.js"]
```

### Docker Compose

**Development** (`docker-compose.dev.yml`):

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:14-alpine
    environment:
      POSTGRES_DB: neuraforge_dev
      POSTGRES_USER: neuraforge
      POSTGRES_PASSWORD: password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:6-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

  api:
    build:
      context: .
      dockerfile: apps/api/Dockerfile
    environment:
      - NODE_ENV=development
      - DATABASE_URL=postgresql://neuraforge:password@postgres:5432/neuraforge_dev
      - REDIS_URL=redis://redis:6379
      - JWT_SECRET=dev-secret-key
    ports:
      - "4000:4000"
    depends_on:
      - postgres
      - redis
    volumes:
      - ./apps/api:/app/apps/api
      - /app/node_modules

  web:
    build:
      context: .
      dockerfile: apps/web/Dockerfile
    environment:
      - NODE_ENV=development
      - NEXT_PUBLIC_API_URL=http://localhost:4000
      - NEXT_PUBLIC_WS_URL=ws://localhost:4000
    ports:
      - "3005:3000"
    depends_on:
      - api
    volumes:
      - ./apps/web:/app/apps/web
      - /app/node_modules

volumes:
  postgres_data:
  redis_data:
```

**Production** (`docker-compose.prod.yml`):

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:14-alpine
    environment:
      POSTGRES_DB: ${POSTGRES_DB}
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./backups:/backups
    restart: unless-stopped

  redis:
    image: redis:6-alpine
    command: redis-server --appendonly yes
    volumes:
      - redis_data:/data
    restart: unless-stopped

  api:
    build:
      context: .
      dockerfile: apps/api/Dockerfile
    environment:
      - NODE_ENV=production
      - DATABASE_URL=${DATABASE_URL}
      - REDIS_URL=${REDIS_URL}
      - JWT_SECRET=${JWT_SECRET}
    depends_on:
      - postgres
      - redis
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:4000/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  web:
    build:
      context: .
      dockerfile: apps/web/Dockerfile
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
      - NEXT_PUBLIC_WS_URL=${NEXT_PUBLIC_WS_URL}
    depends_on:
      - api
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - web
      - api
    restart: unless-stopped

volumes:
  postgres_data:
  redis_data:
```

### Nginx Configuration

```nginx
# nginx.conf
events {
    worker_connections 1024;
}

http {
    upstream web {
        server web:3000;
    }
    
    upstream api {
        server api:4000;
    }
    
    # Redirect HTTP to HTTPS
    server {
        listen 80;
        server_name neuraforge.dev www.neuraforge.dev;
        return 301 https://$server_name$request_uri;
    }
    
    # HTTPS Configuration
    server {
        listen 443 ssl http2;
        server_name neuraforge.dev www.neuraforge.dev;
        
        ssl_certificate /etc/nginx/ssl/cert.pem;
        ssl_certificate_key /etc/nginx/ssl/key.pem;
        
        # Frontend
        location / {
            proxy_pass http://web;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
        
        # API
        location /api/ {
            proxy_pass http://api/;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
        
        # WebSocket
        location /socket.io/ {
            proxy_pass http://api;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }
}
```

## Kubernetes Deployment

### Namespace and ConfigMap

```yaml
# k8s/namespace.yaml
apiVersion: v1
kind: Namespace
metadata:
  name: neuraforge

---
# k8s/configmap.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: neuraforge-config
  namespace: neuraforge
data:
  NODE_ENV: "production"
  NEXT_PUBLIC_API_URL: "https://api.neuraforge.dev"
  NEXT_PUBLIC_WS_URL: "wss://api.neuraforge.dev"
```

### Secrets

```yaml
# k8s/secrets.yaml
apiVersion: v1
kind: Secret
metadata:
  name: neuraforge-secrets
  namespace: neuraforge
type: Opaque
data:
  DATABASE_URL: <base64-encoded-database-url>
  REDIS_URL: <base64-encoded-redis-url>
  JWT_SECRET: <base64-encoded-jwt-secret>
```

### Database Deployment

```yaml
# k8s/postgres.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: postgres
  namespace: neuraforge
spec:
  replicas: 1
  selector:
    matchLabels:
      app: postgres
  template:
    metadata:
      labels:
        app: postgres
    spec:
      containers:
      - name: postgres
        image: postgres:14-alpine
        env:
        - name: POSTGRES_DB
          value: neuraforge_prod
        - name: POSTGRES_USER
          value: neuraforge
        - name: POSTGRES_PASSWORD
          valueFrom:
            secretKeyRef:
              name: neuraforge-secrets
              key: POSTGRES_PASSWORD
        ports:
        - containerPort: 5432
        volumeMounts:
        - name: postgres-storage
          mountPath: /var/lib/postgresql/data
      volumes:
      - name: postgres-storage
        persistentVolumeClaim:
          claimName: postgres-pvc

---
apiVersion: v1
kind: Service
metadata:
  name: postgres-service
  namespace: neuraforge
spec:
  selector:
    app: postgres
  ports:
  - port: 5432
    targetPort: 5432
```

### API Deployment

```yaml
# k8s/api.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: api
  namespace: neuraforge
spec:
  replicas: 3
  selector:
    matchLabels:
      app: api
  template:
    metadata:
      labels:
        app: api
    spec:
      containers:
      - name: api
        image: neuraforge/api:latest
        envFrom:
        - configMapRef:
            name: neuraforge-config
        - secretRef:
            name: neuraforge-secrets
        ports:
        - containerPort: 4000
        livenessProbe:
          httpGet:
            path: /health
            port: 4000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /health
            port: 4000
          initialDelaySeconds: 5
          periodSeconds: 5

---
apiVersion: v1
kind: Service
metadata:
  name: api-service
  namespace: neuraforge
spec:
  selector:
    app: api
  ports:
  - port: 4000
    targetPort: 4000
```

### Web Deployment

```yaml
# k8s/web.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web
  namespace: neuraforge
spec:
  replicas: 3
  selector:
    matchLabels:
      app: web
  template:
    metadata:
      labels:
        app: web
    spec:
      containers:
      - name: web
        image: neuraforge/web:latest
        envFrom:
        - configMapRef:
            name: neuraforge-config
        ports:
        - containerPort: 3000
        livenessProbe:
          httpGet:
            path: /api/health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /api/health
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 5

---
apiVersion: v1
kind: Service
metadata:
  name: web-service
  namespace: neuraforge
spec:
  selector:
    app: web
  ports:
  - port: 3000
    targetPort: 3000
```

### Ingress Configuration

```yaml
# k8s/ingress.yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: neuraforge-ingress
  namespace: neuraforge
  annotations:
    kubernetes.io/ingress.class: nginx
    cert-manager.io/cluster-issuer: letsencrypt-prod
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
    nginx.ingress.kubernetes.io/proxy-body-size: "50m"
spec:
  tls:
  - hosts:
    - neuraforge.dev
    - api.neuraforge.dev
    secretName: neuraforge-tls
  rules:
  - host: neuraforge.dev
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: web-service
            port:
              number: 3000
  - host: api.neuraforge.dev
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: api-service
            port:
              number: 4000
```

## CI/CD Pipeline

### GitHub Actions Workflow

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Bun
        uses: oven-sh/setup-bun@v1
        
      - name: Install dependencies
        run: bun install
        
      - name: Run tests
        run: bun run test
        
      - name: Run linting
        run: bun run lint
        
      - name: Type check
        run: bun run type-check

  build:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      
      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3
        
      - name: Login to Container Registry
        uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}
          
      - name: Build and push API image
        uses: docker/build-push-action@v5
        with:
          context: .
          file: apps/api/Dockerfile
          push: true
          tags: ghcr.io/${{ github.repository }}/api:latest
          
      - name: Build and push Web image
        uses: docker/build-push-action@v5
        with:
          context: .
          file: apps/web/Dockerfile
          push: true
          tags: ghcr.io/${{ github.repository }}/web:latest

  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      
      - name: Deploy to Kubernetes
        uses: azure/k8s-deploy@v1
        with:
          manifests: |
            k8s/namespace.yaml
            k8s/configmap.yaml
            k8s/secrets.yaml
            k8s/postgres.yaml
            k8s/redis.yaml
            k8s/api.yaml
            k8s/web.yaml
            k8s/ingress.yaml
          kubeconfig: ${{ secrets.KUBE_CONFIG }}
```

## Cloud Provider Deployments

### AWS Deployment

**Using AWS ECS with Fargate:**

```yaml
# aws/task-definition.json
{
  "family": "neuraforge-api",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "512",
  "memory": "1024",
  "executionRoleArn": "arn:aws:iam::account:role/ecsTaskExecutionRole",
  "taskRoleArn": "arn:aws:iam::account:role/ecsTaskRole",
  "containerDefinitions": [
    {
      "name": "api",
      "image": "your-account.dkr.ecr.region.amazonaws.com/neuraforge-api:latest",
      "portMappings": [
        {
          "containerPort": 4000,
          "protocol": "tcp"
        }
      ],
      "environment": [
        {
          "name": "NODE_ENV",
          "value": "production"
        }
      ],
      "secrets": [
        {
          "name": "DATABASE_URL",
          "valueFrom": "arn:aws:secretsmanager:region:account:secret:neuraforge/database-url"
        }
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/neuraforge-api",
          "awslogs-region": "us-east-1",
          "awslogs-stream-prefix": "ecs"
        }
      }
    }
  ]
}
```

### Google Cloud Platform

**Using Cloud Run:**

```yaml
# gcp/cloudrun.yaml
apiVersion: serving.knative.dev/v1
kind: Service
metadata:
  name: neuraforge-api
  annotations:
    run.googleapis.com/ingress: all
spec:
  template:
    metadata:
      annotations:
        autoscaling.knative.dev/maxScale: "10"
        run.googleapis.com/cpu-throttling: "false"
    spec:
      containerConcurrency: 100
      containers:
      - image: gcr.io/project-id/neuraforge-api:latest
        ports:
        - containerPort: 4000
        env:
        - name: NODE_ENV
          value: production
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: database-url
              key: url
        resources:
          limits:
            cpu: "1"
            memory: "1Gi"
```

## Monitoring and Observability

### Health Checks

```typescript
// apps/api/src/routes/health.ts
export const healthRoutes = async (fastify: FastifyInstance) => {
  fastify.get('/health', async (request, reply) => {
    const health = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      version: process.env.npm_package_version,
      checks: {
        database: await checkDatabase(),
        redis: await checkRedis(),
        memory: checkMemory(),
        disk: await checkDisk()
      }
    };
    
    const isHealthy = Object.values(health.checks).every(check => check.status === 'healthy');
    
    return reply
      .code(isHealthy ? 200 : 503)
      .send(health);
  });
};
```

### Logging Configuration

```typescript
// Structured logging with Pino
const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  formatters: {
    level: (label) => ({ level: label }),
  },
  timestamp: pino.stdTimeFunctions.isoTime,
  ...(process.env.NODE_ENV === 'production' && {
    redact: ['req.headers.authorization', 'password', 'token']
  })
});
```

### Metrics Collection

```typescript
// Prometheus metrics
import client from 'prom-client';

const httpRequestDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code']
});

const activeConnections = new client.Gauge({
  name: 'websocket_active_connections',
  help: 'Number of active WebSocket connections'
});
```

## Security Considerations

### SSL/TLS Configuration

```bash
# Generate SSL certificates with Let's Encrypt
certbot certonly --webroot \
  -w /var/www/html \
  -d neuraforge.dev \
  -d api.neuraforge.dev \
  --email admin@neuraforge.dev \
  --agree-tos \
  --non-interactive
```

### Security Headers

```typescript
// Security middleware
fastify.register(helmet, {
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "wss:", "https:"],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
});
```

### Environment Security

```bash
# Secure environment variables
export DATABASE_URL=$(aws secretsmanager get-secret-value \
  --secret-id neuraforge/database-url \
  --query SecretString --output text)

export JWT_SECRET=$(openssl rand -base64 32)
```

This deployment guide provides comprehensive coverage for deploying NeuraForge OS across different environments and cloud providers with proper security, monitoring, and scalability considerations.
