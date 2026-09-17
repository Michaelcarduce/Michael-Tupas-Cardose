import type { CaseStudySection as Section } from "@/data/work";

const CaseStudySection = ({ section }: { section: Section }) => {
  return (
    <section
      id={section.id}
      aria-labelledby={`${section.id}-heading`}
      className="scroll-mt-24">
      <h2
        id={`${section.id}-heading`}
        className="text-2xl font-bold md:text-3xl">
        {section.heading}
      </h2>
      <div className="mt-4 space-y-4 text-base leading-relaxed text-white-100 md:text-lg">
        {section.paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
        {section.bullets && (
          <ul className="list-disc space-y-3 pl-5">
            {section.bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default CaseStudySection;
