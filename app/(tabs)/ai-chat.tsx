import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ActivityIndicator, Alert, I18nManager } from 'react-native';
import { colors } from '@/constants/colors';
import { useUserStore } from '@/store/user-store';
import { useSettingsStore } from '@/store/settings-store';
import { getTranslation, isRTL } from '@/constants/languages';
import { Send, MessageCircle, Lightbulb, Target, TrendingUp, Heart, Sparkles, Brain, Zap } from 'lucide-react-native';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
  actionItems?: string[];
  suggestions?: string[];
  personalizedPlan?: string;
}

interface ConversationalNudge {
  id: string;
  type: string;
  message: string;
  tone: string;
  urgency: string;
  personalizedContext: string;
}

export default function AIChatScreen() {
  const { user } = useUserStore();
  const { settings } = useSettingsStore();
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [conversationalNudges, setConversationalNudges] = useState<ConversationalNudge[]>([]);
  const [showNudges, setShowNudges] = useState(true);

  const t = (key: string) => getTranslation(settings.language, key);
  const isRTLLayout = isRTL(settings.language);
  
  // Set RTL layout
  React.useEffect(() => {
    I18nManager.allowRTL(true);
    I18nManager.forceRTL(isRTLLayout);
  }, [isRTLLayout]);

  useEffect(() => {
    // Initialize chat with welcome message
    const welcomeMessage: ChatMessage = { 
      id: '1', 
      sender: 'ai', 
      text: `${t('aiHealthCoach')} ${user?.name || t('friend')}! ${t('personalWellnessAssistant')}. ${t('askAnythingHealth')}`,
      timestamp: new Date(),
      suggestions: [
        t('goalProgress'),
        t('motivation'),
        t('newPlan'),
        t('dailyFocus')
      ]
    };
    setChatHistory([welcomeMessage]);

    const mockNudges: ConversationalNudge[] = [
      {
        id: '1',
        type: 'motivation',
        message: t('excellentProgress'),
        tone: 'encouraging',
        urgency: 'low',
        personalizedContext: `${t('motivation')} ${user?.behavioral?.motivationStyle || 'supportive'}`
      },
      {
        id: '2',
        type: 'reminder',
        message: t('trackSleepQuality'),
        tone: 'gentle',
        urgency: 'medium',
        personalizedContext: `${t('preferredWorkoutTime')} ${user?.behavioral?.preferredWorkoutTime || 'morning'}`
      }
    ];
    setConversationalNudges(mockNudges);
  }, [user, t]);

  const handleSend = async () => {
    if (!message.trim() || isLoading) return;
    
    const userMessage: ChatMessage = { 
      id: Date.now().toString(), 
      sender: 'user', 
      text: message,
      timestamp: new Date()
    };
    
    setChatHistory(prev => [...prev, userMessage]);
    setMessage('');
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockResponses = [
        `${t('greatProgress')} ${t('primaryFocus')} ${user?.goalPersonalization?.primaryFocus || t('wellness')}.`,
        `${t('motivation')} ${user?.behavioral?.motivationStyle || 'supportive'}.`,
        `${t('goalsProgress')} ${(user?.goals || []).length} ${t('goals')}.`,
        `${t('personalWellnessAssistant')} ${t('askAnythingHealth')}`
      ];
      
      const aiMessage: ChatMessage = { 
        id: (Date.now() + 1).toString(), 
        sender: 'ai', 
        text: mockResponses[Math.floor(Math.random() * mockResponses.length)],
        timestamp: new Date(),
        actionItems: [
          t('goalsProgress'),
          t('progressTracking'),
          t('reminder')
        ],
        suggestions: [
          t('goalProgress'),
          t('motivation'),
          t('newPlan'),
          t('dailyFocus')
        ],
      };
      
      setChatHistory(prev => [...prev, aiMessage]);
      
    } catch (error) {
      console.error('Error in AI chat:', error);
      
      const fallbackMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: `${t('connectionError')} ${user?.name || t('friend')}. ${t('primaryFocus')} ${user?.goalPersonalization?.primaryFocus || t('wellness')} ${t('today')}.`,
        timestamp: new Date(),
        suggestions: [
          t('goalProgress'),
          t('motivation'),
          t('newPlan'),
          t('dailyFocus')
        ]
      };
      
      setChatHistory(prev => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSuggestionPress = (suggestionText: string) => {
    if (isLoading) return;
    setMessage(suggestionText);
  };

  const handleNudgePress = (nudge: ConversationalNudge) => {
    setMessage(`${nudge.message}`);
    setShowNudges(false);
  };

  const handleCreatePlan = async (planId: string) => {
    try {
      Alert.alert(t('planCreated'), t('personalizedPlanCreated'));
    } catch (error) {
      Alert.alert(t('error'), t('failedToCreatePlan'));
    }
  };

  const renderActionItems = (actionItems?: string[]) => {
    if (!actionItems || actionItems.length === 0) return null;
    
    return (
      <View style={styles.actionItemsContainer}>
        <Text style={[styles.actionItemsTitle, isRTLLayout && styles.textRTL]}>{t('quickActions')}:</Text>
        {actionItems.map((item, index) => (
          <TouchableOpacity 
            key={index} 
            style={[styles.actionItem, isRTLLayout && styles.actionItemRTL]}
            onPress={() => Alert.alert(t('quickActions'), item)}
          >
            <Target size={14} color={colors.primary} />
            <Text style={[styles.actionItemText, isRTLLayout && styles.textRTL]}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderConversationalNudges = () => {
    if (!showNudges || conversationalNudges.length === 0) return null;

    return (
      <View style={styles.nudgesContainer}>
        <View style={[styles.nudgesHeader, isRTLLayout && styles.nudgesHeaderRTL]}>
          <Sparkles size={20} color={colors.primary} />
          <Text style={[styles.nudgesTitle, isRTLLayout && styles.textRTL]}>{t('personalizedInsights')}</Text>
        </View>
        {conversationalNudges.slice(0, 2).map((nudge) => (
          <TouchableOpacity 
            key={nudge.id} 
            style={styles.nudgeCard}
            onPress={() => handleNudgePress(nudge)}
          >
            <Text style={[styles.nudgeMessage, isRTLLayout && styles.textRTL]}>{nudge.message}</Text>
            <Text style={[styles.nudgeContext, isRTLLayout && styles.textRTL]}>{nudge.personalizedContext}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };
  
  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      {/* Modern Header */}
      <View style={[styles.header, isRTLLayout && styles.headerRTL]}>
        <View style={styles.headerContent}>
          <Text style={[styles.headerTitle, isRTLLayout && styles.textRTL]}>{t('aiHealthCoach')}</Text>
          <Text style={[styles.headerSubtitle, isRTLLayout && styles.textRTL]}>{t('personalWellnessAssistant')}</Text>
        </View>
        <View style={[styles.aiInfoContainer, isRTLLayout && styles.aiInfoContainerRTL]}>
          <View style={styles.aiAvatarContainer}>
            <Brain size={24} color={colors.primary} />
          </View>
          <View>
            <Text style={[styles.aiName, isRTLLayout && styles.textRTL]}>{t('oneHealthAI')}</Text>
            <View style={[styles.statusContainer, isRTLLayout && styles.statusContainerRTL]}>
              <View style={styles.statusDot} />
              <Text style={[styles.aiStatus, isRTLLayout && styles.textRTL]}>{t('onlineReady')}</Text>
            </View>
          </View>
        </View>
      </View>

      {renderConversationalNudges()}
      
      <ScrollView 
        style={styles.chatContainer}
        contentContainerStyle={styles.chatContent}
        showsVerticalScrollIndicator={false}
      >
        {chatHistory.map(chat => (
          <View key={chat.id}>
            <View 
              style={[
                styles.messageBubble,
                chat.sender === 'user' ? styles.userBubble : styles.aiBubble,
                isRTLLayout && (chat.sender === 'user' ? styles.userBubbleRTL : styles.aiBubbleRTL)
              ]}
            >
              <Text style={[
                styles.messageText,
                chat.sender === 'user' ? styles.userText : styles.aiText,
                isRTLLayout && styles.textRTL
              ]}>
                {chat.text}
              </Text>
              <Text style={[
                styles.timestamp,
                chat.sender === 'user' ? styles.userTimestamp : styles.aiTimestamp,
                isRTLLayout && styles.timestampRTL
              ]}>
                {chat.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Text>
            </View>
            
            {chat.sender === 'ai' && renderActionItems(chat.actionItems)}
            
            {chat.sender === 'ai' && chat.suggestions && (
              <View style={styles.suggestionsInChat}>
                {chat.suggestions.slice(0, 2).map((suggestion, index) => (
                  <TouchableOpacity 
                    key={index}
                    style={styles.inlineSuggestion}
                    onPress={() => handleSuggestionPress(suggestion)}
                  >
                    <Text style={[styles.inlineSuggestionText, isRTLLayout && styles.textRTL]}>{suggestion}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        ))}
        
        {isLoading && (
          <View style={[styles.messageBubble, styles.aiBubble, isRTLLayout && styles.aiBubbleRTL]}>
            <View style={[styles.loadingContainer, isRTLLayout && styles.loadingContainerRTL]}>
              <ActivityIndicator size="small" color={colors.primary} />
              <Text style={[styles.loadingText, isRTLLayout && styles.textRTL]}>{t('aiThinking')}</Text>
            </View>
          </View>
        )}
      </ScrollView>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, isRTLLayout && styles.inputRTL]}
          value={message}
          onChangeText={setMessage}
          placeholder={`${t('askAnythingHealth')}, ${user?.name || t('friend')}...`}
          placeholderTextColor={colors.textSecondary}
          multiline
          editable={!isLoading}
        />
        <TouchableOpacity 
          style={[
            styles.sendButton,
            (!message.trim() || isLoading) && styles.sendButtonDisabled
          ]}
          onPress={handleSend}
          disabled={!message.trim() || isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color={colors.textSecondary} />
          ) : (
            <Send size={20} color={!message.trim() ? colors.textSecondary : colors.black} />
          )}
        </TouchableOpacity>
      </View>
      
      <View style={styles.quickActionsContainer}>
        <ScrollView 
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.quickActionsContent}
        >
          <TouchableOpacity 
            style={styles.quickActionButton}
            onPress={() => handleSuggestionPress(t('goalProgress'))}
            disabled={isLoading}
          >
            <TrendingUp size={16} color={colors.primary} />
            <Text style={[styles.quickActionText, isRTLLayout && styles.textRTL]}>{t('goalProgress')}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.quickActionButton}
            onPress={() => handleSuggestionPress(t('motivation'))}
            disabled={isLoading}
          >
            <Heart size={16} color={colors.primary} />
            <Text style={[styles.quickActionText, isRTLLayout && styles.textRTL]}>{t('motivation')}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.quickActionButton}
            onPress={() => handleSuggestionPress(t('newPlan'))}
            disabled={isLoading}
          >
            <Target size={16} color={colors.primary} />
            <Text style={[styles.quickActionText, isRTLLayout && styles.textRTL]}>{t('newPlan')}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.quickActionButton}
            onPress={() => handleSuggestionPress(t('dailyFocus'))}
            disabled={isLoading}
          >
            <Zap size={16} color={colors.primary} />
            <Text style={[styles.quickActionText, isRTLLayout && styles.textRTL]}>{t('dailyFocus')}</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerRTL: {
    flexDirection: 'row-reverse',
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
  },
  headerSubtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 2,
  },
  textRTL: {
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  aiInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  aiInfoContainerRTL: {
    flexDirection: 'row-reverse',
  },
  aiAvatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: `${colors.primary}20`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  aiName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  statusContainerRTL: {
    flexDirection: 'row-reverse',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.success,
    marginRight: 6,
  },
  aiStatus: {
    fontSize: 12,
    color: colors.success,
    fontWeight: '500',
  },
  nudgesContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: `${colors.primary}05`,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  nudgesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  nudgesHeaderRTL: {
    flexDirection: 'row-reverse',
  },
  nudgesTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 8,
  },
  nudgeCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    padding: 16,
    marginBottom: 8,
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
  },
  nudgeMessage: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 4,
    lineHeight: 20,
  },
  nudgeContext: {
    fontSize: 12,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
  chatContainer: {
    flex: 1,
  },
  chatContent: {
    padding: 20,
  },
  messageBubble: {
    maxWidth: '85%',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 12,
  },
  userBubble: {
    backgroundColor: colors.primary,
    alignSelf: 'flex-end',
    borderBottomRightRadius: 6,
  },
  userBubbleRTL: {
    alignSelf: 'flex-start',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 6,
  },
  aiBubble: {
    backgroundColor: colors.cardBackground,
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 6,
    borderWidth: 1,
    borderColor: colors.border,
  },
  aiBubbleRTL: {
    alignSelf: 'flex-end',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 6,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  userText: {
    color: colors.black,
  },
  aiText: {
    color: colors.text,
  },
  timestamp: {
    fontSize: 12,
    marginTop: 6,
    opacity: 0.7,
  },
  timestampRTL: {
    textAlign: 'left',
  },
  userTimestamp: {
    color: colors.black,
    textAlign: 'right',
  },
  aiTimestamp: {
    color: colors.textSecondary,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loadingContainerRTL: {
    flexDirection: 'row-reverse',
  },
  loadingText: {
    fontSize: 14,
    color: colors.textSecondary,
    fontStyle: 'italic',
    marginLeft: 8,
  },
  actionItemsContainer: {
    marginLeft: 20,
    marginBottom: 16,
    backgroundColor: `${colors.primary}10`,
    borderRadius: 16,
    padding: 16,
    maxWidth: '85%',
    borderWidth: 1,
    borderColor: `${colors.primary}20`,
  },
  actionItemsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: 12,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
  },
  actionItemRTL: {
    flexDirection: 'row-reverse',
  },
  actionItemText: {
    fontSize: 14,
    color: colors.text,
    marginLeft: 8,
    lineHeight: 20,
  },
  suggestionsInChat: {
    marginLeft: 20,
    marginBottom: 16,
    maxWidth: '85%',
  },
  inlineSuggestion: {
    backgroundColor: `${colors.primary}15`,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: `${colors.primary}30`,
  },
  inlineSuggestionText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.background,
  },
  input: {
    flex: 1,
    backgroundColor: colors.cardBackground,
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: colors.text,
    maxHeight: 100,
    fontSize: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  inputRTL: {
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  sendButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  sendButtonDisabled: {
    backgroundColor: colors.cardBackground,
  },
  quickActionsContainer: {
    paddingVertical: 12,
    backgroundColor: colors.background,
  },
  quickActionsContent: {
    paddingHorizontal: 20,
  },
  quickActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  quickActionText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 6,
  },
});