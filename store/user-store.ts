import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserProfile, PersonalizedGoal, GoalMilestone } from '@/types';

interface UserState {
  user: UserProfile | null;
  isLoading: boolean;
  error: string | null;
  setUser: (user: UserProfile) => void;
  updateUser: (updates: Partial<UserProfile>) => void;
  clearUser: () => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  addGoal: (goal: Omit<PersonalizedGoal, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateGoal: (goalId: string, updates: Partial<PersonalizedGoal>) => void;
  deleteGoal: (goalId: string) => void;
  updateGoalProgress: (goalId: string, progress: number) => void;
  completeGoal: (goalId: string) => void;
  addGoalMilestone: (goalId: string, milestone: Omit<GoalMilestone, 'id'>) => void;
  completeMilestone: (goalId: string, milestoneId: string) => void;
}

// Simplified default user for development
const createDefaultUser = (): UserProfile => ({
  id: 'default-user',
  name: 'Alex Johnson',
  email: 'alex.johnson@example.com',
  profilePicture: undefined,
  gender: 'prefer-not-to-say',
  height: 175,
  weight: 70,
  fitnessLevel: 'intermediate',
  commitmentLevel: 'medium',
  checkInFrequency: 'weekly',
  completedOnboarding: false, // Start with onboarding
  
  lifestyle: {
    sleepHours: 7,
    stressLevel: 4,
    activityLevel: 'moderately-active',
    smokingStatus: 'never',
    alcoholConsumption: 'occasional',
    dietaryPreferences: [],
    allergies: [],
  },
  
  behavioral: {
    motivationStyle: 'supportive',
    preferredWorkoutTime: 'morning',
    reminderStyle: 'gentle',
  },
  
  medicalHistory: {
    chronicConditions: [],
    fitnessLimitations: [],
    ehrIntegration: {
      connected: false,
    },
  },
  
  goalPersonalization: {
    primaryFocus: 'balanced',
    motivationFactors: [],
    preferredGoalTimeframe: 'medium',
    trackingPreference: 'simple',
    celebrationStyle: 'private',
  },
  
  // Legacy properties for compatibility
  fitnessGoals: [],
  healthConditions: [],
  medications: [],
  medicationNames: [],
  allergies: [],
  medicalConditions: [],
  emergencyContact: {
    name: '',
    phone: '',
    relationship: '',
  },
  preferences: {
    units: 'metric',
    notifications: true,
    dataSharing: false,
    language: 'en',
    timezone: 'America/New_York',
  },
  goals: [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null, // Start with no user to trigger onboarding
      isLoading: false,
      error: null,
      
      setUser: (user) => set({ user, error: null }),
      
      updateUser: (updates) => 
        set((state) => ({ 
          user: state.user ? { 
            ...state.user, 
            ...updates,
            updatedAt: new Date().toISOString()
          } : createDefaultUser(),
          error: null
        })),
      
      clearUser: () => set({ user: null, error: null }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      
      addGoal: (goalData) => {
        const newGoal: PersonalizedGoal = {
          ...goalData,
          id: `goal_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          status: goalData.status || 'not_started',
          progress: goalData.progress || 0,
          completed: goalData.completed || false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        
        set((state) => ({
          user: state.user ? {
            ...state.user,
            goals: [...(state.user.goals || []), newGoal],
            updatedAt: new Date().toISOString()
          } : null
        }));
      },
      
      updateGoal: (goalId, updates) => {
        set((state) => ({
          user: state.user ? {
            ...state.user,
            goals: (state.user.goals || []).map(goal => 
              goal.id === goalId 
                ? { ...goal, ...updates, updatedAt: new Date().toISOString() }
                : goal
            ),
            updatedAt: new Date().toISOString()
          } : null
        }));
      },
      
      deleteGoal: (goalId) => {
        set((state) => ({
          user: state.user ? {
            ...state.user,
            goals: (state.user.goals || []).filter(goal => goal.id !== goalId),
            updatedAt: new Date().toISOString()
          } : null
        }));
      },
      
      updateGoalProgress: (goalId, progress) => {
        set((state) => ({
          user: state.user ? {
            ...state.user,
            goals: (state.user.goals || []).map(goal => 
              goal.id === goalId 
                ? { 
                    ...goal, 
                    progress: Math.min(100, Math.max(0, progress)),
                    completed: progress >= 100,
                    completedAt: progress >= 100 ? new Date().toISOString() : undefined,
                    updatedAt: new Date().toISOString()
                  }
                : goal
            ),
            updatedAt: new Date().toISOString()
          } : null
        }));
      },
      
      completeGoal: (goalId) => {
        set((state) => ({
          user: state.user ? {
            ...state.user,
            goals: (state.user.goals || []).map(goal => 
              goal.id === goalId 
                ? { 
                    ...goal, 
                    progress: 100,
                    completed: true,
                    completedAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                  }
                : goal
            ),
            updatedAt: new Date().toISOString()
          } : null
        }));
      },
      
      addGoalMilestone: (goalId, milestoneData) => {
        const newMilestone: GoalMilestone = {
          ...milestoneData,
          id: `milestone_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        };
        
        set((state) => ({
          user: state.user ? {
            ...state.user,
            goals: (state.user.goals || []).map(goal => 
              goal.id === goalId 
                ? { 
                    ...goal, 
                    milestones: [...(goal.milestones || []), newMilestone],
                    updatedAt: new Date().toISOString()
                  }
                : goal
            ),
            updatedAt: new Date().toISOString()
          } : null
        }));
      },
      
      completeMilestone: (goalId, milestoneId) => {
        set((state) => ({
          user: state.user ? {
            ...state.user,
            goals: (state.user.goals || []).map(goal => 
              goal.id === goalId 
                ? { 
                    ...goal, 
                    milestones: (goal.milestones || []).map(milestone =>
                      milestone.id === milestoneId
                        ? { ...milestone, completed: true, completedAt: new Date().toISOString() }
                        : milestone
                    ),
                    updatedAt: new Date().toISOString()
                  }
                : goal
            ),
            updatedAt: new Date().toISOString()
          } : null
        }));
      },
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ user: state.user }), // Only persist user data
    }
  )
);