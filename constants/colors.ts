// First export the colors object
export const colors = {
  // Base colors
  background: '#FFFFFF',
  surfaceElevated: '#FFFFFF',
  cardBackground: '#F8F9FA',
  text: '#1A1A1A',
  textSecondary: '#6C757D',
  textTertiary: '#ADB5BD',
  
  // Primary colors
  primary: '#007AFF',
  primaryLight: '#4DA3FF',
  primaryDark: '#0055B3',
  
  // Secondary colors
  secondary: '#5856D6',
  secondaryLight: '#7A79E0',
  secondaryDark: '#3E3D94',
  
  // Accent colors
  accent: '#FF2D55',
  accentLight: '#FF6B89',
  accentDark: '#D10930',
  
  // Status colors
  success: '#34C759',
  warning: '#FF9500',
  error: '#FF3B30',
  info: '#5856D6',
  
  // Domain-specific colors
  health: '#FF2D55',
  fitness: '#5856D6',
  wellness: '#34C759',
  
  // Logo colors - Updated to match brand
  logoTeal: '#006B77',
  logoGray: '#666666',
  
  // Grayscale
  gray100: '#F8F9FA',
  gray200: '#E9ECEF',
  gray300: '#DEE2E6',
  gray400: '#CED4DA',
  gray500: '#ADB5BD',
  gray600: '#6C757D',
  gray700: '#495057',
  gray800: '#343A40',
  gray900: '#212529',
  
  // Border colors
  border: '#E9ECEF',
  borderLight: '#F8F9FA',
  borderDark: '#DEE2E6',
  
  // Overlay colors
  overlay: 'rgba(0, 0, 0, 0.5)',
  modalBackground: 'rgba(0, 0, 0, 0.75)',
  shadow: '#000000',
  
  // Specific UI elements
  tabBar: '#F8F9FA',
  tabBarActive: '#007AFF',
  tabBarInactive: '#6C757D',
  
  // Semantic colors
  link: '#007AFF',
  placeholder: '#ADB5BD',
  disabled: '#E9ECEF',
  
  // Dark mode specific
  darkBackground: '#000000',
  darkCardBackground: '#1C1C1E',
  darkText: '#FFFFFF',
  darkBorder: '#38383A',

  // Utility colors
  black: '#000000',
  white: '#FFFFFF',
  transparent: 'transparent',
} as const;

// Then export the theme-aware color getter
export const getColors = (isDark: boolean) => {
  if (isDark) {
    return {
      ...colors,
      background: colors.darkBackground,
      cardBackground: colors.darkCardBackground,
      text: colors.darkText,
      border: colors.darkBorder,
      surfaceElevated: colors.darkCardBackground,
    };
  }
  return colors;
};

export type Colors = typeof colors;