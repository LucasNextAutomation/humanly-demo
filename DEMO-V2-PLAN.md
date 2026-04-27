# Humanly Demo v2 — Premium Rebuild Plan

> Inspiration: BKM demo (`~/NextAutomation-Clients/demos/archive/bkmcp-demo`).
> Goal: kill the vibe-coded feel of v1, ship a premium minimalist showcase
> for Modules A / B / C that earns the $7,500 + $1,800/mo retainer pitch.

## Brand
- Navy: `#0F1F3D`
- Gold: `#C9A96E`
- Warm white bg: `#FAFAF8`
- Logo: drop `/public/logos/humanly.svg` (need from Lucas)

## Voice / tone
- Minimalist. Pro. Not vibe-coded.
- One hero stat per panel, real numbers, no emoji.
- Animations: framer-motion only. Subtle stagger, easing `[0.22, 1, 0.36, 1]`.
- No "Welcome Max" badge. No bombastic CTAs. Quiet confidence.

## Sitemap (4 pages, NOT 5)

```
/                       Premium landing — single page scroll
/module-a               Owner data feed deep-dive
/module-b               Tract-level typology fit deep-dive
/module-c               PEWC voice concierge (with opt-in funnel illustration)
```

KILL: `/loi-generator`, `/pipeline`. They were artifacts of the old 4-system pitch.

## Landing page (`/`) — sections

### 1. Hero
- Lockup: `Humanly × NextAutomation` (small, top-left)
- Headline (60-72px, navy):
  > "The Owner + Demand Layer"
- Sub-headline (24px, gray):
  > "Two modules feed Humanly's existing scoring stack. One optional voice layer, only on opt-in. 4-week build."
- Scroll cue: small chevron, "Tour the modules"
- NO CTA at top. Pure positioning.

### 2. Stat strip (BKM-style)
4 KPIs across, animated counters:
- `100-500ac` — Tract range
- `40-50%` — Honest blended hit rate
- `3 typologies` — BFR · MF · Modular
- `4 weeks` — To production

### 3. "What Humanly already owns" (acknowledgment band)
Horizontal row of 5 muted cards (gray, smaller):
- Market grading
- Re-grid parcels
- Vintage-imagery ML
- Census + demographics
- Custom scoring engine

Caption: *"Re-grid stays your parcel source. Your scoring engine stays your scorer. We add what you don't have."*

### 4. The three modules (the centerpiece)
Three large cards, vertical stack on mobile / 3-col on desktop. Each card:
- Module letter (A / B / C) huge in the corner
- Title
- 3-line description
- Premium mock screenshot (component, not stock image — like BKM's portfolio map)
- Click → /module-a, /module-b, /module-c

### 5. The "What we're not selling" panel (THIS IS THE TRUST MOVE)
Black/navy band, gold accent:
- "What we don't sell"
- Bullet list:
  - Skip-trace-then-AI-cold-dial — illegal at scale (TCPA §227(b))
  - FinCEN BOI data — dead since March 2025
  - 90+% hit rate claims — not real on entity-owned land
  - CoStar-tier asset comps — different product, different price
- Caption: *"We'd rather scope smaller and ship clean."*

### 6. CTA band
- Primary: "Read the proposal" → nextautomation.us/proposals/humanly
- Secondary: "Pay deposit" → Stripe link
- Tertiary: "Book a call" → calendar

### 7. Footer
- Mini sitemap, brand line, "Built by NextAutomation"

## Module deep-dives (`/module-a`, `/module-b`, `/module-c`)

Each follows the same template (BKM-style):

### Top: stat band specific to the module
Module A: `1,121` entities resolved, `47%` blended hit rate, `< 24h` SLA
Module B: `9` features added per tract, `5,000+` MSAs covered, `< $300/mo` data cost
Module C: `PEWC-only`, `< 2s` opt-out, `7-yr` audit log

### Body: 3-step animated flow
Use BKM's pattern: vertical timeline with mock screenshots between steps.

**Module A flow:**
1. Re-grid parcel → entity name on deed (mock: parcel card)
2. Sunbiz / SoS walk → resolved human name (mock: entity tree)
3. BatchData skip trace + Ekata verify → phone in your scoring DB (mock: CSV preview)

**Module B flow:**
1. MSA scan: BLS jobs + Census BPS + ZORI rents (mock: dashboard cards)
2. Per-tract typology fit: BFR / MF / Mod scores (mock: tract scoring panel)
3. Drift alert when thresholds cross (mock: Slack-style alert preview)

**Module C flow:**
1. Direct mail with QR opt-in (mock: postcard render with QR)
2. Consent landing page captures PEWC (mock: form preview)
3. VAPI calls only consented numbers (mock: call transcript with disclosures highlighted)

### Bottom: "What we DON'T do" mini-band per module
- Module A: "We don't crack DE/WY/NV LLCs (deliberately opaque). We don't promise FinCEN BOI data."
- Module B: "We don't deliver asset-level rent/occupancy comps (CoStar territory). We don't replace your scorer."
- Module C: "We don't dial cold cell phones. We don't bypass DNC. We don't impersonate humans."

## Tech / build

- Next.js 16 App Router
- Tailwind 4 (already installed)
- Framer Motion (already)
- shadcn/ui Card primitives
- NEW: `@radix-ui/react-tabs` for module switcher
- NO: leaflet (kill the map dependency, source of v1 type errors)

## Files to delete
- `src/app/loi-generator/`
- `src/app/pipeline/`
- All `* 2.tsx` iCloud-conflict duplicates
- `src/components/ParcelSlideout.tsx` (was for old deal-finder)
- Old data files in `src/data/` that referenced the 4-system pitch

## Files to keep / refactor
- `src/components/Navbar.tsx` (already aligned to A/B/C — keep)
- `src/components/Footer.tsx` (audit copy)
- `src/data/` — purge, keep only what feeds the new module pages

## Build sequence (for next session, ~4-6 hours focused)

1. **Hour 1**: scaffold new landing page `/` with hero + stat strip + "what Humanly owns" band
2. **Hour 2**: 3-module cards section + "What we don't sell" panel + CTA band + footer
3. **Hour 3**: Module A deep-dive page with the 3-step flow
4. **Hour 4**: Module B deep-dive page
5. **Hour 5**: Module C deep-dive page (extra: opt-in funnel mock)
6. **Hour 6**: cleanup, type check, deploy to Vercel

## Verification gate before deploy
- [ ] No "vibe-coded" feel — minimalist, tight spacing
- [ ] Honest hit rate (40-50%) anywhere a number appears
- [ ] No "FinCEN BOI", "Delaware members", "BeenVerified", "TruePeopleSearch", "92% hit rate"
- [ ] Module C explicitly PEWC-only with opt-in funnel illustration
- [ ] All copy matches the rev3 proposal at /proposals/humanly
- [ ] Mobile responsive (test 375px, 768px, 1280px)
- [ ] Lighthouse score ≥ 90 perf, ≥ 95 a11y

## Known unknowns (need from Lucas before build)
- Humanly logo (SVG ideally) — current demo has no logo asset
- Confirmation: ok to drop /pipeline and /loi-generator routes?
- Does Lucas want a "Built by NextAutomation" credit visible in footer or hidden?
