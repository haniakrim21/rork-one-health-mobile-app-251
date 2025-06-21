import { z } from "zod";
import { publicProcedure } from "../../../create-context";

// Define the schema for referrals
const ReferralSchema = z.object({
  patientId: z.string(),
  referringProviderId: z.string(),
  specialistType: z.string(),
  reason: z.string(),
  urgency: z.enum(['routine', 'urgent', 'emergency']),
  notes: z.string().optional(),
  preferredLocation: z.string().optional(),
  insuranceInfo: z.object({
    provider: z.string(),
    policyNumber: z.string(),
  }).optional(),
});

// Mock referrals data
const mockReferrals = [
  {
    id: '1',
    patientId: 'user1',
    referringProviderId: 'doc1',
    referringProviderName: 'Dr. Sarah Johnson',
    specialistType: 'Cardiologist',
    reason: 'Elevated blood pressure and family history of heart disease',
    urgency: 'routine',
    status: 'pending',
    createdAt: '2025-06-15T10:00:00Z',
    notes: 'Patient reports occasional chest discomfort during exercise',
    preferredLocation: 'Downtown Medical Center',
  },
  {
    id: '2',
    patientId: 'user1',
    referringProviderId: 'doc2',
    referringProviderName: 'Dr. Michael Chen',
    specialistType: 'Endocrinologist',
    reason: 'Diabetes management and HbA1c optimization',
    urgency: 'routine',
    status: 'scheduled',
    scheduledDate: '2025-07-10T14:30:00Z',
    createdAt: '2025-06-10T09:00:00Z',
    notes: 'Recent HbA1c of 7.2%, need specialist consultation for medication adjustment',
  },
];

// Mock specialists data
const mockSpecialists = [
  {
    id: 'spec1',
    name: 'Dr. Emily Rodriguez',
    specialty: 'Cardiologist',
    rating: 4.8,
    experience: 15,
    location: 'Downtown Medical Center',
    availableSlots: [
      '2025-06-25T10:00:00Z',
      '2025-06-26T14:30:00Z',
      '2025-06-27T09:15:00Z',
    ],
    acceptsInsurance: ['Blue Cross', 'Aetna', 'Cigna'],
    bio: 'Board-certified cardiologist specializing in preventive cardiology and heart disease management.',
  },
  {
    id: 'spec2',
    name: 'Dr. James Park',
    specialty: 'Endocrinologist',
    rating: 4.9,
    experience: 12,
    location: 'University Hospital',
    availableSlots: [
      '2025-07-08T11:00:00Z',
      '2025-07-10T14:30:00Z',
      '2025-07-12T16:00:00Z',
    ],
    acceptsInsurance: ['Blue Cross', 'United Healthcare', 'Medicare'],
    bio: 'Diabetes specialist with expertise in Type 1 and Type 2 diabetes management and endocrine disorders.',
  },
];

// Get all referrals for a patient
export const getReferrals = publicProcedure
  .input(z.object({ patientId: z.string() }))
  .query(({ input }) => {
    return mockReferrals.filter(referral => referral.patientId === input.patientId);
  });

// Create a new referral
export const createReferral = publicProcedure
  .input(ReferralSchema)
  .mutation(({ input }) => {
    const newReferral = {
      id: (mockReferrals.length + 1).toString(),
      ...input,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    
    // In a real app, this would be saved to a database
    return newReferral;
  });

// Update referral status
export const updateReferralStatus = publicProcedure
  .input(z.object({
    referralId: z.string(),
    status: z.enum(['pending', 'scheduled', 'completed', 'cancelled']),
    scheduledDate: z.string().optional(),
    notes: z.string().optional(),
  }))
  .mutation(({ input }) => {
    const referral = mockReferrals.find(r => r.id === input.referralId);
    if (!referral) {
      throw new Error('Referral not found');
    }
    
    // In a real app, this would update the database
    Object.assign(referral, {
      status: input.status,
      scheduledDate: input.scheduledDate,
      notes: input.notes,
      updatedAt: new Date().toISOString(),
    });
    
    return referral;
  });

// Get referral history
export const getReferralHistory = publicProcedure
  .input(z.object({ patientId: z.string() }))
  .query(({ input }) => {
    return {
      referrals: mockReferrals.filter(r => r.patientId === input.patientId),
      totalReferrals: mockReferrals.length,
      completedReferrals: mockReferrals.filter(r => r.status === 'completed').length,
      pendingReferrals: mockReferrals.filter(r => r.status === 'pending').length,
    };
  });

// Find specialists
export const findSpecialists = publicProcedure
  .input(z.object({
    specialtyType: z.string(),
    location: z.string().optional(),
    insuranceProvider: z.string().optional(),
    availability: z.string().optional(),
  }))
  .query(({ input }) => {
    let specialists = mockSpecialists.filter(
      specialist => specialist.specialty.toLowerCase() === input.specialtyType.toLowerCase()
    );
    
    if (input.location) {
      specialists = specialists.filter(
        specialist => specialist.location.toLowerCase().includes(input.location!.toLowerCase())
      );
    }
    
    if (input.insuranceProvider) {
      specialists = specialists.filter(
        specialist => specialist.acceptsInsurance.includes(input.insuranceProvider!)
      );
    }
    
    return {
      specialists: specialists.sort((a, b) => b.rating - a.rating),
      totalFound: specialists.length,
      searchCriteria: input,
    };
  });

// Get specialist recommendations
export const getSpecialistRecommendations = publicProcedure
  .input(z.object({
    specialtyType: z.string(),
    location: z.string().optional(),
    insuranceProvider: z.string().optional(),
  }))
  .query(({ input }) => {
    let specialists = mockSpecialists.filter(
      specialist => specialist.specialty.toLowerCase() === input.specialtyType.toLowerCase()
    );
    
    if (input.location) {
      specialists = specialists.filter(
        specialist => specialist.location.toLowerCase().includes(input.location!.toLowerCase())
      );
    }
    
    if (input.insuranceProvider) {
      specialists = specialists.filter(
        specialist => specialist.acceptsInsurance.includes(input.insuranceProvider!)
      );
    }
    
    return specialists.sort((a, b) => b.rating - a.rating);
  });

// Get referral by ID
export const getReferral = publicProcedure
  .input(z.object({ referralId: z.string() }))
  .query(({ input }) => {
    const referral = mockReferrals.find(r => r.id === input.referralId);
    if (!referral) {
      throw new Error('Referral not found');
    }
    return referral;
  });

// Schedule appointment with specialist
export const scheduleSpecialistAppointment = publicProcedure
  .input(z.object({
    referralId: z.string(),
    specialistId: z.string(),
    appointmentDate: z.string(),
    notes: z.string().optional(),
  }))
  .mutation(({ input }) => {
    const referral = mockReferrals.find(r => r.id === input.referralId);
    const specialist = mockSpecialists.find(s => s.id === input.specialistId);
    
    if (!referral || !specialist) {
      throw new Error('Referral or specialist not found');
    }
    
    // Update referral status
    Object.assign(referral, {
      status: 'scheduled',
      scheduledDate: input.appointmentDate,
      assignedSpecialistId: input.specialistId,
      assignedSpecialistName: specialist.name,
      updatedAt: new Date().toISOString(),
    });
    
    return {
      success: true,
      appointmentId: `apt_${Date.now()}`,
      referralId: input.referralId,
      specialistName: specialist.name,
      appointmentDate: input.appointmentDate,
    };
  });