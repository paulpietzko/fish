"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type SettingsContextType = {
  open: boolean;
  setOpen: (v: boolean) => void;
  openSettings: () => void;
  closeSettings: () => void;
};

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
);

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) {
    throw new Error("useSettings must be used within SettingsProvider");
  }
  return ctx;
}

export default function SettingsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  const openSettings = useCallback(() => setOpen(true), []);
  const closeSettings = useCallback(() => setOpen(false), []);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      // Cmd+E (metaKey) or Ctrl+E
      const isModifier = e.ctrlKey || e.metaKey;
      if (isModifier && e.key.toLowerCase() === "e") {
        e.preventDefault();
        setOpen(true);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <SettingsContext.Provider
      value={{ open, setOpen, openSettings, closeSettings }}
    >
      {children}
    </SettingsContext.Provider>
  );
}
