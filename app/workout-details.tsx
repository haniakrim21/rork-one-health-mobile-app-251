import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { colors } from '@/constants/colors';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Clock, Flame, Dumbbell, Play, ChevronDown, ChevronUp } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { trpc } from '@/lib/trpc';

export default function WorkoutDetailsScreen() {
  const [expandedExercise, setExpandedExercise] = useState<string | null>(null);
  const { id } = useLocalSearchParams<{ id: string }>();
  
  // Use a default ID if none is provided
  const workoutId = id || '3'; // Default to Upper Body Strength
  
  // Fetch workout data from backend
  const { data: workout, isLoading, error } = trpc.fitness.workouts.getById.useQuery({ id: workoutId });
  
  const toggleExercise = (id: string) => {
    if (expandedExercise === id) {
      setExpandedExercise(null);
    } else {
      setExpandedExercise(id);
    }
  };
  
  // Default workout data to show while loading
  const defaultWorkout = {
    id: '3',
    title: 'Upper Body Strength',
    subtitle: 'Intensify Your Fitness',
    duration: '30 min',
    level: 'Intermediate',
    calories: '250',
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGd5bXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
    description: 'This workout focuses on building upper body strength with a combination of push and pull exercises. Perfect for intermediate fitness enthusiasts looking to build muscle and improve strength.',
    exercises: [
      {
        id: 'ex1',
        name: 'Push-ups',
        sets: 3,
        reps: 12,
        imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHVzaCUyMHVwfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
        instructions: 'Start in a plank position with hands shoulder-width apart. Lower your body until your chest nearly touches the floor, then push back up.',
      },
      {
        id: 'ex2',
        name: 'Dumbbell Rows',
        sets: 3,
        reps: 10,
        imageUrl: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZHVtYmJlbGwlMjByb3dzfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
        instructions: 'Bend at the waist with one knee on a bench, pull the dumbbell up to your side, keeping your elbow close to your body.',
      },
    ],
  };
  
  // Complete workout handler
  const completeWorkoutMutation = trpc.fitness.workouts.complete.useMutation();
  
  const handleCompleteWorkout = async () => {
    if (workout) {
      try {
        await completeWorkoutMutation.mutateAsync({ id: workout.id });
        // Show success message or navigate back
        router.back();
      } catch (error) {
        console.error('Error completing workout:', error);
      }
    }
  };
  
  return (
    <View style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.imageContainer}>
          <ImageBackground
            source={{ uri: isLoading ? defaultWorkout.image : (getExerciseImageUrl(workout?.exercises?.[0]) || defaultWorkout.image) }}
            style={styles.headerImage}
          >
            <LinearGradient
              colors={['rgba(0,0,0,0.7)', 'transparent', 'transparent']}
              style={styles.headerGradient}
            >
              <TouchableOpacity 
                style={styles.backButton}
                onPress={() => router.back()}
              >
                <ArrowLeft size={24} color={colors.white} />
              </TouchableOpacity>
            </LinearGradient>
          </ImageBackground>
        </View>
        
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{isLoading ? defaultWorkout.title : workout?.name}</Text>
          <Text style={styles.subtitle}>{isLoading ? defaultWorkout.subtitle : `${workout?.type.charAt(0).toUpperCase()}${workout?.type.slice(1)} Fitness`}</Text>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Clock size={20} color={colors.primary} />
              <Text style={styles.statValue}>{isLoading ? defaultWorkout.duration : `${workout?.duration} min`}</Text>
            </View>
            
            <View style={styles.statDivider} />
            
            <View style={styles.statItem}>
              <Flame size={20} color={colors.primary} />
              <Text style={styles.statValue}>{isLoading ? defaultWorkout.calories : `${workout?.caloriesBurned || 250} cal`}</Text>
            </View>
            
            <View style={styles.statDivider} />
            
            <View style={styles.statItem}>
              <Dumbbell size={20} color={colors.primary} />
              <Text style={styles.statValue}>{isLoading ? defaultWorkout.level : (workout?.exercises.length === 1 ? 'Beginner' : workout?.exercises.length === 2 ? 'Intermediate' : 'Advanced')}</Text>
            </View>
          </View>
          
          <Text style={styles.description}>
            {isLoading ? defaultWorkout.description : `This ${workout?.type} fitness routine is designed to ${workout?.type === 'strength' ? 'build muscle and improve strength' : workout?.type === 'cardio' ? 'improve cardiovascular health and burn calories' : 'improve flexibility and balance'}. It includes ${workout?.exercises.length} exercises and takes approximately ${workout?.duration} minutes to complete.`}
          </Text>
          
          <View style={styles.exercisesContainer}>
            <Text style={styles.exercisesTitle}>Exercises</Text>
            
            {(isLoading ? defaultWorkout.exercises : workout?.exercises || []).map((exercise) => (
              <View key={exercise.id} style={styles.exerciseCard}>
                <TouchableOpacity 
                  style={styles.exerciseHeader}
                  onPress={() => toggleExercise(exercise.id || '')}
                >
                  <Image 
                    source={{ uri: getExerciseImageUrl(exercise) }}
                    style={styles.exerciseImage}
                  />
                  <View style={styles.exerciseInfo}>
                    <Text style={styles.exerciseName}>{exercise.name}</Text>
                    <Text style={styles.exerciseSets}>
                      {exercise.sets ? `${exercise.sets} sets` : ''} 
                      {exercise.sets && exercise.reps ? ' • ' : ''}
                      {exercise.reps ? `${exercise.reps} reps` : ''}
                      {exercise.duration ? ` • ${exercise.duration} sec` : ''}
                    </Text>
                  </View>
                  {expandedExercise === (exercise.id || '') ? (
                    <ChevronUp size={20} color={colors.textSecondary} />
                  ) : (
                    <ChevronDown size={20} color={colors.textSecondary} />
                  )}
                </TouchableOpacity>
                
                {expandedExercise === (exercise.id || '') && (
                  <View style={styles.exerciseDetails}>
                    <Text style={styles.exerciseInstructions}>{exercise.instructions}</Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.startButton}
          onPress={handleCompleteWorkout}
        >
          <Play size={20} color={colors.black} fill={colors.black} />
          <Text style={styles.startButtonText}>Start Fitness</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Helper function to get exercise image URL
const getExerciseImageUrl = (exercise: any): string => {
  if (exercise?.imageUrl) {
    return exercise.imageUrl;
  }
  return 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHVzaCUyMHVwfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60';
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  imageContainer: {
    height: 250,
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  headerGradient: {
    height: '100%',
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  statItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statValue: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
    marginLeft: 8,
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: colors.border,
  },
  description: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
    marginBottom: 24,
  },
  exercisesContainer: {
    
  },
  exercisesTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  exerciseCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
  },
  exerciseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  exerciseImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  exerciseSets: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  exerciseDetails: {
    padding: 16,
    paddingTop: 0,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  exerciseInstructions: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.background,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  startButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  startButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.black,
    marginLeft: 8,
  },
});