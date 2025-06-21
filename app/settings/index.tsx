import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert, I18nManager } from 'react-native';
import { router } from 'expo-router';
import { colors } from '@/constants/colors';
import { useSettingsStore } from '@/store/settings-store';
import { getTranslation, LANGUAGES, isRTL } from '@/constants/languages';
import { Card } from '@/components/Card';
import { 
  ArrowLeft, 
  Palette, 
  Globe, 
  Volume2, 
  Vibrate, 
  RefreshCw, 
  Wifi, 
  Image, 
  Activity, 
  TestTube, 
  Trash2, 
  RotateCcw, 
  Info,
  ChevronRight,
  Moon,
  Sun
} from 'lucide-react-native';

export default function SettingsScreen() {
  const { settings, updateSetting, resetSettings, clearCache } = useSettingsStore();
  
  const t = (key: string) => getTranslation(settings.language, key);
  const isRTLLayout = isRTL(settings.language);
  
  // Set RTL layout
  React.useEffect(() => {
    I18nManager.allowRTL(true);
    I18nManager.forceRTL(isRTLLayout);
  }, [isRTLLayout]);
  
  const handleLanguageChange = (language: string) => {
    updateSetting('language', language);
  };
  
  const handleResetSettings = () => {
    Alert.alert(
      t('resetSettings'),
      t('resetSettingsConfirm'),
      [
        { text: t('cancel'), style: 'cancel' },
        { 
          text: t('reset'), 
          style: 'destructive',
          onPress: () => {
            resetSettings();
            Alert.alert(t('success'), t('settingsResetSuccess'));
          }
        }
      ]
    );
  };
  
  const handleClearCache = async () => {
    Alert.alert(
      t('clearCache'),
      t('clearCacheConfirm'),
      [
        { text: t('cancel'), style: 'cancel' },
        { 
          text: t('clear'), 
          style: 'destructive',
          onPress: async () => {
            try {
              await clearCache();
              Alert.alert(t('success'), t('cacheCleared'));
            } catch (error) {
              Alert.alert(t('error'), t('failedToClearCache'));
            }
          }
        }
      ]
    );
  };
  
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, isRTLLayout && styles.headerRTL]}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, isRTLLayout && styles.textRTL]}>{t('settings')}</Text>
        <View style={styles.headerSpacer} />
      </View>
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* App Settings */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, isRTLLayout && styles.textRTL]}>{t('appSettings')}</Text>
          
          {/* Appearance */}
          <Card variant="elevated" style={styles.settingCard}>
            <View style={[styles.settingHeader, isRTLLayout && styles.settingHeaderRTL]}>
              <View style={styles.settingIcon}>
                <Palette size={20} color={colors.primary} />
              </View>
              <Text style={[styles.settingTitle, isRTLLayout && styles.textRTL]}>{t('appearance')}</Text>
            </View>
            
            <View style={[styles.settingItem, isRTLLayout && styles.settingItemRTL]}>
              <View style={[styles.settingItemLeft, isRTLLayout && styles.settingItemLeftRTL]}>
                {settings.darkMode ? (
                  <Moon size={16} color={colors.textSecondary} />
                ) : (
                  <Sun size={16} color={colors.textSecondary} />
                )}
                <Text style={[styles.settingItemText, isRTLLayout && styles.textRTL]}>{t('darkMode')}</Text>
              </View>
              <Switch
                value={settings.darkMode}
                onValueChange={(value) => updateSetting('darkMode', value)}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={colors.cardBackground}
              />
            </View>
          </Card>
          
          {/* Language */}
          <Card variant="elevated" style={styles.settingCard}>
            <View style={[styles.settingHeader, isRTLLayout && styles.settingHeaderRTL]}>
              <View style={styles.settingIcon}>
                <Globe size={20} color={colors.primary} />
              </View>
              <Text style={[styles.settingTitle, isRTLLayout && styles.textRTL]}>{t('language')}</Text>
            </View>
            
            <View style={styles.languageContainer}>
              {LANGUAGES.map((lang) => (
                <TouchableOpacity
                  key={lang.code}
                  style={[
                    styles.languageOption,
                    settings.language === lang.name && styles.languageOptionSelected
                  ]}
                  onPress={() => handleLanguageChange(lang.name)}
                >
                  <View style={[styles.languageInfo, isRTLLayout && styles.languageInfoRTL]}>
                    <Text style={[
                      styles.languageName,
                      settings.language === lang.name && styles.languageNameSelected,
                      isRTLLayout && styles.textRTL
                    ]}>
                      {lang.name}
                    </Text>
                    <Text style={[
                      styles.languageNative,
                      settings.language === lang.name && styles.languageNativeSelected,
                      isRTLLayout && styles.textRTL
                    ]}>
                      {lang.nativeName}
                    </Text>
                  </View>
                  {settings.language === lang.name && (
                    <View style={styles.selectedIndicator} />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </Card>
          
          {/* Units */}
          <Card variant="elevated" style={styles.settingCard}>
            <View style={[styles.settingHeader, isRTLLayout && styles.settingHeaderRTL]}>
              <View style={styles.settingIcon}>
                <Activity size={20} color={colors.primary} />
              </View>
              <Text style={[styles.settingTitle, isRTLLayout && styles.textRTL]}>{t('units')}</Text>
            </View>
            
            <View style={styles.unitsContainer}>
              <TouchableOpacity
                style={[
                  styles.unitOption,
                  settings.units === 'metric' && styles.unitOptionSelected
                ]}
                onPress={() => updateSetting('units', 'metric')}
              >
                <Text style={[
                  styles.unitText,
                  settings.units === 'metric' && styles.unitTextSelected,
                  isRTLLayout && styles.textRTL
                ]}>
                  Metric (kg, cm)
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.unitOption,
                  settings.units === 'imperial' && styles.unitOptionSelected
                ]}
                onPress={() => updateSetting('units', 'imperial')}
              >
                <Text style={[
                  styles.unitText,
                  settings.units === 'imperial' && styles.unitTextSelected,
                  isRTLLayout && styles.textRTL
                ]}>
                  Imperial (lbs, ft)
                </Text>
              </TouchableOpacity>
            </View>
          </Card>
        </View>
        
        {/* Audio & Haptics */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, isRTLLayout && styles.textRTL]}>{t('audioHaptics')}</Text>
          
          <Card variant="elevated" style={styles.settingCard}>
            <View style={[styles.settingItem, isRTLLayout && styles.settingItemRTL]}>
              <View style={[styles.settingItemLeft, isRTLLayout && styles.settingItemLeftRTL]}>
                <Volume2 size={16} color={colors.textSecondary} />
                <Text style={[styles.settingItemText, isRTLLayout && styles.textRTL]}>{t('soundEffects')}</Text>
              </View>
              <Switch
                value={settings.soundEffects}
                onValueChange={(value) => updateSetting('soundEffects', value)}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={colors.cardBackground}
              />
            </View>
            
            <View style={[styles.settingItem, isRTLLayout && styles.settingItemRTL]}>
              <View style={[styles.settingItemLeft, isRTLLayout && styles.settingItemLeftRTL]}>
                <Vibrate size={16} color={colors.textSecondary} />
                <Text style={[styles.settingItemText, isRTLLayout && styles.textRTL]}>{t('hapticFeedback')}</Text>
              </View>
              <Switch
                value={settings.hapticFeedback}
                onValueChange={(value) => updateSetting('hapticFeedback', value)}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={colors.cardBackground}
              />
            </View>
          </Card>
        </View>
        
        {/* Data & Sync */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, isRTLLayout && styles.textRTL]}>{t('dataSync')}</Text>
          
          <Card variant="elevated" style={styles.settingCard}>
            <View style={[styles.settingItem, isRTLLayout && styles.settingItemRTL]}>
              <View style={[styles.settingItemLeft, isRTLLayout && styles.settingItemLeftRTL]}>
                <RefreshCw size={16} color={colors.textSecondary} />
                <Text style={[styles.settingItemText, isRTLLayout && styles.textRTL]}>{t('autoSync')}</Text>
              </View>
              <Switch
                value={settings.autoSync}
                onValueChange={(value) => updateSetting('autoSync', value)}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={colors.cardBackground}
              />
            </View>
            
            <View style={[styles.settingItem, isRTLLayout && styles.settingItemRTL]}>
              <View style={[styles.settingItemLeft, isRTLLayout && styles.settingItemLeftRTL]}>
                <Wifi size={16} color={colors.textSecondary} />
                <Text style={[styles.settingItemText, isRTLLayout && styles.textRTL]}>{t('offlineMode')}</Text>
              </View>
              <Switch
                value={settings.offlineMode}
                onValueChange={(value) => updateSetting('offlineMode', value)}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={colors.cardBackground}
              />
            </View>
            
            <View style={[styles.settingItem, isRTLLayout && styles.settingItemRTL]}>
              <View style={[styles.settingItemLeft, isRTLLayout && styles.settingItemLeftRTL]}>
                <Image size={16} color={colors.textSecondary} />
                <Text style={[styles.settingItemText, isRTLLayout && styles.textRTL]}>{t('highQualityImages')}</Text>
              </View>
              <Switch
                value={settings.highQualityImages}
                onValueChange={(value) => updateSetting('highQualityImages', value)}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={colors.cardBackground}
              />
            </View>
            
            <View style={[styles.settingItem, isRTLLayout && styles.settingItemRTL]}>
              <View style={[styles.settingItemLeft, isRTLLayout && styles.settingItemLeftRTL]}>
                <Activity size={16} color={colors.textSecondary} />
                <Text style={[styles.settingItemText, isRTLLayout && styles.textRTL]}>{t('backgroundRefresh')}</Text>
              </View>
              <Switch
                value={settings.backgroundRefresh}
                onValueChange={(value) => updateSetting('backgroundRefresh', value)}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={colors.cardBackground}
              />
            </View>
          </Card>
        </View>
        
        {/* Advanced */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, isRTLLayout && styles.textRTL]}>{t('advanced')}</Text>
          
          <Card variant="elevated" style={styles.settingCard}>
            <View style={[styles.settingItem, isRTLLayout && styles.settingItemRTL]}>
              <View style={[styles.settingItemLeft, isRTLLayout && styles.settingItemLeftRTL]}>
                <TestTube size={16} color={colors.textSecondary} />
                <Text style={[styles.settingItemText, isRTLLayout && styles.textRTL]}>{t('betaFeatures')}</Text>
              </View>
              <Switch
                value={settings.betaFeatures}
                onValueChange={(value) => updateSetting('betaFeatures', value)}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={colors.cardBackground}
              />
            </View>
            
            <TouchableOpacity style={[styles.settingItem, isRTLLayout && styles.settingItemRTL]} onPress={handleClearCache}>
              <View style={[styles.settingItemLeft, isRTLLayout && styles.settingItemLeftRTL]}>
                <Trash2 size={16} color={colors.warning} />
                <Text style={[styles.settingItemText, { color: colors.warning }, isRTLLayout && styles.textRTL]}>
                  {t('clearCache')}
                </Text>
              </View>
              <ChevronRight size={16} color={colors.textSecondary} />
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.settingItem, isRTLLayout && styles.settingItemRTL]} onPress={handleResetSettings}>
              <View style={[styles.settingItemLeft, isRTLLayout && styles.settingItemLeftRTL]}>
                <RotateCcw size={16} color={colors.error} />
                <Text style={[styles.settingItemText, { color: colors.error }, isRTLLayout && styles.textRTL]}>
                  {t('resetSettings')}
                </Text>
              </View>
              <ChevronRight size={16} color={colors.textSecondary} />
            </TouchableOpacity>
          </Card>
        </View>
        
        {/* App Information */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, isRTLLayout && styles.textRTL]}>{t('appInformation')}</Text>
          
          <Card variant="elevated" style={styles.settingCard}>
            <View style={[styles.infoItem, isRTLLayout && styles.infoItemRTL]}>
              <Text style={[styles.infoLabel, isRTLLayout && styles.textRTL]}>{t('version')}</Text>
              <Text style={[styles.infoValue, isRTLLayout && styles.textRTL]}>{settings.version}</Text>
            </View>
            
            <View style={[styles.infoItem, isRTLLayout && styles.infoItemRTL]}>
              <Text style={[styles.infoLabel, isRTLLayout && styles.textRTL]}>{t('build')}</Text>
              <Text style={[styles.infoValue, isRTLLayout && styles.textRTL]}>{settings.build}</Text>
            </View>
            
            <View style={[styles.infoItem, isRTLLayout && styles.infoItemRTL]}>
              <Text style={[styles.infoLabel, isRTLLayout && styles.textRTL]}>{t('lastUpdated')}</Text>
              <Text style={[styles.infoValue, isRTLLayout && styles.textRTL]}>{settings.lastUpdated}</Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerRTL: {
    flexDirection: 'row-reverse',
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.cardBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    flex: 1,
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
  },
  textRTL: {
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  headerSpacer: {
    width: 44,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  settingCard: {
    marginBottom: 12,
  },
  settingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  settingHeaderRTL: {
    flexDirection: 'row-reverse',
  },
  settingIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: `${colors.primary}15`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  settingItemRTL: {
    flexDirection: 'row-reverse',
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingItemLeftRTL: {
    flexDirection: 'row-reverse',
  },
  settingItemText: {
    fontSize: 16,
    color: colors.text,
    marginLeft: 12,
  },
  languageContainer: {
    gap: 8,
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  languageOptionSelected: {
    backgroundColor: `${colors.primary}15`,
    borderColor: colors.primary,
  },
  languageInfo: {
    flex: 1,
  },
  languageInfoRTL: {
    alignItems: 'flex-end',
  },
  languageName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  languageNameSelected: {
    color: colors.primary,
  },
  languageNative: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  languageNativeSelected: {
    color: colors.primary,
  },
  selectedIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  unitsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  unitOption: {
    flex: 1,
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  unitOptionSelected: {
    backgroundColor: `${colors.primary}15`,
    borderColor: colors.primary,
  },
  unitText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  unitTextSelected: {
    color: colors.primary,
    fontWeight: '600',
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  infoItemRTL: {
    flexDirection: 'row-reverse',
  },
  infoLabel: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
  },
});