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
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ThemeButtons from "./settings-theme-buttons";
import SettingsFishCarouselSelector from "./settings-fish-carousel-selector";
import TimeSettings from "./settings-timestamps";
import MovingModeSettings, { MovingMode } from "./settings-movingmode";

interface SettingsDialogProps {
  onFishSelect?: (fish: number) => void;
  onTimeChange?: (start: string, end: string) => void;
  onMovingModeChange?: (mode: MovingMode) => void;
}

export default function SettingsDialog({
  onFishSelect,
  onTimeChange,
  onMovingModeChange,
}: SettingsDialogProps) {
  const { open, setOpen } = useSettings();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            Adjust your preferences. Shortcut: <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> +{" "}
            <kbd>E</kbd>
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-6">
          {/* Theme */}
          <div>
            <h2 className="block text-xl font-medium">Theme</h2>
            <ThemeButtons mounted={mounted} theme={theme} setTheme={setTheme} />
          </div>

          {/* Fish Selector */}
          <div>
            <h2 className="block text-xl font-medium">Fish Selector</h2>
            <SettingsFishCarouselSelector onSelect={onFishSelect} />
          </div>

          {/* Time Settings */}
          <div>
            <h2 className="block text-xl font-medium">Fish Timing</h2>
            <TimeSettings onChange={onTimeChange} />
          </div>

          {/* Moving Mode */}
          <div>
            <h2 className="block text-xl font-medium">Moving Mode</h2>
            <MovingModeSettings onChange={onMovingModeChange} />
          </div>
        </div>

        <DialogFooter className="flex justify-between mt-4">
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
