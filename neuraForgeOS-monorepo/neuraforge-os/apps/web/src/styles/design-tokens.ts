/**
 * NeuraForge OS Design Tokens
 * Futuristic AI-Native Design System
 * Following .qodo Premium Design Standards
 */

// Core Color Palette - Futuristic AI Theme
export const colorTokens = {
  // Neural Network Inspired Palette
  neural: {
    50: "#F0F4FF",   // Lightest neural blue
    100: "#E0E7FF",  // Very light neural
    200: "#C7D2FE",  // Light neural
    300: "#A5B4FC",  // Medium light neural
    400: "#818CF8",  // Medium neural
    500: "#6366F1",  // Primary neural (main brand)
    600: "#4F46E5",  // Medium dark neural
    700: "#4338CA",  // Dark neural
    800: "#3730A3",  // Very dark neural
    900: "#312E81",  // Darkest neural
    950: "#1E1B4B",  // Near black neural
  },

  // Quantum Computing Inspired Accent
  quantum: {
    50: "#ECFDF5",   // Lightest quantum green
    100: "#D1FAE5",  // Very light quantum
    200: "#A7F3D0",  // Light quantum
    300: "#6EE7B7",  // Medium light quantum
    400: "#34D399",  // Medium quantum
    500: "#10B981",  // Primary quantum
    600: "#059669",  // Medium dark quantum
    700: "#047857",  // Dark quantum
    800: "#065F46",  // Very dark quantum
    900: "#064E3B",  // Darkest quantum
    950: "#022C22",  // Near black quantum
  },

  // AI Processing Orange
  processing: {
    50: "#FFF7ED",   // Lightest processing
    100: "#FFEDD5",  // Very light processing
    200: "#FED7AA",  // Light processing
    300: "#FDBA74",  // Medium light processing
    400: "#FB923C",  // Medium processing
    500: "#F97316",  // Primary processing
    600: "#EA580C",  // Medium dark processing
    700: "#C2410C",  // Dark processing
    800: "#9A3412",  // Very dark processing
    900: "#7C2D12",  // Darkest processing
    950: "#431407",  // Near black processing
  },

  // Neutral Grays - High Contrast
  neutral: {
    0: "#FFFFFF",     // Pure white
    50: "#FAFAFA",    // Lightest gray
    100: "#F5F5F5",   // Very light gray
    200: "#E5E5E5",   // Light gray
    300: "#D4D4D4",   // Medium light gray
    400: "#A3A3A3",   // Medium gray
    500: "#737373",   // True gray
    600: "#525252",   // Medium dark gray
    700: "#404040",   // Dark gray
    800: "#262626",   // Very dark gray
    900: "#171717",   // Almost black
    950: "#0A0A0A",   // Near black
  },

  // Dark Mode Surfaces
  surface: {
    background: "#0A0A0A",      // Main background
    primary: "#1A1A1A",        // Primary surface
    secondary: "#2A2A2A",      // Secondary surface
    tertiary: "#3A3A3A",       // Tertiary surface
    elevated: "#404040",       // Elevated surface
    overlay: "rgba(0, 0, 0, 0.8)", // Modal overlay
    glass: "rgba(255, 255, 255, 0.05)", // Glassmorphism
    glow: "rgba(99, 102, 241, 0.1)", // Neural glow
  },

  // Semantic Colors
  semantic: {
    success: {
      light: "#10B981",
      dark: "#34D399",
      surface: "rgba(16, 185, 129, 0.1)",
    },
    warning: {
      light: "#F59E0B",
      dark: "#FBBF24",
      surface: "rgba(245, 158, 11, 0.1)",
    },
    error: {
      light: "#EF4444",
      dark: "#F87171",
      surface: "rgba(239, 68, 68, 0.1)",
    },
    info: {
      light: "#6366F1",
      dark: "#818CF8",
      surface: "rgba(99, 102, 241, 0.1)",
    },
  },

  // Gradient Definitions
  gradients: {
    neural: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #EC4899 100%)",
    quantum: "linear-gradient(135deg, #10B981 0%, #34D399 50%, #6EE7B7 100%)",
    processing: "linear-gradient(135deg, #F97316 0%, #FB923C 50%, #FDBA74 100%)",
    glass: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
    glow: "radial-gradient(circle at center, rgba(99,102,241,0.3) 0%, transparent 70%)",
  },
} as const;

// Typography System - Mathematical Scale
export const typography = {
  fontFamily: {
    display: ["Inter Display", "SF Pro Display", "-apple-system", "system-ui", "sans-serif"],
    body: ["Inter", "SF Pro Text", "-apple-system", "system-ui", "sans-serif"],
    mono: ["JetBrains Mono", "SF Mono", "Monaco", "Consolas", "monospace"],
  },

  fontSize: {
    "2xs": ["0.625rem", { lineHeight: "0.75rem" }],  // 10px
    xs: ["0.75rem", { lineHeight: "1rem" }],         // 12px
    sm: ["0.875rem", { lineHeight: "1.25rem" }],     // 14px
    base: ["1rem", { lineHeight: "1.5rem" }],        // 16px
    lg: ["1.125rem", { lineHeight: "1.75rem" }],     // 18px
    xl: ["1.25rem", { lineHeight: "1.75rem" }],      // 20px
    "2xl": ["1.5rem", { lineHeight: "2rem" }],       // 24px
    "3xl": ["1.875rem", { lineHeight: "2.25rem" }], // 30px
    "4xl": ["2.25rem", { lineHeight: "2.5rem" }],   // 36px
    "5xl": ["3rem", { lineHeight: "1.2" }],         // 48px
    "6xl": ["3.75rem", { lineHeight: "1.1" }],      // 60px
    "7xl": ["4.5rem", { lineHeight: "1.1" }],       // 72px
    "8xl": ["6rem", { lineHeight: "1" }],           // 96px
    "9xl": ["8rem", { lineHeight: "1" }],           // 128px
  },

  fontWeight: {
    thin: "100",
    extralight: "200",
    light: "300",
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
    extrabold: "800",
    black: "900",
  },

  letterSpacing: {
    tighter: "-0.05em",
    tight: "-0.025em",
    normal: "0em",
    wide: "0.025em",
    wider: "0.05em",
    widest: "0.1em",
  },
} as const;

// Spacing System - 4px Base Unit
export const spacing = {
  0: "0px",
  px: "1px",
  0.5: "0.125rem",  // 2px
  1: "0.25rem",     // 4px
  1.5: "0.375rem",  // 6px
  2: "0.5rem",      // 8px
  2.5: "0.625rem",  // 10px
  3: "0.75rem",     // 12px
  3.5: "0.875rem",  // 14px
  4: "1rem",        // 16px
  5: "1.25rem",     // 20px
  6: "1.5rem",      // 24px
  7: "1.75rem",     // 28px
  8: "2rem",        // 32px
  9: "2.25rem",     // 36px
  10: "2.5rem",     // 40px
  12: "3rem",       // 48px
  14: "3.5rem",     // 56px
  16: "4rem",       // 64px
  20: "5rem",       // 80px
  24: "6rem",       // 96px
  28: "7rem",       // 112px
  32: "8rem",       // 128px
  36: "9rem",       // 144px
  40: "10rem",      // 160px
  44: "11rem",      // 176px
  48: "12rem",      // 192px
  52: "13rem",      // 208px
  56: "14rem",      // 224px
  60: "15rem",      // 240px
  64: "16rem",      // 256px
  72: "18rem",      // 288px
  80: "20rem",      // 320px
  96: "24rem",      // 384px
} as const;

// Animation System
export const animation = {
  duration: {
    instant: "0ms",
    fast: "150ms",
    normal: "300ms",
    slow: "500ms",
    slower: "750ms",
    slowest: "1000ms",
  },

  easing: {
    linear: "linear",
    easeIn: "cubic-bezier(0.4, 0, 1, 1)",
    easeOut: "cubic-bezier(0, 0, 0.2, 1)",
    easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
    // Premium easings
    outQuint: "cubic-bezier(0.22, 1, 0.36, 1)",
    inOutCubic: "cubic-bezier(0.65, 0, 0.35, 1)",
    bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
    spring: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  },

  keyframes: {
    fadeIn: {
      "0%": { opacity: "0" },
      "100%": { opacity: "1" },
    },
    slideUp: {
      "0%": { opacity: "0", transform: "translateY(20px)" },
      "100%": { opacity: "1", transform: "translateY(0)" },
    },
    scaleIn: {
      "0%": { opacity: "0", transform: "scale(0.9)" },
      "100%": { opacity: "1", transform: "scale(1)" },
    },
    glow: {
      "0%, 100%": { boxShadow: "0 0 20px rgba(99, 102, 241, 0.3)" },
      "50%": { boxShadow: "0 0 40px rgba(99, 102, 241, 0.6)" },
    },
    float: {
      "0%, 100%": { transform: "translateY(0px)" },
      "50%": { transform: "translateY(-10px)" },
    },
  },
} as const;

// Breakpoint System
export const breakpoints = {
  xs: "0px",
  sm: "640px",   // Small devices (landscape phones)
  md: "768px",   // Medium devices (tablets)
  lg: "1024px",  // Large devices (laptops)
  xl: "1280px",  // Extra large devices (desktops)
  "2xl": "1536px", // 2X large devices (large desktops)
} as const;

// Shadow System
export const shadows = {
  none: "none",
  sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  base: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
  md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
  
  // Futuristic shadows
  glow: "0 0 20px rgba(99, 102, 241, 0.3)",
  glowLg: "0 0 40px rgba(99, 102, 241, 0.4)",
  neural: "0 8px 32px rgba(99, 102, 241, 0.15)",
  quantum: "0 8px 32px rgba(16, 185, 129, 0.15)",
  processing: "0 8px 32px rgba(249, 115, 22, 0.15)",
} as const;

// Border Radius System
export const borderRadius = {
  none: "0px",
  sm: "0.125rem",   // 2px
  base: "0.25rem",  // 4px
  md: "0.375rem",   // 6px
  lg: "0.5rem",     // 8px
  xl: "0.75rem",    // 12px
  "2xl": "1rem",    // 16px
  "3xl": "1.5rem",  // 24px
  full: "9999px",
} as const;

// Z-Index System
export const zIndex = {
  hide: -1,
  auto: "auto",
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800,
} as const;

// Export all tokens
export const designTokens = {
  colors: colorTokens,
  typography,
  spacing,
  animation,
  breakpoints,
  shadows,
  borderRadius,
  zIndex,
} as const;

export type DesignTokens = typeof designTokens;