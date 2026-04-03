"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "24/7", label: "Autonomous Operation" },
  { value: "5-14", label: "Day Delivery" },
  { value: "100%", label: "AI-Powered" },
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" as const },
  viewport: { once: true, margin: "-100px" },
};

export function About() {
  return (
    <section id="about" className="py-24 md:py-32 bg-cortex-surface">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <motion.p
              {...fadeUp}
              className="text-cortex-accent text-xs font-medium uppercase tracking-[0.15em] mb-4"
            >
              Who We Are
            </motion.p>
            <motion.h2
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.1 }}
              className="font-display text-3xl md:text-4xl font-medium tracking-[0.04em] text-white mb-6"
            >
              The agency that never sleeps.
            </motion.h2>
            <motion.p
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.2 }}
              className="text-cortex-text-secondary text-base md:text-lg leading-relaxed"
            >
              Cortex is Egypt&apos;s first autonomous AI solutions agency. Our
              entire workflow — from discovery call to brand delivery — is
              powered by artificial intelligence. No delays, no bottlenecks, no
              human limitations. Just exceptional brands, built faster than you
              thought possible.
            </motion.p>
          </div>

          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.3 }}
            className="flex justify-center"
          >
            <svg viewBox="0 0 300 300" className="w-64 h-64 md:w-80 md:h-80" fill="none">
              {[
                [150, 30], [60, 100], [240, 100],
                [100, 180], [200, 180], [150, 260],
              ].map(([cx, cy], i) => (
                <motion.circle
                  key={i}
                  cx={cx}
                  cy={cy}
                  r={i === 0 || i === 5 ? 8 : 6}
                  fill="#C8FF00"
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.4 }}
                  viewport={{ once: true }}
                />
              ))}
              {[
                [150, 30, 60, 100], [150, 30, 240, 100],
                [60, 100, 100, 180], [240, 100, 200, 180],
                [100, 180, 150, 260], [200, 180, 150, 260],
                [60, 100, 200, 180], [240, 100, 100, 180],
              ].map(([x1, y1, x2, y2], i) => (
                <motion.line
                  key={`l-${i}`}
                  x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke="#C8FF00"
                  strokeWidth={i < 6 ? 1.5 : 0.8}
                  opacity={i < 6 ? 0.3 : 0.15}
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  transition={{ delay: 0.3 + i * 0.08, duration: 0.6 }}
                  viewport={{ once: true }}
                />
              ))}
            </svg>
          </motion.div>
        </div>

        <div className="grid grid-cols-3 gap-6 mt-16">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              viewport={{ once: true, margin: "-50px" }}
              className="text-center"
            >
              <p className="text-cortex-accent font-display text-3xl md:text-4xl font-bold">
                {stat.value}
              </p>
              <p className="text-cortex-text-secondary text-sm mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
