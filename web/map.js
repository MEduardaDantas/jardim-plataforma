const NS='http://www.w3.org/2000/svg';const $=id=>document.getElementById(id);
const create=(tag,attrs={},text)=>{const e=document.createElementNS(NS,tag);for(const [k,v] of Object.entries(attrs))e.setAttribute(k,v);if(text)e.textContent=text;return e;};
try{
const res=await fetch('garden-data.json');if(!res.ok)throw Error('catálogo indisponível');const data=await res.json();
const notes=data.notes.filter(n=>n.type==='conceito');const stages=[...new Set(notes.map(n=>n.stage))];for(const stage of stages){const o=document.createElement('option');o.value=stage;o.textContent=stage;$('map-stage').append(o);}
const storageKey='garden-map-layout-v1';
let saved={};try{saved=JSON.parse(window.localStorage?.getItem(storageKey)||'{}')||{};}catch{}
const columns=[['conceitos/git'],['conceitos/github','conceitos/gitlab','conceitos/gitops']];
const placed=new Set(columns.flat());
for(const stage of ['planejar','construir','verificar','publicar','implantar','operar','aprender']){
 const group=notes.filter(n=>!placed.has(n.slug)&&n.stage===stage).sort((a,b)=>a.title.localeCompare(b.title,'pt-BR'));
 for(let i=0;i<group.length;i+=4){const col=group.slice(i,i+4).map(n=>n.slug);columns.push(col);col.forEach(slug=>placed.add(slug));}
}
const rest=notes.filter(n=>!placed.has(n.slug)).map(n=>n.slug);if(rest.length)columns.push(rest);
const nodes=notes.map(n=>{const col=columns.findIndex(c=>c.includes(n.slug)),row=columns[col].indexOf(n.slug);const initial={x:130+col*250,y:130+row*150};const pos=saved[n.slug];return {...n,...initial,...(pos&&Number.isFinite(pos.x)&&Number.isFinite(pos.y)&&Math.abs(pos.x)<100000&&Math.abs(pos.y)<100000?{x:pos.x,y:pos.y}:{}),initial};});
const bySlug=new Map(nodes.map(n=>[n.slug,n]));
function persist(){try{window.localStorage?.setItem(storageKey,JSON.stringify(Object.fromEntries(nodes.map(n=>[n.slug,{x:n.x,y:n.y}]))));}catch{}}
// Keep one SVG unit close to one CSS pixel; never shrink all cards to fit.
function fit(){const box=$('concept-network').getBoundingClientRect();const width=box.width||1000,height=box.height||650;$('concept-network').setAttribute('viewBox',`0 0 ${width} ${height}`);}
const families={
 fluxos:{label:'Fluxos de trabalho',slugs:['gitflow','githubflow','trunk-based']},
 versoes:{label:'Versionamento e colaboração',slugs:['git','github','gitlab']},
 entrega:{label:'Entrega e configuração',slugs:['gitops','argo-cd','application','applicationset','helm','kustomize','pipeline','yaml']},
 execucao:{label:'Execução e artefatos',slugs:['kubernetes','imagens','ecr','multiarch']},
 plataforma:{label:'Infraestrutura e operação',slugs:['iac','s3','observabilidade','seguranca','techdocs']},
 outros:{label:'Outros conceitos',slugs:[]}
};
for(const n of nodes)n.family=Object.keys(families).find(key=>families[key].slugs.includes(n.slug.split('/').pop()))||'outros';
const legend=$('map-legend');for(const [key,family] of Object.entries(families)){if(!nodes.some(n=>n.family===key))continue;const item=document.createElement('span');item.className='family-key family-'+key;item.textContent=family.label;legend.append(item);}
const initialDetail=$('map-detail').innerHTML;
function clearSelection(){selected=null;$('map-detail').innerHTML=initialDetail;filter();}
const edges=[];for(const n of nodes)for(const r of n.relations)if(bySlug.has(r.target)){
 const inverse={'depende-de':'é base de','implementa':'é implementado por'}[r.kind];
 edges.push(inverse?{from:bySlug.get(r.target),to:n,kind:inverse}:{from:n,to:bySlug.get(r.target),kind:r.kind});
}
let selected=null,zoom=1,panX=0,panY=0,drag=null,moved=false,suppressClick=false;
for(const e of edges){e.el=create('g',{'class':'map-edge','data-from':e.from.slug,'data-to':e.to.slug});e.line=create('line',{'marker-end':'url(#arrow)'});e.label=create('text',{'text-anchor':'middle'},e.kind);e.el.append(e.line,e.label);$('map-edges').append(e.el);}
for(const n of nodes){n.el=create('g',{'class':'concept-node family-'+n.family,'aria-pressed':'false','data-family':n.family,'data-slug':n.slug,tabindex:'0',role:'button','aria-label':n.title+' — ver conexões'});n.el.append(create('rect',{x:-88,y:-35,width:176,height:70,rx:12}));if(n.icon)n.el.append(create('image',{href:n.icon,x:-77,y:-21,width:30,height:30}));else n.el.append(create('text',{x:-75,y:1},'◇'));
const words=n.title.split(' ');let lines=[''];for(const word of words){let last=lines.length-1;if((lines[last]+' '+word).trim().length>17&&lines[last])lines.push(word);else lines[last]=(lines[last]+' '+word).trim();}lines=lines.slice(0,2);lines.forEach((t,i)=>n.el.append(create('text',{x:-37,y:-8+i*16},t)));n.el.append(create('text',{x:-37,y:27,class:'stage'},families[n.family].label));
n.el.addEventListener('click',e=>{e.stopPropagation();if(suppressClick){suppressClick=false;return;}if(!moved)select(n);});n.el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();select(n);}});n.el.addEventListener('pointerdown',e=>{e.stopPropagation();moved=false;suppressClick=false;drag={node:n,start:point(e)};$('concept-network').setPointerCapture?.(e.pointerId);});$('map-nodes').append(n.el);}
function point(e){const svg=$('concept-network');if(svg.createSVGPoint&&svg.getScreenCTM()){const p=svg.createSVGPoint();p.x=e.clientX;p.y=e.clientY;return p.matrixTransform(svg.getScreenCTM().inverse());}const box=svg.getBoundingClientRect();const [, ,width,height]=svg.getAttribute('viewBox').split(' ').map(Number);return{x:(e.clientX-box.left)*width/(box.width||width),y:(e.clientY-box.top)*height/(box.height||height)};}
function draw(){for(const n of nodes)n.el.setAttribute('transform',`translate(${n.x},${n.y})`);for(const e of edges){const dx=e.to.x-e.from.x,dy=e.to.y-e.from.y;const factor=Math.min(1,Math.max(Math.abs(dx)/95,Math.abs(dy)/40));const len=Math.sqrt(dx*dx+dy*dy)||1;const offset=Math.min(.45,Math.min(95/Math.max(Math.abs(dx),1),40/Math.max(Math.abs(dy),1)));e.line.setAttribute('x1',e.from.x+dx*offset);e.line.setAttribute('y1',e.from.y+dy*offset);e.line.setAttribute('x2',e.to.x-dx*offset);e.line.setAttribute('y2',e.to.y-dy*offset);e.label.setAttribute('x',(e.from.x+e.to.x)/2);e.label.setAttribute('y',(e.from.y+e.to.y)/2-8);}$('map-viewport').setAttribute('transform',`translate(${panX},${panY}) scale(${zoom})`);}
function filter(){const search=$('map-search').value.toLocaleLowerCase('pt-BR');const stage=$('map-stage').value;const connected=new Set(selected?[selected.slug,...edges.filter(e=>e.from===selected||e.to===selected).flatMap(e=>[e.from.slug,e.to.slug])]:nodes.map(n=>n.slug));let count=0;for(const n of nodes){n.visible=(!stage||n.stage===stage)&&n.title.toLocaleLowerCase('pt-BR').includes(search);if(n.visible)count++;n.el.classList.toggle('dim',!n.visible||!connected.has(n.slug));n.el.classList.toggle('active',n===selected);n.el.setAttribute('aria-pressed',String(n===selected));}for(const e of edges){e.el.classList.toggle('active',e.from===selected||e.to===selected);e.el.classList.toggle('dim',!e.from.visible||!e.to.visible||(selected&&e.from!==selected&&e.to!==selected));}$('map-count').textContent=`${count} de ${nodes.length} conceitos · ${edges.length} relações`;
}
function select(n){if(selected===n){clearSelection();return;}selected=n;const detail=$('map-detail');detail.replaceChildren();const eyebrow=document.createElement('span');eyebrow.className='eyebrow';eyebrow.textContent=families[n.family].label+' · '+n.stage;const h=document.createElement('h2');h.textContent=n.title;const p=document.createElement('p');p.textContent=n.description;const a=document.createElement('a');a.className='open-note';a.href=n.slug+'.html';a.textContent='Abrir a nota →';const list=document.createElement('ul');for(const e of edges.filter(e=>e.from===n||e.to===n)){const li=document.createElement('li');li.textContent=`${e.from.title} → ${e.kind} → ${e.to.title}`;list.append(li);}detail.append(eyebrow,h,p,a,list);filter();}
$('concept-network').addEventListener('pointerdown',e=>{moved=false;suppressClick=false;drag={start:point(e)};$('concept-network').setPointerCapture?.(e.pointerId);});$('concept-network').addEventListener('pointermove',e=>{if(!drag)return;const p=point(e),dx=p.x-drag.start.x,dy=p.y-drag.start.y;if(Math.abs(dx)+Math.abs(dy)>2)moved=true;if(drag.node){drag.node.x+=dx/zoom;drag.node.y+=dy/zoom;}else{panX+=dx;panY+=dy;}drag.start=p;draw();});$('concept-network').addEventListener('pointerup',()=>{const node=drag?.node;drag=null;if(node&&moved)persist();if(node&&!moved)select(node);if(!node&&!moved)clearSelection();suppressClick=true;});$('concept-network').addEventListener('pointercancel',()=>{drag=null;});
$('concept-network').addEventListener('click',e=>{if(suppressClick){suppressClick=false;return;}if(!moved&&!e.target.closest?.('.concept-node'))clearSelection();});
$('concept-network').addEventListener('keydown',e=>{if(e.key==='Escape'){e.preventDefault();clearSelection();}});
$('map-clear').onclick=clearSelection;
window.addEventListener?.('resize',fit);
document.addEventListener('fullscreenchange',fit);
$('map-in').onclick=()=>{zoom=Math.min(2.5,zoom+.15);draw();};$('map-out').onclick=()=>{zoom=Math.max(.35,zoom-.15);draw();};$('map-organize').onclick=()=>{for(const n of nodes)Object.assign(n,n.initial);persist();$('map-reset').onclick();};
$('map-reset').onclick=()=>{fit();zoom=1;const anchor=bySlug.get('conceitos/git')||nodes[0];panX=anchor?130-anchor.x:0;panY=anchor?130-anchor.y:0;clearSelection();$('map-search').value='';$('map-stage').value='';filter();draw();};$('map-full').onclick=()=>{const el=document.querySelector('.knowledge-map');if(document.fullscreenElement)document.exitFullscreen?.();else el.requestFullscreen?.();};$('map-search').oninput=filter;$('map-stage').onchange=filter;$('map-reset').onclick();
}catch(e){$('map-count').textContent='Não foi possível carregar o mapa. Use a lista de conceitos. '+e.message;}
