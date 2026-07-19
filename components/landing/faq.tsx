"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { SectionHeading } from "./shared";

const faqs = [
  ["What is PaperPilot?", "PaperPilot is an AI-powered life admin and document assistant. It explains documents, surfaces important details, and turns requirements into clear next steps."],
  ["What types of documents can I upload?", "You can upload PDFs, images, screenshots, and common document files, or paste text directly into your Paper Inbox."],
  ["Is PaperPilot just a PDF summarizer?", "No. A summary is only the beginning. PaperPilot is designed to help you understand, decide, act, and track what a document requires."],
  ["Can PaperPilot detect deadlines?", "Yes. PaperPilot can identify important dates and deadlines in your documents, then connect them to reminders and relevant tasks."],
  ["Does PaperPilot automatically perform actions?", "No important action happens without your confirmation. PaperPilot recommends and prepares next steps while you stay in control."],
  ["Can I ask questions about my documents?", "Yes. AI Copilot lets you ask questions across the paperwork in your workspace, including what is due, missing, or needs attention."],
  ["How is my data handled?", "PaperPilot is being designed with privacy and user control in mind. Product-specific retention and privacy details will be documented clearly before launch."],
  ["Can I use PaperPilot for work and university documents?", "Yes. PaperPilot is designed for academic, professional, freelance, and everyday paperwork—from applications and contracts to bills and registrations."],
] as const;

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-5">
        <SectionHeading eyebrow="FAQ" title="A few things worth knowing." />
        <div data-reveal className="reveal-on-scroll mt-12 divide-y divide-black/[.08] border-y border-black/[.08]">
          {faqs.map(([question, answer], index) => {
            const isOpen = openIndex === index;
            const contentId = `faq-content-${index}`;
            return (
              <div key={question}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={contentId}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="group flex min-h-[72px] w-full items-center gap-5 py-4 text-left transition-colors duration-150 ease-out hover:text-[#245eea] active:scale-[0.99]"
                >
                  <span className="flex-1 text-balance text-[15px] font-semibold tracking-[-.015em] text-[#2a3549] group-hover:text-[#234fae] sm:text-base">{question}</span>
                  <span className="relative flex size-10 shrink-0 items-center justify-center rounded-[10px] bg-white text-[#687180] shadow-[0_0_0_1px_rgba(15,23,42,.08)]">
                    <Plus aria-hidden="true" className={`absolute size-4 transition-[opacity,filter,scale] duration-300 [transition-timing-function:cubic-bezier(.2,0,0,1)] ${isOpen ? "scale-[.25] opacity-0 blur-[4px]" : "scale-100 opacity-100 blur-0"}`} />
                    <Minus aria-hidden="true" className={`absolute size-4 transition-[opacity,filter,scale] duration-300 [transition-timing-function:cubic-bezier(.2,0,0,1)] ${isOpen ? "scale-100 opacity-100 blur-0" : "scale-[.25] opacity-0 blur-[4px]"}`} />
                  </span>
                </button>
                <div className={`grid transition-[grid-template-rows,opacity] duration-200 [transition-timing-function:var(--ease-out)] ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                  <div id={contentId} inert={!isOpen} aria-hidden={!isOpen} className="overflow-hidden">
                    <p className="text-pretty max-w-2xl pb-6 pr-12 text-sm leading-6 text-[#687181] sm:text-[15px] sm:leading-7">{answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
