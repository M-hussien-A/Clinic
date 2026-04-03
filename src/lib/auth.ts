import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "./prisma";

// Demo users — used when no database is connected
const DEMO_USERS: Record<string, { password: string; id: string; nameEn: string; nameAr: string; role: string; clinicId: string }> = {
  "admin@clinic.com": { password: "Admin123!", id: "demo-admin", nameEn: "System Administrator", nameAr: "مدير النظام", role: "SUPER_ADMIN", clinicId: "demo-clinic" },
  "doctor@clinic.com": { password: "Password123!", id: "demo-doctor", nameEn: "Dr. Nasser Al-Rashid", nameAr: "د. ناصر الراشد", role: "DOCTOR", clinicId: "demo-clinic" },
  "nurse@clinic.com": { password: "Password123!", id: "demo-nurse", nameEn: "Amira Khalil", nameAr: "أميرة خليل", role: "NURSE", clinicId: "demo-clinic" },
  "reception@clinic.com": { password: "Password123!", id: "demo-reception", nameEn: "Layla Saeed", nameAr: "ليلى سعيد", role: "RECEPTIONIST", clinicId: "demo-clinic" },
  "pharmacist@clinic.com": { password: "Password123!", id: "demo-pharmacist", nameEn: "Hassan Omar", nameAr: "حسن عمر", role: "PHARMACIST", clinicId: "demo-clinic" },
  "accountant@clinic.com": { password: "Password123!", id: "demo-accountant", nameEn: "Yusuf Karim", nameAr: "يوسف كريم", role: "ACCOUNTANT", clinicId: "demo-clinic" },
};

async function tryDatabaseAuth(email: string, password: string) {
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.isActive) return null;
    if (user.lockedUntil && user.lockedUntil > new Date()) return null;

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      const failedLogins = user.failedLogins + 1;
      const updateData: Record<string, unknown> = { failedLogins };
      if (failedLogins >= 5) {
        updateData.lockedUntil = new Date(Date.now() + 15 * 60 * 1000);
        updateData.failedLogins = 0;
      }
      await prisma.user.update({ where: { id: user.id }, data: updateData });
      return null;
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { failedLogins: 0, lockedUntil: null, lastLoginAt: new Date() },
    });
    await prisma.auditLog.create({
      data: { userId: user.id, action: "LOGIN", module: "auth", entityId: user.id, entityType: "User" },
    });

    return {
      id: user.id, email: user.email, name: user.nameEn,
      nameEn: user.nameEn, nameAr: user.nameAr, role: user.role,
      clinicId: user.clinicId, branchId: user.branchId || undefined,
      forcePassChange: user.forcePassChange,
    };
  } catch {
    return null; // DB unavailable — fall through to demo auth
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const email = credentials.email as string;
        const password = credentials.password as string;

        // Try real database first
        const dbUser = await tryDatabaseAuth(email, password);
        if (dbUser) return dbUser;

        // Fallback: demo mode when DB is unavailable
        const demo = DEMO_USERS[email];
        if (demo && demo.password === password) {
          return {
            id: demo.id, email, name: demo.nameEn,
            nameEn: demo.nameEn, nameAr: demo.nameAr, role: demo.role,
            clinicId: demo.clinicId, branchId: undefined, forcePassChange: false,
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as unknown as Record<string, unknown>).role as string;
        token.nameEn = (user as unknown as Record<string, unknown>).nameEn as string;
        token.nameAr = (user as unknown as Record<string, unknown>).nameAr as string;
        token.clinicId = (user as unknown as Record<string, unknown>).clinicId as string;
        token.branchId = (user as unknown as Record<string, unknown>).branchId as string | undefined;
        token.forcePassChange = (user as unknown as Record<string, unknown>).forcePassChange as boolean;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as unknown as Record<string, unknown>).id = token.id;
        (session.user as unknown as Record<string, unknown>).role = token.role;
        (session.user as unknown as Record<string, unknown>).nameEn = token.nameEn;
        (session.user as unknown as Record<string, unknown>).nameAr = token.nameAr;
        (session.user as unknown as Record<string, unknown>).clinicId = token.clinicId;
        (session.user as unknown as Record<string, unknown>).branchId = token.branchId;
      }
      return session;
    },
  },
  pages: {
    signIn: "/en/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 60,
  },
});
