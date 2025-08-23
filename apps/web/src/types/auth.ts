// Authentication Types for NeuraForge OS

export interface User {
  id: string
  email: string
  name: string
  role: string
  avatar?: string
  createdAt: string
  updatedAt: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  token: string | null
}

export interface AuthActions {
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  signUp: (email: string, password: string, name: string) => Promise<void>
  clearError: () => void
  setLoading: (loading: boolean) => void
  checkAuth: () => Promise<void>
}

export interface AuthStore extends AuthState, AuthActions {}

export interface ProfileMenuProps {
  user: User
  onSignOut: () => void
  onSettingsClick: () => void
  onReportIssueClick: () => void
  onSendFeedbackClick: () => void
  isOpen: boolean
  onToggle: () => void
}

export interface AuthError {
  code: string
  message: string
  details?: Record<string, any>
}

export interface SignInCredentials {
  email: string
  password: string
}

export interface SignUpCredentials {
  email: string
  password: string
  name: string
  confirmPassword: string
}

export interface AuthResponse {
  user: User
  token: string
  refreshToken?: string
}

export interface AuthContextType extends AuthState {
  signIn: (credentials: SignInCredentials) => Promise<void>
  signOut: () => Promise<void>
  signUp: (credentials: SignUpCredentials) => Promise<void>
  clearError: () => void
  refreshAuth: () => Promise<void>
}

// Route Protection Types
export interface ProtectedRouteProps {
  children: React.ReactNode
  redirectTo?: string
  requireAuth?: boolean
}

export interface RouteGuardProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

// Storage Keys
export const AUTH_STORAGE_KEYS = {
  TOKEN: 'neuraforge_auth_token',
  USER: 'neuraforge_user_data',
  REFRESH_TOKEN: 'neuraforge_refresh_token',
  INTENDED_DESTINATION: 'neuraforge_intended_destination'
} as const

// Auth Status Enum
export enum AuthStatus {
  IDLE = 'idle',
  LOADING = 'loading',
  AUTHENTICATED = 'authenticated',
  UNAUTHENTICATED = 'unauthenticated',
  ERROR = 'error'
}
