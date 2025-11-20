import { useTranslations } from "next-intl";
import Link from "next/link";

export default function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer className="w-full p-4 text-center text-sm text-gray-500">
      <p>
        {t("madeBy")}{" "}
        <Link href="https://github.com/paulpietzko/fish/graphs/contributors">
          {t("boredDevs")}
        </Link>{" "}
        | {t("sponsoredBy")} <Link href="https://www.nanosights.dev">NanoSights</Link>
      </p>
      <p>
        {t("copyright", { year: new Date().getFullYear() })}
      </p>
      <Link href="fish-references">{t("fishReferences")}</Link>
    </footer>
  );
}
