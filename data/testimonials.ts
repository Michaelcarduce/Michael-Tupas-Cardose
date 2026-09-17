/**
 * Testimonials — real messages, quoted with the sender's permission.
 *
 * `quote` is what renders; `original` holds the sender's own words when the
 * message was not in English, and is shown beneath the translation. Entries
 * with `placeholder: true` are mock copy: they render only in development
 * and are dropped from production builds.
 */
export type Testimonial = {
  quote: string;
  /** Untranslated message, shown under `quote` when present. */
  original?: string;
  /** Omit to attribute by role and organisation only. */
  name?: string;
  role: string;
  company?: string;
  /** `data/work.ts` slug the quote is about, if any. */
  caseStudy?: string;
  /** Mock entry — hidden in production. Delete once the quote is real. */
  placeholder?: boolean;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "So far the feedback is great — they say the application is fast. Very good work.",
    original: "So far, maganda ang feedback, mabilis daw ang application, very good ka.",
    role: "Head of Registrar",
    company: "MAAP",
    caseStudy: "omas-admission-system",
  },
  {
    quote: "Smooth to use. Very good.",
    original: "Smooth siya gamitin. Very good.",
    role: "Registrar Administrator",
    company: "MAAP",
    caseStudy: "omas-admission-system",
  },
  {
    quote:
      "I appreciate everything so far and I think you will be a big asset. Build your skills and there will be many, many more of these to come.",
    role: "Client",
    company: "Kosher Kav LLC",
    caseStudy: "kosher-kav",
  },
];

/** What the current build may show: placeholders only outside production. */
export function visibleTestimonials(): Testimonial[] {
  const dev = process.env.NODE_ENV !== "production";
  return testimonials.filter((t) => dev || !t.placeholder);
}
