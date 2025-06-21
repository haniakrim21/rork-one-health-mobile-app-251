import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { TrendingUp, TrendingDown } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { TrendData } from '@/types';

export interface MetricCardProps {
  title: string;
  value: string;
  unit?: string;
  trend?: TrendData;
  color?: string;
  style?: ViewStyle;
}

export function MetricCard({ 
  title, 
  value, 
  unit, 
  trend, 
  color = colors.primary,
  style 
}: MetricCardProps) {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {trend && (
          <View style={styles.trendContainer}>
            {trend.isPositive ? (
              <TrendingUp size={16} color={colors.success} />
            ) : (
              <TrendingDown size={16} color={colors.error} />
            )}
            <Text style={[
              styles.trendText,
              { color: trend.isPositive ? colors.success : colors.error }
            ]}>
              {trend.value}
            </Text>
          </View>
        )}
      </View>
      
      <View style={styles.valueContainer}>
        <Text style={[styles.value, { color }]}>{value}</Text>
        {unit && <Text style={styles.unit}>{unit}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trendText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  value: {
    fontSize: 24,
    fontWeight: '700',
  },
  unit: {
    fontSize: 14,
    color: colors.textSecondary,
    marginLeft: 4,
  },
});