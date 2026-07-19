"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Bell, Bot, CalendarClock, CheckSquare, Inbox, LayoutDashboard, Menu, Search, Settings, X } from "lucide-react";
import { Brand } from "@/components/landing/shared";

const primaryNav = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Paper Inbox", href: "/inbox", icon: Inbox },
  { label: "Tasks", href: "/dashboard#tasks", icon: CheckSquare },
  { label: "Deadlines", href: "/dashboard#deadlines", icon: CalendarClock },
];

function SidebarContent({ close }: { close?: () => void }) {
  const pathname = usePathname();
  const isActive = (href: string) => href === "/dashboard" ? pathname === "/dashboard" : href.startsWith("/dashboard") ? pathname === "/dashboard" : pathname.startsWith(href);

  return (
    <div className="flex h-full flex-col px-3 py-4">
      <div className="flex items-center justify-between px-2">
        <Link href="/dashboard" aria-label="PaperPilot overview" onClick={close} className="rounded-[10px]">
          <Brand />
        </Link>
        {close && <button type="button" onClick={close} aria-label="Close navigation" className="flex size-10 items-center justify-center rounded-[9px] text-[#5f6b80] transition-[background-color,transform] duration-150 ease-out hover:bg-[#e8eefb] active:scale-[0.96] lg:hidden"><X aria-hidden="true" className="size-4" /></button>}
      </div>

      <nav aria-label="Application navigation" className="mt-10">
        <p className="px-3 text-[10px] font-semibold uppercase tracking-[.16em] text-[#8994a8]">Workspace</p>
        <div className="mt-3 space-y-1">
          {primaryNav.map(({ label, href, icon: Icon }) => (
            <Link key={label} href={href} onClick={close} className={`app-nav-item flex min-h-11 items-center gap-3 rounded-[10px] px-3 text-sm font-medium transition-[background-color,color,transform] duration-150 ease-out ${isActive(href) ? "bg-[#dfeafd] text-[#245cc7]" : "text-[#5f6b80] hover:bg-[#e8eef8] hover:text-[#263b68]"}`}>
              <Icon aria-hidden="true" className="size-[17px]" />
              <span>{label}</span>
            </Link>
          ))}
        </div>
      </nav>

      <div className="mt-8 border-t border-[#dce4f0] pt-7">
        <p className="px-3 text-[10px] font-semibold uppercase tracking-[.16em] text-[#8994a8]">Assistant</p>
        <button type="button" onClick={() => window.dispatchEvent(new CustomEvent("paperpilot:open-copilot"))} className="app-nav-item mt-3 flex min-h-11 w-full items-center gap-3 rounded-[10px] px-3 text-left text-sm font-medium text-[#5f6b80] transition-[background-color,color,transform] duration-150 ease-out hover:bg-[#e8eef8] hover:text-[#263b68]">
          <Bot aria-hidden="true" className="size-[17px]" />
          <span>AI Copilot</span>
        </button>
      </div>

      <div className="mt-auto space-y-2 border-t border-[#dce4f0] pt-4">
        <button type="button" className="flex min-h-11 w-full items-center gap-3 rounded-[10px] px-3 text-left text-sm text-[#5f6b80] transition-[background-color,color] duration-150 ease-out hover:bg-[#e8eef8] hover:text-[#263b68]"><Settings aria-hidden="true" className="size-[17px]" /><span>Settings</span></button>
        <div className="flex items-center gap-3 rounded-[11px] bg-white/70 p-2.5 shadow-[inset_0_0_0_1px_rgba(37,99,235,.07)]">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#dce8ff] text-[10px] font-semibold text-[#315fca]">AN</span>
          <span className="min-w-0"><span className="block truncate text-xs font-semibold text-[#293750]">Alex Morgan</span><span className="mt-0.5 block text-[10px] text-[#8792a5]">Free plan</span></span>
        </div>
      </div>
    </div>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [copilotOpen, setCopilotOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const openCopilot = () => setCopilotOpen(true);
    window.addEventListener("paperpilot:open-copilot", openCopilot);
    return () => window.removeEventListener("paperpilot:open-copilot", openCopilot);
  }, []);

  useEffect(() => {
    if (!drawerOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setDrawerOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [drawerOpen]);

  return (
    <div className="min-h-screen bg-[#f7f8fb] text-[#17233b]">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[248px] border-r border-[#dce4f0] bg-[#edf3fb] lg:block"><SidebarContent /></aside>

      {drawerOpen && <button type="button" aria-label="Close navigation overlay" onClick={() => setDrawerOpen(false)} className="fixed inset-0 z-40 bg-[#13213d]/25 backdrop-blur-[2px] lg:hidden" />}
      <aside aria-label="Mobile application navigation" aria-hidden={!drawerOpen} className={`fixed inset-y-0 left-0 z-50 w-[min(86vw,320px)] border-r border-[#dce4f0] bg-[#edf3fb] shadow-[16px_0_50px_-28px_rgba(15,23,42,.5)] transition-[transform,visibility] duration-200 [transition-timing-function:var(--ease-out)] lg:hidden ${drawerOpen ? "translate-x-0" : "invisible -translate-x-full"}`}>
        <div ref={(node) => { const button = node?.querySelector("button[aria-label='Close navigation']") as HTMLButtonElement | null; if (button) closeButtonRef.current = button; }} className="h-full"><SidebarContent close={() => setDrawerOpen(false)} /></div>
      </aside>

      <div className="min-h-screen lg:pl-[248px]">
        <header className="sticky top-0 z-30 border-b border-[#e2e7ef] bg-[#f7f8fb]/90 backdrop-blur-xl">
          <div className="mx-auto flex h-[68px] max-w-[1440px] items-center justify-between gap-4 px-5 sm:px-8">
            <div className="flex min-w-0 items-center gap-3">
              <button type="button" aria-label="Open navigation" aria-expanded={drawerOpen} onClick={() => setDrawerOpen(true)} className="flex size-10 shrink-0 items-center justify-center rounded-[9px] bg-white text-[#45536b] shadow-[0_0_0_1px_rgba(15,23,42,.07)] transition-[transform,background-color] duration-150 ease-out hover:bg-[#eef3ff] active:scale-[0.96] lg:hidden"><Menu aria-hidden="true" className="size-4" /></button>
              <div className="hidden min-w-0 items-center gap-2.5 text-sm text-[#69758a] sm:flex"><span className="font-semibold text-[#283752]">Workspace</span><span aria-hidden="true" className="text-[#a5afbd]">/</span><span className="truncate">PaperPilot</span></div>
              <div className="flex min-w-0 items-center gap-2 sm:hidden"><Brand compact /></div>
            </div>
            <div className="flex items-center gap-2">
              <button type="button" aria-label="Search documents" className="hidden h-10 items-center gap-2 rounded-[10px] bg-white px-3 text-xs text-[#929cad] shadow-[0_0_0_1px_rgba(15,23,42,.07)] transition-[background-color,transform] duration-150 ease-out hover:bg-[#f1f5ff] active:scale-[0.96] sm:flex"><Search aria-hidden="true" className="size-4" /><span>Search documents...</span></button>
              <button type="button" aria-label="Search documents" className="flex size-10 items-center justify-center rounded-[9px] bg-white text-[#657187] shadow-[0_0_0_1px_rgba(15,23,42,.07)] transition-[background-color,transform] duration-150 ease-out hover:bg-[#f1f5ff] active:scale-[0.96] sm:hidden"><Search aria-hidden="true" className="size-4" /></button>
              <button type="button" aria-label="Notifications" className="flex size-10 items-center justify-center rounded-[9px] bg-white text-[#657187] shadow-[0_0_0_1px_rgba(15,23,42,.07)] transition-[background-color,transform] duration-150 ease-out hover:bg-[#f1f5ff] active:scale-[0.96]"><Bell aria-hidden="true" className="size-4" /></button>
              <span className="hidden size-9 items-center justify-center rounded-full bg-[#dce8ff] text-[10px] font-semibold text-[#315fca] sm:flex">AN</span>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-[1440px] px-5 py-8 sm:px-8 sm:py-10">{children}</main>
      </div>

      {copilotOpen && <div className="fixed inset-0 z-[60] flex items-end justify-end bg-[#13213d]/20 p-4 sm:items-center sm:p-8"><div role="dialog" aria-modal="true" aria-labelledby="copilot-title" className="w-full max-w-sm rounded-[18px] bg-white p-5 shadow-[0_20px_70px_-30px_rgba(15,23,42,.48)]"><div className="flex items-start justify-between gap-4"><div><span className="flex size-9 items-center justify-center rounded-[9px] bg-[#eaf1ff] text-[#3b67cc]"><Bot aria-hidden="true" className="size-4" /></span><h2 id="copilot-title" className="mt-4 text-base font-semibold text-[#25344f]">Ask PaperPilot</h2><p className="mt-1 text-xs leading-5 text-[#7a8496]">A lightweight prototype entry point.</p></div><button type="button" aria-label="Close AI Copilot" onClick={() => setCopilotOpen(false)} className="flex size-9 items-center justify-center rounded-[9px] text-[#657187] hover:bg-[#f1f4f9] active:scale-[0.96]"><X aria-hidden="true" className="size-4" /></button></div><div className="mt-6 space-y-2">{["What should I do first?", "What am I missing?", "When is the deadline?"].map((question) => <button key={question} type="button" className="flex min-h-10 w-full items-center rounded-[9px] bg-[#f3f6fb] px-3 text-left text-xs font-medium text-[#4a5d7b] transition-[background-color,transform] duration-150 ease-out hover:bg-[#e9f0ff] active:scale-[0.985]">{question}</button>)}</div></div></div>}
    </div>
  );
}
