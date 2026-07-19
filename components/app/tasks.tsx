"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Check, ListTodo } from "lucide-react";
import { allTasks, documents, type PaperTask } from "@/lib/mock-data";
import { PrimaryButton, SectionTitle } from "./ui";

type TaskFilter = "all" | "due-soon" | "open" | "completed";

export function TasksPage() {
  const [filter, setFilter] = useState<TaskFilter>("all");
  const [tasks, setTasks] = useState<PaperTask[]>(allTasks);
  const toggle = (id: string) => setTasks((current) => current.map((task) => task.id === id ? { ...task, status: task.status === "completed" ? "open" : "completed" } : task));
  const visible = useMemo(() => tasks.filter((task) => filter === "all" || filter === "due-soon" ? (filter === "due-soon" ? task.status === "open" && /Jul 2[5-9]/.test(task.due) : true) : task.status === filter), [filter, tasks]);
  const openCount = tasks.filter((task) => task.status === "open").length;

  return <div className="app-page-enter space-y-7"><SectionTitle eyebrow="Across your documents" title="Tasks" copy="Everything you need to do across your documents." action={<PrimaryButton href="/upload">Add a document</PrimaryButton>} /><section className="rounded-[14px] bg-white p-3 shadow-[0_0_0_1px_rgba(15,23,42,.065)] sm:p-4"><div className="flex flex-wrap gap-1 rounded-[10px] bg-[#f5f7fa] p-1">{([{ label: "All", value: "all" }, { label: "Due soon", value: "due-soon" }, { label: "Open", value: "open" }, { label: "Completed", value: "completed" }] as const).map((item) => <button key={item.value} type="button" onClick={() => setFilter(item.value)} className={`min-h-10 rounded-[8px] px-3 text-xs font-semibold transition-[background-color,color,transform] duration-150 ease-out active:scale-[0.96] ${filter === item.value ? "bg-white text-[#315fca] shadow-[0_1px_3px_rgba(15,23,42,.1)]" : "text-[#7d8899] hover:text-[#465674]"}`}>{item.label}</button>)}</div><div className="mt-4 flex flex-wrap gap-4 text-xs text-[#7e899a]"><span className="font-semibold text-[#33435f]">{openCount} open tasks</span><span>3 due this week</span></div></section><section aria-label="Task list" className="space-y-2.5">{visible.length ? visible.map((task) => { const document = documents.find((item) => item.id === task.documentId); return <label key={task.id} className="flex cursor-pointer items-start gap-3 rounded-[12px] bg-white p-4 shadow-[0_0_0_1px_rgba(15,23,42,.065)] transition-[background-color,box-shadow] duration-150 ease-out hover:bg-[#fcfdff] hover:shadow-[0_0_0_1px_rgba(37,99,235,.13)]"><input type="checkbox" className="sr-only" checked={task.status === "completed"} onChange={() => toggle(task.id)} /><span className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full ${task.status === "completed" ? "bg-[#eaf7ef] text-[#347c50]" : "text-[#97a3b4]"}`}>{task.status === "completed" ? <Check aria-hidden="true" className="size-3" /> : <ListTodo aria-hidden="true" className="size-4" />}</span><span className="min-w-0 flex-1"><span className={`block text-sm font-medium ${task.status === "completed" ? "text-[#8b95a4] line-through" : "text-[#35445f]"}`}>{task.title}</span><span className="mt-1 flex flex-wrap gap-x-2 text-[11px] text-[#8993a4]"><Link href={`/documents/${task.documentId}`} onClick={(event) => event.stopPropagation()} className="font-medium text-[#5572b6] hover:text-[#245eea]">{document?.title}</Link><span>·</span><span>{task.due}</span></span></span></label>; }) : <div className="rounded-[16px] border border-dashed border-[#cbd7e8] bg-white px-6 py-14 text-center"><h2 className="text-lg font-semibold text-[#2b3b57]">No open tasks.</h2><p className="mt-2 text-sm text-[#7b879a]">You’re all caught up.</p></div>}</section></div>;
}
