import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { AppShell } from "@/components/app/app-shell";
import { DocumentDetail } from "@/components/app/document-detail";
import { getDocument } from "@/lib/mock-data";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const document = getDocument(id);
  const t = await getTranslations("Documents");
  return { title: `${t(`items.${document.id}.title`)} | PaperPilot` };
}

export default async function DocumentRoute({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <AppShell><DocumentDetail document={getDocument(id)} /></AppShell>;
}
