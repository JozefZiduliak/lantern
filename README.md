# Lantern

A smart home that keeps working when the internet goes down.

## What it is

Lantern is a self-hosted smart home: Home Assistant on a Raspberry Pi, backups on your own NAS, and Matter, Thread and Wi-Fi devices from any vendor, all running inside the house. No big-tech cloud, no subscriptions, no lock-in.

This repo is the product page. Its centrepiece is an interactive 3D cutaway house with a "Cut the internet" key, so you can watch what keeps running when the cloud disappears.

## Live

https://jozefziduliak.github.io/lantern/

To publish: Settings → Pages → Deploy from a branch → `main`, folder `/ (root)`.

## Run locally

```sh
python3 -m http.server 8080
```

Open http://localhost:8080/ . Opening `index.html` straight from disk will not load the 3D scene.

## Tech

- Plain HTML, CSS and JavaScript, no build step
- Three.js from a CDN for the 3D house
- Self-hosted fonts: DSEG (segment display), Barlow, Martian Mono
- Works without WebGL (static diagram) and respects reduced motion

## Course context

SMVIT course project. Lantern is a concept product built around a real home network, not something you can buy.
