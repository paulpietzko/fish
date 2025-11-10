import Image from "next/image";

export default function Fish({ selectedFish = 1 }: { selectedFish?: number }) {
  const imgSrc = `/images/fish/${selectedFish}.png`;

  return (
    <div className="flex justify-center">
      <Image
        src={imgSrc}
        alt={`Fish ${selectedFish}`}
        width={800}
        height={800}
        className="object-contain transition-transform duration-300"
        priority
      />
    </div>
  );
}
