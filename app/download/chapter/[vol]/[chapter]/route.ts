import { VOLUMES } from "@/lib/volumes";
import { getChaptersForVolume } from "@/lib/content";
import { getRawChapter, chapterFileName } from "@/lib/download";

// Pre-render every chapter download as a static file at build time (fs reads happen
// at build, where the content directory reliably exists — robust on Vercel).
export const dynamic = "force-static";

export function generateStaticParams() {
  const params: { vol: string; chapter: string }[] = [];
  for (const vol of VOLUMES) {
    for (const ch of getChaptersForVolume(vol.slug)) {
      params.push({ vol: vol.slug, chapter: ch.slug });
    }
  }
  return params;
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ vol: string; chapter: string }> },
) {
  const { vol, chapter } = await params;
  const raw = getRawChapter(vol, chapter);
  if (!raw) return new Response("Not found", { status: 404 });

  return new Response(raw, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Content-Disposition": `attachment; filename="${chapterFileName(vol, chapter)}"`,
    },
  });
}
