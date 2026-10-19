import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {parseHTML} from 'linkedom';
import {readNotes} from '../scripts/content.mjs';

test('mapa renderiza conceitos, relações, filtro e seleção',async()=>{const {window,document}=parseHTML(fs.readFileSync('web/map-fragment.html','utf8'));const proto=window.HTMLSelectElement.prototype;Object.defineProperty(proto,'value',{configurable:true,get(){return [...this.options].find(o=>o.hasAttribute('selected'))?.value??this.options[0]?.value??'';},set(v){for(const o of this.options){if(o.value===v)o.setAttribute('selected','');else o.removeAttribute('selected');}}});
const notes=readNotes().map(n=>({slug:n.slug,...n.meta}));
const concepts = notes.filter(n => n.type === 'conceito');
const total = concepts.length;

assert.ok(total > 0);

const slugs = new Set(concepts.map(n => n.slug));

const edges = concepts
    .flatMap(n => n.relations)
    .filter(r => slugs.has(r.target))
    .length;

const matches = concepts
    .filter(n => n.title.toLocaleLowerCase('pt-BR').includes('ecr'))   
    .length;

const ctx=vm.createContext({window,document,fetch:async()=>({ok:true,json:async()=>({notes})}),console});await vm.runInContext('(async()=>{'+fs.readFileSync('web/map.js','utf8')+'})()',ctx);assert.equal(document.querySelectorAll('.concept-node').length,tota);assert.ok(document.querySelectorAll('.map-edge').length>edges);const first=document.querySelector('.concept-node');first.dispatchEvent(new window.Event('click'));assert.ok(document.querySelector('.open-note'));document.getElementById('map-search').value='ECR';document.getElementById('map-search').oninput();assert.equal(document.getElementById('map-count').textContent, `${matches} de ${total} conceitos - ${edges} relações`);document.getElementById('map-reset').onclick();assert.equal(document.getElementById('map-count').textContent,`${total} de ${total} conceitos - ${edges} relações`);});
