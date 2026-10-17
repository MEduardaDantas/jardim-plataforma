---
{
  "title": "Helm",
  "description": "Reutilizar modelos de recursos. Entenda sua participação no ciclo de entrega.",
  "type": "conceito",
  "stage": "implantar",
  "status": "em-estudo",
  "created": "2026-10-16",
  "updated": "2026-10-16",
  "tags": [
    "implantar",
    "conceito"
  ],
  "relations": [
    {
      "target": "conceitos/kubernetes",
      "kind": "configura"
    },
    {
      "target": "mapa",
      "kind": "documenta"
    }
  ]
}
---

## O problema que resolve

Reutilizar modelos de recursos.

## Como funciona

Um chart reúne templates e valores; renderizá-los produz manifestos. Helm também gerencia releases; no uso comum com Argo CD, este controla o ciclo de implantação.

## No fluxo de entrega

A pipeline pode alterar image.tag nos valores se esse for o contrato do chart. O nome do campo depende do chart.

## Exemplo

Trecho didático; não é um arquivo completo.

```text
replicas: {{ .Values.replicaCount }}
# Com replicaCount: 3, produz replicas: 3.
```

## Como verificar

Execute helm template e inspecione o manifesto final.

## Conexões

[[conceitos/kubernetes]] — relação: **configura**. [[mapa]] localiza esta peça no ciclo.

## Referências

- [Documentação oficial](https://argo-cd.readthedocs.io/en/stable/user-guide/helm/)
