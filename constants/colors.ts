export const colors = {
  // Base colors - Modern dark theme
  background: '#0F0F0F',
  cardBackground: '#1C1C1E',
  surfaceElevated: '#2C2C2E',
  text: '#FFFFFF',
  textSecondary: '#8E8E93',
  textTertiary: '#636366',
  border: '#38383A',
  borderLight: '#48484A',
  
  // Primary colors - Modern teal/mint system
  primary: '#30D158',
  primaryDark: '#28C946',
  primaryLight: '#40E168',
  secondary: '#007AFF',
  
  // Brand colors
  logoTeal: '#30D158',
  
  // Status colors - iOS inspired
  success: '#30D158',
  warning: '#FF9F0A',
  error: '#FF453A',
  info: '#64D2FF',
  
  // Health category colors - More sophisticated
  health: '#FF6482',
  wellness: '#5AC8FA',
  fitness: '#30D158',
  nutrition: '#FFD60A',
  
  // Mood colors
  excellent: '#30D158',
  good: '#32D74B',
  okay: '#FF9F0A',
  low: '#FF6961',
  terrible: '#FF453A',
  
  // Neutral colors
  black: '#000000',
  white: '#FFFFFF',
  gray: '#8E8E93',
  lightGray: '#F2F2F7',
  
  // Accent colors - Modern palette
  accent1: '#FF6482',
  accent2: '#5AC8FA',
  accent3: '#FFD60A',
  accent4: '#BF5AF2',
  
  // Gradients
  gradientPrimary: ['#30D158', '#32D74B'],
  gradientSecondary: ['#007AFF', '#5AC8FA'],
  gradientHealth: ['#FF6482', '#FF8A9B'],
  gradientWellness: ['#5AC8FA', '#64D2FF'],
  
  // Shadows and overlays
  shadow: 'rgba(0, 0, 0, 0.3)',
  overlay: 'rgba(0, 0, 0, 0.6)',
  backdrop: 'rgba(0, 0, 0, 0.8)',
};

// Light theme colors
export const lightColors = {
  background: '#FFFFFF',
  cardBackground: '#F2F2F7',
  surfaceElevated: '#FFFFFF',
  text: '#000000',
  textSecondary: '#6D6D70',
  textTertiary: '#8E8E93',
  border: '#C6C6C8',
  borderLight: '#E5E5EA',
  
  // Keep the same primary colors for consistency
  primary: '#30D158',
  primaryDark: '#28C946',
  primaryLight: '#40E168',
  secondary: '#007AFF',
  
  // Brand colors
  logoTeal: '#30D158',
  
  // Status colors
  success: '#30D158',
  warning: '#FF9F0A',
  error: '#FF453A',
  info: '#007AFF',
  
  // Health category colors
  health: '#FF6482',
  wellness: '#007AFF',
  fitness: '#30D158',
  nutrition: '#FF9F0A',
  
  // Mood colors
  excellent: '#30D158',
  good: '#32D74B',
  okay: '#FF9F0A',
  low: '#FF6961',
  terrible: '#FF453A',
  
  // Neutral colors
  black: '#000000',
  white: '#FFFFFF',
  gray: '#8E8E93',
  lightGray: '#F2F2F7',
  
  // Accent colors
  accent1: '#FF6482',
  accent2: '#007AFF',
  accent3: '#FF9F0A',
  accent4: '#BF5AF2',
  
  // Gradients
  gradientPrimary: ['#30D158', '#32D74B'],
  gradientSecondary: ['#007AFF', '#5AC8FA'],
  gradientHealth: ['#FF6482', '#FF8A9B'],
  gradientWellness: ['#007AFF', '#64D2FF'],
  
  // Shadows and overlays
  shadow: 'rgba(0, 0, 0, 0.1)',
  overlay: 'rgba(0, 0, 0, 0.3)',
  backdrop: 'rgba(0, 0, 0, 0.5)',
};

// Function to get colors based on theme
export const getColors = (isDark: boolean = true) => {
  return isDark ? colors : lightColors;
};