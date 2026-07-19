"use server";

import { cookies } from "next/headers";
import { isLocale, localeCookie, type Locale } from "@/i18n/config";

export async function saveLocalePreference(locale: Locale) {
  if (!isLocale(locale)) return;
  const cookieStore = await cookies();
  cookieStore.set(localeCookie, locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
}
