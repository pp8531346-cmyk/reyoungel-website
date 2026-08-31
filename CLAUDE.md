@AGENTS.md

# Reyoungel site — design & architecture notes

Hebrew-RTL marketing site for Reyoungel (hyaluronic acid dermal filler, by Bioha
Laboratories). Premium/clinical-but-elegant tone. These are durable conventions
established across prior sessions — read before making visual or structural changes.

## Brand tokens — do not change without explicit request

Defined in `src/app/globals.css` (`:root`, mirrored into `@theme inline`):

- Colors: `--color-wine` (#ab213a), `--color-wine-dark` (#80192c), `--color-plum`
  (#9e2255), `--color-ink` (#1a1414), `--color-ivory` (#faf5ef, main page bg),
  `--color-stone` (#8a8580), `--color-cream` (#ffffff), `--color-hairline`,
  `--color-catalog-gray` (#d6d7d8 — sourced from the Reyoungel Canva catalog, used for
  product-name chips / photo-card backgrounds).
- Fonts: `font-display` → Frank Ruhl Libre (weight 900 only — headlines, big numerals,
  display type). `font-body` → Assistant (400/600/700 — everything else; it's the
  `<body>` default, so most text doesn't need the class explicitly).

## "Fits in one viewport, no scroll" principle

Applied to Hero-type sections (Home Hero, `/products` intro, product journey steps).
Pattern: `h-screen flex flex-col justify-center` with vh-based/`clamp()` padding and
type sizes rather than fixed rem paddings — and critically, **top padding must clear
both the fixed navbar (75.5px) and any decorative bleed graphic** (e.g. `HeaderWave`,
130px tall) or content renders invisibly behind them. Typical pattern:
`pt-[max(7rem,11vh)]`.

**Always verify empirically**, not by eyeballing a screenshot: measure
`section.getBoundingClientRect().height === window.innerHeight` via JS after a fresh
load. Screenshots taken immediately after navigation often catch entrance animations
mid-fade (Reveal/AnimatePresence) and look broken when the page is actually fine —
wait ~2-3s and re-screenshot before concluding something's wrong.

## Typography hierarchy

Headline = large, `font-display`, black weight, the dominant element. Supporting copy
= noticeably smaller and lighter (e.g. `text-xs font-normal` vs. the headline's
`clamp(2.5rem,...)` black weight) — don't let them read as similar-weight siblings.
Small labels/checklists sit a step below that again. When asked to "increase the
headline" or similar, scale *only* the specified element — don't creep other type
sizes up with it unless asked.

## RTL positioning conventions

Site is `dir="rtl"` on `<html>` (Hebrew). Key facts, learned the hard way:

- In an RTL flex row (no `flex-direction` override), the **first DOM child renders
  rightmost, the last DOM child renders leftmost** — visual order mirrors, DOM order
  doesn't. To move an element to the physical left/right side, reorder the JSX, not
  the CSS.
- "Left side" placements on this site (e.g. the Hero product image) are treated as
  **static physical design decisions**, confirmed explicitly by the user, not
  logical/flippable ones — use physical `left-0`, `-ml-*`, etc., not `ps-`/`pe-`,
  for these. Logical properties (`ps-`/`pe-`, `border-s`/`border-e`) are still correct
  for ordinary content flow (start=right, end=left in RTL) — just not for these
  deliberately-static edge placements.
- **Flex shrink-to-fit gotcha**: an unstyled child of a `flex items-center` container
  only gets centering on the cross axis — on the main axis it defaults to
  shrink-to-content, so a full-width image nested a couple of levels down (e.g. inside
  a wrapper component like `ParallaxImage`) can silently render at a stale/wrong width
  instead of stretching to fill its parent. Fix: use `grid` + `content-center` instead
  of `flex items-center` when the child must fill 100% width — grid items stretch by
  default, flex items don't on the main axis.

## Dev-only editor (`src/dev-editor/`)

In-page drag-to-edit tool (text, images, free-position, treatment markers on
`/products`). Safety model — preserve this pattern for any new editor features:

- `DevEditorGate` checks `process.env.NODE_ENV === "development"` and only then
  `next/dynamic(..., { ssr: false })`-imports the actual editor, so it's fully
  code-split out of production bundles.
- `EditModeContext` defaults to `{ editMode: false }` with no provider mounted outside
  dev — consuming components degrade to plain pass-throughs automatically.
- Every API route under `src/app/api/dev-editor/*` independently re-checks
  `isDevEnvironment()` and 404s otherwise — never trust the client-side gate alone.
- Writes go straight to source files (`positions.json`, or scoped text edits into
  `productShowcaseContent.ts` etc.) — treat these routes as filesystem-write-capable
  and keep their path-scoping (`assertInsideProject`) intact.

## Other conventions

- **Canva is source-of-truth** for product photography/copy. Always locate and show a
  preview of the exact design + page before exporting — don't guess/assume you have
  the right asset.
- **Image pipeline**: Node + `sharp` for cropping/trimming/compositing, via throwaway
  `.scratch-*.js` scripts — always deleted after use, never committed. Prefer AI
  background removal (Higgsfield `remove_background`) over flat color-keying when a
  subject has near-background-colored elements (color-key risks eating into it);
  precise rectangular per-element cropping is a reasonable fallback when AI credits
  are unavailable and the subject is describable as rectangles.
- **Browser testing in this environment**: `resize_window` does not actually change a
  tab's viewport — inject a sized `<iframe>` via JS instead to get real narrow-viewport
  CSS behavior for mobile checks. Also watch for scroll-position drift/residual
  momentum when mixing programmatic `scrollTo` with prior wheel-scroll actions in the
  same tab; prefer a fresh tab when precise scroll position matters.
- **Git**: identity is set locally (not global) — `paz <pp8531346@gmail.com>`.
