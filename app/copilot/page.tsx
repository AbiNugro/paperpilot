import type { Metadata } from "next";
import { AppShell } from "@/components/app/app-shell";
import { AppPlaceholder } from "@/components/app/placeholder";

export const metadata: Metadata = { title: "AI Copilot | PaperPilot" };
export default function CopilotRoute() { return <AppShell><AppPlaceholder kind="copilot" /></AppShell>; }
