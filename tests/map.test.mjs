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