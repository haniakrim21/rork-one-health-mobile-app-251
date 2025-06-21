import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Star, Clock, DollarSign } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { Trainer } from '@/types';

export interface TrainerCardProps {
  trainer: Trainer;
  onPress: () => void;
  onBook: () => void;
}

export function TrainerCard({ trainer, onPress, onBook }: TrainerCardProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.header}>
        <Image source={{ uri: trainer.profilePicture }} style={styles.avatar} />
        <View style={styles.info}>
          <Text style={styles.name}>{trainer.name}</Text>
          <Text style={styles.specialty}>{trainer.specialty}</Text>
          <View style={styles.rating}>
            <Star size={16} color={colors.warning} fill={colors.warning} />
            <Text style={styles.ratingText}>{trainer.rating}</Text>
            <Text style={styles.experience}>• {trainer.experience}</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.specialties}>
        {trainer.specialties.slice(0, 3).map((specialty, index) => (
          <View key={index} style={styles.specialtyTag}>
            <Text style={styles.specialtyText}>{specialty}</Text>
          </View>
        ))}
      </View>
      
      <View style={styles.footer}>
        <View style={styles.rate}>
          <DollarSign size={16} color={colors.textSecondary} />
          <Text style={styles.rateText}>${trainer.hourlyRate}/hr</Text>
        </View>
        <TouchableOpacity 
          style={styles.bookButton}
          onPress={(e) => {
            e.stopPropagation();
            onBook();
          }}
        >
          <Text style={styles.bookButtonText}>Book</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  specialty: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    color: colors.text,
    marginLeft: 4,
    fontWeight: '600',
  },
  experience: {
    fontSize: 14,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  specialties: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  specialtyTag: {
    backgroundColor: colors.primary + '20',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
    marginBottom: 4,
  },
  specialtyText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rate: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rateText: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '600',
    marginLeft: 4,
  },
  bookButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  bookButtonText: {
    fontSize: 14,
    color: colors.black,
    fontWeight: '600',
  },
});