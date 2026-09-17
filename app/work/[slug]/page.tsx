import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { caseStudies, getCaseStudy } from "@/data/work";
import { postsForCaseStudy } from "@/data/writing";
import { site } from "@/data/site";
import WorkNav from "@/components/work/WorkNav";
import CaseStudyMeta from "@/components/work/CaseStudyMeta";
import MetricTiles from "@/components/work/MetricTiles";
import CaseStudySection from "@/components/work/CaseStudySection";
import PhoneShowcase from "@/components/work/PhoneShowcase";
import DeviceShowcase from "@/components/work/DeviceShowcase";

type Params = { slug: string };
// Next 15+ hands route params over as a Promise.
type PageProps = { params: Promise<Params> };

export function generateStaticParams(): Params[] {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) return {};
  return {
    title: cs.title,
    description: cs.summary,
    alternates: { canonical: `${site.url}/work/${cs.slug}` },
    openGraph: {
      type: "article",
      url: `${site.url}/work/${cs.slug}`,
      title: `${cs.title} — ${site.name}`,
      description: cs.summary,
      images: cs.images[0] ? [{ url: cs.images[0].src, alt: cs.images[0].alt }] : undefined,
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();

  const index = caseStudies.findIndex((c) => c.slug === cs.slug);
  const prev = caseStudies[index - 1];
  const next = caseStudies[index + 1];
  const related = postsForCaseStudy(cs.slug);
  // Phone-portrait shots (banner composite excluded) feed the showcase; the ones
  // not in the fan go to a grid below it.
  const phones = cs.phoneFan ? cs.images.filter((img) => img.height > img.width) : [];
  const fan = cs.phoneFan ? cs.phoneFan.map((i) => cs.images[i]).filter(Boolean) : [];
  const pair = cs.devicePair
    ? { wide: cs.images[cs.devicePair.wide], phone: cs.images[cs.devicePair.phone] }
    : undefined;
  const gallery = cs.phoneFan
    ? phones.filter((img) => !fan.includes(img))
    : pair
      ? cs.images.filter((img) => img !== pair.wide && img !== pair.phone)
      : cs.images;

  return (
    <main id="main" className="min-h-screen bg-black-100 text-white">
      <div className="mx-auto w-full max-w-3xl px-5 pb-20 sm:px-10">
        <WorkNav />

        <article className="mt-10">
          <Link href="/work" className="text-sm text-white-100 hover:text-purple">
            ← Work
          </Link>

          <header className="mt-4">
            <h1 className="text-4xl font-bold md:text-5xl">{cs.title}</h1>
            <p className="mt-2 text-sm text-white-100">{cs.period}</p>
            <p className="mt-6 text-lg leading-relaxed md:text-xl">{cs.summary}</p>
          </header>

          <div className="mt-8">
            <CaseStudyMeta meta={cs.meta} period={cs.period} />
          </div>

          <div className="mt-8">
            <MetricTiles metrics={cs.metrics} />
          </div>

          {fan.length > 0 && (
            <div className="mt-10">
              <PhoneShowcase fan={fan} all={phones} label={`${cs.title} app screens`} />
            </div>
          )}

          {pair?.wide && pair.phone && (
            <div className="mt-10">
              <DeviceShowcase wide={pair.wide} phone={pair.phone} label={`${cs.title} on desktop and mobile`} />
            </div>
          )}

          {gallery.length > 0 && (
            <div className={cs.phoneFan ? "mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3" : "mt-10 space-y-6"}>
              {gallery.map((img) => (
                <figure key={img.src}>
                  <Image
                    src={img.src}
                    width={img.width}
                    height={img.height}
                    alt={img.alt}
                    sizes="(max-width: 768px) 100vw, 768px"
                    className="mx-auto h-auto max-h-[80vh] w-auto max-w-full rounded-2xl border border-white/10"
                  />
                  {img.caption && (
                    <figcaption className="mt-2 text-sm text-white-100">
                      {img.caption}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
          )}

          <div className="mt-14 space-y-14">
            {cs.sections.map((section) => (
              <CaseStudySection key={section.id} section={section} />
            ))}
          </div>

          {cs.isPrivate && (
            <p className="mt-14 rounded-2xl border border-white/10 bg-black-200 p-5 text-sm text-white-100">
              Source private — details limited by client agreement.
            </p>
          )}

          {related.length > 0 && (
            <section aria-labelledby="writing-heading" className="mt-14">
              <h2 id="writing-heading" className="text-2xl font-bold md:text-3xl">
                Write-ups from this project
              </h2>
              <ul className="mt-4 space-y-3">
                {related.map((post) => (
                  <li key={post.slug}>
                    <Link href={`/writing/${post.slug}`} className="font-semibold hover:text-purple">
                      {post.title}
                    </Link>
                    <p className="mt-1 text-sm text-white-100">{post.summary}</p>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </article>

        <nav
          aria-label="Other case studies"
          className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm sm:flex-row sm:justify-between">
          {prev ? (
            <Link href={`/work/${prev.slug}`} className="hover:text-purple">
              ← {prev.title}
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link href={`/work/${next.slug}`} className="hover:text-purple sm:text-right">
              {next.title} →
            </Link>
          )}
        </nav>
      </div>
    </main>
  );
}
