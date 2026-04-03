"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PROCESS_STEPS } from "@/lib/constants";

export function Process() {
  return (
    <section id="process" className="py-24 md:py-32 bg-cortex-surface">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          overline="How It Works"
          heading="From call to complete brand in days."
        />

        {/* Desktop: horizontal timeline */}
        <div className="hidden md:block relative">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1, ease: "easeOut" as const }}
            viewport={{ once: true, margin: "-100px" }}
            className="absolute top-6 left-[12.5%] right-[12.5%] h-[2px] bg-cortex-accent/30 origin-left"
          />

          <div className="grid grid-cols-4 gap-8">
            {PROCESS_STEPS.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.15, duration: 0.5 }}
                viewport={{ once: true, margin: "-100px" }}
                className="text-center"
              >
                <div className="flex justify-center mb-6">
                  <div className="w-12 h-12 rounded-full border-2 border-cortex-accent flex items-center justify-center">
                    <span className="text-cortex-accent font-display text-sm font-medium">
                      {step.number}
                    </span>
                  </div>
                </div>
                <h3 className="text-white font-medium text-lg mb-2">{step.title}</h3>
                <p className="text-cortex-text-secondary text-sm max-w-[220px] mx-auto">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile: vertical timeline */}
        <div className="md:hidden relative pl-12">
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            transition={{ duration: 1, ease: "easeOut" as const }}
            viewport={{ once: true }}
            className="absolute left-5 top-0 bottom-0 w-[2px] bg-cortex-accent/30 origin-top"
          />

          <div className="space-y-12">
            {PROCESS_STEPS.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="absolute -left-12 top-0 w-10 h-10 rounded-full border-2 border-cortex-accent flex items-center justify-center bg-cortex-surface">
                  <span className="text-cortex-accent font-display text-xs font-medium">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-white font-medium text-lg mb-1">{step.title}</h3>
                <p className="text-cortex-text-secondary text-sm">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
