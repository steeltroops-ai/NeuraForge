import { useAuthStore } from './auth-store'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  password: string
  name: string
}

export interface AuthResponse {
  user: {
    id: string
    email: string
    name: string
    createdAt: string
    updatedAt: string
  }
  accessToken: string
  refreshToken: string
}

export interface RefreshTokenResponse {
  accessToken: string
}

class AuthService {
  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`
    
    console.log(`🌐 Making request to: ${url}`)
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    }

    // Add auth token if available and not a login/register request
    if (!endpoint.includes('/auth/login') && !endpoint.includes('/auth/register')) {
      const { accessToken } = useAuthStore.getState()
      if (accessToken) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${accessToken}`,
        }
        console.log('🔑 Added auth token to request')
      }
    }

    try {
      console.log('📤 Request config:', { 
        method: config.method || 'GET', 
        headers: config.headers,
        body: config.body ? 'Present' : 'None'
      })

      const response = await fetch(url, config)
      
      console.log(`📥 Response status: ${response.status}`)

      if (!response.ok) {
        let errorMessage = `HTTP ${response.status}`
        try {
          const errorData = await response.json()
          errorMessage = errorData.message || errorMessage
          console.error('❌ API Error:', errorData)
        } catch {
          // If JSON parsing fails, use the status text
          errorMessage = response.statusText || errorMessage
          console.error('❌ Response parsing failed, status:', response.status)
        }
        throw new Error(errorMessage)
      }

      // Handle empty responses
      const contentType = response.headers.get('content-type')
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json()
        console.log('✅ Response data received')
        return data
      } else {
        console.log('✅ Empty response received')
        return {} as T
      }
    } catch (error) {
      console.error('🚨 Request failed:', error)
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Unable to connect to server. Please check if the API server is running.')
      }
      if (error instanceof Error) {
        throw error
      }
      throw new Error('Network error occurred')
    }
  }

  async login(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      const response = await this.makeRequest<AuthResponse>('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      })

      // Store tokens and user data
      const { setUser, setTokens } = useAuthStore.getState()
      setTokens(response.accessToken, response.refreshToken)
      setUser(response.user)

      return response
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    try {
      const response = await this.makeRequest<AuthResponse>('/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData),
      })

      // Store tokens and user data
      const { setUser, setTokens } = useAuthStore.getState()
      setTokens(response.accessToken, response.refreshToken)
      setUser(response.user)

      return response
    } catch (error) {
      console.error('Register error:', error)
      throw error
    }
  }

  async refreshToken(): Promise<string> {
    try {
      const { refreshToken } = useAuthStore.getState()
      if (!refreshToken) {
        throw new Error('No refresh token available')
      }

      const response = await this.makeRequest<RefreshTokenResponse>('/auth/refresh', {
        method: 'POST',
        body: JSON.stringify({ refreshToken }),
      })

      // Update access token
      const { setTokens } = useAuthStore.getState()
      setTokens(response.accessToken, refreshToken)

      return response.accessToken
    } catch (error) {
      console.error('Token refresh error:', error)
      // Clear auth state on refresh failure
      const { clearAuth } = useAuthStore.getState()
      clearAuth()
      throw error
    }
  }

  async getProfile() {
    try {
      const user = await this.makeRequest<{
        id: string
        email: string
        name: string
        createdAt: string
        updatedAt: string
      }>('/auth/profile')

      // Update user data
      const { setUser } = useAuthStore.getState()
      setUser(user)

      return user
    } catch (error) {
      console.error('Get profile error:', error)
      throw error
    }
  }

  async logout(): Promise<void> {
    try {
      // Call logout endpoint
      await this.makeRequest<void>('/auth/logout', {
        method: 'POST',
      })
    } catch (error) {
      console.error('Logout API error:', error)
      // Continue with local logout even if API call fails
    } finally {
      // Always clear local auth state
      const { clearAuth } = useAuthStore.getState()
      clearAuth()
    }
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    const { user, accessToken } = useAuthStore.getState()
    return !!(user && accessToken)
  }

  // Get current user
  getCurrentUser() {
    const { user } = useAuthStore.getState()
    return user
  }

  // Get access token
  getAccessToken(): string | null {
    const { accessToken } = useAuthStore.getState()
    return accessToken
  }
}

export const authService = new AuthService()