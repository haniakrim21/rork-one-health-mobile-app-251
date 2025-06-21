import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';
import { colors } from '@/constants/colors';
import { Card } from '@/components/Card';
import { ProgressBar } from '@/components/ProgressBar';
import { 
  ArrowLeft, 
  Activity, 
  Heart, 
  Zap, 
  Target,
  Timer,
  TrendingUp,
  Award,
  Play,
  CheckCircle2
} from 'lucide-react-native';

export default function FitnessAssessmentScreen() {
  const [currentTest, setCurrentTest] = useState(0);
  const [assessmentStarted, setAssessmentStarted] = useState(false);
  const [testResults, setTestResults] = useState<any[]>([]);
  const [isTestActive, setIsTestActive] = useState(false);
  const [timer, setTimer] = useState(0);
  
  const assessmentTests = [
    {
      id: 'pushups',
      name: 'Push-up Test',
      description: 'Maximum push-ups in 60 seconds',
      duration: 60,
      instructions: [
        'Start in plank position with hands shoulder-width apart',
        'Lower chest to ground, keeping body straight',
        'Push back up to starting position',
        'Count each complete repetition',
      ],
      metric: 'repetitions',
      icon: Activity,
    },
    {
      id: 'plank',
      name: 'Plank Hold',
      description: 'Hold plank position as long as possible',
      duration: 300, // 5 minutes max
      instructions: [
        'Start in forearm plank position',
        'Keep body in straight line from head to heels',
        'Engage core and hold position',
        'Stop when form breaks down',
      ],
      metric: 'seconds',
      icon: Timer,
    },
    {
      id: 'burpees',
      name: 'Burpee Test',
      description: 'Maximum burpees in 3 minutes',
      duration: 180,
      instructions: [
        'Start standing, drop to squat position',
        'Jump back to plank, do push-up',
        'Jump feet back to squat, then jump up',
        'Count each complete burpee',
      ],
      metric: 'repetitions',
      icon: Zap,
    },
    {
      id: 'flexibility',
      name: 'Sit and Reach',
      description: 'Measure forward flexibility',
      duration: 30,
      instructions: [
        'Sit with legs extended, feet against wall',
        'Slowly reach forward as far as possible',
        'Hold the furthest position for 3 seconds',
        'Measure distance reached',
      ],
      metric: 'centimeters',
      icon: Target,
    },
  ];
  
  const currentTestData = assessmentTests[currentTest];
  const progress = ((currentTest + (isTestActive ? 0.5 : 0)) / assessmentTests.length) * 100;
  
  const startAssessment = () => {
    setAssessmentStarted(true);
  };
  
  const startTest = () => {
    setIsTestActive(true);
    setTimer(currentTestData.duration);
    
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          completeTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };
  
  const completeTest = () => {
    setIsTestActive(false);
    
    // Mock result input - in real app, this would be user input
    const mockResult = {
      testId: currentTestData.id,
      value: Math.floor(Math.random() * 50) + 20, // Random result for demo
      metric: currentTestData.metric,
    };
    
    setTestResults(prev => [...prev, mockResult]);
    
    if (currentTest < assessmentTests.length - 1) {
      setTimeout(() => {
        setCurrentTest(prev => prev + 1);
      }, 2000);
    } else {
      // Assessment complete
      setTimeout(() => {
        showResults();
      }, 2000);
    }
  };
  
  const showResults = () => {
    const overallScore = calculateOverallScore();
    Alert.alert(
      'Assessment Complete!',
      `Your fitness score: ${overallScore}/100\n\nPersonalized training plan has been generated based on your results.`,
      [
        { text: 'View Plan', onPress: () => router.push('/ai-training-plan') },
        { text: 'Done', onPress: () => router.back() }
      ]
    );
  };
  
  const calculateOverallScore = () => {
    // Mock calculation - in real app, this would use proper scoring algorithms
    const scores = testResults.map(result => {
      switch (result.testId) {
        case 'pushups':
          return Math.min(100, (result.value / 30) * 100);
        case 'plank':
          return Math.min(100, (result.value / 120) * 100);
        case 'burpees':
          return Math.min(100, (result.value / 40) * 100);
        case 'flexibility':
          return Math.min(100, (result.value / 25) * 100);
        default:
          return 50;
      }
    });
    
    return Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length);
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  if (!assessmentStarted) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Fitness Assessment</Text>
          <View style={styles.headerRight} />
        </View>
        
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <Card style={styles.introCard}>
            <View style={styles.introHeader}>
              <Award size={32} color={colors.primary} />
              <Text style={styles.introTitle}>Fitness Assessment</Text>
            </View>
            <Text style={styles.introText}>
              Complete a comprehensive fitness assessment to get your personalized training plan. 
              This assessment will evaluate your strength, endurance, and flexibility.
            </Text>
            
            <View style={styles.benefitsContainer}>
              <Text style={styles.benefitsTitle}>What you'll get:</Text>
              <View style={styles.benefitItem}>
                <CheckCircle2 size={16} color={colors.success} />
                <Text style={styles.benefitText}>Personalized fitness score</Text>
              </View>
              <View style={styles.benefitItem}>
                <CheckCircle2 size={16} color={colors.success} />
                <Text style={styles.benefitText}>AI-generated training plan</Text>
              </View>
              <View style={styles.benefitItem}>
                <CheckCircle2 size={16} color={colors.success} />
                <Text style={styles.benefitText}>Strength & weakness analysis</Text>
              </View>
              <View style={styles.benefitItem}>
                <CheckCircle2 size={16} color={colors.success} />
                <Text style={styles.benefitText}>Progress tracking baseline</Text>
              </View>
            </View>
          </Card>
          
          <Card style={styles.testsCard}>
            <Text style={styles.testsTitle}>Assessment Tests ({assessmentTests.length})</Text>
            {assessmentTests.map((test, index) => (
              <View key={test.id} style={styles.testItem}>
                <View style={styles.testIcon}>
                  <test.icon size={20} color={colors.primary} />
                </View>
                <View style={styles.testInfo}>
                  <Text style={styles.testName}>{test.name}</Text>
                  <Text style={styles.testDescription}>{test.description}</Text>
                </View>
                <Text style={styles.testDuration}>
                  {test.duration < 60 ? `${test.duration}s` : `${Math.floor(test.duration / 60)}m`}
                </Text>
              </View>
            ))}
          </Card>
          
          <TouchableOpacity style={styles.startButton} onPress={startAssessment}>
            <Play size={20} color={colors.black} fill={colors.black} />
            <Text style={styles.startButtonText}>Start Assessment</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Assessment</Text>
        <View style={styles.headerRight} />
      </View>
      
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>
          Test {currentTest + 1} of {assessmentTests.length}
        </Text>
        <ProgressBar progress={progress} fillColor={colors.primary} />
      </View>
      
      <View style={styles.content}>
        <Card style={styles.testCard}>
          <View style={styles.testHeader}>
            <currentTestData.icon size={32} color={colors.primary} />
            <Text style={styles.testTitle}>{currentTestData.name}</Text>
          </View>
          <Text style={styles.testDesc}>{currentTestData.description}</Text>
          
          {isTestActive && (
            <View style={styles.timerContainer}>
              <Text style={styles.timerText}>{formatTime(timer)}</Text>
              <Text style={styles.timerLabel}>Time Remaining</Text>
            </View>
          )}
          
          <View style={styles.instructionsContainer}>
            <Text style={styles.instructionsTitle}>Instructions:</Text>
            {currentTestData.instructions.map((instruction, index) => (
              <View key={index} style={styles.instructionItem}>
                <Text style={styles.instructionNumber}>{index + 1}.</Text>
                <Text style={styles.instructionText}>{instruction}</Text>
              </View>
            ))}
          </View>
        </Card>
        
        {!isTestActive ? (
          <TouchableOpacity style={styles.startTestButton} onPress={startTest}>
            <Play size={20} color={colors.black} fill={colors.black} />
            <Text style={styles.startTestButtonText}>Start Test</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.completeTestButton} onPress={completeTest}>
            <CheckCircle2 size={20} color={colors.black} />
            <Text style={styles.completeTestButtonText}>Complete Test</Text>
          </TouchableOpacity>
        )}
        
        {testResults.length > 0 && (
          <Card style={styles.resultsCard}>
            <Text style={styles.resultsTitle}>Completed Tests</Text>
            {testResults.map((result, index) => (
              <View key={index} style={styles.resultItem}>
                <Text style={styles.resultName}>
                  {assessmentTests.find(t => t.id === result.testId)?.name}
                </Text>
                <Text style={styles.resultValue}>
                  {result.value} {result.metric}
                </Text>
              </View>
            ))}
          </Card>
        )}
      </View>
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
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingTop: 60,
  },
  backButton: {
    
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  headerRight: {
    width: 24,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  introCard: {
    alignItems: 'center',
    marginBottom: 24,
  },
  introHeader: {
    alignItems: 'center',
    marginBottom: 16,
  },
  introTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginTop: 8,
  },
  introText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  benefitsContainer: {
    width: '100%',
  },
  benefitsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  benefitText: {
    fontSize: 14,
    color: colors.text,
    marginLeft: 8,
  },
  testsCard: {
    marginBottom: 24,
  },
  testsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  testItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  testIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  testInfo: {
    flex: 1,
  },
  testName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  testDescription: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  testDuration: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
  },
  startButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.black,
    marginLeft: 8,
  },
  progressContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  progressText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  testCard: {
    alignItems: 'center',
    marginBottom: 24,
  },
  testHeader: {
    alignItems: 'center',
    marginBottom: 16,
  },
  testTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginTop: 8,
  },
  testDesc: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  timerText: {
    fontSize: 48,
    fontWeight: '700',
    color: colors.primary,
  },
  timerLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },
  instructionsContainer: {
    width: '100%',
  },
  instructionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  instructionItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  instructionNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
    marginRight: 8,
    minWidth: 20,
  },
  instructionText: {
    fontSize: 14,
    color: colors.textSecondary,
    flex: 1,
    lineHeight: 20,
  },
  startTestButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  startTestButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.black,
    marginLeft: 8,
  },
  completeTestButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.success,
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  completeTestButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.black,
    marginLeft: 8,
  },
  resultsCard: {
    
  },
  resultsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  resultItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  resultName: {
    fontSize: 14,
    color: colors.text,
  },
  resultValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
});