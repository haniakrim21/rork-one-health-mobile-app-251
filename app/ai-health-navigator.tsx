import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Stack } from 'expo-router';
import { colors } from '@/constants/colors';
import { Card } from '@/components/Card';
import { 
  Brain, 
  Mic, 
  Send, 
  Lightbulb, 
  Shield, 
  MessageCircle,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Clock,
  User
} from 'lucide-react-native';

export default function AIHealthNavigatorScreen() {
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [conversation, setConversation] = useState([
    {
      type: 'ai',
      message: 'Hello! I am your AI Health Navigator. I can help you with health questions, medication reminders, appointment scheduling, and provide personalized health insights. How can I assist you today?',
      timestamp: new Date().toISOString(),
    }
  ]);
  
  const quickActions = [
    { id: 'medication', title: 'Medication Reminder', icon: '💊' },
    { id: 'appointment', title: 'Next Appointment', icon: '📅' },
    { id: 'symptoms', title: 'Symptom Check', icon: '🩺' },
    { id: 'summary', title: 'Health Summary', icon: '📊' },
  ];
  
  const aiInsights = [
    {
      category: 'Medication Adherence',
      insight: 'Your medication adherence has improved to 95% this month',
      priority: 'low',
      confidence: 92,
    },
    {
      category: 'Preventive Care',
      insight: 'You are due for your annual eye exam',
      priority: 'medium',
      confidence: 98,
    },
    {
      category: 'Lifestyle',
      insight: 'Your sleep pattern shows improvement over the past week',
      priority: 'low',
      confidence: 85,
    },
  ];
  
  const handleSendMessage = () => {
    if (!query.trim()) return;
    
    const userMessage = {
      type: 'user',
      message: query,
      timestamp: new Date().toISOString(),
    };
    
    setConversation(prev => [...prev, userMessage]);
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(query);
      setConversation(prev => [...prev, {
        type: 'ai',
        message: aiResponse.response,
        actions: aiResponse.actions,
        timestamp: new Date().toISOString(),
      }]);
    }, 1000);
    
    setQuery('');
  };
  
  const generateAIResponse = (userQuery: string) => {
    const lowerQuery = userQuery.toLowerCase();
    
    if (lowerQuery.includes('medication') || lowerQuery.includes('pill')) {
      return {
        response: 'Based on your medication schedule, you have Lisinopril due at 8:00 AM and Metformin due at breakfast and dinner. Your adherence rate is excellent at 95%.',
        actions: [
          { type: 'medication_reminder', title: 'Set Reminder' },
          { type: 'view_medications', title: 'View All Medications' },
        ],
      };
    } else if (lowerQuery.includes('appointment')) {
      return {
        response: 'You have an upcoming appointment with Dr. Sarah Johnson on June 25th at 10:00 AM for your cardiology follow-up. Would you like me to set a reminder or help you reschedule?',
        actions: [
          { type: 'set_reminder', title: 'Set Reminder' },
          { type: 'reschedule', title: 'Reschedule' },
        ],
      };
    } else if (lowerQuery.includes('symptom') || lowerQuery.includes('pain') || lowerQuery.includes('feel')) {
      return {
        response: 'I understand you are experiencing some symptoms. For the most accurate assessment, I recommend using our symptom checker or scheduling a virtual consultation with a healthcare provider.',
        actions: [
          { type: 'symptom_checker', title: 'Use Symptom Checker' },
          { type: 'virtual_consultation', title: 'Book Virtual Consultation' },
        ],
      };
    } else {
      return {
        response: 'Your health metrics are looking good. Blood pressure is well-controlled at 125/82, and your last HbA1c was 6.8%. Keep up the great work with your current routine.',
        actions: [
          { type: 'view_metrics', title: 'View Detailed Metrics' },
          { type: 'health_tips', title: 'Get Health Tips' },
        ],
      };
    }
  };
  
  const handleQuickAction = (actionId: string) => {
    const actionQueries = {
      medication: 'Show me my medication schedule',
      appointment: 'When is my next appointment?',
      symptoms: 'I want to check my symptoms',
      summary: 'Give me my health summary',
    };
    
    setQuery(actionQueries[actionId] || '');
    handleSendMessage();
  };
  
  const handleVoiceInput = () => {
    setIsListening(true);
    // Simulate voice input
    setTimeout(() => {
      setIsListening(false);
      setQuery('Show me my health summary');
      Alert.alert('Voice Input', 'Voice command captured: "Show me my health summary"');
    }, 2000);
  };
  
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return colors.error;
      case 'medium': return colors.warning;
      case 'low': return colors.success;
      default: return colors.textSecondary;
    }
  };
  
  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return AlertTriangle;
      case 'medium': return Clock;
      case 'low': return CheckCircle2;
      default: return Lightbulb;
    }
  };
  
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'AI Health Navigator' }} />
      
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Brain size={24} color={colors.primary} />
          <Text style={styles.headerTitle}>AI Health Navigator</Text>
        </View>
        <Text style={styles.headerSubtitle}>
          Your intelligent health assistant powered by ethical AI
        </Text>
      </View>
      
      <ScrollView 
        style={styles.conversationContainer}
        showsVerticalScrollIndicator={false}
      >
        {conversation.map((message, index) => (
          <View key={index} style={[
            styles.messageContainer,
            message.type === 'user' ? styles.userMessage : styles.aiMessage
          ]}>
            <View style={styles.messageHeader}>
              {message.type === 'ai' ? (
                <Brain size={16} color={colors.primary} />
              ) : (
                <User size={16} color={colors.textSecondary} />
              )}
              <Text style={styles.messageTime}>
                {new Date(message.timestamp).toLocaleTimeString()}
              </Text>
            </View>
            <Text style={styles.messageText}>{message.message}</Text>
            {message.actions && (
              <View style={styles.actionsContainer}>
                {message.actions.map((action, actionIndex) => (
                  <TouchableOpacity 
                    key={actionIndex}
                    style={styles.actionButton}
                    onPress={() => Alert.alert('Action', `Execute: ${action.title}`)}
                  >
                    <Text style={styles.actionText}>{action.title}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        ))}
      </ScrollView>
      
      <View style={styles.quickActionsContainer}>
        <Text style={styles.quickActionsTitle}>Quick Actions</Text>
        <View style={styles.quickActionsGrid}>
          {quickActions.map(action => (
            <TouchableOpacity
              key={action.id}
              style={styles.quickActionButton}
              onPress={() => handleQuickAction(action.id)}
            >
              <Text style={styles.quickActionEmoji}>{action.icon}</Text>
              <Text style={styles.quickActionTitle}>{action.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      
      <View style={styles.inputContainer}>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.textInput}
            value={query}
            onChangeText={setQuery}
            placeholder="Ask me anything about your health..."
            placeholderTextColor={colors.textSecondary}
            multiline
          />
          <TouchableOpacity 
            style={[styles.voiceButton, isListening && styles.listeningButton]}
            onPress={handleVoiceInput}
          >
            <Mic size={20} color={isListening ? colors.error : colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.sendButton}
            onPress={handleSendMessage}
          >
            <Send size={20} color={colors.black} />
          </TouchableOpacity>
        </View>
      </View>
      
      <Card style={styles.insightsCard}>
        <View style={styles.insightsHeader}>
          <Lightbulb size={20} color={colors.primary} />
          <Text style={styles.insightsTitle}>AI Insights</Text>
        </View>
        {aiInsights.map((insight, index) => {
          const PriorityIcon = getPriorityIcon(insight.priority);
          return (
            <View key={index} style={styles.insightItem}>
              <PriorityIcon size={16} color={getPriorityColor(insight.priority)} />
              <View style={styles.insightContent}>
                <Text style={styles.insightCategory}>{insight.category}</Text>
                <Text style={styles.insightText}>{insight.insight}</Text>
                <Text style={styles.insightConfidence}>
                  Confidence: {insight.confidence}%
                </Text>
              </View>
            </View>
          );
        })}
      </Card>
      
      <Card style={styles.ethicsCard}>
        <View style={styles.ethicsHeader}>
          <Shield size={20} color={colors.success} />
          <Text style={styles.ethicsTitle}>Ethical AI Transparency</Text>
        </View>
        <Text style={styles.ethicsText}>
          This AI assistant follows strict ethical guidelines including privacy protection, 
          bias mitigation, and transparent decision-making. All recommendations are for 
          informational purposes and should not replace professional medical advice.
        </Text>
        <TouchableOpacity 
          style={styles.transparencyButton}
          onPress={() => Alert.alert('AI Transparency', 'View detailed information about AI model, training data, and ethical principles')}
        >
          <Text style={styles.transparencyText}>View AI Transparency Report</Text>
        </TouchableOpacity>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingTop: 48,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginLeft: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  conversationContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  messageContainer: {
    marginBottom: 16,
    padding: 12,
    borderRadius: 12,
    maxWidth: '85%',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: colors.primary + '20',
  },
  aiMessage: {
    alignSelf: 'flex-start',
    backgroundColor: colors.cardBackground,
  },
  messageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  messageTime: {
    fontSize: 10,
    color: colors.textSecondary,
    marginLeft: 8,
  },
  messageText: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 18,
  },
  actionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 12,
    gap: 8,
  },
  actionButton: {
    backgroundColor: colors.primary + '20',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  actionText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '500',
  },
  quickActionsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  quickActionsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickActionButton: {
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: colors.cardBackground,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 2,
  },
  quickActionEmoji: {
    fontSize: 20,
    marginBottom: 4,
  },
  quickActionTitle: {
    fontSize: 10,
    color: colors.text,
    textAlign: 'center',
  },
  inputContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    color: colors.text,
    maxHeight: 100,
    marginRight: 8,
  },
  voiceButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  listeningButton: {
    backgroundColor: colors.error + '20',
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  insightsCard: {
    margin: 16,
    marginTop: 0,
  },
  insightsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  insightsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 8,
  },
  insightItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  insightContent: {
    marginLeft: 8,
    flex: 1,
  },
  insightCategory: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: 2,
  },
  insightText: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 18,
    marginBottom: 2,
  },
  insightConfidence: {
    fontSize: 10,
    color: colors.textSecondary,
  },
  ethicsCard: {
    margin: 16,
    marginTop: 0,
    backgroundColor: colors.success + '05',
    borderColor: colors.success + '20',
    borderWidth: 1,
  },
  ethicsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  ethicsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 8,
  },
  ethicsText: {
    fontSize: 12,
    color: colors.textSecondary,
    lineHeight: 16,
    marginBottom: 12,
  },
  transparencyButton: {
    alignSelf: 'flex-start',
  },
  transparencyText: {
    fontSize: 12,
    color: colors.success,
    fontWeight: '500',
  },
});