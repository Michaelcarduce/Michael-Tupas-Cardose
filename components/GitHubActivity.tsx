import { FaGithub } from "react-icons/fa6";

import { getGitHubActivity, GITHUB_USER } from "@/lib/github";

// GitHub's dark-theme contribution palette, level 0..4.
const cellColor = [
  "bg-white/[0.06]",
  "bg-[#0e4429]",
  "bg-[#006d32]",
  "bg-[#26a641]",
  "bg-[#39d353]",
];

const dayLabels = ["", "Mon", "", "Wed", "", "Fri", ""];

const percent = (n: number, total: number) =>
  total ? Math.round((n / total) * 100) : 0;

// Server component: fetches once a day (see lib/github.ts) and renders
// nothing if the token is missing so the page never depends on GitHub.
const GitHubActivity = async () => {
  const activity = await getGitHubActivity();
  if (!activity) return null;

  const { total, weeks, months, split, repos, otherRepoCount } = activity;
  const splitTotal =
    split.commits + split.pullRequests + split.reviews + split.issues;
  const breakdown = [
    { label: "Commits", value: split.commits },
    { label: "Pull requests", value: split.pullRequests },
    { label: "Code review", value: split.reviews },
    { label: "Issues", value: split.issues },
  ];

  return (
    <section id="github" className="py-20">
      <h2 className="heading">
        Shipping <span className="text-purple">every week</span>
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-center text-white-100">
        {total.toLocaleString("en-US")} contributions on GitHub in the last
        year — pulled live from the API, not typed in.
      </p>

      <div className="mt-10 rounded-2xl border border-white/10 bg-[#10132E] p-6">
        <div className="overflow-x-auto pb-2">
          <div
            className="grid gap-[3px] text-[10px] text-white-200"
            style={{
              gridTemplateColumns: `2rem repeat(${weeks.length}, 11px)`,
              gridTemplateRows: `14px repeat(7, 11px)`,
              minWidth: "max-content",
            }}
            role="img"
            aria-label={`Contribution calendar: ${total} contributions in the last year`}>
            {/* month labels */}
            <span />
            {months.map((m, i) => {
              const end = months[i + 1]?.weekIndex ?? weeks.length;
              return (
                <span
                  key={`${m.label}-${m.weekIndex}`}
                  className="leading-none"
                  style={{
                    gridColumn: `${m.weekIndex + 2} / span ${end - m.weekIndex}`,
                  }}>
                  {m.label}
                </span>
              );
            })}
            {/* day labels */}
            {dayLabels.map((d, row) => (
              <span
                key={row}
                className="leading-[11px]"
                style={{ gridColumn: 1, gridRow: row + 2 }}>
                {d}
              </span>
            ))}
            {/* cells */}
            {weeks.map((week, col) =>
              week.map((day) => (
                <span
                  key={day.date}
                  title={`${day.count} contribution${day.count === 1 ? "" : "s"} on ${day.date}`}
                  className={`size-[11px] rounded-[2px] ${cellColor[day.level]}`}
                  style={{
                    gridColumn: col + 2,
                    gridRow: new Date(day.date).getUTCDay() + 2,
                  }}
                />
              )),
            )}
          </div>
        </div>

        <div className="mt-2 flex items-center justify-end gap-1 text-xs text-white-200">
          <span className="mr-1">Less</span>
          {cellColor.map((c) => (
            <span key={c} className={`size-[11px] rounded-[2px] ${c}`} />
          ))}
          <span className="ml-1">More</span>
        </div>

        <div className="mt-8 grid gap-8 border-t border-white/10 pt-8 md:grid-cols-2">
          <div>
            <h3 className="font-semibold text-white">Activity overview</h3>
            <p className="mt-3 text-sm leading-relaxed text-white-100">
              Contributed to{" "}
              {repos.map((r, i) => (
                <span key={r.nameWithOwner}>
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple hover:underline">
                    {r.nameWithOwner}
                  </a>
                  {i < repos.length - 1 ? ", " : ""}
                </span>
              ))}
              {otherRepoCount > 0 && (
                <>
                  {" "}
                  and {otherRepoCount} other{" "}
                  {otherRepoCount === 1 ? "repository" : "repositories"}
                </>
              )}
              .
            </p>
            <a
              href={`https://github.com/${GITHUB_USER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm text-purple hover:underline">
              <FaGithub aria-hidden="true" />
              github.com/{GITHUB_USER}
            </a>
          </div>

          <ul className="space-y-3">
            {breakdown.map((b) => {
              const pct = percent(b.value, splitTotal);
              return (
                <li key={b.label} className="text-sm">
                  <div className="flex justify-between text-white-100">
                    <span>{b.label}</span>
                    <span className="font-mono">
                      {pct}%{" "}
                      <span className="text-white-200">
                        · {b.value.toLocaleString("en-US")}
                      </span>
                    </span>
                  </div>
                  <div className="mt-1 h-1.5 rounded-full bg-white/[0.06]">
                    <div
                      className="h-full rounded-full bg-[#39d353]"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default GitHubActivity;
