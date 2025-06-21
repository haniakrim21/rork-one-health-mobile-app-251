import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';
import { colors } from '@/constants/colors';
import { Card } from '@/components/Card';
import { ProgressBar } from '@/components/ProgressBar';
import { EnergyScoreCard } from '@/components/EnergyScoreCard';
import { 
  Zap, 
  TrendingUp, 
  Clock, 
  Moon,
  Utensils,
  Activity,
  Droplets,
  Heart,
  Target,
  CheckCircle2
} from 'lucide-react-native';

export default function EnergyInsightsScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month'>('week');
  
  const energyData = {
    currentScore: 78,
    trend: 'improving',
    change: '+12%',
    factors: {
      sleep: 82,
      nutrition: 75,
      exercise: 85,
      stress: 65,
      mood: 80,
      hydration: 90,
    },
    patterns: {
      peakTime: '10:00 AM',
      lowTime: '3:00 PM',
      bestDay: 'Tuesday',
      worstDay: 'Monday',
    },
    recommendations: [
      {
        factor: 'Sleep',
        suggestion: 'Maintain consistent bedtime to optimize energy levels',
        impact: 'High',
        icon: Moon,
      },
      {
        factor: 'Nutrition',
        suggestion: 'Add more complex carbs to sustain energy throughout the day',
        impact: 'Medium',
        icon: Utensils,
      },
      {
        factor: 'Hydration',
        suggestion: 'Great job! Keep up the excellent hydration habits',
        impact: 'Low',
        icon: Droplets,
      },
      {
        factor: 'Exercise',
        suggestion: 'Your workout routine is boosting energy levels effectively',
        impact: 'High',
        icon: Activity,
      },
    ],
    weeklyTrend: [
      { day: 'Mon', score: 65 },
      { day: 'Tue', score: 82 },
      { day: 'Wed', score: 78 },
      { day: 'Thu', score: 75 },
      { day: 'Fri', score: 80 },
      { day: 'Sat', score: 85 },
      { day: 'Sun', score: 72 },
    ],
  };
  
  const mockEnergyScore = {
    id: '1',
    date: new Date().toISOString().split('T')[0],
    score: energyData.currentScore,
    factors: energyData.factors,
    recommendations: energyData.recommendations.map(r => r.suggestion),
    trend: 'improving' as const,
  };
  
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High': return colors.error;
      case 'Medium': return colors.warning;
      case 'Low': return colors.success;
      default: return colors.textSecondary;
    }
  };
  
  const getFactorColor = (score: number) => {
    if (score >= 80) return colors.success;
    if (score >= 60) return colors.warning;
    return colors.error;
  };
  
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Energy Insights' }} />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Energy Insights</Text>
        <Text style={styles.headerSubtitle}>
          Understand what affects your energy levels
        </Text>
      </View>
      
      <View style={styles.periodSelector}>
        {(['week', 'month'] as const).map(period => (
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
        <EnergyScoreCard 
          score={mockEnergyScore}
          onPress={() => {}}
          style={styles.energyScoreCard}
        />
        
        <Card style={styles.patternsCard}>
          <Text style={styles.patternsTitle}>Energy Patterns</Text>
          <View style={styles.patternsGrid}>
            <View style={styles.patternItem}>
              <Clock size={20} color={colors.success} />
              <Text style={styles.patternLabel}>Peak Energy</Text>
              <Text style={styles.patternValue}>{energyData.patterns.peakTime}</Text>
            </View>
            <View style={styles.patternItem}>
              <Clock size={20} color={colors.warning} />
              <Text style={styles.patternLabel}>Low Energy</Text>
              <Text style={styles.patternValue}>{energyData.patterns.lowTime}</Text>
            </View>
            <View style={styles.patternItem}>
              <TrendingUp size={20} color={colors.primary} />
              <Text style={styles.patternLabel}>Best Day</Text>
              <Text style={styles.patternValue}>{energyData.patterns.bestDay}</Text>
            </View>
            <View style={styles.patternItem}>
              <Target size={20} color={colors.error} />
              <Text style={styles.patternLabel}>Focus Day</Text>
              <Text style={styles.patternValue}>{energyData.patterns.worstDay}</Text>
            </View>
          </View>
        </Card>
        
        <Card style={styles.factorsCard}>
          <Text style={styles.factorsTitle}>Energy Factors</Text>
          <Text style={styles.factorsSubtitle}>
            How different aspects of your lifestyle affect your energy
          </Text>
          
          {Object.entries(energyData.factors).map(([factor, score]) => (
            <View key={factor} style={styles.factorItem}>
              <View style={styles.factorHeader}>
                <Text style={styles.factorName}>
                  {factor.charAt(0).toUpperCase() + factor.slice(1)}
                </Text>
                <Text style={[styles.factorScore, { color: getFactorColor(score) }]}>
                  {score}%
                </Text>
              </View>
              <ProgressBar 
                progress={score} 
                fillColor={getFactorColor(score)}
                style={styles.factorProgress}
              />
            </View>
          ))}
        </Card>
        
        <Card style={styles.trendCard}>
          <Text style={styles.trendTitle}>Weekly Energy Trend</Text>
          <View style={styles.trendChart}>
            {energyData.weeklyTrend.map((day, index) => (
              <View key={index} style={styles.trendDay}>
                <View 
                  style={[
                    styles.trendBar, 
                    { 
                      height: (day.score / 100) * 80,
                      backgroundColor: getFactorColor(day.score)
                    }
                  ]} 
                />
                <Text style={styles.trendDayLabel}>{day.day}</Text>
                <Text style={styles.trendDayScore}>{day.score}</Text>
              </View>
            ))}
          </View>
        </Card>
        
        <Card style={styles.recommendationsCard}>
          <Text style={styles.recommendationsTitle}>Personalized Recommendations</Text>
          {energyData.recommendations.map((rec, index) => (
            <View key={index} style={styles.recommendationItem}>
              <View style={styles.recommendationHeader}>
                <View style={styles.recommendationIcon}>
                  <rec.icon size={20} color={colors.primary} />
                </View>
                <View style={styles.recommendationContent}>
                  <Text style={styles.recommendationFactor}>{rec.factor}</Text>
                  <View style={styles.recommendationImpact}>
                    <View style={[styles.impactIndicator, { backgroundColor: getImpactColor(rec.impact) }]} />
                    <Text style={[styles.impactText, { color: getImpactColor(rec.impact) }]}>
                      {rec.impact} Impact
                    </Text>
                  </View>
                </View>
              </View>
              <Text style={styles.recommendationText}>{rec.suggestion}</Text>
            </View>
          ))}
        </Card>
        
        <Card style={styles.tipsCard}>
          <Text style={styles.tipsTitle}>Energy Optimization Tips</Text>
          <View style={styles.tipItem}>
            <CheckCircle2 size={16} color={colors.success} />
            <Text style={styles.tipText}>
              Schedule important tasks during your peak energy time (10 AM)
            </Text>
          </View>
          <View style={styles.tipItem}>
            <CheckCircle2 size={16} color={colors.success} />
            <Text style={styles.tipText}>
              Take a short walk or do light exercise during your 3 PM energy dip
            </Text>
          </View>
          <View style={styles.tipItem}>
            <CheckCircle2 size={16} color={colors.success} />
            <Text style={styles.tipText}>
              Maintain consistent sleep and meal times to stabilize energy levels
            </Text>
          </View>
          <View style={styles.tipItem}>
            <CheckCircle2 size={16} color={colors.success} />
            <Text style={styles.tipText}>
              Use Tuesday's high energy for challenging workouts or important meetings
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
  energyScoreCard: {
    marginBottom: 16,
  },
  patternsCard: {
    marginBottom: 16,
  },
  patternsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  patternsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  patternItem: {
    width: '48%',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 16,
  },
  patternLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 8,
    marginBottom: 4,
  },
  patternValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  factorsCard: {
    marginBottom: 16,
  },
  factorsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  factorsSubtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 16,
  },
  factorItem: {
    marginBottom: 16,
  },
  factorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  factorName: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  factorScore: {
    fontSize: 14,
    fontWeight: '600',
  },
  factorProgress: {
    
  },
  trendCard: {
    marginBottom: 16,
  },
  trendTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  trendChart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 120,
    paddingHorizontal: 8,
  },
  trendDay: {
    alignItems: 'center',
    flex: 1,
  },
  trendBar: {
    width: 20,
    borderRadius: 10,
    marginBottom: 8,
  },
  trendDayLabel: {
    fontSize: 10,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  trendDayScore: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.text,
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
  recommendationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  recommendationContent: {
    flex: 1,
  },
  recommendationFactor: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  recommendationImpact: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  impactIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  impactText: {
    fontSize: 10,
    fontWeight: '500',
  },
  recommendationText: {
    fontSize: 12,
    color: colors.textSecondary,
    lineHeight: 16,
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