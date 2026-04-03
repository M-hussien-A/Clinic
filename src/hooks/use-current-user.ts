"use client";

import { useSession } from "next-auth/react";

export function useCurrentUser() {
  const { data: session, status } = useSession();

  const user = session?.user
    ? {
        id: (session.user as Record<string, unknown>).id as string,
        email: session.user.email as string,
        nameEn: (session.user as Record<string, unknown>).nameEn as string,
        nameAr: (session.user as Record<string, unknown>).nameAr as string,
        role: (session.user as Record<string, unknown>).role as string,
        clinicId: (session.user as Record<string, unknown>).clinicId as string,
        branchId: (session.user as Record<string, unknown>).branchId as string | undefined,
      }
    : null;

  return {
    user,
    isLoading: status === "loading",
    isAuthenticated: status === "authenticated",
  };
}
