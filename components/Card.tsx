import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ViewStyle, 
  TextStyle,
  StyleProp
} from 'react-native';
import { colors } from '@/constants/colors';

interface CardProps {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  subtitleStyle?: StyleProp<TextStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  rightContent?: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outlined' | 'filled';
  size?: 'small' | 'medium' | 'large';
}

export const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  children,
  onPress,
  style,
  titleStyle,
  subtitleStyle,
  contentStyle,
  rightContent,
  variant = 'default',
  size = 'medium'
}) => {
  const CardComponent = onPress ? TouchableOpacity : View;
  
  const getCardStyle = (): StyleProp<ViewStyle> => {
    const baseStyles: StyleProp<ViewStyle>[] = [styles.card];
    
    // Add size styles
    if (size === 'small') {
      baseStyles.push(styles.cardSmall);
    } else if (size === 'medium') {
      baseStyles.push(styles.cardMedium);
    } else if (size === 'large') {
      baseStyles.push(styles.cardLarge);
    }
    
    // Add variant styles
    switch (variant) {
      case 'elevated':
        baseStyles.push(styles.cardElevated);
        break;
      case 'outlined':
        baseStyles.push(styles.cardOutlined);
        break;
      case 'filled':
        baseStyles.push(styles.cardFilled);
        break;
      default:
        break;
    }
    
    return baseStyles;
  };
  
  return (
    <CardComponent 
      style={[getCardStyle(), style]} 
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      {(title || subtitle || rightContent) && (
        <View style={styles.header}>
          <View style={styles.headerTextContainer}>
            {title && <Text style={[styles.title, titleStyle]}>{title}</Text>}
            {subtitle && <Text style={[styles.subtitle, subtitleStyle]}>{subtitle}</Text>}
          </View>
          {rightContent && (
            <View style={styles.rightContent}>
              {rightContent}
            </View>
          )}
        </View>
      )}
      {children && (
        <View style={[styles.content, contentStyle]}>
          {children}
        </View>
      )}
    </CardComponent>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardSmall: {
    padding: 12,
  },
  cardMedium: {
    padding: 16,
  },
  cardLarge: {
    padding: 20,
  },
  cardElevated: {
    backgroundColor: colors.surfaceElevated,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 0,
  },
  cardOutlined: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.borderLight,
  },
  cardFilled: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  headerTextContainer: {
    flex: 1,
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
    lineHeight: 22,
  },
  subtitle: {
    fontSize: 15,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  content: {
    
  },
  rightContent: {
    marginLeft: 16,
    alignItems: 'flex-end',
  }
});