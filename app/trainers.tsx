import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';
import { colors } from '@/constants/colors';
import { Card } from '@/components/Card';
import { Search, Filter, Star, MapPin, Clock } from 'lucide-react-native';

export default function TrainersScreen() {
  const [activeCategory, setActiveCategory] = useState('all');
  
  const categories = [
    { id: 'all', name: 'All' },
    { id: 'strength', name: 'Strength' },
    { id: 'cardio', name: 'Cardio' },
    { id: 'yoga', name: 'Yoga' },
    { id: 'hiit', name: 'HIIT' },
    { id: 'pilates', name: 'Pilates' },
  ];
  
  const trainers = [
    {
      id: 'sarah',
      name: 'Sarah Johnson',
      specialty: 'HIIT & Strength Training',
      rating: 4.9,
      reviews: 127,
      experience: '5 years',
      location: 'Downtown Gym',
      price: '$80/session',
      image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGZpdG5lc3MlMjB0cmFpbmVyfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
      category: 'hiit',
      available: true,
    },
    {
      id: 'michael',
      name: 'Michael Chen',
      specialty: 'Strength & Powerlifting',
      rating: 4.8,
      reviews: 89,
      experience: '7 years',
      location: 'Iron Fitness',
      price: '$90/session',
      image: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zml0bmVzcyUyMHRyYWluZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
      category: 'strength',
      available: true,
    },
    {
      id: 'emma',
      name: 'Emma Rodriguez',
      specialty: 'Yoga & Mindfulness',
      rating: 4.9,
      reviews: 156,
      experience: '6 years',
      location: 'Zen Studio',
      price: '$70/session',
      image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Zml0bmVzcyUyMHRyYWluZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
      category: 'yoga',
      available: false,
    },
    {
      id: 'david',
      name: 'David Thompson',
      specialty: 'Cardio & Endurance',
      rating: 4.7,
      reviews: 94,
      experience: '4 years',
      location: 'CardioMax',
      price: '$75/session',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Zml0bmVzcyUyMHRyYWluZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
      category: 'cardio',
      available: true,
    },
    {
      id: 'lisa',
      name: 'Lisa Park',
      specialty: 'Pilates & Core',
      rating: 4.8,
      reviews: 112,
      experience: '5 years',
      location: 'Core Studio',
      price: '$85/session',
      image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Zml0bmVzcyUyMHRyYWluZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
      category: 'pilates',
      available: true,
    },
  ];
  
  const filteredTrainers = activeCategory === 'all' 
    ? trainers 
    : trainers.filter(trainer => trainer.category === activeCategory);
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Search size={20} color={colors.textSecondary} />
          <Text style={styles.searchPlaceholder}>Search trainers...</Text>
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color={colors.text} />
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
        {filteredTrainers.map(trainer => (
          <Card 
            key={trainer.id} 
            style={styles.trainerCard}
            onPress={() => router.push(`/trainer-details/${trainer.id}`)}
          >
            <View style={styles.trainerHeader}>
              <Image source={{ uri: trainer.image }} style={styles.trainerImage} />
              <View style={styles.trainerInfo}>
                <View style={styles.trainerNameRow}>
                  <Text style={styles.trainerName}>{trainer.name}</Text>
                  {trainer.available && <View style={styles.availableDot} />}
                </View>
                <Text style={styles.trainerSpecialty}>{trainer.specialty}</Text>
                
                <View style={styles.ratingRow}>
                  <Star size={14} color={colors.warning} fill={colors.warning} />
                  <Text style={styles.rating}>{trainer.rating}</Text>
                  <Text style={styles.reviews}>({trainer.reviews} reviews)</Text>
                </View>
                
                <View style={styles.detailsRow}>
                  <View style={styles.detailItem}>
                    <Clock size={12} color={colors.textSecondary} />
                    <Text style={styles.detailText}>{trainer.experience}</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <MapPin size={12} color={colors.textSecondary} />
                    <Text style={styles.detailText}>{trainer.location}</Text>
                  </View>
                </View>
              </View>
            </View>
            
            <View style={styles.trainerFooter}>
              <Text style={styles.price}>{trainer.price}</Text>
              <TouchableOpacity 
                style={[
                  styles.bookButton,
                  !trainer.available && styles.bookButtonDisabled
                ]}
                disabled={!trainer.available}
                onPress={() => router.push(`/trainer-details/${trainer.id}`)}
              >
                <Text style={[
                  styles.bookButtonText,
                  !trainer.available && styles.bookButtonTextDisabled
                ]}>
                  {trainer.available ? 'Book Session' : 'Unavailable'}
                </Text>
              </TouchableOpacity>
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
  trainerCard: {
    marginBottom: 16,
  },
  trainerHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  trainerImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 16,
  },
  trainerInfo: {
    flex: 1,
  },
  trainerNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  trainerName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginRight: 8,
  },
  availableDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.success,
  },
  trainerSpecialty: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
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
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  detailText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  trainerFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
  },
  bookButton: {
    backgroundColor: colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  bookButtonDisabled: {
    backgroundColor: colors.border,
  },
  bookButtonText: {
    color: colors.black,
    fontWeight: '600',
  },
  bookButtonTextDisabled: {
    color: colors.textSecondary,
  },
});