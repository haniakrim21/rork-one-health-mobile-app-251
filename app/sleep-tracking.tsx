import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Stack } from 'expo-router';
import { colors } from '@/constants/colors';
import { Card } from '@/components/Card';
import { ProgressBar } from '@/components/ProgressBar';
import { 
  Moon, 
  Sun, 
  Clock, 
  TrendingUp,
  Calendar,
  Target,
  Zap,
  Heart,
  Brain
} from 'lucide-react-native';

export default function SleepTrackingScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month'>('week');
  
  const sleepData = {
    lastNight: {
      bedtime: '10:30 PM',
      wakeTime: '6:45 AM',
      duration: '8h 15m',
      quality: 85,
      deepSleep: '2h 30m',
      remSleep: '1h 45m',
      lightSleep: '4h 0m',
    },
    weeklyAverage: {
      duration: '7h 45m',
      quality: 78,
      bedtimeConsistency: 82,
    },
    trends: [
      { date: 'Mon', duration: 7.5, quality: 80 },
      { date: 'Tue', duration: 8.0, quality: 85 },
      { date: 'Wed', duration: 7.2, quality: 75 },
      { date: 'Thu', duration: 8.3, quality: 90 },
      { date: 'Fri', duration: 6.8, quality: 70 },
      { date: 'Sat', duration: 9.1, quality: 88 },
      { date: 'Sun', duration: 8.2, quality: 85 },
    ],
  };
  
  const sleepGoals = [
    { title: 'Sleep Duration', target: '8 hours', current: '7h 45m', progress: 97 },
    { title: 'Bedtime Consistency', target: '10:30 PM ±30min', current: '±25min', progress: 85 },
    { title: 'Sleep Quality', target: '85%', current: '78%', progress: 78 },
  ];
  
  const sleepTips = [
    {
      title: 'Optimize Your Environment',
      description: 'Keep your bedroom cool, dark, and quiet',
      icon: Moon,
    },
    {
      title: 'Consistent Schedule',
      description: 'Go to bed and wake up at the same time daily',
      icon: Clock,
    },
    {
      title: 'Wind Down Routine',
      description: 'Create a relaxing pre-sleep routine',
      icon: Heart,
    },
    {
      title: 'Limit Screen Time',
      description: 'Avoid screens 1 hour before bedtime',
      icon: Brain,
    },
  ];
  
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Sleep Tracking' }} />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Sleep Tracking</Text>
        <Text style={styles.headerSubtitle}>Monitor and improve your sleep quality</Text>
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <Card style={styles.lastNightCard}>
          <View style={styles.lastNightHeader}>
            <Moon size={24} color={colors.info} />
            <Text style={styles.lastNightTitle}>Last Night</Text>
            <View style={styles.qualityBadge}>
              <Text style={styles.qualityText}>{sleepData.lastNight.quality}%</Text>
            </View>
          </View>
          
          <View style={styles.sleepTimeContainer}>
            <View style={styles.sleepTime}>
              <Moon size={16} color={colors.textSecondary} />
              <Text style={styles.sleepTimeLabel}>Bedtime</Text>
              <Text style={styles.sleepTimeValue}>{sleepData.lastNight.bedtime}</Text>
            </View>
            <View style={styles.sleepTime}>
              <Sun size={16} color={colors.warning} />
              <Text style={styles.sleepTimeLabel}>Wake Time</Text>
              <Text style={styles.sleepTimeValue}>{sleepData.lastNight.wakeTime}</Text>
            </View>
          </View>
          
          <View style={styles.durationContainer}>
            <Text style={styles.durationLabel}>Total Sleep</Text>
            <Text style={styles.durationValue}>{sleepData.lastNight.duration}</Text>
          </View>
          
          <View style={styles.sleepStagesContainer}>
            <Text style={styles.sleepStagesTitle}>Sleep Stages</Text>
            <View style={styles.sleepStages}>
              <View style={styles.sleepStage}>
                <View style={[styles.stageIndicator, { backgroundColor: colors.info }]} />
                <Text style={styles.stageLabel}>Deep</Text>
                <Text style={styles.stageValue}>{sleepData.lastNight.deepSleep}</Text>
              </View>
              <View style={styles.sleepStage}>
                <View style={[styles.stageIndicator, { backgroundColor: colors.primary }]} />
                <Text style={styles.stageLabel}>REM</Text>
                <Text style={styles.stageValue}>{sleepData.lastNight.remSleep}</Text>
              </View>
              <View style={styles.sleepStage}>
                <View style={[styles.stageIndicator, { backgroundColor: colors.success }]} />
                <Text style={styles.stageLabel}>Light</Text>
                <Text style={styles.stageValue}>{sleepData.lastNight.lightSleep}</Text>
              </View>
            </View>
          </View>
        </Card>
        
        <Card style={styles.trendsCard}>
          <View style={styles.trendsHeader}>
            <TrendingUp size={20} color={colors.primary} />
            <Text style={styles.trendsTitle}>Sleep Trends</Text>
            <View style={styles.periodSelector}>
              {(['week', 'month'] as const).map(period => (
                <TouchableOpacity
                  key={period}
                  style={[
                    styles.periodButton,
                    selectedPeriod === period && styles.selectedPeriod
                  ]}
                  onPress={() => setSelectedPeriod(period)}
                >
                  <Text style={[
                    styles.periodText,
                    selectedPeriod === period && styles.selectedPeriodText
                  ]}>
                    {period.charAt(0).toUpperCase() + period.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          
          <View style={styles.averagesContainer}>
            <View style={styles.average}>
              <Text style={styles.averageLabel}>Avg Duration</Text>
              <Text style={styles.averageValue}>{sleepData.weeklyAverage.duration}</Text>
            </View>
            <View style={styles.average}>
              <Text style={styles.averageLabel}>Avg Quality</Text>
              <Text style={styles.averageValue}>{sleepData.weeklyAverage.quality}%</Text>
            </View>
            <View style={styles.average}>
              <Text style={styles.averageLabel}>Consistency</Text>
              <Text style={styles.averageValue}>{sleepData.weeklyAverage.bedtimeConsistency}%</Text>
            </View>
          </View>
        </Card>
        
        <Card style={styles.goalsCard}>
          <Text style={styles.goalsTitle}>Sleep Goals</Text>
          {sleepGoals.map((goal, index) => (
            <View key={index} style={styles.goalItem}>
              <View style={styles.goalHeader}>
                <Text style={styles.goalTitle}>{goal.title}</Text>
                <Text style={styles.goalProgress}>{goal.progress}%</Text>
              </View>
              <View style={styles.goalDetails}>
                <Text style={styles.goalTarget}>Target: {goal.target}</Text>
                <Text style={styles.goalCurrent}>Current: {goal.current}</Text>
              </View>
              <ProgressBar 
                progress={goal.progress} 
                fillColor={goal.progress >= 80 ? colors.success : colors.warning}
                style={styles.goalProgressBar}
              />
            </View>
          ))}
        </Card>
        
        <Card style={styles.tipsCard}>
          <Text style={styles.tipsTitle}>Sleep Improvement Tips</Text>
          {sleepTips.map((tip, index) => (
            <View key={index} style={styles.tipItem}>
              <View style={styles.tipIcon}>
                <tip.icon size={20} color={colors.primary} />
              </View>
              <View style={styles.tipContent}>
                <Text style={styles.tipTitle}>{tip.title}</Text>
                <Text style={styles.tipDescription}>{tip.description}</Text>
              </View>
            </View>
          ))}
        </Card>
        
        <Card style={styles.actionsCard}>
          <Text style={styles.actionsTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => Alert.alert('Sleep Timer', 'Set bedtime reminder')}
            >
              <Clock size={20} color={colors.primary} />
              <Text style={styles.actionText}>Set Bedtime</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => Alert.alert('Sleep Log', 'Log sleep manually')}
            >
              <Calendar size={20} color={colors.success} />
              <Text style={styles.actionText}>Log Sleep</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => Alert.alert('Sleep Sounds', 'Play relaxing sounds')}
            >
              <Moon size={20} color={colors.info} />
              <Text style={styles.actionText}>Sleep Sounds</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => Alert.alert('Smart Alarm', 'Set smart wake alarm')}
            >
              <Sun size={20} color={colors.warning} />
              <Text style={styles.actionText}>Smart Alarm</Text>
            </TouchableOpacity>
          </View>
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
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingTop: 60,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  lastNightCard: {
    marginBottom: 16,
  },
  lastNightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  lastNightTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginLeft: 8,
    flex: 1,
  },
  qualityBadge: {
    backgroundColor: colors.success + '20',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  qualityText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.success,
  },
  sleepTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  sleepTime: {
    alignItems: 'center',
    flex: 1,
  },
  sleepTimeLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
  },
  sleepTimeValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginTop: 2,
  },
  durationContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  durationLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  durationValue: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.primary,
    marginTop: 4,
  },
  sleepStagesContainer: {
    
  },
  sleepStagesTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  sleepStages: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  sleepStage: {
    alignItems: 'center',
  },
  stageIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginBottom: 4,
  },
  stageLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  stageValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  trendsCard: {
    marginBottom: 16,
  },
  trendsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  trendsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 8,
    flex: 1,
  },
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: colors.border,
    borderRadius: 16,
    padding: 2,
  },
  periodButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 14,
  },
  selectedPeriod: {
    backgroundColor: colors.primary,
  },
  periodText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  selectedPeriodText: {
    color: colors.black,
  },
  averagesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  average: {
    alignItems: 'center',
  },
  averageLabel: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  averageValue: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
    marginTop: 4,
  },
  goalsCard: {
    marginBottom: 16,
  },
  goalsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  goalItem: {
    marginBottom: 16,
  },
  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  goalTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  goalProgress: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  goalDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  goalTarget: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  goalCurrent: {
    fontSize: 12,
    color: colors.text,
  },
  goalProgressBar: {
    
  },
  tipsCard: {
    marginBottom: 16,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  tipIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  tipDescription: {
    fontSize: 12,
    color: colors.textSecondary,
    lineHeight: 16,
  },
  actionsCard: {
    
  },
  actionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  actionButton: {
    width: '48%',
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  actionText: {
    fontSize: 12,
    color: colors.text,
    fontWeight: '500',
    marginTop: 8,
  },
});