import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';
import { colors } from '@/constants/colors';
import { Card } from '@/components/Card';
import { ProgressBar } from '@/components/ProgressBar';
import { 
  Heart, 
  Brain, 
  Smile, 
  Target,
  TrendingUp,
  Calendar,
  Award,
  Zap,
  Moon,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react-native';

export default function WellnessInsightsScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('month');
  
  const wellnessData = {
    overall: {
      score: 82,
      trend: 'improving',
      change: '+6%',
    },
    categories: [
      {
        name: 'Mental Wellbeing',
        score: 85,
        trend: 'improving',
        insights: [
          'Mood stability improved by 15%',
          'Stress levels decreased significantly',
          'Mindfulness practice showing benefits',
        ],
      },
      {
        name: 'Emotional Health',
        score: 78,
        trend: 'stable',
        insights: [
          'Emotional regulation skills developing',
          'Positive emotions increased',
          'Anxiety levels well-managed',
        ],
      },
      {
        name: 'Sleep Quality',
        score: 80,
        trend: 'improving',
        insights: [
          'Sleep duration more consistent',
          'Deep sleep percentage increased',
          'Wake-up feeling refreshed 80% of time',
        ],
      },
      {
        name: 'Life Balance',
        score: 75,
        trend: 'needs_attention',
        insights: [
          'Work-life balance needs improvement',
          'Social connections could be stronger',
          'Leisure time decreased this month',
        ],
      },
    ],
    habits: {
      meditation: { streak: 12, target: 30, completion: 40 },
      gratitude: { streak: 8, target: 30, completion: 27 },
      exercise: { streak: 5, target: 20, completion: 25 },
      sleep: { streak: 15, target: 30, completion: 50 },
    },
    achievements: [
      {
        title: 'Mindfulness Master',
        description: 'Completed 30 meditation sessions',
        date: '2 days ago',
        icon: Brain,
      },
      {
        title: 'Mood Booster',
        description: 'Maintained positive mood for 7 consecutive days',
        date: '1 week ago',
        icon: Smile,
      },
      {
        title: 'Sleep Champion',
        description: 'Achieved sleep goal 20 nights in a row',
        date: '2 weeks ago',
        icon: Moon,
      },
    ],
    recommendations: [
      {
        priority: 'high',
        title: 'Improve Work-Life Balance',
        description: 'Set boundaries and schedule more personal time',
        action: 'Create time blocks for personal activities',
      },
      {
        priority: 'medium',
        title: 'Strengthen Social Connections',
        description: 'Reach out to friends and family more regularly',
        action: 'Schedule weekly social activities',
      },
      {
        priority: 'low',
        title: 'Continue Meditation Practice',
        description: 'Your mindfulness practice is showing great results',
        action: 'Maintain current meditation routine',
      },
    ],
  };
  
  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'improving': return colors.success;
      case 'stable': return colors.primary;
      case 'needs_attention': return colors.warning;
      case 'declining': return colors.error;
      default: return colors.textSecondary;
    }
  };
  
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving': return TrendingUp;
      case 'stable': return Target;
      case 'needs_attention': return AlertTriangle;
      case 'declining': return TrendingUp; // Would be TrendingDown if available
      default: return Target;
    }
  };
  
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return colors.error;
      case 'medium': return colors.warning;
      case 'low': return colors.success;
      default: return colors.textSecondary;
    }
  };
  
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Wellness Insights' }} />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Wellness Insights</Text>
        <Text style={styles.headerSubtitle}>
          Comprehensive analysis of your mental and emotional wellbeing
        </Text>
      </View>
      
      <View style={styles.periodSelector}>
        {(['week', 'month', 'year'] as const).map(period => (
          <TouchableOpacity
            key={period}
            style={[
              styles.periodButton,
              selectedPeriod === period && styles.selectedPeriod
            ]}
            onPress={() => setSelectedPeriod(period)}
          >
            <Text style={[
              styles.periodText,
              selectedPeriod === period && styles.selectedPeriodText
            ]}>
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <Card style={styles.overallCard}>
          <View style={styles.overallHeader}>
            <Heart size={24} color={colors.wellness} />
            <Text style={styles.overallTitle}>Overall Wellness Score</Text>
            <View style={[styles.trendBadge, { backgroundColor: getTrendColor(wellnessData.overall.trend) + '20' }]}>
              <Text style={[styles.trendText, { color: getTrendColor(wellnessData.overall.trend) }]}>
                {wellnessData.overall.change}
              </Text>
            </View>
          </View>
          
          <View style={styles.scoreContainer}>
            <Text style={styles.scoreValue}>{wellnessData.overall.score}</Text>
            <Text style={styles.scoreLabel}>out of 100</Text>
          </View>
          
          <ProgressBar 
            progress={wellnessData.overall.score} 
            fillColor={colors.wellness}
            style={styles.scoreProgress}
          />
          
          <Text style={styles.scoreDescription}>
            Your wellness score has improved by {wellnessData.overall.change} this {selectedPeriod}
          </Text>
        </Card>
        
        <Card style={styles.habitsCard}>
          <Text style={styles.habitsTitle}>Wellness Habits Progress</Text>
          {Object.entries(wellnessData.habits).map(([habit, data]) => (
            <View key={habit} style={styles.habitItem}>
              <View style={styles.habitHeader}>
                <Text style={styles.habitName}>
                  {habit.charAt(0).toUpperCase() + habit.slice(1)}
                </Text>
                <Text style={styles.habitStreak}>{data.streak} day streak</Text>
              </View>
              <View style={styles.habitProgress}>
                <ProgressBar 
                  progress={(data.completion / data.target) * 100} 
                  fillColor={colors.wellness}
                  style={styles.habitProgressBar}
                />
                <Text style={styles.habitCompletion}>
                  {data.completion}/{data.target} days
                </Text>
              </View>
            </View>
          ))}
        </Card>
        
        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Wellness Categories</Text>
          {wellnessData.categories.map((category, index) => {
            const TrendIcon = getTrendIcon(category.trend);
            return (
              <Card key={index} style={styles.categoryCard}>
                <View style={styles.categoryHeader}>
                  <Text style={styles.categoryName}>{category.name}</Text>
                  <View style={styles.categoryScore}>
                    <TrendIcon size={16} color={getTrendColor(category.trend)} />
                    <Text style={[styles.categoryScoreText, { color: getTrendColor(category.trend) }]}>
                      {category.score}
                    </Text>
                  </View>
                </View>
                
                <ProgressBar 
                  progress={category.score} 
                  fillColor={getTrendColor(category.trend)}
                  style={styles.categoryProgress}
                />
                
                <View style={styles.categoryInsights}>
                  {category.insights.map((insight, insightIndex) => (
                    <View key={insightIndex} style={styles.insightItem}>
                      <CheckCircle2 size={12} color={colors.success} />
                      <Text style={styles.insightText}>{insight}</Text>
                    </View>
                  ))}
                </View>
              </Card>
            );
          })}
        </View>
        
        <Card style={styles.recommendationsCard}>
          <Text style={styles.recommendationsTitle}>Personalized Recommendations</Text>
          {wellnessData.recommendations.map((rec, index) => (
            <View key={index} style={styles.recommendationItem}>
              <View style={styles.recommendationHeader}>
                <View style={[styles.priorityIndicator, { backgroundColor: getPriorityColor(rec.priority) }]} />
                <Text style={styles.recommendationTitle}>{rec.title}</Text>
              </View>
              <Text style={styles.recommendationDescription}>{rec.description}</Text>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionButtonText}>{rec.action}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </Card>
        
        <Card style={styles.achievementsCard}>
          <Text style={styles.achievementsTitle}>Recent Achievements</Text>
          {wellnessData.achievements.map((achievement, index) => (
            <View key={index} style={styles.achievementItem}>
              <View style={styles.achievementIcon}>
                <achievement.icon size={20} color={colors.wellness} />
              </View>
              <View style={styles.achievementContent}>
                <Text style={styles.achievementTitle}>{achievement.title}</Text>
                <Text style={styles.achievementDescription}>{achievement.description}</Text>
                <Text style={styles.achievementDate}>{achievement.date}</Text>
              </View>
            </View>
          ))}
        </Card>
        
        <Card style={styles.tipsCard}>
          <Text style={styles.tipsTitle}>Wellness Tips</Text>
          <View style={styles.tipItem}>
            <Brain size={16} color={colors.primary} />
            <Text style={styles.tipText}>
              Your meditation practice is showing excellent results. Consider extending sessions by 5 minutes.
            </Text>
          </View>
          <View style={styles.tipItem}>
            <Smile size={16} color={colors.success} />
            <Text style={styles.tipText}>
              Gratitude journaling is boosting your mood. Try adding specific details to entries.
            </Text>
          </View>
          <View style={styles.tipItem}>
            <Moon size={16} color={colors.info} />
            <Text style={styles.tipText}>
              Your sleep consistency is improving overall wellness. Maintain your bedtime routine.
            </Text>
          </View>
          <View style={styles.tipItem}>
            <Zap size={16} color={colors.warning} />
            <Text style={styles.tipText}>
              Consider scheduling regular breaks during work to maintain energy and focus.
            </Text>
          </View>
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingTop: 60,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  periodSelector: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 8,
  },
  periodButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: colors.cardBackground,
  },
  selectedPeriod: {
    backgroundColor: colors.primary,
  },
  periodText: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  selectedPeriodText: {
    color: colors.black,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  overallCard: {
    marginBottom: 16,
  },
  overallHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  overallTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 8,
    flex: 1,
  },
  trendBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  trendText: {
    fontSize: 12,
    fontWeight: '600',
  },
  scoreContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  scoreValue: {
    fontSize: 48,
    fontWeight: '700',
    color: colors.wellness,
  },
  scoreLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },
  scoreProgress: {
    marginBottom: 8,
  },
  scoreDescription: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  habitsCard: {
    marginBottom: 16,
  },
  habitsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  habitItem: {
    marginBottom: 16,
  },
  habitHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  habitName: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  habitStreak: {
    fontSize: 12,
    color: colors.wellness,
    fontWeight: '500',
  },
  habitProgress: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  habitProgressBar: {
    flex: 1,
    marginRight: 12,
  },
  habitCompletion: {
    fontSize: 12,
    color: colors.textSecondary,
    width: 50,
  },
  categoriesSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  categoryCard: {
    marginBottom: 12,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  categoryScore: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryScoreText: {
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 4,
  },
  categoryProgress: {
    marginBottom: 12,
  },
  categoryInsights: {
    
  },
  insightItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  insightText: {
    fontSize: 12,
    color: colors.text,
    marginLeft: 8,
    flex: 1,
  },
  recommendationsCard: {
    marginBottom: 16,
  },
  recommendationsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  recommendationItem: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  recommendationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  priorityIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  recommendationTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  recommendationDescription: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 8,
    lineHeight: 16,
  },
  actionButton: {
    alignSelf: 'flex-start',
    backgroundColor: colors.wellness + '20',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  actionButtonText: {
    fontSize: 12,
    color: colors.wellness,
    fontWeight: '500',
  },
  achievementsCard: {
    marginBottom: 16,
  },
  achievementsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  achievementIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.wellness + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  achievementDescription: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
    lineHeight: 16,
  },
  achievementDate: {
    fontSize: 10,
    color: colors.textSecondary,
  },
  tipsCard: {
    
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  tipText: {
    fontSize: 12,
    color: colors.text,
    marginLeft: 8,
    flex: 1,
    lineHeight: 16,
  },
});