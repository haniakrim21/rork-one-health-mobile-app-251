import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Share, I18nManager } from 'react-native';
import { Stack, router } from 'expo-router';
import { colors } from '@/constants/colors';
import { useSettingsStore } from '@/store/settings-store';
import { getTranslation, isRTL } from '@/constants/languages';
import { Card } from '@/components/Card';
import { 
  Shield, 
  FileText, 
  Activity, 
  Heart, 
  Pill,
  Download,
  Share as ShareIcon,
  Lock,
  CheckCircle2,
  Calendar,
  User,
  MapPin,
  Phone,
  QrCode,
  Eye,
  EyeOff
} from 'lucide-react-native';

export default function HealthPassportScreen() {
  const [activeSection, setActiveSection] = useState<'overview' | 'records' | 'sharing'>('overview');
  const [isPrivacyMode, setIsPrivacyMode] = useState(false);
  const { settings } = useSettingsStore();
  
  const t = (key: string) => getTranslation(settings.language, key);
  const isRTLLayout = isRTL(settings.language);
  
  // Set RTL layout
  React.useEffect(() => {
    I18nManager.allowRTL(true);
    I18nManager.forceRTL(isRTLLayout);
  }, [isRTLLayout]);
  
  const healthData = {
    personalInfo: {
      name: 'John Doe',
      dateOfBirth: '1985-06-15',
      bloodType: 'O+',
      allergies: ['Penicillin', 'Shellfish'],
      emergencyContact: {
        name: 'Jane Doe',
        relationship: 'Spouse',
        phone: '+1 (555) 123-4567',
      },
    },
    medicalRecords: [
      {
        id: '1',
        type: 'Lab Results',
        date: '2024-06-10',
        provider: 'City Medical Center',
        summary: 'Annual blood work - All values normal',
        status: 'completed',
      },
      {
        id: '2',
        type: 'Vaccination',
        date: '2024-05-15',
        provider: 'Family Health Clinic',
        summary: 'COVID-19 booster vaccination',
        status: 'completed',
      },
      {
        id: '3',
        type: 'Prescription',
        date: '2024-06-01',
        provider: 'Dr. Sarah Johnson',
        summary: 'Lisinopril 10mg - Blood pressure management',
        status: 'active',
      },
    ],
    vitalSigns: {
      lastUpdated: '2024-06-18',
      bloodPressure: '125/82 mmHg',
      heartRate: '72 bpm',
      weight: '75 kg',
      height: '175 cm',
      bmi: '24.5',
    },
    medications: [
      {
        name: 'Lisinopril',
        dosage: '10mg',
        frequency: 'Once daily',
        prescriber: 'Dr. Sarah Johnson',
        startDate: '2024-06-01',
      },
      {
        name: 'Vitamin D3',
        dosage: '2000 IU',
        frequency: 'Once daily',
        prescriber: 'Self-administered',
        startDate: '2024-01-01',
      },
    ],
    accessLog: [
      {
        date: '2024-06-18 10:30',
        accessor: 'Dr. Sarah Johnson',
        purpose: 'Routine consultation',
        dataAccessed: 'Medical history, current medications',
      },
      {
        date: '2024-06-15 14:20',
        accessor: 'City Medical Center',
        purpose: 'Lab results upload',
        dataAccessed: 'Lab results, vital signs',
      },
    ],
  };
  
  const generateQRCode = () => {
    try {
      // Create a simple health passport data object
      const qrData = {
        name: isPrivacyMode ? '••••••••' : healthData.personalInfo.name,
        bloodType: healthData.personalInfo.bloodType,
        allergies: healthData.personalInfo.allergies,
        emergencyContact: isPrivacyMode ? '••••••••' : healthData.personalInfo.emergencyContact.phone,
        lastUpdated: new Date().toISOString(),
        id: 'health-passport-' + Date.now()
      };
      
      // In a real app, you would use a QR code library like react-native-qrcode-svg
      // For now, we'll show the data that would be encoded
      const qrString = JSON.stringify(qrData);
      
      Alert.alert(
        t('qrCodeGenerated'),
        `${t('quickAccessQR')}\n\n${t('shareQRCode')}?`,
        [
          { text: t('cancel'), style: 'cancel' },
          { 
            text: t('share'), 
            onPress: () => shareQRCode(qrString)
          }
        ]
      );
    } catch (error) {
      Alert.alert(t('error'), t('qrCodeError'));
    }
  };
  
  const shareQRCode = async (qrData: string) => {
    try {
      await Share.share({
        message: `${t('healthPassportTitle')}\n\n${qrData}`,
        title: t('healthPassportTitle'),
      });
    } catch (error) {
      console.error('Error sharing QR code:', error);
    }
  };
  
  const renderOverview = () => (
    <View>
      <Card style={styles.headerCard}>
        <View style={[styles.passportHeader, isRTLLayout && styles.passportHeaderRTL]}>
          <Shield size={32} color={colors.primary} />
          <View style={styles.passportInfo}>
            <Text style={[styles.passportTitle, isRTLLayout && styles.textRTL]}>{t('healthPassport')}</Text>
            <Text style={[styles.passportSubtitle, isRTLLayout && styles.textRTL]}>
              {t('blockchainSecured')} • {t('universalAccess')} • {t('hipaaCompliant')}
            </Text>
          </View>
          <TouchableOpacity 
            style={styles.qrButton}
            onPress={generateQRCode}
          >
            <QrCode size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </Card>
      
      <Card style={styles.personalCard}>
        <View style={[styles.personalHeader, isRTLLayout && styles.personalHeaderRTL]}>
          <User size={20} color={colors.primary} />
          <Text style={[styles.sectionTitle, isRTLLayout && styles.textRTL]}>{t('personalInformation')}</Text>
          <TouchableOpacity 
            style={styles.privacyToggle}
            onPress={() => setIsPrivacyMode(!isPrivacyMode)}
          >
            {isPrivacyMode ? (
              <EyeOff size={16} color={colors.textSecondary} />
            ) : (
              <Eye size={16} color={colors.textSecondary} />
            )}
          </TouchableOpacity>
        </View>
        
        <View style={styles.personalInfo}>
          <View style={[styles.infoRow, isRTLLayout && styles.infoRowRTL]}>
            <Text style={[styles.infoLabel, isRTLLayout && styles.textRTL]}>{t('fullName')}</Text>
            <Text style={[styles.infoValue, isRTLLayout && styles.textRTL]}>
              {isPrivacyMode ? '••••••••' : healthData.personalInfo.name}
            </Text>
          </View>
          <View style={[styles.infoRow, isRTLLayout && styles.infoRowRTL]}>
            <Text style={[styles.infoLabel, isRTLLayout && styles.textRTL]}>{t('age')}</Text>
            <Text style={[styles.infoValue, isRTLLayout && styles.textRTL]}>
              {isPrivacyMode ? '••••••••' : healthData.personalInfo.dateOfBirth}
            </Text>
          </View>
          <View style={[styles.infoRow, isRTLLayout && styles.infoRowRTL]}>
            <Text style={[styles.infoLabel, isRTLLayout && styles.textRTL]}>{t('bloodType')}</Text>
            <Text style={[styles.infoValue, isRTLLayout && styles.textRTL]}>{healthData.personalInfo.bloodType}</Text>
          </View>
          <View style={[styles.infoRow, isRTLLayout && styles.infoRowRTL]}>
            <Text style={[styles.infoLabel, isRTLLayout && styles.textRTL]}>{t('allergies')}</Text>
            <Text style={[styles.infoValue, isRTLLayout && styles.textRTL]}>
              {healthData.personalInfo.allergies.join(', ')}
            </Text>
          </View>
        </View>
        
        <View style={styles.emergencyContact}>
          <Text style={[styles.emergencyTitle, isRTLLayout && styles.textRTL]}>{t('emergencyContact')}</Text>
          <View style={styles.contactInfo}>
            <Text style={[styles.contactName, isRTLLayout && styles.textRTL]}>
              {isPrivacyMode ? '••••••••' : healthData.personalInfo.emergencyContact.name}
            </Text>
            <Text style={[styles.contactRelation, isRTLLayout && styles.textRTL]}>
              {t('spouse')}
            </Text>
            <Text style={[styles.contactPhone, isRTLLayout && styles.textRTL]}>
              {isPrivacyMode ? '••••••••' : healthData.personalInfo.emergencyContact.phone}
            </Text>
          </View>
        </View>
      </Card>
      
      <Card style={styles.vitalsCard}>
        <View style={[styles.vitalsHeader, isRTLLayout && styles.vitalsHeaderRTL]}>
          <Activity size={20} color={colors.primary} />
          <Text style={[styles.sectionTitle, isRTLLayout && styles.textRTL]}>{t('currentVitalSigns')}</Text>
          <Text style={[styles.lastUpdated, isRTLLayout && styles.textRTL]}>
            {t('updated')}: {healthData.vitalSigns.lastUpdated}
          </Text>
        </View>
        
        <View style={styles.vitalsGrid}>
          <View style={styles.vitalItem}>
            <Text style={[styles.vitalLabel, isRTLLayout && styles.textRTL]}>{t('bloodPressure')}</Text>
            <Text style={[styles.vitalValue, isRTLLayout && styles.textRTL]}>{healthData.vitalSigns.bloodPressure}</Text>
          </View>
          <View style={styles.vitalItem}>
            <Text style={[styles.vitalLabel, isRTLLayout && styles.textRTL]}>{t('heartRate')}</Text>
            <Text style={[styles.vitalValue, isRTLLayout && styles.textRTL]}>{healthData.vitalSigns.heartRate}</Text>
          </View>
          <View style={styles.vitalItem}>
            <Text style={[styles.vitalLabel, isRTLLayout && styles.textRTL]}>{t('weight')}</Text>
            <Text style={[styles.vitalValue, isRTLLayout && styles.textRTL]}>{healthData.vitalSigns.weight}</Text>
          </View>
          <View style={styles.vitalItem}>
            <Text style={[styles.vitalLabel, isRTLLayout && styles.textRTL]}>{t('bmi')}</Text>
            <Text style={[styles.vitalValue, isRTLLayout && styles.textRTL]}>{healthData.vitalSigns.bmi}</Text>
          </View>
        </View>
      </Card>
      
      <Card style={styles.medicationsCard}>
        <View style={[styles.medicationsHeader, isRTLLayout && styles.medicationsHeaderRTL]}>
          <Pill size={20} color={colors.primary} />
          <Text style={[styles.sectionTitle, isRTLLayout && styles.textRTL]}>{t('currentMedications')}</Text>
        </View>
        
        {healthData.medications.map((medication, index) => (
          <View key={index} style={[styles.medicationItem, isRTLLayout && styles.medicationItemRTL]}>
            <View style={styles.medicationInfo}>
              <Text style={[styles.medicationName, isRTLLayout && styles.textRTL]}>{medication.name}</Text>
              <Text style={[styles.medicationDetails, isRTLLayout && styles.textRTL]}>
                {medication.dosage} • {medication.frequency}
              </Text>
              <Text style={[styles.medicationPrescriber, isRTLLayout && styles.textRTL]}>
                {t('prescribedBy')}: {medication.prescriber}
              </Text>
            </View>
            <Text style={[styles.medicationDate, isRTLLayout && styles.textRTL]}>{medication.startDate}</Text>
          </View>
        ))}
      </Card>
    </View>
  );
  
  const renderRecords = () => (
    <View>
      <Card style={styles.recordsHeader}>
        <FileText size={24} color={colors.primary} />
        <Text style={[styles.recordsTitle, isRTLLayout && styles.textRTL]}>{t('medicalRecords')}</Text>
        <Text style={[styles.recordsSubtitle, isRTLLayout && styles.textRTL]}>
          {t('downloadCompleteHealthPassport')}
        </Text>
      </Card>
      
      {healthData.medicalRecords.map((record) => (
        <Card key={record.id} style={styles.recordCard}>
          <View style={[styles.recordHeader, isRTLLayout && styles.recordHeaderRTL]}>
            <View style={styles.recordInfo}>
              <Text style={[styles.recordType, isRTLLayout && styles.textRTL]}>{record.type}</Text>
              <Text style={[styles.recordProvider, isRTLLayout && styles.textRTL]}>{record.provider}</Text>
            </View>
            <View style={styles.recordMeta}>
              <Text style={[styles.recordDate, isRTLLayout && styles.textRTL]}>{record.date}</Text>
              <View style={[
                styles.recordStatus,
                { backgroundColor: record.status === 'active' ? colors.success + '20' : colors.primary + '20' }
              ]}>
                <Text style={[
                  styles.recordStatusText,
                  { color: record.status === 'active' ? colors.success : colors.primary }
                ]}>
                  {record.status}
                </Text>
              </View>
            </View>
          </View>
          
          <Text style={[styles.recordSummary, isRTLLayout && styles.textRTL]}>{record.summary}</Text>
          
          <View style={styles.recordActions}>
            <TouchableOpacity 
              style={styles.recordAction}
              onPress={() => Alert.alert(t('view'), `${t('viewDetails')} ${record.type}`)}
            >
              <Eye size={16} color={colors.primary} />
              <Text style={[styles.recordActionText, isRTLLayout && styles.textRTL]}>{t('view')}</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.recordAction}
              onPress={() => Alert.alert(t('download'), `${t('download')} ${record.type}`)}
            >
              <Download size={16} color={colors.primary} />
              <Text style={[styles.recordActionText, isRTLLayout && styles.textRTL]}>{t('download')}</Text>
            </TouchableOpacity>
          </View>
        </Card>
      ))}
      
      <TouchableOpacity 
        style={styles.addRecordButton}
        onPress={() => Alert.alert(t('addMedicalRecord'), t('addMedicalRecord'))}
      >
        <Text style={[styles.addRecordText, isRTLLayout && styles.textRTL]}>+ {t('addMedicalRecord')}</Text>
      </TouchableOpacity>
    </View>
  );
  
  const renderSharing = () => (
    <View>
      <Card style={styles.sharingHeader}>
        <ShareIcon size={24} color={colors.primary} />
        <Text style={[styles.sharingTitle, isRTLLayout && styles.textRTL]}>{t('dataSharingAccess')}</Text>
        <Text style={[styles.sharingSubtitle, isRTLLayout && styles.textRTL]}>
          {t('controlWhoCanAccess')}
        </Text>
      </Card>
      
      <Card style={styles.accessLogCard}>
        <Text style={[styles.accessLogTitle, isRTLLayout && styles.textRTL]}>{t('recentAccessLog')}</Text>
        {healthData.accessLog.map((log, index) => (
          <View key={index} style={[styles.accessLogItem, isRTLLayout && styles.accessLogItemRTL]}>
            <View style={styles.accessLogInfo}>
              <Text style={[styles.accessLogAccessor, isRTLLayout && styles.textRTL]}>{log.accessor}</Text>
              <Text style={[styles.accessLogPurpose, isRTLLayout && styles.textRTL]}>{log.purpose}</Text>
              <Text style={[styles.accessLogData, isRTLLayout && styles.textRTL]}>{log.dataAccessed}</Text>
            </View>
            <Text style={[styles.accessLogDate, isRTLLayout && styles.textRTL]}>{log.date}</Text>
          </View>
        ))}
      </Card>
      
      <Card style={styles.permissionsCard}>
        <Text style={[styles.permissionsTitle, isRTLLayout && styles.textRTL]}>{t('sharingPermissions')}</Text>
        
        <View style={[styles.permissionItem, isRTLLayout && styles.permissionItemRTL]}>
          <View style={styles.permissionInfo}>
            <Text style={[styles.permissionName, isRTLLayout && styles.textRTL]}>{t('emergencyServices')}</Text>
            <Text style={[styles.permissionDescription, isRTLLayout && styles.textRTL]}>
              {t('fullAccessDuringEmergencies')}
            </Text>
          </View>
          <View style={styles.permissionStatus}>
            <CheckCircle2 size={16} color={colors.success} />
          </View>
        </View>
        
        <View style={[styles.permissionItem, isRTLLayout && styles.permissionItemRTL]}>
          <View style={styles.permissionInfo}>
            <Text style={[styles.permissionName, isRTLLayout && styles.textRTL]}>{t('primaryCarePhysician')}</Text>
            <Text style={[styles.permissionDescription, isRTLLayout && styles.textRTL]}>
              {t('fullMedicalHistoryAccess')}
            </Text>
          </View>
          <View style={styles.permissionStatus}>
            <CheckCircle2 size={16} color={colors.success} />
          </View>
        </View>
        
        <View style={[styles.permissionItem, isRTLLayout && styles.permissionItemRTL]}>
          <View style={styles.permissionInfo}>
            <Text style={[styles.permissionName, isRTLLayout && styles.textRTL]}>{t('specialists')}</Text>
            <Text style={[styles.permissionDescription, isRTLLayout && styles.textRTL]}>
              {t('relevantRecordsOnly')}
            </Text>
          </View>
          <View style={styles.permissionStatus}>
            <CheckCircle2 size={16} color={colors.warning} />
          </View>
        </View>
        
        <TouchableOpacity 
          style={styles.managePermissionsButton}
          onPress={() => Alert.alert(t('managePermissions'), t('managePermissions'))}
        >
          <Text style={[styles.managePermissionsText, isRTLLayout && styles.textRTL]}>{t('managePermissions')}</Text>
        </TouchableOpacity>
      </Card>
      
      <Card style={styles.exportCard}>
        <Text style={[styles.exportTitle, isRTLLayout && styles.textRTL]}>{t('exportHealthData')}</Text>
        <Text style={[styles.exportDescription, isRTLLayout && styles.textRTL]}>
          {t('downloadCompleteHealthPassport')}
        </Text>
        
        <View style={styles.exportActions}>
          <TouchableOpacity 
            style={styles.exportButton}
            onPress={() => Alert.alert(t('exportPDF'), t('exportPDF'))}
          >
            <Download size={16} color={colors.black} />
            <Text style={styles.exportButtonText}>{t('exportPDF')}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.shareButton}
            onPress={() => Alert.alert(t('shareSecurely'), t('shareSecurely'))}
          >
            <ShareIcon size={16} color={colors.primary} />
            <Text style={styles.shareButtonText}>{t('shareSecurely')}</Text>
          </TouchableOpacity>
        </View>
      </Card>
    </View>
  );
  
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: t('healthPassport') }} />
      
      <View style={styles.tabsContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeSection === 'overview' && styles.activeTab]}
          onPress={() => setActiveSection('overview')}
        >
          <Shield size={18} color={activeSection === 'overview' ? colors.primary : colors.textSecondary} />
          <Text style={[styles.tabText, activeSection === 'overview' && styles.activeTabText, isRTLLayout && styles.textRTL]}>
            {t('overview')}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeSection === 'records' && styles.activeTab]}
          onPress={() => setActiveSection('records')}
        >
          <FileText size={18} color={activeSection === 'records' ? colors.primary : colors.textSecondary} />
          <Text style={[styles.tabText, activeSection === 'records' && styles.activeTabText, isRTLLayout && styles.textRTL]}>
            {t('records')}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeSection === 'sharing' && styles.activeTab]}
          onPress={() => setActiveSection('sharing')}
        >
          <ShareIcon size={18} color={activeSection === 'sharing' ? colors.primary : colors.textSecondary} />
          <Text style={[styles.tabText, activeSection === 'sharing' && styles.activeTabText, isRTLLayout && styles.textRTL]}>
            {t('sharing')}
          </Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {activeSection === 'overview' && renderOverview()}
        {activeSection === 'records' && renderRecords()}
        {activeSection === 'sharing' && renderSharing()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: colors.cardBackground,
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: 48,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: colors.primary + '20',
  },
  tabText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  activeTabText: {
    color: colors.primary,
  },
  textRTL: {
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  headerCard: {
    marginBottom: 16,
  },
  passportHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  passportHeaderRTL: {
    flexDirection: 'row-reverse',
  },
  passportInfo: {
    marginLeft: 12,
    flex: 1,
  },
  passportTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  passportSubtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  qrButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
  },
  personalCard: {
    marginBottom: 16,
  },
  personalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  personalHeaderRTL: {
    flexDirection: 'row-reverse',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 8,
    flex: 1,
  },
  privacyToggle: {
    padding: 4,
  },
  personalInfo: {
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  infoRowRTL: {
    flexDirection: 'row-reverse',
  },
  infoLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  emergencyContact: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  emergencyTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.error,
    marginBottom: 8,
  },
  contactInfo: {
    
  },
  contactName: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  contactRelation: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  contactPhone: {
    fontSize: 14,
    color: colors.primary,
    marginTop: 2,
  },
  vitalsCard: {
    marginBottom: 16,
  },
  vitalsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  vitalsHeaderRTL: {
    flexDirection: 'row-reverse',
  },
  lastUpdated: {
    fontSize: 10,
    color: colors.textSecondary,
  },
  vitalsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  vitalItem: {
    width: '48%',
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: colors.primary + '05',
    borderRadius: 8,
    marginBottom: 8,
  },
  vitalLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  vitalValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  medicationsCard: {
    marginBottom: 16,
  },
  medicationsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  medicationsHeaderRTL: {
    flexDirection: 'row-reverse',
  },
  medicationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  medicationItemRTL: {
    flexDirection: 'row-reverse',
  },
  medicationInfo: {
    flex: 1,
  },
  medicationName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  medicationDetails: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  medicationPrescriber: {
    fontSize: 10,
    color: colors.textSecondary,
  },
  medicationDate: {
    fontSize: 12,
    color: colors.primary,
  },
  recordsHeader: {
    alignItems: 'center',
    marginBottom: 16,
  },
  recordsTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginTop: 8,
  },
  recordsSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 4,
  },
  recordCard: {
    marginBottom: 12,
  },
  recordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  recordHeaderRTL: {
    flexDirection: 'row-reverse',
  },
  recordInfo: {
    flex: 1,
  },
  recordType: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  recordProvider: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  recordMeta: {
    alignItems: 'flex-end',
  },
  recordDate: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  recordStatus: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  recordStatusText: {
    fontSize: 10,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  recordSummary: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 12,
    lineHeight: 18,
  },
  recordActions: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  recordAction: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary + '20',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginRight: 8,
  },
  recordActionText: {
    fontSize: 12,
    color: colors.primary,
    marginLeft: 4,
  },
  addRecordButton: {
    alignSelf: 'center',
    marginTop: 16,
  },
  addRecordText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
  sharingHeader: {
    alignItems: 'center',
    marginBottom: 16,
  },
  sharingTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginTop: 8,
  },
  sharingSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 4,
  },
  accessLogCard: {
    marginBottom: 16,
  },
  accessLogTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  accessLogItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  accessLogItemRTL: {
    flexDirection: 'row-reverse',
  },
  accessLogInfo: {
    flex: 1,
  },
  accessLogAccessor: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  accessLogPurpose: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  accessLogData: {
    fontSize: 10,
    color: colors.textSecondary,
    marginTop: 2,
  },
  accessLogDate: {
    fontSize: 10,
    color: colors.textSecondary,
  },
  permissionsCard: {
    marginBottom: 16,
  },
  permissionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  permissionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  permissionItemRTL: {
    flexDirection: 'row-reverse',
  },
  permissionInfo: {
    flex: 1,
  },
  permissionName: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  permissionDescription: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  permissionStatus: {
    marginLeft: 12,
  },
  managePermissionsButton: {
    alignSelf: 'flex-start',
    marginTop: 12,
  },
  managePermissionsText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
  exportCard: {
    
  },
  exportTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  exportDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 16,
    lineHeight: 18,
  },
  exportActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  exportButton: {
    flex: 0.48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 8,
  },
  exportButtonText: {
    color: colors.black,
    fontWeight: '600',
    marginLeft: 8,
  },
  shareButton: {
    flex: 0.48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary + '20',
    paddingVertical: 12,
    borderRadius: 8,
  },
  shareButtonText: {
    color: colors.primary,
    fontWeight: '600',
    marginLeft: 8,
  },
});