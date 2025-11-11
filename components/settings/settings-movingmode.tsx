"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export type MovingMode = "move" | "uncover";

export default function MovingModeSettings({
  initialMode = "move",
  onChange,
}: {
  initialMode?: MovingMode;
  onChange?: (mode: MovingMode) => void;
}) {
  const t = useTranslations("Settings.movement");

  const [mode, setMode] = useState<MovingMode>(initialMode);

  useEffect(() => {
    onChange?.(mode);
  }, [mode, onChange]);

  return (
    <div className="flex gap-2 mt-2">
      <Button
        size="sm"
        variant={mode === "move" ? "default" : "outline"}
        onClick={() => setMode("move")}
      >
        {t("move")}
      </Button>
      <Button
        size="sm"
        variant={mode === "uncover" ? "default" : "outline"}
        onClick={() => setMode("uncover")}
      >
        {t("uncover")}
      </Button>
    </div>
  );
}
