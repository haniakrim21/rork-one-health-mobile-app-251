import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '@/constants/colors';
import { Lightbulb, MessageCircle, Heart, TrendingUp, Target } from 'lucide-react-native';

interface ConversationalNudge {
  id: string;
  type: string;
  message: string;
  tone: string;
  urgency: string;
  personalizedContext: string;
}

interface ConversationalNudgeCardProps {
  nudge: ConversationalNudge;
  onPress: () => void;
  onDismiss?: () => void;
}

export function ConversationalNudgeCard({ nudge, onPress, onDismiss }: ConversationalNudgeCardProps) {
  const getIcon = () => {
    switch (nudge.type) {
      case 'motivational_boost':
        return <Heart size={20} color={colors.primary} />;
      case 'health_insight':
        return <Lightbulb size={20} color={colors.warning} />;
      case 'goal_progress':
        return <TrendingUp size={20} color={colors.success} />;
      case 'gentle_reminder':
        return <Target size={20} color={colors.info} />;
      default:
        return <MessageCircle size={20} color={colors.primary} />;
    }
  };

  const getBackgroundColor = () => {
    switch (nudge.urgency) {
      case 'high':
        return `${colors.error}10`;
      case 'medium':
        return `${colors.warning}10`;
      case 'low':
        return `${colors.primary}10`;
      default:
        return `${colors.primary}05`;
    }
  };

  const getBorderColor = () => {
    switch (nudge.urgency) {
      case 'high':
        return colors.error;
      case 'medium':
        return colors.warning;
      case 'low':
        return colors.primary;
      default:
        return colors.border;
    }
  };

  return (
    <TouchableOpacity 
      style={[
        styles.container,
        { 
          backgroundColor: getBackgroundColor(),
          borderLeftColor: getBorderColor()
        }
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          {getIcon()}
        </View>
        <View style={styles.typeContainer}>
          <Text style={styles.typeText}>
            {nudge.type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </Text>
          <Text style={styles.toneText}>
            {nudge.tone} • {nudge.urgency} priority
          </Text>
        </View>
      </View>
      
      <Text style={styles.message}>{nudge.message}</Text>
      
      <Text style={styles.context}>{nudge.personalizedContext}</Text>
      
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton} onPress={onPress}>
          <Text style={styles.actionButtonText}>Respond</Text>
        </TouchableOpacity>
        {onDismiss && (
          <TouchableOpacity style={styles.dismissButton} onPress={onDismiss}>
            <Text style={styles.dismissButtonText}>Later</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    borderLeftWidth: 4,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  typeContainer: {
    flex: 1,
  },
  typeText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  toneText: {
    fontSize: 12,
    color: colors.textSecondary,
    textTransform: 'capitalize',
  },
  message: {
    fontSize: 15,
    color: colors.text,
    lineHeight: 22,
    marginBottom: 12,
  },
  context: {
    fontSize: 13,
    color: colors.textSecondary,
    fontStyle: 'italic',
    marginBottom: 16,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  actionButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  actionButtonText: {
    color: colors.black,
    fontSize: 14,
    fontWeight: '600',
  },
  dismissButton: {
    backgroundColor: 'transparent',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  dismissButtonText: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: '500',
  },
});