import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import SettingsProvider from "@/components/settings/settings-context";
import SettingsButton from "@/components/settings/settings-button";
import SettingsDialog from "@/components/settings/settings-dialog";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Footer from "@/components/layout/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const defaultUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? `${process.env.NEXT_PUBLIC_SITE_URL}`
  : "https://ich-mach-den-fisch.vercel.app/de";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: {
    default: "Fish | When can I do the fish again?",
    template: "%s | Fish",
  },
  description: "",
  keywords: [
    "fish",
    "timer",
    "work",
    "break",
    "after-work",
    "bored",
  ],
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SettingsProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NextIntlClientProvider>
              {/* Top-right settings button */}
              <div className="fixed top-4 right-4 z-50">
                <SettingsButton />
              </div>

              {/* The dialog component is mounted at the root so it can be opened from anywhere */}
              <SettingsDialog />

              {children}
              <Footer />
            </NextIntlClientProvider>
          </ThemeProvider>
        </SettingsProvider>
      </body>
    </html>
  );
}
