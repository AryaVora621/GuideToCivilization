import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content");

export interface ChapterMeta {
  slug: string;
  title: string;
  volume: number;
  chapter: number;
  difficulty: string;
  prerequisites: string[];
  unlocks: string[];
  tags: string[];
  summary: string;
}

export interface Chapter extends ChapterMeta {
  content: string;
}

export function getChaptersForVolume(volumeSlug: string): ChapterMeta[] {
  const volumeDir = path.join(CONTENT_DIR, "volumes", volumeSlug);
  if (!fs.existsSync(volumeDir)) return [];

  const entries = fs.readdirSync(volumeDir, { withFileTypes: true });
  const chapters: ChapterMeta[] = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const mdxPath = path.join(volumeDir, entry.name, "index.mdx");
    if (!fs.existsSync(mdxPath)) continue;

    const raw = fs.readFileSync(mdxPath, "utf-8");
    const { data } = matter(raw);

    chapters.push({
      slug: entry.name,
      title: data.title ?? entry.name,
      volume: data.volume ?? 0,
      chapter: data.chapter ?? 0,
      difficulty: data.difficulty ?? "short-term",
      prerequisites: data.prerequisites ?? [],
      unlocks: data.unlocks ?? [],
      tags: data.tags ?? [],
      summary: data.summary ?? "",
    });
  }

  return chapters.sort((a, b) => a.chapter - b.chapter);
}

export function getChapter(volumeSlug: string, chapterSlug: string): Chapter | null {
  const mdxPath = path.join(CONTENT_DIR, "volumes", volumeSlug, chapterSlug, "index.mdx");
  if (!fs.existsSync(mdxPath)) return null;

  const raw = fs.readFileSync(mdxPath, "utf-8");
  const { data, content } = matter(raw);

  return {
    slug: chapterSlug,
    title: data.title ?? chapterSlug,
    volume: data.volume ?? 0,
    chapter: data.chapter ?? 0,
    difficulty: data.difficulty ?? "short-term",
    prerequisites: data.prerequisites ?? [],
    unlocks: data.unlocks ?? [],
    tags: data.tags ?? [],
    summary: data.summary ?? "",
    content,
  };
}

export function getAllChaptersForSearch(): (ChapterMeta & { volumeSlug: string })[] {
  const volumesDir = path.join(CONTENT_DIR, "volumes");
  if (!fs.existsSync(volumesDir)) return [];

  const results: (ChapterMeta & { volumeSlug: string })[] = [];
  const volumes = fs.readdirSync(volumesDir, { withFileTypes: true });

  for (const vol of volumes) {
    if (!vol.isDirectory()) continue;
    const chapters = getChaptersForVolume(vol.name);
    for (const ch of chapters) {
      results.push({ ...ch, volumeSlug: vol.name });
    }
  }

  return results;
}

// Total chapters planned across all 45 volumes (source: scripts/tasks.db seed).
// Used as the denominator for content-progress display.
export const TOTAL_CHAPTERS_PLANNED = 317;

// Number of fully-written chapters in a volume (counts index.mdx files on disk).
export function getWrittenChapterCount(volumeSlug: string): number {
  return getChaptersForVolume(volumeSlug).length;
}

// Live content progress derived from the filesystem, not a static count, so the
// site reflects whatever the content-generation agents have written so far.
export function getContentProgress(): {
  written: number;
  planned: number;
  byVolume: Record<string, number>;
} {
  const volumesDir = path.join(CONTENT_DIR, "volumes");
  const byVolume: Record<string, number> = {};
  let written = 0;

  if (fs.existsSync(volumesDir)) {
    for (const vol of fs.readdirSync(volumesDir, { withFileTypes: true })) {
      if (!vol.isDirectory()) continue;
      const count = getChaptersForVolume(vol.name).length;
      byVolume[vol.name] = count;
      written += count;
    }
  }

  return { written, planned: TOTAL_CHAPTERS_PLANNED, byVolume };
}

export function getVolumeMeta(volumeSlug: string): Record<string, string> | null {
  const metaPath = path.join(CONTENT_DIR, "volumes", volumeSlug, "_meta.json");
  if (!fs.existsSync(metaPath)) return null;
  return JSON.parse(fs.readFileSync(metaPath, "utf-8"));
}

export function getAppendix(id: string): { content: string; title: string } | null {
  const mdxPath = path.join(CONTENT_DIR, "appendices", `${id}.mdx`);
  if (!fs.existsSync(mdxPath)) return null;

  const raw = fs.readFileSync(mdxPath, "utf-8");
  const { data, content } = matter(raw);
  return { content, title: data.title ?? id };
}
