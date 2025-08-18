/** @type {import('tailwindcss').Config} */
const { fontFamily } = require("tailwindcss/defaultTheme")

module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      // Design System Colors
      colors: {
        // Primary Colors - Neon Purple Accent
        primary: {
          50: 'var(--color-primary-50)',
          100: 'var(--color-primary-100)',
          200: 'var(--color-primary-200)',
          300: 'var(--color-primary-300)',
          400: 'var(--color-primary-400)',
          500: 'var(--color-primary-500)', // Main brand color
          600: 'var(--color-primary-600)',
          700: 'var(--color-primary-700)',
          800: 'var(--color-primary-800)',
          900: 'var(--color-primary-900)',
          950: 'var(--color-primary-950)',
          DEFAULT: 'var(--color-primary-500)',
          foreground: 'var(--color-text-inverse)',
        },

        // Neutral Colors - Monochromatic Palette
        neutral: {
          0: 'var(--color-neutral-0)',
          50: 'var(--color-neutral-50)',
          100: 'var(--color-neutral-100)',
          200: 'var(--color-neutral-200)',
          300: 'var(--color-neutral-300)',
          400: 'var(--color-neutral-400)',
          500: 'var(--color-neutral-500)',
          600: 'var(--color-neutral-600)',
          700: 'var(--color-neutral-700)',
          800: 'var(--color-neutral-800)',
          900: 'var(--color-neutral-900)',
          950: 'var(--color-neutral-950)',
        },
        
        // Quantum Computing Inspired
        quantum: {
          50: "#ECFDF5",
          100: "#D1FAE5",
          200: "#A7F3D0",
          300: "#6EE7B7",
          400: "#34D399",
          500: "#10B981", // Primary quantum
          600: "#059669",
          700: "#047857",
          800: "#065F46",
          900: "#064E3B",
          950: "#022C22",
        },
        
        // AI Processing Orange
        processing: {
          50: "#FFF7ED",
          100: "#FFEDD5",
          200: "#FED7AA",
          300: "#FDBA74",
          400: "#FB923C",
          500: "#F97316", // Primary processing
          600: "#EA580C",
          700: "#C2410C",
          800: "#9A3412",
          900: "#7C2D12",
          950: "#431407",
        },
        
        // Dark Mode Surfaces
        surface: {
          background: "#0A0A0A",
          primary: "#1A1A1A",
          secondary: "#2A2A2A",
          tertiary: "#3A3A3A",
          elevated: "#404040",
          overlay: "rgba(0, 0, 0, 0.8)",
          glass: "rgba(255, 255, 255, 0.05)",
          glow: "rgba(99, 102, 241, 0.1)",
        },
        
        // Legacy color mappings for compatibility
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#6366F1",
          50: "#F0F4FF",
          100: "#E0E7FF",
          200: "#C7D2FE",
          300: "#A5B4FC",
          400: "#818CF8",
          500: "#6366F1",
          600: "#4F46E5",
          700: "#4338CA",
          800: "#3730A3",
          900: "#312E81",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      
      // Typography System
      fontFamily: {
        sans: ["Inter", "SF Pro Display", ...fontFamily.sans],
        display: ["Inter Display", "SF Pro Display", ...fontFamily.sans],
        mono: ["JetBrains Mono", "SF Mono", ...fontFamily.mono],
      },
      
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "0.75rem" }],
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.5rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
        "5xl": ["3rem", { lineHeight: "1.2" }],
        "6xl": ["3.75rem", { lineHeight: "1.1" }],
        "7xl": ["4.5rem", { lineHeight: "1.1" }],
        "8xl": ["6rem", { lineHeight: "1" }],
        "9xl": ["8rem", { lineHeight: "1" }],
      },
      
      // Spacing System (4px base)
      spacing: {
        "0.5": "0.125rem", // 2px
        "1.5": "0.375rem", // 6px
        "2.5": "0.625rem", // 10px
        "3.5": "0.875rem", // 14px
        "18": "4.5rem",    // 72px
        "88": "22rem",     // 352px
        "100": "25rem",    // 400px
        "112": "28rem",    // 448px
        "128": "32rem",    // 512px
      },
      
      // Border Radius
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "4xl": "2rem",
      },
      
      // Box Shadows
      boxShadow: {
        // Futuristic shadows
        glow: "0 0 15px rgba(99, 102, 241, 0.15)",
        glowLg: "0 0 25px rgba(99, 102, 241, 0.2)",
        neural: "0 4px 16px rgba(99, 102, 241, 0.08)",
        quantum: "0 4px 16px rgba(16, 185, 129, 0.08)",
        processing: "0 4px 16px rgba(249, 115, 22, 0.08)",
        
        // Enhanced standard shadows
        soft: "0 2px 8px rgba(0, 0, 0, 0.12)",
        medium: "0 4px 16px rgba(0, 0, 0, 0.16)",
        large: "0 8px 32px rgba(0, 0, 0, 0.20)",
        
        // Glass morphism
        glass: "0 8px 32px rgba(0, 0, 0, 0.37)",
      },
      
      // Background Images
      backgroundImage: {
        "neural-gradient": "linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #EC4899 100%)",
        "quantum-gradient": "linear-gradient(135deg, #10B981 0%, #34D399 50%, #6EE7B7 100%)",
        "processing-gradient": "linear-gradient(135deg, #F97316 0%, #FB923C 50%, #FDBA74 100%)",
        "glass-gradient": "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
        "glow-gradient": "radial-gradient(circle at center, rgba(99,102,241,0.3) 0%, transparent 70%)",
      },
      
      // Animations
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "glow": {
          "0%, 100%": {
            boxShadow: "0 0 8px rgba(99, 102, 241, 0.1), 0 0 16px rgba(99, 102, 241, 0.05)",
            transform: "scale(1)",
          },
          "50%": {
            boxShadow: "0 0 12px rgba(99, 102, 241, 0.15), 0 0 24px rgba(99, 102, 241, 0.08)",
            transform: "scale(1.01)",
          },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-glow": {
          "0%, 100%": {
            opacity: "0.9",
            boxShadow: "0 0 12px rgba(99, 102, 241, 0.2)",
          },
          "50%": {
            opacity: "1",
            boxShadow: "0 0 20px rgba(99, 102, 241, 0.3)",
          },
        },
      },
      
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "slide-up": "slide-up 0.6s ease-out",
        "scale-in": "scale-in 0.4s ease-out",
        "glow": "glow 2s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
      },
      
      // Backdrop Blur
      backdropBlur: {
        xs: "2px",
        "4xl": "72px",
      },
      
      // Z-Index Scale
      zIndex: {
        1: "1",
        2: "2",
        3: "3",
        4: "4",
        5: "5",
      },
      
      // Aspect Ratios
      aspectRatio: {
        "4/3": "4 / 3",
        "3/2": "3 / 2",
        "2/3": "2 / 3",
        "9/16": "9 / 16",
      },
      
      // Grid Template Columns
      gridTemplateColumns: {
        "13": "repeat(13, minmax(0, 1fr))",
        "14": "repeat(14, minmax(0, 1fr))",
        "15": "repeat(15, minmax(0, 1fr))",
        "16": "repeat(16, minmax(0, 1fr))",
      },
      
      // Transition Timing Functions
      transitionTimingFunction: {
        "out-quint": "cubic-bezier(0.22, 1, 0.36, 1)",
        "in-out-cubic": "cubic-bezier(0.65, 0, 0.35, 1)",
        "bounce": "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        "spring": "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
    
    // Custom plugin for futuristic utilities
    function({ addUtilities, theme }) {
      const newUtilities = {
        // Glass morphism utilities
        ".glass": {
          background: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        },
        ".glass-strong": {
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        },
        
        // Neural glow utilities
        ".neural-glow": {
          boxShadow: "0 0 20px rgba(99, 102, 241, 0.3)",
        },
        ".neural-glow-strong": {
          boxShadow: "0 0 40px rgba(99, 102, 241, 0.6)",
        },
        
        // Text gradients
        ".text-neural-gradient": {
          background: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #EC4899 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        },
        ".text-quantum-gradient": {
          background: "linear-gradient(135deg, #10B981 0%, #34D399 50%, #6EE7B7 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        },
        
        // Scrollbar styling
        ".scrollbar-thin": {
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(99, 102, 241, 0.3) transparent",
        },
        ".scrollbar-thin::-webkit-scrollbar": {
          width: "6px",
        },
        ".scrollbar-thin::-webkit-scrollbar-track": {
          background: "transparent",
        },
        ".scrollbar-thin::-webkit-scrollbar-thumb": {
          background: "rgba(99, 102, 241, 0.3)",
          borderRadius: "3px",
        },
        ".scrollbar-thin::-webkit-scrollbar-thumb:hover": {
          background: "rgba(99, 102, 241, 0.5)",
        },
      }
      
      addUtilities(newUtilities)
    },
  ],
}