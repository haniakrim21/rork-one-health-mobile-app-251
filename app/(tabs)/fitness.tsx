import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';
import { colors } from '@/constants/colors';
import { useFitnessStore } from '@/store/fitness-store';
import { Card } from '@/components/Card';
import { MetricCard } from '@/components/MetricCard';
import { WorkoutCard } from '@/components/WorkoutCard';
import { TrainerCard } from '@/components/TrainerCard';
import { TrendData, Workout, Exercise, WorkoutExercise } from '@/types';
import { 
  Activity, 
  Target, 
  Calendar, 
  Users, 
  Plus, 
  TrendingUp,
  Zap,
  Clock,
  Award,
  Camera,
  Play,
  Flame,
  Timer,
  BarChart3
} from 'lucide-react-native';

export default function FitnessScreen() {
  const { 
    workouts = [], 
    trainers = [], 
    challenges = [], 
    addWorkout, 
    completeWorkout,
    bookTrainer 
  } = useFitnessStore();
  
  const [showWorkoutForm, setShowWorkoutForm] = useState(false);
  
  const handleWorkoutPress = (workoutId: string) => {
    router.push(`/fitness-session/${workoutId}`);
  };
  
  const handleWorkoutComplete = (workoutId: string) => {
    completeWorkout(workoutId);
    Alert.alert('Great job!', 'Workout completed successfully!');
  };
  
  const handleTrainerPress = (trainerId: string) => {
    router.push(`/trainer-details/${trainerId}`);
  };
  
  const handleTrainerBook = (trainerId: string) => {
    bookTrainer(trainerId);
    Alert.alert('Booking Confirmed', 'Your training session has been booked!');
  };
  
  const handleAddWorkout = () => {
    const pushUpExercise: Exercise = {
      id: 'ex1',
      name: 'Push-ups',
      type: 'strength',
      muscleGroups: ['Chest', 'Triceps', 'Shoulders'],
      equipment: [],
      instructions: 'Keep your core tight and elbows close to your body',
      difficulty: 'intermediate',
      estimatedCalories: 8,
    };

    const squatExercise: Exercise = {
      id: 'ex2',
      name: 'Squats',
      type: 'strength',
      muscleGroups: ['Quadriceps', 'Glutes', 'Hamstrings'],
      equipment: [],
      instructions: 'Keep your weight in your heels and chest up',
      difficulty: 'intermediate',
      estimatedCalories: 10,
    };

    const workoutExercises: WorkoutExercise[] = [
      {
        exerciseId: pushUpExercise.id,
        exercise: pushUpExercise,
        sets: [
          { reps: 15, restTime: 60 },
          { reps: 15, restTime: 60 },
          { reps: 15, restTime: 60 }
        ],
        completed: false,
      },
      {
        exerciseId: squatExercise.id,
        exercise: squatExercise,
        sets: [
          { reps: 20, restTime: 60 },
          { reps: 20, restTime: 60 },
          { reps: 20, restTime: 60 }
        ],
        completed: false,
      },
    ];
    
    const newWorkout: Workout = {
      id: Date.now().toString(),
      name: 'Custom Workout',
      type: 'strength',
      exercises: workoutExercises,
      duration: 30,
      difficulty: 'intermediate',
      completed: false,
      scheduledFor: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      isAI: false,
      adaptiveAdjustments: 0,
    };
    
    addWorkout(newWorkout);
    setShowWorkoutForm(false);
    Alert.alert('Success', 'Workout added successfully!');
  };
  
  const todaysWorkouts = (Array.isArray(workouts) ? workouts : []).filter(workout => {
    if (!workout || !workout.scheduledFor) return false;
    try {
      const today = new Date().toDateString();
      const workoutDate = new Date(workout.scheduledFor).toDateString();
      return today === workoutDate;
    } catch (error) {
      return false;
    }
  });
  
  const upcomingWorkouts = (Array.isArray(workouts) ? workouts : [])
    .filter(workout => {
      if (!workout || !workout.scheduledFor || workout.completed) return false;
      try {
        return new Date(workout.scheduledFor) >= new Date();
      } catch (error) {
        return false;
      }
    })
    .sort((a, b) => {
      try {
        return new Date(a.scheduledFor!).getTime() - new Date(b.scheduledFor!).getTime();
      } catch (error) {
        return 0;
      }
    })
    .slice(0, 3);
  
  const featuredTrainers = (Array.isArray(trainers) ? trainers : []).slice(0, 3);
  
  const fitnessMetricsData = [
    { 
      title: 'Calories Burned', 
      value: '2,450', 
      unit: 'kcal', 
      trend: { value: 150, isPositive: true } as TrendData, 
      color: colors.warning 
    },
    { 
      title: 'Active Minutes', 
      value: '45', 
      unit: 'min', 
      trend: { value: 10, isPositive: true } as TrendData, 
      color: colors.success 
    },
    { 
      title: 'Workouts', 
      value: '12', 
      unit: 'this week', 
      trend: { value: 3, isPositive: true } as TrendData, 
      color: colors.fitness 
    },
    { 
      title: 'Strength', 
      value: '85', 
      unit: '%', 
      trend: { value: 5, isPositive: true } as TrendData, 
      color: colors.primary 
    },
  ];
  
  return (
    <View style={styles.container}>
      {/* Modern Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Fitness</Text>
          <Text style={styles.headerSubtitle}>Stay strong, stay healthy</Text>
        </View>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={handleAddWorkout}
        >
          <Plus size={22} color={colors.text} />
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Hero Stats */}
        <View style={styles.section}>
          <Card variant="elevated" style={styles.heroCard}>
            <View style={styles.heroContent}>
              <View style={styles.heroStats}>
                <View style={styles.heroStat}>
                  <Text style={styles.heroStatValue}>2,450</Text>
                  <Text style={styles.heroStatLabel}>Calories</Text>
                  <Text style={styles.heroStatUnit}>burned today</Text>
                </View>
                <View style={styles.heroStatDivider} />
                <View style={styles.heroStat}>
                  <Text style={styles.heroStatValue}>45</Text>
                  <Text style={styles.heroStatLabel}>Minutes</Text>
                  <Text style={styles.heroStatUnit}>active time</Text>
                </View>
                <View style={styles.heroStatDivider} />
                <View style={styles.heroStat}>
                  <Text style={styles.heroStatValue}>12</Text>
                  <Text style={styles.heroStatLabel}>Workouts</Text>
                  <Text style={styles.heroStatUnit}>this week</Text>
                </View>
              </View>
              <TouchableOpacity 
                style={styles.heroButton}
                onPress={() => router.push('/fitness-insights')}
              >
                <BarChart3 size={20} color={colors.primary} />
                <Text style={styles.heroButtonText}>View Insights</Text>
              </TouchableOpacity>
            </View>
          </Card>
        </View>
        
        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Start</Text>
          <View style={styles.quickActionsGrid}>
            <TouchableOpacity 
              style={[styles.quickActionCard, { backgroundColor: `${colors.primary}15` }]}
              onPress={() => router.push('/ai-trainer')}
            >
              <View style={styles.quickActionContent}>
                <Zap size={24} color={colors.primary} />
                <Text style={styles.quickActionText}>AI Trainer</Text>
                <Text style={styles.quickActionSubtext}>Personalized workouts</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.quickActionCard, { backgroundColor: `${colors.warning}15` }]}
              onPress={() => router.push('/ai-calorie-calculator')}
            >
              <View style={styles.quickActionContent}>
                <Camera size={24} color={colors.warning} />
                <Text style={styles.quickActionText}>Calorie Scanner</Text>
                <Text style={styles.quickActionSubtext}>Track nutrition</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.quickActionCard, { backgroundColor: `${colors.success}15` }]}
              onPress={() => router.push('/group-training')}
            >
              <View style={styles.quickActionContent}>
                <Users size={24} color={colors.success} />
                <Text style={styles.quickActionText}>Group Training</Text>
                <Text style={styles.quickActionSubtext}>Join others</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.quickActionCard, { backgroundColor: `${colors.info}15` }]}
              onPress={() => router.push('/fitness-assessment')}
            >
              <View style={styles.quickActionContent}>
                <Target size={24} color={colors.info} />
                <Text style={styles.quickActionText}>Assessment</Text>
                <Text style={styles.quickActionSubtext}>Test fitness</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Today's Workouts */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Today's Workouts</Text>
            <TouchableOpacity onPress={() => router.push('/workouts')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          {todaysWorkouts.length > 0 ? (
            <View style={styles.workoutsContainer}>
              {todaysWorkouts.map((workout) => (
                <Card key={workout.id} variant="elevated" style={styles.workoutCard}>
                  <View style={styles.workoutContent}>
                    <View style={styles.workoutInfo}>
                      <Text style={styles.workoutName}>{workout.name}</Text>
                      <View style={styles.workoutMeta}>
                        <View style={styles.workoutMetaItem}>
                          <Timer size={14} color={colors.textSecondary} />
                          <Text style={styles.workoutMetaText}>{workout.duration || 30} min</Text>
                        </View>
                        <View style={styles.workoutMetaItem}>
                          <Flame size={14} color={colors.textSecondary} />
                          <Text style={styles.workoutMetaText}>~{(workout.duration || 30) * 8} cal</Text>
                        </View>
                      </View>
                    </View>
                    <TouchableOpacity 
                      style={styles.playButton}
                      onPress={() => handleWorkoutPress(workout.id)}
                    >
                      <Play size={20} color={colors.black} />
                    </TouchableOpacity>
                  </View>
                </Card>
              ))}
            </View>
          ) : (
            <Card variant="outlined" style={styles.emptyCard}>
              <View style={styles.emptyContent}>
                <View style={styles.emptyIcon}>
                  <Activity size={32} color={colors.textSecondary} />
                </View>
                <Text style={styles.emptyTitle}>No workouts scheduled</Text>
                <Text style={styles.emptyDescription}>
                  Start your fitness journey with a quick workout
                </Text>
                <TouchableOpacity 
                  style={styles.scheduleButton}
                  onPress={() => router.push('/workouts/schedule')}
                >
                  <Text style={styles.scheduleButtonText}>Schedule Workout</Text>
                </TouchableOpacity>
              </View>
            </Card>
          )}
        </View>
        
        {/* Progress Metrics */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Progress Metrics</Text>
            <TouchableOpacity onPress={() => router.push('/fitness-all')}>
              <Text style={styles.seeAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.metricsGrid}>
            {fitnessMetricsData.map((metric, index) => (
              <MetricCard
                key={index}
                title={metric.title}
                value={metric.value}
                unit={metric.unit}
                trend={metric.trend}
                color={metric.color}
                style={styles.metricCard}
              />
            ))}
          </View>
        </View>
        
        {/* Featured Trainers */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Trainers</Text>
            <TouchableOpacity onPress={() => router.push('/trainers')}>
              <Text style={styles.seeAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          
          {featuredTrainers.length > 0 ? (
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.trainersContainer}
            >
              {featuredTrainers.map((trainer) => (
                <Card key={trainer.id} variant="elevated" style={styles.trainerCard}>
                  <View style={styles.trainerContent}>
                    <View style={styles.trainerAvatar}>
                      <Text style={styles.trainerInitials}>
                        {trainer.name.split(' ').map(n => n[0]).join('')}
                      </Text>
                    </View>
                    <Text style={styles.trainerName}>{trainer.name}</Text>
                    <Text style={styles.trainerSpecialty}>{trainer.specialties[0]}</Text>
                    <View style={styles.trainerRating}>
                      <Text style={styles.trainerRatingText}>⭐ {trainer.rating}</Text>
                    </View>
                    <TouchableOpacity 
                      style={styles.bookButton}
                      onPress={() => handleTrainerBook(trainer.id)}
                    >
                      <Text style={styles.bookButtonText}>Book Session</Text>
                    </TouchableOpacity>
                  </View>
                </Card>
              ))}
            </ScrollView>
          ) : (
            <Card variant="outlined" style={styles.emptyCard}>
              <View style={styles.emptyContent}>
                <View style={styles.emptyIcon}>
                  <Users size={32} color={colors.textSecondary} />
                </View>
                <Text style={styles.emptyTitle}>No trainers available</Text>
                <Text style={styles.emptyDescription}>
                  Connect with professional trainers to reach your goals
                </Text>
                <TouchableOpacity 
                  style={styles.findTrainerButton}
                  onPress={() => router.push('/trainers')}
                >
                  <Text style={styles.findTrainerText}>Find Trainers</Text>
                </TouchableOpacity>
              </View>
            </Card>
          )}
        </View>
        
        {/* Fitness Insights */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Insights</Text>
            <TouchableOpacity onPress={() => router.push('/fitness-insights')}>
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
                  <Text style={styles.insightTitle}>Excellent Progress!</Text>
                  <Text style={styles.insightDescription}>
                    You have increased your workout intensity by 15% this week. Keep pushing your limits!
                  </Text>
                </View>
              </View>
            </Card>
            
            <Card variant="elevated" style={styles.insightCard}>
              <View style={styles.insightContent}>
                <View style={[styles.insightIcon, { backgroundColor: `${colors.warning}20` }]}>
                  <Clock size={24} color={colors.warning} />
                </View>
                <View style={styles.insightText}>
                  <Text style={styles.insightTitle}>Recovery Time</Text>
                  <Text style={styles.insightDescription}>
                    Consider adding more rest days between intense workouts for optimal recovery.
                  </Text>
                </View>
              </View>
            </Card>
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
  heroCard: {
    
  },
  heroContent: {
    
  },
  heroStats: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  heroStat: {
    flex: 1,
    alignItems: 'center',
  },
  heroStatValue: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  heroStatLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 2,
  },
  heroStatUnit: {
    fontSize: 12,
    color: colors.textTertiary,
  },
  heroStatDivider: {
    width: 1,
    backgroundColor: colors.border,
    marginHorizontal: 16,
  },
  heroButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: `${colors.primary}15`,
    borderRadius: 16,
    paddingVertical: 12,
    gap: 8,
  },
  heroButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
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
  workoutsContainer: {
    gap: 12,
  },
  workoutCard: {
    
  },
  workoutContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  workoutInfo: {
    flex: 1,
  },
  workoutName: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  workoutMeta: {
    flexDirection: 'row',
    gap: 16,
  },
  workoutMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  workoutMetaText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  playButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  metricCard: {
    width: '48%',
  },
  trainersContainer: {
    paddingRight: 20,
    gap: 12,
  },
  trainerCard: {
    width: 160,
  },
  trainerContent: {
    alignItems: 'center',
  },
  trainerAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  trainerInitials: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.black,
  },
  trainerName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
    textAlign: 'center',
  },
  trainerSpecialty: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
    textAlign: 'center',
  },
  trainerRating: {
    marginBottom: 12,
  },
  trainerRatingText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  bookButton: {
    backgroundColor: `${colors.primary}15`,
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  bookButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
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
  scheduleButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 16,
  },
  scheduleButtonText: {
    fontSize: 16,
    color: colors.black,
    fontWeight: '600',
  },
  findTrainerButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 16,
  },
  findTrainerText: {
    fontSize: 16,
    color: colors.black,
    fontWeight: '600',
  },
});