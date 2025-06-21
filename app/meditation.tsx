import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Stack, router } from 'expo-router';
import { colors } from '@/constants/colors';
import { Card } from '@/components/Card';
import { MeditationCard } from '@/components/MeditationCard';
import { useWellnessStore } from '@/store/wellness-store';
import { 
  Brain, 
  Play, 
  Clock, 
  Heart,
  Leaf,
  Moon,
  Zap,
  Target
} from 'lucide-react-native';

export default function MeditationScreen() {
  const { meditationSessions = [], completeMeditationSession } = useWellnessStore();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const categories = [
    { id: 'mindfulness', name: 'Mindfulness', icon: Brain, color: colors.primary },
    { id: 'sleep', name: 'Sleep', icon: Moon, color: colors.info },
    { id: 'stress', name: 'Stress Relief', icon: Heart, color: colors.success },
    { id: 'focus', name: 'Focus', icon: Target, color: colors.warning },
    { id: 'energy', name: 'Energy', icon: Zap, color: colors.error },
    { id: 'nature', name: 'Nature', icon: Leaf, color: colors.wellness },
  ];
  
  const filteredSessions = selectedCategory 
    ? meditationSessions.filter(session => session.category === selectedCategory)
    : meditationSessions;
  
  const featuredSessions = meditationSessions.slice(0, 3);
  
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Meditation' }} />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Meditation</Text>
        <Text style={styles.headerSubtitle}>Find peace and clarity through guided meditation</Text>
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <Card style={styles.dailyCard}>
          <View style={styles.dailyHeader}>
            <Brain size={24} color={colors.primary} />
            <Text style={styles.dailyTitle}>Daily Meditation</Text>
          </View>
          <Text style={styles.dailyDescription}>
            Start your day with a 10-minute mindfulness session
          </Text>
          <TouchableOpacity 
            style={styles.dailyButton}
            onPress={() => Alert.alert('Daily Meditation', 'Starting daily meditation session')}
          >
            <Play size={16} color={colors.black} />
            <Text style={styles.dailyButtonText}>Start Now</Text>
          </TouchableOpacity>
        </Card>
        
        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <View style={styles.categoriesGrid}>
            {categories.map(category => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryCard,
                  selectedCategory === category.id && styles.selectedCategory
                ]}
                onPress={() => setSelectedCategory(
                  selectedCategory === category.id ? null : category.id
                )}
              >
                <View style={[styles.categoryIcon, { backgroundColor: category.color + '20' }]}>
                  <category.icon size={20} color={category.color} />
                </View>
                <Text style={[
                  styles.categoryName,
                  selectedCategory === category.id && styles.selectedCategoryName
                ]}>
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        <View style={styles.sessionsSection}>
          <Text style={styles.sectionTitle}>
            {selectedCategory ? 
              categories.find(c => c.id === selectedCategory)?.name + ' Sessions' : 
              'Featured Sessions'
            }
          </Text>
          
          {filteredSessions.length > 0 ? (
            <View style={styles.sessionsList}>
              {filteredSessions.map(session => (
                <MeditationCard
                  key={session.id}
                  meditation={session}
                  onPress={() => router.push(`/meditation/${session.id}`)}
                  onStart={() => {
                    completeMeditationSession(session.id);
                    Alert.alert('Meditation Started', `Starting ${session.title}`);
                  }}
                />
              ))}
            </View>
          ) : (
            <Card style={styles.emptyCard}>
              <Brain size={48} color={colors.textSecondary} />
              <Text style={styles.emptyText}>No sessions found in this category</Text>
              <TouchableOpacity 
                style={styles.browseButton}
                onPress={() => setSelectedCategory(null)}
              >
                <Text style={styles.browseButtonText}>Browse All Sessions</Text>
              </TouchableOpacity>
            </Card>
          )}
        </View>
        
        <Card style={styles.progressCard}>
          <Text style={styles.progressTitle}>Your Progress</Text>
          <View style={styles.progressStats}>
            <View style={styles.progressStat}>
              <Text style={styles.progressValue}>12</Text>
              <Text style={styles.progressLabel}>Sessions</Text>
            </View>
            <View style={styles.progressStat}>
              <Text style={styles.progressValue}>180</Text>
              <Text style={styles.progressLabel}>Minutes</Text>
            </View>
            <View style={styles.progressStat}>
              <Text style={styles.progressValue}>7</Text>
              <Text style={styles.progressLabel}>Day Streak</Text>
            </View>
          </View>
        </Card>
        
        <Card style={styles.tipsCard}>
          <Text style={styles.tipsTitle}>Meditation Tips</Text>
          <View style={styles.tipItem}>
            <Clock size={16} color={colors.primary} />
            <Text style={styles.tipText}>Start with just 5 minutes a day</Text>
          </View>
          <View style={styles.tipItem}>
            <Heart size={16} color={colors.success} />
            <Text style={styles.tipText}>Find a quiet, comfortable space</Text>
          </View>
          <View style={styles.tipItem}>
            <Target size={16} color={colors.warning} />
            <Text style={styles.tipText}>Focus on your breath when mind wanders</Text>
          </View>
          <View style={styles.tipItem}>
            <Leaf size={16} color={colors.wellness} />
            <Text style={styles.tipText}>Be patient and kind to yourself</Text>
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
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  dailyCard: {
    marginBottom: 24,
    backgroundColor: colors.primary + '10',
    borderColor: colors.primary + '20',
    borderWidth: 1,
  },
  dailyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  dailyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginLeft: 8,
  },
  dailyDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 16,
  },
  dailyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignSelf: 'flex-start',
    paddingHorizontal: 24,
  },
  dailyButtonText: {
    color: colors.black,
    fontWeight: '600',
    marginLeft: 8,
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
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedCategory: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + '10',
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
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
  },
  selectedCategoryName: {
    color: colors.primary,
  },
  sessionsSection: {
    marginBottom: 24,
  },
  sessionsList: {
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
  progressCard: {
    marginBottom: 24,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
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
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary,
  },
  progressLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
  },
  tipsCard: {
    
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  tipText: {
    fontSize: 14,
    color: colors.text,
    marginLeft: 8,
    flex: 1,
    lineHeight: 18,
  },
});