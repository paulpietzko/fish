import { fish } from "@/lib/fish-data";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

export default function FishReferencesPage() {
  const t = useTranslations("Fish.fishReferences");
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">{t("title")}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {fish.map((fish) => (
          <div
            key={fish.id}
            className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
          >
            <Link
              href={fish.source}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 no-underline transition-colors"
            >
              <h2 className="text-xl font-bold mb-2 text-gray-800">
                {fish.name}
              </h2>
              <p className="text-gray-600">
                <Image
                  src={`/images/fish/${fish.id}.png`}
                  alt={fish.name}
                  width={150}
                  height={150}
                />
                <pre className="mt-2 text-sm text-gray-500 whitespace-pre-wrap">
                  {fish.source}
                </pre>
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
