"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  overline: string;
  heading: string;
  subtext?: string;
}

export function SectionHeader({ overline, heading, subtext }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, margin: "-100px" }}
      className="text-center mb-16"
    >
      <p className="text-cortex-accent text-xs font-medium uppercase tracking-[0.15em] mb-4">
        {overline}
      </p>
      <h2 className="font-display text-3xl md:text-4xl font-medium tracking-[0.04em] text-white">
        {heading}
      </h2>
      {subtext && (
        <p className="text-cortex-text-secondary text-base md:text-lg mt-4 max-w-2xl mx-auto">
          {subtext}
        </p>
      )}
    </motion.div>
  );
}
