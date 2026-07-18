import type { Metadata } from "next";
import "./globals.css";
import { MotionObserver } from "@/components/landing/motion";

export const metadata: Metadata = {
  title: "PaperPilot — From paperwork to done",
  description:
    "PaperPilot turns confusing documents into clear summaries, deadlines, required documents, and actionable next steps.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased scroll-smooth">
      <body><MotionObserver>{children}</MotionObserver></body>
    </html>
  );
}
