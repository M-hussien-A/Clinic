"use client";

import { useLocale, useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";

import { Search, FlaskConical, Eye } from "lucide-react";

const statusColors: Record<string, string> = {
  ORDERED: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  SAMPLE_COLLECTED: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300",
  PROCESSING: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
  RESULTS_READY: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  REVIEWED: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
};

const mockLabOrders = [
  { id: "lo1", date: "2026-04-03", patientEn: "Ahmed Hassan", patientAr: "أحمد حسن", doctorEn: "Dr. Sarah Ahmed", doctorAr: "د. سارة أحمد", tests: "CBC, FBS, HbA1c", urgency: "routine", status: "ORDERED" },
  { id: "lo2", date: "2026-04-03", patientEn: "Fatma Ali", patientAr: "فاطمة علي", doctorEn: "Dr. Khaled Mostafa", doctorAr: "د. خالد مصطفى", tests: "Skin Biopsy", urgency: "urgent", status: "SAMPLE_COLLECTED" },
  { id: "lo3", date: "2026-04-02", patientEn: "Mohamed Ibrahim", patientAr: "محمد إبراهيم", doctorEn: "Dr. Layla Hassan", doctorAr: "د. ليلى حسن", tests: "CBC, CRP", urgency: "stat", status: "RESULTS_READY" },
  { id: "lo4", date: "2026-04-02", patientEn: "Sara Mahmoud", patientAr: "سارة محمود", doctorEn: "Dr. Sarah Ahmed", doctorAr: "د. سارة أحمد", tests: "Lipid Panel, Liver Function", urgency: "routine", status: "PROCESSING" },
  { id: "lo5", date: "2026-04-01", patientEn: "Youssef Kamal", patientAr: "يوسف كمال", doctorEn: "Dr. Omar Farouk", doctorAr: "د. عمر فاروق", tests: "H. Pylori, Stool Analysis", urgency: "routine", status: "REVIEWED" },
  { id: "lo6", date: "2026-04-01", patientEn: "Nadia Saeed", patientAr: "نادية سعيد", doctorEn: "Dr. Sarah Ahmed", doctorAr: "د. سارة أحمد", tests: "Thyroid Panel (TSH, T3, T4)", urgency: "routine", status: "REVIEWED" },
];

const urgencyColors: Record<string, string> = {
  routine: "secondary",
  urgent: "default",
  stat: "destructive",
};

export default function LabOrdersPage() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FlaskConical className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">{t("nav.labOrders")}</h1>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-5">
        {Object.entries(statusColors).map(([status, color]) => {
          const count = mockLabOrders.filter((o) => o.status === status).length;
          return (
            <Card key={status}>
              <CardContent className="p-3 text-center">
                <p className="text-2xl font-bold">{count}</p>
                <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${color}`}>
                  {status.replace(/_/g, " ")}
                </span>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder={t("actions.search")} className="ps-9" />
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("common.date")}</TableHead>
                <TableHead>{t("appointments.patient")}</TableHead>
                <TableHead>{t("appointments.doctor")}</TableHead>
                <TableHead>{locale === "ar" ? "الفحوصات" : "Tests"}</TableHead>
                <TableHead>{t("lab.urgency")}</TableHead>
                <TableHead>{t("common.status")}</TableHead>
                <TableHead>{t("common.actions")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockLabOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-mono text-sm">{order.date}</TableCell>
                  <TableCell className="font-medium">{locale === "ar" ? order.patientAr : order.patientEn}</TableCell>
                  <TableCell>{locale === "ar" ? order.doctorAr : order.doctorEn}</TableCell>
                  <TableCell className="text-sm max-w-[200px] truncate">{order.tests}</TableCell>
                  <TableCell>
                    <Badge variant={urgencyColors[order.urgency] as "default" | "secondary" | "destructive"} className="text-xs">
                      {t(`lab.${order.urgency}`)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[order.status]}`}>
                      {order.status.replace(/_/g, " ")}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm"><Eye className="h-4 w-4 me-1" />{t("actions.view")}</Button>
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
