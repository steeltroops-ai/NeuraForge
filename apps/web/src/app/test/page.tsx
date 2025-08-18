'use client'

import React from 'react'
import { FuturisticButton } from '@/components/ui/futuristic-button'
import { NeuralCard, CardContent, CardTitle, CardDescription } from '@/components/ui/neural-card'
import { Cpu, Stars, ArrowRight } from 'lucide-react'

export default function TestPage() {
  return (
    <div className="min-h-screen bg-surface-background p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-white mb-8">Component Test Page</h1>
        
        {/* Button Tests */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Futuristic Buttons</h2>
          <div className="flex flex-wrap gap-4">
            <FuturisticButton variant="neural" size="md">
              Neural Button
            </FuturisticButton>
            
            <FuturisticButton variant="quantum" size="md" leftIcon={<Cpu className="h-4 w-4" />}>
              Quantum Button
            </FuturisticButton>
            
            <FuturisticButton variant="glass" size="md" rightIcon={<ArrowRight className="h-4 w-4" />}>
              Glass Button
            </FuturisticButton>
            
            <FuturisticButton variant="ghost" size="md">
              Ghost Button
            </FuturisticButton>
            
            <FuturisticButton variant="outline" size="md" glowEffect>
              Outline Button
            </FuturisticButton>
          </div>
        </div>

        {/* Card Tests */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Neural Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <NeuralCard variant="neural" interactive>
              <CardContent>
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-neural-500 rounded-lg">
                  <Cpu className="h-6 w-6 text-white" />
                </div>
                <CardTitle level={3}>Neural Card</CardTitle>
                <CardDescription>
                  This is a neural-themed card with interactive hover effects.
                </CardDescription>
              </CardContent>
            </NeuralCard>

            <NeuralCard variant="quantum" interactive>
              <CardContent>
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-quantum-500 rounded-lg">
                  <Stars className="h-6 w-6 text-white" />
                </div>
                <CardTitle level={3}>Quantum Card</CardTitle>
                <CardDescription>
                  This is a quantum-themed card with processing aesthetics.
                </CardDescription>
              </CardContent>
            </NeuralCard>

            <NeuralCard variant="glass" interactive glowEffect>
              <CardContent>
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-processing-500 rounded-lg">
                  <ArrowRight className="h-6 w-6 text-white" />
                </div>
                <CardTitle level={3}>Glass Card</CardTitle>
                <CardDescription>
                  This is a glassmorphism card with glow effects.
                </CardDescription>
              </CardContent>
            </NeuralCard>
          </div>
        </div>
      </div>
    </div>
  )
}