// Short write-ups for /writing/[slug]: one defect or decision each, in the
// order symptom → why the UI couldn't show it → diagnosis → fix → test.
// ≤ 600 words. Each traces to a sentence in data/work.ts; code blocks are
// reconstructions of the pattern, not copies of client code.

export type PostBlock =
  | { type: "h2"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "code"; lang: string; code: string };

export type Post = {
  slug: string;
  title: string;
  date: string; // ISO yyyy-mm-dd
  summary: string; // ≤ 30 words
  tags: string[];
  caseStudy: string; // slug in data/work.ts
  blocks: PostBlock[];
};

export const posts: Post[] = [
  {
    slug: "map-markers-re-rasterizing",
    title: "The map that felt slow: a counter against a stale denominator",
    date: "2026-09-15",
    summary:
      "Every pin re-rasterized on every frame after any filter tap. Nothing errored, nothing was reported, and the cause was one comparison.",
    tags: ["React Native", "performance", "maps"],
    caseStudy: "kosher-kav",
    blocks: [
      { type: "h2", text: "Symptom" },
      {
        type: "p",
        text: "After a filter tap on the map screen of Kosher Kav, panning went from smooth to sticky. Not broken — sticky. Frame drops were visible on a mid-range Android device and invisible on the iPhone I developed on, which is why it survived as long as it did.",
      },
      { type: "h2", text: "Why the UI couldn't show it" },
      {
        type: "p",
        text: "react-native-maps markers have a flag, tracksViewChanges. While it is true the marker is re-rasterized every frame so that custom content can animate; once the content is stable you set it false and the marker becomes a static bitmap. Our custom pins had an image inside them, so the flag was held true until the image had loaded and then flipped to false. There was no state for \"stuck at true\" — the pins looked identical either way.",
      },
      { type: "h2", text: "Diagnosis" },
      {
        type: "p",
        text: "The flip was driven by a counter: every pin reported when its image loaded, and when loaded === total the screen set tracksViewChanges to false on all of them. total was captured when the pin list was first built. A filter tap replaced the list with a shorter one, the new pins reported their loads, and loaded climbed to the new length — which was never equal to the old total. The condition simply never became true again, so every pin on screen stayed in \"re-rasterize me\" mode until the app restarted.",
      },
      {
        type: "code",
        lang: "tsx",
        code: `// Before: \`total\` is from the render that created the ref.
const total = useRef(pins.length);
const onLoad = () => {
  loaded.current += 1;
  if (loaded.current === total.current) setTracking(false);
};`,
      },
      { type: "h2", text: "Fix" },
      {
        type: "p",
        text: "Track per marker, not per screen. Each pin owns its own tracksViewChanges and flips it on its own onLoad. There is no shared denominator to go stale, and a pin that is removed takes its state with it.",
      },
      {
        type: "code",
        lang: "tsx",
        code: `const Pin = ({ uri }: { uri: string }) => {
  const [tracking, setTracking] = useState(true);
  return (
    <Marker tracksViewChanges={tracking}>
      <Image source={{ uri }} onLoad={() => setTracking(false)} />
    </Marker>
  );
};`,
      },
      { type: "h2", text: "Test" },
      {
        type: "p",
        text: "A render test mounts ten pins, fires onLoad on each, applies a filter that keeps four, fires onLoad on those, and asserts that every mounted Marker has tracksViewChanges false. The old code fails it at the filter step. It is a cheap test for an expensive class of bug: any counter compared against a value that can change out from under it.",
      },
    ],
  },
  {
    slug: "session-cache-written-on-resolve",
    title: "The cache that was documented but didn't exist",
    date: "2026-09-15",
    summary:
      "Four consumers mounted together, all missed the session cache, all fetched. The code review said it was cached. The formality test said otherwise.",
    tags: ["React Native", "testing", "caching"],
    caseStudy: "kosher-kav",
    blocks: [
      { type: "h2", text: "Symptom" },
      {
        type: "p",
        text: "None, from the user's side. The app started, the session loaded, screens rendered. The only trace was in the Workers logs: four identical /session requests per cold start, a few milliseconds apart, from the same device.",
      },
      { type: "h2", text: "Why the UI couldn't show it" },
      {
        type: "p",
        text: "Every one of the four requests succeeded and returned the same session, so every consumer got the right data. Extra requests cost latency and quota, not correctness. Nothing on screen could distinguish one fetch from four.",
      },
      { type: "h2", text: "Diagnosis" },
      {
        type: "p",
        text: "The session module had a cache, a comment saying so, and a code review that had confirmed it. What it cached was the result: after the fetch resolved, the value was stored, and later calls returned it. The gap is the window between the first call and the first resolve. The tab bar, the map, the feed and the profile all mount during that window, all find the cache empty, and all start a fetch.",
      },
      {
        type: "code",
        lang: "ts",
        code: `// Before: cached on resolve — the in-flight window is unprotected.
let cached: Session | undefined;
export async function getSession() {
  if (cached) return cached;
  cached = await fetchSession();
  return cached;
}`,
      },
      { type: "h2", text: "Fix" },
      {
        type: "p",
        text: "Cache the promise, not the value. The first caller creates it; everyone in the window awaits the same one. A failed fetch clears it so the next caller retries instead of inheriting the rejection forever.",
      },
      {
        type: "code",
        lang: "ts",
        code: `let inflight: Promise<Session> | undefined;
export function getSession() {
  inflight ??= fetchSession().catch((e) => {
    inflight = undefined;
    throw e;
  });
  return inflight;
}`,
      },
      { type: "h2", text: "Test" },
      {
        type: "p",
        text: "The test that found it was budgeted as a formality: mock fetchSession, call getSession four times without awaiting between them, assert the mock was called once. It failed on the first run against code that everyone had read and agreed was cached. That is the argument for writing the boring test: reading code confirms what the code claims, and a test confirms what it does. This one took ten minutes and has been guarding the in-flight window through every refactor since.",
      },
    ],
  },
  {
    slug: "obutton-allow-list",
    title: "The button that dropped accessibilityLabel",
    date: "2026-09-15",
    summary:
      "A shared button forwarded an allow-list of props instead of ...props. Everything sighted testers used worked; everything screen readers needed was gone.",
    tags: ["React Native", "accessibility", "API design"],
    caseStudy: "kosher-kav",
    blocks: [
      { type: "h2", text: "Symptom" },
      {
        type: "p",
        text: "With VoiceOver on, icon-only buttons in Kosher Kav announced as \"button\" and nothing else. The call sites all passed accessibilityLabel. The labels were right there in the JSX.",
      },
      { type: "h2", text: "Why the UI couldn't show it" },
      {
        type: "p",
        text: "A dropped accessibility prop changes nothing visually. The button rendered, pressed, styled and disabled exactly as designed, so every sighted check passed. The only way to see the defect is to not look.",
      },
      { type: "h2", text: "Diagnosis" },
      {
        type: "p",
        text: "OButton, the shared button, took a typed set of props and forwarded the ones it knew about to Pressable: onPress, disabled, style, testID. It had been written that way to keep the component's API small and explicit — a reasonable instinct. But an allow-list on a wrapper around a platform primitive means every primitive prop the wrapper's author didn't think of is silently discarded. accessibilityLabel, accessibilityHint, accessibilityState and hitSlop all fell through the same hole.",
      },
      {
        type: "code",
        lang: "tsx",
        code: `// Before
export const OButton = ({ onPress, disabled, style, testID, children }: Props) => (
  <Pressable onPress={onPress} disabled={disabled} style={style} testID={testID}>
    {children}
  </Pressable>
);`,
      },
      { type: "h2", text: "Fix" },
      {
        type: "p",
        text: "Own the props you add, spread the rest. The component's type extends PressableProps, its own additions are picked off, and everything else reaches the primitive. The API stays explicit for what OButton adds and stops pretending to know the full surface of Pressable.",
      },
      {
        type: "code",
        lang: "tsx",
        code: `type Props = PressableProps & { variant?: "primary" | "ghost" };

export const OButton = ({ variant = "primary", style, ...rest }: Props) => (
  <Pressable
    accessibilityRole="button"
    style={[styles[variant], style]}
    {...rest}
  />
);`,
      },
      { type: "h2", text: "Test" },
      {
        type: "p",
        text: "Render OButton with an accessibilityLabel and query it with getByLabelText. Before the fix the query throws; after, it finds the element. The same test file asserts accessibilityRole defaults to \"button\" so an icon-only child still announces as one. Beyond the test, the rule that came out of it: a wrapper around a platform primitive spreads ...rest, always. The allow-list is for components that compose several primitives and have to choose where each prop goes.",
      },
    ],
  },
  {
    slug: "exam-center-overbooking",
    title: "Two applicants, one seat: fixing an overbooking race with a row lock",
    date: "2026-09-15",
    summary:
      "The legacy code read the count, compared it, then inserted. Under real load two requests both passed the check. One transaction and SELECT … FOR UPDATE.",
    tags: ["PHP", "MySQL", "concurrency"],
    caseStudy: "omas-admission-system",
    blocks: [
      { type: "h2", text: "Symptom" },
      {
        type: "p",
        text: "An exam center with a capacity of 40 had 41 applicants assigned. Staff found it while printing seat lists, well after both applicants had received confirmation emails.",
      },
      { type: "h2", text: "Why the UI couldn't show it" },
      {
        type: "p",
        text: "Both applicants saw a center with one seat left, both submitted, both got a success page. Each request, taken alone, did the right thing. The defect only exists between two requests, and neither request can see the other.",
      },
      { type: "h2", text: "Diagnosis" },
      {
        type: "p",
        text: "The legacy code was the textbook check-then-act: SELECT COUNT(*) for the center, compare with capacity in PHP, INSERT if there is room. Two requests that interleave between the SELECT and the INSERT both read 39, both pass, both insert.",
      },
      {
        type: "p",
        text: "It had never shown up in testing because every test ran one request at a time, and it had never shown up in years of production because registration was spread across weeks. A deadline day with a batch of applicants hitting the last seats of a popular center was the first time two requests were close enough together.",
      },
      { type: "h2", text: "Fix" },
      {
        type: "p",
        text: "Make the check and the insert one atomic step from the database's point of view. Inside a transaction, lock the center's row with SELECT … FOR UPDATE. The second transaction blocks on that lock until the first commits, then re-reads a count that now includes the first insert, and fails the check.",
      },
      {
        type: "code",
        lang: "php",
        code: `$db->transaction(function (Connection $db) use ($centerId, $applicantId): void {
    $center = $db->selectOne(
        'SELECT capacity FROM exam_centers WHERE id = :id FOR UPDATE',
        ['id' => $centerId],
    ) ?? throw HttpException::notFound('Exam center');

    $taken = $db->selectOne(
        'SELECT COUNT(*) AS n FROM exam_slots WHERE center_id = :id',
        ['id' => $centerId],
    )['n'];

    if ($taken >= $center['capacity']) {
        throw new HttpException(409, 'This exam center is full');
    }

    $db->execute(
        'INSERT INTO exam_slots (center_id, applicant_id) VALUES (:c, :a)',
        ['c' => $centerId, 'a' => $applicantId],
    );
});`,
      },
      {
        type: "p",
        text: "The lock is on the parent row, not the count. Locking the rows you are counting does not stop a new row from being inserted; locking the center serialises every writer for that center, which is exactly the granularity wanted — two applicants at different centers never wait on each other.",
      },
      { type: "h2", text: "Test" },
      {
        type: "p",
        text: "A PHPUnit test seeds a center with capacity 1, opens two database connections, starts a transaction on each, and drives them through the allocation in the interleaving that used to fail: both read, then both try to write. It asserts that exactly one INSERT succeeds and the other request gets a 409. The test is uglier than the fix, and it is the only thing that proves the fix does what the commit message says.",
      },
    ],
  },
  {
    slug: "session-auth-without-a-library",
    title: "Session auth without a library, twice",
    date: "2026-09-15",
    summary:
      "PBKDF2 over Web Crypto on Cloudflare Workers; HS256 JWT in HttpOnly cookies with double-submit CSRF in PHP. When 80 lines is less risk than a dependency.",
    tags: ["security", "Cloudflare Workers", "PHP"],
    caseStudy: "kosher-kav",
    blocks: [
      { type: "h2", text: "The decision" },
      {
        type: "p",
        text: "Two systems, two runtimes, the same call: for a small admin surface with a handful of accounts, hand-rolled session auth was less risk than the dependency that would replace it. That is not a general rule. It held here because the surface area was small enough to read in one sitting, the primitives the platform provided were the right ones, and every line was going to be audited anyway.",
      },
      { type: "h2", text: "Workers: PBKDF2 over Web Crypto" },
      {
        type: "p",
        text: "The Kosher Kav dashboard runs on Cloudflare Workers, which has no Node crypto and, at the time, no bcrypt that would run inside the CPU budget. What it has is Web Crypto, and Web Crypto has PBKDF2-HMAC-SHA256 built in. Verification derives with the stored salt and iteration count and compares with a constant-time check.",
      },
      {
        type: "code",
        lang: "ts",
        code: `async function derive(password: string, salt: Uint8Array, iterations: number) {
  const key = await crypto.subtle.importKey(
    "raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveBits"],
  );
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", hash: "SHA-256", salt, iterations }, key, 256,
  );
  return new Uint8Array(bits);
}

export async function verify(password: string, stored: StoredHash) {
  const candidate = await derive(password, stored.salt, stored.iterations);
  return crypto.subtle.timingSafeEqual(candidate, stored.hash);
}`,
      },
      {
        type: "p",
        text: "The iteration count is stored with the hash, so it can be raised later and old rows re-hashed on next login. The session itself is a random 256-bit id in an HttpOnly, Secure, SameSite=Lax cookie, looked up in D1. The whole module — hash, verify, create session, read session, revoke — is about 80 lines.",
      },
      { type: "h2", text: "PHP: JWT in a cookie, CSRF by double submit" },
      {
        type: "p",
        text: "GlowSimcha's API is framework-free PHP 8.2 serving a React SPA on another origin. Sessions are HS256 JWTs in HttpOnly cookies, so JavaScript cannot read them — which means the SPA needs a second, readable token to prove a request came from it and not from a form on another site. The double-submit pattern: a random CSRF token in a non-HttpOnly cookie, echoed back in a header, compared on the server with hash_equals.",
      },
      {
        type: "code",
        lang: "php",
        code: `$cookie = $request->cookie('csrf');
$header = $request->header('x-csrf-token');
if ($cookie === null || $header === null || !hash_equals($cookie, $header)) {
    throw new HttpException(403, 'CSRF token mismatch');
}`,
      },
      {
        type: "p",
        text: "Revocation is a token version on the user row: bump it and every outstanding JWT for that user fails verification on its next request. A per-device session registry lets a user see and sign out individual devices without touching the others.",
      },
      { type: "h2", text: "What it cost, what it bought" },
      {
        type: "p",
        text: "It cost writing tests a library would have shipped with: wrong password, tampered token, expired token, replayed CSRF token, revoked version. It bought a security model that is explicit in the code rather than inherited from a package's defaults, and that a reviewer can read end to end in ten minutes. The day either system needs OAuth providers, MFA and a session dashboard for thousands of users, this gets replaced — and the tests will make that safe.",
      },
    ],
  },
  {
    slug: "breaking-out-of-white-label",
    title: "Breaking out of a white-label template",
    date: "2026-09-15",
    summary:
      "Kosher Kav started as a hosted marketplace tenant. Anything custom was impossible or overwritten on the next regenerate. The way out was owning the stack.",
    tags: ["architecture", "React Native", "Cloudflare"],
    caseStudy: "kosher-kav",
    blocks: [
      { type: "h2", text: "Where it started" },
      {
        type: "p",
        text: "Kosher Kav's first version was a white-label tenant of ordering.co's marketplace template. For a client who needed an app in weeks, that was the right first move: a working ordering flow, a store directory and a published app with nearly no engineering.",
      },
      { type: "h2", text: "Where it stopped" },
      {
        type: "p",
        text: "The product the client actually wanted was not a generic marketplace. It needed kosher certification data on every listing, a video feed, and a real map experience with filters. The hosted builder regenerates the app from its template on every change, so custom code had two possible fates: impossible, because the template had no hook for it, or overwritten, because the next regenerate replaced it.",
      },
      {
        type: "p",
        text: "The moment that made the decision was small: a change to how the certification badge rendered, done inside the template, gone the following week after a routine update. Every feature on the roadmap would have the same lifespan.",
      },
      { type: "h2", text: "The decision" },
      {
        type: "p",
        text: "Own the stack. A React Native app the client controls, a Cloudflare Workers backend on D1 with Durable Objects where coordination was needed, and a Next.js admin. The trade was obvious and worth stating plainly to the client: months of engineering and a permanent maintenance responsibility, in exchange for a product that could become what they wanted.",
      },
      {
        type: "ul",
        items: [
          "Data first. The store directory was exported from the old tenant and loaded into D1 so the new app had real content from day one.",
          "Feature parity before new features. The ordering flow and the store directory were rebuilt to match before the map, the video feed and the certification data were added — the client never had to ship a regression to get an improvement.",
          "Free tier as a design constraint. Workers, D1 and SQLite-backed Durable Objects run the whole backend without a paid plan, which matters for a small non-profit-adjacent client more than any architectural elegance.",
        ],
      },
      { type: "h2", text: "What it made possible" },
      {
        type: "p",
        text: "Everything that followed — the token-bucket rate limiter on the write-once video route, the sync job that surfaces lastSyncedAt in the admin instead of failing silently, 1,347 tests across 291 suites — exists because the code is the client's. None of it could have been built inside the template.",
      },
      { type: "h2", text: "What I'd tell the next client" },
      {
        type: "p",
        text: "Start on the template if it gets you to market. Decide up front which feature is the one the template can't do, and treat it as the signal to leave, not as a problem to work around. The cost of staying too long is not the money paid to the vendor; it is every custom feature that quietly dies on the next regenerate.",
      },
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}

export function postsForCaseStudy(slug: string) {
  return posts.filter((p) => p.caseStudy === slug);
}
