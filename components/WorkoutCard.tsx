import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Clock, Zap, CheckCircle, Play } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { Workout } from '@/types';

export interface WorkoutCardProps {
  workout: Workout;
  onPress: () => void;
  onStart?: () => void;
}

export function WorkoutCard({ workout, onPress, onStart }: WorkoutCardProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.header}>
        <View>
          <Text style={styles.name}>{workout.name}</Text>
          <Text style={styles.type}>{workout.type}</Text>
        </View>
        {workout.completed ? (
          <CheckCircle size={24} color={colors.success} />
        ) : (
          <TouchableOpacity 
            style={styles.playButton}
            onPress={(e) => {
              e.stopPropagation();
              onStart?.();
            }}
          >
            <Play size={16} color={colors.black} />
          </TouchableOpacity>
        )}
      </View>
      
      <View style={styles.details}>
        <View style={styles.detailItem}>
          <Clock size={16} color={colors.textSecondary} />
          <Text style={styles.detailText}>{workout.duration} min</Text>
        </View>
        
        {workout.caloriesBurned && (
          <View style={styles.detailItem}>
            <Zap size={16} color={colors.textSecondary} />
            <Text style={styles.detailText}>{workout.caloriesBurned} cal</Text>
          </View>
        )}
        
        <View style={styles.detailItem}>
          <Text style={styles.detailText}>{workout.exercises.length} exercises</Text>
        </View>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  type: {
    fontSize: 14,
    color: colors.textSecondary,
    textTransform: 'capitalize',
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 4,
  },
  detailText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginLeft: 4,
  },
});