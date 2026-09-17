import type { CaseStudy } from "@/data/work";

const ExternalLink = ({ label, href }: { label: string; href: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-purple hover:underline">
    {label}
  </a>
);

// Matsuyama-style metadata table: reviewers scan this before the prose.
const CaseStudyMeta = ({
  meta,
  period,
}: {
  meta: CaseStudy["meta"];
  period: string;
}) => {
  const rows: { label: string; value: React.ReactNode }[] = [
    { label: "Client", value: meta.client },
    { label: "Role", value: meta.role },
    { label: "Platform", value: meta.platform },
    { label: "Period", value: period },
    {
      label: "Stack",
      value: (
        <ul className="flex flex-wrap gap-1.5">
          {meta.stack.map((s) => (
            <li
              key={s}
              className="rounded-full bg-[#10132E] px-2.5 py-0.5 text-xs text-white-100">
              {s}
            </li>
          ))}
        </ul>
      ),
    },
  ];
  if (meta.live) rows.push({ label: "Live", value: <ExternalLink {...meta.live} /> });
  if (meta.store) rows.push({ label: "Store", value: <ExternalLink {...meta.store} /> });
  rows.push({
    label: "Source",
    value: meta.source.startsWith("http") ? (
      <ExternalLink label="GitHub" href={meta.source} />
    ) : (
      meta.source
    ),
  });

  return (
    <dl className="grid grid-cols-[max-content_1fr] gap-x-6 gap-y-3 rounded-2xl border border-white/10 bg-black-200 p-5 text-sm md:p-6">
      {rows.map((row) => (
        <div key={row.label} className="contents">
          <dt className="text-white-100/70">{row.label}</dt>
          <dd className="min-w-0">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
};

export default CaseStudyMeta;
