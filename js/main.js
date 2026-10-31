// Lantern page behaviour: segment displays, the clock, the deck keys, and the
// bridge to the 3D house. No framework, no build step.

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

// ---------------------------------------------------------------------------
// Segment displays. DSEG draws "~" as every segment lit and "!" as every
// segment unlit. Each display gets a ghost layer of "~" under the lit text so
// the unlit cells stay visible, the way a real VFD shows its mask.

function escapeHtml(s) {
  return s.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[c]);
}

function segify(el) {
  const raw = el.dataset.text ?? el.textContent.trim();
  el.dataset.text = raw;
  if (!el.hasAttribute("aria-label")) el.setAttribute("aria-label", raw);
  const lit = raw.replace(/ /g, "!");
  // Period is zero-width and colon is narrow in DSEG: ghost them with
  // themselves so the mask stays aligned with the lit layer. DSEG14 draws
  // "~" as all-on; DSEG7 has no "~", its all-on glyph is "8".
  const allOn = el.classList.contains("seg-7") ? "8" : "~";
  const ghost = raw.replace(/[^.:]/g, allOn);
  el.innerHTML =
    `<span class="seg-ghost" aria-hidden="true">${ghost}</span>` +
    `<span class="seg-lit" aria-hidden="true">${escapeHtml(lit)}</span>`;
}

function setSegText(el, text, label = text) {
  el.dataset.text = text;
  el.setAttribute("aria-label", label);
  segify(el);
}

document.querySelectorAll("[data-seg]").forEach(segify);

// ---------------------------------------------------------------------------
// The Lantern clock: local time, colon ticking. Under reduced motion the colon
// holds steady.

const clock = document.getElementById("clock");
function tickClock() {
  const d = new Date();
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  const colon = reduceMotion.matches || d.getSeconds() % 2 === 0 ? ":" : " ";
  const text = `${hh}${colon}${mm}`;
  if (clock.dataset.text !== text) {
    clock.dataset.text = text;
    clock.setAttribute("aria-label", `${hh}:${mm}`);
    // DSEG's space is colon-width, so the digits hold still while the colon blinks.
    clock.querySelector(".seg-lit").textContent = text;
  }
}
tickClock();
setInterval(tickClock, 1000);

// ---------------------------------------------------------------------------
// Stage: the 3D house, its keys, and the printed line.

const stage = document.getElementById("stage");
const stageView = document.getElementById("stage-view");
const canvas = document.getElementById("house");
const stageLine = document.getElementById("stage-line");
const tooltip = document.getElementById("tooltip");
const cutKey = document.getElementById("cut");
const cutLabel = cutKey.lastChild;
const modeKeys = Array.from(document.querySelectorAll("[data-mode]"));
const partKeys = Array.from(document.querySelectorAll("[data-part]"));

const PARTS = {
  router: {
    name: "ROUTER",
    role: "The front door of the local network. Wi-Fi devices and the phone's VPN tunnel land here.",
    proto: "Wi-Fi · Ethernet · VPN endpoint",
  },
  switch: {
    name: "SWITCH",
    role: "Wired backbone between the router, the Pi and the NAS. Boring on purpose.",
    proto: "Ethernet",
  },
  pi: {
    name: "RASPBERRY PI",
    role: "Runs Home Assistant: the one dashboard and the automation engine for every device. Also hosts the Thread border router radio.",
    proto: "Home Assistant · Thread border router",
  },
  nas: {
    name: "NAS",
    role: "Where backups and the household's files live. Nothing here depends on a cloud account.",
    proto: "Ethernet · backups",
  },
  sensor: {
    name: "AIR SENSOR",
    role: "Air quality in the bedroom, reported over a low-power mesh radio straight to the Pi.",
    proto: "Matter over Thread",
  },
  plug: {
    name: "SMART PLUG",
    role: "Switches the lamp. Controlled over the local network, no vendor cloud in the loop.",
    proto: "Wi-Fi · local API",
  },
  lamp: {
    name: "THE LANTERN",
    role: "A plain lamp on a smart plug. It is the light that stays on when the internet goes away.",
    proto: "Power · via smart plug",
  },
  tv: {
    name: "TV",
    role: "Turned on, off and muted from the same dashboard as everything else.",
    proto: "Wi-Fi · local control",
  },
  camera: {
    name: "CAMERA",
    role: "Streams to the NAS and the dashboard inside the house. The footage never leaves.",
    proto: "Wi-Fi · local stream",
  },
  phone: {
    name: "PHONE, OUTSIDE",
    role: "Reaches the house only through a VPN tunnel you own. No port is open to the internet.",
    proto: "VPN tunnel",
  },
  cloud: {
    name: "THE INTERNET",
    role: "Optional. The house uses it for updates and your VPN, never to turn on a lamp.",
    proto: "One link, and you can cut it",
  },
};

const state = { cut: false, mode: "lantern", webgl: false };
let scene = null;

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(window.WebGLRenderingContext && (c.getContext("webgl2") || c.getContext("webgl")));
  } catch (e) {
    return false;
  }
}

// Printed line under the house: glyph by glyph, like a display warming up.
let printTimer = 0;
function printLine(text, { amber = false, off = false } = {}) {
  clearTimeout(printTimer);
  stageLine.classList.toggle("is-amber", amber);
  stageLine.classList.toggle("is-off", off);
  if (reduceMotion.matches) {
    setSegText(stageLine, text);
    return;
  }
  setSegText(stageLine, " ".repeat(text.length), text);
  const lit = stageLine.querySelector(".seg-lit");
  let i = 0;
  const step = () => {
    i += 1;
    lit.textContent = text.slice(0, i).padEnd(text.length, " ").replace(/ /g, "!");
    if (i < text.length) printTimer = setTimeout(step, 26);
    else stageLine.dataset.text = text;
  };
  step();
}

function lineFor() {
  if (!state.cut) {
    return state.mode === "lantern"
      ? { text: "INTERNET: CONNECTED. HOUSE: LOCAL." }
      : { text: "INTERNET: CONNECTED. HOUSE: VIA CLOUD." };
  }
  return state.mode === "lantern"
    ? { text: "THE INTERNET WENT DOWN. NOBODY NOTICED.", amber: true }
    : { text: "12:00  12:00  12:00  WAITING FOR THE CLOUD", off: true };
}

function applyState() {
  cutKey.setAttribute("aria-pressed", String(state.cut));
  cutLabel.textContent = state.cut ? "Restore the internet" : "Cut the internet";
  modeKeys.forEach((k) => k.setAttribute("aria-pressed", String(k.dataset.mode === state.mode)));
  const l = lineFor();
  printLine(l.text, l);
  if (scene) scene.setState({ cut: state.cut, mode: state.mode });
  updateFallback();
}

cutKey.addEventListener("click", () => {
  state.cut = !state.cut;
  applyState();
});

modeKeys.forEach((k) =>
  k.addEventListener("click", () => {
    if (state.mode === k.dataset.mode) return;
    state.mode = k.dataset.mode;
    applyState();
  })
);

// Tooltip: shown from a hover in the scene or from a part key.
let activePart = null;
let pinnedPart = null;

function showTooltip(partId, x, y) {
  const p = PARTS[partId];
  if (!p) return hideTooltip();
  activePart = partId;
  tooltip.innerHTML =
    `<span class="seg" data-seg>${escapeHtml(p.name)}</span>` +
    `<p>${escapeHtml(p.role)}</p>` +
    `<span class="label">${escapeHtml(p.proto)}</span>`;
  tooltip.querySelectorAll("[data-seg]").forEach(segify);
  const w = stageView.clientWidth;
  const viewTop = stageView.getBoundingClientRect().top;
  const barClear = Math.max(0, 80 - viewTop); // sticky topbar covers this much of the view
  const below = y < barClear + 150;
  tooltip.classList.toggle("is-below", below);
  tooltip.style.left = `${Math.min(Math.max(x, 130), w - 130)}px`;
  tooltip.style.top = `${below ? Math.max(y, barClear + 8) : y}px`;
  tooltip.classList.add("is-on");
  partKeys.forEach((k) => k.setAttribute("aria-pressed", String(k.dataset.part === partId)));
}

function hideTooltip() {
  activePart = null;
  pinnedPart = null;
  tooltip.classList.remove("is-on");
  partKeys.forEach((k) => k.setAttribute("aria-pressed", "false"));
}

partKeys.forEach((k) =>
  k.addEventListener("click", () => {
    const id = k.dataset.part;
    if (pinnedPart === id) {
      hideTooltip();
      if (scene) scene.highlight(null);
      return;
    }
    pinnedPart = id;
    if (scene) {
      const pos = scene.highlight(id);
      showTooltip(id, pos.x, pos.y);
    } else {
      showTooltip(id, stageView.clientWidth / 2, stageView.clientHeight / 2);
    }
  })
);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && activePart) {
    hideTooltip();
    if (scene) scene.highlight(null);
  }
});

// Static fallback (no WebGL): toggle attributes on the SVG.
function updateFallback() {
  if (state.webgl) return;
  const link = document.getElementById("fb-link");
  const cloud = document.getElementById("fb-cloud");
  const lamp = document.getElementById("fb-lamp");
  if (!link) return;
  link.setAttribute("stroke", state.cut ? "#163340" : "#5fd3f3");
  link.setAttribute("stroke-dasharray", state.cut ? "6 6" : "0");
  cloud.setAttribute("opacity", state.cut ? "0.35" : "1");
  const dark = state.cut && state.mode === "bigtech";
  lamp.setAttribute("fill", dark ? "#1a2230" : "#f5a623");
}

function useFallback() {
  state.webgl = false;
  stage.classList.add("no-webgl");
  document.getElementById("fallback").setAttribute("aria-hidden", "false");
  applyState();
}

async function boot() {
  state.webgl = hasWebGL();
  if (!state.webgl) return useFallback();
  try {
    const mod = await import("./scene.js");
    scene = await mod.createScene(canvas, {
      reduceMotion: reduceMotion.matches,
      onHover: (id, x, y) => {
        if (id) showTooltip(id, x, y);
        else if (pinnedPart) {
          const pos = scene.highlight(pinnedPart);
          showTooltip(pinnedPart, pos.x, pos.y);
        } else hideTooltip();
      },
    });
    applyState();
  } catch (err) {
    console.error("3D scene failed to load, showing the static diagram.", err);
    useFallback();
  }
}

applyState();
boot();
