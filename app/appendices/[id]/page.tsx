import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { APPENDICES } from "@/lib/volumes";
import { getAppendix } from "@/lib/content";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return APPENDICES.map((a) => ({ id: a.id }));
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const app = APPENDICES.find((a) => a.id === id);
  return { title: `${app?.title ?? id} | Guide to Civilization` };
}

export default async function AppendixPage({ params }: Props) {
  const { id } = await params;
  const meta = APPENDICES.find((a) => a.id === id);
  if (!meta) notFound();

  const content = getAppendix(id);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <nav className="mb-6 text-sm text-gray-500 dark:text-gray-400 print:hidden">
        <Link href="/" className="hover:text-gray-700 dark:hover:text-gray-200">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/appendices" className="hover:text-gray-700 dark:hover:text-gray-200">Appendices</Link>
        <span className="mx-2">/</span>
        <span>{meta.title}</span>
      </nav>
      <div className="mb-2 text-xs font-mono font-semibold text-gray-400">
        Appendix {id.split("-")[0]}
      </div>
      <h1 className="text-3xl font-bold mb-3">{meta.title}</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">{meta.description}</p>

      {content ? (
        <div className="prose-chapter">
          <MDXRemote
            source={content.content}
            options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
          />
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-gray-200 dark:border-gray-800 p-10 text-center text-gray-400 dark:text-gray-500">
          <p className="text-sm">This appendix is being written.</p>
        </div>
      )}
    </div>
  );
}
