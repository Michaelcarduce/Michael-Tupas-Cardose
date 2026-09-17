// Case-study content for /work/[slug]. Every number here must trace to the
// resume; private client work carries `isPrivate: true` and no source link.

export type CaseStudyLink = { label: string; href: string };

export type CaseStudySection = {
  id: string;
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  links?: CaseStudyLink[]; // public repos extracted from this project
};

export type CaseStudy = {
  slug: string;
  title: string;
  period: string;
  summary: string; // ≤ 40 words, one number
  meta: {
    client: string;
    role: string;
    platform: string;
    stack: string[];
    live?: CaseStudyLink;
    store?: CaseStudyLink;
    source: string; // "Private — details limited by client agreement" | repo URL
  };
  metrics: { value: string; label: string }[]; // exactly 3
  sections: CaseStudySection[];
  images: {
    src: string;
    width: number;
    height: number;
    alt: string;
    caption?: string;
  }[];
  /** Mobile-only projects: indices into `images` for the three-phone banner. */
  phoneFan?: [number, number, number];
  /** Responsive web apps: indices into images for the desktop-plus-phone banner. */
  devicePair?: { wide: number; phone: number };
  isPrivate: boolean;
};

const PRIVATE_SOURCE = "Private — details limited by client agreement";

export const caseStudies: CaseStudy[] = [
  {
    slug: "omas-admission-system",
    title: "Online Admission System (OMAS)",
    period: "June 2026 – present",
    summary:
      "Rebuilt the public applicant flow of MAAP's legacy PHP admission system as a standalone React 18 + TypeScript SPA over a layered PHP JSON API. 5,000+ live registrations and counting.",
    meta: {
      client: "Maritime Academy of Asia and the Pacific (MAAP) — ISSD",
      role: "Software Engineer (sole developer on the rebuild)",
      platform: "Web (public applicant pages + PHP API)",
      stack: [
        "PHP 8",
        "MySQL",
        "React 18",
        "TypeScript",
        "React Hook Form + Zod v4",
        "PHPMailer",
        "Apache",
      ],
      source: PRIVATE_SOURCE,
    },
    metrics: [
      { value: "5,000+", label: "live applicant registrations" },
      { value: "101", label: "validated form fields" },
      { value: "7", label: "step application wizard" },
    ],
    sections: [
      {
        id: "context",
        heading: "Context & constraints",
        paragraphs: [
          "MAAP runs its admissions on a legacy PHP system. The two pages every applicant touches — registration and the application form — were the oldest part of it: server-rendered, string-concatenated SQL, no client-side validation, and no way to save progress. Applicants on slow connections lost work; staff spent time fixing records that should never have been accepted.",
          "The constraints were fixed from day one: the existing MySQL schema and the rest of the legacy system stayed in place, the new pages had to ship into the same Apache/PHP host, and there was one engineer. The brief was to rebuild the public flow without a rewrite of everything behind it.",
        ],
      },
      {
        id: "architecture",
        heading: "Architecture",
        paragraphs: [
          "The two public pages became a standalone React 18 + TypeScript single-page app that talks to a new JSON API written in PHP 8. The API is layered: thin endpoint controllers, Service classes for the rules, Repository classes for the queries, all PSR-4 autoloaded. Every query runs through PDO prepared statements.",
          "The form is a seven-step wizard built on React Hook Form with a Zod v4 schema per step. Each step gates the next, so an applicant can't reach step five with an invalid step two. Drafts autosave as the applicant types — text to localStorage, file uploads to IndexedDB — and restore when they come back.",
        ],
      },
      {
        id: "decisions",
        heading: "Key decisions",
        paragraphs: [],
        bullets: [
          "Layered PHP API instead of a framework: the host already ran PHP and Apache, and the rest of the system is PHP. A framework would have added a second deployment story for one feature. PSR-4 + PDO gave the structure without the weight.",
          "Schema-gated wizard over one long form: 101 fields on one page is where applicants abandon. Per-step Zod schemas mean the server only ever sees a payload that already passed the same rules the UI enforces.",
          "Email as best-effort after commit: the branded HTML confirmation goes out via PHPMailer over SMTP only after the registration transaction commits. An SMTP outage can delay an email; it can never roll back a saved registration.",
          "Hardened the API end to end: prepared statements everywhere, strict input validation on the server regardless of what the client sent, and an exam-center seat allocation that holds a row lock so two applicants can't take the last slot at once.",
          "Autosave split by storage type: localStorage for text is simple and synchronous; file uploads go to IndexedDB so a multi-megabyte scan doesn't blow the localStorage quota.",
        ],
      },
      {
        id: "what-broke",
        heading: "What broke",
        paragraphs: [
          "Exam-center overbooking. Each center has a capacity; the legacy code read the count, compared it, then inserted. Under real load two applicants could both pass the check and both get the last seat. It never showed up in testing because tests ran one request at a time. The fix was to do the check-and-insert inside a transaction with the center row locked for update, and to add a test that fires the two requests concurrently and asserts exactly one succeeds.",
        ],
      },
      {
        id: "quality",
        heading: "Quality",
        paragraphs: [
          "101 validated fields with matching client and server rules. A server runbook covering Apache, PHP, MySQL, SMTP and filesystem permissions so the system can be redeployed or recovered by someone other than me. Structured, best-effort email delivery that is observable when it fails.",
        ],
      },
      {
        id: "retrospective",
        heading: "What I'd do differently",
        paragraphs: [
          'I would have written the concurrency test for seat allocation before touching the code, not after finding the race. The bug was obvious once I thought about two requests at once; the habit of asking "what if this runs twice at the same time?" for every write is the thing I actually took away from this project.',
        ],
      },
      {
        id: "evidence",
        heading: "Evidence",
        paragraphs: [
          "Source is not published — it is an employer's live production service. The applicant flow itself is public during admission periods; the screenshot below is step 2 of the wizard filled with my own details, no applicant data. Happy to walk through the architecture and the concurrency fix in an interview.",
          "The API layering — router, controller, service, repository, PDO — is extracted with the business logic removed into a public starter with PHPUnit and CI.",
        ],
        links: [
          {
            label: "php-psr4-api-starter on GitHub",
            href: "https://github.com/Michaelcarduce/php-psr4-api-starter",
          },
        ],
      },
    ],
    images: [
      {
        src: "/omas-1.webp",
        width: 1200,
        height: 593,
        alt: "OMAS Online Midshipman Application, step 2 of 7 (Personal Information): the 7-step progress bar and the first validated fields of the form",
        caption:
          "Step 2 of the 7-step wizard — Personal Information, with the stepper and per-field hints that mirror the birth-certificate wording.",
      },
    ],
    isPrivate: true,
  },
  {
    slug: "kosher-kav",
    title: "Kosher Kav",
    period: "August 2026 – present",
    summary:
      "Kosher restaurant discovery, delivery and video platform: a React Native app plus a Next.js 16 admin dashboard and public API on Cloudflare Workers. Sole engineer; suite grown from 616 to 1,347 tests.",
    meta: {
      client: "Kosher Kav LLC — USA (remote)",
      role: "Mobile App & Full-Stack Developer, sole engineer",
      platform: "iOS & Android (React Native) · Web admin + public API",
      stack: [
        "React Native 0.81",
        "React 19",
        "Next.js 16",
        "Tailwind v4",
        "Cloudflare Workers",
        "D1 + Drizzle",
        "Durable Objects",
        "Vitest (workerd)",
        "OneSignal",
      ],
      source: PRIVATE_SOURCE,
    },
    metrics: [
      { value: "616 → 1,347", label: "tests, all green (291 suites)" },
      { value: "12", label: "locales, every user-facing string" },
      { value: "2.23 → 7.35 : 1", label: "selected-chip contrast (WCAG)" },
    ],
    sections: [
      {
        id: "context",
        heading: "Context & constraints",
        paragraphs: [
          "Kosher Kav started life as a white-label tenant of ordering.co's marketplace template. That gave the client a working app quickly, but the hosted builder regenerates the code from their template, so anything custom — kosher certification data, a video feed, a real map experience — was either impossible or would be overwritten.",
          "The constraints: ordering.co's schema could not be changed, the back end had to run on the Cloudflare Workers free tier, the app had to keep shipping to both stores through the transition, and I was the only engineer.",
        ],
      },
      {
        id: "architecture",
        heading: "Architecture",
        paragraphs: [
          "Two codebases. The React Native 0.81 / React 19 app was forked into a repo we control, with the headless @components layer vendored in so the tree clones and builds standalone. The second codebase is a pnpm workspace — apps/dashboard, packages/shared, packages/db — running Next.js 16 (App Router, Turbopack) + React 19 + Tailwind v4 on Cloudflare Workers via @opennextjs/cloudflare, with Cloudflare D1 and Drizzle ORM migrations.",
          "It is a dual-backend design with clear domain ownership. ordering.co keeps business identities and locations. Our API owns the kosher layer — kashrut types and certifiers keyed by business ID — and the video product. Location data is fetched from ordering.co live, without caching or syncing, so an edit on their side shows up in the app immediately.",
        ],
      },
      {
        id: "decisions",
        heading: "Key decisions",
        paragraphs: [],
        bullets: [
          "Fork and vendor instead of keep customising the tenant: the only way to own the build and signing was to own the code. It cost a week of untangling; it bought every feature since.",
          "Durable Objects for counting and abuse control: one ViewCounter per video buffers plays and flushes to D1 on a 10-second alarm (SQLite-backed, so it runs on the free tier), and one RateLimiter token bucket per (client, video) — 30 burst / 120 per hour — guards the single route where a wrong write is permanent.",
          "Hand-rolled session-cookie auth for the dashboard: PBKDF2-HMAC-SHA256 over Web Crypto, no library. Workers has no Node crypto, and the surface area was small enough that a dependency would have been more risk than the 80 lines it replaced.",
          "Store data sync that admits when it is stale: anonymous ingestion of the ordering.co listing into D1 with change detection that updates cached coordinates but never touches editorially-owned columns, and a visible lastSyncedAt instead of a cron nobody would notice failing.",
          "A hand-written Google encoded-polyline decoder for route drawing, verified against Google's published reference vector and its re-encode, with malformed input returning empty rather than looping.",
        ],
      },
      {
        id: "what-broke",
        heading: "What broke",
        paragraphs: [
          "Three defects the UI could not show. A marker-load counter was compared against a stale denominator, which left every map pin re-rasterizing on every frame after any filter tap — the map felt slow and nobody could say why. A session cache was written on resolve rather than on request, so four consumers mounting together all missed it and all fetched; reading the code had confirmed the false claim that it was cached, and the test that was budgeted as a formality is what found it. And a shared OButton silently dropped accessibilityLabel because it forwarded an allow-list of props instead of ...props.",
          "Release engineering had its own: a template merchant-ID entitlement that broke code signing, and a hard-coded localhost API URL that would have killed the Videos tab in every build but the dev machine.",
        ],
      },
      {
        id: "quality",
        heading: "Quality",
        paragraphs: [
          "The clone came with a 616-test baseline. It now runs 1,347 tests across 291 suites, all green, with TypeScript held at an agreed pre-existing-error baseline that is diffed on every change and never regressed, zero lint errors, and i18n complete across 12 locales. The dashboard and API are tested inside workerd with Vitest + @cloudflare/vitest-pool-workers against a real D1.",
          "Accessibility: colour-only filter state replaced with accessibilityState and a checkmark (WCAG 1.4.1), the selected chip raised from 2.23:1 to 7.35:1 contrast, screen-reader sentences composed for badge rows that used to announce as fragments, animation gated behind Reduce Motion, and one generic error state split into offline / service-down / empty-with-filters, each with the right recovery action.",
        ],
      },
      {
        id: "retrospective",
        heading: "What I'd do differently",
        paragraphs: [
          'Write the "is it actually cached?" test on day one. I spent longer confirming that claim by reading than the test took to write, and the test was right where the reading was wrong. More generally: on an inherited codebase, treat every comment that describes behaviour as a hypothesis until a test says otherwise.',
        ],
      },
      {
        id: "evidence",
        heading: "Evidence",
        paragraphs: [
          "Source is private under the client agreement. The screenshots above are from the app; restaurant listings, menus and videos come from the client's live ordering.co tenant. Happy to demo the Videos tab, the map discovery flow and the Durable Object rate limiter on a call.",
          "Two pieces are public: the polyline decoder, with the Google reference-vector and malformed-input tests, and the Durable Object token-bucket rate limiter, tested inside workerd.",
        ],
        links: [
          {
            label: "polyline-decode on GitHub",
            href: "https://github.com/Michaelcarduce/polyline-decode",
          },
          {
            label: "do-token-bucket on GitHub",
            href: "https://github.com/Michaelcarduce/do-token-bucket",
          },
        ],
      },
    ],
    images: [
      {
        src: "/kosherkav-banner.webp",
        width: 1200,
        height: 750,
        alt: "Three Kosher Kav app screens: nearby stores, Videos tab and a restaurant page",
      },
      {
        src: "/kosherkav-2.webp",
        width: 728,
        height: 1490,
        alt: "Nearby stores grid with Meat and Dairy filter chips and Order Now buttons",
        caption: "Discovery — stores near you, filtered by kashrut type.",
      },
      {
        src: "/kosherkav-3.webp",
        width: 732,
        height: 1490,
        alt: "Videos tab with city filters, Top Picks row and a Watch & Discover feature",
        caption:
          "Videos tab — the product that could not be built on the white-label template.",
      },
      {
        src: "/kosherkav-5.webp",
        width: 748,
        height: 1490,
        alt: "Restaurant page for a kosher pizza place with certification badge, delivery time and browse categories",
        caption:
          "Restaurant page — certifier badge, delivery estimate, categories.",
      },
      {
        src: "/kosherkav-1.webp",
        width: 732,
        height: 1488,
        alt: "Map view with a driving route to a selected restaurant and walk/drive toggle",
        caption: "Map discovery — route to the store, walk or drive.",
      },
      {
        src: "/kosherkav-4.webp",
        width: 740,
        height: 1490,
        alt: "Full-screen video of a creator reviewing a pizza, with view-restaurant and view-on-map actions",
        caption:
          "Video player — jump from a review straight to the restaurant or the map.",
      },
      {
        src: "/kosherkav-6.webp",
        width: 730,
        height: 1484,
        alt: "Menu category listing personal pizzas with prices and a View Order bar",
        caption: "Ordering — category tabs, item cards, running cart total.",
      },
    ],
    phoneFan: [1, 2, 3],
    isPrivate: true,
  },
  {
    slug: "glowsimcha",
    title: "GlowSimcha",
    period: "2024 – 2026",
    summary:
      "Two-sided booking marketplace connecting clients with beauty artists. Framework-free PHP 8.2 API (87 REST endpoints) with a React 19 + TypeScript SPA; Stripe Connect payouts, self-hosted WebSockets, geospatial search on MySQL SPATIAL.",
    meta: {
      client: "Personal product (B2C)",
      role: "Sole engineer — API, SPA, payments, infrastructure",
      platform: "Web",
      stack: [
        "PHP 8.2",
        "MySQL (SPATIAL)",
        "React 19",
        "TypeScript (strict)",
        "Vite",
        "Tailwind v4",
        "shadcn/ui",
        "Stripe Connect",
        "Workerman WebSockets",
        "Leaflet / OSM",
      ],
      live: {
        label: "glow-simcha.vercel.app",
        href: "https://glow-simcha.vercel.app/",
      },
      source: "Private repository",
    },
    metrics: [
      { value: "87", label: "REST endpoints · 40 migrations · 27 tables" },
      { value: "592 → 268 kB", label: "main bundle, −52% gzip" },
      { value: "341 + 174", label: "PHPUnit + Vitest tests, CI on every push" },
    ],
    sections: [
      {
        id: "context",
        heading: "Context & constraints",
        paragraphs: [
          "GlowSimcha lets clients find and book beauty artists — hair, makeup, nails — near them, pay a deposit or in full, message the artist, and sync the appointment to their calendar. Artists get paid out through Stripe Connect. It is a marketplace, so every hard problem shows up: payments with two parties, real-time messaging, location search, and refunds that follow a policy.",
          "I built it to prove I could own a full product without a framework doing the thinking for me: every layer from schema to WebSocket server is code I can explain line by line.",
        ],
      },
      {
        id: "architecture",
        heading: "Architecture",
        paragraphs: [
          "The back end is a framework-free PHP 8.2 API — PSR-4, service-layer architecture, PDO prepared statements — exposing 87 REST endpoints over 27 tables managed by 40 migrations. The front end is a React 19 + TypeScript (strict) SPA on Vite with Tailwind v4 and shadcn/ui, route-code-split so the main bundle went from 592 to 268 kB gzipped.",
          "Real-time runs on a self-hosted Workerman WebSocket server: live messaging, typing indicators, presence and push notifications, with heartbeats and exponential-backoff reconnect that degrades silently to polling. Discovery uses native MySQL POINT / SRID 4326 columns with a SPATIAL-indexed mirror table and a two-stage bounding-box → ST_Distance_Sphere query; the map is Leaflet over OpenStreetMap with a hand-built, zoom-gated clusterer.",
        ],
      },
      {
        id: "decisions",
        heading: "Key decisions",
        paragraphs: [],
        bullets: [
          "Stripe Checkout + Connect Express, done properly: signature-verified webhooks, an idempotency ledger so a replayed event can't double-book or double-refund, deposit and full-payment modes, policy-driven refunds, and destination charges with proportional transfer reversal so a partial refund claws back the right share from the artist.",
          "Self-rolled auth: HS256 JWT in HttpOnly cookies with double-submit CSRF, a per-device session registry and token-version revocation, plus Google OAuth sign-in and SMTP email OTP. Small enough to audit, and it made the security model explicit instead of inherited.",
          "Spatial mirror table instead of querying the main table: keeps the SPATIAL index narrow and the hot query cheap; the bounding-box pre-filter means ST_Distance_Sphere only runs on candidates.",
          "Two-way Google Calendar sync with refresh tokens encrypted at rest (libsodium) and per-user timezone handling — the feature users asked for most, and the one with the most ways to leak a secret.",
          "Operational hygiene from the start: structured JSON logging with correlation IDs, an in-app admin monitoring dashboard, responsive WebP image derivatives with EXIF normalization, and scripted backups with a verified restore drill.",
        ],
      },
      {
        id: "what-broke",
        heading: "What broke",
        paragraphs: [
          "The first WebSocket implementation assumed the connection stayed up. On mobile networks it didn't, and messages silently vanished. The fix was the reconnect strategy that shipped: heartbeats to detect a dead socket, exponential backoff so a flapping network doesn't hammer the server, and a polling fallback so the conversation keeps working even when the socket never comes back.",
        ],
      },
      {
        id: "quality",
        heading: "Quality",
        paragraphs: [
          "341 PHPUnit tests on the API and 174 Vitest tests on the SPA, run in GitHub Actions on every push. TypeScript strict throughout. Route code-splitting cut the main bundle by 52%. Backups are scripted and the restore has been drilled, not assumed.",
        ],
      },
      {
        id: "retrospective",
        heading: "What I'd do differently",
        paragraphs: [
          "The framework-free API was the right call for learning and the wrong call for velocity past a certain size. Around the 60-endpoint mark I was maintaining things a framework gives away — request validation plumbing, route grouping, middleware ordering. Next time I'd draw the line earlier: hand-roll the parts that teach (auth, payments, spatial), lean on a framework for the parts that don't.",
        ],
      },
      {
        id: "evidence",
        heading: "Evidence",
        paragraphs: [
          "The app is live at glow-simcha.vercel.app. Source is private; the screenshots below are from a test account with seeded artists and bookings, no real clients. Happy to screen-share the payment webhook handling, the spatial query and the WebSocket reconnect logic.",
          "The API skeleton — router, controller, service, repository, PDO, PSR-4 — is public as a starter with the business logic removed.",
        ],
        links: [
          {
            label: "php-psr4-api-starter on GitHub",
            href: "https://github.com/Michaelcarduce/php-psr4-api-starter",
          },
        ],
      },
    ],
    images: [
      {
        src: "/GlowSimcha.webp",
        width: 1200,
        height: 750,
        alt: "GlowSimcha home page showing artist discovery",
        caption: "Landing page — artist discovery.",
      },
      {
        src: "/glowsimcha-2.webp",
        width: 806,
        height: 1628,
        alt: "GlowSimcha client home feed: an artist's portfolio post with a 1/3 image carousel, Hair and Haircut tags, and a Book button",
        caption:
          "Client home feed — artists post work, clients book straight from the post.",
      },
      {
        src: "/glowsimcha-3.webp",
        width: 904,
        height: 1630,
        alt: "Booking step 2, 'Where should the artist go?': address search, use-my-location, and a map with the artist's free-service-area ring around the chosen address",
        caption:
          "Booking flow: pick shop or travel, drop a pin, and see at once whether the address falls inside the artist's free radius.",
      },
      {
        src: "/glowsimcha-4.webp",
        width: 1200,
        height: 1039,
        alt: "Artist bookings dashboard filtered to Pending: one request showing the appointment in the artist's timezone and the client's timezone, the travel address, the price, and Approve / Decline buttons",
        caption:
          "Artist side of the same booking — both parties' local times, travel address, and manual approve/decline.",
      },
      {
        src: "/glowsimcha-5.webp",
        width: 712,
        height: 1066,
        alt: "Artist location settings: base address on a map, free service-area radius buttons, travel-for-a-fee toggle with maximum distance, base fee and per-km rate, and a manual-acceptance toggle",
        caption:
          "Location settings — base pin, free radius, travel pricing, and whether out-of-radius requests need manual approval.",
      },
      {
        src: "/glowsimcha-6.webp",
        width: 1044,
        height: 1436,
        alt: "Account Security settings on desktop: change-password form, current session with sign-in and expiry times, a log-out-of-all-other-devices button, and a list of signed-in devices each with its own Sign out",
        caption:
          "Account security — per-device sessions, so a user can revoke one browser without being logged out everywhere.",
      },
      {
        src: "/glowsimcha-7.webp",
        width: 804,
        height: 1612,
        alt: "Client messaging thread with an artist: an image message, three text bubbles with timestamps, online indicator, and a composer with image attach",
        caption:
          "Real-time messaging over the self-hosted WebSocket server, with image attachments.",
      },
      {
        src: "/glowsimcha-1.webp",
        width: 1060,
        height: 1222,
        alt: "Create-account screen with a Client / Artist role picker, email, optional phone, password, and Continue with Google",
        caption:
          "Sign-up picks the role up front; Google sign-in is available for both.",
      },
    ],
    devicePair: { wide: 5, phone: 1 },
    isPrivate: false,
  },
  {
    slug: "public-health-is",
    title: "Public Health Information System",
    period: "2026 – 2026",
    summary:
      "Health information system with predictive analytics for Rural Health Units and Barangay Health Stations in Balanga City, Bataan. Laravel 12 API + React 19 SPA; ~900 automated tests.",
    meta: {
      client: "Rural Health Units, Balanga City, Bataan",
      role: "Full-stack developer",
      platform: "Web",
      stack: [
        "Laravel 12",
        "Sanctum",
        "MySQL",
        "React 19",
        "TypeScript",
        "TanStack Query",
        "Recharts",
        "GitHub Actions",
      ],
      source: "Private repository",
    },
    metrics: [
      { value: "~900", label: "automated tests, CI on every push" },
      { value: "z-score", label: "outbreak detection on case counts" },
      { value: "3", label: "report formats: table, CSV, PDF" },
    ],
    sections: [
      {
        id: "context",
        heading: "Context & constraints",
        paragraphs: [
          "Rural Health Units (RHUs) and the Barangay Health Stations (BHSs) under them record consultations, diagnoses and referrals on paper and in spreadsheets. Aggregating them for the city takes weeks, which is exactly the delay that makes an outbreak hard to catch early.",
          "The system had to work for staff with limited training and intermittent connectivity, respect who is allowed to see what across RHU and BHS levels, and produce the reports the city already expects — in the formats it already uses.",
        ],
      },
      {
        id: "architecture",
        heading: "Architecture",
        paragraphs: [
          "A Laravel 12 REST API with Sanctum authentication and policy-based RBAC, so every query is scoped to the caller's unit and role at the policy layer rather than in each controller. A React 19 + TypeScript SPA with TanStack Query for server state and Recharts for the dashboards.",
          "Analytics run server-side: z-score outbreak detection flags a disease when its current count sits far enough above its historical mean, and regression-based trend forecasting projects the next periods. The choropleth map is hand-built SVG keyed by barangay, so it works without a mapping SDK or network tiles.",
        ],
      },
      {
        id: "decisions",
        heading: "Key decisions",
        paragraphs: [],
        bullets: [
          "Laravel over framework-free PHP (the opposite call to GlowSimcha): this system needed RBAC, validation, queues and reporting fast, and Laravel's policies and Eloquent gave me those in days. The interesting code is the analytics, not the plumbing.",
          "Policy-based authorization instead of role checks in controllers: one place to reason about who sees which unit's data, and one place to test it.",
          "SVG choropleth instead of a map library: a few dozen barangays, no need for tiles, and full control over accessibility (each region is a labelled element, not a canvas pixel).",
          "Multi-format reporting (table / CSV / PDF) from the same query: the city's workflows already ran on CSV and printed PDFs; meeting them where they were mattered more than a prettier dashboard.",
        ],
      },
      {
        id: "what-broke",
        heading: "What broke",
        paragraphs: [
          "Early z-score alerts fired constantly for diseases with tiny historical counts — a jump from one case to three is a huge z-score and a meaningless signal. The fix was a minimum-baseline guard and a rolling window sized to the reporting cadence, with tests pinning the thresholds so a future change can't silently reopen the flood of false alerts.",
        ],
      },
      {
        id: "quality",
        heading: "Quality",
        paragraphs: [
          "~900 automated tests across API, policies, analytics and the SPA, running in GitHub Actions on every push. Analytics functions are tested against fixed datasets with known expected outputs, so the maths is verified independently of the UI.",
        ],
      },
      {
        id: "retrospective",
        heading: "What I'd do differently",
        paragraphs: [
          "Start with the reports, not the dashboard. The charts were the fun part, but the CSV and PDF exports were what staff actually needed on day one, and building them first would have surfaced the data-model gaps earlier.",
        ],
      },
      {
        id: "evidence",
        heading: "Evidence",
        paragraphs: [
          "Source is private. The screenshots below are from a seeded demo instance — aggregate counts only, no patient records. Happy to walk through the z-score baseline and the choropleth pipeline on a call.",
        ],
      },
    ],
    images: [
      {
        src: "/phis-1.webp",
        width: 1200,
        height: 575,
        alt: "PHIS dashboard overview: total, active and weekly case counts, a 12-week disease trend chart and a recent-alerts panel",
        caption:
          "Dashboard overview — city-wide surveillance indicators with a disease trend chart and baseline-breach alerts.",
      },
      {
        src: "/phis-2.webp",
        width: 1200,
        height: 593,
        alt: "PHIS choropleth map of Balanga City barangays shaded by case count, with a ranked top-barangays list",
        caption:
          "Cases by barangay — SVG choropleth from PSA boundary data, ranked list alongside.",
      },
      {
        src: "/phis-3.webp",
        width: 1200,
        height: 594,
        alt: "PHIS predictive analytics page: outbreak-risk summary cards, a dengue weekly trend against its 8-week baseline, and a per-disease status list",
        caption:
          "Predictive analytics — weekly counts against the 8-week baseline, with per-disease outbreak status.",
      },
    ],
    isPrivate: true,
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}
