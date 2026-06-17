import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Guide to Civilization",
  description:
    "A comprehensive manual for restarting human civilization — 45 volumes covering survival through advanced technology.",
  manifest: "/manifest.json",
};

export const viewport = {
  themeColor: "#111827",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      {/* suppressHydrationWarning: browser extensions (e.g. Grammarly) inject
          data-* attributes on <body> before React hydrates, causing a benign
          hydration attribute mismatch. This scopes the suppression to <body>. */}
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100"
      >
        <header className="sticky top-0 z-40 border-b border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-gray-950/90 backdrop-blur-sm print:hidden">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-14 items-center justify-between">
              <Link href="/" className="flex items-center gap-2">
                <span className="text-lg font-bold tracking-tight">
                  Guide to Civilization
                </span>
                <span className="hidden text-xs text-gray-500 dark:text-gray-400 sm:block">
                  45 volumes
                </span>
              </Link>
              <nav className="flex items-center gap-6 text-sm font-medium text-gray-600 dark:text-gray-300">
                <Link
                  href="/volumes"
                  className="hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Volumes
                </Link>
                <Link
                  href="/appendices"
                  className="hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Appendices
                </Link>
                <Link
                  href="/tech-tree"
                  className="hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Tech Tree
                </Link>
                <Link
                  href="/graph"
                  className="hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Graph
                </Link>
                <Link
                  href="/downloads"
                  className="hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Downloads
                </Link>
                <Link
                  href="/search"
                  className="hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Search
                </Link>
              </nav>
            </div>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-gray-200 dark:border-gray-800 py-8 text-center text-sm text-gray-500 dark:text-gray-400 print:hidden">
          <div className="mx-auto max-w-7xl px-4">
            <p>
              Guide to Civilization — 45 volumes, 12 appendices. Built for
              redundancy.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
