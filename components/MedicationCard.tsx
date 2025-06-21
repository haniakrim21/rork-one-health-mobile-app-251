import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Pill, Clock, CheckCircle, Circle } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { Medication } from '@/types';

export interface MedicationCardProps {
  medication: Medication;
  onPress?: () => void;
  onEdit?: () => void;
}

export function MedicationCard({ medication, onPress, onEdit }: MedicationCardProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Pill size={20} color={colors.primary} />
          <Text style={styles.name}>{medication.name}</Text>
        </View>
        <TouchableOpacity onPress={onEdit}>
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.details}>
        <Text style={styles.dosage}>{medication.dosage}</Text>
        <Text style={styles.frequency}>{medication.frequency}</Text>
      </View>
      
      <View style={styles.timeContainer}>
        <Clock size={16} color={colors.textSecondary} />
        <Text style={styles.timeText}>
          {medication.timeOfDay?.join(', ') || 'No time specified'}
        </Text>
      </View>
      
      {medication.purpose && (
        <Text style={styles.purpose}>For: {medication.purpose}</Text>
      )}
      
      {medication.notes && (
        <Text style={styles.notes}>{medication.notes}</Text>
      )}
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
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginLeft: 8,
  },
  editText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  dosage: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '600',
    marginRight: 12,
  },
  frequency: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  timeText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginLeft: 8,
  },
  purpose: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  notes: {
    fontSize: 14,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
});