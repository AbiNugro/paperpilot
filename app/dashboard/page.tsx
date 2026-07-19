import type { Metadata } from "next";
import { AppShell } from "@/components/app/app-shell";
import { Dashboard } from "@/components/app/dashboard";

export const metadata: Metadata = { title: "Dashboard | PaperPilot" };

export default function DashboardPage() {
  return <AppShell><Dashboard /></AppShell>;
}
