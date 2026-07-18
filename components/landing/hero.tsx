import {
  ArrowDown,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileText,
  Inbox,
  LayoutDashboard,
  ListTodo,
  Sparkles,
  WandSparkles,
} from "lucide-react";
import { Brand, ButtonLink } from "./shared";

const sidebarItems = [
  [LayoutDashboard, "Overview", true],
  [Inbox, "Paper Inbox", false],
  [ListTodo, "Tasks", false],
  [CalendarDays, "Deadlines", false],
] as const;

const summaries = [
  ["12", "Documents", "blue"],
  ["3", "Upcoming deadlines", "amber"],
  ["7", "Open tasks", "green"],
  ["2", "Need attention", "red"],
] as const;

const deadlines = [
  ["Scholarship Application", "July 28", "3 tasks remaining", "amber"],
  ["Internship Registration", "July 30", "1 task remaining", "blue"],
  ["Internet Bill", "August 2", "Payment required", "red"],
] as const;

function DashboardMockup() {
  return (
    <div className="dashboard-enter relative mx-auto mt-14 max-w-[1100px] px-3 sm:mt-20 sm:px-8 lg:px-12">
      <div className="float-one absolute -left-2 top-[18%] z-20 hidden items-center gap-2 rounded-[10px] bg-white px-3 py-2 text-xs font-semibold text-[#25314a] shadow-[0_0_0_1px_rgba(15,23,42,.08),0_12px_30px_-15px_rgba(15,23,42,.35)] md:flex lg:left-0">
        <CheckCircle2 className="size-4 text-[#2f77e7]" /> Document analyzed
      </div>
      <div className="float-two absolute -right-1 top-[35%] z-20 hidden items-center gap-2 rounded-[10px] bg-white px-3 py-2 text-xs font-semibold text-[#25314a] shadow-[0_0_0_1px_rgba(15,23,42,.08),0_12px_30px_-15px_rgba(15,23,42,.35)] md:flex lg:right-0">
        <WandSparkles className="size-4 text-[#4f46e5]" /> 4 actions generated
      </div>
      <div className="absolute -bottom-4 right-[15%] z-20 hidden items-center gap-2 rounded-[10px] bg-white px-3 py-2 text-xs font-semibold text-[#25314a] shadow-[0_0_0_1px_rgba(15,23,42,.08),0_12px_30px_-15px_rgba(15,23,42,.35)] md:flex">
        <Clock3 className="size-4 text-[#c48526]" /> Deadline detected
      </div>

      <div className="dashboard-shell relative overflow-hidden rounded-[18px] bg-white p-1.5 sm:rounded-[22px] sm:p-2">
        <div className="overflow-hidden rounded-[13px] bg-[#f8f9fc] sm:rounded-[15px]">
          <div className="flex h-10 items-center gap-2 border-b border-black/[.06] bg-white px-4">
            <span className="size-2.5 rounded-full bg-[#ff8b82]" />
            <span className="size-2.5 rounded-full bg-[#f5c65e]" />
            <span className="size-2.5 rounded-full bg-[#65c98c]" />
            <div className="mx-auto mr-[calc(50%-58px)] hidden h-5 w-44 items-center justify-center rounded-md bg-[#f4f5f7] text-[8px] text-[#8a92a0] sm:flex">
              app.paperpilot.ai
            </div>
          </div>

          <div className="grid min-h-[470px] sm:grid-cols-[176px_1fr] lg:min-h-[545px] lg:grid-cols-[205px_1fr]">
            <aside className="hidden border-r border-black/[.06] bg-[#f2f6fd] p-3 sm:block lg:p-4">
              <div className="mb-4 px-2"><Brand compact /></div>
              <div className="space-y-1">
                {sidebarItems.map(([Icon, label, active]) => (
                  <div key={label} className={`flex h-9 items-center gap-2.5 rounded-[8px] px-2.5 text-[10px] font-medium lg:text-[11px] ${active ? "bg-[#dfeafd] text-[#245cc7] shadow-[inset_0_0_0_1px_rgba(37,99,235,.06)]" : "text-[#687287]"}`}>
                    <Icon className="size-3.5" /> {label as string}
                  </div>
                ))}
              </div>
              <div className="mt-5 border-t border-[#dfe5ee] pt-4">
                <div className="flex h-9 items-center gap-2.5 rounded-[8px] px-2.5 text-[10px] font-medium text-[#687287] lg:text-[11px]">
                  <Sparkles className="size-3.5 text-[#4d67dc]" /> AI Copilot
                </div>
              </div>
              <div className="mt-auto pt-36 lg:pt-44">
                <div className="rounded-[10px] bg-white p-2.5 shadow-[0_0_0_1px_rgba(15,23,42,.06)]">
                  <div className="mb-2 h-1.5 w-full overflow-hidden rounded-full bg-[#e8ecf3]"><div className="h-full w-[68%] rounded-full bg-[#3f70e5]" /></div>
                  <p className="text-[8px] font-medium text-[#778092]">3 of 5 analyses used</p>
                </div>
              </div>
            </aside>

            <div className="p-4 sm:p-5 lg:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-medium text-[#788193] lg:text-xs">Good morning, Alex</p>
                  <h3 className="mt-1 text-base font-semibold tracking-[-.035em] text-[#10182a] sm:text-lg lg:text-2xl">Your paperwork, under control.</h3>
                </div>
                <button aria-label="Notifications" className="flex size-9 shrink-0 items-center justify-center rounded-[9px] bg-white text-[#5f6878] shadow-[0_0_0_1px_rgba(15,23,42,.07)] transition-transform duration-150 ease-out active:scale-[0.96]">
                  <span className="relative"><CalendarDays className="size-4" /><span className="absolute -right-1 -top-1 size-1.5 rounded-full bg-[#e8a83e] ring-2 ring-white" /></span>
                </button>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-2 lg:mt-7 lg:grid-cols-4 lg:gap-3">
                {summaries.map(([number, label, tone]) => (
                  <div key={label} className="rounded-[11px] bg-white p-3 shadow-[0_0_0_1px_rgba(15,23,42,.06),0_2px_7px_-5px_rgba(15,23,42,.18)] lg:p-4">
                    <p className="tabular-nums text-lg font-semibold tracking-[-.04em] text-[#131d31] lg:text-2xl">{number}</p>
                    <div className="mt-2 flex items-center gap-1.5">
                      <span className={`size-1.5 rounded-full ${tone === "blue" ? "bg-[#5a83e8]" : tone === "amber" ? "bg-[#d9a343]" : tone === "green" ? "bg-[#56a875]" : "bg-[#d1726c]"}`} />
                      <span className="truncate text-[8px] font-medium text-[#798192] lg:text-[9px]">{label}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-3 grid gap-3 lg:mt-4 lg:grid-cols-[1.45fr_.75fr]">
                <div className="rounded-[12px] bg-white p-3 shadow-[0_0_0_1px_rgba(15,23,42,.06)] lg:p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <h4 className="text-[11px] font-semibold text-[#222c41] lg:text-xs">Upcoming deadlines</h4>
                    <button className="min-h-8 rounded-md px-2 text-[9px] font-semibold text-[#3b68d0]">View all</button>
                  </div>
                  <div className="divide-y divide-black/[.055]">
                    {deadlines.map(([title, date, detail, tone]) => (
                      <div key={title} className="flex items-center gap-2 py-2.5 lg:gap-3 lg:py-3">
                        <div className={`flex size-8 shrink-0 items-center justify-center rounded-[8px] ${tone === "amber" ? "bg-[#fff5df] text-[#b47a1f]" : tone === "blue" ? "bg-[#edf3ff] text-[#3e6bd1]" : "bg-[#fff0ef] text-[#b25d57]"}`}><FileText className="size-3.5" /></div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-[9px] font-semibold text-[#283247] lg:text-[10px]">{title}</p>
                          <p className="mt-0.5 text-[8px] text-[#8a92a0]">{detail}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[8px] font-medium text-[#8a92a0]">Deadline</p>
                          <p className="tabular-nums text-[9px] font-semibold text-[#3d4656] lg:text-[10px]">{date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-[12px] bg-[#edf3ff] p-3 shadow-[inset_0_0_0_1px_rgba(37,99,235,.08)] lg:p-4">
                  <div className="flex size-8 items-center justify-center rounded-[8px] bg-white text-[#4a66db] shadow-[0_0_0_1px_rgba(37,99,235,.08)]"><Sparkles className="size-4" /></div>
                  <p className="mt-3 text-[9px] font-semibold text-[#3159b7] lg:text-[10px]">PaperPilot Insight</p>
                  <p className="text-pretty mt-1.5 text-[10px] font-medium leading-4 text-[#34435f] lg:text-xs lg:leading-5">You have 3 documents requiring action this week.</p>
                  <button className="mt-4 flex min-h-8 items-center gap-1 text-[9px] font-semibold text-[#315fca]">Review actions <span aria-hidden="true">→</span></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative pb-12 pt-32 sm:pb-16 sm:pt-40">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-20 h-[820px] bg-[radial-gradient(ellipse_70%_48%_at_50%_26%,rgba(91,129,245,.18),rgba(154,132,235,.07)_40%,transparent_72%)]" />
      <div aria-hidden="true" className="hero-grid absolute inset-x-0 top-0 -z-10 h-[780px] opacity-65" />
      <div className="mx-auto max-w-5xl px-5 text-center">
        <div className="hero-enter mx-auto inline-flex items-center gap-2 rounded-full bg-white/75 px-3 py-1.5 text-xs font-semibold text-[#315bc0] shadow-[0_0_0_1px_rgba(37,99,235,.13),0_6px_20px_-12px_rgba(37,99,235,.5)] backdrop-blur-md">
          <Sparkles className="size-3.5" aria-hidden="true" /> AI-powered document assistant
        </div>
        <h1 className="hero-enter text-balance mx-auto mt-7 max-w-4xl text-[clamp(3.2rem,7.8vw,6.6rem)] font-semibold leading-[.94] tracking-[-0.065em] text-[#091327]">
          Turn paperwork into action.
        </h1>
        <p className="hero-enter text-balance mx-auto mt-7 max-w-3xl text-[clamp(1.08rem,2vw,1.45rem)] font-medium leading-[1.45] tracking-[-.025em] text-[#3f4a5e]">
          PaperPilot understands your documents, finds what matters, and tells you what to do next.
        </p>
        <p className="hero-enter text-pretty mx-auto mt-4 max-w-2xl text-sm leading-6 text-[#6d7584] sm:text-base sm:leading-7">
          Upload a document, screenshot, or PDF. PaperPilot finds deadlines, required documents, important details, and turns them into actionable tasks.
        </p>
        <div className="hero-enter mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ButtonLink href="#pricing" className="w-full sm:w-auto">Start organizing for free <span aria-hidden="true">→</span></ButtonLink>
          <ButtonLink href="#how-it-works" variant="secondary" className="w-full sm:w-auto">See how it works <ArrowDown className="size-4" /></ButtonLink>
        </div>
        <p className="hero-enter mt-3 text-xs font-medium text-[#858c99]">No credit card required</p>
      </div>
      <DashboardMockup />
    </section>
  );
}
