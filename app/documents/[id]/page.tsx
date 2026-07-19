import type { Metadata } from "next";
import { AppShell } from "@/components/app/app-shell";
import { DocumentDetail } from "@/components/app/document-detail";
import { getDocument } from "@/lib/mock-data";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  return { title: `${getDocument(id).title} | PaperPilot` };
}

export default async function DocumentRoute({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <AppShell><DocumentDetail document={getDocument(id)} /></AppShell>;
}
