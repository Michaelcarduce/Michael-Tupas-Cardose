import Image from "next/image";

export type PhoneShot = { src: string; width: number; height: number; alt: string };

type Props = {
  /** Three shots for the desktop fan; on phones the whole list scrolls. */
  fan: PhoneShot[];
  all: PhoneShot[];
  label: string;
};

// Banner for mobile-only case studies: a three-phone fan on wide screens,
// a scroll-snap strip on narrow ones. Sources are transparent-cornered
// device screenshots, so no bezel is drawn here.
export default function PhoneShowcase({ fan, all, label }: Props) {
  const [left, mid, right] = fan;
  return (
    <div
      aria-label={label}
      role="group"
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-black-200">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(203,172,249,0.28),transparent_60%)]"
      />

      {/* Desktop fan */}
      <div className="relative hidden h-[520px] items-end justify-center gap-6 px-8 pt-10 sm:flex">
        {left && (
          <Image
            src={left.src}
            width={left.width}
            height={left.height}
            alt={left.alt}
            sizes="200px"
            className="w-[200px] -translate-y-2 -rotate-6 drop-shadow-2xl"
          />
        )}
        {mid && (
          <Image
            src={mid.src}
            width={mid.width}
            height={mid.height}
            alt={mid.alt}
            sizes="240px"
            priority
            className="z-10 w-[240px] -translate-y-8 drop-shadow-2xl"
          />
        )}
        {right && (
          <Image
            src={right.src}
            width={right.width}
            height={right.height}
            alt={right.alt}
            sizes="200px"
            className="w-[200px] -translate-y-2 rotate-6 drop-shadow-2xl"
          />
        )}
      </div>

      {/* Phone strip */}
      <ul className="relative flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 py-8 sm:hidden [scrollbar-width:none]">
        {all.map((shot) => (
          <li key={shot.src} className="w-[62vw] shrink-0 snap-center">
            <Image
              src={shot.src}
              width={shot.width}
              height={shot.height}
              alt={shot.alt}
              sizes="62vw"
              className="w-full drop-shadow-2xl"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
