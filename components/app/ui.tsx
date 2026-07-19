import Link from "next/link";
import { ArrowRight, Check, Clock3, FileText, AlertCircle, Circle } from "lucide-react";
import { getTaskStats, type DocumentStatus, type PaperDocument } from "@/lib/mock-data";

export const statusLabels: Record<DocumentStatus, string> = {
  action_required: "Action Required",
  needs_attention: "Needs Attention",
  in_progress: "In Progress",
  completed: "Completed",
  upcoming: "Upcoming",
};

export function StatusBadge({ status }: { status: DocumentStatus }) {
  const styles: Record<DocumentStatus, string> = {
    action_required: "bg-[#fff4df] text-[#9d6a1d]",
    needs_attention: "bg-[#fff0ef] text-[#a34c45]",
    in_progress: "bg-[#edf3ff] text-[#3c65bf]",
    completed: "bg-[#eaf7ef] text-[#347c50]",
    upcoming: "bg-[#f0f3f7] text-[#667287]",
  };
  return <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold ${styles[status]}`}><span aria-hidden="true" className="size-1.5 rounded-full bg-current" />{statusLabels[status]}</span>;
}

export function SectionTitle({ eyebrow, title, copy, action }: { eyebrow?: string; title: string; copy?: string; action?: React.ReactNode }) {
  return <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><div className="flex items-center gap-2">{eyebrow && <span className="text-[10px] font-semibold uppercase tracking-[.16em] text-[#4e70c7]">{eyebrow}</span>}</div><h1 className="text-balance mt-2 text-[clamp(1.8rem,3.5vw,2.45rem)] font-semibold leading-[1.06] tracking-[-.045em] text-[#1b2943]">{title}</h1>{copy && <p className="text-pretty mt-3 max-w-2xl text-sm leading-6 text-[#707b8e]">{copy}</p>}</div>{action}</div>;
}

export function PrimaryButton({ href, children, className = "", onClick }: { href?: string; children: React.ReactNode; className?: string; onClick?: () => void }) {
  const styles = `inline-flex min-h-11 items-center justify-center gap-2 rounded-[10px] bg-[#245eea] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_6px_16px_-9px_rgba(37,99,235,.68)] transition-[transform,background-color,box-shadow] duration-150 ease-out hover:bg-[#1e53dc] hover:-translate-y-px active:scale-[0.96] ${className}`;
  return href ? <Link href={href} className={styles} onClick={onClick}>{children}</Link> : <button type="button" onClick={onClick} className={styles}>{children}</button>;
}

export function SecondaryButton({ href, children, className = "", onClick }: { href?: string; children: React.ReactNode; className?: string; onClick?: () => void }) {
  const styles = `inline-flex min-h-11 items-center justify-center gap-2 rounded-[10px] bg-white px-4 py-2.5 text-sm font-semibold text-[#33425e] shadow-[0_0_0_1px_rgba(15,23,42,.1),0_2px_5px_-3px_rgba(15,23,42,.18)] transition-[transform,background-color,box-shadow] duration-150 ease-out hover:bg-[#f4f7fb] hover:-translate-y-px active:scale-[0.96] ${className}`;
  return href ? <Link href={href} className={styles} onClick={onClick}>{children}</Link> : <button type="button" onClick={onClick} className={styles}>{children}</button>;
}

export function DocumentIcon({ type }: { type: string }) {
  const tone = type === "Bill" ? "bg-[#fff4df] text-[#ae7624]" : type === "Contract" ? "bg-[#edf7f0] text-[#398058]" : "bg-[#edf3ff] text-[#416dcc]";
  return <span className={`flex size-10 shrink-0 items-center justify-center rounded-[10px] ${tone}`}><FileText aria-hidden="true" className="size-4.5" /></span>;
}

export function DocumentRow({ document }: { document: PaperDocument }) {
  const stats = getTaskStats(document);
  return <Link href={`/documents/${document.id}`} className="group flex min-w-0 flex-col gap-3 rounded-[12px] bg-white p-4 shadow-[0_0_0_1px_rgba(15,23,42,.065)] transition-[transform,box-shadow,background-color] duration-180 ease-out hover:-translate-y-px hover:bg-[#fcfdff] hover:shadow-[0_0_0_1px_rgba(37,99,235,.14),0_8px_22px_-18px_rgba(37,99,235,.35)] sm:grid sm:grid-cols-[minmax(0,1.7fr)_minmax(80px,.65fr)_minmax(110px,.8fr)_auto] sm:items-center sm:gap-4"><div className="flex min-w-0 items-center gap-3"><DocumentIcon type={document.type} /><span className="min-w-0"><span className="block truncate text-sm font-semibold text-[#2c3a55] group-hover:text-[#245eea]">{document.title}</span><span className="mt-1 block truncate text-[11px] text-[#8993a4]">{document.type} · Updated {document.updatedAt}</span></span></div><span className="hidden text-xs text-[#68758a] sm:block">{document.deadlineLabel?.replace("Due ", "—") ?? "No deadline"}</span><span className="text-xs text-[#68758a] sm:block">{stats.total ? `${stats.completed} / ${stats.total} complete` : "No tasks"}</span><StatusBadge status={document.status} /></Link>;
}

export function ProgressText({ document }: { document: PaperDocument }) {
  const stats = getTaskStats(document);
  return <span className="text-xs text-[#68758a]">{stats.total ? `${stats.completed} / ${stats.total} complete` : "No tasks"}</span>;
}

export function DeadlineRow({ title, due, detail, status, documentId }: { title: string; due: string; detail: string; status: DocumentStatus; documentId: string }) {
  return <Link href={`/documents/${documentId}`} className="group flex items-center gap-3 rounded-[11px] bg-white p-4 shadow-[0_0_0_1px_rgba(15,23,42,.065)] transition-[transform,box-shadow,background-color] duration-180 ease-out hover:-translate-y-px hover:bg-[#fcfdff] hover:shadow-[0_0_0_1px_rgba(37,99,235,.14),0_8px_22px_-18px_rgba(37,99,235,.35)]"><span className={`h-10 w-1 shrink-0 rounded-full ${status === "action_required" ? "bg-[#d69b3e]" : status === "in_progress" ? "bg-[#5d82dc]" : "bg-[#9aa7ba]"}`} /><span className="min-w-0 flex-1"><span className="block truncate text-sm font-semibold text-[#33415b] group-hover:text-[#245eea]">{title}</span><span className="mt-1 block text-[11px] text-[#8792a3]">Due {due} · {detail}</span></span><StatusBadge status={status} /></Link>;
}

export function MetricCard({ label, value, detail, icon: Icon, tone = "blue" }: { label: string; value: string; detail: string; icon: React.ComponentType<{ className?: string; 'aria-hidden'?: boolean }>; tone?: "blue" | "amber" | "green" | "red" }) {
  const tones = { blue: "bg-[#edf3ff] text-[#416dcc]", amber: "bg-[#fff4df] text-[#ae7624]", green: "bg-[#eaf7ef] text-[#398058]", red: "bg-[#fff0ef] text-[#ad5952]" };
  return <div className="rounded-[13px] bg-white p-4 shadow-[0_0_0_1px_rgba(15,23,42,.065)]"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-medium text-[#7d8899]">{label}</p><p className="tabular-nums mt-2 text-2xl font-semibold tracking-[-.045em] text-[#20304c]">{value}</p></div><span className={`flex size-9 items-center justify-center rounded-[9px] ${tones[tone]}`}><Icon aria-hidden={true} className="size-4" /></span></div><p className="mt-3 text-[11px] text-[#8a94a4]">{detail}</p></div>;
}

export function EmptyState({ title = "Your Paper Inbox is empty.", copy = "Upload your first document and PaperPilot will turn it into clear next steps." }: { title?: string; copy?: string }) {
  return <div className="rounded-[16px] border border-dashed border-[#cbd7e8] bg-white px-6 py-14 text-center"><span className="mx-auto flex size-11 items-center justify-center rounded-[11px] bg-[#edf3ff] text-[#416dcc]"><InboxIcon /></span><h2 className="mt-5 text-lg font-semibold text-[#2b3b57]">{title}</h2><p className="text-pretty mx-auto mt-2 max-w-sm text-sm leading-6 text-[#7b879a]">{copy}</p><PrimaryButton href="/upload" className="mt-6">Upload document <ArrowRight aria-hidden="true" className="size-4" /></PrimaryButton></div>;
}

function InboxIcon() { return <FileText aria-hidden="true" className="size-5" />; }

export function TaskStatusIcon({ completed }: { completed: boolean }) {
  return completed ? <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#eaf7ef] text-[#347c50]"><Check aria-hidden="true" className="size-3" /></span> : <span className="flex size-5 shrink-0 items-center justify-center rounded-full text-[#9aa5b5]"><Circle aria-hidden="true" className="size-5" /></span>;
}

export function DeadlineIcon() { return <Clock3 aria-hidden="true" className="size-3.5" />; }

export function WarningIcon() { return <AlertCircle aria-hidden="true" className="size-4" />; }
