import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Stack, router } from 'expo-router';
import { colors } from '@/constants/colors';
import { Card } from '@/components/Card';
import { WorkoutCard } from '@/components/WorkoutCard';
import { useFitnessStore } from '@/store/fitness-store';
import { 
  Calendar, 
  Plus, 
  Filter, 
  Search,
  Clock,
  Target,
  Zap,
  Activity
} from 'lucide-react-native';

export default function WorkoutsScreen() {
  const { workouts = [] } = useFitnessStore();
  const [activeFilter, setActiveFilter] = useState<'all' | 'scheduled' | 'completed'>('all');
  
  const filteredWorkouts = workouts.filter(workout => {
    if (activeFilter === 'scheduled') {
      return !workout.completed && workout.scheduledFor && new Date(workout.scheduledFor) >= new Date();
    }
    if (activeFilter === 'completed') {
      return workout.completed;
    }
    return true;
  });
  
  const workoutCategories = [
    { id: 'strength', name: 'Strength', icon: Target, color: colors.primary },
    { id: 'cardio', name: 'Cardio', icon: Zap, color: colors.warning },
    { id: 'flexibility', name: 'Flexibility', icon: Activity, color: colors.success },
    { id: 'hiit', name: 'HIIT', icon: Clock, color: colors.error },
  ];
  
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Workouts' }} />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Workouts</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.searchButton}>
            <Search size={20} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => Alert.alert('Create Workout', 'Create a new workout plan')}
          >
            <Plus size={20} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.filtersContainer}>
        {(['all', 'scheduled', 'completed'] as const).map(filter => (
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
        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Workout Categories</Text>
          <View style={styles.categoriesGrid}>
            {workoutCategories.map(category => (
              <TouchableOpacity 
                key={category.id} 
                style={styles.categoryCard}
                onPress={() => Alert.alert('Category', `Browse ${category.name} workouts`)}
              >
                <View style={[styles.categoryIcon, { backgroundColor: category.color + '20' }]}>
                  <category.icon size={24} color={category.color} />
                </View>
                <Text style={styles.categoryName}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        <View style={styles.workoutsSection}>
          <Text style={styles.sectionTitle}>
            {activeFilter === 'all' ? 'All Workouts' : 
             activeFilter === 'scheduled' ? 'Scheduled Workouts' : 'Completed Workouts'}
          </Text>
          
          {filteredWorkouts.length > 0 ? (
            <View style={styles.workoutsList}>
              {filteredWorkouts.map(workout => {
                const transformedWorkout = {
                  ...workout,
                  exercises: workout.exercises.map(exercise => ({
                    ...exercise,
                    reps: typeof exercise.reps === 'string' ? parseInt(exercise.reps) || undefined : exercise.reps,
                  })),
                };
                
                return (
                  <WorkoutCard
                    key={workout.id}
                    workout={transformedWorkout}
                    onPress={() => router.push(`/workout-details/${workout.id}`)}
                    onStart={() => router.push(`/fitness-session/${workout.id}`)}
                  />
                );
              })}
            </View>
          ) : (
            <Card style={styles.emptyCard}>
              <Activity size={48} color={colors.textSecondary} />
              <Text style={styles.emptyText}>
                {activeFilter === 'scheduled' ? 'No scheduled workouts' :
                 activeFilter === 'completed' ? 'No completed workouts' : 'No workouts found'}
              </Text>
              <TouchableOpacity 
                style={styles.createButton}
                onPress={() => Alert.alert('Create Workout', 'Create your first workout')}
              >
                <Text style={styles.createButtonText}>Create Workout</Text>
              </TouchableOpacity>
            </Card>
          )}
        </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingTop: 60,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  searchButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.cardBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.cardBackground,
    justifyContent: 'center',
    alignItems: 'center',
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
    padding: 20,
    alignItems: 'center',
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  workoutsSection: {
    
  },
  workoutsList: {
    gap: 12,
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
  createButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  createButtonText: {
    fontSize: 16,
    color: colors.black,
    fontWeight: '600',
  },
});