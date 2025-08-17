'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { 
  Cpu, 
  Menu, 
  X, 
  Stars, 
  ArrowRight,
  Search,
  Bell,
  User,
  Settings,
  LogOut,
  Zap
} from 'lucide-react'
import { FuturisticButton } from '@/components/ui/futuristic-button'
import { NeuralCard, CardContent } from '@/components/ui/neural-card'

// Navigation Items
const navigationItems = [
  { 
    name: 'Research', 
    href: '/research',
    description: 'AI-powered research tools and insights',
    icon: Cpu,
  },
  { 
    name: 'Collaborate', 
    href: '/collaborate',
    description: 'Real-time collaboration workspace',
    icon: Stars,
  },
  { 
    name: 'Discover', 
    href: '/discover',
    description: 'Explore breakthrough research',
    icon: Search,
  },
  { 
    name: 'Analytics', 
    href: '/analytics',
    description: 'Research impact and metrics',
    icon: Zap,
  },
];

// Mega Menu Component
const MegaMenu = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => (
  <AnimatePresence>
    {isOpen && (
      <>
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-surface-background/80 backdrop-blur-sm z-40"
          onClick={onClose}
        />
        
        {/* Menu Content */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="absolute top-full left-0 right-0 z-50 mt-2"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <NeuralCard variant="glass" size="lg">
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {navigationItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={onClose}
                      className="group block p-4 rounded-xl hover:bg-surface-secondary transition-colors"
                    >
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="flex items-center justify-center w-10 h-10 bg-neural-500/20 rounded-lg group-hover:bg-neural-500/30 transition-colors">
                          <item.icon className="h-5 w-5 text-neural-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-white group-hover:text-neural-400 transition-colors">
                          {item.name}
                        </h3>
                      </div>
                      <p className="text-neutral-400 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </Link>
                  ))}
                </div>
                
                {/* Featured Section */}
                <div className="mt-8 pt-8 border-t border-neutral-700">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-white font-semibold mb-4">Latest Updates</h4>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-neural-400 rounded-full" />
                          <span className="text-neutral-300 text-sm">Neural AI v2.0 Released</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-quantum-400 rounded-full" />
                          <span className="text-neutral-300 text-sm">Quantum Collaboration Beta</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-processing-400 rounded-full" />
                          <span className="text-neutral-300 text-sm">Research Trees Enhanced</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-white font-semibold mb-4">Quick Actions</h4>
                      <div className="space-y-3">
                        <FuturisticButton variant="neural" size="sm" className="w-full justify-start">
                          Start New Research
                        </FuturisticButton>
                        <FuturisticButton variant="ghost" size="sm" className="w-full justify-start">
                          Join Collaboration
                        </FuturisticButton>
                        <FuturisticButton variant="outline" size="sm" className="w-full justify-start">
                          Browse Discoveries
                        </FuturisticButton>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </NeuralCard>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

// User Menu Component
const UserMenu = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -10 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="absolute top-full right-0 mt-2 w-64 z-50"
      >
        <NeuralCard variant="glass">
          <CardContent>
            {/* User Info */}
            <div className="flex items-center space-x-3 pb-4 border-b border-neutral-700">
              <div className="w-10 h-10 bg-gradient-to-br from-neural-500 to-neural-600 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-white font-medium">Dr. Alex Chen</div>
                <div className="text-neutral-400 text-sm">Neural Researcher</div>
              </div>
            </div>
            
            {/* Menu Items */}
            <div className="py-4 space-y-2">
              <Link
                href="/profile"
                onClick={onClose}
                className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-surface-secondary transition-colors"
              >
                <User className="h-4 w-4 text-neutral-400" />
                <span className="text-white">Profile</span>
              </Link>
              
              <Link
                href="/settings"
                onClick={onClose}
                className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-surface-secondary transition-colors"
              >
                <Settings className="h-4 w-4 text-neutral-400" />
                <span className="text-white">Settings</span>
              </Link>
              
              <Link
                href="/notifications"
                onClick={onClose}
                className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-surface-secondary transition-colors"
              >
                <Bell className="h-4 w-4 text-neutral-400" />
                <span className="text-white">Notifications</span>
                <span className="ml-auto bg-neural-500 text-white text-xs px-2 py-1 rounded-full">3</span>
              </Link>
            </div>
            
            {/* Logout */}
            <div className="pt-4 border-t border-neutral-700">
              <button
                onClick={onClose}
                className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-red-500/10 transition-colors w-full text-left"
              >
                <LogOut className="h-4 w-4 text-red-400" />
                <span className="text-red-400">Sign Out</span>
              </button>
            </div>
          </CardContent>
        </NeuralCard>
      </motion.div>
    )}
  </AnimatePresence>
);

// Main Header Component
export const FuturisticHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 100], [0.8, 0.95]);
  const headerBlur = useTransform(scrollY, [0, 100], [8, 20]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setIsMegaMenuOpen(false);
      setIsUserMenuOpen(false);
    };

    if (isMegaMenuOpen || isUserMenuOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isMegaMenuOpen, isUserMenuOpen]);

  return (
    <motion.header
      style={{ 
        backdropFilter: `blur(${headerBlur}px)`,
      }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-surface-background/95 border-b border-white/10 shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-neural-500 to-quantum-500 rounded-xl blur opacity-20 group-hover:opacity-30 transition duration-300" />
              <div className="relative bg-surface-glass backdrop-blur-xl rounded-xl p-2 border border-white/10">
                <Cpu className="h-6 w-6 text-neural-400" />
              </div>
            </div>
            <div className="hidden sm:block">
              <div className="text-lg font-bold text-white group-hover:text-neural-400 transition-colors">
                NeuraForge OS
              </div>
              <div className="text-xs text-neutral-400 -mt-1">
                Neural Research Platform
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsMegaMenuOpen(!isMegaMenuOpen);
                setIsUserMenuOpen(false);
              }}
              className="text-neutral-300 hover:text-white transition-colors font-medium"
            >
              Explore
            </button>
            
            <Link href="/pricing" className="text-neutral-300 hover:text-white transition-colors font-medium">
              Pricing
            </Link>
            
            <Link href="/docs" className="text-neutral-300 hover:text-white transition-colors font-medium">
              Documentation
            </Link>
            
            <Link href="/community" className="text-neutral-300 hover:text-white transition-colors font-medium">
              Community
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <button className="hidden md:flex items-center space-x-2 px-4 py-2 bg-surface-glass backdrop-blur-xl rounded-lg border border-white/10 text-neutral-400 hover:text-white transition-colors">
              <Search className="h-4 w-4" />
              <span className="text-sm">Search...</span>
              <kbd className="px-2 py-1 bg-surface-secondary rounded text-xs">⌘K</kbd>
            </button>

            {/* Notifications */}
            <button className="relative p-2 text-neutral-400 hover:text-white transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-neural-500 rounded-full"></span>
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsUserMenuOpen(!isUserMenuOpen);
                  setIsMegaMenuOpen(false);
                }}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-surface-secondary transition-colors"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-neural-500 to-neural-600 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
              </button>
              
              <UserMenu 
                isOpen={isUserMenuOpen} 
                onClose={() => setIsUserMenuOpen(false)} 
              />
            </div>

            {/* CTA Button */}
            <div className="hidden sm:block">
              <Link href="/auth/register">
                <FuturisticButton
                  variant="neural"
                  size="sm"
                  rightIcon={<ArrowRight className="h-4 w-4" />}
                  glowEffect
                >
                  Start Research
                </FuturisticButton>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-neutral-400 hover:text-white transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mega Menu */}
        <MegaMenu 
          isOpen={isMegaMenuOpen} 
          onClose={() => setIsMegaMenuOpen(false)} 
        />
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-white/10 bg-surface-background/95 backdrop-blur-xl"
          >
            <div className="px-6 py-4 space-y-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-surface-secondary transition-colors"
                >
                  <item.icon className="h-5 w-5 text-neural-400" />
                  <div>
                    <div className="text-white font-medium">{item.name}</div>
                    <div className="text-neutral-400 text-sm">{item.description}</div>
                  </div>
                </Link>
              ))}
              
              <div className="pt-4 border-t border-neutral-700">
                <Link href="/auth/register" onClick={() => setIsMobileMenuOpen(false)}>
                  <FuturisticButton
                    variant="neural"
                    size="md"
                    className="w-full"
                    rightIcon={<ArrowRight className="h-4 w-4" />}
                  >
                    Start Research Journey
                  </FuturisticButton>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default FuturisticHeader;