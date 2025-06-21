export interface DigitalTwin {
  patientId: string;
  vitalSigns: {
    heartRate: number;
    bloodPressure: {
      systolic: number;
      diastolic: number;
    };
    temperature: number;
    oxygenSaturation: number;
    respiratoryRate: number;
  };
  wearableData: {
    steps: number;
    caloriesBurned: number;
    sleepHours: number;
    stressLevel: number;
    activityMinutes: number;
  };
  predictions: HealthPrediction[];
  lastUpdated: string;
}

export interface HealthPrediction {
  condition: string;
  riskScore: number;
  timeframe: string;
  confidence: number;
  recommendations: string[];
}

export interface MonitoringDevice {
  deviceId: string;
  deviceType: 'apple_watch' | 'fitbit' | 'whoop' | 'garmin' | 'oura' | 'continuous_glucose_monitor';
  metrics: MonitoringMetric[];
  alerts: MonitoringAlert[];
}

export interface MonitoringMetric {
  type: string;
  value: number | string;
  unit: string;
  timestamp: string;
  quality: 'excellent' | 'good' | 'fair' | 'poor';
}

export interface MonitoringAlert {
  type: 'critical' | 'warning' | 'info';
  message: string;
  timestamp: string;
  acknowledged: boolean;
}

export interface HealthPassport {
  patientId: string;
  personalInfo: {
    name: string;
    dateOfBirth: string;
    gender: string;
    bloodType?: string;
    allergies: string[];
    emergencyContacts: EmergencyContact[];
  };
  medicalHistory: {
    conditions: MedicalCondition[];
    surgeries: Surgery[];
    familyHistory: FamilyHistoryItem[];
  };
  medications: PassportMedication[];
  vaccinations: Vaccination[];
  labResults: LabResult[];
  vitalSigns: VitalSign[];
  documents: MedicalDocument[];
  accessLog: AccessLogEntry[];
}

export interface MedicalCondition {
  condition: string;
  diagnosedDate: string;
  status: 'active' | 'resolved' | 'managed';
  provider: string;
}

export interface Surgery {
  procedure: string;
  date: string;
  hospital: string;
  surgeon: string;
}

export interface FamilyHistoryItem {
  condition: string;
  relationship: string;
  ageOfOnset?: number;
}

export interface PassportMedication {
  name: string;
  dosage: string;
  frequency: string;
  prescribedBy: string;
  startDate: string;
  endDate?: string;
}

export interface Vaccination {
  vaccine: string;
  date: string;
  provider: string;
  lotNumber?: string;
}

export interface LabResult {
  testName: string;
  value: string;
  unit: string;
  referenceRange: string;
  date: string;
  provider: string;
  status: 'normal' | 'abnormal' | 'critical';
}

export interface VitalSign {
  type: string;
  value: string;
  unit: string;
  date: string;
  provider: string;
}

export interface MedicalDocument {
  type: 'lab_report' | 'imaging' | 'prescription' | 'discharge_summary' | 'other';
  title: string;
  date: string;
  provider: string;
  url: string;
}

export interface AccessLogEntry {
  accessedBy: string;
  accessType: 'view' | 'edit' | 'share';
  timestamp: string;
  purpose: string;
}

export interface Referral {
  id: string;
  patientId: string;
  referringProvider: string;
  specialistType: string;
  reason: string;
  urgency: 'routine' | 'urgent' | 'stat';
  status: 'pending' | 'approved' | 'completed' | 'cancelled';
  createdAt: string;
  clinicalNotes: string;
  requestedServices: string[];
  availableSpecialists?: Specialist[];
  selectedSpecialist?: SelectedSpecialist;
}

export interface Specialist {
  id: string;
  name: string;
  hospital: string;
  nextAvailable: string;
  rating: number;
  acceptsInsurance: boolean;
  languages?: string[];
  education?: string;
  experience?: string;
}

export interface SelectedSpecialist {
  id: string;
  name: string;
  hospital: string;
  appointmentDate: string;
}

export interface AINavigatorResponse {
  query: string;
  response: string;
  actions: AIAction[];
  confidence: number;
  timestamp: string;
  sources: string[];
  disclaimer: string;
}

export interface AIAction {
  type: string;
  title: string;
  description: string;
}

export interface AIInsight {
  category: string;
  insight: string;
  recommendation: string;
  priority: 'low' | 'medium' | 'high';
  confidence: number;
}

export interface ProactiveRecommendation {
  type: string;
  title: string;
  description: string;
  urgency: 'low' | 'medium' | 'high';
  dueDate: string;
  provider: string;
  estimatedCost: string;
}

export interface VoiceCommandResponse {
  transcription: string;
  response: string;
  actions: AIAction[];
  confidence: number;
  processingTime: string;
  timestamp: string;
}