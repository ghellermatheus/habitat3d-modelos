/* Dados compartilhados dos protótipos de catálogos (15, 16, 17).
   Preços: só os reais de produtos.json. Resto = null ("Consulte"). Imagens "ia-*" e "stock" são ilustrativas. */
window.H3D = (function () {
  var M = '../midia/';
  var P = {
    rex:        { nome: 'Esqueleto Flexível de T-Rex',        preco: 32.00,  img: M + 'produtos/esqueleto-flexivel-de-tiranossauro-rex-1.webp', alt: M + 'produtos/esqueleto-flexivel-de-tiranossauro-rex-2.webp' },
    ninja:      { nome: 'Porta-incenso Ninja',                 preco: 87.10,  img: M + 'produtos/porta-incenso-darth-vader-2883115-1.webp' },
    presente:   { nome: 'Presente de Natal Articulado',        preco: 46.08,  img: M + 'produtos/presente-de-natal-articulado-774384-1.webp' },
    apoio:      { nome: 'Apoio para Páginas de Livro',         preco: 6.30,   img: M + 'produtos/apoio-para-paginas-de-livro-1687004-1.webp' },
    cortadores: { nome: 'Cortadores de Biscoito de Natal',     preco: 25.33,  img: M + 'produtos/conjunto-de-cortadores-de-biscoito-de-na-1.webp' },
    cartoes:    { nome: 'Porta-Cartões para Dentista',         preco: 82.32,  img: M + 'produtos/porta-cartoes-para-dentista-2594018-1.webp' },
    macaco:     { nome: 'Macaco Segura Bananas',               preco: 30.00,  img: M + 'produtos/macaco-das-banana-1.webp' },
    ganso:      { nome: 'Ganso Porta-vinho',                   preco: null,   img: M + 'ganso.webp', video: M + 'ganso.mp4' },
    harry:      { nome: 'Apoio de Livros Temático',            preco: null,   img: M + 'harry.webp' },
    alexa:      { nome: 'Suporte para Alexa (tema Flamengo)',  preco: null,   img: M + 'alexa.webp', video: M + 'alexa.mp4' },
    polvo:      { nome: 'Polvo Articulado (chaveiro)',         preco: null,   img: M + 'polvos.webp' },
    cachorro:   { nome: 'Cachorrinho de Tricô',                preco: null,   img: M + 'cachorro.webp' },
    noel:       { nome: 'Papai Noel Estilo Tricô',             preco: null,   img: M + 'papai-noel.webp' },
    rena:       { nome: 'Rena de Tricô',                       preco: null,   img: M + 'rena.webp' },
    urso:       { nome: 'Urso Polar de Tricô',                 preco: null,   img: M + 'urso.webp' },
    neve:       { nome: 'Boneco de Neve de Tricô',             preco: null,   img: M + 'boneco-neve.webp' },
    anjinho:    { nome: 'Pernudo Anjinho',                     preco: null,   img: M + 'anjinho.webp' },
    arvore:     { nome: 'Árvore de Natal Articulada',          preco: null,   img: M + 'arvore.webp' },
    guardanapo: { nome: 'Porta-guardanapo de Natal',           preco: null,   img: M + 'guardanapo.webp' },
    tagpet:     { nome: 'Tag Pet Personalizada',               preco: null,   img: M + 'catalogos/pet-coleira-tag.webp', ilus: true, sob: true },
    kettle:     { nome: 'Kettlebell Personalizado',            preco: null,   img: M + 'catalogos/gym-kettlebell-poeira.webp', ilus: true, sob: true },
    dragao:     { nome: 'Dragão Articulado',                   preco: null,   img: M + 'catalogos/ia-dragao-estudio.webp', ilus: true },
    chaveiros:  { nome: 'Chaveiros Personalizados',            preco: null,   img: M + 'catalogos/chaveiros.webp', ilus: true, sob: true },
    brindes:    { nome: 'Brindes para Empresas',               preco: null,   img: M + 'catalogos/oficina-bancada.webp', ilus: true, sob: true }
  };
  Object.keys(P).forEach(function (k) { P[k].id = k; });
  function brl(v) { return v == null ? 'Consulte o valor' : 'R$ ' + v.toFixed(2).replace('.', ','); }
  function wa(nome) {
    return 'https://wa.me/5549988452253?text=' + encodeURIComponent('Olá, Habitat3D! Quero saber mais sobre: ' + nome);
  }
  function lista(ids) { return ids.map(function (i) { return P[i]; }); }
  return { P: P, brl: brl, wa: wa, lista: lista, M: M };
})();
