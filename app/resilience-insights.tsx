import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';
import { colors } from '@/constants/colors';
import { Card } from '@/components/Card';
import { ProgressBar } from '@/components/ProgressBar';
import { ResilienceScoreCard } from '@/components/ResilienceScoreCard';
import { 
  Shield, 
  Heart, 
  Brain, 
  Users,
  Zap,
  Target,
  TrendingUp,
  CheckCircle2,
  Star,
  Award
} from 'lucide-react-native';

export default function ResilienceInsightsScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month'>('month');
  
  const resilienceData = {
    currentScore: 78,
    trend: 'improving',
    change: '+8%',
    components: {
      emotional: 8,
      cognitive: 7,
      physical: 8,
      social: 7,
      spiritual: 8,
    },
    strengths: [
      'Strong emotional regulation during stress',
      'Excellent physical recovery capabilities',
      'High spiritual awareness and purpose',
    ],
    areasForGrowth: [
      'Building stronger social support networks',
      'Developing cognitive flexibility skills',
      'Improving problem-solving strategies',
    ],
    recommendations: [
      {
        component: 'Social',
        suggestion: 'Join a community group or strengthen existing relationships',
        impact: 'High',
        icon: Users,
      },
      {
        component: 'Cognitive',
        suggestion: 'Practice mindfulness to improve mental flexibility',
        impact: 'Medium',
        icon: Brain,
      },
      {
        component: 'Emotional',
        suggestion: 'Continue your excellent emotional regulation practices',
        impact: 'Low',
        icon: Heart,
      },
      {
        component: 'Physical',
        suggestion: 'Maintain your strong physical resilience habits',
        impact: 'Low',
        icon: Zap,
      },
    ],
    milestones: [
      {
        title: 'Stress Master',
        description: 'Successfully managed high-stress period without burnout',
        date: '1 week ago',
        icon: Shield,
      },
      {
        title: 'Recovery Champion',
        description: 'Bounced back from setback faster than average',
        date: '2 weeks ago',
        icon: TrendingUp,
      },
      {
        title: 'Mindfulness Streak',
        description: 'Maintained daily mindfulness practice for 30 days',
        date: '1 month ago',
        icon: Brain,
      },
    ],
  };
  
  const mockResilienceScore = {
    id: '1',
    date: new Date().toISOString().split('T')[0],
    score: resilienceData.currentScore,
    components: resilienceData.components,
    strengths: resilienceData.strengths,
    areasForGrowth: resilienceData.areasForGrowth,
    recommendations: resilienceData.recommendations.map(r => r.suggestion),
    trend: 'improving' as const,
  };
  
  const getComponentColor = (score: number) => {
    if (score >= 8) return colors.success;
    if (score >= 6) return colors.warning;
    return colors.error;
  };
  
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High': return colors.error;
      case 'Medium': return colors.warning;
      case 'Low': return colors.success;
      default: return colors.textSecondary;
    }
  };
  
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Resilience Insights' }} />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Resilience Insights</Text>
        <Text style={styles.headerSubtitle}>
          Build your capacity to bounce back from challenges
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
        <ResilienceScoreCard 
          score={mockResilienceScore}
          onPress={() => {}}
          style={styles.resilienceScoreCard}
        />
        
        <Card style={styles.componentsCard}>
          <Text style={styles.componentsTitle}>Resilience Components</Text>
          <Text style={styles.componentsSubtitle}>
            The five pillars of psychological resilience
          </Text>
          
          {Object.entries(resilienceData.components).map(([component, score]) => (
            <View key={component} style={styles.componentItem}>
              <View style={styles.componentHeader}>
                <Text style={styles.componentName}>
                  {component.charAt(0).toUpperCase() + component.slice(1)}
                </Text>
                <View style={styles.componentScore}>
                  <Text style={[styles.componentScoreText, { color: getComponentColor(score) }]}>
                    {score}/10
                  </Text>
                  <View style={styles.componentStars}>
                    {[...Array(5)].map((_, index) => (
                      <Star 
                        key={index}
                        size={12} 
                        color={index < Math.floor(score / 2) ? colors.warning : colors.border}
                        fill={index < Math.floor(score / 2) ? colors.warning : 'transparent'}
                      />
                    ))}
                  </View>
                </View>
              </View>
              <ProgressBar 
                progress={score * 10} 
                fillColor={getComponentColor(score)}
                style={styles.componentProgress}
              />
            </View>
          ))}
        </Card>
        
        <Card style={styles.strengthsCard}>
          <Text style={styles.strengthsTitle}>Your Strengths</Text>
          {resilienceData.strengths.map((strength, index) => (
            <View key={index} style={styles.strengthItem}>
              <CheckCircle2 size={16} color={colors.success} />
              <Text style={styles.strengthText}>{strength}</Text>
            </View>
          ))}
        </Card>
        
        <Card style={styles.growthCard}>
          <Text style={styles.growthTitle}>Areas for Growth</Text>
          {resilienceData.areasForGrowth.map((area, index) => (
            <View key={index} style={styles.growthItem}>
              <Target size={16} color={colors.primary} />
              <Text style={styles.growthText}>{area}</Text>
            </View>
          ))}
        </Card>
        
        <Card style={styles.recommendationsCard}>
          <Text style={styles.recommendationsTitle}>Personalized Action Plan</Text>
          {resilienceData.recommendations.map((rec, index) => (
            <View key={index} style={styles.recommendationItem}>
              <View style={styles.recommendationHeader}>
                <View style={styles.recommendationIcon}>
                  <rec.icon size={20} color={colors.primary} />
                </View>
                <View style={styles.recommendationContent}>
                  <Text style={styles.recommendationComponent}>{rec.component} Resilience</Text>
                  <View style={styles.recommendationImpact}>
                    <View style={[styles.impactIndicator, { backgroundColor: getImpactColor(rec.impact) }]} />
                    <Text style={[styles.impactText, { color: getImpactColor(rec.impact) }]}>
                      {rec.impact} Priority
                    </Text>
                  </View>
                </View>
              </View>
              <Text style={styles.recommendationText}>{rec.suggestion}</Text>
            </View>
          ))}
        </Card>
        
        <Card style={styles.milestonesCard}>
          <Text style={styles.milestonesTitle}>Recent Milestones</Text>
          {resilienceData.milestones.map((milestone, index) => (
            <View key={index} style={styles.milestoneItem}>
              <View style={styles.milestoneIcon}>
                <milestone.icon size={20} color={colors.warning} />
              </View>
              <View style={styles.milestoneContent}>
                <Text style={styles.milestoneTitle}>{milestone.title}</Text>
                <Text style={styles.milestoneDescription}>{milestone.description}</Text>
                <Text style={styles.milestoneDate}>{milestone.date}</Text>
              </View>
            </View>
          ))}
        </Card>
        
        <Card style={styles.tipsCard}>
          <Text style={styles.tipsTitle}>Building Resilience</Text>
          <View style={styles.tipItem}>
            <Shield size={16} color={colors.primary} />
            <Text style={styles.tipText}>
              Practice self-compassion during difficult times - treat yourself with kindness
            </Text>
          </View>
          <View style={styles.tipItem}>
            <Users size={16} color={colors.success} />
            <Text style={styles.tipText}>
              Cultivate meaningful relationships - social support is crucial for resilience
            </Text>
          </View>
          <View style={styles.tipItem}>
            <Brain size={16} color={colors.warning} />
            <Text style={styles.tipText}>
              Develop a growth mindset - view challenges as opportunities to learn
            </Text>
          </View>
          <View style={styles.tipItem}>
            <Heart size={16} color={colors.error} />
            <Text style={styles.tipText}>
              Practice emotional regulation techniques like deep breathing and mindfulness
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
  resilienceScoreCard: {
    marginBottom: 16,
  },
  componentsCard: {
    marginBottom: 16,
  },
  componentsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  componentsSubtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 16,
  },
  componentItem: {
    marginBottom: 16,
  },
  componentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  componentName: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  componentScore: {
    alignItems: 'flex-end',
  },
  componentScoreText: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  componentStars: {
    flexDirection: 'row',
    gap: 2,
  },
  componentProgress: {
    
  },
  strengthsCard: {
    marginBottom: 16,
  },
  strengthsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  strengthItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  strengthText: {
    fontSize: 14,
    color: colors.text,
    marginLeft: 8,
    flex: 1,
    lineHeight: 18,
  },
  growthCard: {
    marginBottom: 16,
  },
  growthTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  growthItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  growthText: {
    fontSize: 14,
    color: colors.text,
    marginLeft: 8,
    flex: 1,
    lineHeight: 18,
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
  recommendationComponent: {
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
  milestonesCard: {
    marginBottom: 16,
  },
  milestonesTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  milestoneItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  milestoneIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.warning + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  milestoneContent: {
    flex: 1,
  },
  milestoneTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  milestoneDescription: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
    lineHeight: 16,
  },
  milestoneDate: {
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