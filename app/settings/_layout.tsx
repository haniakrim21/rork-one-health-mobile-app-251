import React from 'react';
import { Stack } from 'expo-router';
import { useSettingsStore } from '@/store/settings-store';
import { getColors } from '@/constants/colors';

export default function SettingsLayout() {
  const { settings, isHydrated } = useSettingsStore();
  const themeColors = getColors(settings.darkMode);

  // Don't render until settings are hydrated
  if (!isHydrated) {
    return null;
  }

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: themeColors.background,
        },
        headerShadowVisible: false,
        headerTitleStyle: {
          fontWeight: '600',
          color: themeColors.text,
        },
        headerTintColor: themeColors.text,
        headerBackTitle: 'Back',
      }}
    >
      <Stack.Screen 
        name="index" 
        options={{ 
          title: 'Settings',
          headerLargeTitle: true,
        }} 
      />
      <Stack.Screen 
        name="app" 
        options={{ 
          title: 'App Settings',
        }} 
      />
      <Stack.Screen 
        name="notifications" 
        options={{ 
          title: 'Notifications',
        }} 
      />
      <Stack.Screen 
        name="privacy" 
        options={{ 
          title: 'Privacy & Security',
        }} 
      />
    </Stack>
  );
}