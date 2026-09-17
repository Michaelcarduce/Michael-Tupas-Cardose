import Link from "next/link";
import { FaGithub } from "react-icons/fa6";

import { openSource } from "@/data/openSource";

// Public, runnable proof for claims made in private case studies.
const OpenSource = () => (
  <section id="open-source" className="py-20">
    <h2 className="heading">
      Open <span className="text-purple">source</span>
    </h2>
    <p className="mx-auto mt-4 max-w-2xl text-center text-white-100">
      The client work above is private. These are pieces of it extracted into
      public repos — tests and CI included — so the claims can be checked.
    </p>
    <ul className="mt-10 grid gap-6 md:grid-cols-3">
      {openSource.map((r) => (
        <li
          key={r.name}
          className="flex flex-col rounded-2xl border border-white/10 bg-[#10132E] p-6">
          <a
            href={r.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-lg font-semibold text-white hover:text-purple">
            <FaGithub aria-hidden="true" />
            {r.name}
          </a>
          <span className="mt-1 text-xs text-white-200">{r.lang}</span>
          <p className="mt-3 grow text-sm leading-relaxed text-white-100">
            {r.des}
          </p>
          <Link
            href={r.from.href}
            className="mt-4 text-sm text-purple hover:underline">
            Extracted from {r.from.title} ↗
          </Link>
        </li>
      ))}
    </ul>
  </section>
);

export default OpenSource;
