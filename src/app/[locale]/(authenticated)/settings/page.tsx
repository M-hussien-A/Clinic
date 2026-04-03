"use client";

import { useLocale, useTranslations } from "next-intl";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Building2, Calendar, Receipt, Bell, Globe, Printer } from "lucide-react";

export default function SettingsPage() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{t("settings.title")}</h1>

      <Tabs defaultValue="clinic" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
          <TabsTrigger value="clinic"><Building2 className="h-4 w-4 me-1 hidden sm:inline" />{t("settings.clinicProfile")}</TabsTrigger>
          <TabsTrigger value="appointments"><Calendar className="h-4 w-4 me-1 hidden sm:inline" />{t("settings.appointmentSettings")}</TabsTrigger>
          <TabsTrigger value="billing"><Receipt className="h-4 w-4 me-1 hidden sm:inline" />{t("settings.billingSettings")}</TabsTrigger>
          <TabsTrigger value="notifications"><Bell className="h-4 w-4 me-1 hidden sm:inline" />{t("settings.notificationSettings")}</TabsTrigger>
          <TabsTrigger value="localization"><Globe className="h-4 w-4 me-1 hidden sm:inline" />{t("settings.localization")}</TabsTrigger>
          <TabsTrigger value="print"><Printer className="h-4 w-4 me-1 hidden sm:inline" />{t("settings.printTemplates")}</TabsTrigger>
        </TabsList>

        {/* Clinic Profile */}
        <TabsContent value="clinic">
          <Card>
            <CardHeader>
              <CardTitle>{t("settings.clinicProfile")}</CardTitle>
              <CardDescription>{locale === "ar" ? "معلومات العيادة الأساسية" : "Basic clinic information"}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{locale === "ar" ? "اسم العيادة (إنجليزي)" : "Clinic Name (English)"}</Label>
                  <Input defaultValue="Al-Shifa Medical Center" />
                </div>
                <div className="space-y-2">
                  <Label>{locale === "ar" ? "اسم العيادة (عربي)" : "Clinic Name (Arabic)"}</Label>
                  <Input defaultValue="مركز الشفاء الطبي" />
                </div>
                <div className="space-y-2">
                  <Label>{t("common.email")}</Label>
                  <Input defaultValue="info@alshifa-clinic.com" type="email" />
                </div>
                <div className="space-y-2">
                  <Label>{t("common.phone")}</Label>
                  <Input defaultValue="+20 2 1234 5678" />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label>{locale === "ar" ? "العنوان" : "Address"}</Label>
                  <Input defaultValue="15 Tahrir Street, Downtown, Cairo, Egypt" />
                </div>
                <div className="space-y-2">
                  <Label>{locale === "ar" ? "رقم الترخيص" : "License Number"}</Label>
                  <Input defaultValue="MOH-2024-12345" />
                </div>
                <div className="space-y-2">
                  <Label>{locale === "ar" ? "الموقع الإلكتروني" : "Website"}</Label>
                  <Input defaultValue="www.alshifa-clinic.com" />
                </div>
              </div>
              <Button>{t("actions.save")}</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appointment Settings */}
        <TabsContent value="appointments">
          <Card>
            <CardHeader>
              <CardTitle>{t("settings.appointmentSettings")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{locale === "ar" ? "مدة الموعد الافتراضية" : "Default Slot Duration"}</Label>
                  <Select defaultValue="30">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 min</SelectItem>
                      <SelectItem value="20">20 min</SelectItem>
                      <SelectItem value="30">30 min</SelectItem>
                      <SelectItem value="45">45 min</SelectItem>
                      <SelectItem value="60">60 min</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>{locale === "ar" ? "وقت فاصل بين المواعيد" : "Buffer Time (min)"}</Label>
                  <Input type="number" defaultValue="5" />
                </div>
                <div className="space-y-2">
                  <Label>{locale === "ar" ? "نافذة الحجز المسبق (أيام)" : "Advance Booking Window (days)"}</Label>
                  <Input type="number" defaultValue="30" />
                </div>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{locale === "ar" ? "السماح بالحجز عبر الإنترنت" : "Allow Online Booking"}</p>
                  <p className="text-sm text-muted-foreground">{locale === "ar" ? "السماح للمرضى بحجز مواعيد عبر الإنترنت" : "Allow patients to book appointments online"}</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{locale === "ar" ? "تأكيد تلقائي" : "Auto-Confirm Appointments"}</p>
                  <p className="text-sm text-muted-foreground">{locale === "ar" ? "تأكيد المواعيد تلقائياً عند الحجز" : "Auto-confirm appointments on booking"}</p>
                </div>
                <Switch />
              </div>
              <Button>{t("actions.save")}</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Billing Settings */}
        <TabsContent value="billing">
          <Card>
            <CardHeader><CardTitle>{t("settings.billingSettings")}</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{locale === "ar" ? "العملة" : "Currency"}</Label>
                  <Select defaultValue="EGP">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="EGP">EGP - Egyptian Pound</SelectItem>
                      <SelectItem value="USD">USD - US Dollar</SelectItem>
                      <SelectItem value="SAR">SAR - Saudi Riyal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>{locale === "ar" ? "نسبة الضريبة (%)" : "Tax Rate (%)"}</Label>
                  <Input type="number" defaultValue="14" step="0.5" />
                </div>
                <div className="space-y-2">
                  <Label>{locale === "ar" ? "بادئة الفاتورة" : "Invoice Prefix"}</Label>
                  <Input defaultValue="INV" />
                </div>
                <div className="space-y-2">
                  <Label>{locale === "ar" ? "شروط الدفع (أيام)" : "Payment Terms (days)"}</Label>
                  <Input type="number" defaultValue="14" />
                </div>
              </div>
              <Button>{t("actions.save")}</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader><CardTitle>{t("settings.notificationSettings")}</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {[
                { key: "appointmentReminder", en: "Appointment Reminders", ar: "تذكيرات المواعيد" },
                { key: "prescriptionReady", en: "Prescription Ready", ar: "الوصفة جاهزة" },
                { key: "labResults", en: "Lab Results Ready", ar: "نتائج المختبر جاهزة" },
                { key: "billingAlerts", en: "Billing Alerts", ar: "تنبيهات الفواتير" },
                { key: "lowStock", en: "Low Stock Alerts", ar: "تنبيهات المخزون المنخفض" },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between py-2">
                  <p className="font-medium">{locale === "ar" ? item.ar : item.en}</p>
                  <div className="flex items-center gap-4">
                    <Label className="flex items-center gap-2 text-sm">
                      <Switch defaultChecked /> {locale === "ar" ? "داخلي" : "In-App"}
                    </Label>
                    <Label className="flex items-center gap-2 text-sm">
                      <Switch /> {locale === "ar" ? "بريد" : "Email"}
                    </Label>
                    <Label className="flex items-center gap-2 text-sm">
                      <Switch /> SMS
                    </Label>
                  </div>
                </div>
              ))}
              <Button>{t("actions.save")}</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Localization */}
        <TabsContent value="localization">
          <Card>
            <CardHeader><CardTitle>{t("settings.localization")}</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{locale === "ar" ? "اللغة الافتراضية" : "Default Language"}</Label>
                  <Select defaultValue="en">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="ar">العربية</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>{locale === "ar" ? "تنسيق الوقت" : "Time Format"}</Label>
                  <Select defaultValue="24h">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="12h">12-hour</SelectItem>
                      <SelectItem value="24h">24-hour</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button>{t("actions.save")}</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Print Templates */}
        <TabsContent value="print">
          <Card>
            <CardHeader><CardTitle>{t("settings.printTemplates")}</CardTitle></CardHeader>
            <CardContent className="text-center py-12 text-muted-foreground">
              <Printer className="h-12 w-12 mx-auto mb-4" />
              <p>{locale === "ar" ? "إعدادات قوالب الطباعة ستكون متاحة قريباً" : "Print template settings coming soon"}</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
