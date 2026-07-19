import type { Metadata } from "next";
import { AppShell } from "@/components/app/app-shell";
import { InboxPage } from "@/components/app/inbox";

export const metadata: Metadata = { title: "Paper Inbox | PaperPilot" };

export default function InboxRoute() {
  return <AppShell><InboxPage /></AppShell>;
}
