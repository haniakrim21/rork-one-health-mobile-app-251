import React from 'react';
import { View, StyleSheet, Text, ViewStyle, StyleProp } from 'react-native';
import { Image } from 'expo-image';
import { colors } from '@/constants/colors';

type AvatarSize = 'small' | 'medium' | 'large' | 'xlarge';

interface AvatarProps {
  source?: string;
  initials?: string;
  size?: AvatarSize;
  style?: StyleProp<ViewStyle>;
  backgroundColor?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  source,
  initials,
  size = 'medium',
  style,
  backgroundColor = colors.cardBackground,
}) => {
  const sizeValue = getSizeValue(size);
  
  return (
    <View 
      style={[
        styles.container, 
        { 
          width: sizeValue, 
          height: sizeValue,
          backgroundColor: source ? 'transparent' : backgroundColor,
        },
        style
      ]}
    >
      {source ? (
        <Image
          source={{ uri: source }}
          style={styles.image}
          contentFit="cover"
          transition={300}
        />
      ) : (
        <Text style={[styles.initials, { fontSize: sizeValue * 0.4 }]}>
          {initials || '?'}
        </Text>
      )}
    </View>
  );
};

const getSizeValue = (size: AvatarSize): number => {
  switch (size) {
    case 'small': return 32;
    case 'medium': return 48;
    case 'large': return 64;
    case 'xlarge': return 96;
    default: return 48;
  }
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 9999,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  initials: {
    color: colors.text,
    fontWeight: '600',
  },
});