# Design Brief

## Direction

Premium Sports Analytics — dark cricket stats dashboard with warm gold accent system and card-based depth hierarchy.

## Tone

Refined yet energetic — celebrates player excellence through polished dark UI with warm amber highlights (cricket/winning energy metaphor).

## Differentiation

Medal badge treatment (gold/silver/bronze) with subtle elevation glow creates instant visual hierarchy for top-3 players.

## Color Palette

| Token | OKLCH | Role |
| --- | --- | --- |
| background (dark) | 0.13 0.015 260 | Deep charcoal canvas |
| foreground (dark) | 0.92 0.01 260 | High-contrast text |
| card (dark) | 0.17 0.018 260 | Elevated content layer |
| primary | 0.72 0.17 50 | Warm amber CTA buttons |
| accent | 0.7 0.16 45 | Gold medal highlights |
| border (dark) | 0.26 0.02 260 | Subtle section dividers |
| chart-1 | 0.72 0.17 50 | Primary data series (gold) |
| chart-2 | 0.65 0.16 240 | Secondary data (cool blue) |

## Typography

- Display: Space Grotesk — geometric, sporty headings for player names and leaderboard ranks
- Body: General Sans — clean, readable paragraphs and stats labels
- Scale: Hero `text-5xl md:text-7xl font-bold`, h2 `text-3xl md:text-4xl font-bold`, label `text-xs font-semibold uppercase tracking-widest`, body `text-base`

## Elevation & Depth

Multi-layer card system: base cards (`shadow-sm`), elevated content (`card-elevated`), hover state (lift + enhanced shadow). Dark mode amplifies depth with subtle shadow gradients.

## Structural Zones

| Zone | Background | Border | Notes |
| --- | --- | --- | --- |
| Header | `bg-card` | `border-b border-border` | Navigation with brand |
| Content | `bg-background` alternating `bg-muted/5` | — | Card grid with section spacing |
| Footer | `bg-muted/30` | `border-t border-border` | Links and info |

## Spacing & Rhythm

Section gaps 2rem (8 spacing units), card internal padding 1.5rem, micro-spacing 0.5rem between stat labels. Consistent rhythm through card-based grid layout.

## Component Patterns

- Buttons: warm amber primary (`bg-primary text-primary-foreground`), rounded `rounded-lg`, hover lift (`hover:-translate-y-0.5 card-elevated-dark`)
- Cards: rounded `rounded-lg`, `bg-card border border-border`, hover elevation via `transition-elevation`
- Badges: medal badges with gradient + glow (gold/silver/bronze), stats with monospace numbers in `font-mono`

## Motion

- Entrance: cards fade-in with slight upward slide (`animate-float-in`)
- Hover: button lift + shadow depth change (`transition-elevation`)
- Decorative: medal badges pulse glow (`animate-pulse-glow`), chart updates via smooth transitions

## Constraints

- No external color values — all colors derive from CSS tokens
- Medal glows must not exceed `opacity-0.4` to avoid garish effects
- Charts use only `--chart-1` through `--chart-5` palette
- Animation timing max 0.4s for UX snappiness

## Signature Detail

Medal badge system (gold/silver/bronze cards with inset highlight + outer glow) applied to top-3 player cards — creates instant visual recognition of elite performers without text labels.
