import { z } from "zod";
import { publicProcedure } from "../../../create-context";
import { Appointment } from "@/types";

// Mock data with proper typing
let mockAppointments: Appointment[] = [
  {
    id: "1",
    type: "virtual",
    specialistId: "specialist-1",
    specialistName: "Dr. Sarah Johnson",
    specialistType: "Cardiologist",
    date: "2025-06-20",
    time: "10:00 AM",
    duration: 30,
    status: "scheduled",
    notes: "Follow-up consultation for heart health",
  },
  {
    id: "2",
    type: "physical",
    specialistId: "specialist-2",
    specialistName: "Dr. Michael Chen",
    specialistType: "General Practitioner",
    date: "2025-06-25",
    time: "2:00 PM",
    duration: 45,
    status: "scheduled",
    notes: "Annual physical examination",
  },
];

const mockAvailableSlots = [
  { date: "2025-06-21", time: "9:00 AM", available: true },
  { date: "2025-06-21", time: "10:00 AM", available: false },
  { date: "2025-06-21", time: "11:00 AM", available: true },
  { date: "2025-06-22", time: "2:00 PM", available: true },
  { date: "2025-06-22", time: "3:00 PM", available: true },
];

export const getAppointments = publicProcedure
  .input(z.object({
    status: z.enum(["scheduled", "completed", "cancelled"]).optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
  }).optional())
  .query(async ({ input }) => {
    let appointments = [...mockAppointments];
    
    if (input?.status) {
      appointments = appointments.filter(apt => apt.status === input.status);
    }
    
    if (input?.startDate) {
      appointments = appointments.filter(apt => apt.date >= input.startDate!);
    }
    
    if (input?.endDate) {
      appointments = appointments.filter(apt => apt.date <= input.endDate!);
    }
    
    return appointments;
  });

export const bookAppointment = publicProcedure
  .input(z.object({
    specialistId: z.string(),
    specialistName: z.string(),
    specialistType: z.string(),
    type: z.enum(["virtual", "physical", "home"]),
    date: z.string(),
    time: z.string(),
    duration: z.number().default(30),
    notes: z.string().optional(),
  }))
  .mutation(async ({ input }) => {
    const newAppointment: Appointment = {
      id: `appointment_${Date.now()}`,
      type: input.type,
      specialistId: input.specialistId,
      specialistName: input.specialistName,
      specialistType: input.specialistType,
      date: input.date,
      time: input.time,
      duration: input.duration,
      status: "scheduled",
      notes: input.notes || "",
    };
    
    mockAppointments.push(newAppointment);
    
    return {
      success: true,
      appointment: newAppointment,
      message: "Appointment booked successfully",
    };
  });

export const cancelAppointment = publicProcedure
  .input(z.object({
    appointmentId: z.string(),
    reason: z.string().optional(),
  }))
  .mutation(async ({ input }) => {
    const appointmentIndex = mockAppointments.findIndex(apt => apt.id === input.appointmentId);
    
    if (appointmentIndex === -1) {
      throw new Error("Appointment not found");
    }
    
    // Update the appointment status to cancelled
    mockAppointments[appointmentIndex] = {
      ...mockAppointments[appointmentIndex],
      status: "cancelled",
    };
    
    return {
      success: true,
      message: "Appointment cancelled successfully",
    };
  });

export const rescheduleAppointment = publicProcedure
  .input(z.object({
    appointmentId: z.string(),
    newDate: z.string(),
    newTime: z.string(),
    reason: z.string().optional(),
  }))
  .mutation(async ({ input }) => {
    const appointmentIndex = mockAppointments.findIndex(apt => apt.id === input.appointmentId);
    
    if (appointmentIndex === -1) {
      throw new Error("Appointment not found");
    }
    
    mockAppointments[appointmentIndex] = {
      ...mockAppointments[appointmentIndex],
      date: input.newDate,
      time: input.newTime,
    };
    
    return {
      success: true,
      appointment: mockAppointments[appointmentIndex],
      message: "Appointment rescheduled successfully",
    };
  });

export const getAvailableSlots = publicProcedure
  .input(z.object({
    specialistId: z.string(),
    startDate: z.string(),
    endDate: z.string(),
  }))
  .query(async ({ input }) => {
    // Filter available slots based on date range
    const availableSlots = mockAvailableSlots.filter(slot => 
      slot.date >= input.startDate && 
      slot.date <= input.endDate &&
      slot.available
    );
    
    return availableSlots;
  });