---
version: 1
slug: "index-html"
primary_target: "index.html"
related_targets: []
---

# Surface brief: index.html (Lantern landing page)

Scope: the single-page product launch site for Lantern, deployed static to GitHub Pages. Visitor mode: Persuade.

Audience and job: privacy-minded households arriving cold. Believe in seconds that a smart home can run entirely inside the house, understand how through the interactive 3D cutaway, leave convinced. Secondary: tinkerers reading the "how it works" layer. Evaluators judging it as a real launch page.

Action: concept product, no commerce. Primary action "See how it works" (scrolls to the 3D house); secondary "Explore the house". No buy, pricing, or sign-up.

Proof and content: the real running architecture (router, switch, Raspberry Pi with Home Assistant, NAS; Matter-over-Thread air sensor, Wi-Fi plugs, TV, printer, camera; four vendor ecosystems unified; VPN-only remote access; backups on own NAS). The real outage one-liner. All visuals authored and illustrative. No photos, no fake numbers, no testimonials, no sensitive network details.

Constraints: static HTML/CSS/JS, Three.js from CDN, no build step. Fast, mobile, prefers-reduced-motion honored, static fallback without WebGL, keyboard-operable controls, readable contrast on the dark ground.

Tone: bold, a little rebellious, humor allowed. Copy ideas from the brief: "You choose what you connect", "Big Brother isn't invited", "There is no cloud, it's just someone else's computer", "Your data, your choice".

Memorable moment: pressing CUT INTERNET on the deck. The cloud's segments die, the neighbour display blinks 12:00, the house keeps its one amber light, the line prints: The internet went down. Nobody noticed.

Unresolved: exact benefit copy wording; whether the Big-tech mode toggle ships as a second key or a mode switch on the same deck.

## Direction contract

THESIS: Lantern is the display that never blinks 12:00. The page is a vacuum-fluorescent hi-fi deck face: every state is lit or unlit, absence is designed. It refuses the category's dark gradient hero with a glowing render and a row of three glass cards.

OWN-WORLD: Ground is deep blue-black with layered depth (#070B14 panel, #0E1830 recess, brushed dark bezels), never flat black. Lit segments in VFD cyan #5FD3F3 with soft phosphor bloom; ghost cells #163340 drawn wherever a segment could light. One amber #F5A623 exists only for the lantern moment (the house light that holds). Thread traffic is a second cool hue, soft violet #B48CFF; Wi-Fi is cyan. Display type is a true 14-segment face (DSEG14), used for headlines, numbers, and readouts; prose is Barlow at full contrast (#DCEFF5); small labels are Martian Mono, uppercase, tabular. Controls are deck keys: rectangular, bezelled, lit when active. Rules are 1px recessed hairlines. No kickers above headings, no equal icon cards.

STORY: The visitor reads the hook in segments, sees two displays side by side (a cloud home blinking 12:00, a Lantern home steady), understands the problem as four readouts, presses CUT INTERNET on the 3D house and watches it keep running, scans six benefits as deck rows with their own readouts, follows the signal chain in the architecture panel, and leaves on the closing line.

FIRST VIEWPORT: Full-bleed deck face. Top bezel: LANTERN in segments left, three silkscreen nav labels right. Main display window spans the width: left two-thirds carry the hook in 14-segment cyan on two lines, "THE INTERNET WENT DOWN." / "NOBODY NOTICED." with ghost cells visible, under it a two-line Barlow subline and the two deck keys, SEE HOW IT WORKS lit as primary. Right third is a split readout: NEIGHBOURS' HOME with 12:00 blinking and dashes for every status, LANTERN HOME with a steady clock, LIGHTS ON, AIR GOOD, a small amber lantern glyph. Bottom bezel: a hairline and the signal-chain labels as a ticker of what is connected.

FORM: The seven-segment display family rendered as vintage VFD, user-pinned from the first hand's competitive challenger with a stated material translation (LED red to VFD cyan, amber reserved for the lantern). Position: not on the grounded list; pinned over roll. seed:ee3f555086352fcc

SIGNATURE INTERACTION AND MOTION: CUT INTERNET is a deck key. On press the outside link's segments die one by one over 600ms, the cloud dims to ghost cells, the neighbour display starts blinking 12:00, inside packets keep flowing, the house's amber light rises, and the one-liner prints glyph by glyph. Big-tech mode is a hard flip: same key press freezes every packet and dims the house. All motion is segment swap or exponential ease-out; slow camera orbit is the only continuous motion and stops under reduced motion.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
