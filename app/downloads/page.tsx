import Link from "next/link";
import { VOLUMES, COLOR_CLASSES } from "@/lib/volumes";
import { getContentProgress } from "@/lib/content";

export const metadata = {
  title: "Downloads | Guide to Civilization",
  description:
    "Download the entire Guide to Civilization as Markdown — by chapter, by volume, or the complete archive as an Obsidian-ready vault.",
};

export default function DownloadsPage() {
  const progress = getContentProgress();

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <nav className="mb-6 text-sm text-gray-500 dark:text-gray-400">
        <Link href="/" className="hover:text-gray-700 dark:hover:text-gray-200">Home</Link>
        <span className="mx-2">/</span>
        <span>Downloads</span>
      </nav>

      <h1 className="text-3xl font-bold mb-2">Downloads</h1>
      <p className="mb-8 max-w-2xl text-gray-600 dark:text-gray-400">
        The whole guide is plain Markdown. Take a single chapter, a full volume, or the
        complete archive. The complete download is a folder of <code>.md</code> files that
        opens directly as an Obsidian vault.
      </p>

      {/* Complete download */}
      <div className="mb-10 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold">The complete guide</h2>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              All {progress.written} chapters across {VOLUMES.length} volumes, plus every
              appendix, bundled as a structured Markdown vault (.zip).
            </p>
          </div>
          <a
            href="/download/all"
            download
            className="rounded-lg bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-5 py-3 text-sm font-semibold hover:opacity-80 transition-opacity"
          >
            Download everything (.zip)
          </a>
        </div>
      </div>

      {/* Per-volume downloads */}
      <h2 className="text-xl font-bold mb-4">By volume</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {VOLUMES.map((vol) => {
          const count = progress.byVolume[vol.slug] ?? 0;
          const colors = COLOR_CLASSES[vol.color];
          return (
            <div
              key={vol.slug}
              className="flex items-center justify-between gap-3 rounded-xl border border-gray-100 dark:border-gray-800 p-4"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className={`rounded px-1.5 py-0.5 text-xs font-mono font-semibold ${colors.badge}`}>
                    {String(vol.number).padStart(2, "0")}
                  </span>
                  <Link
                    href={`/volumes/${vol.slug}`}
                    className="font-medium text-gray-900 dark:text-white truncate hover:underline"
                  >
                    {vol.title}
                  </Link>
                </div>
                <div className="mt-0.5 text-xs text-gray-400 dark:text-gray-500">
                  {count} chapter{count === 1 ? "" : "s"}
                </div>
              </div>
              {count > 0 ? (
                <a
                  href={`/download/volume/${vol.slug}`}
                  download
                  className="shrink-0 rounded-lg border border-gray-200 dark:border-gray-700 px-3 py-2 text-xs font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  .zip
                </a>
              ) : (
                <span className="shrink-0 text-xs text-gray-300 dark:text-gray-600">—</span>
              )}
            </div>
          );
        })}
      </div>

      <p className="mt-8 text-sm text-gray-500 dark:text-gray-400">
        Want a single chapter? Open any chapter and use its <strong>Download .md</strong> button.
      </p>
    </div>
  );
}
