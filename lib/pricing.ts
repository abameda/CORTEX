export interface TierPricing {
  price: number;
  label: string;
  period: string | null;
}

export interface PricingTier {
  name: string;
  description: string;
  delivery: string;
  featured: boolean;
  features: string[];
  pricing: { USD: TierPricing; EGP: TierPricing };
}

export const PRICING_TIERS: PricingTier[] = [
  {
    name: "Launch",
    description: "For businesses that need a brand identity, fast.",
    delivery: "5-7 days",
    featured: false,
    features: [
      "Logo and brand identity",
      "Color system and typography",
      "Brand guidelines PDF",
      "Social media kit",
      "5-7 day delivery",
    ],
    pricing: {
      USD: { price: 397, label: "$397", period: null },
      EGP: { price: 9999, label: "EGP 9,999", period: null },
    },
  },
  {
    name: "Build",
    description: "Full brand identity plus digital presence.",
    delivery: "10-14 days",
    featured: true,
    features: [
      "Everything in Launch",
      "Custom website (up to 5 pages)",
      "E-commerce setup",
      "SEO foundation",
      "1 month social media management",
      "10-14 day delivery",
    ],
    pricing: {
      USD: { price: 1197, label: "$1,197", period: null },
      EGP: { price: 14999, label: "EGP 14,999", period: null },
    },
  },
  {
    name: "Scale",
    description: "Complete setup plus ongoing growth management.",
    delivery: "Ongoing",
    featured: false,
    features: [
      "Everything in Build",
      "Ongoing social media management",
      "Content creation",
      "Meta + Google Ads",
      "Monthly analytics reports",
      "Dedicated AI brand manager",
      "Priority support",
    ],
    pricing: {
      USD: { price: 1597, label: "$1,597", period: "+ $397/mo" },
      EGP: { price: 19999, label: "EGP 19,999", period: "+ EGP 5,000/mo" },
    },
  },
];

export type Currency = "USD" | "EGP";

export function getCurrency(country: string): Currency {
  return country === "EG" ? "EGP" : "USD";
}
