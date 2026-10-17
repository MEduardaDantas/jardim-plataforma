---
{
  "title": "Imagem e container",
  "description": "Distribuir a aplicação com seu ambiente de execução. Entenda sua participação no ciclo de entrega.",
  "type": "conceito",
  "stage": "construir",
  "status": "em-estudo",
  "created": "2026-10-16",
  "updated": "2026-10-16",
  "tags": [
    "construir",
    "conceito"
  ],
  "relations": [
    {
      "target": "conceitos/ecr",
      "kind": "depende-de"
    },
    {
      "target": "mapa",
      "kind": "documenta"
    }
  ]
}
---

## O problema que resolve

Distribuir a aplicação com seu ambiente de execução.

## Como funciona

Imagem é um artefato; container é uma instância em execução baseada nela. O processo usa recursos e kernel do host compatível.

## No fluxo de entrega

A pipeline constrói; o registry guarda; o runtime executa. Atualizar a imagem base exige reconstruir as imagens consumidoras para incorporar a mudança.

## Exemplo

Trecho didático; não é um arquivo completo.

```text
docker build -t portal:v1 .
docker run --rm -p 8080:8000 portal:v1
```

## Como verificar

Acesse a aplicação, leia logs e confirme a versão executada.

## Conexões

[[conceitos/ecr]] — ajuda a compreender a próxima responsabilidade. [[mapa]] localiza esta peça no ciclo.

## Referências

- [Documentação oficial](https://docs.docker.com/get-started/)
