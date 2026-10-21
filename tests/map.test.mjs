import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { parseHTML } from 'linkedom';
import { readNotes } from '../scripts/content.mjs';

test('mapa renderiza conceitos, relações, filtro e seleção', async () => {
  const { window, document } = parseHTML(
    fs.readFileSync('web/map-fragment.html', 'utf8')
  );

  const proto = window.HTMLSelectElement.prototype;

  Object.defineProperty(proto, 'value', {
    configurable: true,

    get() {
      return (
        [...this.options].find(option => option.hasAttribute('selected'))
          ?.value ??
        this.options[0]?.value ??
        ''
      );
    },

    set(value) {
      for (const option of this.options) {
        if (option.value === value) {
          option.setAttribute('selected', '');
        } else {
          option.removeAttribute('selected');
        }
      }
    }
  });

  const notes = readNotes().map(note => ({
    slug: note.slug,
    ...note.meta
  }));

  const concepts = notes.filter(note => note.type === 'conceito');
  const total = concepts.length;

  assert.ok(total > 0, 'O catálogo deve conter conceitos para testar o mapa.');

  const slugs = new Set(concepts.map(note => note.slug));

  const edges = concepts
    .flatMap(note => note.relations)
    .filter(relation => slugs.has(relation.target))
    .length;

  const matches = concepts.filter(note =>
    note.title.toLocaleLowerCase('pt-BR').includes('ecr')
  ).length;

  const stored = new Map([['garden-map-layout-v1', JSON.stringify({'conceitos/git':{x:333,y:222}})]]);
  window.localStorage = {getItem:key=>stored.get(key),setItem:(key,value)=>stored.set(key,value)};
  const ctx = vm.createContext({
    window,
    document,
    fetch: async () => ({
      ok: true,
      json: async () => ({ notes })
    }),
    console
  });

  const mapScript = fs.readFileSync('web/map.js', 'utf8');

  await vm.runInContext(
    '(async () => {\n' + mapScript + '\n})()',
    ctx
  );

  const git = document.querySelector('[data-slug="conceitos/git"]');
  assert.equal(git.getAttribute('transform'), 'translate(333,222)', 'Restaura posição salva');
  for (const target of ['github','gitlab','gitops']) {
    const edge = document.querySelector(`[data-from="conceitos/git"][data-to="conceitos/${target}"]`);
    assert.ok(edge, `Git é base de ${target}`);
    assert.equal(edge.querySelector('text').textContent, 'é base de');
  }
  document.getElementById('map-reset').onclick();
  assert.equal(git.getAttribute('transform'), 'translate(333,222)', 'Centralizar preserva posição');
  document.getElementById('map-organize').onclick();
  assert.equal(git.getAttribute('transform'), 'translate(130,130)');
  assert.equal(JSON.parse(stored.get('garden-map-layout-v1'))['conceitos/git'].x,130);

  for (const source of ['github','gitlab']) {
    const edge=document.querySelector(`[data-from="conceitos/${source}"][data-to="conceitos/gitops"]`);
    assert.ok(edge,'Hospedagem opcional deve aparecer no mapa');
    assert.equal(edge.querySelector('text').textContent,'pode fornecer a fonte para');
  }

  // Confere a quantidade de conceitos e relações renderizados.
  assert.equal(
    document.querySelectorAll('.concept-node').length,
    total
  );

  assert.equal(
    document.querySelectorAll('.map-edge').length,
    edges
  );

  // Confere a seleção de um conceito.
  const first = document.querySelector('.concept-node');

  first.dispatchEvent(new window.Event('click'));

  assert.ok(document.querySelector('.open-note'));

  first.dispatchEvent(new window.Event('click'));
  assert.equal(first.getAttribute('aria-pressed'), 'false');
  assert.equal(document.querySelector('.open-note'), null);
  first.dispatchEvent(new window.Event('click'));
  const svg = document.getElementById('concept-network');
  svg.dispatchEvent(new window.Event('click'));
  assert.equal(document.querySelector('.concept-node.active'), null);
  first.dispatchEvent(new window.Event('click'));
  const escape = new window.Event('keydown', {bubbles:true});
  escape.key='Escape';first.dispatchEvent(escape);
  assert.equal(document.querySelector('.concept-node.active'), null);
  first.dispatchEvent(new window.Event('click'));
  document.getElementById('map-in').onclick();
  const beforeClear=document.getElementById('map-viewport').getAttribute('transform');
  document.getElementById('map-clear').onclick();
  assert.equal(document.getElementById('map-viewport').getAttribute('transform'),beforeClear);
  document.getElementById('map-reset').onclick();
  assert.equal(svg.getAttribute('viewBox'), '0 0 1000 650');
  assert.ok(document.getElementById('map-viewport').getAttribute('transform').endsWith('scale(1)'));
  // A pointer click must toggle only once despite the following click event.
  function pointer(target,type,x=20,y=20){const e=new window.Event(type,{bubbles:true});Object.assign(e,{clientX:x,clientY:y,pointerId:1});target.dispatchEvent(e);}
  pointer(first,'pointerdown');pointer(svg,'pointerup');svg.dispatchEvent(new window.Event('click'));
  assert.equal(first.getAttribute('aria-pressed'),'true');
  pointer(first,'pointerdown');pointer(svg,'pointerup');svg.dispatchEvent(new window.Event('click'));
  assert.equal(first.getAttribute('aria-pressed'),'false');
  pointer(first,'pointerdown');pointer(svg,'pointermove',60,60);pointer(svg,'pointerup',60,60);svg.dispatchEvent(new window.Event('click'));
  assert.equal(first.getAttribute('aria-pressed'),'false','Arrastar não seleciona');
  for(const slug of ['gitflow','githubflow','trunk-based']){
    assert.equal(document.querySelector(`[data-slug="conceitos/${slug}"]`).getAttribute('data-family'),'fluxos');
    assert.ok(fs.existsSync(`web/icons/${slug}.svg`));
  }

  for(const [slug,nature] of Object.entries({git:'ferramenta',github:'ferramenta','argo-cd':'ferramenta',gitops:'conceito',gitflow:'conceito',githubflow:'conceito','trunk-based':'conceito',application:'recurso',applicationset:'recurso'})){
    const node=document.querySelector(`[data-slug="conceitos/${slug}"]`);
    assert.equal(node.getAttribute('data-nature'),nature);
    assert.ok(node.classList.contains('nature-'+nature));
  }
  assert.equal(document.querySelectorAll('#map-nature-legend .nature-key').length,3);
  const application=document.querySelector('[data-slug="conceitos/application"]');
  const enter=new window.Event('keydown');enter.key='Enter';
  application.dispatchEvent(enter);
  assert.match(document.getElementById('map-detail').textContent,/Recurso de uma ferramenta/);
  document.getElementById('map-clear').onclick();

  const yamlEdge=document.querySelector('[data-from="conceitos/git"][data-to="conceitos/yaml"]');
  assert.equal(yamlEdge.querySelector('text').textContent,'versiona arquivos em');
  assert.equal(document.querySelector('[data-slug="conceitos/yaml"]').getAttribute('data-nature'),'conceito');
  assert.equal(document.querySelector('[data-slug="conceitos/docker-hub"]').getAttribute('data-nature'),'ferramenta');
  assert.equal(document.querySelector('[data-from="conceitos/helm"][data-to="conceitos/yaml"]'),null);

  // Confere o contador após buscar por ECR.
  const search = document.getElementById('map-search');

  search.value = 'ECR';
  search.oninput();

  assert.equal(
    document.getElementById('map-count').textContent,
    `${matches} de ${total} conceitos · ${edges} relações`
  );

  // Confere o contador após restaurar o mapa.
  document.getElementById('map-reset').onclick();

  assert.equal(
    document.getElementById('map-count').textContent,
    `${total} de ${total} conceitos · ${edges} relações`
  );
});