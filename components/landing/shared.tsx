import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

export function Brand({
  inverse = false,
  compact = false,
}: {
  inverse?: boolean;
  compact?: boolean;
}) {
  return (
    <span className={`inline-flex items-center ${compact ? "gap-1.5" : "gap-2.5"}`}>
      <span className={`relative shrink-0 overflow-hidden bg-white shadow-[0_0_0_1px_rgba(0,0,0,.08),0_3px_8px_-4px_rgba(37,99,235,.4)] ${compact ? "size-6 rounded-[7px]" : "size-9 rounded-[10px]"}`}>
        <Image
          src="/paperpilot-logo.png"
          alt=""
          width={60}
          height={60}
          className={`absolute left-1/2 top-1/2 max-w-none -translate-x-1/2 -translate-y-1/2 ${compact ? "size-10" : "size-[60px]"}`}
          priority
        />
      </span>
      <span className={`${compact ? "text-[11px]" : "text-[17px]"} font-semibold tracking-[-0.025em] ${inverse ? "text-white" : "text-[#10182b]"}`}>
        PaperPilot
      </span>
    </span>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "light" | "ghost-light";
  className?: string;
}) {
  const variants = {
    primary:
      "bg-[#245eea] text-white shadow-[0_1px_1px_rgba(0,0,0,.06),0_6px_18px_-8px_rgba(37,99,235,.7)] hover:bg-[#1e53dc]",
    secondary:
      "bg-white text-[#11192c] shadow-[0_0_0_1px_rgba(15,23,42,.1),0_2px_4px_-2px_rgba(15,23,42,.15)] hover:bg-[#f8f9fb]",
    light:
      "bg-white text-[#17326f] shadow-[0_1px_2px_rgba(0,0,0,.1),0_10px_28px_-12px_rgba(3,16,45,.42)] hover:bg-[#f7f9ff]",
    "ghost-light":
      "bg-white/8 text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,.2)] hover:bg-white/13",
  };

  return (
    <a
      href={href}
      className={`group inline-flex min-h-11 items-center justify-center gap-2 rounded-[11px] px-5 py-2.5 text-sm font-semibold transition-[transform,background-color,box-shadow] duration-150 ease-out hover:-translate-y-px active:translate-y-0 active:scale-[0.985] ${variants[variant]} ${className}`}
    >
      {children}
    </a>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  copy,
  align = "center",
  className = "",
}: {
  eyebrow?: string;
  title: string;
  copy?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div className={`${align === "center" ? "mx-auto text-center" : "text-left"} ${className}`}>
      {eyebrow && (
          <p data-reveal className="reveal-on-scroll reveal-heading-eyebrow mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#3766d7]">
          {eyebrow}
        </p>
      )}
      <h2 data-reveal className="reveal-on-scroll reveal-heading-title text-balance text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-[1.06] tracking-[-0.045em] text-[#0c1529]">
        {title}
      </h2>
      {copy && (
        <p data-reveal className="reveal-on-scroll reveal-heading-copy text-pretty mx-auto mt-5 max-w-2xl text-base leading-7 text-[#626a79] sm:text-lg">
          {copy}
        </p>
      )}
    </div>
  );
}

export function StatusPill({
  tone = "blue",
  children,
}: {
  tone?: "blue" | "amber" | "green" | "red";
  children: ReactNode;
}) {
  const toneClass = {
    blue: "bg-[#edf3ff] text-[#315fca]",
    amber: "bg-[#fff5dd] text-[#996515]",
    green: "bg-[#eaf8ef] text-[#287b48]",
    red: "bg-[#fff0ef] text-[#a34a42]",
  }[tone];

  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-semibold ${toneClass}`}>
      {children}
    </span>
  );
}

export function ArrowLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className="group inline-flex min-h-11 items-center gap-2 py-2 text-sm font-semibold text-[#245eea] transition-colors duration-150 ease-out hover:text-[#173f9e]"
    >
      {children}
      <ArrowRight className="size-4 transition-transform duration-150 ease-out group-hover:translate-x-0.5" aria-hidden="true" />
    </a>
  );
}
