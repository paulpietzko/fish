"use client";

import { useState } from "react";
import Fish from "@/components/fish/fish";
import SettingsDialog from "@/components/settings/settings-dialog";

export default function Home() {
  const [selectedFish, setSelectedFish] = useState(1);

  return (
    <main className="flex flex-col items-center gap-6 p-6">
      <SettingsDialog onFishSelect={setSelectedFish} />
      <Fish selectedFish={selectedFish} />
    </main>
  );
}
