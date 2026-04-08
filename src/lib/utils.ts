import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";
import { ar, enUS } from "date-fns/locale";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string, locale: string = "en", pattern: string = "PPP"): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return format(d, pattern, { locale: locale === "ar" ? ar : enUS });
}

export function formatCurrency(amount: number, currency: string = "EGP", locale: string = "en"): string {
  return new Intl.NumberFormat(locale === "ar" ? "ar-EG" : "en-EG", {
    style: "currency",
    currency,
  }).format(amount);
}

export function generatePatientId(): string {
  const now = new Date();
  const dateStr = format(now, "yyyyMMdd");
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, "0");
  return `CL-${dateStr}-${random}`;
}

export function generateInvoiceNumber(prefix: string = "INV", sequence: number): string {
  return `${prefix}-${new Date().getFullYear()}-${sequence.toString().padStart(5, "0")}`;
}

export function calculateBMI(weightKg: number, heightCm: number): number {
  const heightM = heightCm / 100;
  return Math.round((weightKg / (heightM * heightM)) * 10) / 10;
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    ACTIVE: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    INACTIVE: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
    SCHEDULED: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    CONFIRMED: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300",
    CHECKED_IN: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300",
    IN_PROGRESS: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    COMPLETED: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    NO_SHOW: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    CANCELLED: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
    DRAFT: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
    ISSUED: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    PAID: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    PARTIALLY_PAID: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
    OVERDUE: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    VOID: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
  };
  return colors[status] || "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
}
