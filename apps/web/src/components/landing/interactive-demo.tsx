'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/design-system-button'
import { Play, GitBranch, Users2, Zap, TrendingUp } from 'lucide-react'

export function InteractiveDemo() {
  const [activeDemo, setActiveDemo] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const demos = [
    {
      title: "Research Tree Visualization",
      description: "Watch how hypotheses evolve and branch into breakthrough discoveries",
      icon: GitBranch,
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "AI Discovery Engine",
      description: "See how AI identifies patterns and suggests novel research directions",
      icon: Zap,
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Collaborative Workspaces",
      description: "Experience real-time research collaboration across global teams",
      icon: Users2,
      color: "from-green-500 to-green-600"
    },
    {
      title: "Impact Analytics",
      description: "Track research progress and measure breakthrough potential",
      icon: TrendingUp,
      color: "from-orange-500 to-orange-600"
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setActiveDemo((prev) => (prev + 1) % demos.length)
        setIsAnimating(false)
      }, 400)
    }, 5000) // Increased to 5 seconds for better user experience

    return () => clearInterval(interval)
  }, [demos.length])

  const currentDemo = demos[activeDemo]
  const IconComponent = currentDemo.icon

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="mb-4 text-3xl sm:text-4xl font-bold text-gray-900">
            See NeuraForge in Action
          </h2>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-gray-600">
            Experience the future of research collaboration through our interactive platform demonstrations
          </p>
        </div>

        <div className="grid gap-8 lg:gap-12 lg:grid-cols-2 items-center">
          {/* Left Content */}
          <div className="order-2 lg:order-1">
            <div className="space-y-6">
              {demos.map((demo, index) => {
                const DemoIcon = demo.icon
                const isActive = index === activeDemo
                
                return (
                  <div
                    key={index}
                    className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-[1.02] ${
                      isActive
                        ? 'border-purple-300 bg-gradient-to-br from-purple-50 to-purple-100 shadow-lg scale-[1.02]'
                        : 'border-gray-200 bg-white hover:border-purple-200 hover:shadow-lg hover:bg-gradient-to-br hover:from-gray-50 hover:to-white'
                    }`}
                    onClick={() => {
                      setIsAnimating(true)
                      setTimeout(() => {
                        setActiveDemo(index)
                        setIsAnimating(false)
                      }, 200)
                    }}
                    onMouseEnter={() => {
                      if (!isActive) {
                        // Add subtle hover effect
                      }
                    }}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-lg bg-gradient-to-br ${demo.color}`}>
                        <DemoIcon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className={`text-lg font-semibold mb-2 ${
                          isActive ? 'text-purple-900' : 'text-gray-900'
                        }`}>
                          {demo.title}
                        </h3>
                        <p className={`text-sm ${
                          isActive ? 'text-purple-700' : 'text-gray-600'
                        }`}>
                          {demo.description}
                        </p>
                      </div>
                      {isActive && (
                        <div className="flex-shrink-0">
                          <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse" />
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mt-8">
              <Button 
                variant="accent" 
                size="lg"
                leftIcon={<Play className="w-5 h-5" />}
                className="w-full sm:w-auto"
              >
                Try Interactive Demo
              </Button>
            </div>
          </div>

          {/* Right Content - Demo Visualization */}
          <div className="order-1 lg:order-2">
            <div className="relative">
              <div className={`bg-white rounded-2xl shadow-xl border border-gray-200 p-8 transition-all duration-500 transform ${
                isAnimating ? 'scale-95 opacity-75 rotate-1' : 'scale-100 opacity-100 rotate-0'
              } hover:shadow-2xl hover:scale-[1.02]`}>
                {/* Demo Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${currentDemo.color}`}>
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900">
                      {currentDemo.title}
                    </h4>
                  </div>
                  <div className="flex space-x-1">
                    <div className="w-3 h-3 bg-red-400 rounded-full" />
                    <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                    <div className="w-3 h-3 bg-green-400 rounded-full" />
                  </div>
                </div>

                {/* Demo Content */}
                <div className="space-y-4">
                  {/* Animated Network Visualization */}
                  <div className="relative h-48 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg overflow-hidden group">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="grid grid-cols-3 gap-4 w-full max-w-xs">
                        {[...Array(9)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-8 h-8 rounded-full bg-gradient-to-br ${currentDemo.color} animate-pulse transform transition-transform duration-300 hover:scale-110`}
                            style={{
                              animationDelay: `${i * 0.2}s`,
                              animationDuration: '2s'
                            }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Floating particles for enhanced visual appeal */}
                    <div className="absolute top-4 right-4 w-2 h-2 bg-purple-400 rounded-full animate-bounce opacity-60"
                         style={{ animationDelay: '0.5s' }} />
                    <div className="absolute bottom-6 left-6 w-1.5 h-1.5 bg-blue-400 rounded-full animate-ping opacity-40"
                         style={{ animationDelay: '1s' }} />
                    <div className="absolute top-1/2 right-8 w-1 h-1 bg-green-400 rounded-full animate-pulse opacity-50"
                         style={{ animationDelay: '1.5s' }} />
                    
                    {/* Connecting Lines */}
                    <svg className="absolute inset-0 w-full h-full">
                      {[...Array(6)].map((_, i) => (
                        <line
                          key={i}
                          x1={`${20 + (i % 3) * 30}%`}
                          y1={`${30 + Math.floor(i / 3) * 40}%`}
                          x2={`${50 + (i % 2) * 20}%`}
                          y2={`${50 + (i % 2) * 20}%`}
                          stroke="currentColor"
                          strokeWidth="2"
                          className="text-purple-300 animate-pulse"
                          style={{
                            animationDelay: `${i * 0.3}s`,
                            animationDuration: '3s'
                          }}
                        />
                      ))}
                    </svg>
                  </div>

                  {/* Demo Stats */}
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer group">
                      <div className="text-lg font-bold text-purple-600 group-hover:scale-110 transition-transform duration-200">127</div>
                      <div className="text-xs text-gray-600">Active Projects</div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer group">
                      <div className="text-lg font-bold text-purple-600 group-hover:scale-110 transition-transform duration-200">89%</div>
                      <div className="text-xs text-gray-600">Success Rate</div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer group">
                      <div className="text-lg font-bold text-purple-600 group-hover:scale-110 transition-transform duration-200">2.3x</div>
                      <div className="text-xs text-gray-600">Faster Discovery</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-purple-500 rounded-full animate-bounce" />
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-blue-500 rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
