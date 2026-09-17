import type { Metadata } from "next";
import Link from "next/link";

import { projects } from "@/data";
import { caseStudies } from "@/data/work";
import { site } from "@/data/site";
import WorkNav from "@/components/work/WorkNav";

export const metadata: Metadata = {
  title: "Work",
  description: `Case studies and projects by ${site.name}: MAAP's online admission system, Kosher Kav, GlowSimcha and a public health information system.`,
  alternates: { canonical: `${site.url}/work` },
};

export default function WorkIndexPage() {
  const archive = projects.filter((p) => !p.featured);

  return (
    <main id="main" className="min-h-screen bg-black-100 text-white">
      <div className="mx-auto w-full max-w-3xl px-5 pb-20 sm:px-10">
        <WorkNav />

        <h1 className="mt-10 text-4xl font-bold md:text-5xl">Work</h1>
        <p className="mt-4 text-lg text-white-100">
          Four systems I own end to end, then everything else.
        </p>

        <ul className="mt-10 space-y-6">
          {caseStudies.map((cs) => (
            <li
              key={cs.slug}
              className="rounded-2xl border border-white/10 bg-black-200 p-5 md:p-6">
              <Link href={`/work/${cs.slug}`} className="group block">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <h2 className="text-xl font-bold group-hover:text-purple md:text-2xl">
                    {cs.title}
                  </h2>
                  <p className="text-xs text-white-100">{cs.period}</p>
                </div>
                <p className="mt-2 text-white-100">{cs.summary}</p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {cs.meta.stack.slice(0, 6).map((s) => (
                    <li
                      key={s}
                      className="rounded-full bg-[#10132E] px-2.5 py-0.5 text-xs text-white-100">
                      {s}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm text-purple">Read case study →</p>
              </Link>
            </li>
          ))}
        </ul>

        <h2 className="mt-16 text-2xl font-bold md:text-3xl">Other projects</h2>
        <ul className="mt-6 divide-y divide-white/10">
          {archive.map((p) => (
            <li key={p.id} className="py-4">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                {p.link ? (
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold hover:text-purple">
                    {p.title} ↗
                  </a>
                ) : (
                  <span className="font-semibold">{p.title}</span>
                )}
                <span className="text-xs text-white-100">{p.stack.join(" · ")}</span>
              </div>
              <p className="mt-1 text-sm text-white-100">{p.des}</p>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
