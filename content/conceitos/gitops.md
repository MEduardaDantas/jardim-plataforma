---
{
  "title": "GitOps",
  "description": "Reduzir divergências entre configuração desejada e ambiente. Entenda sua participação no ciclo de entrega.",
  "type": "conceito",
  "stage": "implantar",
  "status": "em-estudo",
  "created": "2026-10-16",
  "updated": "2026-10-19",
  "tags": [
    "implantar",
    "conceito"
  ],
  "relations": [
    {
      "target": "conceitos/git",
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

Reduzir divergências entre configuração desejada e ambiente.

## Como funciona

Estado desejado é declarado, versionado e reconciliado por agentes. Git registra a intenção; o cluster contém o estado real.

## No fluxo de entrega

É uma abordagem, não uma ferramenta. Testes verdes são evidência da CI, não a definição de estado desejado.

## Exemplo

Trecho didático; não é um arquivo completo.

```text
replicas: 2
```

## Como verificar

Compare configuração e recursos reais; confira a política de sincronização.

## Conexões

[[conceitos/git]] — versiona o estado desejado usado neste fluxo GitOps.

[[conceitos/argo-cd]] — ajuda a compreender a próxima responsabilidade. [[mapa]] localiza esta peça no ciclo.

## Referências

- [Documentação oficial](https://opengitops.dev/)
