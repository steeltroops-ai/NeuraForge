import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types for research platform
export interface ResearchProject {
  id: string
  title: string
  description: string
  status: 'draft' | 'active' | 'completed' | 'archived'
  created_by: string
  created_at: string
  updated_at: string
  collaborators: string[]
  tags: string[]
  research_tree: any // JSON structure for hypothesis evolution
}

export interface UserProfile {
  id: string
  clerk_user_id: string
  email: string
  name: string
  role: 'researcher' | 'admin' | 'collaborator'
  institution?: string
  expertise_areas: string[]
  created_at: string
  updated_at: string
}

export interface Collaboration {
  id: string
  project_id: string
  user_id: string
  role: 'owner' | 'collaborator' | 'viewer'
  permissions: string[]
  joined_at: string
}

// Research project operations
export const researchProjectService = {
  async createProject(project: Omit<ResearchProject, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('research_projects')
      .insert([project])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async getProjectsByUser(userId: string) {
    const { data, error } = await supabase
      .from('research_projects')
      .select('*')
      .eq('created_by', userId)
      .order('updated_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  async updateProject(id: string, updates: Partial<ResearchProject>) {
    const { data, error } = await supabase
      .from('research_projects')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async deleteProject(id: string) {
    const { error } = await supabase
      .from('research_projects')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}

// User profile operations
export const userProfileService = {
  async createProfile(profile: Omit<UserProfile, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('user_profiles')
      .insert([profile])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async getProfileByClerkId(clerkUserId: string) {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('clerk_user_id', clerkUserId)
      .single()
    
    if (error && error.code !== 'PGRST116') throw error
    return data
  },

  async updateProfile(clerkUserId: string, updates: Partial<UserProfile>) {
    const { data, error } = await supabase
      .from('user_profiles')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('clerk_user_id', clerkUserId)
      .select()
      .single()
    
    if (error) throw error
    return data
  }
}

// Collaboration operations
export const collaborationService = {
  async addCollaborator(collaboration: Omit<Collaboration, 'id' | 'joined_at'>) {
    const { data, error } = await supabase
      .from('collaborations')
      .insert([{ ...collaboration, joined_at: new Date().toISOString() }])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async getProjectCollaborators(projectId: string) {
    const { data, error } = await supabase
      .from('collaborations')
      .select(`
        *,
        user_profiles (
          name,
          email,
          institution,
          expertise_areas
        )
      `)
      .eq('project_id', projectId)
    
    if (error) throw error
    return data
  },

  async removeCollaborator(projectId: string, userId: string) {
    const { error } = await supabase
      .from('collaborations')
      .delete()
      .eq('project_id', projectId)
      .eq('user_id', userId)
    
    if (error) throw error
  }
}
