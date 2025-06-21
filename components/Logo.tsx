import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
  color?: string;
  variant?: 'horizontal' | 'vertical';
}

export function Logo({ 
  size = 'medium', 
  showText = true, 
  color = '#0D9488',
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
        <Text style={[styles.oneTextIcon, { fontSize: textSizes.one, color: '#9CA3AF' }]}>o</Text>
        <View style={[styles.arrow, { borderLeftColor: color }]} />
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
          <View style={[styles.arrow, { borderLeftColor: color }]} />
        </View>
        <Text style={[styles.healthText, { fontSize: textSizes.health, color: color }]}>
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
    color: '#9CA3AF',
    letterSpacing: -1,
    textTransform: 'lowercase',
  },
  healthText: {
    fontWeight: '700',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginTop: -2,
  },
  arrow: {
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 0,
    borderTopWidth: 6,
    borderBottomWidth: 6,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    marginLeft: 2,
    marginTop: -2,
  },
  iconOnly: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  oneTextIcon: {
    fontWeight: '400',
    letterSpacing: -1,
  },
});