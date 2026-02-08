# 🤝 Contributing to NeuraForge OS

Welcome to NeuraForge OS! We're excited to have you contribute to the future of AI-native research collaboration. This guide will help you get started and ensure your contributions align with our project standards.

## 🎯 Project Vision

NeuraForge OS aims to transform isolated research efforts into a connected, collaborative ecosystem powered by AI. We're building a platform where researchers can:

- Collaborate in real-time across institutions
- Leverage AI for hypothesis generation and validation
- Manage research with version control like software development
- Discover connections across research domains

## 🚀 Getting Started

### Prerequisites

Before contributing, ensure you have:

- **Node.js 18+** and **Bun 1.0+** installed
- **Git** for version control
- **PostgreSQL 14+** for database (Docker recommended)
- **VS Code** with recommended extensions (optional but recommended)

### Development Setup

1. **Fork and Clone**
   ```bash
   git clone https://github.com/your-username/neuraforge-os.git
   cd neuraforge-os
   ```

2. **Install Dependencies**
   ```bash
   bun install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   # Edit .env with your local configuration
   ```

4. **Database Setup**
   ```bash
   # Start PostgreSQL with Docker
   docker run --name neuraforge-postgres \
     -e POSTGRES_DB=neuraforge_dev \
     -e POSTGRES_USER=neuraforge \
     -e POSTGRES_PASSWORD=password \
     -p 5432:5432 -d postgres:14

   # Run migrations
   cd packages/database
   bun run db:migrate
   bun run db:seed
   ```

5. **Start Development Servers**
   ```bash
   bun run dev
   ```

6. **Verify Setup**
   - Frontend: http://localhost:3005
   - Backend: http://localhost:4000
   - Login with: `demo@neuraforge.dev` / `demo123`

## 📋 How to Contribute

### 1. Choose Your Contribution Type

**🐛 Bug Fixes**
- Check existing issues first
- Create a bug report if none exists
- Include reproduction steps and environment details

**✨ New Features**
- Discuss in GitHub Discussions first
- Create a feature request issue
- Wait for approval before starting development

**📚 Documentation**
- Improve existing docs
- Add missing documentation
- Fix typos and clarify instructions

**🧪 Testing**
- Add missing test coverage
- Improve test quality
- Add E2E test scenarios

### 2. Development Workflow

**Branch Naming Convention**
```bash
# Feature branches
feature/user-authentication
feature/real-time-collaboration

# Bug fix branches
fix/login-validation-error
fix/memory-leak-in-websocket

# Documentation branches
docs/api-documentation
docs/contributing-guide

# Chore branches
chore/update-dependencies
chore/improve-build-process
```

**Commit Message Format**
```bash
type(scope): description

# Examples:
feat(auth): add JWT refresh token mechanism
fix(ui): resolve button hover state issue
docs(api): update authentication endpoints
test(projects): add integration tests for CRUD operations
chore(deps): update React to v18.2.0
```

**Commit Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### 3. Pull Request Process

**Before Creating a PR:**
1. Ensure your branch is up to date with main
2. Run all tests and linting
3. Update documentation if needed
4. Add/update tests for your changes

**PR Requirements:**
- [ ] Clear, descriptive title
- [ ] Detailed description of changes
- [ ] Link to related issue(s)
- [ ] Screenshots for UI changes
- [ ] Tests pass locally
- [ ] No linting errors
- [ ] Documentation updated

**PR Template:**
```markdown
## Description
Brief description of what this PR does.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Refactoring
- [ ] Performance improvement

## Related Issues
Fixes #123
Related to #456

## Testing
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] E2E tests added/updated
- [ ] Manual testing completed

## Screenshots (if applicable)
[Add screenshots for UI changes]

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] Tests added/updated
- [ ] No breaking changes (or documented)
```

## 🏗️ Code Standards

### TypeScript Guidelines

```typescript
// ✅ Good: Explicit types and interfaces
interface CreateProjectData {
  title: string
  description?: string
  domain: string
  visibility: 'PUBLIC' | 'PRIVATE' | 'RESTRICTED'
}

const createProject = async (data: CreateProjectData): Promise<Project> => {
  // Implementation
}

// ❌ Bad: Any types and unclear interfaces
const createProject = async (data: any): Promise<any> => {
  // Implementation
}
```

### React Component Guidelines

```tsx
// ✅ Good: Functional component with proper typing
interface ProjectCardProps {
  project: Project
  onEdit: (projectId: string) => void
  onDelete: (projectId: string) => void
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  project, 
  onEdit, 
  onDelete 
}) => {
  const handleEdit = useCallback(() => {
    onEdit(project.id)
  }, [project.id, onEdit])

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle>{project.title}</CardTitle>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button onClick={handleEdit}>Edit</Button>
        <Button variant="destructive" onClick={() => onDelete(project.id)}>
          Delete
        </Button>
      </CardFooter>
    </Card>
  )
}
```

### CSS/Styling Guidelines

```tsx
// ✅ Good: Tailwind classes with semantic meaning
<div className="flex items-center justify-between p-6 bg-white rounded-lg shadow-sm border border-gray-200">
  <h2 className="text-xl font-semibold text-gray-900">Project Title</h2>
  <Button variant="primary" size="sm">Edit</Button>
</div>

// ❌ Bad: Arbitrary values and unclear styling
<div className="flex items-center justify-between p-[24px] bg-[#ffffff] rounded-[8px]">
  <h2 className="text-[20px] font-[600] text-[#111111]">Project Title</h2>
</div>
```

### API Design Guidelines

```typescript
// ✅ Good: RESTful design with proper error handling
export const projectRoutes = async (fastify: FastifyInstance) => {
  fastify.get('/projects', {
    schema: {
      querystring: GetProjectsQuerySchema,
      response: {
        200: GetProjectsResponseSchema
      }
    },
    preHandler: [authMiddleware]
  }, async (request, reply) => {
    try {
      const { page = 1, limit = 10, domain } = request.query
      const projects = await projectService.getProjects(request.user.id, {
        page,
        limit,
        domain
      })
      
      return reply.send({
        projects,
        pagination: {
          page,
          limit,
          total: projects.length
        }
      })
    } catch (error) {
      return reply.code(500).send({
        error: 'Internal server error',
        message: error.message
      })
    }
  })
}
```

## 🧪 Testing Requirements

### Test Coverage Expectations

- **Unit Tests**: 80%+ coverage for business logic
- **Integration Tests**: All API endpoints
- **E2E Tests**: Critical user journeys
- **Component Tests**: All UI components

### Writing Good Tests

```typescript
// ✅ Good: Descriptive test with proper setup/teardown
describe('ProjectService', () => {
  let projectService: ProjectService
  let mockRepository: jest.Mocked<ProjectRepository>

  beforeEach(() => {
    mockRepository = createMockRepository()
    projectService = new ProjectService(mockRepository)
  })

  describe('createProject', () => {
    it('should create project with valid data', async () => {
      // Arrange
      const projectData = {
        title: 'Test Project',
        description: 'Test Description',
        domain: 'Computer Science'
      }
      const expectedProject = { id: '123', ...projectData }
      mockRepository.save.mockResolvedValue(expectedProject)

      // Act
      const result = await projectService.createProject('user-123', projectData)

      // Assert
      expect(result).toEqual(expectedProject)
      expect(mockRepository.save).toHaveBeenCalledWith(
        expect.objectContaining(projectData)
      )
    })

    it('should throw error for invalid data', async () => {
      // Arrange
      const invalidData = { title: '' } // Invalid: empty title

      // Act & Assert
      await expect(
        projectService.createProject('user-123', invalidData)
      ).rejects.toThrow('Title is required')
    })
  })
})
```

### Running Tests

```bash
# Run all tests
bun run test

# Run tests with coverage
bun run test:coverage

# Run specific test file
bun run test ProjectService.test.ts

# Run E2E tests
bun run test:e2e

# Run tests in watch mode
bun run test:watch
```

## 📝 Documentation Standards

### Code Documentation

```typescript
/**
 * Creates a new research project with the specified data.
 * 
 * @param userId - The ID of the user creating the project
 * @param data - The project creation data
 * @returns Promise resolving to the created project
 * @throws {ValidationError} When project data is invalid
 * @throws {UnauthorizedError} When user lacks permissions
 * 
 * @example
 * ```typescript
 * const project = await createProject('user-123', {
 *   title: 'AI Research Project',
 *   description: 'Exploring neural networks',
 *   domain: 'Computer Science'
 * })
 * ```
 */
export async function createProject(
  userId: string, 
  data: CreateProjectData
): Promise<Project> {
  // Implementation
}
```

### README Updates

When adding new features, update relevant README sections:

- Installation instructions
- Usage examples
- API documentation
- Configuration options

## 🔍 Code Review Process

### As a Contributor

**Before Requesting Review:**
- [ ] Self-review your code
- [ ] Test thoroughly
- [ ] Update documentation
- [ ] Ensure CI passes

**During Review:**
- Respond to feedback promptly
- Ask questions if unclear
- Make requested changes
- Re-request review after changes

### As a Reviewer

**Review Checklist:**
- [ ] Code follows project standards
- [ ] Tests are comprehensive
- [ ] Documentation is updated
- [ ] No security vulnerabilities
- [ ] Performance considerations addressed
- [ ] Accessibility requirements met

**Review Guidelines:**
- Be constructive and specific
- Explain the "why" behind suggestions
- Approve when ready, request changes when needed
- Use GitHub's suggestion feature for small fixes

## 🚨 Issue Reporting

### Bug Reports

Use the bug report template and include:

- **Environment**: OS, browser, Node.js version
- **Steps to Reproduce**: Clear, numbered steps
- **Expected Behavior**: What should happen
- **Actual Behavior**: What actually happens
- **Screenshots**: If applicable
- **Additional Context**: Any other relevant information

### Feature Requests

Use the feature request template and include:

- **Problem Statement**: What problem does this solve?
- **Proposed Solution**: How should it work?
- **Alternatives Considered**: Other approaches considered
- **Additional Context**: Use cases, examples, mockups

## 🎉 Recognition

Contributors are recognized in:

- **README Contributors Section**: All contributors listed
- **Release Notes**: Major contributions highlighted
- **GitHub Discussions**: Community shoutouts
- **LinkedIn Posts**: Public recognition for significant contributions

## 📞 Getting Help

**Stuck? Need Help?**

- **GitHub Discussions**: Ask questions and discuss ideas
- **Discord Community**: Real-time chat with maintainers
- **Office Hours**: Weekly video calls with core team
- **Documentation**: Check existing docs first
- **Issues**: Search existing issues before creating new ones

**Maintainer Contact:**
- **Technical Questions**: Create GitHub Discussion
- **Security Issues**: Email security@neuraforge.dev
- **General Inquiries**: Email hello@neuraforge.dev

## 📜 Code of Conduct

We are committed to providing a welcoming and inclusive environment. Please read our [Code of Conduct](CODE_OF_CONDUCT.md) before contributing.

**Key Principles:**
- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on constructive feedback
- Assume positive intent
- Report inappropriate behavior

## 🎯 Contribution Ideas

**Good First Issues:**
- Fix typos in documentation
- Add missing TypeScript types
- Improve error messages
- Add unit tests for existing functions
- Update outdated dependencies

**Intermediate Contributions:**
- Implement new UI components
- Add API endpoints
- Improve performance
- Add integration tests
- Enhance accessibility

**Advanced Contributions:**
- Design new features
- Optimize database queries
- Implement real-time features
- Add AI/ML capabilities
- Improve security measures

Thank you for contributing to NeuraForge OS! Together, we're building the future of research collaboration. 🚀
