import { z } from "zod";
import { publicProcedure } from "../../../create-context";

// Define the schema for symptom checker
const SymptomSchema = z.object({
  symptoms: z.array(z.string()),
  severity: z.enum(['mild', 'moderate', 'severe']),
  duration: z.string(),
  age: z.number(),
  gender: z.enum(['male', 'female', 'other']),
  medicalHistory: z.array(z.string()).optional(),
});

const TriageResultSchema = z.object({
  urgency: z.enum(['low', 'medium', 'high', 'emergency']),
  recommendation: z.string(),
  possibleConditions: z.array(z.object({
    condition: z.string(),
    probability: z.number(),
    description: z.string(),
  })),
  nextSteps: z.array(z.string()),
  redFlags: z.array(z.string()).optional(),
});

// Mock triage sessions
const mockTriageSessions = new Map();

// Mock triage logic
const performTriage = (symptoms: string[], severity: string, duration: string) => {
  // This is a simplified mock - in reality, this would use sophisticated AI
  const emergencySymptoms = ['chest pain', 'difficulty breathing', 'severe headache', 'loss of consciousness'];
  const hasEmergencySymptom = symptoms.some(symptom => 
    emergencySymptoms.some(emergency => symptom.toLowerCase().includes(emergency))
  );

  if (hasEmergencySymptom || severity === 'severe') {
    return {
      urgency: 'emergency' as const,
      recommendation: 'Seek immediate emergency medical attention. Call 911 or go to the nearest emergency room.',
      possibleConditions: [
        {
          condition: 'Acute Medical Emergency',
          probability: 85,
          description: 'Symptoms suggest a potentially serious condition requiring immediate medical evaluation.',
        }
      ],
      nextSteps: [
        'Call emergency services immediately',
        'Do not drive yourself to the hospital',
        'Have someone stay with you until help arrives',
      ],
      redFlags: ['Worsening symptoms', 'Loss of consciousness', 'Severe pain'],
    };
  }

  if (severity === 'moderate') {
    return {
      urgency: 'high' as const,
      recommendation: 'Schedule an appointment with your healthcare provider within 24-48 hours.',
      possibleConditions: [
        {
          condition: 'Upper Respiratory Infection',
          probability: 65,
          description: 'Common viral or bacterial infection affecting the upper respiratory tract.',
        },
        {
          condition: 'Gastroenteritis',
          probability: 30,
          description: 'Inflammation of the stomach and intestines, often caused by infection.',
        }
      ],
      nextSteps: [
        'Monitor symptoms closely',
        'Stay hydrated and rest',
        'Contact your doctor if symptoms worsen',
        'Consider over-the-counter medications for symptom relief',
      ],
    };
  }

  return {
    urgency: 'low' as const,
    recommendation: 'Monitor symptoms and consider self-care measures. Contact your healthcare provider if symptoms persist or worsen.',
    possibleConditions: [
      {
        condition: 'Common Cold',
        probability: 70,
        description: 'Mild viral infection of the upper respiratory tract.',
      },
      {
        condition: 'Allergic Reaction',
        probability: 25,
        description: 'Immune system response to an allergen.',
      }
    ],
    nextSteps: [
      'Get plenty of rest',
      'Stay hydrated',
      'Use over-the-counter medications as needed',
      'Monitor for any worsening symptoms',
    ],
  };
};

// Submit symptoms for triage
export const submitSymptoms = publicProcedure
  .input(SymptomSchema)
  .mutation(({ input }) => {
    const triageResult = performTriage(input.symptoms, input.severity, input.duration);
    
    return {
      ...triageResult,
      timestamp: new Date().toISOString(),
      disclaimer: 'This assessment is for informational purposes only and should not replace professional medical advice. Always consult with a healthcare provider for proper diagnosis and treatment.',
    };
  });

// Get emergency guidance
export const getEmergencyGuidance = publicProcedure
  .query(() => {
    return {
      emergencyNumbers: {
        general: '911',
        poison: '1-800-222-1222',
        suicide: '988',
      },
      whenToCallEmergency: [
        'Chest pain or pressure',
        'Difficulty breathing',
        'Severe bleeding',
        'Loss of consciousness',
        'Severe allergic reaction',
        'Signs of stroke (FAST)',
      ],
      firstAidTips: [
        {
          condition: 'Choking',
          steps: [
            'Encourage coughing',
            'Give 5 back blows',
            'Give 5 abdominal thrusts',
            'Call 911 if unsuccessful',
          ],
        },
        {
          condition: 'Bleeding',
          steps: [
            'Apply direct pressure',
            'Elevate the wound',
            'Use a clean cloth',
            'Seek medical attention',
          ],
        },
      ],
    };
  });