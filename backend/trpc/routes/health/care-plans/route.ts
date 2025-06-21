import { z } from "zod";
import { publicProcedure } from "../../../create-context";

// Define the schema for care plans
const CarePlanSchema = z.object({
  patientId: z.string(),
  condition: z.string(),
  goals: z.array(z.string()),
  interventions: z.array(z.object({
    type: z.enum(['medication', 'lifestyle', 'monitoring', 'appointment']),
    description: z.string(),
    frequency: z.string(),
    duration: z.string().optional(),
  })),
  timeline: z.string(),
  providers: z.array(z.object({
    name: z.string(),
    role: z.string(),
    contact: z.string(),
  })),
});

// Mock care plans
const mockCarePlans = [
  {
    id: '1',
    patientId: 'user1',
    condition: 'Hypertension Management',
    goals: [
      'Reduce blood pressure to below 130/80 mmHg',
      'Maintain healthy weight',
      'Improve cardiovascular fitness',
      'Reduce sodium intake',
    ],
    interventions: [
      {
        type: 'medication',
        description: 'Take Lisinopril 10mg daily',
        frequency: 'Once daily',
        duration: 'Ongoing',
      },
      {
        type: 'monitoring',
        description: 'Check blood pressure twice daily',
        frequency: 'Twice daily',
        duration: '2 weeks, then weekly',
      },
      {
        type: 'lifestyle',
        description: 'Follow DASH diet plan',
        frequency: 'Daily',
        duration: 'Ongoing',
      },
      {
        type: 'lifestyle',
        description: 'Exercise 30 minutes moderate intensity',
        frequency: '5 days per week',
        duration: 'Ongoing',
      },
      {
        type: 'appointment',
        description: 'Follow-up with cardiologist',
        frequency: 'Every 3 months',
        duration: '1 year',
      },
    ],
    timeline: '6 months initial plan with quarterly reviews',
    providers: [
      {
        name: 'Dr. Sarah Johnson',
        role: 'Cardiologist',
        contact: 'sarah.johnson@healthcenter.com',
      },
      {
        name: 'Lisa Chen, RN',
        role: 'Care Coordinator',
        contact: 'lisa.chen@healthcenter.com',
      },
    ],
    createdAt: '2025-06-01T00:00:00Z',
    updatedAt: '2025-06-15T00:00:00Z',
    progress: {
      overallCompletion: 75,
      goalsAchieved: 2,
      totalGoals: 4,
      interventionsCompleted: 3,
      totalInterventions: 5,
    },
  },
  {
    id: '2',
    patientId: 'user1',
    condition: 'Diabetes Type 2 Management',
    goals: [
      'Maintain HbA1c below 7%',
      'Achieve target weight loss of 10 pounds',
      'Prevent diabetic complications',
      'Improve medication adherence',
    ],
    interventions: [
      {
        type: 'medication',
        description: 'Take Metformin 500mg twice daily',
        frequency: 'Twice daily',
        duration: 'Ongoing',
      },
      {
        type: 'monitoring',
        description: 'Check blood glucose levels',
        frequency: 'Before meals and bedtime',
        duration: 'Daily',
      },
      {
        type: 'lifestyle',
        description: 'Follow diabetic meal plan',
        frequency: 'Daily',
        duration: 'Ongoing',
      },
      {
        type: 'appointment',
        description: 'Quarterly HbA1c testing',
        frequency: 'Every 3 months',
        duration: 'Ongoing',
      },
    ],
    timeline: '12 months with monthly check-ins',
    providers: [
      {
        name: 'Dr. Michael Chen',
        role: 'Endocrinologist',
        contact: 'michael.chen@healthcenter.com',
      },
      {
        name: 'Maria Rodriguez, CDE',
        role: 'Diabetes Educator',
        contact: 'maria.rodriguez@healthcenter.com',
      },
    ],
    createdAt: '2025-05-15T00:00:00Z',
    updatedAt: '2025-06-10T00:00:00Z',
    progress: {
      overallCompletion: 60,
      goalsAchieved: 1,
      totalGoals: 4,
      interventionsCompleted: 2,
      totalInterventions: 4,
    },
  },
];

// Get all care plans for a patient
export const getCarePlans = publicProcedure
  .input(z.object({ patientId: z.string() }))
  .query(({ input }) => {
    return mockCarePlans.filter(plan => plan.patientId === input.patientId);
  });

// Get a specific care plan
export const getCarePlan = publicProcedure
  .input(z.object({ planId: z.string() }))
  .query(({ input }) => {
    const plan = mockCarePlans.find(p => p.id === input.planId);
    if (!plan) {
      throw new Error('Care plan not found');
    }
    return plan;
  });

// Create a new care plan
export const createCarePlan = publicProcedure
  .input(CarePlanSchema)
  .mutation(({ input }) => {
    const newCarePlan = {
      id: (mockCarePlans.length + 1).toString(),
      ...input,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      progress: {
        overallCompletion: 0,
        goalsAchieved: 0,
        totalGoals: input.goals.length,
        interventionsCompleted: 0,
        totalInterventions: input.interventions.length,
      },
    };
    
    // In a real app, we would add this to a database
    return newCarePlan;
  });

// Update a care plan
export const updateCarePlan = publicProcedure
  .input(z.object({
    planId: z.string(),
    updates: CarePlanSchema.partial(),
  }))
  .mutation(({ input }) => {
    const plan = mockCarePlans.find(p => p.id === input.planId);
    if (!plan) {
      throw new Error('Care plan not found');
    }
    
    // In a real app, we would update the database
    const updatedPlan = {
      ...plan,
      ...input.updates,
      updatedAt: new Date().toISOString(),
    };
    
    return updatedPlan;
  });

// Get care plan progress
export const getCarePlanProgress = publicProcedure
  .input(z.object({ planId: z.string() }))
  .query(({ input }) => {
    const plan = mockCarePlans.find(p => p.id === input.planId);
    if (!plan) {
      throw new Error('Care plan not found');
    }
    
    return {
      planId: input.planId,
      progress: plan.progress,
      recentActivities: [
        {
          type: 'goal_achieved',
          description: 'Blood pressure target reached',
          timestamp: '2025-06-15T10:00:00Z',
        },
        {
          type: 'intervention_completed',
          description: 'Completed 30-minute exercise session',
          timestamp: '2025-06-16T18:00:00Z',
        },
      ],
      upcomingTasks: [
        {
          type: 'appointment',
          description: 'Follow-up with cardiologist',
          dueDate: '2025-06-25T10:00:00Z',
        },
        {
          type: 'monitoring',
          description: 'Weekly blood pressure check',
          dueDate: '2025-06-20T08:00:00Z',
        },
      ],
    };
  });

// Generate AI-powered care plan recommendations
export const generateCarePlanRecommendations = publicProcedure
  .input(z.object({
    condition: z.string(),
    patientProfile: z.object({
      age: z.number(),
      gender: z.string(),
      medicalHistory: z.array(z.string()),
      currentMedications: z.array(z.string()),
      lifestyle: z.object({
        exerciseLevel: z.string(),
        diet: z.string(),
        smoking: z.boolean(),
        alcohol: z.string(),
      }),
    }),
  }))
  .mutation(({ input }) => {
    // This would use AI to generate personalized recommendations
    // For now, we'll return mock recommendations based on the condition
    
    const baseRecommendations = {
      goals: [
        `Manage ${input.condition} effectively`,
        'Improve overall health and quality of life',
        'Prevent complications',
        'Maintain medication adherence',
      ],
      interventions: [
        {
          type: 'monitoring',
          description: 'Regular health monitoring as recommended',
          frequency: 'As prescribed',
          duration: 'Ongoing',
        },
        {
          type: 'lifestyle',
          description: 'Follow evidence-based lifestyle modifications',
          frequency: 'Daily',
          duration: 'Ongoing',
        },
      ],
      timeline: '6-12 months with regular reviews',
    };
    
    return {
      ...baseRecommendations,
      aiConfidence: 85,
      evidenceLevel: 'High',
      lastUpdated: new Date().toISOString(),
      disclaimer: 'These recommendations are AI-generated and should be reviewed by a healthcare professional.',
    };
  });