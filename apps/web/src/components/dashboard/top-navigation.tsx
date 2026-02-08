'use client'

import { useState, useRef, useEffect } from 'react'
import { Search, Bell, Settings, Clock, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/design-system-button'

interface TopNavigationProps { }

interface SearchSuggestion {
  id: string
  text: string
  type: 'recent' | 'suggestion'
  category?: string
}

export function TopNavigation({ }: TopNavigationProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchFocused, setSearchFocused] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const [notificationCount] = useState(3)
  const [selectedIndex, setSelectedIndex] = useState(-1)

  const searchInputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Mock data - in real app, this would come from API/state
  const recentSearches: SearchSuggestion[] = [
    { id: '1', text: 'machine learning optimization', type: 'recent' },
    { id: '2', text: 'climate change datasets', type: 'recent' },
    { id: '3', text: 'neural network architectures', type: 'recent' }
  ]

  const suggestions: SearchSuggestion[] = [
    { id: '4', text: 'transformer models', type: 'suggestion', category: 'Papers' },
    { id: '5', text: 'protein folding research', type: 'suggestion', category: 'Projects' },
    { id: '6', text: 'quantum computing datasets', type: 'suggestion', category: 'Datasets' }
  ]

  const allItems = searchQuery.length > 0 ? suggestions : recentSearches
  const hasItems = allItems.length > 0

  // Keyboard shortcut (Cmd+K / Ctrl+K) to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        searchInputRef.current?.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Click outside detection to close dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        searchInputRef.current &&
        !searchInputRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false)
        setSearchFocused(false)
      }
    }

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showDropdown])

  // Handle search input focus
  const handleFocus = () => {
    setSearchFocused(true)
    setShowDropdown(true)
    setSelectedIndex(-1)
  }

  // Handle search input blur (with delay to allow click events)
  const handleBlur = () => {
    // Delay to allow click events on dropdown items
    setTimeout(() => {
      setSearchFocused(false)
    }, 200)
  }

  // Handle keyboard navigation in dropdown
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showDropdown || !hasItems) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex(prev => (prev < allItems.length - 1 ? prev + 1 : prev))
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : -1))
        break
      case 'Enter':
        e.preventDefault()
        if (selectedIndex >= 0 && selectedIndex < allItems.length) {
          handleSelectItem(allItems[selectedIndex])
        } else if (searchQuery.trim()) {
          handleSubmitSearch()
        }
        break
      case 'Escape':
        e.preventDefault()
        setShowDropdown(false)
        setSearchFocused(false)
        searchInputRef.current?.blur()
        break
    }
  }

  // Handle selecting a search item
  const handleSelectItem = (item: SearchSuggestion) => {
    setSearchQuery(item.text)
    setShowDropdown(false)
    setSearchFocused(false)
    // In real app, trigger search with this query
    console.log('Selected search:', item.text)
  }

  // Handle search submission
  const handleSubmitSearch = () => {
    if (searchQuery.trim()) {
      setShowDropdown(false)
      setSearchFocused(false)
      // In real app, trigger search
      console.log('Submitting search:', searchQuery)
    }
  }

  return (
    <header className="h-16 px-4 flex items-center justify-between bg-[var(--color-background)] border-b border-[var(--color-border-subtle)]">
      {/* Center Section - Global Search */}
      <div className="flex-1 max-w-2xl mx-auto">
        <div className={`relative transition-all duration-300 ${searchFocused ? 'scale-[1.02]' : ''}`}>
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-[var(--color-text-tertiary)]" />
          </div>
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Semantic search across projects, papers, datasets... (⌘K)"
            className={`
              w-full pl-10 pr-4 py-2
              bg-[var(--color-surface)]
              border border-[var(--color-border-subtle)]
              rounded-lg text-sm
              focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)] focus:border-transparent
              placeholder-[var(--color-text-tertiary)]
              text-[var(--color-text-primary)]
              transition-all
              ${searchFocused ? 'shadow-lg bg-[var(--color-background)]' : 'shadow-sm'}
            `}
            style={{ transitionDuration: 'var(--duration-normal)' }}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            aria-label="Global search"
            aria-expanded={showDropdown}
            aria-controls="search-dropdown"
            aria-activedescendant={selectedIndex >= 0 ? `search-item-${selectedIndex}` : undefined}
            role="combobox"
            aria-autocomplete="list"
          />

          {/* Search Autocomplete Dropdown */}
          {showDropdown && hasItems && (
            <div
              ref={dropdownRef}
              id="search-dropdown"
              role="listbox"
              className="absolute top-full left-0 right-0 mt-2 bg-[var(--color-background)] border border-[var(--color-border-subtle)] rounded-lg z-50 overflow-hidden"
              style={{ boxShadow: 'var(--shadow-lg)' }}
            >
              <div className="py-2">
                {/* Section Header */}
                <div className="px-4 py-2 text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider flex items-center gap-2">
                  {searchQuery.length > 0 ? (
                    <>
                      <TrendingUp className="h-3 w-3" />
                      Suggestions
                    </>
                  ) : (
                    <>
                      <Clock className="h-3 w-3" />
                      Recent Searches
                    </>
                  )}
                </div>

                {/* Search Items */}
                <div className="max-h-80 overflow-y-auto">
                  {allItems.map((item, index) => (
                    <div
                      key={item.id}
                      id={`search-item-${index}`}
                      role="option"
                      aria-selected={selectedIndex === index}
                      className={`
                        px-4 py-2.5 cursor-pointer transition-colors
                        flex items-center justify-between gap-3
                        ${selectedIndex === index
                          ? 'bg-[var(--color-primary-50)] text-[var(--color-primary-900)]'
                          : 'text-[var(--color-text-primary)] hover:bg-[var(--color-surface)]'
                        }
                      `}
                      style={{ transitionDuration: 'var(--duration-fast)' }}
                      onClick={() => handleSelectItem(item)}
                      onMouseEnter={() => setSelectedIndex(index)}
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        {item.type === 'recent' ? (
                          <Clock className="h-4 w-4 text-[var(--color-text-tertiary)] flex-shrink-0" />
                        ) : (
                          <Search className="h-4 w-4 text-[var(--color-text-tertiary)] flex-shrink-0" />
                        )}
                        <span className="text-sm truncate">{item.text}</span>
                      </div>
                      {item.category && (
                        <span className="text-xs text-[var(--color-text-secondary)] bg-[var(--color-surface-elevated)] px-2 py-0.5 rounded flex-shrink-0">
                          {item.category}
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                {/* Footer hint */}
                <div className="px-4 py-2 border-t border-[var(--color-border-subtle)] text-xs text-[var(--color-text-secondary)] flex items-center justify-between">
                  <span>Press Enter to search</span>
                  <span className="text-[var(--color-text-tertiary)]">ESC to close</span>
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
          className="p-2 hover:bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] relative transition-colors"
          style={{ transitionDuration: 'var(--duration-fast)' }}
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
          {notificationCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-[var(--color-primary-600)] text-[var(--color-text-inverse)] text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
              {notificationCount}
            </span>
          )}
        </Button>

        {/* Settings */}
        <Button
          variant="ghost"
          size="sm"
          className="p-2 hover:bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
          style={{ transitionDuration: 'var(--duration-fast)' }}
          aria-label="Settings"
        >
          <Settings className="h-5 w-5" />
        </Button>
      </div>
    </header>
  )
}
