import { z } from "zod";

export const patientSchema = z.object({
  nameEn: z.string().min(2, "Name (English) is required"),
  nameAr: z.string().min(2, "Name (Arabic) is required"),
  nationalId: z.string().optional(),
  passportNumber: z.string().optional(),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  gender: z.enum(["MALE", "FEMALE"]),
  bloodType: z.enum(["A_POS", "A_NEG", "B_POS", "B_NEG", "AB_POS", "AB_NEG", "O_POS", "O_NEG", "UNKNOWN"]).optional(),
  phonePrimary: z.string().min(5, "Primary phone is required"),
  phoneSecondary: z.string().optional(),
  email: z.string().email().optional().or(z.literal("")),
  addressEn: z.string().optional(),
  addressAr: z.string().optional(),
  nationality: z.string().optional(),
  maritalStatus: z.string().optional(),
  occupation: z.string().optional(),
  emergencyName: z.string().optional(),
  emergencyRelation: z.string().optional(),
  emergencyPhone: z.string().optional(),
  insuranceProvider: z.string().optional(),
  policyNumber: z.string().optional(),
  coverageType: z.string().optional(),
  insuranceExpiry: z.string().optional(),
  allergies: z.string().optional(),
  chronicConditions: z.string().optional(),
});

export type PatientInput = z.infer<typeof patientSchema>;
