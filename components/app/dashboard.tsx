"use client";

import { useState } from "react";
import Link from "next/link";
import { AlertCircle, ArrowRight, CalendarClock, CheckSquare, FileText, ListTodo, Sparkles, Upload } from "lucide-react";
import { documents, upcomingDeadlines, type PaperTask } from "@/lib/mock-data";
import { DeadlineRow, DocumentRow, MetricCard, PrimaryButton, SectionTitle, TaskStatusIcon } from "./ui";

export function Dashboard() {
  const [tasks, setTasks] = useState<PaperTask[]>([
    { id: "dashboard-transcript", title: "Prepare academic transcript", due: "Due Jul 25", status: "open" },
    { id: "dashboard-letter", title: "Request recommendation letter", due: "Due Jul 26", status: "open" },
    { id: "dashboard-id", title: "Upload student ID", due: "Due Jul 29", status: "open" },
  ]);
  const toggleTask = (id: string) => setTasks((current) => current.map((task) => task.id === id ? { ...task, status: task.status === "completed" ? "open" : "completed" } : task));

  return <div className="app-page-enter space-y-8">
    <SectionTitle eyebrow="Monday, July 19" title="Your paperwork, under control." copy="Here’s what needs your attention today." action={<PrimaryButton href="/upload"><Upload aria-hidden="true" className="size-4" />Upload document</PrimaryButton>} />

    <section aria-label="Workspace summary" className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      <MetricCard label="Documents" value="12" detail="Across your Paper Inbox" icon={FileText} />
      <MetricCard label="Upcoming deadlines" value="3" detail="Within the next 7 days" icon={CalendarClock} tone="amber" />
      <MetricCard label="Open tasks" value="7" detail="5 linked to documents" icon={ListTodo} tone="green" />
      <MetricCard label="Need attention" value="2" detail="Review soon" icon={AlertCircle} tone="red" />
    </section>

    <div className="grid gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(300px,.8fr)]">
      <section id="deadlines" className="scroll-mt-24 rounded-[16px] bg-[#f0f4fa] p-4 sm:p-5"><div className="flex items-center justify-between gap-3"><div><h2 className="text-base font-semibold text-[#293a57]">Upcoming deadlines</h2><p className="mt-1 text-xs text-[#7b8799]">The next things worth keeping in view.</p></div><Link href="/dashboard" className="inline-flex min-h-10 items-center gap-1 rounded-[9px] px-2 text-xs font-semibold text-[#3c66c1] transition-[background-color,transform] duration-150 ease-out hover:bg-white active:scale-[0.96]">View all <ArrowRight aria-hidden="true" className="size-3.5" /></Link></div><div className="mt-5 space-y-2.5">{upcomingDeadlines.map((deadline) => <DeadlineRow key={deadline.documentId} {...deadline} />)}</div></section>

      <section className="rounded-[16px] bg-[#eaf1ff] p-5 shadow-[inset_0_0_0_1px_rgba(37,99,235,.08)]"><div className="flex items-center gap-2 text-[#416dcc]"><Sparkles aria-hidden="true" className="size-4" /><span className="text-xs font-semibold uppercase tracking-[.1em]">PaperPilot Insight</span></div><h2 className="text-balance mt-5 text-lg font-semibold leading-6 tracking-[-.025em] text-[#263a61]">You have 3 documents requiring action this week.</h2><p className="text-pretty mt-3 text-sm leading-6 text-[#60708d]">Your scholarship application has the nearest deadline.</p><div className="mt-5 rounded-[11px] bg-white/80 p-3.5"><p className="text-[10px] font-semibold uppercase tracking-[.1em] text-[#7b8bab]">Suggested action</p><p className="mt-1.5 text-sm font-semibold text-[#344d7e]">Review scholarship checklist</p><Link href="/documents/scholarship-application-2026" className="mt-3 inline-flex min-h-10 items-center gap-1 text-xs font-semibold text-[#315fca] transition-[color,transform] duration-150 ease-out hover:text-[#204da9]">Review now <ArrowRight aria-hidden="true" className="size-3.5" /></Link></div></section>
    </div>

    <div className="grid gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(300px,.8fr)]">
      <section className="rounded-[16px] bg-[#f0f4fa] p-4 sm:p-5"><div className="flex items-center justify-between gap-3"><div><h2 className="text-base font-semibold text-[#293a57]">Recent documents</h2><p className="mt-1 text-xs text-[#7b8799]">Your latest paperwork, ready to pick up.</p></div><Link href="/inbox" className="inline-flex min-h-10 items-center gap-1 rounded-[9px] px-2 text-xs font-semibold text-[#3c66c1] transition-[background-color,transform] duration-150 ease-out hover:bg-white active:scale-[0.96]">Open Inbox <ArrowRight aria-hidden="true" className="size-3.5" /></Link></div><div className="mt-5 space-y-2.5">{documents.slice(0, 4).map((document) => <DocumentRow key={document.id} document={document} />)}</div></section>

      <section id="tasks" className="scroll-mt-24 rounded-[16px] bg-white p-5 shadow-[0_0_0_1px_rgba(15,23,42,.065)]"><div className="flex items-center justify-between"><div><h2 className="text-base font-semibold text-[#293a57]">Open tasks</h2><p className="mt-1 text-xs text-[#7b8799]">Small steps toward done.</p></div><CheckSquare aria-hidden="true" className="size-4 text-[#5c78bc]" /></div><div className="mt-5 divide-y divide-[#edf0f4]">{tasks.map((task) => <label key={task.id} className="flex cursor-pointer items-start gap-3 py-3 first:pt-0 last:pb-0"><input type="checkbox" checked={task.status === "completed"} onChange={() => toggleTask(task.id)} className="sr-only" /><TaskStatusIcon completed={task.status === "completed"} /><span className="min-w-0"><span className={`block text-sm font-medium ${task.status === "completed" ? "text-[#8b95a4] line-through" : "text-[#3a4964]"}`}>{task.title}</span><span className="mt-1 block text-[11px] text-[#8a95a4]">{task.due} · Scholarship Application</span></span></label>)}</div></section>
    </div>
  </div>;
}
