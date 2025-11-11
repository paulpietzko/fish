"use client";

import { useTranslations, useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { routing } from "@/i18n/routing";
import { useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";

export default function LanguageSettings() {
  const t = useTranslations("Settings.language");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleLocaleChange = (newLocale: string) => {
    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
    });
  };

  return (
    <div className="mt-2 flex gap-2">
      {routing.locales.map((loc) => (
        <Button
          key={loc}
          size="sm"
          variant={locale === loc ? "default" : "outline"}
          onClick={() => handleLocaleChange(loc)}
          disabled={isPending}
        >
          {t(loc)}
        </Button>
      ))}
    </div>
  );
}
