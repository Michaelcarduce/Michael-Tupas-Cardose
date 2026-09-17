"use client";

import Image from "next/image";
import Link from "next/link";
import { FaLocationArrow } from "react-icons/fa6";

import { projects } from "@/data";
import { PinContainer } from "./ui/Pin";

const RecentProjects = () => {
  const featured = projects.filter((p) => p.featured);

  return (
    <section id="projects" className="py-20">
      <h2 className="heading">
        Selected <span className="text-purple">work</span>
      </h2>
      <div className="flex flex-wrap items-center justify-center p-4 gap-16 mt-10">
        {featured.map((item) => {
          const href = item.caseStudy ?? item.link;
          const cta = item.caseStudy ? "Read case study" : "Check live site";

          return (
            <div
              className="h-136 lg:h-144 flex items-center justify-center sm:w-96 w-[80vw]"
              key={item.id}>
              <PinContainer title={item.title} href={href}>
                <div className="relative flex items-center justify-center sm:w-96 w-[80vw] overflow-hidden h-44 lg:h-60 mb-10">
                  <div
                    className="relative w-full h-full overflow-hidden lg:rounded-3xl"
                    style={{ backgroundColor: "#13162D" }}>
                    <Image
                      src="/bg.png"
                      alt=""
                      fill
                      sizes="(max-width: 640px) 80vw, 384px"
                      className="object-cover"
                    />
                  </div>
                  {item.img ? (
                    <Image
                      src={item.img.src}
                      fill
                      alt={`${item.title} screenshot`}
                      sizes="(max-width: 640px) 80vw, 384px"
                      className="z-10 object-cover object-top lg:rounded-3xl"
                    />
                  ) : (
                    // No public screenshot yet (private client work): typographic cover.
                    <div className="z-10 absolute inset-0 flex items-center justify-center">
                      <span className="text-3xl lg:text-4xl font-bold text-white/90 text-center px-6 drop-shadow-sm">
                        {item.title}
                      </span>
                    </div>
                  )}
                </div>

                <h3 className="font-bold lg:text-2xl md:text-xl text-base line-clamp-1">
                  {item.title}
                </h3>

                <p
                  className="lg:text-base font-light text-sm line-clamp-3"
                  style={{
                    color: "#BEC1DD",
                    margin: "1vh 0",
                  }}>
                  {item.des}
                </p>

                <div className="flex items-end justify-between gap-4 mt-5 mb-3">
                  <ul className="flex flex-wrap gap-1.5">
                    {item.stack.map((tech) => (
                      <li
                        key={tech}
                        className="border border-white/20 rounded-full bg-black px-2.5 py-1 text-[11px] lg:text-xs text-white-100">
                        {tech}
                      </li>
                    ))}
                  </ul>

                  <div className="flex justify-center items-center shrink-0">
                    <p className="flex lg:text-base md:text-xs text-sm text-purple whitespace-nowrap">
                      {cta}
                    </p>
                    <FaLocationArrow className="ms-3" color="#CBACF9" />
                  </div>
                </div>
              </PinContainer>
            </div>
          );
        })}
      </div>
      <p className="text-center mt-8">
        <Link href="/work" className="text-purple hover:underline">
          View all work →
        </Link>
      </p>
    </section>
  );
};

export default RecentProjects;
