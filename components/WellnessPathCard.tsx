import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Target, Clock, TrendingUp, Play } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { WellnessPath } from '@/types/wellness';
import { ProgressBar } from './ProgressBar';

export interface WellnessPathCardProps {
  path: WellnessPath;
  onPress: () => void;
}

export function WellnessPathCard({ path, onPress }: WellnessPathCardProps) {
  const getCategoryColor = () => {
    switch (path.category) {
      case 'stress':
        return colors.wellness;
      case 'anxiety':
        return colors.warning;
      case 'depression':
        return colors.info;
      case 'sleep':
        return colors.info;
      case 'relationships':
        return colors.primary;
      case 'productivity':
        return colors.success;
      case 'self-esteem':
        return colors.secondary;
      default:
        return colors.primary;
    }
  };

  const completedModules = path.modules.filter(module => module.completed).length;
  const totalModules = path.modules.length;

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{path.name}</Text>
          <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor() + '20' }]}>
            <Text style={[styles.categoryText, { color: getCategoryColor() }]}>
              {path.category}
            </Text>
          </View>
        </View>
        
        {path.isActive && (
          <View style={styles.activeIndicator}>
            <Text style={styles.activeText}>Active</Text>
          </View>
        )}
      </View>
      
      <Text style={styles.description} numberOfLines={2}>
        {path.description}
      </Text>
      
      <View style={styles.metadata}>
        <View style={styles.metadataItem}>
          <Clock size={16} color={colors.textSecondary} />
          <Text style={styles.metadataText}>{path.duration} days</Text>
        </View>
        
        <View style={styles.metadataItem}>
          <Target size={16} color={colors.textSecondary} />
          <Text style={styles.metadataText}>
            {completedModules}/{totalModules} modules
          </Text>
        </View>
      </View>
      
      <View style={styles.progressContainer}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressLabel}>Progress</Text>
          <Text style={styles.progressPercentage}>{Math.round(path.progress)}%</Text>
        </View>
        <ProgressBar 
          progress={path.progress} 
          height={6}
          fillColor={getCategoryColor()}
        />
      </View>
      
      <View style={styles.footer}>
        <TouchableOpacity style={styles.continueButton} onPress={onPress}>
          <Play size={16} color={colors.white} />
          <Text style={styles.continueButtonText}>
            {path.progress > 0 ? 'Continue' : 'Start Path'}
          </Text>
        </TouchableOpacity>
        
        {path.progress > 0 && (
          <View style={styles.trendContainer}>
            <TrendingUp size={16} color={colors.success} />
            <Text style={styles.trendText}>On track</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  titleContainer: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  activeIndicator: {
    backgroundColor: colors.success + '20',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  activeText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.success,
  },
  description: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 16,
  },
  metadata: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  metadataItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  metadataText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginLeft: 6,
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  progressPercentage: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  continueButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  continueButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.white,
    marginLeft: 6,
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trendText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.success,
    marginLeft: 4,
  },
});