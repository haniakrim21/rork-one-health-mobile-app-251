import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/constants/colors';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
  color?: string;
  variant?: 'horizontal' | 'vertical';
}

export function Logo({ 
  size = 'medium', 
  showText = true, 
  color = colors.logoTeal,
  variant = 'horizontal' 
}: LogoProps) {
  const getTextSizes = () => {
    switch (size) {
      case 'small':
        return { one: 18, health: 12 };
      case 'medium':
        return { one: 24, health: 16 };
      case 'large':
        return { one: 32, health: 20 };
      default:
        return { one: 24, health: 16 };
    }
  };

  const textSizes = getTextSizes();

  if (!showText) {
    return (
      <View style={styles.iconOnly}>
        <View style={[styles.triangle, { borderBottomColor: color }]} />
      </View>
    );
  }

  return (
    <View style={[
      styles.container,
      variant === 'vertical' && styles.containerVertical
    ]}>
      <View style={styles.logoContainer}>
        <View style={styles.oneContainer}>
          <Text style={[styles.oneText, { fontSize: textSizes.one }]}>one</Text>
          <View style={[styles.triangle, { borderBottomColor: color }]} />
        </View>
        <Text style={[styles.healthText, { fontSize: textSizes.health, color }]}>
          HEALTH
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  containerVertical: {
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  oneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  oneText: {
    fontWeight: '400',
    color: colors.textSecondary,
    letterSpacing: -1,
    textTransform: 'lowercase',
  },
  healthText: {
    fontWeight: '700',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginTop: -2,
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 12,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    marginLeft: 4,
    transform: [{ rotate: '90deg' }],
  },
  iconOnly: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
  },
});