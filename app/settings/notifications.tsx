import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch } from 'react-native';
import { colors } from '@/constants/colors';
import { Card } from '@/components/Card';
import { Bell, Smartphone, Mail, MessageCircle } from 'lucide-react-native';

export default function NotificationSettingsScreen() {
  const [settings, setSettings] = useState({
    pushNotifications: true,
    emailNotifications: false,
    smsNotifications: false,
    workoutReminders: true,
    mealReminders: true,
    medicationAlerts: true,
    appointmentReminders: true,
    achievementNotifications: true,
    weeklyReports: false,
    aiCoachTips: true,
    socialUpdates: false,
    marketingEmails: false,
  });

  const updateSetting = (key: string, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const SettingItem = ({ 
    icon, 
    title, 
    description, 
    settingKey, 
    iconColor = colors.primary 
  }: {
    icon: React.ReactNode;
    title: string;
    description: string;
    settingKey: string;
    iconColor?: string;
  }) => (
    <View style={styles.settingItem}>
      <View style={styles.settingInfo}>
        <View style={[styles.settingIcon, { backgroundColor: iconColor + '20' }]}>
          {icon}
        </View>
        <View style={styles.settingText}>
          <Text style={styles.settingTitle}>{title}</Text>
          <Text style={styles.settingDescription}>{description}</Text>
        </View>
      </View>
      <Switch
        value={settings[settingKey as keyof typeof settings]}
        onValueChange={(value) => updateSetting(settingKey, value)}
        trackColor={{ false: colors.border, true: colors.primary + '40' }}
        thumbColor={settings[settingKey as keyof typeof settings] ? colors.primary : colors.textSecondary}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Notification Methods</Text>
          
          <SettingItem
            icon={<Smartphone size={20} color={colors.primary} />}
            title="Push Notifications"
            description="Receive notifications on your device"
            settingKey="pushNotifications"
          />
          
          <SettingItem
            icon={<Mail size={20} color={colors.success} />}
            title="Email Notifications"
            description="Receive notifications via email"
            settingKey="emailNotifications"
            iconColor={colors.success}
          />
          
          <SettingItem
            icon={<MessageCircle size={20} color={colors.warning} />}
            title="SMS Notifications"
            description="Receive notifications via text message"
            settingKey="smsNotifications"
            iconColor={colors.warning}
          />
        </Card>

        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Health & Fitness</Text>
          
          <SettingItem
            icon={<Bell size={20} color={colors.fitness} />}
            title="Workout Reminders"
            description="Get notified about scheduled workouts"
            settingKey="workoutReminders"
            iconColor={colors.fitness}
          />
          
          <SettingItem
            icon={<Bell size={20} color={colors.success} />}
            title="Meal Reminders"
            description="Reminders for meal times and nutrition"
            settingKey="mealReminders"
            iconColor={colors.success}
          />
          
          <SettingItem
            icon={<Bell size={20} color={colors.health} />}
            title="Medication Alerts"
            description="Never miss your medication schedule"
            settingKey="medicationAlerts"
            iconColor={colors.health}
          />
          
          <SettingItem
            icon={<Bell size={20} color={colors.primary} />}
            title="Appointment Reminders"
            description="Notifications for upcoming appointments"
            settingKey="appointmentReminders"
          />
        </Card>

        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Progress & Insights</Text>
          
          <SettingItem
            icon={<Bell size={20} color={colors.wellness} />}
            title="Achievement Notifications"
            description="Celebrate your health milestones"
            settingKey="achievementNotifications"
            iconColor={colors.wellness}
          />
          
          <SettingItem
            icon={<Bell size={20} color={colors.textSecondary} />}
            title="Weekly Reports"
            description="Summary of your weekly progress"
            settingKey="weeklyReports"
            iconColor={colors.textSecondary}
          />
          
          <SettingItem
            icon={<Bell size={20} color={colors.primary} />}
            title="AI Coach Tips"
            description="Personalized health and fitness tips"
            settingKey="aiCoachTips"
          />
        </Card>

        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Social & Marketing</Text>
          
          <SettingItem
            icon={<Bell size={20} color={colors.warning} />}
            title="Social Updates"
            description="Updates from friends and community"
            settingKey="socialUpdates"
            iconColor={colors.warning}
          />
          
          <SettingItem
            icon={<Bell size={20} color={colors.error} />}
            title="Marketing Emails"
            description="Promotional offers and updates"
            settingKey="marketingEmails"
            iconColor={colors.error}
          />
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  section: {
    marginBottom: 16,
    padding: 0,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 14,
    color: colors.textSecondary,
  },
});