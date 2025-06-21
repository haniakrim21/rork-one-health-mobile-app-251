import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { colors } from '@/constants/colors';
import { Card } from '@/components/Card';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Play, 
  Clock, 
  Flame, 
  Target, 
  Star, 
  Bookmark, 
  Share,
  ChevronRight,
  User
} from 'lucide-react-native';

export default function FitnessDetailsScreen() {
  const { id } = useLocalSearchParams();
  const [isBookmarked, setIsBookmarked] = useState(false);
  
  // Mock data - in real app, fetch based on id
  const workout = {
    id: id,
    title: 'Upper Body Strength',
    subtitle: 'Intensify Your Fitness',
    description: 'A comprehensive upper body workout designed to build strength and muscle definition. Perfect for intermediate to advanced fitness levels.',
    duration: '30 min',
    calories: '250-300',
    difficulty: 'Intermediate',
    rating: 4.8,
    reviews: 124,
    instructor: 'Sarah Johnson',
    instructorImage: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGZpdG5lc3MlMjB0cmFpbmVyfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGd5bXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
    equipment: ['Dumbbells', 'Bench', 'Resistance Bands'],
    exercises: [
      { name: 'Push-ups', sets: 3, reps: '12-15', rest: '60s' },
      { name: 'Dumbbell Press', sets: 3, reps: '10-12', rest: '90s' },
      { name: 'Pull-ups', sets: 3, reps: '8-10', rest: '90s' },
      { name: 'Shoulder Press', sets: 3, reps: '10-12', rest: '60s' },
      { name: 'Tricep Dips', sets: 3, reps: '12-15', rest: '60s' },
    ],
    tags: ['Strength', 'Upper Body', 'Muscle Building'],
  };
  
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <ImageBackground
            source={{ uri: workout.image }}
            style={styles.headerImage}
            imageStyle={styles.headerImageStyle}
          >
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.8)']}
              style={styles.gradient}
            >
              <View style={styles.headerContent}>
                <View style={styles.headerActions}>
                  <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={() => setIsBookmarked(!isBookmarked)}
                  >
                    <Bookmark 
                      size={20} 
                      color={isBookmarked ? colors.primary : colors.white} 
                      fill={isBookmarked ? colors.primary : 'transparent'}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionButton}>
                    <Share size={20} color={colors.white} />
                  </TouchableOpacity>
                </View>
                
                <View style={styles.headerInfo}>
                  <Text style={styles.headerTitle}>{workout.title}</Text>
                  <Text style={styles.headerSubtitle}>{workout.subtitle}</Text>
                  
                  <View style={styles.headerStats}>
                    <View style={styles.statItem}>
                      <Clock size={16} color={colors.white} />
                      <Text style={styles.statText}>{workout.duration}</Text>
                    </View>
                    <View style={styles.statItem}>
                      <Flame size={16} color={colors.white} />
                      <Text style={styles.statText}>{workout.calories} cal</Text>
                    </View>
                    <View style={styles.statItem}>
                      <Target size={16} color={colors.white} />
                      <Text style={styles.statText}>{workout.difficulty}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </LinearGradient>
          </ImageBackground>
        </View>
        
        <View style={styles.content}>
          <TouchableOpacity 
            style={styles.startButton}
            onPress={() => router.push(`/fitness-session/${workout.id}`)}
          >
            <Play size={20} color={colors.black} fill={colors.black} />
            <Text style={styles.startButtonText}>Start Workout</Text>
          </TouchableOpacity>
          
          <Card style={styles.instructorCard}>
            <View style={styles.instructorHeader}>
              <Image source={{ uri: workout.instructorImage }} style={styles.instructorImage} />
              <View style={styles.instructorInfo}>
                <Text style={styles.instructorName}>{workout.instructor}</Text>
                <Text style={styles.instructorTitle}>Certified Trainer</Text>
                <View style={styles.ratingRow}>
                  <Star size={14} color={colors.warning} fill={colors.warning} />
                  <Text style={styles.rating}>{workout.rating}</Text>
                  <Text style={styles.reviews}>({workout.reviews} reviews)</Text>
                </View>
              </View>
              <TouchableOpacity 
                style={styles.viewProfileButton}
                onPress={() => router.push(`/trainer-details/${workout.instructor.toLowerCase().replace(' ', '-')}`)}
              >
                <User size={16} color={colors.primary} />
              </TouchableOpacity>
            </View>
          </Card>
          
          <Card style={styles.descriptionCard}>
            <Text style={styles.sectionTitle}>About This Workout</Text>
            <Text style={styles.description}>{workout.description}</Text>
            
            <View style={styles.tagsContainer}>
              {workout.tags.map(tag => (
                <View key={tag} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>
          </Card>
          
          <Card style={styles.equipmentCard}>
            <Text style={styles.sectionTitle}>Equipment Needed</Text>
            <View style={styles.equipmentList}>
              {workout.equipment.map(item => (
                <View key={item} style={styles.equipmentItem}>
                  <View style={styles.equipmentDot} />
                  <Text style={styles.equipmentText}>{item}</Text>
                </View>
              ))}
            </View>
          </Card>
          
          <Card style={styles.exercisesCard}>
            <Text style={styles.sectionTitle}>Exercises ({workout.exercises.length})</Text>
            {workout.exercises.map((exercise, index) => (
              <View key={exercise.name} style={styles.exerciseItem}>
                <View style={styles.exerciseNumber}>
                  <Text style={styles.exerciseNumberText}>{index + 1}</Text>
                </View>
                <View style={styles.exerciseInfo}>
                  <Text style={styles.exerciseName}>{exercise.name}</Text>
                  <Text style={styles.exerciseDetails}>
                    {exercise.sets} sets × {exercise.reps} reps • {exercise.rest} rest
                  </Text>
                </View>
                <ChevronRight size={20} color={colors.textSecondary} />
              </View>
            ))}
          </Card>
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
  imageContainer: {
    height: 300,
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  headerImageStyle: {
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  gradient: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 16,
  },
  headerContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  headerActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  headerInfo: {
    alignItems: 'flex-start',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.white,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: colors.white,
    opacity: 0.8,
    marginBottom: 16,
  },
  headerStats: {
    flexDirection: 'row',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  statText: {
    fontSize: 14,
    color: colors.white,
    marginLeft: 4,
    fontWeight: '500',
  },
  content: {
    padding: 16,
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  startButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.black,
    marginLeft: 8,
  },
  instructorCard: {
    marginBottom: 16,
  },
  instructorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  instructorImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  instructorInfo: {
    flex: 1,
  },
  instructorName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  instructorTitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 4,
    marginRight: 4,
  },
  reviews: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  viewProfileButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
  },
  descriptionCard: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 24,
    marginBottom: 16,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: colors.primary + '20',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '500',
  },
  equipmentCard: {
    marginBottom: 16,
  },
  equipmentList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  equipmentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    marginBottom: 8,
  },
  equipmentDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
    marginRight: 8,
  },
  equipmentText: {
    fontSize: 14,
    color: colors.text,
  },
  exercisesCard: {
    marginBottom: 16,
  },
  exerciseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  exerciseNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  exerciseNumberText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  exerciseDetails: {
    fontSize: 14,
    color: colors.textSecondary,
  },
});