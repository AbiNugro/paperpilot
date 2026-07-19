"use client";

import { useMemo, useState } from "react";
import { ListFilter, Search, SlidersHorizontal, Upload } from "lucide-react";
import { documents, type DocumentStatus } from "@/lib/mock-data";
import { DocumentRow, EmptyState, PrimaryButton, SectionTitle } from "./ui";

const filters: Array<{ label: string; value: "all" | DocumentStatus }> = [
  { label: "All", value: "all" },
  { label: "Action Required", value: "action_required" },
  { label: "Needs Attention", value: "needs_attention" },
  { label: "In Progress", value: "in_progress" },
  { label: "Completed", value: "completed" },
];

export function InboxPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | DocumentStatus>("all");
  const [sort, setSort] = useState("recent");
  const filteredDocuments = useMemo(() => documents.filter((document) => {
    const matchesQuery = `${document.title} ${document.type}`.toLowerCase().includes(query.toLowerCase());
    return matchesQuery && (filter === "all" || document.status === filter);
  }).sort((a, b) => sort === "name" ? a.title.localeCompare(b.title) : documents.indexOf(a) - documents.indexOf(b)), [filter, query, sort]);

  return <div className="app-page-enter space-y-7"><SectionTitle eyebrow="Your workspace" title="Paper Inbox" copy="Every document that needs your attention, organized in one place." action={<PrimaryButton href="/upload"><Upload aria-hidden="true" className="size-4" />Upload document</PrimaryButton>} />
    <section aria-label="Inbox tools" className="rounded-[14px] bg-white p-3 shadow-[0_0_0_1px_rgba(15,23,42,.065)] sm:p-4"><div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between"><label className="relative min-w-0 flex-1"><span className="sr-only">Search documents</span><Search aria-hidden="true" className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#8a95a6]" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search documents..." className="h-11 w-full rounded-[10px] bg-[#f5f7fa] pl-10 pr-3 text-sm text-[#33425c] outline-none ring-1 ring-transparent transition-[background-color,box-shadow] duration-150 ease-out placeholder:text-[#9aa4b3] focus:bg-white focus:ring-[#9db7ef]" /></label><div className="flex flex-wrap items-center gap-2"><label className="sr-only" htmlFor="inbox-sort">Sort documents</label><div className="relative"><SlidersHorizontal aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-[#7f8b9e]" /><select id="inbox-sort" value={sort} onChange={(event) => setSort(event.target.value)} className="h-11 appearance-none rounded-[10px] bg-[#f5f7fa] pl-9 pr-8 text-xs font-medium text-[#5a6880] outline-none ring-1 ring-transparent focus:bg-white focus:ring-[#9db7ef]"><option value="recent">Recently updated</option><option value="name">Name A–Z</option></select></div><div className="flex items-center gap-1 rounded-[10px] bg-[#f5f7fa] p-1"><ListFilter aria-hidden="true" className="ml-2 size-3.5 text-[#7f8b9e]" />{filters.map(({ label, value }) => <button key={value} type="button" onClick={() => setFilter(value)} className={`min-h-9 rounded-[8px] px-2.5 text-[11px] font-semibold transition-[background-color,color,transform] duration-150 ease-out active:scale-[0.96] ${filter === value ? "bg-white text-[#315fca] shadow-[0_1px_3px_rgba(15,23,42,.1)]" : "text-[#798598] hover:text-[#465674]"}`}>{label}</button>)}</div></div></div></section>

    <section aria-label="Documents list" className="space-y-2.5"><div className="hidden grid-cols-[minmax(0,1.8fr)_minmax(80px,.7fr)_minmax(90px,.8fr)_auto] gap-4 px-4 text-[10px] font-semibold uppercase tracking-[.12em] text-[#98a2b2] sm:grid"><span>Document</span><span>Type</span><span>Deadline</span><span>Status</span></div>{filteredDocuments.length ? filteredDocuments.map((document) => <DocumentRow key={document.id} document={document} />) : <EmptyState title="No documents match that search." copy="Try a different search or filter, or upload a new document." />}</section>
    <p className="text-center text-[11px] text-[#909aaa]">{filteredDocuments.length} of {documents.length} documents shown</p>
  </div>;
}
