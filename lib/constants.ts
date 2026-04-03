export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Pricing", href: "#pricing" },
] as const;

export const SERVICES = [
  {
    icon: "Diamond" as const,
    title: "Brand Identity",
    description:
      "Logo, color system, typography, brand guidelines, and a complete social media kit. Everything that makes your brand unmistakably yours.",
  },
  {
    icon: "Globe" as const,
    title: "Digital Presence",
    description:
      "Custom website, landing pages, e-commerce setup, and SEO foundation. Your brand's home on the internet, built to convert.",
  },
  {
    icon: "TrendingUp" as const,
    title: "Growth Engine",
    description:
      "Social media management, content creation, Meta and Google Ads, and monthly analytics. Ongoing growth, fully managed.",
  },
] as const;

export const PROCESS_STEPS = [
  {
    number: "01",
    title: "Book",
    description:
      "Schedule a free discovery call through our website. It takes 30 seconds.",
  },
  {
    number: "02",
    title: "Discover",
    description:
      "Our AI voice agent conducts the call, understanding your brand needs, audience, and vision in detail.",
  },
  {
    number: "03",
    title: "Build",
    description:
      "Our AI system generates tailored recommendations and builds your complete brand package.",
  },
  {
    number: "04",
    title: "Deliver",
    description:
      "Review, refine, and receive everything. Choose Scale for ongoing management.",
  },
] as const;

export const TESTIMONIALS = [
  {
    quote: "Cortex built our entire brand in 6 days. Six. Days.",
    name: "Ahmed K.",
    role: "Founder",
  },
  {
    quote:
      "The AI discovery call was surprisingly thorough. Better questions than most human agencies I've worked with.",
    name: "Sarah M.",
    role: "CEO",
  },
  {
    quote:
      "We went from zero to fully branded e-commerce in under two weeks. The future is here.",
    name: "Omar R.",
    role: "COO",
  },
] as const;
