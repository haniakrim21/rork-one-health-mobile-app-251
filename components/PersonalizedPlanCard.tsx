import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { colors } from '@/constants/colors';
import { Target, Clock, TrendingUp, CheckCircle, Circle, Calendar } from 'lucide-react-native';

interface PersonalizedPlan {
  id: string;
  name: string;
  description: string;
  duration: number;
  goals: string[];
  dailyTasks: Array<{
    id: string;
    name: string;
    description: string;
    type: string;
    estimatedTime: number;
    priority: string;
    completed: boolean;
  }>;
  weeklyMilestones: Array<{
    week: number;
    milestone: string;
    description: string;
    completed: boolean;
  }>;
  adaptiveAdjustments: Array<{
    date: string;
    reason: string;
    adjustment: string;
    impact: string;
  }>;
}

interface PersonalizedPlanCardProps {
  plan: PersonalizedPlan;
  onPress: () => void;
  onStartPlan?: () => void;
  showDetails?: boolean;
}

export function PersonalizedPlanCard({ 
  plan, 
  onPress, 
  onStartPlan, 
  showDetails = false 
}: PersonalizedPlanCardProps) {
  const completedTasks = plan.dailyTasks.filter(task => task.completed).length;
  const totalTasks = plan.dailyTasks.length;
  const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  
  const completedMilestones = plan.weeklyMilestones.filter(m => m.completed).length;
  const totalMilestones = plan.weeklyMilestones.length;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
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

  const getTaskTypeIcon = (type: string) => {
    switch (type) {
      case 'exercise':
        return '🏃';
      case 'nutrition':
        return '🥗';
      case 'mindfulness':
        return '🧘';
      case 'sleep':
        return '😴';
      case 'medication':
        return '💊';
      case 'check-in':
        return '📝';
      default:
        return '✨';
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{plan.name}</Text>
          <View style={styles.durationContainer}>
            <Calendar size={14} color={colors.textSecondary} />
            <Text style={styles.duration}>{plan.duration} days</Text>
          </View>
        </View>
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>{Math.round(progressPercentage)}%</Text>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${progressPercentage}%` }
              ]} 
            />
          </View>
        </View>
      </View>

      <Text style={styles.description}>{plan.description}</Text>

      <View style={styles.goalsContainer}>
        <Text style={styles.sectionTitle}>Goals</Text>
        {plan.goals.slice(0, showDetails ? plan.goals.length : 2).map((goal, index) => (
          <View key={index} style={styles.goalItem}>
            <Target size={14} color={colors.primary} />
            <Text style={styles.goalText}>{goal}</Text>
          </View>
        ))}
        {!showDetails && plan.goals.length > 2 && (
          <Text style={styles.moreText}>+{plan.goals.length - 2} more goals</Text>
        )}
      </View>

      {showDetails && (
        <>
          <View style={styles.tasksContainer}>
            <Text style={styles.sectionTitle}>Today's Tasks</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {plan.dailyTasks.map((task) => (
                <View key={task.id} style={styles.taskCard}>
                  <View style={styles.taskHeader}>
                    <Text style={styles.taskIcon}>{getTaskTypeIcon(task.type)}</Text>
                    {task.completed ? (
                      <CheckCircle size={16} color={colors.success} />
                    ) : (
                      <Circle size={16} color={colors.textSecondary} />
                    )}
                  </View>
                  <Text style={styles.taskName}>{task.name}</Text>
                  <View style={styles.taskMeta}>
                    <Clock size={12} color={colors.textSecondary} />
                    <Text style={styles.taskTime}>{task.estimatedTime}m</Text>
                    <View 
                      style={[
                        styles.priorityDot, 
                        { backgroundColor: getPriorityColor(task.priority) }
                      ]} 
                    />
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>

          <View style={styles.milestonesContainer}>
            <Text style={styles.sectionTitle}>Weekly Milestones</Text>
            <Text style={styles.milestoneProgress}>
              {completedMilestones} of {totalMilestones} completed
            </Text>
            {plan.weeklyMilestones.map((milestone) => (
              <View key={milestone.week} style={styles.milestoneItem}>
                {milestone.completed ? (
                  <CheckCircle size={16} color={colors.success} />
                ) : (
                  <Circle size={16} color={colors.textSecondary} />
                )}
                <View style={styles.milestoneContent}>
                  <Text style={styles.milestoneName}>
                    Week {milestone.week}: {milestone.milestone}
                  </Text>
                  <Text style={styles.milestoneDescription}>
                    {milestone.description}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          {plan.adaptiveAdjustments.length > 0 && (
            <View style={styles.adjustmentsContainer}>
              <Text style={styles.sectionTitle}>Recent Adjustments</Text>
              {plan.adaptiveAdjustments.slice(-2).map((adjustment, index) => (
                <View key={index} style={styles.adjustmentItem}>
                  <TrendingUp size={14} color={colors.primary} />
                  <View style={styles.adjustmentContent}>
                    <Text style={styles.adjustmentReason}>{adjustment.reason}</Text>
                    <Text style={styles.adjustmentChange}>{adjustment.adjustment}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}
        </>
      )}

      {onStartPlan && (
        <TouchableOpacity style={styles.startButton} onPress={onStartPlan}>
          <Text style={styles.startButtonText}>
            {progressPercentage > 0 ? 'Continue Plan' : 'Start Plan'}
          </Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  titleContainer: {
    flex: 1,
    marginRight: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  duration: {
    fontSize: 14,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  progressContainer: {
    alignItems: 'flex-end',
  },
  progressText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: 4,
  },
  progressBar: {
    width: 60,
    height: 4,
    backgroundColor: colors.border,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
  description: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 16,
  },
  goalsContainer: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  goalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  goalText: {
    fontSize: 14,
    color: colors.text,
    marginLeft: 8,
    flex: 1,
  },
  moreText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontStyle: 'italic',
    marginTop: 4,
  },
  tasksContainer: {
    marginBottom: 16,
  },
  taskCard: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 12,
    marginRight: 12,
    width: 120,
    borderWidth: 1,
    borderColor: colors.border,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  taskIcon: {
    fontSize: 20,
  },
  taskName: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
    lineHeight: 16,
  },
  taskMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskTime: {
    fontSize: 10,
    color: colors.textSecondary,
    marginLeft: 4,
    marginRight: 8,
  },
  priorityDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  milestonesContainer: {
    marginBottom: 16,
  },
  milestoneProgress: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 12,
  },
  milestoneItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  milestoneContent: {
    flex: 1,
    marginLeft: 12,
  },
  milestoneName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  milestoneDescription: {
    fontSize: 12,
    color: colors.textSecondary,
    lineHeight: 16,
  },
  adjustmentsContainer: {
    marginBottom: 16,
  },
  adjustmentItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
    backgroundColor: `${colors.primary}10`,
    padding: 12,
    borderRadius: 8,
  },
  adjustmentContent: {
    flex: 1,
    marginLeft: 8,
  },
  adjustmentReason: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  adjustmentChange: {
    fontSize: 11,
    color: colors.textSecondary,
    lineHeight: 14,
  },
  startButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  startButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.black,
  },
});