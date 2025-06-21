import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';
import { colors } from '@/constants/colors';
import { Card } from '@/components/Card';
import { Search, Filter, Clock, Users, Flame, Camera } from 'lucide-react-native';

export default function MealPlansScreen() {
  const [activeCategory, setActiveCategory] = useState('all');
  
  const categories = [
    { id: 'all', name: 'All' },
    { id: 'breakfast', name: 'Breakfast' },
    { id: 'lunch', name: 'Lunch' },
    { id: 'dinner', name: 'Dinner' },
    { id: 'snacks', name: 'Snacks' },
  ];
  
  const mealPlans = [
    {
      id: 'quinoa-bowl',
      title: 'Quinoa Power Bowl',
      description: 'Nutritious quinoa bowl with roasted vegetables and tahini dressing',
      category: 'dinner',
      calories: 420,
      prepTime: '25 min',
      servings: 2,
      difficulty: 'Easy',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
      tags: ['Vegan', 'High Protein', 'Gluten-Free'],
    },
    {
      id: 'fruit-smoothie',
      title: 'Green Power Smoothie',
      description: 'Energizing smoothie with spinach, banana, and protein powder',
      category: 'breakfast',
      calories: 280,
      prepTime: '5 min',
      servings: 1,
      difficulty: 'Easy',
      image: 'https://images.unsplash.com/photo-1494390248081-4e521a5940db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aGVhbHRoeSUyMGZvb2R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
      tags: ['Vegan', 'High Protein', 'Quick'],
    },
    {
      id: 'veggie-salad',
      title: 'Mediterranean Salad',
      description: 'Fresh Mediterranean salad with chickpeas and feta cheese',
      category: 'lunch',
      calories: 350,
      prepTime: '15 min',
      servings: 2,
      difficulty: 'Easy',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGVhbHRoeSUyMGZvb2R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
      tags: ['Vegetarian', 'High Fiber', 'Low Carb'],
    },
    {
      id: 'protein-pancakes',
      title: 'Protein Pancakes',
      description: 'Fluffy protein pancakes with berries and maple syrup',
      category: 'breakfast',
      calories: 320,
      prepTime: '15 min',
      servings: 2,
      difficulty: 'Medium',
      image: 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGFuY2FrZXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
      tags: ['High Protein', 'Vegetarian'],
    },
    {
      id: 'energy-balls',
      title: 'Energy Balls',
      description: 'No-bake energy balls with dates, nuts, and dark chocolate',
      category: 'snacks',
      calories: 150,
      prepTime: '10 min',
      servings: 8,
      difficulty: 'Easy',
      image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZW5lcmd5JTIwYmFsbHN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
      tags: ['Vegan', 'No Bake', 'High Fiber'],
    },
    {
      id: 'salmon-bowl',
      title: 'Teriyaki Salmon Bowl',
      description: 'Grilled salmon with brown rice and steamed vegetables',
      category: 'dinner',
      calories: 480,
      prepTime: '30 min',
      servings: 2,
      difficulty: 'Medium',
      image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2FsbW9uJTIwYm93bHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
      tags: ['High Protein', 'Omega-3', 'Gluten-Free'],
    },
  ];
  
  const filteredMeals = activeCategory === 'all' 
    ? mealPlans 
    : mealPlans.filter(meal => meal.category === activeCategory);
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return colors.success;
      case 'Medium': return colors.warning;
      case 'Hard': return colors.error;
      default: return colors.textSecondary;
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Search size={20} color={colors.textSecondary} />
          <Text style={styles.searchPlaceholder}>Search recipes...</Text>
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color={colors.text} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.cameraButton}
          onPress={() => router.push('/ai-calorie-calculator')}
        >
          <Camera size={20} color={colors.text} />
        </TouchableOpacity>
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
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {filteredMeals.map(meal => (
          <Card 
            key={meal.id} 
            style={styles.mealCard}
            onPress={() => router.push(`/meal-details/${meal.id}`)}
          >
            <Image source={{ uri: meal.image }} style={styles.mealImage} />
            
            <View style={styles.mealContent}>
              <View style={styles.mealHeader}>
                <Text style={styles.mealTitle}>{meal.title}</Text>
                <View style={[
                  styles.difficultyBadge, 
                  { backgroundColor: getDifficultyColor(meal.difficulty) + '20' }
                ]}>
                  <Text style={[
                    styles.difficultyText,
                    { color: getDifficultyColor(meal.difficulty) }
                  ]}>
                    {meal.difficulty}
                  </Text>
                </View>
              </View>
              
              <Text style={styles.mealDescription}>{meal.description}</Text>
              
              <View style={styles.mealStats}>
                <View style={styles.statItem}>
                  <Flame size={16} color={colors.warning} />
                  <Text style={styles.statText}>{meal.calories} cal</Text>
                </View>
                <View style={styles.statItem}>
                  <Clock size={16} color={colors.textSecondary} />
                  <Text style={styles.statText}>{meal.prepTime}</Text>
                </View>
                <View style={styles.statItem}>
                  <Users size={16} color={colors.textSecondary} />
                  <Text style={styles.statText}>{meal.servings} servings</Text>
                </View>
              </View>
              
              <View style={styles.tagsContainer}>
                {meal.tags.map(tag => (
                  <View key={tag} style={styles.tag}>
                    <Text style={styles.tagText}>{tag}</Text>
                  </View>
                ))}
              </View>
            </View>
          </Card>
        ))}
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 12,
  },
  searchPlaceholder: {
    fontSize: 16,
    color: colors.textSecondary,
    marginLeft: 8,
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.cardBackground,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  cameraButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoriesContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
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
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  mealCard: {
    marginBottom: 16,
    padding: 0,
    overflow: 'hidden',
  },
  mealImage: {
    width: '100%',
    height: 200,
  },
  mealContent: {
    padding: 16,
  },
  mealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  mealTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
    marginRight: 12,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '500',
  },
  mealDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 12,
    lineHeight: 20,
  },
  mealStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  statText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: colors.primary + '20',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 4,
  },
  tagText: {
    fontSize: 10,
    color: colors.primary,
    fontWeight: '500',
  },
});