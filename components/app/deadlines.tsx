"use client";

import Link from "next/link";
import { CalendarClock, ChevronRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/i18n/config";
import { getDeadlineGroup } from "@/lib/date-utils";
import { documentText, formatDate, type Translate } from "@/lib/i18n-format";
import { documents, getTaskStats } from "@/lib/mock-data";
import { SectionTitle, StatusBadge } from "./ui";

export function DeadlinesPage() {
  const locale = useLocale() as Locale;
  const t = useTranslations("Deadlines");
  const common = useTranslations("Common");
  const documentsT = useTranslations("Documents");
  const translateDocuments = documentsT as unknown as Translate;
  const datedDocuments = documents
    .filter((document): document is typeof document & { deadline: string } => Boolean(document.deadline))
    .sort((a, b) => a.deadline.localeCompare(b.deadline));
  const groups = [
    { key: "today", items: datedDocuments.filter((document) => getDeadlineGroup(document.deadline) === "today") },
    { key: "thisWeek", items: datedDocuments.filter((document) => getDeadlineGroup(document.deadline) === "thisWeek") },
    { key: "nextWeek", items: datedDocuments.filter((document) => getDeadlineGroup(document.deadline) === "nextWeek") },
    { key: "later", items: datedDocuments.filter((document) => getDeadlineGroup(document.deadline) === "later") },
  ] as const;

  return <div className="app-page-enter space-y-8"><SectionTitle eyebrow={t("eyebrow")} title={t("title")} copy={t("copy")} /><div className="space-y-8">{groups.map((group) => <section key={group.key}><div className="flex items-center gap-3"><span className="flex size-8 shrink-0 items-center justify-center rounded-[9px] bg-[#edf3ff] text-[#416dcc]"><CalendarClock aria-hidden="true" className="size-4" /></span><h2 className="text-sm font-semibold text-[#34445f]">{t(group.key)}</h2><span className="h-px min-w-4 flex-1 bg-[#e2e7ef]" /></div>{group.items.length ? <div className="mt-3 space-y-2.5">{group.items.map((document) => { const stats = getTaskStats(document); const copy = documentText(document, translateDocuments); return <Link key={document.id} href={`/documents/${document.id}`} className="group flex flex-col gap-3 rounded-[13px] bg-white p-4 shadow-[0_0_0_1px_rgba(15,23,42,.065)] transition-[transform,box-shadow,background-color] duration-150 ease-out hover:-translate-y-px hover:bg-[#fcfdff] hover:shadow-[0_0_0_1px_rgba(37,99,235,.14)] sm:flex-row sm:items-center"><span className="tabular-nums w-20 shrink-0 text-sm font-semibold text-[#3f5f9d]">{formatDate(document.deadline, locale, "short")}</span><span className="min-w-0 flex-1"><span className="block text-pretty text-sm font-semibold text-[#34435f] group-hover:text-[#245eea]">{copy.title}</span><span className="mt-1 block text-[11px] text-[#8993a4]">{common("tasksRemaining", {count: stats.open})}</span></span><StatusBadge status={document.status} /><ChevronRight aria-hidden="true" className="hidden size-4 text-[#9aa5b4] sm:block" /></Link>; })}</div> : <p className="mt-3 rounded-[12px] bg-[#f0f4fa] px-4 py-3 text-xs text-[#8490a2]">{t("emptyGroup")}</p>}</section>)}</div></div>;
}
