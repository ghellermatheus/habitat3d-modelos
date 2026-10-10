/* Produto: galeria com "impressão" da foto, cor -> mensagem de WhatsApp */
(function () {
  var NOME = 'Esqueleto Flexível de Tiranossauro Rex';
  var PRECO = 'R$ 32,00';
  var main = document.getElementById('mainimg');
  var scan = document.getElementById('scan');
  var thumbs = document.querySelectorAll('.thumbs button');
  var lbl = document.getElementById('corlbl');
  var reduce = false;
  try { reduce = matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}
  var ALTS = [
    'Esqueleto flexível de tiranossauro rex branco em pé sobre fundo escuro',
    'Crânio do tiranossauro rex impresso em 3D, em close',
    'Esqueleto articulado de tiranossauro rex em posição de caminhada'
  ];

  function cor() {
    var c = document.querySelector('input[name="cor"]:checked');
    return c ? c.value : 'Branco';
  }
  function wa() {
    var msg = 'Oi! Quero o "' + NOME + '" (' + PRECO + ') na cor ' + cor() + '. Pode me confirmar a disponibilidade e o prazo?';
    var url = 'https://wa.me/5549988452253?text=' + encodeURIComponent(msg);
    document.querySelectorAll('[data-wa]').forEach(function (a) { a.href = url; });
  }
  document.querySelectorAll('input[name="cor"]').forEach(function (r) {
    r.addEventListener('change', function () { lbl.textContent = cor(); wa(); });
  });
  wa();

  function printIn() {
    if (reduce || !main.animate) return;
    main.animate([{ clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0% 0 0 0)' }],
      { duration: 900, easing: 'steps(14,end)' });
    if (!scan.animate) return;
    scan.style.opacity = 1;
    var h = main.parentElement.clientHeight;
    var a = scan.animate([{ top: '100%' }, { top: '0%' }], { duration: 900, easing: 'steps(14,end)' });
    a.onfinish = function () { scan.style.opacity = 0; };
  }

  thumbs.forEach(function (b) {
    b.addEventListener('click', function () {
      var i = +b.dataset.i;
      thumbs.forEach(function (t) { t.removeAttribute('aria-current'); });
      b.setAttribute('aria-current', 'true');
      main.src = b.querySelector('img').src;
      main.alt = ALTS[i] || '';
      printIn();
    });
  });
  printIn();
})();
