"use client";

import { useState, useEffect } from "react";

export default function TimeSettings({
  initialStart = "08:00",
  initialEnd = "20:00",
  onChange,
}: {
  initialStart?: string;
  initialEnd?: string;
  onChange?: (startTime: string, endTime: string) => void;
}) {
  const [startTime, setStartTime] = useState(initialStart);
  const [endTime, setEndTime] = useState(initialEnd);

  useEffect(() => {
    onChange?.(startTime, endTime);
  }, [startTime, endTime, onChange]);

  return (
    <div className="flex gap-4 items-center">
      <div>
        <label className="block text-sm font-medium">Start Time</label>
        <input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className="mt-1 block w-full rounded border border-muted px-2 py-1"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">End Time</label>
        <input
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          className="mt-1 block w-full rounded border border-muted px-2 py-1"
        />
      </div>
    </div>
  );
}
