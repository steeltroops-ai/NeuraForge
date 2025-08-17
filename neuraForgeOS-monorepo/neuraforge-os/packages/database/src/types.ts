// Database types and interfaces

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
  visibility: 'PUBLIC' | 'PRIVATE' | 'RESTRICTED'
  ownerId: string
  createdAt: string
  updatedAt: string
}

export interface Branch {
  id: string
  name: string
  projectId: string
  parentBranchId?: string
  status: 'ACTIVE' | 'MERGED' | 'ABANDONED'
  createdAt: string
  updatedAt: string
}