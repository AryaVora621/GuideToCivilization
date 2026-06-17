"use client";

import { useMemo, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  forceSimulation,
  forceLink,
  forceManyBody,
  forceCenter,
  forceCollide,
  type SimulationNodeDatum,
} from "d3-force";
import ReactFlow, {
  Background,
  Controls,
  Handle,
  Position,
  type Node,
  type Edge,
  type NodeProps,
} from "reactflow";
import "reactflow/dist/style.css";
import { PHASE_COLORS, PHASE_LABELS, type GraphNode, type GraphEdge } from "@/lib/graph-types";
import type { Phase } from "@/lib/volumes";

type SimNode = GraphNode & SimulationNodeDatum;

interface VolumeNodeData {
  label: string;
  number: number;
  phase: Phase;
  chapters: number;
  size: number;
  dimmed: boolean;
  highlighted: boolean;
}

function VolumeNode({ data }: NodeProps<VolumeNodeData>) {
  const color = PHASE_COLORS[data.phase];
  return (
    <div
      style={{ opacity: data.dimmed ? 0.18 : 1, transition: "opacity 120ms" }}
      className="flex flex-col items-center"
    >
      <Handle type="target" position={Position.Top} style={{ opacity: 0 }} />
      <div
        style={{
          width: data.size,
          height: data.size,
          background: color,
          boxShadow: data.highlighted ? `0 0 0 3px ${color}66` : "none",
          borderColor: data.highlighted ? "#fff" : "transparent",
        }}
        className="flex items-center justify-center rounded-full border-2 text-white font-bold cursor-pointer"
      >
        <span style={{ fontSize: Math.max(10, data.size / 3.2) }}>{data.number}</span>
      </div>
      <div
        className="mt-1 max-w-[120px] truncate text-center text-[10px] font-medium text-gray-600 dark:text-gray-300"
        title={data.label}
      >
        {data.label}
      </div>
      <Handle type="source" position={Position.Bottom} style={{ opacity: 0 }} />
    </div>
  );
}

const nodeTypes = { volume: VolumeNode };

export function GraphView({
  graphNodes,
  graphEdges,
}: {
  graphNodes: GraphNode[];
  graphEdges: GraphEdge[];
}) {
  const router = useRouter();
  const [hovered, setHovered] = useState<string | null>(null);

  // Run a d3-force simulation once (synchronously) to lay out the graph, giving
  // the floating, organic "Obsidian graph" feel. Positions are memoized on the
  // data so the layout is stable across re-renders.
  const positions = useMemo(() => {
    const sim: SimNode[] = graphNodes.map((n) => ({ ...n }));
    const links = graphEdges.map((e) => ({ source: e.source, target: e.target }));
    const simulation = forceSimulation(sim)
      .force(
        "link",
        forceLink(links)
          .id((d) => (d as SimNode).id)
          .distance(120)
          .strength(0.25),
      )
      .force("charge", forceManyBody().strength(-600))
      .force("center", forceCenter(0, 0))
      .force("collide", forceCollide(60))
      .stop();
    simulation.tick(400);
    const map = new Map<string, { x: number; y: number }>();
    for (const n of sim) map.set(n.id, { x: n.x ?? 0, y: n.y ?? 0 });
    return map;
  }, [graphNodes, graphEdges]);

  // Adjacency for hover highlighting.
  const neighbors = useMemo(() => {
    const m = new Map<string, Set<string>>();
    for (const n of graphNodes) m.set(n.id, new Set([n.id]));
    for (const e of graphEdges) {
      m.get(e.source)?.add(e.target);
      m.get(e.target)?.add(e.source);
    }
    return m;
  }, [graphNodes, graphEdges]);

  const maxChapters = useMemo(
    () => Math.max(1, ...graphNodes.map((n) => n.chapters)),
    [graphNodes],
  );

  const nodes: Node<VolumeNodeData>[] = useMemo(() => {
    const active = hovered ? neighbors.get(hovered) : null;
    return graphNodes.map((n) => {
      const pos = positions.get(n.id) ?? { x: 0, y: 0 };
      const size = 28 + (n.chapters / maxChapters) * 36;
      const inFocus = active ? active.has(n.id) : true;
      return {
        id: n.id,
        type: "volume",
        position: pos,
        data: {
          label: n.title,
          number: n.number,
          phase: n.phase,
          chapters: n.chapters,
          size,
          dimmed: !!active && !inFocus,
          highlighted: hovered === n.id,
        },
      };
    });
  }, [graphNodes, positions, hovered, neighbors, maxChapters]);

  const edges: Edge[] = useMemo(() => {
    const active = hovered ? neighbors.get(hovered) : null;
    return graphEdges.map((e) => {
      const lit = !active || (active.has(e.source) && active.has(e.target));
      return {
        id: `${e.source}->${e.target}`,
        source: e.source,
        target: e.target,
        animated: lit && !!hovered,
        style: {
          stroke: lit ? "#9ca3af" : "#9ca3af",
          strokeWidth: Math.min(3, 0.6 + e.weight * 0.35),
          opacity: lit ? 0.5 : 0.06,
        },
      };
    });
  }, [graphEdges, hovered, neighbors]);

  const onNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => router.push(`/volumes/${node.id}`),
    [router],
  );

  return (
    <div className="relative h-[75vh] w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/60 dark:bg-gray-900/40">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodeClick={onNodeClick}
        onNodeMouseEnter={(_, n) => setHovered(n.id)}
        onNodeMouseLeave={() => setHovered(null)}
        fitView
        minZoom={0.15}
        maxZoom={2.5}
        proOptions={{ hideAttribution: true }}
      >
        <Background gap={24} color="#d1d5db" />
        <Controls showInteractive={false} />
      </ReactFlow>

      {/* Legend */}
      <div className="absolute left-3 top-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-gray-900/90 px-3 py-2 text-xs backdrop-blur-sm">
        <div className="mb-1 font-semibold text-gray-700 dark:text-gray-200">Phases</div>
        {([1, 2, 3, 4, 5] as Phase[]).map((p) => (
          <div key={p} className="flex items-center gap-2 py-0.5">
            <span
              className="inline-block h-3 w-3 rounded-full"
              style={{ background: PHASE_COLORS[p] }}
            />
            <span className="text-gray-600 dark:text-gray-300">
              {p}. {PHASE_LABELS[p]}
            </span>
          </div>
        ))}
        <div className="mt-1 border-t border-gray-200 dark:border-gray-700 pt-1 text-gray-400">
          Node size = chapters · hover to trace links · click to open
        </div>
      </div>
    </div>
  );
}
