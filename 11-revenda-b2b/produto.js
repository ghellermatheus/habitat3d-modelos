/* Modelo 11 · Revenda B2B — página de produto */
(function () {
  'use strict';
  var PRODUTO = 'Esqueleto Flexível de Tiranossauro Rex';
  var PRECO = 32;
  var el = function (id) { return document.getElementById(id); };
  var qtd = el('qtd');

  // Galeria
  var img = el('main-img');
  var botoes = document.querySelectorAll('.thumbs button');
  botoes.forEach(function (b) {
    b.addEventListener('click', function () {
      img.src = b.getAttribute('data-src');
      img.alt = b.getAttribute('data-alt');
      botoes.forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
    });
  });

  function cor() {
    var c = document.querySelector('input[name="cor"]:checked');
    return c ? c.value : 'Branco';
  }
  function q() {
    var n = parseInt(qtd.value, 10);
    return n > 0 ? n : 1;
  }

  function atualizar() {
    var n = q();
    el('cor-nome').textContent = cor();
    el('aviso-qtd').textContent = n >= 10
      ? 'A partir de 10 peças, vale pedir proposta de revenda com condições por volume.'
      : '';
    var base = 'Olá! Quero pedir: ' + PRODUTO + ' — cor: ' + cor() + ' — quantidade: ' + n + '.';
    var link = window.waLink(base);
    el('btn-pedir').href = link;
    el('btn-pedir-fixo').href = link;
    el('btn-revenda').href = window.waLink('Olá! Tenho uma loja e quero uma proposta de revenda de: ' + PRODUTO +
      ' (cor ' + cor() + '), cerca de ' + n + ' peças. Pode me enviar as condições por volume?');

    var custo = parseFloat(el('m-custo').value.replace(',', '.')) || 0;
    el('m-margem').textContent = (((PRECO - custo) / PRECO) * 100).toFixed(1).replace('.', ',') + '%';
    el('m-lucro').textContent = window.brl(PRECO - custo);
  }

  el('menos').addEventListener('click', function () { qtd.value = Math.max(1, q() - 1); atualizar(); });
  el('mais').addEventListener('click', function () { qtd.value = Math.min(999, q() + 1); atualizar(); });
  qtd.addEventListener('input', atualizar);
  el('m-custo').addEventListener('input', atualizar);
  document.querySelectorAll('input[name="cor"]').forEach(function (r) { r.addEventListener('change', atualizar); });
  atualizar();
})();
