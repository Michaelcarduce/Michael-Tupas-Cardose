import { FaLocationArrow } from "react-icons/fa6";
import MagicButton from "./MagicButton";
import { Spotlight } from "./ui/Spotlight";
import { TextGenerateEffect } from "./ui/TextGenerateEffect";
import TypewriterEffect from "./ui/TypewriterEffect";
import WavingHand from "./ui/WavingHand";
import Image from "next/image";
import HeroGradient from "./ui/HeroGradient";

const Hero = () => {
  return (
    <div className="pb-20 pt-36">
      <div>
        <Spotlight
          className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
          fill="white"
        />
        <Spotlight
          className="h-[80vh] w-[50vw] top-10 left-full"
          fill="purple"
        />
        <Spotlight className="left-80 top-28 h-[80vh] w-[50vw]" fill="blue" />
      </div>

      <div
        className="h-screen w-full dark:bg-black-100 bg-white bg-grid [--grid-color:rgb(0_3_25/0.2)] dark:[--grid-color:rgb(255_255_255/0.03)]
       absolute top-0 left-0 flex items-center justify-center">
        <div
          className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100
         bg-white mask-[radial-gradient(ellipse_at_center,transparent_20%,black)]"
        />
      </div>

      <div className="flex justify-between relative my-20 z-10 container mx-auto px-4">
        <div className="w-full lg:max-w-[50vw] flex flex-col items-center lg:items-start justify-center text-center lg:text-left">
          <p className="uppercase tracking-widest text-xs text-blue-100 max-w-90">
            Full-stack &amp; mobile developer · PHP · React · React Native ·
            Cloudflare Workers
          </p>

          <TextGenerateEffect
            words="I build fast, secure web and mobile apps end-to-end."
            className="text-center lg:text-left text-[40px] md:text-5xl lg:text-6xl lg:pb-5"
          />

          <p className="text-center lg:text-left md:tracking-wider  text-sm md:text-lg lg:text-2xl">
            <WavingHand /> Hi, I&apos;m Michael Tupas Cardose, a{" "}
            <TypewriterEffect className="text-blue-200" />
          </p>

          <a href="#projects">
            <MagicButton
              title="See my work"
              icon={<FaLocationArrow />}
              position="right"
            />
          </a>
        </div>

        <div className="hidden lg:flex items-center justify-center w-[40vw]">
          <div className="relative w-full h-[500px]">
            <HeroGradient />

            <Image
              src="/Portfolio Hero Image.webp"
              alt=""
              fill
              sizes="(max-width: 1023px) 1px, 40vw"
              className="object-contain rounded-lg"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
