/* Habitat3D · Modelo 8 · Natal Express */
document.documentElement.classList.add('js');

/* ============================================================
   CONFIGURACAO (EDITAR AQUI)
   Os valores abaixo sao EXEMPLOS do prototipo. Nada disso e
   preco real nem prazo prometido.
   ============================================================ */
const CONFIG = {
  // Ultimo dia de pedidos da campanha. DATA DE EXEMPLO: troque pela real.
  ultimoDiaPedidos: '2026-12-10T23:59:59-03:00',
  // Valores de EXEMPLO por unidade, so para a mini-calculadora de brindes.
  // O orcamento real sempre sai no WhatsApp.
  brindes: {
    chaveiro: { nome: 'Chaveiro com a marca ou nome', base: 9 },
    mesa:     { nome: 'Brinde de mesa (porta-cartao, suporte)', base: 24 },
    enfeite:  { nome: 'Enfeite de Natal personalizado', base: 15 }
  },
  // Desconto por volume (EXEMPLO): a partir de N unidades, multiplica o valor.
  faixasVolume: [
    { min: 250, fator: 0.74 },
    { min: 100, fator: 0.82 },
    { min: 30,  fator: 0.9 },
    { min: 10,  fator: 1 }
  ]
};
const WA_NUMERO = '5549988452253';

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const reduz = matchMedia('(prefers-reduced-motion: reduce)').matches;
const brl = (n) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const waUrl = (msg) => `https://wa.me/${WA_NUMERO}?text=${encodeURIComponent(msg)}`;

/* ---- links do WhatsApp (data-wa="mensagem") ---- */
function ligarWa() {
  $$('[data-wa]').forEach((a) => {
    a.href = waUrl(a.dataset.wa);
    a.target = '_blank';
    a.rel = 'noopener';
  });
}
ligarWa();

/* ---- contagem regressiva ---- */
const alvo = new Date(CONFIG.ultimoDiaPedidos).getTime();
const dataBonita = new Date(CONFIG.ultimoDiaPedidos).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' });
$$('[data-data-limite]').forEach((e) => (e.textContent = dataBonita));
const p2 = (n) => String(n).padStart(2, '0');
function tick() {
  const falta = Math.max(0, alvo - Date.now());
  const d = Math.floor(falta / 864e5);
  const h = Math.floor((falta % 864e5) / 36e5);
  const m = Math.floor((falta % 36e5) / 6e4);
  const s = Math.floor((falta % 6e4) / 1e3);
  $$('[data-cd="d"]').forEach((e) => (e.textContent = p2(d)));
  $$('[data-cd="h"]').forEach((e) => (e.textContent = p2(h)));
  $$('[data-cd="m"]').forEach((e) => (e.textContent = p2(m)));
  $$('[data-cd="s"]').forEach((e) => (e.textContent = p2(s)));
  $$('[data-cd-curto]').forEach((e) => {
    e.textContent = falta === 0 ? 'encerrado' : `${d}d ${p2(h)}h ${p2(m)}m ${p2(s)}s`;
  });
}
if ($('[data-cd]') || $('[data-cd-curto]')) { tick(); setInterval(tick, 1000); }

/* ---- kits por faixa de orcamento ---- */
const abas = $$('.faixas [role="tab"]');
if (abas.length) {
  const paineis = $$('.kit');
  const abrir = (i, foco) => {
    abas.forEach((a, n) => {
      a.setAttribute('aria-selected', n === i);
      a.tabIndex = n === i ? 0 : -1;
      paineis[n].hidden = n !== i;
    });
    if (foco) abas[i].focus();
  };
  abas.forEach((a, i) => {
    a.addEventListener('click', () => abrir(i));
    a.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); abrir((i + 1) % abas.length, true); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); abrir((i + abas.length - 1) % abas.length, true); }
    });
  });
  abrir(0);
}

/* ---- calculadora de brindes (valores de exemplo) ---- */
const calc = $('#calc');
if (calc) {
  const tipo = $('#c-tipo'), range = $('#c-range'), num = $('#c-num');
  const out = $('#c-valor'), unit = $('#c-unit'), btn = $('#c-wa');
  const fator = (q) => (CONFIG.faixasVolume.find((f) => q >= f.min) || { fator: 1 }).fator;
  const render = () => {
    let q = Math.max(10, Math.min(1000, parseInt(num.value, 10) || 10));
    const cfg = CONFIG.brindes[tipo.value];
    const un = cfg.base * fator(q);
    const total = un * q;
    out.textContent = `a partir de ${brl(Math.round(total))}`;
    unit.textContent = `cerca de ${brl(un)} por unidade, para ${q} unidades (valores de exemplo)`;
    btn.dataset.wa = `Oi, Habitat3D! Quero orçamento de brindes de Natal para empresa: ${cfg.nome}, cerca de ${q} unidades. Pode me passar valores e prazo?`;
    btn.href = waUrl(btn.dataset.wa);
  };
  range.addEventListener('input', () => { num.value = range.value; render(); });
  num.addEventListener('input', () => { range.value = Math.min(500, Math.max(10, parseInt(num.value, 10) || 10)); render(); });
  tipo.addEventListener('change', render);
  render();
}

/* ---- aparecer ao rolar ---- */
const rvs = $$('.rv');
if ('IntersectionObserver' in window && !reduz) {
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add('on'); io.unobserve(e.target); }
  }), { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  rvs.forEach((el) => io.observe(el));
} else rvs.forEach((el) => el.classList.add('on'));

/* ---- video do bastidor: respeita movimento reduzido ---- */
const vid = $('video[data-bastidor]');
if (vid && reduz) { vid.pause(); vid.removeAttribute('autoplay'); vid.setAttribute('controls', ''); }

/* ---- neve (tsParticles) ---- */
function neve() {
  if (reduz || !window.tsParticles || !$('#neve')) return;
  const mobile = matchMedia('(max-width: 759px)').matches;
  tsParticles.load({
    id: 'neve',
    options: {
      fullScreen: { enable: false },
      fpsLimit: 40,
      detectRetina: false,
      background: { color: 'transparent' },
      particles: {
        number: { value: mobile ? 38 : 80 },
        color: { value: '#ffffff' },
        shape: { type: 'circle' },
        opacity: { value: { min: 0.25, max: 0.85 } },
        size: { value: { min: 1, max: mobile ? 3.2 : 4.2 } },
        move: {
          enable: true, direction: 'bottom', speed: { min: 0.5, max: 1.5 }, straight: false,
          outModes: { default: 'out' }
        },
        wobble: { enable: true, distance: 12, speed: { min: -1.5, max: 1.5 } }
      }
    }
  });
}
if (document.readyState === 'complete') neve(); else addEventListener('load', neve);

/* ---- pagina de produto: galeria, cor, quantidade ---- */
const gal = $('#galeria');
if (gal) {
  const main = $('#foto-main'), leg = $('#foto-leg');
  $$('.thumbs button', gal).forEach((b) => b.addEventListener('click', () => {
    $$('.thumbs button', gal).forEach((x) => x.removeAttribute('aria-current'));
    b.setAttribute('aria-current', 'true');
    main.src = b.dataset.src;
    main.alt = b.dataset.alt;
    leg.textContent = b.dataset.leg;
  }));
}
const prod = $('#produto-dados');
if (prod) {
  let cor = $('.cores button[aria-pressed="true"]')?.dataset.cor || '';
  let qtd = 1;
  const nome = prod.dataset.nome;
  const preco = parseFloat(prod.dataset.preco);
  const atualiza = () => {
    const msg = `Oi, Habitat3D! Quero pedir: ${nome} (${qtd} un.), cor: ${cor || 'a combinar'}. Pode confirmar disponibilidade e prazo?`;
    $$('[data-pedir]').forEach((a) => { a.href = waUrl(msg); a.target = '_blank'; a.rel = 'noopener'; });
    const t = $('#total'); if (t) t.textContent = brl(preco * qtd);
    const q = $('#qtd-out'); if (q) q.textContent = qtd;
    const cc = $('#cor-escolhida'); if (cc) cc.textContent = cor || 'a combinar';
  };
  $$('.cores button').forEach((b) => b.addEventListener('click', () => {
    $$('.cores button').forEach((x) => x.setAttribute('aria-pressed', 'false'));
    b.setAttribute('aria-pressed', 'true'); cor = b.dataset.cor; atualiza();
  }));
  $('#mais')?.addEventListener('click', () => { qtd = Math.min(99, qtd + 1); atualiza(); });
  $('#menos')?.addEventListener('click', () => { qtd = Math.max(1, qtd - 1); atualiza(); });
  atualiza();
}
