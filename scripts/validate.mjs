import {readNotes,validate} from './content.mjs';
try { const notes=readNotes(process.argv[2]??'content');const errors=validate(notes);if(errors.length)throw Error(errors.join('\n'));console.log(`${notes.length} notas válidas: campos, modelos, datas e conexões.`); } catch(e) {console.error(e.message);process.exit(1);}
