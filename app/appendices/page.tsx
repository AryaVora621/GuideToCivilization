import Link from "next/link";
import { APPENDICES } from "@/lib/volumes";

export const metadata = {
  title: "Appendices | Guide to Civilization",
};

export default function AppendicesPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <nav className="mb-6 text-sm text-gray-500 dark:text-gray-400 print:hidden">
        <Link href="/" className="hover:text-gray-700 dark:hover:text-gray-200">Home</Link>
        <span className="mx-2">/</span>
        <span>Appendices</span>
      </nav>
      <h1 className="text-3xl font-bold mb-2">Reference Appendices</h1>
      <p className="mb-8 text-gray-600 dark:text-gray-400">
        12 reference guides that support all 39 volumes — visual identification
        guides, charts, blueprints, and the complete tech tree.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {APPENDICES.map((app) => (
          <Link
            key={app.id}
            href={`/appendices/${app.id}`}
            className="group rounded-xl border border-gray-200 dark:border-gray-800 p-5 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
          >
            <div className="mb-1 text-xs font-mono font-semibold text-gray-400">
              Appendix {app.id.split("-")[0]}
            </div>
            <div className="font-bold text-gray-900 dark:text-white group-hover:underline mb-1">
              {app.title}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {app.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
