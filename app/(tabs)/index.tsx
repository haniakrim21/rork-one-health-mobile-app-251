import React, { useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, I18nManager } from 'react-native';
import { router } from 'expo-router';
import { colors } from '@/constants/colors';
import { useUserStore } from '@/store/user-store';
import { useHealthStore } from '@/store/health-store';
import { useFitnessStore } from '@/store/fitness-store';
import { useWellnessStore } from '@/store/wellness-store';
import { useSettingsStore } from '@/store/settings-store';
import { getTranslation, isRTL } from '@/constants/languages';
import type { PersonalizedGoal } from '@/types';
import { WorkoutCard } from '@/components/WorkoutCard';

export default function HomeScreen() {
  const { user } = useUserStore();
  const { healthMetrics = [] } = useHealthStore();
  const { workouts = [] } = useFitnessStore();
  const { moodEntries = [] } = useWellnessStore();
  const { settings } = useSettingsStore();
  
  const t = useCallback((key: string) => getTranslation(settings.language, key), [settings.language]);
  const isRTLLayout = useMemo(() => isRTL(settings.language), [settings.language]);
  
  React.useEffect(() => {
    I18nManager.allowRTL(true);
    I18nManager.forceRTL(isRTLLayout);
  }, [isRTLLayout]);
  
  const todaysGoals = useMemo(() => 
    (user?.goals || [])
      .filter((goal: PersonalizedGoal) => !goal.completed)
      .slice(0, 3),
    [user?.goals]
  );

  const upcomingWorkouts = useMemo(() => 
    workouts.filter(w => !w.completed).slice(0, 2),
    [workouts]
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>{t('greeting')}</Text>
        <TouchableOpacity onPress={() => router.push('/profile')}>
          <Text style={styles.profileLink}>{t('viewProfile')}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('todaysGoals')}</Text>
        {todaysGoals.map((goal, index) => (
          <View key={index} style={styles.goalItem}>
            <Text>{goal.name}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('upcomingWorkouts')}</Text>
        {upcomingWorkouts.map((workout, index) => (
          <WorkoutCard
            key={index}
            workout={workout}
            onPress={() => router.push(`/workout-details?id=${workout.id}`)}
            onStart={() => router.push(`/fitness-session/${workout.id}`)}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.text,
  },
  profileLink: {
    color: colors.primary,
    fontSize: 16,
  },
  section: {
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: colors.text,
  },
  goalItem: {
    padding: 12,
    backgroundColor: colors.cardBackground,
    borderRadius: 8,
    marginBottom: 8,
  },
});