"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft, Heart, Thermometer, Weight, Ruler, Activity, Droplets,
  Save, CheckCircle, Plus, Pill
} from "lucide-react";
import Link from "next/link";

export default function ConsultationDetailPage() {
  const t = useTranslations();
  const locale = useLocale();
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { key: "vitals", label: t("consultations.vitals"), icon: Heart },
    { key: "examination", label: t("consultations.examination"), icon: Activity },
    { key: "diagnosis", label: t("consultations.diagnosis"), icon: Droplets },
    { key: "treatment", label: t("consultations.treatment"), icon: Pill },
    { key: "notes", label: t("consultations.notes"), icon: Save },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href={`/${locale}/consultations`}>
          <Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">{t("consultations.title")}</h1>
          <p className="text-sm text-muted-foreground">
            {locale === "ar" ? "أحمد حسن" : "Ahmed Hassan"} - {locale === "ar" ? "د. سارة أحمد" : "Dr. Sarah Ahmed"}
          </p>
        </div>
        <div className="ms-auto">
          <Badge variant="outline">{locale === "ar" ? "بانتظار العلامات الحيوية" : "Vitals Pending"}</Badge>
        </div>
      </div>

      {/* Step Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {steps.map((step, i) => (
          <Button
            key={step.key}
            variant={activeStep === i ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveStep(i)}
            className="shrink-0"
          >
            <step.icon className="h-4 w-4 me-1" />
            {step.label}
          </Button>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1fr_300px] gap-6">
        {/* Main Content */}
        <div>
          {/* Vitals */}
          {activeStep === 0 && (
            <Card>
              <CardHeader><CardTitle>{t("consultations.vitals")}</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-1"><Heart className="h-3 w-3 text-red-500" />{t("consultations.bloodPressure")}</Label>
                    <div className="flex gap-1">
                      <Input placeholder="SYS" type="number" />
                      <span className="flex items-center">/</span>
                      <Input placeholder="DIA" type="number" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-1"><Activity className="h-3 w-3 text-red-500" />{t("consultations.heartRate")}</Label>
                    <Input placeholder="bpm" type="number" />
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-1"><Thermometer className="h-3 w-3 text-orange-500" />{t("consultations.temperature")}</Label>
                    <Input placeholder="°C" type="number" step="0.1" />
                  </div>
                  <div className="space-y-2">
                    <Label>{t("consultations.spo2")}</Label>
                    <Input placeholder="%" type="number" />
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-1"><Weight className="h-3 w-3" />{t("consultations.weight")}</Label>
                    <Input placeholder="kg" type="number" step="0.1" />
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-1"><Ruler className="h-3 w-3" />{t("consultations.height")}</Label>
                    <Input placeholder="cm" type="number" />
                  </div>
                  <div className="space-y-2">
                    <Label>{t("consultations.bmi")}</Label>
                    <Input disabled placeholder="Auto" />
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-1"><Droplets className="h-3 w-3 text-blue-500" />{t("consultations.bloodSugar")}</Label>
                    <Input placeholder="mg/dL" type="number" />
                  </div>
                </div>
                <Button onClick={() => setActiveStep(1)}>
                  <Save className="h-4 w-4 me-2" />{t("actions.save")} &amp; {t("actions.next")}
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Examination */}
          {activeStep === 1 && (
            <Card>
              <CardHeader><CardTitle>{t("consultations.examination")}</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>{t("consultations.chiefComplaint")}</Label>
                  <Textarea placeholder={locale === "ar" ? "الشكوى الرئيسية..." : "Chief complaint..."} rows={2} />
                </div>
                <div className="space-y-2">
                  <Label>{t("consultations.historyPresent")}</Label>
                  <Textarea placeholder={locale === "ar" ? "تاريخ المرض الحالي..." : "History of present illness..."} rows={3} />
                </div>
                <div className="space-y-2">
                  <Label>{t("consultations.physicalExam")}</Label>
                  <Textarea placeholder={locale === "ar" ? "نتائج الفحص البدني..." : "Physical examination findings..."} rows={4} />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setActiveStep(0)}>{t("actions.previous")}</Button>
                  <Button onClick={() => setActiveStep(2)}>{t("actions.next")}</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Diagnosis */}
          {activeStep === 2 && (
            <Card>
              <CardHeader><CardTitle>{t("consultations.diagnosis")}</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>{t("consultations.primaryDiagnosis")}</Label>
                  <Input placeholder={locale === "ar" ? "بحث ICD-10..." : "Search ICD-10 codes..."} />
                </div>
                <div className="space-y-2">
                  <Label>{t("consultations.secondaryDiagnosis")}</Label>
                  <Input placeholder={locale === "ar" ? "تشخيص ثانوي..." : "Secondary diagnosis..."} />
                </div>
                <div className="space-y-2">
                  <Label>{t("consultations.treatment")}</Label>
                  <Textarea placeholder={locale === "ar" ? "خطة العلاج..." : "Treatment plan..."} rows={3} />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setActiveStep(1)}>{t("actions.previous")}</Button>
                  <Button onClick={() => setActiveStep(3)}>{t("actions.next")}</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Treatment / Prescriptions */}
          {activeStep === 3 && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{t("prescriptions.title")}</CardTitle>
                  <Button size="sm"><Plus className="h-4 w-4 me-1" />{t("prescriptions.addMedication")}</Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border p-4 space-y-3">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="space-y-1">
                      <Label className="text-xs">{t("prescriptions.drugName")}</Label>
                      <Input placeholder={locale === "ar" ? "اسم الدواء" : "Drug name"} />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">{t("prescriptions.dosage")}</Label>
                      <Input placeholder="e.g. 500mg" />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">{t("prescriptions.frequency")}</Label>
                      <Input placeholder="e.g. BID" />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">{t("prescriptions.duration")}</Label>
                      <Input placeholder="e.g. 7 days" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">{t("prescriptions.instructions")}</Label>
                    <Input placeholder={locale === "ar" ? "تعليمات خاصة..." : "Special instructions..."} />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground text-center py-4">
                  {locale === "ar" ? "اضغط + لإضافة دواء آخر" : "Click + to add more medications"}
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setActiveStep(2)}>{t("actions.previous")}</Button>
                  <Button onClick={() => setActiveStep(4)}>{t("actions.next")}</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* SOAP Notes */}
          {activeStep === 4 && (
            <Card>
              <CardHeader><CardTitle>{t("consultations.soap")}</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>{t("consultations.subjective")}</Label>
                  <Textarea rows={2} />
                </div>
                <div className="space-y-2">
                  <Label>{t("consultations.objective")}</Label>
                  <Textarea rows={2} />
                </div>
                <div className="space-y-2">
                  <Label>{t("consultations.assessment")}</Label>
                  <Textarea rows={2} />
                </div>
                <div className="space-y-2">
                  <Label>{t("consultations.plan")}</Label>
                  <Textarea rows={2} />
                </div>
                <Separator />
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setActiveStep(3)}>{t("actions.previous")}</Button>
                  <Button className="bg-green-600 hover:bg-green-700">
                    <CheckCircle className="h-4 w-4 me-2" />{t("consultations.signConsultation")}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar - Previous consultations */}
        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="text-sm">{t("consultations.previousConsultations")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { date: "2026-03-28", diagnosis: "Diabetes Follow-up", doctor: locale === "ar" ? "د. سارة أحمد" : "Dr. Sarah Ahmed" },
              { date: "2026-03-15", diagnosis: "Hypertension Check", doctor: locale === "ar" ? "د. سارة أحمد" : "Dr. Sarah Ahmed" },
            ].map((prev, i) => (
              <div key={i} className="p-3 rounded-md border text-sm space-y-1">
                <p className="font-medium">{prev.diagnosis}</p>
                <p className="text-xs text-muted-foreground">{prev.date} - {prev.doctor}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
