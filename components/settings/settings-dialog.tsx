"use client";

import React, { useEffect, useState } from "react";
import { useSettings } from "./settings-context";
import { useTheme } from "next-themes";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import ThemeButtons from "./settings-theme-buttons";
import SettingsFishCarouselSelector from "./settings-fish-carousel-selector";
import TimeSettings from "./settings-timestamps";
import MovingModeSettings, { MovingMode } from "./settings-movingmode";
import TimeGridToggle from "./settings-timegrid-toggle";
import { useTranslations } from "next-intl";
import LanguageSettings from "./settings-language";

interface SettingsDialogProps {
  currentFish?: number;
  currentStartTime?: string;
  currentEndTime?: string;
  currentMovingMode?: MovingMode;
  currentShowTimeGrid?: boolean;
  onFishSelect?: (fish: number) => void;
  onTimeChange?: (start: string, end: string) => void;
  onMovingModeChange?: (mode: MovingMode) => void;
  onTimeGridToggle?: (enabled: boolean) => void;
}

export default function SettingsDialog({
  currentFish = 1,
  currentStartTime = "07:00",
  currentEndTime = "16:30",
  currentMovingMode = "move",
  currentShowTimeGrid = true,
  onFishSelect,
  onTimeChange,
  onMovingModeChange,
  onTimeGridToggle,
}: SettingsDialogProps) {
  const t = useTranslations("Settings");

  const { open, setOpen } = useSettings();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t("title")}</DialogTitle>
          <DialogDescription>{t("Description")}</DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-6">
          {/* Theme */}
          <div>
            <h2 className="block text-xl font-medium">{t("theme.title")}</h2>
            <ThemeButtons mounted={mounted} theme={theme} setTheme={setTheme} />
          </div>

          {/* Language */}
          <div>
            <h2 className="block text-xl font-medium">{t("language.title")}</h2>
            <LanguageSettings />
          </div>

          {/* Fish Selector */}
          <div>
            <h2 className="block text-xl font-medium">{t("fish.title")}</h2>
            <SettingsFishCarouselSelector
              initialFish={currentFish}
              onSelect={onFishSelect}
            />
          </div>

          {/* Time Settings */}
          <div>
            <h2 className="block text-xl font-medium">
              {t("timestamps.title")}
            </h2>
            <TimeSettings
              initialStart={currentStartTime}
              initialEnd={currentEndTime}
              onChange={onTimeChange}
            />
          </div>

          {/* Moving Mode */}
          <div>
            <h2 className="block text-xl font-medium">{t("movement.title")}</h2>
            <MovingModeSettings
              initialMode={currentMovingMode}
              onChange={onMovingModeChange}
            />
          </div>

          {/* Time Grid Toggle */}
          <div>
            <h2 className="block text-xl font-medium">{t("timegrid.title")}</h2>
            <TimeGridToggle
              initialValue={currentShowTimeGrid}
              onChange={onTimeGridToggle}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
