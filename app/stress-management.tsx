import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Stack } from 'expo-router';
import { colors } from '@/constants/colors';
import { Card } from '@/components/Card';
import { ProgressBar } from '@/components/ProgressBar';
import { 
  Heart, 
  Brain, 
  Leaf, 
  Clock,
  Target,
  TrendingDown,
  Zap,
  Shield,
  Play,
  Calendar
} from 'lucide-react-native';

export default function StressManagementScreen() {
  const [selectedTechnique, setSelectedTechnique] = useState<string | null>(null);
  
  const stressLevel = {
    current: 6,
    average: 5.2,
    trend: 'decreasing',
  };
  
  const techniques = [
    {
      id: 'breathing',
      title: 'Breathing Exercises',
      description: '4-7-8 breathing technique for instant calm',
      duration: '5 min',
      icon: Leaf,
      color: colors.success,
      difficulty: 'Easy',
    },
    {
      id: 'meditation',
      title: 'Guided Meditation',
      description: 'Mindfulness meditation for stress relief',
      duration: '10 min',
      icon: Brain,
      color: colors.primary,
      difficulty: 'Medium',
    },
    {
      id: 'progressive',
      title: 'Progressive Relaxation',
      description: 'Systematic muscle tension and release',
      duration: '15 min',
      icon: Target,
      color: colors.info,
      difficulty: 'Medium',
    },
    {
      id: 'visualization',
      title: 'Visualization',
      description: 'Guided imagery for mental escape',
      duration: '8 min',
      icon: Zap,
      color: colors.warning,
      difficulty: 'Easy',
    },
  ];
  
  const quickTips = [
    {
      title: 'Take Deep Breaths',
      description: 'Slow, deep breathing activates your relaxation response',
      icon: Leaf,
    },
    {
      title: 'Practice Gratitude',
      description: 'Focus on positive aspects of your life',
      icon: Heart,
    },
    {
      title: 'Stay Present',
      description: 'Ground yourself in the current moment',
      icon: Target,
    },
    {
      title: 'Move Your Body',
      description: 'Physical activity helps release tension',
      icon: Zap,
    },
  ];
  
  const stressFactors = [
    { factor: 'Work', level: 7, color: colors.error },
    { factor: 'Relationships', level: 4, color: colors.warning },
    { factor: 'Health', level: 3, color: colors.success },
    { factor: 'Finances', level: 6, color: colors.primary },
  ];
  
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Stress Management' }} />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Stress Management</Text>
        <Text style={styles.headerSubtitle}>Tools and techniques to manage stress effectively</Text>
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <Card style={styles.stressLevelCard}>
          <View style={styles.stressHeader}>
            <Heart size={24} color={colors.primary} />
            <Text style={styles.stressTitle}>Current Stress Level</Text>
            <View style={styles.trendIndicator}>
              <TrendingDown size={16} color={colors.success} />
              <Text style={styles.trendText}>Improving</Text>
            </View>
          </View>
          
          <View style={styles.stressLevelContainer}>
            <Text style={styles.stressLevelValue}>{stressLevel.current}/10</Text>
            <Text style={styles.stressLevelLabel}>Moderate Stress</Text>
          </View>
          
          <ProgressBar 
            progress={stressLevel.current * 10} 
            fillColor={stressLevel.current > 7 ? colors.error : stressLevel.current > 4 ? colors.warning : colors.success}
            style={styles.stressProgressBar}
          />
          
          <Text style={styles.stressAverage}>
            7-day average: {stressLevel.average}/10
          </Text>
        </Card>
        
        <Card style={styles.emergencyCard}>
          <View style={styles.emergencyHeader}>
            <Shield size={20} color={colors.error} />
            <Text style={styles.emergencyTitle}>Feeling Overwhelmed?</Text>
          </View>
          <Text style={styles.emergencyDescription}>
            Try this quick 2-minute breathing exercise for immediate relief
          </Text>
          <TouchableOpacity 
            style={styles.emergencyButton}
            onPress={() => Alert.alert('Emergency Relief', 'Starting 2-minute breathing exercise')}
          >
            <Play size={16} color={colors.background} />
            <Text style={styles.emergencyButtonText}>Start Now</Text>
          </TouchableOpacity>
        </Card>
        
        <View style={styles.techniquesSection}>
          <Text style={styles.sectionTitle}>Stress Relief Techniques</Text>
          <View style={styles.techniquesList}>
            {techniques.map(technique => (
              <TouchableOpacity
                key={technique.id}
                style={[
                  styles.techniqueCard,
                  selectedTechnique === technique.id && styles.selectedTechnique
                ]}
                onPress={() => setSelectedTechnique(technique.id)}
              >
                <View style={[styles.techniqueIcon, { backgroundColor: technique.color + '20' }]}>
                  <technique.icon size={24} color={technique.color} />
                </View>
                <View style={styles.techniqueContent}>
                  <Text style={styles.techniqueTitle}>{technique.title}</Text>
                  <Text style={styles.techniqueDescription}>{technique.description}</Text>
                  <View style={styles.techniqueMeta}>
                    <Text style={styles.techniqueDuration}>{technique.duration}</Text>
                    <Text style={styles.techniqueDifficulty}>{technique.difficulty}</Text>
                  </View>
                </View>
                <TouchableOpacity 
                  style={styles.playButton}
                  onPress={() => Alert.alert('Start Technique', `Starting ${technique.title}`)}
                >
                  <Play size={16} color={colors.primary} />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        <Card style={styles.factorsCard}>
          <Text style={styles.factorsTitle}>Stress Factors</Text>
          <Text style={styles.factorsSubtitle}>
            Identify what is contributing to your stress levels
          </Text>
          {stressFactors.map((factor, index) => (
            <View key={index} style={styles.factorItem}>
              <Text style={styles.factorName}>{factor.factor}</Text>
              <View style={styles.factorLevel}>
                <ProgressBar 
                  progress={factor.level * 10} 
                  fillColor={factor.color}
                  style={styles.factorProgressBar}
                />
                <Text style={styles.factorValue}>{factor.level}/10</Text>
              </View>
            </View>
          ))}
        </Card>
        
        <Card style={styles.tipsCard}>
          <Text style={styles.tipsTitle}>Quick Stress Relief Tips</Text>
          {quickTips.map((tip, index) => (
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
        
        <Card style={styles.trackingCard}>
          <Text style={styles.trackingTitle}>Stress Tracking</Text>
          <Text style={styles.trackingDescription}>
            Regular tracking helps identify patterns and triggers
          </Text>
          <View style={styles.trackingActions}>
            <TouchableOpacity 
              style={styles.trackingButton}
              onPress={() => Alert.alert('Log Stress', 'Log your current stress level')}
            >
              <Calendar size={16} color={colors.primary} />
              <Text style={styles.trackingButtonText}>Log Stress Level</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.trackingButton}
              onPress={() => Alert.alert('View History', 'View stress level history')}
            >
              <TrendingDown size={16} color={colors.success} />
              <Text style={styles.trackingButtonText}>View Trends</Text>
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
  stressLevelCard: {
    marginBottom: 16,
  },
  stressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  stressTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 8,
    flex: 1,
  },
  trendIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.success + '20',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  trendText: {
    fontSize: 12,
    color: colors.success,
    marginLeft: 4,
    fontWeight: '500',
  },
  stressLevelContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  stressLevelValue: {
    fontSize: 48,
    fontWeight: '700',
    color: colors.primary,
  },
  stressLevelLabel: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 4,
  },
  stressProgressBar: {
    marginBottom: 8,
  },
  stressAverage: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  emergencyCard: {
    marginBottom: 16,
    backgroundColor: colors.error + '10',
    borderColor: colors.error + '30',
    borderWidth: 1,
  },
  emergencyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  emergencyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.error,
    marginLeft: 8,
  },
  emergencyDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 16,
  },
  emergencyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.error,
    paddingVertical: 12,
    borderRadius: 8,
    alignSelf: 'flex-start',
    paddingHorizontal: 24,
  },
  emergencyButtonText: {
    color: colors.background,
    fontWeight: '600',
    marginLeft: 8,
  },
  techniquesSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  techniquesList: {
    gap: 12,
  },
  techniqueCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedTechnique: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + '10',
  },
  techniqueIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  techniqueContent: {
    flex: 1,
  },
  techniqueTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  techniqueDescription: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  techniqueMeta: {
    flexDirection: 'row',
    gap: 12,
  },
  techniqueDuration: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '500',
  },
  techniqueDifficulty: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  playButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
  },
  factorsCard: {
    marginBottom: 16,
  },
  factorsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  factorsSubtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 16,
  },
  factorItem: {
    marginBottom: 12,
  },
  factorName: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 8,
  },
  factorLevel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  factorProgressBar: {
    flex: 1,
    marginRight: 12,
  },
  factorValue: {
    fontSize: 12,
    color: colors.text,
    fontWeight: '500',
    width: 30,
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
  trackingCard: {
    
  },
  trackingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  trackingDescription: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 16,
  },
  trackingActions: {
    flexDirection: 'row',
    gap: 12,
  },
  trackingButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary + '20',
    paddingVertical: 12,
    borderRadius: 8,
  },
  trackingButtonText: {
    color: colors.primary,
    fontWeight: '500',
    marginLeft: 8,
    fontSize: 12,
  },
});