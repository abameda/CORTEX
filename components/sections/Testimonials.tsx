"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TESTIMONIALS } from "@/lib/constants";

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 md:py-32 bg-cortex-surface">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          overline="What Clients Say"
          heading="Don't take our word for it."
        />

        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-cortex-elevated border border-cortex-border rounded-xl p-8"
            >
              <Quote
                size={32}
                className="text-cortex-accent opacity-30 mb-4"
              />
              <p className="text-white text-base italic leading-relaxed mb-6">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div>
                <p className="text-white text-sm font-bold">{t.name}</p>
                <p className="text-cortex-text-secondary text-sm">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
