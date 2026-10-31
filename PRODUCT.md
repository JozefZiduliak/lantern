# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Static site on GitHub Pages: plain HTML, CSS, JavaScript. No server, no backend. Three.js (CDN or bundled) is required for the 3D centerpiece. A build step (e.g. Vite) is permitted only if it emits static files and ships a GitHub Actions workflow or a `docs/` folder setup for Pages; otherwise no build step at all. Single page, scroll-based story.

## Users

Primary: privacy-minded households, families, and people tired of vendor lock-in, subscriptions, and devices that die when a company's servers shut down. They arrive cold, need the pitch in seconds ("your home, your data, your rules"), want to see why it matters, and want to understand how it works without reading an architecture doc.

Secondary: tinkerers and Home Assistant users. They get a short "how it works" section for the curious, not a deep technical track.

Course evaluators also view the page. It must read as a real product launch page, never as a school report.

## Product Purpose

Lantern is a self-hosted smart home platform: Home Assistant on Raspberry Pis, a Synology NAS for storage and backups, and Matter, Thread, and Wi-Fi devices from any vendor, all running locally inside the house with no big-tech cloud in the loop.

The page is a product-style landing page for a university course project (course name: SMVIT). Lantern is a concept product, not for sale. Success: a visitor instantly gets the pitch, feels why local-first matters, understands the mechanism through the interactive 3D house, and leaves convinced.

## Positioning

Against Google Home, Amazon Alexa, Apple Home, and SmartThings, which route the home through their cloud and their ecosystem. Lantern runs entirely on hardware you own, inside your house. Claims a big-tech platform cannot truthfully make:

- Works when the internet goes down: automations and local devices keep running.
- Your data never leaves the house: no vendor cloud sees sensors, cameras, or habits.
- No lock-in: open standards (Matter, Thread) plus integrations for any vendor; four different vendor ecosystems currently unified in one place.
- Remote access only through your own VPN. Nothing exposed to the internet, no vendor relay.
- Backups on your own NAS, no subscriptions, built on cheap reusable hardware (Raspberry Pis).

Emotional hook: "The internet went down. Nobody noticed." Based on a real event (a family did not notice an outage because the home kept working on its own). Use as a one-liner woven into the story, never as a testimonial.

## Operating Context

The real, running architecture the page explains:

- Mini rack: router, switch, Raspberry Pi running Home Assistant, NAS.
- Devices in rooms: Matter-over-Thread air quality sensor, Wi-Fi smart plugs, TV, printer, camera; NAS monitoring.
- Traffic paths: Wi-Fi devices to router to switch to Home Assistant; Thread sensor via mesh hops to border router to Home Assistant; Home Assistant to NAS for backups; phone outside the house through a VPN tunnel to the inside; one link from the house out to "the Internet".
- Cut the internet: the outside link breaks, inside traffic keeps flowing, the house keeps working.
- Contrast: a cloud-dependent home sends every packet to the cloud and back, so cutting the internet freezes it.

## Capabilities and Constraints

Required on the page:

- Interactive 3D scene (Three.js) as the centerpiece: cutaway isometric low-poly house with walls removed so the inside is visible; the rack in one corner; devices in rooms; packets as small glowing particles on the real paths above, with Thread traffic visibly distinct from Wi-Fi; a distant cloud for the Internet. Hover or tap on any component shows a short label with its role and protocol.
- "Cut the internet" control: outside link breaks, cloud goes dark, inside traffic keeps flowing, house keeps glowing, the one-liner appears. Optional "Big-tech mode" toggle for the contrast case.
- Readability over spectacle: few components, clear motion, no particle storm. Slow camera orbit; user can rotate and zoom.
- Fast load: low-poly, no heavy assets. Works on mobile. Respects `prefers-reduced-motion`. Static fallback when WebGL is unavailable. Accessible controls.
- Plain language, benefits first. Technical terms (Matter, Thread, VPN, Home Assistant) explained on hover or tap. Short "how it works" section.
- Calls to action fit a concept product: "See how it works", "Explore the house". No buy, pricing, or sign-up buttons.

Hard constraints:

- Honest claims only. No fake stats, testimonials, user counts, pricing, or availability.
- Never show sensitive details: IPs, hostnames, ports, network names, VPN or router configuration, location.
- Illustrations must read as illustrative, never as photos of the real setup.

Terminology: Lantern (product), Home Assistant, Raspberry Pi, NAS, Matter, Thread, border router, VPN, "Cut the internet", "Big-tech mode".

## Brand Commitments

- Name: Lantern. Meaning: when everything around goes dark, your home keeps shining. Chosen from Hearth, Keep, Lantern, Holdfast.
- Tagline direction: "Your home, your data, your rules."
- Voice: real consumer product launch. Plain, confident, benefits first, emotional hook up front. Not a school report, not a spec sheet.
- No logo, legal text, or existing copy to preserve.

## Evidence on Hand

- Real, running setup exists (Matter-over-Thread air quality sensor, Wi-Fi smart plugs, TV, printer, camera, NAS monitoring; four vendor ecosystems unified). Name these device types as text where they add credibility.
- The outage story is real and may be told as a one-liner, not attributed to a named person.
- No photos, screenshots, logos, or dashboards exist. All visuals are created: the 3D scene, stylized SVG icons of components (Raspberry Pi, NAS, router, switch, sensors), and optionally a stylized Home Assistant-like dashboard mock. No empty photo slots.
- Nothing to fabricate: no customers, numbers, press, pricing.

## Product Principles

1. Local first is the product. Every section should trace back to "runs in your house, works without the cloud".
2. Show the mechanism, do not assert it. The 3D house and the cut-the-internet moment carry the argument.
3. Household before tinkerer. Lead with benefits; technical depth is one tap away, never in the way.
4. Honest to a fault. Real devices, real story, no invented proof, no fake commerce.
5. Readable motion. Few elements, clear paths, calm camera; the story must survive reduced motion and no WebGL.

## Accessibility & Inclusion

- `prefers-reduced-motion` honored: no autoplay orbit or particle motion; static or stepped states instead.
- WebGL unavailable: static fallback that still tells the cut-the-internet story.
- 3D controls and the "Cut the internet" toggle keyboard-operable with visible focus; component labels available without hover.
- Works on mobile at phone width.
