import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';import {parseHTML} from 'linkedom';import {readNotes,schema,validate} from '../scripts/content.mjs';import YAML from 'yaml';
function dom(file){const {window,document}=parseHTML(fs.readFileSync(file,'utf8'));
// linkedom omits the native select setter; emulate selection for these DOM tests.
const proto=window.HTMLSelectElement.prototype;Object.defineProperty(proto,'value',{configurable:true,get(){return [...this.options].find(o=>o.hasAttribute('selected'))?.value??this.options[0]?.value??'';},set(v){for(const o of this.options){if(o.value===v)o.setAttribute('selected','');else o.removeAttribute('selected');}}});
return {window,document};}
const settings=JSON.parse(fs.readFileSync('site.settings.json'));
test('formulário gera cada modelo compatível com políticas',async()=>{const {window,document}=dom('web/studio.html');const data={settings,schema,notes:readNotes().map(n=>({slug:n.slug,title:n.meta.title}))};const store=new Map();const context=vm.createContext({window,document,fetch:async()=>({ok:true,json:async()=>data}),localStorage:{getItem:k=>store.get(k),setItem:(k,v)=>store.set(k,v)},URL,Blob,setTimeout,Date,console});
await vm.runInContext('(async()=>{'+fs.readFileSync('web/studio.js','utf8')+'})()',context);
assert.equal(document.getElementById('workspace').hidden,false);
const $=id=>document.getElementById(id);
for(const type of Object.keys(schema.types)){
 $('type').value=type;$('type').dispatchEvent(new window.Event('change',{bubbles:true}));
 $('title').value='Uma descoberta '+type;$('slug').value='teste-'+type;$('description').value='Uma explicação completa para verificar o modelo gerado no formulário.';$('stage').value='aprender';$('status').value='em-estudo';$('tags').value='estudo';
 for(const input of document.querySelectorAll('[data-section]'))input.value=input.dataset.section==='Referências'?'https://quartz.jzhao.xyz/':'Uma explicação completa do que foi aprendido e como verificar.';
 $('editor').onsubmit({preventDefault(){}});
 const raw=$('preview').textContent;assert.ok(raw.startsWith('---'),$('result').textContent);
 const m=raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);assert.ok(m);
 assert.deepEqual(validate([...readNotes(),{slug:'testes/teste-'+type,meta:YAML.parse(m[1]),body:m[2]}]),[]);
 assert.equal($('github').disabled,false);
}
$('relations').replaceChildren();$('editor').onsubmit({preventDefault(){}});assert.match($('result').textContent,/Adicione ao menos/);
});
test('simulador diferencia imagem disponível, configuração e execução',()=>{const {window,document}=dom('web/ciclo.html');vm.runInNewContext(fs.readFileSync('web/ciclo.js','utf8'),{window,document});const $=id=>document.getElementById(id);assert.equal($('running').textContent,'v1');for(let i=0;i<3;i++)$('next').onclick();assert.equal($('registry').textContent,'v1 + v2');assert.equal($('desired').textContent,'v1');$('next').onclick();assert.equal($('desired').textContent,'v2');assert.equal($('running').textContent,'v1');for(let i=0;i<3;i++)$('next').onclick();assert.equal($('running').textContent,'v2');$('pull-fail').checked=true;$('pull-fail').onchange();assert.equal($('running').textContent,'v1');assert.equal($('desired').textContent,'v2');$('publish-fail').checked=true;$('publish-fail').onchange();assert.equal($('registry').textContent,'v1');assert.equal($('desired').textContent,'v1');$('reset').onclick();assert.equal($('next').disabled,false);assert.equal($('prev').disabled,true);});
