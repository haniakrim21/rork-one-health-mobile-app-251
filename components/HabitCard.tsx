import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CheckCircle, Circle, Flame, Target } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { Habit } from '@/types/wellness';

export interface HabitCardProps {
  habit: Habit;
  onPress: () => void;
  onEdit?: () => void;
}

export function HabitCard({ habit, onPress, onEdit }: HabitCardProps) {
  const getStreakColor = () => {
    if (habit.streak >= 30) return colors.success;
    if (habit.streak >= 14) return colors.warning;
    if (habit.streak >= 7) return colors.primary;
    return colors.textSecondary;
  };

  const getCategoryColor = () => {
    switch (habit.category) {
      case 'mindfulness':
        return colors.wellness;
      case 'exercise':
        return colors.fitness;
      case 'nutrition':
        return colors.health;
      case 'sleep':
        return colors.info;
      case 'social':
        return colors.primary;
      case 'learning':
        return colors.secondary;
      case 'creativity':
        return colors.warning;
      default:
        return colors.primary;
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <TouchableOpacity style={styles.checkButton} onPress={onPress}>
            {habit.completedToday ? (
              <CheckCircle size={24} color={colors.success} />
            ) : (
              <Circle size={24} color={colors.textSecondary} />
            )}
          </TouchableOpacity>
          <View style={styles.textContainer}>
            <Text style={[styles.name, habit.completedToday && styles.completedText]}>
              {habit.name}
            </Text>
            {habit.description && (
              <Text style={styles.description}>{habit.description}</Text>
            )}
          </View>
        </View>
        
        {onEdit && (
          <TouchableOpacity onPress={onEdit}>
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
        )}
      </View>
      
      <View style={styles.details}>
        <View style={styles.categoryContainer}>
          <View style={[styles.categoryDot, { backgroundColor: getCategoryColor() }]} />
          <Text style={styles.categoryText}>{habit.category}</Text>
        </View>
        
        <View style={styles.streakContainer}>
          <Flame size={16} color={getStreakColor()} />
          <Text style={[styles.streakText, { color: getStreakColor() }]}>
            {habit.streak} day streak
          </Text>
        </View>
        
        <View style={styles.targetContainer}>
          <Target size={16} color={colors.textSecondary} />
          <Text style={styles.targetText}>{habit.frequency}</Text>
        </View>
      </View>
      
      <View style={styles.progress}>
        <Text style={styles.progressText}>
          Best: {habit.longestStreak} days • {habit.points} points
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
  },
  checkButton: {
    marginRight: 12,
    marginTop: 2,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: colors.textSecondary,
  },
  description: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  editText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    flexWrap: 'wrap',
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 4,
  },
  categoryDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  categoryText: {
    fontSize: 12,
    color: colors.textSecondary,
    textTransform: 'capitalize',
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 4,
  },
  streakText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  targetContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  targetText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginLeft: 4,
    textTransform: 'capitalize',
  },
  progress: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 8,
  },
  progressText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
});