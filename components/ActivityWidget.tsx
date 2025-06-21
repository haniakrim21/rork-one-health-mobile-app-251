import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LucideIcon } from 'lucide-react-native';
import { colors } from '@/constants/colors';

export interface ActivityWidgetProps {
  title: string;
  value: string;
  type: 'steps' | 'calories' | 'distance' | 'active-time';
  progress: number;
  icon: LucideIcon;
  onPress?: () => void;
}

export function ActivityWidget({ 
  title, 
  value, 
  type, 
  progress, 
  icon: Icon,
  onPress 
}: ActivityWidgetProps) {
  const getTypeColor = () => {
    switch (type) {
      case 'steps':
        return colors.primary;
      case 'calories':
        return colors.warning;
      case 'distance':
        return colors.info;
      case 'active-time':
        return colors.success;
      default:
        return colors.primary;
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.header}>
        <View style={[styles.iconContainer, { backgroundColor: getTypeColor() + '20' }]}>
          <Icon size={20} color={getTypeColor()} />
        </View>
        <Text style={styles.title}>{title}</Text>
      </View>
      
      <Text style={[styles.value, { color: getTypeColor() }]}>{value}</Text>
      
      <View style={styles.progressContainer}>
        <View style={styles.progressTrack}>
          <View 
            style={[
              styles.progressFill, 
              { 
                width: `${Math.min(100, progress)}%`,
                backgroundColor: getTypeColor()
              }
            ]} 
          />
        </View>
        <Text style={styles.progressText}>{Math.round(progress)}%</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    padding: 16,
    width: '48%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  title: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  value: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 12,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressTrack: {
    flex: 1,
    height: 4,
    backgroundColor: colors.border,
    borderRadius: 2,
    marginRight: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '600',
  },
});