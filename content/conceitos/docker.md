---
{
  "title": "Docker",
  "description": "Como Docker ajuda a construir imagens e executar containers, separando o pacote da aplicação das configurações de execução.",
  "type": "conceito",
  "stage": "construir",
  "status": "em-estudo",
  "created": "2026-10-21",
  "updated": "2026-10-21",
  "tags": [
    "construir",
    "conceito",
    "containers"
  ],
  "relations": [
    {
      "target": "conceitos/dockerfile",
      "kind": "utiliza"
    }
  ]
}
---


## O problema que resolve

Uma aplicação precisa de mais do que seu código: pode depender de um interpretador, bibliotecas e configurações. Preparar tudo manualmente em cada máquina facilita diferenças de versões e instalações.

Docker oferece ferramentas para empacotar a aplicação em imagens e executar containers a partir delas. Isso reduz diferenças, mas não garante sozinho que banco, rede e credenciais estejam disponíveis.

## Como funciona

O Dockerfile orienta a construção. A imagem é o pacote resultante. O container é uma unidade criada a partir desse pacote, com suas configurações de execução.

O comando `docker` conversa com o Docker Engine, que gerencia imagens e containers. O Engine pode estar na mesma máquina ou em outra máquina configurada para receber essas solicitações.

### Ambiente não é apenas a imagem

Ambiente de execução é o conjunto necessário para a aplicação funcionar: máquina, recursos, software, configurações, rede, armazenamento e serviços dos quais depende. A imagem contém parte desse conjunto.

Estado real descreve como essas partes estão. Estado desejado descreve como queremos que estejam: qual versão executar, quais configurações usar e quantas instâncias manter, por exemplo.

## No fluxo de entrega

Construir prepara o pacote; publicar o disponibiliza em um registry; implantar configura sua execução. Uma pipeline pode automatizar essas etapas, mas elas continuam tendo responsabilidades diferentes.

Docker Compose é uma opção para descrever serviços e configurações de execução em YAML. Ele solicita operações ao Docker Engine. Não é obrigatório: configurações também podem ser fornecidas por comandos ou por uma plataforma de orquestração.

## Exemplo

A mesma imagem pode executar no computador de uma pessoa e em um servidor, desde que o ambiente seja compatível. Cada destino fornece seus recursos, suas configurações e suas credenciais. A máquina que construiu a imagem não precisa continuar ligada para sustentar essas execuções.

### Reconhecendo a interface: Docker Desktop

![Tela de containers no Docker Desktop, com lista de instâncias e ações](https://docs.docker.com/get-started/docker-concepts/the-basics/images/view-your-containers.webp)

Captura da [documentação oficial do Docker](https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-a-container/). A aparência pode variar por versão. Observe a lista de containers e suas ações: ela representa instâncias, não o código-fonte do projeto.

Docker Desktop oferece uma interface gráfica para trabalhar com Docker. Ela não é o Docker Hub, nem significa que todo servidor de execução precise ter um painel instalado.

## Como verificar

Consigo distinguir o que foi empacotado do que precisa ser fornecido no destino? Consigo identificar quem constrói, quem armazena e quem executa? A validação prática dessas respostas ficará para os laboratórios.

## Conexões

- [[conceitos/dockerfile]] — Docker utiliza as instruções para construir a imagem.

## Referências

- [Visão geral do Docker](https://docs.docker.com/get-started/docker-overview/)
- [Como funciona o Compose](https://docs.docker.com/compose/intro/compose-application-model/)
