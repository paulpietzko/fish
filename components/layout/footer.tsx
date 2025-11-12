import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full p-4 text-center text-sm text-gray-500">
      <p>
        Made by{" "}
        <Link href="https://github.com/paulpietzko/fish/graphs/contributors">
          bored devs
        </Link>{" "}
        | Spnsored by <Link href="https://www.nanosights.dev">NanoSights</Link>
      </p>
      <p>Copryright © {new Date().getFullYear()}. All rights reserved.</p>
    </footer>
  );
}
