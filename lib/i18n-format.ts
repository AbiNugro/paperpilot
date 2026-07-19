import type { Locale } from "@/i18n/config";
import { mockToday, type PaperDocument, type PaperTask } from "@/lib/mock-data";

export type Translate = (key: string, values?: Record<string, string | number | Date>) => string;

const localeTag: Record<Locale, string> = { en: "en-US", id: "id-ID" };

export function isoToDate(value: string) {
  return new Date(`${value}T12:00:00Z`);
}

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
  const difference = Math.round((isoToDate(value).getTime() - isoToDate(mockToday).getTime()) / 86400000);
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
