import Link from "next/link";
import { buildVolumeGraph } from "@/lib/graph";
import { GraphView } from "@/components/GraphView";

export const metadata = {
  title: "Knowledge Graph | Guide to Civilization",
  description:
    "An interactive dependency graph of all 45 volumes — how each field of knowledge builds on the others.",
};

export default function GraphPage() {
  const { nodes, edges } = buildVolumeGraph();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <nav className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        <Link href="/" className="hover:text-gray-700 dark:hover:text-gray-200">Home</Link>
        <span className="mx-2">/</span>
        <span>Graph</span>
      </nav>

      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold">Knowledge Graph</h1>
          <p className="mt-1 max-w-2xl text-gray-600 dark:text-gray-400">
            Every volume and the dependencies between them, derived from each chapter&apos;s
            prerequisites. Drag nodes to explore, hover to trace a volume&apos;s links, and
            click to open it.
          </p>
        </div>
        <Link
          href="/tech-tree"
          className="rounded-lg border border-gray-200 dark:border-gray-700 px-3 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          Linear roadmap →
        </Link>
      </div>

      <GraphView graphNodes={nodes} graphEdges={edges} />

      <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        {nodes.length} volumes · {edges.length} dependency links. Built from chapter
        prerequisite metadata — the same data powers Appendix L: the Tech Tree.
      </p>
    </div>
  );
}
