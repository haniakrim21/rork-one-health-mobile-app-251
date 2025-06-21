import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from './Card';
import { colors } from '@/constants/colors';
import { CognitiveBehavioralNudge } from '@/types/wellness';
import { Brain, X, ArrowRight, Lightbulb, Heart, Zap, Smile } from 'lucide-react-native';

interface NudgeCardProps {
  nudge: CognitiveBehavioralNudge;
  onDismiss?: () => void;
  onAction?: () => void;
}

export const NudgeCard: React.FC<NudgeCardProps> = ({
  nudge,
  onDismiss,
  onAction,
}) => {
  const getIcon = () => {
    switch (nudge.type) {
      case 'thought-challenge':
        return <Brain size={20} color={colors.info} />;
      case 'behavior-suggestion':
        return <Zap size={20} color={colors.warning} />;
      case 'mindfulness-reminder':
        return <Heart size={20} color={colors.wellness} />;
      case 'gratitude-prompt':
        return <Smile size={20} color={colors.success} />;
      default:
        return <Lightbulb size={20} color={colors.primary} />;
    }
  };

  const getBackgroundColor = () => {
    switch (nudge.category) {
      case 'anxiety':
        return `${colors.info}15`;
      case 'depression':
        return `${colors.wellness}15`;
      case 'stress':
        return `${colors.warning}15`;
      case 'self-esteem':
        return `${colors.success}15`;
      case 'productivity':
        return `${colors.primary}15`;
      default:
        return `${colors.primary}15`;
    }
  };

  const getBorderColor = () => {
    switch (nudge.category) {
      case 'anxiety':
        return `${colors.info}30`;
      case 'depression':
        return `${colors.wellness}30`;
      case 'stress':
        return `${colors.warning}30`;
      case 'self-esteem':
        return `${colors.success}30`;
      case 'productivity':
        return `${colors.primary}30`;
      default:
        return `${colors.primary}30`;
    }
  };

  return (
    <Card 
      style={[
        styles.card, 
        { 
          backgroundColor: getBackgroundColor(),
          borderWidth: 1,
          borderColor: getBorderColor()
        }
      ]}
    >
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          {getIcon()}
          <Text style={styles.title}>{nudge.title}</Text>
        </View>
        <TouchableOpacity 
          style={styles.dismissButton}
          onPress={onDismiss}
        >
          <X size={16} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>
      
      <Text style={styles.message}>{nudge.message}</Text>
      
      <View style={styles.footer}>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{nudge.category}</Text>
        </View>
        
        {nudge.actionUrl && (
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={onAction}
          >
            <Text style={styles.actionButtonText}>Try it</Text>
            <ArrowRight size={14} color={colors.primary} />
          </TouchableOpacity>
        )}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 8,
  },
  dismissButton: {
    padding: 4,
  },
  message: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 12,
    lineHeight: 18,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryBadge: {
    backgroundColor: colors.border,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.textSecondary,
    textTransform: 'capitalize',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${colors.primary}20`,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.primary,
    marginRight: 4,
  },
});