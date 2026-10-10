/* Habitat3D — Modelo 12 · Link na Bio App */
(() => {
'use strict';

const WA = '5549988452253';
const wa = (msg) => `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;
const brl = (n) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const store = {
  get(k, d) { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* sem armazenamento */ } }
};
const icon = (n, c = '') => `<svg class="i ${c}" aria-hidden="true"><use href="icons.svg#${n}"/></svg>`;
const P = (f) => `../midia/produtos/${f}`;

const CORES = [
  ['Branco', '#f3f3f1'], ['Preto', '#1a1a1d'], ['Vermelho', '#e0312f'], ['Verde', '#2f9e52'],
  ['Dourado', '#d9a936'], ['Outra cor', 'conic-gradient(#e0312f,#d9a936,#2f9e52,#2f6fe0,#9b3fd0,#e0312f)']
];

/* Preços SÓ os de midia/produtos.json. Sem preço = "consulte". */
const PRODUTOS = [
  { id: 'papai-noel', nome: 'Papai Noel de tricô', cat: 'Natal', img: 'img/papai-noel.webp', p: null, desc: 'Papai Noel com textura de tricô para enfeitar a casa ou presentear. Peça impressa em 3D.' },
  { id: 'papai-noel-duo', nome: 'Dupla de Papais Noéis', cat: 'Natal', img: 'img/papai-noel-duo.webp', p: null, desc: 'Um grande e um pequeno, juntos. Ótimo para compor a decoração de Natal.' },
  { id: 'rena', nome: 'Rena de tricô', cat: 'Natal', img: 'img/rena.webp', p: null, desc: 'Rena fofa com textura de tricô e nariz vermelho. Combina com o resto da turma natalina.' },
  { id: 'urso', nome: 'Urso de gorro', cat: 'Natal', img: 'img/urso.webp', p: null, desc: 'Urso com gorro de Papai Noel, perfeito para mesa, prateleira ou presente.' },
  { id: 'cachorro', nome: 'Cachorrinho de gorro', cat: 'Natal', img: 'img/cachorro.webp', p: null, desc: 'Cachorrinho com gorro natalino. Dá para pedir em outra cor.' },
  { id: 'boneco-neve', nome: 'Boneco de neve', cat: 'Natal', img: 'img/boneco-neve.webp', p: null, desc: 'Boneco de neve com gorro e cachecol vermelhos, no mesmo estilo de tricô.' },
  { id: 'anjinho', nome: 'Anjinho articulado', cat: 'Natal', img: 'img/anjinho.webp', p: null, desc: 'Anjinho com corpo articulado, que senta em prateleiras e beiradas.' },
  { id: 'pernudo-bola', nome: 'Bola de Natal pernuda', cat: 'Natal', img: 'img/pernudo-bola.webp', p: null, desc: 'Bola de Natal com perninhas articuladas. Divertida para pendurar ou sentar.' },
  { id: 'arvore', nome: 'Árvore de Natal articulada', cat: 'Natal', img: 'img/arvore.webp', p: null, desc: 'Árvore de Natal articulada, em cores à escolha. Pode ir em mesa ou prateleira.' },
  { id: 'guardanapo', nome: 'Porta-guardanapo árvore', cat: 'Natal', img: 'img/guardanapo.webp', p: null, desc: 'Porta-guardanapo em formato de árvore de Natal para a mesa da ceia.' },
  { id: 'cortadores', nome: 'Cortadores de biscoito de Natal', cat: 'Natal', img: P('conjunto-de-cortadores-de-biscoito-de-na-1.webp'), p: 25.33, badge: 'Novo', desc: 'Conjunto de cortadores com formatos natalinos para biscoitos e massas.' },
  { id: 'presente-articulado', nome: 'Presente de Natal articulado', cat: 'Natal', img: P('presente-de-natal-articulado-774384-1.webp'), p: 46.08, desc: 'Caixinha de presente articulada, com carinha, para decorar e presentear.' },
  { id: 'trex', nome: 'Esqueleto flexível de T-Rex', cat: 'Presentes', img: P('esqueleto-flexivel-de-tiranossauro-rex-1.webp'), p: 32, pagina: 'produto.html', desc: 'Esqueleto de tiranossauro flexível, para brincar, posicionar e exibir.' },
  { id: 'ninja', nome: 'Porta-incenso Ninja', cat: 'Presentes', img: P('porta-incenso-darth-vader-2883115-1.webp'), p: 87.1, desc: 'Porta-incenso com figura de ninja e bandeja. Decoração com personalidade.' },
  { id: 'ganso', nome: 'Porta-vinho Ganso', cat: 'Presentes', img: 'img/ganso.webp', p: null, desc: 'O ganso segura a garrafa de vinho inclinada. Presente certeiro para quem ama vinho.' },
  { id: 'macaco', nome: 'Macaco segura-bananas', cat: 'Casa e útil', img: P('macaco-das-banana-1.webp'), p: 30, desc: 'Macaco que pendura as bananas e libera espaço na bancada.' },
  { id: 'apoio-pagina', nome: 'Apoio para páginas de livro', cat: 'Casa e útil', img: P('apoio-para-paginas-de-livro-1687004-1.webp'), p: 6.3, desc: 'Mantém o livro aberto na página, com uma mão só.' },
  { id: 'harry', nome: 'Apoio de livros ninja', cat: 'Casa e útil', img: 'img/harry.webp', p: null, desc: 'Apoio para organizar os livros na estante, com figura de ninja.' },
  { id: 'polvos', nome: 'Chaveiro polvinho', cat: 'Chaveiros', img: 'img/polvos.webp', p: null, desc: 'Chaveiro de polvinho colorido. Para uso próprio ou para revender na sua loja.' },
  { id: 'alexa', nome: 'Suporte para Alexa personalizado', cat: 'Sob medida', img: 'img/alexa.webp', p: null, desc: 'Suporte com o seu time ou tema e o nome que você quiser. Feito sob encomenda.' },
  { id: 'dentista', nome: 'Porta-cartões para dentista', cat: 'Sob medida', img: P('porta-cartoes-para-dentista-2594018-1.webp'), p: 82.32, desc: 'Porta-cartões em formato de dente, com o nome do profissional. Sob encomenda.' }
];
const byId = Object.fromEntries(PRODUTOS.map((p) => [p.id, p]));
const CATS = ['Todos', 'Natal', 'Presentes', 'Casa e útil', 'Chaveiros', 'Sob medida'];

/* ─────────── helpers de UI ─────────── */
const priceHTML = (p) => p.p != null
  ? `<span class="pr has num">${brl(p.p)}</span>`
  : `<span class="pr">Consulte o valor</span>`;
const cardHTML = (p, slide) => `${slide ? '<div class="swiper-slide">' : ''}
  <button class="pc" type="button" data-open="${p.id}" aria-haspopup="dialog" aria-label="${p.nome}. ${p.p != null ? brl(p.p) : 'Consulte o valor'}. Abrir detalhes">
    <span class="ph"><img src="${p.img}" alt="${p.nome}" width="563" height="704" loading="lazy" decoding="async">${p.badge ? `<span class="bd">${p.badge}</span>` : ''}</span>
    <span class="nm">${p.nome}</span>${priceHTML(p)}
  </button>${slide ? '</div>' : ''}`;

const phone = $('#phone');
let toastT;
function toast(msg) {
  const t = $('#toast'); if (!t) return;
  t.textContent = msg; t.classList.add('on'); clearTimeout(toastT);
  toastT = setTimeout(() => t.classList.remove('on'), 2200);
}

function rail(el, opts = {}) {
  if (!el || !window.Swiper) return null;
  return new Swiper(el, Object.assign({ slidesPerView: 'auto', spaceBetween: 12, freeMode: true, slidesOffsetBefore: 16, slidesOffsetAfter: 16, resistanceRatio: .6 }, opts));
}

/* ─────────── status aberto/fechado (America/Sao_Paulo) ─────────── */
function status() {
  const el = $('#status'); if (!el) return;
  const d = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }));
  const h = d.getHours() + d.getMinutes() / 60, day = d.getDay();
  const open = day >= 1 && day <= 6 && h >= 9 && h < 19;
  el.classList.toggle('on', open);
  el.textContent = open ? 'Aberto agora' : 'Fechado agora';
}

/* ─────────── bottom sheet ─────────── */
const Sheet = (() => {
  const scrim = $('#scrim'), el = $('#sheet'), body = $('#sheet-body');
  if (!el) return {};
  let cur = null, cor = null, last = null;
  const msg = () => {
    const txt = $('#sh-txt', el)?.value.trim();
    return `Olá! Vi o link da bio do Instagram e quero pedir: ${cur.nome}` +
      (cor ? ` — cor: ${cor}` : '') + (txt ? ` — nome/texto na peça: "${txt}"` : '') +
      `. Pode me passar valor e prazo?`;
  };
  const sync = () => { const a = $('#sh-wa', el); if (a) a.href = wa(msg()); };
  function open(id, trigger) {
    const p = byId[id]; if (!p) return;
    cur = p; cor = null; last = trigger || document.activeElement;
    body.innerHTML = `
      <div class="sh-top">
        <div class="sh-img"><img src="${p.img}" alt="${p.nome}" width="563" height="704"></div>
        <div class="sh-info">
          <span class="cat">${p.cat}</span>
          <h2 id="sheet-title">${p.nome}</h2>
          ${p.p != null
            ? `<div class="sh-price num">${brl(p.p)}<small>Valor da peça pronta. Personalização sob consulta.</small></div>`
            : `<div class="sh-price">Consulte<small>Orçamento grátis, resposta em até 1h.</small></div>`}
        </div>
      </div>
      <p class="sh-desc">${p.desc}</p>
      <div class="sh-lbl" id="sh-cl">Cor (confirmamos a disponibilidade no atendimento)</div>
      <div class="sw" role="group" aria-labelledby="sh-cl">${CORES.map(([n, c]) => `<button type="button" aria-pressed="false" data-cor="${n}"><i style="background:${c}"></i>${n}</button>`).join('')}</div>
      <div class="sh-lbl"><label for="sh-txt">Nome ou texto na peça (opcional)</label></div>
      <input class="mini-input" id="sh-txt" type="text" maxlength="40" placeholder="Ex.: nome do presenteado" autocomplete="off">
      <div class="sh-cta"><div class="two">
        <a class="btn btn-wa btn-block" id="sh-wa" href="#" target="_blank" rel="noopener">${icon('chat')} Pedir no WhatsApp</a>
        ${p.pagina ? `<a class="btn btn-ghost btn-block" href="${p.pagina}">Ver página do produto ${icon('arrow')}</a>` : ''}
      </div></div>`;
    sync();
    el.inert = false; el.classList.add('open'); scrim.classList.add('open'); el.setAttribute('aria-hidden', 'false');
    body.scrollTop = 0;
    setTimeout(() => $('.sw button', el)?.focus({ preventScroll: true }), 60);
  }
  function close() {
    if (!el.classList.contains('open')) return;
    el.classList.remove('open'); scrim.classList.remove('open'); el.inert = true; el.setAttribute('aria-hidden', 'true');
    last?.focus?.({ preventScroll: true });
  }
  el.addEventListener('click', (e) => {
    const b = e.target.closest('[data-cor]'); if (!b) return;
    const same = b.getAttribute('aria-pressed') === 'true';
    $$('[data-cor]', el).forEach((x) => x.setAttribute('aria-pressed', 'false'));
    cor = same ? null : b.dataset.cor; if (!same) b.setAttribute('aria-pressed', 'true'); sync();
  });
  el.addEventListener('input', sync);
  scrim.addEventListener('click', close);
  // arrastar a alça para fechar
  const grab = $('.sheet-grab', el); let y0 = null;
  grab.addEventListener('pointerdown', (e) => { y0 = e.clientY; grab.setPointerCapture(e.pointerId); el.classList.add('drag'); });
  grab.addEventListener('pointermove', (e) => { if (y0 == null) return; el.style.transform = `translateY(${Math.max(0, e.clientY - y0)}px)`; });
  const end = (e) => { if (y0 == null) return; const dy = e.clientY - y0; y0 = null; el.classList.remove('drag'); el.style.transform = ''; if (dy > 90) close(); };
  grab.addEventListener('pointerup', end); grab.addEventListener('pointercancel', end);
  el.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    const f = $$('button,a[href],input', el).filter((x) => !x.disabled && x.offsetParent !== null);
    if (!f.length) return;
    const a = f[0], z = f[f.length - 1];
    if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); }
    else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
  });
  return { open, close, isOpen: () => el.classList.contains('open') };
})();

document.addEventListener('click', (e) => {
  const t = e.target.closest('[data-open]'); if (!t) return;
  if (t.classList.contains('swiper-slide') && !t.classList.contains('swiper-slide-active')) return;
  Sheet.open?.(t.dataset.open, t);
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && e.target.matches?.('.swiper-slide[data-open]')) Sheet.open?.(e.target.dataset.open, e.target);
});

/* ─────────── stories ─────────── */
const STORIES = [
  { id: 'natal', nome: 'Natal', av: 'img/av-papai-noel.webp', slides: [
    { img: 'img/papai-noel.webp', t: 'Papai Noel de tricô', c: 'Natal personalizado, do enfeite ao presente.', p: 'papai-noel' },
    { img: 'img/rena.webp', t: 'Rena', c: 'Faz par com o resto da turma natalina.', p: 'rena' },
    { img: 'img/urso.webp', t: 'Urso de gorro', c: 'Fofura para mesa, prateleira ou presente.', p: 'urso' },
    { img: 'img/boneco-neve.webp', t: 'Boneco de neve', c: 'No mesmo estilo de tricô.', p: 'boneco-neve' } ] },
  { id: 'producao', nome: 'Na impressora', av: 'img/av-alexa.webp', slides: [
    { video: '../midia/alexa.mp4', poster: 'img/alexa-poster.webp', t: 'Saindo da impressora', c: 'Suporte para Alexa personalizado, em produção.', p: 'alexa' },
    { img: 'img/alexa.webp', t: 'Pronto e personalizado', c: 'Time, tema e nome do jeito que você quiser.', p: 'alexa' } ] },
  { id: 'vinho', nome: 'Porta-vinho', av: 'img/av-ganso.webp', slides: [
    { video: '../midia/ganso.mp4', poster: 'img/ganso-poster.webp', t: 'Ganso porta-vinho', c: 'O presente para quem ama vinho.', p: 'ganso' },
    { img: 'img/ganso.webp', t: 'Segura a garrafa com estilo', c: 'Direto da terra do vinho.', p: 'ganso' } ] },
  { id: 'uteis', nome: 'Úteis', av: 'img/av-harry.webp', slides: [
    { img: 'img/harry.webp', t: 'Apoio de livros ninja', c: 'A estante organizada com personalidade.', p: 'harry' },
    { img: 'img/guardanapo.webp', t: 'Porta-guardanapo', c: 'Detalhe de mesa para a ceia.', p: 'guardanapo' } ] },
  { id: 'chaveiros', nome: 'Chaveiros', av: 'img/av-polvos.webp', slides: [
    { img: 'img/polvos.webp', t: 'Chaveiros de polvinho', c: 'Para você ou para revender na sua loja.', p: 'polvos' } ] },
  { id: 'pedir', nome: 'Como pedir', av: 'img/mark.webp', mark: true, slides: [
    { txt: true, n: '1', t: 'Mande a ideia', c: 'Foto, desenho ou só uma frase. Vale tudo no WhatsApp.' },
    { txt: true, n: '2', t: 'Receba o orçamento', c: 'É grátis, sem compromisso, e costuma sair em até 1 hora.' },
    { txt: true, n: '3', t: 'A gente imprime', c: 'Acabamento manual e atendimento de gente de verdade.', wa: true } ] }
];

const SV = (() => {
  const el = $('#sv'); if (!el) return {};
  const bars = $('.sv-bars', el), media = $('.sv-media', el), head = $('.sv-head', el), foot = $('.sv-foot', el);
  let i = 0, s = 0, raf = 0, last = 0, elapsed = 0, dur = 5000, paused = false, vid = null, opener = null;
  const seen = new Set(store.get('h3d12-seen', []));
  const mark = (idx) => { seen.add(STORIES[idx].id); store.set('h3d12-seen', [...seen]); $$('.story')[idx]?.classList.add('seen'); };

  function render() {
    const st = STORIES[i], sl = st.slides[s];
    cancelAnimationFrame(raf); elapsed = 0; vid = null; paused = false;
    bars.innerHTML = st.slides.map((_, k) => `<i><b style="width:${k < s ? 100 : 0}%"></b></i>`).join('');
    head.querySelector('img').src = st.av; head.querySelector('b').textContent = st.nome;
    head.querySelector('small').textContent = `${s + 1} de ${st.slides.length} · Habitat3D`;
    media.innerHTML = '';
    if (sl.txt) {
      media.innerHTML = `<div class="txt" style="background:radial-gradient(500px 400px at 80% 10%,rgba(255,61,139,.4),transparent 60%),radial-gradient(500px 400px at 0% 100%,rgba(255,194,71,.3),transparent 60%),#0d0e16"><span class="big">${sl.n}</span><h3>${sl.t}</h3><p>${sl.c}</p></div>`;
      dur = 4500;
    } else if (sl.video) {
      vid = document.createElement('video');
      vid.muted = true; vid.playsInline = true; vid.preload = 'auto'; vid.poster = sl.poster; vid.src = sl.video; vid.setAttribute('aria-label', sl.t);
      vid.addEventListener('ended', next); vid.addEventListener('error', () => { vid = null; dur = 5000; });
      media.append(vid); vid.play().catch(() => { vid = null; dur = 5000; });
    } else {
      media.innerHTML = `<img src="${sl.img}" alt="${sl.t}">`; dur = 5000;
    }
    const p = sl.p ? byId[sl.p] : null;
    foot.innerHTML = sl.txt
      ? `<div class="acts"><a class="btn btn-wa" href="${wa('Olá! Vi o link da bio do Instagram e quero pedir um orçamento.')}" target="_blank" rel="noopener">${icon('chat')} Pedir orçamento grátis</a></div>`
      : `<h3>${sl.t}</h3><p>${sl.c}</p><div class="acts">
          <a class="btn btn-wa" href="${wa(`Olá! Vi o link da bio do Instagram e quero pedir: ${p ? p.nome : sl.t}. Pode me passar valor e prazo?`)}" target="_blank" rel="noopener">${icon('chat')} Pedir no WhatsApp</a>
          ${p ? `<button class="btn btn-ghost" type="button" data-sv-open="${p.id}">Ver peça</button>` : ''}</div>`;
    last = performance.now(); raf = requestAnimationFrame(tick);
  }
  function tick(ts) {
    if (!paused) elapsed += ts - last; last = ts;
    let pr;
    if (vid && vid.duration) pr = vid.currentTime / vid.duration; else pr = elapsed / dur;
    const b = bars.children[s]?.firstChild; if (b) b.style.width = Math.min(100, pr * 100) + '%';
    if (pr >= 1) { next(); return; }
    raf = requestAnimationFrame(tick);
  }
  function pause(v) { paused = v; if (vid) { v ? vid.pause() : vid.play().catch(() => {}); } }
  function next() { const st = STORIES[i]; if (s < st.slides.length - 1) { s++; render(); } else { mark(i); if (i < STORIES.length - 1) { i++; s = 0; render(); } else close(); } }
  function prev() { if (s > 0) { s--; render(); } else if (i > 0) { i--; s = 0; render(); } else render(); }
  function open(idx, trigger) { opener = trigger; i = idx; s = 0; el.inert = false; el.classList.add('open'); el.setAttribute('aria-hidden', 'false'); render(); setTimeout(() => $('.sv-x', el).focus({ preventScroll: true }), 50); }
  function close() { cancelAnimationFrame(raf); if (vid) vid.pause(); mark(i); el.classList.remove('open'); el.inert = true; el.setAttribute('aria-hidden', 'true'); media.innerHTML = ''; opener?.focus?.({ preventScroll: true }); }

  // gestos: toque = lado, segurar = pausar, arrastar p/ baixo = fechar
  let d = null, holdT = 0, held = false;
  el.addEventListener('pointerdown', (e) => {
    if (e.target.closest('a,button')) return;
    d = { x: e.clientX, y: e.clientY }; held = false;
    holdT = setTimeout(() => { held = true; pause(true); }, 220);
  });
  el.addEventListener('pointermove', (e) => {
    if (!d) return; const dy = e.clientY - d.y;
    if (dy > 12) { clearTimeout(holdT); el.style.transition = 'none'; el.style.transform = `translateY(${dy}px) scale(${1 - Math.min(dy, 300) / 1800})`; }
  });
  const up = (e) => {
    if (!d) return; clearTimeout(holdT);
    const dx = e.clientX - d.x, dy = e.clientY - d.y; d = null;
    el.style.transition = ''; el.style.transform = '';
    if (held) { pause(false); return; }
    if (dy > 110) { close(); return; }
    if (Math.abs(dx) < 14 && Math.abs(dy) < 14) {
      const r = el.getBoundingClientRect(); (e.clientX - r.left) < r.width * .34 ? prev() : next();
    } else if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy)) { dx < 0 ? next() : prev(); }
  };
  el.addEventListener('pointerup', up);
  el.addEventListener('pointercancel', () => { d = null; clearTimeout(holdT); el.style.transition = ''; el.style.transform = ''; pause(false); });
  $('.sv-x', el).addEventListener('click', close);
  el.addEventListener('click', (e) => {
    const b = e.target.closest('[data-sv-open]'); if (!b) return;
    const id = b.dataset.svOpen; pause(true); const t = b; close(); setTimeout(() => Sheet.open(id, t), 120);
  });
  document.addEventListener('visibilitychange', () => { if (el.classList.contains('open')) pause(document.hidden); });
  document.addEventListener('keydown', (e) => {
    if (!el.classList.contains('open')) return;
    if (e.key === 'ArrowRight') next(); else if (e.key === 'ArrowLeft') prev();
  });
  // monta a fileira de stories
  const row = $('#stories');
  if (row) {
    row.innerHTML = STORIES.map((st, k) => `<button class="story${seen.has(st.id) ? ' seen' : ''}" type="button" data-story="${k}" aria-haspopup="dialog" aria-label="Abrir stories: ${st.nome}">
      <span class="ring"><img src="${st.av}" alt="" width="62" height="62" ${k > 3 ? 'loading="lazy"' : ''}></span><span class="l">${st.nome}</span></button>`).join('');
    row.addEventListener('click', (e) => { const b = e.target.closest('[data-story]'); if (b) open(+b.dataset.story, b); });
  }
  return { open, close, isOpen: () => el.classList.contains('open') };
})();

document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  if (SV.isOpen?.()) SV.close(); else if (Sheet.isOpen?.()) Sheet.close();
});

/* ─────────── abas da home ─────────── */
function initTabs() {
  const tabs = $$('[data-tab]'); if (!tabs.length) return;
  const links = $$('.tb[data-go]'), screen = $('#screen');
  const names = tabs.map((t) => t.dataset.tab);
  function go(name, scroll = true) {
    if (!names.includes(name)) name = 'inicio';
    tabs.forEach((t) => { const on = t.dataset.tab === name; if (on && t.hidden) { t.hidden = false; if (!reduce) { t.classList.remove('in'); void t.offsetWidth; t.classList.add('in'); } } else if (!on) { t.hidden = true; } });
    links.forEach((a) => { if (a.dataset.go === name) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); });
    if (scroll) screen.scrollTo({ top: 0, behavior: 'instant' });
    document.title = name === 'inicio' ? 'Habitat3D no app — Impressão 3D sob medida em Joaçaba e região' : `${{ loja: 'Peças', 'sob-medida': 'Sob medida', ajuda: 'Dúvidas' }[name]} · Habitat3D`;
  }
  document.addEventListener('click', (e) => {
    const a = e.target.closest('[data-go]'); if (!a) return;
    e.preventDefault(); history.replaceState(null, '', '#' + a.dataset.go); go(a.dataset.go);
  });
  addEventListener('hashchange', () => go(location.hash.slice(1)));
  go(location.hash.slice(1) || 'inicio', false);
}

/* ─────────── loja: busca + filtros ─────────── */
function initLoja() {
  const grid = $('#grid'); if (!grid) return;
  const f = $('#filters'), q = $('#q'), empty = $('#empty');
  let cat = 'Todos';
  f.innerHTML = CATS.map((c) => `<button class="chip" type="button" aria-pressed="${c === cat}" data-cat="${c}">${c}</button>`).join('');
  const norm = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  function draw() {
    const t = norm(q.value.trim());
    const list = PRODUTOS.filter((p) => (cat === 'Todos' || p.cat === cat) && (!t || norm(p.nome + ' ' + p.cat + ' ' + p.desc).includes(t)));
    grid.innerHTML = list.map((p) => cardHTML(p)).join('');
    empty.hidden = list.length > 0;
    $('#count').textContent = `${list.length} ${list.length === 1 ? 'peça' : 'peças'}`;
    if (!list.length) $('#empty-q').textContent = q.value.trim();
  }
  f.addEventListener('click', (e) => { const b = e.target.closest('[data-cat]'); if (!b) return; cat = b.dataset.cat; $$('.chip', f).forEach((x) => x.setAttribute('aria-pressed', x === b)); draw(); });
  q.addEventListener('input', draw);
  draw();
}

/* ─────────── sob medida: formulário → WhatsApp ─────────── */
function initForm() {
  const form = $('#form'); if (!form) return;
  $('#ideias')?.addEventListener('click', (e) => {
    const c = e.target.closest('[data-tipo]'); if (!c) return;
    $('#f-tipo').value = c.dataset.tipo; $$('#ideias .chip').forEach((x) => x.classList.toggle('on', x === c));
    $('#f-desc').focus({ preventScroll: true }); const sc = $('#screen'), t = $('#form-sec'); sc.scrollTo({ top: sc.scrollTop + t.getBoundingClientRect().top - sc.getBoundingClientRect().top - 8, behavior: reduce ? 'auto' : 'smooth' });
  });
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const tipo = $('#f-tipo').value, qtd = $('#f-qtd').value.trim(), desc = $('#f-desc').value.trim();
    const m = `Olá! Vi o link da bio do Instagram e quero um orçamento sob medida.\nO que eu quero: ${tipo}` + (qtd ? `\nQuantidade: ${qtd}` : '') + (desc ? `\nIdeia: ${desc}` : '') + `\nPode me passar valor e prazo?`;
    window.open(wa(m), '_blank', 'noopener');
  });
}

/* ─────────── vídeo da home: toca só quando visível ─────────── */
function initVideo() {
  const v = $('#vid-home'); if (!v) return;
  if (reduce) { v.removeAttribute('autoplay'); v.pause(); v.controls = true; return; }
  new IntersectionObserver((en) => en.forEach((x) => { x.isIntersecting && !x.target.closest('[hidden]') ? v.play().catch(() => {}) : v.pause(); }), { threshold: .4 }).observe(v);
}

/* ─────────── PÁGINA INICIAL ─────────── */
function initHome() {
  status();
  const deck = $('#deck-wrap');
  if (deck) {
    deck.innerHTML = ['papai-noel', 'rena', 'urso', 'cachorro', 'boneco-neve'].map((id, k) => { const p = byId[id];
      return `<div class="swiper-slide" data-open="${id}" role="button" tabindex="0" aria-label="${p.nome}. Abrir detalhes"><img src="${p.img}" alt="${p.nome}" width="563" height="1000" ${k ? 'loading="lazy"' : 'fetchpriority="high"'}><span class="cap">${p.nome}</span></div>`; }).join('');
    if (window.Swiper) new Swiper('#deck', { effect: 'cards', grabCursor: true, slideToClickedSlide: true, cardsEffect: { perSlideOffset: 9, perSlideRotate: 3, rotate: true, slideShadows: false } });
  }
  const fill = (sel, ids) => { const w = $(sel); if (w) w.innerHTML = ids.map((id) => cardHTML(byId[id], true)).join(''); };
  fill('#rail-natal .swiper-wrapper', ['papai-noel-duo', 'anjinho', 'arvore', 'cortadores', 'presente-articulado', 'pernudo-bola', 'guardanapo', 'cachorro']);
  fill('#rail-uteis .swiper-wrapper', ['trex', 'macaco', 'apoio-pagina', 'ganso', 'ninja', 'harry']);
  rail($('#rail-natal')); rail($('#rail-uteis'));
  initTabs(); initLoja(); initForm(); initVideo();
  const p = new URLSearchParams(location.search).get('p');
  if (p && byId[p]) { history.replaceState(null, '', '#loja'); setTimeout(() => { $$('[data-tab]').forEach((t) => (t.hidden = t.dataset.tab !== 'loja')); $$('.tb[data-go]').forEach((a) => a.toggleAttribute('aria-current', a.dataset.go === 'loja')); Sheet.open(p); }, 400); }
}

/* ─────────── PÁGINA DE PRODUTO ─────────── */
function initProduto() {
  const NOME = $('#pp-nome').textContent, PRECO = +$('#pp-nome').dataset.preco;
  let cor = 'Branco', qtd = 1;
  const buy = $('#pp-buy'), tot = $('#pp-total');
  const sync = () => {
    tot.textContent = brl(PRECO * qtd); $('#pp-qtd').textContent = qtd;
    buy.href = wa(`Olá! Vi o link da bio do Instagram e quero pedir: ${NOME} — cor: ${cor} — quantidade: ${qtd}. Pode confirmar valor e prazo?`);
  };
  $('#pp-cores').addEventListener('click', (e) => {
    const b = e.target.closest('[data-cor]'); if (!b) return;
    $$('#pp-cores [data-cor]').forEach((x) => x.setAttribute('aria-pressed', x === b)); cor = b.dataset.cor; $('#pp-cor-nome').textContent = cor; sync();
  });
  $('#pp-mais').addEventListener('click', () => { qtd = Math.min(99, qtd + 1); sync(); });
  $('#pp-menos').addEventListener('click', () => { qtd = Math.max(1, qtd - 1); sync(); });
  if (window.Swiper) new Swiper('#gal', { pagination: { el: '#gal .swiper-pagination', clickable: true }, a11y: true, grabCursor: true });
  const rel = $('#rail-rel .swiper-wrapper');
  rel.innerHTML = ['macaco', 'apoio-pagina', 'presente-articulado', 'ganso', 'ninja', 'cortadores'].map((id) => {
    const p = byId[id];
    return `<div class="swiper-slide"><a class="pc" href="index.html?p=${id}"><span class="ph"><img src="${p.img}" alt="${p.nome}" width="563" height="704" loading="lazy"></span><span class="nm">${p.nome}</span>${priceHTML(p)}</a></div>`;
  }).join('');
  rail($('#rail-rel'));
  const sh = $('#pp-share');
  if (sh) sh.addEventListener('click', async () => {
    const data = { title: document.title, url: location.href };
    try { if (navigator.share) { await navigator.share(data); return; } await navigator.clipboard.writeText(location.href); toast('Link copiado'); } catch { toast('Não foi possível compartilhar'); }
  });
  sync();
}

if (document.body.dataset.page === 'produto') initProduto(); else initHome();
})();
