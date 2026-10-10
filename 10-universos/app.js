/* Habitat3D · Modelo 10 · Universos — JS mínimo (Splitting entra por CDN) */
(function () {
  var root = document.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* 1. letras individuais nos títulos (Splitting.js) */
  var titles = [].slice.call(document.querySelectorAll('[data-splitting]'));
  titles.forEach(function (el) { el.setAttribute('aria-label', el.textContent.trim()); });
  try { if (window.Splitting) Splitting({ target: titles, by: 'chars' }); } catch (e) {}
  titles.forEach(function (el) {
    [].forEach.call(el.querySelectorAll('.word,.char,.whitespace'), function (n) { n.setAttribute('aria-hidden', 'true'); });
  });
  root.classList.add('split-ready');

  /* chip do universo atual */
  if (root.dataset.u) {
    [].forEach.call(document.querySelectorAll('.chips a[data-u="' + root.dataset.u + '"]'), function (a) { a.setAttribute('aria-current', 'page'); });
  }

  /* 2. revelar ao rolar */
  var rv = [].slice.call(document.querySelectorAll('.rv'));
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    rv.forEach(function (n) { io.observe(n); });
  } else { rv.forEach(function (n) { n.classList.add('in'); }); }

  /* 3. vídeo: respeita movimento reduzido e pausa fora da tela */
  var vid = document.querySelector('video[autoplay]');
  if (vid) {
    if (reduce) { vid.removeAttribute('autoplay'); vid.pause(); vid.controls = true; }
    else if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) { var p = vid.play(); if (p && p.catch) p.catch(function () {}); } else vid.pause(); });
      }, { threshold: 0.2 }).observe(vid);
    }
  }

  /* 4. coleção: filtro Todos / Prontos / Sob encomenda */
  var colecao = document.querySelector('.colecao[data-u="' + root.dataset.u + '"]');
  var barra = colecao && colecao.querySelector('.barra');
  if (barra) {
    var btns = [].slice.call(barra.querySelectorAll('button'));
    var cont = barra.querySelector('.cont');
    var itens = [].slice.call(colecao.querySelectorAll('.grid > li'));
    var aplicar = function (f) {
      var n = 0;
      itens.forEach(function (li) {
        var ok = f === 'todos' || li.dataset.tipo === f;
        li.hidden = !ok; if (ok) n++;
      });
      btns.forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.f === f)); });
      if (cont) cont.textContent = n + (n === 1 ? ' peça' : ' peças');
    };
    btns.forEach(function (b) { b.addEventListener('click', function () { aplicar(b.dataset.f); }); });
    aplicar('todos');
  }

  /* 5. produto: galeria + cor escolhida entra na mensagem do WhatsApp */
  var main = document.querySelector('.gal-main');
  if (main) {
    var thumbs = [].slice.call(document.querySelectorAll('.thumbs button'));
    var slides = [].slice.call(main.children);
    var marcar = function (i) { thumbs.forEach(function (t, k) { t.setAttribute('aria-current', String(k === i)); }); };
    thumbs.forEach(function (t, i) {
      t.addEventListener('click', function () { main.scrollTo({ left: slides[i].offsetLeft, behavior: reduce ? 'auto' : 'smooth' }); });
    });
    main.addEventListener('scroll', function () { marcar(Math.round(main.scrollLeft / main.clientWidth)); }, { passive: true });
    marcar(0);
  }
  var cores = [].slice.call(document.querySelectorAll('input[name="cor"]'));
  if (cores.length) {
    var links = [].slice.call(document.querySelectorAll('[data-wa-produto]'));
    var rotulo = document.getElementById('cor-escolhida');
    var atualizar = function () {
      var c = cores.filter(function (i) { return i.checked; })[0];
      if (!c) return;
      if (rotulo) rotulo.textContent = c.value;
      links.forEach(function (a) {
        var msg = 'Olá! Vim pelo site da Habitat3D e quero pedir: ' + a.dataset.waProduto + ' — cor: ' + c.value + '. Pode me passar o prazo?';
        a.href = 'https://wa.me/5549988452253?text=' + encodeURIComponent(msg);
      });
    };
    cores.forEach(function (i) { i.addEventListener('change', atualizar); });
    atualizar();
  }
})();
