import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity, Alert, Modal, FlatList } from 'react-native';
import { Stack } from 'expo-router';
import { colors, getColors } from '@/constants/colors';
import { useSettingsStore } from '@/store/settings-store';
import { Card } from '@/components/Card';
import { Platform } from 'react-native';
import * as Haptics from 'expo-haptics';
import { LANGUAGES, getTranslation } from '@/constants/languages';
import { 
  Palette, 
  Globe, 
  Volume2, 
  VolumeX, 
  Vibrate, 
  Smartphone,
  RefreshCw,
  Trash2,
  Download,
  ChevronRight,
  Moon,
  Sun,
  Wifi,
  WifiOff,
  Image,
  Zap,
  Check,
  X
} from 'lucide-react-native';

export default function AppSettingsScreen() {
  const { settings, updateSetting, resetSettings, clearCache, isHydrated } = useSettingsStore();
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const themeColors = getColors(settings.darkMode);

  // Force re-render when settings change
  const [renderKey, setRenderKey] = useState(0);
  useEffect(() => {
    setRenderKey(prev => prev + 1);
  }, [settings]);

  const t = (key: string) => getTranslation(settings.language, key);

  const handleSettingChange = async (key: keyof typeof settings, value: boolean) => {
    if (isUpdating) return;
    
    setIsUpdating(true);
    console.log(`Toggling ${key} from ${settings[key]} to ${value}`);
    
    // Provide haptic feedback if enabled
    if (settings.hapticFeedback && Platform.OS !== 'web') {
      try {
        await Haptics.selectionAsync();
      } catch (error) {
        console.log('Haptics not available:', error);
      }
    }
    
    updateSetting(key, value);
    
    // Small delay to prevent rapid toggling
    setTimeout(() => {
      setIsUpdating(false);
    }, 200);
  };

  const handleLanguageSelect = (languageName: string) => {
    console.log(`Selecting language: ${languageName}`);
    updateSetting('language', languageName);
    setShowLanguageModal(false);
    
    if (settings.hapticFeedback && Platform.OS !== 'web') {
      try {
        Haptics.selectionAsync();
      } catch (error) {
        console.log('Haptics not available:', error);
      }
    }
  };

  const handleUnitsPress = () => {
    Alert.alert(
      t('units'),
      'Choose your preferred measurement units',
      [
        { 
          text: 'Metric', 
          onPress: () => {
            updateSetting('units', 'metric');
            if (settings.hapticFeedback && Platform.OS !== 'web') {
              try {
                Haptics.selectionAsync();
              } catch (error) {
                console.log('Haptics not available:', error);
              }
            }
          }
        },
        { 
          text: 'Imperial', 
          onPress: () => {
            updateSetting('units', 'imperial');
            if (settings.hapticFeedback && Platform.OS !== 'web') {
              try {
                Haptics.selectionAsync();
              } catch (error) {
                console.log('Haptics not available:', error);
              }
            }
          }
        },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const handleClearCache = async () => {
    Alert.alert(
      t('clearCache'),
      'This will clear temporary files and may improve app performance. This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Clear', 
          style: 'destructive',
          onPress: async () => {
            try {
              await clearCache();
              Alert.alert('Success', 'Cache cleared successfully!');
              if (settings.hapticFeedback && Platform.OS !== 'web') {
                try {
                  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                } catch (error) {
                  console.log('Haptics not available:', error);
                }
              }
            } catch (error) {
              Alert.alert('Error', 'Failed to clear cache. Please try again.');
              if (settings.hapticFeedback && Platform.OS !== 'web') {
                try {
                  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
                } catch (error) {
                  console.log('Haptics not available:', error);
                }
              }
            }
          }
        }
      ]
    );
  };

  const handleResetSettings = () => {
    Alert.alert(
      t('resetSettings'),
      'This will reset all app settings to their default values. This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Reset', 
          style: 'destructive',
          onPress: () => {
            resetSettings();
            Alert.alert('Success', 'Settings have been reset to defaults!');
            if (settings.hapticFeedback && Platform.OS !== 'web') {
              try {
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
              } catch (error) {
                console.log('Haptics not available:', error);
              }
            }
          }
        }
      ]
    );
  };

  const SettingItem = ({ 
    icon, 
    title, 
    description, 
    settingKey, 
    iconColor = themeColors.primary 
  }: {
    icon: React.ReactNode;
    title: string;
    description: string;
    settingKey: keyof typeof settings;
    iconColor?: string;
  }) => {
    const currentValue = settings[settingKey] as boolean;
    
    return (
      <View style={[styles.settingItem, { borderBottomColor: themeColors.border }]}>
        <View style={styles.settingInfo}>
          <View style={[styles.settingIcon, { backgroundColor: iconColor + '20' }]}>
            {icon}
          </View>
          <View style={styles.settingText}>
            <Text style={[styles.settingTitle, { color: themeColors.text }]}>{title}</Text>
            <Text style={[styles.settingDescription, { color: themeColors.textSecondary }]}>{description}</Text>
          </View>
        </View>
        <Switch
          value={currentValue}
          onValueChange={(value) => handleSettingChange(settingKey, value)}
          trackColor={{ false: themeColors.border, true: themeColors.primary + '40' }}
          thumbColor={currentValue ? themeColors.primary : themeColors.textSecondary}
          ios_backgroundColor={themeColors.border}
          disabled={isUpdating}
        />
      </View>
    );
  };

  const SelectionItem = ({ 
    icon, 
    title, 
    value, 
    onPress, 
    iconColor = themeColors.primary 
  }: {
    icon: React.ReactNode;
    title: string;
    value: string;
    onPress: () => void;
    iconColor?: string;
  }) => (
    <TouchableOpacity 
      style={[styles.selectionItem, { borderBottomColor: themeColors.border }]} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.settingInfo}>
        <View style={[styles.settingIcon, { backgroundColor: iconColor + '20' }]}>
          {icon}
        </View>
        <View style={styles.settingText}>
          <Text style={[styles.settingTitle, { color: themeColors.text }]}>{title}</Text>
          <Text style={[styles.settingValue, { color: themeColors.primary }]}>{value}</Text>
        </View>
      </View>
      <ChevronRight size={20} color={themeColors.textSecondary} />
    </TouchableOpacity>
  );

  const ActionItem = ({ 
    icon, 
    title, 
    description, 
    onPress, 
    iconColor = themeColors.primary,
    textColor = themeColors.text
  }: {
    icon: React.ReactNode;
    title: string;
    description: string;
    onPress: () => void;
    iconColor?: string;
    textColor?: string;
  }) => (
    <TouchableOpacity 
      style={[styles.actionItem, { borderBottomColor: themeColors.border }]} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.settingInfo}>
        <View style={[styles.settingIcon, { backgroundColor: iconColor + '20' }]}>
          {icon}
        </View>
        <View style={styles.settingText}>
          <Text style={[styles.settingTitle, { color: textColor }]}>{title}</Text>
          <Text style={[styles.settingDescription, { color: themeColors.textSecondary }]}>{description}</Text>
        </View>
      </View>
      <ChevronRight size={20} color={themeColors.textSecondary} />
    </TouchableOpacity>
  );

  const LanguageModal = () => (
    <Modal
      visible={showLanguageModal}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={() => setShowLanguageModal(false)}
    >
      <View style={[styles.modalContainer, { backgroundColor: themeColors.background }]}>
        <View style={[styles.modalHeader, { borderBottomColor: themeColors.border }]}>
          <TouchableOpacity 
            onPress={() => setShowLanguageModal(false)}
            style={styles.modalCloseButton}
          >
            <X size={24} color={themeColors.text} />
          </TouchableOpacity>
          <Text style={[styles.modalTitle, { color: themeColors.text }]}>Select Language</Text>
          <View style={styles.modalCloseButton} />
        </View>
        
        <FlatList
          data={LANGUAGES}
          keyExtractor={(item) => item.code}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.languageItem, { borderBottomColor: themeColors.border }]}
              onPress={() => handleLanguageSelect(item.name)}
              activeOpacity={0.7}
            >
              <View style={styles.languageInfo}>
                <Text style={[styles.languageText, { color: themeColors.text }]}>
                  {item.name}
                </Text>
                <Text style={[styles.languageNative, { color: themeColors.textSecondary }]}>
                  {item.nativeName}
                </Text>
              </View>
              {settings.language === item.name && (
                <Check size={20} color={themeColors.primary} />
              )}
            </TouchableOpacity>
          )}
          style={styles.languageList}
        />
      </View>
    </Modal>
  );

  if (!isHydrated) {
    return (
      <View style={[styles.container, styles.loadingContainer, { backgroundColor: themeColors.background }]}>
        <Text style={[styles.loadingText, { color: themeColors.text }]}>Loading settings...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]} key={renderKey}>
      <Stack.Screen 
        options={{ 
          title: t('appSettings'),
          headerStyle: { backgroundColor: themeColors.background },
          headerTitleStyle: { color: themeColors.text },
          headerTintColor: themeColors.text,
        }} 
      />
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Card style={styles.section}>
          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>{t('appearance')}</Text>
          
          <SettingItem
            icon={settings.darkMode ? <Moon size={20} color={themeColors.primary} /> : <Sun size={20} color={themeColors.primary} />}
            title={t('darkMode')}
            description="Use dark theme throughout the app"
            settingKey="darkMode"
          />
          
          <SelectionItem
            icon={<Palette size={20} color={themeColors.warning} />}
            title={t('language')}
            value={settings.language}
            onPress={() => setShowLanguageModal(true)}
            iconColor={themeColors.warning}
          />
          
          <SelectionItem
            icon={<Globe size={20} color={themeColors.success} />}
            title={t('units')}
            value={settings.units === 'metric' ? 'Metric' : 'Imperial'}
            onPress={handleUnitsPress}
            iconColor={themeColors.success}
          />
        </Card>

        <Card style={styles.section}>
          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>{t('audioHaptics')}</Text>
          
          <SettingItem
            icon={settings.soundEffects ? <Volume2 size={20} color={themeColors.primary} /> : <VolumeX size={20} color={themeColors.primary} />}
            title={t('soundEffects')}
            description="Play sounds for app interactions"
            settingKey="soundEffects"
          />
          
          <SettingItem
            icon={<Vibrate size={20} color={themeColors.fitness} />}
            title={t('hapticFeedback')}
            description="Feel vibrations for app interactions"
            settingKey="hapticFeedback"
            iconColor={themeColors.fitness}
          />
        </Card>

        <Card style={styles.section}>
          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>{t('dataSync')}</Text>
          
          <SettingItem
            icon={settings.autoSync ? <Wifi size={20} color={themeColors.primary} /> : <WifiOff size={20} color={themeColors.primary} />}
            title={t('autoSync')}
            description="Automatically sync data when connected"
            settingKey="autoSync"
          />
          
          <SettingItem
            icon={<Smartphone size={20} color={themeColors.warning} />}
            title={t('offlineMode')}
            description="Use app features without internet"
            settingKey="offlineMode"
            iconColor={themeColors.warning}
          />
          
          <SettingItem
            icon={<Image size={20} color={themeColors.success} />}
            title={t('highQualityImages')}
            description="Download higher resolution images"
            settingKey="highQualityImages"
            iconColor={themeColors.success}
          />
          
          <SettingItem
            icon={<RefreshCw size={20} color={themeColors.info} />}
            title={t('backgroundRefresh')}
            description="Update content in the background"
            settingKey="backgroundRefresh"
            iconColor={themeColors.info}
          />
        </Card>

        <Card style={styles.section}>
          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>{t('advanced')}</Text>
          
          <SettingItem
            icon={<Zap size={20} color={themeColors.health} />}
            title={t('betaFeatures')}
            description="Enable experimental features"
            settingKey="betaFeatures"
            iconColor={themeColors.health}
          />
          
          <ActionItem
            icon={<Trash2 size={20} color={themeColors.warning} />}
            title={t('clearCache')}
            description="Free up storage space"
            onPress={handleClearCache}
            iconColor={themeColors.warning}
          />
          
          <ActionItem
            icon={<RefreshCw size={20} color={themeColors.error} />}
            title={t('resetSettings')}
            description="Reset all settings to defaults"
            onPress={handleResetSettings}
            iconColor={themeColors.error}
            textColor={themeColors.error}
          />
        </Card>

        <Card style={[styles.infoCard, { backgroundColor: themeColors.cardBackground }]}>
          <Text style={[styles.infoTitle, { color: themeColors.text }]}>{t('appInformation')}</Text>
          <View style={[styles.infoRow, { borderBottomColor: themeColors.border }]}>
            <Text style={[styles.infoLabel, { color: themeColors.textSecondary }]}>{t('version')}</Text>
            <Text style={[styles.infoValue, { color: themeColors.text }]}>{settings.version}</Text>
          </View>
          <View style={[styles.infoRow, { borderBottomColor: themeColors.border }]}>
            <Text style={[styles.infoLabel, { color: themeColors.textSecondary }]}>{t('build')}</Text>
            <Text style={[styles.infoValue, { color: themeColors.text }]}>{settings.build}</Text>
          </View>
          <View style={[styles.infoRow, { borderBottomColor: themeColors.border }]}>
            <Text style={[styles.infoLabel, { color: themeColors.textSecondary }]}>{t('lastUpdated')}</Text>
            <Text style={[styles.infoValue, { color: themeColors.text }]}>{settings.lastUpdated}</Text>
          </View>
        </Card>
      </ScrollView>
      
      <LanguageModal />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    fontWeight: '500',
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
  },
  selectionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  actionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
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
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 14,
  },
  settingValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  infoCard: {
    marginBottom: 16,
    padding: 16,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
  },
  infoLabel: {
    fontSize: 16,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  modalContainer: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  modalCloseButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  languageList: {
    flex: 1,
  },
  languageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  languageInfo: {
    flex: 1,
  },
  languageText: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  languageNative: {
    fontSize: 14,
  },
});