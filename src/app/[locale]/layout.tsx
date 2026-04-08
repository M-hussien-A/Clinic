import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { Providers } from "@/components/providers";
import { locales, type Locale, getDirection } from "@/lib/i18n";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Clinic Management System",
  description: "Production-grade clinic management system",
};

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();
  const direction = getDirection(locale);

  return (
    <html lang={locale} dir={direction} suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=DM+Sans:wght@400;500;600&family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`min-h-screen bg-background antialiased ${
          locale === "ar" ? "font-arabic" : "font-sans"
        }`}
        style={{
          fontFamily:
            locale === "ar"
              ? '"IBM Plex Sans Arabic", sans-serif'
              : '"DM Sans", "Plus Jakarta Sans", sans-serif',
        }}
      >
        <NextIntlClientProvider messages={messages}>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
