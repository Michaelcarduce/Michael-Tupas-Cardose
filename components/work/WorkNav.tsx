import Link from "next/link";

import { site } from "@/data/site";

// Slim header for /work and /writing pages. The home FloatingNav only targets #anchors,
// so sub-pages get their own minimal navigation.
const WorkNav = () => {
  return (
    <nav
      aria-label="Site"
      className="flex items-center justify-between py-6 text-sm">
      <Link href="/" className="font-semibold hover:text-purple">
        {site.name}
      </Link>
      <div className="flex items-center gap-6">
        <Link href="/work" className="hover:text-purple">
          Work
        </Link>
        <Link href="/writing" className="hover:text-purple">
          Writing
        </Link>
        <Link href="/#contact" className="hover:text-purple">
          Contact
        </Link>
      </div>
    </nav>
  );
};

export default WorkNav;
