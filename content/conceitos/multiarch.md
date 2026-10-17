---
{
  "title": "AMD64 e ARM64",
  "description": "Executar em máquinas com conjuntos de instruções diferentes. Entenda sua participação no ciclo de entrega.",
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
      "target": "conceitos/imagens",
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

Executar em máquinas com conjuntos de instruções diferentes.

## Como funciona

AMD64 é x86 de 64 bits, usado também por Intel. ARM64 é outra arquitetura. Sistema operacional e arquitetura são dimensões distintas.

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

[[conceitos/imagens]] — ajuda a compreender a próxima responsabilidade. [[mapa]] localiza esta peça no ciclo.

## Referências

- [Documentação oficial](https://docs.docker.com/build/building/multi-platform/)
