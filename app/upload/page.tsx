import type { Metadata } from "next";
import { AppShell } from "@/components/app/app-shell";
import { UploadPage } from "@/components/app/upload";

export const metadata: Metadata = { title: "Upload document | PaperPilot" };

export default function UploadRoute() {
  return <AppShell><UploadPage /></AppShell>;
}
