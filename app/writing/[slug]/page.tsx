import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { posts, getPost } from "@/data/writing";
import { getCaseStudy } from "@/data/work";
import { site } from "@/data/site";
import WorkNav from "@/components/work/WorkNav";
import PostBody from "@/components/writing/PostBody";

type Params = { slug: string };
// Next 15+ hands route params over as a Promise.
type PageProps = { params: Promise<Params> };

export function generateStaticParams(): Params[] {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.summary,
    alternates: { canonical: `${site.url}/writing/${post.slug}` },
    openGraph: {
      type: "article",
      url: `${site.url}/writing/${post.slug}`,
      title: `${post.title} — ${site.name}`,
      description: post.summary,
      publishedTime: post.date,
      authors: [site.name],
      tags: post.tags,
    },
  };
}

const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const cs = getCaseStudy(post.caseStudy);
  const index = posts.findIndex((p) => p.slug === post.slug);
  const prev = posts[index - 1];
  const next = posts[index + 1];

  return (
    <main id="main" className="min-h-screen bg-black-100 text-white">
      <div className="mx-auto w-full max-w-3xl px-5 pb-20 sm:px-10">
        <WorkNav />

        <article className="mt-10">
          <Link href="/writing" className="text-sm text-white-100 hover:text-purple">
            ← Writing
          </Link>

          <header className="mt-4">
            <h1 className="text-4xl font-bold md:text-5xl">{post.title}</h1>
            <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-white-100">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              {cs && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>
                    From{" "}
                    <Link href={`/work/${cs.slug}`} className="text-purple hover:underline">
                      {cs.title}
                    </Link>
                  </span>
                </>
              )}
            </p>
            <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Topics">
              {post.tags.map((t) => (
                <li
                  key={t}
                  className="rounded-full bg-[#10132E] px-2.5 py-0.5 text-xs text-white-100">
                  {t}
                </li>
              ))}
            </ul>
          </header>

          <PostBody blocks={post.blocks} />
        </article>

        <nav
          aria-label="Other write-ups"
          className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm sm:flex-row sm:justify-between">
          {prev ? (
            <Link href={`/writing/${prev.slug}`} className="hover:text-purple">
              ← {prev.title}
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link href={`/writing/${next.slug}`} className="hover:text-purple sm:text-right">
              {next.title} →
            </Link>
          )}
        </nav>
      </div>
    </main>
  );
}
