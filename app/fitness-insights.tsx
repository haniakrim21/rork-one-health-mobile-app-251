import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';
import { colors } from '@/constants/colors';
import { Card } from '@/components/Card';
import { ProgressBar } from '@/components/ProgressBar';
import { 
  TrendingUp, 
  Target, 
  Zap, 
  Activity,
  Clock,
  Award,
  Calendar,
  Dumbbell,
  Heart,
  CheckCircle2
} from 'lucide-react-native';

export default function FitnessInsightsScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('month');
  
  const fitnessData = {
    overall: {
      score: 82,
      trend: 'improving',
      change: '+8%',
    },
    metrics: [
      {
        name: 'Strength Progress',
        value: 85,
        change: '+12%',
        trend: 'improving',
        details: 'Bench press: +15lbs, Squat: +20lbs, Deadlift: +25lbs',
      },
      {
        name: 'Cardiovascular Fitness',
        value: 78,
        change: '+5%',
        trend: 'improving',
        details: 'VO2 max improved, Resting HR decreased by 3 bpm',
      },
      {
        name: 'Consistency',
        value: 90,
        change: '+15%',
        trend: 'improving',
        details: '18 workouts completed this month (goal: 16)',
      },
      {
        name: 'Recovery',
        value: 75,
        change: '-2%',
        trend: 'needs_attention',
        details: 'Sleep quality affecting recovery time',
      },
    ],
    workoutAnalysis: {
      totalWorkouts: 18,
      totalMinutes: 1080,
      avgDuration: 60,
      favoriteType: 'Strength Training',
      bestDay: 'Tuesday',
      peakTime: '7:00 AM',
    },
    achievements: [
      {
        title: 'Strength Milestone',
        description: 'Increased total lifting volume by 20%',
        date: '3 days ago',
        icon: Dumbbell,
      },
      {
        title: 'Consistency King',
        description: '4 weeks of perfect workout attendance',
        date: '1 week ago',
        icon: Calendar,
      },
      {
        title: 'Endurance Boost',
        description: 'Ran 5K under 25 minutes for first time',
        date: '2 weeks ago',
        icon: Heart,
      },
    ],
    recommendations: [
      {
        priority: 'high',
        title: 'Focus on Recovery',
        description: 'Add more rest days and improve sleep quality',
        action: 'Schedule recovery sessions',
      },
      {
        priority: 'medium',
        title: 'Increase Cardio',
        description: 'Add 2 cardio sessions per week for better endurance',
        action: 'Plan cardio workouts',
      },
      {
        priority: 'low',
        title: 'Progressive Overload',
        description: 'Gradually increase weights to continue strength gains',
        action: 'Update workout plan',
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
      <Stack.Screen options={{ title: 'Fitness Insights' }} />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Fitness Insights</Text>
        <Text style={styles.headerSubtitle}>
          Detailed analysis of your fitness progress
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
            <Target size={24} color={colors.primary} />
            <Text style={styles.overallTitle}>Fitness Score</Text>
            <View style={[styles.trendBadge, { backgroundColor: getTrendColor(fitnessData.overall.trend) + '20' }]}>
              <Text style={[styles.trendText, { color: getTrendColor(fitnessData.overall.trend) }]}>
                {fitnessData.overall.change}
              </Text>
            </View>
          </View>
          
          <View style={styles.scoreContainer}>
            <Text style={styles.scoreValue}>{fitnessData.overall.score}</Text>
            <Text style={styles.scoreLabel}>out of 100</Text>
          </View>
          
          <ProgressBar 
            progress={fitnessData.overall.score} 
            fillColor={colors.primary}
            style={styles.scoreProgress}
          />
          
          <Text style={styles.scoreDescription}>
            Your fitness score has improved by {fitnessData.overall.change} this {selectedPeriod}
          </Text>
        </Card>
        
        <Card style={styles.workoutAnalysisCard}>
          <Text style={styles.analysisTitle}>Workout Analysis</Text>
          <View style={styles.analysisGrid}>
            <View style={styles.analysisItem}>
              <Text style={styles.analysisValue}>{fitnessData.workoutAnalysis.totalWorkouts}</Text>
              <Text style={styles.analysisLabel}>Total Workouts</Text>
            </View>
            <View style={styles.analysisItem}>
              <Text style={styles.analysisValue}>{Math.round(fitnessData.workoutAnalysis.totalMinutes / 60)}h</Text>
              <Text style={styles.analysisLabel}>Total Time</Text>
            </View>
            <View style={styles.analysisItem}>
              <Text style={styles.analysisValue}>{fitnessData.workoutAnalysis.avgDuration}m</Text>
              <Text style={styles.analysisLabel}>Avg Duration</Text>
            </View>
          </View>
          
          <View style={styles.analysisDetails}>
            <View style={styles.analysisDetail}>
              <Text style={styles.analysisDetailLabel}>Favorite Type:</Text>
              <Text style={styles.analysisDetailValue}>{fitnessData.workoutAnalysis.favoriteType}</Text>
            </View>
            <View style={styles.analysisDetail}>
              <Text style={styles.analysisDetailLabel}>Best Day:</Text>
              <Text style={styles.analysisDetailValue}>{fitnessData.workoutAnalysis.bestDay}</Text>
            </View>
            <View style={styles.analysisDetail}>
              <Text style={styles.analysisDetailLabel}>Peak Time:</Text>
              <Text style={styles.analysisDetailValue}>{fitnessData.workoutAnalysis.peakTime}</Text>
            </View>
          </View>
        </Card>
        
        <View style={styles.metricsSection}>
          <Text style={styles.sectionTitle}>Performance Metrics</Text>
          {fitnessData.metrics.map((metric, index) => (
            <Card key={index} style={styles.metricCard}>
              <View style={styles.metricHeader}>
                <Text style={styles.metricName}>{metric.name}</Text>
                <View style={styles.metricScore}>
                  <TrendingUp size={16} color={getTrendColor(metric.trend)} />
                  <Text style={[styles.metricValue, { color: getTrendColor(metric.trend) }]}>
                    {metric.value}
                  </Text>
                  <Text style={[styles.metricChange, { color: getTrendColor(metric.trend) }]}>
                    {metric.change}
                  </Text>
                </View>
              </View>
              
              <ProgressBar 
                progress={metric.value} 
                fillColor={getTrendColor(metric.trend)}
                style={styles.metricProgress}
              />
              
              <Text style={styles.metricDetails}>{metric.details}</Text>
            </Card>
          ))}
        </View>
        
        <Card style={styles.recommendationsCard}>
          <Text style={styles.recommendationsTitle}>AI Recommendations</Text>
          {fitnessData.recommendations.map((rec, index) => (
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
          {fitnessData.achievements.map((achievement, index) => (
            <View key={index} style={styles.achievementItem}>
              <View style={styles.achievementIcon}>
                <achievement.icon size={20} color={colors.primary} />
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
            <Clock size={16} color={colors.primary} />
            <Text style={styles.tipText}>
              Your best performance is at 7 AM. Schedule important workouts during this time.
            </Text>
          </View>
          <View style={styles.tipItem}>
            <Zap size={16} color={colors.warning} />
            <Text style={styles.tipText}>
              Tuesday is your strongest day. Consider scheduling heavy lifting sessions then.
            </Text>
          </View>
          <View style={styles.tipItem}>
            <Activity size={16} color={colors.success} />
            <Text style={styles.tipText}>
              Your consistency is excellent. Maintain this momentum for continued progress.
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
  workoutAnalysisCard: {
    marginBottom: 16,
  },
  analysisTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  analysisGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  analysisItem: {
    alignItems: 'center',
  },
  analysisValue: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.primary,
  },
  analysisLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
  },
  analysisDetails: {
    
  },
  analysisDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  analysisDetailLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  analysisDetailValue: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  metricsSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  metricCard: {
    marginBottom: 12,
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  metricName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  metricScore: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metricValue: {
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 4,
  },
  metricChange: {
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
  },
  metricProgress: {
    marginBottom: 8,
  },
  metricDetails: {
    fontSize: 12,
    color: colors.textSecondary,
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
    backgroundColor: colors.primary + '20',
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