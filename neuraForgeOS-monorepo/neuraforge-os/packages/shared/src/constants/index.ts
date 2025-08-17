export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    REFRESH: '/auth/refresh',
    PROFILE: '/auth/profile',
    LOGOUT: '/auth/logout',
  },
  PROJECTS: {
    LIST: '/projects',
    CREATE: '/projects',
    GET: (id: string) => `/projects/${id}`,
    UPDATE: (id: string) => `/projects/${id}`,
    DELETE: (id: string) => `/projects/${id}`,
  },
  BRANCHES: {
    CREATE: (projectId: string) => `/projects/${projectId}/branches`,
    GET: (projectId: string, branchId: string) => `/projects/${projectId}/branches/${branchId}`,
    MERGE: (projectId: string, branchId: string) => `/projects/${projectId}/branches/${branchId}/merge`,
  },
  AI: {
    SUGGESTIONS: '/ai/suggestions',
    VALIDATE_HYPOTHESIS: '/ai/validate-hypothesis',
    LITERATURE_DISCOVERY: '/ai/literature-discovery',
  },
} as const

export const PROJECT_STATUS = {
  ACTIVE: 'ACTIVE',
  ARCHIVED: 'ARCHIVED',
  COMPLETED: 'COMPLETED',
} as const

export const BRANCH_STATUS = {
  ACTIVE: 'ACTIVE',
  MERGED: 'MERGED',
  ABANDONED: 'ABANDONED',
} as const

export const VISIBILITY = {
  PUBLIC: 'PUBLIC',
  PRIVATE: 'PRIVATE',
  RESTRICTED: 'RESTRICTED',
} as const

export const ROLE = {
  OWNER: 'OWNER',
  EDITOR: 'EDITOR',
  VIEWER: 'VIEWER',
} as const