"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "@/components/shared/status-badge";
import {
  Calendar, Clock, Plus, ChevronLeft, ChevronRight, List, LayoutGrid, UserCheck
} from "lucide-react";
import { cn } from "@/lib/utils";

const typeColors: Record<string, string> = {
  NEW_VISIT: "bg-blue-500",
  FOLLOW_UP: "bg-green-500",
  CONSULTATION: "bg-purple-500",
  PROCEDURE: "bg-orange-500",
  EMERGENCY: "bg-red-500",
};

const mockDoctors = [
  { id: "d1", nameEn: "Dr. Sarah Ahmed", nameAr: "د. سارة أحمد" },
  { id: "d2", nameEn: "Dr. Khaled Mostafa", nameAr: "د. خالد مصطفى" },
  { id: "d3", nameEn: "Dr. Layla Hassan", nameAr: "د. ليلى حسن" },
  { id: "d4", nameEn: "Dr. Omar Farouk", nameAr: "د. عمر فاروق" },
  { id: "d5", nameEn: "Dr. Nour El-Din", nameAr: "د. نور الدين" },
];

function generateMockAppointments() {
  const appointments = [];
  const statuses = ["SCHEDULED", "CONFIRMED", "CHECKED_IN", "COMPLETED", "NO_SHOW", "CANCELLED"];
  const types = ["NEW_VISIT", "FOLLOW_UP", "CONSULTATION", "PROCEDURE", "EMERGENCY"];
  const patients = [
    { nameEn: "Ahmed Hassan", nameAr: "أحمد حسن" },
    { nameEn: "Fatma Ali", nameAr: "فاطمة علي" },
    { nameEn: "Mohamed Ibrahim", nameAr: "محمد إبراهيم" },
    { nameEn: "Sara Mahmoud", nameAr: "سارة محمود" },
    { nameEn: "Youssef Kamal", nameAr: "يوسف كمال" },
    { nameEn: "Nadia Saeed", nameAr: "نادية سعيد" },
    { nameEn: "Hassan Omar", nameAr: "حسن عمر" },
    { nameEn: "Mariam Adel", nameAr: "مريم عادل" },
  ];

  const now = new Date();
  for (let i = 0; i < 25; i++) {
    const day = new Date(now.getFullYear(), now.getMonth(), Math.floor(Math.random() * 28) + 1);
    const hour = 9 + Math.floor(Math.random() * 8);
    appointments.push({
      id: `apt-${i}`,
      date: day.toISOString().split("T")[0],
      day: day.getDate(),
      startTime: `${hour.toString().padStart(2, "0")}:00`,
      endTime: `${hour.toString().padStart(2, "0")}:30`,
      patient: patients[i % patients.length],
      doctor: mockDoctors[i % mockDoctors.length],
      type: types[i % types.length],
      status: i < 5 ? "SCHEDULED" : statuses[i % statuses.length],
    });
  }
  return appointments;
}

const mockAppointments = generateMockAppointments();

export default function AppointmentsPage() {
  const t = useTranslations();
  const locale = useLocale();
  const [view, setView] = useState<"calendar" | "list">("calendar");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay();

  const monthNames = locale === "ar"
    ? ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"]
    : ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const dayNames = locale === "ar"
    ? ["أحد", "اثنين", "ثلاثاء", "أربعاء", "خميس", "جمعة", "سبت"]
    : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const goToday = () => { setCurrentDate(new Date()); setSelectedDay(new Date().getDate()); };

  const getAppointmentsForDay = (day: number) =>
    mockAppointments.filter((a) => a.day === day);

  const selectedDayAppointments = selectedDay ? getAppointmentsForDay(selectedDay) : [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-2xl font-bold">{t("appointments.title")}</h1>
        <div className="flex items-center gap-2">
          <div className="flex items-center border rounded-md">
            <Button variant={view === "calendar" ? "default" : "ghost"} size="sm" onClick={() => setView("calendar")}>
              <LayoutGrid className="h-4 w-4 me-1" />{t("appointments.calendar")}
            </Button>
            <Button variant={view === "list" ? "default" : "ghost"} size="sm" onClick={() => setView("list")}>
              <List className="h-4 w-4 me-1" />{locale === "ar" ? "قائمة" : "List"}
            </Button>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button><Plus className="h-4 w-4 me-2" />{t("appointments.newAppointment")}</Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>{t("appointments.newAppointment")}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>{t("appointments.patient")}</Label>
                  <Input placeholder={t("appointments.selectPatient")} />
                </div>
                <div className="space-y-2">
                  <Label>{t("appointments.doctor")}</Label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder={t("appointments.selectDoctor")} /></SelectTrigger>
                    <SelectContent>
                      {mockDoctors.map((d) => (
                        <SelectItem key={d.id} value={d.id}>{locale === "ar" ? d.nameAr : d.nameEn}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>{t("appointments.date")}</Label>
                    <Input type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label>{t("appointments.startTime")}</Label>
                    <Input type="time" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>{t("appointments.type")}</Label>
                  <Select>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="NEW_VISIT">{t("appointments.newVisit")}</SelectItem>
                      <SelectItem value="FOLLOW_UP">{t("appointments.followUp")}</SelectItem>
                      <SelectItem value="CONSULTATION">{t("appointments.consultation")}</SelectItem>
                      <SelectItem value="PROCEDURE">{t("appointments.procedure")}</SelectItem>
                      <SelectItem value="EMERGENCY">{t("appointments.emergency")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>{t("appointments.notes")}</Label>
                  <Textarea />
                </div>
                <Button className="w-full" onClick={() => setDialogOpen(false)}>{t("actions.save")}</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {view === "calendar" ? (
        <div className="grid lg:grid-cols-[1fr_350px] gap-6">
          {/* Calendar Grid */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <Button variant="ghost" size="icon" onClick={prevMonth}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <CardTitle>{monthNames[month]} {year}</CardTitle>
                <div className="flex gap-1">
                  <Button variant="outline" size="sm" onClick={goToday}>{t("appointments.today")}</Button>
                  <Button variant="ghost" size="icon" onClick={nextMonth}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-px bg-border rounded-lg overflow-hidden">
                {dayNames.map((day) => (
                  <div key={day} className="bg-muted p-2 text-center text-xs font-medium text-muted-foreground">
                    {day}
                  </div>
                ))}
                {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                  <div key={`empty-${i}`} className="bg-background p-2 min-h-[80px]" />
                ))}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const dayAppts = getAppointmentsForDay(day);
                  const isToday = day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear();
                  const isSelected = day === selectedDay;

                  return (
                    <button
                      key={day}
                      onClick={() => setSelectedDay(day)}
                      className={cn(
                        "bg-background p-2 min-h-[80px] text-start hover:bg-accent/50 transition-colors",
                        isSelected && "ring-2 ring-primary",
                        isToday && "bg-primary/5"
                      )}
                    >
                      <span className={cn("text-sm font-medium", isToday && "bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center")}>
                        {day}
                      </span>
                      <div className="mt-1 flex flex-wrap gap-0.5">
                        {dayAppts.slice(0, 3).map((a) => (
                          <div key={a.id} className={cn("h-1.5 w-1.5 rounded-full", typeColors[a.type])} />
                        ))}
                        {dayAppts.length > 3 && <span className="text-[10px] text-muted-foreground">+{dayAppts.length - 3}</span>}
                      </div>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Day Detail Panel */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {selectedDay ? `${monthNames[month]} ${selectedDay}` : t("appointments.today")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {selectedDayAppointments.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">{t("appointments.noAppointments")}</p>
              ) : (
                selectedDayAppointments.map((apt) => (
                  <div key={apt.id} className="flex items-start gap-3 p-3 rounded-lg border hover:bg-accent/30 transition-colors">
                    <div className={cn("h-2 w-2 rounded-full mt-2 shrink-0", typeColors[apt.type])} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {locale === "ar" ? apt.patient.nameAr : apt.patient.nameEn}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {locale === "ar" ? apt.doctor.nameAr : apt.doctor.nameEn}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs flex items-center gap-1">
                          <Clock className="h-3 w-3" />{apt.startTime}
                        </span>
                        <StatusBadge status={apt.status} />
                      </div>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      ) : (
        /* List View */
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("appointments.time")}</TableHead>
                  <TableHead>{t("appointments.patient")}</TableHead>
                  <TableHead>{t("appointments.doctor")}</TableHead>
                  <TableHead>{t("appointments.type")}</TableHead>
                  <TableHead>{t("appointments.status")}</TableHead>
                  <TableHead>{t("common.actions")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockAppointments.slice(0, 15).map((apt) => (
                  <TableRow key={apt.id}>
                    <TableCell className="font-mono">{apt.startTime} - {apt.endTime}</TableCell>
                    <TableCell>{locale === "ar" ? apt.patient.nameAr : apt.patient.nameEn}</TableCell>
                    <TableCell>{locale === "ar" ? apt.doctor.nameAr : apt.doctor.nameEn}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="flex items-center gap-1 w-fit">
                        <div className={cn("h-2 w-2 rounded-full", typeColors[apt.type])} />
                        {t(`appointments.${apt.type === "NEW_VISIT" ? "newVisit" : apt.type === "FOLLOW_UP" ? "followUp" : apt.type.toLowerCase()}`)}
                      </Badge>
                    </TableCell>
                    <TableCell><StatusBadge status={apt.status} /></TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm"><UserCheck className="h-4 w-4 me-1" />{t("appointments.checkIn")}</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
