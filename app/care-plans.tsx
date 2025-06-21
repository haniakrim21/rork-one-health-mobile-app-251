import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Stack } from 'expo-router';
import { colors } from '@/constants/colors';
import { Card } from '@/components/Card';
import { ProgressBar } from '@/components/ProgressBar';
import { 
  FileText, 
  Calendar, 
  Clock, 
  User, 
  CheckCircle2, 
  Target,
  Pill,
  Activity,
  Stethoscope,
  Plus,
  Brain
} from 'lucide-react-native';

export default function CarePlansScreen() {
  const [activeTab, setActiveTab] = useState<'current' | 'completed'>('current');
  
  const currentCarePlans = [
    {
      id: '1',
      condition: 'Hypertension Management',
      progress: 75,
      startDate: '2025-06-01',
      nextReview: '2025-09-01',
      provider: 'Dr. Sarah Johnson',
      goals: [
        'Reduce blood pressure to below 130/80 mmHg',
        'Maintain healthy weight',
        'Improve cardiovascular fitness',
      ],
      interventions: [
        { type: 'medication', description: 'Take Lisinopril 10mg daily', completed: true },
        { type: 'monitoring', description: 'Check blood pressure twice daily', completed: true },
        { type: 'lifestyle', description: 'Follow DASH diet plan', completed: false },
        { type: 'lifestyle', description: 'Exercise 30 minutes, 5 days/week', completed: false },
      ],
    },
    {
      id: '2',
      condition: 'Diabetes Type 2 Management',
      progress: 60,
      startDate: '2025-05-15',
      nextReview: '2025-08-15',
      provider: 'Dr. Michael Chen',
      goals: [
        'Maintain HbA1c below 7%',
        'Achieve target weight loss of 10 pounds',
        'Prevent diabetic complications',
      ],
      interventions: [
        { type: 'medication', description: 'Take Metformin 500mg twice daily', completed: true },
        { type: 'monitoring', description: 'Check blood glucose 4x daily', completed: true },
        { type: 'lifestyle', description: 'Follow diabetic meal plan', completed: false },
        { type: 'appointment', description: 'Quarterly HbA1c testing', completed: false },
      ],
    },
  ];
  
  const completedCarePlans = [
    {
      id: '3',
      condition: 'Post-Surgery Recovery',
      progress: 100,
      startDate: '2025-03-01',
      completedDate: '2025-05-30',
      provider: 'Dr. Emily Rodriguez',
      outcome: 'Full recovery achieved ahead of schedule',
    },
  ];
  
  const getInterventionIcon = (type: string) => {
    switch (type) {
      case 'medication': return Pill;
      case 'monitoring': return Activity;
      case 'lifestyle': return Target;
      case 'appointment': return Calendar;
      default: return CheckCircle2;
    }
  };
  
  const renderCurrentPlans = () => (
    <>
      {currentCarePlans.map(plan => (
        <Card key={plan.id} style={styles.planCard}>
          <View style={styles.planHeader}>
            <View style={styles.planTitleContainer}>
              <Text style={styles.planTitle}>{plan.condition}</Text>
              <Text style={styles.planProvider}>by {plan.provider}</Text>
            </View>
            <TouchableOpacity 
              style={styles.editButton}
              onPress={() => Alert.alert('Edit Plan', `Edit care plan for ${plan.condition}`)}
            >
              <FileText size={20} color={colors.primary} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.progressContainer}>
            <Text style={styles.progressLabel}>Overall Progress</Text>
            <ProgressBar 
              progress={plan.progress} 
              fillColor={colors.primary}
              showPercentage
              style={styles.progressBar}
            />
          </View>
          
          <View style={styles.planDates}>
            <View style={styles.dateItem}>
              <Calendar size={16} color={colors.textSecondary} />
              <Text style={styles.dateText}>Started: {new Date(plan.startDate).toLocaleDateString()}</Text>
            </View>
            <View style={styles.dateItem}>
              <Clock size={16} color={colors.primary} />
              <Text style={styles.dateText}>Next Review: {new Date(plan.nextReview).toLocaleDateString()}</Text>
            </View>
          </View>
          
          <Text style={styles.goalsTitle}>Goals</Text>
          {plan.goals.map((goal, index) => (
            <View key={index} style={styles.goalItem}>
              <Target size={16} color={colors.success} />
              <Text style={styles.goalText}>{goal}</Text>
            </View>
          ))}
          
          <Text style={styles.interventionsTitle}>Current Interventions</Text>
          {plan.interventions.map((intervention, index) => {
            const IconComponent = getInterventionIcon(intervention.type);
            return (
              <View key={index} style={styles.interventionItem}>
                <IconComponent 
                  size={16} 
                  color={intervention.completed ? colors.success : colors.textSecondary} 
                />
                <Text style={[
                  styles.interventionText,
                  intervention.completed && styles.completedIntervention
                ]}>
                  {intervention.description}
                </Text>
                {intervention.completed && (
                  <CheckCircle2 size={16} color={colors.success} />
                )}
              </View>
            );
          })}
          
          <TouchableOpacity 
            style={styles.viewDetailsButton}
            onPress={() => Alert.alert('Care Plan Details', `View full details for ${plan.condition}`)}
          >
            <Text style={styles.viewDetailsText}>View Full Plan</Text>
          </TouchableOpacity>
        </Card>
      ))}
      
      <TouchableOpacity 
        style={styles.createPlanButton}
        onPress={() => Alert.alert('Create Care Plan', 'AI-powered care plan generation')}
      >
        <Plus size={20} color={colors.black} />
        <Text style={styles.createPlanText}>Create New Care Plan</Text>
      </TouchableOpacity>
    </>
  );
  
  const renderCompletedPlans = () => (
    <>
      {completedCarePlans.map(plan => (
        <Card key={plan.id} style={styles.completedPlanCard}>
          <View style={styles.planHeader}>
            <View style={styles.planTitleContainer}>
              <Text style={styles.planTitle}>{plan.condition}</Text>
              <Text style={styles.planProvider}>by {plan.provider}</Text>
            </View>
            <CheckCircle2 size={24} color={colors.success} />
          </View>
          
          <View style={styles.completedProgressContainer}>
            <ProgressBar 
              progress={100} 
              fillColor={colors.success}
              showPercentage
              style={styles.progressBar}
            />
          </View>
          
          <View style={styles.planDates}>
            <View style={styles.dateItem}>
              <Calendar size={16} color={colors.textSecondary} />
              <Text style={styles.dateText}>
                {new Date(plan.startDate).toLocaleDateString()} - {new Date(plan.completedDate).toLocaleDateString()}
              </Text>
            </View>
          </View>
          
          <Text style={styles.outcomeTitle}>Outcome</Text>
          <Text style={styles.outcomeText}>{plan.outcome}</Text>
          
          <TouchableOpacity 
            style={styles.viewDetailsButton}
            onPress={() => Alert.alert('Completed Plan', `View details for completed ${plan.condition} plan`)}
          >
            <Text style={styles.viewDetailsText}>View Summary</Text>
          </TouchableOpacity>
        </Card>
      ))}
    </>
  );
  
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Care Plans' }} />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Personalized Care Plans</Text>
        <Text style={styles.headerSubtitle}>
          AI-generated, evidence-based care plans tailored to your health needs
        </Text>
      </View>
      
      <View style={styles.tabsContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'current' && styles.activeTab]}
          onPress={() => setActiveTab('current')}
        >
          <FileText 
            size={20} 
            color={activeTab === 'current' ? colors.primary : colors.textSecondary} 
          />
          <Text style={[
            styles.tabText,
            activeTab === 'current' && styles.activeTabText
          ]}>
            Current Plans
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'completed' && styles.activeTab]}
          onPress={() => setActiveTab('completed')}
        >
          <CheckCircle2 
            size={20} 
            color={activeTab === 'completed' ? colors.primary : colors.textSecondary} 
          />
          <Text style={[
            styles.tabText,
            activeTab === 'completed' && styles.activeTabText
          ]}>
            Completed
          </Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {activeTab === 'current' && renderCurrentPlans()}
        {activeTab === 'completed' && renderCompletedPlans()}
        
        <Card style={styles.aiAssistantCard}>
          <View style={styles.aiHeader}>
            <Brain size={24} color={colors.primary} />
            <Text style={styles.aiTitle}>AI Care Plan Assistant</Text>
          </View>
          <Text style={styles.aiDescription}>
            Get personalized care plan recommendations based on your health data, medical history, and latest clinical guidelines.
          </Text>
          <TouchableOpacity 
            style={styles.aiButton}
            onPress={() => Alert.alert('AI Assistant', 'Generate AI-powered care plan recommendations')}
          >
            <Text style={styles.aiButtonText}>Get AI Recommendations</Text>
          </TouchableOpacity>
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
    lineHeight: 20,
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
  planCard: {
    marginBottom: 16,
  },
  completedPlanCard: {
    marginBottom: 16,
    backgroundColor: colors.success + '05',
    borderColor: colors.success + '20',
    borderWidth: 1,
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  planTitleContainer: {
    flex: 1,
  },
  planTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  planProvider: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  editButton: {
    padding: 4,
  },
  progressContainer: {
    marginBottom: 16,
  },
  completedProgressContainer: {
    marginBottom: 16,
  },
  progressLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 8,
  },
  progressBar: {
    marginBottom: 4,
  },
  planDates: {
    marginBottom: 16,
  },
  dateItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  dateText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginLeft: 8,
  },
  goalsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  goalItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  goalText: {
    fontSize: 14,
    color: colors.text,
    marginLeft: 8,
    flex: 1,
    lineHeight: 18,
  },
  interventionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
    marginTop: 16,
  },
  interventionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    paddingVertical: 4,
  },
  interventionText: {
    fontSize: 14,
    color: colors.text,
    marginLeft: 8,
    flex: 1,
  },
  completedIntervention: {
    textDecorationLine: 'line-through',
    color: colors.textSecondary,
  },
  viewDetailsButton: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primary + '20',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 16,
  },
  viewDetailsText: {
    color: colors.primary,
    fontWeight: '500',
    fontSize: 14,
  },
  createPlanButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  createPlanText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.black,
    marginLeft: 8,
  },
  outcomeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  outcomeText: {
    fontSize: 14,
    color: colors.success,
    lineHeight: 18,
  },
  aiAssistantCard: {
    backgroundColor: colors.primary + '05',
    borderColor: colors.primary + '20',
    borderWidth: 1,
  },
  aiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  aiTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 8,
  },
  aiDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 16,
    lineHeight: 20,
  },
  aiButton: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  aiButtonText: {
    color: colors.black,
    fontWeight: '600',
    fontSize: 14,
  },
});