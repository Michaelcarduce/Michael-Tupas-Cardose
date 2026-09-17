"use client";
import { useReducedMotion } from "motion/react";
import { useTypewriter, Cursor } from "react-simple-typewriter";

interface TypingEffectProps {
  className?: string;
}

const words = [
  "Software Engineer",
  "Full-Stack Developer",
  "Mobile App Developer",
  "Front-End Developer",
];
const longest = words.reduce((a, b) => (b.length > a.length ? b : a));

const TypewriterEffect: React.FC<TypingEffectProps> = ({ className }) => {
  const reduceMotion = useReducedMotion();
  const [text] = useTypewriter({
    words,
    loop: true,
    typeSpeed: 100,
    deleteSpeed: 50,
    delaySpeed: 2000,
  });

  // Reduce Motion: show the first role statically, no cursor blink.
  if (reduceMotion) {
    return <span className={className}>{words[0]}</span>;
  }

  // Reserve the width of the longest word (+ cursor) so the typing never
  // re-wraps or re-centres the sentence around it (layout shift).
  return (
    <span
      className={`relative inline-block whitespace-nowrap text-left ${className ?? ""}`}>
      <span aria-hidden="true" className="invisible">
        {longest}|
      </span>
      <span className="absolute inset-0">
        {text}
        <Cursor />
      </span>
    </span>
  );
};

export default TypewriterEffect;
