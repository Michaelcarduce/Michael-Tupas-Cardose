// Contribution calendar + activity split, fetched server-side from the GitHub
// GraphQL API. Needs GITHUB_TOKEN (a fine-grained PAT with no scopes is
// enough for public data). Returns null when the token is missing or the
// request fails so the section can simply not render.

export const GITHUB_USER = "Michaelcarduce";

export type ContributionDay = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

export type GitHubActivity = {
  total: number;
  weeks: ContributionDay[][];
  months: { label: string; weekIndex: number }[];
  split: { commits: number; pullRequests: number; reviews: number; issues: number };
  repos: { nameWithOwner: string; url: string }[];
  otherRepoCount: number;
};

const query = /* GraphQL */ `
  query ($login: String!) {
    user(login: $login) {
      contributionsCollection {
        totalCommitContributions
        totalPullRequestContributions
        totalPullRequestReviewContributions
        totalIssueContributions
        totalRepositoriesWithContributedCommits
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              contributionLevel
            }
          }
        }
        commitContributionsByRepository(maxRepositories: 3) {
          repository {
            nameWithOwner
            url
          }
        }
      }
    }
  }
`;

const levels = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
} as const;

type Raw = {
  data?: {
    user: {
      contributionsCollection: {
        totalCommitContributions: number;
        totalPullRequestContributions: number;
        totalPullRequestReviewContributions: number;
        totalIssueContributions: number;
        totalRepositoriesWithContributedCommits: number;
        contributionCalendar: {
          totalContributions: number;
          weeks: {
            contributionDays: {
              date: string;
              contributionCount: number;
              contributionLevel: keyof typeof levels;
            }[];
          }[];
        };
        commitContributionsByRepository: {
          repository: { nameWithOwner: string; url: string };
        }[];
      };
    };
  };
};

export async function getGitHubActivity(): Promise<GitHubActivity | null> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return null;

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables: { login: GITHUB_USER } }),
      next: { revalidate: 60 * 60 * 24 },
    });
    if (!res.ok) return null;

    const json = (await res.json()) as Raw;
    const c = json.data?.user.contributionsCollection;
    if (!c) return null;

    const weeks = c.contributionCalendar.weeks.map((w) =>
      w.contributionDays.map((d) => ({
        date: d.date,
        count: d.contributionCount,
        level: levels[d.contributionLevel],
      })),
    );

    // Label a month at the first week that contains its 1st..7th day.
    const months: GitHubActivity["months"] = [];
    weeks.forEach((week, i) => {
      const first = week.find((d) => Number(d.date.slice(8, 10)) <= 7);
      if (!first) return;
      const label = new Date(first.date).toLocaleString("en-US", {
        month: "short",
        timeZone: "UTC",
      });
      if (months.at(-1)?.label !== label) months.push({ label, weekIndex: i });
    });

    const repos = c.commitContributionsByRepository.map((r) => r.repository);

    return {
      total: c.contributionCalendar.totalContributions,
      weeks,
      months,
      split: {
        commits: c.totalCommitContributions,
        pullRequests: c.totalPullRequestContributions,
        reviews: c.totalPullRequestReviewContributions,
        issues: c.totalIssueContributions,
      },
      repos,
      otherRepoCount: Math.max(
        0,
        c.totalRepositoriesWithContributedCommits - repos.length,
      ),
    };
  } catch {
    return null;
  }
}
