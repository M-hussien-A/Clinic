"use client";

import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Printer, CreditCard } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { StatusBadge } from "@/components/shared/status-badge";

export default function InvoiceDetailPage() {
  const t = useTranslations();
  const locale = useLocale();

  const invoice = {
    number: "INV-2026-00051",
    date: "2026-04-03",
    dueDate: "2026-04-17",
    patientEn: "Ahmed Hassan",
    patientAr: "أحمد حسن",
    patientId: "CL-20260401-0001",
    status: "PAID",
    items: [
      { desc: "Consultation Fee", descAr: "رسوم الاستشارة", qty: 1, price: 500 },
      { desc: "Blood Test - CBC", descAr: "تحليل دم - صورة دم كاملة", qty: 1, price: 200 },
      { desc: "Metformin 500mg x30", descAr: "ميتفورمين ٥٠٠ مجم × ٣٠", qty: 1, price: 150 },
    ],
    subtotal: 850,
    tax: 0,
    discount: 0,
    total: 850,
    paid: 850,
    payments: [
      { date: "2026-04-03", amount: 850, method: "CASH", reference: "" },
    ],
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-4">
        <Link href={`/${locale}/billing`}>
          <Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{invoice.number}</h1>
          <p className="text-sm text-muted-foreground">{invoice.date}</p>
        </div>
        <StatusBadge status={invoice.status} />
        <Button variant="outline"><Printer className="h-4 w-4 me-2" />{t("actions.print")}</Button>
        {invoice.status !== "PAID" && (
          <Button><CreditCard className="h-4 w-4 me-2" />{t("billing.recordPayment")}</Button>
        )}
      </div>

      <Card>
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-muted-foreground">{t("appointments.patient")}</p>
              <p className="font-medium">{locale === "ar" ? invoice.patientAr : invoice.patientEn}</p>
              <p className="text-sm text-muted-foreground">{invoice.patientId}</p>
            </div>
            <div className="text-end">
              <p className="text-sm text-muted-foreground">{t("billing.invoiceNumber")}</p>
              <p className="font-mono font-medium">{invoice.number}</p>
              <p className="text-sm text-muted-foreground mt-2">{locale === "ar" ? "تاريخ الاستحقاق" : "Due Date"}: {invoice.dueDate}</p>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("common.description")}</TableHead>
                <TableHead className="text-center">{locale === "ar" ? "الكمية" : "Qty"}</TableHead>
                <TableHead className="text-end">{locale === "ar" ? "السعر" : "Price"}</TableHead>
                <TableHead className="text-end">{t("common.total")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoice.items.map((item, i) => (
                <TableRow key={i}>
                  <TableCell>{locale === "ar" ? item.descAr : item.desc}</TableCell>
                  <TableCell className="text-center">{item.qty}</TableCell>
                  <TableCell className="text-end">{formatCurrency(item.price, "EGP", locale)}</TableCell>
                  <TableCell className="text-end">{formatCurrency(item.qty * item.price, "EGP", locale)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Separator />

          <div className="space-y-2 max-w-xs ms-auto">
            <div className="flex justify-between text-sm">
              <span>{t("billing.subtotal")}</span>
              <span>{formatCurrency(invoice.subtotal, "EGP", locale)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>{t("billing.tax")}</span>
              <span>{formatCurrency(invoice.tax, "EGP", locale)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>{t("billing.discount")}</span>
              <span>{formatCurrency(invoice.discount, "EGP", locale)}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-bold">
              <span>{t("billing.total")}</span>
              <span>{formatCurrency(invoice.total, "EGP", locale)}</span>
            </div>
            <div className="flex justify-between text-sm text-green-600">
              <span>{t("billing.paid")}</span>
              <span>{formatCurrency(invoice.paid, "EGP", locale)}</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>{t("billing.balance")}</span>
              <span>{formatCurrency(invoice.total - invoice.paid, "EGP", locale)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment History */}
      <Card>
        <CardHeader><CardTitle className="text-sm">{locale === "ar" ? "سجل المدفوعات" : "Payment History"}</CardTitle></CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("common.date")}</TableHead>
                <TableHead>{locale === "ar" ? "المبلغ" : "Amount"}</TableHead>
                <TableHead>{t("billing.paymentMethod")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoice.payments.map((p, i) => (
                <TableRow key={i}>
                  <TableCell>{p.date}</TableCell>
                  <TableCell>{formatCurrency(p.amount, "EGP", locale)}</TableCell>
                  <TableCell><Badge variant="outline">{t(`billing.${p.method.toLowerCase()}`)}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
