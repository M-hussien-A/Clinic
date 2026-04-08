"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useCurrentUser } from "@/hooks/use-current-user";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  Calendar,
  Stethoscope,
  FileText,

  Receipt,
  Package,
  BarChart3,
  Settings,

  UserCog,
  ScrollText,
  ChevronLeft,
  ChevronRight,
  Activity,
  FlaskConical,
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
interface NavItem {
  titleKey: string;
  href: string;
  icon: React.ReactNode;
  roles: string[];
}

const navItems: NavItem[] = [
  {
    titleKey: "nav.dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard className="h-5 w-5" />,
    roles: ["SUPER_ADMIN", "CLINIC_ADMIN", "DOCTOR", "NURSE", "RECEPTIONIST", "PHARMACIST", "ACCOUNTANT"],
  },
  {
    titleKey: "nav.patients",
    href: "/patients",
    icon: <Users className="h-5 w-5" />,
    roles: ["SUPER_ADMIN", "CLINIC_ADMIN", "DOCTOR", "NURSE", "RECEPTIONIST"],
  },
  {
    titleKey: "nav.appointments",
    href: "/appointments",
    icon: <Calendar className="h-5 w-5" />,
    roles: ["SUPER_ADMIN", "CLINIC_ADMIN", "DOCTOR", "NURSE", "RECEPTIONIST"],
  },
  {
    titleKey: "nav.doctors",
    href: "/doctors",
    icon: <Stethoscope className="h-5 w-5" />,
    roles: ["SUPER_ADMIN", "CLINIC_ADMIN", "RECEPTIONIST"],
  },
  {
    titleKey: "nav.consultations",
    href: "/consultations",
    icon: <Activity className="h-5 w-5" />,
    roles: ["SUPER_ADMIN", "CLINIC_ADMIN", "DOCTOR", "NURSE"],
  },
  {
    titleKey: "nav.prescriptions",
    href: "/prescriptions",
    icon: <FileText className="h-5 w-5" />,
    roles: ["SUPER_ADMIN", "CLINIC_ADMIN", "DOCTOR", "NURSE", "PHARMACIST"],
  },
  {
    titleKey: "nav.labOrders",
    href: "/consultations/lab-orders",
    icon: <FlaskConical className="h-5 w-5" />,
    roles: ["SUPER_ADMIN", "CLINIC_ADMIN", "DOCTOR", "NURSE"],
  },
  {
    titleKey: "nav.billing",
    href: "/billing",
    icon: <Receipt className="h-5 w-5" />,
    roles: ["SUPER_ADMIN", "CLINIC_ADMIN", "DOCTOR", "RECEPTIONIST", "ACCOUNTANT"],
  },
  {
    titleKey: "nav.inventory",
    href: "/inventory",
    icon: <Package className="h-5 w-5" />,
    roles: ["SUPER_ADMIN", "CLINIC_ADMIN", "PHARMACIST"],
  },
  {
    titleKey: "nav.reports",
    href: "/reports",
    icon: <BarChart3 className="h-5 w-5" />,
    roles: ["SUPER_ADMIN", "CLINIC_ADMIN", "DOCTOR", "PHARMACIST", "ACCOUNTANT"],
  },
  {
    titleKey: "nav.settings",
    href: "/settings",
    icon: <Settings className="h-5 w-5" />,
    roles: ["SUPER_ADMIN", "CLINIC_ADMIN"],
  },
  {
    titleKey: "nav.users",
    href: "/admin/users",
    icon: <UserCog className="h-5 w-5" />,
    roles: ["SUPER_ADMIN", "CLINIC_ADMIN"],
  },
  {
    titleKey: "nav.auditLog",
    href: "/admin/audit-log",
    icon: <ScrollText className="h-5 w-5" />,
    roles: ["SUPER_ADMIN", "CLINIC_ADMIN"],
  },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations();
  const { user } = useCurrentUser();
  const isRTL = locale === "ar";

  const filteredItems = navItems.filter(
    (item) => user && item.roles.includes(user.role)
  );

  return (
    <TooltipProvider delayDuration={0}>
      <aside
        className={cn(
          "fixed top-0 h-screen bg-sidebar text-sidebar-foreground border-e border-border transition-all duration-300 z-40 flex flex-col",
          collapsed ? "w-[68px]" : "w-[260px]",
          isRTL ? "right-0" : "left-0"
        )}
      >
        {/* Logo */}
        <div className="flex items-center h-16 px-4 border-b border-border">
          <div className="flex items-center gap-2 min-w-0">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
              C
            </div>
            {!collapsed && (
              <span className="font-heading font-semibold text-sm truncate">
                {t("app.name")}
              </span>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-2">
          <ul className="space-y-1">
            {filteredItems.map((item) => {
              const href = `/${locale}${item.href}`;
              const isActive = pathname === href || pathname.startsWith(href + "/");

              const linkContent = (
                <Link
                  href={href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-sidebar-accent text-primary"
                      : "text-sidebar-foreground hover:bg-sidebar-accent/50",
                    collapsed && "justify-center px-2"
                  )}
                >
                  {item.icon}
                  {!collapsed && <span>{t(item.titleKey)}</span>}
                </Link>
              );

              if (collapsed) {
                return (
                  <li key={item.href}>
                    <Tooltip>
                      <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
                      <TooltipContent side={isRTL ? "left" : "right"}>
                        {t(item.titleKey)}
                      </TooltipContent>
                    </Tooltip>
                  </li>
                );
              }

              return <li key={item.href}>{linkContent}</li>;
            })}
          </ul>
        </nav>

        {/* Collapse Toggle */}
        <div className="border-t border-border p-2">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex w-full items-center justify-center rounded-md p-2 text-sm text-muted-foreground hover:bg-sidebar-accent/50 transition-colors"
          >
            {collapsed ? (
              isRTL ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />
            ) : (
              isRTL ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />
            )}
            {!collapsed && (
              <span className="ms-2">{collapsed ? "" : locale === "ar" ? "طي" : "Collapse"}</span>
            )}
          </button>
        </div>
      </aside>
    </TooltipProvider>
  );
}
