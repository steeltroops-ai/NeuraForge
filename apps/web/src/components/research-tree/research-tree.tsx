'use client'

import { useEffect, useRef } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { GitBranch, Plus } from 'lucide-react'

interface ResearchTreeProps {
  projectId: string
}

export function ResearchTree({ projectId }: ResearchTreeProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  // Mock data - in real app this would come from API
  const branches = [
    {
      id: '1',
      name: 'Main Research',
      hypothesis: 'AI systems can be made more ethical through transparency',
      status: 'active',
      x: 100,
      y: 100,
    },
    {
      id: '2',
      name: 'Transparency Study',
      hypothesis: 'Explainable AI improves trust in medical diagnosis',
      status: 'active',
      x: 300,
      y: 80,
      parentId: '1',
    },
    {
      id: '3',
      name: 'Bias Detection',
      hypothesis: 'Automated bias detection can identify unfair outcomes',
      status: 'active',
      x: 300,
      y: 120,
      parentId: '1',
    },
  ]

  useEffect(() => {
    if (!svgRef.current) return

    const svg = svgRef.current
    const width = svg.clientWidth
    const height = svg.clientHeight

    // Clear previous content
    svg.innerHTML = ''

    // Create SVG group
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g')
    svg.appendChild(g)

    // Draw connections
    branches.forEach(branch => {
      if (branch.parentId) {
        const parent = branches.find(b => b.id === branch.parentId)
        if (parent) {
          const line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
          line.setAttribute('x1', parent.x.toString())
          line.setAttribute('y1', parent.y.toString())
          line.setAttribute('x2', branch.x.toString())
          line.setAttribute('y2', branch.y.toString())
          line.setAttribute('stroke', '#e5e7eb')
          line.setAttribute('stroke-width', '2')
          g.appendChild(line)
        }
      }
    })

    // Draw nodes
    branches.forEach(branch => {
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
      circle.setAttribute('cx', branch.x.toString())
      circle.setAttribute('cy', branch.y.toString())
      circle.setAttribute('r', '8')
      circle.setAttribute('fill', branch.status === 'active' ? '#10b981' : '#6b7280')
      circle.setAttribute('stroke', '#fff')
      circle.setAttribute('stroke-width', '2')
      circle.style.cursor = 'pointer'
      g.appendChild(circle)

      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text')
      text.setAttribute('x', (branch.x + 15).toString())
      text.setAttribute('y', (branch.y + 5).toString())
      text.setAttribute('font-size', '12')
      text.setAttribute('fill', '#374151')
      text.textContent = branch.name
      text.style.cursor = 'pointer'
      g.appendChild(text)
    })
  }, [branches])

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-2">
          <GitBranch className="h-5 w-5 text-primary-600" />
          <h2 className="text-lg font-semibold">Research Tree</h2>
        </div>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          New Branch
        </Button>
      </div>
      
      <div className="flex-1 relative">
        <svg
          ref={svgRef}
          className="w-full h-full"
          style={{ minHeight: '400px' }}
        />
        
        {branches.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Card className="w-80">
              <CardHeader className="text-center">
                <GitBranch className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <CardTitle>No Research Branches</CardTitle>
                <CardDescription>
                  Start by creating your first research branch to explore different hypotheses.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create First Branch
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}