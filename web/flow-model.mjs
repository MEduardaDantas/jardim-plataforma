export function initialState(){return {built:[],registry:['v1'],desired:'v1',applied:'v1',downloaded:null,running:'v1',history:[]};}
export function act(state,action,version='v2',faults={}){
 const s=structuredClone(state);let message='',actor='git';
 switch(action){
 case 'build':s.built=[...new Set([...s.built,version])];actor='ci';message=`CI: testes e build concluídos para ${version}. A imagem ainda precisa ser publicada.`;break;
 case 'publish':actor='registry';if(!s.built.includes(version))message=`Não há build de ${version} para publicar. Execute o build primeiro.`;else if(faults.publish)message='Publicação falhou. A imagem continua apenas no ambiente de build; o registry não mudou.';else{s.registry=[...new Set([...s.registry,version])];message=`${version} está no registry. O Git e os containers não foram alterados por esta ação.`;}break;
 case 'git':s.desired=version;actor='git';message=`O Git agora pede ${version}. Você pode declarar até uma versão indisponível; o erro aparece quando tentamos executá-la.`;break;
 case 'sync':s.applied=s.desired;s.downloaded=null;actor='argo';message=`Argo CD aplicou a configuração de ${s.applied} no cluster. Ainda falta baixar a imagem e iniciar Pods prontos.`;break;
 case 'pull':actor='k8s';if(faults.pull){s.downloaded=null;message='Pull negado. Investigue identidade e permissões do nó. Os Pods novos não ficam prontos.';}else if(!s.registry.includes(s.applied)){s.downloaded=null;message=`Imagem ${s.applied} não encontrada no registry. O estado aplicado pode estar sincronizado mesmo sem conseguir executar.`;}else{s.downloaded=s.applied;message=`O runtime no nó baixou ${s.downloaded}. Agora teste se os novos Pods ficam prontos.`;}break;
 case 'ready':actor='k8s';if(s.downloaded!==s.applied)message='Ainda não há imagem baixada para a configuração aplicada. Verifique o pull.';else if(faults.health)message='A verificação de prontidão falhou. Neste cenário, os Pods antigos continuam atendendo; investigue logs e configuração.';else{s.running=s.downloaded;message=`Novos Pods prontos: ${s.running} atende os usuários. Verifique o comportamento, não apenas o status.`;}break;
 case 'rollback':s.desired='v1';actor='git';message='O Git voltou a pedir v1. Para efetivar o rollback, sincronize, baixe a imagem e conclua a prontidão.';break;
 case 'observe':actor='observe';message=`Observação: Git pede ${s.desired}; cluster configurado para ${s.applied}; usuários atendidos por ${s.running}. ${s.desired===s.running?'Compare erros e latência para validar a entrega.':'Há uma diferença a investigar entre intenção e execução.'}`;break;
 default:throw Error('Ação desconhecida');
 }
 s.history.push({action,actor,message});return s;
}
