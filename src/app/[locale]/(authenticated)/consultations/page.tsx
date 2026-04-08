"use client";

import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Activity, Eye, Clock, Stethoscope } from "lucide-react";
import { cn } from "@/lib/utils";

const statusColors: Record<string, string> = {
  VITALS_PENDING: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
  IN_PROGRESS: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  COMPLETED: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  SIGNED: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
};

const mockConsultations = [
  { id: "c1", patientEn: "Ahmed Hassan", patientAr: "أحمد حسن", doctorEn: "Dr. Sarah Ahmed", doctorAr: "د. سارة أحمد", date: "2026-04-03", time: "09:00", status: "VITALS_PENDING", complaint: "Chest pain" },
  { id: "c2", patientEn: "Fatma Ali", patientAr: "فاطمة علي", doctorEn: "Dr. Khaled Mostafa", doctorAr: "د. خالد مصطفى", date: "2026-04-03", time: "09:30", status: "IN_PROGRESS", complaint: "Skin rash" },
  { id: "c3", patientEn: "Mohamed Ibrahim", patientAr: "محمد إبراهيم", doctorEn: "Dr. Layla Hassan", doctorAr: "د. ليلى حسن", date: "2026-04-03", time: "10:00", status: "COMPLETED", complaint: "Fever - Child" },
  { id: "c4", patientEn: "Sara Mahmoud", patientAr: "سارة محمود", doctorEn: "Dr. Sarah Ahmed", doctorAr: "د. سارة أحمد", date: "2026-04-03", time: "10:30", status: "SIGNED", complaint: "Diabetes follow-up" },
  { id: "c5", patientEn: "Youssef Kamal", patientAr: "يوسف كمال", doctorEn: "Dr. Omar Farouk", doctorAr: "د. عمر فاروق", date: "2026-04-03", time: "11:00", status: "VITALS_PENDING", complaint: "Headache" },
  { id: "c6", patientEn: "Nadia Saeed", patientAr: "نادية سعيد", doctorEn: "Dr. Sarah Ahmed", doctorAr: "د. سارة أحمد", date: "2026-04-02", time: "14:00", status: "SIGNED", complaint: "Hypertension" },
  { id: "c7", patientEn: "Hassan Omar", patientAr: "حسن عمر", doctorEn: "Dr. Khaled Mostafa", doctorAr: "د. خالد مصطفى", date: "2026-04-02", time: "15:00", status: "SIGNED", complaint: "Acne treatment" },
  { id: "c8", patientEn: "Mariam Adel", patientAr: "مريم عادل", doctorEn: "Dr. Layla Hassan", doctorAr: "د. ليلى حسن", date: "2026-04-02", time: "11:30", status: "COMPLETED", complaint: "Vaccination" },
];

export default function ConsultationsPage() {
  const t = useTranslations();
  const locale = useLocale();

  const todayConsultations = mockConsultations.filter((c) => c.date === "2026-04-03");
  const pendingCount = todayConsultations.filter((c) => c.status === "VITALS_PENDING").length;
  const inProgressCount = todayConsultations.filter((c) => c.status === "IN_PROGRESS").length;
  const completedCount = todayConsultations.filter((c) => ["COMPLETED", "SIGNED"].includes(c.status)).length;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{t("consultations.title")}</h1>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-amber-100 dark:bg-amber-900 flex items-center justify-center">
              <Clock className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">{pendingCount}</p>
              <p className="text-xs text-muted-foreground">{locale === "ar" ? "بانتظار العلامات الحيوية" : "Vitals Pending"}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
              <Stethoscope className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">{inProgressCount}</p>
              <p className="text-xs text-muted-foreground">{t("appointments.inProgress")}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-green-100 dark:bg-green-900 flex items-center justify-center">
              <Activity className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">{completedCount}</p>
              <p className="text-xs text-muted-foreground">{t("appointments.completed")}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
              <Eye className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">{mockConsultations.length}</p>
              <p className="text-xs text-muted-foreground">{t("common.total")}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Consultations Table */}
      <Card>
        <CardHeader>
          <CardTitle>{t("dashboard.todayAppointments")}</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("common.time")}</TableHead>
                <TableHead>{t("appointments.patient")}</TableHead>
                <TableHead>{t("appointments.doctor")}</TableHead>
                <TableHead>{t("consultations.chiefComplaint")}</TableHead>
                <TableHead>{t("common.status")}</TableHead>
                <TableHead>{t("common.actions")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockConsultations.map((c) => (
                <TableRow key={c.id}>
                  <TableCell className="font-mono">{c.time}</TableCell>
                  <TableCell className="font-medium">{locale === "ar" ? c.patientAr : c.patientEn}</TableCell>
                  <TableCell>{locale === "ar" ? c.doctorAr : c.doctorEn}</TableCell>
                  <TableCell>{c.complaint}</TableCell>
                  <TableCell>
                    <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium", statusColors[c.status])}>
                      {c.status.replace(/_/g, " ")}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Link href={`/${locale}/consultations/${c.id}`}>
                      <Button variant="ghost" size="sm">
                        {c.status === "VITALS_PENDING"
                          ? (locale === "ar" ? "تسجيل العلامات" : "Record Vitals")
                          : c.status === "IN_PROGRESS"
                          ? t("actions.view")
                          : t("actions.view")}
                      </Button>
                    </Link>
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
