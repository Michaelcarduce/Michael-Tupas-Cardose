import type { CaseStudy } from "@/data/work";

const MetricTiles = ({ metrics }: { metrics: CaseStudy["metrics"] }) => {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {metrics.map((m) => (
        <li
          key={m.label}
          className="rounded-2xl border border-white/10 bg-black-200 p-5">
          <p className="text-2xl font-bold text-purple md:text-3xl">{m.value}</p>
          <p className="mt-1 text-sm text-white-100">{m.label}</p>
        </li>
      ))}
    </ul>
  );
};

export default MetricTiles;
