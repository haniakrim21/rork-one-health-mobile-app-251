import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { colors } from '@/constants/colors';
import { Card } from '@/components/Card';
import { MetricCard } from '@/components/MetricCard';
import { ActivityWidget } from '@/components/ActivityWidget';
import { WorkoutCard } from '@/components/WorkoutCard';
import { AppointmentCard } from '@/components/AppointmentCard';
import { MedicationCard } from '@/components/MedicationCard';
import { GoalCard } from '@/components/GoalCard';
import { useHealthStore } from '@/store/health-store';
import { useFitnessStore } from '@/store/fitness-store';
import { useWellnessStore } from '@/store/wellness-store';
import { useUserStore } from '@/store/user-store';
import { HealthMetric, Workout, Appointment, Medication } from '@/types';
import { 
  Heart, 
  Activity, 
  Target, 
  Calendar,
  Pill,
  Plus,
  TrendingUp,
  Zap,
  Brain
} from 'lucide-react-native';

export default function HomeScreen() {
  const { user } = useUserStore();
  const { healthMetrics, appointments, medications } = useHealthStore();
  const { workouts, fitnessGoals } = useFitnessStore();
  const { habits, moodEntries, energyScores } = useWellnessStore();

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  }, []);

  const todayWorkouts = useMemo(() => {
    const today = new Date().toDateString();
    return workouts.filter((workout: Workout) => 
      workout.scheduledFor && new Date(workout.scheduledFor).toDateString() === today
    );
  }, [workouts]);

  const upcomingAppointments = useMemo(() => {
    const now = new Date();
    return appointments
      .filter((apt: Appointment) => new Date(apt.date) > now)
      .sort((a: Appointment, b: Appointment) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 2);
  }, [appointments]);

  const activeMedications = useMemo(() => {
    return medications.filter((med: Medication) => !med.endDate || new Date(med.endDate) > new Date());
  }, [medications]);

  const allGoals = useMemo(() => {
    return [...fitnessGoals].filter((goal: any) => !goal.completed);
  }, [fitnessGoals]);

  const latestMetrics = useMemo(() => {
    const metricTypes = ['weight', 'blood_pressure', 'heart_rate'];
    return metricTypes.map(type => {
      const typeMetrics = healthMetrics.filter((m: HealthMetric) => m.type === type);
      return typeMetrics.sort((a: HealthMetric, b: HealthMetric) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())[0];
    }).filter(Boolean);
  }, [healthMetrics]);

  const currentMood = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    return moodEntries.find((entry: any) => entry.timestamp?.startsWith(today));
  }, [moodEntries]);

  const currentEnergy = useMemo(() => {
    return energyScores[0];
  }, [energyScores]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>{greeting}</Text>
          <Text style={styles.userName}>{user?.name || 'User'}</Text>
        </View>
        <TouchableOpacity 
          style={styles.notificationButton}
          onPress={() => router.push('/notifications')}
        >
          <Heart size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Health Score */}
      <Card style={styles.healthScoreCard}>
        <View style={styles.healthScoreHeader}>
          <View>
            <Text style={styles.healthScoreTitle}>Health Score</Text>
            <Text style={styles.healthScoreSubtitle}>All Systems Good</Text>
          </View>
          <View style={styles.healthScoreValue}>
            <Text style={styles.healthScoreNumber}>85</Text>
            <Text style={styles.healthScoreUnit}>Score</Text>
          </View>
        </View>
        <View style={styles.healthScoreProgress}>
          <View style={[styles.progressBar, { width: '85%' }]} />
        </View>
      </Card>

      {/* Quick Actions */}
      <Card style={styles.quickActionsCard}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActions}>
          <TouchableOpacity 
            style={styles.quickAction}
            onPress={() => router.push('/virtual-consultation')}
          >
            <Heart size={20} color={colors.primary} />
            <Text style={styles.quickActionText}>Talk to Doctor</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.quickAction}
            onPress={() => router.push('/symptom-checker')}
          >
            <Brain size={20} color={colors.primary} />
            <Text style={styles.quickActionText}>Symptom Checker</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.quickAction}
            onPress={() => router.push('/ai-health-navigator')}
          >
            <Zap size={20} color={colors.primary} />
            <Text style={styles.quickActionText}>AI Navigator</Text>
          </TouchableOpacity>
        </View>
      </Card>

      {/* Today's Activity */}
      <ActivityWidget 
        title="Today's Activity"
        value={currentMood ? currentMood.mood : 'Not logged'}
        type="mood"
        progress={currentEnergy ? currentEnergy.score : 0}
        icon="activity"
      />

      {/* Health Metrics */}
      {latestMetrics.length > 0 && (
        <Card style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Vital Signs</Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)/health')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.metricsGrid}>
            {latestMetrics.slice(0, 3).map((metric: HealthMetric) => (
              <MetricCard
                key={metric.id}
                title={metric.type.replace('_', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
                value={metric.value.toString()}
                unit={metric.unit}
                trend={{ value: 2.5, isPositive: true }}
              />
            ))}
          </View>
        </Card>
      )}

      {/* Today's Workouts */}
      {todayWorkouts.length > 0 && (
        <Card style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Today's Workouts</Text>
            <TouchableOpacity onPress={() => router.push('/workouts')}>
              <Text style={styles.seeAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          {todayWorkouts.slice(0, 2).map((workout: Workout) => (
            <View key={workout.id} style={styles.workoutCard}>
              <WorkoutCard
                workout={workout}
                onPress={() => router.push(`/fitness-session/${workout.id}`)}
              />
            </View>
          ))}
        </Card>
      )}

      {/* Upcoming Appointments */}
      {upcomingAppointments.length > 0 && (
        <Card style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
            <TouchableOpacity onPress={() => router.push('/appointments')}>
              <Text style={styles.seeAllText}>View Calendar</Text>
            </TouchableOpacity>
          </View>
          {upcomingAppointments.map((appointment: Appointment) => (
            <View key={appointment.id} style={styles.appointmentCard}>
              <AppointmentCard
                appointment={appointment}
                onPress={() => router.push('/appointments')}
              />
            </View>
          ))}
        </Card>
      )}

      {/* Active Medications */}
      {activeMedications.length > 0 && (
        <Card style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Medications</Text>
            <TouchableOpacity onPress={() => router.push('/medications')}>
              <Text style={styles.seeAllText}>Manage</Text>
            </TouchableOpacity>
          </View>
          {activeMedications.slice(0, 2).map((medication: Medication) => (
            <View key={medication.id} style={styles.medicationCard}>
              <MedicationCard
                medication={medication}
                onPress={() => router.push('/medications')}
              />
            </View>
          ))}
        </Card>
      )}

      {/* Active Goals */}
      {allGoals.length > 0 && (
        <Card style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Active Goals</Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)/profile')}>
              <Text style={styles.seeAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          {allGoals.slice(0, 2).map((goal: any) => (
            <View key={goal.id} style={styles.goalCard}>
              <GoalCard
                goal={goal}
                onPress={() => router.push('/(tabs)/profile')}
              />
            </View>
          ))}
        </Card>
      )}

      {/* Empty State */}
      {allGoals.length === 0 && (
        <Card style={styles.emptyGoalsCard}>
          <Target size={32} color={colors.textSecondary} />
          <Text style={styles.emptyGoalsTitle}>No Active Goals</Text>
          <Text style={styles.emptyGoalsText}>Set your first goal to start tracking progress</Text>
          <TouchableOpacity 
            style={styles.createGoalButton}
            onPress={() => router.push('/(tabs)/profile')}
          >
            <Plus size={16} color={colors.background} />
            <Text style={styles.createGoalButtonText}>Create Goal</Text>
          </TouchableOpacity>
        </Card>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  greeting: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.cardBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  healthScoreCard: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  healthScoreHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  healthScoreTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  healthScoreSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  healthScoreValue: {
    alignItems: 'flex-end',
  },
  healthScoreNumber: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.primary,
  },
  healthScoreUnit: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: -4,
  },
  healthScoreProgress: {
    height: 6,
    backgroundColor: colors.border,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 3,
  },
  quickActionsCard: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickAction: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 8,
    backgroundColor: colors.primary + '10',
    borderRadius: 12,
    marginHorizontal: 4,
  },
  quickActionText: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.text,
    marginTop: 8,
    textAlign: 'center',
  },
  section: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  seeAllText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
  metricsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  workoutCard: {
    marginBottom: 12,
  },
  appointmentCard: {
    marginBottom: 12,
  },
  medicationCard: {
    marginBottom: 12,
  },
  goalCard: {
    marginBottom: 12,
  },
  emptyGoalsCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyGoalsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyGoalsText: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  createGoalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  createGoalButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.background,
    marginLeft: 8,
  },
});