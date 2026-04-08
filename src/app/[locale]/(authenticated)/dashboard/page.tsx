"use client";

import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import Link from "next/link";
import {
  Users,
  CalendarCheck,
  DollarSign,
  FileWarning,
  UserPlus,
  CalendarPlus,
  Footprints,
  Siren,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { useCurrentUser } from "@/hooks/use-current-user";

// Mock data
const weeklyAppointments = [
  { day: "Mon", count: 24 },
  { day: "Tue", count: 18 },
  { day: "Wed", count: 32 },
  { day: "Thu", count: 27 },
  { day: "Fri", count: 20 },
  { day: "Sat", count: 15 },
  { day: "Sun", count: 8 },
];

const monthlyRevenue = [
  { month: "Jan", revenue: 32000 },
  { month: "Feb", revenue: 28000 },
  { month: "Mar", revenue: 35000 },
  { month: "Apr", revenue: 40000 },
  { month: "May", revenue: 38000 },
  { month: "Jun", revenue: 42000 },
  { month: "Jul", revenue: 45000 },
  { month: "Aug", revenue: 41000 },
  { month: "Sep", revenue: 47000 },
  { month: "Oct", revenue: 44000 },
  { month: "Nov", revenue: 50000 },
  { month: "Dec", revenue: 48000 },
];

interface RecentPatient {
  id: string;
  name: string;
  phone: string;
  lastVisit: string;
  status: "active" | "inactive";
}

const recentPatients: RecentPatient[] = [
  { id: "P-1001", name: "Ahmed Al-Farsi", phone: "+966 50 123 4567", lastVisit: "2026-04-02", status: "active" },
  { id: "P-1002", name: "Sara Mohammed", phone: "+966 55 234 5678", lastVisit: "2026-04-02", status: "active" },
  { id: "P-1003", name: "Khalid Ibrahim", phone: "+966 54 345 6789", lastVisit: "2026-04-01", status: "active" },
  { id: "P-1004", name: "Fatima Hassan", phone: "+966 56 456 7890", lastVisit: "2026-04-01", status: "inactive" },
  { id: "P-1005", name: "Omar Ali", phone: "+966 53 567 8901", lastVisit: "2026-03-31", status: "active" },
];

interface TodayAppointment {
  id: string;
  patientName: string;
  doctorName: string;
  time: string;
  type: string;
  status: "scheduled" | "confirmed" | "checkedIn" | "inProgress" | "completed";
}

const todayAppointments: TodayAppointment[] = [
  { id: "A-2001", patientName: "Ahmed Al-Farsi", doctorName: "Dr. Nasser", time: "09:00", type: "newVisit", status: "completed" },
  { id: "A-2002", patientName: "Sara Mohammed", doctorName: "Dr. Layla", time: "09:30", type: "followUp", status: "inProgress" },
  { id: "A-2003", patientName: "Khalid Ibrahim", doctorName: "Dr. Nasser", time: "10:00", type: "consultation", status: "checkedIn" },
  { id: "A-2004", patientName: "Mona Saleh", doctorName: "Dr. Layla", time: "10:30", type: "procedure", status: "confirmed" },
  { id: "A-2005", patientName: "Yusuf Karim", doctorName: "Dr. Nasser", time: "11:00", type: "newVisit", status: "scheduled" },
  { id: "A-2006", patientName: "Huda Zain", doctorName: "Dr. Layla", time: "11:30", type: "followUp", status: "scheduled" },
];

const statusVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  completed: "default",
  inProgress: "secondary",
  checkedIn: "outline",
  confirmed: "outline",
  scheduled: "secondary",
};

export default function DashboardPage() {
  const t = useTranslations();
  const locale = useLocale();
  const { user } = useCurrentUser();

  const userName = locale === "ar" ? user?.nameAr : user?.nameEn;

  const kpiCards = [
    {
      title: t("dashboard.totalPatients"),
      value: "1,248",
      icon: Users,
      change: "+12%",
      color: "text-blue-600",
      bg: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      title: t("dashboard.todayAppointments"),
      value: "32",
      icon: CalendarCheck,
      change: "+5",
      color: "text-green-600",
      bg: "bg-green-100 dark:bg-green-900/30",
    },
    {
      title: t("dashboard.revenueToday"),
      value: "SAR 8,450",
      icon: DollarSign,
      change: "+18%",
      color: "text-emerald-600",
      bg: "bg-emerald-100 dark:bg-emerald-900/30",
    },
    {
      title: t("dashboard.pendingBills"),
      value: "7",
      icon: FileWarning,
      change: "-3",
      color: "text-orange-600",
      bg: "bg-orange-100 dark:bg-orange-900/30",
    },
  ];

  const quickActions = [
    { label: t("dashboard.newPatient"), icon: UserPlus, href: `/${locale}/patients/new` },
    { label: t("dashboard.newAppointment"), icon: CalendarPlus, href: `/${locale}/appointments` },
    { label: t("dashboard.walkIn"), icon: Footprints, href: `/${locale}/appointments` },
    { label: t("dashboard.emergencyVisit"), icon: Siren, href: `/${locale}/appointments` },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {t("dashboard.welcome")}, {userName || t("dashboard.title")}
        </h1>
        <p className="text-muted-foreground">{t("dashboard.title")}</p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpiCards.map((kpi) => (
          <Card key={kpi.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {kpi.title}
              </CardTitle>
              <div className={`rounded-lg p-2 ${kpi.bg}`}>
                <kpi.icon className={`h-5 w-5 ${kpi.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{kpi.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>{t("dashboard.quickActions")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {quickActions.map((action) => (
              <Button
                key={action.label}
                variant="outline"
                className="h-auto flex-col gap-2 py-4"
                asChild
              >
                <Link href={action.href}>
                  <action.icon className="h-6 w-6" />
                  <span className="text-sm">{action.label}</span>
                </Link>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Charts */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Weekly Appointments Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>{t("reports.totalAppointments")}</CardTitle>
            <CardDescription>{t("appointments.week")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyAppointments}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="day" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius)",
                    }}
                  />
                  <Bar
                    dataKey="count"
                    fill="hsl(var(--primary))"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Monthly Revenue Area Chart */}
        <Card>
          <CardHeader>
            <CardTitle>{t("reports.revenue")}</CardTitle>
            <CardDescription>{t("appointments.month")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyRevenue}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius)",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary) / 0.2)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Patients & Today's Appointments */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Recent Patients */}
        <Card>
          <CardHeader>
            <CardTitle>{t("dashboard.recentPatients")}</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("common.id")}</TableHead>
                  <TableHead>{t("common.name")}</TableHead>
                  <TableHead>{t("common.phone")}</TableHead>
                  <TableHead>{t("patients.status")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentPatients.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell className="font-mono text-sm">{patient.id}</TableCell>
                    <TableCell className="font-medium">{patient.name}</TableCell>
                    <TableCell className="text-sm">{patient.phone}</TableCell>
                    <TableCell>
                      <Badge
                        variant={patient.status === "active" ? "default" : "secondary"}
                      >
                        {t(`patients.${patient.status}`)}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Today's Appointments */}
        <Card>
          <CardHeader>
            <CardTitle>{t("dashboard.todayAppointments")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {todayAppointments.map((apt) => (
                <div
                  key={apt.id}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-sm font-bold text-muted-foreground w-12">
                      {apt.time}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{apt.patientName}</p>
                      <p className="text-xs text-muted-foreground">
                        {apt.doctorName} &middot; {t(`appointments.${apt.type}`)}
                      </p>
                    </div>
                  </div>
                  <Badge variant={statusVariant[apt.status] || "secondary"}>
                    {t(`appointments.${apt.status}`)}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
