export const colors = {
  // Base colors - Modern dark theme inspired by the course platform
  background: '#0A0A0A',
  cardBackground: '#1A1A1A',
  surfaceElevated: '#2A2A2A',
  card: '#1A1A1A',
  text: '#FFFFFF',
  textSecondary: '#A0A0A0',
  textTertiary: '#707070',
  border: '#2A2A2A',
  borderLight: '#3A3A3A',
  
  // Primary colors - Bright green accent like the course platform
  primary: '#00D4AA',
  primaryDark: '#00B894',
  primaryLight: '#00E5BB',
  secondary: '#707070',
  
  // Brand colors
  logoTeal: '#00D4AA',
  
  // Status colors
  success: '#00D4AA',
  warning: '#FFB800',
  error: '#FF4757',
  info: '#3742FA',
  
  // Health category colors
  health: '#00D4AA',
  wellness: '#A55EEA',
  fitness: '#00D4AA',
  nutrition: '#FFB800',
  
  // Mood colors
  excellent: '#00D4AA',
  good: '#7ED321',
  okay: '#FFB800',
  low: '#FF6B6B',
  terrible: '#FF4757',
  
  // Neutral colors
  black: '#000000',
  white: '#FFFFFF',
  gray: '#707070',
  lightGray: '#F5F5F5',
  
  // Accent colors
  accent1: '#FF6B9D',
  accent2: '#4ECDC4',
  accent3: '#FFE66D',
  accent4: '#A8E6CF',
  
  // Gradients
  gradientPrimary: ['#00D4AA', '#00E5BB'],
  gradientSecondary: ['#707070', '#A0A0A0'],
  gradientHealth: ['#00D4AA', '#00E5BB'],
  gradientWellness: ['#A55EEA', '#C44EFF'],
  
  // Shadows and overlays
  shadow: 'rgba(0, 0, 0, 0.4)',
  overlay: 'rgba(0, 0, 0, 0.7)',
  backdrop: 'rgba(0, 0, 0, 0.9)',
};

// Light theme colors
export const lightColors = {
  background: '#FFFFFF',
  cardBackground: '#F8F9FA',
  surfaceElevated: '#FFFFFF',
  card: '#F8F9FA',
  text: '#1A1A1A',
  textSecondary: '#707070',
  textTertiary: '#A0A0A0',
  border: '#E5E5E5',
  borderLight: '#F0F0F0',
  
  // Primary colors
  primary: '#00D4AA',
  primaryDark: '#00B894',
  primaryLight: '#00E5BB',
  secondary: '#707070',
  
  // Brand colors
  logoTeal: '#00D4AA',
  
  // Status colors
  success: '#00D4AA',
  warning: '#FFB800',
  error: '#FF4757',
  info: '#3742FA',
  
  // Health category colors
  health: '#00D4AA',
  wellness: '#A55EEA',
  fitness: '#00D4AA',
  nutrition: '#FFB800',
  
  // Mood colors
  excellent: '#00D4AA',
  good: '#7ED321',
  okay: '#FFB800',
  low: '#FF6B6B',
  terrible: '#FF4757',
  
  // Neutral colors
  black: '#000000',
  white: '#FFFFFF',
  gray: '#707070',
  lightGray: '#F5F5F5',
  
  // Accent colors
  accent1: '#FF6B9D',
  accent2: '#4ECDC4',
  accent3: '#FFE66D',
  accent4: '#A8E6CF',
  
  // Gradients
  gradientPrimary: ['#00D4AA', '#00E5BB'],
  gradientSecondary: ['#707070', '#A0A0A0'],
  gradientHealth: ['#00D4AA', '#00E5BB'],
  gradientWellness: ['#A55EEA', '#C44EFF'],
  
  // Shadows and overlays
  shadow: 'rgba(0, 0, 0, 0.1)',
  overlay: 'rgba(0, 0, 0, 0.3)',
  backdrop: 'rgba(0, 0, 0, 0.5)',
};

// Function to get colors based on theme
export const getColors = (isDark: boolean = true) => {
  return isDark ? colors : lightColors;
};