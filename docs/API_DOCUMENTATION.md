# 🚀 NeuraForge OS API Documentation

## Overview

The NeuraForge OS API is built with Fastify and provides a comprehensive set of endpoints for research collaboration, authentication, and AI-powered features. The API follows RESTful principles and includes real-time capabilities via Socket.io.

## Base URL

- **Development**: `http://localhost:4000`
- **Production**: `https://api.neuraforge.dev`

## Authentication

All protected endpoints require a Bearer token in the Authorization header:

```
Authorization: Bearer <access_token>
```

## API Endpoints

### 🔐 Authentication Endpoints

#### POST /auth/register
Register a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "name": "John Doe"
}
```

**Response (201):**
```json
{
  "user": {
    "id": "user_1234567890",
    "email": "user@example.com",
    "name": "John Doe",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Responses:**
- `400` - Missing required fields or user already exists
- `422` - Invalid email format or weak password

#### POST /auth/login
Authenticate an existing user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response (200):**
```json
{
  "user": {
    "id": "user_1234567890",
    "email": "user@example.com",
    "name": "John Doe",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Responses:**
- `400` - Missing email or password
- `401` - Invalid credentials

#### GET /auth/profile
Get current user profile (requires authentication).

**Response (200):**
```json
{
  "id": "user_1234567890",
  "email": "user@example.com",
  "name": "John Doe",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

**Error Responses:**
- `401` - Invalid or expired token

#### POST /auth/refresh
Refresh access token using refresh token.

**Request Body:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response (200):**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### POST /auth/logout
Logout and invalidate tokens (requires authentication).

**Response (200):**
```json
{
  "message": "Logged out successfully"
}
```

### 📊 Research Projects Endpoints

#### GET /projects
Get list of user's research projects (requires authentication).

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `domain` (optional): Filter by research domain
- `status` (optional): Filter by project status

**Response (200):**
```json
{
  "projects": [
    {
      "id": "proj_1234567890",
      "title": "AI-Powered Drug Discovery",
      "description": "Research project exploring machine learning applications in pharmaceutical research",
      "domain": "Biotechnology",
      "status": "ACTIVE",
      "visibility": "PUBLIC",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z",
      "createdBy": {
        "id": "user_1234567890",
        "name": "John Doe",
        "email": "user@example.com"
      },
      "collaborators": [
        {
          "id": "user_0987654321",
          "name": "Jane Smith",
          "role": "EDITOR"
        }
      ]
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "totalPages": 3
  }
}
```

#### POST /projects
Create a new research project (requires authentication).

**Request Body:**
```json
{
  "title": "AI-Powered Drug Discovery",
  "description": "Research project exploring machine learning applications in pharmaceutical research",
  "domain": "Biotechnology",
  "visibility": "PUBLIC"
}
```

**Response (201):**
```json
{
  "id": "proj_1234567890",
  "title": "AI-Powered Drug Discovery",
  "description": "Research project exploring machine learning applications in pharmaceutical research",
  "domain": "Biotechnology",
  "status": "ACTIVE",
  "visibility": "PUBLIC",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z",
  "createdBy": {
    "id": "user_1234567890",
    "name": "John Doe",
    "email": "user@example.com"
  }
}
```

#### GET /projects/:id
Get specific project details (requires authentication and access permissions).

**Response (200):**
```json
{
  "id": "proj_1234567890",
  "title": "AI-Powered Drug Discovery",
  "description": "Research project exploring machine learning applications in pharmaceutical research",
  "domain": "Biotechnology",
  "status": "ACTIVE",
  "visibility": "PUBLIC",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z",
  "createdBy": {
    "id": "user_1234567890",
    "name": "John Doe",
    "email": "user@example.com"
  },
  "collaborators": [
    {
      "id": "user_0987654321",
      "name": "Jane Smith",
      "role": "EDITOR",
      "joinedAt": "2024-01-02T00:00:00.000Z"
    }
  ],
  "branches": [
    {
      "id": "branch_1234567890",
      "name": "main",
      "status": "ACTIVE",
      "createdAt": "2024-01-01T00:00:00.000Z"
    },
    {
      "id": "branch_0987654321",
      "name": "hypothesis-testing",
      "status": "ACTIVE",
      "parentBranchId": "branch_1234567890",
      "createdAt": "2024-01-03T00:00:00.000Z"
    }
  ]
}
```

#### PUT /projects/:id
Update project details (requires authentication and owner/editor permissions).

**Request Body:**
```json
{
  "title": "Updated Project Title",
  "description": "Updated description",
  "domain": "Biotechnology",
  "visibility": "PRIVATE"
}
```

**Response (200):**
```json
{
  "id": "proj_1234567890",
  "title": "Updated Project Title",
  "description": "Updated description",
  "domain": "Biotechnology",
  "status": "ACTIVE",
  "visibility": "PRIVATE",
  "updatedAt": "2024-01-05T00:00:00.000Z"
}
```

#### DELETE /projects/:id
Delete a project (requires authentication and owner permissions).

**Response (204):** No content

### 🌿 Research Branches Endpoints

#### POST /projects/:projectId/branches
Create a new research branch (requires authentication and editor permissions).

**Request Body:**
```json
{
  "name": "hypothesis-testing",
  "parentBranchId": "branch_1234567890",
  "description": "Testing new hypothesis about protein folding"
}
```

**Response (201):**
```json
{
  "id": "branch_0987654321",
  "name": "hypothesis-testing",
  "projectId": "proj_1234567890",
  "parentBranchId": "branch_1234567890",
  "status": "ACTIVE",
  "description": "Testing new hypothesis about protein folding",
  "createdAt": "2024-01-03T00:00:00.000Z",
  "updatedAt": "2024-01-03T00:00:00.000Z"
}
```

#### GET /projects/:projectId/branches/:branchId
Get branch details and content (requires authentication and access permissions).

**Response (200):**
```json
{
  "id": "branch_0987654321",
  "name": "hypothesis-testing",
  "projectId": "proj_1234567890",
  "parentBranchId": "branch_1234567890",
  "status": "ACTIVE",
  "description": "Testing new hypothesis about protein folding",
  "createdAt": "2024-01-03T00:00:00.000Z",
  "updatedAt": "2024-01-03T00:00:00.000Z",
  "content": {
    "hypothesis": "Protein folding can be predicted using transformer models",
    "experiments": [
      {
        "id": "exp_1234567890",
        "title": "Initial Model Training",
        "status": "COMPLETED",
        "results": "Achieved 85% accuracy on validation set"
      }
    ],
    "notes": "Initial results are promising, need to test on larger dataset"
  }
}
```

#### POST /projects/:projectId/branches/:branchId/merge
Merge branch back to parent (requires authentication and editor permissions).

**Request Body:**
```json
{
  "targetBranchId": "branch_1234567890",
  "mergeMessage": "Merge hypothesis-testing branch with successful results"
}
```

**Response (200):**
```json
{
  "mergeId": "merge_1234567890",
  "sourceBranchId": "branch_0987654321",
  "targetBranchId": "branch_1234567890",
  "status": "COMPLETED",
  "mergeMessage": "Merge hypothesis-testing branch with successful results",
  "mergedAt": "2024-01-10T00:00:00.000Z"
}
```

### 🤖 AI-Powered Features Endpoints

#### POST /ai/suggestions
Get AI-powered research suggestions (requires authentication).

**Request Body:**
```json
{
  "projectId": "proj_1234567890",
  "context": "We are studying protein folding using machine learning",
  "type": "HYPOTHESIS" // or "EXPERIMENT", "LITERATURE", "METHODOLOGY"
}
```

**Response (200):**
```json
{
  "suggestions": [
    {
      "id": "sugg_1234567890",
      "type": "HYPOTHESIS",
      "title": "Transformer-based Protein Structure Prediction",
      "description": "Consider using attention mechanisms to model long-range dependencies in protein sequences",
      "confidence": 0.87,
      "reasoning": "Recent advances in transformer architectures have shown promising results in sequence modeling tasks",
      "references": [
        {
          "title": "Attention Is All You Need",
          "authors": ["Vaswani et al."],
          "year": 2017,
          "doi": "10.48550/arXiv.1706.03762"
        }
      ]
    }
  ],
  "generatedAt": "2024-01-05T00:00:00.000Z"
}
```

#### POST /ai/validate-hypothesis
Validate research hypothesis using AI analysis (requires authentication).

**Request Body:**
```json
{
  "hypothesis": "Protein folding can be predicted using transformer models with 90% accuracy",
  "domain": "Biotechnology",
  "context": "Previous work has achieved 85% accuracy using CNNs"
}
```

**Response (200):**
```json
{
  "validation": {
    "feasibility": 0.78,
    "novelty": 0.65,
    "impact": 0.82,
    "overall": 0.75
  },
  "analysis": {
    "strengths": [
      "Transformer models excel at capturing long-range dependencies",
      "Recent advances in protein language models show promise"
    ],
    "challenges": [
      "90% accuracy target may be optimistic given current state-of-art",
      "Computational requirements for large protein sequences"
    ],
    "recommendations": [
      "Start with smaller protein families to validate approach",
      "Consider hybrid CNN-Transformer architecture"
    ]
  },
  "relatedWork": [
    {
      "title": "ProtTrans: Towards Cracking the Language of Life",
      "relevance": 0.92,
      "summary": "Demonstrates effectiveness of transformer models for protein analysis"
    }
  ]
}
```

#### POST /ai/literature-discovery
Discover relevant literature using AI-powered search (requires authentication).

**Request Body:**
```json
{
  "query": "transformer models protein folding prediction",
  "domain": "Biotechnology",
  "limit": 10,
  "yearRange": {
    "start": 2020,
    "end": 2024
  }
}
```

**Response (200):**
```json
{
  "papers": [
    {
      "id": "paper_1234567890",
      "title": "ProtTrans: Towards Cracking the Language of Life",
      "authors": ["Elnaggar et al."],
      "year": 2021,
      "journal": "IEEE/ACM Transactions on Computational Biology and Bioinformatics",
      "doi": "10.1109/TCBB.2021.3095381",
      "abstract": "We introduce ProtTrans, a comprehensive study of protein language models...",
      "relevanceScore": 0.95,
      "citationCount": 234,
      "tags": ["protein", "transformer", "language-model", "bioinformatics"]
    }
  ],
  "totalResults": 156,
  "searchTime": 0.234,
  "generatedAt": "2024-01-05T00:00:00.000Z"
}
```

## Error Handling

All API endpoints follow consistent error response format:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input parameters",
    "details": {
      "field": "email",
      "reason": "Invalid email format"
    }
  },
  "timestamp": "2024-01-05T00:00:00.000Z",
  "path": "/auth/register"
}
```

### Common Error Codes

- `VALIDATION_ERROR` (400) - Invalid input data
- `UNAUTHORIZED` (401) - Missing or invalid authentication
- `FORBIDDEN` (403) - Insufficient permissions
- `NOT_FOUND` (404) - Resource not found
- `CONFLICT` (409) - Resource already exists
- `RATE_LIMITED` (429) - Too many requests
- `INTERNAL_ERROR` (500) - Server error

## Rate Limiting

API endpoints are rate-limited to ensure fair usage:

- **Authentication endpoints**: 5 requests per minute per IP
- **General endpoints**: 100 requests per minute per user
- **AI endpoints**: 10 requests per minute per user

Rate limit headers are included in responses:

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1641024000
```

## Real-time Features (Socket.io)

The API includes real-time capabilities for collaborative features:

### Connection

```javascript
const socket = io('http://localhost:4000', {
  auth: {
    token: 'your-access-token'
  }
});
```

### Events

#### join-project
Join a project room for real-time updates.

```javascript
socket.emit('join-project', { projectId: 'proj_1234567890' });
```

#### project-update
Receive real-time project updates.

```javascript
socket.on('project-update', (data) => {
  console.log('Project updated:', data);
});
```

#### collaboration-cursor
Share cursor position for real-time collaboration.

```javascript
socket.emit('collaboration-cursor', {
  projectId: 'proj_1234567890',
  position: { x: 100, y: 200 },
  user: { id: 'user_1234567890', name: 'John Doe' }
});
```

## Demo Credentials

For testing purposes, use these demo credentials:

- **Email**: `demo@neuraforge.dev`
- **Password**: `demo123`

## Real-time Collaboration Features

### WebSocket Events

#### project-join
Join a project room for real-time collaboration.

```javascript
socket.emit('project-join', {
  projectId: 'proj_1234567890',
  branchId: 'branch_1234567890'
});
```

#### project-leave
Leave a project room.

```javascript
socket.emit('project-leave', {
  projectId: 'proj_1234567890'
});
```

#### cursor-update
Share cursor position for real-time collaboration.

```javascript
socket.emit('cursor-update', {
  projectId: 'proj_1234567890',
  branchId: 'branch_1234567890',
  position: { x: 100, y: 200 },
  selection: { start: 10, end: 20 }
});

// Receive cursor updates from other users
socket.on('cursor-update', (data) => {
  const { userId, position, selection, user } = data;
  updateCollaboratorCursor(userId, position, selection, user);
});
```

#### content-change
Real-time content synchronization.

```javascript
socket.emit('content-change', {
  projectId: 'proj_1234567890',
  branchId: 'branch_1234567890',
  operation: {
    type: 'insert',
    position: 100,
    content: 'New hypothesis: ',
    timestamp: Date.now()
  }
});

// Receive content changes
socket.on('content-change', (data) => {
  const { operation, userId, user } = data;
  applyOperation(operation, userId, user);
});
```

#### user-presence
Track active users in a project.

```javascript
// Receive presence updates
socket.on('user-presence', (data) => {
  const { users, action, user } = data;
  if (action === 'join') {
    addActiveUser(user);
  } else if (action === 'leave') {
    removeActiveUser(user.id);
  }
});
```

## SDK and Client Libraries

Official SDKs are available for:

- **JavaScript/TypeScript**: `@neuraforge/sdk-js`
- **Python**: `neuraforge-sdk`
- **R**: `neuraforge`

Example usage:

```javascript
import { NeuraForgeClient } from '@neuraforge/sdk-js';

const client = new NeuraForgeClient({
  apiUrl: 'http://localhost:4000',
  accessToken: 'your-access-token'
});

const projects = await client.projects.list();
```
