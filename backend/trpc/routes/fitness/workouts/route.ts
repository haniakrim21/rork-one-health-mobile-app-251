import { z } from "zod";
import { publicProcedure } from "../../../create-context";

// Define the schema for exercises
const ExerciseSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  sets: z.number().optional(),
  reps: z.number().optional(),
  duration: z.number().optional(), // in seconds
  weight: z.number().optional(), // in kg
  restTime: z.number().optional(), // in seconds
  instructions: z.string().optional(),
  videoUrl: z.string().optional(),
  imageUrl: z.string().optional(),
});

// Define the schema for workouts
const WorkoutSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  type: z.enum(['strength', 'cardio', 'flexibility', 'balance', 'custom']),
  duration: z.number(), // in minutes
  caloriesBurned: z.number().optional(),
  exercises: z.array(ExerciseSchema),
  completed: z.boolean().default(false),
  scheduledFor: z.string().optional(),
  completedAt: z.string().optional(),
});

// Define the schema for workout sessions
const WorkoutSessionSchema = z.object({
  workoutId: z.string(),
  duration: z.number(), // actual duration in minutes
  caloriesBurned: z.number().optional(),
  exercises: z.array(z.object({
    exerciseId: z.string(),
    setsCompleted: z.number().optional(),
    repsCompleted: z.number().optional(),
    weightUsed: z.number().optional(),
    durationCompleted: z.number().optional(),
    notes: z.string().optional(),
  })),
  notes: z.string().optional(),
  completedAt: z.string().optional(),
});

// Mock data for workouts
const mockExercises = [
  {
    id: 'ex1',
    name: 'Push-ups',
    sets: 3,
    reps: 12,
    restTime: 60,
    instructions: 'Keep your core tight and elbows close to your body',
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHVzaCUyMHVwfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
  },
  {
    id: 'ex2',
    name: 'Squats',
    sets: 3,
    reps: 15,
    restTime: 60,
    instructions: 'Keep your weight in your heels and chest up',
    imageUrl: 'https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3F1YXR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
  },
  {
    id: 'ex3',
    name: 'Plank',
    duration: 60,
    sets: 3,
    restTime: 45,
    instructions: 'Keep your body in a straight line from head to heels',
    imageUrl: 'https://images.unsplash.com/photo-1566241142559-40e1dab266c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGxhbmt8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
  },
];

const mockWorkouts = [
  {
    id: '1',
    name: 'Full Body HIIT',
    type: 'cardio',
    duration: 30,
    caloriesBurned: 300,
    exercises: [mockExercises[1], mockExercises[0]],
    completed: false,
    scheduledFor: '2025-06-18',
  },
  {
    id: '2',
    name: 'Core Strength',
    type: 'strength',
    duration: 20,
    caloriesBurned: 200,
    exercises: [mockExercises[0], mockExercises[2]],
    completed: true,
    scheduledFor: '2025-06-16',
    completedAt: '2025-06-16T18:30:00Z',
  },
  {
    id: '3',
    name: 'Upper Body Strength',
    type: 'strength',
    duration: 30,
    caloriesBurned: 250,
    exercises: [mockExercises[0]],
    completed: false,
    scheduledFor: '2025-06-20',
  },
];

// Get all workouts
export const getWorkouts = publicProcedure
  .query(() => {
    return mockWorkouts;
  });

// Get workout by ID
export const getWorkout = publicProcedure
  .input(z.object({ id: z.string() }))
  .query(({ input }) => {
    const workout = mockWorkouts.find(w => w.id === input.id);
    if (!workout) {
      throw new Error('Workout not found');
    }
    return workout;
  });

// Create a new workout
export const createWorkout = publicProcedure
  .input(WorkoutSchema)
  .mutation(({ input }) => {
    const newWorkout = {
      id: (mockWorkouts.length + 1).toString(),
      ...input,
    };
    
    // In a real app, we would add this to a database
    // For now, we'll just return the new workout
    return newWorkout;
  });

// Update a workout
export const updateWorkout = publicProcedure
  .input(z.object({
    id: z.string(),
    updates: WorkoutSchema.partial()
  }))
  .mutation(({ input }) => {
    const workout = mockWorkouts.find(w => w.id === input.id);
    if (!workout) {
      throw new Error('Workout not found');
    }
    
    // In a real app, we would update this in a database
    const updatedWorkout = { ...workout, ...input.updates };
    return updatedWorkout;
  });

// Delete a workout
export const deleteWorkout = publicProcedure
  .input(z.object({ id: z.string() }))
  .mutation(({ input }) => {
    const workoutIndex = mockWorkouts.findIndex(w => w.id === input.id);
    if (workoutIndex === -1) {
      throw new Error('Workout not found');
    }
    
    // In a real app, we would delete this from a database
    return { success: true, deletedId: input.id };
  });

// Mark workout as completed
export const completeWorkout = publicProcedure
  .input(z.object({ id: z.string() }))
  .mutation(({ input }) => {
    const workout = mockWorkouts.find(w => w.id === input.id);
    if (!workout) {
      throw new Error('Workout not found');
    }
    
    // In a real app, we would update this in a database
    // For now, we'll just return the updated workout
    return {
      ...workout,
      completed: true,
      completedAt: new Date().toISOString(),
    };
  });

// Get fitness insights
export const getFitnessInsights = publicProcedure
  .input(z.object({ 
    period: z.enum(['week', 'month', 'year']).optional().default('week')
  }))
  .query(({ input }) => {
    // In a real app, we would calculate from actual data
    return {
      period: input.period,
      totalWorkouts: 12,
      totalDuration: 360, // minutes
      totalCalories: 2400,
      averageIntensity: 7.5,
      mostFrequentType: 'strength',
      streak: 5 // days
    };
  });