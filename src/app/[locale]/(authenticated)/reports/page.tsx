"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  FileText,
  Download,
  Users,
  TrendingUp,
  DollarSign,
  Calendar,
  Clock,
  Package,
  Stethoscope,
  UserCheck,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";

// --- Mock Data ---

const patientRegistrations = [
  { month: "Jan", count: 45 },
  { month: "Feb", count: 52 },
  { month: "Mar", count: 61 },
  { month: "Apr", count: 48 },
  { month: "May", count: 55 },
  { month: "Jun", count: 67 },
  { month: "Jul", count: 72 },
  { month: "Aug", count: 58 },
  { month: "Sep", count: 63 },
  { month: "Oct", count: 70 },
  { month: "Nov", count: 75 },
  { month: "Dec", count: 68 },
];

const genderDistribution = [
  { name: "Male", value: 580 },
  { name: "Female", value: 668 },
];

const bookingRateData = [
  { month: "Jan", booked: 320, available: 400 },
  { month: "Feb", booked: 290, available: 380 },
  { month: "Mar", booked: 350, available: 400 },
  { month: "Apr", booked: 380, available: 420 },
  { month: "May", booked: 340, available: 400 },
  { month: "Jun", booked: 390, available: 420 },
  { month: "Jul", booked: 410, available: 440 },
  { month: "Aug", booked: 370, available: 420 },
  { month: "Sep", booked: 400, available: 440 },
  { month: "Oct", booked: 380, available: 420 },
  { month: "Nov", booked: 420, available: 440 },
  { month: "Dec", booked: 360, available: 400 },
];

const peakHoursData = [
  { hour: "08:00", appointments: 8 },
  { hour: "09:00", appointments: 18 },
  { hour: "10:00", appointments: 24 },
  { hour: "11:00", appointments: 20 },
  { hour: "12:00", appointments: 12 },
  { hour: "13:00", appointments: 6 },
  { hour: "14:00", appointments: 15 },
  { hour: "15:00", appointments: 22 },
  { hour: "16:00", appointments: 19 },
  { hour: "17:00", appointments: 10 },
];

const revenueTrendData = [
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

const revenueByDepartment = [
  { name: "generalMedicine", value: 145000 },
  { name: "dermatology", value: 98000 },
  { name: "pediatrics", value: 87000 },
  { name: "orthopedics", value: 112000 },
  { name: "cardiology", value: 68000 },
];

const DEPARTMENT_COLORS = [
  "hsl(var(--primary))",
  "hsl(var(--primary) / 0.8)",
  "hsl(var(--primary) / 0.6)",
  "hsl(var(--primary) / 0.4)",
  "hsl(var(--primary) / 0.25)",
];

const doctorPerformance = [
  { name: "Dr. Nasser", patients: 186, rating: 4.8 },
  { name: "Dr. Layla", patients: 172, rating: 4.9 },
  { name: "Dr. Ahmed", patients: 158, rating: 4.7 },
  { name: "Dr. Fatima", patients: 145, rating: 4.6 },
  { name: "Dr. Omar", patients: 132, rating: 4.5 },
];

const stockMovementData = [
  { month: "Jan", inbound: 450, outbound: 380 },
  { month: "Feb", inbound: 520, outbound: 410 },
  { month: "Mar", inbound: 380, outbound: 420 },
  { month: "Apr", inbound: 490, outbound: 460 },
  { month: "May", inbound: 530, outbound: 440 },
  { month: "Jun", inbound: 470, outbound: 480 },
];

const tooltipStyle = {
  backgroundColor: "hsl(var(--card))",
  border: "1px solid hsl(var(--border))",
  borderRadius: "var(--radius)",
};

export default function ReportsPage() {
  const t = useTranslations();
  const [dateRange, setDateRange] = useState("thisMonth");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {t("reports.title")}
          </h1>
          <p className="text-muted-foreground">{t("common.description")}</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="thisWeek">
                {t("reports.thisWeek")}
              </SelectItem>
              <SelectItem value="thisMonth">
                {t("reports.thisMonth")}
              </SelectItem>
              <SelectItem value="thisQuarter">
                {t("reports.thisQuarter")}
              </SelectItem>
              <SelectItem value="thisYear">
                {t("reports.thisYear")}
              </SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" disabled>
            <FileText className="mr-2 h-4 w-4" />
            {t("reports.exportPDF")}
          </Button>
          <Button variant="outline" disabled>
            <Download className="mr-2 h-4 w-4" />
            {t("reports.exportExcel")}
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="patients" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="patients">
            {t("reports.patientReports")}
          </TabsTrigger>
          <TabsTrigger value="appointments">
            {t("reports.appointmentReports")}
          </TabsTrigger>
          <TabsTrigger value="financial">
            {t("reports.financialReports")}
          </TabsTrigger>
          <TabsTrigger value="doctors">
            {t("reports.doctorReports")}
          </TabsTrigger>
          <TabsTrigger value="inventory">
            {t("reports.inventoryReports")}
          </TabsTrigger>
        </TabsList>

        {/* Patient Reports */}
        <TabsContent value="patients" className="space-y-4">
          {/* Summary Cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {t("dashboard.totalPatients")}
                </CardTitle>
                <Users className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,248</div>
                <p className="text-xs text-muted-foreground mt-1">+12% vs last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {t("reports.newRegistrations")}
                </CardTitle>
                <UserCheck className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">68</div>
                <p className="text-xs text-muted-foreground mt-1">+8% vs last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {t("patients.active")}
                </CardTitle>
                <TrendingUp className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,102</div>
                <p className="text-xs text-muted-foreground mt-1">88.3%</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {t("patients.inactive")}
                </CardTitle>
                <Users className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">146</div>
                <p className="text-xs text-muted-foreground mt-1">11.7%</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid gap-4 lg:grid-cols-2">
            {/* New Registrations Bar Chart */}
            <Card>
              <CardHeader>
                <CardTitle>{t("reports.newRegistrations")}</CardTitle>
                <CardDescription>{t("reports.thisYear")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={patientRegistrations}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="month" className="text-xs" />
                      <YAxis className="text-xs" />
                      <Tooltip contentStyle={tooltipStyle} />
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

            {/* Gender Distribution Pie Chart */}
            <Card>
              <CardHeader>
                <CardTitle>{t("reports.demographics")}</CardTitle>
                <CardDescription>{t("patients.gender")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={genderDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }: { name?: string; percent?: number }) =>
                          `${name || ""} ${((percent || 0) * 100).toFixed(0)}%`
                        }
                      >
                        <Cell fill="hsl(var(--primary))" />
                        <Cell fill="hsl(var(--primary) / 0.5)" />
                      </Pie>
                      <Tooltip contentStyle={tooltipStyle} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Appointment Reports */}
        <TabsContent value="appointments" className="space-y-4">
          {/* Summary Cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {t("reports.totalAppointments")}
                </CardTitle>
                <Calendar className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4,520</div>
                <p className="text-xs text-muted-foreground mt-1">+15% vs last period</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {t("reports.bookingRate")}
                </CardTitle>
                <TrendingUp className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">87.5%</div>
                <p className="text-xs text-muted-foreground mt-1">+3.2% vs last period</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {t("reports.noShowRate")}
                </CardTitle>
                <Users className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">6.2%</div>
                <p className="text-xs text-muted-foreground mt-1">-1.1% vs last period</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {t("reports.averageWaitTime")}
                </CardTitle>
                <Clock className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">14 min</div>
                <p className="text-xs text-muted-foreground mt-1">-2 min vs last period</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid gap-4 lg:grid-cols-2">
            {/* Booking Rate Bar Chart */}
            <Card>
              <CardHeader>
                <CardTitle>{t("reports.bookingRate")}</CardTitle>
                <CardDescription>{t("reports.thisYear")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={bookingRateData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="month" className="text-xs" />
                      <YAxis className="text-xs" />
                      <Tooltip contentStyle={tooltipStyle} />
                      <Bar
                        dataKey="booked"
                        fill="hsl(var(--primary))"
                        radius={[4, 4, 0, 0]}
                      />
                      <Bar
                        dataKey="available"
                        fill="hsl(var(--primary) / 0.3)"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Peak Hours Visualization */}
            <Card>
              <CardHeader>
                <CardTitle>{t("reports.peakHours")}</CardTitle>
                <CardDescription>{t("reports.thisWeek")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={peakHoursData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="hour" className="text-xs" />
                      <YAxis className="text-xs" />
                      <Tooltip contentStyle={tooltipStyle} />
                      <Area
                        type="monotone"
                        dataKey="appointments"
                        stroke="hsl(var(--primary))"
                        fill="hsl(var(--primary) / 0.2)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Financial Reports */}
        <TabsContent value="financial" className="space-y-4">
          {/* Summary Cards */}
          <div className="grid gap-4 sm:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {t("reports.revenue")}
                </CardTitle>
                <DollarSign className="h-5 w-5 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">SAR 510,000</div>
                <p className="text-xs text-muted-foreground mt-1">+22% vs last year</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {t("reports.expenses")}
                </CardTitle>
                <DollarSign className="h-5 w-5 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">SAR 320,000</div>
                <p className="text-xs text-muted-foreground mt-1">+8% vs last year</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {t("reports.profit")}
                </CardTitle>
                <TrendingUp className="h-5 w-5 text-emerald-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-emerald-600">SAR 190,000</div>
                <p className="text-xs text-muted-foreground mt-1">+48% vs last year</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid gap-4 lg:grid-cols-2">
            {/* Revenue Trend Line Chart */}
            <Card>
              <CardHeader>
                <CardTitle>{t("reports.revenueTrend")}</CardTitle>
                <CardDescription>{t("reports.thisYear")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={revenueTrendData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="month" className="text-xs" />
                      <YAxis className="text-xs" />
                      <Tooltip contentStyle={tooltipStyle} />
                      <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="hsl(var(--primary))"
                        strokeWidth={2}
                        dot={{ fill: "hsl(var(--primary))", r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Revenue by Department Pie Chart */}
            <Card>
              <CardHeader>
                <CardTitle>{t("reports.revenueByDepartment")}</CardTitle>
                <CardDescription>{t("reports.thisYear")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={revenueByDepartment}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={3}
                        dataKey="value"
                        label={({ name, percent }: { name?: string; percent?: number }) =>
                          `${name || ""} ${((percent || 0) * 100).toFixed(0)}%`
                        }
                      >
                        {revenueByDepartment.map((_, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={DEPARTMENT_COLORS[index % DEPARTMENT_COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={tooltipStyle}
                        formatter={(value) => [`SAR ${Number(value).toLocaleString()}`, ""]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Doctor Reports */}
        <TabsContent value="doctors" className="space-y-4">
          {/* Summary Cards */}
          <div className="grid gap-4 sm:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {t("reports.topConsulted")}
                </CardTitle>
                <Stethoscope className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Dr. Nasser</div>
                <p className="text-xs text-muted-foreground mt-1">186 patients</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {t("reports.avgPatientsPerDay")}
                </CardTitle>
                <Users className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">28</div>
                <p className="text-xs text-muted-foreground mt-1">+4 vs last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {t("reports.satisfactionRate")}
                </CardTitle>
                <TrendingUp className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4.7 / 5.0</div>
                <p className="text-xs text-muted-foreground mt-1">+0.2 vs last quarter</p>
              </CardContent>
            </Card>
          </div>

          {/* Doctor Performance Chart */}
          <Card>
            <CardHeader>
              <CardTitle>{t("doctors.performance")}</CardTitle>
              <CardDescription>{t("reports.thisMonth")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={doctorPerformance} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis type="number" className="text-xs" />
                    <YAxis dataKey="name" type="category" className="text-xs" width={90} />
                    <Tooltip
                      contentStyle={tooltipStyle}
                      formatter={(value: unknown, name: unknown) => [
                        name === "patients" ? `${value} patients` : `${value}/5.0`,
                        name === "patients" ? t("nav.patients") : "Rating",
                      ]}
                    />
                    <Bar
                      dataKey="patients"
                      fill="hsl(var(--primary))"
                      radius={[0, 4, 4, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Inventory Reports */}
        <TabsContent value="inventory" className="space-y-4">
          {/* Summary Cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {t("inventory.products")}
                </CardTitle>
                <Package className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">342</div>
                <p className="text-xs text-muted-foreground mt-1">+18 new this month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {t("reports.stockValue")}
                </CardTitle>
                <DollarSign className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">SAR 285,000</div>
                <p className="text-xs text-muted-foreground mt-1">+5% vs last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {t("reports.lowStockItems")}
                </CardTitle>
                <Package className="h-5 w-5 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">23</div>
                <p className="text-xs text-muted-foreground mt-1">{t("inventory.lowStock")}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {t("reports.expiringItems")}
                </CardTitle>
                <Package className="h-5 w-5 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">8</div>
                <p className="text-xs text-muted-foreground mt-1">{t("inventory.expired")}</p>
              </CardContent>
            </Card>
          </div>

          {/* Stock Movement Chart */}
          <Card>
            <CardHeader>
              <CardTitle>{t("reports.stockMovement")}</CardTitle>
              <CardDescription>{t("reports.thisYear")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stockMovementData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="month" className="text-xs" />
                    <YAxis className="text-xs" />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Bar
                      dataKey="inbound"
                      fill="hsl(var(--primary))"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      dataKey="outbound"
                      fill="hsl(var(--primary) / 0.4)"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
