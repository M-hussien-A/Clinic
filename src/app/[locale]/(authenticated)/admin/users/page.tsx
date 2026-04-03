"use client";

import { useLocale, useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Plus, Search, MoreHorizontal, Edit, UserX, Key } from "lucide-react";
import { getInitials } from "@/lib/utils";

const mockUsers = [
  { id: "u1", nameEn: "Admin User", nameAr: "المدير", email: "admin@clinic.com", role: "SUPER_ADMIN", deptEn: "-", deptAr: "-", isActive: true, lastLogin: "2026-04-03 09:15" },
  { id: "u2", nameEn: "Dr. Sarah Ahmed", nameAr: "د. سارة أحمد", email: "doctor@clinic.com", role: "DOCTOR", deptEn: "General Practice", deptAr: "الطب العام", isActive: true, lastLogin: "2026-04-03 08:30" },
  { id: "u3", nameEn: "Nurse Fatma", nameAr: "الممرضة فاطمة", email: "nurse@clinic.com", role: "NURSE", deptEn: "General Practice", deptAr: "الطب العام", isActive: true, lastLogin: "2026-04-03 07:45" },
  { id: "u4", nameEn: "Mohamed Reception", nameAr: "محمد الاستقبال", email: "receptionist@clinic.com", role: "RECEPTIONIST", deptEn: "-", deptAr: "-", isActive: true, lastLogin: "2026-04-03 08:00" },
  { id: "u5", nameEn: "Ali Pharmacist", nameAr: "علي الصيدلي", email: "pharmacist@clinic.com", role: "PHARMACIST", deptEn: "-", deptAr: "-", isActive: true, lastLogin: "2026-04-02 16:30" },
  { id: "u6", nameEn: "Hana Accountant", nameAr: "هنا المحاسبة", email: "accountant@clinic.com", role: "ACCOUNTANT", deptEn: "-", deptAr: "-", isActive: true, lastLogin: "2026-04-02 17:00" },
  { id: "u7", nameEn: "Clinic Manager", nameAr: "مدير العيادة", email: "manager@clinic.com", role: "CLINIC_ADMIN", deptEn: "-", deptAr: "-", isActive: true, lastLogin: "2026-04-01 10:00" },
];

const roleColors: Record<string, string> = {
  SUPER_ADMIN: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  CLINIC_ADMIN: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  DOCTOR: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  NURSE: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  RECEPTIONIST: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300",
  PHARMACIST: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
  ACCOUNTANT: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
};

export default function UsersPage() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t("nav.users")}</h1>
        <Button><Plus className="h-4 w-4 me-2" />{locale === "ar" ? "إضافة مستخدم" : "Add User"}</Button>
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
                <TableHead>{t("common.name")}</TableHead>
                <TableHead>{t("common.email")}</TableHead>
                <TableHead>{locale === "ar" ? "الدور" : "Role"}</TableHead>
                <TableHead>{t("doctors.department")}</TableHead>
                <TableHead>{t("common.status")}</TableHead>
                <TableHead>{locale === "ar" ? "آخر تسجيل دخول" : "Last Login"}</TableHead>
                <TableHead>{t("common.actions")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockUsers.map((user) => {
                const name = locale === "ar" ? user.nameAr : user.nameEn;
                return (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                            {getInitials(name)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{user.email}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${roleColors[user.role]}`}>
                        {t(`roles.${user.role}`)}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm">{locale === "ar" ? user.deptAr : user.deptEn}</TableCell>
                    <TableCell>
                      <Badge variant={user.isActive ? "default" : "secondary"} className="text-xs">
                        {user.isActive ? t("patients.active") : t("patients.inactive")}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{user.lastLogin}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align={locale === "ar" ? "start" : "end"}>
                          <DropdownMenuItem><Edit className="me-2 h-4 w-4" />{t("actions.edit")}</DropdownMenuItem>
                          <DropdownMenuItem><Key className="me-2 h-4 w-4" />{locale === "ar" ? "إعادة تعيين كلمة المرور" : "Reset Password"}</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive"><UserX className="me-2 h-4 w-4" />{locale === "ar" ? "تعطيل" : "Deactivate"}</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
