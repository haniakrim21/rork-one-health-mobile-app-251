import { z } from "zod";
import { publicProcedure } from "../../../create-context";

// Remote monitoring data schema
const MonitoringDataSchema = z.object({
  deviceId: z.string(),
  deviceType: z.enum(['apple_watch', 'fitbit', 'whoop', 'garmin', 'oura', 'continuous_glucose_monitor']),
  metrics: z.array(z.object({
    type: z.string(),
    value: z.union([z.number(), z.string()]),
    unit: z.string(),
    timestamp: z.string(),
    quality: z.enum(['excellent', 'good', 'fair', 'poor']),
  })),
  alerts: z.array(z.object({
    type: z.enum(['critical', 'warning', 'info']),
    message: z.string(),
    timestamp: z.string(),
    acknowledged: z.boolean(),
  })),
});

// Mock monitoring data
const mockMonitoringData = [
  {
    deviceId: 'apple_watch_001',
    deviceType: 'apple_watch',
    metrics: [
      {
        type: 'heart_rate',
        value: 72,
        unit: 'bpm',
        timestamp: new Date().toISOString(),
        quality: 'excellent',
      },
      {
        type: 'heart_rate_variability',
        value: 45,
        unit: 'ms',
        timestamp: new Date().toISOString(),
        quality: 'good',
      },
    ],
    alerts: [
      {
        type: 'info',
        message: 'Heart rate slightly elevated during sleep',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        acknowledged: false,
      },
    ],
  },
  {
    deviceId: 'cgm_001',
    deviceType: 'continuous_glucose_monitor',
    metrics: [
      {
        type: 'blood_glucose',
        value: 95,
        unit: 'mg/dL',
        timestamp: new Date().toISOString(),
        quality: 'excellent',
      },
    ],
    alerts: [],
  },
];

// Mock devices
const mockDevices = [
  {
    id: 'apple_watch_001',
    name: 'Apple Watch Series 9',
    type: 'apple_watch',
    status: 'connected',
    batteryLevel: 85,
    lastSync: new Date().toISOString(),
  },
  {
    id: 'cgm_001',
    name: 'Dexcom G7',
    type: 'continuous_glucose_monitor',
    status: 'connected',
    batteryLevel: 92,
    lastSync: new Date().toISOString(),
  },
];

// Get monitoring devices
export const getMonitoringDevices = publicProcedure
  .input(z.object({ patientId: z.string() }))
  .query(({ input }) => {
    return mockDevices;
  });

// Add monitoring device
export const addMonitoringDevice = publicProcedure
  .input(z.object({
    patientId: z.string(),
    deviceType: MonitoringDataSchema.shape.deviceType,
    deviceName: z.string(),
    serialNumber: z.string(),
  }))
  .mutation(({ input }) => {
    const newDevice = {
      id: `${input.deviceType}_${Date.now()}`,
      name: input.deviceName,
      type: input.deviceType,
      serialNumber: input.serialNumber,
      status: 'connected',
      batteryLevel: 100,
      lastSync: new Date().toISOString(),
      addedAt: new Date().toISOString(),
    };
    
    return newDevice;
  });

// Get device data
export const getDeviceData = publicProcedure
  .input(z.object({
    patientId: z.string(),
    deviceId: z.string(),
    timeRange: z.enum(['24h', '7d', '30d']).optional(),
  }))
  .query(({ input }) => {
    const deviceData = mockMonitoringData.find(data => data.deviceId === input.deviceId);
    if (!deviceData) {
      throw new Error('Device data not found');
    }
    
    return {
      deviceId: input.deviceId,
      timeRange: input.timeRange || '24h',
      metrics: deviceData.metrics,
      summary: {
        totalReadings: deviceData.metrics.length,
        averageValue: deviceData.metrics.reduce((sum, metric) => {
          const value = typeof metric.value === 'number' ? metric.value : 0;
          return sum + value;
        }, 0) / deviceData.metrics.length,
        qualityScore: 'excellent',
      },
    };
  });

// Set monitoring alerts
export const setMonitoringAlerts = publicProcedure
  .input(z.object({
    patientId: z.string(),
    deviceId: z.string(),
    alertRules: z.array(z.object({
      metric: z.string(),
      condition: z.enum(['above', 'below', 'between']),
      threshold: z.union([z.number(), z.array(z.number())]),
      severity: z.enum(['critical', 'warning', 'info']),
    })),
  }))
  .mutation(({ input }) => {
    return {
      success: true,
      deviceId: input.deviceId,
      alertRules: input.alertRules,
      updatedAt: new Date().toISOString(),
    };
  });

// Get all monitoring data
export const getMonitoringData = publicProcedure
  .input(z.object({ patientId: z.string() }))
  .query(({ input }) => {
    return mockMonitoringData;
  });

// Get monitoring data by device type
export const getMonitoringByDevice = publicProcedure
  .input(z.object({
    patientId: z.string(),
    deviceType: MonitoringDataSchema.shape.deviceType,
  }))
  .query(({ input }) => {
    return mockMonitoringData.filter(data => data.deviceType === input.deviceType);
  });

// Add monitoring data (renamed from addMonitoring to addMonitoringData)
export const addMonitoringData = publicProcedure
  .input(MonitoringDataSchema)
  .mutation(({ input }) => {
    // In a real app, this would process and store the monitoring data
    return {
      success: true,
      processed: input.metrics.length,
      timestamp: new Date().toISOString(),
    };
  });

// Get monitoring alerts
export const getMonitoringAlerts = publicProcedure
  .input(z.object({ patientId: z.string() }))
  .query(({ input }) => {
    const allAlerts = mockMonitoringData.flatMap(data => 
      data.alerts.map(alert => ({
        ...alert,
        deviceId: data.deviceId,
        deviceType: data.deviceType,
      }))
    );
    
    return allAlerts.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  });

// Acknowledge alert
export const acknowledgeAlert = publicProcedure
  .input(z.object({
    patientId: z.string(),
    deviceId: z.string(),
    alertTimestamp: z.string(),
  }))
  .mutation(({ input }) => {
    // In a real app, this would mark the alert as acknowledged
    return {
      success: true,
      acknowledgedAt: new Date().toISOString(),
    };
  });

// Generate monitoring insights
export const generateMonitoringInsights = publicProcedure
  .input(z.object({ patientId: z.string() }))
  .mutation(({ input }) => {
    // AI-powered insights from monitoring data
    const insights = [
      {
        category: 'Sleep Quality',
        insight: 'Your sleep quality has improved 15% over the past week',
        recommendation: 'Continue current sleep hygiene practices',
        confidence: 85,
        trend: 'improving',
      },
      {
        category: 'Heart Health',
        insight: 'Resting heart rate is within optimal range',
        recommendation: 'Maintain current fitness routine',
        confidence: 92,
        trend: 'stable',
      },
      {
        category: 'Activity Level',
        insight: 'Daily step count below recommended target',
        recommendation: 'Aim for 10,000 steps daily',
        confidence: 78,
        trend: 'declining',
      },
    ];
    
    return {
      insights,
      generatedAt: new Date().toISOString(),
      dataQuality: 'high',
    };
  });

// Get monitoring trends
export const getMonitoringTrends = publicProcedure
  .input(z.object({
    patientId: z.string(),
    metric: z.string(),
    timeRange: z.enum(['7d', '30d', '90d']).optional(),
  }))
  .query(({ input }) => {
    // Mock trend data
    const trendData = [
      { date: '2025-06-10', value: 70 },
      { date: '2025-06-11', value: 72 },
      { date: '2025-06-12', value: 68 },
      { date: '2025-06-13', value: 74 },
      { date: '2025-06-14', value: 71 },
      { date: '2025-06-15', value: 73 },
      { date: '2025-06-16', value: 69 },
      { date: '2025-06-17', value: 72 },
    ];

    return {
      metric: input.metric,
      timeRange: input.timeRange || '7d',
      data: trendData,
      trend: 'stable',
      averageValue: 71.1,
      minValue: 68,
      maxValue: 74,
      analysis: {
        direction: 'stable',
        confidence: 85,
        recommendation: 'Values are within normal range. Continue monitoring.',
      },
    };
  });