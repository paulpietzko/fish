"use client";

import React from "react";
import { useSettings } from "./settings-context";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SettingsDialog() {
  const { open, setOpen } = useSettings();

  return (
    // Controlled dialog so open state syncs with context (keyboard + button)
    <Dialog open={open} onOpenChange={setOpen}>
      {/* DialogTrigger isn't necessary because we open via context, but kept for accessibility patterns */}
      <DialogTrigger asChild>
        <span aria-hidden className="hidden" />
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            Adjust your preferences here. Shortcut: <kbd>Ctrl</kbd>/
            <kbd>Cmd</kbd> + <kbd>E</kbd>
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Theme
            </label>
            <div className="mt-2 flex gap-2">
              <Button variant="outline" size="sm">
                System
              </Button>
              <Button variant="outline" size="sm">
                Light
              </Button>
              <Button variant="outline" size="sm">
                Dark
              </Button>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={() => setOpen(false)}>
            <Link href="https://github.com/paulpietzko/fish">Contribute</Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
