import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
  Workout, 
  Exercise, 
  WorkoutExercise, 
  WorkoutSet,
  Challenge,
  FitnessGoal,
  Achievement
} from '@/types';

export interface Trainer {
  id: string;
  name: string;
  specialties: string[];
  rating: number;
  experience: string;
  profilePicture: string;
  bio: string;
  certifications: string[];
  hourlyRate: number;
  availability: string[];
  isBooked?: boolean;
}

export interface ReadinessMetrics {
  readinessScore: number; // 0-100
  strainScore: number; // 0-100
  heartRateVariability: number;
  sleepQuality: number;
  recoveryTime: number; // hours
  lastUpdated: string;
}

export interface FitnessAssessment {
  id: string;
  date: string;
  overallScore: number;
  results: {
    testId: string;
    value: number;
    metric: string;
    percentile?: number;
  }[];
  recommendations: string[];
}

export interface TrainingPlan {
  id: string;
  name: string;
  description: string;
  duration: number; // weeks
  workouts: Workout[];
  isAI: boolean;
  adaptations: number;
  createdAt: string;
}

interface FitnessState {
  workouts: Workout[];
  trainers: Trainer[];
  challenges: Challenge[];
  fitnessGoals: FitnessGoal[];
  readinessMetrics: ReadinessMetrics | null;
  assessments: FitnessAssessment[];
  trainingPlans: TrainingPlan[];
  currentPlan: TrainingPlan | null;
  weeklyGoal: number; // minutes
  weeklyProgress: number; // minutes
  totalPoints: number;
  isLoading: boolean;
  error: string | null;
  
  // Workouts
  addWorkout: (workout: Workout) => void;
  updateWorkout: (id: string, updates: Partial<Workout>) => void;
  deleteWorkout: (id: string) => void;
  completeWorkout: (id: string, caloriesBurned?: number, adaptiveAdjustments?: number) => void;
  getCompletedWorkouts: () => Workout[];
  
  // Trainers
  addTrainer: (trainer: Trainer) => void;
  updateTrainer: (id: string, updates: Partial<Trainer>) => void;
  bookTrainer: (id: string) => void;
  
  // Challenges
  addChallenge: (challenge: Challenge) => void;
  updateChallenge: (id: string, updates: Partial<Challenge>) => void;
  joinChallenge: (id: string) => void;
  updateChallengeProgress: (id: string, progress: number) => void;
  completeChallenge: (id: string) => void;
  
  // Fitness Goals
  addFitnessGoal: (goal: FitnessGoal) => void;
  updateFitnessGoal: (id: string, updates: Partial<FitnessGoal>) => void;
  deleteFitnessGoal: (id: string) => void;
  completeFitnessGoal: (id: string) => void;
  
  // Readiness & Recovery
  updateReadinessMetrics: (metrics: Partial<ReadinessMetrics>) => void;
  
  // Assessments
  addAssessment: (assessment: FitnessAssessment) => void;
  
  // Training Plans
  addTrainingPlan: (plan: TrainingPlan) => void;
  setCurrentPlan: (planId: string) => void;
  updatePlanAdaptations: (planId: string, adaptations: number) => void;
  
  // Progress
  updateWeeklyProgress: (minutes: number) => void;
  addPoints: (points: number) => void;
  
  // State management
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

const initialState = {
  workouts: [],
  trainers: [
    {
      id: 'trainer-1',
      name: 'Sarah Johnson',
      specialties: ['Strength Training', 'HIIT'],
      rating: 4.8,
      experience: '5 years',
      profilePicture: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400',
      bio: 'Certified personal trainer specializing in strength and conditioning.',
      certifications: ['NASM-CPT', 'CSCS'],
      hourlyRate: 75,
      availability: ['Monday', 'Wednesday', 'Friday'],
      isBooked: false,
    },
    {
      id: 'trainer-2',
      name: 'Mike Chen',
      specialties: ['Yoga', 'Flexibility'],
      rating: 4.9,
      experience: '8 years',
      profilePicture: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
      bio: 'Yoga instructor and flexibility specialist.',
      certifications: ['RYT-500', 'NASM-CES'],
      hourlyRate: 65,
      availability: ['Tuesday', 'Thursday', 'Saturday'],
      isBooked: false,
    },
  ],
  challenges: [],
  fitnessGoals: [],
  readinessMetrics: null,
  assessments: [],
  trainingPlans: [],
  currentPlan: null,
  weeklyGoal: 150,
  weeklyProgress: 0,
  totalPoints: 0,
  isLoading: false,
  error: null,
};

export const useFitnessStore = create<FitnessState>()(
  persist(
    (set, get) => ({
      ...initialState,
      
      // Workouts
      addWorkout: (workout) => 
        set((state) => ({ 
          workouts: [...(state.workouts || []), workout],
          error: null
        })),
      updateWorkout: (id, updates) => 
        set((state) => ({ 
          workouts: (state.workouts || []).map(workout => 
            workout.id === id ? { ...workout, ...updates } : workout
          ),
          error: null
        })),
      deleteWorkout: (id) => 
        set((state) => ({ 
          workouts: (state.workouts || []).filter(workout => workout.id !== id),
          error: null
        })),
      completeWorkout: (id, caloriesBurned, adaptiveAdjustments) => 
        set((state) => {
          const workouts = state.workouts || [];
          const workout = workouts.find(w => w.id === id);
          const updatedWorkouts = workouts.map(workout => 
            workout.id === id ? { 
              ...workout, 
              completed: true,
              completedAt: new Date().toISOString(),
              caloriesBurned,
              adaptiveAdjustments
            } : workout
          );
          
          // Update weekly progress
          const newProgress = (state.weeklyProgress || 0) + (workout?.duration || 0);
          
          // Award points based on workout completion
          const points = Math.floor((workout?.duration || 0) * 2) + (adaptiveAdjustments || 0) * 5;
          
          return {
            workouts: updatedWorkouts,
            weeklyProgress: newProgress,
            totalPoints: (state.totalPoints || 0) + points,
            error: null
          };
        }),
      getCompletedWorkouts: () => {
        const state = get();
        return (state.workouts || []).filter(workout => workout && workout.completed);
      },
      
      // Trainers
      addTrainer: (trainer) => 
        set((state) => ({ 
          trainers: [...(state.trainers || []), trainer],
          error: null
        })),
      updateTrainer: (id, updates) => 
        set((state) => ({ 
          trainers: (state.trainers || []).map(trainer => 
            trainer.id === id ? { ...trainer, ...updates } : trainer
          ),
          error: null
        })),
      bookTrainer: (id) => 
        set((state) => ({ 
          trainers: (state.trainers || []).map(trainer => 
            trainer.id === id ? { ...trainer, isBooked: true } : trainer
          ),
          error: null
        })),
      
      // Challenges
      addChallenge: (challenge) => 
        set((state) => ({ 
          challenges: [...(state.challenges || []), challenge],
          error: null
        })),
      updateChallenge: (id, updates) => 
        set((state) => ({ 
          challenges: (state.challenges || []).map(challenge => 
            challenge.id === id ? { ...challenge, ...updates } : challenge
          ),
          error: null
        })),
      joinChallenge: (id) => 
        set((state) => ({ 
          challenges: (state.challenges || []).map(challenge => 
            challenge.id === id ? { ...challenge, isActive: true } : challenge
          ),
          error: null
        })),
      updateChallengeProgress: (id, progress) => 
        set((state) => ({ 
          challenges: (state.challenges || []).map(challenge => 
            challenge.id === id ? { 
              ...challenge, 
              progress,
              completed: progress >= 100
            } : challenge
          ),
          error: null
        })),
      completeChallenge: (id) => 
        set((state) => {
          const challenges = state.challenges || [];
          const challenge = challenges.find(c => c.id === id);
          const updatedChallenges = challenges.map(challenge => 
            challenge.id === id ? { 
              ...challenge, 
              completed: true,
              progress: 100
            } : challenge
          );
          
          // Award challenge points - use rewards array if available, fallback to reward property
          const points = challenge?.rewards?.[0]?.value || challenge?.reward || 0;
          
          return {
            challenges: updatedChallenges,
            totalPoints: (state.totalPoints || 0) + points,
            error: null
          };
        }),
      
      // Fitness Goals
      addFitnessGoal: (goal) => 
        set((state) => ({ 
          fitnessGoals: [...(state.fitnessGoals || []), goal],
          error: null
        })),
      updateFitnessGoal: (id, updates) => 
        set((state) => ({ 
          fitnessGoals: (state.fitnessGoals || []).map(goal => 
            goal.id === id ? { ...goal, ...updates } : goal
          ),
          error: null
        })),
      deleteFitnessGoal: (id) => 
        set((state) => ({ 
          fitnessGoals: (state.fitnessGoals || []).filter(goal => goal.id !== id),
          error: null
        })),
      completeFitnessGoal: (id) => 
        set((state) => {
          const fitnessGoals = state.fitnessGoals || [];
          const updatedGoals = fitnessGoals.map(goal => 
            goal.id === id ? { 
              ...goal, 
              completed: true,
              progress: 100,
              completedAt: new Date().toISOString()
            } : goal
          );
          
          // Award points for goal completion
          const points = 100;
          
          return {
            fitnessGoals: updatedGoals,
            totalPoints: (state.totalPoints || 0) + points,
            error: null
          };
        }),
      
      // Readiness & Recovery
      updateReadinessMetrics: (metrics) => 
        set((state) => ({ 
          readinessMetrics: {
            ...state.readinessMetrics,
            ...metrics,
            lastUpdated: new Date().toISOString()
          } as ReadinessMetrics,
          error: null
        })),
      
      // Assessments
      addAssessment: (assessment) => 
        set((state) => ({ 
          assessments: [...(state.assessments || []), assessment],
          error: null
        })),
      
      // Training Plans
      addTrainingPlan: (plan) => 
        set((state) => ({ 
          trainingPlans: [...(state.trainingPlans || []), plan],
          error: null
        })),
      setCurrentPlan: (planId) => 
        set((state) => {
          const trainingPlans = state.trainingPlans || [];
          const plan = trainingPlans.find(p => p.id === planId);
          return {
            currentPlan: plan || null,
            error: null
          };
        }),
      updatePlanAdaptations: (planId, adaptations) => 
        set((state) => {
          const trainingPlans = state.trainingPlans || [];
          return {
            trainingPlans: trainingPlans.map(plan => 
              plan.id === planId ? { ...plan, adaptations } : plan
            ),
            currentPlan: state.currentPlan?.id === planId 
              ? { ...state.currentPlan, adaptations }
              : state.currentPlan,
            error: null
          };
        }),
      
      // Progress
      updateWeeklyProgress: (minutes) => 
        set((state) => ({ 
          weeklyProgress: Math.min(state.weeklyGoal || 150, (state.weeklyProgress || 0) + minutes),
          error: null
        })),
      addPoints: (points) => 
        set((state) => ({ 
          totalPoints: (state.totalPoints || 0) + points,
          error: null
        })),
      
      // State management
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
    }),
    {
      name: 'fitness-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        workouts: state.workouts || [],
        trainers: state.trainers || [],
        challenges: state.challenges || [],
        fitnessGoals: state.fitnessGoals || [],
        readinessMetrics: state.readinessMetrics,
        assessments: state.assessments || [],
        trainingPlans: state.trainingPlans || [],
        currentPlan: state.currentPlan,
        weeklyGoal: state.weeklyGoal || 150,
        weeklyProgress: state.weeklyProgress || 0,
        totalPoints: state.totalPoints || 0,
      }),
    }
  )
);