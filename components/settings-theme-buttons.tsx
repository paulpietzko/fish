import { Button } from "./ui/button";

export default function ThemeButtons({
  mounted,
  theme,
  setTheme,
}: {
  mounted: boolean;
  theme: string | undefined;
  setTheme: (t: string) => void;
}) {
  if (!mounted) return null;

  const variant = (t: string) => (theme === t ? "default" : "outline");

  return (
    <div className="mt-2 flex gap-2">
      {["system", "light", "dark"].map((t) => (
        <Button
          key={t}
          size="sm"
          variant={variant(t)}
          onClick={() => setTheme(t)}
        >
          {t[0].toUpperCase() + t.slice(1)}
        </Button>
      ))}
    </div>
  );
}