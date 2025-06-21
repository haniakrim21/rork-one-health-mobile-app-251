import { z } from "zod";
import { publicProcedure } from "../../../create-context";

// Define schemas for AI Health Navigator
const ChatMessageSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string(),
  timestamp: z.string(),
});

const HealthNavigatorPreferencesSchema = z.object({
  communicationStyle: z.enum(['formal', 'casual', 'empathetic']),
  focusAreas: z.array(z.enum(['prevention', 'chronic_care', 'mental_health', 'fitness', 'nutrition'])),
  reminderFrequency: z.enum(['daily', 'weekly', 'monthly']),
  dataSharing: z.object({
    allowPersonalization: z.boolean(),
    shareWithProviders: z.boolean(),
    anonymousAnalytics: z.boolean(),
  }),
});

const PersonalizedPlanSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  duration: z.number(), // in days
  goals: z.array(z.string()),
  dailyTasks: z.array(z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    type: z.enum(['exercise', 'nutrition', 'mindfulness', 'sleep', 'medication', 'check-in']),
    estimatedTime: z.number(), // in minutes
    priority: z.enum(['low', 'medium', 'high']),
    completed: z.boolean(),
  })),
  weeklyMilestones: z.array(z.object({
    week: z.number(),
    milestone: z.string(),
    description: z.string(),
    completed: z.boolean(),
  })),
  adaptiveAdjustments: z.array(z.object({
    date: z.string(),
    reason: z.string(),
    adjustment: z.string(),
    impact: z.string(),
  })),
});

// Mock chat history with more conversational examples
const mockChatHistory = [
  {
    id: '1',
    patientId: 'user1',
    messages: [
      {
        role: 'user',
        content: 'I have been feeling tired lately and my blood pressure readings are higher than usual.',
        timestamp: '2025-06-17T10:00:00Z',
      },
      {
        role: 'assistant',
        content: 'I understand your concern about feeling tired and having elevated blood pressure readings. Based on your recent health data, I notice your average blood pressure has increased by 8% over the past week. Let me help you understand what might be contributing to this and suggest some immediate steps you can take. Have you noticed any changes in your stress levels, sleep patterns, or daily routine recently?',
        timestamp: '2025-06-17T10:01:00Z',
      },
      {
        role: 'user',
        content: 'Actually, yes. I have been working late and getting less sleep. Also more stressed with a big project at work.',
        timestamp: '2025-06-17T10:02:00Z',
      },
      {
        role: 'assistant',
        content: 'That makes perfect sense! Work stress and sleep deprivation are two major factors that can elevate blood pressure and cause fatigue. I am creating a personalized 7-day plan to help you manage this. It includes stress-reduction techniques, sleep hygiene improvements, and gentle exercises that can be done even with a busy schedule. Would you like me to start with some immediate relief strategies you can try today?',
        timestamp: '2025-06-17T10:03:00Z',
      },
    ],
    createdAt: '2025-06-17T10:00:00Z',
  },
];

// Mock conversational nudges
const mockConversationalNudges = [
  {
    id: '1',
    type: 'gentle_reminder',
    trigger: 'missed_medication',
    message: "Hey there! I noticed you might have missed your morning medication. No worries - it happens to all of us. Would you like me to set a gentle reminder for tomorrow?",
    tone: 'supportive',
    urgency: 'low',
    personalizedContext: 'Based on your preference for gentle reminders',
  },
  {
    id: '2',
    type: 'motivational_boost',
    trigger: 'goal_progress',
    message: "You are doing amazing! You have completed 4 out of 5 wellness goals this week. That is 80% - you are so close to your weekly target. What do you think about tackling that last goal today?",
    tone: 'encouraging',
    urgency: 'medium',
    personalizedContext: 'Based on your competitive motivation style',
  },
  {
    id: '3',
    type: 'health_insight',
    trigger: 'pattern_detected',
    message: "I have noticed an interesting pattern: your energy levels tend to be highest on days when you meditate in the morning. Have you considered making morning meditation a regular part of your routine?",
    tone: 'insightful',
    urgency: 'low',
    personalizedContext: 'Based on your meditation activity and energy tracking',
  },
  {
    id: '4',
    type: 'proactive_care',
    trigger: 'health_metric_change',
    message: "Your sleep quality has improved by 25% since you started your new bedtime routine! This is fantastic progress. Your body is responding well to the changes. Keep it up!",
    tone: 'celebratory',
    urgency: 'low',
    personalizedContext: 'Based on your sleep tracking data',
  },
];

// Mock personalized plans
const mockPersonalizedPlans = [
  {
    id: 'stress-management-plan-1',
    name: 'Stress & Blood Pressure Management Plan',
    description: 'A personalized 14-day plan to help reduce work stress and manage blood pressure through lifestyle modifications.',
    duration: 14,
    goals: ['Reduce stress levels by 30%', 'Lower blood pressure to target range', 'Improve sleep quality', 'Increase energy levels'],
    dailyTasks: [
      {
        id: 'task-1',
        name: 'Morning Breathing Exercise',
        description: '5-minute deep breathing exercise to start your day calmly',
        type: 'mindfulness',
        estimatedTime: 5,
        priority: 'high',
        completed: false,
      },
      {
        id: 'task-2',
        name: 'Blood Pressure Check',
        description: 'Take your blood pressure reading and log it in the app',
        type: 'check-in',
        estimatedTime: 3,
        priority: 'high',
        completed: false,
      },
      {
        id: 'task-3',
        name: 'Desk Stretches',
        description: '10-minute stretching routine to do during work breaks',
        type: 'exercise',
        estimatedTime: 10,
        priority: 'medium',
        completed: false,
      },
      {
        id: 'task-4',
        name: 'Evening Wind-Down',
        description: 'Prepare for better sleep with a relaxing routine',
        type: 'sleep',
        estimatedTime: 15,
        priority: 'high',
        completed: false,
      },
    ],
    weeklyMilestones: [
      {
        week: 1,
        milestone: 'Establish Daily Routine',
        description: 'Complete at least 80% of daily tasks for 5 days',
        completed: false,
      },
      {
        week: 2,
        milestone: 'Stress Reduction',
        description: 'Achieve measurable reduction in stress levels',
        completed: false,
      },
    ],
    adaptiveAdjustments: [],
  },
  {
    id: 'energy-boost-plan-1',
    name: 'Natural Energy Enhancement Plan',
    description: 'A 21-day holistic approach to boost your energy levels through nutrition, exercise, and lifestyle changes.',
    duration: 21,
    goals: ['Increase daily energy by 40%', 'Improve morning alertness', 'Reduce afternoon energy crashes', 'Optimize sleep-wake cycle'],
    dailyTasks: [
      {
        id: 'energy-task-1',
        name: 'Hydration Boost',
        description: 'Drink a glass of water with lemon first thing in the morning',
        type: 'nutrition',
        estimatedTime: 2,
        priority: 'medium',
        completed: false,
      },
      {
        id: 'energy-task-2',
        name: 'Power Walk',
        description: '15-minute energizing walk, preferably outdoors',
        type: 'exercise',
        estimatedTime: 15,
        priority: 'high',
        completed: false,
      },
      {
        id: 'energy-task-3',
        name: 'Energy Level Check-in',
        description: 'Rate your energy level (1-10) three times today',
        type: 'check-in',
        estimatedTime: 1,
        priority: 'medium',
        completed: false,
      },
    ],
    weeklyMilestones: [
      {
        week: 1,
        milestone: 'Baseline Establishment',
        description: 'Track energy patterns and identify peak/low times',
        completed: false,
      },
      {
        week: 2,
        milestone: 'Routine Integration',
        description: 'Successfully integrate energy-boosting habits',
        completed: false,
      },
      {
        week: 3,
        milestone: 'Sustained Energy',
        description: 'Maintain consistent energy levels throughout the day',
        completed: false,
      },
    ],
    adaptiveAdjustments: [],
  },
];

// Chat with AI Health Navigator - Enhanced with conversational nudges
export const chatWithHealthNavigator = publicProcedure
  .input(z.object({
    patientId: z.string(),
    message: z.string(),
    context: z.object({
      currentSymptoms: z.array(z.string()).optional(),
      recentMetrics: z.array(z.any()).optional(),
      medications: z.array(z.string()).optional(),
      goals: z.array(z.any()).optional(),
      preferences: z.any().optional(),
    }).optional(),
  }))
  .mutation(({ input }) => {
    const contextualResponse = generateConversationalResponse(input.message, input.context);
    
    const newMessage = {
      role: 'assistant' as const,
      content: contextualResponse.message,
      timestamp: new Date().toISOString(),
    };
    
    return {
      message: newMessage,
      suggestions: contextualResponse.suggestions,
      urgencyLevel: contextualResponse.urgencyLevel,
      actionItems: contextualResponse.actionItems,
      followUpQuestions: contextualResponse.followUpQuestions,
      personalizedPlan: contextualResponse.personalizedPlan,
    };
  });

// Generate personalized health plan
export const generatePersonalizedPlan = publicProcedure
  .input(z.object({
    patientId: z.string(),
    goals: z.array(z.string()),
    preferences: z.object({
      timeCommitment: z.enum(['low', 'medium', 'high']),
      focusAreas: z.array(z.string()),
      motivationStyle: z.enum(['competitive', 'collaborative', 'independent', 'supportive']),
    }),
    healthData: z.object({
      currentMetrics: z.array(z.any()).optional(),
      limitations: z.array(z.string()).optional(),
      medications: z.array(z.string()).optional(),
    }).optional(),
  }))
  .mutation(({ input }) => {
    // AI-powered plan generation based on user data
    const plan = createPersonalizedPlan(input.goals, input.preferences, input.healthData);
    
    return {
      plan,
      rationale: generatePlanRationale(input),
      expectedOutcomes: generateExpectedOutcomes(input.goals),
      adaptationStrategy: generateAdaptationStrategy(input.preferences),
      generatedAt: new Date().toISOString(),
    };
  });

// Get conversational nudges
export const getConversationalNudges = publicProcedure
  .input(z.object({
    patientId: z.string(),
    context: z.object({
      timeOfDay: z.string().optional(),
      recentActivity: z.array(z.string()).optional(),
      currentGoals: z.array(z.any()).optional(),
      preferences: z.any().optional(),
    }).optional(),
  }))
  .query(({ input }) => {
    // Filter nudges based on context and personalization
    const personalizedNudges = mockConversationalNudges.filter(nudge => {
      // In a real app, this would use AI to determine relevance
      return true;
    });
    
    return {
      nudges: personalizedNudges,
      priority: 'medium',
      deliveryTime: 'immediate',
      personalizationScore: 85,
    };
  });

// Adaptive plan adjustment
export const adaptPersonalizedPlan = publicProcedure
  .input(z.object({
    planId: z.string(),
    feedback: z.object({
      difficulty: z.enum(['too_easy', 'just_right', 'too_hard']),
      timeConstraints: z.boolean(),
      enjoyment: z.number().min(1).max(10),
      effectiveness: z.number().min(1).max(10),
    }),
    progressData: z.object({
      completedTasks: z.array(z.string()),
      missedTasks: z.array(z.string()),
      metricChanges: z.array(z.any()),
    }),
  }))
  .mutation(({ input }) => {
    const plan = mockPersonalizedPlans.find(p => p.id === input.planId);
    if (!plan) {
      throw new Error('Plan not found');
    }
    
    // AI-powered plan adaptation
    const adjustments = generatePlanAdjustments(input.feedback, input.progressData);
    
    const updatedPlan = {
      ...plan,
      adaptiveAdjustments: [
        ...plan.adaptiveAdjustments,
        {
          date: new Date().toISOString(),
          reason: adjustments.reason,
          adjustment: adjustments.changes,
          impact: adjustments.expectedImpact,
        }
      ],
    };
    
    return {
      updatedPlan,
      adjustmentReason: adjustments.reason,
      changes: adjustments.changes,
      expectedImpact: adjustments.expectedImpact,
    };
  });

// Journey progress tracking with AI insights
export const trackJourneyProgress = publicProcedure
  .input(z.object({
    patientId: z.string(),
    planId: z.string(),
    progressData: z.object({
      completedTasks: z.array(z.string()),
      metricUpdates: z.array(z.any()),
      userFeedback: z.string().optional(),
    }),
  }))
  .mutation(({ input }) => {
    // AI analysis of progress
    const progressAnalysis = analyzeJourneyProgress(input.progressData);
    
    return {
      progressScore: progressAnalysis.score,
      insights: progressAnalysis.insights,
      recommendations: progressAnalysis.recommendations,
      celebrationMoments: progressAnalysis.celebrations,
      nextSteps: progressAnalysis.nextSteps,
      motivationalMessage: generateMotivationalMessage(progressAnalysis),
    };
  });

// Helper functions for AI logic

function generateConversationalResponse(message: string, context?: any) {
  const lowerMessage = message.toLowerCase();
  
  // Enhanced conversational responses with personality
  if (lowerMessage.includes('tired') || lowerMessage.includes('fatigue')) {
    return {
      message: "I hear you about feeling tired - that can be really frustrating when you have things you want to accomplish! Let me help you figure out what might be going on. I am looking at your recent data and I have a few ideas. First, how has your sleep been lately? And have you noticed if the fatigue is worse at certain times of day?",
      suggestions: [
        "Tell me about your sleep patterns",
        "Describe when you feel most tired",
        "Let me check your recent activity levels",
        "Create an energy-boosting plan for me"
      ],
      urgencyLevel: 'medium',
      actionItems: [
        "Track sleep quality for 3 days",
        "Monitor energy levels throughout the day",
        "Consider a gentle morning routine"
      ],
      followUpQuestions: [
        "What time do you usually go to bed?",
        "How many hours of sleep do you typically get?",
        "Do you feel rested when you wake up?"
      ],
      personalizedPlan: 'energy-boost-plan-1'
    };
  }
  
  if (lowerMessage.includes('stress') || lowerMessage.includes('anxious')) {
    return {
      message: "Stress can feel overwhelming, but I want you to know that you are taking a positive step by talking about it. I am here to help you develop some practical strategies. Based on your profile, I think we can create a plan that fits your lifestyle. What is your biggest source of stress right now?",
      suggestions: [
        "Help me identify stress triggers",
        "Teach me quick stress relief techniques",
        "Create a stress management plan",
        "Show me breathing exercises"
      ],
      urgencyLevel: 'medium',
      actionItems: [
        "Try a 5-minute breathing exercise",
        "Identify your top 3 stress triggers",
        "Practice one relaxation technique today"
      ],
      followUpQuestions: [
        "What situations make you feel most stressed?",
        "How do you currently cope with stress?",
        "Would you prefer quick techniques or longer practices?"
      ],
      personalizedPlan: 'stress-management-plan-1'
    };
  }
  
  if (lowerMessage.includes('goal') || lowerMessage.includes('plan')) {
    return {
      message: "I love that you are thinking about your goals! Setting the right goals can be transformative. Let me help you create something that is both ambitious and achievable. What area of your health or wellness would you most like to improve?",
      suggestions: [
        "Help me set realistic health goals",
        "Create a personalized wellness plan",
        "Show me goal-setting strategies",
        "Track my current progress"
      ],
      urgencyLevel: 'low',
      actionItems: [
        "Define your top health priority",
        "Set one small daily action",
        "Choose a tracking method"
      ],
      followUpQuestions: [
        "What does success look like to you?",
        "How much time can you commit daily?",
        "What has worked for you in the past?"
      ],
      personalizedPlan: null
    };
  }
  
  // Default conversational response
  return {
    message: "Thank you for sharing that with me! I am here to support you on your health journey. Every person is unique, and I want to make sure I understand what matters most to you. What would you like to focus on today - is there something specific that is on your mind?",
    suggestions: [
      "Tell me about your health goals",
      "I need help with stress management",
      "I want to improve my energy levels",
      "Help me create a wellness plan"
    ],
    urgencyLevel: 'low',
    actionItems: [
      "Share your main health concern",
      "Describe your current routine",
      "Set one small goal for today"
    ],
    followUpQuestions: [
      "What brings you here today?",
      "What aspect of your health would you like to improve?",
      "How can I best support you?"
    ],
    personalizedPlan: null
  };
}

function createPersonalizedPlan(goals: string[], preferences: any, healthData?: any) {
  // AI logic to create personalized plans
  if (goals.some(goal => goal.toLowerCase().includes('stress'))) {
    return mockPersonalizedPlans[0]; // Stress management plan
  }
  
  if (goals.some(goal => goal.toLowerCase().includes('energy'))) {
    return mockPersonalizedPlans[1]; // Energy boost plan
  }
  
  // Default comprehensive plan
  return mockPersonalizedPlans[0];
}

function generatePlanRationale(input: any) {
  return `This plan was created specifically for you based on your goals, preferences, and current health data. I focused on ${input.preferences.focusAreas.join(', ')} because these align with your priorities. The ${input.preferences.timeCommitment} time commitment approach ensures the plan fits your lifestyle.`;
}

function generateExpectedOutcomes(goals: string[]) {
  return goals.map(goal => ({
    goal,
    timeframe: '2-4 weeks',
    probability: 'high',
    measurableMetrics: ['daily tracking scores', 'weekly assessments', 'biometric improvements']
  }));
}

function generateAdaptationStrategy(preferences: any) {
  return {
    frequency: 'weekly',
    triggers: ['low completion rates', 'user feedback', 'metric plateaus'],
    approach: preferences.motivationStyle === 'competitive' ? 'challenge-based adjustments' : 'supportive modifications'
  };
}

function generatePlanAdjustments(feedback: any, progressData: any) {
  let reason = '';
  let changes = '';
  let expectedImpact = '';
  
  if (feedback.difficulty === 'too_hard') {
    reason = 'User reported tasks as too challenging';
    changes = 'Reduced task complexity and duration by 25%';
    expectedImpact = 'Improved completion rates and user satisfaction';
  } else if (feedback.difficulty === 'too_easy') {
    reason = 'User found tasks too easy, seeking more challenge';
    changes = 'Increased task intensity and added bonus challenges';
    expectedImpact = 'Enhanced engagement and faster progress';
  } else if (feedback.timeConstraints) {
    reason = 'User experiencing time constraints';
    changes = 'Shortened task durations and added micro-habits';
    expectedImpact = 'Better integration with busy schedule';
  }
  
  return { reason, changes, expectedImpact };
}

function analyzeJourneyProgress(progressData: any) {
  const completionRate = progressData.completedTasks.length / (progressData.completedTasks.length + progressData.metricUpdates.length) * 100;
  
  return {
    score: Math.round(completionRate),
    insights: [
      `You have completed ${progressData.completedTasks.length} tasks this week`,
      'Your consistency is improving',
      'Small daily actions are building into meaningful change'
    ],
    recommendations: [
      'Continue with your current routine',
      'Consider adding one new healthy habit',
      'Celebrate your progress so far'
    ],
    celebrations: [
      'You have maintained your routine for 5 consecutive days!',
      'Your energy levels have improved by 15%'
    ],
    nextSteps: [
      'Focus on the habits that are working best',
      'Gradually increase challenge level',
      'Set a new milestone for next week'
    ]
  };
}

function generateMotivationalMessage(analysis: any) {
  if (analysis.score >= 80) {
    return "You are absolutely crushing it! Your dedication is inspiring and the results speak for themselves. Keep up this amazing momentum!";
  } else if (analysis.score >= 60) {
    return "You are making solid progress! Every step forward counts, and you are building habits that will serve you well. Stay consistent!";
  } else {
    return "Progress is not always linear, and that is completely normal. What matters is that you are here, trying, and committed to your health. Let me help you adjust the plan to better fit your needs.";
  }
}

// Get AI Health Navigator insights
export const getHealthNavigatorInsights = publicProcedure
  .input(z.object({ patientId: z.string() }))
  .query(({ input }) => {
    const mockInsights = [
      {
        category: 'Behavioral Patterns',
        insight: 'You tend to be most successful with health goals when you start them on Mondays',
        severity: 'low',
        recommendations: [
          'Plan new health initiatives to start on Mondays',
          'Use Sunday evenings for preparation and planning',
          'Set weekly rather than daily goals for better success'
        ],
        confidence: 92,
      },
      {
        category: 'Energy Optimization',
        insight: 'Your energy levels correlate strongly with your sleep quality and morning routine',
        severity: 'moderate',
        recommendations: [
          'Maintain consistent sleep schedule',
          'Develop a energizing morning routine',
          'Track sleep quality to identify patterns'
        ],
        confidence: 88,
      },
      {
        category: 'Stress Management',
        insight: 'Work-related stress peaks on Tuesdays and Thursdays based on your check-ins',
        severity: 'moderate',
        recommendations: [
          'Schedule stress-relief activities on high-stress days',
          'Practice preventive stress management on Monday and Wednesday',
          'Consider workload distribution strategies'
        ],
        confidence: 85,
      },
    ];

    return {
      insights: mockInsights,
      lastUpdated: new Date().toISOString(),
      dataQuality: 'high',
      personalizedRecommendations: [
        {
          type: 'lifestyle',
          title: 'Optimize Your Weekly Rhythm',
          description: 'Based on your patterns, structure your week for maximum success',
          priority: 'high',
        },
        {
          type: 'monitoring',
          title: 'Smart Check-ins',
          description: 'Focus tracking on the metrics that matter most for your goals',
          priority: 'medium',
        },
      ],
    };
  });

// Set Health Navigator preferences
export const setHealthNavigatorPreferences = publicProcedure
  .input(z.object({
    patientId: z.string(),
    preferences: HealthNavigatorPreferencesSchema,
  }))
  .mutation(({ input }) => {
    return {
      success: true,
      preferences: input.preferences,
      updatedAt: new Date().toISOString(),
    };
  });

// Get Health Navigator chat history
export const getHealthNavigatorHistory = publicProcedure
  .input(z.object({
    patientId: z.string(),
    limit: z.number().optional(),
  }))
  .query(({ input }) => {
    const history = mockChatHistory.filter(chat => chat.patientId === input.patientId);
    
    if (input.limit) {
      return history.slice(0, input.limit);
    }
    
    return history;
  });

// Generate proactive health recommendations with conversational tone
export const generateProactiveRecommendations = publicProcedure
  .input(z.object({ patientId: z.string() }))
  .mutation(({ input }) => {
    return {
      recommendations: [
        {
          type: 'conversational_nudge',
          title: 'Your Weekly Check-in',
          description: 'Hey! I noticed you have been doing great with your morning routine. How are you feeling about your energy levels this week?',
          priority: 'medium',
          tone: 'friendly',
          actionItems: ['Rate your energy (1-10)', 'Share any challenges', 'Celebrate your wins'],
        },
        {
          type: 'adaptive_suggestion',
          title: 'Time for a Plan Tune-up?',
          description: 'You have been consistent for 2 weeks now - amazing! I think you might be ready for the next level. Want to explore some new challenges?',
          priority: 'low',
          tone: 'encouraging',
          actionItems: ['Review current progress', 'Identify areas for growth', 'Set new micro-goals'],
        },
        {
          type: 'preventive_care',
          title: 'Wellness Wednesday Reminder',
          description: 'It is Wednesday - your historically most successful day for trying new wellness activities! What sounds good today?',
          priority: 'medium',
          tone: 'motivational',
          actionItems: ['Try a new meditation', 'Take a nature walk', 'Practice gratitude'],
        },
      ],
      generatedAt: new Date().toISOString(),
      confidence: 89,
      personalizedContext: 'Based on your behavioral patterns and preferences',
    };
  });