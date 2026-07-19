"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { AlertCircle, AlertTriangle, Check, FileText, MoreHorizontal, Paperclip, Sparkles } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { documentText, formatDate, requirementText, taskText, type Translate } from "@/lib/i18n-format";
import { getDaysRemaining, getRequirementStats, type PaperDocument, type PaperTask } from "@/lib/mock-data";
import { DeadlineIcon, SecondaryButton, StatusBadge, TaskStatusIcon } from "./ui";

type DocumentTab = "overview" | "tasks" | "original";
const tabs: DocumentTab[] = ["overview", "tasks", "original"];

export function DocumentDetail({ document }: { document: PaperDocument }) {
  const locale = useLocale() as Locale;
  const t = useTranslations("DocumentDetail");
  const common = useTranslations("Common");
  const documentsT = useTranslations("Documents");
  const translateDocuments = documentsT as unknown as Translate;
  const copy = documentText(document, translateDocuments);
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<DocumentTab>(() => searchParams.get("tab") === "tasks" ? "tasks" : "overview");
  const [tasks, setTasks] = useState<PaperTask[]>(document.tasks);
  const [toast, setToast] = useState("");
  const completedCount = useMemo(() => tasks.filter((item) => item.status === "completed").length, [tasks]);
  const requirementStats = getRequirementStats(document);
  const toggleTask = (id: string) => setTasks((current) => current.map((item) => item.id === id ? { ...item, status: item.status === "completed" ? "open" : "completed" } : item));
  const showToast = (message: string) => { setToast(message); window.setTimeout(() => setToast(""), 2400); };
  const changeTabWithKeyboard = (event: React.KeyboardEvent<HTMLButtonElement>, current: DocumentTab) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const direction = event.key === "ArrowRight" ? 1 : -1;
    const nextIndex = (tabs.indexOf(current) + direction + tabs.length) % tabs.length;
    setActiveTab(tabs[nextIndex]);
    window.document.querySelector<HTMLButtonElement>(`[data-document-tab="${tabs[nextIndex]}"]`)?.focus();
  };

  return <div className="app-page-enter space-y-7">
    <header className="flex flex-col gap-5 border-b border-[#e2e7ef] pb-6 lg:flex-row lg:items-start lg:justify-between"><div className="flex min-w-0 items-start gap-3"><span className="flex size-11 shrink-0 items-center justify-center rounded-[11px] bg-[#edf3ff] text-[#416dcc]"><FileText aria-hidden="true" className="size-5" /></span><div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><span className="text-[10px] font-semibold uppercase tracking-[.12em] text-[#6e7d97]">{copy.type}</span><StatusBadge status={document.status} /></div><h1 className="text-balance mt-2 text-[clamp(1.7rem,4vw,2.5rem)] font-semibold leading-[1.06] tracking-[-.05em] text-[#1b2943]">{copy.title}</h1><p className="mt-3 flex flex-wrap items-center gap-2 text-xs text-[#8993a3]"><span>{common("uploaded", {date: formatDate(document.uploadedAt, locale)})}</span><span aria-hidden="true">·</span><span className="break-all">{document.fileName}</span><span aria-hidden="true">·</span><span>{document.fileSize}</span></p></div></div><div className="flex items-center gap-2 lg:pt-1"><SecondaryButton onClick={() => showToast(t("originalSoon"))}><Paperclip aria-hidden="true" className="size-4" />{t("viewOriginal")}</SecondaryButton><button type="button" aria-label={t("moreActions")} onClick={() => showToast(t("actionsSoon"))} className="flex size-11 items-center justify-center rounded-[10px] bg-white text-[#657187] shadow-[0_0_0_1px_rgba(15,23,42,.1)] transition-[background-color,transform] duration-150 ease-out hover:bg-[#f1f4f8] active:scale-[0.96]"><MoreHorizontal aria-hidden="true" className="size-4" /></button></div></header>

    <div role="tablist" aria-label={t("viewsLabel")} className="flex max-w-full gap-1 overflow-x-auto border-b border-[#e2e7ef]">{tabs.map((value) => <button key={value} id={`document-tab-${value}`} data-document-tab={value} type="button" role="tab" aria-controls={`document-panel-${value}`} aria-selected={activeTab === value} tabIndex={activeTab === value ? 0 : -1} onKeyDown={(event) => changeTabWithKeyboard(event, value)} onClick={() => setActiveTab(value)} className={`min-h-11 shrink-0 rounded-t-[9px] px-3 text-xs font-semibold transition-[background-color,color] duration-150 ease-out ${activeTab === value ? "border-b-2 border-[#3567d2] text-[#315fca]" : "text-[#7c8798] hover:bg-[#f1f4f8]"}`}>{t(`tabs.${value}`)}</button>)}</div>

    {activeTab === "original" ? <OriginalPlaceholder document={document} /> : <div role="tabpanel" id={`document-panel-${activeTab}`} aria-labelledby={`document-tab-${activeTab}`} className="grid gap-6 lg:grid-cols-[minmax(0,1.65fr)_minmax(270px,.8fr)]"><main className="space-y-6">
      {activeTab === "overview" && <>
        <section className="rounded-[16px] bg-white p-5 shadow-[0_0_0_1px_rgba(15,23,42,.065)] sm:p-6"><h2 className="text-base font-semibold text-[#2b3b57]">{t("whatIsThis")}</h2><p className="text-pretty mt-4 max-w-3xl text-sm leading-7 text-[#65728a]">{copy.summary}</p></section>
        <DeadlineCard document={document} />
        <section className="rounded-[16px] bg-white p-5 shadow-[0_0_0_1px_rgba(15,23,42,.065)] sm:p-6"><div><h2 className="text-base font-semibold text-[#2b3b57]">{t("whatYouNeed")}</h2><p className="mt-1 text-xs text-[#8590a2]">{common("readyProgress", {ready: requirementStats.ready, total: requirementStats.total})}</p></div><div className="mt-4 grid gap-2 sm:grid-cols-2">{document.requiredDocuments.map((item) => <div key={item.id} className="flex items-center justify-between gap-3 rounded-[10px] bg-[#f6f8fb] px-3 py-3"><span className="text-sm font-medium text-[#43516a]">{requirementText(item.id, translateDocuments)}</span><span className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2 py-1 text-[10px] font-semibold ${item.status === "ready" ? "bg-[#eaf7ef] text-[#347c50]" : "bg-[#fff0ef] text-[#a34c45]"}`}>{item.status === "ready" ? <Check aria-hidden="true" className="size-3" /> : <AlertCircle aria-hidden="true" className="size-3" />}{common(`status.${item.status}`)}</span></div>)}</div></section>
      </>}

      <section role="tabpanel" className="rounded-[16px] bg-white p-5 shadow-[0_0_0_1px_rgba(15,23,42,.065)] sm:p-6"><div className="flex items-center justify-between gap-3"><div><h2 className="text-base font-semibold text-[#2b3b57]">{t("nextActions")}</h2><p className="mt-1 text-xs text-[#8590a2]">{common("completedProgress", {completed: completedCount, total: tasks.length})}</p></div><span className="tabular-nums text-xs font-semibold text-[#72809a]">{tasks.length ? Math.round((completedCount / tasks.length) * 100) : 0}%</span></div><div className="mt-5 h-1.5 overflow-hidden rounded-full bg-[#edf1f6]"><div className="h-full rounded-full bg-[#5a7fdc] transition-[width] duration-200 ease-out" style={{ width: `${tasks.length ? (completedCount / tasks.length) * 100 : 0}%` }} /></div><div className="mt-4 divide-y divide-[#edf0f4]">{tasks.map((item) => <label key={item.id} className="flex cursor-pointer items-start gap-3 py-3 first:pt-0 last:pb-0"><input type="checkbox" className="sr-only" checked={item.status === "completed"} onChange={() => toggleTask(item.id)} /><TaskStatusIcon completed={item.status === "completed"} /><span className="min-w-0"><span className={`block text-sm font-medium ${item.status === "completed" ? "text-[#8b95a4] line-through" : "text-[#3a4964]"}`}>{taskText(item, translateDocuments)}</span><span className="mt-1 flex items-center gap-1 text-[11px] text-[#8a95a4]"><DeadlineIcon />{item.dueDate ? common("due", {date: formatDate(item.dueDate, locale, "short")}) : common("status.completed")}</span></span></label>)}</div></section>
      {activeTab === "overview" && <section className="rounded-[16px] bg-[#eef4ff] p-5 shadow-[inset_0_0_0_1px_rgba(37,99,235,.08)] sm:p-6"><div className="flex items-center gap-2 text-[#416dcc]"><Sparkles aria-hidden="true" className="size-4" /><h2 className="text-sm font-semibold">{t("whyThisMatters")}</h2></div><p className="text-pretty mt-4 text-sm leading-6 text-[#62728f]">{t("whyCopy", {date: document.deadline ? formatDate(document.deadline, locale, "short") : common("noDeadline")})} {t("whyNext")}</p></section>}
    </main><aside className="space-y-4"><section className="rounded-[16px] bg-white p-5 shadow-[0_0_0_1px_rgba(15,23,42,.065)]"><h2 className="text-sm font-semibold text-[#2b3b57]">{t("overview")}</h2><dl className="mt-5 space-y-4">{[[t("documentType"), copy.type], [t("deadline"), document.deadline ? formatDate(document.deadline, locale) : common("noDeadline")], [t("urgency"), common(`urgency.${document.urgency}`)], [t("requirements"), common("readyProgress", {ready: requirementStats.ready, total: requirementStats.total})], [t("tasks"), common("completedProgress", {completed: completedCount, total: tasks.length})]].map(([term, value]) => <div key={term} className="flex items-center justify-between gap-3 text-xs"><dt className="text-[#8993a3]">{term}</dt><dd className="text-right font-semibold text-[#42516b]">{value}</dd></div>)}</dl></section><section className="rounded-[16px] bg-[#f0f4fa] p-5"><p className="text-[10px] font-semibold uppercase tracking-[.13em] text-[#5a73b6]">{t("suggests")}</p><p className="mt-3 text-[10px] font-semibold uppercase tracking-[.1em] text-[#8290a4]">{t("nextBestAction")}</p><p className="text-pretty mt-2 text-sm font-semibold leading-6 text-[#344968]">{t("prepareMissing")}</p><p className="mt-3 text-xs leading-5 text-[#7d899c]">{t("missingCopy")}</p><div className="mt-5 grid gap-2"><SecondaryButton onClick={() => setActiveTab("tasks")} className="w-full">{t("reviewTasks")}</SecondaryButton><SecondaryButton onClick={() => showToast(t("reminderSoon"))} className="w-full">{t("createReminder")}</SecondaryButton><SecondaryButton onClick={() => showToast(t("replySoon"))} className="w-full">{t("generateReply")}</SecondaryButton></div></section></aside></div>}
    {toast && <div role="status" aria-live="polite" className="fixed bottom-5 left-1/2 z-[70] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 rounded-[10px] bg-[#17243e] px-4 py-3 text-center text-xs font-medium text-white shadow-[0_14px_35px_-18px_rgba(15,23,42,.65)]">{toast}</div>}
  </div>;
}

function DeadlineCard({ document }: { document: PaperDocument }) {
  const locale = useLocale() as Locale;
  const t = useTranslations("DocumentDetail");
  const common = useTranslations("Common");
  const days = getDaysRemaining(document.deadline);
  return <section className="rounded-[16px] bg-[#fffaf0] p-5 shadow-[inset_0_0_0_1px_rgba(218,164,75,.14)] sm:p-6"><div className="flex flex-col items-start justify-between gap-4 sm:flex-row"><div><p className="text-[10px] font-semibold uppercase tracking-[.13em] text-[#9c752c]">{t("importantDeadline")}</p><p className="tabular-nums mt-3 text-2xl font-semibold tracking-[-.04em] text-[#624c26]">{document.deadline ? formatDate(document.deadline, locale) : common("noDeadline")}</p><p className="mt-1 text-xs text-[#9a8154]">{days === null ? common("noDeadline") : common("daysRemaining", {count: days})}</p></div><span className="inline-flex items-center gap-1.5 rounded-full bg-[#fff0d2] px-2.5 py-1 text-[10px] font-semibold text-[#9c6b20]"><AlertTriangle aria-hidden="true" className="size-3.5" />{t("priority", {urgency: common(`urgency.${document.urgency}`).toLocaleLowerCase(locale)})}</span></div></section>;
}

function OriginalPlaceholder({ document }: { document: PaperDocument }) {
  const t = useTranslations("DocumentDetail");
  return <section role="tabpanel" className="rounded-[16px] bg-white p-8 text-center shadow-[0_0_0_1px_rgba(15,23,42,.065)] sm:p-16"><span className="mx-auto flex size-12 items-center justify-center rounded-[12px] bg-[#f0f3f7] text-[#8290a4]"><FileText aria-hidden="true" className="size-5" /></span><h2 className="mt-5 text-lg font-semibold text-[#30415e]">{t("originalTitle")}</h2><p className="mt-2 break-all text-sm text-[#8490a2]">{document.fileName} · {document.fileSize}</p><p className="text-pretty mt-2 text-sm text-[#8490a2]">{t("originalCopy")}</p></section>;
}
