---
name: Lantern
description: A vacuum-fluorescent deck face for a self-hosted smart home; every state is lit or unlit.
colors:
  ground: "#070b14"
  panel: "#0b1322"
  recess: "#0e1830"
  bezel: "#1b2740"
  bezel-hi: "#27375a"
  hairline: "#1c2c3c"
  ghost-14: "#163340"
  ghost-7: "#12272f"
  dim: "#2f6b7f"
  off-segment: "#3f8ea6"
  phosphor-cyan: "#5fd3f3"
  phosphor-cyan-hi: "#bff3ff"
  cyan-glow: "rgba(95, 211, 243, 0.55)"
  cyan-glow-soft: "rgba(95, 211, 243, 0.22)"
  prose: "#dceff5"
  prose-dim: "#93b9c7"
  prose-max: "#ffffff"
  thread-violet: "#b48cff"
  lantern-amber: "#f5a623"
  lantern-amber-hi: "#ffd27a"
  amber-glow: "rgba(245, 166, 35, 0.5)"
  amber-dim: "#5a3d0f"
  unlit-dot: "#1a2230"
typography:
  display:
    fontFamily: "DSEG14, monospace"
    fontSize: "clamp(26px, 3.25vw, 44px)"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "0.06em"
  display-clock:
    fontFamily: "DSEG7, monospace"
    fontSize: "clamp(34px, 3.4vw, 46px)"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "0.04em"
  readout:
    fontFamily: "DSEG14, monospace"
    fontSize: "clamp(22px, 2.4vw, 30px)"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "0.04em"
  readout-small:
    fontFamily: "DSEG14, monospace"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "0.04em"
  headline:
    fontFamily: "Barlow, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(30px, 3.6vw, 48px)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Barlow, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(20px, 1.8vw, 26px)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.01em"
  body-lead:
    fontFamily: "Barlow, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(18px, 1.5vw, 21px)"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0em"
  body:
    fontFamily: "Barlow, Helvetica Neue, Arial, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "0em"
  label:
    fontFamily: "Martian Mono, ui-monospace, Menlo, monospace"
    fontSize: "11px"
    fontWeight: 500
    lineHeight: 1.55
    letterSpacing: "0.14em"
  key-label:
    fontFamily: "Martian Mono, ui-monospace, Menlo, monospace"
    fontSize: "12px"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "0.12em"
  note:
    fontFamily: "Martian Mono, ui-monospace, Menlo, monospace"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: "0.02em"
rounded:
  silkscreen: "2px"
  key: "3px"
  readout: "4px"
  display: "6px"
  dot: "50%"
spacing:
  hair: "1px"
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  2xl: "32px"
  3xl: "48px"
  gutter: "clamp(16px, 4vw, 48px)"
  display-pad: "clamp(20px, 3vw, 40px)"
  section: "clamp(56px, 9vh, 120px)"
  topbar: "64px"
  max-width: "1280px"
components:
  key:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.phosphor-cyan}"
    typography: "{typography.key-label}"
    rounded: "{rounded.key}"
    padding: "0 20px"
    height: "48px"
  key-hover:
    textColor: "{colors.phosphor-cyan-hi}"
  key-primary:
    backgroundColor: "#123340"
    textColor: "{colors.phosphor-cyan-hi}"
    typography: "{typography.key-label}"
    rounded: "{rounded.key}"
    padding: "0 20px"
    height: "48px"
  key-pressed:
    backgroundColor: "#123340"
    textColor: "{colors.phosphor-cyan-hi}"
  key-amber-pressed:
    backgroundColor: "#3a2708"
    textColor: "{colors.lantern-amber-hi}"
  part-chip:
    backgroundColor: "{colors.recess}"
    textColor: "{colors.prose-dim}"
    typography: "{typography.label}"
    rounded: "{rounded.key}"
    padding: "8px 12px"
  part-chip-hover:
    textColor: "{colors.phosphor-cyan-hi}"
  nav-link:
    textColor: "{colors.prose-dim}"
    typography: "{typography.label}"
    rounded: "{rounded.key}"
    padding: "10px 12px"
  nav-link-hover:
    backgroundColor: "{colors.recess}"
    textColor: "{colors.phosphor-cyan-hi}"
  display-window:
    backgroundColor: "{colors.panel}"
    rounded: "{rounded.display}"
    padding: "{spacing.display-pad}"
  readout-cell:
    backgroundColor: "{colors.recess}"
    rounded: "{rounded.readout}"
    padding: "16px 18px 18px"
  tooltip:
    backgroundColor: "rgba(11, 19, 34, 0.96)"
    textColor: "{colors.prose}"
    rounded: "{rounded.key}"
    padding: "10px 12px"
    width: "180px"
  silkscreen-label:
    backgroundColor: "rgba(7, 11, 20, 0.75)"
    textColor: "{colors.prose-dim}"
    typography: "{typography.label}"
    rounded: "{rounded.silkscreen}"
    padding: "3px 7px"
---

# Design System: Lantern

## Overview

**Creative North Star: "The Display That Never Blinks 12:00"**

Lantern's page is the face of a vintage vacuum-fluorescent hi-fi deck. The whole surface is a dark bezelled instrument: a deep blue-black ground with recessed panels, 1px hairlines scored into the face, and a single kind of light, cyan phosphor, that reads as either lit or unlit. There is no middle state. Everything the page has to say about the product (works offline, nothing leaves the house, the light that holds) is said by lighting or not lighting a segment.

Density is instrument-panel density: generous section rhythm, but inside each display the readouts are tight, tabular and aligned. Ghost cells are always drawn beneath lit text, so absence is visible and designed rather than empty. Prose (Barlow) sits on the face at full contrast and does the explaining; silkscreen labels (Martian Mono, uppercase, letter-spaced) name the controls; the segment faces (DSEG14 / DSEG7) carry headlines, numbers and status. The build rejects the category's glowing-render hero, glass cards in threes, and kicker text above headings; it also carries no hard offset shadows and no decorative gradients beyond the top-of-page lamp bloom.

**Key Characteristics:**
- One light source: cyan phosphor on a blue-black face; everything else is recess, bezel or hairline.
- Ghost cells under every segment display; unlit is a drawn state, never a blank.
- Amber appears only where the house holds (the lantern); violet only where Thread traffic flows.
- Three faces with fixed jobs: segments display, Barlow explains, Martian Mono labels.
- Controls are physical deck keys: 1px bezel, 3px radius, a 2px drop that collapses on press.
- Motion is segment swap, glyph-by-glyph print, or exponential ease-out; nothing bounces.

## Colors

A monochrome phosphor instrument: one cyan, stepped from ghost to bloom, on layered blue-black, with two reserved accents.

### Primary
- **Phosphor Cyan** (`phosphor-cyan`): the lit segment, link color, key text, caret, selection, schematic wires and Wi-Fi packets. Always carries its bloom (`0 0 6px cyan-glow, 0 0 18px cyan-glow-soft`) when it is a lit segment.
- **Phosphor Bloom** (`phosphor-cyan-hi`): the hottest cyan; hover state for links, keys and nav, the focus ring, VPN dashed wires, and the primary key's text.
- **Ghost Cell, 14-segment** (`ghost-14`) and **Ghost Cell, 7-segment** (`ghost-7`): the unlit mask drawn under every segment display and the dead-cloud edge color in the 3D scene. The 7-segment ghost is slightly darker so its heavier strokes do not out-weigh the 14-segment ghost.
- **Off Segment** (`off-segment`): a lit segment that reads as powered-down (`.is-off`): no bloom, mid cyan. Used for dashes on the neighbour's readout, OFFLINE, END OF LIFE, and the "waiting for the cloud" line.
- **Dim Cyan** (`dim`): key and tooltip bezels, scrollbar thumb, link underline at rest, schematic box strokes, and 3D edge lines. The structural cyan that is not lit.

### Secondary
- **Lantern Amber** (`lantern-amber`): the house light that holds. Used for the lantern dot, the amber segment state (`.is-amber`), the amber deck key when pressed, the "THE LANTERN" scene label, the lamp in the 3D house, and the closing line "YOUR RULES."; with **Amber Highlight** (`lantern-amber-hi`) as the pressed key's text and **Amber Dim** (`amber-dim`) as the amber label bezel.

### Tertiary
- **Thread Violet** (`thread-violet`): Thread mesh traffic only. The violet packets, the violet schematic wire, the sensor antenna edge, the legend swatch, and the violet segment state (`.is-violet`).

### Neutral
- **Deck Ground** (`ground`): page background, with a single radial lamp bloom (`#0f1b33` at 50% -200px, 1200x600px) behind the top bezel.
- **Panel** (`panel`): display windows, stage, schematic, dashboard, scrollbar track, sticky topbar at 85% alpha behind an 8px blur.
- **Recess** (`recess`): readout cells, row readouts, dashboard cells, part chips, nav hover, schematic box fills. Always paired with the inset shadow.
- **Bezel** (`bezel`) and **Bezel Highlight** (`bezel-hi`): 1px borders of display windows, stage and schematic; the highlight is reserved for a lifted edge.
- **Hairline** (`hairline`): every 1px rule, grid gap fill, row and meter dividers, readout gutters, topbar underline.
- **Prose** (`prose`): body text and tooltip copy. **Prose Dim** (`prose-dim`): labels, notes, supporting paragraphs in meters and rows, footer links. **Prose Max** (`prose-max`): the single `strong` inside a hero or close paragraph.
- **Unlit Dot** (`unlit-dot`): the neighbour's dead lantern dot and the lamp shade in big-tech mode.

### Named Rules
**The Amber Discipline Rule.** Amber means exactly one thing: the house keeps working. It lights the lantern dot, the lantern label, the amber key when the internet is cut, the HOUSE: ON readout, and the closing "YOUR RULES." It is never a warning, never a highlight, never a second accent for emphasis. If a new surface does not contain the lantern moment, it does not contain amber.

**The Violet Is Thread Rule.** Violet is a protocol color, not an accent. It appears only on Thread traffic (packets, wires, legend, antenna). Wi-Fi and wired traffic are cyan; VPN is dashed bloom-cyan.

**The Lit-or-Unlit Rule.** There are three segment states and no fourth: lit (cyan with bloom), off (`off-segment`, no bloom) and ghost (the mask). Do not invent opacity-dimmed or desaturated cyan; use `.is-off` or let the ghost layer show.

## Typography

**Display Font:** DSEG14 Classic (with monospace fallback); DSEG7 Classic for clocks and numeric-only readouts
**Body Font:** Barlow (with Helvetica Neue, Arial, sans-serif)
**Label/Mono Font:** Martian Mono (with ui-monospace, Menlo, monospace)

**Character:** The segment face is the instrument; it is slow to read on purpose and only ever shows short, uppercase strings. Barlow is the human voice beside it, large and plain. Martian Mono is the silkscreen printed on the deck: small, uppercase, widely tracked, tabular. All three are self-hosted with `font-display: swap`.

### Hierarchy
- **Display** (DSEG14 400, `clamp(26px, 3.25vw, 44px)`, line-height 1, tracking 0.06em): the hook and closing line, one short phrase per segment span; segments stack to one per line under 700px. Also the brand mark at 22px and the top-of-stage printed line at `clamp(9px, 2.3vw, 18px)`.
- **Display Clock** (DSEG7 400, `clamp(34px, 3.4vw, 46px)`): the twin readout clocks only; the colon ticks on a one-second interval.
- **Readout** (DSEG14 400, `clamp(22px, 2.4vw, 30px)`): the lead reading of each meter. Smaller readouts step down to 16px (dashboard cells), 15px (row readouts), 14px (tooltip title), 13px (readout rows and schematic) in DSEG14.
- **Headline** (Barlow 600, `clamp(30px, 3.6vw, 48px)`, 1.1, -0.01em, balanced): section headings. No label, kicker or eyebrow above them.
- **Title** (Barlow 600, `clamp(20px, 1.8vw, 26px)` in rows, `clamp(20px, 1.6vw, 24px)` in meters, 1.1): meter and row headings.
- **Body Lead** (Barlow 400, `clamp(18px, 1.5vw, 21px)`, 1.5): hero subline and closing paragraph, max 48-52ch, one `strong` at 600 in white.
- **Body** (Barlow 400, 18px, 1.55): all other prose, max 62ch; supporting paragraphs in meters, rows and the inside copy render in `prose-dim` with `strong` returning to `prose`.
- **Label** (Martian Mono 500, 11px, 0.14em, uppercase, tabular-nums): silkscreen names for readouts, nav links, legend, ticker and scene labels. `strong` inside a label lights it cyan.
- **Key Label** (Martian Mono 500, 12px, 0.12em, uppercase): deck key text. Part chips use 11px at 0.10em.
- **Note** (Martian Mono 400, 12px, 1.7, 0.02em, sentence case): footnotes, the parts instruction, the dashboard note, footer provenance.

### Named Rules
**The Segment Strings Rule.** Segment displays carry uppercase strings of a few words, digits, colons and periods; never prose, never lowercase. Every segment element is built with the ghost layer (`~` under the lit text, `!` for spaces) and an `aria-label` carrying the plain string.

**The Silkscreen Rule.** Martian Mono is only ever small (11-12px) and tracked (0.10-0.14em). It never sets a heading and never grows past 12px.

## Layout

A single centered deck 1280px wide with a fluid gutter (`clamp(16px, 4vw, 48px)`). The sticky top bezel is 64px high with a hairline underneath, the brand label hiding under 640px. Sections breathe at `clamp(56px, 9vh, 120px)` block padding; the hero at `clamp(32px, 6vh, 72px)` top and `clamp(40px, 7vh, 88px)` bottom; the close at `clamp(72px, 12vh, 140px)` top. Section heads are capped at 64ch with the supporting paragraph at 56ch and a `clamp(28px, 4vw, 48px)` gap before content.

Grids are hairline-scored rather than card-based: the readouts, dashboard and meters use 1px gaps filled with `hairline`, and rows and meters are separated by 1px bottom borders on a top-ruled list. Breakpoints are per-component, not global: 460px (readouts stack), 640px (brand label), 700px (hook segments stack), 760px (meters go two-up with a left hairline on even cells), 800px (benefit rows become 1.1fr / 1.4fr / auto with the readout right-aligned), 900px (hero 7/5 split, stage panel auto / 1fr), 1000px (inside 3/2 split). The 3D stage view is `clamp(380px, 62vh, 680px)` tall and the schematic scrolls horizontally below 640px rather than shrinking its SVG. Internal spacing runs on a 4px-based ladder: 4, 6, 8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 40, 48.

## Elevation & Depth

Depth is physical, not floating: the face is layered as ground, panel, recess, each darker and more inset than the last, and lit elements glow rather than lift. Three shadow roles exist and no others: the display-window drop that seats the big panels into the ground, the inset shadow that recesses readout cells, and the key drop that gives deck keys a 2px travel. The only glows are phosphor blooms on lit segments, lit keys and the lantern. There are no offset hard shadows and no shadow on text other than bloom.

### Shadow Vocabulary
- **Display seat** (`box-shadow: 0 20px 60px rgba(0,0,0,0.55), 0 2px 0 rgba(255,255,255,0.03) inset, 0 0 0 1px rgba(0,0,0,0.6)`): display windows and the stage; the schematic and dashboard use the lighter `0 20px 60px rgba(0,0,0,0.45)`.
- **Recess** (`box-shadow: inset 0 2px 8px rgba(0,0,0,0.5)`): every readout cell, row readout and dashboard cell on `recess`.
- **Key at rest** (`box-shadow: 0 2px 0 #050810, 0 6px 14px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.04)`): the 2px travel under a deck key.
- **Key pressed** (`box-shadow: 0 0 0 #050810, 0 2px 6px rgba(0,0,0,0.45), inset 0 2px 4px rgba(0,0,0,0.5)` with `translateY(2px)`): active, `.is-pressed` and `aria-pressed="true"`.
- **Phosphor bloom** (`text-shadow: 0 0 6px cyan-glow, 0 0 18px cyan-glow-soft`): lit segments; amber uses `0 0 6px amber-glow, 0 0 20px rgba(245,166,35,0.3)`; violet `0 0 8px rgba(180,140,255,0.45)`. Lit keys add `0 0 16px cyan-glow-soft` (24px with `cyan-glow` on hover); the amber key adds `0 0 18px amber-glow`.
- **Hairline relief** (`box-shadow: 0 1px 0 rgba(255,255,255,0.03)`): a 1px rule scored into the face.
- **Tooltip** (`box-shadow: 0 8px 24px rgba(0,0,0,0.5)`): the only floating element.

### Named Rules
**The Glow Is Light Rule.** A glow is only ever on something that is lit (segment, lit key, lantern). Nothing unlit glows, and glow color always matches the lit color.

**The Two-Pixel Travel Rule.** Deck keys sit 2px proud of the face and drop 2px when pressed or held; the drop shadow collapses to zero and an inset shadow appears. No scale, no lift on hover.

## Shapes

Rectangular and bezelled. Radii are tiny and tiered by role: 2px on silkscreen scene labels, 3px on keys, chips, nav links and tooltips, 4px on recessed readout groups, 6px on display windows, stage, schematic and dashboard. The only circles are 10px indicator dots (the lantern). Every container has a 1px border (`bezel` for windows, `hairline` for readouts, `dim` for keys and tooltips) and large panels carry a faint glass band (a 100deg gradient at 3% cyan) over the phosphor. Lists are ruled, not boxed. Icons are 14-16px inline SVG, stroked at 1.5 in `currentColor`, rounded joins; they only ever sit beside a key or chip label, never as a card's hero.

## Components

### Segment Display
The signature primitive. An inline element in DSEG14 (or DSEG7 via `.seg-7` for clocks) with two stacked layers: an absolutely positioned ghost layer printing `~` for every character (periods and colons ghost as themselves to keep the mask aligned) in `ghost-14` / `ghost-7`, and a lit layer printing the string with spaces replaced by `!` in `phosphor-cyan` with the phosphor bloom. The element carries `data-seg`, `data-text` and an `aria-label`; both layers are `aria-hidden`.
- **States:** `.is-off` (off-segment cyan, no bloom), `.is-amber` (lantern amber with amber bloom), `.is-violet` (Thread violet with violet bloom), `.is-blink` (1s stepped blink, 64% on / 36% off, infinite; under reduced motion no animation and the lit layer holds at 55% opacity).
- **Transition:** color and text-shadow swap over 0.4s on the ease-out curve.
- **Printed line:** the stage's status line prints glyph by glyph at 26ms per character into a pre-sized `!` field; under reduced motion it sets the whole string at once.

### Deck Keys
- **Shape:** rectangular, 3px radius, 1px `dim` bezel, 48px min height, 20px side padding, 10px gap to a 14px icon, uppercase Martian Mono 12px at 0.12em.
- **Default:** vertical gradient `#101c30` to `#0b1322`, `phosphor-cyan` text, key-at-rest shadow.
- **Primary** (`.key--primary`): lit at rest; gradient `#1a4250` to `#123340`, `phosphor-cyan` bezel, `phosphor-cyan-hi` text, plus a 16px soft cyan glow (24px on hover).
- **Hover:** text to `phosphor-cyan-hi`, bezel to `phosphor-cyan`; 0.2s ease-out.
- **Pressed / Active** (`:active`, `.is-pressed`, `aria-pressed="true"`): 2px drop, inset shadow, lit gradient and cyan bezel. Transform transitions in 0.15s.
- **Amber** (`.key--amber[aria-pressed="true"]`): the CUT INTERNET key only; gradient `#4a3210` to `#3a2708`, `lantern-amber` bezel, `lantern-amber-hi` text, 18px amber glow.
- **Disabled:** 45% opacity, not-allowed cursor.
- **Mode group** (`.mode`): keys fused into one bezelled strip; inner keys lose their own border, radius and shadow, share 1px `dim` dividers, do not travel, and the unselected key sits on `panel` in `prose-dim`.

### Chips (part selectors)
- **Style:** `recess` fill, 1px `hairline` bezel, 3px radius, 8px 12px padding, 16px stroked SVG icon, Martian Mono 11px uppercase at 0.10em in `prose-dim`.
- **State:** hover and `aria-pressed="true"` light the text `phosphor-cyan-hi` and the bezel `phosphor-cyan`.

### Display Window / Containers
- **Corner Style:** 6px.
- **Background:** `panel`, with a 2.5% white top sheen over the first 30% and the glass band pseudo-element.
- **Shadow Strategy:** display seat (see Elevation).
- **Border:** 1px `bezel`.
- **Internal Padding:** `clamp(20px, 3vw, 40px)` for the hero window; `clamp(14px, 2vw, 24px)` for the schematic and dashboard.

### Readout Cell
- **Style:** `recess` fill with the recess inset shadow, inside a 1px `hairline`-bordered, hairline-gapped group at 4px radius; 16px 18px 18px padding, 10px column gap.
- **Anatomy:** a label and indicator dot on the title row, the clock or lead segment, a two-column `dt`/`dd` grid of label and 13px segment, and a hairline-topped status label pushed to the bottom.
- **Row readout variant:** inline-flex column, 12px 16px padding, 190px min width, right-aligned above 800px.

### Tooltip
- **Style:** `panel` at 96% alpha, 1px `dim` bezel, 3px radius, 10px 12px padding, 180-240px wide, 10px rotated-square pointer continuing the bezel, tooltip shadow. Content is a 14px segment title, 14px Barlow copy in `prose`, and a label.
- **Behavior:** fades in over 0.15s; flips below the anchor with `.is-below`. Shown from scene hover or from a part chip, so labels are reachable without hover.

### Silkscreen Scene Labels
- **Style:** absolutely positioned Martian Mono labels on the 3D stage; `ground` at 75% alpha, 1px `hairline` bezel, 2px radius, 3px 7px padding. `.is-amber` recolors to `lantern-amber` with an `amber-dim` bezel; `.is-dim` drops to 35% opacity over 0.4s when the thing it names goes dark.

### Navigation
- **Style:** three Martian Mono 11px uppercase labels in `prose-dim`, 10px 12px padding, 3px radius, 4px apart, in a sticky 64px bezel on `panel` at 85% alpha with an 8px backdrop blur and hairline underline. Hover lights the text `phosphor-cyan-hi` on a `recess` pill. The brand is the segment mark at 22px with a label that appears from 640px. Mobile keeps the same three links; nothing collapses into a menu.

### Rules and Lists
- **Rule** (`.rule`): 1px `hairline` with the hairline relief shadow.
- **Meters and Rows:** top-ruled lists with 1px `hairline` dividers; meters pair a lead readout with a title and dim paragraph (max 44ch), rows pair a title, dim paragraph (52ch) and a row readout.

### 3D Stage
The Three.js scene uses the same tokens as hex integers: panel, recess fill, dim edges, cyan lit edges, ghost edges, violet antenna and packets, amber lamp. Flat-shaded low-poly meshes, line edges at 90% opacity, a cool ambient light. Camera auto-orbits at 0.35 and stops under reduced motion; arrow keys orbit when the canvas is focused and the canvas shows the standard focus ring inset by 2px. State changes ease exponentially (lantern intensity at rate 4, cloud dim at rate 3 per second) and snap under reduced motion. Without WebGL the stage adds `.no-webgl`, hides the canvas and shows an inline SVG fallback that still toggles the cut state and prints the line.

## Do's and Don'ts

### Do:
- **Do** build every segment display with the ghost layer underneath; an unlit cell is drawn in `ghost-14` / `ghost-7`, never left blank.
- **Do** keep amber to the lantern moment (dot, label, amber key when cut, HOUSE: ON, YOUR RULES.) and violet to Thread traffic.
- **Do** make every control a deck key: 1px `dim` bezel, 3px radius, 48px tall, 2px travel on press, lit gradient when active.
- **Do** separate content with 1px `hairline` rules and hairline-gapped grids; recess readouts with `inset 0 2px 8px rgba(0,0,0,0.5)`.
- **Do** use the one curve, `cubic-bezier(0.16, 1, 0.3, 1)`, at 0.15-0.4s for state transitions, stepped animation for blinks, and 26ms per glyph for printed lines.
- **Do** honor reduced motion everywhere: no blink, no ticker, no orbit, no glyph printing, no packet motion; the colon holds, states snap, transitions collapse to 0.01ms.
- **Do** keep every segment string in `data-text` with an `aria-label` and hide both visual layers from assistive tech.
- **Do** use the focus ring `2px solid phosphor-cyan-hi` offset 3px (inset 2px on the canvas).

### Don't:
- **Don't** put a label, kicker or eyebrow above a Barlow heading; headings sit directly on the face.
- **Don't** add a second accent, warning red, or any amber outside the lantern moment.
- **Don't** flatten the ground to pure black or use a glowing-render hero, glass cards, or equal icon-card rows.
- **Don't** use hard offset shadows, lifted hover states, scale effects or bounce easing; depth is seat, recess and 2px key travel only.
- **Don't** set prose or lowercase text in DSEG, or let Martian Mono grow past 12px.
- **Don't** dim cyan with opacity or desaturation; use `.is-off` or the ghost layer.
- **Don't** ship a stage without the no-WebGL SVG fallback and keyboard orbit.
