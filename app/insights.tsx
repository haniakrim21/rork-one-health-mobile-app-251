import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';
import { colors } from '@/constants/colors';
import { Card } from '@/components/Card';
import { ProgressBar } from '@/components/ProgressBar';
import { 
  TrendingUp, 
  Brain, 
  Heart, 
  Activity,
  Target,
  Calendar,
  Clock,
  Award,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react-native';

export default function InsightsScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('month');
  
  const healthInsights = {
    overall: {
      score: 78,
      trend: 'improving',
      change: '+5%',
    },
    categories: [
      {
        name: 'Cardiovascular Health',
        score: 85,
        trend: 'stable',
        insights: [
          'Heart rate variability is excellent',
          'Blood pressure trending downward',
          'Exercise consistency improved 15%',
        ],
      },
      {
        name: 'Mental Wellbeing',
        score: 72,
        trend: 'improving',
        insights: [
          'Stress levels decreased by 20%',
          'Sleep quality improved significantly',
          'Meditation streak: 12 days',
        ],
      },
      {
        name: 'Physical Fitness',
        score: 80,
        trend: 'improving',
        insights: [
          'Strength gains: 8% this month',
          'Flexibility improved in all areas',
          'Recovery time decreased by 15%',
        ],
      },
      {
        name: 'Nutrition',
        score: 65,
        trend: 'needs_attention',
        insights: [
          'Protein intake below target',
          'Hydration goals met 80% of days',
          'Vegetable servings increased',
        ],
      },
    ],
    recommendations: [
      {
        priority: 'high',
        title: 'Increase Protein Intake',
        description: 'Add 20g more protein daily to support muscle recovery',
        action: 'Track protein in meals',
      },
      {
        priority: 'medium',
        title: 'Optimize Sleep Schedule',
        description: 'Maintain consistent bedtime to improve recovery',
        action: 'Set bedtime reminder',
      },
      {
        priority: 'low',
        title: 'Add Flexibility Training',
        description: 'Include 10 minutes of stretching after workouts',
        action: 'Schedule flexibility sessions',
      },
    ],
    achievements: [
      {
        title: 'Consistency Champion',
        description: 'Logged health data for 30 consecutive days',
        date: '2 days ago',
        icon: Award,
      },
      {
        title: 'Heart Health Hero',
        description: 'Maintained target heart rate zone for 150+ minutes',
        date: '1 week ago',
        icon: Heart,
      },
      {
        title: 'Mindfulness Master',
        description: 'Completed 10 meditation sessions',
        date: '2 weeks ago',
        icon: Brain,
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
      case 'stable': return Activity;
      case 'needs_attention': return AlertTriangle;
      case 'declining': return TrendingUp; // Would be TrendingDown if available
      default: return Activity;
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
      <Stack.Screen options={{ title: 'Health Insights' }} />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Health Insights</Text>
        <Text style={styles.headerSubtitle}>
          AI-powered analysis of your health data
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
            <Brain size={24} color={colors.primary} />
            <Text style={styles.overallTitle}>Overall Health Score</Text>
            <View style={[styles.trendBadge, { backgroundColor: getTrendColor(healthInsights.overall.trend) + '20' }]}>
              <Text style={[styles.trendText, { color: getTrendColor(healthInsights.overall.trend) }]}>
                {healthInsights.overall.change}
              </Text>
            </View>
          </View>
          
          <View style={styles.scoreContainer}>
            <Text style={styles.scoreValue}>{healthInsights.overall.score}</Text>
            <Text style={styles.scoreLabel}>out of 100</Text>
          </View>
          
          <ProgressBar 
            progress={healthInsights.overall.score} 
            fillColor={colors.primary}
            style={styles.scoreProgress}
          />
          
          <Text style={styles.scoreDescription}>
            Your health score has improved by {healthInsights.overall.change} this {selectedPeriod}
          </Text>
        </Card>
        
        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Health Categories</Text>
          {healthInsights.categories.map((category, index) => {
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
          <Text style={styles.recommendationsTitle}>AI Recommendations</Text>
          {healthInsights.recommendations.map((rec, index) => (
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
          {healthInsights.achievements.map((achievement, index) => (
            <View key={index} style={styles.achievementItem}>
              <View style={styles.achievementIcon}>
                <achievement.icon size={20} color={colors.warning} />
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
          <Text style={styles.tipsTitle}>Personalized Tips</Text>
          <View style={styles.tipItem}>
            <Target size={16} color={colors.primary} />
            <Text style={styles.tipText}>
              Your most active time is 7-9 AM. Schedule important workouts during this window.
            </Text>
          </View>
          <View style={styles.tipItem}>
            <Clock size={16} color={colors.success} />
            <Text style={styles.tipText}>
              You sleep best when you go to bed before 10:30 PM. Try to maintain this schedule.
            </Text>
          </View>
          <View style={styles.tipItem}>
            <Heart size={16} color={colors.warning} />
            <Text style={styles.tipText}>
              Your stress levels are lowest on weekends. Consider stress management techniques for weekdays.
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
    marginBottom: 24,
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
    color: colors.primary,
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
  categoriesSection: {
    marginBottom: 24,
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
    marginBottom: 24,
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
    backgroundColor: colors.primary + '20',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  actionButtonText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '500',
  },
  achievementsCard: {
    marginBottom: 24,
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
    backgroundColor: colors.warning + '20',
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