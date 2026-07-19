import type { Metadata } from "next";
import { AppShell } from "@/components/app/app-shell";
import { SettingsPage } from "@/components/app/placeholder";

export const metadata: Metadata = { title: "Settings | PaperPilot" };
export default function SettingsRoute() { return <AppShell><SettingsPage /></AppShell>; }
