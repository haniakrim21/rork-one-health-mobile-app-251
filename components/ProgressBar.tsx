import React from 'react';
import { View, StyleSheet, Text, ViewStyle, StyleProp } from 'react-native';
import { colors } from '@/constants/colors';

interface ProgressBarProps {
  progress: number; // 0-100
  height?: number;
  backgroundColor?: string;
  fillColor?: string;
  color?: string; // Alias for fillColor for backward compatibility
  showPercentage?: boolean;
  style?: StyleProp<ViewStyle>;
  animated?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  height = 8,
  backgroundColor = colors.border,
  fillColor,
  color, // Backward compatibility
  showPercentage = false,
  style,
  animated = true,
}) => {
  // Ensure progress is between 0-100
  const clampedProgress = Math.min(Math.max(progress, 0), 100);
  
  // Use fillColor if provided, otherwise use color for backward compatibility
  const barColor = fillColor || color || colors.primary;
  
  return (
    <View style={[styles.container, style]}>
      <View 
        style={[
          styles.progressBar, 
          { 
            height, 
            backgroundColor 
          }
        ]}
      >
        <View 
          style={[
            styles.fill, 
            { 
              width: `${clampedProgress}%`, 
              backgroundColor: barColor,
            }
          ]}
        />
      </View>
      {showPercentage && (
        <Text style={styles.percentage}>{Math.round(clampedProgress)}%</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    borderRadius: 4,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
  },
  percentage: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
    color: colors.textSecondary,
  },
});