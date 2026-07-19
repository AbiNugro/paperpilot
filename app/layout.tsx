import type { Metadata } from "next";
import "./globals.css";
import { MotionObserver } from "@/components/landing/motion";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

export const metadata: Metadata = {
  title: "PaperPilot — From paperwork to done",
  description:
    "PaperPilot turns confusing documents into clear summaries, deadlines, required documents, and actionable next steps.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [locale, messages] = await Promise.all([getLocale(), getMessages()]);

  return (
    <html lang={locale} className="antialiased scroll-smooth">
      <body><NextIntlClientProvider locale={locale} messages={messages}><MotionObserver>{children}</MotionObserver></NextIntlClientProvider></body>
    </html>
  );
}
