import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HealthMetric, Medication, Appointment } from '@/types';

interface HealthState {
  healthMetrics: HealthMetric[];
  medications: Medication[];
  appointments: Appointment[];
  isLoading: boolean;
  error: string | null;
  
  // Health Metrics
  addHealthMetric: (metric: Omit<HealthMetric, 'id'>) => void;
  updateHealthMetric: (id: string, updates: Partial<HealthMetric>) => void;
  deleteHealthMetric: (id: string) => void;
  
  // Medications
  addMedication: (medication: Omit<Medication, 'id'>) => void;
  updateMedication: (id: string, updates: Partial<Medication>) => void;
  deleteMedication: (id: string) => void;
  markMedicationTaken: (medicationId: string) => void;
  toggleMedication: (medicationId: string) => void;
  
  // Appointments
  addAppointment: (appointment: Omit<Appointment, 'id'>) => void;
  updateAppointment: (id: string, updates: Partial<Appointment>) => void;
  deleteAppointment: (id: string) => void;
  
  // State management
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

const initialState = {
  healthMetrics: [],
  medications: [],
  appointments: [],
  isLoading: false,
  error: null,
};

export const useHealthStore = create<HealthState>()(
  persist(
    (set, get) => ({
      ...initialState,
      
      // Health Metrics
      addHealthMetric: (metric) => {
        const newMetric: HealthMetric = {
          ...metric,
          id: `metric_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        };
        
        set((state) => ({
          healthMetrics: [newMetric, ...(state.healthMetrics || [])],
          error: null,
        }));
      },
      
      updateHealthMetric: (id, updates) => {
        set((state) => ({
          healthMetrics: (state.healthMetrics || []).map((metric) =>
            metric.id === id ? { ...metric, ...updates } : metric
          ),
          error: null,
        }));
      },
      
      deleteHealthMetric: (id) => {
        set((state) => ({
          healthMetrics: (state.healthMetrics || []).filter((metric) => metric.id !== id),
          error: null,
        }));
      },
      
      // Medications
      addMedication: (medication) => {
        const newMedication: Medication = {
          ...medication,
          id: `med_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        };
        
        set((state) => ({
          medications: [...(state.medications || []), newMedication],
          error: null,
        }));
      },
      
      updateMedication: (id, updates) => {
        set((state) => ({
          medications: (state.medications || []).map((medication) =>
            medication.id === id ? { ...medication, ...updates } : medication
          ),
          error: null,
        }));
      },
      
      deleteMedication: (id) => {
        set((state) => ({
          medications: (state.medications || []).filter((medication) => medication.id !== id),
          error: null,
        }));
      },
      
      markMedicationTaken: (medicationId) => {
        set((state) => ({
          medications: (state.medications || []).map((medication) => {
            if (medication.id === medicationId) {
              return {
                ...medication,
                notes: medication.notes ? `${medication.notes} - Last taken: ${new Date().toISOString()}` : `Last taken: ${new Date().toISOString()}`,
              };
            }
            return medication;
          }),
          error: null,
        }));
      },
      
      toggleMedication: (medicationId) => {
        set((state) => ({
          medications: (state.medications || []).map((medication) => {
            if (medication.id === medicationId) {
              const currentTime = new Date().toISOString();
              return {
                ...medication,
                notes: medication.notes ? `${medication.notes} - Toggled: ${currentTime}` : `Toggled: ${currentTime}`,
              };
            }
            return medication;
          }),
          error: null,
        }));
      },
      
      // Appointments
      addAppointment: (appointment) => {
        const newAppointment: Appointment = {
          ...appointment,
          id: `apt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        };
        
        set((state) => ({
          appointments: [...(state.appointments || []), newAppointment],
          error: null,
        }));
      },
      
      updateAppointment: (id, updates) => {
        set((state) => ({
          appointments: (state.appointments || []).map((appointment) =>
            appointment.id === id ? { ...appointment, ...updates } : appointment
          ),
          error: null,
        }));
      },
      
      deleteAppointment: (id) => {
        set((state) => ({
          appointments: (state.appointments || []).filter((appointment) => appointment.id !== id),
          error: null,
        }));
      },
      
      // State management
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
    }),
    {
      name: 'health-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        healthMetrics: state.healthMetrics || [],
        medications: state.medications || [],
        appointments: state.appointments || [],
      }),
    }
  )
);