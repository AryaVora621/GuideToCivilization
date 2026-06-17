import { VOLUMES } from "@/lib/volumes";
import { getChaptersForVolume } from "@/lib/content";
import type { GraphNode, GraphEdge } from "@/lib/graph-types";

export type { GraphNode, GraphEdge } from "@/lib/graph-types";
export { PHASE_COLORS, PHASE_LABELS } from "@/lib/graph-types";

// Build a volume-level dependency graph. Edges are derived from each chapter's
// `prerequisites` frontmatter, which references other volumes as "Vol N" — we
// extract those numbers, map them to volumes, and aggregate up to volume→volume
// edges (deduped, weighted by how many chapters cite the dependency).
//
// Server-only: reads the filesystem via getChaptersForVolume.
export function buildVolumeGraph(): { nodes: GraphNode[]; edges: GraphEdge[] } {
  const byNumber = new Map<number, (typeof VOLUMES)[number]>();
  for (const v of VOLUMES) byNumber.set(v.number, v);

  const nodes: GraphNode[] = [];
  const edgeWeights = new Map<string, number>(); // "src->tgt" -> weight

  for (const vol of VOLUMES) {
    const chapters = getChaptersForVolume(vol.slug);
    nodes.push({
      id: vol.slug,
      number: vol.number,
      title: vol.title,
      phase: vol.phase,
      chapters: chapters.length,
    });

    for (const ch of chapters) {
      const seenThisChapter = new Set<number>();
      for (const pre of ch.prerequisites) {
        // Match "Vol 12", "Vol 12:", "Vol 12,", "Vol 12 —" etc.
        const re = /\bVol\.?\s*(\d{1,2})\b/gi;
        let m: RegExpExecArray | null;
        while ((m = re.exec(pre)) !== null) {
          const srcNum = parseInt(m[1], 10);
          if (srcNum === vol.number) continue; // ignore self-references
          if (seenThisChapter.has(srcNum)) continue;
          seenThisChapter.add(srcNum);
          const src = byNumber.get(srcNum);
          if (!src) continue;
          const key = `${src.slug}->${vol.slug}`;
          edgeWeights.set(key, (edgeWeights.get(key) ?? 0) + 1);
        }
      }
    }
  }

  const edges: GraphEdge[] = [];
  for (const [key, weight] of edgeWeights) {
    const [source, target] = key.split("->");
    edges.push({ source, target, weight });
  }

  return { nodes, edges };
}
