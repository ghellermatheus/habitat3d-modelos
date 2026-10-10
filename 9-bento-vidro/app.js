/* Modelo 9 · Bento Vidro — JS mínimo: links do WhatsApp, brilho do ponteiro, entrada orquestrada (Motion) */
(function () {
  'use strict';
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var WA = 'https://wa.me/5549988452253';

  // 1) Mensagens pré-preenchidas do WhatsApp (o href sem JS já abre a conversa)
  function wire(root) {
    (root || document).querySelectorAll('[data-wa]').forEach(function (a) {
      a.href = WA + '?text=' + encodeURIComponent(a.getAttribute('data-wa'));
      a.target = '_blank';
      a.rel = 'noopener';
    });
  }
  wire();
  window.habWire = wire;

  // 2) Brilho especular seguindo o ponteiro (só onde há hover real)
  if (matchMedia('(hover: hover)').matches && !reduce) {
    document.addEventListener('pointermove', function (e) {
      var g = e.target.closest && e.target.closest('.glass');
      if (!g) return;
      var r = g.getBoundingClientRect();
      g.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      g.style.setProperty('--my', (e.clientY - r.top) + 'px');
    }, { passive: true });
  }

  // 3) Vídeo parado para quem pede menos movimento
  if (reduce) document.querySelectorAll('video[autoplay]').forEach(function (v) { v.removeAttribute('autoplay'); v.pause(); });

  // 4) Entrada orquestrada do hero (uma só)
  var M = window.Motion;
  var root = document.documentElement;
  if (reduce || !M || !M.animate) { root.classList.remove('js-motion'); return; }

  var h1 = document.querySelector('[data-split]');
  var words = [];
  if (h1) {
    (function split(node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (n) {
        if (n.nodeType === 3) {
          var frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(function (t) {
            if (!t) return;
            if (/^\s+$/.test(t)) { frag.appendChild(document.createTextNode(' ')); return; }
            var s = document.createElement('span');
            s.className = 'w'; s.textContent = t;
            s.style.cssText = 'display:inline-block;opacity:0;will-change:transform,opacity';
            words.push(s); frag.appendChild(s);
          });
          node.replaceChild(frag, n);
        } else if (n.nodeType === 1 && n.classList.contains('grad')) {
          n.style.cssText += ';display:inline-block;opacity:0';
          words.push(n);
        }
      });
    })(h1);
  }

  var tiles = document.querySelectorAll('[data-hero]');
  var nav = document.querySelector('.nav');
  root.classList.remove('js-motion');          // libera o CSS; Motion assume os estados iniciais abaixo
  tiles.forEach(function (t) { t.style.opacity = 0; });
  if (nav) nav.style.opacity = 0;

  var ease = [0.22, 1, 0.36, 1];
  M.animate(nav, { opacity: [0, 1] }, { duration: .8, delay: .1 });
  M.animate(tiles, { opacity: [0, 1], y: [34, 0], scale: [.96, 1] },
    { duration: .9, delay: M.stagger(.09, { startDelay: .15 }), ease: ease });
  if (words.length) {
    M.animate(words, { opacity: [0, 1], y: [26, 0] },
      { duration: .75, delay: M.stagger(.055, { startDelay: .45 }), ease: ease });
  }
})();
