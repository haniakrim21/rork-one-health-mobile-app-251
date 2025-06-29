export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'prefer-not-to-say';
  height?: number; // in cm
  weight?: number; // in kg
  activityLevel?: 'sedentary' | 'lightly_active' | 'moderately_active' | 'very_active' | 'extremely_active';
  goals?: PersonalizedGoal[];
  preferences?: UserPreferences;
  createdAt: string;
  updatedAt: string;
  
  // Enhanced profile fields
  phoneNumber?: string;
  nationalId?: string;
  emergencyContact?: EmergencyContact;
  medicalHistory?: MedicalHistory;
  lifestyle?: LifestyleData;
  fitnessProfile?: FitnessProfile;
  goalPersonalization?: GoalPersonalization;
  behavioral?: BehavioralData;
  completedOnboarding?: boolean;
}

export interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  email?: string;
}

export interface MedicalHistory {
  chronicConditions?: string[];
  medications?: string[];
  allergies?: string[];
  surgeries?: string[];
  familyHistory?: string[];
  bloodType?: string;
  insuranceProvider?: string;
  primaryPhysician?: string;
}

export interface LifestyleData {
  sleepHours?: number;
  sleepQuality?: 'poor' | 'fair' | 'good' | 'excellent';
  caffeineIntake?: 'none' | 'low' | 'moderate' | 'high';
  alcoholConsumption?: 'none' | 'occasional' | 'moderate' | 'heavy';
  smokingStatus?: 'never' | 'former' | 'current';
  stressLevel?: number; // 1-10 scale
  workType?: 'sedentary' | 'active' | 'mixed';
  dietaryRestrictions?: string[];
  waterIntake?: number; // glasses per day
}

export interface FitnessProfile {
  currentFitnessLevel?: 'beginner' | 'intermediate' | 'advanced';
  previousInjuries?: string[];
  preferredWorkoutTypes?: string[];
  workoutFrequency?: number; // times per week
  workoutDuration?: number; // minutes
  fitnessGoals?: string[];
  equipmentAccess?: string[];
  trainerExperience?: boolean;
  wearableDevices?: string[];
}

export interface GoalPersonalization {
  primaryFocus?: 'wellness' | 'weight-loss' | 'muscle-gain' | 'endurance' | 'strength' | 'rehabilitation' | 'balanced';
  timeCommitment?: 'minimal' | 'moderate' | 'high';
  intensityPreference?: 'low' | 'moderate' | 'high';
  motivationStyle?: 'competitive' | 'collaborative' | 'independent' | 'supportive';
  trackingPreference?: 'detailed' | 'simple' | 'minimal';
}

export interface BehavioralData {
  preferredWorkoutTime?: 'morning' | 'afternoon' | 'evening' | 'flexible';
  socialPreference?: 'solo' | 'group' | 'mixed';
  challengePreference?: 'individual' | 'team' | 'both';
  feedbackStyle?: 'encouraging' | 'direct' | 'analytical';
  reminderFrequency?: 'minimal' | 'moderate' | 'frequent';
  motivationStyle?: 'achievement' | 'progress' | 'social' | 'health';
}

// Unified Goal type that includes all necessary properties
export interface Goal {
  id: string;
  title: string;
  description?: string;
  category: 'health' | 'fitness' | 'nutrition' | 'wellness' | 'lifestyle';
  targetValue?: number;
  currentValue?: number;
  unit?: string;
  targetDate?: string;
  priority: 'low' | 'medium' | 'high';
  status: 'not_started' | 'in_progress' | 'completed' | 'paused';
  progress: number; // percentage
  completed: boolean;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
  milestones?: Milestone[];
  reminders?: Reminder[];
  
  // PersonalizedGoal properties
  type: 'weight' | 'energy' | 'stress' | 'fitness' | 'health' | 'wellness' | 'custom';
  name: string;
  difficulty: 'easy' | 'moderate' | 'challenging';
  timeframe: 'short' | 'medium' | 'long';
  trackingMetrics: string[];
  checkInFrequency: 'daily' | 'weekly' | 'monthly';
  reminderSettings: {
    enabled: boolean;
    frequency: 'daily' | 'weekly' | 'monthly' | 'custom';
    style: 'gentle' | 'firm' | 'motivational' | 'minimal';
  };
}

// Keep PersonalizedGoal as an alias for backward compatibility
export type PersonalizedGoal = Goal;

export interface FitnessGoal {
  id: string;
  title: string;
  description?: string;
  type: 'weight_loss' | 'muscle_gain' | 'strength' | 'endurance' | 'flexibility' | 'general_fitness';
  targetValue: number;
  currentValue: number;
  unit: string;
  targetDate: string;
  priority: 'low' | 'medium' | 'high';
  status: 'not_started' | 'in_progress' | 'completed' | 'paused';
  progress: number; // percentage 0-100
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
  completed: boolean;
  milestones?: FitnessGoalMilestone[];
  reminders?: Reminder[];
  category: 'strength' | 'cardio' | 'flexibility' | 'weight' | 'performance';
}

export interface FitnessGoalMilestone {
  id: string;
  title: string;
  targetValue: number;
  completed: boolean;
  completedAt?: string;
  reward?: string;
}

export interface Milestone {
  id: string;
  title: string;
  targetValue: number;
  completed: boolean;
  completedAt?: string;
  reward?: string;
}

export interface GoalMilestone {
  id: string;
  title: string;
  targetValue: number;
  completed: boolean;
  completedAt?: string;
  reward?: string;
}

export interface Reminder {
  id: string;
  type: 'daily' | 'weekly' | 'monthly';
  time: string;
  message: string;
  enabled: boolean;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: string;
  timezone: string;
  units: 'metric' | 'imperial';
  notifications: NotificationPreferences;
  privacy: PrivacySettings;
}

export interface NotificationPreferences {
  push: boolean;
  email: boolean;
  sms: boolean;
  workoutReminders: boolean;
  medicationReminders: boolean;
  appointmentReminders: boolean;
  goalMilestones: boolean;
  weeklyReports: boolean;
}

export interface PrivacySettings {
  profileVisibility: 'public' | 'friends' | 'private';
  dataSharing: boolean;
  analyticsOptOut: boolean;
  marketingOptOut: boolean;
}

export interface HealthMetric {
  id: string;
  type: 'weight' | 'blood_pressure' | 'heart_rate' | 'blood_sugar' | 'temperature' | 'oxygen_saturation' | 'steps' | 'sleep' | 'calories' | 'water_intake';
  value: number;
  unit: string;
  timestamp: string;
  source?: 'manual' | 'device' | 'app';
  deviceId?: string;
  notes?: string;
}

export interface TrendData {
  value: number;
  isPositive: boolean;
  period?: 'day' | 'week' | 'month';
}

export interface Activity {
  id: string;
  name: string;
  type: 'cardio' | 'strength' | 'flexibility' | 'sports' | 'other';
  duration: number; // in minutes
  caloriesBurned?: number;
  intensity: 'low' | 'moderate' | 'high';
  timestamp: string;
  notes?: string;
  location?: string;
}

export interface Appointment {
  id: string;
  title: string;
  type: 'checkup' | 'specialist' | 'dental' | 'mental_health' | 'virtual' | 'physical' | 'home' | 'other';
  doctorName: string;
  provider?: string;
  date: string;
  time: string;
  location?: string;
  isVirtual?: boolean;
  status: 'scheduled' | 'completed' | 'cancelled' | 'rescheduled';
  notes?: string;
  reminders?: string[];
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  timeOfDay?: string[];
  startDate: string;
  endDate?: string;
  prescribedBy: string;
  instructions?: string;
  notes?: string;
  sideEffects?: string[];
  reminders: MedicationReminder[];
  adherence?: number; // percentage
}

export interface MedicationReminder {
  id: string;
  time: string;
  taken: boolean;
  takenAt?: string;
  skipped?: boolean;
  skipReason?: string;
}

// Nutrition types
export interface NutritionEntry {
  id: string;
  foodName: string;
  calories: number;
  protein: number; // grams
  carbs: number; // grams
  fat: number; // grams
  fiber?: number; // grams
  sugar?: number; // grams
  sodium?: number; // mg
  servingSize: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  timestamp: string;
  source?: 'manual' | 'barcode' | 'ai_recognition';
  confidence?: number; // for AI recognition
}

export interface WaterIntake {
  id: string;
  amount: number; // in ml
  timestamp: string;
  source?: 'manual' | 'smart_bottle';
}

// Sleep types
export interface SleepData {
  id: string;
  bedtime: string;
  wakeTime: string;
  duration: number; // in minutes
  quality: 'poor' | 'fair' | 'good' | 'excellent';
  deepSleep?: number; // in minutes
  lightSleep?: number; // in minutes
  remSleep?: number; // in minutes
  awakenings?: number;
  timestamp: string;
  source?: 'manual' | 'device';
  notes?: string;
}

// Mood and wellness types
export interface MoodEntry {
  id: string;
  mood: 'terrible' | 'low' | 'okay' | 'good' | 'excellent';
  energy: 'terrible' | 'low' | 'okay' | 'good' | 'excellent';
  stress: number; // 1-10 scale
  anxiety: number; // 1-10 scale
  sleep: number; // 1-10 scale
  notes?: string;
  timestamp: string;
  factors?: string[]; // what influenced mood
  activities?: string[]; // what they did that day
}

// Workout and exercise types
export interface Exercise {
  id: string;
  name: string;
  type: 'cardio' | 'strength' | 'flexibility' | 'balance' | 'sports';
  muscleGroups?: string[];
  equipment?: string[];
  instructions?: string;
  videoUrl?: string;
  imageUrl?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedCalories?: number; // per minute
}

export interface WorkoutSet {
  reps?: number;
  weight?: number; // in kg
  duration?: number; // in seconds
  distance?: number; // in meters
  restTime?: number; // in seconds
}

export interface WorkoutExercise {
  exerciseId: string;
  exercise: Exercise;
  sets: WorkoutSet[];
  notes?: string;
  completed: boolean;
}

export interface Workout {
  id: string;
  name: string;
  title?: string; // Add title property for compatibility
  type: 'strength' | 'cardio' | 'flexibility' | 'mixed' | 'balance' | 'custom';
  exercises: WorkoutExercise[];
  duration?: number; // in minutes
  caloriesBurned?: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  createdAt: string;
  completedAt?: string;
  scheduledFor?: string;
  notes?: string;
  rating?: number; // 1-5 stars
  completed: boolean;
  isAI?: boolean;
  adaptiveAdjustments?: number;
}

// Challenge and social types
export interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'individual' | 'group';
  category: 'steps' | 'distance' | 'calories' | 'workouts' | 'custom';
  target: number;
  unit: string;
  duration: number; // in days
  startDate: string;
  endDate: string;
  participants: string[]; // user IDs
  leaderboard?: LeaderboardEntry[];
  rewards?: ChallengeReward[];
  status: 'upcoming' | 'active' | 'completed';
  progress?: number;
  isActive?: boolean;
  completed?: boolean;
}

export interface LeaderboardEntry {
  userId: string;
  userName: string;
  userAvatar?: string;
  progress: number;
  rank: number;
}

export interface ChallengeReward {
  type: 'badge' | 'points' | 'discount' | 'item';
  name: string;
  description: string;
  imageUrl?: string;
  value?: number;
}

// Achievement and gamification types
export interface Achievement {
  id: string;
  title: string;
  description: string;
  category: 'fitness' | 'nutrition' | 'wellness' | 'social' | 'consistency';
  iconUrl: string;
  points: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlockedAt?: string;
  progress?: number; // percentage
  requirements: AchievementRequirement[];
}

export interface AchievementRequirement {
  type: 'count' | 'streak' | 'total' | 'average';
  metric: string;
  target: number;
  timeframe?: 'day' | 'week' | 'month' | 'year' | 'all_time';
}

// Device integration types
export interface ConnectedDevice {
  id: string;
  name: string;
  type: 'fitness_tracker' | 'smart_watch' | 'smart_scale' | 'heart_rate_monitor' | 'blood_pressure_monitor' | 'glucose_meter';
  brand: string;
  model: string;
  connectedAt: string;
  lastSyncAt?: string;
  isActive: boolean;
  permissions: string[];
}

export interface DeviceData {
  deviceId: string;
  type: string;
  data: any;
  timestamp: string;
  processed: boolean;
}

// AI and insights types
export interface AIInsight {
  id: string;
  type: 'recommendation' | 'warning' | 'achievement' | 'trend' | 'prediction';
  title: string;
  message: string;
  category: 'health' | 'fitness' | 'nutrition' | 'wellness' | 'sleep';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  actionable: boolean;
  actions?: AIAction[];
  confidence: number; // 0-1
  createdAt: string;
  dismissedAt?: string;
  actedUpon?: boolean;
}

export interface AIAction {
  id: string;
  type: 'schedule_appointment' | 'adjust_goal' | 'start_program' | 'contact_doctor' | 'update_medication';
  label: string;
  description: string;
  data?: any;
}

// Report and analytics types
export interface HealthReport {
  id: string;
  type: 'weekly' | 'monthly' | 'quarterly' | 'annual' | 'custom';
  period: {
    start: string;
    end: string;
  };
  sections: ReportSection[];
  generatedAt: string;
  sharedWith?: string[]; // user IDs or email addresses
}

export interface ReportSection {
  type: 'summary' | 'metrics' | 'goals' | 'activities' | 'insights' | 'recommendations';
  title: string;
  data: any;
  charts?: ChartData[];
}

export interface ChartData {
  type: 'line' | 'bar' | 'pie' | 'area';
  title: string;
  data: any[];
  xAxis?: string;
  yAxis?: string;
  color?: string;
}

// Onboarding types
export interface ChronicCondition {
  id: string;
  name: string;
  diagnosedDate: string;
  severity: 'mild' | 'moderate' | 'severe';
  status: 'active' | 'managed' | 'resolved';
}

export interface FitnessLimitation {
  id: string;
  type: 'injury' | 'physical-limitation' | 'medical-restriction';
  description: string;
  affectedAreas: string[];
  restrictions: string[];
  severity: 'mild' | 'moderate' | 'severe';
  temporary: boolean;
}

export interface EHRIntegration {
  connected: boolean;
  provider?: 'epic' | 'cerner' | 'allscripts' | 'athenahealth' | 'other';
  lastSync?: string;
}

// User Profile types
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  age?: number;
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'prefer-not-to-say';
  height?: number;
  weight?: number;
  profilePicture?: string;
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
  commitmentLevel: 'low' | 'medium' | 'high';
  checkInFrequency: 'daily' | 'weekly' | 'monthly';
  completedOnboarding: boolean;
  
  // Medical information
  medicalConditions: string[];
  medicationNames: string[];
  medications: Medication[];
  allergies?: string[];
  healthConditions?: string[];
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
  emergencyContacts?: EmergencyContact[];
  
  // Lifestyle and behavioral data
  lifestyle: {
    sleepHours?: number;
    stressLevel?: number;
    activityLevel: 'sedentary' | 'lightly-active' | 'moderately-active' | 'very-active' | 'extremely-active';
    smokingStatus: 'never' | 'former' | 'current';
    alcoholConsumption: 'none' | 'occasional' | 'moderate' | 'heavy';
    dietaryPreferences: string[];
    allergies: string[];
    occupation?: string;
    workEnvironment?: 'office' | 'remote' | 'hybrid' | 'physical';
  };
  
  behavioral: {
    motivationStyle: 'competitive' | 'collaborative' | 'independent' | 'supportive';
    preferredWorkoutTime: 'morning' | 'afternoon' | 'evening' | 'flexible';
    communicationPreference?: 'daily' | 'weekly' | 'monthly';
    reminderStyle: 'gentle' | 'firm' | 'motivational' | 'minimal';
    learningStyle?: 'visual' | 'auditory' | 'kinesthetic' | 'reading';
  };
  
  // Medical history and integrations
  medicalHistory: {
    chronicConditions: ChronicCondition[];
    surgeries?: string[];
    familyHistory?: string[];
    fitnessLimitations: FitnessLimitation[];
    ehrIntegration: EHRIntegration;
    lastPhysicalExam?: string;
    primaryCareProvider?: string;
  };
  
  // Auto-filled data tracking
  autoFilled?: {
    source: 'manual' | 'ehr' | 'device' | 'ai';
    lastSync: string;
    dataPoints: string[];
  };
  
  // Goal personalization
  goalPersonalization: {
    primaryFocus: 'wellness' | 'weight-loss' | 'muscle-gain' | 'endurance' | 'strength' | 'rehabilitation' | 'balanced';
    motivationFactors: string[];
    preferredGoalTimeframe: 'short' | 'medium' | 'long';
    trackingPreference: 'detailed' | 'simple' | 'minimal';
    celebrationStyle: 'public' | 'private' | 'milestone-based';
  };
  
  // Fitness goals
  fitnessGoals: FitnessGoal[];
  
  // Preferences
  preferences: {
    units: 'metric' | 'imperial';
    notifications: boolean;
    dataSharing: boolean;
    language: string;
    timezone: string;
  };
  
  // Goals
  goals: PersonalizedGoal[];
  
  // Timestamps
  createdAt: string;
  updatedAt: string;
}

// Export all types
export * from './health';
export * from './wellness';