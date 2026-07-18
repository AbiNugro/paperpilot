"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Brand, ButtonLink } from "./shared";

const links = [
  ["Product", "#product"],
  ["How it works", "#how-it-works"],
  ["Features", "#features"],
  ["Use Cases", "#use-cases"],
  ["Pricing", "#pricing"],
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
      <nav
        aria-label="Primary navigation"
        className={`mx-auto max-w-[1180px] rounded-[15px] px-3 transition-[background-color,box-shadow,backdrop-filter] duration-200 [transition-timing-function:var(--ease-out)] sm:px-4 ${
          scrolled || open
            ? "bg-[rgba(255,255,255,.88)] shadow-[0_0_0_1px_rgba(15,23,42,.08),0_10px_35px_-20px_rgba(15,23,42,.3)] backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="flex h-14 items-center justify-between">
          <a href="#top" aria-label="PaperPilot home" className="rounded-lg">
            <Brand />
          </a>

          <div className="hidden items-center gap-1 lg:flex">
            {links.map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="inline-flex min-h-10 items-center rounded-lg px-3 text-[13px] font-medium text-[#515a69] transition-[color,background-color] duration-150 ease-out hover:bg-black/[.035] hover:text-[#10182b]"
              >
                {label}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-2 lg:flex">
            <a href="#" className="inline-flex min-h-10 items-center rounded-lg px-3 text-sm font-semibold text-[#333c4c] hover:text-[#11192c]">
              Sign in
            </a>
            <ButtonLink href="#pricing" className="min-h-10 px-4 py-2">
              Get started
            </ButtonLink>
          </div>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="relative flex size-11 items-center justify-center rounded-[10px] text-[#1b263a] shadow-[inset_0_0_0_1px_rgba(15,23,42,.09)] transition-[transform,background-color] duration-150 ease-out active:scale-[0.96] lg:hidden"
          >
            <Menu className={`absolute size-5 transition-[opacity,filter,scale] duration-300 [transition-timing-function:cubic-bezier(.2,0,0,1)] ${open ? "scale-[.25] opacity-0 blur-[4px]" : "scale-100 opacity-100 blur-0"}`} />
            <X className={`absolute size-5 transition-[opacity,filter,scale] duration-300 [transition-timing-function:cubic-bezier(.2,0,0,1)] ${open ? "scale-100 opacity-100 blur-0" : "scale-[.25] opacity-0 blur-[4px]"}`} />
          </button>
        </div>

        <div className={`grid transition-[grid-template-rows,opacity] duration-200 [transition-timing-function:var(--ease-out)] lg:hidden ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
          <div className="overflow-hidden">
            <div className="border-t border-black/[.07] px-1 pb-4 pt-2">
              {links.map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-11 items-center rounded-[9px] px-3 text-sm font-medium text-[#3c4656] hover:bg-black/[.035]"
                >
                  {label}
                </a>
              ))}
              <div className="mt-2 grid grid-cols-2 gap-2">
                <ButtonLink href="#" variant="secondary">Sign in</ButtonLink>
                <ButtonLink href="#pricing">Get started</ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
