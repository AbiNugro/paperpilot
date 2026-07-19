import { cookies, headers } from "next/headers";
import { getRequestConfig } from "next-intl/server";
import { localeCookie, resolveLocale } from "./config";

export default getRequestConfig(async () => {
  const [cookieStore, headerStore] = await Promise.all([cookies(), headers()]);
  const locale = resolveLocale(
    cookieStore.get(localeCookie)?.value,
    headerStore.get("accept-language") ?? "",
  );

  const [applicationMessages, landingMessages] = await Promise.all([
    import(`../messages/${locale}.json`),
    import(`../messages/landing-${locale}.json`),
  ]);

  return {
    locale,
    messages: { ...applicationMessages.default, ...landingMessages.default },
    timeZone: "Asia/Jakarta",
  };
});
