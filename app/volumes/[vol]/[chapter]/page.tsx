import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { VOLUMES, COLOR_CLASSES } from "@/lib/volumes";
import { getChapter, getChaptersForVolume } from "@/lib/content";

interface Props {
  params: Promise<{ vol: string; chapter: string }>;
}

export async function generateStaticParams() {
  const params: { vol: string; chapter: string }[] = [];
  for (const vol of VOLUMES) {
    const chapters = getChaptersForVolume(vol.slug);
    for (const ch of chapters) {
      params.push({ vol: vol.slug, chapter: ch.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props) {
  const { vol, chapter } = await params;
  const ch = getChapter(vol, chapter);
  if (!ch) return {};
  const volume = VOLUMES.find((v) => v.slug === vol);
  return {
    title: `${ch.title} | Vol ${volume?.number ?? ""}: ${volume?.title ?? ""} | Guide to Civilization`,
    description: ch.summary,
  };
}

export default async function ChapterPage({ params }: Props) {
  const { vol, chapter } = await params;
  const volume = VOLUMES.find((v) => v.slug === vol);
  if (!volume) notFound();

  const ch = getChapter(vol, chapter);
  if (!ch) notFound();

  const allChapters = getChaptersForVolume(vol);
  const chIndex = allChapters.findIndex((c) => c.slug === chapter);
  const prevCh = chIndex > 0 ? allChapters[chIndex - 1] : null;
  const nextCh = chIndex < allChapters.length - 1 ? allChapters[chIndex + 1] : null;

  const colors = COLOR_CLASSES[volume.color];

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-gray-500 dark:text-gray-400 print:hidden">
        <Link href="/" className="hover:text-gray-700 dark:hover:text-gray-200">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/volumes" className="hover:text-gray-700 dark:hover:text-gray-200">Volumes</Link>
        <span className="mx-2">/</span>
        <Link href={`/volumes/${vol}`} className="hover:text-gray-700 dark:hover:text-gray-200">
          Vol {volume.number}: {volume.title}
        </Link>
        <span className="mx-2">/</span>
        <span>{ch.title}</span>
      </nav>

      {/* Print header */}
      <div className="hidden print:block mb-6 pb-4 border-b">
        <p className="text-sm text-gray-500">
          Guide to Civilization — Vol {volume.number}: {volume.title}
        </p>
        <h1 className="text-2xl font-bold mt-1">{ch.title}</h1>
      </div>

      <div className="flex gap-8">
        {/* Chapter TOC sidebar */}
        <aside className="hidden lg:block w-56 shrink-0 print:hidden">
          <div className="sticky top-20">
            <div className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3">
              Vol {volume.number} Chapters
            </div>
            <nav className="space-y-0.5">
              {allChapters.map((c) => (
                <Link
                  key={c.slug}
                  href={`/volumes/${vol}/${c.slug}`}
                  className={`flex items-start gap-2 rounded px-2 py-1.5 text-xs transition-colors ${
                    c.slug === chapter
                      ? `${colors.text} font-semibold`
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                  }`}
                >
                  <span className="font-mono shrink-0 mt-px">
                    {String(c.chapter).padStart(2, "0")}
                  </span>
                  <span className="line-clamp-2">{c.title}</span>
                </Link>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Chapter header */}
          <div className="mb-8">
            <div className={`mb-2 text-xs font-semibold uppercase tracking-wider ${colors.text}`}>
              Chapter {ch.chapter}
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
              {ch.title}
            </h1>
            {ch.summary && (
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed border-l-4 border-gray-200 dark:border-gray-700 pl-4">
                {ch.summary}
              </p>
            )}

            {/* Metadata pills */}
            <div className="mt-4 flex flex-wrap gap-2">
              {ch.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-gray-100 dark:bg-gray-800 px-2.5 py-0.5 text-xs text-gray-600 dark:text-gray-400"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Prerequisites */}
            {ch.prerequisites.length > 0 && (
              <div className="mt-4 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3">
                <div className="text-xs font-semibold text-amber-700 dark:text-amber-400 mb-1">
                  Prerequisites
                </div>
                <ul className="text-sm text-amber-800 dark:text-amber-300 space-y-0.5">
                  {ch.prerequisites.map((p) => (
                    <li key={p}>— {p}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Unlocks */}
            {ch.unlocks.length > 0 && (
              <div className="mt-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 p-3">
                <div className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 mb-1">
                  This chapter unlocks
                </div>
                <ul className="text-sm text-emerald-800 dark:text-emerald-300 space-y-0.5">
                  {ch.unlocks.map((u) => (
                    <li key={u}>→ {u}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* MDX content */}
          <div className="prose-chapter">
            <MDXRemote
              source={ch.content}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [rehypeSlug],
                },
              }}
            />
          </div>

          {/* Chapter navigation */}
          <div className="mt-12 flex justify-between gap-4 pt-6 border-t border-gray-200 dark:border-gray-800 print:hidden">
            {prevCh ? (
              <Link
                href={`/volumes/${vol}/${prevCh.slug}`}
                className="flex-1 rounded-lg border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
              >
                <div className="text-xs text-gray-400 dark:text-gray-500 mb-1">
                  ← Previous Chapter
                </div>
                <div className="font-medium truncate">{prevCh.title}</div>
              </Link>
            ) : (
              <Link
                href={`/volumes/${vol}`}
                className="flex-1 rounded-lg border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
              >
                <div className="text-xs text-gray-400 dark:text-gray-500 mb-1">
                  ← Back to Volume
                </div>
                <div className="font-medium">Vol {volume.number}: {volume.title}</div>
              </Link>
            )}
            {nextCh && (
              <Link
                href={`/volumes/${vol}/${nextCh.slug}`}
                className="flex-1 rounded-lg border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-right hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
              >
                <div className="text-xs text-gray-400 dark:text-gray-500 mb-1">
                  Next Chapter →
                </div>
                <div className="font-medium truncate">{nextCh.title}</div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
