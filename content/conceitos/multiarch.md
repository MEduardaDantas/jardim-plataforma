---
{
  "title": "AMD64 e ARM64",
  "description": "Executar em máquinas com conjuntos de instruções diferentes. Entenda sua participação no ciclo de entrega.",
  "type": "conceito",
  "stage": "construir",
  "status": "em-estudo",
  "created": "2026-10-16",
  "updated": "2026-10-21",
  "tags": [
    "construir",
    "conceito"
  ],
  "relations": [
    {
      "target": "conceitos/imagens",
      "kind": "condiciona-compatibilidade-de"
    },
    {
      "target": "mapa",
      "kind": "documenta"
    }
  ]
}
---

## O problema que resolve

Executar em máquinas com conjuntos de instruções diferentes.

## Como funciona

AMD64 é x86 de 64 bits, usado também por Intel. ARM64 é outra arquitetura. Sistema operacional e arquitetura são dimensões distintas.

Esta é uma conexão para aprofundamento posterior: a imagem selecionada precisa atender à plataforma de destino. Um índice multi-plataforma pode apontar para variantes compatíveis. Não é requisito estudar esse tema antes do básico de imagens.

## No fluxo de entrega

Código pode ser portável, enquanto runtimes e bibliotecas nativas precisam de variantes compatíveis.

## Exemplo

Trecho didático; não é um arquivo completo.

```text
docker buildx build --platform linux/amd64,linux/arm64 .
```

## Como verificar

Além do build, execute testes nas plataformas alvo.

## Conexões

[[conceitos/imagens]] — a arquitetura condiciona a compatibilidade dos binários contidos na imagem. AMD64/ARM64 não dependem de imagens para existir. [[mapa]] localiza esta peça no ciclo.

## Referências

- [Documentação oficial](https://docs.docker.com/build/building/multi-platform/)
