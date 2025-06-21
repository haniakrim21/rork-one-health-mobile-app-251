import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';
import { colors } from '@/constants/colors';
import { Card } from '@/components/Card';
import { ProgressBar } from '@/components/ProgressBar';
import { 
  Footprints, 
  Heart, 
  Moon, 
  Flame, 
  Activity, 
  Droplets,
  Calendar,
  TrendingUp
} from 'lucide-react-native';

export default function ActivitiesScreen() {
  const [activeTab, setActiveTab] = useState<'today' | 'week' | 'month'>('today');
  
  const todayActivities = [
    {
      id: '1',
      name: 'Steps',
      value: '8,104',
      unit: 'steps',
      progress: 67,
      change: '+12%',
      icon: Footprints,
      color: colors.success,
    },
    {
      id: '2',
      name: 'Heart Rate',
      value: '72',
      unit: 'bpm',
      progress: 40,
      change: '+2%',
      icon: Heart,
      color: colors.error,
    },
    {
      id: '3',
      name: 'Sleep',
      value: '7.5',
      unit: 'hours',
      progress: 80,
      change: '+8%',
      icon: Moon,
      color: colors.wellness,
    },
    {
      id: '4',
      name: 'Calories',
      value: '2,150',
      unit: 'kcal',
      progress: 75,
      change: '+5%',
      icon: Flame,
      color: colors.warning,
    },
    {
      id: '5',
      name: 'Active Time',
      value: '45',
      unit: 'min',
      progress: 60,
      change: '+15%',
      icon: Activity,
      color: colors.fitness,
    },
    {
      id: '6',
      name: 'Water',
      value: '6',
      unit: 'glasses',
      progress: 75,
      change: '+3%',
      icon: Droplets,
      color: colors.primary,
    },
  ];

  const weeklyData = [
    { day: 'Mon', steps: 8500, calories: 2200, sleep: 7.2 },
    { day: 'Tue', steps: 7800, calories: 2100, sleep: 7.8 },
    { day: 'Wed', steps: 9200, calories: 2300, sleep: 6.9 },
    { day: 'Thu', steps: 8100, calories: 2150, sleep: 7.5 },
    { day: 'Fri', steps: 7600, calories: 2050, sleep: 8.1 },
    { day: 'Sat', steps: 10200, calories: 2400, sleep: 8.5 },
    { day: 'Sun', steps: 8104, calories: 2150, sleep: 7.5 },
  ];

  const renderTodayView = () => (
    <>
      <Text style={styles.sectionTitle}>Today's Activity</Text>
      <View style={styles.activitiesGrid}>
        {todayActivities.map(activity => (
          <Card key={activity.id} style={styles.activityCard}>
            <View style={styles.activityHeader}>
              <View style={[styles.activityIcon, { backgroundColor: activity.color + '20' }]}>
                <activity.icon size={20} color={activity.color} />
              </View>
              <Text style={styles.activityName}>{activity.name}</Text>
            </View>
            
            <Text style={styles.activityValue}>
              {activity.value}
              <Text style={styles.activityUnit}> {activity.unit}</Text>
            </Text>
            
            <ProgressBar 
              progress={activity.progress} 
              fillColor={activity.color}
              style={styles.activityProgress}
            />
            
            <Text style={[styles.activityChange, { color: activity.color }]}>
              {activity.change}
            </Text>
          </Card>
        ))}
      </View>
    </>
  );

  const renderWeeklyView = () => (
    <>
      <Text style={styles.sectionTitle}>Weekly Summary</Text>
      
      <Card style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>This Week</Text>
        <View style={styles.summaryStats}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>52,730</Text>
            <Text style={styles.summaryLabel}>Total Steps</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>315</Text>
            <Text style={styles.summaryLabel}>Active Minutes</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>52.5</Text>
            <Text style={styles.summaryLabel}>Hours Sleep</Text>
          </View>
        </View>
      </Card>

      <Card style={styles.chartCard}>
        <Text style={styles.chartTitle}>Daily Steps</Text>
        <View style={styles.chartContainer}>
          {weeklyData.map((day, index) => (
            <View key={day.day} style={styles.chartBar}>
              <View 
                style={[
                  styles.bar, 
                  { 
                    height: (day.steps / 12000) * 100,
                    backgroundColor: index === 6 ? colors.primary : colors.border
                  }
                ]} 
              />
              <Text style={styles.chartLabel}>{day.day}</Text>
            </View>
          ))}
        </View>
      </Card>
    </>
  );

  const renderMonthlyView = () => (
    <>
      <Text style={styles.sectionTitle}>Monthly Overview</Text>
      
      <Card style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>This Month</Text>
        <View style={styles.summaryStats}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>210,920</Text>
            <Text style={styles.summaryLabel}>Total Steps</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>1,260</Text>
            <Text style={styles.summaryLabel}>Active Minutes</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>210</Text>
            <Text style={styles.summaryLabel}>Hours Sleep</Text>
          </View>
        </View>
      </Card>

      <Card style={styles.trendsCard}>
        <View style={styles.trendsHeader}>
          <TrendingUp size={20} color={colors.success} />
          <Text style={styles.trendsTitle}>Monthly Trends</Text>
        </View>
        
        <View style={styles.trendItem}>
          <Text style={styles.trendLabel}>Average Daily Steps</Text>
          <Text style={styles.trendValue}>6,804 (+15%)</Text>
        </View>
        
        <View style={styles.trendItem}>
          <Text style={styles.trendLabel}>Sleep Quality</Text>
          <Text style={styles.trendValue}>7.2 hrs (+8%)</Text>
        </View>
        
        <View style={styles.trendItem}>
          <Text style={styles.trendLabel}>Active Days</Text>
          <Text style={styles.trendValue}>28/31 (90%)</Text>
        </View>
      </Card>
    </>
  );

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ 
        title: 'All Activities',
        headerShown: true 
      }} />
      
      <View style={styles.tabsContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'today' && styles.activeTab]}
          onPress={() => setActiveTab('today')}
        >
          <Text style={[styles.tabText, activeTab === 'today' && styles.activeTabText]}>
            Today
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'week' && styles.activeTab]}
          onPress={() => setActiveTab('week')}
        >
          <Text style={[styles.tabText, activeTab === 'week' && styles.activeTabText]}>
            Week
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'month' && styles.activeTab]}
          onPress={() => setActiveTab('month')}
        >
          <Text style={[styles.tabText, activeTab === 'month' && styles.activeTabText]}>
            Month
          </Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {activeTab === 'today' && renderTodayView()}
        {activeTab === 'week' && renderWeeklyView()}
        {activeTab === 'month' && renderMonthlyView()}
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
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: colors.primary + '20',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  activeTabText: {
    color: colors.primary,
    fontWeight: '600',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  activitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  activityCard: {
    width: '48%',
    marginBottom: 16,
    padding: 16,
  },
  activityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  activityName: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  activityValue: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  activityUnit: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.textSecondary,
  },
  activityProgress: {
    marginBottom: 8,
  },
  activityChange: {
    fontSize: 12,
    fontWeight: '600',
  },
  summaryCard: {
    marginBottom: 16,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  summaryStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  chartCard: {
    marginBottom: 16,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 120,
  },
  chartBar: {
    alignItems: 'center',
    flex: 1,
  },
  bar: {
    width: 20,
    borderRadius: 4,
    marginBottom: 8,
  },
  chartLabel: {
    fontSize: 12,
    color: colors.textSecondary,
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
  },
  trendItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  trendLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  trendValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
});