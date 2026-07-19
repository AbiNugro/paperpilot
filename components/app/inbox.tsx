"use client";

import { useMemo, useState } from "react";
import { ListFilter, Search, SlidersHorizontal, Upload } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/i18n/config";
import { documentText, type Translate } from "@/lib/i18n-format";
import { documents, type DocumentStatus } from "@/lib/mock-data";
import { DocumentRow, EmptyState, PrimaryButton, SectionTitle } from "./ui";

const filters: Array<{ key: string; value: "all" | DocumentStatus }> = [
  { key: "all", value: "all" },
  { key: "action_required", value: "action_required" },
  { key: "needs_attention", value: "needs_attention" },
  { key: "in_progress", value: "in_progress" },
  { key: "completed", value: "completed" },
  { key: "upcoming", value: "upcoming" },
];

const inboxDocuments = documents.slice(0, 8);

export function InboxPage() {
  const locale = useLocale() as Locale;
  const t = useTranslations("Inbox");
  const common = useTranslations("Common");
  const documentsT = useTranslations("Documents");
  const translateDocuments = documentsT as unknown as Translate;
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | DocumentStatus>("all");
  const [sort, setSort] = useState("recent");
  const filteredDocuments = useMemo(() => inboxDocuments.filter((document) => {
    const copy = documentText(document, translateDocuments);
    const matchesQuery = `${copy.title} ${copy.type}`.toLocaleLowerCase(locale).includes(query.toLocaleLowerCase(locale));
    return matchesQuery && (filter === "all" || document.status === filter);
  }).sort((a, b) => sort === "name" ? documentText(a, translateDocuments).title.localeCompare(documentText(b, translateDocuments).title, locale) : documents.indexOf(a) - documents.indexOf(b)), [filter, locale, query, sort, translateDocuments]);

  return <div className="app-page-enter space-y-7"><SectionTitle eyebrow={t("eyebrow")} title={t("title")} copy={t("copy")} action={<PrimaryButton href="/upload"><Upload aria-hidden="true" className="size-4" />{common("uploadDocument")}</PrimaryButton>} />
    <section aria-label={t("tools")} className="rounded-[14px] bg-white p-3 shadow-[0_0_0_1px_rgba(15,23,42,.065)] sm:p-4"><div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between"><label className="relative min-w-0 flex-1"><span className="sr-only">{t("searchLabel")}</span><Search aria-hidden="true" className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#8a95a6]" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t("search")} className="h-11 w-full rounded-[10px] bg-[#f5f7fa] pl-10 pr-3 text-sm text-[#33425c] outline-none ring-1 ring-transparent transition-[background-color,box-shadow] duration-150 ease-out placeholder:text-[#9aa4b3] focus:bg-white focus:ring-[#9db7ef]" /></label><div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center"><label className="sr-only" htmlFor="inbox-sort">{t("sortLabel")}</label><div className="relative"><SlidersHorizontal aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-[#7f8b9e]" /><select id="inbox-sort" value={sort} onChange={(event) => setSort(event.target.value)} className="h-11 w-full appearance-none rounded-[10px] bg-[#f5f7fa] pl-9 pr-8 text-xs font-medium text-[#5a6880] outline-none ring-1 ring-transparent focus:bg-white focus:ring-[#9db7ef] sm:w-auto"><option value="recent">{t("recentlyUpdated")}</option><option value="name">{t("nameSort")}</option></select></div><div className="flex max-w-full items-center gap-1 overflow-x-auto rounded-[10px] bg-[#f5f7fa] p-1"><ListFilter aria-hidden="true" className="ml-2 size-3.5 shrink-0 text-[#7f8b9e]" />{filters.map(({ key, value }) => <button key={value} type="button" onClick={() => setFilter(value)} className={`min-h-9 shrink-0 rounded-[8px] px-2.5 text-[11px] font-semibold transition-[background-color,color,transform] duration-150 ease-out active:scale-[0.96] ${filter === value ? "bg-white text-[#315fca] shadow-[0_1px_3px_rgba(15,23,42,.1)]" : "text-[#798598] hover:text-[#465674]"}`}>{value === "all" ? t("all") : common(`status.${key}`)}</button>)}</div></div></div></section>

    <section aria-label={t("listLabel")} className="space-y-2.5"><div className="hidden grid-cols-[minmax(0,1.5fr)_minmax(80px,.55fr)_minmax(110px,.7fr)_auto_minmax(80px,.55fr)] gap-4 px-4 text-[10px] font-semibold uppercase tracking-[.12em] text-[#98a2b2] sm:grid"><span>{t("document")}</span><span>{t("deadline")}</span><span>{t("progress")}</span><span>{t("status")}</span><span>{t("updated")}</span></div>{filteredDocuments.length ? filteredDocuments.map((document) => <DocumentRow key={document.id} document={document} />) : <EmptyState title={t("noMatch")} copy={t("noMatchCopy")} />}</section>
    <p className="tabular-nums text-center text-[11px] text-[#909aaa]">{common("documentsShown", {shown: filteredDocuments.length, total: inboxDocuments.length})}</p>
  </div>;
}
