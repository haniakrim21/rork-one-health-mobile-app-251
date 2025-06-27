import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useUserStore } from '@/store/user-store';
import { colors } from '@/constants/colors';
import { Logo } from '@/components/Logo';

export default function IndexScreen() {
  const { user } = useUserStore();
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    if (isNavigating) return;

    const timer = setTimeout(() => {
      setIsNavigating(true);
      try {
        if (user) {
          if (user.completedOnboarding) {
            router.replace('/(tabs)');
          } else {
            router.replace('/onboarding');
          }
        } else {
          router.replace('/(auth)/login');
        }
      } catch (error) {
        console.error('Navigation error:', error);
        router.replace('/(auth)/login');
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [user, isNavigating]);

  return (
    <View style={styles.container}>
      <Logo size="large" variant="vertical" color={colors.logoTeal} />
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  loadingText: {
    marginTop: 24,
    fontSize: 16,
    color: colors.textSecondary,
  },
});