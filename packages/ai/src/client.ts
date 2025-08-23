// AI client implementation
import type { AIProvider, ValidationResult, LiteratureResult } from './types'

export class MockAIProvider implements AIProvider {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async generateSuggestions(_context: string): Promise<string[]> {
    // Mock implementation - context parameter will be used in real implementation
    return [
      'Consider exploring related research in quantum computing',
      'Investigate potential applications in machine learning',
      'Review recent publications in this domain'
    ]
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async validateHypothesis(_hypothesis: string): Promise<ValidationResult> {
    // Mock implementation - hypothesis parameter will be used in real implementation
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async discoverLiterature(_query: string): Promise<LiteratureResult[]> {
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