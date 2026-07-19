export const locales = ["en", "id"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";
export const localeCookie = "paperpilot_locale";

export function isLocale(value: string | undefined | null): value is Locale {
  return locales.includes(value as Locale);
}

export function resolveLocale(savedLocale: string | undefined, browserLanguages: string): Locale {
  if (isLocale(savedLocale)) return savedLocale;
  return browserLanguages.toLowerCase().split(",").some((language) => language.trim().startsWith("id"))
    ? "id"
    : defaultLocale;
}
