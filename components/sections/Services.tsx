"use client";

import { motion } from "framer-motion";
import { Diamond, Globe, TrendingUp } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SERVICES } from "@/lib/constants";

const iconMap = {
  Diamond,
  Globe,
  TrendingUp,
} as const;

export function Services() {
  return (
    <section id="services" className="py-24 md:py-32 bg-cortex-base">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          overline="What We Build"
          heading="Everything your brand needs."
        />

        <div className="grid md:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => {
            const Icon = iconMap[service.icon];
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" as const }}
                viewport={{ once: true, margin: "-100px" }}
                className="bg-cortex-surface border border-cortex-border rounded-xl p-8 transition-all duration-300 hover:border-cortex-accent hover:shadow-[0_0_30px_rgba(200,255,0,0.08)]"
              >
                <Icon size={36} className="text-cortex-accent mb-6" />
                <h3 className="text-white font-medium text-lg md:text-xl mb-3">
                  {service.title}
                </h3>
                <p className="text-cortex-text-secondary text-sm leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
