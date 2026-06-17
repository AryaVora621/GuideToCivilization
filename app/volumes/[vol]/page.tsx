import Link from "next/link";
import { notFound } from "next/navigation";
import { VOLUMES, COLOR_CLASSES } from "@/lib/volumes";
import { getChaptersForVolume } from "@/lib/content";

interface Props {
  params: Promise<{ vol: string }>;
}

export async function generateStaticParams() {
  return VOLUMES.map((v) => ({ vol: v.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { vol } = await params;
  const volume = VOLUMES.find((v) => v.slug === vol);
  if (!volume) return {};
  return {
    title: `Vol ${volume.number}: ${volume.title} | Guide to Civilization`,
    description: volume.description,
  };
}

export default async function VolumePage({ params }: Props) {
  const { vol } = await params;
  const volume = VOLUMES.find((v) => v.slug === vol);
  if (!volume) notFound();

  const colors = COLOR_CLASSES[volume.color];
  const chapters = getChaptersForVolume(vol);

  const volIndex = VOLUMES.findIndex((v) => v.slug === vol);
  const prevVol = volIndex > 0 ? VOLUMES[volIndex - 1] : null;
  const nextVol = volIndex < VOLUMES.length - 1 ? VOLUMES[volIndex + 1] : null;

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-gray-500 dark:text-gray-400 print:hidden">
        <Link href="/" className="hover:text-gray-700 dark:hover:text-gray-200">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/volumes" className="hover:text-gray-700 dark:hover:text-gray-200">Volumes</Link>
        <span className="mx-2">/</span>
        <span>Vol {volume.number}</span>
      </nav>

      {/* Volume header */}
      <div className={`rounded-xl border p-8 mb-8 ${colors.bg} ${colors.border}`}>
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className={`mb-2 text-xs font-semibold uppercase tracking-wider ${colors.text}`}>
              Volume {volume.number} — Phase {volume.phase}
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {volume.title}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 italic mb-4">
              {volume.subtitle}
            </p>
            <p className="text-gray-700 dark:text-gray-300 max-w-2xl">
              {volume.description}
            </p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${colors.badge}`}>
              {volume.difficulty}
            </span>
            <Link
              href={`/print/${vol}`}
              className="rounded-full border border-current px-3 py-1 text-xs font-semibold opacity-60 hover:opacity-100 transition-opacity print:hidden"
            >
              Print Volume
            </Link>
            {chapters.length > 0 && (
              <a
                href={`/download/volume/${vol}`}
                download
                className="rounded-full border border-current px-3 py-1 text-xs font-semibold opacity-60 hover:opacity-100 transition-opacity print:hidden"
              >
                Download .zip
              </a>
            )}
          </div>
        </div>

        {/* Key topics */}
        <div className="mt-6">
          <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">
            Key Topics
          </div>
          <div className="flex flex-wrap gap-2">
            {volume.keyTopics.map((topic) => (
              <span
                key={topic}
                className="rounded-full bg-white/60 dark:bg-black/20 border border-current/20 px-3 py-1 text-xs text-gray-700 dark:text-gray-300"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Chapters */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">
          Chapters
          {chapters.length === 0 && (
            <span className="ml-2 text-sm font-normal text-gray-400 dark:text-gray-500">
              — content being added
            </span>
          )}
        </h2>

        {chapters.length > 0 ? (
          <div className="space-y-2">
            {chapters.map((ch) => (
              <Link
                key={ch.slug}
                href={`/volumes/${vol}/${ch.slug}`}
                className="flex items-baseline gap-4 rounded-lg border border-gray-100 dark:border-gray-800 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors group"
              >
                <span className="shrink-0 w-8 text-xs font-mono text-gray-400">
                  {String(ch.chapter).padStart(2, "0")}
                </span>
                <div className="flex-1 min-w-0">
                  <span className="font-medium text-gray-900 dark:text-white group-hover:underline block">
                    {ch.title}
                  </span>
                  {ch.summary && (
                    <span className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                      {ch.summary}
                    </span>
                  )}
                </div>
                {ch.difficulty && (
                  <span className="shrink-0 text-xs text-gray-400 dark:text-gray-500">
                    {ch.difficulty}
                  </span>
                )}
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-gray-200 dark:border-gray-800 p-10 text-center text-gray-400 dark:text-gray-500">
            <p className="text-sm">Chapters are being written for this volume.</p>
            <p className="text-xs mt-1">Check back soon or contribute via GitHub.</p>
          </div>
        )}
      </div>

      {/* Volume navigation */}
      <div className="flex justify-between gap-4 pt-6 border-t border-gray-200 dark:border-gray-800 print:hidden">
        {prevVol ? (
          <Link
            href={`/volumes/${prevVol.slug}`}
            className="flex-1 rounded-lg border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
          >
            <div className="text-xs text-gray-400 dark:text-gray-500 mb-1">
              ← Previous
            </div>
            <div className="font-medium truncate">
              Vol {prevVol.number}: {prevVol.title}
            </div>
          </Link>
        ) : (
          <div />
        )}
        {nextVol ? (
          <Link
            href={`/volumes/${nextVol.slug}`}
            className="flex-1 rounded-lg border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-right hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
          >
            <div className="text-xs text-gray-400 dark:text-gray-500 mb-1">
              Next →
            </div>
            <div className="font-medium truncate">
              Vol {nextVol.number}: {nextVol.title}
            </div>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
