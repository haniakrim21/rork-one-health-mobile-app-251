import React from 'react';
import { Tabs } from 'expo-router';
import { colors } from '@/constants/colors';
import { useSettingsStore } from '@/store/settings-store';
import { getTranslation } from '@/constants/languages';
import { TabBar } from '@/components/TabBar';
import { 
  Home, 
  User, 
  Heart, 
  Activity, 
  Brain, 
  MessageCircle 
} from 'lucide-react-native';

export default function TabLayout() {
  const { settings } = useSettingsStore();
  const t = (key: string) => getTranslation(settings.language, key);

  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.cardBackground,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          paddingTop: 8,
          paddingBottom: 8,
          height: 80,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginTop: 4,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t('home'),
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="health"
        options={{
          title: t('health'),
          tabBarIcon: ({ color, size }) => <Heart size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="fitness"
        options={{
          title: t('fitness'),
          tabBarIcon: ({ color, size }) => <Activity size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="wellness"
        options={{
          title: t('wellness'),
          tabBarIcon: ({ color, size }) => <Brain size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="ai-chat"
        options={{
          title: t('aiChat'),
          tabBarIcon: ({ color, size }) => <MessageCircle size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: t('profile'),
          tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}