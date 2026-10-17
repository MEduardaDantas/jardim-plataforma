import fs from 'node:fs';import assert from 'node:assert/strict';import {readNotes} from './content.mjs';
for(const n of readNotes()){
 const html=fs.readFileSync(`public/${n.slug}.html`,'utf8');
 assert.ok(html.includes('Editar esta página'),n.slug+': edição ausente');
 assert.ok(html.includes('rel="canonical"'),n.slug+': canonical ausente');
 assert.ok(html.includes('application/ld+json'),n.slug+': dados estruturados ausentes');
 assert.ok(!html.includes('maria-dantas_rnp.github.io'),n.slug+': URL incorreta');
}
for(const file of ['studio.html','studio.js','ciclo.html','ciclo.js','garden.css','garden-data.json','sitemap.xml','robots.txt'])assert.ok(fs.statSync('public/'+file).size>0,file);
const data=JSON.parse(fs.readFileSync('public/garden-data.json'));
assert.equal(data.notes.length,readNotes().length);
console.log('Páginas, links de edição, dados do editor e SEO verificados.');
