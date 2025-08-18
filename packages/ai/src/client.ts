// AI client implementation
import type { AIProvider, ValidationResult, LiteratureResult } from './types'

export class MockAIProvider implements AIProvider {
  async generateSuggestions(context: string): Promise<string[]> {
    // Mock implementation
    return [
      'Consider exploring related research in quantum computing',
      'Investigate potential applications in machine learning',
      'Review recent publications in this domain'
    ]
  }

  async validateHypothesis(hypothesis: string): Promise<ValidationResult> {
    // Mock implementation
    return {
      isValid: true,
      confidence: 0.85,
      reasoning: 'The hypothesis appears to be well-founded based on current research trends.',
      suggestions: [
        'Consider adding more specific metrics',
        'Include control group considerations'
      ]
    }
  }

  async discoverLiterature(query: string): Promise<LiteratureResult[]> {
    // Mock implementation
    return [
      {
        title: 'Recent Advances in Research Methodology',
        authors: ['Dr. Jane Smith', 'Prof. John Doe'],
        abstract: 'This paper explores new methodologies in research...',
        url: 'https://example.com/paper1',
        relevanceScore: 0.92
      }
    ]
  }
}

export const aiProvider = new MockAIProvider()