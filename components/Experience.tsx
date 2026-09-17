import React from "react";
import Image from "next/image";

import { workExperience } from "@/data";
import { Button } from "./ui/MovingBorders";

const Experience = () => {
  return (
    <section id="experience" className="py-20 w-full">
      <h2 className="heading">
        My <span className="text-purple">work experience</span>
      </h2>

      {/* Button (MovingBorders) spans 2 columns itself, so 4 columns = 2 cards per row on lg */}
      <div className="w-full mt-12 grid lg:grid-cols-4 grid-cols-1 gap-10">
        {workExperience.map((card, i) => (
          <Button
            key={card.id}
            // stagger the border speed per card, deterministically (no
            // Math.random in render → no hydration mismatch)
            duration={10000 + ((i * 3700) % 10000)}
            borderRadius="1.75rem"
            style={{
              //   add these two
              //   you can generate the color from here https://cssgradient.io/
              background: "rgb(4,7,29)",
              backgroundColor:
                "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
              // add this border radius to make it more rounded so that the moving border is more realistic
              borderRadius: `calc(1.75rem* 0.96)`,
            }}
            // remove bg-white dark:bg-slate-900
            className="flex-1 text-black dark:text-white border-neutral-200 dark:border-slate-800">
            <div className="flex flex-col lg:flex-row lg:items-start p-3 py-6 md:p-5 lg:p-10 gap-2">
              <Image
                src={card.thumbnail.src}
                width={card.thumbnail.width}
                height={card.thumbnail.height}
                alt=""
                className="h-20 lg:h-32 w-auto shrink-0"
              />
              <div className="lg:ms-5 text-start">
                <p className="text-xs text-white-100 font-semibold">
                  {card.duration}
                </p>
                <h3 className="text-xl md:text-2xl font-bold mt-1">
                  {card.title}
                </h3>
                <p className="text-base font-semibold">
                  {card.link ? (
                    <a
                      href={card.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block py-1 text-purple hover:underline">
                      {card.company}
                    </a>
                  ) : (
                    card.company
                  )}
                </p>
                <p className="text-white-100 mt-3 font-normal">{card.desc}</p>
                <ul className="flex flex-wrap gap-1.5 mt-4">
                  {card.tech.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-full bg-[#10132E] px-2.5 py-1 text-[11px] lg:text-xs text-white-100">
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Button>
        ))}
      </div>
    </section>
  );
};

export default Experience;
