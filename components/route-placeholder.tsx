import Link from "next/link";
import { Brand } from "@/components/landing/shared";

export function RoutePlaceholder({
  title,
  copy,
}: {
  title: string;
  copy: string;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#fbfaf7] px-5 py-16">
      <div className="surface max-w-lg rounded-[20px] bg-white p-8 text-center sm:p-12">
        <Link href="/" aria-label="PaperPilot home" className="inline-flex rounded-[10px]">
          <Brand />
        </Link>
        <h1 className="text-balance mt-8 text-3xl font-semibold tracking-[-.045em] text-[#0c1529] sm:text-4xl">{title}</h1>
        <p className="text-pretty mt-4 text-sm leading-6 text-[#626a79] sm:text-base sm:leading-7">{copy}</p>
        <Link href="/" scroll className="mt-8 inline-flex min-h-11 items-center justify-center rounded-[11px] bg-[#245eea] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_6px_18px_-8px_rgba(37,99,235,.7)] transition-[transform,background-color] duration-150 ease-out hover:bg-[#1e53dc] active:scale-[0.96]">
          Back to PaperPilot
        </Link>
      </div>
    </main>
  );
}
