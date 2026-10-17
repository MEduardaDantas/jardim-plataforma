const $=id=>document.getElementById(id);
const names={conceito:'Conceito / ferramenta',demanda:'Demanda / problema',laboratorio:'Laboratório / prática',decisao:'Decisão / ADR',guia:'Guia / procedimento'};
const folders={conceito:'conceitos',demanda:'demandas',laboratorio:'laboratorios',decisao:'decisoes',guia:'guias'};
let slugEdited=false;
let data,generated='',filename='',draft={fields:{},sections:{},relations:[]};
function option(value,label=value){const o=document.createElement('option');o.value=value;o.textContent=label;return o;}
function capture(){for(const id of ['type','title','slug','description','stage','status','tags'])draft.fields[id]=$(id).value;document.querySelectorAll('[data-section]').forEach(el=>draft.sections[el.dataset.section]=el.value);draft.relations=[...document.querySelectorAll('.relation')].map(row=>({target:row.querySelector('.target').value,kind:row.querySelector('.kind').value}));}
function save(){capture();try{localStorage.setItem('garden-draft-v1',JSON.stringify(draft));}catch{}}
function invalidate(){generated='';$('github').disabled=true;$('download').disabled=true;$('result').textContent='Alterações pendentes. Gere o Markdown novamente para revisar.';}
function renderSections(){const box=$('sections');box.replaceChildren();for(const heading of data.schema.types[$('type').value].filter(x=>x!=='Conexões')){const label=document.createElement('label');const id='section-'+box.children.length;label.htmlFor=id;label.textContent=heading;const input=document.createElement('textarea');input.id=id;input.dataset.section=heading;input.required=true;input.minLength=12;input.value=draft.sections[heading]||'';input.placeholder=heading==='Referências'?'https://endereco-da-documentacao-oficial':'Explique o que você entendeu, o que fez ou como verificou.';box.append(label,input);}}
function addRelation(rel={}){const row=document.createElement('div');row.className='relation';const kind=document.createElement('select');kind.className='kind';kind.setAttribute('aria-label','Tipo de relação');for(const k of data.schema.relationTypes)kind.append(option(k));kind.value=rel.kind||'depende-de';const target=document.createElement('select');target.className='target';target.setAttribute('aria-label','Nota relacionada');for(const n of data.notes)target.append(option(n.slug,n.title));target.value=rel.target||data.notes[0].slug;const remove=document.createElement('button');remove.type='button';remove.className='secondary';remove.textContent='×';remove.setAttribute('aria-label','Remover relação');remove.onclick=()=>{row.remove();save();invalidate();};row.append(kind,target,remove);$('relations').append(row);}
function build(){capture();const f=draft.fields;const headings=data.schema.types[f.type];const slug=folders[f.type]+'/'+f.slug;if(data.notes.some(n=>n.slug===slug))throw Error('Já existe uma nota neste caminho. Use Editar esta página ou outro nome.');
if(!draft.relations.length)throw Error('Adicione ao menos uma relação.');
const tags=f.tags.split(',').map(x=>x.trim()).filter(Boolean);if(!tags.length||tags.some(x=>!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(x)))throw Error('Use tags sem espaços ou acentos, separadas por vírgula.');
if(!/https?:\/\/\S+/.test(draft.sections['Referências']||''))throw Error('Inclua uma referência HTTP(S).');
const date=new Date().toLocaleDateString('sv-SE');const meta={title:f.title.trim(),description:f.description.trim(),type:f.type,stage:f.stage,status:f.status,created:date,updated:date,tags,relations:draft.relations};
const related=draft.relations.map(r=>`- [[${r.target}|${data.notes.find(n=>n.slug===r.target).title}]] — ${r.kind}.`).join('\n');
const body=headings.map(h=>'## '+h+'\n\n'+(h==='Conexões'?related:draft.sections[h].trim())).join('\n\n');
if(/<script\b|<iframe\b|javascript\s*:/i.test(body))throw Error('Não insira scripts ou iframes.');
generated='---\n'+JSON.stringify(meta,null,2)+'\n---\n\n'+body+'\n';filename='content/'+slug+'.md';return generated;}
try{const response=await fetch('garden-data.json');if(!response.ok)throw Error('Dados indisponíveis');data=await response.json();try{draft=JSON.parse(localStorage.getItem('garden-draft-v1'))||draft;}catch{}
for(const t of Object.keys(data.schema.types))$('type').append(option(t,names[t]));for(const t of data.schema.stages)$('stage').append(option(t));for(const t of data.schema.statuses)$('status').append(option(t));
for(const [key,value]of Object.entries(draft.fields))if($(key))$(key).value=value;
if(!$('type').value)$('type').value='conceito';renderSections();for(const r of draft.relations.length?draft.relations:[{}])addRelation(r);
$('loading').hidden=true;$('workspace').hidden=false;
$('type').addEventListener('change',()=>{capture();renderSections();save();invalidate();});
$('editor').addEventListener('input',()=>{save();invalidate();});$('editor').addEventListener('change',()=>{save();invalidate();});
$('slug').addEventListener('input',()=>{slugEdited=true;});
slugEdited=Boolean(draft.fields.slug);
$('title').addEventListener('input',()=>{if(!slugEdited){$('slug').value=$('title').value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');}});
$('add-relation').onclick=()=>{addRelation();save();invalidate();};
$('editor').onsubmit=e=>{e.preventDefault();try{build();$('preview').textContent=generated;$('result').textContent=`Arquivo: ${filename}\nRevise e conclua no GitHub. A pipeline fará a validação completa.`;$('result').className='message';$('github').disabled=false;$('download').disabled=false;save();}catch(err){$('result').textContent=err.message;$('result').className='message error';}};
$('github').onclick=()=>{const url=new URL(`https://github.com/${data.settings.repository}/new/${encodeURIComponent(data.settings.branch)}`);url.searchParams.set('filename',filename);url.searchParams.set('value',generated);if(url.href.length>7500){$('result').textContent='Texto grande para encaminhar por URL. Use Baixar .md e faça upload no GitHub na pasta indicada.';return;}window.open(url.href,'_blank','noopener,noreferrer');};
$('download').onclick=()=>{const url=URL.createObjectURL(new Blob([generated],{type:'text/markdown;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download=filename.split('/').pop();a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);};
$('clear').onclick=()=>{if(confirm('Apagar o rascunho salvo neste navegador?')){try{localStorage.removeItem('garden-draft-v1');}catch{}location.reload();}};
}catch(e){$('loading').textContent='Não foi possível carregar o editor. Abra esta página pelo site publicado ou por um servidor local. '+e.message;}
