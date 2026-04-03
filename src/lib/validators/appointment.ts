import { z } from "zod";

export const appointmentSchema = z.object({
  patientId: z.string().min(1, "Patient is required"),
  doctorId: z.string().min(1, "Doctor is required"),
  branchId: z.string().optional(),
  date: z.string().min(1, "Date is required"),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  type: z.enum(["NEW_VISIT", "FOLLOW_UP", "CONSULTATION", "PROCEDURE", "EMERGENCY"]).default("NEW_VISIT"),
  notes: z.string().optional(),
  isWalkIn: z.boolean().default(false),
});

export type AppointmentInput = z.infer<typeof appointmentSchema>;
