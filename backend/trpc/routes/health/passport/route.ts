import { z } from "zod";
import { publicProcedure } from "../../../create-context";

// Health passport schema
const HealthPassportSchema = z.object({
  patientId: z.string(),
  personalInfo: z.object({
    name: z.string(),
    dateOfBirth: z.string(),
    gender: z.string(),
    bloodType: z.string().optional(),
    allergies: z.array(z.string()),
    emergencyContacts: z.array(z.object({
      name: z.string(),
      relationship: z.string(),
      phone: z.string(),
    })),
  }),
  medicalHistory: z.object({
    conditions: z.array(z.object({
      condition: z.string(),
      diagnosedDate: z.string(),
      status: z.enum(['active', 'resolved', 'managed']),
      provider: z.string(),
    })),
    surgeries: z.array(z.object({
      procedure: z.string(),
      date: z.string(),
      hospital: z.string(),
      surgeon: z.string(),
    })),
    familyHistory: z.array(z.object({
      condition: z.string(),
      relationship: z.string(),
      ageOfOnset: z.number().optional(),
    })),
  }),
  medications: z.array(z.object({
    name: z.string(),
    dosage: z.string(),
    frequency: z.string(),
    prescribedBy: z.string(),
    startDate: z.string(),
    endDate: z.string().optional(),
  })),
  vaccinations: z.array(z.object({
    vaccine: z.string(),
    date: z.string(),
    provider: z.string(),
    lotNumber: z.string().optional(),
  })),
  labResults: z.array(z.object({
    testName: z.string(),
    value: z.string(),
    unit: z.string(),
    referenceRange: z.string(),
    date: z.string(),
    provider: z.string(),
    status: z.enum(['normal', 'abnormal', 'critical']),
  })),
  vitalSigns: z.array(z.object({
    type: z.string(),
    value: z.string(),
    unit: z.string(),
    date: z.string(),
    provider: z.string(),
  })),
  documents: z.array(z.object({
    type: z.enum(['lab_report', 'imaging', 'prescription', 'discharge_summary', 'other']),
    title: z.string(),
    date: z.string(),
    provider: z.string(),
    url: z.string(),
  })),
  accessLog: z.array(z.object({
    accessedBy: z.string(),
    accessType: z.enum(['view', 'edit', 'share']),
    timestamp: z.string(),
    purpose: z.string(),
  })),
});

// Mock health passport data
const mockHealthPassport = {
  patientId: 'user1',
  personalInfo: {
    name: 'John Doe',
    dateOfBirth: '1985-06-15',
    gender: 'male',
    bloodType: 'O+',
    allergies: ['Penicillin', 'Shellfish'],
    emergencyContacts: [
      {
        name: 'Jane Doe',
        relationship: 'Spouse',
        phone: '+1-555-0123',
      },
      {
        name: 'Robert Doe',
        relationship: 'Father',
        phone: '+1-555-0124',
      },
    ],
  },
  medicalHistory: {
    conditions: [
      {
        condition: 'Hypertension',
        diagnosedDate: '2020-03-15',
        status: 'managed',
        provider: 'Dr. Sarah Johnson',
      },
      {
        condition: 'Type 2 Diabetes',
        diagnosedDate: '2021-08-22',
        status: 'managed',
        provider: 'Dr. Michael Chen',
      },
    ],
    surgeries: [
      {
        procedure: 'Appendectomy',
        date: '2010-11-08',
        hospital: 'City General Hospital',
        surgeon: 'Dr. Robert Smith',
      },
    ],
    familyHistory: [
      {
        condition: 'Heart Disease',
        relationship: 'Father',
        ageOfOnset: 55,
      },
      {
        condition: 'Diabetes',
        relationship: 'Mother',
        ageOfOnset: 62,
      },
    ],
  },
  medications: [
    {
      name: 'Lisinopril',
      dosage: '10mg',
      frequency: 'Once daily',
      prescribedBy: 'Dr. Sarah Johnson',
      startDate: '2020-03-15',
    },
    {
      name: 'Metformin',
      dosage: '500mg',
      frequency: 'Twice daily',
      prescribedBy: 'Dr. Michael Chen',
      startDate: '2021-08-22',
    },
  ],
  vaccinations: [
    {
      vaccine: 'COVID-19 (Pfizer)',
      date: '2021-04-15',
      provider: 'City Health Department',
      lotNumber: 'EW0150',
    },
    {
      vaccine: 'Influenza',
      date: '2024-10-01',
      provider: 'Family Clinic',
    },
  ],
  labResults: [
    {
      testName: 'HbA1c',
      value: '6.8',
      unit: '%',
      referenceRange: '<7.0',
      date: '2025-06-01',
      provider: 'LabCorp',
      status: 'normal',
    },
    {
      testName: 'Total Cholesterol',
      value: '185',
      unit: 'mg/dL',
      referenceRange: '<200',
      date: '2025-06-01',
      provider: 'LabCorp',
      status: 'normal',
    },
  ],
  vitalSigns: [
    {
      type: 'Blood Pressure',
      value: '125/82',
      unit: 'mmHg',
      date: '2025-06-17',
      provider: 'Self-monitored',
    },
    {
      type: 'Weight',
      value: '175',
      unit: 'lbs',
      date: '2025-06-17',
      provider: 'Self-monitored',
    },
  ],
  documents: [
    {
      type: 'lab_report',
      title: 'Comprehensive Metabolic Panel',
      date: '2025-06-01',
      provider: 'LabCorp',
      url: '/documents/lab_report_20250601.pdf',
    },
  ],
  accessLog: [
    {
      accessedBy: 'Dr. Sarah Johnson',
      accessType: 'view',
      timestamp: '2025-06-17T10:30:00Z',
      purpose: 'Routine follow-up',
    },
  ],
};

// Mock shared health data
const mockSharedHealthData = [
  {
    shareId: 'share_001',
    sharedWith: 'Dr. Sarah Johnson',
    sharedBy: 'user1',
    sections: ['medications', 'labResults', 'vitalSigns'],
    sharedAt: '2025-06-15T10:00:00Z',
    expiresAt: '2025-07-15T10:00:00Z',
    status: 'active',
  },
  {
    shareId: 'share_002',
    sharedWith: 'Emergency Contact - Jane Doe',
    sharedBy: 'user1',
    sections: ['personalInfo', 'allergies', 'emergencyContacts'],
    sharedAt: '2025-06-10T14:30:00Z',
    expiresAt: '2025-12-10T14:30:00Z',
    status: 'active',
  },
];

// Get complete health passport
export const getHealthPassport = publicProcedure
  .input(z.object({ patientId: z.string() }))
  .query(({ input }) => {
    return mockHealthPassport;
  });

// Update health passport section
export const updateHealthPassport = publicProcedure
  .input(z.object({
    patientId: z.string(),
    section: z.enum(['personalInfo', 'medicalHistory', 'medications', 'vaccinations']),
    data: z.any(),
  }))
  .mutation(({ input }) => {
    // In a real app, this would update the specific section
    return {
      success: true,
      updatedAt: new Date().toISOString(),
      section: input.section,
    };
  });

// Share health passport
export const shareHealthPassport = publicProcedure
  .input(z.object({
    patientId: z.string(),
    recipientId: z.string(),
    recipientType: z.enum(['provider', 'family', 'emergency']),
    sections: z.array(z.string()),
    expiresAt: z.string().optional(),
  }))
  .mutation(({ input }) => {
    // Generate secure sharing link
    const shareToken = `share_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    return {
      shareToken,
      shareUrl: `https://healthpassport.app/shared/${shareToken}`,
      expiresAt: input.expiresAt || new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      sharedSections: input.sections,
    };
  });

// Get shared health data
export const getSharedHealthData = publicProcedure
  .input(z.object({ patientId: z.string() }))
  .query(({ input }) => {
    return mockSharedHealthData.filter(share => share.sharedBy === input.patientId);
  });

// Get health passport history
export const getHealthPassportHistory = publicProcedure
  .input(z.object({ patientId: z.string() }))
  .query(({ input }) => {
    return {
      changes: [
        {
          id: '1',
          section: 'medications',
          action: 'added',
          description: 'Added new medication: Lisinopril 10mg',
          timestamp: '2025-06-15T10:00:00Z',
          changedBy: 'Dr. Sarah Johnson',
        },
        {
          id: '2',
          section: 'labResults',
          action: 'updated',
          description: 'Updated HbA1c result: 6.8%',
          timestamp: '2025-06-01T14:30:00Z',
          changedBy: 'LabCorp System',
        },
        {
          id: '3',
          section: 'vitalSigns',
          action: 'added',
          description: 'Added blood pressure reading: 125/82 mmHg',
          timestamp: '2025-06-17T08:00:00Z',
          changedBy: 'Self-monitored',
        },
      ],
      totalChanges: 3,
      lastUpdated: '2025-06-17T08:00:00Z',
    };
  });

// Generate health passport QR code
export const generateHealthPassportQR = publicProcedure
  .input(z.object({
    patientId: z.string(),
    sections: z.array(z.string()).optional(),
    expiresIn: z.number().optional(), // hours
  }))
  .mutation(({ input }) => {
    const expiresAt = new Date(Date.now() + (input.expiresIn || 24) * 60 * 60 * 1000);
    const qrToken = `qr_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    return {
      qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(`https://healthpassport.app/qr/${qrToken}`)}`,
      qrToken,
      shareUrl: `https://healthpassport.app/qr/${qrToken}`,
      expiresAt: expiresAt.toISOString(),
      sections: input.sections || ['personalInfo', 'allergies', 'emergencyContacts'],
      generatedAt: new Date().toISOString(),
    };
  });

// Log access to health passport
export const logAccess = publicProcedure
  .input(z.object({
    patientId: z.string(),
    accessedBy: z.string(),
    accessType: z.enum(['view', 'edit', 'share']),
    purpose: z.string(),
  }))
  .mutation(({ input }) => {
    // In a real app, this would log the access for audit purposes
    return {
      logged: true,
      timestamp: new Date().toISOString(),
    };
  });

// Get access history
export const getAccessHistory = publicProcedure
  .input(z.object({ patientId: z.string() }))
  .query(({ input }) => {
    return mockHealthPassport.accessLog;
  });