import {
  ArrowRight,
  Bell,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileImage,
  FileText,
  Files,
  FolderOpen,
  GraduationCap,
  House,
  Inbox,
  ListChecks,
  LockKeyhole,
  Mail,
  MessageSquareText,
  Paperclip,
  ReceiptText,
  ScanText,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  UploadCloud,
  UserCheck,
  WandSparkles,
} from "lucide-react";
import { ArrowLink, SectionHeading, StatusPill } from "./shared";

const benefits = [
  [ScanText, "Understand faster"],
  [CalendarDays, "Never miss deadlines"],
  [ListChecks, "Know what to do next"],
  [Inbox, "Keep every document organized"],
];

export function TrustStrip() {
  return (
    <section aria-label="PaperPilot benefits" className="mx-auto max-w-[1180px] px-5 py-8 sm:py-10">
      <div className="section-rule mb-9 h-px" />
      <div data-reveal className="reveal-on-scroll grid grid-cols-2 gap-x-4 gap-y-7 lg:grid-cols-4">
        {benefits.map(([Icon, label]) => (
          <div key={label as string} className="flex items-center gap-3 lg:justify-center">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-[9px] bg-[#eef3ff] text-[#3765ce]"><Icon className="size-4" /></span>
            <span className="text-pretty text-sm font-semibold text-[#3d4655]">{label as string}</span>
          </div>
        ))}
      </div>
      <div className="section-rule mt-9 h-px" />
    </section>
  );
}

const beforeItems = [
  [FileText, "PDF"],
  [Mail, "Email"],
  [FileImage, "Screenshot"],
  [Files, "Form"],
];

const afterItems = [
  [ScanText, "Clear summary"],
  [CalendarDays, "Detected deadline"],
  [FolderOpen, "Required documents"],
  [ListChecks, "Action checklist"],
];

export function ProblemSolution() {
  return (
    <section id="product" className="py-16 sm:py-20">
      <div className="mx-auto max-w-[1180px] px-5">
        <SectionHeading
          eyebrow="Less paperwork. More clarity."
          title="Documents shouldn't leave you wondering what to do next."
          copy="Important information is scattered across PDFs, emails, screenshots, letters, and forms. Reading is rarely the hard part. Knowing what it means for you is."
          className="max-w-4xl"
        />

        <div className="mt-14 grid items-stretch gap-4 lg:grid-cols-[1fr_72px_1fr] lg:gap-0">
          <div data-reveal className="reveal-on-scroll reveal-from-left rounded-[18px] bg-[#f1f2f4] p-5 shadow-[inset_0_0_0_1px_rgba(15,23,42,.055)] sm:p-7 lg:rounded-r-none">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-[#5f6673]">Before PaperPilot</p>
              <StatusPill tone="red">Scattered</StatusPill>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-2">
              {beforeItems.map(([Icon, label], index) => (
                <div key={label as string} data-reveal className="reveal-on-scroll reveal-scale flex min-h-20 items-center gap-3 rounded-[11px] bg-white px-4 text-sm font-medium text-[#606876] shadow-[0_0_0_1px_rgba(15,23,42,.055)]" style={{ transitionDelay: `${index * 55}ms` }}>
                  <Icon className="size-4.5 text-[#8a919d]" /> {label as string}
                </div>
              ))}
            </div>
            <div className="mt-5 grid gap-2 text-sm text-[#757c87] sm:grid-cols-2">
              {["Confusing information", "Hidden deadlines", "Manual notes", "Forgotten actions"].map((item) => (
                <p key={item} className="flex items-center gap-2"><span className="size-1.5 rounded-full bg-[#b8bdc5]" />{item}</p>
              ))}
            </div>
          </div>

          <div className="relative z-10 flex items-center justify-center py-1 lg:py-0">
            <div className="flex size-12 rotate-90 items-center justify-center rounded-full bg-[#245eea] text-white shadow-[0_8px_20px_-8px_rgba(37,99,235,.7)] lg:rotate-0">
              <ArrowRight className="size-5" />
            </div>
          </div>

          <div data-reveal className="reveal-on-scroll reveal-from-right rounded-[18px] bg-[#eef4ff] p-5 shadow-[inset_0_0_0_1px_rgba(37,99,235,.09)] sm:p-7 lg:rounded-l-none">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-[#274c9f]">With PaperPilot</p>
              <StatusPill tone="green">Clear</StatusPill>
            </div>
            <div className="mt-6 space-y-2.5">
              {afterItems.map(([Icon, label], index) => (
                <div key={label as string} data-reveal className="reveal-on-scroll reveal-scale surface-interactive flex min-h-[60px] items-center gap-3 rounded-[11px] bg-white px-4" style={{ transitionDelay: `${index * 65}ms` }}>
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-[8px] bg-[#e9f0ff] text-[#3767d3]"><Icon className="size-4" /></span>
                  <span className="flex-1 text-sm font-semibold text-[#344157]">{label as string}</span>
                  {index === 1 ? <StatusPill tone="amber">July 28</StatusPill> : <CheckCircle2 className="size-4 text-[#4e9d6d]" />}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-4 border-y border-black/[.07] py-8 sm:grid-cols-2 lg:grid-cols-4">
          {["What does this mean for me?", "What do I need to prepare?", "When is the deadline?", "What should I do next?"].map((question, index) => (
            <p key={question} className="text-balance flex gap-3 text-sm font-semibold leading-6 text-[#4f5868]"><span className="tabular-nums text-[#3f6dd5]">0{index + 1}</span>{question}</p>
          ))}
        </div>
      </div>
    </section>
  );
}

function UploadPreview() {
  return (
    <div className="upload-preview surface h-full w-full rounded-[17px] bg-white p-2">
      <div className="h-full rounded-[11px] bg-[#f7f9fc] p-5 text-center shadow-[inset_0_0_0_1px_rgba(37,99,235,.1)] sm:p-7">
        <div className="mx-auto flex size-11 items-center justify-center rounded-[11px] bg-white text-[#3769d6] shadow-[0_0_0_1px_rgba(37,99,235,.09),0_5px_15px_-8px_rgba(37,99,235,.5)]"><UploadCloud className="size-5" /></div>
        <p className="mt-4 text-sm font-semibold text-[#2d384b]">Drop your document here</p>
        <p className="mt-1 text-xs text-[#8a92a0]">PDF, PNG, JPG, or paste text</p>
        <div className="upload-file mx-auto mt-5 flex max-w-[250px] items-center gap-2 rounded-[9px] bg-white px-3 py-2 text-left shadow-[0_0_0_1px_rgba(15,23,42,.06)]">
          <FileText className="size-4 text-[#4e72d5]" />
          <div className="min-w-0 flex-1"><p className="truncate text-[10px] font-semibold text-[#394356]">scholarship-2026.pdf</p><p className="text-[8px] text-[#9299a5]">2.4 MB</p></div>
          <CheckCircle2 className="size-4 text-[#4d9b6c]" />
        </div>
      </div>
    </div>
  );
}

function AnalysisPreview() {
  return (
    <div className="analysis-preview surface h-full w-full rounded-[17px] bg-white p-5 sm:p-6">
      <div className="flex items-center gap-2 text-xs font-semibold text-[#355fc1]"><Sparkles className="size-4" /> Analysis complete</div>
      <div className="analysis-details mt-5 grid grid-cols-2 gap-x-4 gap-y-5">
        <div className="col-span-2 border-b border-black/[.06] pb-4"><p className="text-[10px] font-medium text-[#8c93a0]">Document type</p><p className="mt-1 text-sm font-semibold text-[#2b3548]">Scholarship Application</p></div>
        <div><p className="text-[10px] font-medium text-[#8c93a0]">Deadline</p><p className="tabular-nums mt-1 text-sm font-semibold text-[#2b3548]">July 28, 2026</p></div>
        <div><p className="text-[10px] font-medium text-[#8c93a0]">Urgency</p><div className="mt-1"><StatusPill tone="amber">High</StatusPill></div></div>
        <div className="col-span-2"><p className="text-[10px] font-medium text-[#8c93a0]">Required</p><div className="mt-2 flex flex-wrap gap-1.5">{["KTM", "KTP", "Transcript"].map((item) => <StatusPill key={item}>{item}</StatusPill>)}</div></div>
      </div>
    </div>
  );
}

const tasks = ["Prepare KTM", "Download transcript", "Request recommendation letter", "Complete application", "Submit before deadline"];

function ChecklistPreview({ compact = false }: { compact?: boolean }) {
  return (
    <div className="checklist-preview surface h-full w-full rounded-[17px] bg-white p-5 sm:p-6">
      <div className="flex items-center justify-between"><p className="text-xs font-semibold text-[#2d384b]">Generated checklist</p><span className="tabular-nums text-[10px] font-medium text-[#8b92a0]">0 / 5</span></div>
      <div className="mt-4 divide-y divide-black/[.055]">
        {tasks.slice(0, compact ? 4 : 5).map((task, index) => (
          <div key={task} className="checklist-item flex min-h-10 items-center gap-3 py-2">
            <span className="flex size-5 shrink-0 items-center justify-center rounded-[6px] shadow-[inset_0_0_0_1px_rgba(15,23,42,.12)]"><span className={index === 0 ? "size-2 rounded-[2px] bg-[#5a7fe0]" : ""} /></span>
            <span className="text-[11px] font-medium text-[#4b5566] sm:text-xs">{task}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const steps = [
  { number: "01", title: "Drop your paperwork", copy: "Upload a PDF, image, screenshot, or paste the text directly.", visual: <UploadPreview /> },
  { number: "02", title: "PaperPilot understands it", copy: "The important context, dates, requirements, and urgency are identified for you.", visual: <AnalysisPreview /> },
  { number: "03", title: "Know exactly what to do", copy: "Requirements become a practical checklist you can start completing immediately.", visual: <ChecklistPreview compact /> },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-[#f4f6fa] pb-12 pt-16 sm:pb-12 sm:pt-20">
      <div className="mx-auto max-w-[1180px] px-5">
        <SectionHeading title="From paperwork to done." copy="PaperPilot turns any document into a clear plan in three simple steps." />
        <div className="mt-16 grid items-stretch gap-12 lg:grid-cols-3 lg:gap-7">
          {steps.map((step, index) => (
            <article key={step.number} data-reveal className="reveal-on-scroll flex flex-col" style={{ transitionDelay: `${index * 110}ms` }}>
              <div className="mb-6 flex items-center gap-4">
                <span className="tabular-nums text-xs font-semibold tracking-[.12em] text-[#3d68cd]">STEP {step.number}</span>
                <span className="h-px flex-1 bg-black/[.08]" />
              </div>
              <h3 className="text-balance text-2xl font-semibold tracking-[-.04em] text-[#111a2e]">{step.title}</h3>
              <p className="text-pretty mt-3 min-h-12 text-sm leading-6 text-[#687181]">{step.copy}</p>
              <div data-reveal className={`step-visual reveal-on-scroll mt-7 flex-1 lg:flex lg:min-h-[375px] ${step.number === "02" ? "reveal-from-left" : "reveal-from-right"}`} style={{ transitionDelay: `${index * 110 + 100}ms` }}>{step.visual}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function DocumentAnalysis() {
  return (
    <section id="features" className="bg-[#f4f6fa] pb-16 pt-12 sm:pb-20 sm:pt-12">
      <div className="mx-auto grid max-w-[1180px] items-center gap-14 px-5 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[.18em] text-[#3b67cf]">Document intelligence</p>
          <h2 className="text-balance mt-5 text-[clamp(2.2rem,4.5vw,4.15rem)] font-semibold leading-[1.02] tracking-[-.055em]">The answer to: “What am I supposed to do?”</h2>
          <p className="text-pretty mt-6 max-w-xl text-base leading-7 text-[#646d7d]">PaperPilot extracts meaning, requirements, and priority into one calm view—so the next decision is obvious.</p>
          <ArrowLink href="#pricing">Analyze your first document</ArrowLink>
        </div>
        <div data-reveal className="reveal-on-scroll reveal-from-right dashboard-shell rounded-[20px] bg-white p-2">
          <div className="rounded-[14px] bg-[#f8f9fc] p-4 sm:p-6">
            <div className="flex flex-col gap-4 border-b border-black/[.06] pb-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3"><span className="flex size-10 items-center justify-center rounded-[10px] bg-[#eaf1ff] text-[#3a67cf]"><FileText className="size-5" /></span><div><h3 className="text-sm font-semibold text-[#263247]">Scholarship Application 2026</h3><p className="mt-0.5 text-[10px] text-[#858d9b]">Analyzed just now</p></div></div><StatusPill tone="amber">High priority</StatusPill>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-[11px] bg-white p-4 shadow-[0_0_0_1px_rgba(15,23,42,.06)] sm:col-span-2"><p className="text-[10px] font-semibold uppercase tracking-[.1em] text-[#7f8794]">What is this?</p><p className="mt-2 text-sm font-medium leading-6 text-[#3d485a]">A scholarship application for active university students.</p></div>
              <div className="rounded-[11px] bg-white p-4 shadow-[0_0_0_1px_rgba(15,23,42,.06)]"><p className="text-[10px] font-semibold uppercase tracking-[.1em] text-[#7f8794]">Deadline</p><p className="tabular-nums mt-2 text-lg font-semibold text-[#25334c]">July 28, 2026</p></div>
              <div className="rounded-[11px] bg-white p-4 shadow-[0_0_0_1px_rgba(15,23,42,.06)]"><p className="text-[10px] font-semibold uppercase tracking-[.1em] text-[#7f8794]">What you need</p><div className="mt-2 flex flex-wrap gap-1.5">{["KTM", "KTP", "Transcript"].map(item => <StatusPill key={item}>{item}</StatusPill>)}</div></div>
              <div className="rounded-[11px] bg-white p-4 shadow-[0_0_0_1px_rgba(15,23,42,.06)] sm:col-span-2"><p className="text-[10px] font-semibold uppercase tracking-[.1em] text-[#7f8794]">Next actions</p><div className="mt-3 grid gap-2 sm:grid-cols-3">{["Prepare documents", "Complete application", "Submit before deadline"].map((item, index) => <div key={item} className="flex items-center gap-2 text-[11px] font-medium text-[#4a5567]"><span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#ebf1ff] text-[9px] font-semibold text-[#3c67cb]">{index + 1}</span>{item}</div>)}</div></div>
            </div>
            <button className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-[10px] bg-[#245eea] px-4 text-sm font-semibold text-white shadow-[0_6px_16px_-8px_rgba(37,99,235,.7)] transition-[transform,background-color] duration-150 ease-out hover:bg-[#1e53dc] active:scale-[0.96]"><ListChecks className="size-4" /> Create checklist</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function DocumentToActions() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-[1180px] px-5">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div className="order-2 lg:order-1">
            <div data-reveal className="reveal-on-scroll reveal-from-left surface rounded-[20px] bg-white p-4 sm:p-6">
              <div className="flex items-center gap-3 rounded-[12px] bg-[#f6f8fb] p-4 shadow-[inset_0_0_0_1px_rgba(15,23,42,.05)]"><span className="flex size-10 items-center justify-center rounded-[9px] bg-white text-[#456bc9] shadow-[0_0_0_1px_rgba(15,23,42,.06)]"><FileText className="size-5" /></span><div className="min-w-0"><p className="truncate text-xs font-semibold text-[#354054]">Internship Registration.pdf</p><p className="mt-1 text-[9px] text-[#8c94a1]">8 pages · uploaded today</p></div></div>
              <div className="my-4 flex items-center gap-3"><span className="story-line h-px flex-1 bg-black/[.07]" /><div className="flex items-center gap-2 rounded-full bg-[#edf3ff] px-3 py-1.5 text-[10px] font-semibold text-[#3d64c1]"><WandSparkles className="size-3.5" /> AI understanding</div><span className="story-line h-px flex-1 bg-black/[.07]" /></div>
              <div className="rounded-[12px] bg-[#f3f7ff] p-4 shadow-[inset_0_0_0_1px_rgba(37,99,235,.07)]">
                <div className="mb-3 flex items-center justify-between"><p className="text-xs font-semibold text-[#344362]">Generated tasks</p><StatusPill tone="blue">4 actions</StatusPill></div>
                 <div className="story-tasks space-y-2">{["Upload student ID", "Complete registration form", "Ask supervisor for signature", "Submit before July 30"].map((task, index) => <div key={task} className="flex min-h-11 items-center gap-3 rounded-[9px] bg-white px-3 shadow-[0_0_0_1px_rgba(15,23,42,.05)]"><span className="flex size-5 items-center justify-center rounded-[5px] shadow-[inset_0_0_0_1px_rgba(15,23,42,.12)]" /><p className="flex-1 text-[11px] font-medium text-[#475266]">{task}</p>{index === 3 && <Clock3 className="size-3.5 text-[#bd7b25]" />}</div>)}</div>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <p className="text-xs font-semibold uppercase tracking-[.18em] text-[#3b67cf]">Document → Understand → Act</p>
            <h2 className="text-balance mt-5 text-[clamp(2.2rem,4.5vw,4.15rem)] font-semibold leading-[1.02] tracking-[-.055em]">Your paperwork finally has a to-do list.</h2>
            <p className="text-pretty mt-6 max-w-xl text-base leading-7 text-[#646d7d]">PaperPilot doesn&apos;t stop at a summary. It turns what the document asks for into work you can see, finish, and track.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function DeadlineSpotlight() {
  const deadlines = [
    ["Today", "Submit revised proposal", "red"],
    ["Tomorrow", "Internet payment", "amber"],
    ["July 28", "Scholarship application", "blue"],
  ] as const;
  return (
    <section className="bg-[#101a34] py-16 text-white sm:py-20">
      <div className="mx-auto grid max-w-[1180px] items-center gap-14 px-5 lg:grid-cols-[.9fr_1.1fr] lg:gap-20">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[.18em] text-[#91aff9]">Deadline control</p>
          <h2 className="text-balance mt-5 text-[clamp(2.2rem,4.5vw,4.1rem)] font-semibold leading-[1.03] tracking-[-.055em]">Never let an important deadline disappear inside a PDF.</h2>
          <p className="text-pretty mt-6 max-w-xl text-base leading-7 text-[#aeb8cd]">Dates are surfaced, organized by urgency, and connected to the work they depend on.</p>
        </div>
        <div className="rounded-[20px] bg-white/[.055] p-2 shadow-[inset_0_0_0_1px_rgba(255,255,255,.1),0_28px_70px_-30px_rgba(0,0,0,.65)]">
          <div className="rounded-[14px] bg-[#f8f9fc] p-5 text-[#111a2e] sm:p-7">
            <div className="flex items-center justify-between"><div><p className="text-[10px] font-medium text-[#858d9a]">Upcoming</p><h3 className="mt-1 text-xl font-semibold tracking-[-.04em]">Deadlines</h3></div><button aria-label="Search deadlines" className="flex size-10 items-center justify-center rounded-[9px] bg-white text-[#667080] shadow-[0_0_0_1px_rgba(15,23,42,.07)] transition-transform duration-150 ease-out active:scale-[0.96]"><Search className="size-4" /></button></div>
            <div className="motion-stagger mt-6 space-y-2.5">{deadlines.map(([date, task, tone], index) => <div key={task} data-reveal className={`reveal-on-scroll reveal-from-right surface-interactive flex items-center gap-4 rounded-[11px] bg-white p-4 ${index === 0 ? "deadline-attention" : ""}`}><span className={`h-10 w-1 rounded-full ${tone === "red" ? "bg-[#d67d75]" : tone === "amber" ? "bg-[#d9a24b]" : "bg-[#5780df]"}`} /><div className="flex-1"><p className="text-[10px] font-semibold uppercase tracking-[.08em] text-[#8a92a0]">{date}</p><p className="mt-1 text-sm font-semibold text-[#354055]">{task}</p></div><StatusPill tone={tone}>{tone === "red" ? "Action required" : tone === "amber" ? "Due soon" : "Upcoming"}</StatusPill></div>)}</div>
            <div className="mt-5 rounded-[10px] bg-[#edf3ff] p-3 text-xs font-medium text-[#3d5d9f] shadow-[inset_0_0_0_1px_rgba(37,99,235,.07)]"><span className="mr-2">✦</span>PaperPilot has grouped 6 related tasks around these deadlines.</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function AiCopilot() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-[1180px] px-5">
        <SectionHeading eyebrow="Ask PaperPilot" title="Your documents. One conversation." copy="Ask across your paperwork and get answers grounded in the documents already in your workspace." />
        <div data-reveal className="reveal-on-scroll reveal-scale dashboard-shell mx-auto mt-14 max-w-4xl rounded-[20px] bg-white p-2">
          <div className="overflow-hidden rounded-[14px] bg-[#f7f9fc]">
            <div className="flex items-center justify-between border-b border-black/[.06] bg-white px-4 py-3 sm:px-5"><div className="flex items-center gap-3"><span className="flex size-9 items-center justify-center rounded-[9px] bg-[#eaf1ff] text-[#426bd1]"><Sparkles className="size-4" /></span><div><p className="text-xs font-semibold text-[#2e394d]">PaperPilot Copilot</p><p className="text-[9px] text-[#87909d]">Connected to 12 documents</p></div></div><StatusPill tone="green">Ready</StatusPill></div>
            <div className="copilot-sequence mx-auto max-w-2xl space-y-5 p-4 sm:p-8">
              <div className="copilot-user ml-auto max-w-[85%] rounded-[14px] rounded-br-[5px] bg-[#245eea] px-4 py-3 text-sm font-medium leading-6 text-white shadow-[0_7px_18px_-10px_rgba(37,99,235,.7)]">What should I take care of this week?</div>
              <div className="copilot-answer flex items-start gap-3"><span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-[8px] bg-[#eaf1ff] text-[#4069cd]"><Sparkles className="size-3.5" /></span><div className="min-w-0 flex-1 rounded-[14px] rounded-tl-[5px] bg-white p-4 shadow-[0_0_0_1px_rgba(15,23,42,.06)]"><p className="text-sm font-semibold text-[#334054]">You have 3 priorities:</p><div className="copilot-priorities mt-4 divide-y divide-black/[.055]">{[["1", "Submit your proposal revision", "Due today", "red"], ["2", "Complete your scholarship application", "Missing: Academic transcript", "amber"], ["3", "Pay your internet bill", "Due tomorrow", "blue"]].map(([number, title, detail, tone]) => <div key={number} className="flex gap-3 py-3 first:pt-0 last:pb-0"><span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#eef3ff] text-[10px] font-semibold text-[#4067c5]">{number}</span><div><p className="text-xs font-semibold text-[#3c475a]">{title}</p><p className={`mt-1 text-[10px] font-medium ${tone === "red" ? "text-[#b45e56]" : tone === "amber" ? "text-[#aa7524]" : "text-[#4a69b4]"}`}>{detail}</p></div></div>)}</div></div></div>
              <button className="copilot-suggestion ml-11 inline-flex min-h-10 items-center gap-2 rounded-[9px] bg-[#edf3ff] px-3 text-[11px] font-semibold text-[#3e64be] transition-[transform,background-color] duration-150 ease-out hover:bg-[#e4edff] active:scale-[0.96]"><Bell className="size-3.5" /> Create reminders for all deadlines</button>
            </div>
            <div className="border-t border-black/[.06] bg-white p-3 sm:p-4"><div className="mx-auto flex max-w-2xl items-center gap-2 rounded-[11px] bg-[#f7f8fa] p-1.5 pl-4 shadow-[inset_0_0_0_1px_rgba(15,23,42,.08)]"><Paperclip className="size-4 text-[#7d8694]" /><span className="flex-1 text-xs text-[#9299a4]">Ask about your paperwork...</span><button aria-label="Send message" className="flex size-9 shrink-0 items-center justify-center rounded-[9px] bg-[#245eea] text-white transition-[transform,background-color] duration-150 ease-out hover:bg-[#1f54d8] active:scale-[0.96]"><Send className="size-4" /></button></div></div>
          </div>
        </div>
      </div>
    </section>
  );
}

const useCases = [
  { icon: GraduationCap, title: "Students", items: ["Scholarships", "Campus administration", "Internships", "Competitions"], tone: "bg-[#eaf1ff] text-[#3d67c9]" },
  { icon: BriefcaseBusiness, title: "Professionals", items: ["HR documents", "Work contracts", "Applications", "Company forms"], tone: "bg-[#edf7f0] text-[#3f865b]" },
  { icon: House, title: "Everyday Life", items: ["Bills", "Insurance", "Registrations", "Government documents"], tone: "bg-[#fff4df] text-[#ae7927]" },
  { icon: ReceiptText, title: "Freelancers", items: ["Client contracts", "Invoices", "Project documents", "Deliverables"], tone: "bg-[#f0edff] text-[#6253bf]" },
];

export function UseCases() {
  return (
    <section id="use-cases" className="bg-[#f4f6fa] py-16 sm:py-20">
      <div className="mx-auto max-w-[1180px] px-5">
        <SectionHeading title="Built for the paperwork life throws at you." />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {useCases.map(({ icon: Icon, title, items, tone }) => (
            <article key={title} data-reveal className="reveal-on-scroll reveal-scale surface-interactive rounded-[17px] bg-white p-6">
              <span className={`flex size-10 items-center justify-center rounded-[10px] ${tone}`}><Icon className="size-5" /></span>
              <h3 className="mt-6 text-lg font-semibold tracking-[-.03em] text-[#202b40]">{title}</h3>
              <div className="mt-5 space-y-3">{items.map(item => <p key={item} className="flex items-center gap-2 text-sm text-[#687181]"><ChevronRight className="size-3.5 text-[#7591d7]" />{item}</p>)}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const concepts = [
  ["1 inbox", "For all your paperwork"],
  ["0 missed details", "Important information surfaced"],
  ["1 clear plan", "From every document"],
  ["24/7", "Your AI document copilot"],
];

export function Stats() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-[1180px] px-5">
        <p className="text-center text-xs font-semibold uppercase tracking-[.18em] text-[#7c8491]">The PaperPilot promise</p>
        <div className="mt-10 grid gap-px overflow-hidden rounded-[18px] bg-black/[.07] shadow-[0_0_0_1px_rgba(15,23,42,.06)] sm:grid-cols-2 lg:grid-cols-4">
          {concepts.map(([value, label]) => <div key={value} data-reveal className="reveal-on-scroll reveal-scale bg-white p-7 text-center sm:p-9"><p className="text-balance text-3xl font-semibold tracking-[-.05em] text-[#17243e]">{value}</p><p className="text-pretty mt-2 text-xs leading-5 text-[#717a89]">{label}</p></div>)}
        </div>
        <p className="mt-4 text-center text-[10px] text-[#9198a3]">Product concepts shown for illustration—not measured performance claims.</p>
      </div>
    </section>
  );
}

const securityItems = [
  [Files, "Your documents, your control", "Keep ownership over what enters and leaves your workspace."],
  [LockKeyhole, "Private by design", "PaperPilot is designed around privacy and intentional access."],
  [UserCheck, "You approve important actions", "Review recommendations before anything moves forward."],
  [ShieldCheck, "No action without confirmation", "PaperPilot helps you decide; you remain in control."],
];

export function Security() {
  return (
    <section className="pb-16 sm:pb-20">
      <div className="mx-auto max-w-[1180px] px-5">
        <div className="overflow-hidden rounded-[22px] bg-[#111c36] px-5 py-14 text-white sm:px-10 sm:py-16 lg:px-16">
          <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-center lg:gap-20">
            <div><div className="flex size-11 items-center justify-center rounded-[11px] bg-white/10 text-[#9eb9ff]"><ShieldCheck className="size-5" /></div><h2 className="text-balance mt-6 text-[clamp(2.2rem,4vw,3.7rem)] font-semibold leading-[1.04] tracking-[-.05em]">Your documents deserve privacy.</h2><p className="text-pretty mt-5 text-sm leading-6 text-[#acb7cc] sm:text-base sm:leading-7">PaperPilot is designed with privacy and user control in mind, especially when recommendations can affect real-life decisions.</p></div>
            <div className="motion-stagger grid gap-3 sm:grid-cols-2">{securityItems.map(([Icon, title, copy]) => <div key={title as string} data-reveal className="reveal-on-scroll reveal-scale rounded-[13px] bg-white/[.065] p-5 shadow-[inset_0_0_0_1px_rgba(255,255,255,.08)]"><Icon className="size-4.5 text-[#93aff4]" /><h3 className="mt-4 text-sm font-semibold text-white">{title as string}</h3><p className="text-pretty mt-2 text-xs leading-5 text-[#aeb8ca]">{copy as string}</p></div>)}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

const testimonials = [
  { quote: "The best part isn't that PaperPilot summarizes documents. It's that I immediately know what I need to do.", name: "Maya", role: "University Student", initials: "MA" },
  { quote: "I stopped digging through emails just to remember one deadline. The next action is already waiting for me.", name: "Daniel", role: "Young Professional", initials: "DA" },
  { quote: "PaperPilot turns an intimidating form into a sequence I can actually finish. That changes everything.", name: "Rina", role: "Freelance Designer", initials: "RI" },
  { quote: "I used to read the same document three times just to make sure I wasn't missing anything. PaperPilot gives me the important parts immediately.", name: "Alex", role: "Internship Applicant", initials: "AL" },
  { quote: "Deadlines, required files, and next steps finally live in one place instead of being scattered across emails and PDFs.", name: "Sarah", role: "Graduate Student", initials: "SA" },
  { quote: "What I like most is that a document doesn't just become a summary. It becomes something I can actually act on.", name: "Kevin", role: "Freelancer", initials: "KE" },
];

function TestimonialCard({
  quote,
  name,
  role,
  initials,
}: (typeof testimonials)[number]) {
  return (
    <figure className="testimonial-card surface-interactive flex min-h-[270px] w-[min(82vw,360px)] shrink-0 flex-col rounded-[17px] bg-white p-7 sm:w-[min(46vw,360px)] sm:p-8 lg:w-[min(30vw,360px)]">
      <MessageSquareText className="size-5 text-[#5579d5]" />
      <blockquote className="text-pretty mt-6 flex-1 text-sm font-medium leading-6 tracking-[-.01em] text-[#313c50] sm:text-[15px] sm:leading-6">&ldquo;{quote}&rdquo;</blockquote>
      <figcaption className="mt-8 flex items-center gap-3 border-t border-black/[.06] pt-6">
        <span className="flex size-9 items-center justify-center rounded-full bg-[#eaf1ff] text-[10px] font-semibold text-[#3b63bf]">{initials}</span>
        <span>
          <span className="block text-xs font-semibold text-[#303a4c]">{name}</span>
          <span className="mt-0.5 block text-[10px] text-[#848c98]">{role} · Demo persona</span>
        </span>
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  return (
    <section className="bg-[#f4f6fa] py-16 sm:py-20">
      <div className="mx-auto max-w-[1180px] px-5">
        <SectionHeading eyebrow="Early perspective" title="Clarity people can feel." copy="Demo personas illustrating the kinds of moments PaperPilot is designed to improve." />
        <div data-reveal role="region" aria-label="PaperPilot testimonials" className="testimonial-marquee reveal-on-scroll mt-14">
          <div className="testimonial-track">
            <div className="testimonial-group">
              {testimonials.map((testimonial) => <TestimonialCard key={testimonial.name} {...testimonial} />)}
            </div>
            <div aria-hidden="true" className="testimonial-group">
              {testimonials.map((testimonial) => <TestimonialCard key={`duplicate-${testimonial.name}`} {...testimonial} />)}
            </div>
          </div>
        </div>
        <div className="mt-14 grid gap-4 lg:grid-cols-3">{testimonials.map(({ quote, name, role, initials }) => <figure key={name} className="surface-interactive flex min-h-[270px] flex-col rounded-[17px] bg-white p-6 sm:p-7"><MessageSquareText className="size-5 text-[#5579d5]" /><blockquote className="text-pretty mt-6 flex-1 text-base font-medium leading-7 tracking-[-.015em] text-[#313c50]">“{quote}”</blockquote><figcaption className="mt-7 flex items-center gap-3 border-t border-black/[.06] pt-5"><span className="flex size-9 items-center justify-center rounded-full bg-[#eaf1ff] text-[10px] font-semibold text-[#3b63bf]">{initials}</span><span><span className="block text-xs font-semibold text-[#303a4c]">{name}</span><span className="mt-0.5 block text-[10px] text-[#848c98]">{role} · Demo persona</span></span></figcaption></figure>)}</div>
      </div>
    </section>
  );
}
