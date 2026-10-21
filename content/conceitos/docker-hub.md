---
{
  "title": "Docker Hub",
  "description": "Serviço de registry para publicar e obter imagens, sem confundir armazenamento da imagem com execução da aplicação.",
  "type": "conceito",
  "stage": "publicar",
  "status": "em-estudo",
  "created": "2026-10-21",
  "updated": "2026-10-21",
  "tags": [
    "publicar",
    "conceito",
    "containers"
  ],
  "relations": [
    {
      "target": "conceitos/registry",
      "kind": "implementa"
    }
  ]
}
---


## O problema que resolve

Oferecer um lugar para encontrar, publicar e distribuir imagens entre pessoas e ambientes de execução.

## Como funciona

Docker Hub é um serviço que exerce a função de registry. Nele existem repositórios de imagens, tags e controles de acesso. Docker Engine é a ferramenta de execução; Docker Hub é o serviço de distribuição. São responsabilidades diferentes.

A existência de uma imagem no Hub não significa que uma aplicação esteja rodando lá. O consumidor baixa a imagem e fornece uma infraestrutura compatível para executá-la.

## No fluxo de entrega

Uma pessoa ou pipeline pode publicar uma imagem, e outro ambiente pode baixá-la depois. As permissões de publicação e leitura precisam ser atendidas. A aplicação continua precisando das próprias configurações de execução no destino.

O Hub é uma opção, não uma dependência obrigatória de Docker. Uma organização pode usar outros registries.

## Exemplo

Na referência `python:3.12-slim`, sem outro registry indicado, Docker normalmente consulta o Docker Hub. Essa imagem oferece Python já instalado e arquivos de suporte; pode servir como base para uma nova imagem.

O conteúdo publicado tem um responsável e uma origem que precisam ser avaliados. Usar uma imagem como base não elimina a necessidade de acompanhar suas atualizações.

### Reconhecendo a interface: repositório e tags

![Página de tags de um repositório no Docker Hub](https://docs.docker.com/get-started/docker-concepts/the-basics/images/dockerhub-tags.webp)

Captura da [documentação oficial do Docker](https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-a-registry/). Observe o repositório e a lista de tags. Essa tela mostra imagens publicadas, não containers em execução. A disposição da interface pode variar com atualizações.

## Como verificar

Consigo distinguir Docker Hub de Docker Engine e identificar repositório e tag? Entendo que acesso à imagem não inclui automaticamente acesso ao banco da aplicação? Esta nota registra a introdução ao serviço, ainda sem prática de publicação.

## Conexões

- [[conceitos/registry]] — conceito implementado pelo Docker Hub.

## Referências

- [Documentação do Docker Hub](https://docs.docker.com/docker-hub/)
- [Referências e tags](https://docs.docker.com/reference/cli/docker/image/tag/)
