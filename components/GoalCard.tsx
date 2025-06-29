import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { colors } from '@/constants/colors';
import { ProgressBar } from './ProgressBar';
import { PersonalizedGoal } from '@/types';
import { Target, Calendar, TrendingUp, CheckCircle2, Clock } from 'lucide-react-native';

interface GoalCardProps {
  goal: PersonalizedGoal;
  onPress?: () => void;
  onEdit?: () => void;
  onComplete?: () => void;
  onUpdate?: (progress: number) => void;
  showActions?: boolean;
  style?: ViewStyle;
}

export function GoalCard({ goal, onPress, onEdit, onComplete, onUpdate, showActions = true, style }: GoalCardProps) {
  const getGoalIcon = () => {
    switch (goal.type) {
      case 'weight':
        return '⚖️';
      case 'energy':
        return '⚡';
      case 'stress':
        return '🧘';
      case 'fitness':
        return '🏃';
      case 'health':
        return '❤️';
      case 'wellness':
        return '🌟';
      default:
        return '🎯';
    }
  };

  const getPriorityColor = () => {
    switch (goal.priority) {
      case 'high':
        return colors.error;
      case 'medium':
        return colors.warning;
      case 'low':
        return colors.success;
      default:
        return colors.textSecondary;
    }
  };

  const getDaysRemaining = () => {
    if (!goal.targetDate) return null;
    const today = new Date();
    const target = new Date(goal.targetDate);
    const diffTime = target.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysRemaining = getDaysRemaining();

  return (
    <TouchableOpacity 
      style={[
        styles.container,
        goal.completed && styles.completedContainer,
        style
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.icon}>{getGoalIcon()}</Text>
          <View style={styles.titleInfo}>
            <Text style={[styles.name, goal.completed && styles.completedText]}>
              {goal.name}
            </Text>
            <Text style={styles.category}>{goal.category}</Text>
          </View>
        </View>
        <View style={styles.priorityContainer}>
          <View style={[styles.priorityDot, { backgroundColor: getPriorityColor() }]} />
          <Text style={styles.priorityText}>{goal.priority}</Text>
        </View>
      </View>

      {goal.description && (
        <Text style={styles.description}>{goal.description}</Text>
      )}

      <View style={styles.progressContainer}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressText}>Progress</Text>
          <Text style={styles.progressValue}>{Math.round(goal.progress)}%</Text>
        </View>
        <ProgressBar 
          progress={goal.progress} 
          fillColor={goal.completed ? colors.success : colors.primary}
          style={styles.progressBar}
        />
      </View>

      {goal.targetValue && goal.currentValue && (
        <View style={styles.metricsContainer}>
          <View style={styles.metric}>
            <Target size={16} color={colors.textSecondary} />
            <Text style={styles.metricText}>
              {goal.currentValue} / {goal.targetValue} {goal.unit}
            </Text>
          </View>
        </View>
      )}

      <View style={styles.footer}>
        <View style={styles.timeInfo}>
          {daysRemaining !== null && (
            <View style={styles.timeContainer}>
              <Calendar size={14} color={colors.textSecondary} />
              <Text style={styles.timeText}>
                {daysRemaining > 0 
                  ? `${daysRemaining} days left`
                  : daysRemaining === 0 
                    ? 'Due today'
                    : `${Math.abs(daysRemaining)} days overdue`
                }
              </Text>
            </View>
          )}
          <View style={styles.difficultyContainer}>
            <TrendingUp size={14} color={colors.textSecondary} />
            <Text style={styles.difficultyText}>{goal.difficulty}</Text>
          </View>
        </View>

        {showActions && !goal.completed && (
          <View style={styles.actions}>
            {onEdit && (
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={onEdit}
              >
                <Text style={styles.actionButtonText}>Edit</Text>
              </TouchableOpacity>
            )}
            {onUpdate && (
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => onUpdate(Math.min(100, goal.progress + 10))}
              >
                <Text style={styles.actionButtonText}>Update</Text>
              </TouchableOpacity>
            )}
            {onComplete && goal.progress >= 100 && (
              <TouchableOpacity 
                style={[styles.actionButton, styles.completeButton]}
                onPress={onComplete}
              >
                <CheckCircle2 size={16} color={colors.white} />
                <Text style={styles.completeButtonText}>Complete</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        {goal.completed && (
          <View style={styles.completedBadge}>
            <CheckCircle2 size={16} color={colors.success} />
            <Text style={styles.completedBadgeText}>Completed</Text>
          </View>
        )}
      </View>

      {goal.milestones && goal.milestones.length > 0 && (
        <View style={styles.milestonesContainer}>
          <Text style={styles.milestonesTitle}>Milestones</Text>
          <View style={styles.milestones}>
            {goal.milestones.slice(0, 3).map((milestone, index) => (
              <View 
                key={milestone.id} 
                style={[
                  styles.milestone,
                  milestone.completed && styles.completedMilestone
                ]}
              >
                <View style={[
                  styles.milestoneIndicator,
                  milestone.completed && styles.completedMilestoneIndicator
                ]} />
                <Text style={[
                  styles.milestoneText,
                  milestone.completed && styles.completedMilestoneText
                ]}>
                  {milestone.title}
                </Text>
              </View>
            ))}
            {goal.milestones.length > 3 && (
              <Text style={styles.moreMilestones}>
                +{goal.milestones.length - 3} more
              </Text>
            )}
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  completedContainer: {
    backgroundColor: `${colors.success}10`,
    borderColor: `${colors.success}30`,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    fontSize: 24,
    marginRight: 12,
  },
  titleInfo: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: colors.textSecondary,
  },
  category: {
    fontSize: 12,
    color: colors.textSecondary,
    textTransform: 'capitalize',
  },
  priorityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priorityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  priorityText: {
    fontSize: 12,
    color: colors.textSecondary,
    textTransform: 'capitalize',
  },
  description: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 16,
    lineHeight: 20,
  },
  progressContainer: {
    marginBottom: 12,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressText: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '500',
  },
  progressValue: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },
  progressBar: {
    height: 6,
  },
  metricsContainer: {
    marginBottom: 12,
  },
  metric: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metricText: {
    fontSize: 14,
    color: colors.text,
    marginLeft: 8,
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeInfo: {
    flex: 1,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  timeText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginLeft: 6,
  },
  difficultyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  difficultyText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginLeft: 6,
    textTransform: 'capitalize',
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: colors.primary + '20',
  },
  actionButtonText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '500',
  },
  completeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.success,
  },
  completeButtonText: {
    fontSize: 12,
    color: colors.white,
    fontWeight: '500',
    marginLeft: 4,
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${colors.success}20`,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  completedBadgeText: {
    fontSize: 12,
    color: colors.success,
    fontWeight: '500',
    marginLeft: 4,
  },
  milestonesContainer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  milestonesTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 8,
  },
  milestones: {
    gap: 6,
  },
  milestone: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  completedMilestone: {
    opacity: 0.7,
  },
  milestoneIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.border,
    marginRight: 8,
  },
  completedMilestoneIndicator: {
    backgroundColor: colors.success,
  },
  milestoneText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  completedMilestoneText: {
    textDecorationLine: 'line-through',
  },
  moreMilestones: {
    fontSize: 12,
    color: colors.textSecondary,
    fontStyle: 'italic',
    marginLeft: 14,
  },
});