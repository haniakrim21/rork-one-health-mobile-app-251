import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { colors } from '@/constants/colors';
import { Card } from '@/components/Card';
import { Bell, Heart, Dumbbell, Pill, Calendar, MessageCircle } from 'lucide-react-native';

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      title: 'Workout Reminder',
      message: 'Time for your upper body workout!',
      time: '2 hours ago',
      type: 'fitness',
      read: false,
    },
    {
      id: '2',
      title: 'Medication Reminder',
      message: 'Take your evening medication',
      time: '4 hours ago',
      type: 'health',
      read: false,
    },
    {
      id: '3',
      title: 'Sleep Goal Achieved',
      message: 'Great job! You got 8 hours of sleep last night',
      time: '1 day ago',
      type: 'wellness',
      read: true,
    },
    {
      id: '4',
      title: 'Doctor Appointment',
      message: 'Reminder: Appointment with Dr. Smith tomorrow at 2 PM',
      time: '1 day ago',
      type: 'health',
      read: true,
    },
  ]);

  const [settings, setSettings] = useState({
    workoutReminders: true,
    medicationAlerts: true,
    appointmentReminders: true,
    achievementNotifications: true,
    weeklyReports: false,
    aiCoachTips: true,
  });

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'fitness':
        return <Dumbbell size={20} color={colors.fitness} />;
      case 'health':
        return <Heart size={20} color={colors.health} />;
      case 'wellness':
        return <MessageCircle size={20} color={colors.wellness} />;
      default:
        return <Bell size={20} color={colors.primary} />;
    }
  };

  const updateSetting = (key: string, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Notifications</Text>
          
          {notifications.map(notification => (
            <TouchableOpacity 
              key={notification.id}
              style={[
                styles.notificationCard,
                !notification.read && styles.unreadNotification
              ]}
              onPress={() => markAsRead(notification.id)}
            >
              <View style={styles.notificationIcon}>
                {getNotificationIcon(notification.type)}
              </View>
              
              <View style={styles.notificationContent}>
                <Text style={[
                  styles.notificationTitle,
                  !notification.read && styles.unreadText
                ]}>
                  {notification.title}
                </Text>
                <Text style={styles.notificationMessage}>
                  {notification.message}
                </Text>
                <Text style={styles.notificationTime}>
                  {notification.time}
                </Text>
              </View>
              
              {!notification.read && <View style={styles.unreadDot} />}
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notification Settings</Text>
          
          <Card style={styles.settingsCard}>
            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Dumbbell size={20} color={colors.fitness} />
                <View style={styles.settingText}>
                  <Text style={styles.settingTitle}>Workout Reminders</Text>
                  <Text style={styles.settingDescription}>Get notified about scheduled workouts</Text>
                </View>
              </View>
              <Switch
                value={settings.workoutReminders}
                onValueChange={(value) => updateSetting('workoutReminders', value)}
                trackColor={{ false: colors.border, true: colors.primary + '40' }}
                thumbColor={settings.workoutReminders ? colors.primary : colors.textSecondary}
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Pill size={20} color={colors.health} />
                <View style={styles.settingText}>
                  <Text style={styles.settingTitle}>Medication Alerts</Text>
                  <Text style={styles.settingDescription}>Reminders for medication times</Text>
                </View>
              </View>
              <Switch
                value={settings.medicationAlerts}
                onValueChange={(value) => updateSetting('medicationAlerts', value)}
                trackColor={{ false: colors.border, true: colors.primary + '40' }}
                thumbColor={settings.medicationAlerts ? colors.primary : colors.textSecondary}
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Calendar size={20} color={colors.primary} />
                <View style={styles.settingText}>
                  <Text style={styles.settingTitle}>Appointment Reminders</Text>
                  <Text style={styles.settingDescription}>Notifications for upcoming appointments</Text>
                </View>
              </View>
              <Switch
                value={settings.appointmentReminders}
                onValueChange={(value) => updateSetting('appointmentReminders', value)}
                trackColor={{ false: colors.border, true: colors.primary + '40' }}
                thumbColor={settings.appointmentReminders ? colors.primary : colors.textSecondary}
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Heart size={20} color={colors.wellness} />
                <View style={styles.settingText}>
                  <Text style={styles.settingTitle}>Achievement Notifications</Text>
                  <Text style={styles.settingDescription}>Celebrate your health milestones</Text>
                </View>
              </View>
              <Switch
                value={settings.achievementNotifications}
                onValueChange={(value) => updateSetting('achievementNotifications', value)}
                trackColor={{ false: colors.border, true: colors.primary + '40' }}
                thumbColor={settings.achievementNotifications ? colors.primary : colors.textSecondary}
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <MessageCircle size={20} color={colors.primary} />
                <View style={styles.settingText}>
                  <Text style={styles.settingTitle}>AI Coach Tips</Text>
                  <Text style={styles.settingDescription}>Personalized health and fitness tips</Text>
                </View>
              </View>
              <Switch
                value={settings.aiCoachTips}
                onValueChange={(value) => updateSetting('aiCoachTips', value)}
                trackColor={{ false: colors.border, true: colors.primary + '40' }}
                thumbColor={settings.aiCoachTips ? colors.primary : colors.textSecondary}
              />
            </View>
          </Card>
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
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  notificationCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  unreadNotification: {
    backgroundColor: colors.primary + '10',
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  unreadText: {
    fontWeight: '700',
  },
  notificationMessage: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  notificationTime: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
    marginTop: 8,
  },
  settingsCard: {
    padding: 0,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingText: {
    marginLeft: 12,
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