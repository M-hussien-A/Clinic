import { z } from "zod";

export const invoiceItemSchema = z.object({
  serviceId: z.string().optional(),
  descriptionEn: z.string().min(1, "Description is required"),
  descriptionAr: z.string().optional(),
  quantity: z.coerce.number().int().min(1).default(1),
  unitPrice: z.coerce.number().min(0, "Price must be positive"),
});

export const invoiceSchema = z.object({
  patientId: z.string().min(1, "Patient is required"),
  items: z.array(invoiceItemSchema).min(1, "At least one item is required"),
  discount: z.coerce.number().min(0).default(0),
  notes: z.string().optional(),
  dueDate: z.string().optional(),
});

export const paymentSchema = z.object({
  invoiceId: z.string().min(1, "Invoice is required"),
  amount: z.coerce.number().min(0.01, "Amount must be positive"),
  method: z.enum(["CASH", "CREDIT_CARD", "DEBIT_CARD", "BANK_TRANSFER", "INSURANCE", "SPLIT"]),
  referenceNo: z.string().optional(),
  notes: z.string().optional(),
});

export type InvoiceInput = z.infer<typeof invoiceSchema>;
export type PaymentInput = z.infer<typeof paymentSchema>;
