import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { Card } from './Card';
import { ProgressBar } from './ProgressBar';
import { colors } from '@/constants/colors';
import { EnergyScore } from '@/types/wellness';
import { Zap, TrendingUp, TrendingDown, Minus } from 'lucide-react-native';

interface EnergyScoreCardProps {
  score: EnergyScore;
  onPress?: () => void;
  style?: ViewStyle;
}

export const EnergyScoreCard: React.FC<EnergyScoreCardProps> = ({
  score,
  onPress,
  style,
}) => {
  const getTrendIcon = () => {
    switch (score.trend) {
      case 'improving':
        return <TrendingUp size={16} color={colors.success} />;
      case 'declining':
        return <TrendingDown size={16} color={colors.error} />;
      default:
        return <Minus size={16} color={colors.textSecondary} />;
    }
  };

  const getTrendColor = () => {
    switch (score.trend) {
      case 'improving':
        return colors.success;
      case 'declining':
        return colors.error;
      default:
        return colors.textSecondary;
    }
  };

  return (
    <Card style={[styles.card, style]} onPress={onPress}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Zap size={20} color={colors.warning} />
          <Text style={styles.title}>Energy Score</Text>
        </View>
        <View style={styles.trendContainer}>
          {getTrendIcon()}
          <Text style={[styles.trendText, { color: getTrendColor() }]}>
            {score.trend}
          </Text>
        </View>
      </View>
      
      <View style={styles.scoreContainer}>
        <Text style={styles.score}>{score.score}</Text>
        <Text style={styles.scoreLabel}>/100</Text>
      </View>
      
      <ProgressBar 
        progress={score.score} 
        height={8}
        fillColor={colors.warning}
        style={styles.progressBar}
      />
      
      <View style={styles.factorsContainer}>
        <Text style={styles.factorsTitle}>Key Factors</Text>
        <View style={styles.factorsGrid}>
          <View style={styles.factor}>
            <Text style={styles.factorLabel}>Sleep</Text>
            <Text style={styles.factorValue}>{score.factors.sleep}%</Text>
          </View>
          <View style={styles.factor}>
            <Text style={styles.factorLabel}>Exercise</Text>
            <Text style={styles.factorValue}>{score.factors.exercise}%</Text>
          </View>
          <View style={styles.factor}>
            <Text style={styles.factorLabel}>Stress</Text>
            <Text style={styles.factorValue}>{score.factors.stress}%</Text>
          </View>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 8,
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trendText: {
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
    textTransform: 'capitalize',
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 12,
  },
  score: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.warning,
  },
  scoreLabel: {
    fontSize: 16,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  progressBar: {
    marginBottom: 16,
  },
  factorsContainer: {
    
  },
  factorsTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 8,
  },
  factorsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  factor: {
    alignItems: 'center',
  },
  factorLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  factorValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
});