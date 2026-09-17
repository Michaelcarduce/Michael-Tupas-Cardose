export const navItems = [
  { name: "About", link: "#about" },
  { name: "Projects", link: "#projects" },
  { name: "Skills", link: "#skills" },
  { name: "Experience", link: "#experience" },
  { name: "Testimonials", link: "#testimonials" },
  { name: "Contact", link: "#contact" },
];

/** Static asset with its intrinsic size, so next/image can reserve space. */
export type ImageAsset = { src: string; width: number; height: number };

const svg = {
  // b1/b5/grid were 6.7 MB of base64 PNG wrapped in SVG; rasterised at 2x.
  b1: { src: "/b1.webp", width: 1378, height: 1082 },
  b4: { src: "/b4.svg", width: 208, height: 96 },
  b5: { src: "/b5.webp", width: 1000, height: 766 },
  grid: { src: "/grid.webp", width: 878, height: 450 },
  exp1: { src: "/exp1.svg", width: 95, height: 87 },
  exp2: { src: "/exp2.svg", width: 98, height: 97 },
  exp3: { src: "/exp3.svg", width: 103, height: 98 },
  exp4: { src: "/exp4.svg", width: 123, height: 87 },
} satisfies Record<string, ImageAsset>;

export type GridItem = {
  id: number;
  title: string;
  description: string;
  className: string;
  imgClassName: string;
  titleClassName: string;
  img?: ImageAsset;
  spareImg?: ImageAsset;
};

export const gridItems: GridItem[] = [
  {
    id: 1,
    title:
      "Sole engineer on three production systems: a college admission platform, a React Native delivery app and a two-sided booking marketplace.",
    description: "",
    className: "lg:col-span-3 md:col-span-6 md:row-span-4 lg:min-h-[60vh]",
    imgClassName: "w-full h-full",
    titleClassName: "justify-end",
    img: svg.b1,
  },
  {
    id: 2,
    title: "Based in the Philippines (GMT+8). I work across time zones.",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-start",
  },
  {
    id: 3,
    title: "Tech stack",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-center",
  },
  {
    id: 4,
    title: "Accessibility, Core Web Vitals and tests are part of done.",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-start",
    img: svg.grid,
    spareImg: svg.b4,
  },

  {
    id: 5,
    title: "Currently at MAAP, owning the Online Admission System end-to-end",
    description: "PHP 8 · MySQL · React 18",
    className: "md:col-span-3 md:row-span-2",
    imgClassName: "absolute right-0 bottom-0 md:w-96 w-60",
    titleClassName: "justify-center md:justify-start lg:justify-center",
    img: svg.b5,
    spareImg: svg.grid,
  },
  {
    id: 6,
    title: "Do you want to start a project together?",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-center md:max-w-full max-w-60 text-center",
  },
];

// Rendered in the "Tech stack" bento tile. Keep ≤ 4 items per group so the
// tile doesn't overflow at md.
export const techStack = [
  {
    group: "Frontend",
    items: ["React 18/19", "TypeScript", "Next.js", "React Native"],
  },
  {
    group: "Backend & data",
    items: [
      "PHP 8 · Laravel 12",
      "Node.js",
      "MySQL · D1",
      "Cloudflare Workers",
    ],
  },
  {
    group: "Quality & security",
    items: [
      "PHPUnit · Vitest · Jest",
      "WCAG · Lighthouse",
      "JWT · CSRF · CSP",
      "GitHub Actions",
    ],
  },
];

export type Project = {
  id: number;
  title: string;
  des: string;
  img?: ImageAsset;
  stack: string[];
  link?: string;
  caseStudy?: string;
  featured: boolean;
};

export const projects: Project[] = [
  {
    id: 1,
    title: "MAAPBOA",
    des: "Rebuilt the public applicant flow of MAAP's legacy PHP admission system as a React 18 + TypeScript SPA over a layered PHP JSON API. 7-step wizard, 101 validated fields, 5,000+ live registrations.",
    stack: ["PHP 8", "MySQL", "React 18", "TypeScript", "RHF + Zod"],
    img: { src: "/omas-1.webp", width: 1200, height: 593 },
    caseStudy: "/work/omas-admission-system",
    featured: true,
  },
  {
    id: 2,
    title: "KosherKav",
    des: "Kosher restaurant discovery, delivery & video app. React Native (bare) + Next.js 16 admin on Cloudflare Workers / D1 / Durable Objects. Sole engineer; 1,347 tests.",
    stack: [
      "React Native",
      "Next.js 16",
      "Cloudflare Workers",
      "D1 · Drizzle",
      "Durable Objects",
    ],
    img: { src: "/kosherkav-banner.webp", width: 1200, height: 750 },
    caseStudy: "/work/kosher-kav",
    featured: true,
  },
  {
    id: 3,
    title: "GlowSimcha",
    des: "Two-sided beauty-artist booking marketplace. Framework-free PHP 8.2 API (87 endpoints) + React 19/TS SPA. Stripe Connect payouts, self-hosted WebSockets, geospatial search on MySQL SPATIAL.",
    img: { src: "/glowsimcha-banner.webp", width: 1200, height: 750 },
    stack: [
      "PHP 8.2",
      "React 19",
      "TypeScript",
      "MySQL",
      "Stripe",
      "WebSockets",
    ],
    link: "https://glow-simcha.vercel.app/",
    caseStudy: "/work/glowsimcha",
    featured: true,
  },
  {
    id: 4,
    title: "PHIS",
    des: "Laravel 12 + React 19 health information system for rural health units in Balanga City: z-score outbreak detection, trend forecasting, SVG choropleth maps, CSV/PDF reporting. ~900 automated tests, CI on GitHub Actions.",
    stack: ["Laravel 12", "Sanctum", "React 19", "TanStack Query", "Recharts"],
    img: { src: "/phis-1.webp", width: 1200, height: 575 },
    caseStudy: "/work/public-health-is",
    featured: true,
  },
  {
    id: 5,
    title: "ChatPrototype",
    des: "Real-time chat prototype with Next.js, Express and Socket.io.",
    img: { src: "/Chat prototype.webp", width: 1200, height: 680 },
    stack: ["Next.js", "Express", "Socket.io", "TypeScript"],
    link: "https://chat-prototype-client.onrender.com/",
    featured: false,
  },
  {
    id: 6,
    title: "MERNChat",
    des: "Real-time messaging with Node, Express, React, MongoDB and Socket.io.",
    img: { src: "/project-mern chat app.webp", width: 600, height: 375 },
    stack: ["React", "Express", "Node.js", "MongoDB", "Socket.io"],
    link: "https://github.com/Michaelcarduce/Chat-App",
    featured: false,
  },
  {
    id: 7,
    title: "AudioScribe",
    des: "Text-to-speech, speech-to-text and audio replacement, MERN stack on a DigitalOcean droplet.",
    img: { src: "/project-AusioScribe.webp", width: 700, height: 438 },
    stack: ["React", "Express", "Node.js", "MongoDB", "Chakra UI"],
    link: "https://github.com/Michaelcarduce/AudioScribe4",
    featured: false,
  },
  {
    id: 8,
    title: "MyWebAudit",
    des: "Front-end build from a Figma design, delivered on deadline as a hiring trial for HIREAWIZ.",
    img: { src: "/my-web-audit.webp", width: 1080, height: 675 },
    stack: ["HTML", "CSS", "Tailwind"],
    link: "https://web-impact-software-solutions-trial.vercel.app/",
    featured: false,
  },
];

export type WorkExperience = {
  id: number;
  title: string;
  company: string;
  link?: string;
  duration: string;
  desc: string;
  tech: string[];
  className: string;
  thumbnail: ImageAsset;
};

// Newest first.
export const workExperience: WorkExperience[] = [
  {
    id: 1,
    title: "Software Engineer",
    company: "Maritime Academy of Asia and the Pacific (MAAP) — ISSD",
    link: "https://maap.edu.ph",
    duration: "June 2026 – Present",
    desc: "Rebuilt the public applicant flow of the legacy PHP admission system (OMAS) as a React 18 + TypeScript SPA over a layered PSR-4 JSON API. Moved all SQL to PDO prepared statements, fixed an exam-center overbooking race, and authored the production runbook. 5,000+ live registrations and counting.",
    tech: [
      "PHP 8",
      "MySQL",
      "React 18",
      "TypeScript",
      "RHF + Zod",
      "PHPMailer",
    ],
    className: "",
    thumbnail: svg.exp1,
  },
  {
    id: 2,
    title: "Mobile App & Full-Stack Developer (contract)",
    company: "Kosher Kav LLC — USA, remote",
    duration: "August 2026 – Present",
    desc: "Sole engineer on a kosher restaurant discovery, delivery and video platform: a React Native app plus a Next.js 16 admin dashboard and public API on Cloudflare Workers, D1 and Durable Objects. Broke the app out of a white-label vendor lock, grew the test suite from 616 to 1,347, and re-identified it as a standalone app.",
    tech: [
      "React Native",
      "Next.js 16",
      "Cloudflare Workers",
      "D1 · Drizzle",
      "Durable Objects",
      "Vitest",
    ],
    className: "",
    thumbnail: svg.exp2,
  },
  {
    id: 3,
    title: "WordPress Specialist (contract)",
    company: "eventsbytmss.com — USA, remote",
    link: "https://eventsbytmss.com",
    duration: "May – June 2026",
    desc: "Audited and fixed site performance: eliminated CLS with native lazy-loading and CSS skeletons, deferred analytics, and built a vanilla-JS gallery lightbox that carries selections across pages into the booking form. Redesigned the core pages and integrated a custom booking system.",
    tech: ["WordPress", "PHP", "Vanilla JS", "Core Web Vitals", "GA4"],
    className: "",
    thumbnail: svg.exp3,
  },
  {
    id: 4,
    title: "WordPress Developer (freelance)",
    company: "HIREAWIZ Web Design & Digital Marketing",
    duration: "October – November 2025",
    desc: "Built and maintained Beaver Builder pages to brand guidelines, with custom CSS where the builder's modules fell short and responsiveness fixes across devices.",
    tech: ["WordPress", "Beaver Builder", "CSS"],
    className: "",
    thumbnail: svg.exp4,
  },
  {
    id: 5,
    title: "WordPress Developer (freelance)",
    company: "Randall J. Borden Law Firm",
    duration: "August – September 2025",
    desc: "Migrated the live site into a local WordPress environment, redesigned navigation and responsive layouts, and set up GTM, GA4, Bing Webmaster Tools, sitemap and robots.txt.",
    tech: ["WordPress", "GTM · GA4", "Technical SEO"],
    className: "",
    thumbnail: svg.exp1,
  },
  {
    id: 6,
    title: "Front-End Developer (freelance)",
    company: "Suman Gupta — former Central One client",
    duration: "August 2024 – June 2026",
    desc: "Continued full front-end ownership for a former Central One client on a project basis: responsive builds in React, Next.js and Vue, performance work (code splitting, lazy loading, WebP) and SEO/analytics.",
    tech: ["React", "Next.js", "Vue", "Tailwind", "GA4 · GTM"],
    className: "",
    thumbnail: svg.exp2,
  },
  {
    id: 7,
    title: "Front-End Developer",
    company: "Central One Bataan Inc.",
    duration: "April – August 2024",
    desc: "Built and maintained responsive sites in React, Next.js and Vue with Tailwind, shadcn/ui and Framer Motion; integrated Sanity CMS and custom WordPress themes. Owned technical SEO (structured data, sitemaps, Search Console) and GA4/GTM tracking.",
    tech: ["React", "Next.js", "Vue", "Sanity", "WordPress", "GA4 · GTM"],
    className: "",
    thumbnail: svg.exp3,
  },
];

export const socialMedia = [
  {
    id: 1,
    name: "GitHub",
    img: { src: "/git.svg", width: 19, height: 18 },
    link: "https://github.com/Michaelcarduce",
  },
  {
    id: 2,
    name: "LinkedIn",
    img: { src: "/link.svg", width: 19, height: 18 },
    link: "https://www.linkedin.com/in/michael-cardose-47294325b/",
  },
];

// primary  = shipped to production, would interview on it (chip links to the proof)
// working  = used in a real project, not daily
// familiar = touched it; no strong claim
export type SkillTier = "primary" | "working" | "familiar";

export type Skill = {
  name: string;
  tier: SkillTier;
  /** Case-study URL (with #section anchor) that proves the skill. */
  proof?: string;
};

export type SkillGroup = { domain: string; skills: Skill[] };

export const skillGroups: SkillGroup[] = [
  {
    domain: "Frontend",
    skills: [
      {
        name: "React 18 / 19",
        tier: "primary",
        proof: "/work/omas-admission-system#architecture",
      },
      {
        name: "TypeScript",
        tier: "primary",
        proof: "/work/kosher-kav#architecture",
      },
      {
        name: "Next.js (App Router)",
        tier: "primary",
        proof: "/work/kosher-kav#architecture",
      },
      {
        name: "React Hook Form + Zod",
        tier: "primary",
        proof: "/work/omas-admission-system#architecture",
      },
      {
        name: "Tailwind / shadcn/ui",
        tier: "primary",
        proof: "/work/glowsimcha#architecture",
      },
      { name: "Framer Motion", tier: "working" },
      { name: "Vue.js", tier: "familiar" },
    ],
  },
  {
    domain: "Mobile",
    skills: [
      {
        name: "React Native (bare)",
        tier: "primary",
        proof: "/work/kosher-kav#architecture",
      },
      { name: "react-native-maps", tier: "working" },
      { name: "Reanimated", tier: "working" },
      { name: "OneSignal push", tier: "working" },
    ],
  },
  {
    domain: "Backend",
    skills: [
      {
        name: "PHP 8 (PSR-4, PDO)",
        tier: "primary",
        proof: "/work/omas-admission-system#decisions",
      },
      {
        name: "Laravel 12 + Sanctum",
        tier: "primary",
        proof: "/work/public-health-is#architecture",
      },
      {
        name: "REST API design",
        tier: "primary",
        proof: "/work/glowsimcha#architecture",
      },
      {
        name: "Server-side analytics",
        tier: "primary",
        proof: "/work/public-health-is#what-broke",
      },
      { name: "Node.js / Express", tier: "working" },
    ],
  },
  {
    domain: "Data",
    skills: [
      {
        name: "MySQL (transactions, row locks)",
        tier: "primary",
        proof: "/work/omas-admission-system#what-broke",
      },
      {
        name: "MySQL SPATIAL",
        tier: "primary",
        proof: "/work/glowsimcha#decisions",
      },
      {
        name: "Cloudflare D1 + Drizzle",
        tier: "primary",
        proof: "/work/kosher-kav#architecture",
      },
      { name: "MongoDB", tier: "familiar" },
    ],
  },
  {
    domain: "Edge & infra",
    skills: [
      {
        name: "Cloudflare Workers",
        tier: "primary",
        proof: "/work/kosher-kav#architecture",
      },
      {
        name: "Durable Objects",
        tier: "primary",
        proof: "/work/kosher-kav#decisions",
      },
      {
        name: "GitHub Actions CI",
        tier: "primary",
        proof: "/work/glowsimcha#quality",
      },
      { name: "Apache / Nginx", tier: "working" },
      { name: "Vercel", tier: "working" },
      { name: "DigitalOcean", tier: "working" },
    ],
  },
  {
    domain: "Security & real-time",
    skills: [
      {
        name: "JWT in HttpOnly cookies + CSRF",
        tier: "primary",
        proof: "/work/glowsimcha#decisions",
      },
      {
        name: "PBKDF2 / Web Crypto sessions",
        tier: "primary",
        proof: "/work/kosher-kav#decisions",
      },
      {
        name: "Prepared statements, CSP, headers",
        tier: "primary",
        proof: "/work/omas-admission-system#decisions",
      },
      {
        name: "Rate limiting",
        tier: "primary",
        proof: "/work/kosher-kav#decisions",
      },
      {
        name: "WebSockets + reconnect",
        tier: "primary",
        proof: "/work/glowsimcha#what-broke",
      },
    ],
  },
  {
    domain: "Payments & APIs",
    skills: [
      {
        name: "Stripe Checkout + Connect",
        tier: "primary",
        proof: "/work/glowsimcha#decisions",
      },
      {
        name: "Webhooks + idempotency",
        tier: "primary",
        proof: "/work/glowsimcha#decisions",
      },
      {
        name: "Google OAuth / Calendar",
        tier: "primary",
        proof: "/work/glowsimcha#decisions",
      },
      {
        name: "Leaflet / OpenStreetMap",
        tier: "primary",
        proof: "/work/glowsimcha",
      },
      { name: "PHPMailer / SMTP", tier: "working" },
    ],
  },
  {
    domain: "Quality",
    skills: [
      { name: "PHPUnit", tier: "primary", proof: "/work/glowsimcha#quality" },
      {
        name: "Vitest (in workerd)",
        tier: "primary",
        proof: "/work/kosher-kav#quality",
      },
      {
        name: "WCAG / axe-core",
        tier: "primary",
        proof: "/work/kosher-kav#quality",
      },
      { name: "i18n (12 locales)", tier: "primary", proof: "/work/kosher-kav" },
      { name: "Bundle splitting", tier: "primary", proof: "/work/glowsimcha" },
      { name: "Jest", tier: "working" },
      { name: "Lighthouse / Core Web Vitals", tier: "working" },
    ],
  },
];

// Kept on the resume, de-emphasised here so they don't dilute the full-stack story.
export const alsoWorkedWith = [
  "WordPress",
  "Beaver Builder",
  "Sanity",
  "GA4 / Tag Manager / Search Console",
  "Java",
  "C++",
  "COBOL",
  "Visual Basic",
  "Microsoft SQL",
];
