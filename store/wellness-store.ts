import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  WellnessPath,
  MeditationSession,
  TherapySession,
  MoodEntry,
  DailyCheckIn,
  CognitiveBehavioralNudge,
  EnergyScore,
  ResilienceScore,
  Habit,
  NutritionGuidance,
  SleepOptimization,
  StressOptimization,
  AIWellnessCopilot,
  WellnessTrigger,
  CulturalWellnessModel,
  CrossDomainIntervention
} from '@/types/wellness';

interface WellnessState {
  // Wellness Paths
  wellnessPaths: WellnessPath[];
  activeWellnessPath?: WellnessPath;
  
  // Meditation & Therapy
  meditationSessions: MeditationSession[];
  therapySessions: TherapySession[];
  favoriteMeditations: string[];
  
  // Mood & Check-ins
  moodEntries: MoodEntry[];
  dailyCheckIns: DailyCheckIn[];
  
  // Nudges & Scores
  cognitiveBehavioralNudges: CognitiveBehavioralNudge[];
  energyScores: EnergyScore[];
  resilienceScores: ResilienceScore[];
  
  // Habits
  habits: Habit[];
  
  // Guidance & Optimization
  nutritionGuidance: NutritionGuidance[];
  sleepOptimization: SleepOptimization[];
  stressOptimization: StressOptimization[];
  
  // AI & Triggers
  aiWellnessCopilots: AIWellnessCopilot[];
  activeAICopilot?: AIWellnessCopilot;
  wellnessTriggers: WellnessTrigger[];
  
  // Cultural & Cross-domain
  culturalWellnessModels: CulturalWellnessModel[];
  crossDomainInterventions: CrossDomainIntervention[];
  
  // Actions
  addMoodEntry: (entry: Omit<MoodEntry, 'id'>) => void;
  addDailyCheckIn: (checkIn: Omit<DailyCheckIn, 'id'>) => void;
  toggleHabit: (habitId: string) => void;
  addHabit: (habit: Omit<Habit, 'id' | 'streak' | 'longestStreak' | 'completedDates' | 'points' | 'createdAt'>) => void;
  updateHabit: (habitId: string, updates: Partial<Habit>) => void;
  deleteHabit: (habitId: string) => void;
  
  startWellnessPath: (pathId: string) => void;
  completeWellnessModule: (pathId: string, moduleId: string) => void;
  
  toggleMeditationFavorite: (sessionId: string) => void;
  completeMeditationSession: (sessionId: string) => void;
  
  dismissNudge: (nudgeId: string) => void;
  addEnergyScore: (score: Omit<EnergyScore, 'id'>) => void;
  addResilienceScore: (score: Omit<ResilienceScore, 'id'>) => void;
  
  setActiveAICopilot: (copilotId: string) => void;
  toggleWellnessTrigger: (triggerId: string) => void;
  toggleCulturalModel: (modelId: string) => void;
  
  // Getters
  getCurrentEnergyScore: () => EnergyScore | undefined;
  getCurrentResilienceScore: () => ResilienceScore | undefined;
  getActiveHabits: () => Habit[];
  getTodaysMoodEntry: () => MoodEntry | undefined;
  getTodaysCheckIn: () => DailyCheckIn | undefined;
  getActiveNudges: () => CognitiveBehavioralNudge[];
}

const initialState = {
  wellnessPaths: [],
  meditationSessions: [],
  therapySessions: [],
  favoriteMeditations: [],
  moodEntries: [],
  dailyCheckIns: [],
  cognitiveBehavioralNudges: [],
  energyScores: [],
  resilienceScores: [],
  habits: [],
  nutritionGuidance: [],
  sleepOptimization: [],
  stressOptimization: [],
  aiWellnessCopilots: [],
  wellnessTriggers: [],
  culturalWellnessModels: [],
  crossDomainInterventions: [],
};

export const useWellnessStore = create<WellnessState>()(
  persist(
    (set, get) => ({
      ...initialState,
      
      // Actions
      addMoodEntry: (entry) => {
        const newEntry: MoodEntry = {
          ...entry,
          id: Date.now().toString(),
        };
        
        set((state) => ({
          moodEntries: [newEntry, ...(state.moodEntries || [])],
        }));
      },
      
      addDailyCheckIn: (checkIn) => {
        const newCheckIn: DailyCheckIn = {
          ...checkIn,
          id: Date.now().toString(),
        };
        
        set((state) => ({
          dailyCheckIns: [newCheckIn, ...(state.dailyCheckIns || [])],
        }));
      },
      
      toggleHabit: (habitId) => {
        const today = new Date().toISOString().split('T')[0];
        
        set((state) => ({
          habits: (state.habits || []).map((habit) => {
            if (habit.id === habitId) {
              const completedDates = habit.completedDates || [];
              const isCompleting = !completedDates.includes(today);
              const newCompletedDates = isCompleting
                ? [...completedDates, today]
                : completedDates.filter(date => date !== today);
              
              const newStreak = isCompleting ? (habit.streak || 0) + 1 : Math.max(0, (habit.streak || 0) - 1);
              const newLongestStreak = Math.max(habit.longestStreak || 0, newStreak);
              const newPoints = (habit.points || 0) + (isCompleting ? 10 : -5);
              
              return {
                ...habit,
                completedDates: newCompletedDates,
                streak: newStreak,
                longestStreak: newLongestStreak,
                points: Math.max(0, newPoints),
              };
            }
            return habit;
          }),
        }));
      },
      
      addHabit: (habit) => {
        const newHabit: Habit = {
          ...habit,
          id: Date.now().toString(),
          streak: 0,
          longestStreak: 0,
          completedDates: [],
          points: 0,
          createdAt: new Date().toISOString(),
        };
        
        set((state) => ({
          habits: [...(state.habits || []), newHabit],
        }));
      },
      
      updateHabit: (habitId, updates) => {
        set((state) => ({
          habits: (state.habits || []).map((habit) =>
            habit.id === habitId ? { ...habit, ...updates } : habit
          ),
        }));
      },
      
      deleteHabit: (habitId) => {
        set((state) => ({
          habits: (state.habits || []).filter((habit) => habit.id !== habitId),
        }));
      },
      
      startWellnessPath: (pathId) => {
        set((state) => ({
          wellnessPaths: (state.wellnessPaths || []).map((path) =>
            path.id === pathId
              ? { ...path, isActive: true, startedAt: new Date().toISOString() }
              : { ...path, isActive: false }
          ),
          activeWellnessPath: (state.wellnessPaths || []).find(path => path.id === pathId),
        }));
      },
      
      completeWellnessModule: (pathId, moduleId) => {
        set((state) => ({
          wellnessPaths: (state.wellnessPaths || []).map((path) => {
            if (path.id === pathId) {
              const updatedModules = (path.modules || []).map((module) =>
                module.id === moduleId
                  ? { ...module, completed: true, completedAt: new Date().toISOString() }
                  : module
              );
              
              const completedModules = updatedModules.filter(m => m.completed).length;
              const progress = updatedModules.length > 0 ? (completedModules / updatedModules.length) * 100 : 0;
              
              return {
                ...path,
                modules: updatedModules,
                progress,
                completedAt: progress === 100 ? new Date().toISOString() : path.completedAt,
              };
            }
            return path;
          }),
        }));
      },
      
      toggleMeditationFavorite: (sessionId) => {
        set((state) => {
          const favoriteMeditations = state.favoriteMeditations || [];
          const isFavorite = favoriteMeditations.includes(sessionId);
          return {
            favoriteMeditations: isFavorite
              ? favoriteMeditations.filter(id => id !== sessionId)
              : [...favoriteMeditations, sessionId],
          };
        });
      },
      
      completeMeditationSession: (sessionId) => {
        set((state) => ({
          meditationSessions: (state.meditationSessions || []).map((session) =>
            session.id === sessionId
              ? { 
                  ...session, 
                  completed: true, 
                  completedAt: new Date().toISOString(),
                  playCount: (session.playCount || 0) + 1
                }
              : session
          ),
        }));
      },
      
      dismissNudge: (nudgeId) => {
        set((state) => ({
          cognitiveBehavioralNudges: (state.cognitiveBehavioralNudges || []).map((nudge) =>
            nudge.id === nudgeId ? { ...nudge, dismissed: true } : nudge
          ),
        }));
      },
      
      addEnergyScore: (score) => {
        const newScore: EnergyScore = {
          ...score,
          id: Date.now().toString(),
        };
        
        set((state) => ({
          energyScores: [newScore, ...(state.energyScores || [])],
        }));
      },
      
      addResilienceScore: (score) => {
        const newScore: ResilienceScore = {
          ...score,
          id: Date.now().toString(),
        };
        
        set((state) => ({
          resilienceScores: [newScore, ...(state.resilienceScores || [])],
        }));
      },
      
      setActiveAICopilot: (copilotId) => {
        set((state) => ({
          activeAICopilot: (state.aiWellnessCopilots || []).find(copilot => copilot.id === copilotId),
        }));
      },
      
      toggleWellnessTrigger: (triggerId) => {
        set((state) => ({
          wellnessTriggers: (state.wellnessTriggers || []).map((trigger) =>
            trigger.id === triggerId ? { ...trigger, isActive: !trigger.isActive } : trigger
          ),
        }));
      },
      
      toggleCulturalModel: (modelId) => {
        set((state) => ({
          culturalWellnessModels: (state.culturalWellnessModels || []).map((model) =>
            model.id === modelId ? { ...model, isActive: !model.isActive } : model
          ),
        }));
      },
      
      // Getters
      getCurrentEnergyScore: () => {
        const { energyScores } = get();
        return (energyScores || [])[0];
      },
      
      getCurrentResilienceScore: () => {
        const { resilienceScores } = get();
        return (resilienceScores || [])[0];
      },
      
      getActiveHabits: () => {
        const { habits } = get();
        return (habits || []).filter(habit => habit.isActive);
      },
      
      getTodaysMoodEntry: () => {
        const { moodEntries } = get();
        const today = new Date().toISOString().split('T')[0];
        return (moodEntries || []).find(entry => entry.timestamp && entry.timestamp.startsWith(today));
      },
      
      getTodaysCheckIn: () => {
        const { dailyCheckIns } = get();
        const today = new Date().toISOString().split('T')[0];
        return (dailyCheckIns || []).find(checkIn => checkIn.date === today);
      },
      
      getActiveNudges: () => {
        const { cognitiveBehavioralNudges } = get();
        return (cognitiveBehavioralNudges || []).filter(nudge => !nudge.dismissed);
      },
    }),
    {
      name: 'wellness-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        // Only persist essential data, not computed values
        wellnessPaths: state.wellnessPaths || [],
        favoriteMeditations: state.favoriteMeditations || [],
        moodEntries: state.moodEntries || [],
        dailyCheckIns: state.dailyCheckIns || [],
        energyScores: state.energyScores || [],
        resilienceScores: state.resilienceScores || [],
        habits: state.habits || [],
        activeAICopilot: state.activeAICopilot,
        wellnessTriggers: state.wellnessTriggers || [],
        culturalWellnessModels: state.culturalWellnessModels || [],
      }),
    }
  )
);