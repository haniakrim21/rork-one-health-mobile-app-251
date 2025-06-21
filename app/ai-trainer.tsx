import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Stack, router } from 'expo-router';
import { colors } from '@/constants/colors';
import { Card } from '@/components/Card';
import { ProgressBar } from '@/components/ProgressBar';
import { 
  Brain, 
  Zap, 
  Target, 
  TrendingUp,
  Activity,
  Calendar,
  Play,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Award,
  Camera,
  Mic,
  Eye
} from 'lucide-react-native';

export default function AITrainerScreen() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'workouts' | 'analysis'>('dashboard');
  
  const aiTrainerData = {
    adaptiveScore: 92,
    currentPhase: 'Strength Building',
    weeklyProgress: 85,
    nextWorkout: {
      name: 'Upper Body Power',
      duration: '45 min',
      difficulty: 'Intermediate',
      adaptations: ['Increased weight by 5%', 'Added explosive movements'],
    },
    recentAnalysis: {
      formScore: 88,
      improvements: [
        'Squat depth improved by 15%',
        'Push-up form consistency at 94%',
        'Deadlift hip hinge pattern optimized',
      ],
      recommendations: [
        'Focus on core stability during overhead movements',
        'Increase mobility work for hip flexors',
        'Add unilateral training for balance',
      ],
    },
    adaptiveFeatures: [
      {
        title: 'Real-time Form Correction',
        description: 'AI analyzes your movement patterns and provides instant feedback',
        icon: Eye,
        status: 'active',
      },
      {
        title: 'Voice Coaching',
        description: 'Personalized audio cues and motivation during workouts',
        icon: Mic,
        status: 'active',
      },
      {
        title: 'Adaptive Programming',
        description: 'Workouts automatically adjust based on your performance',
        icon: Brain,
        status: 'active',
      },
      {
        title: 'Recovery Optimization',
        description: 'AI monitors fatigue and adjusts training intensity',
        icon: Activity,
        status: 'active',
      },
    ],
  };
  
  const renderDashboard = () => (
    <View>
      <Card style={styles.headerCard}>
        <View style={styles.aiHeader}>
          <Brain size={32} color={colors.primary} />
          <View style={styles.aiInfo}>
            <Text style={styles.aiTitle}>AI Personal Trainer</Text>
            <Text style={styles.aiSubtitle}>
              Adaptive • Intelligent • Personalized
            </Text>
          </View>
          <View style={styles.adaptiveScore}>
            <Text style={styles.scoreValue}>{aiTrainerData.adaptiveScore}</Text>
            <Text style={styles.scoreLabel}>AI Score</Text>
          </View>
        </View>
      </Card>
      
      <Card style={styles.phaseCard}>
        <View style={styles.phaseHeader}>
          <Target size={20} color={colors.primary} />
          <Text style={styles.phaseTitle}>Current Training Phase</Text>
        </View>
        <Text style={styles.phaseName}>{aiTrainerData.currentPhase}</Text>
        <Text style={styles.phaseDescription}>
          AI has identified strength building as your optimal focus based on assessment results and progress tracking.
        </Text>
        <ProgressBar 
          progress={aiTrainerData.weeklyProgress} 
          fillColor={colors.primary}
          style={styles.phaseProgress}
        />
        <Text style={styles.progressText}>
          Week 3 of 6 • {aiTrainerData.weeklyProgress}% complete
        </Text>
      </Card>
      
      <Card style={styles.nextWorkoutCard}>
        <View style={styles.workoutHeader}>
          <Play size={20} color={colors.success} />
          <Text style={styles.workoutTitle}>Next AI Workout</Text>
          <TouchableOpacity 
            style={styles.startButton}
            onPress={() => router.push('/ai-workout-session')}
          >
            <Text style={styles.startButtonText}>Start</Text>
          </TouchableOpacity>
        </View>
        
        <Text style={styles.workoutName}>{aiTrainerData.nextWorkout.name}</Text>
        <View style={styles.workoutMeta}>
          <Text style={styles.workoutDuration}>{aiTrainerData.nextWorkout.duration}</Text>
          <Text style={styles.workoutDifficulty}>{aiTrainerData.nextWorkout.difficulty}</Text>
        </View>
        
        <Text style={styles.adaptationsTitle}>AI Adaptations:</Text>
        {aiTrainerData.nextWorkout.adaptations.map((adaptation, index) => (
          <View key={index} style={styles.adaptationItem}>
            <Zap size={12} color={colors.primary} />
            <Text style={styles.adaptationText}>{adaptation}</Text>
          </View>
        ))}
      </Card>
      
      <Card style={styles.featuresCard}>
        <Text style={styles.featuresTitle}>AI Training Features</Text>
        {aiTrainerData.adaptiveFeatures.map((feature, index) => (
          <View key={index} style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <feature.icon size={20} color={colors.primary} />
            </View>
            <View style={styles.featureInfo}>
              <Text style={styles.featureName}>{feature.title}</Text>
              <Text style={styles.featureDescription}>{feature.description}</Text>
            </View>
            <View style={styles.featureStatus}>
              <CheckCircle2 size={16} color={colors.success} />
            </View>
          </View>
        ))}
      </Card>
      
      <Card style={styles.insightsCard}>
        <View style={styles.insightsHeader}>
          <TrendingUp size={20} color={colors.primary} />
          <Text style={styles.insightsTitle}>AI Insights</Text>
        </View>
        
        <View style={styles.insightItem}>
          <CheckCircle2 size={16} color={colors.success} />
          <Text style={styles.insightText}>
            Your strength gains are 23% above predicted trajectory
          </Text>
        </View>
        
        <View style={styles.insightItem}>
          <AlertTriangle size={16} color={colors.warning} />
          <Text style={styles.insightText}>
            Recovery time has increased - consider adding rest day
          </Text>
        </View>
        
        <View style={styles.insightItem}>
          <Target size={16} color={colors.primary} />
          <Text style={styles.insightText}>
            Optimal training window: 6-8 AM based on your patterns
          </Text>
        </View>
      </Card>
    </View>
  );
  
  const renderWorkouts = () => (
    <View>
      <Card style={styles.workoutsHeader}>
        <Calendar size={24} color={colors.primary} />
        <Text style={styles.workoutsTitle}>AI-Generated Workouts</Text>
        <Text style={styles.workoutsSubtitle}>
          Personalized training plans that adapt to your progress
        </Text>
      </Card>
      
      <Card style={styles.weeklyPlan}>
        <Text style={styles.planTitle}>This Week's Plan</Text>
        
        <View style={styles.dayItem}>
          <View style={styles.dayInfo}>
            <Text style={styles.dayName}>Monday</Text>
            <Text style={styles.dayWorkout}>Upper Body Power</Text>
            <Text style={styles.dayDuration}>45 min • High Intensity</Text>
          </View>
          <TouchableOpacity style={styles.dayButton}>
            <Play size={16} color={colors.primary} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.dayItem}>
          <View style={styles.dayInfo}>
            <Text style={styles.dayName}>Tuesday</Text>
            <Text style={styles.dayWorkout}>Active Recovery</Text>
            <Text style={styles.dayDuration}>30 min • Low Intensity</Text>
          </View>
          <TouchableOpacity style={styles.dayButton}>
            <Play size={16} color={colors.primary} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.dayItem}>
          <View style={styles.dayInfo}>
            <Text style={styles.dayName}>Wednesday</Text>
            <Text style={styles.dayWorkout}>Lower Body Strength</Text>
            <Text style={styles.dayDuration}>50 min • High Intensity</Text>
          </View>
          <TouchableOpacity style={styles.dayButton}>
            <Play size={16} color={colors.primary} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.dayItem}>
          <View style={styles.dayInfo}>
            <Text style={styles.dayName}>Thursday</Text>
            <Text style={styles.dayWorkout}>Mobility & Core</Text>
            <Text style={styles.dayDuration}>35 min • Medium Intensity</Text>
          </View>
          <TouchableOpacity style={styles.dayButton}>
            <Play size={16} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </Card>
      
      <Card style={styles.adaptationCard}>
        <View style={styles.adaptationHeader}>
          <Brain size={20} color={colors.primary} />
          <Text style={styles.adaptationTitle}>Recent Adaptations</Text>
        </View>
        
        <View style={styles.adaptationLog}>
          <Text style={styles.adaptationDate}>June 18, 2024</Text>
          <Text style={styles.adaptationChange}>
            Increased squat weight by 10% based on form analysis
          </Text>
        </View>
        
        <View style={styles.adaptationLog}>
          <Text style={styles.adaptationDate}>June 16, 2024</Text>
          <Text style={styles.adaptationChange}>
            Added unilateral exercises to address strength imbalance
          </Text>
        </View>
        
        <View style={styles.adaptationLog}>
          <Text style={styles.adaptationDate}>June 14, 2024</Text>
          <Text style={styles.adaptationChange}>
            Reduced volume due to elevated stress markers
          </Text>
        </View>
      </Card>
    </View>
  );
  
  const renderAnalysis = () => (
    <View>
      <Card style={styles.analysisHeader}>
        <Eye size={24} color={colors.primary} />
        <Text style={styles.analysisTitle}>Movement Analysis</Text>
        <Text style={styles.analysisSubtitle}>
          AI-powered form correction and performance insights
        </Text>
      </Card>
      
      <Card style={styles.formScoreCard}>
        <View style={styles.formHeader}>
          <Text style={styles.formTitle}>Overall Form Score</Text>
          <View style={styles.formScore}>
            <Text style={styles.formScoreValue}>{aiTrainerData.recentAnalysis.formScore}</Text>
            <Text style={styles.formScoreMax}>/100</Text>
          </View>
        </View>
        
        <ProgressBar 
          progress={aiTrainerData.recentAnalysis.formScore} 
          fillColor={colors.success}
          style={styles.formProgress}
        />
        
        <Text style={styles.formDescription}>
          Excellent form consistency across all movement patterns
        </Text>
      </Card>
      
      <Card style={styles.improvementsCard}>
        <Text style={styles.improvementsTitle}>Recent Improvements</Text>
        {aiTrainerData.recentAnalysis.improvements.map((improvement, index) => (
          <View key={index} style={styles.improvementItem}>
            <TrendingUp size={16} color={colors.success} />
            <Text style={styles.improvementText}>{improvement}</Text>
          </View>
        ))}
      </Card>
      
      <Card style={styles.recommendationsCard}>
        <Text style={styles.recommendationsTitle}>AI Recommendations</Text>
        {aiTrainerData.recentAnalysis.recommendations.map((recommendation, index) => (
          <View key={index} style={styles.recommendationItem}>
            <Target size={16} color={colors.primary} />
            <Text style={styles.recommendationText}>{recommendation}</Text>
          </View>
        ))}
      </Card>
      
      <Card style={styles.visionCard}>
        <View style={styles.visionHeader}>
          <Camera size={20} color={colors.primary} />
          <Text style={styles.visionTitle}>Computer Vision Analysis</Text>
        </View>
        
        <Text style={styles.visionDescription}>
          Our AI analyzes your movement patterns in real-time using computer vision technology.
        </Text>
        
        <View style={styles.visionFeatures}>
          <View style={styles.visionFeature}>
            <CheckCircle2 size={16} color={colors.success} />
            <Text style={styles.visionFeatureText}>Joint angle tracking</Text>
          </View>
          <View style={styles.visionFeature}>
            <CheckCircle2 size={16} color={colors.success} />
            <Text style={styles.visionFeatureText}>Range of motion analysis</Text>
          </View>
          <View style={styles.visionFeature}>
            <CheckCircle2 size={16} color={colors.success} />
            <Text style={styles.visionFeatureText}>Movement symmetry detection</Text>
          </View>
          <View style={styles.visionFeature}>
            <CheckCircle2 size={16} color={colors.success} />
            <Text style={styles.visionFeatureText}>Real-time form correction</Text>
          </View>
        </View>
        
        <TouchableOpacity 
          style={styles.calibrateButton}
          onPress={() => Alert.alert('Calibrate Camera', 'Set up camera for movement analysis')}
        >
          <Camera size={16} color={colors.black} />
          <Text style={styles.calibrateButtonText}>Calibrate Camera</Text>
        </TouchableOpacity>
      </Card>
    </View>
  );
  
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'AI Trainer' }} />
      
      <View style={styles.tabsContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'dashboard' && styles.activeTab]}
          onPress={() => setActiveTab('dashboard')}
        >
          <Brain size={18} color={activeTab === 'dashboard' ? colors.primary : colors.textSecondary} />
          <Text style={[styles.tabText, activeTab === 'dashboard' && styles.activeTabText]}>
            Dashboard
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'workouts' && styles.activeTab]}
          onPress={() => setActiveTab('workouts')}
        >
          <Calendar size={18} color={activeTab === 'workouts' ? colors.primary : colors.textSecondary} />
          <Text style={[styles.tabText, activeTab === 'workouts' && styles.activeTabText]}>
            Workouts
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'analysis' && styles.activeTab]}
          onPress={() => setActiveTab('analysis')}
        >
          <Eye size={18} color={activeTab === 'analysis' ? colors.primary : colors.textSecondary} />
          <Text style={[styles.tabText, activeTab === 'analysis' && styles.activeTabText]}>
            Analysis
          </Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'workouts' && renderWorkouts()}
        {activeTab === 'analysis' && renderAnalysis()}
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
  aiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  aiInfo: {
    marginLeft: 12,
    flex: 1,
  },
  aiTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  aiSubtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  adaptiveScore: {
    alignItems: 'center',
  },
  scoreValue: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary,
  },
  scoreLabel: {
    fontSize: 10,
    color: colors.textSecondary,
  },
  phaseCard: {
    marginBottom: 16,
  },
  phaseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  phaseTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 8,
  },
  phaseName: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 8,
  },
  phaseDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 16,
    lineHeight: 18,
  },
  phaseProgress: {
    marginBottom: 8,
  },
  progressText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  nextWorkoutCard: {
    marginBottom: 16,
  },
  workoutHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  workoutTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 8,
    flex: 1,
  },
  startButton: {
    backgroundColor: colors.success,
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 16,
  },
  startButtonText: {
    color: colors.black,
    fontWeight: '600',
    fontSize: 12,
  },
  workoutName: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  workoutMeta: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  workoutDuration: {
    fontSize: 14,
    color: colors.textSecondary,
    marginRight: 16,
  },
  workoutDifficulty: {
    fontSize: 14,
    color: colors.primary,
  },
  adaptationsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  adaptationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  adaptationText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginLeft: 8,
  },
  featuresCard: {
    marginBottom: 16,
  },
  featuresTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  featureInfo: {
    flex: 1,
  },
  featureName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  featureDescription: {
    fontSize: 12,
    color: colors.textSecondary,
    lineHeight: 16,
  },
  featureStatus: {
    marginLeft: 8,
  },
  insightsCard: {
    marginBottom: 16,
  },
  insightsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  insightsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 8,
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
  workoutsHeader: {
    alignItems: 'center',
    marginBottom: 16,
  },
  workoutsTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginTop: 8,
  },
  workoutsSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 4,
  },
  weeklyPlan: {
    marginBottom: 16,
  },
  planTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  dayItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  dayInfo: {
    flex: 1,
  },
  dayName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  dayWorkout: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
    marginTop: 2,
  },
  dayDuration: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  dayButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
  },
  adaptationCard: {
    marginBottom: 16,
  },
  adaptationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  adaptationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 8,
  },
  adaptationLog: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  adaptationDate: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  adaptationChange: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 18,
  },
  analysisHeader: {
    alignItems: 'center',
    marginBottom: 16,
  },
  analysisTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginTop: 8,
  },
  analysisSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 4,
  },
  formScoreCard: {
    marginBottom: 16,
  },
  formHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  formTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  formScore: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  formScoreValue: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.success,
  },
  formScoreMax: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  formProgress: {
    marginBottom: 8,
  },
  formDescription: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  improvementsCard: {
    marginBottom: 16,
  },
  improvementsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  improvementItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  improvementText: {
    fontSize: 14,
    color: colors.text,
    marginLeft: 8,
    flex: 1,
    lineHeight: 18,
  },
  recommendationsCard: {
    marginBottom: 16,
  },
  recommendationsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  recommendationText: {
    fontSize: 14,
    color: colors.text,
    marginLeft: 8,
    flex: 1,
    lineHeight: 18,
  },
  visionCard: {
    
  },
  visionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  visionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 8,
  },
  visionDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 16,
    lineHeight: 18,
  },
  visionFeatures: {
    marginBottom: 16,
  },
  visionFeature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  visionFeatureText: {
    fontSize: 14,
    color: colors.text,
    marginLeft: 8,
  },
  calibrateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 8,
  },
  calibrateButtonText: {
    color: colors.black,
    fontWeight: '600',
    marginLeft: 8,
  },
});