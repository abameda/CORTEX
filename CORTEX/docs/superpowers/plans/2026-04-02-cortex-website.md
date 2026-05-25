# Cortex Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a dark-premium, single-page landing website for Cortex (AI solutions agency) with 7 sections, geo-based pricing, Canvas particle animation, and Framer Motion scroll reveals.

**Architecture:** Next.js 14+ App Router with TypeScript. Single `page.tsx` imports all section components. Middleware sets geo-cookie, pricing component reads it + supports `?currency=` query param override. Tailwind v4 CSS-based design tokens. Canvas particle network renders in Hero background. All sections use Framer Motion `whileInView` for scroll-triggered reveals.

**Tech Stack:** Next.js 16 (latest), TypeScript, Tailwind CSS v4, Framer Motion, Lucide React, next/font/google (Inter + Space Grotesk), Vercel deployment

**Working directory:** `/Users/elshorbagy/cortex-build/cortex-website`
**Repo:** `https://github.com/abameda/CORTEX.git` (cloned to `/Users/elshorbagy/cortex-build`)

---

## Progress

| Task | Status | Commit | Notes |
|------|--------|--------|-------|
| 1. Project Scaffold + Git Setup | DONE | `88dcda0`, `e7d7ef2` | Next.js 16 installed (latest). Font variable fix applied. |
| 2. Shared UI + Constants + Middleware | DONE | `526a666`, `4ec9910` | Button, SectionHeader, NeuralMark, constants, pricing, middleware. Added missing "use client" to NeuralMark. |
| 3. Navbar | DONE | `d0b9d03` | Sticky nav, scroll detection, mobile hamburger overlay. |
| 4. Particle Network + Hero | DONE | `adc1748` | Canvas particle network + staggered hero reveal. |
| 5. About Section | DONE | `1444bd6` | Animated neural SVG + stats row. |
| 6. Services Section | DONE | `1444bd6` | 3 service cards with hover glow. |
| 7. Process Section | DONE | `1444bd6` | Horizontal/vertical timeline with line draw animation. |
| 8. Pricing Section | PENDING | — | Geo-priced tiers with `?currency=` override |
| 9. Testimonials + CTA + Footer | PENDING | — | 3 testimonial cards, final CTA, minimal footer |
| 10. Polish + Responsive + Performance | PENDING | — | Semantic HTML, breakpoints, build test |
| 11. Build + Push + Deploy | PENDING | — | Production build, push to GitHub, Vercel |

---

## File Structure

```
cortex-website/
├── app/
│   ├── layout.tsx              # Root layout: fonts, metadata, OG tags, Organization schema
│   ├── page.tsx                # Main page: imports Navbar + all 7 sections
│   └── globals.css             # Tailwind v4 @theme tokens + base styles
├── components/
│   ├── layout/
│   │   └── Navbar.tsx          # Sticky nav, scroll detection, mobile menu
│   ├── sections/
│   │   ├── Hero.tsx            # Hero with staggered reveal
│   │   ├── ParticleNetwork.tsx # Canvas animated particle network (Hero bg)
│   │   ├── About.tsx           # Who we are + stats + animated SVG
│   │   ├── Services.tsx        # 3 service cards
│   │   ├── Process.tsx         # 4-step timeline (horizontal desktop, vertical mobile)
│   │   ├── Pricing.tsx         # 3 geo-priced tier cards
│   │   ├── Testimonials.tsx    # 3 placeholder testimonial cards
│   │   ├── FinalCTA.tsx        # Final conversion block
│   │   └── Footer.tsx          # Minimal footer
│   └── ui/
│       ├── Button.tsx          # Primary + Ghost button variants
│       ├── SectionHeader.tsx   # Reusable overline + heading
│       └── NeuralMark.tsx      # Logo SVG component (icon + wordmark variants)
├── lib/
│   ├── pricing.ts              # USD + EGP pricing data + getCurrency helper
│   └── constants.ts            # Nav links, site metadata, section content
├── middleware.ts               # Geo-detection: x-vercel-ip-country → cookie
├── public/
│   ├── cortex-icon.svg         # Neural Mark icon (copied from project root)
│   └── cortex-logo-primary.svg # Full logo (copied from project root)
├── tailwind.config.ts          # Minimal — just content paths (v4 tokens in CSS)
├── next.config.ts
├── package.json
└── tsconfig.json
```

---

## Task 1: Project Scaffold + Git Setup (COMPLETED)

**Files:**
- Create: `cortex-website/` (via create-next-app)
- Create: `cortex-website/app/globals.css` (Tailwind v4 theme)
- Create: `cortex-website/app/layout.tsx` (fonts + metadata)
- Modify: `cortex-website/app/page.tsx` (placeholder)
- Create: `cortex-website/public/cortex-icon.svg`
- Create: `cortex-website/public/cortex-logo-primary.svg`

- [ ] **Step 1: Clone the GitHub repo and create Next.js project inside it**

```bash
cd /Users/elshorbagy
git clone https://github.com/abameda/CORTEX.git cortex-build
cd cortex-build
npx create-next-app@latest cortex-website --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*" --use-npm
```

When prompted for Tailwind version or other options, accept defaults. We'll reconfigure Tailwind v4 manually.

- [ ] **Step 2: Install dependencies**

```bash
cd /Users/elshorbagy/cortex-build/cortex-website
npm install framer-motion lucide-react
```

- [ ] **Step 3: Verify Tailwind v4 is installed (create-next-app with latest should use v4). If not, upgrade:**

```bash
cd /Users/elshorbagy/cortex-build/cortex-website
npx @tailwindcss/upgrade@latest
```

Check `package.json` — you should see `"tailwindcss": "^4.x"` and `"@tailwindcss/postcss": "^4.x"`.

- [ ] **Step 4: Write `app/globals.css` with Tailwind v4 theme**

```css
@import "tailwindcss";

@theme {
  /* Background tones */
  --color-cortex-base: #000000;
  --color-cortex-surface: #0A0A0A;
  --color-cortex-elevated: #141414;
  --color-cortex-border: #1A1A1A;

  /* Accent system */
  --color-cortex-accent-deep: #7A9900;
  --color-cortex-accent: #C8FF00;
  --color-cortex-accent-light: #E8FF80;

  /* Text hierarchy */
  --color-cortex-text-primary: #FFFFFF;
  --color-cortex-text-secondary: #888888;
  --color-cortex-text-muted: #555555;
  --color-cortex-text-subtle: #333333;

  /* Fonts */
  --font-display: "Space Grotesk", sans-serif;
  --font-body: "Inter", sans-serif;
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: #000000;
  color: #FFFFFF;
  font-family: var(--font-body);
}
```

- [ ] **Step 5: Write `app/layout.tsx` with fonts, metadata, and Organization schema**

```tsx
import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cortex | AI Solutions Agency",
  description:
    "Egypt's first autonomous AI agency. We design, build, and manage complete brand ecosystems.",
  openGraph: {
    title: "Cortex | AI Solutions Agency",
    description:
      "Egypt's first autonomous AI agency. We design, build, and manage complete brand ecosystems.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Cortex",
              description:
                "Egypt's first autonomous AI agency. We design, build, and manage complete brand ecosystems.",
              url: "https://cortex-pi-sable.vercel.app/",
            }),
          }}
        />
      </head>
      <body className="bg-cortex-base text-cortex-text-primary font-body antialiased">
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 6: Write minimal `app/page.tsx` placeholder**

```tsx
export default function Home() {
  return (
    <main>
      <h1 className="text-cortex-accent text-4xl font-display text-center py-20">
        Cortex — Coming Soon
      </h1>
    </main>
  );
}
```

- [ ] **Step 7: Copy SVG assets to public/**

```bash
cp /Users/elshorbagy/CORTEX/cortex-icon.svg /Users/elshorbagy/cortex-build/cortex-website/public/
cp /Users/elshorbagy/CORTEX/cortex-logo-primary.svg /Users/elshorbagy/cortex-build/cortex-website/public/
```

- [ ] **Step 8: Verify the dev server starts and tokens work**

```bash
cd /Users/elshorbagy/cortex-build/cortex-website
npm run dev
```

Open `http://localhost:3000` — you should see "Cortex — Coming Soon" in chartreuse on a black background. If the color doesn't render, Tailwind v4 theme tokens need debugging (check that `@import "tailwindcss"` is present and PostCSS is configured).

- [ ] **Step 9: Commit scaffold**

```bash
cd /Users/elshorbagy/cortex-build
git add cortex-website/
git commit -m "feat: scaffold Next.js 14 project with Tailwind v4 design tokens"
```

---

## Task 2: Shared UI Components + Constants + Middleware (COMPLETED)

**Files:**
- Create: `cortex-website/components/ui/Button.tsx`
- Create: `cortex-website/components/ui/SectionHeader.tsx`
- Create: `cortex-website/components/ui/NeuralMark.tsx`
- Create: `cortex-website/lib/constants.ts`
- Create: `cortex-website/lib/pricing.ts`
- Create: `cortex-website/middleware.ts`

- [ ] **Step 1: Write `components/ui/Button.tsx`**

```tsx
"use client";

import { motion } from "framer-motion";

type ButtonVariant = "primary" | "ghost";

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: "sm" | "md" | "lg";
  href?: string;
  className?: string;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  href = "#",
  className = "",
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 cursor-pointer";

  const variants: Record<ButtonVariant, string> = {
    primary:
      "bg-cortex-accent text-black hover:shadow-[0_0_20px_rgba(200,255,0,0.3)]",
    ghost:
      "border border-cortex-text-subtle text-white hover:border-cortex-accent hover:text-cortex-accent",
  };

  const sizes: Record<string, string> = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <motion.a
      href={href}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </motion.a>
  );
}
```

- [ ] **Step 2: Write `components/ui/SectionHeader.tsx`**

```tsx
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
```

- [ ] **Step 3: Write `components/ui/NeuralMark.tsx`**

```tsx
interface NeuralMarkProps {
  variant?: "full" | "icon";
  className?: string;
  size?: number;
}

export function NeuralMark({ variant = "full", className = "", size = 40 }: NeuralMarkProps) {
  if (variant === "icon") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        fill="none"
        width={size}
        height={size}
        className={className}
      >
        <circle cx="50" cy="14" r="5.5" fill="#C8FF00" />
        <circle cx="24" cy="38" r="4.5" fill="#C8FF00" />
        <circle cx="76" cy="38" r="4.5" fill="#C8FF00" />
        <circle cx="30" cy="68" r="4" fill="#C8FF00" />
        <circle cx="70" cy="68" r="4" fill="#C8FF00" />
        <circle cx="50" cy="88" r="5" fill="#C8FF00" />
        <line x1="50" y1="19" x2="27" y2="35" stroke="#C8FF00" strokeWidth="1.5" opacity="0.5" />
        <line x1="50" y1="19" x2="73" y2="35" stroke="#C8FF00" strokeWidth="1.5" opacity="0.5" />
        <line x1="27" y1="41" x2="33" y2="65" stroke="#C8FF00" strokeWidth="1.2" opacity="0.4" />
        <line x1="73" y1="41" x2="67" y2="65" stroke="#C8FF00" strokeWidth="1.2" opacity="0.4" />
        <line x1="33" y1="70" x2="50" y2="84" stroke="#C8FF00" strokeWidth="1.2" opacity="0.45" />
        <line x1="67" y1="70" x2="50" y2="84" stroke="#C8FF00" strokeWidth="1.2" opacity="0.45" />
        <line x1="27" y1="41" x2="67" y2="65" stroke="#C8FF00" strokeWidth="0.8" opacity="0.2" />
        <line x1="73" y1="41" x2="33" y2="65" stroke="#C8FF00" strokeWidth="0.8" opacity="0.2" />
        <line x1="50" y1="19" x2="50" y2="84" stroke="#C8FF00" strokeWidth="0.6" opacity="0.12" />
      </svg>
    );
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <NeuralMark variant="icon" size={size} />
      <span
        className="font-display font-bold tracking-[0.15em] text-white"
        style={{ fontSize: size * 0.5 }}
      >
        CORTEX
      </span>
    </div>
  );
}
```

- [ ] **Step 4: Write `lib/constants.ts`**

```ts
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
```

- [ ] **Step 5: Write `lib/pricing.ts`**

```ts
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
```

- [ ] **Step 6: Write `middleware.ts` with geo-detection**

```ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const country = request.headers.get("x-vercel-ip-country") || "US";
  const response = NextResponse.next();
  response.cookies.set("user-country", country, {
    path: "/",
    sameSite: "lax",
  });
  return response;
}

export const config = {
  matcher: ["/"],
};
```

- [ ] **Step 7: Verify dev server still starts cleanly**

```bash
cd /Users/elshorbagy/cortex-build/cortex-website
npm run dev
```

No errors in terminal. Kill the server.

- [ ] **Step 8: Commit shared components**

```bash
cd /Users/elshorbagy/cortex-build
git add cortex-website/
git commit -m "feat: add shared UI components, constants, pricing data, and geo middleware"
```

---

## Task 3: Navbar (COMPLETED)

**Files:**
- Create: `cortex-website/components/layout/Navbar.tsx`
- Modify: `cortex-website/app/page.tsx`

- [ ] **Step 1: Write `components/layout/Navbar.tsx`**

```tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NeuralMark } from "@/components/ui/NeuralMark";
import { Button } from "@/components/ui/Button";
import { NAV_LINKS } from "@/lib/constants";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/80 backdrop-blur-lg border-b border-cortex-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="relative z-50">
          <NeuralMark variant="full" size={32} />
        </a>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-cortex-text-secondary hover:text-white transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Button variant="primary" size="sm">
            Book a Call
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden relative z-50 text-white"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 bg-black z-40 flex flex-col items-center justify-center gap-8"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-2xl text-white font-display tracking-wide hover:text-cortex-accent transition-colors"
              >
                {link.label}
              </a>
            ))}
            <Button variant="primary" size="lg" href="#">
              Book a Call
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
```

- [ ] **Step 2: Update `app/page.tsx` to import Navbar**

```tsx
import { Navbar } from "@/components/layout/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <section className="min-h-screen flex items-center justify-center">
          <h1 className="text-cortex-accent text-4xl font-display">
            Cortex — Building...
          </h1>
        </section>
      </main>
    </>
  );
}
```

- [ ] **Step 3: Verify navbar renders, scroll detection works, mobile menu opens/closes**

```bash
npm run dev
```

Check at `http://localhost:3000`. Scroll down — nav should get dark blur background. Click hamburger on mobile width — overlay should slide in.

- [ ] **Step 4: Commit**

```bash
git add cortex-website/
git commit -m "feat: add sticky Navbar with scroll detection and mobile menu"
```

---

## Task 4: Particle Network + Hero Section (COMPLETED)

**Files:**
- Create: `cortex-website/components/sections/ParticleNetwork.tsx`
- Create: `cortex-website/components/sections/Hero.tsx`
- Modify: `cortex-website/app/page.tsx`

- [ ] **Step 1: Write `components/sections/ParticleNetwork.tsx`**

This is a Canvas-based animated particle network. Nodes float slowly, lines connect nearby nodes. Chartreuse color at very low opacity.

```tsx
"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

export function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const PARTICLE_COUNT = Math.floor((width * height) / 15000);
    const CONNECTION_DISTANCE = 150;
    const PARTICLE_COLOR = "200, 255, 0"; // chartreuse RGB

    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      radius: Math.random() * 1.5 + 0.5,
    }));

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${PARTICLE_COLOR}, 0.08)`;
        ctx.fill();
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_DISTANCE) {
            const opacity = (1 - dist / CONNECTION_DISTANCE) * 0.06;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(${PARTICLE_COLOR}, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ willChange: "transform" }}
    />
  );
}
```

- [ ] **Step 2: Write `components/sections/Hero.tsx`**

```tsx
"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ParticleNetwork } from "./ParticleNetwork";

const stagger = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
  }),
};

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ParticleNetwork />
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.p
          custom={0}
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="text-cortex-text-secondary text-xs font-medium uppercase tracking-[0.15em] mb-6"
        >
          AI Solutions Agency
        </motion.p>

        <motion.h1
          custom={1}
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="font-display text-5xl md:text-7xl font-bold tracking-[0.06em] text-white mb-6"
        >
          Your brand, engineered.
        </motion.h1>

        <motion.p
          custom={2}
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="text-cortex-text-secondary text-lg md:text-xl max-w-2xl mx-auto mb-10"
        >
          Egypt&apos;s first autonomous AI agency. We design, build, and manage
          complete brand ecosystems — while you sleep.
        </motion.p>

        <motion.div
          custom={3}
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button variant="primary" size="lg">
            Book a Discovery Call
          </Button>
          <Button variant="ghost" size="lg">
            See Our Work
          </Button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
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
```

- [ ] **Step 3: Update `app/page.tsx`**

```tsx
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
      </main>
    </>
  );
}
```

- [ ] **Step 4: Verify Hero renders with particle animation, staggered text, both buttons**

```bash
npm run dev
```

Check: particles float and connect, text staggers in, scroll chevron bounces, buttons have correct styles.

- [ ] **Step 5: Commit**

```bash
git add cortex-website/
git commit -m "feat: add Hero section with Canvas particle network animation"
```

---

## Task 5: About Section (COMPLETED)

**Files:**
- Create: `cortex-website/components/sections/About.tsx`
- Modify: `cortex-website/app/page.tsx`

- [ ] **Step 1: Write `components/sections/About.tsx`**

```tsx
"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";

const stats = [
  { value: "24/7", label: "Autonomous Operation" },
  { value: "5-14", label: "Day Delivery" },
  { value: "100%", label: "AI-Powered" },
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
  viewport: { once: true, margin: "-100px" },
};

export function About() {
  return (
    <section id="about" className="py-24 md:py-32 bg-cortex-surface">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Text content */}
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

          {/* Animated neural network illustration */}
          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.3 }}
            className="flex justify-center"
          >
            <svg
              viewBox="0 0 300 300"
              className="w-64 h-64 md:w-80 md:h-80"
              fill="none"
            >
              {/* Nodes */}
              {[
                [150, 30],
                [60, 100],
                [240, 100],
                [100, 180],
                [200, 180],
                [150, 260],
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
              {/* Connections */}
              {[
                [150, 30, 60, 100],
                [150, 30, 240, 100],
                [60, 100, 100, 180],
                [240, 100, 200, 180],
                [100, 180, 150, 260],
                [200, 180, 150, 260],
                [60, 100, 200, 180],
                [240, 100, 100, 180],
              ].map(([x1, y1, x2, y2], i) => (
                <motion.line
                  key={`l-${i}`}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
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

        {/* Stats row */}
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
              <p className="text-cortex-text-secondary text-sm mt-2">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add About to `app/page.tsx`**

```tsx
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
      </main>
    </>
  );
}
```

- [ ] **Step 3: Verify About section renders — text, animated SVG, stats**

```bash
npm run dev
```

- [ ] **Step 4: Commit**

```bash
git add cortex-website/
git commit -m "feat: add About section with animated neural SVG and stats"
```

---

## Task 6: Services Section (COMPLETED)

**Files:**
- Create: `cortex-website/components/sections/Services.tsx`
- Modify: `cortex-website/app/page.tsx`

- [ ] **Step 1: Write `components/sections/Services.tsx`**

```tsx
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
                transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" }}
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
```

- [ ] **Step 2: Add Services to `app/page.tsx`**

Add `import { Services } from "@/components/sections/Services";` and `<Services />` after `<About />`.

- [ ] **Step 3: Verify cards render, hover glow works, stagger animation**

- [ ] **Step 4: Commit**

```bash
git add cortex-website/
git commit -m "feat: add Services section with hover-glow cards"
```

---

## Task 7: Process Section (COMPLETED)

**Files:**
- Create: `cortex-website/components/sections/Process.tsx`
- Modify: `cortex-website/app/page.tsx`

- [ ] **Step 1: Write `components/sections/Process.tsx`**

```tsx
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
          {/* Connecting line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
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
                {/* Node */}
                <div className="flex justify-center mb-6">
                  <div className="w-12 h-12 rounded-full border-2 border-cortex-accent flex items-center justify-center">
                    <span className="text-cortex-accent font-display text-sm font-medium">
                      {step.number}
                    </span>
                  </div>
                </div>
                <h3 className="text-white font-medium text-lg mb-2">
                  {step.title}
                </h3>
                <p className="text-cortex-text-secondary text-sm max-w-[220px] mx-auto">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile: vertical timeline */}
        <div className="md:hidden relative pl-12">
          {/* Vertical line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
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
                {/* Node */}
                <div className="absolute -left-12 top-0 w-10 h-10 rounded-full border-2 border-cortex-accent flex items-center justify-center bg-cortex-surface">
                  <span className="text-cortex-accent font-display text-xs font-medium">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-white font-medium text-lg mb-1">
                  {step.title}
                </h3>
                <p className="text-cortex-text-secondary text-sm">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add Process to `app/page.tsx`**

Add `import { Process } from "@/components/sections/Process";` and `<Process />` after `<Services />`.

- [ ] **Step 3: Verify horizontal timeline on desktop, vertical on mobile, line draws on scroll**

- [ ] **Step 4: Commit**

```bash
git add cortex-website/
git commit -m "feat: add Process timeline section with scroll-driven line animation"
```

---

## Task 8: Pricing Section

**Files:**
- Create: `cortex-website/components/sections/Pricing.tsx`
- Modify: `cortex-website/app/page.tsx`

- [ ] **Step 1: Write `components/sections/Pricing.tsx`**

```tsx
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
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? match[2] : undefined;
}

export function Pricing() {
  const searchParams = useSearchParams();
  const [currency, setCurrency] = useState<Currency>("USD");

  useEffect(() => {
    const override = searchParams.get("currency");
    if (override === "EGP" || override === "USD") {
      setCurrency(override);
    } else {
      const country = getCookieValue("user-country") || "US";
      setCurrency(getCurrency(country));
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
                    ? "bg-cortex-surface border-cortex-accent scale-105 shadow-[0_0_40px_rgba(200,255,0,0.1)]"
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
```

- [ ] **Step 2: Add Pricing to `app/page.tsx`**

Add `import { Pricing } from "@/components/sections/Pricing";` and `<Pricing />` after `<Process />`.

**Important:** Because `Pricing` uses `useSearchParams()`, it needs to be wrapped in a `<Suspense>` boundary in the page:

```tsx
import { Suspense } from "react";
// ... other imports

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Process />
        <Suspense fallback={null}>
          <Pricing />
        </Suspense>
      </main>
    </>
  );
}
```

- [ ] **Step 3: Verify pricing renders with USD. Test `http://localhost:3000?currency=EGP` shows EGP prices.**

- [ ] **Step 4: Commit**

```bash
git add cortex-website/
git commit -m "feat: add Pricing section with geo-based currency and query param override"
```

---

## Task 9: Testimonials + Final CTA + Footer

**Files:**
- Create: `cortex-website/components/sections/Testimonials.tsx`
- Create: `cortex-website/components/sections/FinalCTA.tsx`
- Create: `cortex-website/components/sections/Footer.tsx`
- Modify: `cortex-website/app/page.tsx`

- [ ] **Step 1: Write `components/sections/Testimonials.tsx`**

```tsx
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
```

- [ ] **Step 2: Write `components/sections/FinalCTA.tsx`**

```tsx
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
          transition={{ delay: 0.1, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-cortex-text-secondary text-lg mb-10"
        >
          Book a free discovery call. Our AI agent will understand your vision
          and we&apos;ll start building.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Button variant="primary" size="lg">
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
```

- [ ] **Step 3: Write `components/sections/Footer.tsx`**

```tsx
import { NeuralMark } from "@/components/ui/NeuralMark";
import { NAV_LINKS } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-cortex-surface border-t border-cortex-border py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <NeuralMark variant="full" size={28} />

          {/* Nav links */}
          <div className="flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-cortex-text-secondary hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-4">
            {["X", "LinkedIn", "Instagram"].map((platform) => (
              <a
                key={platform}
                href="#"
                aria-label={platform}
                className="text-cortex-text-secondary hover:text-cortex-accent transition-colors text-sm"
              >
                {platform}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-cortex-border text-center">
          <p className="text-cortex-text-muted text-xs">
            &copy; 2026 Cortex. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 4: Update `app/page.tsx` with all remaining sections**

```tsx
import { Suspense } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { Pricing } from "@/components/sections/Pricing";
import { Testimonials } from "@/components/sections/Testimonials";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Process />
        <Suspense fallback={null}>
          <Pricing />
        </Suspense>
        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 5: Verify all three sections render correctly. Full page scroll through all 7 sections should work.**

- [ ] **Step 6: Commit**

```bash
git add cortex-website/
git commit -m "feat: add Testimonials, Final CTA, and Footer sections"
```

---

## Task 10: Polish, Responsive, and Performance

**Files:**
- Modify: `cortex-website/app/globals.css` (fine-tune)
- Modify: various section components (responsive fixes)
- Modify: `cortex-website/app/layout.tsx` (semantic HTML check)

- [ ] **Step 1: Add semantic HTML audit**

Ensure `app/page.tsx` uses `<main>`, each section component uses `<section>` with proper IDs, and heading hierarchy is correct:
- `<h1>` only in Hero
- `<h2>` for section headings
- `<h3>` for card titles

The code above already follows this. Verify by reading through each component.

- [ ] **Step 2: Add aria labels to interactive elements**

Verify the Navbar has `aria-label` on the hamburger button (already added). Add `aria-label` to any unlabelled interactive elements.

- [ ] **Step 3: Test responsive breakpoints**

```bash
npm run dev
```

Check each section at these widths in browser DevTools:
- **320px** (small mobile): all text readable, no horizontal overflow, cards stack, timeline vertical
- **768px** (tablet): grid transitions happening correctly
- **1024px** (desktop): all grids at full columns, timeline horizontal
- **1440px** (wide): max-w-7xl centered, no stretching

Fix any responsive issues found. Common things to check:
- Pricing `scale-105` on Build card should not cause overflow on mobile — consider removing scale on mobile: `md:scale-105`
- Hero text should be `text-3xl` on mobile, not `text-5xl`
- Process horizontal timeline should have proper spacing at 1024px

- [ ] **Step 4: Performance check**

Run production build:
```bash
cd /Users/elshorbagy/cortex-build/cortex-website
npm run build
```

Fix any TypeScript or build errors. Check that:
- No unused imports warnings
- Bundle size is reasonable
- No hydration mismatches

- [ ] **Step 5: Fine-tune `globals.css` if needed**

Add any needed custom utilities or overrides discovered during testing. Example — ensuring the particle canvas doesn't capture pointer events:

```css
canvas {
  pointer-events: none;
}
```

- [ ] **Step 6: Final visual sweep**

Run `npm run dev` and scroll through the entire site. Verify:
- Consistent spacing: all sections use `py-24 md:py-32`
- Chartreuse used sparingly: only CTAs, accents, icons, overlines
- Text hierarchy: white for primary, #888 for secondary, #555 for muted
- All hover states are smooth (transition-all duration-300)
- All scroll animations fire once and look clean
- Mobile menu opens/closes properly, body scroll locks
- Pricing switches between USD/EGP with `?currency=EGP`

- [ ] **Step 7: Commit polish**

```bash
git add cortex-website/
git commit -m "fix: responsive polish, performance tuning, and accessibility improvements"
```

---

## Task 11: Build, Push, and Deploy Readiness

**Files:**
- None new — this is verification and deployment

- [ ] **Step 1: Run final production build**

```bash
cd /Users/elshorbagy/cortex-build/cortex-website
npm run build
```

Must complete with zero errors.

- [ ] **Step 2: Test production build locally**

```bash
npm start
```

Open `http://localhost:3000` — full site should work exactly as in dev mode.

- [ ] **Step 3: Push to GitHub**

```bash
cd /Users/elshorbagy/cortex-build
git push origin main
```

- [ ] **Step 4: Verify on GitHub**

Confirm all files are visible at `https://github.com/abameda/CORTEX`.

- [ ] **Step 5: Connect to Vercel**

Either:
- Go to vercel.com/new and import the `abameda/CORTEX` repo
- Or use Vercel CLI: `npx vercel --prod` from within `cortex-website/`

Set the root directory to `cortex-website/` in Vercel project settings.

No environment variables needed — geo-detection uses Vercel headers automatically.

- [ ] **Step 6: Post-deploy verification**

On the live Vercel URL:
- All 7 sections render
- Particle animation works
- Smooth scroll nav works
- Mobile menu works
- Geo-pricing defaults to USD
- Test EGP by adding `?currency=EGP` to the URL
