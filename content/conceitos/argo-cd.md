---
{
  "title": "Argo CD",
  "description": "Reconciliar configurações de aplicações com Kubernetes. Entenda sua participação no ciclo de entrega.",
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
      "target": "conceitos/kubernetes",
      "kind": "configura"
    },
    {
      "target": "mapa",
      "kind": "documenta"
    },
    {
      "target": "conceitos/gitops",
      "kind": "implementa"
    }
  ]
}
---

## O problema que resolve

Reconciliar configurações de aplicações com Kubernetes.

## Como funciona

Lê a origem configurada, renderiza manifestos quando necessário e compara com os recursos reais. Sincroniza manual ou automaticamente conforme a política.

## No fluxo de entrega

Não descobre novas tags no ECR por si só. Pessoa ou automação precisa alterar a referência acompanhada.

## Exemplo

Trecho didático; não é um arquivo completo.

```text
spec:
  source:
    path: deploy/nonprod
    targetRevision: main
```

## Como verificar

Confira diff, Sync Status, Health e comportamento real da aplicação.

## Conexões

[[conceitos/gitops]] — abordagem implementada pelo Argo CD.

[[conceitos/kubernetes]] — relação: **configura**. [[mapa]] localiza esta peça no ciclo.

## Referências

- [Documentação oficial](https://argo-cd.readthedocs.io/en/stable/core_concepts/)
