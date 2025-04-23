"use client";
import { motion } from "framer-motion";

export default function WavingHand() {
  return (
    <motion.span
      className="text-4xl"
      animate={{ rotate: [0, 20, 0, -20, 0] }}
      transition={{ duration: 1, repeat: Infinity, repeatType: "mirror" }}>
      👋
    </motion.span>
  );
}
