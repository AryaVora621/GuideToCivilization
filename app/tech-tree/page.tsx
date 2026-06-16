import Link from "next/link";
import { VOLUMES, COLOR_CLASSES, type Phase } from "@/lib/volumes";

export const metadata = {
  title: "Tech Tree | Guide to Civilization",
};

// Civilization progression steps — volume numbers reflect the new ordering
const ROADMAP_STEPS = [
  { step: 1, title: "Read the roadmap, then secure water", vols: [1, 3] },
  { step: 2, title: "Advanced fieldcraft and tracking", vols: [2] },
  { step: 3, title: "Establish sanitation before disease spreads", vols: [5] },
  { step: 4, title: "Form a community with governance", vols: [6, 7, 8] },
  { step: 5, title: "Set up agriculture and animal husbandry", vols: [10, 11] },
  { step: 6, title: "Produce fermented and preserved foods", vols: [12] },
  { step: 7, title: "Make pottery, textiles, and durable shelter", vols: [15, 16, 18] },
  { step: 8, title: "Build water systems and infrastructure", vols: [19] },
  { step: 9, title: "Establish trade and record keeping", vols: [23, 25] },
  { step: 10, title: "Apply scientific method to all problems", vols: [21] },
  { step: 11, title: "Smelt copper, bronze, iron, and steel", vols: [14, 17] },
  { step: 12, title: "Build water mills, steam engines", vols: [33, 34] },
  { step: 13, title: "Develop machine tools and precision manufacturing", vols: [38, 40] },
  { step: 14, title: "Generate and distribute electricity", vols: [37] },
  { step: 15, title: "Build telegraph, telephone, and radio", vols: [41] },
  { step: 16, title: "Build vacuum tube systems and computers", vols: [42, 44, 45] },
];

const PHASES: { phase: Phase; label: string; color: string }[] = [
  { phase: 1, label: "Immediate Survival", color: "red" },
  { phase: 2, label: "Community & Food Security", color: "emerald" },
  { phase: 3, label: "Knowledge & Craft", color: "amber" },
  { phase: 4, label: "Technology & Industry", color: "blue" },
  { phase: 5, label: "Modern Era", color: "violet" },
];

export default function TechTreePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <nav className="mb-6 text-sm text-gray-500 dark:text-gray-400 print:hidden">
        <Link href="/" className="hover:text-gray-700 dark:hover:text-gray-200">Home</Link>
        <span className="mx-2">/</span>
        <span>Tech Tree</span>
      </nav>

      <h1 className="text-3xl font-bold mb-2">Civilization Tech Tree</h1>
      <p className="mb-10 text-gray-600 dark:text-gray-400">
        The step-by-step progression from survival to advanced civilization, and the volume dependencies that make it possible.
      </p>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Roadmap */}
        <div>
          <h2 className="text-xl font-bold mb-5">The Roadmap</h2>
          <div className="space-y-3">
            {ROADMAP_STEPS.map((step, i) => (
              <div key={step.step} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-bold">
                    {step.step}
                  </div>
                  {i < ROADMAP_STEPS.length - 1 && (
                    <div className="mt-1 h-full w-px bg-gray-200 dark:bg-gray-700 min-h-[1rem]" />
                  )}
                </div>
                <div className="pb-2 pt-1">
                  <div className="font-medium text-gray-900 dark:text-white text-sm">
                    {step.title}
                  </div>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {step.vols.map((vn) => {
                      const vol = VOLUMES.find((v) => v.number === vn);
                      if (!vol) return null;
                      const colors = COLOR_CLASSES[vol.color];
                      return (
                        <Link
                          key={vn}
                          href={`/volumes/${vol.slug}`}
                          className={`rounded-full px-2 py-0.5 text-xs font-medium ${colors.badge} hover:opacity-80 transition-opacity`}
                        >
                          Vol {vn}: {vol.title}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Volume dependency by phase */}
        <div>
          <h2 className="text-xl font-bold mb-5">Volumes by Phase</h2>
          <div className="space-y-6">
            {PHASES.map(({ phase, label, color }) => {
              const phaseVols = VOLUMES.filter((v) => v.phase === phase);
              const colors = COLOR_CLASSES[color];
              return (
                <div
                  key={phase}
                  className={`rounded-xl border p-5 ${colors.bg} ${colors.border}`}
                >
                  <div className={`mb-3 text-xs font-semibold uppercase tracking-wider ${colors.text}`}>
                    Phase {phase} — {label}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {phaseVols.map((vol) => (
                      <Link
                        key={vol.slug}
                        href={`/volumes/${vol.slug}`}
                        className={`rounded-lg border px-3 py-1.5 text-xs font-medium hover:opacity-80 transition-opacity ${colors.badge} ${colors.border}`}
                      >
                        <span className="font-mono mr-1">{vol.number}.</span>
                        {vol.title}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 rounded-xl border border-gray-200 dark:border-gray-800 p-5 bg-gray-50 dark:bg-gray-900/50">
            <div className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
              Interactive version
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              A full React Flow interactive tech tree (Appendix L) will be generated once chapter content is populated and dependency metadata is complete.
            </p>
            <Link
              href="/appendices/L-tech-tree"
              className="mt-3 inline-block text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              View Appendix L: Tech Tree →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
