"use client";

import { useLocale, useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Calendar, Users, Clock, Star } from "lucide-react";
import { getInitials } from "@/lib/utils";

const mockDoctors = [
  { id: "d1", nameEn: "Dr. Sarah Ahmed", nameAr: "د. سارة أحمد", specEn: "General Practice", specAr: "طب عام", deptEn: "General Practice", deptAr: "الطب العام", patientsToday: 8, rating: 4.8, isActive: true },
  { id: "d2", nameEn: "Dr. Khaled Mostafa", nameAr: "د. خالد مصطفى", specEn: "Dermatology", specAr: "أمراض جلدية", deptEn: "Dermatology", deptAr: "الجلدية", patientsToday: 6, rating: 4.6, isActive: true },
  { id: "d3", nameEn: "Dr. Layla Hassan", nameAr: "د. ليلى حسن", specEn: "Pediatrics", specAr: "طب أطفال", deptEn: "Pediatrics", deptAr: "الأطفال", patientsToday: 10, rating: 4.9, isActive: true },
  { id: "d4", nameEn: "Dr. Omar Farouk", nameAr: "د. عمر فاروق", specEn: "Internal Medicine", specAr: "باطنة", deptEn: "General Practice", deptAr: "الطب العام", patientsToday: 5, rating: 4.5, isActive: true },
  { id: "d5", nameEn: "Dr. Nour El-Din", nameAr: "د. نور الدين", specEn: "Ophthalmology", specAr: "عيون", deptEn: "General Practice", deptAr: "الطب العام", patientsToday: 0, rating: 4.7, isActive: false },
];

const scheduleData = [
  { day: "Sunday", dayAr: "الأحد", hours: "09:00 - 17:00" },
  { day: "Monday", dayAr: "الاثنين", hours: "09:00 - 17:00" },
  { day: "Tuesday", dayAr: "الثلاثاء", hours: "09:00 - 17:00" },
  { day: "Wednesday", dayAr: "الأربعاء", hours: "09:00 - 17:00" },
  { day: "Thursday", dayAr: "الخميس", hours: "09:00 - 17:00" },
  { day: "Friday", dayAr: "الجمعة", hours: "-" },
  { day: "Saturday", dayAr: "السبت", hours: "-" },
];

export default function DoctorsPage() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t("doctors.title")}</h1>
        <Button><Plus className="h-4 w-4 me-2" />{t("actions.add")}</Button>
      </div>

      <Tabs defaultValue="cards">
        <TabsList>
          <TabsTrigger value="cards">{locale === "ar" ? "بطاقات" : "Cards"}</TabsTrigger>
          <TabsTrigger value="schedule">{t("doctors.schedule")}</TabsTrigger>
        </TabsList>

        <TabsContent value="cards">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {mockDoctors.map((doc) => {
              const name = locale === "ar" ? doc.nameAr : doc.nameEn;
              return (
                <Card key={doc.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-14 w-14">
                        <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                          {getInitials(name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold truncate">{name}</h3>
                          <div className={`h-2 w-2 rounded-full ${doc.isActive ? "bg-green-500" : "bg-gray-400"}`} />
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {locale === "ar" ? doc.specAr : doc.specEn}
                        </p>
                        <Badge variant="outline" className="mt-1 text-xs">
                          {locale === "ar" ? doc.deptAr : doc.deptEn}
                        </Badge>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t">
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1 text-sm font-medium">
                          <Users className="h-3 w-3" />{doc.patientsToday}
                        </div>
                        <p className="text-xs text-muted-foreground">{t("doctors.patientsToday")}</p>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1 text-sm font-medium">
                          <Star className="h-3 w-3 text-amber-500" />{doc.rating}
                        </div>
                        <p className="text-xs text-muted-foreground">{locale === "ar" ? "التقييم" : "Rating"}</p>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1 text-sm font-medium">
                          <Clock className="h-3 w-3" />15m
                        </div>
                        <p className="text-xs text-muted-foreground">{t("doctors.avgConsultTime")}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Calendar className="h-3 w-3 me-1" />{t("doctors.schedule")}
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        {t("actions.edit")}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="schedule">
          <Card>
            <CardHeader>
              <CardTitle>{t("doctors.schedule")}</CardTitle>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{locale === "ar" ? "اليوم" : "Day"}</TableHead>
                    {mockDoctors.map((d) => (
                      <TableHead key={d.id}>{locale === "ar" ? d.nameAr : d.nameEn}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {scheduleData.map((s) => (
                    <TableRow key={s.day}>
                      <TableCell className="font-medium">{locale === "ar" ? s.dayAr : s.day}</TableCell>
                      {mockDoctors.map((d) => (
                        <TableCell key={d.id}>
                          {s.hours === "-" ? (
                            <span className="text-muted-foreground">-</span>
                          ) : d.isActive ? (
                            <Badge variant="outline" className="text-xs">{s.hours}</Badge>
                          ) : (
                            <span className="text-muted-foreground text-xs">{locale === "ar" ? "إجازة" : "Off"}</span>
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
