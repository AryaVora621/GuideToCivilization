"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Fuse from "fuse.js";

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

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<SearchItem[]>([]);

  useEffect(() => {
    fetch("/search-index.json")
      .then((r) => r.json())
      .then(setItems)
      .catch(() => setItems([]));
  }, []);

  const fuse = useMemo(
    () =>
      new Fuse(items, {
        keys: [
          { name: "title", weight: 3 },
          { name: "summary", weight: 2 },
          { name: "tags", weight: 1 },
          { name: "volumeTitle", weight: 1 },
        ],
        threshold: 0.3,
        includeScore: true,
      }),
    [items]
  );

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return fuse.search(query.trim()).slice(0, 20);
  }, [fuse, query]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Link href="/" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 mb-6 block">
        ← Home
      </Link>
      <h1 className="text-3xl font-bold mb-6">Search</h1>

      <input
        type="search"
        placeholder="Search all 39 volumes..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        autoFocus
        className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3 text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {query && items.length === 0 && (
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          Search index loading or not yet built. Run <code className="font-mono text-xs bg-gray-100 dark:bg-gray-800 px-1 rounded">npm run build</code> to generate it.
        </p>
      )}

      {results.length > 0 && (
        <div className="mt-6 space-y-3">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {results.length} result{results.length !== 1 ? "s" : ""}
          </p>
          {results.map(({ item }) => (
            <Link
              key={`${item.volumeSlug}/${item.chapterSlug}`}
              href={`/volumes/${item.volumeSlug}/${item.chapterSlug}`}
              className="block rounded-xl border border-gray-200 dark:border-gray-800 p-4 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
            >
              <div className="text-xs text-gray-400 dark:text-gray-500 mb-1 font-mono">
                Vol {item.volumeNumber}: {item.volumeTitle} — Ch {item.chapter}
              </div>
              <div className="font-semibold text-gray-900 dark:text-white mb-1">
                {item.title}
              </div>
              {item.summary && (
                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                  {item.summary}
                </p>
              )}
              {item.tags.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-gray-100 dark:bg-gray-800 px-2 py-0.5 text-xs text-gray-500 dark:text-gray-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          ))}
        </div>
      )}

      {query && results.length === 0 && items.length > 0 && (
        <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
          No results for &ldquo;{query}&rdquo;. Try a different term.
        </p>
      )}
    </div>
  );
}
