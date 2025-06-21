import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Stack, router } from 'expo-router';
import { colors } from '@/constants/colors';
import { Card } from '@/components/Card';
import { WellnessPathCard } from '@/components/WellnessPathCard';
import { ProgressBar } from '@/components/ProgressBar';
import { useWellnessStore } from '@/store/wellness-store';
import { WellnessPath } from '@/types/wellness';
import { 
  Target, 
  Heart, 
  Brain, 
  Leaf,
  Moon,
  Zap,
  Shield,
  Clock,
  CheckCircle2,
  Play
} from 'lucide-react-native';

export default function WellnessPathsScreen() {
  const { wellnessPaths = [], startWellnessPath } = useWellnessStore();
  const [activeFilter, setActiveFilter] = useState<'all' | 'active' | 'completed'>('all');
  
  const pathCategories = [
    { id: 'stress', name: 'Stress Management', icon: Heart, color: colors.success },
    { id: 'sleep', name: 'Better Sleep', icon: Moon, color: colors.info },
    { id: 'mindfulness', name: 'Mindfulness', icon: Brain, color: colors.primary },
    { id: 'energy', name: 'Energy Boost', icon: Zap, color: colors.warning },
    { id: 'resilience', name: 'Resilience', icon: Shield, color: colors.error },
    { id: 'habits', name: 'Healthy Habits', icon: Target, color: colors.wellness },
  ];
  
  const featuredPaths: WellnessPath[] = [
    {
      id: 'stress-relief',
      title: '21-Day Stress Relief Journey',
      description: 'Learn evidence-based techniques to manage stress and build resilience',
      category: 'stress',
      duration: '21 days',
      difficulty: 'Beginner',
      participants: 1247,
      rating: 4.8,
      modules: [
        {
          id: '1',
          title: 'Understanding Stress',
          description: 'Learn about stress and its impact',
          duration: 15,
          completed: false,
          content: 'Understanding stress content',
        },
        {
          id: '2',
          title: 'Breathing Techniques',
          description: 'Master calming breathing exercises',
          duration: 20,
          completed: false,
          content: 'Breathing techniques content',
        },
      ],
      progress: 0,
      isActive: false,
      completedAt: undefined,
    },
    {
      id: 'sleep-optimization',
      title: 'Sleep Optimization Program',
      description: 'Improve your sleep quality with science-backed strategies',
      category: 'sleep',
      duration: '14 days',
      difficulty: 'Intermediate',
      participants: 892,
      rating: 4.9,
      modules: [
        {
          id: '1',
          title: 'Sleep Hygiene Basics',
          description: 'Foundation of good sleep',
          duration: 10,
          completed: false,
          content: 'Sleep hygiene content',
        },
      ],
      progress: 0,
      isActive: false,
      completedAt: undefined,
    },
    {
      id: 'mindfulness-mastery',
      title: 'Mindfulness Mastery',
      description: 'Develop a consistent mindfulness practice for mental clarity',
      category: 'mindfulness',
      duration: '30 days',
      difficulty: 'Advanced',
      participants: 654,
      rating: 4.7,
      modules: [
        {
          id: '1',
          title: 'Mindfulness Foundations',
          description: 'Introduction to mindfulness',
          duration: 25,
          completed: false,
          content: 'Mindfulness foundations content',
        },
      ],
      progress: 0,
      isActive: false,
      completedAt: undefined,
    },
  ];
  
  const activePaths = wellnessPaths.filter(path => path.isActive);
  const completedPaths = wellnessPaths.filter(path => path.completedAt);
  
  const filteredPaths = activeFilter === 'active' ? activePaths : 
                       activeFilter === 'completed' ? completedPaths : 
                       [...wellnessPaths, ...featuredPaths];
  
  const handleStartPath = (pathId: string) => {
    const path = featuredPaths.find(p => p.id === pathId);
    if (path) {
      startWellnessPath(pathId);
      Alert.alert('Path Started', `You have started the ${path.title} journey!`);
    }
  };
  
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Wellness Paths' }} />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Wellness Paths</Text>
        <Text style={styles.headerSubtitle}>
          Guided journeys to transform your wellbeing
        </Text>
      </View>
      
      <View style={styles.filtersContainer}>
        {(['all', 'active', 'completed'] as const).map(filter => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterChip,
              activeFilter === filter && styles.activeFilterChip
            ]}
            onPress={() => setActiveFilter(filter)}
          >
            <Text style={[
              styles.filterText,
              activeFilter === filter && styles.activeFilterText
            ]}>
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {activeFilter === 'all' && (
          <View style={styles.categoriesSection}>
            <Text style={styles.sectionTitle}>Browse by Category</Text>
            <View style={styles.categoriesGrid}>
              {pathCategories.map(category => (
                <TouchableOpacity 
                  key={category.id} 
                  style={styles.categoryCard}
                  onPress={() => Alert.alert('Category', `Browse ${category.name} paths`)}
                >
                  <View style={[styles.categoryIcon, { backgroundColor: category.color + '20' }]}>
                    <category.icon size={20} color={category.color} />
                  </View>
                  <Text style={styles.categoryName}>{category.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
        
        {activeFilter === 'active' && activePaths.length > 0 && (
          <Card style={styles.progressCard}>
            <Text style={styles.progressTitle}>Your Progress</Text>
            <Text style={styles.progressSubtitle}>
              {activePaths.length} active path{activePaths.length !== 1 ? 's' : ''}
            </Text>
            <View style={styles.progressStats}>
              <View style={styles.progressStat}>
                <Text style={styles.progressValue}>65%</Text>
                <Text style={styles.progressLabel}>Avg Progress</Text>
              </View>
              <View style={styles.progressStat}>
                <Text style={styles.progressValue}>12</Text>
                <Text style={styles.progressLabel}>Days Active</Text>
              </View>
              <View style={styles.progressStat}>
                <Text style={styles.progressValue}>8</Text>
                <Text style={styles.progressLabel}>Modules Done</Text>
              </View>
            </View>
          </Card>
        )}
        
        <View style={styles.pathsSection}>
          <Text style={styles.sectionTitle}>
            {activeFilter === 'active' ? 'Active Paths' : 
             activeFilter === 'completed' ? 'Completed Paths' : 'Featured Paths'}
          </Text>
          
          {filteredPaths.length > 0 ? (
            <View style={styles.pathsList}>
              {filteredPaths.map(path => {
                return (
                  <View key={path.id} style={styles.pathContainer}>
                    <WellnessPathCard
                      path={path}
                      onPress={() => router.push(`/wellness-paths/${path.id}`)}
                    />
                    {!path.isActive && !path.completedAt && (
                      <TouchableOpacity 
                        style={styles.startButton}
                        onPress={() => handleStartPath(path.id)}
                      >
                        <Play size={16} color={colors.black} />
                        <Text style={styles.startButtonText}>Start Journey</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                );
              })}
            </View>
          ) : (
            <Card style={styles.emptyCard}>
              <Target size={48} color={colors.textSecondary} />
              <Text style={styles.emptyText}>
                {activeFilter === 'active' ? 'No active wellness paths' :
                 activeFilter === 'completed' ? 'No completed paths yet' : 'No paths available'}
              </Text>
              {activeFilter !== 'all' && (
                <TouchableOpacity 
                  style={styles.browseButton}
                  onPress={() => setActiveFilter('all')}
                >
                  <Text style={styles.browseButtonText}>Browse All Paths</Text>
                </TouchableOpacity>
              )}
            </Card>
          )}
        </View>
        
        <Card style={styles.benefitsCard}>
          <Text style={styles.benefitsTitle}>Why Follow Wellness Paths?</Text>
          <View style={styles.benefitItem}>
            <CheckCircle2 size={16} color={colors.success} />
            <Text style={styles.benefitText}>Structured approach to wellness goals</Text>
          </View>
          <View style={styles.benefitItem}>
            <CheckCircle2 size={16} color={colors.success} />
            <Text style={styles.benefitText}>Evidence-based techniques and strategies</Text>
          </View>
          <View style={styles.benefitItem}>
            <CheckCircle2 size={16} color={colors.success} />
            <Text style={styles.benefitText}>Progressive learning with daily modules</Text>
          </View>
          <View style={styles.benefitItem}>
            <CheckCircle2 size={16} color={colors.success} />
            <Text style={styles.benefitText}>Community support and accountability</Text>
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
  filtersContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 8,
  },
  filterChip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: colors.cardBackground,
  },
  activeFilterChip: {
    backgroundColor: colors.primary,
  },
  filterText: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  activeFilterText: {
    color: colors.black,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  categoriesSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  categoryCard: {
    width: '48%',
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
  },
  progressCard: {
    marginBottom: 24,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  progressSubtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 16,
  },
  progressStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  progressStat: {
    alignItems: 'center',
  },
  progressValue: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.primary,
  },
  progressLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
  },
  pathsSection: {
    marginBottom: 24,
  },
  pathsList: {
    gap: 16,
  },
  pathContainer: {
    
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 12,
  },
  startButtonText: {
    color: colors.black,
    fontWeight: '600',
    marginLeft: 8,
  },
  emptyCard: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyText: {
    fontSize: 16,
    color: colors.textSecondary,
    marginVertical: 16,
    textAlign: 'center',
  },
  browseButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  browseButtonText: {
    fontSize: 16,
    color: colors.black,
    fontWeight: '600',
  },
  benefitsCard: {
    
  },
  benefitsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  benefitText: {
    fontSize: 14,
    color: colors.text,
    marginLeft: 8,
    flex: 1,
    lineHeight: 18,
  },
});