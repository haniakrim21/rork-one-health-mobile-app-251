import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Stack } from 'expo-router';
import { colors } from '@/constants/colors';
import { Card } from '@/components/Card';
import { ProgressBar } from '@/components/ProgressBar';
import { 
  Users, 
  Activity, 
  Heart, 
  Brain, 
  Shield, 
  Zap,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Smartphone
} from 'lucide-react-native';

export default function DigitalTwinScreen() {
  const [activeTab, setActiveTab] = useState<'overview' | 'predictions' | 'monitoring'>('overview');
  
  const digitalTwinData = {
    vitalSigns: {
      heartRate: 72,
      bloodPressure: { systolic: 120, diastolic: 80 },
      temperature: 98.6,
      oxygenSaturation: 98,
      respiratoryRate: 16,
    },
    wearableData: {
      steps: 8104,
      caloriesBurned: 2150,
      sleepHours: 7.5,
      stressLevel: 3,
      activityMinutes: 45,
    },
    predictions: [
      {
        condition: 'Cardiovascular Risk',
        riskScore: 15,
        timeframe: '5 years',
        confidence: 85,
        trend: 'stable',
        recommendations: [
          'Maintain current exercise routine',
          'Monitor blood pressure weekly',
          'Consider Mediterranean diet',
        ],
      },
      {
        condition: 'Sleep Quality Decline',
        riskScore: 25,
        timeframe: '1 month',
        confidence: 78,
        trend: 'increasing',
        recommendations: [
          'Establish consistent sleep schedule',
          'Reduce screen time before bed',
          'Consider sleep study if issues persist',
        ],
      },
    ],
    lastUpdated: new Date().toISOString(),
  };
  
  const getRiskColor = (riskScore: number) => {
    if (riskScore < 20) return colors.success;
    if (riskScore < 50) return colors.warning;
    return colors.error;
  };
  
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing': return AlertTriangle;
      case 'decreasing': return TrendingUp;
      case 'stable': return CheckCircle2;
      default: return Activity;
    }
  };
  
  const renderOverview = () => (
    <View>
      <Card style={styles.headerCard}>
        <View style={styles.headerContent}>
          <Users size={32} color={colors.primary} />
          <View style={styles.headerText}>
            <Text style={styles.headerTitle}>Your Digital Twin</Text>
            <Text style={styles.headerSubtitle}>
              AI-powered health model updated in real-time
            </Text>
          </View>
        </View>
        <Text style={styles.lastUpdated}>
          Last updated: {new Date(digitalTwinData.lastUpdated).toLocaleString()}
        </Text>
      </Card>
      
      <Card style={styles.vitalsCard}>
        <Text style={styles.sectionTitle}>Current Vital Signs</Text>
        <View style={styles.vitalsGrid}>
          <View style={styles.vitalItem}>
            <Heart size={20} color={colors.error} />
            <Text style={styles.vitalValue}>{digitalTwinData.vitalSigns.heartRate}</Text>
            <Text style={styles.vitalUnit}>bpm</Text>
          </View>
          <View style={styles.vitalItem}>
            <Activity size={20} color={colors.primary} />
            <Text style={styles.vitalValue}>
              {digitalTwinData.vitalSigns.bloodPressure.systolic}/{digitalTwinData.vitalSigns.bloodPressure.diastolic}
            </Text>
            <Text style={styles.vitalUnit}>mmHg</Text>
          </View>
          <View style={styles.vitalItem}>
            <Zap size={20} color={colors.warning} />
            <Text style={styles.vitalValue}>{digitalTwinData.vitalSigns.temperature}</Text>
            <Text style={styles.vitalUnit}>°F</Text>
          </View>
          <View style={styles.vitalItem}>
            <Activity size={20} color={colors.success} />
            <Text style={styles.vitalValue}>{digitalTwinData.vitalSigns.oxygenSaturation}</Text>
            <Text style={styles.vitalUnit}>%</Text>
          </View>
        </View>
      </Card>
      
      <Card style={styles.wearableCard}>
        <View style={styles.wearableHeader}>
          <Smartphone size={20} color={colors.primary} />
          <Text style={styles.sectionTitle}>Wearable Data</Text>
        </View>
        <View style={styles.wearableGrid}>
          <View style={styles.wearableItem}>
            <Text style={styles.wearableLabel}>Steps</Text>
            <Text style={styles.wearableValue}>{digitalTwinData.wearableData.steps.toLocaleString()}</Text>
            <ProgressBar progress={81} fillColor={colors.primary} style={styles.wearableProgress} />
          </View>
          <View style={styles.wearableItem}>
            <Text style={styles.wearableLabel}>Calories</Text>
            <Text style={styles.wearableValue}>{digitalTwinData.wearableData.caloriesBurned}</Text>
            <ProgressBar progress={72} fillColor={colors.warning} style={styles.wearableProgress} />
          </View>
          <View style={styles.wearableItem}>
            <Text style={styles.wearableLabel}>Sleep</Text>
            <Text style={styles.wearableValue}>{digitalTwinData.wearableData.sleepHours}h</Text>
            <ProgressBar progress={94} fillColor={colors.success} style={styles.wearableProgress} />
          </View>
          <View style={styles.wearableItem}>
            <Text style={styles.wearableLabel}>Stress</Text>
            <Text style={styles.wearableValue}>{digitalTwinData.wearableData.stressLevel}/10</Text>
            <ProgressBar progress={30} fillColor={colors.success} style={styles.wearableProgress} />
          </View>
        </View>
      </Card>
      
      <Card style={styles.insightsCard}>
        <View style={styles.insightsHeader}>
          <Brain size={20} color={colors.primary} />
          <Text style={styles.sectionTitle}>AI Insights</Text>
        </View>
        <View style={styles.insightItem}>
          <CheckCircle2 size={16} color={colors.success} />
          <Text style={styles.insightText}>
            Your cardiovascular health is excellent based on current metrics
          </Text>
        </View>
        <View style={styles.insightItem}>
          <AlertTriangle size={16} color={colors.warning} />
          <Text style={styles.insightText}>
            Sleep quality has declined 12% over the past week
          </Text>
        </View>
        <View style={styles.insightItem}>
          <TrendingUp size={16} color={colors.primary} />
          <Text style={styles.insightText}>
            Activity levels are 15% above your monthly average
          </Text>
        </View>
      </Card>
    </View>
  );
  
  const renderPredictions = () => (
    <View>
      <Card style={styles.predictionsHeader}>
        <Brain size={24} color={colors.primary} />
        <Text style={styles.predictionsTitle}>Health Predictions</Text>
        <Text style={styles.predictionsSubtitle}>
          AI-powered risk assessments based on your digital twin model
        </Text>
      </Card>
      
      {digitalTwinData.predictions.map((prediction, index) => {
        const TrendIcon = getTrendIcon(prediction.trend);
        return (
          <Card key={index} style={styles.predictionCard}>
            <View style={styles.predictionHeader}>
              <Text style={styles.predictionCondition}>{prediction.condition}</Text>
              <View style={styles.predictionMeta}>
                <TrendIcon size={16} color={getRiskColor(prediction.riskScore)} />
                <Text style={[styles.predictionTrend, { color: getRiskColor(prediction.riskScore) }]}>
                  {prediction.trend}
                </Text>
              </View>
            </View>
            
            <View style={styles.riskContainer}>
              <Text style={styles.riskLabel}>Risk Score</Text>
              <View style={styles.riskScoreContainer}>
                <Text style={[styles.riskScore, { color: getRiskColor(prediction.riskScore) }]}>
                  {prediction.riskScore}%
                </Text>
                <Text style={styles.riskTimeframe}>in {prediction.timeframe}</Text>
              </View>
            </View>
            
            <ProgressBar 
              progress={prediction.riskScore} 
              fillColor={getRiskColor(prediction.riskScore)}
              style={styles.riskProgress}
            />
            
            <View style={styles.confidenceContainer}>
              <Text style={styles.confidenceLabel}>AI Confidence: {prediction.confidence}%</Text>
            </View>
            
            <Text style={styles.recommendationsTitle}>Recommendations</Text>
            {prediction.recommendations.map((rec, recIndex) => (
              <View key={recIndex} style={styles.recommendationItem}>
                <CheckCircle2 size={14} color={colors.primary} />
                <Text style={styles.recommendationText}>{rec}</Text>
              </View>
            ))}
          </Card>
        );
      })}
      
      <TouchableOpacity 
        style={styles.updateButton}
        onPress={() => Alert.alert('Update Predictions', 'Generate new AI predictions based on latest data')}
      >
        <Brain size={16} color={colors.black} />
        <Text style={styles.updateButtonText}>Update Predictions</Text>
      </TouchableOpacity>
    </View>
  );
  
  const renderMonitoring = () => (
    <View>
      <Card style={styles.monitoringHeader}>
        <Activity size={24} color={colors.primary} />
        <Text style={styles.monitoringTitle}>Real-Time Monitoring</Text>
        <Text style={styles.monitoringSubtitle}>
          Continuous health monitoring with connected devices
        </Text>
      </Card>
      
      <Card style={styles.devicesCard}>
        <Text style={styles.sectionTitle}>Connected Devices</Text>
        <View style={styles.deviceItem}>
          <View style={styles.deviceInfo}>
            <Smartphone size={20} color={colors.success} />
            <View style={styles.deviceDetails}>
              <Text style={styles.deviceName}>Apple Watch Series 9</Text>
              <Text style={styles.deviceStatus}>Connected • Last sync: 2 min ago</Text>
            </View>
          </View>
          <View style={styles.deviceIndicator}>
            <View style={[styles.statusDot, { backgroundColor: colors.success }]} />
          </View>
        </View>
        
        <View style={styles.deviceItem}>
          <View style={styles.deviceInfo}>
            <Activity size={20} color={colors.success} />
            <View style={styles.deviceDetails}>
              <Text style={styles.deviceName}>Continuous Glucose Monitor</Text>
              <Text style={styles.deviceStatus}>Connected • Last reading: 5 min ago</Text>
            </View>
          </View>
          <View style={styles.deviceIndicator}>
            <View style={[styles.statusDot, { backgroundColor: colors.success }]} />
          </View>
        </View>
        
        <TouchableOpacity 
          style={styles.addDeviceButton}
          onPress={() => Alert.alert('Add Device', 'Connect a new monitoring device')}
        >
          <Text style={styles.addDeviceText}>+ Add Device</Text>
        </TouchableOpacity>
      </Card>
      
      <Card style={styles.alertsCard}>
        <View style={styles.alertsHeader}>
          <AlertTriangle size={20} color={colors.warning} />
          <Text style={styles.sectionTitle}>Recent Alerts</Text>
        </View>
        <View style={styles.alertItem}>
          <Clock size={16} color={colors.warning} />
          <View style={styles.alertContent}>
            <Text style={styles.alertText}>Heart rate slightly elevated during sleep</Text>
            <Text style={styles.alertTime}>2 hours ago</Text>
          </View>
        </View>
        <View style={styles.alertItem}>
          <Activity size={16} color={colors.primary} />
          <View style={styles.alertContent}>
            <Text style={styles.alertText}>Daily step goal achieved</Text>
            <Text style={styles.alertTime}>4 hours ago</Text>
          </View>
        </View>
      </Card>
    </View>
  );
  
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Digital Twin' }} />
      
      <View style={styles.tabsContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'overview' && styles.activeTab]}
          onPress={() => setActiveTab('overview')}
        >
          <Users size={18} color={activeTab === 'overview' ? colors.primary : colors.textSecondary} />
          <Text style={[styles.tabText, activeTab === 'overview' && styles.activeTabText]}>
            Overview
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'predictions' && styles.activeTab]}
          onPress={() => setActiveTab('predictions')}
        >
          <Brain size={18} color={activeTab === 'predictions' ? colors.primary : colors.textSecondary} />
          <Text style={[styles.tabText, activeTab === 'predictions' && styles.activeTabText]}>
            Predictions
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'monitoring' && styles.activeTab]}
          onPress={() => setActiveTab('monitoring')}
        >
          <Activity size={18} color={activeTab === 'monitoring' ? colors.primary : colors.textSecondary} />
          <Text style={[styles.tabText, activeTab === 'monitoring' && styles.activeTabText]}>
            Monitoring
          </Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'predictions' && renderPredictions()}
        {activeTab === 'monitoring' && renderMonitoring()}
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
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerText: {
    marginLeft: 12,
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  headerSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 2,
  },
  lastUpdated: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  vitalsCard: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  vitalsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  vitalItem: {
    width: '48%',
    alignItems: 'center',
    paddingVertical: 16,
    backgroundColor: colors.primary + '05',
    borderRadius: 12,
    marginBottom: 12,
  },
  vitalValue: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginTop: 8,
  },
  vitalUnit: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  wearableCard: {
    marginBottom: 16,
  },
  wearableHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  wearableGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  wearableItem: {
    width: '48%',
    marginBottom: 16,
  },
  wearableLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  wearableValue: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  wearableProgress: {
    height: 4,
  },
  insightsCard: {
    marginBottom: 16,
  },
  insightsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  insightItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  insightText: {
    fontSize: 14,
    color: colors.text,
    marginLeft: 8,
    flex: 1,
    lineHeight: 18,
  },
  predictionsHeader: {
    alignItems: 'center',
    marginBottom: 16,
  },
  predictionsTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginTop: 8,
  },
  predictionsSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 4,
  },
  predictionCard: {
    marginBottom: 16,
  },
  predictionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  predictionCondition: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  predictionMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  predictionTrend: {
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
    textTransform: 'capitalize',
  },
  riskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  riskLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  riskScoreContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  riskScore: {
    fontSize: 24,
    fontWeight: '700',
  },
  riskTimeframe: {
    fontSize: 12,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  riskProgress: {
    marginBottom: 12,
  },
  confidenceContainer: {
    marginBottom: 16,
  },
  confidenceLabel: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  recommendationsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  recommendationText: {
    fontSize: 12,
    color: colors.text,
    marginLeft: 8,
    flex: 1,
    lineHeight: 16,
  },
  updateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 8,
  },
  updateButtonText: {
    color: colors.black,
    fontWeight: '600',
    marginLeft: 8,
  },
  monitoringHeader: {
    alignItems: 'center',
    marginBottom: 16,
  },
  monitoringTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginTop: 8,
  },
  monitoringSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 4,
  },
  devicesCard: {
    marginBottom: 16,
  },
  deviceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  deviceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  deviceDetails: {
    marginLeft: 12,
    flex: 1,
  },
  deviceName: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  deviceStatus: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  deviceIndicator: {
    marginLeft: 12,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  addDeviceButton: {
    alignSelf: 'flex-start',
    marginTop: 12,
  },
  addDeviceText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
  alertsCard: {
    marginBottom: 16,
  },
  alertsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  alertItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  alertContent: {
    marginLeft: 8,
    flex: 1,
  },
  alertText: {
    fontSize: 14,
    color: colors.text,
  },
  alertTime: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
});