export interface WellnessPath {
  id: string;
  title: string;
  description: string;
  category: 'stress' | 'sleep' | 'mindfulness' | 'energy' | 'resilience' | 'habits';
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  participants: number;
  rating: number;
  modules: WellnessModule[];
  progress: number;
  isActive: boolean;
  completedAt?: string;
}

export interface WellnessModule {
  id: string;
  title: string;
  description: string;
  duration: number;
  completed: boolean;
  content: string;
}

export interface MeditationSession {
  id: string;
  name: string;
  title?: string;
  description: string;
  duration: number; // in minutes
  category: 'sleep' | 'stress' | 'focus' | 'anxiety' | 'gratitude' | 'body-scan' | 'loving-kindness' | 'breathwork';
  instructor: string;
  audioUrl: string;
  imageUrl?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  rating: number;
  playCount: number;
  isFavorite: boolean;
  completed: boolean;
  completedAt?: string;
}

export interface TherapySession {
  id: string;
  name: string;
  description: string;
  type: 'individual' | 'group' | 'workshop';
  category: 'cbt' | 'dbt' | 'mindfulness' | 'trauma' | 'relationships' | 'addiction';
  therapist: string;
  duration: number; // in minutes
  scheduledFor?: string;
  videoUrl?: string;
  isLive: boolean;
  maxParticipants?: number;
  currentParticipants?: number;
  price?: number;
  status: 'upcoming' | 'live' | 'completed' | 'cancelled';
}

export interface MoodEntry {
  id: string;
  mood: 'excellent' | 'good' | 'okay' | 'low' | 'terrible';
  energy: 'excellent' | 'good' | 'okay' | 'low' | 'terrible';
  stress: number; // 1-10
  anxiety: number; // 1-10
  sleep: number; // 1-10
  notes?: string;
  factors: string[];
  timestamp: string;
  weather?: string;
  location?: string;
  activities: string[];
}

export interface DailyCheckIn {
  id: string;
  date: string;
  completed: boolean;
  mood: number; // 1-10
  energy: number; // 1-10
  stress: number; // 1-10
  sleep: number; // 1-10
  nutrition: number; // 1-10
  exercise: number; // 1-10
  hydration: number; // 1-10
  gratitude: string[];
  goals: string[];
  challenges: string[];
  wins: string[];
  notes?: string;
  aiInsights?: string;
}

export interface CognitiveBehavioralNudge {
  id: string;
  title: string;
  message: string;
  type: 'thought-challenge' | 'behavior-suggestion' | 'mindfulness-reminder' | 'gratitude-prompt';
  category: 'anxiety' | 'depression' | 'stress' | 'self-esteem' | 'productivity';
  triggerConditions: {
    moodBelow?: number;
    stressAbove?: number;
    energyBelow?: number;
    timeOfDay?: string[];
    dayOfWeek?: number[];
  };
  actionUrl?: string;
  dismissed: boolean;
  timestamp: string;
}

export interface EnergyScore {
  id: string;
  date: string;
  score: number; // 0-100
  factors: {
    sleep: number;
    nutrition?: number;
    exercise: number;
    stress: number;
    mood?: number;
    hydration?: number;
  };
  recommendations: string[];
  trend: 'improving' | 'stable' | 'declining';
}

export interface ResilienceScore {
  id: string;
  date: string;
  score: number; // 0-100
  components: {
    emotional: number;
    cognitive?: number;
    physical: number;
    social: number;
    spiritual?: number;
  };
  strengths: string[];
  areasForGrowth: string[];
  recommendations: string[];
  trend: 'improving' | 'stable' | 'declining';
}

export interface Habit {
  id: string;
  name: string;
  description?: string;
  category: 'mindfulness' | 'exercise' | 'nutrition' | 'sleep' | 'social' | 'learning' | 'creativity';
  frequency: 'daily' | 'weekly' | 'custom';
  customFrequency?: {
    times: number;
    period: 'day' | 'week' | 'month';
  };
  timeOfDay?: 'morning' | 'afternoon' | 'evening' | 'anytime';
  duration?: number; // in minutes
  streak: number;
  longestStreak: number;
  completedDates: string[];
  completed: boolean;
  completedToday: boolean;
  reminderEnabled: boolean;
  reminderTime?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  isActive: boolean;
  createdAt: string;
}

export interface NutritionGuidance {
  id: string;
  title: string;
  description: string;
  category: 'meal-planning' | 'supplements' | 'hydration' | 'mindful-eating' | 'nutrition-education';
  content: string;
  imageUrl?: string;
  videoUrl?: string;
  recipes?: Recipe[];
  supplements?: Supplement[];
  tips: string[];
  isPersonalized: boolean;
}

export interface Recipe {
  id: string;
  name: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  prepTime: number; // in minutes
  cookTime: number; // in minutes
  servings: number;
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
  };
  tags: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  imageUrl?: string;
}

export interface Supplement {
  id: string;
  name: string;
  description: string;
  dosage: string;
  timing: string;
  benefits: string[];
  sideEffects?: string[];
  interactions?: string[];
  isRecommended: boolean;
  reason?: string;
}

export interface SleepOptimization {
  id: string;
  date: string;
  bedtime: string;
  wakeTime: string;
  sleepDuration: number; // in hours
  sleepQuality: number; // 1-10
  sleepStages: {
    deep: number;
    light: number;
    rem: number;
    awake: number;
  };
  factors: {
    caffeine: boolean;
    alcohol: boolean;
    exercise: boolean;
    screenTime: boolean;
    stress: number;
    environment: number;
  };
  recommendations: string[];
  sleepScore: number; // 0-100
}

export interface StressOptimization {
  id: string;
  date: string;
  stressLevel: number; // 1-10
  stressors: string[];
  copingStrategies: string[];
  effectiveness: { [strategy: string]: number }; // 1-10
  physiologicalMarkers: {
    heartRate?: number;
    heartRateVariability?: number;
    cortisol?: number;
    bloodPressure?: {
      systolic: number;
      diastolic: number;
    };
  };
  recommendations: string[];
  interventions: string[];
}

export interface AIWellnessCopilot {
  id: string;
  name: string;
  specialty: 'general' | 'anxiety' | 'depression' | 'stress' | 'sleep' | 'relationships' | 'trauma';
  personality: 'supportive' | 'direct' | 'gentle' | 'motivational';
  avatar: string;
  description: string;
  isActive: boolean;
}

export interface WellnessTrigger {
  id: string;
  name: string;
  description: string;
  type: 'location' | 'time' | 'mood' | 'stress' | 'activity' | 'social';
  conditions: {
    location?: string;
    timeOfDay?: string;
    dayOfWeek?: number[];
    moodBelow?: number;
    stressAbove?: number;
    activity?: string;
  };
  actions: {
    type: 'meditation' | 'breathing' | 'journaling' | 'movement' | 'social' | 'professional-help';
    content: string;
    duration?: number;
  }[];
  enabled: boolean;
  isActive: boolean;
  triggeredCount: number;
  lastTriggered?: string;
}

export interface CulturalWellnessModel {
  id: string;
  name: string;
  culture: string;
  description: string;
  practices: {
    id: string;
    name: string;
    description: string;
    instructions: string;
    duration: number;
    category: 'meditation' | 'movement' | 'ritual' | 'community' | 'healing';
  }[];
  philosophy: string;
  benefits: string[];
  enabled: boolean;
  isActive: boolean;
}

export interface CrossDomainIntervention {
  id: string;
  name: string;
  description: string;
  domains: ('health' | 'fitness' | 'wellness' | 'nutrition')[];
  triggers: {
    domain: string;
    condition: string;
    threshold: number;
  }[];
  interventions: {
    domain: string;
    action: string;
    parameters: { [key: string]: any };
  }[];
  effectiveness: number; // 0-100
  isActive: boolean;
}