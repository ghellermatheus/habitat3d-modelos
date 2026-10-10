/* Loja Relâmpago — catálogo + cesta (Alpine.js). Sem build. */
(function () {
  var WA = '5549988452253';
  var M = '../midia/';
  var P = M + 'produtos/';
  var S = M + 'stock/';

  // Preços: SÓ os de midia/produtos.json. Demais itens = null ("consulte").
  var PRODUTOS = [
    // ---- Natal
    { id: 'papai-noel-trico', nome: 'Boneco de Papai Noel Estilo Tricô', cat: 'natal', preco: null, img: [M + 'papai-noel.webp'], pos: '50% 62%', tags: 'papai noel natal tricô boneco decoração', desc: 'Papai Noel com textura de tricô, impresso em 3D. Fica lindo na estante, na mesa de Natal ou de presente.' },
    { id: 'papai-noel-duo', nome: 'Dupla de Papais Noéis Estilo Tricô', cat: 'natal', preco: null, img: [M + 'papai-noel-duo.webp'], pos: '50% 55%', tags: 'papai noel dupla natal tricô mini', desc: 'Papai Noel grande com o mini sentado ao lado. Dupla de Natal com textura de tricô.' },
    { id: 'rena-trico', nome: 'Rena Estilo Tricô', cat: 'natal', preco: null, img: [M + 'rena.webp'], pos: '50% 62%', tags: 'rena natal tricô', desc: 'Rena de Natal com textura de tricô e nariz vermelho, impressa em 3D.' },
    { id: 'urso-natal', nome: 'Ursinho de Natal com Gorro', cat: 'natal', preco: null, img: [M + 'urso.webp'], pos: '50% 68%', tags: 'urso ursinho gorro natal', desc: 'Ursinho com gorro de Natal, textura de tricô.' },
    { id: 'cachorro-natal', nome: 'Cachorrinho de Natal com Gorro', cat: 'natal', preco: null, img: [M + 'cachorro.webp'], pos: '50% 60%', tags: 'cachorro cachorrinho pet gorro natal', desc: 'Cachorrinho com gorro de Papai Noel, textura de tricô.' },
    { id: 'boneco-neve', nome: 'Boneco de Neve Estilo Tricô', cat: 'natal', preco: null, img: [M + 'boneco-neve.webp'], pos: '35% 62%', tags: 'boneco de neve natal tricô', desc: 'Boneco de neve com gorro e cachecol vermelhos, textura de tricô.' },
    { id: 'anjinho', nome: 'Anjinho Sentado', cat: 'natal', preco: null, img: [M + 'anjinho.webp'], pos: '70% 60%', tags: 'anjo anjinho natal enfeite', desc: 'Anjinho sentado para decorar prateleira, bancada ou mesa de Natal.' },
    { id: 'bola-pernuda', nome: 'Bola de Natal Pernuda', cat: 'natal', preco: null, img: [M + 'pernudo-bola.webp'], pos: '55% 62%', tags: 'bola natal pernuda divertido enfeite', desc: 'Bola de Natal com perninhas: enfeite divertido para pendurar ou sentar na borda.' },
    { id: 'arvore-articulada', nome: 'Árvore de Natal Articulada Decorada', cat: 'natal', preco: null, img: [M + 'arvore.webp'], pos: '50% 60%', tags: 'árvore natal articulada decoração', desc: 'Árvore articulada impressa em 3D, em cores de Natal.' },
    { id: 'porta-guardanapo', nome: 'Porta Guardanapo com Design de Galhos', cat: 'natal', preco: null, img: [M + 'guardanapo.webp'], pos: '50% 65%', tags: 'porta guardanapo galhos mesa natal cozinha', desc: 'Porta-guardanapo com design de galhos para mesa posta e ceia.' },
    { id: 'presente-natal', nome: 'Presente de Natal Articulado', cat: 'natal', preco: 46.08, img: [P + 'presente-de-natal-articulado-774384-1.webp'], pos: '50% 50%', tags: 'presente natal articulado caixa', desc: 'Presente de Natal articulado, impresso em 3D.' },
    { id: 'cortadores-biscoito', nome: 'Conjunto de Cortadores de Biscoito de Natal', cat: 'natal', preco: 25.33, badge: 'Novo', img: [P + 'conjunto-de-cortadores-de-biscoito-de-na-1.webp', P + 'conjunto-de-cortadores-de-biscoito-de-na-2.webp'], pos: '50% 40%', tags: 'cortador biscoito natal cozinha kit', desc: 'Conjunto de cortadores de biscoito com motivos de Natal.' },
    // ---- Casa & cozinha
    { id: 'porta-vinho-ganso', nome: 'Porta-vinho Ganso', cat: 'casa', preco: null, img: [M + 'ganso.webp'], pos: '50% 50%', tags: 'vinho ganso porta vinho garrafa presente', desc: 'Suporte de garrafa em forma de ganso: a garrafa fica equilibrada e vira peça de decoração.' },
    { id: 'macaco-banana', nome: 'Macaco Segura Bananas', cat: 'casa', preco: 30, cores: ['Marrom'], img: [P + 'macaco-das-banana-1.webp'], pos: '50% 60%', tags: 'macaco banana cozinha gancho geladeira', desc: 'Macaquinho que segura o cacho de bananas, para pendurar na cozinha.' },
    // ---- Mesa & escritório
    { id: 'apoio-paginas', nome: 'Apoio para Páginas de Livro', cat: 'escritorio', preco: 6.3, img: [P + 'apoio-para-paginas-de-livro-1687004-1.webp'], pos: '50% 50%', tags: 'apoio página livro leitura útil', desc: 'Peça pequena que segura as páginas abertas para você ler com as duas mãos livres.' },
    { id: 'apoio-livros-harry', nome: 'Apoio de Livros Harry', cat: 'escritorio', preco: null, img: [M + 'harry.webp'], pos: '45% 60%', tags: 'apoio livros estante harry suporte', desc: 'Apoio de livros com figura, para manter a estante em pé com estilo.' },
    { id: 'porta-cartoes-dentista', nome: 'Porta-Cartões para Dentista', cat: 'escritorio', preco: 82.32, img: [P + 'porta-cartoes-para-dentista-2594018-1.webp'], pos: '50% 50%', tags: 'porta cartões dentista consultório dente balcão', desc: 'Porta-cartões em formato de dentes, com nome do consultório. Ótimo para balcão de recepção.' },
    { id: 'suporte-alexa-flamengo', nome: 'Suporte para Alexa Flamengo', cat: 'escritorio', preco: null, img: [M + 'alexa.webp'], pos: '50% 45%', tags: 'alexa suporte flamengo echo dot time futebol', desc: 'Suporte para Alexa com escudo do time. Dá para pedir com outro nome ou tema.', video: M + 'alexa.mp4' },
    // ---- Geek & flexíveis
    { id: 'porta-incenso-ninja', nome: 'Porta-incenso Ninja', cat: 'geek', preco: 87.1, img: [P + 'porta-incenso-darth-vader-2883115-1.webp'], pos: '50% 62%', tags: 'porta incenso ninja geek filme decoração', desc: 'Porta-incenso com figura de guerreiro, para decorar e perfumar o ambiente.' },
    { id: 'esqueleto-t-rex', nome: 'Esqueleto Flexível de Tiranossauro Rex', cat: 'geek', preco: 32, img: [P + 'esqueleto-flexivel-de-tiranossauro-rex-1.webp', P + 'esqueleto-flexivel-de-tiranossauro-rex-2.webp', P + 'esqueleto-flexivel-de-tiranossauro-rex-3.webp'], pos: '50% 62%', tags: 'esqueleto flexível t-rex dinossauro tiranossauro brinquedo articulado', desc: 'Esqueleto de tiranossauro rex flexível e articulado, impresso em 3D: dá para mexer a cauda, o corpo e a mandíbula.' },
    // ---- Chaveiros
    { id: 'chaveiros-polvos', nome: 'Chaveiros Polvinhos', cat: 'chaveiro', preco: null, img: [M + 'polvos.webp'], pos: '50% 62%', tags: 'chaveiro polvo polvinho brinde revenda', desc: 'Chaveiros de polvinho, coloridos. Também em kit para revenda.' },
    // ---- Sob medida
    { id: 'sm-tag-pet', nome: 'Tag Pet Personalizada', cat: 'sob-medida', preco: null, img: [S + 'pet-pexels-7210639.webp'], pos: '50% 45%', tags: 'tag pet identificação cachorro gato', desc: 'Plaquinha de identificação com o nome do seu pet e o seu telefone.', foto: 'Foto ilustrativa (banco de imagens)' },
    { id: 'sm-chaveiro-revenda', nome: 'Chaveiros para Revenda', cat: 'sob-medida', preco: null, img: [S + 'chaveiro-pixabay-525732.webp'], pos: '50% 50%', tags: 'chaveiro revenda lojista consignação mostruário', desc: 'Kit com mostruário em consignação para vender na sua loja sem comprometer o caixa.', foto: 'Foto ilustrativa (banco de imagens)' },
    { id: 'sm-brinde-empresa', nome: 'Brindes com a Marca da Empresa', cat: 'sob-medida', preco: null, img: [S + 'mesa-escritorio-pexels-19238352.webp'], pos: '50% 50%', tags: 'brinde empresa corporativo marca logo b2b', desc: 'Peças com cores, formato e a sua marca, do protótipo à série.', foto: 'Foto ilustrativa (banco de imagens)' },
    { id: 'sm-natal-nome', nome: 'Natal Personalizado com Nome', cat: 'sob-medida', preco: null, img: [S + 'natal-decoracao-pexels-714899.webp'], pos: '50% 50%', tags: 'natal personalizado nome enfeite bola', desc: 'Enfeites e presentes de Natal com nome ou tema, feitos sob encomenda.', foto: 'Foto ilustrativa (banco de imagens)' },
    { id: 'sm-do-seu-jeito', nome: 'Peça do Seu Jeito (foto ou desenho)', cat: 'sob-medida', preco: null, img: [S + 'impressao-3d-pexels-31137405.webp'], pos: '50% 50%', tags: 'personalizado foto desenho sob medida peça única', desc: 'Manda uma foto ou um desenho e a gente modela e transforma em peça real.', foto: 'Foto ilustrativa (banco de imagens)' }
  ];

  var CATS = [
    { id: 'natal', nome: 'Natal' },
    { id: 'casa', nome: 'Casa & Cozinha' },
    { id: 'escritorio', nome: 'Mesa & Escritório' },
    { id: 'geek', nome: 'Geek & Flexíveis' },
    { id: 'chaveiro', nome: 'Chaveiros' }
  ];

  function brl(n) {
    return Number(n).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }
  function norm(s) {
    return String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  }
  function wa(msg) {
    return 'https://wa.me/' + WA + '?text=' + encodeURIComponent(msg);
  }
  function get(id) {
    for (var i = 0; i < PRODUTOS.length; i++) if (PRODUTOS[i].id === id) return PRODUTOS[i];
    return null;
  }

  window.LOJA = { PRODUTOS: PRODUTOS, CATS: CATS, brl: brl, norm: norm, wa: wa, get: get };

  document.addEventListener('alpine:init', function () {
    var KEY = 'h3d-loja-relampago-cesta';

    Alpine.store('cesta', {
      itens: [],
      aberta: false,
      nota: '',
      aviso: '',
      init: function () {
        try {
          var raw = localStorage.getItem(KEY);
          if (raw) {
            var d = JSON.parse(raw);
            if (d && Array.isArray(d.itens)) {
              this.itens = d.itens.filter(function (i) { return get(i.id); });
              this.nota = d.nota || '';
            }
          }
        } catch (e) { /* sem storage: segue só em memória */ }
      },
      salvar: function () {
        try { localStorage.setItem(KEY, JSON.stringify({ itens: this.itens, nota: this.nota })); } catch (e) {}
      },
      chave: function (id, cor) { return id + '|' + (cor || ''); },
      qtdDe: function (id) {
        return this.itens.filter(function (i) { return i.id === id; }).reduce(function (a, i) { return a + i.qtd; }, 0);
      },
      add: function (id, cor, qtd) {
        qtd = qtd || 1;
        var k = this.chave(id, cor);
        var ex = this.itens.find(function (i) { return i.k === k; });
        if (ex) ex.qtd += qtd; else this.itens.push({ k: k, id: id, cor: cor || '', qtd: qtd });
        var p = get(id);
        this.aviso = (p ? p.nome : 'Item') + ' adicionado. Cesta com ' + this.total + ' ' + (this.total === 1 ? 'item' : 'itens') + '.';
        this.salvar();
      },
      kDe: function (id) {
        var i = this.itens.find(function (x) { return x.id === id; });
        return i ? i.k : '';
      },
      mais: function (k) { var i = this.itens.find(function (x) { return x.k === k; }); if (i) { i.qtd++; this.salvar(); } },
      menos: function (k) {
        var i = this.itens.find(function (x) { return x.k === k; });
        if (!i) return;
        if (i.qtd > 1) i.qtd--; else this.remover(k);
        this.salvar();
      },
      remover: function (k) {
        this.itens = this.itens.filter(function (x) { return x.k !== k; });
        this.aviso = 'Item removido. Cesta com ' + this.total + ' ' + (this.total === 1 ? 'item' : 'itens') + '.';
        this.salvar();
      },
      limpar: function () { this.itens = []; this.nota = ''; this.salvar(); },
      get total() { return this.itens.reduce(function (a, i) { return a + i.qtd; }, 0); },
      get subtotal() {
        return this.itens.reduce(function (a, i) { var p = get(i.id); return a + (p && p.preco ? p.preco * i.qtd : 0); }, 0);
      },
      get aConsultar() {
        return this.itens.filter(function (i) { var p = get(i.id); return !(p && p.preco); }).length;
      },
      linhas: function () {
        return this.itens.map(function (i) {
          var p = get(i.id);
          return {
            k: i.k, id: i.id, qtd: i.qtd, cor: i.cor, nome: p.nome, img: p.img[0], pos: p.pos,
            preco: p.preco, linha: p.preco ? brl(p.preco * i.qtd) : 'consulte'
          };
        });
      },
      mensagem: function () {
        var L = ['Olá, Alessandra! Vim pelo site da Habitat3D e quero pedir:', ''];
        this.itens.forEach(function (i) {
          var p = get(i.id);
          var cor = i.cor ? ' (cor: ' + i.cor + ')' : '';
          var v = p.preco ? ' — ' + brl(p.preco * i.qtd) : ' — valor a consultar';
          L.push('• ' + i.qtd + 'x ' + p.nome + cor + v);
        });
        L.push('');
        if (this.subtotal > 0) L.push('Subtotal dos itens com preço de vitrine: ' + brl(this.subtotal));
        if (this.aConsultar > 0) L.push(this.aConsultar + ' ' + (this.aConsultar === 1 ? 'item' : 'itens') + ' sem preço de vitrine (preciso do orçamento).');
        if (this.nota && this.nota.trim()) { L.push(''); L.push('Observações: ' + this.nota.trim()); }
        L.push('');
        L.push('Pode me passar o total, o prazo e a forma de entrega?');
        return L.join('\n');
      },
      get url() { return wa(this.mensagem()); }
    });

    Alpine.data('vitrine', function () {
      return {
        q: '', cat: 'todos', ordem: 'destaque', soPreco: false,
        cats: CATS,
        get fixos() { return PRODUTOS.filter(function (p) { return p.cat !== 'sob-medida'; }); },
        get sobMedida() { return PRODUTOS.filter(function (p) { return p.cat === 'sob-medida'; }); },
        contar: function (c) {
          return this.fixos.filter(function (p) { return c === 'todos' || p.cat === c; }).length;
        },
        get lista() {
          var self = this, termo = norm(this.q).trim();
          var r = this.fixos.filter(function (p) {
            if (self.cat !== 'todos' && p.cat !== self.cat) return false;
            if (self.soPreco && !p.preco) return false;
            if (termo && norm(p.nome + ' ' + p.tags).indexOf(termo) === -1) return false;
            return true;
          });
          if (this.ordem === 'menor') r = r.slice().sort(function (a, b) { return (a.preco == null) - (b.preco == null) || a.preco - b.preco; });
          if (this.ordem === 'maior') r = r.slice().sort(function (a, b) { return (a.preco == null) - (b.preco == null) || b.preco - a.preco; });
          if (this.ordem === 'az') r = r.slice().sort(function (a, b) { return a.nome.localeCompare(b.nome, 'pt-BR'); });
          return r;
        },
        get urlNaoAchou() {
          var t = this.q.trim();
          return wa('Olá, Alessandra! Procurei' + (t ? ' "' + t + '"' : ' um produto') + ' no site da Habitat3D e não achei. Vocês fazem sob medida?');
        },
        limpar: function () { this.q = ''; this.cat = 'todos'; this.soPreco = false; this.ordem = 'destaque'; },
        irVitrine: function () {
          var el = document.getElementById('vitrine');
          if (el && el.getBoundingClientRect().top > window.innerHeight * 0.6) {
            var reduz = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            el.scrollIntoView({ behavior: reduz ? 'auto' : 'smooth', block: 'start' });
          }
        }
      };
    });

    Alpine.data('produtoPagina', function () {
      var id = 'esqueleto-t-rex';
      try { id = new URLSearchParams(location.search).get('p') || id; } catch (e) {}
      var p = get(id) || get('esqueleto-t-rex');
      var CORES = [
        { nome: 'Branco', hex: '#F4F4F0' }, { nome: 'Preto', hex: '#1A1A1A' }, { nome: 'Vermelho', hex: '#D42A18' },
        { nome: 'Verde', hex: '#1F9D55' }, { nome: 'Azul', hex: '#1F5FD1' }, { nome: 'Amarelo', hex: '#F2C200' }
      ];
      return {
        p: p, cores: p.cores ? p.cores.map(function (n) { return { nome: n, hex: n === 'Marrom' ? '#7A4B2A' : '#999' }; }) : CORES,
        cor: '', qtd: 1, idx: 0, adicionado: false,
        init: function () {
          document.title = this.p.nome + ' | Loja Relâmpago · Habitat3D';
          var md = document.querySelector('meta[name="description"]');
          if (md) md.setAttribute('content', this.p.nome + (this.p.preco ? ' por ' + brl(this.p.preco) : '') + ': ' + this.p.desc + ' Impressão 3D sob demanda em Joaçaba e região. Peça pelo WhatsApp.');
          var h = this.p.id !== 'esqueleto-t-rex';
          if (h) this.atualizarSchema();
        },
        atualizarSchema: function () {
          var el = document.getElementById('ld-produto');
          if (!el) return;
          var d = { '@context': 'https://schema.org', '@type': 'Product', name: this.p.nome, description: this.p.desc, image: this.p.img, brand: { '@type': 'Brand', name: 'Habitat3D' } };
          if (this.p.preco) d.offers = { '@type': 'Offer', priceCurrency: 'BRL', price: this.p.preco.toFixed(2), availability: 'https://schema.org/InStock', seller: { '@type': 'Organization', name: 'Habitat3D' } };
          el.textContent = JSON.stringify(d);
        },
        get preco() { return this.p.preco ? brl(this.p.preco) : 'Consulte'; },
        get total() { return this.p.preco ? brl(this.p.preco * this.qtd) : null; },
        ir: function (i) {
          this.idx = i;
          var st = this.$refs.stage;
          if (st) st.scrollTo({ left: st.clientWidth * i, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
        },
        onScroll: function () {
          var st = this.$refs.stage;
          if (st && st.clientWidth) this.idx = Math.round(st.scrollLeft / st.clientWidth);
        },
        add: function () {
          Alpine.store('cesta').add(this.p.id, this.cor, this.qtd);
          this.adicionado = true;
          var self = this;
          setTimeout(function () { self.adicionado = false; }, 1800);
        },
        get urlPedido() {
          var cor = this.cor ? ' na cor ' + this.cor : '';
          var v = this.p.preco ? ' (vi por ' + brl(this.p.preco) + ' a unidade)' : '';
          return wa('Olá, Alessandra! Vim pelo site da Habitat3D e quero pedir ' + this.qtd + 'x ' + this.p.nome + cor + v + '. Pode me passar o total, o prazo e a forma de entrega?');
        },
        get relacionados() {
          var self = this;
          var mesma = PRODUTOS.filter(function (x) { return x.cat === self.p.cat && x.id !== self.p.id && x.cat !== 'sob-medida'; });
          var outras = PRODUTOS.filter(function (x) { return x.cat !== self.p.cat && x.cat !== 'sob-medida' && x.preco; });
          return mesma.concat(outras).slice(0, 4);
        },
        catNome: function (c) { var f = CATS.filter(function (x) { return x.id === c; })[0]; return f ? f.nome : 'Sob medida'; }
      };
    });
  });

  // Respeita prefers-reduced-motion no vídeo do hero
  document.addEventListener('DOMContentLoaded', function () {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll('video[autoplay]').forEach(function (v) { v.removeAttribute('autoplay'); v.pause(); });
    }
  });
})();
