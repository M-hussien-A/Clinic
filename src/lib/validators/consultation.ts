import { z } from "zod";

export const vitalsSchema = z.object({
  bloodPressureSys: z.coerce.number().int().min(50).max(300).optional(),
  bloodPressureDia: z.coerce.number().int().min(20).max(200).optional(),
  heartRate: z.coerce.number().int().min(20).max(250).optional(),
  temperature: z.coerce.number().min(30).max(45).optional(),
  weightKg: z.coerce.number().min(0.5).max(500).optional(),
  heightCm: z.coerce.number().min(20).max(300).optional(),
  spo2: z.coerce.number().int().min(50).max(100).optional(),
  bloodSugar: z.coerce.number().min(20).max(900).optional(),
});

export const consultationSchema = z.object({
  chiefComplaint: z.string().optional(),
  historyPresent: z.string().optional(),
  reviewOfSystems: z.string().optional(),
  examination: z.string().optional(),
  diagnosisPrimary: z.string().optional(),
  diagnosisSecondary: z.string().optional(),
  treatmentPlan: z.string().optional(),
  soapSubjective: z.string().optional(),
  soapObjective: z.string().optional(),
  soapAssessment: z.string().optional(),
  soapPlan: z.string().optional(),
});

export const prescriptionItemSchema = z.object({
  drugName: z.string().min(1, "Drug name is required"),
  dosage: z.string().min(1, "Dosage is required"),
  form: z.string().min(1, "Form is required"),
  frequency: z.string().min(1, "Frequency is required"),
  route: z.string().min(1, "Route is required"),
  duration: z.string().min(1, "Duration is required"),
  quantity: z.coerce.number().int().min(1, "Quantity must be at least 1"),
  instructions: z.string().optional(),
});

export const prescriptionSchema = z.object({
  items: z.array(prescriptionItemSchema).min(1, "At least one medication is required"),
  notes: z.string().optional(),
});

export type VitalsInput = z.infer<typeof vitalsSchema>;
export type ConsultationInput = z.infer<typeof consultationSchema>;
export type PrescriptionInput = z.infer<typeof prescriptionSchema>;
export type PrescriptionItemInput = z.infer<typeof prescriptionItemSchema>;
