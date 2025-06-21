import { z } from "zod";
import { publicProcedure } from "../../../create-context";

// Define the schema for health metrics
const HealthMetricSchema = z.object({
  type: z.enum(['heart_rate', 'blood_pressure', 'blood_glucose', 'weight', 'sleep', 'steps', 'calories']),
  value: z.union([z.number(), z.string()]),
  unit: z.string(),
  timestamp: z.string(),
  source: z.enum(['manual', 'apple_health', 'fitbit', 'whoop', 'google_fit']),
});

// Mock data for health metrics
const mockHealthMetrics = [
  {
    id: '1',
    type: 'heart_rate',
    value: 72,
    unit: 'bpm',
    timestamp: '2025-06-17T08:30:00Z',
    source: 'apple_health',
  },
  {
    id: '2',
    type: 'blood_pressure',
    value: '120/80',
    unit: 'mmHg',
    timestamp: '2025-06-17T08:35:00Z',
    source: 'manual',
  },
  {
    id: '3',
    type: 'blood_glucose',
    value: 95,
    unit: 'mg/dL',
    timestamp: '2025-06-17T08:40:00Z',
    source: 'manual',
  },
  {
    id: '4',
    type: 'weight',
    value: 70.5,
    unit: 'kg',
    timestamp: '2025-06-17T07:00:00Z',
    source: 'fitbit',
  },
  {
    id: '5',
    type: 'sleep',
    value: 7.5,
    unit: 'hours',
    timestamp: '2025-06-17T07:05:00Z',
    source: 'whoop',
  },
  {
    id: '6',
    type: 'steps',
    value: 8104,
    unit: 'steps',
    timestamp: '2025-06-16T23:59:00Z',
    source: 'apple_health',
  },
  {
    id: '7',
    type: 'calories',
    value: 2150,
    unit: 'kcal',
    timestamp: '2025-06-16T23:59:00Z',
    source: 'fitbit',
  },
];

// Get all health metrics
export const getHealthMetrics = publicProcedure
  .query(() => {
    return mockHealthMetrics;
  });

// Add a new health metric
export const addHealthMetric = publicProcedure
  .input(HealthMetricSchema)
  .mutation(({ input }) => {
    const newMetric = {
      id: (mockHealthMetrics.length + 1).toString(),
      ...input,
    };
    
    // In a real app, we would add this to a database
    // For now, we'll just return the new metric
    return newMetric;
  });

// Update a health metric
export const updateHealthMetric = publicProcedure
  .input(z.object({
    id: z.string(),
    updates: HealthMetricSchema.partial()
  }))
  .mutation(({ input }) => {
    const metric = mockHealthMetrics.find(m => m.id === input.id);
    if (!metric) {
      throw new Error('Health metric not found');
    }
    
    // In a real app, we would update this in a database
    const updatedMetric = { ...metric, ...input.updates };
    return updatedMetric;
  });

// Delete a health metric
export const deleteHealthMetric = publicProcedure
  .input(z.object({ id: z.string() }))
  .mutation(({ input }) => {
    const metricIndex = mockHealthMetrics.findIndex(m => m.id === input.id);
    if (metricIndex === -1) {
      throw new Error('Health metric not found');
    }
    
    // In a real app, we would delete this from a database
    return { success: true, deletedId: input.id };
  });

// Get health insights
export const getHealthInsights = publicProcedure
  .input(z.object({ patientId: z.string() }))
  .query(({ input }) => {
    return {
      insights: [
        {
          category: 'Heart Health',
          insight: 'Your resting heart rate has improved by 5% this month',
          recommendation: 'Continue your current exercise routine',
          trend: 'improving',
        },
        {
          category: 'Sleep Quality',
          insight: 'Average sleep duration is 7.5 hours, which is optimal',
          recommendation: 'Maintain consistent sleep schedule',
          trend: 'stable',
        },
      ],
      generatedAt: new Date().toISOString(),
    };
  });