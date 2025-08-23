'use client'

import { useState } from 'react'
import { Search, Bell, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface TopNavigationProps {}

export function TopNavigation({}: TopNavigationProps) {
  const [searchFocused, setSearchFocused] = useState(false)
  const [notificationCount] = useState(3)

  return (
    <header className="h-16 px-4 flex items-center justify-between bg-white border-b border-gray-200">
      {/* Center Section - Global Search */}
      <div className="flex-1 max-w-2xl mx-auto">
        <div className={`relative transition-all duration-300 ${searchFocused ? 'scale-[1.02]' : ''}`}>
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Semantic search across projects, papers, datasets..."
            className={`
              w-full pl-10 pr-4 py-2
              bg-gray-100
              border border-gray-200
              rounded-lg text-sm
              focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
              placeholder-gray-500
              text-gray-900
              transition-all duration-300
              ${searchFocused ? 'shadow-lg bg-white' : 'shadow-sm'}
            `}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
          {searchFocused && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-50">
              <div className="p-4">
                <div className="text-sm text-gray-600 mb-2 font-medium">Recent searches</div>
                <div className="space-y-2">
                  <div className="text-sm text-gray-800 hover:bg-gray-100 p-2 rounded cursor-pointer transition-colors duration-200">
                    machine learning optimization
                  </div>
                  <div className="text-sm text-gray-800 hover:bg-gray-100 p-2 rounded cursor-pointer transition-colors duration-200">
                    climate change datasets
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2">
        {/* Notifications */}
        <Button
          variant="ghost"
          size="sm"
          className="p-2 hover:bg-gray-100 text-gray-600 hover:text-gray-900 relative transition-colors duration-200"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
          {notificationCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
              {notificationCount}
            </span>
          )}
        </Button>

        {/* Settings */}
        <Button
          variant="ghost"
          size="sm"
          className="p-2 hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-colors duration-200"
          aria-label="Settings"
        >
          <Settings className="h-5 w-5" />
        </Button>
      </div>
    </header>
  )
}
