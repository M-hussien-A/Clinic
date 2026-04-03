import { z } from "zod";

export const productSchema = z.object({
  nameEn: z.string().min(1, "Product name (English) is required"),
  nameAr: z.string().min(1, "Product name (Arabic) is required"),
  sku: z.string().min(1, "SKU is required"),
  category: z.string().optional(),
  unit: z.string().min(1, "Unit is required"),
  purchasePrice: z.coerce.number().min(0, "Purchase price must be positive"),
  sellingPrice: z.coerce.number().min(0, "Selling price must be positive"),
  reorderLevel: z.coerce.number().int().min(0).default(10),
});

export const stockTransactionSchema = z.object({
  productId: z.string().min(1, "Product is required"),
  branchId: z.string().min(1, "Branch is required"),
  type: z.enum(["RECEIVE", "DISPENSE", "ADJUST", "TRANSFER", "RETURN"]),
  quantity: z.coerce.number().int().min(1, "Quantity must be at least 1"),
  batchNumber: z.string().optional(),
  expiryDate: z.string().optional(),
  reference: z.string().optional(),
  notes: z.string().optional(),
});

export type ProductInput = z.infer<typeof productSchema>;
export type StockTransactionInput = z.infer<typeof stockTransactionSchema>;
