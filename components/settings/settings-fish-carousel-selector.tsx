"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { fish } from "@/lib/fish-data";

export default function SettingsFishCarouselSelector({
  initialFish = 1,
  onSelect,
}: {
  initialFish?: number;
  onSelect?: (fish: number) => void;
}) {
  const [selected, setSelected] = useState(initialFish);

  // Update selected fish when initialFish changes
  useEffect(() => {
    setSelected(initialFish);
  }, [initialFish]);

  const handleSelect = (num: number) => {
    setSelected(num);
    onSelect?.(num);
  };

  return (
    <div>
      <Carousel className="max-w-xs mx-auto">
        <CarouselContent>
          {fish.map((fish) => (
            <CarouselItem key={fish.id} className="w-16 h-full flex-shrink-0">
              <button
                onClick={() => handleSelect(fish.id)}
                className={`rounded-xl border-2 p-2 transition ${
                  selected === fish.id
                    ? "border-primary bg-primary/10"
                    : "border-transparent hover:border-muted-foreground/30"
                }`}
              >
                <Image
                  src={`/images/fish/${fish.id}.png`}
                  alt={`Fish ${fish.name}`}
                  width={128}
                  height={128}
                  className="w-full h-full object-contain"
                />
              </button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-between mt-2">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </Carousel>
    </div>
  );
}
