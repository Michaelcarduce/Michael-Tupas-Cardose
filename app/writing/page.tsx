import type { Metadata } from "next";
import Link from "next/link";

import { posts } from "@/data/writing";
import { getCaseStudy } from "@/data/work";
import { site } from "@/data/site";
import WorkNav from "@/components/work/WorkNav";

export const metadata: Metadata = {
  title: "Writing",
  description: `Short write-ups by ${site.name}: one production defect or decision each — symptom, diagnosis, fix, test.`,
  alternates: { canonical: `${site.url}/writing` },
};

export default function WritingIndexPage() {
  return (
    <main id="main" className="min-h-screen bg-black-100 text-white">
      <div className="mx-auto w-full max-w-3xl px-5 pb-20 sm:px-10">
        <WorkNav />

        <h1 className="mt-10 text-4xl font-bold md:text-5xl">Writing</h1>
        <p className="mt-4 text-lg text-white-100">
          One defect or decision per post, under 600 words: what the user
          saw, why the UI couldn&apos;t show the cause, the fix, and the test
          that keeps it fixed.
        </p>

        <ul className="mt-10 space-y-6">
          {posts.map((post) => {
            const cs = getCaseStudy(post.caseStudy);
            return (
              <li
                key={post.slug}
                className="rounded-2xl border border-white/10 bg-black-200 p-5 md:p-6">
                <Link href={`/writing/${post.slug}`} className="group block">
                  <h2 className="text-xl font-bold group-hover:text-purple md:text-2xl">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-white-100">{post.summary}</p>
                  <p className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-white-100">
                    {cs && <span>{cs.title}</span>}
                    <span aria-hidden="true">·</span>
                    <span>{post.tags.join(" · ")}</span>
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
}
