import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["en", "de", "bu", "bi"],

  // Used when no locale matches
  defaultLocale: "en",
});
