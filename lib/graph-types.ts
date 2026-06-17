import type { Phase } from "@/lib/volumes";

// Client-safe graph types and constants (NO filesystem imports), so client
// components can import these without pulling `fs`-using server code into the bundle.

export interface GraphNode {
  id: string; // volume slug
  number: number;
  title: string;
  phase: Phase;
  chapters: number;
}

export interface GraphEdge {
  source: string; // prerequisite volume slug
  target: string; // dependent volume slug
  weight: number; // how many chapters reference it
}

// Phase → accent hex (canvas-rendered nodes need real colors, not Tailwind classes).
export const PHASE_COLORS: Record<Phase, string> = {
  1: "#ef4444", // red — immediate survival
  2: "#10b981", // emerald — community & food
  3: "#f59e0b", // amber — knowledge & craft
  4: "#3b82f6", // blue — technology & industry
  5: "#8b5cf6", // violet — modern era
};

export const PHASE_LABELS: Record<Phase, string> = {
  1: "Immediate Survival",
  2: "Community & Food Security",
  3: "Knowledge & Craft",
  4: "Technology & Industry",
  5: "Modern Era",
};
