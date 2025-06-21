import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CheckCircle, Calendar, ArrowRight } from 'lucide-react-native';
import { colors } from '@/constants/colors';

export interface DailyCheckInCardProps {
  onPress: () => void;
}

export function DailyCheckInCard({ onPress }: DailyCheckInCardProps) {
  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Calendar size={24} color={colors.primary} />
          <View style={styles.textContainer}>
            <Text style={styles.title}>Daily Check-in</Text>
            <Text style={styles.date}>{today}</Text>
          </View>
        </View>
        <ArrowRight size={20} color={colors.textSecondary} />
      </View>
      
      <Text style={styles.description}>
        Take a moment to reflect on your day and track your wellness
      </Text>
      
      <View style={styles.footer}>
        <View style={styles.statusContainer}>
          <CheckCircle size={16} color={colors.success} />
          <Text style={styles.statusText}>Ready to complete</Text>
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
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  textContainer: {
    marginLeft: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 2,
  },
  date: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  description: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 14,
    color: colors.success,
    fontWeight: '600',
    marginLeft: 6,
  },
});