import type { Metadata } from "next";
import { AppShell } from "@/components/app/app-shell";
import { TasksPage } from "@/components/app/tasks";

export const metadata: Metadata = { title: "Tasks | PaperPilot" };
export default function TasksRoute() { return <AppShell><TasksPage /></AppShell>; }
