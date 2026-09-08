# Handoff: how bmw-new-1 was built

This is a new site (bmw-garage) for the same boss/client family as `e:\bmw-new-1`
(a multi-page BMW site: home + generation pages + variant pages). You're expected
to **maintain the same folder structure, data-flow pattern, and styling system**
established there. This doc is a condensed transfer of everything learned building
that project across a long session, so a fresh chat can pick up the conventions
without re-deriving them from scratch or drifting into a different style.

Read `e:\bmw-new-1\AGENTS.md` too — it's the project's own instructions file and is
still the primary source of truth for that repo's rules. This doc adds the
implementation patterns and hard-won lessons that AGENTS.md doesn't spell out.

## Stack

- Next.js (App Router), React, Tailwind CSS v4 (CSS-first config, `@import "tailwindcss"` in `globals.css`, no `tailwind.config.js`).
- No component library — everything is hand-rolled with Tailwind utility classes.
- `next/image` for all images (never plain `<img>`).
- Deployed on Vercel.

## Folder structure (replicate this shape)

```
src/
  app/
    [...slug]/page.js        # catch-all route; looks up a JSON registry to decide
                              # which page "type" and JSON dataFile to render
    globals.css               # theme tokens + a couple of global utility classes
  components/
    shared/
      Navbar.js, Footer.js    # used on every page
      themeProvider.js        # light/dark theme context, see below
    generation/                # one folder per page-family, e.g. "generation pages"
      ModelHero.js, ...        # each file = one page section, named after the section
      GenIcons.js               # shared inline-SVG icon set (see below)
    variant/                   # another page-family (e.g. "320d" style variant pages)
      VariantHero.js, EraMap.js, ReplacementCosts.js, ...
    reusableComponents/
      MStripe.js                # small shared decorative accent used under H2/H1s
  data/
    registery/
      generations/pages.json   # registry: slug -> { dataFile, type, ... }
      variants/pages.json
    generations/<slug>.json    # one JSON file per generation page's content
    variants/<slug>.json       # one JSON file per variant page's content
public/
  <page-family>/                # e.g. public/320d/, public/e90/ — one image folder
                                 # per page-family, NOT shared across families
    <section>_dark.webp
    <section>_light.webp
    <section>_mobile_dark.webp
    <section>_mobile_light.webp
```

**Naming convention:** section component + its JSON share the same conceptual name
(e.g. `EraMap.js` renders the `eraMap` key of the page's JSON). Keep this 1:1
mapping — it's what makes the JSON→props wiring in `page.js` easy to follow.

## Data flow (do not deviate from this)

1. Content lives in JSON, one file per page, one top-level key per section.
2. The catch-all `page.js` route resolves `slug` → registry entry → JSON file →
   imports it and passes each section's slice as `data` prop to that section's
   component.
3. Components are **pure rendering** of `data` — no hardcoded copy inside
   components except structural/decorative labels (button icons, generic trust
   badges that aren't page-specific, etc.).
4. This is deliberate so JSON can later be swapped for a DB/API call with
   **zero component changes** — keep that property intact in the new project.
5. When given content to convert into JSON, **never drop any of it** — that was
   an explicit recurring instruction on bmw-new-1 and caused rework when missed.

## Theming system

`src/components/shared/themeProvider.js`: a `ThemeProvider` that stores `light` |
`dark` in `localStorage`, exposes `useTheme()` → `{ theme, toggleTheme }`, and
injects the active theme's tokens as inline CSS custom properties on a wrapping
`<div style={themes[theme]}>`. Tokens are things like `--color-page`,
`--color-surface`, `--color-text`, `--color-text-muted`, `--color-border`,
`--color-primary`, `--color-shadow`, `--color-hero-overlay`, etc. — see the file
for the full light/dark token tables.

**Rule: no hardcoded colors.** Every color in every component is either a
Tailwind arbitrary-value class referencing a CSS var (`bg-[var(--color-surface)]`,
`text-[var(--color-text-muted)]`) or, when a component needs genuinely different
markup/opacity between themes (not just a token swap), an explicit
`const isDark = theme === "dark"` branch with two literal class strings. Both
patterns are used throughout — token classes for simple color swaps, `isDark`
branches when structure/opacity/gradient differs meaningfully between themes.

**Gotcha learned the hard way:** if you extract a sub-component and forget to
wire `isDark` through to it, it silently renders with whatever colors you first
wrote it with in one theme, and looks broken in the other. When auditing a
"wrong colors in light/dark mode" bug, always check *every* sub-component was
actually passed `isDark`/theme-derived classes, not just the parent.

## Shared building blocks to recreate

- **`GenIcon`** (`components/generation/GenIcons.js`): one component, `name` prop,
  a `paths` lookup object for simple single-`<path>` icons plus explicit
  `if (name === "...")` blocks for icons needing multiple SVG elements. This is
  the *only* icon system in the project — no external icon library. Extend this
  file rather than pulling in a new dependency.
- **`MStripe`**: small decorative accent (colored slashes) rendered under most
  H1/H2s across the site — reuse the exact same component for visual continuity.
- **`.glass-panel`** utility class in `globals.css`: translucent blurred card
  background, used for a lot of secondary info cards.
- **Navbar/Footer**: shared on every page via the root layout; Navbar is
  `sticky top-0` — **its rendered height matters** for any hero section that
  tries to be exactly `100vh`/`100svh` tall (see pitfalls below).

## Responsive strategy: mobile and desktop are often *separately coded*, not just breakpoint classes

This is the single biggest style lesson from the session. For any section with a
materially different mobile layout (not just reflowed columns — different card
shapes, different image treatment, different information density), the pattern
that worked was: **write two separate JSX blocks**, one wrapped `md:hidden`
(mobile) and one `hidden md:block`/`md:flex` (desktop), each with their own
tuned classes, rather than trying to force one shared markup tree to look right
at both sizes with responsive utility prefixes alone. Duplicating ~20 lines of
JSX per breakpoint was consistently less painful and less bug-prone than one
"clever" shared tree, especially once dividers, accordions, and image
crops/fades got involved.

When duplication *would* be excessive (e.g. shared row data in a table), the
alternative is to keep one shared sub-component (like a `Table`/`Row` component)
but pass a `cols` prop for the grid-template differences — see `EraMap.js` /
`RepairBuyOrReplace.js`'s `Table` component for the pattern.

Concretely useful mobile patterns established:

- **Top-image, seamless-fade hero pattern** (`ModelHero.js` in `generation/`,
  copied into `variant/RepairBuyOrReplace.js` and `variant/BuyingChecklist.js`):
  a full-width photo sits at the very top of the block (no border/rounded box),
  with a bottom gradient that fades to `var(--color-page)` in light mode and to
  a solid dark rgba in dark mode, so it blends into the page instead of having a
  hard edge. Text/content follows below in normal flow.
- **Accordion cards** (`ReplacementCosts.js`, `EraMap.js` mobile cards): one
  `openIndex` state, click toggles between open/closed, chevron rotates 180°.
  Multiple components on the page reuse this exact interaction.
- **Floating dividers** (not full-height borders) between items in a row:
  `<span className="w-px self-center bg-[var(--color-border)]" style={{ height: "70%" }} />`
  between flex items, skipped before the first item (`index > 0 ? <divider/> : null`).
  Used for trust-badge strips and ticker bars throughout. **Contrast check:** if
  the divider sits on a *translucent* card over a busy photo (not a solid
  `--color-surface` card), the plain `--color-border` token is often too faint —
  bump it to something like `white/35` (dark) / `rgba(7,24,39,0.25)` (light) for
  that specific context.

## Image conventions

- Every hero/banner-style photo section has up to 4 variants:
  `<name>_dark.webp`, `<name>_light.webp`, `<name>_mobile_dark.webp`,
  `<name>_mobile_light.webp`. Not every section needs all 4 — only add what's
  actually used.
- **Always convert to WebP** before committing — PNGs supplied by the client were
  routinely 5-13MB each; converting with `sharp` (already a project dependency,
  usable via `npx`/`node -e`) at `quality: 82` cut most files to 100-250KB with
  no visible loss. Do this for every new image asset dropped into `public/`.
- One image folder per page-family in `public/` (e.g. `public/320d/`,
  `public/e90/`) — don't mix assets from different page families into one
  folder.
- **Filenames are case-sensitive on Vercel's Linux build** even though your
  local Windows dev server is case-insensitive and won't catch a mismatch, and
  a *referenced-but-nonexistent* file will silently render as broken image
  locally in some cases too. If an image is reported as "shows locally, missing
  in production," check for an exact filename typo/case mismatch or a genuinely
  never-supplied asset first — that was the actual cause every time it came up.
- `object-cover` vs `object-contain`: use `cover` for full-bleed photo
  backgrounds where cropping is acceptable; use `contain` (with a matching
  page-colored background on the wrapper) when the client says "don't crop it" —
  but note a `contain` box can only grow as tall as it is wide for a roughly
  square source image, so "make the image look taller" and "don't crop" can be
  in tension — resolve by widening the box, not by switching back to `cover`.

## Verification workflow (follow this every time)

1. After every edit: `npx eslint <file>` — must be clean before moving on.
2. Periodically, and always before declaring a multi-file task done:
   `npm run build`.
3. **Do not rely on your own visual/screenshot self-check** — it's proven
   unreliable in this sandbox. Trust the user's screenshots/feedback for visual
   correctness; use eslint+build only to catch code-correctness issues.
4. Never commit or push unless explicitly asked. When asked to push, check
   `git status`/`git diff` first, use a heredoc commit message, and only add
   a co-author trailer if the user hasn't explicitly said "authored only by me."

## Known pitfall list (things that cost real back-and-forth — check for these proactively)

- **CSS `@layer` vs unlayered styles:** a plain (non-`@layer`-wrapped) CSS rule
  in `globals.css` *always* wins over any Tailwind utility class, regardless of
  specificity or source order, because Tailwind wraps its utilities in
  `@layer utilities` and unlayered styles beat all layered styles. If a Tailwind
  utility class (like `no-underline`) appears to do nothing, check whether a
  conflicting rule in `globals.css` is unlayered and wrap it in `@layer base`.
- **Stacking separate same-spec CSS Grids can misalign by sub-pixels.** If a
  header row and each body row are independently-instantiated grids sharing the
  same `grid-template-columns` string, browsers can round each instance's
  column edges slightly differently, causing a colored header background to
  fall a few px short of the body content below it. Fix: put the header cells
  and all body-row cells as flat children of *one* shared grid container
  instead of stacking N separate grid instances.
- **Sticky Navbar height eats into `100vh`/`100svh` hero math.** A `position:
  sticky` navbar above a hero section still takes up real document flow space,
  so a hero sized to exactly `100svh` plus a navbar above it is taller than one
  screen — content at the bottom of the hero gets pushed below the fold. Size
  hero sections to `calc(100svh - <navbar height>px)` on mobile instead.
- **`object-fit: cover` needs real vertical crop room to matter.** If a
  container's aspect ratio is *wider* than the image's aspect ratio, `cover`
  crops left/right and the image's full height already renders — changing
  `object-position`'s vertical value does nothing in that case. Work out the
  actual crop axis before tweaking position values.
- **`react-simple-maps` (used for the UK region map) only declares peer support
  for React ≤18.** On React 19 this breaks a *fresh* `npm install` (works fine
  once `node_modules` already exists locally, which is why it can pass
  locally and fail on Vercel). Fix via a `package.json` `"overrides"` block
  pinning it to the project's actual React/ReactDOM versions — don't reach for
  `--legacy-peer-deps` globally, it's broader than needed.
- **Bracket-tag data fields** (e.g. `"£2,800-£4,500 [PLACEHOLDER - confirm vs cost sheet]"`)
  are a recurring JSON content shape — a small `splitBracketTag()`-style parser
  (regex `/^(.*?)\s*\[([^\]]+)\]\s*$/`) to separate the display value from its
  trailing status/source tag comes up repeatedly; keep one canonical version of
  this helper rather than re-deriving it per component.

## Working style notes for this client

- They give feedback in short, direct messages and iterate fast — expect several
  rounds of "no, like this" on any given section before it lands. Don't over-build
  ahead of confirmed direction.
- They frequently scope a request explicitly to "mobile view only" or "desktop
  view only" — when a request doesn't say, ask or infer from context before
  changing both, since a fix for one breakpoint has repeatedly needed to be
  reverted on the other.
- UI polish requests reference concrete reference images/specs (competitor
  screenshots, detailed layout specs) — match structure/layout from those, but
  you generally do **not** need to match their exact colors/fonts — this
  project's own token system takes precedence unless told otherwise.
