import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';
import { colors } from '@/constants/colors';
import { useWellnessStore } from '@/store/wellness-store';
import { Card } from '@/components/Card';
import { MeditationCard } from '@/components/MeditationCard';
import { WellnessPathCard } from '@/components/WellnessPathCard';
import { DailyCheckInCard } from '@/components/DailyCheckInCard';
import { HabitCard } from '@/components/HabitCard';
import { MoodPicker } from '@/components/MoodPicker';
import { EnergyScoreCard } from '@/components/EnergyScoreCard';
import { ResilienceScoreCard } from '@/components/ResilienceScoreCard';
import { DailyCheckIn, Habit, WellnessPath, MoodEntry } from '@/types/wellness';
import { 
  Brain, 
  Heart, 
  Smile, 
  Target, 
  Plus, 
  TrendingUp,
  Moon,
  Zap,
  Shield,
  Camera,
  Sparkles,
  Sun,
  Wind
} from 'lucide-react-native';

export default function WellnessScreen() {
  const { 
    moodEntries = [],
    dailyCheckIns = [],
    habits = [],
    meditationSessions = [],
    wellnessPaths = [],
    energyScores = [],
    resilienceScores = [],
    addMoodEntry,
    addDailyCheckIn,
    addHabit,
    toggleHabit,
    startWellnessPath,
    completeMeditationSession
  } = useWellnessStore();
  
  const [showMoodPicker, setShowMoodPicker] = useState(false);
  const [showCheckIn, setShowCheckIn] = useState(false);
  
  const handleMoodSave = (mood: number, notes?: string) => {
    const moodLabels = ['terrible', 'low', 'okay', 'good', 'excellent'] as const;
    const moodEntry: Omit<MoodEntry, 'id'> = {
      mood: moodLabels[mood - 1] || 'okay',
      energy: moodLabels[mood - 1] || 'okay',
      stress: mood,
      anxiety: mood,
      sleep: mood,
      notes,
      timestamp: new Date().toISOString(),
      factors: [],
      activities: [],
    };
    
    addMoodEntry(moodEntry);
    setShowMoodPicker(false);
    Alert.alert('Mood Logged', 'Your mood has been recorded successfully!');
  };
  
  const handleCheckInComplete = () => {
    const checkIn: Omit<DailyCheckIn, 'id'> = {
      date: new Date().toISOString().split('T')[0],
      completed: true,
      energy: 8,
      sleep: 7,
      nutrition: 8,
      exercise: 6,
      stress: 4,
      mood: 8,
      hydration: 9,
      notes: 'Feeling good today!',
      goals: [],
      gratitude: [],
      challenges: [],
      wins: [],
    };
    
    addDailyCheckIn(checkIn);
    setShowCheckIn(false);
    Alert.alert('Check-in Complete', 'Your daily check-in has been saved!');
  };
  
  const handleAddHabit = () => {
    const newHabit: Omit<Habit, 'id' | 'streak' | 'createdAt' | 'points' | 'longestStreak' | 'completedDates'> = {
      name: 'Drink 8 glasses of water',
      description: 'Stay hydrated throughout the day',
      category: 'nutrition',
      frequency: 'daily',
      completed: false,
      completedToday: false,
      reminderEnabled: false,
      difficulty: 'easy',
      isActive: true,
    };
    
    addHabit(newHabit);
    Alert.alert('Habit Added', 'New habit has been added to your routine!');
  };
  
  const handleHabitToggle = (habitId: string) => {
    toggleHabit(habitId);
  };
  
  const handleWellnessPathStart = (pathId: string) => {
    startWellnessPath(pathId);
    Alert.alert('Path Started', 'Your wellness journey has begun!');
  };
  
  const todaysCheckIn = dailyCheckIns.find(checkIn => {
    const today = new Date().toISOString().split('T')[0];
    return checkIn.date === today;
  });
  
  const activeHabits = habits.filter(habit => habit.isActive && !habit.completedToday).slice(0, 3);
  const featuredMeditations = meditationSessions.slice(0, 3);
  const recommendedPaths = wellnessPaths.slice(0, 2);
  const latestEnergyScore = energyScores[0] || { 
    id: '1',
    date: new Date().toISOString().split('T')[0],
    score: 75,
    factors: {
      sleep: 75, 
      nutrition: 80, 
      exercise: 70, 
      stress: 60, 
      mood: 85, 
      hydration: 90 
    },
    recommendations: ['Get more sleep', 'Stay hydrated'],
    trend: 'stable' as const
  };
  const latestResilienceScore = resilienceScores[0] || {
    id: '1',
    date: new Date().toISOString().split('T')[0],
    score: 78,
    components: {
      emotional: 8,
      cognitive: 7,
      physical: 8,
      social: 7,
      spiritual: 8,
    },
    strengths: ['Strong emotional regulation'],
    areasForGrowth: ['Building social connections'],
    recommendations: ['Practice mindfulness'],
    trend: 'improving' as const
  };
  
  const getMoodEmoji = () => {
    const recentMood = moodEntries[0];
    if (!recentMood) return '😊';
    
    switch (recentMood.mood) {
      case 'excellent': return '😄';
      case 'good': return '😊';
      case 'okay': return '😐';
      case 'low': return '😔';
      case 'terrible': return '😢';
      default: return '😊';
    }
  };
  
  return (
    <View style={styles.container}>
      {/* Modern Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Wellness</Text>
          <Text style={styles.headerSubtitle}>Mind, body, and soul</Text>
        </View>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => setShowMoodPicker(true)}
        >
          <Plus size={22} color={colors.text} />
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Wellness Overview */}
        <View style={styles.section}>
          <Card variant="elevated" style={styles.overviewCard}>
            <View style={styles.overviewContent}>
              <View style={styles.moodSection}>
                <Text style={styles.moodEmoji}>{getMoodEmoji()}</Text>
                <View style={styles.moodText}>
                  <Text style={styles.moodTitle}>How are you feeling?</Text>
                  <Text style={styles.moodSubtitle}>
                    {moodEntries[0] ? `Feeling ${moodEntries[0].mood}` : 'Tap to log your mood'}
                  </Text>
                </View>
                <TouchableOpacity 
                  style={styles.moodButton}
                  onPress={() => setShowMoodPicker(true)}
                >
                  <Smile size={20} color={colors.primary} />
                </TouchableOpacity>
              </View>
              
              <View style={styles.overviewDivider} />
              
              <View style={styles.overviewStats}>
                <View style={styles.overviewStat}>
                  <Text style={styles.overviewStatValue}>{latestEnergyScore.score}%</Text>
                  <Text style={styles.overviewStatLabel}>Energy</Text>
                </View>
                <View style={styles.overviewStat}>
                  <Text style={styles.overviewStatValue}>{activeHabits.length}</Text>
                  <Text style={styles.overviewStatLabel}>Active Habits</Text>
                </View>
                <View style={styles.overviewStat}>
                  <Text style={styles.overviewStatValue}>{todaysCheckIn ? '✓' : '○'}</Text>
                  <Text style={styles.overviewStatLabel}>Check-in</Text>
                </View>
              </View>
            </View>
          </Card>
        </View>
        
        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            <TouchableOpacity 
              style={[styles.quickActionCard, { backgroundColor: `${colors.wellness}15` }]}
              onPress={() => setShowMoodPicker(true)}
            >
              <View style={styles.quickActionContent}>
                <Sparkles size={24} color={colors.wellness} />
                <Text style={styles.quickActionText}>Log Mood</Text>
                <Text style={styles.quickActionSubtext}>Track feelings</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.quickActionCard, { backgroundColor: `${colors.warning}15` }]}
              onPress={() => router.push('/ai-calorie-calculator')}
            >
              <View style={styles.quickActionContent}>
                <Camera size={24} color={colors.warning} />
                <Text style={styles.quickActionText}>Nutrition Scanner</Text>
                <Text style={styles.quickActionSubtext}>Track food</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.quickActionCard, { backgroundColor: `${colors.info}15` }]}
              onPress={() => router.push('/sleep-tracking')}
            >
              <View style={styles.quickActionContent}>
                <Moon size={24} color={colors.info} />
                <Text style={styles.quickActionText}>Sleep Tracker</Text>
                <Text style={styles.quickActionSubtext}>Monitor rest</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.quickActionCard, { backgroundColor: `${colors.success}15` }]}
              onPress={() => router.push('/stress-management')}
            >
              <View style={styles.quickActionContent}>
                <Wind size={24} color={colors.success} />
                <Text style={styles.quickActionText}>Breathe</Text>
                <Text style={styles.quickActionSubtext}>Relax mind</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Wellness Scores */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Wellness Scores</Text>
          <View style={styles.scoresGrid}>
            <Card variant="elevated" style={styles.scoreCard}>
              <View style={styles.scoreContent}>
                <View style={[styles.scoreIcon, { backgroundColor: `${colors.warning}20` }]}>
                  <Zap size={24} color={colors.warning} />
                </View>
                <View style={styles.scoreText}>
                  <Text style={styles.scoreValue}>{latestEnergyScore.score}%</Text>
                  <Text style={styles.scoreLabel}>Energy Level</Text>
                  <Text style={styles.scoreStatus}>
                    {latestEnergyScore.trend === 'improving' ? '↗ Improving' : 
                     latestEnergyScore.trend === 'declining' ? '↘ Declining' : '→ Stable'}
                  </Text>
                </View>
              </View>
            </Card>
            
            <Card variant="elevated" style={styles.scoreCard}>
              <View style={styles.scoreContent}>
                <View style={[styles.scoreIcon, { backgroundColor: `${colors.success}20` }]}>
                  <Shield size={24} color={colors.success} />
                </View>
                <View style={styles.scoreText}>
                  <Text style={styles.scoreValue}>{latestResilienceScore.score}%</Text>
                  <Text style={styles.scoreLabel}>Resilience</Text>
                  <Text style={styles.scoreStatus}>
                    {latestResilienceScore.trend === 'improving' ? '↗ Improving' : 
                     latestResilienceScore.trend === 'declining' ? '↘ Declining' : '→ Stable'}
                  </Text>
                </View>
              </View>
            </Card>
          </View>
        </View>
        
        {/* Daily Check-in */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Daily Check-in</Text>
          {!todaysCheckIn ? (
            <Card variant="outlined" style={styles.checkInCard}>
              <View style={styles.checkInContent}>
                <View style={[styles.checkInIcon, { backgroundColor: `${colors.primary}20` }]}>
                  <Sun size={24} color={colors.primary} />
                </View>
                <View style={styles.checkInText}>
                  <Text style={styles.checkInTitle}>Ready for your daily check-in?</Text>
                  <Text style={styles.checkInDescription}>
                    Take a moment to reflect on your day and track your wellness
                  </Text>
                </View>
                <TouchableOpacity 
                  style={styles.checkInButton}
                  onPress={handleCheckInComplete}
                >
                  <Text style={styles.checkInButtonText}>Start</Text>
                </TouchableOpacity>
              </View>
            </Card>
          ) : (
            <Card variant="elevated" style={styles.completedCheckIn}>
              <View style={styles.completedContent}>
                <View style={[styles.completedIcon, { backgroundColor: `${colors.success}20` }]}>
                  <Target size={24} color={colors.success} />
                </View>
                <View style={styles.completedText}>
                  <Text style={styles.completedTitle}>Check-in Complete!</Text>
                  <Text style={styles.completedDescription}>
                    Great job completing your daily wellness check-in. Keep up the momentum!
                  </Text>
                </View>
              </View>
            </Card>
          )}
        </View>
        
        {/* Active Habits */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Today's Habits</Text>
            <TouchableOpacity onPress={handleAddHabit}>
              <Text style={styles.seeAllText}>Add Habit</Text>
            </TouchableOpacity>
          </View>
          
          {activeHabits.length > 0 ? (
            <View style={styles.habitsContainer}>
              {activeHabits.map((habit) => (
                <Card key={habit.id} variant="elevated" style={styles.habitCard}>
                  <View style={styles.habitContent}>
                    <TouchableOpacity 
                      style={[
                        styles.habitCheckbox,
                        habit.completedToday && styles.habitCheckboxCompleted
                      ]}
                      onPress={() => handleHabitToggle(habit.id)}
                    >
                      {habit.completedToday && <Text style={styles.habitCheckmark}>✓</Text>}
                    </TouchableOpacity>
                    <View style={styles.habitText}>
                      <Text style={[
                        styles.habitName,
                        habit.completedToday && styles.habitNameCompleted
                      ]}>
                        {habit.name}
                      </Text>
                      <Text style={styles.habitDescription}>{habit.description}</Text>
                    </View>
                    <View style={styles.habitStreak}>
                      <Text style={styles.habitStreakText}>{habit.streak || 0}</Text>
                      <Text style={styles.habitStreakLabel}>day streak</Text>
                    </View>
                  </View>
                </Card>
              ))}
            </View>
          ) : (
            <Card variant="outlined" style={styles.emptyCard}>
              <View style={styles.emptyContent}>
                <View style={styles.emptyIcon}>
                  <Target size={32} color={colors.textSecondary} />
                </View>
                <Text style={styles.emptyTitle}>No active habits</Text>
                <Text style={styles.emptyDescription}>
                  Build healthy habits to improve your daily wellness
                </Text>
                <TouchableOpacity 
                  style={styles.addHabitButton}
                  onPress={handleAddHabit}
                >
                  <Text style={styles.addHabitText}>Create Your First Habit</Text>
                </TouchableOpacity>
              </View>
            </Card>
          )}
        </View>
        
        {/* Featured Meditations */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Mindfulness</Text>
            <TouchableOpacity onPress={() => router.push('/meditation')}>
              <Text style={styles.seeAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.meditationsContainer}
          >
            {[
              { id: '1', title: 'Morning Calm', duration: 10, type: 'mindfulness' },
              { id: '2', title: 'Stress Relief', duration: 15, type: 'stress' },
              { id: '3', title: 'Sleep Stories', duration: 20, type: 'sleep' },
            ].map((meditation) => (
              <Card key={meditation.id} variant="elevated" style={styles.meditationCard}>
                <View style={styles.meditationContent}>
                  <View style={[styles.meditationIcon, { backgroundColor: `${colors.wellness}20` }]}>
                    <Brain size={24} color={colors.wellness} />
                  </View>
                  <Text style={styles.meditationTitle}>{meditation.title}</Text>
                  <Text style={styles.meditationDuration}>{meditation.duration} min</Text>
                  <TouchableOpacity 
                    style={styles.meditationButton}
                    onPress={() => router.push(`/meditation/${meditation.id}`)}
                  >
                    <Text style={styles.meditationButtonText}>Start</Text>
                  </TouchableOpacity>
                </View>
              </Card>
            ))}
          </ScrollView>
        </View>
        
        {/* Wellness Insights */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Insights</Text>
            <TouchableOpacity onPress={() => router.push('/wellness-insights')}>
              <Text style={styles.seeAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.insightsContainer}>
            <Card variant="elevated" style={styles.insightCard}>
              <View style={styles.insightContent}>
                <View style={[styles.insightIcon, { backgroundColor: `${colors.success}20` }]}>
                  <TrendingUp size={24} color={colors.success} />
                </View>
                <View style={styles.insightText}>
                  <Text style={styles.insightTitle}>Mood Improvement</Text>
                  <Text style={styles.insightDescription}>
                    Your mood has been consistently positive this week. Keep up the great work with your wellness routine!
                  </Text>
                </View>
              </View>
            </Card>
            
            <Card variant="elevated" style={styles.insightCard}>
              <View style={styles.insightContent}>
                <View style={[styles.insightIcon, { backgroundColor: `${colors.warning}20` }]}>
                  <Zap size={24} color={colors.warning} />
                </View>
                <View style={styles.insightText}>
                  <Text style={styles.insightTitle}>Energy Boost</Text>
                  <Text style={styles.insightDescription}>
                    Try adding a 10-minute morning meditation to boost your energy levels throughout the day.
                  </Text>
                </View>
              </View>
            </Card>
          </View>
        </View>
      </ScrollView>
      
      {showMoodPicker && (
        <MoodPicker
          onSave={handleMoodSave}
          onClose={() => setShowMoodPicker(false)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
  },
  headerSubtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 2,
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.cardBackground,
    justifyContent: 'center',
    alignItems: 'center',
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
  overviewCard: {
    
  },
  overviewContent: {
    
  },
  moodSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  moodEmoji: {
    fontSize: 32,
    marginRight: 16,
  },
  moodText: {
    flex: 1,
  },
  moodTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  moodSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  moodButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: `${colors.primary}15`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overviewDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginBottom: 20,
  },
  overviewStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  overviewStat: {
    alignItems: 'center',
  },
  overviewStatValue: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  overviewStatLabel: {
    fontSize: 12,
    color: colors.textSecondary,
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
  scoresGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  scoreCard: {
    flex: 1,
  },
  scoreContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  scoreIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreText: {
    flex: 1,
  },
  scoreValue: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 2,
  },
  scoreLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  scoreStatus: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '500',
  },
  checkInCard: {
    
  },
  checkInContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  checkInIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkInText: {
    flex: 1,
  },
  checkInTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  checkInDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  checkInButton: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  checkInButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.black,
  },
  completedCheckIn: {
    
  },
  completedContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  completedIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  completedText: {
    flex: 1,
  },
  completedTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  completedDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  habitsContainer: {
    gap: 12,
  },
  habitCard: {
    
  },
  habitContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  habitCheckbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  habitCheckboxCompleted: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  habitCheckmark: {
    fontSize: 12,
    color: colors.black,
    fontWeight: '700',
  },
  habitText: {
    flex: 1,
  },
  habitName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  habitNameCompleted: {
    textDecorationLine: 'line-through',
    color: colors.textSecondary,
  },
  habitDescription: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  habitStreak: {
    alignItems: 'center',
  },
  habitStreakText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
  },
  habitStreakLabel: {
    fontSize: 10,
    color: colors.textSecondary,
  },
  meditationsContainer: {
    paddingRight: 20,
    gap: 12,
  },
  meditationCard: {
    width: 140,
  },
  meditationContent: {
    alignItems: 'center',
  },
  meditationIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  meditationTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
    textAlign: 'center',
  },
  meditationDuration: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 12,
  },
  meditationButton: {
    backgroundColor: `${colors.wellness}15`,
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
  meditationButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.wellness,
  },
  insightsContainer: {
    gap: 12,
  },
  insightCard: {
    
  },
  insightContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
  },
  insightIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  insightText: {
    flex: 1,
  },
  insightTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  insightDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  emptyCard: {
    
  },
  emptyContent: {
    alignItems: 'center',
    paddingVertical: 32,
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
  addHabitButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 16,
  },
  addHabitText: {
    fontSize: 16,
    color: colors.black,
    fontWeight: '600',
  },
});