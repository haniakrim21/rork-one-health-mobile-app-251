import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface AppSettings {
  // Appearance
  darkMode: boolean;
  language: string;
  units: 'metric' | 'imperial';
  
  // Audio & Haptics
  soundEffects: boolean;
  hapticFeedback: boolean;
  
  // Data & Sync
  autoSync: boolean;
  offlineMode: boolean;
  highQualityImages: boolean;
  backgroundRefresh: boolean;
  
  // Advanced
  betaFeatures: boolean;
  
  // App Info
  version: string;
  build: string;
  lastUpdated: string;
}

interface SettingsState {
  settings: AppSettings;
  isLoading: boolean;
  isHydrated: boolean;
  updateSetting: <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => void;
  resetSettings: () => void;
  clearCache: () => Promise<void>;
  setHydrated: (hydrated: boolean) => void;
}

const defaultSettings: AppSettings = {
  darkMode: true,
  language: 'Arabic',
  units: 'metric',
  soundEffects: true,
  hapticFeedback: true,
  autoSync: true,
  offlineMode: false,
  highQualityImages: true,
  backgroundRefresh: true,
  betaFeatures: false,
  version: '1.0.0',
  build: '2024.01.15',
  lastUpdated: 'January 15, 2024',
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set, get) => ({
      settings: defaultSettings,
      isLoading: false,
      isHydrated: false,
      
      setHydrated: (hydrated: boolean) => {
        set({ isHydrated: hydrated });
      },
      
      updateSetting: (key, value) => {
        set((state) => ({
          settings: {
            ...state.settings,
            [key]: value,
          },
        }));
      },
      
      resetSettings: () => {
        set({ settings: { ...defaultSettings } });
      },
      
      clearCache: async () => {
        try {
          return Promise.resolve();
        } catch (error) {
          console.error('Error clearing cache:', error);
          throw error;
        }
      },
    }),
    {
      name: 'app-settings',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => {
        return (state, error) => {
          if (error) {
            console.error('Settings rehydration error:', error);
          }
          if (state) {
            state.setHydrated(true);
          }
        };
      },
      partialize: (state) => ({ settings: state.settings }),
    }
  )
);