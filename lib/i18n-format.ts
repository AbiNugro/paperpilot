import type { Locale } from "@/i18n/config";
import { getDaysRemaining, isoToDate, MOCK_TODAY } from "@/lib/date-utils";
import type { PaperDocument, PaperTask } from "@/lib/mock-data";

export type Translate = (key: string, values?: Record<string, string | number | Date>) => string;

const localeTag: Record<Locale, string> = { en: "en-US", id: "id-ID" };

export function formatDate(value: string, locale: Locale, style: "long" | "short" = "long") {
  return new Intl.DateTimeFormat(localeTag[locale], style === "long"
    ? { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }
    : { day: "numeric", month: "short", timeZone: "UTC" }
  ).format(isoToDate(value));
}

export function formatWeekdayDate(value: string, locale: Locale) {
  return new Intl.DateTimeFormat(localeTag[locale], { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(isoToDate(value));
}

export function formatRelativeDate(value: string, locale: Locale) {
  const difference = getDaysRemaining(value, MOCK_TODAY) ?? 0;
  return new Intl.RelativeTimeFormat(localeTag[locale], { numeric: "auto" }).format(difference, "day");
}

export function documentText(document: PaperDocument, t: Translate) {
  return {
    title: t(`items.${document.id}.title`),
    type: t(`items.${document.id}.type`),
    summary: t(`items.${document.id}.summary`),
  };
}

export function taskText(task: PaperTask, t: Translate) {
  return t(`tasks.${task.id}`);
}

export function requirementText(id: string, t: Translate) {
  return t(`requirements.${id}`);
}
