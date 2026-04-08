"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
}

export default function NewInvoicePage() {
  const t = useTranslations();
  const locale = useLocale();
  const [items, setItems] = useState<InvoiceItem[]>([
    { description: "", quantity: 1, unitPrice: 0 },
  ]);

  const addItem = () => setItems([...items, { description: "", quantity: 1, unitPrice: 0 }]);
  const removeItem = (i: number) => setItems(items.filter((_, idx) => idx !== i));
  const updateItem = (i: number, field: keyof InvoiceItem, value: string | number) => {
    const updated = [...items];
    (updated[i] as unknown as Record<string, string | number>)[field] = value;
    setItems(updated);
  };

  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-4">
        <Link href={`/${locale}/billing`}>
          <Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button>
        </Link>
        <h1 className="text-2xl font-bold">{t("billing.newInvoice")}</h1>
      </div>

      <Card>
        <CardHeader><CardTitle>{locale === "ar" ? "تفاصيل الفاتورة" : "Invoice Details"}</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{t("appointments.patient")}</Label>
              <Select>
                <SelectTrigger><SelectValue placeholder={t("appointments.selectPatient")} /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="p1">{locale === "ar" ? "أحمد حسن" : "Ahmed Hassan"}</SelectItem>
                  <SelectItem value="p2">{locale === "ar" ? "فاطمة علي" : "Fatma Ali"}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>{locale === "ar" ? "تاريخ الاستحقاق" : "Due Date"}</Label>
              <Input type="date" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{locale === "ar" ? "البنود" : "Items"}</CardTitle>
            <Button variant="outline" size="sm" onClick={addItem}><Plus className="h-4 w-4 me-1" />{t("actions.add")}</Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {items.map((item, i) => (
            <div key={i} className="flex gap-3 items-end">
              <div className="flex-1 space-y-1">
                <Label className="text-xs">{t("common.description")}</Label>
                <Input value={item.description} onChange={(e) => updateItem(i, "description", e.target.value)} />
              </div>
              <div className="w-20 space-y-1">
                <Label className="text-xs">{locale === "ar" ? "الكمية" : "Qty"}</Label>
                <Input type="number" value={item.quantity} onChange={(e) => updateItem(i, "quantity", parseInt(e.target.value) || 0)} />
              </div>
              <div className="w-32 space-y-1">
                <Label className="text-xs">{locale === "ar" ? "السعر" : "Price"}</Label>
                <Input type="number" value={item.unitPrice} onChange={(e) => updateItem(i, "unitPrice", parseFloat(e.target.value) || 0)} />
              </div>
              <div className="w-32 space-y-1">
                <Label className="text-xs">{t("common.total")}</Label>
                <Input disabled value={formatCurrency(item.quantity * item.unitPrice, "EGP", locale)} />
              </div>
              <Button variant="ghost" size="icon" onClick={() => removeItem(i)} disabled={items.length === 1}>
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          ))}
          <div className="flex justify-end pt-4 border-t">
            <div className="text-end">
              <p className="text-sm text-muted-foreground">{t("billing.subtotal")}</p>
              <p className="text-xl font-bold">{formatCurrency(subtotal, "EGP", locale)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <Label>{t("common.notes")}</Label>
          <Textarea className="mt-2" />
        </CardContent>
      </Card>

      <div className="flex gap-3 justify-end">
        <Link href={`/${locale}/billing`}><Button variant="outline">{t("actions.cancel")}</Button></Link>
        <Button variant="outline">{locale === "ar" ? "حفظ كمسودة" : "Save as Draft"}</Button>
        <Button>{locale === "ar" ? "إصدار الفاتورة" : "Issue Invoice"}</Button>
      </div>
    </div>
  );
}
