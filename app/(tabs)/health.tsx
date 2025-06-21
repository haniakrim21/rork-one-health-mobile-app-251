import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, I18nManager } from 'react-native';
import { router } from 'expo-router';
import { colors } from '@/constants/colors';
import { useHealthStore } from '@/store/health-store';
import { useSettingsStore } from '@/store/settings-store';
import { getTranslation, isRTL } from '@/constants/languages';
import { Card } from '@/components/Card';
import { MetricCard } from '@/components/MetricCard';
import { HealthMetricInput } from '@/components/HealthMetricInput';
import { AppointmentCard } from '@/components/AppointmentCard';
import { MedicationCard } from '@/components/MedicationCard';
import { TrendData, Appointment } from '@/types';
import { 
  Heart, 
  Activity, 
  Calendar, 
  Pill, 
  Plus, 
  TrendingUp,
  Brain,
  Stethoscope,
  FileText,
  Users,
  Zap,
  Shield,
  AlertCircle,
  CheckCircle2
} from 'lucide-react-native';

export default function HealthScreen() {
  const { 
    healthMetrics = [], 
    appointments = [], 
    medications = [], 
    addHealthMetric, 
    updateAppointment,
    toggleMedication 
  } = useHealthStore();
  
  const { settings } = useSettingsStore();
  const [showMetricInput, setShowMetricInput] = useState(false);
  
  const t = (key: string) => getTranslation(settings.language, key);
  const isRTLLayout = isRTL(settings.language);
  
  // Set RTL layout
  React.useEffect(() => {
    I18nManager.allowRTL(true);
    I18nManager.forceRTL(isRTLLayout);
  }, [isRTLLayout]);
  
  const handleAddMetric = (metric: any) => {
    addHealthMetric(metric);
    setShowMetricInput(false);
    Alert.alert(t('success'), t('savedSuccessfully'));
  };
  
  const handleAppointmentPress = (appointmentId: string) => {
    router.push(`/appointments/${appointmentId}`);
  };
  
  const handleMedicationToggle = (medicationId: string) => {
    toggleMedication(medicationId);
  };
  
  const todaysMetrics = (Array.isArray(healthMetrics) ? healthMetrics : []).filter(metric => {
    if (!metric || !metric.timestamp) return false;
    try {
      const today = new Date().toDateString();
      const metricDate = new Date(metric.timestamp).toDateString();
      return today === metricDate;
    } catch (error) {
      return false;
    }
  });
  
  const upcomingAppointments = (Array.isArray(appointments) ? appointments : [])
    .filter(apt => {
      if (!apt || !apt.date) return false;
      try {
        return new Date(apt.date) >= new Date();
      } catch (error) {
        return false;
      }
    })
    .sort((a, b) => {
      try {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      } catch (error) {
        return 0;
      }
    })
    .slice(0, 3);
  
  const activeMedications = (Array.isArray(medications) ? medications : []).filter(med => med && !med.endDate);
  
  const healthMetricsData = [
    { 
      title: t('heartRate'), 
      value: '72', 
      unit: t('bpm'), 
      trend: { value: 2, isPositive: true } as TrendData, 
      color: colors.health,
      status: t('normal')
    },
    { 
      title: t('bloodPressure'), 
      value: '120/80', 
      unit: t('mmHg'), 
      trend: { value: 5, isPositive: false } as TrendData, 
      color: colors.warning,
      status: t('elevated')
    },
    { 
      title: t('weight'), 
      value: '70', 
      unit: t('kg'), 
      trend: { value: 1, isPositive: false } as TrendData, 
      color: colors.info,
      status: t('normal')
    },
    { 
      title: t('sleepQuality'), 
      value: '85%', 
      unit: t('score'), 
      trend: { value: 0.5, isPositive: true } as TrendData, 
      color: colors.success,
      status: t('good')
    },
  ];
  
  return (
    <View style={styles.container}>
      {/* Modern Header */}
      <View style={[styles.header, isRTLLayout && styles.headerRTL]}>
        <View style={styles.headerContent}>
          <Text style={[styles.headerTitle, isRTLLayout && styles.textRTL]}>{t('health')}</Text>
          <Text style={[styles.headerSubtitle, isRTLLayout && styles.textRTL]}>{t('yourWellnessDashboard')}</Text>
        </View>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => setShowMetricInput(true)}
        >
          <Plus size={22} color={colors.text} />
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Health Status Overview */}
        <View style={styles.section}>
          <Card variant="elevated" style={styles.statusCard}>
            <View style={[styles.statusHeader, isRTLLayout && styles.statusHeaderRTL]}>
              <View style={styles.statusIcon}>
                <Shield size={24} color={colors.success} />
              </View>
              <View style={styles.statusText}>
                <Text style={[styles.statusTitle, isRTLLayout && styles.textRTL]}>{t('healthStatus')}</Text>
                <Text style={[styles.statusSubtitle, isRTLLayout && styles.textRTL]}>{t('allSystemsGood')}</Text>
              </View>
              <View style={styles.statusIndicator}>
                <CheckCircle2 size={20} color={colors.success} />
              </View>
            </View>
            <View style={styles.statusMetrics}>
              <View style={styles.statusMetric}>
                <Text style={styles.statusMetricValue}>98%</Text>
                <Text style={[styles.statusMetricLabel, isRTLLayout && styles.textRTL]}>{t('healthScore')}</Text>
              </View>
              <View style={styles.statusMetric}>
                <Text style={styles.statusMetricValue}>2</Text>
                <Text style={[styles.statusMetricLabel, isRTLLayout && styles.textRTL]}>{t('riskFactors')}</Text>
              </View>
              <View style={styles.statusMetric}>
                <Text style={styles.statusMetricValue}>5</Text>
                <Text style={[styles.statusMetricLabel, isRTLLayout && styles.textRTL]}>{t('trackedMetrics')}</Text>
              </View>
            </View>
          </Card>
        </View>
        
        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, isRTLLayout && styles.textRTL]}>{t('quickActions')}</Text>
          <View style={styles.quickActionsGrid}>
            <TouchableOpacity 
              style={[styles.quickActionCard, { backgroundColor: `${colors.health}15` }]}
              onPress={() => router.push('/symptom-checker')}
            >
              <View style={styles.quickActionContent}>
                <Stethoscope size={24} color={colors.health} />
                <Text style={[styles.quickActionText, isRTLLayout && styles.textRTL]}>{t('symptomChecker')}</Text>
                <Text style={[styles.quickActionSubtext, isRTLLayout && styles.textRTL]}>{t('aiAssessment')}</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.quickActionCard, { backgroundColor: `${colors.primary}15` }]}
              onPress={() => router.push('/virtual-consultation')}
            >
              <View style={styles.quickActionContent}>
                <Users size={24} color={colors.primary} />
                <Text style={[styles.quickActionText, isRTLLayout && styles.textRTL]}>{t('virtualConsult')}</Text>
                <Text style={[styles.quickActionSubtext, isRTLLayout && styles.textRTL]}>{t('talkToDoctor')}</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.quickActionCard, { backgroundColor: `${colors.warning}15` }]}
              onPress={() => router.push('/ai-health-navigator')}
            >
              <View style={styles.quickActionContent}>
                <Brain size={24} color={colors.warning} />
                <Text style={[styles.quickActionText, isRTLLayout && styles.textRTL]}>{t('aiNavigator')}</Text>
                <Text style={[styles.quickActionSubtext, isRTLLayout && styles.textRTL]}>{t('healthGuidance')}</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.quickActionCard, { backgroundColor: `${colors.info}15` }]}
              onPress={() => router.push('/health-passport')}
            >
              <View style={styles.quickActionContent}>
                <FileText size={24} color={colors.info} />
                <Text style={[styles.quickActionText, isRTLLayout && styles.textRTL]}>{t('healthPassport')}</Text>
                <Text style={[styles.quickActionSubtext, isRTLLayout && styles.textRTL]}>{t('viewRecords')}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Health Metrics */}
        <View style={styles.section}>
          <View style={[styles.sectionHeader, isRTLLayout && styles.sectionHeaderRTL]}>
            <Text style={[styles.sectionTitle, isRTLLayout && styles.textRTL]}>{t('vitalSigns')}</Text>
            <TouchableOpacity onPress={() => setShowMetricInput(true)}>
              <Text style={[styles.seeAllText, isRTLLayout && styles.textRTL]}>{t('addReading')}</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.metricsGrid}>
            {healthMetricsData.map((metric, index) => (
              <Card key={index} variant="elevated" style={styles.metricCard}>
                <View style={styles.metricContent}>
                  <View style={[styles.metricHeader, isRTLLayout && styles.metricHeaderRTL]}>
                    <Text style={[styles.metricTitle, isRTLLayout && styles.textRTL]}>{metric.title}</Text>
                    <View style={[
                      styles.metricStatus,
                      { backgroundColor: `${metric.color}20` }
                    ]}>
                      <Text style={[styles.metricStatusText, { color: metric.color }]}>
                        {metric.status}
                      </Text>
                    </View>
                  </View>
                  <Text style={[styles.metricValue, isRTLLayout && styles.textRTL]}>{metric.value}</Text>
                  <Text style={[styles.metricUnit, isRTLLayout && styles.textRTL]}>{metric.unit}</Text>
                  <View style={styles.metricTrend}>
                    <Text style={[
                      styles.trendText,
                      { color: metric.trend.isPositive ? colors.success : colors.error }
                    ]}>
                      {metric.trend.isPositive ? '↗' : '↘'} {metric.trend.value}
                    </Text>
                  </View>
                </View>
              </Card>
            ))}
          </View>
        </View>
        
        {/* Upcoming Appointments */}
        <View style={styles.section}>
          <View style={[styles.sectionHeader, isRTLLayout && styles.sectionHeaderRTL]}>
            <Text style={[styles.sectionTitle, isRTLLayout && styles.textRTL]}>{t('upcomingAppointments')}</Text>
            <TouchableOpacity onPress={() => router.push('/appointments')}>
              <Text style={[styles.seeAllText, isRTLLayout && styles.textRTL]}>{t('seeAll')}</Text>
            </TouchableOpacity>
          </View>
          
          {upcomingAppointments.length > 0 ? (
            <View style={styles.appointmentsContainer}>
              {upcomingAppointments.map((appointment) => {
                const transformedAppointment: Appointment = {
                  ...appointment,
                  type: 'checkup',
                  doctorName: appointment.doctorName || t('provider'),
                };
                
                return (
                  <Card key={appointment.id} variant="elevated" style={styles.appointmentCard}>
                    <View style={[styles.appointmentContent, isRTLLayout && styles.appointmentContentRTL]}>
                      <View style={[styles.appointmentIcon, { backgroundColor: `${colors.health}20` }]}>
                        <Calendar size={20} color={colors.health} />
                      </View>
                      <View style={styles.appointmentText}>
                        <Text style={[styles.appointmentTitle, isRTLLayout && styles.textRTL]}>{appointment.title}</Text>
                        <Text style={[styles.appointmentProvider, isRTLLayout && styles.textRTL]}>{appointment.doctorName}</Text>
                        <Text style={[styles.appointmentTime, isRTLLayout && styles.textRTL]}>
                          {new Date(appointment.date).toLocaleDateString()} {t('at')} {appointment.time}
                        </Text>
                      </View>
                      <TouchableOpacity 
                        style={styles.appointmentButton}
                        onPress={() => handleAppointmentPress(appointment.id)}
                      >
                        <Text style={styles.appointmentButtonText}>{t('view')}</Text>
                      </TouchableOpacity>
                    </View>
                  </Card>
                );
              })}
            </View>
          ) : (
            <Card variant="outlined" style={styles.emptyCard}>
              <View style={styles.emptyContent}>
                <View style={styles.emptyIcon}>
                  <Calendar size={32} color={colors.textSecondary} />
                </View>
                <Text style={[styles.emptyTitle, isRTLLayout && styles.textRTL]}>{t('noUpcomingAppointments')}</Text>
                <Text style={[styles.emptyDescription, isRTLLayout && styles.textRTL]}>
                  {t('scheduleHealthCheckup')}
                </Text>
                <TouchableOpacity 
                  style={styles.scheduleButton}
                  onPress={() => router.push('/appointments/schedule')}
                >
                  <Text style={styles.scheduleButtonText}>{t('scheduleAppointment')}</Text>
                </TouchableOpacity>
              </View>
            </Card>
          )}
        </View>
        
        {/* Active Medications */}
        <View style={styles.section}>
          <View style={[styles.sectionHeader, isRTLLayout && styles.sectionHeaderRTL]}>
            <Text style={[styles.sectionTitle, isRTLLayout && styles.textRTL]}>{t('medications')}</Text>
            <TouchableOpacity onPress={() => router.push('/medications')}>
              <Text style={[styles.seeAllText, isRTLLayout && styles.textRTL]}>{t('manage')}</Text>
            </TouchableOpacity>
          </View>
          
          {activeMedications.length > 0 ? (
            <View style={styles.medicationsContainer}>
              {activeMedications.slice(0, 3).map((medication) => {
                const transformedMedication = {
                  ...medication,
                  startDate: medication.startDate || new Date().toISOString(),
                  timeOfDay: medication.timeOfDay || ['morning'],
                };
                
                return (
                  <Card key={medication.id} variant="elevated" style={styles.medicationCard}>
                    <View style={[styles.medicationContent, isRTLLayout && styles.medicationContentRTL]}>
                      <View style={[styles.medicationIcon, { backgroundColor: `${colors.info}20` }]}>
                        <Pill size={20} color={colors.info} />
                      </View>
                      <View style={styles.medicationText}>
                        <Text style={[styles.medicationName, isRTLLayout && styles.textRTL]}>{medication.name}</Text>
                        <Text style={[styles.medicationDosage, isRTLLayout && styles.textRTL]}>{medication.dosage}</Text>
                        <Text style={[styles.medicationFrequency, isRTLLayout && styles.textRTL]}>{medication.frequency}</Text>
                      </View>
                      <TouchableOpacity 
                        style={styles.medicationButton}
                        onPress={() => router.push(`/medications/${medication.id}/edit`)}
                      >
                        <Text style={styles.medicationButtonText}>{t('edit')}</Text>
                      </TouchableOpacity>
                    </View>
                  </Card>
                );
              })}
            </View>
          ) : (
            <Card variant="outlined" style={styles.emptyCard}>
              <View style={styles.emptyContent}>
                <View style={styles.emptyIcon}>
                  <Pill size={32} color={colors.textSecondary} />
                </View>
                <Text style={[styles.emptyTitle, isRTLLayout && styles.textRTL]}>{t('noActiveMedications')}</Text>
                <Text style={[styles.emptyDescription, isRTLLayout && styles.textRTL]}>
                  {t('addMedicationsTrack')}
                </Text>
                <TouchableOpacity 
                  style={styles.addMedicationButton}
                  onPress={() => router.push('/medications/add')}
                >
                  <Text style={styles.addMedicationText}>{t('addMedication')}</Text>
                </TouchableOpacity>
              </View>
            </Card>
          )}
        </View>
        
        {/* Health Insights */}
        <View style={styles.section}>
          <View style={[styles.sectionHeader, isRTLLayout && styles.sectionHeaderRTL]}>
            <Text style={[styles.sectionTitle, isRTLLayout && styles.textRTL]}>{t('healthInsights')}</Text>
            <TouchableOpacity onPress={() => router.push('/insights')}>
              <Text style={[styles.seeAllText, isRTLLayout && styles.textRTL]}>{t('viewAll')}</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.insightsContainer}>
            <Card variant="elevated" style={styles.insightCard}>
              <View style={[styles.insightContent, isRTLLayout && styles.insightContentRTL]}>
                <View style={[styles.insightIcon, { backgroundColor: `${colors.success}20` }]}>
                  <TrendingUp size={24} color={colors.success} />
                </View>
                <View style={styles.insightText}>
                  <Text style={[styles.insightTitle, isRTLLayout && styles.textRTL]}>{t('greatProgress')}</Text>
                  <Text style={[styles.insightDescription, isRTLLayout && styles.textRTL]}>
                    {t('heartRateHealthy')}
                  </Text>
                </View>
              </View>
            </Card>
            
            <Card variant="elevated" style={styles.insightCard}>
              <View style={[styles.insightContent, isRTLLayout && styles.insightContentRTL]}>
                <View style={[styles.insightIcon, { backgroundColor: `${colors.warning}20` }]}>
                  <AlertCircle size={24} color={colors.warning} />
                </View>
                <View style={styles.insightText}>
                  <Text style={[styles.insightTitle, isRTLLayout && styles.textRTL]}>{t('sleepOptimization')}</Text>
                  <Text style={[styles.insightDescription, isRTLLayout && styles.textRTL]}>
                    {t('trackSleepQuality')}
                  </Text>
                </View>
              </View>
            </Card>
          </View>
        </View>
      </ScrollView>
      
      {showMetricInput && (
        <HealthMetricInput
          onSave={handleAddMetric}
          onClose={() => setShowMetricInput(false)}
        />
      )}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerRTL: {
    flexDirection: 'row-reverse',
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
  },
  headerSubtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 2,
  },
  textRTL: {
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.cardBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionHeaderRTL: {
    flexDirection: 'row-reverse',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
  },
  seeAllText: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '600',
  },
  statusCard: {
    
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  statusHeaderRTL: {
    flexDirection: 'row-reverse',
  },
  statusIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: `${colors.success}20`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  statusText: {
    flex: 1,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  statusSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  statusIndicator: {
    
  },
  statusMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statusMetric: {
    alignItems: 'center',
  },
  statusMetricValue: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  statusMetricLabel: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickActionCard: {
    width: '48%',
    borderRadius: 20,
    padding: 20,
    minHeight: 100,
  },
  quickActionContent: {
    alignItems: 'flex-start',
  },
  quickActionText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginTop: 12,
    marginBottom: 2,
  },
  quickActionSubtext: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  metricCard: {
    width: '48%',
  },
  metricContent: {
    
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  metricHeaderRTL: {
    flexDirection: 'row-reverse',
  },
  metricTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  metricStatus: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  metricStatusText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 2,
  },
  metricUnit: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  metricTrend: {
    
  },
  trendText: {
    fontSize: 12,
    fontWeight: '600',
  },
  appointmentsContainer: {
    gap: 12,
  },
  appointmentCard: {
    
  },
  appointmentContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  appointmentContentRTL: {
    flexDirection: 'row-reverse',
  },
  appointmentIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appointmentText: {
    flex: 1,
  },
  appointmentTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  appointmentProvider: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  appointmentTime: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
  appointmentButton: {
    backgroundColor: `${colors.primary}15`,
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  appointmentButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  medicationsContainer: {
    gap: 12,
  },
  medicationCard: {
    
  },
  medicationContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  medicationContentRTL: {
    flexDirection: 'row-reverse',
  },
  medicationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  medicationText: {
    flex: 1,
  },
  medicationName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  medicationDosage: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  medicationFrequency: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
  medicationButton: {
    backgroundColor: `${colors.info}15`,
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  medicationButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.info,
  },
  insightsContainer: {
    gap: 12,
  },
  insightCard: {
    
  },
  insightContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
  },
  insightContentRTL: {
    flexDirection: 'row-reverse',
  },
  insightIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  insightText: {
    flex: 1,
  },
  insightTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  insightDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  emptyCard: {
    
  },
  emptyContent: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: `${colors.textSecondary}10`,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 15,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  scheduleButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 16,
  },
  scheduleButtonText: {
    fontSize: 16,
    color: colors.black,
    fontWeight: '600',
  },
  addMedicationButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 16,
  },
  addMedicationText: {
    fontSize: 16,
    color: colors.black,
    fontWeight: '600',
  },
});