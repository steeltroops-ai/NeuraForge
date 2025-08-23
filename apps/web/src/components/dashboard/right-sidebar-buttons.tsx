'use client'

import { useState } from 'react'
import {
  MessageCircle,
  Users,
  Bell,
  Zap,
  FolderOpen
} from 'lucide-react'

interface RightSidebarButtonsProps {
  onSectionChange: (section: string | null) => void
  activeSection: string | null
}

export function RightSidebarButtons({ onSectionChange, activeSection }: RightSidebarButtonsProps) {
  const buttons = [
    {
      id: 'ai',
      label: 'AI Assistant',
      icon: MessageCircle,
      description: 'Get AI-powered research insights'
    },
    {
      id: 'collaborators',
      label: 'Team',
      icon: Users,
      description: 'Manage collaborators and permissions'
    },
    {
      id: 'notifications',
      label: 'Updates',
      icon: Bell,
      description: 'View recent notifications'
    },
    {
      id: 'actions',
      label: 'Quick Actions',
      icon: Zap,
      description: 'Access frequently used tools'
    },
    {
      id: 'context',
      label: 'Research Context',
      icon: FolderOpen,
      description: 'Browse project files and data'
    }
  ]

  const handleButtonClick = (buttonId: string) => {
    if (activeSection === buttonId) {
      // Close sidebar if same button clicked
      onSectionChange(null)
    } else {
      // Open sidebar with new section
      onSectionChange(buttonId)
    }
  }

  return (
    <div className="fixed right-0 z-40 flex flex-col p-2 space-y-2 transform -translate-y-1/2 top-1/2">
      {buttons.map((button, index) => {
        const Icon = button.icon
        const isActive = activeSection === button.id
        
        return (
          <div
            key={button.id}
            className="relative group"
            style={{
              // Distribute buttons evenly across available height
              marginTop: index === 0 ? '0' : '1rem'
            }}
          >
            <button
              onClick={() => handleButtonClick(button.id)}
              className={`
                flex flex-col items-center justify-center
                w-14 h-14 rounded-l-xl border-l-4 transition-all duration-300
                ${isActive 
                  ? 'bg-purple-600 border-purple-600 text-white shadow-lg scale-105' 
                  : 'bg-white border-gray-300 text-gray-600 hover:bg-purple-50 hover:border-purple-400 hover:text-purple-600 shadow-md hover:shadow-lg'
                }
                focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
              `}
              aria-label={`${button.label}: ${button.description}`}
              title={button.label}
            >
              <Icon className="w-5 h-5 mb-1" />
              <span className="text-xs font-medium leading-tight text-center">
                {button.label.split(' ').map((word, i) => (
                  <div key={i}>{word}</div>
                ))}
              </span>
            </button>

            {/* Tooltip on hover */}
            <div className="absolute transition-opacity duration-200 transform -translate-y-1/2 opacity-0 pointer-events-none right-16 top-1/2 group-hover:opacity-100">
              <div className="px-3 py-2 text-sm text-white bg-gray-900 rounded-lg shadow-lg whitespace-nowrap">
                {button.description}
                <div className="absolute w-0 h-0 transform -translate-y-1/2 border-t-4 border-b-4 border-l-4 left-full top-1/2 border-l-gray-900 border-t-transparent border-b-transparent"></div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
