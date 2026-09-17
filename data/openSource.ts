// Small public repos extracted from private client work. Each one is the
// runnable proof behind a claim in a case study — business logic stripped,
// tests and CI kept.

export type OpenSourceRepo = {
  name: string;
  repo: string;
  lang: string;
  des: string;
  from: { title: string; href: string };
};

export const openSource: OpenSourceRepo[] = [
  {
    name: "polyline-decode",
    repo: "https://github.com/Michaelcarduce/polyline-decode",
    lang: "TypeScript",
    des: "Google encoded-polyline decoder with zero dependencies. Tested against Google's published reference vector; malformed input returns empty instead of looping.",
    from: { title: "Kosher Kav", href: "/work/kosher-kav#evidence" },
  },
  {
    name: "do-token-bucket",
    repo: "https://github.com/Michaelcarduce/do-token-bucket",
    lang: "TypeScript · Cloudflare",
    des: "Token-bucket rate limiter as a Cloudflare Durable Object. Burst + sustained limits, Retry-After headers, tested inside workerd with vitest-pool-workers.",
    from: { title: "Kosher Kav", href: "/work/kosher-kav#evidence" },
  },
  {
    name: "php-psr4-api-starter",
    repo: "https://github.com/Michaelcarduce/php-psr4-api-starter",
    lang: "PHP 8",
    des: "Framework-free JSON API skeleton: router → controller → service → repository → PDO, PSR-4 autoloaded, PHPUnit. The layering behind OMAS and GlowSimcha with the business logic removed.",
    from: { title: "OMAS · GlowSimcha", href: "/work/glowsimcha#evidence" },
  },
];
