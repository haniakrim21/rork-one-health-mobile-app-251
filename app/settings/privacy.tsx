import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity, Alert } from 'react-native';
import { colors } from '@/constants/colors';
import { Card } from '@/components/Card';
import { 
  Shield, 
  Eye, 
  EyeOff, 
  Lock, 
  Users, 
  MapPin, 
  Activity,
  Trash2,
  Download,
  ChevronRight
} from 'lucide-react-native';

export default function PrivacySettingsScreen() {
  const [settings, setSettings] = useState({
    profileVisibility: true,
    activitySharing: false,
    locationSharing: false,
    healthDataSharing: false,
    analyticsOptIn: true,
    crashReporting: true,
    personalizedAds: false,
    dataCollection: true,
  });

  const updateSetting = (key: string, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleDataExport = () => {
    Alert.alert(
      'Export Data',
      'Your data export will be prepared and sent to your email address within 24 hours.',
      [{ text: 'OK' }]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'This action cannot be undone. All your data will be permanently deleted.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => Alert.alert('Account Deletion', 'Account deletion request submitted.')
        }
      ]
    );
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

  const ActionItem = ({ 
    icon, 
    title, 
    description, 
    onPress, 
    iconColor = colors.primary,
    textColor = colors.text
  }: {
    icon: React.ReactNode;
    title: string;
    description: string;
    onPress: () => void;
    iconColor?: string;
    textColor?: string;
  }) => (
    <TouchableOpacity style={styles.actionItem} onPress={onPress}>
      <View style={styles.settingInfo}>
        <View style={[styles.settingIcon, { backgroundColor: iconColor + '20' }]}>
          {icon}
        </View>
        <View style={styles.settingText}>
          <Text style={[styles.settingTitle, { color: textColor }]}>{title}</Text>
          <Text style={styles.settingDescription}>{description}</Text>
        </View>
      </View>
      <ChevronRight size={20} color={colors.textSecondary} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Profile Privacy</Text>
          
          <SettingItem
            icon={settings.profileVisibility ? <Eye size={20} color={colors.primary} /> : <EyeOff size={20} color={colors.primary} />}
            title="Profile Visibility"
            description="Make your profile visible to other users"
            settingKey="profileVisibility"
          />
          
          <SettingItem
            icon={<Activity size={20} color={colors.fitness} />}
            title="Activity Sharing"
            description="Share your workout activities with friends"
            settingKey="activitySharing"
            iconColor={colors.fitness}
          />
          
          <SettingItem
            icon={<MapPin size={20} color={colors.warning} />}
            title="Location Sharing"
            description="Share your location for nearby features"
            settingKey="locationSharing"
            iconColor={colors.warning}
          />
          
          <SettingItem
            icon={<Shield size={20} color={colors.health} />}
            title="Health Data Sharing"
            description="Share health data with healthcare providers"
            settingKey="healthDataSharing"
            iconColor={colors.health}
          />
        </Card>

        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Data & Analytics</Text>
          
          <SettingItem
            icon={<Activity size={20} color={colors.primary} />}
            title="Analytics"
            description="Help improve the app with usage analytics"
            settingKey="analyticsOptIn"
          />
          
          <SettingItem
            icon={<Shield size={20} color={colors.success} />}
            title="Crash Reporting"
            description="Send crash reports to help fix bugs"
            settingKey="crashReporting"
            iconColor={colors.success}
          />
          
          <SettingItem
            icon={<Users size={20} color={colors.warning} />}
            title="Personalized Ads"
            description="Show ads based on your interests"
            settingKey="personalizedAds"
            iconColor={colors.warning}
          />
          
          <SettingItem
            icon={<Lock size={20} color={colors.textSecondary} />}
            title="Data Collection"
            description="Allow collection of usage data"
            settingKey="dataCollection"
            iconColor={colors.textSecondary}
          />
        </Card>

        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Data Management</Text>
          
          <ActionItem
            icon={<Download size={20} color={colors.primary} />}
            title="Export Data"
            description="Download a copy of your data"
            onPress={handleDataExport}
          />
          
          <ActionItem
            icon={<Trash2 size={20} color={colors.error} />}
            title="Delete Account"
            description="Permanently delete your account and data"
            onPress={handleDeleteAccount}
            iconColor={colors.error}
            textColor={colors.error}
          />
        </Card>

        <Card style={styles.infoCard}>
          <Text style={styles.infoTitle}>Privacy Information</Text>
          <Text style={styles.infoText}>
            We take your privacy seriously. Your health data is encrypted and stored securely. 
            We never sell your personal information to third parties. 
            You can review our full privacy policy in the app settings.
          </Text>
          <TouchableOpacity 
            style={styles.privacyPolicyButton}
            onPress={() => Alert.alert('Privacy Policy', 'Privacy policy feature coming soon!')}
          >
            <Text style={styles.privacyPolicyText}>Read Privacy Policy</Text>
            <ChevronRight size={16} color={colors.primary} />
          </TouchableOpacity>
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
  actionItem: {
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
  infoCard: {
    marginBottom: 16,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 16,
  },
  privacyPolicyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  privacyPolicyText: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '500',
  },
});