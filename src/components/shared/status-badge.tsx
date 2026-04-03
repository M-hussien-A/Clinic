"use client";

import { useTranslations } from "next-intl";
import { cn, getStatusColor } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
  translationPrefix?: string;
  className?: string;
}

export function StatusBadge({ status, translationPrefix, className }: StatusBadgeProps) {
  const t = useTranslations();

  let label = status;
  if (translationPrefix) {
    try {
      label = t(`${translationPrefix}.${status.toLowerCase().replace(/_/g, "")}`);
    } catch {
      label = status.replace(/_/g, " ");
    }
  } else {
    label = status.replace(/_/g, " ");
  }

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        getStatusColor(status),
        className
      )}
    >
      {label}
    </span>
  );
}
