export const colors = {
  // Base colors - Modern dark theme
  background: '#0F1117',
  cardBackground: '#1A1D25',
  surfaceElevated: '#2A2D35',
  text: '#FFFFFF',
  textSecondary: '#94A3B8',
  textTertiary: '#64748B',
  border: '#2A2D35',
  borderLight: '#374151',
  
  // Primary colors - One Health brand system
  primary: '#0D9488', // Teal green
  primaryDark: '#0B7C71',
  primaryLight: '#14B8A6',
  secondary: '#64748B', // Cool gray
  
  // Brand colors
  logoTeal: '#0D9488',
  
  // Status colors
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
  
  // Health category colors
  health: '#0D9488', // Teal for health
  wellness: '#8B5CF6',
  fitness: '#10B981',
  nutrition: '#F59E0B',
  
  // Mood colors
  excellent: '#10B981',
  good: '#34D399',
  okay: '#F59E0B',
  low: '#F87171',
  terrible: '#EF4444',
  
  // Neutral colors
  black: '#000000',
  white: '#FFFFFF',
  gray: '#64748B',
  lightGray: '#F1F5F9',
  
  // Accent colors
  accent1: '#F472B6',
  accent2: '#60A5FA',
  accent3: '#FBBF24',
  accent4: '#A78BFA',
  
  // Gradients
  gradientPrimary: ['#0D9488', '#14B8A6'],
  gradientSecondary: ['#64748B', '#94A3B8'],
  gradientHealth: ['#0D9488', '#14B8A6'],
  gradientWellness: ['#8B5CF6', '#A78BFA'],
  
  // Shadows and overlays
  shadow: 'rgba(0, 0, 0, 0.3)',
  overlay: 'rgba(0, 0, 0, 0.6)',
  backdrop: 'rgba(0, 0, 0, 0.8)',
};

// Light theme colors
export const lightColors = {
  background: '#FFFFFF',
  cardBackground: '#F8FAFC',
  surfaceElevated: '#FFFFFF',
  text: '#0F172A',
  textSecondary: '#475569',
  textTertiary: '#64748B',
  border: '#E2E8F0',
  borderLight: '#F1F5F9',
  
  // Primary colors
  primary: '#0D9488',
  primaryDark: '#0B7C71',
  primaryLight: '#14B8A6',
  secondary: '#64748B',
  
  // Brand colors
  logoTeal: '#0D9488',
  
  // Status colors
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
  
  // Health category colors
  health: '#0D9488',
  wellness: '#8B5CF6',
  fitness: '#10B981',
  nutrition: '#F59E0B',
  
  // Mood colors
  excellent: '#10B981',
  good: '#34D399',
  okay: '#F59E0B',
  low: '#F87171',
  terrible: '#EF4444',
  
  // Neutral colors
  black: '#000000',
  white: '#FFFFFF',
  gray: '#64748B',
  lightGray: '#F1F5F9',
  
  // Accent colors
  accent1: '#F472B6',
  accent2: '#60A5FA',
  accent3: '#FBBF24',
  accent4: '#A78BFA',
  
  // Gradients
  gradientPrimary: ['#0D9488', '#14B8A6'],
  gradientSecondary: ['#64748B', '#94A3B8'],
  gradientHealth: ['#0D9488', '#14B8A6'],
  gradientWellness: ['#8B5CF6', '#A78BFA'],
  
  // Shadows and overlays
  shadow: 'rgba(0, 0, 0, 0.1)',
  overlay: 'rgba(0, 0, 0, 0.3)',
  backdrop: 'rgba(0, 0, 0, 0.5)',
};

// Function to get colors based on theme
export const getColors = (isDark: boolean = true) => {
  return isDark ? colors : lightColors;
};