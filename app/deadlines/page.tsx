import type { Metadata } from "next";
import { AppShell } from "@/components/app/app-shell";
import { DeadlinesPage } from "@/components/app/deadlines";

export const metadata: Metadata = { title: "Deadlines | PaperPilot" };
export default function DeadlinesRoute() { return <AppShell><DeadlinesPage /></AppShell>; }
