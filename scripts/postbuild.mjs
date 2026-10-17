import fs from 'node:fs';
import path from 'node:path';
import {readNotes,schema} from './content.mjs';
const s=JSON.parse(fs.readFileSync('.garden/settings.json','utf8'));const notes=readNotes();
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
fs.cpSync('web','public',{recursive:true});
fs.writeFileSync('public/garden-data.json',JSON.stringify({settings:s,schema,notes:notes.map(n=>({slug:n.slug,title:n.meta.title,description:n.meta.description,type:n.meta.type,stage:n.meta.stage,relations:n.meta.relations,icon:fs.existsSync('web/icons/'+n.slug.split('/').pop()+'.svg')?'icons/'+n.slug.split('/').pop()+'.svg':null}))}));
const root=`https://${s.baseUrl}`;
for(const n of notes){
 const filename=path.join('public',n.slug+'.html');if(!fs.existsSync(filename))throw Error(`HTML ausente: ${filename}`);
 let html=fs.readFileSync(filename,'utf8'); const prefix='../'.repeat(n.slug.split('/').length-1)||'./';
 const github=`https://github.com/${s.repository}`;
 const nav=`<nav class="garden-nav" aria-label="Navegação do jardim"><a href="${prefix}index.html">🌿 Início</a><a href="${prefix}conceitos/index.html">Conceitos</a><a href="${prefix}mapa.html">Mapa</a><a href="${prefix}laboratorios/index.html">Laboratórios</a><a href="${prefix}ciclo.html">Simulador</a><a href="${prefix}studio.html">＋ Nova nota</a><a href="${github}/edit/${encodeURIComponent(s.branch)}/content/${n.slug}.md">Editar esta página</a><a href="${github}/edit/${encodeURIComponent(s.branch)}/site.settings.json">Configurar</a></nav>`;
 html=html.replace(/<body([^>]*)>/,`<body$1>${nav}`);
 if(n.meta.type==='conceito'){
 const icon=n.slug.split('/').pop();if(fs.existsSync('web/icons/'+icon+'.svg'))html=html.replace(/(<article[^>]*>)/,`$1<div class="concept-brand"><img src="${prefix}icons/${icon}.svg" width="54" height="54" alt="Ícone de ${esc(n.meta.title)}"></div>`);
 }
 const canonical=n.slug==='index'?root+'/':root+'/'+n.slug;
 html=html.replace('</head>',`<link rel="canonical" href="${esc(canonical)}"><meta name="author" content="${esc(s.author)}"><meta name="robots" content="index,follow"><script type="application/ld+json">${JSON.stringify({'@context':'https://schema.org','@type':'Article',headline:n.meta.title,description:n.meta.description,inLanguage:'pt-BR',datePublished:n.meta.created,dateModified:n.meta.updated,author:{'@type':'Person',name:s.author},mainEntityOfPage:canonical}).replaceAll('<','\\u003c')}</script></head>`);
 if(n.slug==='mapa'){
 html=html.replace('<body', '<body class="garden-map"');
 html=html.replace('</head>','<link rel="stylesheet" href="map.css"><script type="module" src="map.js"></script></head>');
 html=html.replace(/(<h2[^>]*id="passo-a-passo"[^>]*>)/,fs.readFileSync('web/map-fragment.html','utf8')+'$1');
 }
 fs.writeFileSync(filename,html);
}
fs.writeFileSync('public/robots.txt',`User-agent: *\nAllow: /\nSitemap: ${root}/sitemap.xml\n`);
fs.writeFileSync('public/.nojekyll','');
// A stable sitemap containing only authored notes; studio is intentionally noindex.
fs.writeFileSync('public/sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${notes.map(n=>`<url><loc>${esc(n.slug==='index'?root+'/':root+'/'+n.slug)}</loc><lastmod>${n.meta.updated}</lastmod></url>`).join('')}</urlset>`);
console.log('Navegação, edição, formulário, simulador, canonical e sitemap prontos.');

// Preserve bookmarked addresses without preserving the discarded navigation sections.
for(const [old,target] of Object.entries({'trilha':'laboratorios/index','demandas/primeira-entrega':'laboratorios/index','decisoes/site-estatico':'guias/como-contribuir'})){
 const file=path.join('public',old+'.html');fs.mkdirSync(path.dirname(file),{recursive:true});const dest=root+'/'+target;
 fs.writeFileSync(file,`<!doctype html><html lang="pt-BR"><meta charset="utf-8"><meta name="robots" content="noindex"><meta http-equiv="refresh" content="0;url=${dest}"><title>Conteúdo reorganizado</title><p>Este conteúdo foi reorganizado. <a href="${dest}">Continuar</a>.</p></html>`);
}
