/* Modelo 11 · Revenda B2B — utilidades comuns */
(function () {
  var WA = 'https://wa.me/5549988452253';
  window.waLink = function (texto) { return WA + '?text=' + encodeURIComponent(texto); };
  window.brl = function (n) {
    return n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };
  document.querySelectorAll('[data-wa]').forEach(function (a) {
    a.href = window.waLink(a.getAttribute('data-wa'));
    a.target = '_blank';
    a.rel = 'noopener';
  });
})();
