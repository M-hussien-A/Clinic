"use client";

import { useLocale, useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Download } from "lucide-react";

const mockLogs = [
  { id: "1", user: "admin@clinic.com", action: "LOGIN", module: "auth", entity: "-", timestamp: "2026-04-03 09:15:32", ip: "192.168.1.100" },
  { id: "2", user: "doctor@clinic.com", action: "LOGIN", module: "auth", entity: "-", timestamp: "2026-04-03 08:30:15", ip: "192.168.1.101" },
  { id: "3", user: "receptionist@clinic.com", action: "CREATE", module: "appointments", entity: "Appointment #APT-2026-0155", timestamp: "2026-04-03 08:45:22", ip: "192.168.1.102" },
  { id: "4", user: "nurse@clinic.com", action: "UPDATE", module: "consultations", entity: "Consultation #C-0089", timestamp: "2026-04-03 09:10:45", ip: "192.168.1.103" },
  { id: "5", user: "doctor@clinic.com", action: "CREATE", module: "prescriptions", entity: "Prescription #RX-0045", timestamp: "2026-04-03 09:30:10", ip: "192.168.1.101" },
  { id: "6", user: "pharmacist@clinic.com", action: "UPDATE", module: "inventory", entity: "Stock - Metformin 500mg", timestamp: "2026-04-03 10:00:05", ip: "192.168.1.104" },
  { id: "7", user: "receptionist@clinic.com", action: "CREATE", module: "patients", entity: "Patient CL-20260403-0021", timestamp: "2026-04-03 10:15:33", ip: "192.168.1.102" },
  { id: "8", user: "accountant@clinic.com", action: "CREATE", module: "billing", entity: "Invoice INV-2026-00051", timestamp: "2026-04-03 10:30:20", ip: "192.168.1.105" },
  { id: "9", user: "admin@clinic.com", action: "UPDATE", module: "settings", entity: "Clinic Settings", timestamp: "2026-04-03 11:00:00", ip: "192.168.1.100" },
  { id: "10", user: "doctor@clinic.com", action: "VIEW", module: "patients", entity: "Patient CL-20260401-0001", timestamp: "2026-04-03 11:15:45", ip: "192.168.1.101" },
];

const actionColors: Record<string, string> = {
  LOGIN: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  LOGOUT: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
  CREATE: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  UPDATE: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
  DELETE: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  VIEW: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
};

export default function AuditLogPage() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t("nav.auditLog")}</h1>
        <Button variant="outline"><Download className="h-4 w-4 me-2" />{t("actions.export")}</Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-3 items-end">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder={locale === "ar" ? "بحث بالمستخدم..." : "Search by user..."} className="ps-9" />
            </div>
            <Select>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder={locale === "ar" ? "الإجراء" : "Action"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("common.all")}</SelectItem>
                <SelectItem value="LOGIN">LOGIN</SelectItem>
                <SelectItem value="CREATE">CREATE</SelectItem>
                <SelectItem value="UPDATE">UPDATE</SelectItem>
                <SelectItem value="DELETE">DELETE</SelectItem>
                <SelectItem value="VIEW">VIEW</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder={locale === "ar" ? "الوحدة" : "Module"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("common.all")}</SelectItem>
                <SelectItem value="auth">{locale === "ar" ? "المصادقة" : "Auth"}</SelectItem>
                <SelectItem value="patients">{t("nav.patients")}</SelectItem>
                <SelectItem value="appointments">{t("nav.appointments")}</SelectItem>
                <SelectItem value="consultations">{t("nav.consultations")}</SelectItem>
                <SelectItem value="billing">{t("nav.billing")}</SelectItem>
                <SelectItem value="inventory">{t("nav.inventory")}</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex gap-2">
              <Input type="date" className="w-[150px]" />
              <Input type="date" className="w-[150px]" />
            </div>
            <Button variant="outline" size="icon"><Filter className="h-4 w-4" /></Button>
          </div>
        </CardContent>
      </Card>

      {/* Log Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{locale === "ar" ? "الوقت" : "Timestamp"}</TableHead>
                <TableHead>{locale === "ar" ? "المستخدم" : "User"}</TableHead>
                <TableHead>{locale === "ar" ? "الإجراء" : "Action"}</TableHead>
                <TableHead>{locale === "ar" ? "الوحدة" : "Module"}</TableHead>
                <TableHead>{locale === "ar" ? "الكيان" : "Entity"}</TableHead>
                <TableHead>IP</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-mono text-xs">{log.timestamp}</TableCell>
                  <TableCell className="text-sm">{log.user}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${actionColors[log.action]}`}>
                      {log.action}
                    </span>
                  </TableCell>
                  <TableCell><Badge variant="outline" className="text-xs">{log.module}</Badge></TableCell>
                  <TableCell className="text-sm max-w-[200px] truncate">{log.entity}</TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">{log.ip}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
