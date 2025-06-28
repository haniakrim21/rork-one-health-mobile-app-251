import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/constants/colors';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
  variant?: 'horizontal' | 'vertical';
}

export function Logo({ 
  size = 'medium', 
  showText = true,
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
        <View style={styles.playIcon} />
      </View>
    );
  }

  return (
    <View style={[
      styles.container,
      variant === 'vertical' && styles.containerVertical
    ]}>
      <View style={[
        styles.logoContainer,
        variant === 'vertical' && styles.logoContainerVertical
      ]}>
        <View style={styles.oneContainer}>
          <Text style={[styles.oneText, { fontSize: textSizes.one }]}>
            <Text style={styles.oText}>o</Text>
            ne
          </Text>
          <View style={[
            styles.playIcon,
            size === 'small' && styles.playIconSmall,
            size === 'large' && styles.playIconLarge,
          ]} />
        </View>
        <Text style={[
          styles.healthText,
          { fontSize: textSizes.health },
          variant === 'horizontal' && styles.healthTextHorizontal
        ]}>
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
  logoContainerVertical: {
    gap: 4,
  },
  oneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  oneText: {
    fontWeight: '400',
    color: colors.logoGray,
    letterSpacing: -0.2,
  },
  oText: {
    position: 'relative',
    marginRight: 2,
  },
  healthText: {
    fontWeight: '700',
    color: colors.logoTeal,
    letterSpacing: 1,
  },
  healthTextHorizontal: {
    marginLeft: 8,
  },
  playIcon: {
    position: 'absolute',
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderBottomWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: colors.logoTeal,
    transform: [
      { rotate: '90deg' },
      { translateX: 4 },
      { translateY: -2 }
    ],
  },
  playIconSmall: {
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderBottomWidth: 8,
    transform: [
      { rotate: '90deg' },
      { translateX: 3 },
      { translateY: -1 }
    ],
  },
  playIconLarge: {
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 12,
    transform: [
      { rotate: '90deg' },
      { translateX: 5 },
      { translateY: -3 }
    ],
  },
  iconOnly: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
});