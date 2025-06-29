import React, { useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, I18nManager, TextInput } from 'react-native';
import { router } from 'expo-router';
import { colors } from '@/constants/colors';
import { useUserStore } from '@/store/user-store';
import { useHealthStore } from '@/store/health-store';
import { useFitnessStore } from '@/store/fitness-store';
import { useWellnessStore } from '@/store/wellness-store';
import { useSettingsStore } from '@/store/settings-store';
import { getTranslation, isRTL } from '@/constants/languages';
import type { PersonalizedGoal } from '@/types';
import { WorkoutCard } from '@/components/WorkoutCard';
import { Search, Filter, Activity, Heart, Brain, Apple, User, Bell } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeScreen() {
  const { user } = useUserStore();
  const { healthMetrics = [] } = useHealthStore();
  const { workouts = [] } = useFitnessStore();
  const { moodEntries = [] } = useWellnessStore();
  const { settings } = useSettingsStore();
  
  const t = useCallback((key: string) => getTranslation(settings.language, key), [settings.language]);
  const isRTLLayout = useMemo(() => isRTL(settings.language), [settings.language]);
  
  React.useEffect(() => {
    I18nManager.allowRTL(true);
    I18nManager.forceRTL(isRTLLayout);
  }, [isRTLLayout]);
  
  const todaysGoals = useMemo(() => 
    (user?.goals || [])
      .filter((goal: PersonalizedGoal) => !goal.completed)
      .slice(0, 3),
    [user?.goals]
  );

  const upcomingWorkouts = useMemo(() => 
    workouts.filter(w => !w.completed).slice(0, 2),
    [workouts]
  );

  const categories = [
    { id: 'all', name: 'All', icon: Activity },
    { id: 'health', name: 'Health', icon: Heart },
    { id: 'wellness', name: 'Wellness', icon: Brain },
    { id: 'fitness', name: 'Fitness', icon: Activity },
    { id: 'nutrition', name: 'Nutrition', icon: Apple },
  ];

  const healthPrograms = [
    {
      id: '1',
      title: 'Heart Health Program',
      instructor: 'Dr. Sarah Johnson',
      category: 'health',
      duration: '8 weeks',
      sessions: 16,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400',
      color: colors.primary,
    },
    {
      id: '2',
      title: 'Mindfulness & Stress Relief',
      instructor: 'Dr. Michael Chen',
      category: 'wellness',
      duration: '6 weeks',
      sessions: 12,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      color: colors.wellness,
    },
    {
      id: '3',
      title: 'Strength Training Basics',
      instructor: 'Coach Emma Wilson',
      category: 'fitness',
      duration: '4 weeks',
      sessions: 8,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400',
      color: colors.fitness,
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.greeting}>Good day!</Text>
            <Text style={styles.userName}>{user?.name || 'User'}</Text>
          </View>
          <TouchableOpacity style={styles.profileButton} onPress={() => router.push('/profile')}>
            <User size={24} color={colors.text} />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Search size={20} color={colors.textSecondary} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search programs..."
              placeholderTextColor={colors.textSecondary}
            />
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color={colors.text} />
          </TouchableOpacity>
        </View>

        {/* Categories */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
          {categories.map((category, index) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryChip,
                index === 0 && styles.categoryChipActive
              ]}
            >
              <Text style={[
                styles.categoryText,
                index === 0 && styles.categoryTextActive
              ]}>
                {category.name}
              </Text>
              {index === 1 && <View style={styles.categoryBadge}><Text style={styles.categoryBadgeText}>12</Text></View>}
              {index === 2 && <View style={styles.categoryBadge}><Text style={styles.categoryBadgeText}>8</Text></View>}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Featured Programs */}
        {healthPrograms.map((program) => (
          <TouchableOpacity
            key={program.id}
            style={styles.programCard}
            onPress={() => router.push(`/program-details/${program.id}`)}
          >
            <LinearGradient
              colors={[program.color, `${program.color}CC`]}
              style={styles.programGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.programContent}>
                <View style={styles.programInfo}>
                  <Text style={styles.programTitle}>{program.title}</Text>
                  <Text style={styles.programInstructor}>By {program.instructor}</Text>
                  <View style={styles.programMeta}>
                    <View style={styles.programMetaItem}>
                      <Activity size={14} color={colors.black} />
                      <Text style={styles.programMetaText}>{program.sessions} sessions</Text>
                    </View>
                    <View style={styles.programMetaItem}>
                      <Text style={styles.programDuration}>{program.duration}</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.programImageContainer}>
                  <View style={styles.programImage}>
                    <View style={styles.playButton}>
                      <Activity size={24} color={colors.black} />
                    </View>
                  </View>
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        ))}

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            <TouchableOpacity style={styles.quickActionCard} onPress={() => router.push('/health')}>
              <View style={[styles.quickActionIcon, { backgroundColor: `${colors.health}20` }]}>
                <Heart size={24} color={colors.health} />
              </View>
              <Text style={styles.quickActionText}>Health Check</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionCard} onPress={() => router.push('/fitness')}>
              <View style={[styles.quickActionIcon, { backgroundColor: `${colors.fitness}20` }]}>
                <Activity size={24} color={colors.fitness} />
              </View>
              <Text style={styles.quickActionText}>Start Workout</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionCard} onPress={() => router.push('/wellness')}>
              <View style={[styles.quickActionIcon, { backgroundColor: `${colors.wellness}20` }]}>
                <Brain size={24} color={colors.wellness} />
              </View>
              <Text style={styles.quickActionText}>Mood Check</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionCard} onPress={() => router.push('/ai-chat')}>
              <View style={[styles.quickActionIcon, { backgroundColor: `${colors.primary}20` }]}>
                <Bell size={24} color={colors.primary} />
              </View>
              <Text style={styles.quickActionText}>AI Assistant</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Today's Goals */}
        {todaysGoals.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Today's Goals</Text>
            {todaysGoals.map((goal, index) => (
              <View key={index} style={styles.goalCard}>
                <View style={styles.goalProgress}>
                  <View style={[styles.goalProgressBar, { width: `${goal.progress || 0}%` }]} />
                </View>
                <Text style={styles.goalTitle}>{goal.name}</Text>
                <Text style={styles.goalProgress}>{goal.progress || 0}% complete</Text>
              </View>
            ))}
          </View>
        )}
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
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  greeting: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  userName: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
  },
  profileButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.cardBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 24,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: colors.cardBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoriesContainer: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.cardBackground,
    marginRight: 12,
    gap: 8,
  },
  categoryChipActive: {
    backgroundColor: colors.primary,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  categoryTextActive: {
    color: colors.black,
  },
  categoryBadge: {
    backgroundColor: colors.textSecondary,
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    minWidth: 20,
    alignItems: 'center',
  },
  categoryBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  programCard: {
    marginBottom: 20,
    borderRadius: 20,
    overflow: 'hidden',
  },
  programGradient: {
    padding: 20,
  },
  programContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  programInfo: {
    flex: 1,
  },
  programTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.black,
    marginBottom: 4,
  },
  programInstructor: {
    fontSize: 14,
    color: colors.black,
    opacity: 0.8,
    marginBottom: 12,
  },
  programMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  programMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  programMetaText: {
    fontSize: 12,
    color: colors.black,
    fontWeight: '600',
  },
  programDuration: {
    fontSize: 12,
    color: colors.black,
    fontWeight: '600',
  },
  programImageContainer: {
    marginLeft: 16,
  },
  programImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickActions: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickActionCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
  },
  goalCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  goalProgress: {
    height: 4,
    backgroundColor: colors.border,
    borderRadius: 2,
    marginBottom: 12,
    overflow: 'hidden',
  },
  goalProgressBar: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
  goalTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
});