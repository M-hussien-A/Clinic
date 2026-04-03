"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { type ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/shared/data-table";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  UserPlus,
  Users,
  UserCheck,
  UserX,
  MoreHorizontal,
  Eye,
  Pencil,
} from "lucide-react";

interface Patient {
  id: string;
  patientId: string;
  nameEn: string;
  nameAr: string;
  phone: string;
  gender: "MALE" | "FEMALE";
  status: "ACTIVE" | "INACTIVE";
  dateOfBirth: string;
  nationalId: string;
}

const mockPatients: Patient[] = [
  { id: "1", patientId: "PT-001", nameEn: "Ahmed Al-Rashidi", nameAr: "أحمد الرشيدي", phone: "+966 50 123 4567", gender: "MALE", status: "ACTIVE", dateOfBirth: "1985-03-15", nationalId: "1012345678" },
  { id: "2", patientId: "PT-002", nameEn: "Fatima Al-Zahrani", nameAr: "فاطمة الزهراني", phone: "+966 55 234 5678", gender: "FEMALE", status: "ACTIVE", dateOfBirth: "1990-07-22", nationalId: "1023456789" },
  { id: "3", patientId: "PT-003", nameEn: "Mohammed Al-Ghamdi", nameAr: "محمد الغامدي", phone: "+966 54 345 6789", gender: "MALE", status: "ACTIVE", dateOfBirth: "1978-11-08", nationalId: "1034567890" },
  { id: "4", patientId: "PT-004", nameEn: "Noura Al-Otaibi", nameAr: "نورة العتيبي", phone: "+966 56 456 7890", gender: "FEMALE", status: "INACTIVE", dateOfBirth: "1995-01-30", nationalId: "1045678901" },
  { id: "5", patientId: "PT-005", nameEn: "Khalid Al-Harbi", nameAr: "خالد الحربي", phone: "+966 50 567 8901", gender: "MALE", status: "ACTIVE", dateOfBirth: "1982-06-12", nationalId: "1056789012" },
  { id: "6", patientId: "PT-006", nameEn: "Sara Al-Dosari", nameAr: "سارة الدوسري", phone: "+966 55 678 9012", gender: "FEMALE", status: "ACTIVE", dateOfBirth: "1988-09-25", nationalId: "1067890123" },
  { id: "7", patientId: "PT-007", nameEn: "Omar Al-Shehri", nameAr: "عمر الشهري", phone: "+966 54 789 0123", gender: "MALE", status: "ACTIVE", dateOfBirth: "1975-12-03", nationalId: "1078901234" },
  { id: "8", patientId: "PT-008", nameEn: "Huda Al-Mutairi", nameAr: "هدى المطيري", phone: "+966 56 890 1234", gender: "FEMALE", status: "INACTIVE", dateOfBirth: "1992-04-18", nationalId: "1089012345" },
  { id: "9", patientId: "PT-009", nameEn: "Youssef Al-Qahtani", nameAr: "يوسف القحطاني", phone: "+966 50 901 2345", gender: "MALE", status: "ACTIVE", dateOfBirth: "1980-08-07", nationalId: "1090123456" },
  { id: "10", patientId: "PT-010", nameEn: "Layla Al-Ahmadi", nameAr: "ليلى الأحمدي", phone: "+966 55 012 3456", gender: "FEMALE", status: "ACTIVE", dateOfBirth: "1993-02-14", nationalId: "1001234567" },
  { id: "11", patientId: "PT-011", nameEn: "Abdullah Al-Subaie", nameAr: "عبدالله السبيعي", phone: "+966 54 123 4568", gender: "MALE", status: "ACTIVE", dateOfBirth: "1987-05-20", nationalId: "1112345678" },
  { id: "12", patientId: "PT-012", nameEn: "Maha Al-Enezi", nameAr: "مها العنزي", phone: "+966 56 234 5679", gender: "FEMALE", status: "INACTIVE", dateOfBirth: "1991-10-11", nationalId: "1123456789" },
  { id: "13", patientId: "PT-013", nameEn: "Faisal Al-Tamimi", nameAr: "فيصل التميمي", phone: "+966 50 345 6780", gender: "MALE", status: "ACTIVE", dateOfBirth: "1976-07-29", nationalId: "1134567890" },
  { id: "14", patientId: "PT-014", nameEn: "Reem Al-Malki", nameAr: "ريم المالكي", phone: "+966 55 456 7891", gender: "FEMALE", status: "ACTIVE", dateOfBirth: "1989-12-05", nationalId: "1145678901" },
  { id: "15", patientId: "PT-015", nameEn: "Hassan Al-Juhani", nameAr: "حسن الجهني", phone: "+966 54 567 8902", gender: "MALE", status: "INACTIVE", dateOfBirth: "1983-03-17", nationalId: "1156789012" },
];

export default function PatientsPage() {
  const t = useTranslations();
  const locale = useLocale();

  const activeCount = mockPatients.filter((p) => p.status === "ACTIVE").length;
  const inactiveCount = mockPatients.filter((p) => p.status === "INACTIVE").length;

  const columns: ColumnDef<Patient>[] = [
    {
      accessorKey: "patientId",
      header: t("patients.patientId"),
      cell: ({ row }) => (
        <span className="font-mono text-sm">{row.getValue("patientId")}</span>
      ),
    },
    {
      accessorKey: locale === "ar" ? "nameAr" : "nameEn",
      id: "name",
      header: t("patients.name"),
      cell: ({ row }) => (
        <div className="font-medium">
          {locale === "ar" ? row.original.nameAr : row.original.nameEn}
        </div>
      ),
      filterFn: (row, _columnId, filterValue) => {
        const name = locale === "ar" ? row.original.nameAr : row.original.nameEn;
        return name.toLowerCase().includes((filterValue as string).toLowerCase());
      },
    },
    {
      accessorKey: "phone",
      header: t("patients.phone"),
    },
    {
      accessorKey: "gender",
      header: t("patients.gender"),
      cell: ({ row }) => (
        <span>{t(`patients.genderOptions.${(row.getValue("gender") as string).toLowerCase()}`)}</span>
      ),
    },
    {
      accessorKey: "status",
      header: t("patients.status"),
      cell: ({ row }) => (
        <StatusBadge
          status={row.getValue("status")}
          translationPrefix="patients.statusOptions"
        />
      ),
    },
    {
      id: "actions",
      header: t("common.actions"),
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">{t("common.actions")}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href={`/${locale}/patients/${row.original.id}`}>
                <Eye className="me-2 h-4 w-4" />
                {t("actions.view")}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/${locale}/patients/${row.original.id}/edit`}>
                <Pencil className="me-2 h-4 w-4" />
                {t("actions.edit")}
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            {t("patients.title")}
          </h1>
          <p className="text-muted-foreground">
            {t("patients.description")}
          </p>
        </div>
        <Button asChild>
          <Link href={`/${locale}/patients/new`}>
            <UserPlus className="me-2 h-4 w-4" />
            {t("patients.newPatient")}
          </Link>
        </Button>
      </div>

      {/* Stats Bar */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="rounded-lg bg-primary/10 p-3">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{t("patients.totalPatients")}</p>
              <p className="text-2xl font-bold">{mockPatients.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="rounded-lg bg-green-500/10 p-3">
              <UserCheck className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{t("patients.activePatients")}</p>
              <p className="text-2xl font-bold">{activeCount}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="rounded-lg bg-red-500/10 p-3">
              <UserX className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{t("patients.inactivePatients")}</p>
              <p className="text-2xl font-bold">{inactiveCount}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Data Table */}
      <Card>
        <CardContent className="p-6">
          <DataTable
            columns={columns}
            data={mockPatients}
            searchKey="name"
            searchPlaceholder={t("patients.searchPlaceholder")}
          />
        </CardContent>
      </Card>
    </div>
  );
}
