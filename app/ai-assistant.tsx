import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { colors } from '@/constants/colors';
import { router } from 'expo-router';
import { ArrowLeft, MessageSquare, Mic, Sparkles } from 'lucide-react-native';

export default function AIAssistantScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Virtual Assistant</Text>
      </View>
      
      <ScrollView 
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.assistantContainer}>
          <View style={styles.aiIconContainer}>
            <Sparkles size={48} color={colors.primary} />
          </View>
        </View>
        
        <View style={styles.optionsContainer}>
          <TouchableOpacity 
            style={styles.optionButton}
            onPress={() => router.push('/(tabs)/ai-chat')}
          >
            <View style={styles.optionIconContainer}>
              <MessageSquare size={24} color={colors.primary} />
            </View>
            <Text style={styles.optionText}>Chat with Assistant</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.optionButton}>
            <View style={styles.optionIconContainer}>
              <Mic size={24} color={colors.primary} />
            </View>
            <Text style={styles.optionText}>Talk with Assistant</Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity 
          style={styles.startButton}
          onPress={() => router.push('/(tabs)/ai-chat')}
        >
          <Text style={styles.startButtonText}>Start Conversation</Text>
        </TouchableOpacity>
        
        <View style={styles.featuresContainer}>
          <Text style={styles.featuresTitle}>What can I help you with?</Text>
          
          <View style={styles.featureItem}>
            <View style={styles.featureDot} />
            <Text style={styles.featureText}>Create personalized fitness plans</Text>
          </View>
          
          <View style={styles.featureItem}>
            <View style={styles.featureDot} />
            <Text style={styles.featureText}>Provide nutrition advice and meal plans</Text>
          </View>
          
          <View style={styles.featureItem}>
            <View style={styles.featureDot} />
            <Text style={styles.featureText}>Track your progress and suggest improvements</Text>
          </View>
          
          <View style={styles.featureItem}>
            <View style={styles.featureDot} />
            <Text style={styles.featureText}>Answer fitness and health questions</Text>
          </View>
          
          <View style={styles.featureItem}>
            <View style={styles.featureDot} />
            <Text style={styles.featureText}>Motivate you to achieve your goals</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  assistantContainer: {
    alignItems: 'center',
    marginVertical: 40,
  },
  aiIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: `${colors.primary}20`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  optionButton: {
    width: '48%',
    alignItems: 'center',
  },
  optionIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: `${colors.primary}20`,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  optionText: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '500',
  },
  startButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 32,
  },
  startButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.black,
  },
  featuresContainer: {
    
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
    marginRight: 12,
  },
  featureText: {
    fontSize: 16,
    color: colors.text,
  },
});