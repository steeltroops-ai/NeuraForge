export interface User {
  id: string
  email: string
  name: string
  createdAt: string
  updatedAt: string
}

export interface Project {
  id: string
  title: string
  description?: string
  domain?: string
  status: ProjectStatus
  visibility: Visibility
  createdAt: string
  updatedAt: string
  createdById: string
  collaborators: ProjectCollaborator[]
  branches: ResearchBranch[]
}

export interface ResearchBranch {
  id: string
  branchName: string
  hypothesis?: string
  methodology?: string
  status: BranchStatus
  createdAt: string
  projectId: string
  parentBranchId?: string
  childBranches?: ResearchBranch[]
}

export interface ProjectCollaborator {
  id: string
  role: Role
  projectId: string
  userId: string
  user: User
  createdAt: string
  updatedAt: string
}

export type ProjectStatus = 'ACTIVE' | 'ARCHIVED' | 'COMPLETED'
export type BranchStatus = 'ACTIVE' | 'MERGED' | 'ABANDONED'
export type Visibility = 'PUBLIC' | 'PRIVATE' | 'RESTRICTED'
export type Role = 'OWNER' | 'EDITOR' | 'VIEWER'