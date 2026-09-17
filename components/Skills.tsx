import Link from "next/link";

import { alsoWorkedWith, skillGroups, type Skill } from "@/data";

const chipBase =
  "inline-flex items-center rounded-full px-3 py-1 text-xs lg:text-sm leading-5";

const Chip = ({ skill }: { skill: Skill }) => {
  // primary chips link to the case-study section that proves the claim
  if (skill.tier === "primary" && skill.proof) {
    return (
      <Link
        href={skill.proof}
        title="Read the case study"
        className={`${chipBase} border border-purple/60 bg-[#10132E] text-white hover:border-purple hover:bg-purple/10 focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-purple`}>
        {skill.name}
        <span aria-hidden="true" className="ms-1.5 text-purple">
          ↗
        </span>
      </Link>
    );
  }
  if (skill.tier === "working") {
    return (
      <span className={`${chipBase} border border-white/20 bg-[#10132E] text-white-100`}>
        {skill.name}
      </span>
    );
  }
  return (
    <span className={`${chipBase} border border-dashed border-white/20 text-white-100/80`}>
      {skill.name}
    </span>
  );
};

const Skills = () => {
  return (
    <section id="skills" className="py-20 w-full">
      <h2 className="heading">
        Skills, <span className="text-purple">with proof</span>
      </h2>
      <p className="text-center text-white-100 mt-4 max-w-2xl mx-auto">
        No bars, no percentages. Highlighted chips link to the case study
        where I shipped that skill to production.
      </p>

      {/* legend */}
      <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-6 text-xs text-white-100">
        <li className="flex items-center gap-2">
          <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full border border-purple bg-purple/30" />
          Shipped to production, links to proof
        </li>
        <li className="flex items-center gap-2">
          <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full border border-white/30 bg-[#10132E]" />
          Used in real projects
        </li>
        <li className="flex items-center gap-2">
          <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full border border-dashed border-white/30" />
          Familiar
        </li>
      </ul>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8 mt-12">
        {skillGroups.map((group) => (
          <div
            key={group.domain}
            className="rounded-2xl border border-white/10 bg-black-200 p-5 lg:p-6">
            <h3 className="text-[11px] uppercase tracking-widest text-white-100/70 mb-3">
              {group.domain}
            </h3>
            <ul className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <li key={skill.name}>
                  <Chip skill={skill} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <details className="mt-8 text-center text-sm text-white-100/70">
        <summary className="cursor-pointer inline-block hover:text-white">
          Also worked with
        </summary>
        <p className="mt-3">{alsoWorkedWith.join(" · ")}</p>
      </details>
    </section>
  );
};

export default Skills;
