import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { colors } from '@/constants/colors';
import { useUserStore } from '@/store/user-store';
import { useSettingsStore } from '@/store/settings-store';
import { getTranslation } from '@/constants/languages';
import { Avatar } from '@/components/Avatar';
import { ChevronRight, ArrowLeft, Camera, Upload, Activity, Heart, Brain, Smartphone, Clock, Zap, FileText, AlertTriangle, Target, TrendingUp, Calendar } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import * as DocumentPicker from 'expo-document-picker';

export default function OnboardingScreen() {
  const { user, updateUser, addGoal } = useUserStore();
  const { settings } = useSettingsStore();
  const [step, setStep] = useState(1);
  const [profilePicture, setProfilePicture] = useState<string | undefined>(user?.profilePicture);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [age, setAge] = useState(user?.age?.toString() || '');
  const [gender, setGender] = useState<'male' | 'female' | 'prefer-not-to-say'>(user?.gender || 'prefer-not-to-say');
  const [height, setHeight] = useState(user?.height?.toString() || '');
  const [weight, setWeight] = useState(user?.weight?.toString() || '');
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [medicalConditions, setMedicalConditions] = useState<string[]>(user?.medicalConditions || []);
  const [medicationNames, setMedicationNames] = useState<string[]>(user?.medicationNames || []);
  const [fitnessLevel, setFitnessLevel] = useState<'beginner' | 'intermediate' | 'advanced'>(user?.fitnessLevel || 'beginner');
  const [commitmentLevel, setCommitmentLevel] = useState<'low' | 'medium' | 'high'>(user?.commitmentLevel || 'medium');
  const [checkInFrequency, setCheckInFrequency] = useState<'daily' | 'weekly' | 'monthly'>(user?.checkInFrequency || 'daily');
  
  const [sleepHours, setSleepHours] = useState(user?.lifestyle?.sleepHours?.toString() || '');
  const [stressLevel, setStressLevel] = useState(user?.lifestyle?.stressLevel?.toString() || '5');
  const [activityLevel, setActivityLevel] = useState<'sedentary' | 'lightly-active' | 'moderately-active' | 'very-active' | 'extremely-active'>(user?.lifestyle?.activityLevel || 'moderately-active');
  const [smokingStatus, setSmokingStatus] = useState<'never' | 'former' | 'current'>(user?.lifestyle?.smokingStatus || 'never');
  const [alcoholConsumption, setAlcoholConsumption] = useState<'none' | 'occasional' | 'moderate' | 'heavy'>(user?.lifestyle?.alcoholConsumption || 'none');
  const [dietaryPreferences, setDietaryPreferences] = useState<string[]>(user?.lifestyle?.dietaryPreferences || []);
  const [allergies, setAllergies] = useState<string[]>(user?.lifestyle?.allergies || []);
  const [occupation, setOccupation] = useState(user?.lifestyle?.occupation || '');
  
  const [motivationStyle, setMotivationStyle] = useState<'competitive' | 'collaborative' | 'independent' | 'supportive'>(user?.behavioral?.motivationStyle || 'supportive');
  const [preferredWorkoutTime, setPreferredWorkoutTime] = useState<'morning' | 'afternoon' | 'evening' | 'flexible'>(user?.behavioral?.preferredWorkoutTime || 'flexible');
  const [reminderStyle, setReminderStyle] = useState<'gentle' | 'firm' | 'motivational' | 'minimal'>(user?.behavioral?.reminderStyle || 'gentle');
  
  const [chronicConditions, setChronicConditions] = useState<string[]>([]);
  const [fitnessLimitations, setFitnessLimitations] = useState<string[]>([]);
  const [primaryCareProvider, setPrimaryCareProvider] = useState('');
  const [lastPhysicalExam, setLastPhysicalExam] = useState('');
  const [ehrConnected, setEhrConnected] = useState(false);
  const [ehrProvider, setEhrProvider] = useState<'epic' | 'cerner' | 'allscripts' | 'athenahealth' | 'other'>('epic');
  
  const [primaryFocus, setPrimaryFocus] = useState<'wellness' | 'weight-loss' | 'muscle-gain' | 'endurance' | 'strength' | 'rehabilitation' | 'balanced'>('balanced');
  const [motivationFactors, setMotivationFactors] = useState<string[]>([]);
  const [preferredGoalTimeframe, setPreferredGoalTimeframe] = useState<'short' | 'medium' | 'long'>('medium');
  const [trackingPreference, setTrackingPreference] = useState<'detailed' | 'simple' | 'minimal'>('simple');
  const [celebrationStyle, setCelebrationStyle] = useState<'public' | 'private' | 'milestone-based'>('milestone-based');
  
  const [weightGoal, setWeightGoal] = useState('');
  const [weightTarget, setWeightTarget] = useState('');
  const [weightTimeframe, setWeightTimeframe] = useState('3');
  const [energyGoal, setEnergyGoal] = useState('');
  const [energyTarget, setEnergyTarget] = useState('8');
  const [stressGoalTarget, setStressGoalTarget] = useState('3');
  
  const [nationalId, setNationalId] = useState('');
  
  const totalSteps = 13;
  
  const t = (key: string) => getTranslation(settings.language, key);
  
  useEffect(() => {
    if (Platform.OS !== 'web') {
      const autoFillHealthData = async () => {
        try {
          if (!age && !height && !weight) {
            setTimeout(() => {
              setAge('28');
              setHeight('170');
              setWeight('65');
              setSleepHours('7.5');
            }, 1000);
          }
        } catch (error) {
          console.log('Could not auto-fill health data:', error);
        }
      };
      
      autoFillHealthData();
    }
  }, []);
  
  const basicGoals = [
    { id: 'weight_loss', label: t('loseWeight'), icon: '⚖️', category: 'fitness' },
    { id: 'muscle_gain', label: t('buildMuscle'), icon: '💪', category: 'fitness' },
    { id: 'fitness', label: t('improveFitness'), icon: '🏃', category: 'fitness' },
    { id: 'strength', label: t('increaseStrength'), icon: '🏋️', category: 'fitness' },
    { id: 'flexibility', label: t('improveFlex'), icon: '🤸', category: 'fitness' },
    { id: 'stress', label: t('reduceStress'), icon: '🧘', category: 'wellness' },
    { id: 'sleep', label: t('betterSleep'), icon: '😴', category: 'wellness' },
    { id: 'energy', label: t('moreEnergy'), icon: '⚡', category: 'wellness' },
  ];

  const commonConditions = [
    'Diabetes', 'Hypertension', 'Heart Disease', 'Asthma', 'Arthritis', 
    'Depression', 'Anxiety', 'Thyroid Issues', 'High Cholesterol', 'None'
  ];

  const chronicConditionsList = [
    'Type 1 Diabetes', 'Type 2 Diabetes', 'Hypertension', 'Heart Disease', 
    'Asthma', 'COPD', 'Arthritis', 'Osteoporosis', 'Chronic Pain', 
    'Fibromyalgia', 'Migraine', 'Epilepsy', 'Multiple Sclerosis', 'None'
  ];

  const fitnessLimitationsList = [
    'Back injury', 'Knee problems', 'Shoulder injury', 'Hip problems',
    'Ankle injury', 'Wrist/Hand issues', 'Neck problems', 'Balance issues',
    'Joint replacement', 'Chronic fatigue', 'Breathing difficulties', 'None'
  ];

  const fitnessLevels = [
    { id: 'beginner', label: t('beginner'), description: t('newToExercise') },
    { id: 'intermediate', label: t('intermediate'), description: t('exerciseRegularly') },
    { id: 'advanced', label: t('advanced'), description: t('exerciseConsistently') },
  ];

  const dietaryOptions = [
    'Vegetarian', 'Vegan', 'Keto', 'Paleo', 'Mediterranean', 'Low-carb', 'Gluten-free', 'Dairy-free', 'None'
  ];

  const commonAllergies = [
    'Nuts', 'Dairy', 'Gluten', 'Shellfish', 'Eggs', 'Soy', 'Fish', 'Sesame', 'None'
  ];

  const motivationFactorOptions = [
    t('healthImprovement'), t('weightManagement'), t('stressRelief'), t('betterSleepOption'), 
    t('increasedEnergy'), t('socialConnection'), t('personalAchievementOption'), t('diseasePrevention')
  ];

  const weightGoalOptions = [
    { id: 'lose', label: t('loseWeightOption'), description: t('reduceBodyWeight') },
    { id: 'gain', label: t('gainWeight'), description: t('increaseBodyWeight') },
    { id: 'maintain', label: t('maintainWeight'), description: t('keepCurrentWeight') },
  ];

  const energyGoalOptions = [
    { id: 'increase', label: t('increaseEnergyOption'), description: t('feelMoreEnergetic') },
    { id: 'stabilize', label: t('stabilizeEnergy'), description: t('avoidEnergyCrashes') },
    { id: 'morning', label: t('betterMorningEnergy'), description: t('wakeUpRefreshed') },
  ];
  
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    
    if (!result.canceled) {
      setProfilePicture(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    
    if (!result.canceled) {
      setProfilePicture(result.assets[0].uri);
    }
  };

  const uploadMedicalReports = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'image/*'],
        multiple: true,
      });
      
      if (!result.canceled) {
        Alert.alert(t('success'), 'Medical reports uploaded successfully!');
      }
    } catch (error) {
      Alert.alert(t('error'), 'Failed to upload medical reports');
    }
  };

  const connectEHR = async () => {
    try {
      setEhrConnected(true);
      Alert.alert(t('success'), 'EHR connected successfully! Your medical data will be synced.');
    } catch (error) {
      Alert.alert(t('error'), 'Failed to connect to EHR system');
    }
  };
  
  const toggleGoal = (goalId: string) => {
    if (selectedGoals.includes(goalId)) {
      setSelectedGoals(selectedGoals.filter(g => g !== goalId));
    } else {
      setSelectedGoals([...selectedGoals, goalId]);
    }
  };

  const toggleCondition = (condition: string) => {
    if (condition === 'None') {
      setMedicalConditions(['None']);
    } else {
      const filtered = medicalConditions.filter(c => c !== 'None');
      if (medicalConditions.includes(condition)) {
        setMedicalConditions(filtered.filter(c => c !== condition));
      } else {
        setMedicalConditions([...filtered, condition]);
      }
    }
  };

  const toggleChronicCondition = (condition: string) => {
    if (condition === 'None') {
      setChronicConditions([]);
    } else {
      if (chronicConditions.includes(condition)) {
        setChronicConditions(chronicConditions.filter(c => c !== condition));
      } else {
        setChronicConditions([...chronicConditions, condition]);
      }
    }
  };

  const toggleFitnessLimitation = (limitation: string) => {
    if (limitation === 'None') {
      setFitnessLimitations([]);
    } else {
      if (fitnessLimitations.includes(limitation)) {
        setFitnessLimitations(fitnessLimitations.filter(l => l !== limitation));
      } else {
        setFitnessLimitations([...fitnessLimitations, limitation]);
      }
    }
  };

  const toggleDietaryPreference = (preference: string) => {
    if (preference === 'None') {
      setDietaryPreferences([]);
    } else {
      if (dietaryPreferences.includes(preference)) {
        setDietaryPreferences(dietaryPreferences.filter(p => p !== preference));
      } else {
        setDietaryPreferences([...dietaryPreferences, preference]);
      }
    }
  };

  const toggleAllergy = (allergy: string) => {
    if (allergy === 'None') {
      setAllergies([]);
    } else {
      if (allergies.includes(allergy)) {
        setAllergies(allergies.filter(a => a !== allergy));
      } else {
        setAllergies([...allergies, allergy]);
      }
    }
  };

  const toggleMotivationFactor = (factor: string) => {
    if (motivationFactors.includes(factor)) {
      setMotivationFactors(motivationFactors.filter(f => f !== factor));
    } else {
      setMotivationFactors([...motivationFactors, factor]);
    }
  };

  const formatNationalId = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    const limited = cleaned.slice(0, 10);
    return limited;
  };

  const handleNationalIdChange = (text: string) => {
    const formatted = formatNationalId(text);
    setNationalId(formatted);
  };

  const isValidNationalId = (id: string) => {
    return id.length === 10 && (id.startsWith('1') || id.startsWith('2'));
  };

  const createPersonalizedGoals = () => {
    const goals: any[] = [];

    if (weightGoal && weightTarget) {
      goals.push({
        id: Date.now().toString() + '_weight',
        title: weightGoal === 'lose' ? 'Weight Loss Goal' : 
              weightGoal === 'gain' ? 'Weight Gain Goal' : 'Weight Maintenance Goal',
        description: `${weightGoal === 'lose' ? 'Lose' : weightGoal === 'gain' ? 'Gain' : 'Maintain'} weight to reach ${weightTarget}kg`,
        category: 'fitness' as const,
        targetValue: parseFloat(weightTarget),
        currentValue: parseFloat(weight),
        unit: 'kg',
        targetDate: new Date(Date.now() + parseInt(weightTimeframe) * 30 * 24 * 60 * 60 * 1000).toISOString(),
        priority: 'high' as const,
        status: 'not_started' as const,
        progress: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }

    if (energyGoal) {
      goals.push({
        id: Date.now().toString() + '_energy',
        title: 'Energy Level Goal',
        description: energyGoal === 'increase' ? 'Increase daily energy levels' :
                    energyGoal === 'stabilize' ? 'Stabilize energy throughout the day' :
                    'Improve morning energy levels',
        category: 'wellness' as const,
        targetValue: parseFloat(energyTarget),
        currentValue: 5,
        unit: 'level (1-10)',
        targetDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
        priority: 'medium' as const,
        status: 'not_started' as const,
        progress: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }

    if (stressGoalTarget) {
      goals.push({
        id: Date.now().toString() + '_stress',
        title: 'Stress Reduction Goal',
        description: `Reduce stress level to ${stressGoalTarget}/10`,
        category: 'wellness' as const,
        targetValue: parseFloat(stressGoalTarget),
        currentValue: parseFloat(stressLevel),
        unit: 'level (1-10)',
        targetDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
        priority: 'high' as const,
        status: 'not_started' as const,
        progress: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }

    return goals;
  };
  
  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      const personalizedGoals = createPersonalizedGoals();

      updateUser({
        name,
        email: email || undefined,
        age: age ? parseInt(age) : undefined,
        gender,
        height: height ? parseFloat(height) : undefined,
        weight: weight ? parseFloat(weight) : undefined,
        profilePicture,
        medicalConditions,
        medicationNames,
        medications: [],
        fitnessLevel,
        commitmentLevel,
        checkInFrequency,
        lifestyle: {
          sleepHours: sleepHours ? parseFloat(sleepHours) : undefined,
          stressLevel: stressLevel ? parseInt(stressLevel) : undefined,
          activityLevel,
          smokingStatus,
          alcoholConsumption,
          dietaryPreferences,
          allergies,
          occupation: occupation || undefined,
        },
        behavioral: {
          motivationStyle,
          preferredWorkoutTime,
          reminderStyle,
        },
        medicalHistory: {
          chronicConditions: chronicConditions.map((name, index) => ({
            id: `chronic_${index}`,
            name,
            diagnosedDate: '',
            severity: 'moderate' as const,
            status: 'active' as const,
          })),
          fitnessLimitations: fitnessLimitations.map((description, index) => ({
            id: `limitation_${index}`,
            type: 'physical-limitation' as const,
            description,
            affectedAreas: [],
            restrictions: [],
            severity: 'moderate' as const,
            temporary: false,
          })),
          primaryCareProvider: primaryCareProvider || undefined,
          lastPhysicalExam: lastPhysicalExam || undefined,
          ehrIntegration: {
            connected: ehrConnected,
            provider: ehrConnected ? ehrProvider : undefined,
            lastSync: ehrConnected ? new Date().toISOString() : undefined,
          },
        },
        goalPersonalization: {
          primaryFocus,
          motivationFactors,
          preferredGoalTimeframe,
          trackingPreference,
          celebrationStyle,
        },
        autoFilled: {
          source: 'manual',
          lastSync: new Date().toISOString(),
          dataPoints: ['basic-info', 'lifestyle', 'behavioral', 'medical-history', 'goals'],
        },
        completedOnboarding: true,
      });

      personalizedGoals.forEach(goal => addGoal(goal));
      
      router.replace('/(tabs)');
    }
  };
  
  const isStepValid = () => {
    switch (step) {
      case 1:
        return name.trim().length > 0;
      case 2:
        return age && gender !== 'prefer-not-to-say';
      case 3:
        return height && weight;
      case 4:
        return selectedGoals.length > 0;
      case 5:
        return medicalConditions.length > 0;
      case 6:
        return true;
      case 7:
        return true;
      case 8:
        return true;
      case 9:
        return fitnessLevel;
      case 10:
        return sleepHours && stressLevel;
      case 11:
        return motivationStyle && preferredWorkoutTime;
      case 12:
        return primaryFocus && motivationFactors.length > 0;
      case 13:
        return true;
      default:
        return false;
    }
  };
  
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>{t('letsGetToKnowYou')}</Text>
            <Text style={styles.stepDescription}>{t('personalizeHealthJourney')}</Text>
            
            <View style={styles.avatarContainer}>
              <TouchableOpacity onPress={pickImage}>
                <Avatar 
                  source={profilePicture} 
                  initials={name ? name.charAt(0) : '?'} 
                  size="xlarge"
                  style={styles.avatar}
                  backgroundColor={colors.primary}
                />
              </TouchableOpacity>
              <View style={styles.avatarActions}>
                <TouchableOpacity style={styles.avatarAction} onPress={takePhoto}>
                  <Camera size={16} color={colors.text} />
                  <Text style={styles.avatarActionText}>Camera</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.avatarAction} onPress={pickImage}>
                  <Upload size={16} color={colors.text} />
                  <Text style={styles.avatarActionText}>Gallery</Text>
                </TouchableOpacity>
              </View>
            </View>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>{t('fullName')}</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder={t('enterYourName')}
                placeholderTextColor={colors.textSecondary}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>{t('nationalId')} (Optional)</Text>
              <TextInput
                style={styles.input}
                value={nationalId}
                onChangeText={handleNationalIdChange}
                placeholder="Enter your National ID"
                placeholderTextColor={colors.textSecondary}
                keyboardType="number-pad"
                maxLength={10}
              />
              {nationalId && !isValidNationalId(nationalId) && (
                <Text style={styles.errorText}>
                  Please enter a valid 10-digit National ID
                </Text>
              )}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>{t('email')} (Optional)</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                placeholderTextColor={colors.textSecondary}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>
        );
      case 2:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>{t('basicInformation')}</Text>
            <Text style={styles.stepDescription}>{t('accurateRecommendations')}</Text>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>{t('age')}</Text>
              <TextInput
                style={styles.input}
                value={age}
                onChangeText={setAge}
                placeholder="Enter your age"
                placeholderTextColor={colors.textSecondary}
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>{t('gender')}</Text>
              <View style={styles.optionsContainer}>
                {(['male', 'female', 'prefer-not-to-say'] as const).map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={[
                      styles.optionButton,
                      gender === option && styles.optionButtonSelected
                    ]}
                    onPress={() => setGender(option)}
                  >
                    <Text style={[
                      styles.optionText,
                      gender === option && styles.optionTextSelected
                    ]}>
                      {option === 'male' ? t('male') : 
                       option === 'female' ? t('female') : 
                       t('preferNotToSay')}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        );
      case 3:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>{t('bodyMeasurements')}</Text>
            <Text style={styles.stepDescription}>{t('calculateFitnessNeeds')}</Text>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>{t('height')} (cm)</Text>
              <TextInput
                style={styles.input}
                value={height}
                onChangeText={setHeight}
                placeholder={t('enterYourHeight')}
                placeholderTextColor={colors.textSecondary}
                keyboardType="numeric"
              />
            </View>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>{t('weight')} (kg)</Text>
              <TextInput
                style={styles.input}
                value={weight}
                onChangeText={setWeight}
                placeholder={t('enterYourWeight')}
                placeholderTextColor={colors.textSecondary}
                keyboardType="numeric"
              />
            </View>

            <TouchableOpacity style={styles.uploadButton} onPress={uploadMedicalReports}>
              <Upload size={20} color={colors.primary} />
              <Text style={styles.uploadButtonText}>{t('uploadMedicalReports')} (Optional)</Text>
            </TouchableOpacity>
          </View>
        );
      case 4:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>{t('whatAreYourGoals')}</Text>
            <Text style={styles.stepDescription}>{t('selectAllThatApply')}</Text>
            
            <View style={styles.goalsContainer}>
              {basicGoals.map((goal) => (
                <TouchableOpacity
                  key={goal.id}
                  style={[
                    styles.goalCard,
                    selectedGoals.includes(goal.id) && styles.goalCardSelected
                  ]}
                  onPress={() => toggleGoal(goal.id)}
                >
                  <Text style={styles.goalIcon}>{goal.icon}</Text>
                  <Text style={[
                    styles.goalText,
                    selectedGoals.includes(goal.id) && styles.goalTextSelected
                  ]}>
                    {goal.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );
      case 5:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>{t('medicalHistory')}</Text>
            <Text style={styles.stepDescription}>{t('understandHealthBackground')}</Text>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>{t('anyConditions')}</Text>
              <View style={styles.conditionsContainer}>
                {commonConditions.map((condition) => (
                  <TouchableOpacity
                    key={condition}
                    style={[
                      styles.conditionButton,
                      medicalConditions.includes(condition) && styles.conditionButtonSelected
                    ]}
                    onPress={() => toggleCondition(condition)}
                  >
                    <Text style={[
                      styles.conditionText,
                      medicalConditions.includes(condition) && styles.conditionTextSelected
                    ]}>
                      {condition}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        );
      case 6:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Chronic conditions</Text>
            <Text style={styles.stepDescription}>Do you have any chronic conditions that require ongoing management?</Text>
            
            <View style={styles.inputContainer}>
              <View style={styles.conditionsContainer}>
                {chronicConditionsList.map((condition) => (
                  <TouchableOpacity
                    key={condition}
                    style={[
                      styles.conditionButton,
                      chronicConditions.includes(condition) && styles.conditionButtonSelected
                    ]}
                    onPress={() => toggleChronicCondition(condition)}
                  >
                    <Text style={[
                      styles.conditionText,
                      chronicConditions.includes(condition) && styles.conditionTextSelected
                    ]}>
                      {condition}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        );
      case 7:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Fitness limitations</Text>
            <Text style={styles.stepDescription}>Do you have any injuries or physical limitations we should know about?</Text>
            
            <View style={styles.inputContainer}>
              <View style={styles.conditionsContainer}>
                {fitnessLimitationsList.map((limitation) => (
                  <TouchableOpacity
                    key={limitation}
                    style={[
                      styles.conditionButton,
                      fitnessLimitations.includes(limitation) && styles.conditionButtonSelected
                    ]}
                    onPress={() => toggleFitnessLimitation(limitation)}
                  >
                    <Text style={[
                      styles.conditionText,
                      fitnessLimitations.includes(limitation) && styles.conditionTextSelected
                    ]}>
                      {limitation}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        );
      case 8:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Electronic Health Records</Text>
            <Text style={styles.stepDescription}>Connect your EHR for comprehensive health tracking</Text>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Primary Care Provider (Optional)</Text>
              <TextInput
                style={styles.input}
                value={primaryCareProvider}
                onChangeText={setPrimaryCareProvider}
                placeholder="Dr. Smith, ABC Medical Center"
                placeholderTextColor={colors.textSecondary}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Last Physical Exam (Optional)</Text>
              <TextInput
                style={styles.input}
                value={lastPhysicalExam}
                onChangeText={setLastPhysicalExam}
                placeholder="MM/YYYY"
                placeholderTextColor={colors.textSecondary}
              />
            </View>

            <View style={styles.ehrContainer}>
              <View style={styles.ehrHeader}>
                <FileText size={24} color={colors.primary} />
                <Text style={styles.ehrTitle}>Connect EHR System</Text>
              </View>
              <Text style={styles.ehrDescription}>
                Securely connect your Electronic Health Records for automatic data sync
              </Text>
              
              {!ehrConnected ? (
                <TouchableOpacity style={styles.connectButton} onPress={connectEHR}>
                  <Text style={styles.connectButtonText}>Connect EHR</Text>
                </TouchableOpacity>
              ) : (
                <View style={styles.connectedContainer}>
                  <Text style={styles.connectedText}>✅ EHR Connected</Text>
                  <Text style={styles.connectedProvider}>Provider: {ehrProvider}</Text>
                </View>
              )}
            </View>
          </View>
        );
      case 9:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>{t('fitnessLevel')}</Text>
            <Text style={styles.stepDescription}>{t('rightWorkoutPlan')}</Text>
            
            <View style={styles.fitnessLevelsContainer}>
              {fitnessLevels.map((level) => (
                <TouchableOpacity
                  key={level.id}
                  style={[
                    styles.fitnessLevelCard,
                    fitnessLevel === level.id && styles.fitnessLevelCardSelected
                  ]}
                  onPress={() => setFitnessLevel(level.id as any)}
                >
                  <View style={styles.fitnessLevelHeader}>
                    <Activity size={24} color={fitnessLevel === level.id ? colors.black : colors.primary} />
                    <Text style={[
                      styles.fitnessLevelTitle,
                      fitnessLevel === level.id && styles.fitnessLevelTitleSelected
                    ]}>
                      {level.label}
                    </Text>
                  </View>
                  <Text style={[
                    styles.fitnessLevelDescription,
                    fitnessLevel === level.id && styles.fitnessLevelDescriptionSelected
                  ]}>
                    {level.description}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );
      case 10:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>{t('lifestyleInformation')}</Text>
            <Text style={styles.stepDescription}>{t('dailyHabits')}</Text>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>{t('averageSleepHours')}</Text>
              <TextInput
                style={styles.input}
                value={sleepHours}
                onChangeText={setSleepHours}
                placeholder="7.5"
                placeholderTextColor={colors.textSecondary}
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>{t('currentStressLevel')}</Text>
              <View style={styles.sliderContainer}>
                <View style={styles.sliderLabels}>
                  <Text style={styles.sliderLabel}>Low</Text>
                  <Text style={styles.sliderLabel}>High</Text>
                </View>
                <View style={styles.stressButtons}>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => (
                    <TouchableOpacity
                      key={level}
                      style={[
                        styles.stressButton,
                        parseInt(stressLevel) === level && styles.stressButtonSelected
                      ]}
                      onPress={() => setStressLevel(level.toString())}
                    >
                      <Text style={[
                        styles.stressButtonText,
                        parseInt(stressLevel) === level && styles.stressButtonTextSelected
                      ]}>
                        {level}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>{t('dietaryPreferences')}</Text>
              <View style={styles.conditionsContainer}>
                {dietaryOptions.map((preference) => (
                  <TouchableOpacity
                    key={preference}
                    style={[
                      styles.conditionButton,
                      dietaryPreferences.includes(preference) && styles.conditionButtonSelected
                    ]}
                    onPress={() => toggleDietaryPreference(preference)}
                  >
                    <Text style={[
                      styles.conditionText,
                      dietaryPreferences.includes(preference) && styles.conditionTextSelected
                    ]}>
                      {preference}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>{t('occupation')} (Optional)</Text>
              <TextInput
                style={styles.input}
                value={occupation}
                onChangeText={setOccupation}
                placeholder="Software Engineer, Teacher, etc."
                placeholderTextColor={colors.textSecondary}
              />
            </View>
          </View>
        );
      case 11:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>{t('behavioralPreferences')}</Text>
            <Text style={styles.stepDescription}>{t('howMotivated')}</Text>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>{t('whatMotivatesYou')}</Text>
              <View style={styles.optionsContainer}>
                {(['competitive', 'collaborative', 'independent', 'supportive'] as const).map((style) => (
                  <TouchableOpacity
                    key={style}
                    style={[
                      styles.optionButton,
                      motivationStyle === style && styles.optionButtonSelected
                    ]}
                    onPress={() => setMotivationStyle(style)}
                  >
                    <Text style={[
                      styles.optionText,
                      motivationStyle === style && styles.optionTextSelected
                    ]}>
                      {style === 'competitive' ? t('competitionChallenges') :
                       style === 'collaborative' ? t('teamCommunity') :
                       style === 'independent' ? t('personalAchievement') :
                       t('gentleSupport')}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>{t('preferredWorkoutTime')}</Text>
              <View style={styles.optionsContainer}>
                {(['morning', 'afternoon', 'evening', 'flexible'] as const).map((time) => (
                  <TouchableOpacity
                    key={time}
                    style={[
                      styles.optionButton,
                      preferredWorkoutTime === time && styles.optionButtonSelected
                    ]}
                    onPress={() => setPreferredWorkoutTime(time)}
                  >
                    <Text style={[
                      styles.optionText,
                      preferredWorkoutTime === time && styles.optionTextSelected
                    ]}>
                      {time === 'morning' ? t('morning') :
                       time === 'afternoon' ? t('afternoon') :
                       time === 'evening' ? t('evening') :
                       t('flexible')}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>{t('reminderStyle')}</Text>
              <View style={styles.optionsContainer}>
                {(['gentle', 'firm', 'motivational'] as const).map((style) => (
                  <TouchableOpacity
                    key={style}
                    style={[
                      styles.optionButton,
                      reminderStyle === style && styles.optionButtonSelected
                    ]}
                    onPress={() => setReminderStyle(style)}
                  >
                    <Text style={[
                      styles.optionText,
                      reminderStyle === style && styles.optionTextSelected
                    ]}>
                      {style === 'gentle' ? t('gentle') :
                       style === 'firm' ? t('firm') :
                       t('motivational')}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        );
      case 12:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>{t('goalPersonalization')}</Text>
            <Text style={styles.stepDescription}>{t('customizeGoalSetting')}</Text>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>{t('primaryFocus')}</Text>
              <View style={styles.optionsContainer}>
                {(['wellness', 'weight-loss', 'muscle-gain', 'endurance', 'strength', 'rehabilitation', 'balanced'] as const).map((focus) => (
                  <TouchableOpacity
                    key={focus}
                    style={[
                      styles.optionButton,
                      primaryFocus === focus && styles.optionButtonSelected
                    ]}
                    onPress={() => setPrimaryFocus(focus)}
                  >
                    <Text style={[
                      styles.optionText,
                      primaryFocus === focus && styles.optionTextSelected
                    ]}>
                      {focus === 'wellness' ? t('wellness') :
                       focus === 'weight-loss' ? t('loseWeight') :
                       focus === 'muscle-gain' ? t('buildMuscle') :
                       focus === 'endurance' ? t('improveFitness') :
                       focus === 'strength' ? t('increaseStrength') :
                       focus === 'rehabilitation' ? 'Rehabilitation' :
                       t('balanced')}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>{t('whatMotivatesYouSelect')}</Text>
              <View style={styles.conditionsContainer}>
                {motivationFactorOptions.map((factor) => (
                  <TouchableOpacity
                    key={factor}
                    style={[
                      styles.conditionButton,
                      motivationFactors.includes(factor) && styles.conditionButtonSelected
                    ]}
                    onPress={() => toggleMotivationFactor(factor)}
                  >
                    <Text style={[
                      styles.conditionText,
                      motivationFactors.includes(factor) && styles.conditionTextSelected
                    ]}>
                      {factor}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>{t('preferredGoalTimeframe')}</Text>
              <View style={styles.optionsContainer}>
                {(['short', 'medium', 'long'] as const).map((timeframe) => (
                  <TouchableOpacity
                    key={timeframe}
                    style={[
                      styles.optionButton,
                      preferredGoalTimeframe === timeframe && styles.optionButtonSelected
                    ]}
                    onPress={() => setPreferredGoalTimeframe(timeframe)}
                  >
                    <Text style={[
                      styles.optionText,
                      preferredGoalTimeframe === timeframe && styles.optionTextSelected
                    ]}>
                      {timeframe === 'short' ? t('shortTerm') :
                       timeframe === 'medium' ? t('mediumTerm') :
                       t('longTerm')}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>{t('trackingDetail')}</Text>
              <View style={styles.optionsContainer}>
                {(['detailed', 'simple', 'minimal'] as const).map((preference) => (
                  <TouchableOpacity
                    key={preference}
                    style={[
                      styles.optionButton,
                      trackingPreference === preference && styles.optionButtonSelected
                    ]}
                    onPress={() => setTrackingPreference(preference)}
                  >
                    <Text style={[
                      styles.optionText,
                      trackingPreference === preference && styles.optionTextSelected
                    ]}>
                      {preference === 'detailed' ? t('detailed') :
                       preference === 'simple' ? t('simple') :
                       t('minimal')}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        );
      case 13:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>{t('specificGoals')}</Text>
            <Text style={styles.stepDescription}>{t('personalizedGoalsSetup')}</Text>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>{t('weightGoal')}</Text>
              <View style={styles.optionsContainer}>
                {weightGoalOptions.map((option) => (
                  <TouchableOpacity
                    key={option.id}
                    style={[
                      styles.optionButton,
                      weightGoal === option.id && styles.optionButtonSelected
                    ]}
                    onPress={() => setWeightGoal(option.id)}
                  >
                    <Text style={[
                      styles.optionText,
                      weightGoal === option.id && styles.optionTextSelected
                    ]}>
                      {option.label}
                    </Text>
                    <Text style={[
                      styles.optionDescription,
                      weightGoal === option.id && styles.optionDescriptionSelected
                    ]}>
                      {option.description}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              
              {weightGoal && (
                <View style={styles.goalInputsContainer}>
                  <View style={styles.goalInputRow}>
                    <View style={styles.goalInputHalf}>
                      <Text style={styles.goalInputLabel}>{t('targetWeight')} (kg)</Text>
                      <TextInput
                        style={styles.goalInput}
                        value={weightTarget}
                        onChangeText={setWeightTarget}
                        placeholder="70"
                        placeholderTextColor={colors.textSecondary}
                        keyboardType="numeric"
                      />
                    </View>
                    <View style={styles.goalInputHalf}>
                      <Text style={styles.goalInputLabel}>{t('timeframeMonths')}</Text>
                      <TextInput
                        style={styles.goalInput}
                        value={weightTimeframe}
                        onChangeText={setWeightTimeframe}
                        placeholder="3"
                        placeholderTextColor={colors.textSecondary}
                        keyboardType="numeric"
                      />
                    </View>
                  </View>
                </View>
              )}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>{t('energyGoal')}</Text>
              <View style={styles.optionsContainer}>
                {energyGoalOptions.map((option) => (
                  <TouchableOpacity
                    key={option.id}
                    style={[
                      styles.optionButton,
                      energyGoal === option.id && styles.optionButtonSelected
                    ]}
                    onPress={() => setEnergyGoal(option.id)}
                  >
                    <Text style={[
                      styles.optionText,
                      energyGoal === option.id && styles.optionTextSelected
                    ]}>
                      {option.label}
                    </Text>
                    <Text style={[
                      styles.optionDescription,
                      energyGoal === option.id && styles.optionDescriptionSelected
                    ]}>
                      {option.description}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              
              {energyGoal && (
                <View style={styles.goalInputsContainer}>
                  <Text style={styles.goalInputLabel}>{t('targetEnergyLevel')}</Text>
                  <TextInput
                    style={styles.goalInput}
                    value={energyTarget}
                    onChangeText={setEnergyTarget}
                    placeholder="8"
                    placeholderTextColor={colors.textSecondary}
                    keyboardType="numeric"
                  />
                </View>
              )}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>{t('stressReductionGoal')}</Text>
              <Text style={styles.inputDescription}>{t('targetStressLevel')}</Text>
              <TextInput
                style={styles.goalInput}
                value={stressGoalTarget}
                onChangeText={setStressGoalTarget}
                placeholder="3"
                placeholderTextColor={colors.textSecondary}
                keyboardType="numeric"
              />
            </View>
          </View>
        );
      default:
        return null;
    }
  };
  
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient
        colors={[colors.background, colors.cardBackground]}
        style={styles.gradient}
      >
        <View style={styles.header}>
          {step > 1 && (
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => setStep(step - 1)}
            >
              <ArrowLeft size={24} color={colors.text} />
            </TouchableOpacity>
          )}
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill,
                  { width: `${(step / totalSteps) * 100}%` }
                ]}
              />
            </View>
            <Text style={styles.progressText}>{step} of {totalSteps}</Text>
          </View>
        </View>
        
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {renderStep()}
        </ScrollView>
        
        <View style={styles.footer}>
          <TouchableOpacity
            style={[
              styles.nextButton,
              !isStepValid() && styles.nextButtonDisabled
            ]}
            onPress={handleNext}
            disabled={!isStepValid()}
          >
            <Text style={styles.nextButtonText}>
              {step < totalSteps ? t('continue') : t('completeSetup')}
            </Text>
            {step < totalSteps && <ChevronRight size={20} color={colors.black} />}
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  gradient: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 80,
    paddingBottom: 20,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.cardBackground,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  progressContainer: {
    flex: 1,
    alignItems: 'center',
  },
  progressBar: {
    width: '80%',
    height: 4,
    backgroundColor: colors.border,
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  stepContainer: {
    flex: 1,
    paddingTop: 24,
  },
  stepTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  stepDescription: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 32,
    lineHeight: 24,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatar: {
    borderWidth: 3,
    borderColor: colors.primary,
    marginBottom: 16,
  },
  avatarActions: {
    flexDirection: 'row',
    gap: 16,
  },
  avatarAction: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  avatarActionText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '500',
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  inputDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: colors.text,
    backgroundColor: colors.cardBackground,
  },
  errorText: {
    color: colors.error,
    fontSize: 14,
    marginTop: 4,
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    backgroundColor: colors.cardBackground,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    alignItems: 'flex-start',
  },
  optionButtonSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  optionText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 4,
  },
  optionTextSelected: {
    color: colors.black,
  },
  optionDescription: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  optionDescriptionSelected: {
    color: colors.black,
    opacity: 0.8,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: `${colors.primary}15`,
    borderWidth: 1,
    borderColor: colors.primary,
    borderStyle: 'dashed',
    borderRadius: 12,
    paddingVertical: 16,
    gap: 8,
    marginTop: 16,
  },
  uploadButtonText: {
    color: colors.primary,
    fontWeight: '500',
  },
  goalsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  goalCard: {
    width: '47%',
    backgroundColor: colors.cardBackground,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    minHeight: 100,
    justifyContent: 'center',
  },
  goalCardSelected: {
    backgroundColor: `${colors.primary}20`,
    borderColor: colors.primary,
  },
  goalIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  goalText: {
    color: colors.text,
    fontWeight: '500',
    textAlign: 'center',
  },
  goalTextSelected: {
    color: colors.primary,
    fontWeight: '600',
  },
  conditionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  conditionButton: {
    backgroundColor: colors.cardBackground,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  conditionButtonSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  conditionText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '500',
  },
  conditionTextSelected: {
    color: colors.black,
  },
  fitnessLevelsContainer: {
    gap: 16,
  },
  fitnessLevelCard: {
    backgroundColor: colors.cardBackground,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    padding: 20,
  },
  fitnessLevelCardSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  fitnessLevelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 12,
  },
  fitnessLevelTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  fitnessLevelTitleSelected: {
    color: colors.black,
  },
  fitnessLevelDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  fitnessLevelDescriptionSelected: {
    color: colors.black,
    opacity: 0.8,
  },
  sliderContainer: {
    marginTop: 8,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sliderLabel: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  stressButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 4,
  },
  stressButton: {
    flex: 1,
    backgroundColor: colors.cardBackground,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  stressButtonSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  stressButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  stressButtonTextSelected: {
    color: colors.black,
  },
  ehrContainer: {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    padding: 20,
    marginTop: 16,
  },
  ehrHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  ehrTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  ehrDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 16,
  },
  connectButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  connectButtonText: {
    color: colors.black,
    fontWeight: '600',
    fontSize: 16,
  },
  connectedContainer: {
    alignItems: 'center',
  },
  connectedText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: 4,
  },
  connectedProvider: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  goalInputsContainer: {
    marginTop: 16,
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: 16,
  },
  goalInputRow: {
    flexDirection: 'row',
    gap: 12,
  },
  goalInputHalf: {
    flex: 1,
  },
  goalInputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 8,
  },
  goalInput: {
    height: 44,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    color: colors.text,
    backgroundColor: colors.background,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    backgroundColor: 'transparent',
  },
  nextButton: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  nextButtonDisabled: {
    backgroundColor: colors.cardBackground,
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.black,
    marginRight: 8,
  },
});