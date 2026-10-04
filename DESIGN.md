---
name: Etbaaly - إطبعلي
description: Custom printing, luxury packaging, and print production platform by A.Z Agency
colors:
  primary: "#c93b41"
  primary-light: "#e04b4f"
  primary-dark: "#ba3239"
  neutral-dark: "#1d1d1d"
  neutral-light: "#f8f9fa"
  surface-light: "#ffffff"
  surface-dark: "#242424"
  surface-dark-2: "#2b2b2b"
  border-light: "#e2e8f0"
  border-dark: "rgba(255, 255, 255, 0.08)"
  text-dark: "#111215"
  text-light: "#ffffff"
  text-muted: "#4b5563"
  text-muted-dark: "#a8abb4"
typography:
  display:
    fontFamily: "var(--font-lateef), -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "clamp(2rem, 5vw, 3.5rem)"
    fontWeight: 700
    lineHeight: 1.2
  headline:
    fontFamily: "var(--font-lateef), -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)"
    fontWeight: 700
    lineHeight: 1.3
  title:
    fontFamily: "var(--font-lateef), -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "1.35rem"
    fontWeight: 700
    lineHeight: 1.4
  body:
    fontFamily: "var(--font-lateef), -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "var(--font-lateef), -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 700
    lineHeight: 1.2
rounded:
  sm: "6px"
  md: "10px"
  lg: "16px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.text-light}"
    rounded: "{rounded.md}"
    padding: "12px 28px"
  button-primary-hover:
    backgroundColor: "{colors.primary-light}"
---

# Design System: Etbaaly - إطبعلي

## Overview

**Creative North Star: "The Master Print Atelier"**

Etbaaly's visual system evokes the tactile, tangible precision of high-end printmaking and luxury packaging. It balances industrial manufacturing capability with boutique agency aesthetics. Deep charcoal dark surfaces (#1d1d1d) and crisp warm light canvases (#f8f9fa) frame vibrant crimson red accents (#c93b41) that signal urgency, craft, and premium finish.

The interface is built RTL-first with Lateef typography, offering smooth calligraphic flow while maintaining razor-sharp geometric alignment in product grids, custom configurators, and tracking views.

**Key Characteristics:**
- **Crimson Accents:** High-energy brand red used purposefully on interactive levers, primary CTAs, and active states.
- **Dual Surface Logic:** Seamless dark mode (#1d1d1d) and light mode (#f8f9fa) with zero flash or contrast loss.
- **Tactile Card & Pill Architecture:** Layered elevation with subtle glass borders, soft glows, and refined corner radiuses.
- **RTL Fluidity:** Arabic typography with generous line heights and balanced whitespace.

## Colors

A focused, high-contrast palette anchored in A.Z Agency Crimson Red, balanced across dark and light surfaces.

### Primary
- **Crimson Red** (#c93b41): The core brand energy. Used for primary CTAs, active indicators, and focus highlights.
- **Crimson Light** (#e04b4f): Gradient starter and hover state.
- **Crimson Dark** (#ba3239): Gradient terminator and active pressed state.

### Neutral
- **Charcoal Dark Base** (#1d1d1d): Deep dark-mode canvas background.
- **Dark Surface Card** (#242424): Elevated container background in dark mode.
- **Dark Surface Card 2** (#2b2b2b): Secondary elevated container background in dark mode.
- **Light Base** (#f8f9fa): Crisp, clean light-mode canvas background.
- **Surface White** (#ffffff): Light mode card and dropdown surface.
- **Text Main Dark** (#111215): High-contrast light-mode body and header text.
- **Text Main Light** (#ffffff): Dark-mode body and header text.
- **Muted Text** (#4b5563 / #a8abb4): Subtitles, helper text, and inactive metadata.

### Named Rules
**The 10% Crimson Rule.** Crimson Red is a deliberate accent; it must never exceed 10% of any viewport's surface area. Its scarcity creates visual urgency.
**The Dual Surface Rule.** Every card and surface token must explicitly resolve in both light and dark mode without losing border definition.

## Typography

**Display Font:** Lateef (Arabic Google Font) with `-apple-system, BlinkMacSystemFont, "Segoe UI"` fallback.
**Body Font:** Lateef with sans-serif fallback.

**Character:** Fluent, elegant Arabic calligraphic rhythm combined with structured modern layout discipline.

### Hierarchy
- **Display** (700, `clamp(2rem, 5vw, 3.5rem)`, 1.2): Hero headers and high-impact category banners.
- **Headline** (700, `clamp(1.5rem, 3.5vw, 2.25rem)`, 1.3): Section titles and modal headings.
- **Title** (700, `1.35rem`, 1.4): Card titles, configurator options, and pricing summary labels.
- **Body** (400, `1.125rem`, 1.6): Standard paragraph text, specifications, and descriptions.
- **Label** (700, `0.875rem`, 1.2): Badges, pill counters, tab labels, and form input labels.

### Named Rules
**The Crisp Arabic Rendering Rule.** Avoid artificial bolding filters on Lateef; rely on clean font weights (400, 700) to maintain vector curve sharpness.

## Layout

The layout uses a 12-column responsive grid with RTL flex-direction and responsive container max-widths (`max-w-7xl`). Spacing follows an 8px modular scale (8px, 16px, 24px, 32px, 48px, 64px).

- **Mobile (< 640px):** Single-column stacked flows, sticky bottom CTAs, drawer navigation.
- **Tablet (640px - 1024px):** 2-column card grids, flexible sidebar layouts.
- **Desktop (> 1024px):** 3-4 column catalog grids, split-screen configurators with live preview and sticky control panels.

## Elevation & Depth

Surfaces use subtle tonal layering combined with soft crimson glows for interactive elements.

### Shadow Vocabulary
- **Crimson Button Glow** (`box-shadow: 0 4px 20px rgba(201, 59, 65, 0.35)`): Applied to `.btn-crimson` for primary action emphasis.
- **Crimson Hover Glow** (`box-shadow: 0 6px 25px rgba(201, 59, 65, 0.5)`): Hover state elevation.
- **Card Border Dark** (`border: 1px solid rgba(255, 255, 255, 0.08)`): Defines bounds in dark mode without heavy drop shadows.

### Named Rules
**The Flat Canvas Depth Rule.** Dark backgrounds remain flat (#1d1d1d); elevation is communicated through step-up tonal surfaces (#242424 -> #2b2b2b) and hairline borders rather than muddy black shadows.

## Shapes

- **Base Radius:** 10px (`rounded-md` / `rounded-xl`) for cards, modal dialogs, and product previews.
- **Pill Radius:** 9999px (`rounded-full`) for badges, tags, and secondary action buttons.
- **Button Radius:** 8px - 10px with smooth tactile inset highlights (`inset 0 1px 1px rgba(255, 255, 255, 0.2)`).

## Components

### Buttons
- **Shape:** 10px radius (`rounded-lg` / `rounded-xl`).
- **Primary (.btn-crimson):** Crimson gradient background (`linear-gradient(135deg, #e04b4f 0%, #c93b41 50%, #ba3239 100%)`), white text, subtle top inset highlight and crimson glow.
- **Secondary / Ghost:** Transparent background, 1px border (`#e2e8f0` light / `rgba(255,255,255,0.1)` dark), hover to light grey or subtle crimson tint.

### Badges & Pills
- **Crimson Badge (.badge-crimson):** Soft pink-red background in light mode (`#fef2f2`, border `#fecaca`), crimson dark-tint in dark mode (`rgba(80, 20, 24, 0.7)`, border `rgba(224, 75, 79, 0.35)`).
- **Dark Pill (.dark-pill):** Subtle charcoal pill for category filters and status chips.

### Cards
- **Background:** White (`#ffffff`) in light mode; Charcoal Surface (`#242424`) in dark mode.
- **Border:** 1px solid `#e2e8f0` (light) / `rgba(255, 255, 255, 0.08)` (dark).
- **Internal Padding:** 16px to 24px (`p-4` to `p-6`).

### Skeleton Loaders
- **Shimmer (.animate-shimmer):** Full RTL/LTR compatible sweep animation on placeholder blocks during loading states to guarantee zero CLS.

## Do's and Don'ts

### Do:
- **Do** maintain RTL direction and right-aligned text hierarchy across all components.
- **Do** implement shimmer skeleton screens (`loading.tsx`) on every dynamic route.
- **Do** use `.btn-crimson` for main conversion actions (Submit Quote, Order Now, Track Shipment).
- **Do** test color contrast in both dark and light modes.

### Don't:
- **Don't** use pure black (#000000) for dark backgrounds; use Charcoal (#1d1d1d).
- **Don't** introduce competing accent colors (like bright green/blue) except for standard status chips (e.g. Delivered status).
- **Don't** allow layout shift on asset load; always set explicit image dimensions and use skeleton loaders.
