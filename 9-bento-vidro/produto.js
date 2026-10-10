/* Modelo 9 · Bento Vidro — dados reais de midia/produtos.json + render da subpágina de produto */
(function () {
  'use strict';
  var BASE = '../midia/produtos/';
  var CORES = [
    ['Branco', '#f1f1ee'], ['Preto', '#1b1b1f'], ['Vermelho', '#e5362f'], ['Verde', '#22b455'],
    ['Laranja', '#ff8a1f'], ['Azul', '#2d6bff'], ['Rosa', '#ff6fb0']
  ];
  var P = {
    'esqueleto-flexivel-de-tiranossauro-rex': {
      nome: 'Esqueleto Flexível de Tiranossauro Rex', preco: 32, nicho: 'Flexíveis', pos: '50% 60%',
      desc: 'Um T-Rex de esqueleto com articulações: o corpo, a cauda e as patas se movem. Impresso em 3D sob demanda, com revisão e acabamento manual.',
      imgs: ['esqueleto-flexivel-de-tiranossauro-rex-1.webp', 'esqueleto-flexivel-de-tiranossauro-rex-2.webp', 'esqueleto-flexivel-de-tiranossauro-rex-3.webp'],
      alt: ['Esqueleto flexível de tiranossauro rex branco visto de lado', 'Detalhe da cabeça e dos dentes do esqueleto de tiranossauro', 'Esqueleto flexível de tiranossauro rex em outro ângulo']
    },
    'macaco-das-banana': {
      nome: 'Macaco Segura Bananas', preco: 30, nicho: 'Casa e úteis', pos: '50% 52%', cores: ['Marrom'],
      desc: 'Um macaquinho que se pendura numa barra ou puxador e segura o cacho de bananas, deixando a fruta no ar e a bancada livre.',
      imgs: ['macaco-das-banana-1.webp'], alt: ['Macaco marrom impresso em 3D pendurado na barra do armário segurando bananas']
    },
    'apoio-para-paginas-de-livro-1687004': {
      nome: 'Apoio para Páginas de Livro', preco: 6.3, nicho: 'Acessórios úteis', pos: '50% 70%',
      desc: 'Apoio que se encaixa no polegar e mantém as páginas abertas, pra ler com uma mão só.',
      imgs: ['apoio-para-paginas-de-livro-1687004-1.webp'], alt: ['Apoio vermelho preso ao polegar segurando as páginas de um livro aberto']
    },
    'porta-incenso-darth-vader-2883115': {
      nome: 'Porta-incenso Ninja', preco: 87.1, nicho: 'Filmes e desenhos', pos: '50% 62%',
      desc: 'Porta-incenso com um guerreiro ninja em pose de combate: a varetinha de incenso vira a espada dele. Base alongada que recolhe as cinzas.',
      imgs: ['porta-incenso-darth-vader-2883115-1.webp'], alt: ['Porta-incenso com guerreiro ninja cinza, o incenso forma a espada']
    },
    'conjunto-de-cortadores-de-biscoito-de-natal-1956436': {
      nome: 'Conjunto de Cortadores de Biscoito de Natal', preco: 25.33, nicho: 'Natal', pos: '50% 50%', badge: 'Novo',
      desc: 'Conjunto de cortadores com temas de Natal: árvore, rena, trenó, presente, biscoito de gengibre, Papai Noel e anjinho.',
      imgs: ['conjunto-de-cortadores-de-biscoito-de-na-1.webp', 'conjunto-de-cortadores-de-biscoito-de-na-2.webp'],
      alt: ['Sete cortadores de biscoito de Natal vermelhos', 'Cortadores de biscoito de Natal em outro ângulo']
    },
    'presente-de-natal-articulado-774384': {
      nome: 'Presente de Natal Articulado', preco: 46.08, nicho: 'Natal', pos: '30% 30%',
      desc: 'Uma caixa de presente sorridente, com laço e perninhas articuladas, pra sentar na beira da estante e enfeitar o Natal.',
      imgs: ['presente-de-natal-articulado-774384-1.webp'], alt: ['Caixa de presente sorridente branca com laço vermelho e pernas articuladas']
    },
    'porta-cartoes-para-dentista-2594018': {
      nome: 'Porta-Cartões para Dentista', preco: 82.32, nicho: 'Para profissionais', pos: '50% 50%',
      desc: 'Dois molares sobre uma base com o nome do profissional gravado, pra deixar os cartões à mostra no consultório. O nome vai do seu jeito.',
      imgs: ['porta-cartoes-para-dentista-2594018-1.webp'], alt: ['Dois molares brancos sobre uma base com nome gravado']
    }
  };
  var DEFAULT = 'esqueleto-flexivel-de-tiranossauro-rex';
  var slug = (new URLSearchParams(location.search).get('p')) || DEFAULT;
  if (!P[slug]) slug = DEFAULT;
  var p = P[slug];
  var brl = function (n) { return 'R$ ' + n.toFixed(2).replace('.', ','); };
  var $ = function (id) { return document.getElementById(id); };

  var state = { cor: null, qtd: 1 };
  var cores = (p.cores && p.cores.length) ? p.cores.map(function (n) { return [n, '#8a5a3a']; }) : CORES;
  state.cor = cores[0][0];

  // texto e meta
  document.title = p.nome + ' | Habitat3D';
  var md = document.querySelector('meta[name=description]');
  if (md) md.content = p.nome + ' por ' + brl(p.preco) + '. Impressão 3D sob demanda com acabamento manual. Peça pelo WhatsApp, resposta em até 1 hora.';
  $('nome').textContent = p.nome;
  $('crumb').textContent = p.nome;
  $('preco').textContent = brl(p.preco);
  $('preco-bar').textContent = brl(p.preco);
  $('nicho').textContent = p.nicho;
  $('desc').textContent = p.desc;

  // galeria
  var main = $('main-img');
  var thumbs = $('thumbs');
  function show(i) {
    main.src = BASE + p.imgs[i];
    main.alt = p.alt[i] || p.nome;
    main.style.objectPosition = i === 0 ? p.pos : '50% 50%';
    Array.prototype.forEach.call(thumbs.children, function (b, k) { b.setAttribute('aria-current', k === i ? 'true' : 'false'); });
  }
  thumbs.textContent = '';
  p.imgs.forEach(function (f, i) {
    var b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('aria-label', 'Ver foto ' + (i + 1) + ' de ' + p.imgs.length);
    var im = document.createElement('img');
    im.src = BASE + f; im.alt = ''; im.width = 56; im.height = 56; im.loading = 'lazy';
    b.appendChild(im);
    b.addEventListener('click', function () { show(i); });
    thumbs.appendChild(b);
  });
  thumbs.hidden = p.imgs.length < 2;
  show(0);

  // cores
  var sw = $('swatches');
  sw.textContent = '';
  cores.forEach(function (c, i) {
    var b = document.createElement('button');
    b.type = 'button'; b.setAttribute('role', 'radio');
    b.setAttribute('aria-checked', i === 0 ? 'true' : 'false');
    b.setAttribute('aria-label', c[0]);
    b.title = c[0];
    b.style.setProperty('--c', c[1]);
    b.addEventListener('click', function () {
      state.cor = c[0];
      Array.prototype.forEach.call(sw.children, function (x) { x.setAttribute('aria-checked', x === b ? 'true' : 'false'); });
      update();
    });
    sw.appendChild(b);
  });

  // quantidade
  $('menos').addEventListener('click', function () { state.qtd = Math.max(1, state.qtd - 1); update(); });
  $('mais').addEventListener('click', function () { state.qtd = Math.min(99, state.qtd + 1); update(); });

  function update() {
    $('cor-nome').textContent = state.cor;
    $('qtd').textContent = state.qtd;
    var msg = 'Olá! Vi no site da Habitat3D e quero pedir: ' + p.nome + ' · cor: ' + state.cor + ' · quantidade: ' + state.qtd + ' (' + brl(p.preco) + ' cada). Pode confirmar disponibilidade e prazo?';
    var href = 'https://wa.me/5549988452253?text=' + encodeURIComponent(msg);
    document.querySelectorAll('[data-pedir]').forEach(function (a) { a.href = href; a.target = '_blank'; a.rel = 'noopener'; });
  }
  update();

  // relacionados (3 outros)
  var rel = $('rel');
  rel.textContent = '';
  Object.keys(P).filter(function (k) { return k !== slug; }).slice(0, 3).forEach(function (k) {
    var q = P[k];
    var a = document.createElement('a');
    a.className = 'glass prod rise';
    a.href = 'produto.html?p=' + k;
    var im = document.createElement('img');
    im.className = 'fill'; im.src = BASE + q.imgs[0]; im.alt = q.alt[0]; im.loading = 'lazy'; im.width = 563; im.height = 1000;
    im.style.objectPosition = q.pos;
    var cap = document.createElement('span'); cap.className = 'cap';
    var b = document.createElement('b'); b.textContent = q.nome;
    var s = document.createElement('span'); s.textContent = brl(q.preco);
    cap.appendChild(b); cap.appendChild(s);
    a.appendChild(im); a.appendChild(cap);
    rel.appendChild(a);
  });

  var cta = document.createElement('a');
  cta.className = 'glass t-cta rel rise';
  cta.href = 'https://wa.me/5549988452253';
  cta.setAttribute('data-wa', 'Olá! Vi o ' + p.nome + ' no site da Habitat3D e queria uma versão personalizada.');
  cta.style.alignContent = 'end';
  cta.innerHTML = '<h3>Quer do seu jeito?</h3><p>Outra cor, nome ou tema: a gente personaliza e orça sem compromisso.</p>';
  rel.appendChild(cta);
  if (window.habWire) window.habWire(rel);

  // JSON-LD do produto atual
  var ld = $('ld');
  if (ld) {
    ld.textContent = JSON.stringify({
      '@context': 'https://schema.org', '@type': 'Product',
      name: p.nome, description: p.desc,
      image: p.imgs.map(function (f) { return BASE + f; }),
      brand: { '@type': 'Brand', name: 'Habitat3D' },
      offers: { '@type': 'Offer', priceCurrency: 'BRL', price: p.preco.toFixed(2), availability: 'https://schema.org/InStock', itemCondition: 'https://schema.org/NewCondition', url: 'https://www.habitat3d.com.br/p/' + slug, seller: { '@type': 'Organization', name: 'Habitat3D' } }
    });
  }
})();
