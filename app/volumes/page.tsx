import Link from "next/link";
import { VOLUMES, APPENDICES, PHASE_LABELS, COLOR_CLASSES, type Phase } from "@/lib/volumes";
import { PrintButton } from "@/components/PrintButton";
import { getContentProgress } from "@/lib/content";

const PHASES: Phase[] = [1, 2, 3, 4, 5];

// Always render fresh so per-volume written counts stay current as agents write.
export const dynamic = "force-dynamic";

export const metadata = {
  title: "All Volumes | Guide to Civilization",
};

export default function VolumesPage() {
  const progress = getContentProgress();
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Print header */}
      <div className="hidden print:block mb-8">
        <h1 className="text-3xl font-bold">Guide to Civilization</h1>
        <p className="text-lg mt-2">Complete Table of Contents — 45 Volumes + 12 Appendices</p>
      </div>

      <div className="mb-8 print:hidden">
        <nav className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          <Link href="/" className="hover:text-gray-700 dark:hover:text-gray-200">Home</Link>
          <span className="mx-2">/</span>
          <span>All Volumes</span>
        </nav>
        <h1 className="text-3xl font-bold">All 45 Volumes</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Complete table of contents — 45 volumes, organized by rebuild phase.
          <PrintButton label="Print this page" />
        </p>
      </div>

      <div className="space-y-10">
        {PHASES.map((phase) => {
          const phaseVolumes = VOLUMES.filter((v) => v.phase === phase);
          return (
            <section key={phase}>
              <div className="mb-4 flex items-center gap-3">
                <div className="h-px flex-1 bg-gray-200 dark:bg-gray-800" />
                <h2 className="whitespace-nowrap text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Phase {phase} — {PHASE_LABELS[phase]}
                </h2>
                <div className="h-px flex-1 bg-gray-200 dark:bg-gray-800" />
              </div>
              <div className="space-y-1">
                {phaseVolumes.map((vol) => {
                  const colors = COLOR_CLASSES[vol.color];
                  const written = progress.byVolume[vol.slug] ?? 0;
                  return (
                    <Link
                      key={vol.slug}
                      href={`/volumes/${vol.slug}`}
                      className="flex items-baseline gap-4 rounded-lg px-3 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors group"
                    >
                      <span className={`w-12 shrink-0 text-xs font-mono font-semibold ${colors.text}`}>
                        Vol {vol.number}
                      </span>
                      <span className="font-semibold text-gray-900 dark:text-white group-hover:underline">
                        {vol.title}
                      </span>
                      <span className="hidden sm:block text-sm text-gray-500 dark:text-gray-400 truncate">
                        — {vol.subtitle}
                      </span>
                      <span
                        className={`ml-auto shrink-0 text-xs font-medium ${
                          written > 0
                            ? "text-emerald-600 dark:text-emerald-400"
                            : "text-gray-400 dark:text-gray-600"
                        }`}
                      >
                        {written > 0 ? `${written} written` : "—"}
                      </span>
                      <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${colors.badge}`}>
                        {vol.difficulty}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </section>
          );
        })}

        {/* Appendices */}
        <section>
          <div className="mb-4 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200 dark:bg-gray-800" />
            <h2 className="whitespace-nowrap text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Reference Appendices
            </h2>
            <div className="h-px flex-1 bg-gray-200 dark:bg-gray-800" />
          </div>
          <div className="space-y-1">
            {APPENDICES.map((app) => (
              <Link
                key={app.id}
                href={`/appendices/${app.id}`}
                className="flex items-baseline gap-4 rounded-lg px-3 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors group"
              >
                <span className="w-12 shrink-0 text-xs font-mono font-semibold text-gray-500">
                  {app.id.split("-")[0]}
                </span>
                <span className="font-semibold text-gray-900 dark:text-white group-hover:underline">
                  {app.title}
                </span>
                <span className="hidden sm:block text-sm text-gray-500 dark:text-gray-400 truncate">
                  — {app.description}
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
