"use client";

import Fish from "@/components/fish/fish";
import SettingsDialog from "@/components/settings/settings-dialog";
import TimeGrid from "@/components/time-grid";
import { useLocalStorage } from "@/hooks/use-local-storage";
import type { MovingMode } from "@/components/settings/settings-movingmode";

export default function Home() {
  const [selectedFish, setSelectedFish, fishLoaded] = useLocalStorage(
    "fish-selected",
    1
  );
  const [movingMode, setMovingMode, modeLoaded] = useLocalStorage<MovingMode>(
    "fish-moving-mode",
    "move"
  );
  const [startTime, setStartTime, startLoaded] = useLocalStorage(
    "fish-start-time",
    "07:00"
  );
  const [endTime, setEndTime, endLoaded] = useLocalStorage(
    "fish-end-time",
    "16:30"
  );
  const [showTimeGrid, setShowTimeGrid, gridLoaded] = useLocalStorage(
    "fish-show-timegrid",
    true
  );

  const allLoaded =
    fishLoaded && modeLoaded && startLoaded && endLoaded && gridLoaded;

  // Don't render until settings are loaded from localStorage
  if (!allLoaded) {
    return null;
  }

  return (
    <main className="flex flex-col items-center gap-6 p-6">
      <SettingsDialog
        currentFish={selectedFish}
        currentStartTime={startTime}
        currentEndTime={endTime}
        currentMovingMode={movingMode}
        currentShowTimeGrid={showTimeGrid}
        onFishSelect={setSelectedFish}
        onTimeChange={(start, end) => {
          setStartTime(start);
          setEndTime(end);
        }}
        onMovingModeChange={setMovingMode}
        onTimeGridToggle={setShowTimeGrid}
      />
      <Fish
        selectedFish={selectedFish}
        startTime={startTime}
        endTime={endTime}
        movingMode={movingMode}
      />
      {showTimeGrid && (
        <TimeGrid
          startTime={startTime}
          endTime={endTime}
          steps={7}
          movingMode={movingMode}
        />
      )}
    </main>
  );
}
