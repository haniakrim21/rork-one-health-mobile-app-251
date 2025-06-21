import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Platform } from 'react-native';
import { useLocalSearchParams, router, Stack } from 'expo-router';
import { colors } from '@/constants/colors';
import { Card } from '@/components/Card';
import { ProgressBar } from '@/components/ProgressBar';
import { 
  Play, 
  Pause, 
  SkipForward, 
  RotateCcw, 
  X,
  Timer,
  CheckCircle2,
  Camera,
  Eye,
  Zap,
  Heart,
  Activity,
  TrendingUp
} from 'lucide-react-native';

export default function FitnessSessionScreen() {
  const { id } = useLocalSearchParams();
  const [currentExercise, setCurrentExercise] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [isResting, setIsResting] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [formScore, setFormScore] = useState(85);
  const [heartRate, setHeartRate] = useState(120);
  const [caloriesBurned, setCaloriesBurned] = useState(0);
  const [isComputerVisionActive, setIsComputerVisionActive] = useState(false);
  const [adaptiveAdjustments, setAdaptiveAdjustments] = useState(0);
  
  // Mock workout data with AI enhancements
  const workout = {
    id: id,
    title: 'AI Upper Body Strength',
    isAI: true,
    exercises: [
      { 
        name: 'Push-ups', 
        sets: 3, 
        reps: '12-15', 
        rest: 60,
        formTips: 'Keep core tight, elbows close to body',
        adaptiveRange: [10, 20],
        targetMuscles: ['Chest', 'Triceps', 'Shoulders']
      },
      { 
        name: 'Dumbbell Press', 
        sets: 3, 
        reps: '10-12', 
        rest: 90,
        formTips: 'Control the weight, full range of motion',
        adaptiveRange: [8, 15],
        targetMuscles: ['Chest', 'Shoulders', 'Triceps']
      },
      { 
        name: 'Pull-ups', 
        sets: 3, 
        reps: '8-10', 
        rest: 90,
        formTips: 'Pull with your back, not arms',
        adaptiveRange: [5, 12],
        targetMuscles: ['Lats', 'Biceps', 'Rhomboids']
      },
      { 
        name: 'Shoulder Press', 
        sets: 3, 
        reps: '10-12', 
        rest: 60,
        formTips: 'Press straight up, engage core',
        adaptiveRange: [8, 15],
        targetMuscles: ['Shoulders', 'Triceps', 'Core']
      },
      { 
        name: 'Tricep Dips', 
        sets: 3, 
        reps: '12-15', 
        rest: 60,
        formTips: 'Lower slowly, push through heels',
        adaptiveRange: [10, 20],
        targetMuscles: ['Triceps', 'Shoulders', 'Chest']
      },
    ],
  };
  
  const currentExerciseData = workout.exercises[currentExercise];
  const totalExercises = workout.exercises.length;
  const totalSets = workout.exercises.reduce((sum, ex) => sum + ex.sets, 0);
  const completedSets = workout.exercises.slice(0, currentExercise).reduce((sum, ex) => sum + ex.sets, 0) + (currentSet - 1);
  const progress = (completedSets / totalSets) * 100;
  
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => {
          if (prev <= 1) {
            setIsPlaying(false);
            setIsResting(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isPlaying, timer]);

  // Simulate real-time metrics
  useEffect(() => {
    if (sessionStarted && !isResting) {
      const metricsInterval = setInterval(() => {
        setHeartRate(prev => Math.max(100, Math.min(180, prev + (Math.random() - 0.5) * 10)));
        setCaloriesBurned(prev => prev + 0.1);
        setFormScore(prev => Math.max(70, Math.min(100, prev + (Math.random() - 0.5) * 5)));
      }, 2000);
      
      return () => clearInterval(metricsInterval);
    }
  }, [sessionStarted, isResting]);
  
  const startSession = () => {
    setSessionStarted(true);
  };
  
  const startRest = () => {
    setIsResting(true);
    setTimer(currentExerciseData.rest);
    setIsPlaying(true);
  };
  
  const completeSet = () => {
    if (currentSet < currentExerciseData.sets) {
      setCurrentSet(prev => prev + 1);
      startRest();
      
      // AI adaptive adjustment
      if (formScore > 90 && heartRate < 140) {
        setAdaptiveAdjustments(prev => prev + 1);
        Alert.alert(
          'AI Adjustment',
          'Great form! AI suggests increasing reps by 2 for next set.',
          [{ text: 'Accept', onPress: () => {} }, { text: 'Keep Current', onPress: () => {} }]
        );
      }
    } else {
      // Move to next exercise
      if (currentExercise < totalExercises - 1) {
        setCurrentExercise(prev => prev + 1);
        setCurrentSet(1);
      } else {
        // Workout complete
        Alert.alert(
          'Workout Complete!',
          `Great job! You burned ${Math.round(caloriesBurned)} calories with ${adaptiveAdjustments} AI adjustments.`,
          [
            { text: 'View Summary', onPress: () => router.back() },
            { text: 'Done', onPress: () => router.back() }
          ]
        );
      }
    }
  };
  
  const skipExercise = () => {
    if (currentExercise < totalExercises - 1) {
      setCurrentExercise(prev => prev + 1);
      setCurrentSet(1);
      setIsResting(false);
      setIsPlaying(false);
      setTimer(0);
    }
  };
  
  const restartExercise = () => {
    setCurrentSet(1);
    setIsResting(false);
    setIsPlaying(false);
    setTimer(0);
  };
  
  const toggleComputerVision = () => {
    if (Platform.OS === 'web') {
      Alert.alert('Computer Vision', 'Computer vision form tracking is not available on web platform.');
      return;
    }
    setIsComputerVisionActive(!isComputerVisionActive);
  };
  
  const exitSession = () => {
    Alert.alert(
      'Exit Workout',
      'Are you sure you want to exit? Your progress will be lost.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Exit', style: 'destructive', onPress: () => router.back() }
      ]
    );
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  if (!sessionStarted) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: workout.title }} />
        
        <View style={styles.startContainer}>
          <Text style={styles.workoutTitle}>{workout.title}</Text>
          <Text style={styles.workoutSubtitle}>
            {totalExercises} exercises • {totalSets} total sets
          </Text>
          
          {workout.isAI && (
            <Card style={styles.aiCard}>
              <View style={styles.aiHeader}>
                <Zap size={20} color={colors.primary} />
                <Text style={styles.aiTitle}>AI-Powered Workout</Text>
              </View>
              <Text style={styles.aiText}>
                This workout adapts in real-time based on your performance, form, and heart rate.
              </Text>
            </Card>
          )}
          
          <Card style={styles.readyCard}>
            <Text style={styles.readyTitle}>Ready to start?</Text>
            <Text style={styles.readyText}>
              Make sure you have all the equipment ready and enough space to perform the exercises safely.
            </Text>
            
            <View style={styles.featuresContainer}>
              <View style={styles.featureItem}>
                <Camera size={16} color={colors.primary} />
                <Text style={styles.featureText}>Form Tracking</Text>
              </View>
              <View style={styles.featureItem}>
                <Heart size={16} color={colors.primary} />
                <Text style={styles.featureText}>Heart Rate Monitor</Text>
              </View>
              <View style={styles.featureItem}>
                <TrendingUp size={16} color={colors.primary} />
                <Text style={styles.featureText}>Adaptive AI</Text>
              </View>
            </View>
          </Card>
          
          <TouchableOpacity style={styles.startButton} onPress={startSession}>
            <Play size={24} color={colors.black} fill={colors.black} />
            <Text style={styles.startButtonText}>Start AI Workout</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'AI Workout Session', headerShown: false }} />
      
      <View style={styles.header}>
        <TouchableOpacity style={styles.exitButton} onPress={exitSession}>
          <X size={24} color={colors.text} />
        </TouchableOpacity>
        
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            Exercise {currentExercise + 1} of {totalExercises}
          </Text>
          <ProgressBar progress={progress} fillColor={colors.primary} />
        </View>
      </View>

      {/* Real-time Metrics */}
      <View style={styles.metricsContainer}>
        <View style={styles.metricItem}>
          <Heart size={16} color={colors.error} />
          <Text style={styles.metricValue}>{heartRate}</Text>
          <Text style={styles.metricLabel}>BPM</Text>
        </View>
        <View style={styles.metricItem}>
          <Activity size={16} color={colors.warning} />
          <Text style={styles.metricValue}>{Math.round(caloriesBurned)}</Text>
          <Text style={styles.metricLabel}>Cal</Text>
        </View>
        <View style={styles.metricItem}>
          <Eye size={16} color={colors.success} />
          <Text style={styles.metricValue}>{formScore}%</Text>
          <Text style={styles.metricLabel}>Form</Text>
        </View>
      </View>
      
      <View style={styles.content}>
        <Card style={styles.exerciseCard}>
          <View style={styles.exerciseHeader}>
            <Text style={styles.exerciseName}>{currentExerciseData.name}</Text>
            <TouchableOpacity 
              style={[styles.visionButton, isComputerVisionActive && styles.visionButtonActive]}
              onPress={toggleComputerVision}
            >
              <Camera size={16} color={isComputerVisionActive ? colors.black : colors.primary} />
            </TouchableOpacity>
          </View>
          <Text style={styles.setInfo}>
            Set {currentSet} of {currentExerciseData.sets}
          </Text>
          <Text style={styles.repsInfo}>{currentExerciseData.reps} reps</Text>
          
          <View style={styles.muscleTargets}>
            <Text style={styles.muscleTitle}>Target Muscles:</Text>
            <View style={styles.muscleList}>
              {currentExerciseData.targetMuscles.map(muscle => (
                <View key={muscle} style={styles.muscleTag}>
                  <Text style={styles.muscleText}>{muscle}</Text>
                </View>
              ))}
            </View>
          </View>
          
          <View style={styles.formTip}>
            <Text style={styles.formTipTitle}>💡 Form Tip:</Text>
            <Text style={styles.formTipText}>{currentExerciseData.formTips}</Text>
          </View>
        </Card>
        
        {isResting && (
          <Card style={styles.restCard}>
            <View style={styles.restHeader}>
              <Timer size={24} color={colors.primary} />
              <Text style={styles.restTitle}>Rest Time</Text>
            </View>
            <Text style={styles.restTimer}>{formatTime(timer)}</Text>
            <View style={styles.restControls}>
              <TouchableOpacity 
                style={styles.restControlButton}
                onPress={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? (
                  <Pause size={20} color={colors.primary} />
                ) : (
                  <Play size={20} color={colors.primary} fill={colors.primary} />
                )}
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.restControlButton}
                onPress={() => {
                  setIsResting(false);
                  setIsPlaying(false);
                  setTimer(0);
                }}
              >
                <Text style={styles.skipRestText}>Skip Rest</Text>
              </TouchableOpacity>
            </View>
          </Card>
        )}
        
        {!isResting && (
          <View style={styles.controls}>
            <TouchableOpacity style={styles.completeButton} onPress={completeSet}>
              <CheckCircle2 size={24} color={colors.black} />
              <Text style={styles.completeButtonText}>Complete Set</Text>
            </TouchableOpacity>
            
            <View style={styles.secondaryControls}>
              <TouchableOpacity style={styles.secondaryButton} onPress={restartExercise}>
                <RotateCcw size={20} color={colors.textSecondary} />
                <Text style={styles.secondaryButtonText}>Restart</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.secondaryButton} onPress={skipExercise}>
                <SkipForward size={20} color={colors.textSecondary} />
                <Text style={styles.secondaryButtonText}>Skip</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        
        <Card style={styles.nextExerciseCard}>
          <Text style={styles.nextExerciseTitle}>Next Exercise</Text>
          <Text style={styles.nextExerciseName}>
            {currentExercise < totalExercises - 1 
              ? workout.exercises[currentExercise + 1].name 
              : 'Workout Complete!'
            }
          </Text>
        </Card>

        {adaptiveAdjustments > 0 && (
          <Card style={styles.aiInsightCard}>
            <View style={styles.aiInsightHeader}>
              <Zap size={16} color={colors.primary} />
              <Text style={styles.aiInsightTitle}>AI Insights</Text>
            </View>
            <Text style={styles.aiInsightText}>
              {adaptiveAdjustments} adaptive adjustments made based on your performance
            </Text>
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
  startContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  workoutTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  workoutSubtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
  },
  aiCard: {
    width: '100%',
    marginBottom: 16,
    alignItems: 'center',
  },
  aiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  aiTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 8,
  },
  aiText: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  readyCard: {
    width: '100%',
    marginBottom: 32,
    alignItems: 'center',
  },
  readyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  readyText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 16,
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  featureItem: {
    alignItems: 'center',
  },
  featureText: {
    fontSize: 12,
    color: colors.text,
    marginTop: 4,
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    marginBottom: 16,
    width: '100%',
  },
  startButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.black,
    marginLeft: 8,
  },
  cancelButton: {
    paddingVertical: 12,
  },
  cancelButtonText: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  exitButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.cardBackground,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  progressContainer: {
    flex: 1,
  },
  progressText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  metricsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.cardBackground,
    marginHorizontal: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  metricItem: {
    alignItems: 'center',
  },
  metricValue: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginVertical: 4,
  },
  metricLabel: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  exerciseCard: {
    alignItems: 'center',
    marginBottom: 24,
    paddingVertical: 32,
  },
  exerciseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 12,
  },
  exerciseName: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
    flex: 1,
  },
  visionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
  },
  visionButtonActive: {
    backgroundColor: colors.primary,
  },
  setInfo: {
    fontSize: 18,
    color: colors.primary,
    fontWeight: '600',
    marginBottom: 8,
  },
  repsInfo: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 16,
  },
  muscleTargets: {
    width: '100%',
    marginBottom: 16,
  },
  muscleTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  muscleList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  muscleTag: {
    backgroundColor: colors.primary + '20',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 4,
  },
  muscleText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '500',
  },
  formTip: {
    width: '100%',
    backgroundColor: colors.warning + '10',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: colors.warning,
  },
  formTipTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  formTipText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  restCard: {
    alignItems: 'center',
    marginBottom: 24,
    paddingVertical: 32,
  },
  restHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  restTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 8,
  },
  restTimer: {
    fontSize: 48,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 24,
  },
  restControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  restControlButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 12,
  },
  skipRestText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
  controls: {
    marginBottom: 24,
  },
  completeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  completeButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.black,
    marginLeft: 8,
  },
  secondaryControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  secondaryButtonText: {
    fontSize: 16,
    color: colors.textSecondary,
    marginLeft: 8,
  },
  nextExerciseCard: {
    alignItems: 'center',
    marginBottom: 16,
  },
  nextExerciseTitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  nextExerciseName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  aiInsightCard: {
    
  },
  aiInsightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  aiInsightTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 8,
  },
  aiInsightText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
});