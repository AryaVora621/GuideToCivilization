// Run via: npx tsx scripts/build-search-index.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content");
const OUT_PATH = path.join(process.cwd(), "public", "search-index.json");

interface SearchItem {
  title: string;
  summary: string;
  tags: string[];
  volumeSlug: string;
  volumeTitle: string;
  volumeNumber: number;
  chapterSlug: string;
  chapter: number;
}

const items: SearchItem[] = [];

const volumesDir = path.join(CONTENT_DIR, "volumes");
const volDirs = fs.readdirSync(volumesDir, { withFileTypes: true });

for (const volDir of volDirs) {
  if (!volDir.isDirectory()) continue;
  const volPath = path.join(volumesDir, volDir.name);

  // Get volume meta
  const metaPath = path.join(volPath, "_meta.json");
  const meta = fs.existsSync(metaPath)
    ? JSON.parse(fs.readFileSync(metaPath, "utf-8"))
    : { title: volDir.name, number: 0 };

  const chDirs = fs.readdirSync(volPath, { withFileTypes: true });
  for (const chDir of chDirs) {
    if (!chDir.isDirectory()) continue;
    const mdxPath = path.join(volPath, chDir.name, "index.mdx");
    if (!fs.existsSync(mdxPath)) continue;

    const raw = fs.readFileSync(mdxPath, "utf-8");
    const { data } = matter(raw);

    items.push({
      title: data.title ?? chDir.name,
      summary: data.summary ?? "",
      tags: data.tags ?? [],
      volumeSlug: volDir.name,
      volumeTitle: meta.title,
      volumeNumber: meta.number ?? data.volume ?? 0,
      chapterSlug: chDir.name,
      chapter: data.chapter ?? 0,
    });
  }
}

fs.writeFileSync(OUT_PATH, JSON.stringify(items, null, 2));
console.log(`Built search index: ${items.length} chapters → ${OUT_PATH}`);
