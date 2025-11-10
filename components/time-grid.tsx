"use client";

import React from "react";

export default function TimeGrid({
  startTime = "08:00",
  endTime = "20:00",
  steps = 6, // number of tick marks including start and end
}: {
  startTime?: string;
  endTime?: string;
  steps?: number;
}) {
  // Helper: format time string as HH:MM
  const formatTime = (minutes: number) => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
  };

  // Convert start/end time to minutes
  const timeToMinutes = (t: string) => {
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
  };

  const startMinutes = timeToMinutes(startTime);
  const endMinutes = timeToMinutes(endTime);
  const interval = (endMinutes - startMinutes) / (steps - 1);

  const ticks = Array.from({ length: steps }, (_, i) =>
    formatTime(Math.round(startMinutes + interval * i))
  );

  return (
    <div className="w-full mt-4">
      <div className="relative h-6 border-t border-slate-300 dark:border-slate-600">
        {ticks.map((tick, i) => (
          <div
            key={tick}
            className="absolute top-0 flex flex-col items-center"
            style={{
              left: `${(i / (ticks.length - 1)) * 100}%`,
              transform: "translateX(-50%)",
            }}
          >
            <div className="w-px h-2 bg-slate-500 dark:bg-slate-400" />
            <span className="text-xs text-slate-600 dark:text-slate-300 mt-1">
              {tick}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
