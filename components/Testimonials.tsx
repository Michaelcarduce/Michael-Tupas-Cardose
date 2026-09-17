import Link from "next/link";

import { getCaseStudy } from "@/data/work";
import { visibleTestimonials } from "@/data/testimonials";

/**
 * Static quote cards — no marquee, so they are readable, keyboard-reachable
 * and cost nothing on the main thread. Renders nothing when there is no
 * quote to show, so the section never ships empty.
 */
const Testimonials = () => {
  const items = visibleTestimonials();
  if (items.length === 0) return null;

  return (
    <section id="testimonials" className="py-20 w-full">
      <h2 className="heading">
        What people <span className="text-purple">say</span>
      </h2>

      <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {items.map((t) => {
          const cs = t.caseStudy ? getCaseStudy(t.caseStudy) : undefined;
          return (
            <li key={`${t.role}-${t.company ?? ""}-${t.quote.slice(0, 24)}`} className="flex">
              <figure className="relative flex w-full flex-col justify-between rounded-3xl border border-white/10 bg-[#10132E] p-6 lg:p-8">
                {t.placeholder && (
                  <span className="absolute right-4 top-4 rounded-full border border-dashed border-yellow-400/60 px-2 py-0.5 text-[10px] uppercase tracking-wide text-yellow-300">
                    placeholder
                  </span>
                )}
                <blockquote className="text-white-100 leading-relaxed">
                  <span aria-hidden="true" className="text-purple text-3xl leading-none">
                    “
                  </span>
                  <p className="mt-2">{t.quote}</p>
                  {t.original && (
                    <p className="mt-3 text-sm text-white-200 italic" lang="tl">
                      {t.original}
                    </p>
                  )}
                </blockquote>
                <figcaption className="mt-6 text-sm">
                  {t.name && <div className="font-semibold text-white">{t.name}</div>}
                  <div className={t.name ? "text-white-100" : "font-semibold text-white"}>
                    {t.role}
                    {t.company ? `, ${t.company}` : null}
                  </div>
                  {cs && (
                    <Link
                      href={`/work/${cs.slug}`}
                      className="mt-2 inline-block text-purple hover:underline focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-purple">
                      {cs.title}
                      <span aria-hidden="true" className="ms-1">
                        ↗
                      </span>
                    </Link>
                  )}
                </figcaption>
              </figure>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Testimonials;
