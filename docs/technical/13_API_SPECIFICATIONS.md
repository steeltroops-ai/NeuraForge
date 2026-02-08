# NeuraForge API Specifications

## **Executive Summary**

This document provides comprehensive REST API specifications for NeuraForge, following OpenAPI 3.0 standards. The API is designed to support web applications, mobile clients, and third-party integrations with consistent authentication, error handling, and rate limiting.

**API Base URL**: `https://api.neuraforge.ai/v1`  
**Authentication**: Bearer tokens via Clerk integration  
**Rate Limiting**: 1000 requests/hour for authenticated users  
**Response Format**: JSON with consistent error structure

---

## **AUTHENTICATION & AUTHORIZATION**

### **Authentication Flow**

```yaml
openapi: 3.0.3
info:
  title: NeuraForge API
  version: 1.0.0
  description: AI-Native Research Collaboration Platform API

servers:
  - url: https://api.neuraforge.ai/v1
    description: Production server
  - url: https://staging-api.neuraforge.ai/v1
    description: Staging server

security:
  - BearerAuth: []

components:
  securitySchemes:
    BearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT
      description: JWT token from Clerk authentication
```

### **Authentication Endpoints**

**POST /auth/token**
```yaml
/auth/token:
  post:
    summary: Exchange Clerk session for API token
    requestBody:
      required: true
      content:
        application/json:
          schema:
            type: object
            properties:
              clerk_session_token:
                type: string
                description: Clerk session token
            required:
              - clerk_session_token
    responses:
      '200':
        description: API token generated successfully
        content:
          application/json:
            schema:
              type: object
              properties:
                access_token:
                  type: string
                  description: JWT access token
                expires_in:
                  type: integer
                  description: Token expiration in seconds
                refresh_token:
                  type: string
                  description: Refresh token for renewal
```

**POST /auth/refresh**
```yaml
/auth/refresh:
  post:
    summary: Refresh expired access token
    requestBody:
      required: true
      content:
        application/json:
          schema:
            type: object
            properties:
              refresh_token:
                type: string
            required:
              - refresh_token
    responses:
      '200':
        description: Token refreshed successfully
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/TokenResponse'
```

---

## **USER MANAGEMENT API**

### **User Profile Operations**

**GET /users/me**
```yaml
/users/me:
  get:
    summary: Get current user profile
    security:
      - BearerAuth: []
    responses:
      '200':
        description: User profile retrieved successfully
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/UserProfile'
      '401':
        $ref: '#/components/responses/Unauthorized'
```

**PUT /users/me**
```yaml
/users/me:
  put:
    summary: Update current user profile
    security:
      - BearerAuth: []
    requestBody:
      required: true
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/UserProfileUpdate'
    responses:
      '200':
        description: Profile updated successfully
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/UserProfile'
      '400':
        $ref: '#/components/responses/BadRequest'
```

### **User Schema Definitions**

```yaml
components:
  schemas:
    UserProfile:
      type: object
      properties:
        id:
          type: string
          format: uuid
          description: Unique user identifier
        email:
          type: string
          format: email
          description: User email address
        name:
          type: string
          description: Full name
        avatar_url:
          type: string
          format: uri
          description: Profile picture URL
        research_interests:
          type: array
          items:
            type: string
          description: List of research domains
        institution:
          $ref: '#/components/schemas/Institution'
        orcid_id:
          type: string
          description: ORCID identifier
        created_at:
          type: string
          format: date-time
        updated_at:
          type: string
          format: date-time
      required:
        - id
        - email
        - name
        - created_at
        - updated_at

    Institution:
      type: object
      properties:
        id:
          type: string
          format: uuid
        name:
          type: string
        type:
          type: string
          enum: [university, company, government, nonprofit]
        country:
          type: string
          description: ISO 3166-1 alpha-2 country code
```

---

## **PROJECT MANAGEMENT API**

### **Project CRUD Operations**

**GET /projects**
```yaml
/projects:
  get:
    summary: List user's projects
    security:
      - BearerAuth: []
    parameters:
      - name: page
        in: query
        schema:
          type: integer
          default: 1
      - name: limit
        in: query
        schema:
          type: integer
          default: 20
          maximum: 100
      - name: status
        in: query
        schema:
          type: string
          enum: [active, completed, archived]
    responses:
      '200':
        description: Projects retrieved successfully
        content:
          application/json:
            schema:
              type: object
              properties:
                projects:
                  type: array
                  items:
                    $ref: '#/components/schemas/Project'
                pagination:
                  $ref: '#/components/schemas/Pagination'
```

**POST /projects**
```yaml
/projects:
  post:
    summary: Create new research project
    security:
      - BearerAuth: []
    requestBody:
      required: true
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ProjectCreate'
    responses:
      '201':
        description: Project created successfully
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/Project'
      '400':
        $ref: '#/components/responses/BadRequest'
```

### **Project Schema Definitions**

```yaml
components:
  schemas:
    Project:
      type: object
      properties:
        id:
          type: string
          format: uuid
        name:
          type: string
          maxLength: 200
        description:
          type: string
          maxLength: 2000
        status:
          type: string
          enum: [active, completed, archived]
        visibility:
          type: string
          enum: [private, internal, public]
        owner_id:
          type: string
          format: uuid
        members:
          type: array
          items:
            $ref: '#/components/schemas/ProjectMember'
        research_tree:
          $ref: '#/components/schemas/ResearchTree'
        created_at:
          type: string
          format: date-time
        updated_at:
          type: string
          format: date-time
      required:
        - id
        - name
        - status
        - owner_id
        - created_at
        - updated_at

    ProjectMember:
      type: object
      properties:
        user_id:
          type: string
          format: uuid
        role:
          type: string
          enum: [owner, admin, collaborator, viewer]
        permissions:
          type: array
          items:
            type: string
            enum: [read, write, admin, invite]
        joined_at:
          type: string
          format: date-time
```

---

## **AI ASSISTANT API**

### **AI Interaction Endpoints**

**POST /ai/chat**
```yaml
/ai/chat:
  post:
    summary: Chat with AI research assistant
    security:
      - BearerAuth: []
    requestBody:
      required: true
      content:
        application/json:
          schema:
            type: object
            properties:
              message:
                type: string
                maxLength: 4000
                description: User message to AI assistant
              context:
                $ref: '#/components/schemas/ResearchContext'
              agent_id:
                type: string
                format: uuid
                description: Specific AI agent to use
            required:
              - message
    responses:
      '200':
        description: AI response generated successfully
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/AIResponse'
      '429':
        $ref: '#/components/responses/RateLimited'
```

**POST /ai/literature-review**
```yaml
/ai/literature-review:
  post:
    summary: Generate AI-powered literature review
    security:
      - BearerAuth: []
    requestBody:
      required: true
      content:
        application/json:
          schema:
            type: object
            properties:
              query:
                type: string
                maxLength: 500
                description: Research query for literature review
              parameters:
                type: object
                properties:
                  max_papers:
                    type: integer
                    default: 50
                    maximum: 200
                  date_range:
                    type: object
                    properties:
                      start_year:
                        type: integer
                      end_year:
                        type: integer
                  domains:
                    type: array
                    items:
                      type: string
            required:
              - query
    responses:
      '200':
        description: Literature review generated successfully
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/LiteratureReview'
```

### **AI Response Schema**

```yaml
components:
  schemas:
    AIResponse:
      type: object
      properties:
        id:
          type: string
          format: uuid
        message:
          type: string
          description: AI assistant response
        confidence:
          type: number
          format: float
          minimum: 0
          maximum: 1
          description: Confidence score for the response
        citations:
          type: array
          items:
            $ref: '#/components/schemas/Citation'
        suggestions:
          type: array
          items:
            type: string
          description: Follow-up suggestions
        usage:
          type: object
          properties:
            tokens_used:
              type: integer
            cost:
              type: number
              format: float
        created_at:
          type: string
          format: date-time

    LiteratureReview:
      type: object
      properties:
        id:
          type: string
          format: uuid
        query:
          type: string
        summary:
          type: string
          description: Executive summary of findings
        key_findings:
          type: array
          items:
            type: string
        research_gaps:
          type: array
          items:
            type: string
        papers:
          type: array
          items:
            $ref: '#/components/schemas/Paper'
        methodology_analysis:
          type: string
        recommendations:
          type: array
          items:
            type: string
        created_at:
          type: string
          format: date-time
```

---

## **COLLABORATION API**

### **Real-Time Collaboration**

**WebSocket Connection: /ws/collaboration/{project_id}**

**Connection Authentication:**
```javascript
// WebSocket connection with JWT token
const ws = new WebSocket('wss://api.neuraforge.ai/v1/ws/collaboration/project-123', {
  headers: {
    'Authorization': 'Bearer <jwt_token>'
  }
});
```

**Message Types:**
```yaml
CollaborationMessage:
  type: object
  properties:
    type:
      type: string
      enum: [join, leave, edit, cursor, chat, presence]
    payload:
      oneOf:
        - $ref: '#/components/schemas/EditOperation'
        - $ref: '#/components/schemas/CursorPosition'
        - $ref: '#/components/schemas/ChatMessage'
    timestamp:
      type: string
      format: date-time
    user_id:
      type: string
      format: uuid

EditOperation:
  type: object
  properties:
    document_id:
      type: string
      format: uuid
    operation:
      type: string
      enum: [insert, delete, retain]
    position:
      type: integer
    content:
      type: string
    attributes:
      type: object
```

### **Document Management**

**GET /projects/{project_id}/documents**
```yaml
/projects/{project_id}/documents:
  get:
    summary: List project documents
    security:
      - BearerAuth: []
    parameters:
      - name: project_id
        in: path
        required: true
        schema:
          type: string
          format: uuid
    responses:
      '200':
        description: Documents retrieved successfully
        content:
          application/json:
            schema:
              type: array
              items:
                $ref: '#/components/schemas/Document'
```

---

## **ERROR HANDLING**

### **Standard Error Response**

```yaml
components:
  responses:
    BadRequest:
      description: Bad request
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
    
    Unauthorized:
      description: Unauthorized
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
    
    Forbidden:
      description: Forbidden
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
    
    NotFound:
      description: Resource not found
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
    
    RateLimited:
      description: Rate limit exceeded
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
      headers:
        X-RateLimit-Limit:
          schema:
            type: integer
          description: Request limit per hour
        X-RateLimit-Remaining:
          schema:
            type: integer
          description: Remaining requests in current window
        X-RateLimit-Reset:
          schema:
            type: integer
          description: Time when rate limit resets (Unix timestamp)

  schemas:
    Error:
      type: object
      properties:
        error:
          type: object
          properties:
            code:
              type: string
              description: Error code for programmatic handling
            message:
              type: string
              description: Human-readable error message
            details:
              type: object
              description: Additional error context
            request_id:
              type: string
              description: Unique request identifier for debugging
      required:
        - error
```

### **Error Codes**

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `INVALID_REQUEST` | 400 | Request validation failed |
| `UNAUTHORIZED` | 401 | Authentication required |
| `FORBIDDEN` | 403 | Insufficient permissions |
| `NOT_FOUND` | 404 | Resource not found |
| `CONFLICT` | 409 | Resource conflict |
| `RATE_LIMITED` | 429 | Rate limit exceeded |
| `INTERNAL_ERROR` | 500 | Internal server error |
| `SERVICE_UNAVAILABLE` | 503 | Service temporarily unavailable |

---

## **RATE LIMITING**

### **Rate Limit Policies**

| Endpoint Category | Authenticated | Anonymous |
|-------------------|---------------|-----------|
| Authentication | 10/min | 5/min |
| User Management | 100/hour | N/A |
| Projects | 1000/hour | N/A |
| AI Assistant | 100/hour | N/A |
| Collaboration | 10000/hour | N/A |
| File Upload | 50/hour | N/A |

### **Rate Limit Headers**

All API responses include rate limiting headers:
- `X-RateLimit-Limit`: Maximum requests allowed
- `X-RateLimit-Remaining`: Remaining requests in current window
- `X-RateLimit-Reset`: Time when rate limit resets

---

## **PAGINATION**

### **Standard Pagination**

```yaml
components:
  schemas:
    Pagination:
      type: object
      properties:
        page:
          type: integer
          description: Current page number
        limit:
          type: integer
          description: Items per page
        total:
          type: integer
          description: Total number of items
        total_pages:
          type: integer
          description: Total number of pages
        has_next:
          type: boolean
          description: Whether there are more pages
        has_prev:
          type: boolean
          description: Whether there are previous pages
```

### **Cursor-Based Pagination**

For real-time data and large datasets:
```yaml
CursorPagination:
  type: object
  properties:
    cursor:
      type: string
      description: Cursor for next page
    has_more:
      type: boolean
      description: Whether there are more items
    limit:
      type: integer
      description: Items per page
```

This API specification provides a comprehensive foundation for all client integrations, ensuring consistent behavior, proper error handling, and scalable performance across all NeuraForge features.
