"use client";

import { useState } from "react";
import Fish from "@/components/fish/fish";
import SettingsDialog from "@/components/settings/settings-dialog";
import TimeGrid from "@/components/time-grid";

export default function Home() {
  const [selectedFish, setSelectedFish] = useState(1);
  const [movingMode, setMovingMode] = useState<"move" | "uncover">("move");
  const [startTime, setStartTime] = useState("07:00");
  const [endTime, setEndTime] = useState("16:30");

  return (
    <main className="flex flex-col items-center gap-6 p-6">
      <SettingsDialog
        currentFish={selectedFish}
        currentStartTime={startTime}
        currentEndTime={endTime}
        currentMovingMode={movingMode}
        onFishSelect={setSelectedFish}
        onTimeChange={(start, end) => {
          setStartTime(start);
          setEndTime(end);
        }}
        onMovingModeChange={setMovingMode}
      />
      <Fish
        selectedFish={selectedFish}
        startTime={startTime}
        endTime={endTime}
        movingMode={movingMode}
      />
      <TimeGrid startTime={startTime} endTime={endTime} steps={7} />
    </main>
  );
}
