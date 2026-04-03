"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { PRICING_TIERS, getCurrency, type Currency } from "@/lib/pricing";

function getCookieValue(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const cookies = document.cookie.split("; ");
  const cookie = cookies.find((c) => c.startsWith(`${name}=`));
  return cookie ? cookie.split("=")[1] : undefined;
}

export function Pricing() {
  const searchParams = useSearchParams();
  const [currency, setCurrency] = useState<Currency>(() => {
    const country = getCookieValue("user-country") || "US";
    return getCurrency(country);
  });

  useEffect(() => {
    const override = searchParams.get("currency");
    if (override === "EGP" || override === "USD") {
      setCurrency(override);
    }
  }, [searchParams]);

  return (
    <section id="pricing" className="py-24 md:py-32 bg-cortex-base">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          overline="Pricing"
          heading="Transparent pricing. No surprises."
          subtext="Every package includes our AI-powered workflow. No hidden fees."
        />

        <div className="grid md:grid-cols-3 gap-6 items-start">
          {PRICING_TIERS.map((tier, i) => {
            const tierPricing = tier.pricing[currency];
            return (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
                className={`relative rounded-xl p-8 border transition-all duration-300 ${
                  tier.featured
                    ? "bg-cortex-surface border-cortex-accent md:scale-105 shadow-[0_0_40px_rgba(200,255,0,0.1)]"
                    : "bg-cortex-surface border-cortex-border"
                }`}
              >
                {tier.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cortex-accent text-black text-xs font-medium px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                )}

                <h3 className="text-white text-xl font-medium mb-2">
                  {tier.name}
                </h3>
                <p className="text-cortex-text-secondary text-sm mb-6">
                  {tier.description}
                </p>

                <div className="mb-8">
                  <span className="text-white text-4xl font-bold">
                    {tierPricing.label}
                  </span>
                  {tierPricing.period && (
                    <p className="text-cortex-text-secondary text-sm mt-1">
                      {tierPricing.period}
                    </p>
                  )}
                </div>

                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-sm text-cortex-text-secondary"
                    >
                      <Check
                        size={16}
                        className="text-cortex-accent mt-0.5 shrink-0"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  variant={tier.featured ? "primary" : "ghost"}
                  className="w-full"
                  href="https://cal.com/cortexai/discovery-call"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get Started
                </Button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
