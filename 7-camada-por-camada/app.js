/* Habitat3D · Modelo 7 · Camada por Camada
   Three.js (peça procedural em camadas) + GSAP ScrollTrigger + Lenis.
   Só roda quando <html class="anim"> (WebGL ok e sem prefers-reduced-motion).
   Qualquer falha remove "anim" e a página cai no modo estático (cartões). */

const root = document.documentElement;
const $ = (s, c = document) => c.querySelector(s);
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp = (a, b, t) => a + (b - a) * t;
const range = (v, a, b) => clamp((v - a) / (b - a));
const smooth = (t) => t * t * (3 - 2 * t);
const easeOut = (t) => 1 - Math.pow(1 - t, 3);

function fallback(err) {
  console.warn('Modo estático:', err && err.message ? err.message : err);
  root.classList.remove('anim');
  root.classList.add('ready');
}

async function start() {
  if (!root.classList.contains('anim')) return;
  if (!window.gsap || !window.ScrollTrigger || !window.Lenis) throw new Error('bibliotecas indisponíveis');

  const THREE = await import('three');
  const { RoomEnvironment } = await import('three/addons/environments/RoomEnvironment.js');

  gsap.registerPlugin(ScrollTrigger);

  /* ---------- rolagem suave ---------- */
  const lenis = new Lenis({ lerp: 0.11 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      const el = id.length > 1 ? $(id) : null;
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el, { offset: id === '#topo' ? 0 : -56, duration: 1.6 });
    });
  });

  /* ---------- cena ---------- */
  const stage = $('.stage');
  const canvas = $('#gl');
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);

  scene.add(new THREE.HemisphereLight(0xffe9d6, 0x160c06, 0.55));
  const key = new THREE.DirectionalLight(0xfff0e0, 2.3);
  key.position.set(4, 7, 6);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xff6a2a, 3.2);
  rim.position.set(-6, 3, -5);
  scene.add(rim);

  const rig = new THREE.Group();
  scene.add(rig);

  /* chapa de impressão */
  const plate = new THREE.Group();
  rig.add(plate);
  const plateBody = new THREE.Mesh(
    new THREE.CylinderGeometry(2.25, 2.35, 0.14, 72),
    new THREE.MeshStandardMaterial({ color: 0x1d1612, roughness: 0.55, metalness: 0.7, envMapIntensity: 0.6 })
  );
  plateBody.position.y = -0.07;
  plate.add(plateBody);
  const edge = new THREE.Mesh(
    new THREE.TorusGeometry(2.27, 0.014, 8, 120),
    new THREE.MeshBasicMaterial({ color: 0xff5a1f })
  );
  edge.rotation.x = Math.PI / 2;
  plate.add(edge);
  [0.8, 1.5, 2.0].forEach((r) => {
    const ring = new THREE.Mesh(
      new THREE.RingGeometry(r - 0.008, r + 0.008, 96),
      new THREE.MeshBasicMaterial({ color: 0xff8a4a, transparent: true, opacity: 0.28, side: THREE.DoubleSide })
    );
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = 0.002;
    plate.add(ring);
  });

  /* peça: camadas instanciadas de um vaso canelado e torcido */
  const N = 140;
  const LH = 0.03; // altura da camada
  const B = 0.006; // chanfro
  const LOBES = 8;
  const SEG = 72;
  const outer = [], inner = [];
  for (let i = 0; i < SEG; i++) {
    const a = (i / SEG) * Math.PI * 2;
    const r = 1 + 0.085 * Math.cos(LOBES * a);
    outer.push(new THREE.Vector2(Math.cos(a) * r, Math.sin(a) * r));
    inner.push(new THREE.Vector2(Math.cos(a) * r * 0.9, Math.sin(a) * r * 0.9));
  }
  const shape = new THREE.Shape(outer);
  shape.holes.push(new THREE.Path(inner));
  const layerGeo = new THREE.ExtrudeGeometry(shape, {
    depth: LH - 2 * B, bevelEnabled: true, bevelThickness: B, bevelSize: B * 0.9, bevelSegments: 1, curveSegments: 1, steps: 1
  });
  layerGeo.rotateX(-Math.PI / 2);
  layerGeo.translate(0, B, 0);

  const pieceMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff, roughness: 0.58, metalness: 0.02, clearcoat: 0, clearcoatRoughness: 0.25, envMapIntensity: 0.9
  });
  const piece = new THREE.Group();
  rig.add(piece);
  const mesh = new THREE.InstancedMesh(layerGeo, pieceMat, N);
  mesh.frustumCulled = false;
  piece.add(mesh);

  const prof = (t) => 0.62 + 0.62 * Math.sin(Math.PI * Math.pow(t, 0.75)) * (1 - 0.35 * t);
  const R = new Float32Array(N), TW = new Float32Array(N);
  const dummy = new THREE.Object3D();
  const setLayer = (i, sy = 1) => {
    dummy.position.set(0, i * LH, 0);
    dummy.rotation.set(0, TW[i], 0);
    dummy.scale.set(R[i], sy, R[i]);
    dummy.updateMatrix();
    mesh.setMatrixAt(i, dummy.matrix);
  };
  const cPrintA = new THREE.Color('#ff4a0e'), cPrintB = new THREE.Color('#ffb04a');
  const cFinA = new THREE.Color('#f6ebdc'), cFinB = new THREE.Color('#e3c4a4');
  const tmp = new THREE.Color();
  for (let i = 0; i < N; i++) {
    const t = i / (N - 1);
    R[i] = prof(t);
    TW[i] = t * 1.5;
    setLayer(i);
  }
  let lastFin = -1;
  const setFinish = (f) => {
    if (Math.abs(f - lastFin) < 0.003) return;
    lastFin = f;
    for (let i = 0; i < N; i++) {
      const t = i / (N - 1);
      tmp.copy(cPrintA).lerp(cPrintB, t);
      const fin = new THREE.Color().copy(cFinA).lerp(cFinB, t);
      tmp.lerp(fin, f);
      mesh.setColorAt(i, tmp);
    }
    mesh.instanceColor.needsUpdate = true;
    pieceMat.roughness = lerp(0.58, 0.3, f);
    pieceMat.clearcoat = lerp(0, 0.7, f);
  };
  setFinish(0);
  mesh.count = 0;

  /* bico da impressora */
  const nozzle = new THREE.Group();
  rig.add(nozzle);
  const brass = new THREE.MeshStandardMaterial({ color: 0xc89a4a, roughness: 0.3, metalness: 0.95 });
  const cone = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.3, 28), brass);
  cone.rotation.x = Math.PI;
  cone.position.y = 0.15;
  nozzle.add(cone);
  const block = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.26, 0.36), new THREE.MeshStandardMaterial({ color: 0x8b9099, roughness: 0.4, metalness: 0.85 }));
  block.position.y = 0.43;
  nozzle.add(block);
  const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 7, 12), new THREE.MeshStandardMaterial({ color: 0x3a3430, roughness: 0.5, metalness: 0.6 }));
  arm.position.y = 4.0;
  nozzle.add(arm);
  const tip = new THREE.Mesh(new THREE.SphereGeometry(0.045, 12, 12), new THREE.MeshBasicMaterial({ color: 0xff7a2e }));
  tip.position.y = 0.01;
  nozzle.add(tip);
  const glow = new THREE.PointLight(0xff6a24, 4, 4.5, 2);
  glow.position.y = 0.25;
  nozzle.add(glow);

  /* carretel de filamento */
  const spool = new THREE.Group();
  rig.add(spool);
  const flangeMat = new THREE.MeshStandardMaterial({ color: 0xe9e1d3, roughness: 0.5, metalness: 0.05 });
  const wound = new THREE.Mesh(new THREE.CylinderGeometry(0.78, 0.78, 0.5, 64), new THREE.MeshStandardMaterial({ color: 0xff5a1f, roughness: 0.45, metalness: 0.05 }));
  const core = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.34, 0.54, 40), flangeMat);
  [-0.29, 0.29].forEach((z) => {
    const f = new THREE.Mesh(new THREE.CylinderGeometry(0.95, 0.95, 0.06, 64), flangeMat);
    f.position.y = z;
    spool.add(f);
  });
  for (let i = 0; i < 6; i++) {
    const sp = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.075, 0.62), new THREE.MeshStandardMaterial({ color: 0x1a1512, roughness: 0.6 }));
    const a = (i / 6) * Math.PI * 2;
    sp.position.set(Math.cos(a) * 0.55, 0.33, Math.sin(a) * 0.55);
    sp.rotation.y = Math.PI / 2 - a;
    spool.add(sp);
  }
  spool.add(wound, core);
  // eixo do carretel apontado para a câmera
  spool.children.forEach((c) => c.rotation.x += 0);
  const spoolInner = new THREE.Group();
  while (spool.children.length) spoolInner.add(spool.children[0]);
  spoolInner.rotation.x = Math.PI / 2;
  spool.add(spoolInner);

  /* fio entre o carretel e o bico (tubo recalculado no lugar) */
  const TS = 30, RS = 5;
  const tpos = new Float32Array(TS * RS * 3);
  const tgeo = new THREE.BufferGeometry();
  tgeo.setAttribute('position', new THREE.BufferAttribute(tpos, 3).setUsage(THREE.DynamicDrawUsage));
  const tidx = [];
  for (let i = 0; i < TS - 1; i++) for (let j = 0; j < RS; j++) {
    const a = i * RS + j, b = i * RS + ((j + 1) % RS), c = (i + 1) * RS + j, d = (i + 1) * RS + ((j + 1) % RS);
    tidx.push(a, c, b, b, c, d);
  }
  tgeo.setIndex(tidx);
  const thread = new THREE.Mesh(tgeo, new THREE.MeshBasicMaterial({ color: 0xff5a1f, side: THREE.DoubleSide }));
  thread.frustumCulled = false;
  rig.add(thread);
  const vA = new THREE.Vector3(), vB = new THREE.Vector3(), vC = new THREE.Vector3(), vP = new THREE.Vector3(), vT = new THREE.Vector3(), vS = new THREE.Vector3(), vU = new THREE.Vector3();
  function updateThread(a, b) {
    vC.set((a.x + b.x) / 2 + 0.25, Math.min(a.y, b.y) - 0.1 + Math.abs(a.y - b.y) * 0.15, (a.z + b.z) / 2 + 0.35);
    for (let i = 0; i < TS; i++) {
      const t = i / (TS - 1), u = 1 - t;
      vP.set(u * u * a.x + 2 * u * t * vC.x + t * t * b.x, u * u * a.y + 2 * u * t * vC.y + t * t * b.y, u * u * a.z + 2 * u * t * vC.z + t * t * b.z);
      vT.set(2 * u * (vC.x - a.x) + 2 * t * (b.x - vC.x), 2 * u * (vC.y - a.y) + 2 * t * (b.y - vC.y), 2 * u * (vC.z - a.z) + 2 * t * (b.z - vC.z)).normalize();
      vS.set(0, 0, 1).cross(vT);
      if (vS.lengthSq() < 1e-4) vS.set(1, 0, 0);
      vS.normalize();
      vU.copy(vT).cross(vS).normalize();
      for (let j = 0; j < RS; j++) {
        const ang = (j / RS) * Math.PI * 2, r = 0.032;
        const o = (i * RS + j) * 3;
        tpos[o] = vP.x + (vS.x * Math.cos(ang) + vU.x * Math.sin(ang)) * r;
        tpos[o + 1] = vP.y + (vS.y * Math.cos(ang) + vU.y * Math.sin(ang)) * r;
        tpos[o + 2] = vP.z + (vS.z * Math.cos(ang) + vU.z * Math.sin(ang)) * r;
      }
    }
    tgeo.attributes.position.needsUpdate = true;
  }

  /* caixa de entrega (arestas de arame + faces translúcidas) */
  const BW = 2.3, BH = 3.2;
  const edgeMat = new THREE.LineBasicMaterial({ color: 0xffa14a });
  const faceMat = new THREE.MeshBasicMaterial({ color: 0xff7a2e, transparent: true, opacity: 0.07, depthWrite: false, side: THREE.DoubleSide });
  const bodyGeo = new THREE.BoxGeometry(BW, BH, BW);
  bodyGeo.translate(0, BH / 2, 0);
  const boxBody = new THREE.Group();
  boxBody.add(new THREE.LineSegments(new THREE.EdgesGeometry(bodyGeo), edgeMat), new THREE.Mesh(bodyGeo, faceMat));
  boxBody.scale.y = 0.001;
  rig.add(boxBody);
  const lidGeo = new THREE.BoxGeometry(BW + 0.12, 0.2, BW + 0.12);
  const lid = new THREE.Group();
  lid.add(new THREE.LineSegments(new THREE.EdgesGeometry(lidGeo), edgeMat), new THREE.Mesh(lidGeo, faceMat));
  lid.visible = false;
  rig.add(lid);

  /* ---------- layout responsivo ---------- */
  const view = { H: 8, spoolY: 5, desk: false, dist: 12, offX: 0, offY: -2.7, spoolX: 1.4, w: 1, h: 1 };
  const TANH = Math.tan((camera.fov * Math.PI) / 360);
  function layout() {
    const w = stage.clientWidth, h = stage.clientHeight;
    view.w = w; view.h = h;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    view.desk = w >= 760;
    const fitW = view.desk ? 6.4 : 5.4, fitH = view.desk ? 7.7 : 7.6;
    view.dist = Math.max(fitW / (2 * TANH * camera.aspect), fitH / (2 * TANH));
    const H = 2 * view.dist * TANH, W = H * camera.aspect;
    view.offX = view.desk ? W * 0.2 : 0;
    view.offY = (view.desk ? -2.55 : -2.8) + (view.desk ? 0 : H * 0.15);
    view.spoolX = view.desk ? 2.5 : -1.5;
    view.spoolY = view.desk ? 4.0 : 2.5;
    rig.position.set(view.offX, view.offY, 0);
    spool.scale.setScalar(view.desk ? 1 : 0.62);
    view.H = H;
  }
  layout();
  new ResizeObserver(layout).observe(stage);

  /* ---------- elementos de interface ---------- */
  const heroPanel = $('.hero.panel');
  const stepPanels = [...document.querySelectorAll('.step.panel')];
  const panels = [heroPanel, ...stepPanels];
  const bounds = [[0, 0.1], [0.1, 0.27], [0.27, 0.62], [0.62, 0.8], [0.8, 1.01]];
  const chip = $('.chip');
  const hudLis = [...document.querySelectorAll('.hud li')];
  const cnt = $('#cnt');

  /* ---------- estado de rolagem ---------- */
  const S = { target: 0, p: 0, intro: 0, active: true };
  ScrollTrigger.create({
    trigger: '.story', start: 'top top', end: 'bottom bottom',
    onUpdate: (self) => { S.target = self.progress; },
    onToggle: (self) => { S.active = self.isActive; }
  });
  S.target = 0;
  S.p = 0;
  // quando sai da dobra, recalcula uma última vez
  ScrollTrigger.addEventListener('refresh', () => layout());

  const nozzleTarget = new THREE.Vector3();
  let topIdx = -1, lastCount = -1, lastStep = -2;
  let tPrev = performance.now() / 1000;

  function frame() {
    const now = performance.now() / 1000;
    const dt = Math.min(0.05, now - tPrev);
    tPrev = now;
    if (document.hidden) return;
    adapt(dt);
    const near = S.active || Math.abs(S.target - S.p) > 0.002;
    if (!near && S.intro >= 1) return;

    S.p += (S.target - S.p) * (1 - Math.pow(0.0008, dt));
    const P = S.p;

    const sPrint = range(P, 0.27, 0.62);
    const layerF = lerp(0, N, smooth(sPrint) * 0.6 + sPrint * 0.4);
    const fin = smooth(range(P, 0.62, 0.8));
    const del = range(P, 0.8, 0.97);

    /* peça */
    const full = Math.floor(layerF);
    const frac = layerF - full;
    const count = Math.min(N, full + (frac > 0.001 ? 1 : 0));
    if (topIdx !== count - 1 || count !== lastCount || (count > 0 && count <= N)) {
      if (lastCount > 0 && topIdx >= 0 && topIdx < N && topIdx !== count - 1) setLayer(topIdx);
      topIdx = count - 1;
      if (topIdx >= 0 && topIdx < N) setLayer(topIdx, frac > 0.001 && full < N ? Math.max(0.04, frac) : 1);
      mesh.instanceMatrix.needsUpdate = true;
      lastCount = count;
    }
    mesh.count = count;
    setFinish(fin);
    if (cnt) cnt.textContent = String(Math.min(N, Math.round(layerF))).padStart(3, '0');

    /* bico */
    const hover = (1 - smooth(range(P, 0.2, 0.27))) * 0.75;
    const topY = Math.min(N, layerF) * LH;
    const ang = now * 6.5;
    const idx = clamp(Math.floor(layerF), 0, N - 1);
    const rr = R[idx] * 0.97 * (1 - 0.0);
    const orbit = smooth(range(P, 0.27, 0.285));
    nozzleTarget.set(Math.cos(ang) * rr * orbit, topY + 0.02 + hover, Math.sin(ang) * rr * orbit);
    const lift = easeOutIn(fin);
    nozzle.position.set(nozzleTarget.x, nozzleTarget.y + lift * 8, nozzleTarget.z);
    nozzle.visible = fin < 0.995;
    glow.intensity = (P > 0.2 ? 4 : 1.2) * (1 - fin);

    /* carretel e fio */
    spool.position.set(view.spoolX, view.spoolY + lift * 8, -0.6);
    const feed = P > 0.27 && P < 0.62 ? 1 : 0;
    spoolInner.rotation.y += dt * (0.5 + feed * 2.4);
    spool.visible = fin < 0.995;
    thread.visible = fin < 0.6;
    if (thread.visible) {
      vA.set(spool.position.x, spool.position.y - 0.95 * spool.scale.x, spool.position.z + 0.25);
      vB.set(nozzle.position.x, nozzle.position.y + 0.58, nozzle.position.z);
      updateThread(vA, vB);
    }

    /* acabamento: giro; entrega: caixa */
    piece.rotation.y = fin * Math.PI * 2;
    const ps = 1 - 0.27 * smooth(range(del, 0, 0.5));
    piece.scale.setScalar(ps);
    boxBody.scale.y = Math.max(0.001, easeOut(range(del, 0.2, 0.6)));
    const lidT = easeOut(range(del, 0.55, 0.9));
    lid.visible = del > 0.5;
    lid.position.y = lerp(5.4, BH + 0.1, lidT);
    rig.position.y = view.offY + (view.desk ? 0 : view.H * (0.11 * (1 - smooth(range(P, 0.05, 0.14))) + 0.05 * easeOut(del)));
    rig.rotation.y = (1 - easeOut(S.intro)) * 0.9 + del * 0.5;
    rig.scale.setScalar(0.88 + 0.12 * easeOut(S.intro));

    /* câmera */
    const az = lerp(-0.55, 0.4, smooth(P));
    const el = lerp(0.2, 0.26, smooth(range(P, 0.2, 0.7)));
    const d = view.dist * (1 + 0.05 * del);
    camera.position.set(Math.sin(az) * Math.cos(el) * d, Math.sin(el) * d, Math.cos(az) * Math.cos(el) * d);
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);

    /* interface */
    let cur = 0;
    for (let i = 0; i < bounds.length; i++) if (P >= bounds[i][0] && P < bounds[i][1]) cur = i;
    if (S.intro < 1) cur = 0;
    if (cur !== lastStep) {
      panels.forEach((p, i) => p.classList.toggle('on', i === cur));
      hudLis.forEach((li, i) => li.classList.toggle('on', i === cur - 1));
      lastStep = cur;
    }
    hudLis.forEach((li, i) => {
      const b = bounds[i + 1];
      li.style.setProperty('--f', (range(P, b[0], b[1]) * 100).toFixed(1) + '%');
    });
    if (chip) {
      const o = 1 - range(P, 0.04, 0.1);
      chip.style.opacity = o;
      chip.style.visibility = o < 0.02 ? 'hidden' : 'visible';
    }
  }
  // qualidade adaptativa: aparelho lento cai para pixel ratio 1
  let slow = 0, lowered = false;
  function adapt(dt) {
    if (lowered) return;
    slow = dt > 0.04 ? slow + 1 : Math.max(0, slow - 1);
    if (slow > 40) { lowered = true; renderer.setPixelRatio(1); renderer.setSize(view.w, view.h, false); }
  }
  function easeOutIn(t) { return t * t; }
  gsap.ticker.add(frame);

  /* ---------- entrada orquestrada (uma só) ---------- */
  const spans = document.querySelectorAll('.hero h1 .l > span');
  const pre = document.querySelectorAll('.pre');
  gsap.set(spans, { yPercent: 108, opacity: 1 });
  gsap.set(pre, { opacity: 0, y: 22 });
  gsap.set('.top', { yPercent: -100 });
  gsap.set(canvas, { opacity: 0 });
  root.classList.add('ready');
  const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
  tl.to(canvas, { opacity: 1, duration: 1.2 }, 0)
    .to(S, { intro: 1, duration: 1.8 }, 0)
    .to('.top', { yPercent: 0, duration: 0.9 }, 0.1)
    .to(spans, { yPercent: 0, duration: 1.1, stagger: 0.14 }, 0.25)
    .to(pre, { opacity: 1, y: 0, duration: 0.9, stagger: 0.1, clearProps: 'transform' }, 0.7);

  /* ---------- produtos revelados camada a camada ---------- */
  gsap.set('.rev', { clipPath: 'inset(100% 0% 0% 0%)' });
  ScrollTrigger.batch('.rev', {
    start: 'top 90%', once: true,
    onEnter: (els) => gsap.to(els, {
      clipPath: 'inset(0% 0% 0% 0%)', duration: 0.9, ease: 'steps(14)', stagger: 0.09,
      onComplete() { els.forEach((e) => e.classList.add('done')); gsap.set(els, { clearProps: 'clipPath' }); }
    })
  });

  ScrollTrigger.refresh();
  window.__h3d = { S, renderer };
}

start().catch(fallback);
