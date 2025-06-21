import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { colors } from '@/constants/colors';
import { router } from 'expo-router';
import { ArrowLeft, Search, Filter, Play, Clock, Flame, Dumbbell } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function FitnessAllScreen() {
  const [activeCategory, setActiveCategory] = useState('all');
  
  const categories = [
    { id: 'all', name: 'All' },
    { id: 'strength', name: 'Strength' },
    { id: 'cardio', name: 'Cardio' },
    { id: 'yoga', name: 'Yoga' },
    { id: 'hiit', name: 'HIIT' },
    { id: 'pilates', name: 'Pilates' },
  ];
  
  const workouts = [
    {
      id: '1',
      title: 'Upper Body Strength',
      subtitle: 'Intensify Your Fitness',
      duration: '30 min',
      level: 'Intermediate',
      calories: '250',
      image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGd5bXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
      category: 'strength',
    },
    {
      id: '2',
      title: 'HIIT Cardio Blast',
      subtitle: 'Burn Maximum Calories',
      duration: '25 min',
      level: 'Advanced',
      calories: '300',
      image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Zml0bmVzcyUyMHRyYWluZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
      category: 'hiit',
    },
    {
      id: '3',
      title: 'Yoga Flow',
      subtitle: 'Find Your Balance',
      duration: '40 min',
      level: 'Beginner',
      calories: '150',
      image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8eW9nYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
      category: 'yoga',
    },
    {
      id: '4',
      title: 'Core Crusher',
      subtitle: 'Sculpt Your Abs',
      duration: '20 min',
      level: 'Intermediate',
      calories: '180',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Zml0bmVzcyUyMHRyYWluZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
      category: 'strength',
    },
    {
      id: '5',
      title: 'Full Body Cardio',
      subtitle: 'Get Your Heart Pumping',
      duration: '35 min',
      level: 'Intermediate',
      calories: '280',
      image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGZpdG5lc3MlMjB0cmFpbmVyfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
      category: 'cardio',
    },
    {
      id: '6',
      title: 'Pilates Core',
      subtitle: 'Strengthen Your Center',
      duration: '45 min',
      level: 'Beginner',
      calories: '200',
      image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8eW9nYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
      category: 'pilates',
    },
  ];
  
  const filteredWorkouts = activeCategory === 'all' 
    ? workouts 
    : workouts.filter(workout => workout.category === activeCategory);
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>All Fitness</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color={colors.text} />
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.searchContainer}>
          <Search size={20} color={colors.textSecondary} style={styles.searchIcon} />
          <Text style={styles.searchPlaceholder}>Search fitness routines</Text>
        </View>
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        >
          {categories.map(category => (
            <TouchableOpacity 
              key={category.id}
              style={[
                styles.categoryButton,
                activeCategory === category.id && styles.activeCategoryButton
              ]}
              onPress={() => setActiveCategory(category.id)}
            >
              <Text style={[
                styles.categoryText,
                activeCategory === category.id && styles.activeCategoryText
              ]}>
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        
        <View style={styles.workoutsContainer}>
          {filteredWorkouts.map(workout => (
            <TouchableOpacity 
              key={workout.id}
              style={styles.workoutCard}
              onPress={() => router.push(`/workout-details?id=${workout.id}`)}
            >
              <ImageBackground
                source={{ uri: workout.image }}
                style={styles.workoutImage}
                imageStyle={styles.workoutImageStyle}
              >
                <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.8)']}
                  style={styles.gradient}
                >
                  <View style={styles.workoutContent}>
                    <View>
                      <Text style={styles.workoutTitle}>{workout.title}</Text>
                      <Text style={styles.workoutSubtitle}>{workout.subtitle}</Text>
                      <View style={styles.workoutMeta}>
                        <View style={styles.metaItem}>
                          <Clock size={14} color={colors.textSecondary} />
                          <Text style={styles.metaText}>{workout.duration}</Text>
                        </View>
                        <View style={styles.metaItem}>
                          <Flame size={14} color={colors.textSecondary} />
                          <Text style={styles.metaText}>{workout.calories} cal</Text>
                        </View>
                        <View style={styles.metaItem}>
                          <Dumbbell size={14} color={colors.textSecondary} />
                          <Text style={styles.metaText}>{workout.level}</Text>
                        </View>
                      </View>
                    </View>
                    <TouchableOpacity style={styles.playButton}>
                      <Play size={20} color={colors.black} fill={colors.black} />
                    </TouchableOpacity>
                  </View>
                </LinearGradient>
              </ImageBackground>
            </TouchableOpacity>
          ))}
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  backButton: {
    
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.cardBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchPlaceholder: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  categoriesContainer: {
    paddingBottom: 16,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.cardBackground,
    marginRight: 12,
  },
  activeCategoryButton: {
    backgroundColor: colors.primary,
  },
  categoryText: {
    color: colors.textSecondary,
    fontWeight: '500',
  },
  activeCategoryText: {
    color: colors.black,
  },
  workoutsContainer: {
    
  },
  workoutCard: {
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
  },
  workoutImage: {
    width: '100%',
    height: '100%',
  },
  workoutImageStyle: {
    borderRadius: 16,
  },
  gradient: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 16,
  },
  workoutContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  workoutTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  workoutSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  workoutMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
    marginBottom: 4,
  },
  metaText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});