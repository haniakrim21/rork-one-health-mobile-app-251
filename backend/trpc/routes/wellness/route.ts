import { z } from "zod";
import { publicProcedure } from "../../create-context";

// Get wellness paths
export const getWellnessPaths = publicProcedure
  .query(() => {
    return [
      {
        id: '1',
        name: 'Stress Management',
        description: 'Learn techniques to manage daily stress and improve mental wellbeing',
        category: 'stress',
        duration: 28, // days
        difficulty: 'beginner',
        modules: [
          {
            id: 'm1',
            name: 'Understanding Stress',
            description: 'Learn about how stress affects your body and mind',
            duration: 15, // minutes
            type: 'reading',
            content: 'Stress is your body\'s response to pressure...',
            completed: false
          },
          {
            id: 'm2',
            name: 'Breathing Techniques',
            description: 'Simple breathing exercises to reduce stress',
            duration: 10,
            type: 'meditation',
            content: 'Find a comfortable position and begin by taking a deep breath...',
            completed: false
          }
        ],
        progress: 0,
        completed: false,
        prerequisites: []
      },
      {
        id: '2',
        name: 'Better Sleep',
        description: 'Improve your sleep quality and establish healthy sleep routines',
        category: 'sleep',
        duration: 21,
        difficulty: 'beginner',
        modules: [
          {
            id: 'm3',
            name: 'Sleep Hygiene',
            description: 'Creating the optimal environment for sleep',
            duration: 20,
            type: 'reading',
            content: 'Sleep hygiene refers to habits that help you have a good night\'s sleep...',
            completed: false
          },
          {
            id: 'm4',
            name: 'Evening Wind-Down',
            description: 'A guided meditation to prepare for sleep',
            duration: 15,
            type: 'meditation',
            content: 'Begin by dimming the lights and finding a comfortable position...',
            completed: false
          }
        ],
        progress: 0,
        completed: false,
        prerequisites: []
      }
    ];
  });

// Complete a wellness module
export const completeWellnessModule = publicProcedure
  .input(z.object({ 
    pathId: z.string(),
    moduleId: z.string()
  }))
  .mutation(({ input }) => {
    // In a real app, we would update the database
    return { 
      success: true,
      pathId: input.pathId,
      moduleId: input.moduleId,
      completedAt: new Date().toISOString()
    };
  });