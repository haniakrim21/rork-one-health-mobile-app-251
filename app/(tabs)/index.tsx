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

// ... rest of the imports ...

export default function HomeScreen() {
  const { user } = useUserStore();
  const { healthMetrics = [] } = useHealthStore();
  const { workouts = [] } = useFitnessStore();
  const { moodEntries = [] } = useWellnessStore();
  const { settings } = useSettingsStore();
  
  const t = useCallback((key: string) => getTranslation(settings.language, key), [settings.language]);
  const isRTLLayout = useMemo(() => isRTL(settings.language), [settings.language]);
  
  // Set RTL layout once when language changes
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

  // ... rest of the component code remains the same ...
  
  return (
    // ... existing JSX ...
  );
}

// ... styles remain the same ...