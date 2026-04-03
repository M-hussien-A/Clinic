"use client";

import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "@/components/shared/status-badge";
import { Input } from "@/components/ui/input";
import { Plus, Receipt, DollarSign, AlertCircle, CheckCircle, Search } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

const mockInvoices = [
  { id: "i1", number: "INV-2026-00051", date: "2026-04-03", patientEn: "Ahmed Hassan", patientAr: "أحمد حسن", total: 850, paid: 850, status: "PAID" },
  { id: "i2", number: "INV-2026-00050", date: "2026-04-03", patientEn: "Fatma Ali", patientAr: "فاطمة علي", total: 450, paid: 0, status: "ISSUED" },
  { id: "i3", number: "INV-2026-00049", date: "2026-04-02", patientEn: "Mohamed Ibrahim", patientAr: "محمد إبراهيم", total: 1200, paid: 600, status: "PARTIALLY_PAID" },
  { id: "i4", number: "INV-2026-00048", date: "2026-04-01", patientEn: "Sara Mahmoud", patientAr: "سارة محمود", total: 350, paid: 350, status: "PAID" },
  { id: "i5", number: "INV-2026-00047", date: "2026-03-28", patientEn: "Youssef Kamal", patientAr: "يوسف كمال", total: 2500, paid: 0, status: "OVERDUE" },
  { id: "i6", number: "INV-2026-00046", date: "2026-03-25", patientEn: "Nadia Saeed", patientAr: "نادية سعيد", total: 750, paid: 750, status: "PAID" },
  { id: "i7", number: "INV-2026-00045", date: "2026-03-20", patientEn: "Hassan Omar", patientAr: "حسن عمر", total: 180, paid: 0, status: "VOID" },
];

export default function BillingPage() {
  const t = useTranslations();
  const locale = useLocale();

  const totalRevenue = mockInvoices.filter((i) => i.status !== "VOID").reduce((sum, i) => sum + i.paid, 0);
  const pendingAmount = mockInvoices.filter((i) => ["ISSUED", "PARTIALLY_PAID", "OVERDUE"].includes(i.status)).reduce((sum, i) => sum + (i.total - i.paid), 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t("billing.title")}</h1>
        <Link href={`/${locale}/billing/new`}>
          <Button><Plus className="h-4 w-4 me-2" />{t("billing.newInvoice")}</Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-green-100 dark:bg-green-900 flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{formatCurrency(totalRevenue, "EGP", locale)}</p>
              <p className="text-xs text-muted-foreground">{t("reports.revenue")}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-amber-100 dark:bg-amber-900 flex items-center justify-center">
              <AlertCircle className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{formatCurrency(pendingAmount, "EGP", locale)}</p>
              <p className="text-xs text-muted-foreground">{t("dashboard.pendingBills")}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
              <Receipt className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{mockInvoices.length}</p>
              <p className="text-xs text-muted-foreground">{t("billing.invoiceList")}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-green-100 dark:bg-green-900 flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{mockInvoices.filter((i) => i.status === "PAID").length}</p>
              <p className="text-xs text-muted-foreground">{t("billing.paid")}</p>
            </div>
          </CardContent>
        </Card>
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
                <TableHead>{t("billing.invoiceNumber")}</TableHead>
                <TableHead>{t("common.date")}</TableHead>
                <TableHead>{t("appointments.patient")}</TableHead>
                <TableHead>{t("billing.total")}</TableHead>
                <TableHead>{t("billing.paid")}</TableHead>
                <TableHead>{t("billing.balance")}</TableHead>
                <TableHead>{t("common.status")}</TableHead>
                <TableHead>{t("common.actions")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockInvoices.map((inv) => (
                <TableRow key={inv.id}>
                  <TableCell className="font-mono text-sm">{inv.number}</TableCell>
                  <TableCell>{inv.date}</TableCell>
                  <TableCell className="font-medium">{locale === "ar" ? inv.patientAr : inv.patientEn}</TableCell>
                  <TableCell>{formatCurrency(inv.total, "EGP", locale)}</TableCell>
                  <TableCell>{formatCurrency(inv.paid, "EGP", locale)}</TableCell>
                  <TableCell className={inv.total - inv.paid > 0 ? "text-destructive font-medium" : ""}>
                    {formatCurrency(inv.total - inv.paid, "EGP", locale)}
                  </TableCell>
                  <TableCell><StatusBadge status={inv.status} /></TableCell>
                  <TableCell>
                    <Link href={`/${locale}/billing/${inv.id}`}>
                      <Button variant="ghost" size="sm">{t("actions.view")}</Button>
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
