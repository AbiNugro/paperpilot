import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Brand, ButtonLink } from "./shared";

const footerHrefs = [
  ["#features", "#how-it-works", "#pricing"],
  ["/help", "/privacy", "/terms"],
  ["/about", "mailto:hello@paperpilot.ai"],
];

export function FinalCta() {
  const t = useTranslations("Landing.footer");
  return <section className="px-5 pb-10 sm:pb-14"><div className="relative mx-auto max-w-[1180px] overflow-hidden rounded-[24px] bg-[#1f55d5] px-5 py-16 text-center text-white shadow-[0_24px_70px_-30px_rgba(29,78,216,.6)] sm:px-10 sm:py-20"><div aria-hidden="true" className="ambient-shift absolute inset-0 bg-[radial-gradient(circle_at_50%_-15%,rgba(255,255,255,.27),transparent_42%),radial-gradient(circle_at_85%_110%,rgba(91,57,218,.38),transparent_38%)]" /><div aria-hidden="true" className="absolute left-12 top-10 size-28 rounded-full border border-white/[.08] sm:size-48" /><div aria-hidden="true" className="absolute bottom-[-80px] right-[-30px] size-56 rounded-full border border-white/[.08] sm:size-72" /><div data-reveal className="reveal-on-scroll reveal-scale relative z-10"><div className="mx-auto mb-7 flex w-fit justify-center rounded-[12px] bg-white p-1 shadow-[0_9px_24px_-12px_rgba(4,18,57,.45)]"><Brand /></div><h2 className="text-balance mx-auto max-w-3xl text-[clamp(2.4rem,5vw,4.7rem)] font-semibold leading-[1] tracking-[-.055em]">{t("ctaTitle")}</h2><p className="text-pretty mx-auto mt-6 max-w-xl text-base leading-7 text-[#dbe6ff] sm:text-lg">{t("ctaCopy")}</p><div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"><ButtonLink href="/dashboard" variant="light" className="w-full sm:w-auto">{t("start")} <ArrowRight aria-hidden="true" className="size-4" /></ButtonLink><ButtonLink href="#how-it-works" variant="ghost-light" className="w-full sm:w-auto">{t("seeHow")}</ButtonLink></div></div></div></section>;
}

export function Footer() {
  const t = useTranslations("Landing.footer");
  const groups = t.raw("groups") as Array<{title: string; links: string[]}>;
  return <footer className="bg-[#0c1428] px-5 pb-8 pt-14 text-white sm:pt-16"><div className="mx-auto max-w-[1180px]"><div className="grid gap-12 border-b border-white/[.09] pb-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_repeat(3,1fr)]"><div><Brand inverse /><p className="mt-4 text-sm text-[#9da9c0]">{t("tagline")}</p><p className="text-pretty mt-4 max-w-xs text-xs leading-5 text-[#7f8aa0]">{t("description")}</p></div>{groups.map((group, groupIndex) => <div key={group.title}><h3 className="text-xs font-semibold text-white">{group.title}</h3><ul className="mt-4 space-y-1">{group.links.map((label, linkIndex) => { const href = footerHrefs[groupIndex][linkIndex]; return <li key={label}>{href.startsWith("/") || href.startsWith("#") ? <Link href={href} className="inline-flex min-h-10 items-center text-xs text-[#8995ab] transition-colors duration-150 ease-out hover:text-white">{label}</Link> : <a href={href} className="inline-flex min-h-10 items-center text-xs text-[#8995ab] transition-colors duration-150 ease-out hover:text-white">{label}</a>}</li>; })}</ul></div>)}</div><div className="flex flex-col gap-3 pt-6 text-[11px] text-[#707c93] sm:flex-row sm:items-center sm:justify-between"><p>© 2026 PaperPilot</p><p>{t("made")}</p></div></div></footer>;
}
