"use client";
import { useTypewriter, Cursor } from "react-simple-typewriter";

interface TypingEffectProps {
  className?: string;
}

const TypewriterEffect: React.FC<TypingEffectProps> = ({ className }) => {
  const [text] = useTypewriter({
    words: [
      "Front-End Developer",
      "Web Developer",
      "MERN Stack Developer",
      "Next.js Developer",
      "Vue.js Developer",
      "React.js Developer",
    ],
    loop: true,
    typeSpeed: 100,
    deleteSpeed: 50,
    delaySpeed: 2000,
  });

  return (
    <span className={className}>
      {text}
      <Cursor />
    </span>
  );
};

export default TypewriterEffect;
