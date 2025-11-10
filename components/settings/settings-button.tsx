"use client";

import { useSettings } from "./settings-context";
import { Settings } from "lucide-react";

export default function SettingsButton() {
  const { openSettings } = useSettings();

  return (
    <button
      aria-label="Open settings"
      title="Settings (Ctrl/Cmd+E)"
      onClick={openSettings}
      className="inline-flex h-10 w-10 items-center justify-center rounded-md border bg-white/80 px-2 py-2 text-sm shadow-sm backdrop-blur hover:bg-white dark:bg-slate-800 dark:hover:bg-slate-700"
    >
      <Settings className="h-5 w-5" />
    </button>
  );
}
