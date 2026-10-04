# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack
Next.js 16 (App Router), React 19, Tailwind CSS v4, TypeScript, Supabase PostgreSQL.

## Users
Business owners, marketing managers, agency founders, and e-commerce brands in Egypt and the MENA region requiring custom commercial printing, premium product packaging, merchandise, and point-of-sale branding.

## Product Purpose
Etbaaly (إطبعلي) is the dedicated printing and packaging arm of A.Z Agency, offering end-to-end offset and digital printing, packaging manufacturing, live 3D/2D configurators, custom sample boxes, and real-time order tracking.

## Positioning
Premium B2B & direct-to-brand print manufacturing combining instant digital quotation/configuration with agency-grade craft and offset precision.

## Operating Context
RTL-first Arabic digital storefront with seamless English fallback support, full light/dark theme adaptation, mobile-optimized ordering flows, and WhatsApp/self-serve conversion funnels.

## Capabilities and Constraints
- RTL-native responsive layouts with Lateef Arabic typography.
- Interactive product configurators and custom quote calculators.
- Real-time order shipment tracking (`/track`).
- Dark mode (#1d1d1d) and Light mode (#f8f9fa) persistence.
- Zero-CLS skeleton loaders (`loading.tsx` / `Suspense`) across all dynamic routes.
- Full Admin & Client dashboard for catalog, quotes, leads, and orders.

## Brand Commitments
- Parent Brand: A.Z Agency (وكالة رقمية وإبداعية).
- Core Palette: Crimson Red (`#c93b41`), Charcoal Dark (`#1d1d1d`), Crisp Light (`#f8f9fa`).
- Vector sharpness, high-contrast badges, and tactile crimson buttons with subtle depth.

## Evidence on Hand
- Complete Next.js routes: `/`, `/products`, `/products/[slug]`, `/services`, `/configurator`, `/track`, `/blog`, `/contact`, `/dashboard`.
- Optimized assets in `public/images/` (.webp / .avif / .svg).

## Product Principles
1. **Frictionless Quotation:** Instant, transparent price discovery and custom packaging configuration.
2. **Tactile Print Craft:** Design language that reflects physical print textures, foil stamps, and precision packaging.
3. **Speed & Reliability:** Instant page transitions, smooth RTL ergonomics, and zero layout shift.

## Accessibility & Inclusion
- WCAG AA contrast compliance across both dark and light modes.
- Full keyboard navigation and semantic RTL landmarks.
