# Cortex Website — Design Decisions

## Understanding Summary
- **What**: Single-page dark-premium landing site for Cortex (AI solutions agency)
- **Why**: Primary sales funnel — convert visitors to clients
- **Who**: Businesses in Egypt/MENA and globally needing branding + digital services
- **Stack**: Next.js 14+ App Router, Tailwind v4, Framer Motion, TypeScript
- **Deploy**: Vercel from github.com/abameda/CORTEX

## Assumptions
- CTAs are `#` placeholders (Calendly/Cal.com wired post-launch)
- Testimonials are hardcoded placeholders
- No analytics/tracking in v1
- No backend/CMS
- Build plan's 7 prompts are reference, not rigid script

## Decision Log

| # | Decision | Alternatives Considered | Why |
|---|----------|------------------------|-----|
| 1 | Tailwind v4 (CSS-based config) | Tailwind v3 (matches plan's JS config syntax) | Modern approach, future-proof, plan's tokens adapt cleanly |
| 2 | Full Canvas particle network for Hero | CSS/SVG pattern, skip for v1 | User wants premium "living" feel — go all in |
| 3 | `?currency=EGP` query param override | USD-only in dev | Enables local testing of both pricing modes |
| 4 | CTA buttons as `#` placeholders | Contact form, Calendly link | Booking tool chosen post-deploy |
| 5 | Full parallel build (Approach B) | Sequential prompts, progressive enhancement | Faster, consistent design tokens, plan is detailed enough |
| 6 | Existing SVG assets used directly | Recreate logos in code | Assets already match brand guidelines |
| 7 | `next/font/google` for Inter + Space Grotesk | Google Fonts CDN link | Better performance, no layout shift |
