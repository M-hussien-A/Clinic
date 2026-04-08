export type Role =
  | "SUPER_ADMIN"
  | "CLINIC_ADMIN"
  | "DOCTOR"
  | "NURSE"
  | "RECEPTIONIST"
  | "PHARMACIST"
  | "ACCOUNTANT";

export interface NavItem {
  titleKey: string;
  href: string;
  icon: string;
  roles: Role[];
  children?: NavItem[];
}

export interface SearchResult {
  id: string;
  type: "patient" | "appointment" | "invoice" | "doctor";
  title: string;
  subtitle: string;
  href: string;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface DashboardStats {
  totalPatients: number;
  todayAppointments: number;
  revenueToday: number;
  pendingBills: number;
}

export interface ChartData {
  name: string;
  value: number;
}
