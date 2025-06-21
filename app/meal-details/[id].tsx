import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { colors } from '@/constants/colors';
import { Card } from '@/components/Card';
import { 
  Clock, 
  Users, 
  Flame, 
  ChefHat,
  CheckCircle2,
  Plus,
  Minus,
  Share,
  Bookmark
} from 'lucide-react-native';

export default function MealDetailsScreen() {
  const { id } = useLocalSearchParams();
  const [servings, setServings] = useState(2);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [checkedIngredients, setCheckedIngredients] = useState<string[]>([]);
  
  // Mock data - in real app, fetch based on id
  const meal = {
    id: id,
    title: 'Quinoa Power Bowl',
    description: 'A nutritious and colorful quinoa bowl packed with roasted vegetables, fresh herbs, and a creamy tahini dressing. Perfect for a healthy lunch or dinner.',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    calories: 420,
    prepTime: '25 min',
    cookTime: '20 min',
    totalTime: '45 min',
    servings: 2,
    difficulty: 'Easy',
    category: 'Dinner',
    tags: ['Vegan', 'High Protein', 'Gluten-Free'],
    nutrition: {
      protein: '18g',
      carbs: '52g',
      fat: '16g',
      fiber: '12g',
    },
    ingredients: [
      { name: 'Quinoa', amount: '1 cup', category: 'grains' },
      { name: 'Sweet potato', amount: '1 large', category: 'vegetables' },
      { name: 'Broccoli', amount: '1 head', category: 'vegetables' },
      { name: 'Red bell pepper', amount: '1 medium', category: 'vegetables' },
      { name: 'Chickpeas', amount: '1 can (400g)', category: 'protein' },
      { name: 'Tahini', amount: '3 tbsp', category: 'condiments' },
      { name: 'Lemon juice', amount: '2 tbsp', category: 'condiments' },
      { name: 'Olive oil', amount: '2 tbsp', category: 'oils' },
      { name: 'Garlic', amount: '2 cloves', category: 'aromatics' },
      { name: 'Fresh parsley', amount: '1/4 cup', category: 'herbs' },
    ],
    instructions: [
      'Preheat oven to 400°F (200°C). Rinse quinoa and cook according to package instructions.',
      'Dice sweet potato and cut broccoli into florets. Slice bell pepper.',
      'Toss vegetables with 1 tbsp olive oil, salt, and pepper. Roast for 20 minutes.',
      'Drain and rinse chickpeas. Add to vegetables in last 10 minutes of roasting.',
      'Make tahini dressing by whisking tahini, lemon juice, minced garlic, and water.',
      'Divide cooked quinoa between bowls. Top with roasted vegetables and chickpeas.',
      'Drizzle with tahini dressing and garnish with fresh parsley.',
      'Serve immediately and enjoy your nutritious power bowl!',
    ],
  };
  
  const adjustedIngredients = meal.ingredients.map(ingredient => ({
    ...ingredient,
    amount: adjustAmountForServings(ingredient.amount, meal.servings, servings),
  }));
  
  function adjustAmountForServings(amount: string, originalServings: number, newServings: number): string {
    const ratio = newServings / originalServings;
    const numberMatch = amount.match(/(\d+(?:\.\d+)?)/);
    
    if (numberMatch) {
      const originalNumber = parseFloat(numberMatch[1]);
      const adjustedNumber = (originalNumber * ratio).toFixed(1);
      return amount.replace(numberMatch[1], adjustedNumber);
    }
    
    return amount;
  }
  
  const toggleIngredientCheck = (ingredientName: string) => {
    setCheckedIngredients(prev => 
      prev.includes(ingredientName)
        ? prev.filter(name => name !== ingredientName)
        : [...prev, ingredientName]
    );
  };
  
  const adjustedCalories = Math.round((meal.calories / meal.servings) * servings);
  
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: meal.image }} style={styles.headerImage} />
          <View style={styles.headerOverlay}>
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
          </View>
        </View>
        
        <View style={styles.content}>
          <View style={styles.titleSection}>
            <Text style={styles.title}>{meal.title}</Text>
            <Text style={styles.description}>{meal.description}</Text>
            
            <View style={styles.tagsContainer}>
              {meal.tags.map(tag => (
                <View key={tag} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>
          </View>
          
          <Card style={styles.statsCard}>
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Flame size={20} color={colors.warning} />
                <Text style={styles.statValue}>{adjustedCalories}</Text>
                <Text style={styles.statLabel}>Calories</Text>
              </View>
              <View style={styles.statItem}>
                <Clock size={20} color={colors.primary} />
                <Text style={styles.statValue}>{meal.totalTime}</Text>
                <Text style={styles.statLabel}>Total Time</Text>
              </View>
              <View style={styles.statItem}>
                <Users size={20} color={colors.success} />
                <Text style={styles.statValue}>{servings}</Text>
                <Text style={styles.statLabel}>Servings</Text>
              </View>
              <View style={styles.statItem}>
                <ChefHat size={20} color={colors.textSecondary} />
                <Text style={styles.statValue}>{meal.difficulty}</Text>
                <Text style={styles.statLabel}>Difficulty</Text>
              </View>
            </View>
          </Card>
          
          <Card style={styles.nutritionCard}>
            <Text style={styles.sectionTitle}>Nutrition (per serving)</Text>
            <View style={styles.nutritionGrid}>
              <View style={styles.nutritionItem}>
                <Text style={styles.nutritionValue}>{meal.nutrition.protein}</Text>
                <Text style={styles.nutritionLabel}>Protein</Text>
              </View>
              <View style={styles.nutritionItem}>
                <Text style={styles.nutritionValue}>{meal.nutrition.carbs}</Text>
                <Text style={styles.nutritionLabel}>Carbs</Text>
              </View>
              <View style={styles.nutritionItem}>
                <Text style={styles.nutritionValue}>{meal.nutrition.fat}</Text>
                <Text style={styles.nutritionLabel}>Fat</Text>
              </View>
              <View style={styles.nutritionItem}>
                <Text style={styles.nutritionValue}>{meal.nutrition.fiber}</Text>
                <Text style={styles.nutritionLabel}>Fiber</Text>
              </View>
            </View>
          </Card>
          
          <Card style={styles.ingredientsCard}>
            <View style={styles.ingredientsHeader}>
              <Text style={styles.sectionTitle}>Ingredients</Text>
              <View style={styles.servingsAdjuster}>
                <TouchableOpacity 
                  style={styles.adjustButton}
                  onPress={() => setServings(Math.max(1, servings - 1))}
                >
                  <Minus size={16} color={colors.primary} />
                </TouchableOpacity>
                <Text style={styles.servingsText}>{servings} servings</Text>
                <TouchableOpacity 
                  style={styles.adjustButton}
                  onPress={() => setServings(servings + 1)}
                >
                  <Plus size={16} color={colors.primary} />
                </TouchableOpacity>
              </View>
            </View>
            
            {adjustedIngredients.map(ingredient => (
              <TouchableOpacity 
                key={ingredient.name}
                style={styles.ingredientItem}
                onPress={() => toggleIngredientCheck(ingredient.name)}
              >
                <View style={styles.ingredientCheck}>
                  <CheckCircle2 
                    size={20} 
                    color={checkedIngredients.includes(ingredient.name) ? colors.success : colors.border}
                    fill={checkedIngredients.includes(ingredient.name) ? colors.success : 'transparent'}
                  />
                </View>
                <View style={styles.ingredientInfo}>
                  <Text style={[
                    styles.ingredientName,
                    checkedIngredients.includes(ingredient.name) && styles.checkedIngredient
                  ]}>
                    {ingredient.name}
                  </Text>
                  <Text style={styles.ingredientAmount}>{ingredient.amount}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </Card>
          
          <Card style={styles.instructionsCard}>
            <Text style={styles.sectionTitle}>Instructions</Text>
            {meal.instructions.map((instruction, index) => (
              <View key={index} style={styles.instructionItem}>
                <View style={styles.instructionNumber}>
                  <Text style={styles.instructionNumberText}>{index + 1}</Text>
                </View>
                <Text style={styles.instructionText}>{instruction}</Text>
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
    height: 250,
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  headerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  headerActions: {
    position: 'absolute',
    top: 16,
    right: 16,
    flexDirection: 'row',
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  content: {
    padding: 16,
  },
  titleSection: {
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
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
  statsCard: {
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  nutritionCard: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  nutritionGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nutritionItem: {
    alignItems: 'center',
    flex: 1,
  },
  nutritionValue: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 4,
  },
  nutritionLabel: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  ingredientsCard: {
    marginBottom: 16,
  },
  ingredientsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  servingsAdjuster: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  adjustButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
  },
  servingsText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
    marginHorizontal: 12,
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  ingredientCheck: {
    marginRight: 12,
  },
  ingredientInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ingredientName: {
    fontSize: 16,
    color: colors.text,
    flex: 1,
  },
  checkedIngredient: {
    textDecorationLine: 'line-through',
    color: colors.textSecondary,
  },
  ingredientAmount: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  instructionsCard: {
    marginBottom: 16,
  },
  instructionItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  instructionNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  instructionNumberText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  instructionText: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
    flex: 1,
  },
});