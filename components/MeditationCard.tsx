import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Play, Clock, Star, Heart } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { MeditationSession } from '@/types/wellness';

export interface MeditationCardProps {
  meditation: MeditationSession;
  onPress: () => void;
  onStart?: () => void;
}

export function MeditationCard({ meditation, onPress, onStart }: MeditationCardProps) {
  const getDifficultyColor = () => {
    switch (meditation.difficulty) {
      case 'beginner':
        return colors.success;
      case 'intermediate':
        return colors.warning;
      case 'advanced':
        return colors.error;
      default:
        return colors.textSecondary;
    }
  };

  const getCategoryColor = () => {
    switch (meditation.category) {
      case 'sleep':
        return colors.info;
      case 'stress':
        return colors.wellness;
      case 'focus':
        return colors.primary;
      case 'anxiety':
        return colors.warning;
      case 'gratitude':
        return colors.success;
      default:
        return colors.primary;
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.imageContainer}>
        {meditation.imageUrl ? (
          <Image source={{ uri: meditation.imageUrl }} style={styles.image} />
        ) : (
          <View style={[styles.imagePlaceholder, { backgroundColor: getCategoryColor() + '20' }]}>
            <Play size={32} color={getCategoryColor()} />
          </View>
        )}
        <TouchableOpacity style={styles.favoriteButton}>
          <Heart 
            size={20} 
            color={meditation.isFavorite ? colors.error : colors.white} 
            fill={meditation.isFavorite ? colors.error : 'transparent'}
          />
        </TouchableOpacity>
      </View>
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{meditation.name}</Text>
          <View style={styles.ratingContainer}>
            <Star size={14} color={colors.warning} fill={colors.warning} />
            <Text style={styles.rating}>{meditation.rating}</Text>
          </View>
        </View>
        
        <Text style={styles.description} numberOfLines={2}>
          {meditation.description}
        </Text>
        
        <View style={styles.metadata}>
          <View style={styles.metadataItem}>
            <Clock size={14} color={colors.textSecondary} />
            <Text style={styles.metadataText}>{meditation.duration} min</Text>
          </View>
          
          <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor() + '20' }]}>
            <Text style={[styles.categoryText, { color: getCategoryColor() }]}>
              {meditation.category}
            </Text>
          </View>
          
          <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor() + '20' }]}>
            <Text style={[styles.difficultyText, { color: getDifficultyColor() }]}>
              {meditation.difficulty}
            </Text>
          </View>
        </View>
        
        <Text style={styles.instructor}>by {meditation.instructor}</Text>
        
        {onStart && (
          <TouchableOpacity style={styles.startButton} onPress={onStart}>
            <Play size={16} color={colors.white} />
            <Text style={styles.startButtonText}>Start Session</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    height: 120,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    flex: 1,
    marginRight: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 4,
  },
  description: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 12,
  },
  metadata: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    flexWrap: 'wrap',
  },
  metadataItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 4,
  },
  metadataText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 4,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 4,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  instructor: {
    fontSize: 12,
    color: colors.textSecondary,
    fontStyle: 'italic',
    marginBottom: 12,
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  startButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
    marginLeft: 8,
  },
});