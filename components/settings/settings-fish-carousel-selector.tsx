"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function SettingsFishCarouselSelector({
  onSelect,
}: {
  onSelect?: (fish: number) => void;
}) {
  const [selected, setSelected] = useState(1);
  const fishes = [1, 2, 3];

  const handleSelect = (num: number) => {
    setSelected(num);
    onSelect?.(num);
  };

  return (
    <div>
      <Carousel className="max-w-xs mx-auto">
        <CarouselContent>
          {fishes.map((num) => (
            <CarouselItem key={num} className="w-16 h-16 flex-shrink-0">
              <button
                onClick={() => handleSelect(num)}
                className={`rounded-xl border-2 p-2 transition ${
                  selected === num
                    ? "border-primary bg-primary/10"
                    : "border-transparent hover:border-muted-foreground/30"
                }`}
              >
                <Image
                  src={`/images/fish/${num}.png`}
                  alt={`Fish ${num}`}
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
