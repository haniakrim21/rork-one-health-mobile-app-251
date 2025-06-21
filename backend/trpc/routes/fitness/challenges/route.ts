import { z } from "zod";
import { publicProcedure } from "../../../create-context";

// Define the schema for challenges
const ChallengeSchema = z.object({
  id: z.string().optional(),
  title: z.string(),
  description: z.string(),
  type: z.enum(['individual', 'group']),
  category: z.string(),
  duration: z.number(), // in days
  progress: z.number().default(0), // percentage
  participants: z.number().optional(),
  reward: z.number(), // points
  startDate: z.string(),
  endDate: z.string(),
  isActive: z.boolean().default(false),
  completed: z.boolean().default(false),
  rules: z.array(z.string()).optional(),
  requirements: z.array(z.string()).optional(),
});

// Mock data for challenges
const mockChallenges = [
  {
    id: '1',
    title: '30-Day Strength Challenge',
    description: 'Build strength with progressive workouts over 30 days',
    type: 'individual',
    category: 'strength',
    duration: 30,
    progress: 40,
    participants: 1247,
    reward: 500,
    startDate: '2025-06-01',
    endDate: '2025-06-30',
    isActive: true,
    completed: false,
    rules: [
      'Complete at least 4 strength workouts per week',
      'Track all exercises and weights',
      'Submit weekly progress photos'
    ],
    requirements: [
      'Access to weights or resistance bands',
      'Minimum 30 minutes per session'
    ]
  },
  {
    id: '2',
    title: 'Cardio Blast Week',
    description: 'High-intensity cardio sessions for one week',
    type: 'group',
    category: 'cardio',
    duration: 7,
    progress: 60,
    participants: 892,
    reward: 300,
    startDate: '2025-06-15',
    endDate: '2025-06-21',
    isActive: true,
    completed: false,
    rules: [
      'Complete 5 cardio sessions in 7 days',
      'Minimum 20 minutes per session',
      'Heart rate above 140 BPM for 15+ minutes'
    ],
    requirements: [
      'Heart rate monitor recommended',
      'Any cardio equipment or bodyweight exercises'
    ]
  },
  {
    id: '3',
    title: 'Summer Shred',
    description: 'Get beach-ready with this 6-week transformation program',
    type: 'group',
    category: 'weight-loss',
    duration: 42,
    progress: 0,
    participants: 2341,
    reward: 1000,
    startDate: '2025-06-25',
    endDate: '2025-08-05',
    isActive: false,
    completed: false,
    rules: [
      'Complete 5 workouts per week',
      'Track nutrition and calories',
      'Weekly weigh-ins and measurements',
      'Participate in group challenges'
    ],
    requirements: [
      'Commitment to 6-week program',
      'Access to gym or home equipment',
      'Nutrition tracking app'
    ]
  },
  {
    id: '4',
    title: 'Flexibility Focus',
    description: 'Improve mobility and flexibility over 2 weeks',
    type: 'individual',
    category: 'flexibility',
    duration: 14,
    progress: 0,
    participants: 567,
    reward: 200,
    startDate: '2025-06-20',
    endDate: '2025-07-03',
    isActive: false,
    completed: false,
    rules: [
      'Daily 15-minute stretching sessions',
      'Complete flexibility assessments',
      'Track range of motion improvements'
    ],
    requirements: [
      'Yoga mat or comfortable floor space',
      'Flexibility assessment tools'
    ]
  },
  {
    id: '5',
    title: 'Push-up Challenge',
    description: 'Master the perfect push-up and build upper body strength',
    type: 'individual',
    category: 'strength',
    duration: 21,
    progress: 100,
    participants: 456,
    reward: 150,
    startDate: '2025-05-20',
    endDate: '2025-06-10',
    isActive: false,
    completed: true,
    rules: [
      'Daily push-up practice',
      'Progressive rep increases',
      'Form video submissions'
    ],
    requirements: [
      'No equipment needed',
      'Camera for form videos'
    ]
  }
];

// Leaderboard data
const mockLeaderboard = [
  {
    rank: 1,
    userId: 'user1',
    name: 'Alex Chen',
    points: 2450,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
    badge: 'gold',
    challengesCompleted: 12,
    streak: 45
  },
  {
    rank: 2,
    userId: 'user2',
    name: 'Sarah Johnson',
    points: 2380,
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
    badge: 'silver',
    challengesCompleted: 11,
    streak: 32
  },
  {
    rank: 3,
    userId: 'user3',
    name: 'Mike Rodriguez',
    points: 2290,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
    badge: 'bronze',
    challengesCompleted: 9,
    streak: 28
  },
  {
    rank: 4,
    userId: 'current-user',
    name: 'You',
    points: 1850,
    avatar: null,
    badge: null,
    challengesCompleted: 7,
    streak: 15,
    isCurrentUser: true
  }
];

// Get all challenges
export const getAllChallenges = publicProcedure
  .query(() => {
    return mockChallenges;
  });

// Get fitness challenges (alias for getAllChallenges)
export const getFitnessChallenges = publicProcedure
  .query(() => {
    return mockChallenges;
  });

// Get challenges by status
export const getChallengesByStatus = publicProcedure
  .input(z.object({ 
    status: z.enum(['active', 'available', 'completed']) 
  }))
  .query(({ input }) => {
    switch (input.status) {
      case 'active':
        return mockChallenges.filter(c => c.isActive && !c.completed);
      case 'available':
        return mockChallenges.filter(c => !c.isActive && !c.completed);
      case 'completed':
        return mockChallenges.filter(c => c.completed);
      default:
        return mockChallenges;
    }
  });

// Get challenge by ID
export const getChallengeById = publicProcedure
  .input(z.object({ id: z.string() }))
  .query(({ input }) => {
    const challenge = mockChallenges.find(c => c.id === input.id);
    if (!challenge) {
      throw new Error('Challenge not found');
    }
    return challenge;
  });

// Join a challenge
export const joinChallenge = publicProcedure
  .input(z.object({ id: z.string() }))
  .mutation(({ input }) => {
    const challenge = mockChallenges.find(c => c.id === input.id);
    if (!challenge) {
      throw new Error('Challenge not found');
    }
    
    // In a real app, we would update the database
    return {
      ...challenge,
      isActive: true,
      participants: (challenge.participants || 0) + 1
    };
  });

// Join fitness challenge (alias for joinChallenge)
export const joinFitnessChallenge = publicProcedure
  .input(z.object({ id: z.string() }))
  .mutation(({ input }) => {
    const challenge = mockChallenges.find(c => c.id === input.id);
    if (!challenge) {
      throw new Error('Challenge not found');
    }
    
    // In a real app, we would update the database
    return {
      ...challenge,
      isActive: true,
      participants: (challenge.participants || 0) + 1
    };
  });

// Leave a challenge
export const leaveChallenge = publicProcedure
  .input(z.object({ id: z.string() }))
  .mutation(({ input }) => {
    const challenge = mockChallenges.find(c => c.id === input.id);
    if (!challenge) {
      throw new Error('Challenge not found');
    }
    
    // In a real app, we would update the database
    return {
      ...challenge,
      isActive: false,
      participants: Math.max(0, (challenge.participants || 1) - 1)
    };
  });

// Update challenge progress
export const updateChallengeProgress = publicProcedure
  .input(z.object({ 
    id: z.string(),
    progress: z.number().min(0).max(100)
  }))
  .mutation(({ input }) => {
    const challenge = mockChallenges.find(c => c.id === input.id);
    if (!challenge) {
      throw new Error('Challenge not found');
    }
    
    // In a real app, we would update the database
    return {
      ...challenge,
      progress: input.progress,
      completed: input.progress >= 100
    };
  });

// Get fitness challenge progress
export const getFitnessChallengeProgress = publicProcedure
  .input(z.object({ id: z.string() }))
  .query(({ input }) => {
    const challenge = mockChallenges.find(c => c.id === input.id);
    if (!challenge) {
      throw new Error('Challenge not found');
    }
    
    return {
      challengeId: input.id,
      progress: challenge.progress,
      completed: challenge.completed,
      tasksCompleted: Math.floor(challenge.progress / 10), // Mock calculation
      totalTasks: 10,
      streak: 5, // Mock streak
      lastActivity: new Date().toISOString(),
    };
  });

// Complete a challenge
export const completeChallenge = publicProcedure
  .input(z.object({ id: z.string() }))
  .mutation(({ input }) => {
    const challenge = mockChallenges.find(c => c.id === input.id);
    if (!challenge) {
      throw new Error('Challenge not found');
    }
    
    // In a real app, we would update the database and award points
    return {
      ...challenge,
      completed: true,
      progress: 100,
      completedAt: new Date().toISOString()
    };
  });

// Complete fitness challenge task
export const completeFitnessChallengeTask = publicProcedure
  .input(z.object({ 
    challengeId: z.string(),
    taskId: z.string(),
    notes: z.string().optional(),
  }))
  .mutation(({ input }) => {
    const challenge = mockChallenges.find(c => c.id === input.challengeId);
    if (!challenge) {
      throw new Error('Challenge not found');
    }
    
    // In a real app, we would mark the specific task as completed
    return {
      success: true,
      challengeId: input.challengeId,
      taskId: input.taskId,
      completedAt: new Date().toISOString(),
      pointsEarned: 50, // Mock points
      newProgress: Math.min(100, challenge.progress + 10),
    };
  });

// Get leaderboard
export const getLeaderboard = publicProcedure
  .input(z.object({ 
    type: z.enum(['global', 'friends', 'challenge']).optional(),
    challengeId: z.string().optional()
  }))
  .query(({ input }) => {
    // In a real app, we would filter based on type and challengeId
    return mockLeaderboard;
  });

// Get challenge leaderboard
export const getChallengeLeaderboard = publicProcedure
  .input(z.object({ challengeId: z.string() }))
  .query(({ input }) => {
    // In a real app, we would get leaderboard specific to the challenge
    return mockLeaderboard;
  });

// Create a new challenge
export const createChallenge = publicProcedure
  .input(ChallengeSchema)
  .mutation(({ input }) => {
    const newChallenge = {
      id: (mockChallenges.length + 1).toString(),
      ...input,
    };
    
    // In a real app, we would add this to a database
    return newChallenge;
  });

// Create custom fitness challenge
export const createCustomFitnessChallenge = publicProcedure
  .input(ChallengeSchema)
  .mutation(({ input }) => {
    const newChallenge = {
      id: `custom_${Date.now()}`,
      ...input,
      type: 'individual' as const,
      isCustom: true,
    };
    
    // In a real app, we would add this to a database
    return newChallenge;
  });

// Legacy exports for backward compatibility
export const getChallenges = getAllChallenges;