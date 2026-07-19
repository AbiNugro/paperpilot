"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { AlertCircle, ArrowRight, CalendarClock, CheckSquare, FileText, ListTodo, Sparkles, Upload } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { documentText, formatDate, formatWeekdayDate, taskText, type Translate } from "@/lib/i18n-format";
import { documents, getDaysRemaining, getRequirementStats, getTaskStats, mockToday, openTasks, primaryDocument, type PaperTask } from "@/lib/mock-data";
import { DeadlineRow, DocumentRow, MetricCard, PrimaryButton, StatusBadge, TaskStatusIcon } from "./ui";

export function Dashboard() {
  const locale = useLocale() as Locale;
  const t = useTranslations("Dashboard");
  const common = useTranslations("Common");
  const documentsT = useTranslations("Documents");
  const translateDocuments = documentsT as unknown as Translate;
  const primaryCopy = documentText(primaryDocument, translateDocuments);
  const [tasks, setTasks] = useState<PaperTask[]>(primaryDocument.tasks);
  const stats = getTaskStats(primaryDocument);
  const requirements = getRequirementStats(primaryDocument);
  const daysRemaining = getDaysRemaining(primaryDocument.deadline);
  const toggleTask = (id: string) => setTasks((current) => current.map((item) => item.id === id ? { ...item, status: item.status === "completed" ? "open" : "completed" } : item));
  const liveStats = { ...stats, completed: tasks.filter((item) => item.status === "completed").length, open: tasks.filter((item) => item.status === "open").length };
  const nextDocuments = documents.slice(1, 4);

  return <div className="app-page-enter space-y-8">
    <header className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div><p className="text-[10px] font-semibold uppercase tracking-[.16em] text-[#4e70c7]">{formatWeekdayDate(mockToday, locale)}</p><p className="mt-3 text-sm font-semibold text-[#42516b]">{t("greeting")}</p><h1 className="text-balance mt-1 text-[clamp(1.8rem,3.5vw,2.45rem)] font-semibold leading-[1.06] tracking-[-.045em] text-[#1b2943]">{t("title")}</h1><p className="text-pretty mt-3 max-w-2xl text-sm leading-6 text-[#707b8e]">{t("supporting")}</p></div>
      <PrimaryButton href="/upload"><Upload aria-hidden="true" className="size-4" />{common("uploadDocument")}</PrimaryButton>
    </header>

    <section aria-labelledby="priority-title" className="relative overflow-hidden rounded-[17px] bg-[#f2f5fa] p-5 shadow-[inset_0_0_0_1px_rgba(37,99,235,.1)] sm:p-7"><div aria-hidden="true" className="absolute right-0 top-0 h-full w-1/3 bg-[radial-gradient(ellipse_at_top_right,rgba(91,129,245,.14),transparent_68%)]" /><div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between"><div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><span className="text-[10px] font-semibold uppercase tracking-[.14em] text-[#5c6e91]">{t("highestPriority")}</span><StatusBadge status="action_required" /></div><h2 id="priority-title" className="text-balance mt-3 text-xl font-semibold tracking-[-.035em] text-[#263752] sm:text-2xl">{primaryCopy.title}</h2><div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#6f7d94]"><span className="font-semibold text-[#9d6a1d]">{common("due", {date: formatDate(primaryDocument.deadline!, locale, "short")})}</span><span>{common("daysRemaining", {count: daysRemaining ?? 0})}</span><span>{common("tasksRemaining", {count: liveStats.open})}</span></div><p className="mt-4 flex items-start gap-2 text-sm text-[#687790]"><AlertCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-[#b27b28]" />{t("missingRequirements", {count: requirements.missing})}</p></div><div className="relative flex shrink-0 flex-col gap-2 sm:flex-row lg:flex-col xl:flex-row"><PrimaryButton href={`/documents/${primaryDocument.id}`}>{t("continueApplication")} <ArrowRight aria-hidden="true" className="size-4" /></PrimaryButton><Link href={`/documents/${primaryDocument.id}`} className="inline-flex min-h-11 items-center justify-center rounded-[9px] px-3 text-xs font-semibold text-[#48628f] transition-[background-color,color] duration-150 ease-out hover:bg-white hover:text-[#315fca]">{common("viewDocument")}</Link></div></div></section>

    <section aria-labelledby="next-up-title"><div className="flex items-end justify-between gap-3"><div><h2 id="next-up-title" className="text-base font-semibold text-[#293a57]">{t("nextUp")}</h2><p className="mt-1 text-xs text-[#7b8799]">{t("nearestDeadlines")}</p></div><Link href="/deadlines" className="inline-flex min-h-10 items-center gap-1 px-2 text-xs font-semibold text-[#3c66c1] hover:text-[#245eea]">{t("viewDeadlines")} <ArrowRight aria-hidden="true" className="size-3.5" /></Link></div><div className="mt-4 grid gap-2.5 lg:grid-cols-3">{nextDocuments.map((document) => <DeadlineRow key={document.id} document={document} detail={document.id === "internet-bill-july" ? t("paymentRequired") : common("tasksRemaining", {count: getTaskStats(document).open})} />)}</div></section>

    <section aria-labelledby="insight-title" className="rounded-[15px] bg-[#eaf1ff] p-5 shadow-[inset_0_0_0_1px_rgba(37,99,235,.08)] sm:p-6"><div className="flex items-start gap-3"><span className="flex size-9 shrink-0 items-center justify-center rounded-[9px] bg-white text-[#416dcc]"><Sparkles aria-hidden="true" className="size-4" /></span><div><h2 id="insight-title" className="text-sm font-semibold text-[#30466f]">{t("insight")}</h2><p className="text-pretty mt-2 text-sm leading-6 text-[#5e6e8a]">{t("insightCopy")} {t("insightNext")}</p><Link href={`/documents/${primaryDocument.id}?tab=tasks`} className="mt-3 inline-flex min-h-10 items-center gap-1 text-xs font-semibold text-[#315fca] hover:text-[#204da9]">{t("reviewTasks")} <ArrowRight aria-hidden="true" className="size-3.5" /></Link></div></div></section>

    <section aria-labelledby="workspace-title"><div><h2 id="workspace-title" className="text-base font-semibold text-[#293a57]">{t("workspace")}</h2><p className="mt-1 text-xs text-[#7b8799]">{t("workspaceCopy")}</p></div><div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4"><MetricCard label={t("documents")} value={String(documents.length)} detail={t("documentsDetail")} icon={FileText} /><MetricCard label={t("openTasks")} value={String(openTasks.length)} detail={t("openTasksDetail")} icon={ListTodo} tone="green" /><MetricCard label={t("upcomingDeadlines")} value="3" detail={t("upcomingDetail")} icon={CalendarClock} tone="amber" /><MetricCard label={t("needAttention")} value={String(documents.filter((document) => document.status === "action_required" || document.status === "needs_attention").length)} detail={t("reviewSoon")} icon={AlertCircle} tone="red" /></div></section>

    <div className="grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(300px,.8fr)]">
      <section aria-labelledby="tasks-title" className="order-1 rounded-[16px] bg-white p-5 shadow-[0_0_0_1px_rgba(15,23,42,.065)] xl:order-2"><div className="flex items-center justify-between"><div><h2 id="tasks-title" className="text-balance text-base font-semibold text-[#293a57]">{t("attentionTasks")}</h2><p className="mt-1 text-xs text-[#7b8799]">{t("scholarshipOpenTasks", {count: liveStats.open})}</p></div><CheckSquare aria-hidden="true" className="size-4 text-[#5c78bc]" /></div><div className="mt-5 divide-y divide-[#edf0f4]">{tasks.map((item) => <label key={item.id} className="flex cursor-pointer items-start gap-3 py-3 first:pt-0 last:pb-0"><input type="checkbox" checked={item.status === "completed"} onChange={() => toggleTask(item.id)} className="sr-only" /><TaskStatusIcon completed={item.status === "completed"} /><span className="min-w-0"><span className={`block text-sm font-medium ${item.status === "completed" ? "text-[#8b95a4] line-through" : "text-[#3a4964]"}`}>{taskText(item, translateDocuments)}</span><span className="mt-1 block text-[11px] text-[#8a95a4]">{item.dueDate ? common("due", {date: formatDate(item.dueDate, locale, "short")}) : common("status.completed")} · {primaryCopy.title}</span></span></label>)}</div><Link href="/tasks" className="mt-4 inline-flex min-h-10 items-center gap-1 text-xs font-semibold text-[#315fca] hover:text-[#204da9]">{t("viewAllTasks")} <ArrowRight aria-hidden="true" className="size-3.5" /></Link></section>
      <section aria-labelledby="recent-title" className="order-2 rounded-[16px] bg-[#f0f4fa] p-4 sm:p-5 xl:order-1"><div className="flex items-center justify-between gap-3"><div><h2 id="recent-title" className="text-base font-semibold text-[#293a57]">{t("recentDocuments")}</h2><p className="mt-1 text-xs text-[#7b8799]">{t("recentCopy")}</p></div><Link href="/inbox" className="inline-flex min-h-10 items-center gap-1 px-2 text-xs font-semibold text-[#3c66c1] hover:text-[#245eea]">{t("openInbox")} <ArrowRight aria-hidden="true" className="size-3.5" /></Link></div><div className="mt-5 space-y-2.5">{documents.slice(0, 4).map((document) => <DocumentRow key={document.id} document={document} />)}</div></section>
    </div>
  </div>;
}
