import fs from "fs";
import path from "path";
import JSZip from "jszip";
import { VOLUMES } from "@/lib/volumes";
import { getChaptersForVolume } from "@/lib/content";

const CONTENT_DIR = path.join(process.cwd(), "content");

// Raw, unmodified file (frontmatter + body) so a downloaded file is a complete,
// self-describing Markdown note — usable directly as an Obsidian vault entry.
export function getRawChapter(volumeSlug: string, chapterSlug: string): string | null {
  const p = path.join(CONTENT_DIR, "volumes", volumeSlug, chapterSlug, "index.mdx");
  if (!fs.existsSync(p)) return null;
  return fs.readFileSync(p, "utf-8");
}

export function getRawAppendix(id: string): string | null {
  const p = path.join(CONTENT_DIR, "appendices", `${id}.mdx`);
  if (!fs.existsSync(p)) return null;
  return fs.readFileSync(p, "utf-8");
}

// A safe, readable filename slug for a downloaded file.
function fileSlug(s: string): string {
  return s.replace(/[^a-z0-9-]+/gi, "-").replace(/^-+|-+$/g, "").toLowerCase();
}

export function chapterFileName(volumeSlug: string, chapterSlug: string): string {
  const vol = VOLUMES.find((v) => v.slug === volumeSlug);
  const num = vol ? String(vol.number).padStart(2, "0") : "00";
  return `vol-${num}-${fileSlug(volumeSlug)}--${fileSlug(chapterSlug)}.md`;
}

// One combined Markdown file for a whole volume (cover + every chapter, raw).
export function buildVolumeMarkdown(volumeSlug: string): string | null {
  const vol = VOLUMES.find((v) => v.slug === volumeSlug);
  if (!vol) return null;
  const chapters = getChaptersForVolume(volumeSlug);

  const header = [
    `# Volume ${vol.number}: ${vol.title}`,
    "",
    `> ${vol.subtitle}`,
    "",
    vol.description,
    "",
    `Phase ${vol.phase} · ${vol.difficulty} · ${chapters.length} chapters`,
    "",
    "## Contents",
    "",
    ...chapters.map((c) => `${String(c.chapter).padStart(2, "0")}. ${c.title}`),
    "",
    "---",
    "",
  ].join("\n");

  const body = chapters
    .map((c) => {
      const raw = getRawChapter(volumeSlug, c.slug);
      return raw ? `\n\n---\n\n${raw}` : "";
    })
    .join("");

  return header + body;
}

// Zip of one volume: every chapter as its own .md file (mirrors the vault layout)
// plus a combined single-file copy for convenience.
export async function buildVolumeZip(volumeSlug: string): Promise<Uint8Array | null> {
  const vol = VOLUMES.find((v) => v.slug === volumeSlug);
  if (!vol) return null;
  const chapters = getChaptersForVolume(volumeSlug);
  const zip = new JSZip();
  const folder = zip.folder(`vol-${String(vol.number).padStart(2, "0")}-${volumeSlug}`)!;

  for (const c of chapters) {
    const raw = getRawChapter(volumeSlug, c.slug);
    // Chapter slugs are already number-prefixed (e.g. "01-cell-theory").
    if (raw) folder.file(`${c.slug}.md`, raw);
  }
  const combined = buildVolumeMarkdown(volumeSlug);
  if (combined) folder.file(`_${volumeSlug}-complete.md`, combined);

  return zip.generateAsync({ type: "uint8array", compression: "DEFLATE" });
}

// Zip of the entire guide: every volume folder (chapters as separate .md) plus
// all appendices. This is a ready-to-open Obsidian vault of the whole project.
export async function buildFullZip(): Promise<Uint8Array> {
  const zip = new JSZip();
  const volumesRoot = zip.folder("guide-to-civilization")!;

  for (const vol of VOLUMES) {
    const chapters = getChaptersForVolume(vol.slug);
    if (chapters.length === 0) continue;
    const folder = volumesRoot.folder(
      `volumes/vol-${String(vol.number).padStart(2, "0")}-${vol.slug}`,
    )!;
    for (const c of chapters) {
      const raw = getRawChapter(vol.slug, c.slug);
      if (raw) folder.file(`${c.slug}.md`, raw);
    }
  }

  // Appendices
  const appDir = path.join(CONTENT_DIR, "appendices");
  if (fs.existsSync(appDir)) {
    const appFolder = volumesRoot.folder("appendices")!;
    for (const f of fs.readdirSync(appDir)) {
      if (!f.endsWith(".mdx")) continue;
      const raw = fs.readFileSync(path.join(appDir, f), "utf-8");
      appFolder.file(f.replace(/\.mdx$/, ".md"), raw);
    }
  }

  return zip.generateAsync({ type: "uint8array", compression: "DEFLATE" });
}
