import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Stack, router } from 'expo-router';
import { colors } from '@/constants/colors';
import { Card } from '@/components/Card';
import { 
  Shield, 
  FileText, 
  Activity, 
  Heart, 
  Pill,
  Download,
  Share,
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
  
  const renderOverview = () => (
    <View>
      <Card style={styles.headerCard}>
        <View style={styles.passportHeader}>
          <Shield size={32} color={colors.primary} />
          <View style={styles.passportInfo}>
            <Text style={styles.passportTitle}>Health Passport</Text>
            <Text style={styles.passportSubtitle}>
              Blockchain-secured • Universal Access • HIPAA Compliant
            </Text>
          </View>
          <TouchableOpacity 
            style={styles.qrButton}
            onPress={() => Alert.alert('QR Code', 'Generate QR code for quick access')}
          >
            <QrCode size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </Card>
      
      <Card style={styles.personalCard}>
        <View style={styles.personalHeader}>
          <User size={20} color={colors.primary} />
          <Text style={styles.sectionTitle}>Personal Information</Text>
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
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Full Name</Text>
            <Text style={styles.infoValue}>
              {isPrivacyMode ? '••••••••' : healthData.personalInfo.name}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Date of Birth</Text>
            <Text style={styles.infoValue}>
              {isPrivacyMode ? '••••••••' : healthData.personalInfo.dateOfBirth}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Blood Type</Text>
            <Text style={styles.infoValue}>{healthData.personalInfo.bloodType}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Allergies</Text>
            <Text style={styles.infoValue}>
              {healthData.personalInfo.allergies.join(', ')}
            </Text>
          </View>
        </View>
        
        <View style={styles.emergencyContact}>
          <Text style={styles.emergencyTitle}>Emergency Contact</Text>
          <View style={styles.contactInfo}>
            <Text style={styles.contactName}>
              {isPrivacyMode ? '••••••••' : healthData.personalInfo.emergencyContact.name}
            </Text>
            <Text style={styles.contactRelation}>
              {healthData.personalInfo.emergencyContact.relationship}
            </Text>
            <Text style={styles.contactPhone}>
              {isPrivacyMode ? '••••••••' : healthData.personalInfo.emergencyContact.phone}
            </Text>
          </View>
        </View>
      </Card>
      
      <Card style={styles.vitalsCard}>
        <View style={styles.vitalsHeader}>
          <Activity size={20} color={colors.primary} />
          <Text style={styles.sectionTitle}>Current Vital Signs</Text>
          <Text style={styles.lastUpdated}>
            Updated: {healthData.vitalSigns.lastUpdated}
          </Text>
        </View>
        
        <View style={styles.vitalsGrid}>
          <View style={styles.vitalItem}>
            <Text style={styles.vitalLabel}>Blood Pressure</Text>
            <Text style={styles.vitalValue}>{healthData.vitalSigns.bloodPressure}</Text>
          </View>
          <View style={styles.vitalItem}>
            <Text style={styles.vitalLabel}>Heart Rate</Text>
            <Text style={styles.vitalValue}>{healthData.vitalSigns.heartRate}</Text>
          </View>
          <View style={styles.vitalItem}>
            <Text style={styles.vitalLabel}>Weight</Text>
            <Text style={styles.vitalValue}>{healthData.vitalSigns.weight}</Text>
          </View>
          <View style={styles.vitalItem}>
            <Text style={styles.vitalLabel}>BMI</Text>
            <Text style={styles.vitalValue}>{healthData.vitalSigns.bmi}</Text>
          </View>
        </View>
      </Card>
      
      <Card style={styles.medicationsCard}>
        <View style={styles.medicationsHeader}>
          <Pill size={20} color={colors.primary} />
          <Text style={styles.sectionTitle}>Current Medications</Text>
        </View>
        
        {healthData.medications.map((medication, index) => (
          <View key={index} style={styles.medicationItem}>
            <View style={styles.medicationInfo}>
              <Text style={styles.medicationName}>{medication.name}</Text>
              <Text style={styles.medicationDetails}>
                {medication.dosage} • {medication.frequency}
              </Text>
              <Text style={styles.medicationPrescriber}>
                Prescribed by: {medication.prescriber}
              </Text>
            </View>
            <Text style={styles.medicationDate}>{medication.startDate}</Text>
          </View>
        ))}
      </Card>
    </View>
  );
  
  const renderRecords = () => (
    <View>
      <Card style={styles.recordsHeader}>
        <FileText size={24} color={colors.primary} />
        <Text style={styles.recordsTitle}>Medical Records</Text>
        <Text style={styles.recordsSubtitle}>
          Complete medical history with blockchain verification
        </Text>
      </Card>
      
      {healthData.medicalRecords.map((record) => (
        <Card key={record.id} style={styles.recordCard}>
          <View style={styles.recordHeader}>
            <View style={styles.recordInfo}>
              <Text style={styles.recordType}>{record.type}</Text>
              <Text style={styles.recordProvider}>{record.provider}</Text>
            </View>
            <View style={styles.recordMeta}>
              <Text style={styles.recordDate}>{record.date}</Text>
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
          
          <Text style={styles.recordSummary}>{record.summary}</Text>
          
          <View style={styles.recordActions}>
            <TouchableOpacity 
              style={styles.recordAction}
              onPress={() => Alert.alert('View Record', `View details for ${record.type}`)}
            >
              <Eye size={16} color={colors.primary} />
              <Text style={styles.recordActionText}>View</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.recordAction}
              onPress={() => Alert.alert('Download', `Download ${record.type}`)}
            >
              <Download size={16} color={colors.primary} />
              <Text style={styles.recordActionText}>Download</Text>
            </TouchableOpacity>
          </View>
        </Card>
      ))}
      
      <TouchableOpacity 
        style={styles.addRecordButton}
        onPress={() => Alert.alert('Add Record', 'Upload new medical record')}
      >
        <Text style={styles.addRecordText}>+ Add Medical Record</Text>
      </TouchableOpacity>
    </View>
  );
  
  const renderSharing = () => (
    <View>
      <Card style={styles.sharingHeader}>
        <Share size={24} color={colors.primary} />
        <Text style={styles.sharingTitle}>Data Sharing & Access</Text>
        <Text style={styles.sharingSubtitle}>
          Control who can access your health information
        </Text>
      </Card>
      
      <Card style={styles.accessLogCard}>
        <Text style={styles.accessLogTitle}>Recent Access Log</Text>
        {healthData.accessLog.map((log, index) => (
          <View key={index} style={styles.accessLogItem}>
            <View style={styles.accessLogInfo}>
              <Text style={styles.accessLogAccessor}>{log.accessor}</Text>
              <Text style={styles.accessLogPurpose}>{log.purpose}</Text>
              <Text style={styles.accessLogData}>{log.dataAccessed}</Text>
            </View>
            <Text style={styles.accessLogDate}>{log.date}</Text>
          </View>
        ))}
      </Card>
      
      <Card style={styles.permissionsCard}>
        <Text style={styles.permissionsTitle}>Sharing Permissions</Text>
        
        <View style={styles.permissionItem}>
          <View style={styles.permissionInfo}>
            <Text style={styles.permissionName}>Emergency Services</Text>
            <Text style={styles.permissionDescription}>
              Full access during emergencies
            </Text>
          </View>
          <View style={styles.permissionStatus}>
            <CheckCircle2 size={16} color={colors.success} />
          </View>
        </View>
        
        <View style={styles.permissionItem}>
          <View style={styles.permissionInfo}>
            <Text style={styles.permissionName}>Primary Care Physician</Text>
            <Text style={styles.permissionDescription}>
              Full medical history access
            </Text>
          </View>
          <View style={styles.permissionStatus}>
            <CheckCircle2 size={16} color={colors.success} />
          </View>
        </View>
        
        <View style={styles.permissionItem}>
          <View style={styles.permissionInfo}>
            <Text style={styles.permissionName}>Specialists</Text>
            <Text style={styles.permissionDescription}>
              Relevant records only
            </Text>
          </View>
          <View style={styles.permissionStatus}>
            <CheckCircle2 size={16} color={colors.warning} />
          </View>
        </View>
        
        <TouchableOpacity 
          style={styles.managePermissionsButton}
          onPress={() => Alert.alert('Manage Permissions', 'Configure data sharing permissions')}
        >
          <Text style={styles.managePermissionsText}>Manage Permissions</Text>
        </TouchableOpacity>
      </Card>
      
      <Card style={styles.exportCard}>
        <Text style={styles.exportTitle}>Export Health Data</Text>
        <Text style={styles.exportDescription}>
          Download your complete health passport for personal records or sharing with new providers.
        </Text>
        
        <View style={styles.exportActions}>
          <TouchableOpacity 
            style={styles.exportButton}
            onPress={() => Alert.alert('Export PDF', 'Generate PDF health passport')}
          >
            <Download size={16} color={colors.black} />
            <Text style={styles.exportButtonText}>Export PDF</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.shareButton}
            onPress={() => Alert.alert('Share', 'Share health passport securely')}
          >
            <Share size={16} color={colors.primary} />
            <Text style={styles.shareButtonText}>Share Securely</Text>
          </TouchableOpacity>
        </View>
      </Card>
    </View>
  );
  
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Health Passport' }} />
      
      <View style={styles.tabsContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeSection === 'overview' && styles.activeTab]}
          onPress={() => setActiveSection('overview')}
        >
          <Shield size={18} color={activeSection === 'overview' ? colors.primary : colors.textSecondary} />
          <Text style={[styles.tabText, activeSection === 'overview' && styles.activeTabText]}>
            Overview
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeSection === 'records' && styles.activeTab]}
          onPress={() => setActiveSection('records')}
        >
          <FileText size={18} color={activeSection === 'records' ? colors.primary : colors.textSecondary} />
          <Text style={[styles.tabText, activeSection === 'records' && styles.activeTabText]}>
            Records
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeSection === 'sharing' && styles.activeTab]}
          onPress={() => setActiveSection('sharing')}
        >
          <Share size={18} color={activeSection === 'sharing' ? colors.primary : colors.textSecondary} />
          <Text style={[styles.tabText, activeSection === 'sharing' && styles.activeTabText]}>
            Sharing
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
  medicationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
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