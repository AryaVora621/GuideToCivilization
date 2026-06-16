import Link from "next/link";
import {
  VOLUMES,
  PHASE_LABELS,
  COLOR_CLASSES,
  type Phase,
} from "@/lib/volumes";
import { getContentProgress } from "@/lib/content";

// Always render fresh so chapter-progress counts reflect what agents have written.
export const dynamic = "force-dynamic";

const PHASES: Phase[] = [1, 2, 3, 4, 5];

const PHASE_DESCRIPTIONS: Record<Phase, string> = {
  1: "Days 1–30. Water, fire, shelter, medicine, sanitation, and the social foundations that keep a group alive.",
  2: "Months 1–24. Feed the group, defend the settlement, and build the craft infrastructure to sustain it.",
  3: "Years 1–10. Scientific method, mathematics, and the knowledge base that makes every other volume faster.",
  4: "Years 10–50. Steam engines, electrical generators, machine tools, and the industrial stack.",
  5: "Years 50–100+. Telephone, vacuum tubes, magnetic storage, computing, and semiconductors.",
};

const PHASE_COLORS: Record<Phase, string> = {
  1: "text-red-700 dark:text-red-400",
  2: "text-emerald-700 dark:text-emerald-400",
  3: "text-amber-700 dark:text-amber-400",
  4: "text-blue-700 dark:text-blue-400",
  5: "text-violet-700 dark:text-violet-400",
};

export default function HomePage() {
  const volumesByPhase = PHASES.map((phase) => ({
    phase,
    volumes: VOLUMES.filter((v) => v.phase === phase),
  }));

  const progress = getContentProgress();
  const progressPct = Math.round((progress.written / progress.planned) * 100);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Hero */}
      <div className="mb-16 max-w-3xl">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-gray-100 dark:bg-gray-800 px-3 py-1 text-xs font-medium text-gray-600 dark:text-gray-300">
          45 volumes · 12 appendices · {progress.written} chapters written
        </div>
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
          Guide to Civilization
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
          A comprehensive manual for restarting human civilization from scratch.
          Everything you need to know, organized from immediate survival through
          advanced technology.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/volumes"
            className="inline-flex items-center gap-2 rounded-lg bg-gray-900 dark:bg-white px-5 py-2.5 text-sm font-semibold text-white dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-100 transition-colors"
          >
            Browse All Volumes
          </Link>
          <Link
            href="/tech-tree"
            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-700 px-5 py-2.5 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            View Tech Tree
          </Link>
          <Link
            href="/search"
            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-700 px-5 py-2.5 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Search
          </Link>
        </div>
      </div>

      {/* Content progress */}
      <div className="mb-14 rounded-xl border border-gray-200 dark:border-gray-800 p-6 bg-gray-50 dark:bg-gray-900/50">
        <div className="mb-5">
          <div className="mb-2 flex items-baseline justify-between">
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
              Content written
            </span>
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {progress.written} / {progress.planned} chapters · {progressPct}%
            </span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800">
            <div
              className="h-full rounded-full bg-emerald-600 dark:bg-emerald-500 transition-all"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: "Volumes", value: "45" },
            { label: "Chapters Written", value: `${progress.written}` },
            { label: "Appendices", value: "12" },
            { label: "Works Offline", value: "PWA" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Volumes by phase */}
      <div className="space-y-14">
        {volumesByPhase.map(({ phase, volumes }) => (
          <section key={phase}>
            <div className="mb-6">
              <div
                className={`mb-1 text-xs font-semibold uppercase tracking-wider ${PHASE_COLORS[phase]}`}
              >
                Phase {phase}
              </div>
              <h2 className="text-2xl font-bold">{PHASE_LABELS[phase]}</h2>
              <p className="mt-1 text-gray-500 dark:text-gray-400">
                {PHASE_DESCRIPTIONS[phase]}
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {volumes.map((vol) => {
                const colors = COLOR_CLASSES[vol.color];
                const written = progress.byVolume[vol.slug] ?? 0;
                return (
                  <Link
                    key={vol.slug}
                    href={`/volumes/${vol.slug}`}
                    className={`group relative rounded-xl border p-5 transition-all hover:shadow-md ${colors.bg} ${colors.border}`}
                  >
                    <div className="mb-3 flex items-start justify-between gap-2">
                      <span
                        className={`text-xs font-semibold uppercase tracking-wider ${colors.text}`}
                      >
                        Vol {vol.number}
                      </span>
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-medium ${colors.badge}`}
                      >
                        {vol.difficulty === "immediate"
                          ? "Immediate"
                          : vol.difficulty === "short-term"
                          ? "Short-term"
                          : "Long-term"}
                      </span>
                    </div>
                    <h3 className="mb-1 font-bold text-gray-900 dark:text-white group-hover:underline">
                      {vol.title}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 italic mb-3">
                      {vol.subtitle}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                      {vol.description}
                    </p>
                    <p className="mt-3 text-xs font-medium text-gray-400 dark:text-gray-500">
                      {written > 0
                        ? `${written} chapter${written === 1 ? "" : "s"} written`
                        : "Not started"}
                    </p>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      {/* Appendices CTA */}
      <div className="mt-16 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 p-8">
        <h2 className="mb-2 text-xl font-bold">12 Reference Appendices</h2>
        <p className="mb-6 text-gray-600 dark:text-gray-400">
          Periodic table, star charts, world maps, seed identification, edible
          plant guides, mineral identification, engineering drawings, units and
          standards, instrument construction, paper and ink making, and the full
          tech tree.
        </p>
        <Link
          href="/appendices"
          className="inline-flex items-center gap-2 rounded-lg border border-gray-300 dark:border-gray-600 px-5 py-2.5 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          View All Appendices
        </Link>
      </div>
    </div>
  );
}
