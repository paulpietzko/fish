"use client";

import React, { useEffect, useState } from "react";

export default function TimeGrid({
  startTime,
  endTime,
  steps = 6, // number of tick marks including start and end
}: {
  startTime: string;
  endTime: string;
  steps?: number;
}) {
  const [currentProgress, setCurrentProgress] = useState(0);

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

  // Update current time progress
  useEffect(() => {
    const updateProgress = () => {
      const now = new Date();
      const currentMinutes = now.getHours() * 60 + now.getMinutes();

      let prog = (currentMinutes - startMinutes) / (endMinutes - startMinutes);
      prog = Math.max(0, Math.min(1, prog));
      setCurrentProgress(prog);
    };

    // Update immediately
    updateProgress();

    // Update every second
    const interval = setInterval(updateProgress, 1000);

    return () => clearInterval(interval);
  }, [startTime, endTime, startMinutes, endMinutes]);

  return (
    <div className="w-full mt-4">
      <div className="relative h-6 border-t border-slate-300 dark:border-slate-600">
        {/* Time ticks */}
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

        {/* Current time cursor */}
        <div
          className="absolute -top-3 h-6 w-0.5 bg-gray-500 dark:bg-gray-400 transition-all duration-1000 ease-linear"
          style={{
            left: `${currentProgress * 100}%`,
            transform: "translateX(-50%)",
          }}
        />
      </div>
    </div>
  );
}
