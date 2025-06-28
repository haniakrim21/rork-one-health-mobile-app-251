export const colors = {
  // Brand Colors
  primary: '#006B77',
  secondary: '#4A90E2',
  
  // Status Colors
  success: '#34C759',
  warning: '#FF9500',
  error: '#FF3B30',
  info: '#5856D6',

  // Health Colors
  health: '#FF2D55',
  wellness: '#5856D6',
  fitness: '#AF52DE',

  // Logo Colors
  logoGray: '#666666',
  logoTeal: '#006B77',

  // Light Theme Colors
  light: {
    text: '#000000',
    textSecondary: '#666666',
    background: '#FFFFFF',
    cardBackground: '#FFFFFF',
    border: '#E5E5EA',
  },

  // Dark Theme Colors
  dark: {
    text: '#FFFFFF',
    textSecondary: '#AEAEB2',
    background: '#000000',
    cardBackground: '#1C1C1E',
    border: '#38383A',
  },
} as const;

export type Colors = typeof colors;

export const getColors = (isDarkMode: boolean) => {
  const themeColors = isDarkMode ? colors.dark : colors.light;
  
  return {
    ...colors,
    text: themeColors.text,
    textSecondary: themeColors.textSecondary,
    background: themeColors.background,
    cardBackground: themeColors.cardBackground,
    border: themeColors.border,
  };
};