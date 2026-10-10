/* Modelo 11 · Revenda B2B — simulador de margem, tabela por volume e formulário */
(function () {
  'use strict';

  // VALORES DE EXEMPLO: descontos por faixa de volume (não são preços reais).
  var FAIXAS = [
    { rotulo: '10–24', min: 10, desc: 0 },
    { rotulo: '25–49', min: 25, desc: 0.06 },
    { rotulo: '50–99', min: 50, desc: 0.12 },
    { rotulo: '100+', min: 100, desc: 0.18 }
  ];
  var CUSTO_EXEMPLO_PCT = 0.55; // custo de exemplo = 55% do preço de venda

  var el = function (id) { return document.getElementById(id); };
  var selProduto = el('produto');
  var inVenda = el('venda');
  var inCusto = el('custo');
  var inQtd = el('qtd');
  var outQtd = el('qtd-out');
  var tbl = el('tbl');
  var chart = null;

  function pct(n) { return (n * 100).toFixed(1).replace('.', ',') + '%'; }
  function num(v) { var n = parseFloat(String(v).replace(',', '.')); return isFinite(n) ? n : 0; }
  function faixaDe(q) {
    var f = FAIXAS[0];
    FAIXAS.forEach(function (x) { if (q >= x.min) f = x; });
    return f;
  }
  function margem(venda, custo) { return venda > 0 ? (venda - custo) / venda : 0; }

  function desenharTabela(venda, custoBase, ativa) {
    var html = '';
    FAIXAS.forEach(function (f) {
      var c = custoBase * (1 - f.desc);
      var ativo = f === ativa;
      html += '<tr' + (ativo ? ' class="is-active" aria-current="true"' : '') + '>' +
        '<td>' + f.rotulo + (ativo ? ' (seu pedido)' : '') + '</td>' +
        '<td>' + (f.desc ? '−' + Math.round(f.desc * 100) + '%' : '—') + '</td>' +
        '<td>' + window.brl(c) + '</td>' +
        '<td>' + pct(margem(venda, c)) + '</td></tr>';
    });
    tbl.innerHTML = html;
  }

  var rotulosNaBarra = {
    id: 'rotulosNaBarra',
    afterDatasetsDraw: function (c) {
      var ctx = c.ctx;
      ctx.save();
      ctx.font = '600 12px Onest, sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      c.getDatasetMeta(0).data.forEach(function (bar, i) {
        var v = c.data.datasets[0].data[i];
        ctx.fillText(v.toFixed(0) + '%', bar.x, bar.y - 6);
      });
      ctx.restore();
    }
  };

  function atualizarGrafico(venda, custoBase, ativa) {
    if (typeof Chart === 'undefined') { return; }
    var dados = FAIXAS.map(function (f) { return Math.max(0, margem(venda, custoBase * (1 - f.desc)) * 100); });
    var cores = FAIXAS.map(function (f) { return f === ativa ? '#ff6b5e' : '#5d7ea6'; });
    var teto = Math.max(60, Math.ceil(Math.max.apply(null, dados) / 10) * 10 + 10);
    if (!chart) {
      var reduz = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      chart = new Chart(el('grafico'), {
        type: 'bar',
        data: { labels: FAIXAS.map(function (f) { return f.rotulo + ' peças'; }), datasets: [{ data: dados, backgroundColor: cores, borderRadius: 6, maxBarThickness: 64 }] },
        options: {
          responsive: true, maintainAspectRatio: false, animation: reduz ? false : { duration: 500 },
          layout: { padding: { top: 18 } },
          plugins: { legend: { display: false }, tooltip: { callbacks: { label: function (x) { return 'Margem bruta: ' + x.parsed.y.toFixed(1).replace('.', ',') + '%'; } } } },
          scales: {
            y: { min: 0, max: teto, ticks: { color: '#c9d6e3', callback: function (v) { return v + '%'; } }, grid: { color: 'rgba(255,255,255,0.12)' } },
            x: { ticks: { color: '#e8eef6', font: { size: 12 } }, grid: { display: false } }
          }
        },
        plugins: [rotulosNaBarra]
      });
    } else {
      chart.data.datasets[0].data = dados;
      chart.data.datasets[0].backgroundColor = cores;
      chart.options.scales.y.max = teto;
      chart.update('none');
    }
  }

  function atualizar() {
    var venda = num(inVenda.value);
    var custoBase = num(inCusto.value);
    var q = parseInt(inQtd.value, 10) || FAIXAS[0].min;
    outQtd.textContent = q + ' peças';
    var faixa = faixaDe(q);
    var custo = custoBase * (1 - faixa.desc);
    var lucroPeca = venda - custo;
    el('k-margem').textContent = venda > 0 ? pct(margem(venda, custo)) : '—';
    el('k-lucro-peca').textContent = window.brl(lucroPeca);
    el('k-invest').textContent = window.brl(custo * q);
    el('k-lucro-lote').textContent = window.brl(lucroPeca * q);
    desenharTabela(venda, custoBase, faixa);
    atualizarGrafico(venda, custoBase, faixa);

    var nome = selProduto.options[selProduto.selectedIndex].getAttribute('data-nome');
    var msg = 'Olá! Fiz a simulação no site: ' + nome + ', ' + q + ' peças, vendendo a ' + window.brl(venda) +
      '. Quero uma proposta de revenda com as condições reais.';
    el('sim-wa').href = window.waLink(msg);
  }

  function trocarProduto() {
    var preco = num(selProduto.value);
    inVenda.value = preco.toFixed(2);
    inCusto.value = (Math.round(preco * CUSTO_EXEMPLO_PCT * 100) / 100).toFixed(2);
    atualizar();
  }

  selProduto.addEventListener('change', trocarProduto);
  [inVenda, inCusto, inQtd].forEach(function (i) { i.addEventListener('input', atualizar); });

  // O Chart.js carrega com defer; no pior caso, a simulação funciona sem o gráfico.
  trocarProduto();
  window.addEventListener('load', atualizar);

  // Formulário -> WhatsApp
  var form = el('form-proposta');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var erro = el('f-erro');
    var empresa = el('f-empresa').value.trim();
    var cidade = el('f-cidade').value.trim();
    if (!empresa || !cidade) {
      erro.textContent = 'Preencha o nome da loja/empresa e a cidade para montar a mensagem.';
      (empresa ? el('f-cidade') : el('f-empresa')).focus();
      return;
    }
    erro.textContent = '';
    var qtd = el('f-qtd').value.trim();
    var msg = 'Olá! Quero uma proposta de revenda.\n' +
      'Loja/empresa: ' + empresa + '\n' +
      'Cidade: ' + cidade + '\n' +
      'Tipo de negócio: ' + el('f-tipo').value + '\n' +
      'Interesse: ' + el('f-interesse').value + '\n' +
      (qtd ? 'Quantidade estimada: ' + qtd + ' peças\n' : '') +
      'Pode me enviar as condições?';
    window.open(window.waLink(msg), '_blank', 'noopener');
  });
})();
