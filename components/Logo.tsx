import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/constants/colors';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  variant?: 'horizontal' | 'vertical' | 'icon-only';
  color?: string;
  showTagline?: boolean;
}

export function Logo({ 
  size = 'medium', 
  variant = 'horizontal', 
  color = colors.primary,
  showTagline = false 
}: LogoProps) {
  const sizeStyles = {
    small: { fontSize: 20, iconSize: 24 },
    medium: { fontSize: 28, iconSize: 32 },
    large: { fontSize: 36, iconSize: 40 },
  };

  const currentSize = sizeStyles[size];

  const renderIcon = () => (
    <View style={[styles.iconContainer, { width: currentSize.iconSize, height: currentSize.iconSize }]}>
      <View style={[styles.circle, { borderColor: color }]}>
        <View style={[styles.arrow, { borderLeftColor: color }]} />
      </View>
    </View>
  );

  const renderText = () => (
    <View style={variant === 'vertical' ? styles.textVertical : styles.textHorizontal}>
      <Text style={[styles.oneText, { fontSize: currentSize.fontSize, color }]}>
        one
      </Text>
      <Text style={[styles.healthText, { fontSize: currentSize.fontSize * 0.7 }]}>
        HEALTH
      </Text>
      {showTagline && (
        <Text style={[styles.tagline, { fontSize: currentSize.fontSize * 0.3 }]}>
          Your Complete Health Companion
        </Text>
      )}
    </View>
  );

  if (variant === 'icon-only') {
    return renderIcon();
  }

  return (
    <View style={variant === 'vertical' ? styles.containerVertical : styles.containerHorizontal}>
      {renderIcon()}
      {renderText()}
    </View>
  );
}

const styles = StyleSheet.create({
  containerHorizontal: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  containerVertical: {
    alignItems: 'center',
    gap: 8,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  arrow: {
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderTopWidth: 6,
    borderBottomWidth: 6,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    marginLeft: 2,
  },
  textHorizontal: {
    alignItems: 'flex-start',
  },
  textVertical: {
    alignItems: 'center',
  },
  oneText: {
    fontWeight: '700',
    letterSpacing: -1,
  },
  healthText: {
    fontWeight: '400',
    color: colors.textSecondary,
    letterSpacing: 2,
    marginTop: -4,
  },
  tagline: {
    color: colors.textTertiary,
    marginTop: 4,
    textAlign: 'center',
  },
});