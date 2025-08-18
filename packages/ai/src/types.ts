// AI types and interfaces

export interface AIProvider {
  generateSuggestions(context: string): Promise<string[]>
  validateHypothesis(hypothesis: string): Promise<ValidationResult>
  discoverLiterature(query: string): Promise<LiteratureResult[]>
}

export interface ValidationResult {
  isValid: boolean
  confidence: number
  reasoning: string
  suggestions: string[]
}

export interface LiteratureResult {
  title: string
  authors: string[]
  abstract: string
  url?: string
  relevanceScore: number
}