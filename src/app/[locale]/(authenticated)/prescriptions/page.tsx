"use client";

import { useLocale, useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "@/components/shared/status-badge";
import { Input } from "@/components/ui/input";
import { FileText, Printer, Send, Search, Pill } from "lucide-react";

const mockPrescriptions = [
  { id: "rx1", date: "2026-04-03", patientEn: "Ahmed Hassan", patientAr: "أحمد حسن", doctorEn: "Dr. Sarah Ahmed", doctorAr: "د. سارة أحمد", items: "Metformin 500mg, Losartan 50mg", status: "ISSUED" },
  { id: "rx2", date: "2026-04-03", patientEn: "Fatma Ali", patientAr: "فاطمة علي", doctorEn: "Dr. Khaled Mostafa", doctorAr: "د. خالد مصطفى", items: "Betamethasone Cream 0.1%", status: "SENT_TO_PHARMACY" },
  { id: "rx3", date: "2026-04-02", patientEn: "Mohamed Ibrahim", patientAr: "محمد إبراهيم", doctorEn: "Dr. Layla Hassan", doctorAr: "د. ليلى حسن", items: "Amoxicillin 250mg/5ml Susp", status: "FULLY_DISPENSED" },
  { id: "rx4", date: "2026-04-02", patientEn: "Sara Mahmoud", patientAr: "سارة محمود", doctorEn: "Dr. Sarah Ahmed", doctorAr: "د. سارة أحمد", items: "Amlodipine 5mg, Metformin 1000mg", status: "PARTIALLY_DISPENSED" },
  { id: "rx5", date: "2026-04-01", patientEn: "Youssef Kamal", patientAr: "يوسف كمال", doctorEn: "Dr. Omar Farouk", doctorAr: "د. عمر فاروق", items: "Omeprazole 20mg, Domperidone 10mg", status: "FULLY_DISPENSED" },
  { id: "rx6", date: "2026-04-01", patientEn: "Nadia Saeed", patientAr: "نادية سعيد", doctorEn: "Dr. Sarah Ahmed", doctorAr: "د. سارة أحمد", items: "Atenolol 50mg", status: "CANCELLED" },
  { id: "rx7", date: "2026-03-31", patientEn: "Hassan Omar", patientAr: "حسن عمر", doctorEn: "Dr. Khaled Mostafa", doctorAr: "د. خالد مصطفى", items: "Isotretinoin 20mg, Moisturizer", status: "FULLY_DISPENSED" },
];

export default function PrescriptionsPage() {
  const t = useTranslations();
  const locale = useLocale();

  const pending = mockPrescriptions.filter((p) => ["ISSUED", "SENT_TO_PHARMACY"].includes(p.status)).length;
  const dispensed = mockPrescriptions.filter((p) => p.status === "FULLY_DISPENSED").length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t("prescriptions.title")}</h1>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
              <Pill className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{mockPrescriptions.length}</p>
              <p className="text-xs text-muted-foreground">{t("common.total")}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-amber-100 dark:bg-amber-900 flex items-center justify-center">
              <Send className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{pending}</p>
              <p className="text-xs text-muted-foreground">{t("dashboard.pendingPrescriptions")}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-green-100 dark:bg-green-900 flex items-center justify-center">
              <FileText className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{dispensed}</p>
              <p className="text-xs text-muted-foreground">{t("prescriptions.dispensed")}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder={t("patients.searchPlaceholder")} className="ps-9" />
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("common.date")}</TableHead>
                <TableHead>{t("appointments.patient")}</TableHead>
                <TableHead>{t("appointments.doctor")}</TableHead>
                <TableHead>{t("prescriptions.title")}</TableHead>
                <TableHead>{t("common.status")}</TableHead>
                <TableHead>{t("common.actions")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockPrescriptions.map((rx) => (
                <TableRow key={rx.id}>
                  <TableCell className="font-mono text-sm">{rx.date}</TableCell>
                  <TableCell className="font-medium">{locale === "ar" ? rx.patientAr : rx.patientEn}</TableCell>
                  <TableCell>{locale === "ar" ? rx.doctorAr : rx.doctorEn}</TableCell>
                  <TableCell className="max-w-[200px] truncate text-sm">{rx.items}</TableCell>
                  <TableCell><StatusBadge status={rx.status} /></TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Printer className="h-4 w-4" />
                      </Button>
                      {rx.status === "ISSUED" && (
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Send className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
