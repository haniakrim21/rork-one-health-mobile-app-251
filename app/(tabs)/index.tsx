import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, I18nManager } from 'react-native';
import { router } from 'expo-router';
import { colors } from '@/constants/colors';
import { useUserStore } from '@/store/user-store';
import { useHealthStore } from '@/store/health-store';
import { useFitnessStore } from '@/store/fitness-store';
import { useWellnessStore } from '@/store/wellness-store';
import { useSettingsStore } from '@/store/settings-store';
import { getTranslation, isRTL } from '@/constants/languages';
import { Card } from '@/components/Card';
import { MetricCard } from '@/components/MetricCard';
import { ActivityWidget } from '@/components/ActivityWidget';
import { GoalCard } from '@/components/GoalCard';
import { TrendData, PersonalizedGoal } from '@/types';
import { 
  Heart, 
  Activity, 
  Brain, 
  Target, 
  Calendar, 
  Bell,
  ArrowRight,
  Footprints,
  Flame,
  MapPin,
  Clock,
  Zap,
  Sun,
  Moon
} from 'lucide-react-native';

export default function HomeScreen() {
  const { user } = useUserStore();
  const { healthMetrics = [] } = useHealthStore();
  const { workouts = [] } = useFitnessStore();
  const { moodEntries = [] } = useWellnessStore();
  const { settings } = useSettingsStore();
  
  const t = (key: string) => getTranslation(settings.language, key);
  const isRTLLayout = isRTL(settings.language);
  
  // Set RTL layout
  React.useEffect(() => {
    I18nManager.allowRTL(true);
    I18nManager.forceRTL(isRTLLayout);
  }, [isRTLLayout]);
  
  const todaysGoals = (user?.goals || []).filter((goal: PersonalizedGoal) => !goal.completed).slice(0, 3);
  const recentHealthMetrics = healthMetrics.slice(0, 4);
  const upcomingWorkouts = workouts.filter(w => !w.completed).slice(0, 2);
  const recentMoodEntry = moodEntries[0];
  
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return t('goodMorning');
    if (hour < 17) return t('goodAfternoon');
    return t('goodEvening');
  };
  
  const quickMetricsData = [
    { 
      title: t('heartRate'), 
      value: '72', 
      unit: t('bpm'), 
      trend: { value: 2, isPositive: true } as TrendData, 
      color: colors.health,
      icon: Heart
    },
    { 
      title: t('steps'), 
      value: '8,432', 
      unit: t('today'), 
      trend: { value: 1200, isPositive: true } as TrendData, 
      color: colors.fitness,
      icon: Footprints
    },
    { 
      title: t('sleep'), 
      value: '7h 32m', 
      unit: t('lastNight'), 
      trend: { value: 0.5, isPositive: true } as TrendData, 
      color: colors.info,
      icon: Moon
    },
    { 
      title: t('energy'), 
      value: '85%', 
      unit: t('today'), 
      trend: { value: 1, isPositive: true } as TrendData, 
      color: colors.warning,
      icon: Zap
    },
  ];
  
  const activityData = [
    {
      title: t('steps'),
      value: '8,432',
      target: '10,000',
      type: 'steps' as const,
      progress: 84,
      icon: Footprints,
      color: colors.fitness,
    },
    {
      title: t('calories'),
      value: '2,450',
      target: '2,800',
      type: 'calories' as const,
      progress: 88,
      icon: Flame,
      color: colors.warning,
    },
    {
      title: t('distance'),
      value: `6.2 ${t('km')}`,
      target: `8.0 ${t('km')}`,
      type: 'distance' as const,
      progress: 78,
      icon: MapPin,
      color: colors.info,
    },
    {
      title: t('activeTime'),
      value: `45 ${t('min')}`,
      target: `60 ${t('min')}`,
      type: 'active-time' as const,
      progress: 75,
      icon: Clock,
      color: colors.secondary,
    },
  ];
  
  return (
    <View style={styles.container}>
      {/* Modern Header */}
      <View style={[styles.header, isRTLLayout && styles.headerRTL]}>
        <View style={styles.headerContent}>
          <View style={styles.greetingContainer}>
            <Text style={[styles.greeting, isRTLLayout && styles.textRTL]}>{getGreeting()}</Text>
            <Text style={[styles.userName, isRTLLayout && styles.textRTL]}>{user?.name || t('user')}</Text>
          </View>
          <TouchableOpacity 
            style={styles.notificationButton}
            onPress={() => router.push('/notifications')}
          >
            <Bell size={22} color={colors.text} />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
        </View>
        
        {/* Weather-like status bar */}
        <View style={styles.statusBar}>
          <View style={styles.statusItem}>
            <Sun size={16} color={colors.warning} />
            <Text style={[styles.statusText, isRTLLayout && styles.textRTL]}>{t('sunny')}, 24°C</Text>
          </View>
          <View style={styles.statusDivider} />
          <View style={styles.statusItem}>
            <Target size={16} color={colors.primary} />
            <Text style={[styles.statusText, isRTLLayout && styles.textRTL]}>3 {t('activeGoals').toLowerCase()}</Text>
          </View>
        </View>
      </View>
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Hero Metrics */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, isRTLLayout && styles.textRTL]}>{t('todaysOverview')}</Text>
          <View style={styles.heroMetrics}>
            {quickMetricsData.map((metric, index) => (
              <Card
                key={index}
                variant="elevated"
                style={styles.heroMetricCard}
                onPress={() => router.push('/(tabs)/health')}
              >
                <View style={styles.heroMetricContent}>
                  <View style={[styles.heroMetricIcon, { backgroundColor: `${metric.color}20` }]}>
                    <metric.icon size={24} color={metric.color} />
                  </View>
                  <View style={styles.heroMetricText}>
                    <Text style={[styles.heroMetricValue, isRTLLayout && styles.textRTL]}>{metric.value}</Text>
                    <Text style={[styles.heroMetricLabel, isRTLLayout && styles.textRTL]}>{metric.title}</Text>
                    <Text style={[styles.heroMetricUnit, isRTLLayout && styles.textRTL]}>{metric.unit}</Text>
                  </View>
                  <View style={styles.heroMetricTrend}>
                    <Text style={[
                      styles.trendText,
                      { color: metric.trend.isPositive ? colors.success : colors.error }
                    ]}>
                      {metric.trend.isPositive ? '+' : '-'}{metric.trend.value}
                    </Text>
                  </View>
                </View>
              </Card>
            ))}
          </View>
        </View>
        
        {/* Activity Ring */}
        <View style={styles.section}>
          <View style={[styles.sectionHeader, isRTLLayout && styles.sectionHeaderRTL]}>
            <Text style={[styles.sectionTitle, isRTLLayout && styles.textRTL]}>{t('activityRings')}</Text>
            <TouchableOpacity onPress={() => router.push('/activities')}>
              <Text style={[styles.seeAllText, isRTLLayout && styles.textRTL]}>{t('viewDetails')}</Text>
            </TouchableOpacity>
          </View>
          
          <Card variant="elevated" style={styles.activityRingCard}>
            <View style={styles.activityRingContainer}>
              <View style={styles.activityRings}>
                {/* This would be a custom ring component in a real app */}
                <View style={styles.ringPlaceholder}>
                  <Text style={[styles.ringText, isRTLLayout && styles.textRTL]}>{t('activityRings')}</Text>
                  <Text style={[styles.ringSubtext, isRTLLayout && styles.textRTL]}>{t('closeYourRings')}</Text>
                </View>
              </View>
              <View style={styles.activityStats}>
                {activityData.map((activity, index) => (
                  <View key={index} style={styles.activityStatItem}>
                    <View style={[styles.activityStatIcon, { backgroundColor: `${activity.color}20` }]}>
                      <activity.icon size={16} color={activity.color} />
                    </View>
                    <View style={styles.activityStatText}>
                      <Text style={[styles.activityStatValue, isRTLLayout && styles.textRTL]}>{activity.value}</Text>
                      <Text style={[styles.activityStatLabel, isRTLLayout && styles.textRTL]}>{activity.title}</Text>
                    </View>
                    <Text style={styles.activityStatProgress}>{activity.progress}%</Text>
                  </View>
                ))}
              </View>
            </View>
          </Card>
        </View>
        
        {/* Active Goals */}
        <View style={styles.section}>
          <View style={[styles.sectionHeader, isRTLLayout && styles.sectionHeaderRTL]}>
            <Text style={[styles.sectionTitle, isRTLLayout && styles.textRTL]}>{t('activeGoals')}</Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)/profile')}>
              <Text style={[styles.seeAllText, isRTLLayout && styles.textRTL]}>{t('manage')}</Text>
            </TouchableOpacity>
          </View>
          
          {todaysGoals.length > 0 ? (
            <View style={styles.goalsContainer}>
              {todaysGoals.map((goal: PersonalizedGoal) => (
                <GoalCard
                  key={goal.id}
                  goal={goal}
                  onPress={() => router.push('/(tabs)/profile')}
                />
              ))}
            </View>
          ) : (
            <Card variant="outlined" style={styles.emptyCard}>
              <View style={styles.emptyContent}>
                <View style={styles.emptyIcon}>
                  <Target size={32} color={colors.textSecondary} />
                </View>
                <Text style={[styles.emptyTitle, isRTLLayout && styles.textRTL]}>{t('noActiveGoals')}</Text>
                <Text style={[styles.emptyDescription, isRTLLayout && styles.textRTL]}>
                  {t('setFirstGoal')}
                </Text>
                <TouchableOpacity 
                  style={styles.createGoalButton}
                  onPress={() => router.push('/(tabs)/profile')}
                >
                  <Text style={styles.createGoalText}>{t('createGoal')}</Text>
                  <ArrowRight size={16} color={colors.black} />
                </TouchableOpacity>
              </View>
            </Card>
          )}
        </View>
        
        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, isRTLLayout && styles.textRTL]}>{t('quickActions')}</Text>
          <View style={styles.quickActionsGrid}>
            <TouchableOpacity 
              style={[styles.quickActionCard, { backgroundColor: `${colors.health}15` }]}
              onPress={() => router.push('/(tabs)/health')}
            >
              <View style={styles.quickActionContent}>
                <Heart size={24} color={colors.health} />
                <Text style={[styles.quickActionText, isRTLLayout && styles.textRTL]}>{t('healthCheck')}</Text>
                <Text style={[styles.quickActionSubtext, isRTLLayout && styles.textRTL]}>{t('logVitals')}</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.quickActionCard, { backgroundColor: `${colors.fitness}15` }]}
              onPress={() => router.push('/(tabs)/fitness')}
            >
              <View style={styles.quickActionContent}>
                <Activity size={24} color={colors.fitness} />
                <Text style={[styles.quickActionText, isRTLLayout && styles.textRTL]}>{t('startWorkout')}</Text>
                <Text style={[styles.quickActionSubtext, isRTLLayout && styles.textRTL]}>{t('getMoving')}</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.quickActionCard, { backgroundColor: `${colors.wellness}15` }]}
              onPress={() => router.push('/(tabs)/wellness')}
            >
              <View style={styles.quickActionContent}>
                <Brain size={24} color={colors.wellness} />
                <Text style={[styles.quickActionText, isRTLLayout && styles.textRTL]}>{t('mindfulness')}</Text>
                <Text style={[styles.quickActionSubtext, isRTLLayout && styles.textRTL]}>{t('findPeace')}</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.quickActionCard, { backgroundColor: `${colors.primary}15` }]}
              onPress={() => router.push('/(tabs)/ai-chat')}
            >
              <View style={styles.quickActionContent}>
                <Zap size={24} color={colors.primary} />
                <Text style={[styles.quickActionText, isRTLLayout && styles.textRTL]}>{t('aiCoach')}</Text>
                <Text style={[styles.quickActionSubtext, isRTLLayout && styles.textRTL]}>{t('getAdvice')}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Upcoming Events */}
        <View style={styles.section}>
          <View style={[styles.sectionHeader, isRTLLayout && styles.sectionHeaderRTL]}>
            <Text style={[styles.sectionTitle, isRTLLayout && styles.textRTL]}>{t('upcoming')}</Text>
            <TouchableOpacity onPress={() => router.push('/calendar')}>
              <Text style={[styles.seeAllText, isRTLLayout && styles.textRTL]}>{t('viewCalendar')}</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.upcomingContainer}>
            <Card variant="elevated" style={styles.upcomingCard}>
              <View style={styles.upcomingContent}>
                <View style={[styles.upcomingIcon, { backgroundColor: `${colors.health}20` }]}>
                  <Calendar size={20} color={colors.health} />
                </View>
                <View style={styles.upcomingText}>
                  <Text style={[styles.upcomingTitle, isRTLLayout && styles.textRTL]}>{t('doctorAppointment')}</Text>
                  <Text style={[styles.upcomingTime, isRTLLayout && styles.textRTL]}>{t('today')} {t('at')} 2:00 PM</Text>
                  <Text style={[styles.upcomingDescription, isRTLLayout && styles.textRTL]}>{t('annualCheckup')} Dr. Johnson</Text>
                </View>
                <ArrowRight size={16} color={colors.textSecondary} />
              </View>
            </Card>
            
            {upcomingWorkouts.length > 0 && (
              <Card variant="elevated" style={styles.upcomingCard}>
                <View style={styles.upcomingContent}>
                  <View style={[styles.upcomingIcon, { backgroundColor: `${colors.fitness}20` }]}>
                    <Activity size={20} color={colors.fitness} />
                  </View>
                  <View style={styles.upcomingText}>
                    <Text style={[styles.upcomingTitle, isRTLLayout && styles.textRTL]}>{t('workoutSession')}</Text>
                    <Text style={[styles.upcomingTime, isRTLLayout && styles.textRTL]}>{t('tomorrow')} {t('at')} 7:00 AM</Text>
                    <Text style={[styles.upcomingDescription, isRTLLayout && styles.textRTL]}>{upcomingWorkouts[0].name}</Text>
                  </View>
                  <ArrowRight size={16} color={colors.textSecondary} />
                </View>
              </Card>
            )}
          </View>
        </View>
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
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerRTL: {
    alignItems: 'flex-end',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  greetingContainer: {
    flex: 1,
  },
  greeting: {
    fontSize: 16,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  userName: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    marginTop: 2,
  },
  textRTL: {
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.cardBackground,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.error,
  },
  statusBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusText: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  statusDivider: {
    width: 1,
    height: 16,
    backgroundColor: colors.border,
    marginHorizontal: 16,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionHeaderRTL: {
    flexDirection: 'row-reverse',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
  },
  seeAllText: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '600',
  },
  heroMetrics: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  heroMetricCard: {
    width: '48%',
    minHeight: 120,
  },
  heroMetricContent: {
    alignItems: 'flex-start',
  },
  heroMetricIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  heroMetricText: {
    flex: 1,
    width: '100%',
  },
  heroMetricValue: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 2,
  },
  heroMetricLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
    marginBottom: 2,
  },
  heroMetricUnit: {
    fontSize: 12,
    color: colors.textTertiary,
  },
  heroMetricTrend: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  trendText: {
    fontSize: 12,
    fontWeight: '600',
  },
  activityRingCard: {
    
  },
  activityRingContainer: {
    flexDirection: 'row',
    gap: 20,
  },
  activityRings: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 120,
  },
  ringPlaceholder: {
    alignItems: 'center',
  },
  ringText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  ringSubtext: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  activityStats: {
    flex: 1,
    gap: 12,
  },
  activityStatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  activityStatIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityStatText: {
    flex: 1,
  },
  activityStatValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  activityStatLabel: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  activityStatProgress: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  goalsContainer: {
    gap: 12,
  },
  emptyCard: {
    
  },
  emptyContent: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  emptyIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: `${colors.textSecondary}10`,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 15,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  createGoalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 16,
    gap: 8,
  },
  createGoalText: {
    fontSize: 16,
    color: colors.black,
    fontWeight: '600',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickActionCard: {
    width: '48%',
    borderRadius: 20,
    padding: 20,
    minHeight: 100,
  },
  quickActionContent: {
    alignItems: 'flex-start',
  },
  quickActionText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginTop: 12,
    marginBottom: 2,
  },
  quickActionSubtext: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  upcomingContainer: {
    gap: 12,
  },
  upcomingCard: {
    
  },
  upcomingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  upcomingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  upcomingText: {
    flex: 1,
  },
  upcomingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  upcomingTime: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
    marginBottom: 2,
  },
  upcomingDescription: {
    fontSize: 14,
    color: colors.textSecondary,
  },
});