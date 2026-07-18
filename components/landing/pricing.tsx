import { Check } from "lucide-react";
import { ButtonLink, SectionHeading } from "./shared";

export const pricingPlans = [
  {
    name: "Free",
    price: "$0",
    cadence: "forever",
    description: "For trying PaperPilot.",
    features: [
      "5 document analyses / month",
      "Smart document summaries",
      "Deadline detection",
      "Action checklists",
    ],
    cta: "Start free",
    href: "#top",
  },
  {
    name: "Pro",
    price: "$12",
    cadence: "/ month",
    description: "For people who deal with paperwork regularly.",
    features: [
      "Unlimited document analysis",
      "AI Copilot",
      "Advanced action generation",
      "Document history",
      "Priority support",
    ],
    cta: "Get PaperPilot Pro",
    href: "#top",
    popular: true,
  },
  {
    name: "Team",
    price: "Custom",
    cadence: "tailored pricing",
    description: "For teams managing shared documents.",
    features: [
      "Shared Paper Inbox",
      "Team workspace",
      "Role-based access",
      "Shared tasks",
      "Priority support",
    ],
    cta: "Contact us",
    href: "mailto:hello@paperpilot.ai",
  },
] as const;

export function Pricing() {
  return (
    <section id="pricing" className="py-16 sm:py-20">
      <div className="mx-auto max-w-[1180px] px-5">
        <SectionHeading
          eyebrow="Pricing"
          title="Simple plans for simpler paperwork."
          copy="Start with a few documents, then choose the workspace that matches how much life admin comes your way."
        />
        <div className="motion-stagger mt-14 grid items-stretch gap-4 lg:grid-cols-3">
          {pricingPlans.map((plan) => (
            <article
              key={plan.name}
              data-reveal
              className={`reveal-on-scroll reveal-scale relative flex flex-col rounded-[18px] p-6 sm:p-8 ${
                "popular" in plan && plan.popular
                  ? "bg-[#101b36] text-white shadow-[0_0_0_1px_rgba(15,23,42,.1),0_25px_65px_-28px_rgba(30,64,175,.5)] lg:-translate-y-3"
                  : "surface bg-white text-[#111a2e]"
              }`}
            >
              {"popular" in plan && plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#3c70ed] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[.1em] text-white shadow-[0_5px_14px_-7px_rgba(37,99,235,.8)]">
                  Most Popular
                </span>
              )}
              <div>
                <h3 className={`text-base font-semibold ${"popular" in plan && plan.popular ? "text-white" : "text-[#293449]"}`}>{plan.name}</h3>
                <div className="mt-5 flex min-h-12 items-end gap-2">
                  <span className="text-4xl font-semibold tracking-[-.05em]">{plan.price}</span>
                  <span className={`pb-1 text-xs ${"popular" in plan && plan.popular ? "text-[#aeb9ce]" : "text-[#7f8795]"}`}>{plan.cadence}</span>
                </div>
                <p className={`text-pretty mt-4 min-h-12 text-sm leading-6 ${"popular" in plan && plan.popular ? "text-[#aeb9ce]" : "text-[#687181]"}`}>{plan.description}</p>
              </div>
              <div className={`my-6 h-px ${"popular" in plan && plan.popular ? "bg-white/10" : "bg-black/[.07]"}`} />
              <ul className="flex-1 space-y-3.5">
                {plan.features.map((feature) => (
                  <li key={feature} className={`flex items-start gap-3 text-sm ${"popular" in plan && plan.popular ? "text-[#d1d8e5]" : "text-[#515b6c]"}`}>
                    <span className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full ${"popular" in plan && plan.popular ? "bg-[#294477] text-[#a9c2ff]" : "bg-[#eaf4ee] text-[#44845d]"}`}><Check className="size-3" /></span>
                    {feature}
                  </li>
                ))}
              </ul>
              <ButtonLink
                href={plan.href}
                variant={"popular" in plan && plan.popular ? "light" : "secondary"}
                className="mt-8 w-full"
              >
                {plan.cta}
              </ButtonLink>
            </article>
          ))}
        </div>
        <p className="mt-7 text-center text-xs text-[#8a919d]">Pricing shown for UI and product planning purposes. Plans can be changed before launch.</p>
      </div>
    </section>
  );
}
