// The Lantern house: a low-poly cutaway drawn the way a VFD would draw it.
// Dark fills, lit edges, packets as small glowing points on real paths.

import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const C = {
  bg: 0x0b1322,
  fill: 0x0e1830,
  fillDark: 0x0a1120,
  edge: 0x2f6b7f,
  edgeHi: 0x5fd3f3,
  ghost: 0x163340,
  cyan: 0x5fd3f3,
  cyanHi: 0xbff3ff,
  violet: 0xb48cff,
  amber: 0xf5a623,
  ground: 0x101c33,
};

export async function createScene(canvas, { reduceMotion = false, onHover = () => {} } = {}) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "low-power" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
  camera.position.set(11.5, 9.5, 12);

  const controls = new OrbitControls(camera, canvas);
  controls.target.set(-0.7, 1.5, -0.4);
  controls.enableDamping = true;
  controls.dampingFactor = 0.06;
  controls.enablePan = false;
  controls.minDistance = 10;
  controls.maxDistance = 26;
  controls.maxPolarAngle = Math.PI * 0.46;
  controls.minPolarAngle = Math.PI * 0.18;
  controls.autoRotate = !reduceMotion;
  controls.autoRotateSpeed = 0.35;
  controls.update();

  // Lights: cool ambient, one directional from the cloud side, and the lantern.
  scene.add(new THREE.AmbientLight(0x6f8fc0, 0.9));
  const sun = new THREE.DirectionalLight(0x9fd8ff, 1.1);
  sun.position.set(-6, 10, 4);
  scene.add(sun);
  const lantern = new THREE.PointLight(C.amber, 1.4, 9, 1.6);
  lantern.position.set(1.9, 1.3, 1.4);
  scene.add(lantern);

  // Materials
  const matFill = new THREE.MeshStandardMaterial({ color: C.fill, roughness: 0.95, metalness: 0.05, flatShading: true });
  const matFloor = new THREE.MeshStandardMaterial({ color: C.fillDark, roughness: 1, flatShading: true });
  const matEdge = new THREE.LineBasicMaterial({ color: C.edge, transparent: true, opacity: 0.9 });
  const matEdgeHi = new THREE.LineBasicMaterial({ color: C.edgeHi });
  const matGhost = new THREE.LineBasicMaterial({ color: C.ghost });

  const root = new THREE.Group();
  scene.add(root);

  function box(w, h, d, { x = 0, y = 0, z = 0, fill = matFill, edge = matEdge } = {}) {
    const g = new THREE.BoxGeometry(w, h, d);
    const m = new THREE.Mesh(g, fill);
    m.position.set(x, y + h / 2, z);
    const e = new THREE.LineSegments(new THREE.EdgesGeometry(g), edge);
    m.add(e);
    return m;
  }

  // Ground plate with a faint grid
  const ground = new THREE.Mesh(new THREE.BoxGeometry(14, 0.12, 11), new THREE.MeshStandardMaterial({ color: C.ground, roughness: 1 }));
  ground.position.y = -0.06;
  root.add(ground);
  const grid = new THREE.GridHelper(14, 14, C.ghost, C.ghost);
  grid.position.y = 0.001;
  grid.material.transparent = true;
  grid.material.opacity = 0.5;
  root.add(grid);

  // House footprint: 7 x 5. Back wall at z=-2.5, left wall at x=-3.5.
  const W = 7, D = 5, H = 2.5, T = 0.14;
  const floor = box(W, 0.12, D, { fill: matFloor });
  root.add(floor);
  root.add(box(W, H, T, { z: -D / 2 + T / 2 }));          // back wall
  root.add(box(T, H, D, { x: -W / 2 + T / 2 }));          // left wall
  root.add(box(W, 0.45, T, { z: D / 2 - T / 2 }));         // front stub (cutaway)
  root.add(box(T, 0.45, D, { x: W / 2 - T / 2 }));         // right stub (cutaway)
  root.add(box(T, 0.9, D - 1.6, { x: -0.3, z: -0.8 }));    // partition, cut low

  // Roof as lit edges only: the house reads as a house, the inside stays visible.
  const roofPts = [
    [-W / 2 - 0.3, H, -D / 2 - 0.3], [W / 2 + 0.3, H, -D / 2 - 0.3],
    [W / 2 + 0.3, H, -D / 2 - 0.3], [0 + 0.0, H + 1.6, -D / 2 - 0.3],
    [0, H + 1.6, -D / 2 - 0.3], [-W / 2 - 0.3, H, -D / 2 - 0.3],
    [-W / 2 - 0.3, H, -D / 2 - 0.3], [-W / 2 - 0.3, H, D / 2 + 0.3],
    [0, H + 1.6, -D / 2 - 0.3], [0, H + 1.6, D / 2 + 0.3],
    [W / 2 + 0.3, H, -D / 2 - 0.3], [W / 2 + 0.3, H, D / 2 + 0.3],
    [-W / 2 - 0.3, H, D / 2 + 0.3], [0, H + 1.6, D / 2 + 0.3],
    [0, H + 1.6, D / 2 + 0.3], [W / 2 + 0.3, H, D / 2 + 0.3],
  ];
  const roofGeo = new THREE.BufferGeometry().setFromPoints(roofPts.map((p) => new THREE.Vector3(...p)));
  root.add(new THREE.LineSegments(roofGeo, matGhost));

  // Devices. Each gets a mesh, a status LED, and a position for packets.
  const parts = {};
  function device(id, w, h, d, pos, { led = C.cyan, ledSize = 0.07 } = {}) {
    const m = box(w, h, d, { x: pos[0], y: pos[1], z: pos[2], edge: matEdgeHi });
    m.userData.id = id;
    const ledMat = new THREE.MeshBasicMaterial({ color: led });
    const l = new THREE.Mesh(new THREE.BoxGeometry(ledSize, ledSize, ledSize), ledMat);
    l.position.set(w / 2 - 0.12, 0, d / 2 + 0.01);
    m.add(l);
    m.userData.led = ledMat;
    m.userData.ledColor = led;
    root.add(m);
    parts[id] = m;
    return m;
  }

  // Rack in the back-left corner
  const rx = -2.7, rz = -1.7;
  device("router", 1.0, 0.22, 0.6, [rx, 0.12, rz]);
  device("switch", 1.0, 0.18, 0.6, [rx, 0.42, rz]);
  device("pi", 0.5, 0.16, 0.42, [rx - 0.2, 0.68, rz + 0.05]);
  device("nas", 0.9, 0.9, 0.7, [rx + 1.4, 0.12, rz]);

  // Thread radio on the Pi: a tiny antenna post
  const ant = box(0.05, 0.5, 0.05, { x: rx + 0.1, y: 0.84, z: rz + 0.05, edge: new THREE.LineBasicMaterial({ color: C.violet }) });
  root.add(ant);

  // Living room (right half): TV on the back wall, plug near the right, lamp on the plug
  device("tv", 1.6, 0.9, 0.08, [1.6, 0.9, -2.3]);
  device("plug", 0.22, 0.22, 0.14, [2.6, 0.5, -2.3]);
  const lampPost = box(0.08, 1.0, 0.08, { x: 1.9, y: 0.12, z: 1.4 });
  root.add(lampPost);
  const lampShadeMat = new THREE.MeshBasicMaterial({ color: C.amber });
  const lampShade = new THREE.Mesh(new THREE.ConeGeometry(0.36, 0.42, 6, 1, true), lampShadeMat);
  lampShade.position.set(1.9, 1.3, 1.4);
  lampShade.userData.id = "lamp";
  root.add(lampShade);
  parts.lamp = lampShade;
  const lampGlowMat = new THREE.MeshBasicMaterial({ color: C.amber, transparent: true, opacity: 0.18 });
  const lampGlow = new THREE.Mesh(new THREE.SphereGeometry(0.75, 10, 8), lampGlowMat);
  lampGlow.position.copy(lampShade.position);
  root.add(lampGlow);

  // Bedroom (left front): air sensor on a shelf
  const shelf = box(0.9, 0.06, 0.3, { x: -2.2, y: 1.1, z: 1.6 });
  root.add(shelf);
  device("sensor", 0.26, 0.26, 0.2, [-2.2, 1.16, 1.6], { led: C.violet });

  // Camera on the front-right corner, outside the stub wall
  device("camera", 0.26, 0.2, 0.3, [3.2, 2.0, 2.3]);

  // Phone outside the house, on the ground to the right
  device("phone", 0.3, 0.6, 0.05, [4.6, 0.0, -0.9], { led: C.cyanHi, ledSize: 0.05 });

  // The internet: a far cloud of low-poly lumps, drawn in edges
  const cloud = new THREE.Group();
  const cloudEdge = new THREE.LineBasicMaterial({ color: C.edge });
  const lumps = [
    [0, 0, 0, 1.1], [1.2, 0.3, 0.2, 0.9], [-1.1, 0.2, 0.1, 0.8], [0.4, 0.8, -0.2, 0.8], [-0.3, 0.75, 0.3, 0.7],
  ];
  lumps.forEach(([x, y, z, r]) => {
    const g = new THREE.IcosahedronGeometry(r, 0);
    const m = new THREE.Mesh(g, new THREE.MeshStandardMaterial({ color: C.fill, roughness: 1, flatShading: true }));
    m.position.set(x, y, z);
    m.add(new THREE.LineSegments(new THREE.EdgesGeometry(g), cloudEdge));
    m.userData.id = "cloud";
    cloud.add(m);
  });
  cloud.position.set(-5.4, 2.9, -2.9);
  cloud.scale.setScalar(0.8);
  root.add(cloud);
  parts.cloud = cloud;

  // Paths. Points are world positions; packets travel along them.
  const P = {
    router: new THREE.Vector3(rx, 0.25, rz + 0.35),
    switch: new THREE.Vector3(rx, 0.52, rz + 0.35),
    pi: new THREE.Vector3(rx - 0.2, 0.78, rz + 0.3),
    nas: new THREE.Vector3(rx + 1.4, 0.6, rz + 0.4),
    tv: new THREE.Vector3(1.6, 1.35, -2.2),
    plug: new THREE.Vector3(2.6, 0.6, -2.2),
    sensor: new THREE.Vector3(-2.2, 1.3, 1.6),
    camera: new THREE.Vector3(3.2, 2.1, 2.3),
    phone: new THREE.Vector3(4.6, 0.4, -0.9),
    cloud: new THREE.Vector3(-5.0, 2.6, -2.6),
    wallOut: new THREE.Vector3(-3.6, 1.2, -2.0),
    threadHop: new THREE.Vector3(-1.2, 1.0, 0.2),
  };

  const matCyan = new THREE.MeshBasicMaterial({ color: C.cyan });
  const matViolet = new THREE.MeshBasicMaterial({ color: C.violet });
  const matWhite = new THREE.MeshBasicMaterial({ color: C.cyanHi });
  const packetGeo = new THREE.SphereGeometry(0.07, 6, 5);

  function curve(points) {
    return new THREE.CatmullRomCurve3(points, false, "catmullrom", 0.2);
  }

  const routes = {
    local: [
      { pts: [P.tv, P.router, P.switch, P.pi], mat: matCyan, n: 2, speed: 0.16 },
      { pts: [P.plug, P.router, P.switch, P.pi], mat: matCyan, n: 2, speed: 0.14 },
      { pts: [P.camera, P.router, P.switch, P.pi], mat: matCyan, n: 2, speed: 0.18 },
      { pts: [P.sensor, P.threadHop, P.pi], mat: matViolet, n: 2, speed: 0.12 },
      { pts: [P.pi, P.nas], mat: matCyan, n: 1, speed: 0.08 },
    ],
    vpn: [{ pts: [P.phone, new THREE.Vector3(3.9, 0.9, 0.2), P.router, P.switch, P.pi], mat: matWhite, n: 1, speed: 0.1, needsInternet: true }],
    internet: [{ pts: [P.router, P.wallOut, P.cloud], mat: matCyan, n: 1, speed: 0.06, needsInternet: true }],
    bigtech: [
      { pts: [P.tv, P.router, P.wallOut, P.cloud, P.wallOut, P.router, P.switch, P.pi], mat: matCyan, n: 2, speed: 0.1, needsInternet: true, freezes: true },
      { pts: [P.plug, P.router, P.wallOut, P.cloud, P.wallOut, P.router, P.switch, P.pi], mat: matCyan, n: 2, speed: 0.09, needsInternet: true, freezes: true },
      { pts: [P.camera, P.router, P.wallOut, P.cloud, P.wallOut, P.router, P.switch, P.pi], mat: matCyan, n: 2, speed: 0.11, needsInternet: true, freezes: true },
      { pts: [P.sensor, P.threadHop, P.pi, P.switch, P.router, P.wallOut, P.cloud, P.wallOut, P.router, P.switch, P.pi], mat: matViolet, n: 2, speed: 0.08, needsInternet: true, freezes: true },
    ],
  };

  // Static route lines (thin, ghosted) so the paths read even without motion.
  const routeLines = [];
  function drawRoute(r, color, dashed = false) {
    const c = curve(r.pts);
    const pts = c.getPoints(40);
    const g = new THREE.BufferGeometry().setFromPoints(pts);
    const m = dashed
      ? new THREE.LineDashedMaterial({ color, dashSize: 0.18, gapSize: 0.14, transparent: true, opacity: 0.6 })
      : new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.35 });
    const line = new THREE.Line(g, m);
    if (dashed) line.computeLineDistances();
    root.add(line);
    routeLines.push({ line, r });
    return line;
  }
  routes.local.forEach((r) => drawRoute(r, r.mat === matViolet ? C.violet : C.edge));
  const vpnLine = drawRoute(routes.vpn[0], C.cyanHi, true);
  const internetLine = drawRoute(routes.internet[0], C.cyan);
  internetLine.material.opacity = 0.7;

  // Packets
  const packets = [];
  function spawnPackets(list, groupName) {
    list.forEach((r) => {
      const c = curve(r.pts);
      for (let i = 0; i < r.n; i++) {
        const mesh = new THREE.Mesh(packetGeo, r.mat);
        mesh.visible = false;
        root.add(mesh);
        packets.push({ mesh, curve: c, t: i / r.n, speed: r.speed, group: groupName, route: r });
      }
    });
  }
  spawnPackets(routes.local, "local");
  spawnPackets(routes.vpn, "vpn");
  spawnPackets(routes.internet, "internet");
  spawnPackets(routes.bigtech, "bigtech");

  // State
  const st = { cut: false, mode: "lantern", frozen: false };
  let lanternTarget = 1.4;
  let cloudTarget = 1;
  let cloudDim = 1;

  function setState({ cut, mode }) {
    st.cut = cut;
    st.mode = mode;
    st.frozen = cut && mode === "bigtech";
    const dark = st.frozen;

    // Which packets exist
    packets.forEach((p) => {
      const isLocal = p.group === "local";
      const isBig = p.group === "bigtech";
      if (mode === "lantern") {
        if (isBig) p.mesh.visible = false;
        else if (isLocal) p.mesh.visible = true;
        else p.mesh.visible = !cut; // vpn + internet need the link
      } else {
        if (isLocal) p.mesh.visible = false;
        else if (isBig) p.mesh.visible = true; // frozen in place when cut
        else p.mesh.visible = !cut;
      }
    });

    // Internet link and cloud
    internetLine.material.color.set(cut ? C.ghost : C.cyan);
    internetLine.material.opacity = cut ? 0.5 : 0.7;
    vpnLine.material.opacity = cut ? 0.15 : 0.6;
    cloudTarget = cut ? 0.25 : 1;

    // The lantern
    lanternTarget = dark ? 0 : cut ? 2.6 : 1.4;
    lampShadeMat.color.set(dark ? 0x1a2230 : C.amber);
    lampGlowMat.opacity = dark ? 0 : cut ? 0.3 : 0.18;

    // Device LEDs
    Object.values(parts).forEach((m) => {
      if (m.userData.led) m.userData.led.color.set(dark ? C.ghost : m.userData.ledColor);
    });
    if (reduceMotion) {
      lantern.intensity = lanternTarget;
      cloudDim = cloudTarget;
      applyCloud();
    }
  }

  function applyCloud() {
    cloud.children.forEach((m) => {
      m.material.color.set(C.fill).lerp(new THREE.Color(0x060a12), 1 - cloudDim);
      m.children[0].material.color.set(C.ghost).lerp(new THREE.Color(C.edge), cloudDim);
    });
  }

  // Persistent labels so a cold visitor reads the scene before interacting
  const labelHost = canvas.parentElement.querySelector("#slabels");
  const labels = [
    { anchor: new THREE.Vector3(rx + 0.6, 1.25, rz), text: "RACK · ROUTER · SWITCH · PI · NAS", cls: "" },
    { anchor: new THREE.Vector3(1.9, 1.75, 1.4), text: "THE LANTERN", cls: "is-amber" },
    { anchor: new THREE.Vector3(-5.0, 3.7, -2.6), text: "THE INTERNET", cls: "", dimsWhenCut: true },
    { anchor: new THREE.Vector3(4.6, 0.95, -0.9), text: "PHONE · VPN", cls: "" },
  ].map((l) => {
    const el = document.createElement("span");
    el.className = `slabel label ${l.cls}`;
    el.textContent = l.text;
    if (labelHost) labelHost.appendChild(el);
    return { ...l, el };
  });
  const tmp = new THREE.Vector3();
  function placeLabels() {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    labels.forEach((l) => {
      tmp.copy(l.anchor).project(camera);
      const behind = tmp.z > 1;
      const px = ((tmp.x + 1) / 2) * w;
      const py = ((1 - tmp.y) / 2) * h;
      l.el.style.left = `${px}px`;
      l.el.style.top = `${py}px`;
      // keep labels out of the printed-line strip and off the frame edges
      const hidden = behind || py > h - 64 || px < 40 || px > w - 40;
      l.el.style.visibility = hidden ? "hidden" : "visible";
      if (l.text === "THE LANTERN") l.el.classList.toggle("is-dim", st.frozen);
      if (l.dimsWhenCut) l.el.classList.toggle("is-dim", st.cut);
    });
  }

  // Hover + highlight
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2(-2, -2);
  const pickable = Object.values(parts).flatMap((m) => (m.isGroup ? m.children : [m]));
  let hovered = null;
  let highlighted = null;
  let pointerInside = false;

  function toScreen(obj) {
    const v = new THREE.Vector3();
    if (obj.isGroup) obj.getWorldPosition(v);
    else {
      obj.getWorldPosition(v);
      v.y += (obj.geometry?.parameters?.height || 0.3) * 0.6;
    }
    v.project(camera);
    return { x: ((v.x + 1) / 2) * canvas.clientWidth, y: ((1 - v.y) / 2) * canvas.clientHeight };
  }

  function setHighlight(id) {
    if (highlighted && parts[highlighted]) {
      scaleObj(parts[highlighted], 1);
    }
    highlighted = id;
    if (id && parts[id]) scaleObj(parts[id], 1.12);
  }
  function scaleObj(obj, s) {
    obj.scale.setScalar(s);
  }

  function highlight(id) {
    setHighlight(id);
    if (!id) return { x: 0, y: 0 };
    return toScreen(parts[id]);
  }

  canvas.addEventListener("pointermove", (e) => {
    const r = canvas.getBoundingClientRect();
    pointer.x = ((e.clientX - r.left) / r.width) * 2 - 1;
    pointer.y = -((e.clientY - r.top) / r.height) * 2 + 1;
    pointerInside = true;
  });
  canvas.addEventListener("pointerleave", () => {
    pointerInside = false;
    pointer.set(-2, -2);
  });
  canvas.addEventListener("pointerdown", (e) => {
    // tap on touch: pick immediately
    const r = canvas.getBoundingClientRect();
    pointer.x = ((e.clientX - r.left) / r.width) * 2 - 1;
    pointer.y = -((e.clientY - r.top) / r.height) * 2 + 1;
    pointerInside = true;
    pick(true);
  });

  function pick(force = false) {
    if (!pointerInside) return;
    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObjects(pickable, false);
    const id = hits.length ? hits[0].object.userData.id : null;
    if (id !== hovered || force) {
      hovered = id;
      if (id) {
        setHighlight(id);
        const pos = toScreen(parts[id]);
        onHover(id, pos.x, pos.y);
        canvas.style.cursor = "pointer";
      } else {
        setHighlight(null);
        onHover(null);
        canvas.style.cursor = "";
      }
    }
  }

  // Resize
  function resize() {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    if (w === 0 || h === 0) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    // Pull back on narrow screens so the house fits
    const want = w < 600 ? 20 : w < 900 ? 16.5 : 14.5;
    const dir = camera.position.clone().sub(controls.target).normalize();
    camera.position.copy(controls.target).add(dir.multiplyScalar(want));
  }
  resize();
  window.addEventListener("resize", resize);

  // Render loop, paused when offscreen
  let running = true;
  const io = new IntersectionObserver((entries) => {
    running = entries.some((e) => e.isIntersecting);
    if (running) requestAnimationFrame(frame);
  }, { threshold: 0.05 });
  io.observe(canvas);

  const clock = new THREE.Clock();
  let flicker = 0;

  function frame() {
    if (!running) return;
    const dt = Math.min(clock.getDelta(), 0.05);

    if (!reduceMotion) {
      packets.forEach((p) => {
        if (!p.mesh.visible) return;
        if (st.frozen && p.group === "bigtech") return;
        p.t = (p.t + dt * p.speed) % 1;
        p.curve.getPointAt(p.t, p.mesh.position);
      });
      // Lantern and cloud ease toward targets
      lantern.intensity += (lanternTarget - lantern.intensity) * Math.min(1, dt * 4);
      cloudDim += (cloudTarget - cloudDim) * Math.min(1, dt * 3);
      applyCloud();
      // Phosphor flicker on the lantern: subtle, slow
      flicker += dt;
      lampGlow.scale.setScalar(1 + Math.sin(flicker * 2.1) * 0.03);
    } else {
      packets.forEach((p) => {
        if (!p.mesh.visible) return;
        p.curve.getPointAt(p.t, p.mesh.position);
      });
    }

    pick();
    controls.update();
    renderer.render(scene, camera);
    placeLabels();
    requestAnimationFrame(frame);
  }
  // place packets once so a static frame still shows them
  packets.forEach((p) => p.curve.getPointAt(p.t, p.mesh.position));
  setState({ cut: false, mode: "lantern" });
  requestAnimationFrame(frame);

  // Keyboard: arrow keys orbit when the canvas has focus
  canvas.addEventListener("keydown", (e) => {
    const step = 0.15;
    if (e.key === "ArrowLeft") { rotate(-step); e.preventDefault(); }
    if (e.key === "ArrowRight") { rotate(step); e.preventDefault(); }
    if (e.key === "+" || e.key === "=") { zoom(0.9); e.preventDefault(); }
    if (e.key === "-") { zoom(1.1); e.preventDefault(); }
  });
  function rotate(a) {
    const off = camera.position.clone().sub(controls.target);
    off.applyAxisAngle(new THREE.Vector3(0, 1, 0), a);
    camera.position.copy(controls.target).add(off);
  }
  function zoom(f) {
    const off = camera.position.clone().sub(controls.target);
    const len = THREE.MathUtils.clamp(off.length() * f, controls.minDistance, controls.maxDistance);
    camera.position.copy(controls.target).add(off.normalize().multiplyScalar(len));
  }

  return { setState, highlight };
}
