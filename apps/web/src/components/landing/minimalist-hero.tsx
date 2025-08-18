'use client'

import { useEffect, useRef } from 'react'
import { SignedOut, SignInButton } from '@clerk/nextjs'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/design-system-button'

// Animated sphere component
const AnimatedSphere = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * window.devicePixelRatio
      canvas.height = rect.height * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Sphere properties
    const centerX = canvas.width / (2 * window.devicePixelRatio)
    const centerY = canvas.height / (2 * window.devicePixelRatio)
    const radius = Math.min(centerX, centerY) * 0.6
    
    // Node network
    const nodes: Array<{
      x: number
      y: number
      z: number
      originalX: number
      originalY: number
      originalZ: number
    }> = []

    // Create nodes on sphere surface
    const nodeCount = 80
    for (let i = 0; i < nodeCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / nodeCount)
      const theta = Math.sqrt(nodeCount * Math.PI) * phi
      
      const x = radius * Math.cos(theta) * Math.sin(phi)
      const y = radius * Math.sin(theta) * Math.sin(phi)
      const z = radius * Math.cos(phi)
      
      nodes.push({
        x: centerX + x,
        y: centerY + y,
        z,
        originalX: x,
        originalY: y,
        originalZ: z
      })
    }

    let animationFrame: number
    let time = 0

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width / window.devicePixelRatio, canvas.height / window.devicePixelRatio)
      time += 0.01

      // Update node positions with rotation
      nodes.forEach((node, i) => {
        const rotationY = time * 0.5
        const rotationX = time * 0.3
        
        // Rotate around Y axis
        const cosY = Math.cos(rotationY)
        const sinY = Math.sin(rotationY)
        const x1 = node.originalX * cosY - node.originalZ * sinY
        const z1 = node.originalX * sinY + node.originalZ * cosY
        
        // Rotate around X axis
        const cosX = Math.cos(rotationX)
        const sinX = Math.sin(rotationX)
        const y1 = node.originalY * cosX - z1 * sinX
        const z2 = node.originalY * sinX + z1 * cosX
        
        node.x = centerX + x1
        node.y = centerY + y1
        node.z = z2
      })

      // Draw connections
      nodes.forEach((node, i) => {
        nodes.forEach((otherNode, j) => {
          if (i < j) {
            const dx = node.x - otherNode.x
            const dy = node.y - otherNode.y
            const dz = node.z - otherNode.z
            const distance = Math.sqrt(dx * dx + dy * dy + dz * dz)
            
            if (distance < radius * 0.8) {
              const opacity = Math.max(0, (radius * 0.8 - distance) / (radius * 0.8)) * 0.3
              const avgZ = (node.z + otherNode.z) / 2
              const depthOpacity = (avgZ + radius) / (2 * radius)
              
              ctx.strokeStyle = `rgba(107, 72, 255, ${opacity * depthOpacity})`
              ctx.lineWidth = 0.5
              ctx.beginPath()
              ctx.moveTo(node.x, node.y)
              ctx.lineTo(otherNode.x, otherNode.y)
              ctx.stroke()
            }
          }
        })
      })

      // Draw nodes
      nodes.forEach(node => {
        const depthOpacity = (node.z + radius) / (2 * radius)
        const size = 2 + depthOpacity * 2
        
        ctx.fillStyle = `rgba(107, 72, 255, ${depthOpacity * 0.8})`
        ctx.beginPath()
        ctx.arc(node.x, node.y, size, 0, Math.PI * 2)
        ctx.fill()
      })

      animationFrame = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationFrame)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ width: '100%', height: '100%' }}
    />
  )
}

export function MinimalistHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-white pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-8">
              Solving Humanity's
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-800">
                Hardest Problems
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed mb-12 max-w-2xl">
              NeuraForge is a decentralized research network that incentivizes humans and AI to solve 
              complex research challenges through collaborative innovation.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <SignedOut>
                <SignInButton mode="modal">
                  <Button
                    variant="primary"
                    size="xl"
                    rightIcon={<ArrowRight className="h-5 w-5" />}
                  >
                    Start Research
                  </Button>
                </SignInButton>
              </SignedOut>

              <Button
                variant="secondary"
                size="xl"
                asChild
              >
                <a href="https://discord.gg/neuraforge" target="_blank" rel="noopener noreferrer">
                  Join Community
                </a>
              </Button>
            </div>
          </div>

          {/* Right Content - Animated Sphere */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-96 h-96 relative">
              <AnimatedSphere />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
