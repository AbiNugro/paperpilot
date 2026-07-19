"use client";

import { Check, ChevronDown, Globe2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { startTransition, useEffect, useRef, useState } from "react";
import { locales, type Locale } from "@/i18n/config";
import { saveLocalePreference } from "@/app/actions";

const languageNames: Record<Locale, string> = {
  en: "English",
  id: "Bahasa Indonesia",
};

export function LanguageSwitcher({ variant = "app" }: { variant?: "app" | "landing" }) {
  const locale = useLocale() as Locale;
  const t = useTranslations("Language");
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    if (!open) return;
    const close = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const frame = window.requestAnimationFrame(() => optionRefs.current[locales.indexOf(locale)]?.focus());
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    window.addEventListener("pointerdown", close);
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      window.removeEventListener("pointerdown", close);
      window.removeEventListener("keydown", closeOnEscape);
      window.cancelAnimationFrame(frame);
    };
  }, [locale, open]);

  const selectLocale = (nextLocale: Locale) => {
    setOpen(false);
    if (nextLocale === locale) return;
    startTransition(async () => {
      await saveLocalePreference(nextLocale);
      router.refresh();
    });
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        aria-label={t("select")}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className={`${variant === "landing" ? "h-10 px-2.5 text-[#485366] hover:bg-black/[.035]" : "h-10 bg-white px-2.5 text-[#657187] shadow-[0_0_0_1px_rgba(15,23,42,.07)] hover:bg-[#f1f5ff]"} inline-flex min-w-11 items-center justify-center gap-1.5 rounded-[9px] text-xs font-semibold transition-[background-color,transform] duration-150 ease-out active:scale-[0.96]`}
      >
        <Globe2 aria-hidden="true" className="size-4" />
        <span>{locale.toUpperCase()}</span>
        <ChevronDown aria-hidden="true" className={`size-3 transition-transform duration-150 ease-out ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div role="menu" aria-label={t("menuLabel")} className="absolute right-0 top-[calc(100%+.5rem)] z-[80] min-w-48 origin-top-right rounded-[12px] bg-white p-1.5 text-left shadow-[0_0_0_1px_rgba(15,23,42,.08),0_16px_42px_-20px_rgba(15,23,42,.35)]">
          <p className="px-2.5 py-2 text-[10px] font-semibold uppercase tracking-[.12em] text-[#8a95a6]">{t("label")}</p>
          {locales.map((item) => (
            <button key={item} ref={(node) => { optionRefs.current[locales.indexOf(item)] = node; }} type="button" role="menuitemradio" aria-checked={item === locale} onClick={() => selectLocale(item)} onKeyDown={(event) => { if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return; event.preventDefault(); const current = locales.indexOf(item); const next = event.key === "Home" ? 0 : event.key === "End" ? locales.length - 1 : (current + (event.key === "ArrowDown" ? 1 : -1) + locales.length) % locales.length; optionRefs.current[next]?.focus(); }} className="flex min-h-10 w-full items-center justify-between gap-3 rounded-[8px] px-2.5 text-xs font-medium text-[#47556d] transition-[background-color,color] duration-150 ease-out hover:bg-[#eef3ff] hover:text-[#245cc7]">
              <span>{languageNames[item]}</span>
              {item === locale && <Check aria-hidden="true" className="size-3.5 text-[#315fca]" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
