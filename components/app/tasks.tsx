"use client";

import Link from "next/link";
import { Check, ListTodo } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import type { Locale } from "@/i18n/config";
import { documentText, formatDate, taskText, type Translate } from "@/lib/i18n-format";
import { allTasks, documents, isDueSoon, type PaperTask } from "@/lib/mock-data";
import { PrimaryButton, SectionTitle } from "./ui";

type TaskFilter = "all" | "due-soon" | "open" | "completed";

export function TasksPage() {
  const locale = useLocale() as Locale;
  const t = useTranslations("Tasks");
  const common = useTranslations("Common");
  const documentsT = useTranslations("Documents");
  const translateDocuments = documentsT as unknown as Translate;
  const [filter, setFilter] = useState<TaskFilter>("all");
  const [tasks, setTasks] = useState<PaperTask[]>(allTasks);
  const toggle = (id: string) => setTasks((current) => current.map((item) => item.id === id ? { ...item, status: item.status === "completed" ? "open" : "completed" } : item));
  const visible = useMemo(() => tasks.filter((item) => filter === "all" || filter === "due-soon" ? (filter === "due-soon" ? isDueSoon(item) : true) : item.status === filter), [filter, tasks]);
  const openCount = tasks.filter((item) => item.status === "open").length;
  const dueThisWeek = tasks.filter((item) => isDueSoon(item)).length;
  const filters = [{ label: t("all"), value: "all" }, { label: t("dueSoon"), value: "due-soon" }, { label: t("open"), value: "open" }, { label: t("completed"), value: "completed" }] as const;

  return <div className="app-page-enter space-y-7"><SectionTitle eyebrow={t("eyebrow")} title={t("title")} copy={t("copy")} action={<PrimaryButton href="/upload">{common("addDocument")}</PrimaryButton>} /><section className="rounded-[14px] bg-white p-3 shadow-[0_0_0_1px_rgba(15,23,42,.065)] sm:p-4"><div className="flex max-w-full gap-1 overflow-x-auto rounded-[10px] bg-[#f5f7fa] p-1">{filters.map((item) => <button key={item.value} type="button" onClick={() => setFilter(item.value)} className={`min-h-10 shrink-0 rounded-[8px] px-3 text-xs font-semibold transition-[background-color,color,transform] duration-150 ease-out active:scale-[0.96] ${filter === item.value ? "bg-white text-[#315fca] shadow-[0_1px_3px_rgba(15,23,42,.1)]" : "text-[#7d8899] hover:text-[#465674]"}`}>{item.label}</button>)}</div><div className="mt-4 flex flex-wrap gap-4 text-xs text-[#7e899a]"><span className="font-semibold text-[#33435f]">{common("openTasks", {count: openCount})}</span><span>{t("dueThisWeek", {count: dueThisWeek})}</span></div></section><section aria-label={t("listLabel")} className="space-y-2.5">{visible.length ? visible.map((item) => { const document = documents.find((entry) => entry.id === item.documentId)!; const documentCopy = documentText(document, translateDocuments); return <div key={item.id} className="flex items-start gap-3 rounded-[12px] bg-white p-4 shadow-[0_0_0_1px_rgba(15,23,42,.065)] transition-[background-color,box-shadow] duration-150 ease-out hover:bg-[#fcfdff] hover:shadow-[0_0_0_1px_rgba(37,99,235,.13)]"><label className="relative mt-0.5 flex size-10 shrink-0 cursor-pointer items-center justify-center -m-2"><input type="checkbox" className="sr-only" checked={item.status === "completed"} onChange={() => toggle(item.id)} /><span className={`flex size-5 items-center justify-center rounded-full ${item.status === "completed" ? "bg-[#eaf7ef] text-[#347c50]" : "text-[#97a3b4]"}`}>{item.status === "completed" ? <Check aria-hidden="true" className="size-3" /> : <ListTodo aria-hidden="true" className="size-4" />}</span></label><span className="min-w-0 flex-1"><span className={`block text-sm font-medium ${item.status === "completed" ? "text-[#8b95a4] line-through" : "text-[#35445f]"}`}>{taskText(item, translateDocuments)}</span><span className="mt-1 flex flex-wrap items-center gap-x-2 text-[11px] text-[#8993a4]"><Link href={`/documents/${item.documentId}`} className="inline-flex min-h-8 items-center font-medium text-[#5572b6] hover:text-[#245eea]">{documentCopy.title}</Link><span aria-hidden="true">·</span><span>{item.dueDate ? common("due", {date: formatDate(item.dueDate, locale, "short")}) : common("status.completed")}</span></span></span></div>; }) : <div className="rounded-[16px] border border-dashed border-[#cbd7e8] bg-white px-6 py-14 text-center"><h2 className="text-lg font-semibold text-[#2b3b57]">{t("emptyTitle")}</h2><p className="mt-2 text-sm text-[#7b879a]">{t("emptyCopy")}</p></div>}</section></div>;
}
