import React, { useCallback, useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useUserStore } from '@/store/user-store';
import { colors } from '@/constants/colors';
import { Logo } from '@/components/Logo';

export default function IndexScreen() {
  const { user } = useUserStore();
  const navigationAttempted = useRef(false);

  const navigate = useCallback(() => {
    if (user) {
      if (user.completedOnboarding) {
        router.replace('/(tabs)');
      } else {
        router.replace('/onboarding');
      }
    } else {
      router.replace('/(auth)/login');
    }
  }, [user]);

  useEffect(() => {
    if (navigationAttempted.current) return;
    navigationAttempted.current = true;

    const timer = setTimeout(navigate, 2000);
    return () => clearTimeout(timer);
  }, [navigate]);

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