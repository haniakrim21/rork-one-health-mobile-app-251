import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { Card } from './Card';
import { ProgressBar } from './ProgressBar';
import { colors } from '@/constants/colors';
import { ResilienceScore } from '@/types/wellness';
import { Shield, TrendingUp, TrendingDown, Minus } from 'lucide-react-native';

interface ResilienceScoreCardProps {
  score: ResilienceScore;
  onPress?: () => void;
  style?: ViewStyle;
}

export const ResilienceScoreCard: React.FC<ResilienceScoreCardProps> = ({
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
          <Shield size={20} color={colors.info} />
          <Text style={styles.title}>Resilience</Text>
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
        fillColor={colors.info}
        style={styles.progressBar}
      />
      
      <View style={styles.componentsContainer}>
        <Text style={styles.componentsTitle}>Components</Text>
        <View style={styles.componentsGrid}>
          <View style={styles.component}>
            <Text style={styles.componentLabel}>Emotional</Text>
            <Text style={styles.componentValue}>{score.components.emotional}%</Text>
          </View>
          <View style={styles.component}>
            <Text style={styles.componentLabel}>Physical</Text>
            <Text style={styles.componentValue}>{score.components.physical}%</Text>
          </View>
          <View style={styles.component}>
            <Text style={styles.componentLabel}>Social</Text>
            <Text style={styles.componentValue}>{score.components.social}%</Text>
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
    color: colors.info,
  },
  scoreLabel: {
    fontSize: 16,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  progressBar: {
    marginBottom: 16,
  },
  componentsContainer: {
    
  },
  componentsTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 8,
  },
  componentsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  component: {
    alignItems: 'center',
  },
  componentLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  componentValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
});