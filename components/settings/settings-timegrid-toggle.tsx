"use client";

import { useTranslations } from "next-intl";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function TimeGridToggle({
  initialValue = true,
  onChange,
}: {
  initialValue?: boolean;
  onChange?: (enabled: boolean) => void;
}) {
  const t = useTranslations("Settings.timegrid");

  return (
    <div className="flex items-center space-x-2 mt-2">
      <Switch
        id="timegrid-toggle"
        checked={initialValue}
        onCheckedChange={onChange}
      />
      <Label htmlFor="timegrid-toggle">{t("show")}</Label>
    </div>
  );
}
