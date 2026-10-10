/* Modelo 14 · Colagem Local — JS mínimo: entrada do hero (GSAP), vídeo, galeria e pedido do produto */
(function () {
  'use strict';
  var reduz = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var FONE = '5549988452253';
  function wa(msg) { return 'https://wa.me/' + FONE + '?text=' + encodeURIComponent(msg); }

  /* ---- UMA entrada orquestrada: peças coladas no hero ---- */
  function entrada() {
    if (reduz || !window.gsap || !document.querySelector('.hero')) return;
    var g = window.gsap;
    var tl = g.timeline({ defaults: { ease: 'power3.out' } });
    tl.from('.hero .kicker', { y: -24, rotation: -8, autoAlpha: 0, duration: 0.5 })
      .from('.hero h1', { y: 40, autoAlpha: 0, duration: 0.7 }, '-=0.25')
      .from('.hero .lead, .hero .acoes, .hero .pontos', { y: 22, autoAlpha: 0, duration: 0.5, stagger: 0.1 }, '-=0.4')
      .from('.colagem .foto', { y: -160, rotation: '+=22', scale: 1.18, autoAlpha: 0, duration: 0.75, stagger: 0.16, ease: 'back.out(1.4)' }, 0.25)
      .from('.colagem .fita', { scaleX: 0, autoAlpha: 0, duration: 0.3, stagger: 0.1, transformOrigin: 'left center' }, '-=0.35')
      .from('.colagem .carimbo', { scale: 2.6, autoAlpha: 0, rotation: '-=18', duration: 0.35, ease: 'power4.in' }, '-=0.1')
      .from('.colagem .nota, .colagem .seta, .colagem .sol', { autoAlpha: 0, duration: 0.5, stagger: 0.1 }, '-=0.1');
  }
  if (window.gsap) entrada(); else window.addEventListener('load', entrada);

  /* ---- vídeo de bastidores: toca só na tela, botão de pausa ---- */
  var v = document.querySelector('.video-box video');
  if (v) {
    var btn = document.querySelector('.pausa');
    var manual = false;
    if (reduz) { v.removeAttribute('autoplay'); v.pause(); }
    if ('IntersectionObserver' in window && !reduz) {
      new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (manual) return;
          if (e.isIntersecting) { var p = v.play(); if (p && p.catch) p.catch(function () {}); } else v.pause();
        });
      }, { threshold: 0.4 }).observe(v);
    }
    if (btn) btn.addEventListener('click', function () {
      manual = true;
      if (v.paused) { v.play(); btn.textContent = 'Pausar'; btn.setAttribute('aria-pressed', 'false'); }
      else { v.pause(); btn.textContent = 'Tocar'; btn.setAttribute('aria-pressed', 'true'); }
    });
    if (btn && reduz) { btn.textContent = 'Tocar'; btn.setAttribute('aria-pressed', 'true'); }
  }

  /* ---- página de produto: galeria + pedido com cor e quantidade ---- */
  var pedido = document.getElementById('pedido');
  if (pedido) {
    var nome = pedido.getAttribute('data-nome');
    var main = document.getElementById('gal-img');
    document.querySelectorAll('.thumbs button').forEach(function (b) {
      b.addEventListener('click', function () {
        main.src = b.getAttribute('data-src');
        main.alt = b.getAttribute('data-alt');
        document.querySelectorAll('.thumbs button').forEach(function (o) { o.setAttribute('aria-current', 'false'); });
        b.setAttribute('aria-current', 'true');
      });
    });
    var qtd = 1;
    var out = document.getElementById('qtd-out');
    function msg() {
      var cor = document.querySelector('input[name="cor"]:checked');
      var m = 'Oi! Quero pedir: ' + nome + (cor ? ' (cor: ' + cor.value + ')' : '') + (qtd > 1 ? ' — ' + qtd + ' unidades' : '') + '.';
      return m;
    }
    function atualiza() {
      out.textContent = qtd;
      var href = wa(msg());
      document.querySelectorAll('[data-wa-produto]').forEach(function (a) { a.href = href; });
    }
    document.getElementById('menos').addEventListener('click', function () { if (qtd > 1) { qtd--; atualiza(); } });
    document.getElementById('mais').addEventListener('click', function () { if (qtd < 99) { qtd++; atualiza(); } });
    document.querySelectorAll('input[name="cor"]').forEach(function (i) { i.addEventListener('change', atualiza); });
    atualiza();
  }
})();
