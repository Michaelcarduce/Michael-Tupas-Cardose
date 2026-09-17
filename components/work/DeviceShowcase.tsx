import Image from "next/image";

import type { PhoneShot } from "./PhoneShowcase";

type Props = {
  /** Wide (desktop-layout) screenshot, shown as a framed screen behind. */
  wide: PhoneShot;
  /** Portrait screenshot, shown in a drawn phone bezel in front. */
  phone: PhoneShot;
  label: string;
};

// Banner for responsive web apps: a desktop screen with a phone overlapping
// its lower-right corner. Sources here are plain browser screenshots, so the
// frames are drawn in CSS. Percentage widths keep the layout at every size.
export default function DeviceShowcase({ wide, phone, label }: Props) {
  return (
    <div
      aria-label={label}
      role="group"
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-black-200 px-5 pt-8 pb-8 sm:px-10 sm:pt-12 sm:pb-12">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(203,172,249,0.28),transparent_60%)]"
      />

      <div className="relative">
        {/* Desktop screen */}
        <div className="relative w-[82%] overflow-hidden rounded-xl bg-black-100 shadow-2xl ring-1 ring-white/15">
          <div aria-hidden className="flex h-5 items-center gap-1.5 bg-white/5 px-3 sm:h-6">
            <span className="size-1.5 rounded-full bg-white/25 sm:size-2" />
            <span className="size-1.5 rounded-full bg-white/25 sm:size-2" />
            <span className="size-1.5 rounded-full bg-white/25 sm:size-2" />
          </div>
          <div className="relative aspect-[4/3]">
            <Image
              src={wide.src}
              alt={wide.alt}
              fill
              sizes="(max-width: 768px) 82vw, 630px"
              priority
              className="object-cover object-top"
            />
          </div>
        </div>

        {/* Phone */}
        <div className="absolute right-0 bottom-0 w-[30%] translate-y-[10%] overflow-hidden rounded-[12%/6%] border-[3px] border-[#1c2136] bg-black shadow-2xl sm:border-[5px]">
          <div className="relative aspect-[9/19]">
            <Image
              src={phone.src}
              alt={phone.alt}
              fill
              sizes="(max-width: 768px) 30vw, 230px"
              className="object-cover object-top"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
