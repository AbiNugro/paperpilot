"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { SectionHeading } from "./shared";

export function Faq() {
  const t = useTranslations("Landing.faq");
  const localizedFaqs = t.raw("items") as Array<{q: string; a: string}>;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-5">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />
        <div data-reveal className="reveal-on-scroll mt-12 divide-y divide-black/[.08] border-y border-black/[.08]">
          {localizedFaqs.map(({q: question, a: answer}, index) => {
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
