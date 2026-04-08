"use client";

import { useLocale, useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import {
  Phone, Mail, MapPin, Calendar, AlertTriangle, FileText,
  Edit, ArrowLeft, Heart, Shield, Clock
} from "lucide-react";
import Link from "next/link";
import { getInitials } from "@/lib/utils";
import { StatusBadge } from "@/components/shared/status-badge";

const mockPatient = {
  id: "cl-1",
  patientId: "CL-20260401-0001",
  nameEn: "Ahmed Mohamed Hassan",
  nameAr: "أحمد محمد حسن",
  gender: "MALE",
  dateOfBirth: "1985-03-15",
  bloodType: "A_POS",
  phonePrimary: "+20 100 123 4567",
  phoneSecondary: "+20 112 987 6543",
  email: "ahmed.hassan@email.com",
  addressEn: "15 Nile Street, Zamalek, Cairo",
  addressAr: "١٥ شارع النيل، الزمالك، القاهرة",
  nationality: "Egyptian",
  maritalStatus: "Married",
  occupation: "Engineer",
  status: "ACTIVE",
  emergencyName: "Fatma Hassan",
  emergencyRelation: "Wife",
  emergencyPhone: "+20 100 765 4321",
  insuranceProvider: "AXA Egypt",
  policyNumber: "AXA-2024-78901",
  coverageType: "Comprehensive",
  insuranceExpiry: "2027-01-31",
  allergies: "Penicillin, Sulfa drugs",
  chronicConditions: "Type 2 Diabetes, Hypertension",
};

const mockVisits = [
  { id: "1", date: "2026-03-28", doctor: "Dr. Sarah Ahmed", doctorAr: "د. سارة أحمد", diagnosis: "Follow-up - Diabetes", status: "COMPLETED" },
  { id: "2", date: "2026-03-15", doctor: "Dr. Sarah Ahmed", doctorAr: "د. سارة أحمد", diagnosis: "Hypertension Management", status: "COMPLETED" },
  { id: "3", date: "2026-02-20", doctor: "Dr. Khaled Mostafa", doctorAr: "د. خالد مصطفى", diagnosis: "Skin Rash - Eczema", status: "COMPLETED" },
  { id: "4", date: "2026-01-10", doctor: "Dr. Sarah Ahmed", doctorAr: "د. سارة أحمد", diagnosis: "Annual Check-up", status: "COMPLETED" },
];

const mockPrescriptions = [
  { id: "1", date: "2026-03-28", doctor: "Dr. Sarah Ahmed", items: "Metformin 500mg, Losartan 50mg", status: "FULLY_DISPENSED" },
  { id: "2", date: "2026-03-15", doctor: "Dr. Sarah Ahmed", items: "Amlodipine 5mg", status: "FULLY_DISPENSED" },
  { id: "3", date: "2026-02-20", doctor: "Dr. Khaled Mostafa", items: "Betamethasone Cream", status: "ISSUED" },
];

const mockInvoices = [
  { id: "1", number: "INV-2026-00045", date: "2026-03-28", amount: 350, status: "PAID" },
  { id: "2", number: "INV-2026-00032", date: "2026-03-15", amount: 500, status: "PAID" },
  { id: "3", number: "INV-2026-00018", date: "2026-02-20", amount: 275, status: "OVERDUE" },
];

export default function PatientProfilePage() {
  const t = useTranslations();
  const locale = useLocale();
  const p = mockPatient;
  const name = locale === "ar" ? p.nameAr : p.nameEn;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href={`/${locale}/patients`}>
          <Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button>
        </Link>
        <h1 className="text-2xl font-bold">{t("patients.patientProfile")}</h1>
      </div>

      {/* Patient Info Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                {getInitials(name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-3 flex-wrap">
                <h2 className="text-xl font-bold">{name}</h2>
                <StatusBadge status={p.status} />
                <Badge variant="outline">{p.patientId}</Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-2"><Phone className="h-4 w-4" />{p.phonePrimary}</div>
                <div className="flex items-center gap-2"><Mail className="h-4 w-4" />{p.email}</div>
                <div className="flex items-center gap-2"><MapPin className="h-4 w-4" />{locale === "ar" ? p.addressAr : p.addressEn}</div>
                <div className="flex items-center gap-2"><Calendar className="h-4 w-4" />{p.dateOfBirth}</div>
                <div className="flex items-center gap-2"><Heart className="h-4 w-4" />{p.bloodType.replace("_", "+").replace("NEG", "-")}</div>
              </div>
            </div>
            <Button variant="outline"><Edit className="me-2 h-4 w-4" />{t("actions.edit")}</Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="overview">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7">
          <TabsTrigger value="overview">{t("patients.overview")}</TabsTrigger>
          <TabsTrigger value="visits">{t("patients.visitHistory")}</TabsTrigger>
          <TabsTrigger value="prescriptions">{t("prescriptions.title")}</TabsTrigger>
          <TabsTrigger value="billing">{t("billing.title")}</TabsTrigger>
          <TabsTrigger value="lab" className="hidden lg:inline-flex">{t("lab.title")}</TabsTrigger>
          <TabsTrigger value="documents" className="hidden lg:inline-flex">{t("patients.documents")}</TabsTrigger>
          <TabsTrigger value="timeline" className="hidden lg:inline-flex">{t("patients.timeline")}</TabsTrigger>
        </TabsList>

        {/* Overview */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader><CardTitle className="text-sm font-medium">{t("patients.emergencyContact")}</CardTitle></CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p><span className="text-muted-foreground">{t("patients.emergencyName")}:</span> {p.emergencyName}</p>
                <p><span className="text-muted-foreground">{t("patients.emergencyRelation")}:</span> {p.emergencyRelation}</p>
                <p><span className="text-muted-foreground">{t("patients.emergencyPhone")}:</span> {p.emergencyPhone}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-sm font-medium flex items-center gap-2"><Shield className="h-4 w-4" />{t("patients.insurance")}</CardTitle></CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p><span className="text-muted-foreground">{t("patients.insuranceProvider")}:</span> {p.insuranceProvider}</p>
                <p><span className="text-muted-foreground">{t("patients.policyNumber")}:</span> {p.policyNumber}</p>
                <p><span className="text-muted-foreground">{t("patients.coverageType")}:</span> {p.coverageType}</p>
                <p><span className="text-muted-foreground">{t("patients.insuranceExpiry")}:</span> {p.insuranceExpiry}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-sm font-medium flex items-center gap-2"><AlertTriangle className="h-4 w-4 text-amber-500" />{t("patients.allergies")} &amp; {t("patients.chronicConditions")}</CardTitle></CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <p className="text-muted-foreground mb-1">{t("patients.allergies")}:</p>
                  <div className="flex gap-1 flex-wrap">
                    {p.allergies.split(", ").map((a) => <Badge key={a} variant="destructive" className="text-xs">{a}</Badge>)}
                  </div>
                </div>
                <Separator />
                <div>
                  <p className="text-muted-foreground mb-1">{t("patients.chronicConditions")}:</p>
                  <div className="flex gap-1 flex-wrap">
                    {p.chronicConditions.split(", ").map((c) => <Badge key={c} variant="secondary" className="text-xs">{c}</Badge>)}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Visit History */}
        <TabsContent value="visits">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("common.date")}</TableHead>
                    <TableHead>{t("appointments.doctor")}</TableHead>
                    <TableHead>{t("consultations.diagnosis")}</TableHead>
                    <TableHead>{t("common.status")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockVisits.map((v) => (
                    <TableRow key={v.id}>
                      <TableCell>{v.date}</TableCell>
                      <TableCell>{locale === "ar" ? v.doctorAr : v.doctor}</TableCell>
                      <TableCell>{v.diagnosis}</TableCell>
                      <TableCell><StatusBadge status={v.status} /></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Prescriptions */}
        <TabsContent value="prescriptions">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("common.date")}</TableHead>
                    <TableHead>{t("appointments.doctor")}</TableHead>
                    <TableHead>{t("prescriptions.title")}</TableHead>
                    <TableHead>{t("common.status")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockPrescriptions.map((rx) => (
                    <TableRow key={rx.id}>
                      <TableCell>{rx.date}</TableCell>
                      <TableCell>{rx.doctor}</TableCell>
                      <TableCell>{rx.items}</TableCell>
                      <TableCell><StatusBadge status={rx.status} /></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Billing */}
        <TabsContent value="billing">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("billing.invoiceNumber")}</TableHead>
                    <TableHead>{t("common.date")}</TableHead>
                    <TableHead>{t("billing.total")}</TableHead>
                    <TableHead>{t("common.status")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockInvoices.map((inv) => (
                    <TableRow key={inv.id}>
                      <TableCell className="font-mono">{inv.number}</TableCell>
                      <TableCell>{inv.date}</TableCell>
                      <TableCell>{inv.amount} EGP</TableCell>
                      <TableCell><StatusBadge status={inv.status} /></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Lab */}
        <TabsContent value="lab">
          <Card><CardContent className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <FileText className="h-12 w-12 mb-4" />
            <p>{t("common.noData")}</p>
          </CardContent></Card>
        </TabsContent>

        {/* Documents */}
        <TabsContent value="documents">
          <Card><CardContent className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <FileText className="h-12 w-12 mb-4" />
            <p>{t("common.noData")}</p>
          </CardContent></Card>
        </TabsContent>

        {/* Timeline */}
        <TabsContent value="timeline">
          <Card><CardContent className="p-6">
            <div className="space-y-4">
              {mockVisits.map((v) => (
                <div key={v.id} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="h-3 w-3 rounded-full bg-primary" />
                    <div className="w-px h-full bg-border" />
                  </div>
                  <div className="pb-6">
                    <p className="text-sm font-medium">{v.diagnosis}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />{v.date} - {locale === "ar" ? v.doctorAr : v.doctor}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent></Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
