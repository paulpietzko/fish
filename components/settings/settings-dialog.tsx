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

export default function SettingsDialog({
  onFishSelect,
}: {
  onFishSelect?: (fish: number) => void;
}) {
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

        <div className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium">Theme</label>
            <ThemeButtons mounted={mounted} theme={theme} setTheme={setTheme} />
          </div>
          <div>
            <label className="block text-sm font-medium">Fish Selector</label>
            <SettingsFishCarouselSelector onSelect={onFishSelect} />
          </div>
        </div>

        <DialogFooter className="flex justify-between">
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
