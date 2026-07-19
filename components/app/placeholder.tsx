import Link from "next/link";
import { Bot, Settings } from "lucide-react";
import { SecondaryButton } from "./ui";

export function AppPlaceholder({ kind }: { kind: "copilot" | "settings" }) {
  const copilot = kind === "copilot";
  return <div className="app-page-enter mx-auto max-w-2xl rounded-[18px] bg-white p-8 text-center shadow-[0_0_0_1px_rgba(15,23,42,.065)] sm:p-14"><span className="mx-auto flex size-12 items-center justify-center rounded-[12px] bg-[#eaf1ff] text-[#416dcc]">{copilot ? <Bot aria-hidden="true" className="size-5" /> : <Settings aria-hidden="true" className="size-5" />}</span><h1 className="mt-6 text-2xl font-semibold tracking-[-.04em] text-[#233451]">{copilot ? "AI Copilot" : "Settings"}</h1><p className="text-pretty mx-auto mt-3 max-w-md text-sm leading-6 text-[#7c8799]">{copilot ? "PaperPilot Copilot will help you ask questions across your paperwork in a future version." : "Workspace preferences will be available when PaperPilot connects to your account."}</p><div className="mt-7 flex justify-center gap-2"><SecondaryButton href="/dashboard">Back to overview</SecondaryButton>{copilot && <Link href="/upload" className="inline-flex min-h-11 items-center justify-center rounded-[10px] bg-[#245eea] px-4 py-2.5 text-sm font-semibold text-white transition-[background-color,transform] duration-150 ease-out hover:bg-[#1e53dc] active:scale-[0.96]">Upload a document</Link>}</div></div>;
}
