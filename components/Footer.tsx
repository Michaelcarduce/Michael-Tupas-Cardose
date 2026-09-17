import Image from "next/image";
import { FaLocationArrow } from "react-icons/fa6";

import { socialMedia } from "@/data";
import { site } from "@/data/site";
import MagicButton from "./MagicButton";
import DownloadButton from "@/components/ui/DownloadButton";

const Footer = () => {
  return (
    <footer className="w-full pt-20 pb-10" id="contact">
      {/* background grid */}
      <div aria-hidden="true" className="pointer-events-none w-full absolute left-0 -bottom-72 min-h-96">
        <Image
          src="/footer-grid.svg"
          width={1260}
          height={863}
          alt=""
          className="w-full h-auto opacity-50"
        />
      </div>

      <div className="flex flex-col items-center">
        <h2 className="heading lg:max-w-[45vw]">
          Let&apos;s build <span className="text-purple">something</span>.
        </h2>
        <p className="text-white-200 md:mt-10 my-5 text-center">
          I&apos;m open to full-time and contract roles. Email me, or grab the
          resume.
        </p>
        <div className="flex flex-row items-center gap-4">
          <>
            <a href={`mailto:${site.email}`}>
              <MagicButton
                title="Let's get in touch"
                icon={<FaLocationArrow />}
                position="right"
              />
            </a>
          </>
          <>
            <DownloadButton />
          </>
        </div>
      </div>
      <div className="flex mt-16 md:flex-row flex-col justify-between items-center gap-4">
        <div className="text-center md:text-left">
          <p className="md:text-base text-sm md:font-normal font-light">
            © {new Date().getFullYear()} {site.name}
          </p>
          <p className="text-xs text-white-100 mt-1">
            Built with Next.js 16, Tailwind 4 and Motion · deployed on Vercel
            ·{" "}
            <a
              href={site.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-purple">
              source on GitHub
            </a>
          </p>
        </div>

        <div className="flex items-center md:gap-3 gap-6">
          {socialMedia.map((info) => (
            <a
              href={info.link}
              key={info.id}
              aria-label={info.name}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-blur-lg bg-black-200 rounded-lg border border-black-300">
              <Image
                src={info.img.src}
                width={info.img.width}
                height={info.img.height}
                alt=""
              />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
