import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { VOLUMES, COLOR_CLASSES } from "@/lib/volumes";
import { getChaptersForVolume, getChapter } from "@/lib/content";
import { PrintButton } from "@/components/PrintButton";

interface Props {
  params: Promise<{ vol: string }>;
}

export async function generateStaticParams() {
  return VOLUMES.map((v) => ({ vol: v.slug }));
}

export default async function PrintVolumePage({ params }: Props) {
  const { vol } = await params;
  const volume = VOLUMES.find((v) => v.slug === vol);
  if (!volume) notFound();

  const colors = COLOR_CLASSES[volume.color];
  const chapterMetas = getChaptersForVolume(vol);
  const chapters = chapterMetas
    .map((meta) => {
      const full = getChapter(vol, meta.slug);
      return full ? { ...meta, content: full.content } : null;
    })
    .filter(Boolean) as (typeof chapterMetas[0] & { content: string })[];

  return (
    <div className="max-w-3xl mx-auto px-8 py-12 print:px-0 print:py-0">
      {/* Print controls */}
      <div className="mb-8 flex gap-3 print:hidden">
        <PrintButton />
        <a
          href={`/volumes/${vol}`}
          className="rounded-lg border border-gray-200 dark:border-gray-700 px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          ← Back to Volume
        </a>
      </div>

      {/* Volume cover page */}
      <div className="mb-12 pb-12 border-b-2 border-gray-300 print:border-gray-800">
        <div className="text-sm text-gray-500 mb-2">
          Guide to Civilization — Volume {volume.number}
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3 print:text-black">
          {volume.title}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-6 print:text-gray-700">
          {volume.subtitle}
        </p>
        <p className="text-gray-700 dark:text-gray-300 print:text-gray-800">
          {volume.description}
        </p>

        {/* Table of Contents for print */}
        {chapters.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-bold mb-3">Contents</h2>
            <ol className="space-y-1">
              {chapters.map((ch) => (
                <li key={ch.slug} className="flex gap-3 text-sm">
                  <span className="font-mono text-gray-400 w-6 shrink-0">
                    {String(ch.chapter).padStart(2, "0")}
                  </span>
                  <span>{ch.title}</span>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>

      {/* All chapters */}
      {chapters.map((ch, i) => (
        <article
          key={ch.slug}
          className={i > 0 ? "mt-16 pt-16 border-t border-gray-200 print:border-gray-400" : ""}
          style={{ pageBreakBefore: i > 0 ? "always" : "auto" }}
        >
          <div className={`text-xs font-semibold uppercase tracking-wider mb-1 print:text-gray-500 ${colors.text}`}>
            Chapter {ch.chapter}
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 print:text-black">
            {ch.title}
          </h2>
          {ch.summary && (
            <p className="text-gray-600 dark:text-gray-400 italic mb-6 border-l-4 border-gray-200 pl-4 print:text-gray-600">
              {ch.summary}
            </p>
          )}
          <div className="prose-chapter">
            <MDXRemote
              source={ch.content}
              options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
            />
          </div>
        </article>
      ))}

      {chapters.length === 0 && (
        <div className="text-center text-gray-400 py-16 print:hidden">
          <p>No chapter content yet. Chapters are being written.</p>
        </div>
      )}
    </div>
  );
}
