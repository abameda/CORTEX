"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

export function FinalCTA() {
  return (
    <section className="relative py-32 bg-cortex-base overflow-hidden">
      {/* Subtle radial glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full bg-cortex-accent/[0.03] blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="font-display text-4xl md:text-5xl font-medium tracking-[0.04em] text-white mb-6"
        >
          Ready to build your brand?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-cortex-text-secondary text-lg mb-10"
        >
          Book a free discovery call. Our AI agent will understand your vision
          and we&apos;ll start building.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
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
          <p className="text-cortex-text-muted text-xs mt-4">
            No commitment required
          </p>
        </motion.div>
      </div>
    </section>
  );
}
