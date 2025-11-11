"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { MovingMode } from "@/components/settings/settings-movingmode";

export default function Fish({
  selectedFish = 1,
  startTime,
  endTime,
  movingMode = "move",
}: {
  selectedFish?: number;
  startTime: string;
  endTime: string;
  movingMode?: MovingMode;
}) {
  const imgSrc = `/images/fish/${selectedFish}.png`;
  const [progress, setProgress] = useState(0);

  // Convert time string to minutes
  const timeToMinutes = (t: string) => {
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
  };

  useEffect(() => {
    const startMinutes = timeToMinutes(startTime);
    const endMinutes = timeToMinutes(endTime);

    const updateProgress = () => {
      const now = new Date();
      const currentMinutes = now.getHours() * 60 + now.getMinutes();

      let prog = (currentMinutes - startMinutes) / (endMinutes - startMinutes);
      prog = Math.max(0, Math.min(1, prog));
      setProgress(prog);
    };

    // Update immediately
    updateProgress();

    const interval = setInterval(updateProgress, 1000);

    return () => clearInterval(interval);
  }, [startTime, endTime]);

  const style =
    movingMode === "move"
      ? {
          // Move mode: Fish moves from left (-100%) to right (0%)
          transform: `translateX(${progress * 100 - 100}%)`,
          transition: "transform 1s linear",
        }
      : {
          // Uncover mode: Fish stays in place, revealed from left to right
          clipPath: `inset(0 ${100 - progress * 100}% 0 0)`,
          transition: "clip-path 1s linear",
        };

  return (
    <div className="overflow-hidden w-full flex justify-start">
      <Image
        src={imgSrc}
        alt={`Fish ${selectedFish}`}
        width={800}
        height={800}
        className="object-contain"
        style={style}
      />
    </div>
  );
}
