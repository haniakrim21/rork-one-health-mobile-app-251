import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { colors } from '@/constants/colors';
import { Card } from '@/components/Card';
import { Search, Filter, X } from 'lucide-react-native';

export default function SearchScreen() {
  const { category } = useLocalSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState(category || 'all');

  const filters = [
    { id: 'all', name: 'All' },
    { id: 'fitness', name: 'Fitness' },
    { id: 'wellness', name: 'Wellness' },
    { id: 'health', name: 'Health' },
    { id: 'nutrition', name: 'Nutrition' },
  ];

  const searchResults = [
    {
      id: '1',
      title: 'Upper Body Strength',
      category: 'fitness',
      type: 'Workout',
      duration: '30 min',
    },
    {
      id: '2',
      title: 'Morning Meditation',
      category: 'wellness',
      type: 'Meditation',
      duration: '15 min',
    },
    {
      id: '3',
      title: 'Heart Rate Monitor',
      category: 'health',
      type: 'Health Metric',
      duration: 'Real-time',
    },
    {
      id: '4',
      title: 'Quinoa Bowl Recipe',
      category: 'nutrition',
      type: 'Meal',
      duration: '420 kcal',
    },
  ];

  const filteredResults = activeFilter === 'all' 
    ? searchResults.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.type.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : searchResults.filter(item => 
        item.category === activeFilter &&
        (item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
         item.type.toLowerCase().includes(searchQuery.toLowerCase()))
      );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color={colors.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search workouts, meals, tips..."
            placeholderTextColor={colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <X size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          )}
        </View>
        
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filtersContainer}
      >
        {filters.map(filter => (
          <TouchableOpacity 
            key={filter.id}
            style={[
              styles.filterChip,
              activeFilter === filter.id && styles.activeFilterChip
            ]}
            onPress={() => setActiveFilter(filter.id)}
          >
            <Text style={[
              styles.filterText,
              activeFilter === filter.id && styles.activeFilterText
            ]}>
              {filter.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.resultsContainer}
      >
        {searchQuery.length > 0 && (
          <Text style={styles.resultsHeader}>
            {filteredResults.length} results for "{searchQuery}"
          </Text>
        )}

        {filteredResults.map(result => (
          <Card key={result.id} style={styles.resultCard}>
            <View style={styles.resultContent}>
              <View style={styles.resultInfo}>
                <Text style={styles.resultTitle}>{result.title}</Text>
                <Text style={styles.resultType}>{result.type}</Text>
              </View>
              <Text style={styles.resultDuration}>{result.duration}</Text>
            </View>
          </Card>
        ))}

        {filteredResults.length === 0 && searchQuery.length > 0 && (
          <View style={styles.noResults}>
            <Text style={styles.noResultsText}>No results found</Text>
            <Text style={styles.noResultsSubtext}>Try adjusting your search or filters</Text>
          </View>
        )}

        {searchQuery.length === 0 && (
          <View style={styles.suggestions}>
            <Text style={styles.suggestionsTitle}>Popular Searches</Text>
            {['HIIT workout', 'Meditation', 'Healthy recipes', 'Sleep tracking'].map(suggestion => (
              <TouchableOpacity 
                key={suggestion}
                style={styles.suggestionItem}
                onPress={() => setSearchQuery(suggestion)}
              >
                <Search size={16} color={colors.textSecondary} />
                <Text style={styles.suggestionText}>{suggestion}</Text>
              </TouchableOpacity>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
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
  filtersContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.cardBackground,
    marginRight: 12,
  },
  activeFilterChip: {
    backgroundColor: colors.primary,
  },
  filterText: {
    color: colors.textSecondary,
    fontWeight: '500',
  },
  activeFilterText: {
    color: colors.black,
  },
  resultsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  resultsHeader: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  resultCard: {
    marginBottom: 12,
  },
  resultContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  resultInfo: {
    flex: 1,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  resultType: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  resultDuration: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
  noResults: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  noResultsText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  noResultsSubtext: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  suggestions: {
    paddingTop: 20,
  },
  suggestionsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  suggestionText: {
    fontSize: 16,
    color: colors.text,
    marginLeft: 12,
  },
});