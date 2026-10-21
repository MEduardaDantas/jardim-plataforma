---
{
  "title": "Containers",
  "description": "Unidades criadas a partir de imagens, com processos isolados e configurações de execução fornecidas pelo ambiente de destino.",
  "type": "conceito",
  "stage": "operar",
  "status": "em-estudo",
  "created": "2026-10-21",
  "updated": "2026-10-21",
  "tags": [
    "operar",
    "conceito",
    "containers"
  ],
  "relations": [
    {
      "target": "mapa",
      "kind": "documenta"
    }
  ]
}
---


## O problema que resolve

Executar a aplicação com isolamento de processos e arquivos, usando um pacote preparado e configurações próprias para aquela execução.

## Como funciona

Container é uma instância de uma imagem: uma unidade concreta criada a partir dela. Pode estar criado, executando ou parado. Dois containers da mesma imagem são unidades separadas e podem receber configurações diferentes.

Quando em execução, seus processos usam CPU e memória da máquina. Containers Linux compartilham o kernel do host Linux que os executa, que também pode ser uma máquina virtual. Não são, por definição, máquinas virtuais completas.

### O que chega na execução

Portas publicadas, limites de recursos, volumes e credenciais podem ser definidos ao criar o container. O programa precisa saber ler as configurações fornecidas.

Uma montagem disponibiliza um arquivo ou armazenamento externo em um caminho interno. Isso permite ler uma secret sem incorporá-la à imagem. O container não passa a consultar a máquina onde a imagem foi construída: o recurso é fornecido no ambiente de execução.

Volumes podem preservar dados além da remoção do container. Arquivos gravados apenas na camada gravável do container são perdidos quando ele é removido.

## No fluxo de entrega

O runtime cria e executa os containers. A publicação de uma imagem não substitui instâncias existentes: a implantação precisa selecionar a nova imagem e criar ou substituir os containers conforme sua estratégia.

Uma imagem construída com Docker não exige Docker Engine em todo destino: plataformas podem usar runtimes compatíveis, como containerd.

## Exemplo

Uma aplicação escuta na porta 8000 dentro do container. Publicar a porta 8080 da máquina para a 8000 do container permite encaminhar acessos. Mudar apenas o mapeamento não muda a porta em que o programa escuta.

Para credenciais, há caminhos distintos: uma configuração local pode montar um arquivo; uma implantação pode disponibilizar uma variável ou um Secret. Nenhum deles acontece automaticamente só porque a senha foi cadastrada no GitHub ou GitLab.

## Como verificar

Distinguir container iniciado de aplicação saudável: o processo pode existir e ainda falhar ao acessar o banco. Identificar imagem usada, configuração recebida e persistência necessária será parte dos laboratórios posteriores.

## Conexões

- [[conceitos/imagens]] — fornecem o conteúdo inicial e os padrões de execução.

[[mapa]] — localização no jardim, sem acrescentar outra ligação entre conceitos.

## Referências

- [O que é um container](https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-a-container/)
- [Execução de containers](https://docs.docker.com/engine/containers/run/)
- [Secrets no Compose](https://docs.docker.com/compose/how-tos/use-secrets/)
