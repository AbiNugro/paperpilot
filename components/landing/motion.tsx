"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname } from "next/navigation";

export function MotionObserver({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.dataset.motionReady = "true";

    const targets = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      targets.forEach((target) => target.dataset.revealed = "true");
      return () => delete document.documentElement.dataset.motionReady;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          (entry.target as HTMLElement).dataset.revealed = "true";
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    targets.forEach((target) => observer.observe(target));
    return () => {
      observer.disconnect();
      delete document.documentElement.dataset.motionReady;
    };
  }, [pathname]);

  return children;
}
