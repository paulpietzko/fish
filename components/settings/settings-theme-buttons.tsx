import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export default function ThemeButtons({
  mounted,
  theme,
  setTheme,
}: {
  mounted: boolean;
  theme: string | undefined;
  setTheme: (t: string) => void;
}) {
  const t = useTranslations("Settings.theme");

  if (!mounted) return null;

  const variant = (t: string) => (theme === t ? "default" : "outline");

  return (
    <div className="mt-2 flex gap-2">
      {[
        { title: t("system"), value: "system" },
        { title: t("light"), value: "light" },
        { title: t("dark"), value: "dark" },
      ].map(({ title, value }) => (
        <Button
          key={value}
          size="sm"
          variant={variant(value)}
          onClick={() => setTheme(value)}
        >
          {title}
        </Button>
      ))}
    </div>
  );
}
