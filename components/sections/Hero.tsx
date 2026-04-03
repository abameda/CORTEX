"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { amount: 0.3 });
  const [lampKey, setLampKey] = useState(0);
  const hasEnteredOnce = useRef(false);

  // Replay lamp animation every time the hero comes back into view
  useEffect(() => {
    if (inView) {
      if (!hasEnteredOnce.current) {
        hasEnteredOnce.current = true;
      } else {
        setLampKey((k) => k + 1);
      }
    }
  }, [inView]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-black flex flex-col items-center justify-center pt-16 w-full"
    >
      {/* ── Lamp — anchored to the very top of the section ── */}
      <div
        key={lampKey}
        className="absolute inset-x-0 top-16 h-[55vh] z-10 pointer-events-none"
      >
        {/* Left cone */}
        <motion.div
          initial={{ opacity: 0, width: "15rem" }}
          animate={{ opacity: 1, width: "30rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          style={{
            backgroundImage:
              "conic-gradient(from 70deg at center top, #C8FF00, transparent, transparent)",
            maskImage: "linear-gradient(to bottom, white 40%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to bottom, white 40%, transparent)",
          }}
          className="absolute top-0 right-1/2 h-56 overflow-visible w-[30rem]"
        />

        {/* Right cone */}
        <motion.div
          initial={{ opacity: 0, width: "15rem" }}
          animate={{ opacity: 1, width: "30rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          style={{
            backgroundImage:
              "conic-gradient(from 290deg at center top, transparent, transparent, #C8FF00)",
            maskImage: "linear-gradient(to bottom, white 40%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to bottom, white 40%, transparent)",
          }}
          className="absolute top-0 left-1/2 h-56 w-[30rem]"
        />

        {/* Wide ambient glow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="absolute top-0 left-1/2 -translate-x-1/2 z-20 h-36 w-[28rem] rounded-full bg-[#C8FF00] blur-3xl"
        />

        {/* Tight inner glow */}
        <motion.div
          initial={{ opacity: 0, width: "8rem" }}
          animate={{ opacity: 0.3, width: "16rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="absolute top-0 left-1/2 -translate-x-1/2 z-30 h-36 rounded-full bg-[#C8FF00] blur-2xl"
        />

        {/* Accent line — the lamp bar */}
        <motion.div
          initial={{ width: "15rem" }}
          animate={{ width: "30rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="absolute top-0 left-1/2 -translate-x-1/2 z-40 h-0.5 bg-[#C8FF00]"
        />
      </div>

      {/* ── Hero content ── */}
      <div className="relative z-50 flex flex-col items-center text-center px-6 max-w-4xl mx-auto">

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
          className="text-cortex-accent text-[11px] font-medium uppercase tracking-[0.2em] mb-6"
        >
          AI Solutions Agency
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}
          className="font-display font-bold text-white leading-[1.05] text-5xl sm:text-6xl md:text-7xl mb-6"
          style={{ letterSpacing: "0.05em" }}
        >
          Your brand,<br />engineered.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6, ease: "easeOut" }}
          className="text-cortex-text-secondary text-lg max-w-xl mx-auto mb-10"
        >
          Egypt&apos;s first autonomous AI agency. We design, build, and manage
          complete brand ecosystems — while you sleep.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <Button
            variant="primary"
            size="lg"
            href="https://cal.com/cortexai/discovery-call"
            target="_blank"
            rel="noopener noreferrer"
          >
            Book a Discovery Call
          </Button>
          <Button variant="ghost" size="lg" href="#services">
            See Our Work
          </Button>
        </motion.div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ChevronDown size={24} className="text-cortex-text-muted" />
        </motion.div>
      </motion.div>
    </section>
  );
}
