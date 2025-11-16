"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { MovingMode } from "@/components/settings/settings-movingmode";
import { useTranslations } from "next-intl";
import { PARTY_EMOJIS } from "@/lib/party-emojis";
import { CLICK_MESSAGE_KEYS } from "@/lib/fish-click-messages";

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
  const [isWobbling, setIsWobbling] = useState(false);
  const [clickMessage, setClickMessage] = useState("");
  const [showCompletionMessage, setShowCompletionMessage] = useState(false);
  const [confetti, setConfetti] = useState<
    Array<{ id: number; emoji: string; left: number; delay: number }>
  >([]);
  const t = useTranslations("Fish");

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

      // Show completion message when finished
      if (prog >= 1 && !showCompletionMessage) {
        setShowCompletionMessage(true);
        // Trigger confetti
        const newConfetti = Array.from({ length: 50 }, (_, i) => ({
          id: i,
          emoji: PARTY_EMOJIS[Math.floor(Math.random() * PARTY_EMOJIS.length)],
          left: Math.random() * 100,
          delay: Math.random() * 0.5,
        }));
        setConfetti(newConfetti);
      } else if (prog < 1 && showCompletionMessage) {
        setShowCompletionMessage(false);
        setConfetti([]);
      }
    };

    // Update immediately
    updateProgress();

    const interval = setInterval(updateProgress, 1000);

    return () => clearInterval(interval);
  }, [startTime, endTime, showCompletionMessage]);

  const handleFishClick = () => {
    // Don't show message if already complete
    if (progress >= 1) return;

    // Trigger wobble animation
    setIsWobbling(true);
    setTimeout(() => setIsWobbling(false), 500);

    // Show random translated message
    const randomKey =
      CLICK_MESSAGE_KEYS[Math.floor(Math.random() * CLICK_MESSAGE_KEYS.length)];
    setClickMessage(t(randomKey));

    // Hide message after 2 seconds
    setTimeout(() => setClickMessage(""), 2000);
  };

  if (movingMode === "move") {
    // Move mode: Fish moves from left edge to right edge (fish's right edge aligns with right at 100%)
    return (
      <div className="relative w-full">
        <div className="relative w-full h-96 flex items-center overflow-visible">
          <div
            className="absolute flex items-center justify-center cursor-pointer"
            style={{
              left: `${progress * 100}%`,
              transform: "translateX(-100%)",
              transition: "left 1s linear",
              width: "800px",
              height: "400px",
            }}
            onClick={handleFishClick}
          >
            <Image
              src={imgSrc}
              alt={`Fish ${selectedFish}`}
              width={800}
              height={800}
              className={`object-contain ${
                isWobbling ? "animate-wobble" : ""
              } ${showCompletionMessage ? "animate-party-spin" : ""}`}
              style={{ width: "800px", height: "400px" }}
            />
          </div>
        </div>

        {/* Click Message */}
        {clickMessage && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/80 text-white px-4 py-2 rounded-lg animate-fade-in z-10">
            {clickMessage}
          </div>
        )}

        {/* Confetti */}
        {showCompletionMessage &&
          confetti.map((conf) => (
            <div
              key={conf.id}
              className="absolute top-0 text-4xl animate-confetti pointer-events-none"
              style={{
                left: `${conf.left}%`,
                animationDelay: `${conf.delay}s`,
              }}
            >
              {conf.emoji}
            </div>
          ))}

        {/* Completion Message */}
        {showCompletionMessage && (
          <div className="mt-4 text-center">
            <p className="text-4xl font-bold text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text animate-rainbow-pulse">
              🎉✨ {t("completed")} ✨🎉
            </p>
          </div>
        )}
      </div>
    );
  }

  // Uncover mode: Fish stays centered, revealed from left to right
  return (
    <div className="relative w-full">
      <div className="relative w-full h-96 flex items-center justify-center overflow-hidden">
        <div
          className="cursor-pointer"
          onClick={handleFishClick}
          style={{ width: "800px", height: "400px" }}
        >
          <Image
            src={imgSrc}
            alt={`Fish ${selectedFish}`}
            width={800}
            height={400}
            className={`object-contain ${isWobbling ? "animate-wobble" : ""} ${
              showCompletionMessage ? "animate-party-spin" : ""
            }`}
            style={{
              width: "800px",
              height: "400px",
              clipPath: `inset(0 ${100 - progress * 100}% 0 0)`,
              transition: "clip-path 1s linear",
            }}
          />
        </div>
      </div>

      {/* Click Message */}
      {clickMessage && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/80 text-white px-4 py-2 rounded-lg animate-fade-in z-10">
          {clickMessage}
        </div>
      )}

      {/* Confetti */}
      {showCompletionMessage &&
        confetti.map((conf) => (
          <div
            key={conf.id}
            className="absolute top-0 text-4xl animate-confetti pointer-events-none"
            style={{
              left: `${conf.left}%`,
              animationDelay: `${conf.delay}s`,
            }}
          >
            {conf.emoji}
          </div>
        ))}

      {/* Completion Message */}
      {showCompletionMessage && (
        <div className="mt-4 text-center">
          <p className="text-4xl font-bold text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text animate-rainbow-pulse">
            🎉✨ {t("completed")} ✨🎉
          </p>
        </div>
      )}
    </div>
  );
}
