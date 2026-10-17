---
{
  "title": "Kubernetes",
  "description": "Manter aplicações distribuídas entre máquinas. Entenda sua participação no ciclo de entrega.",
  "type": "conceito",
  "stage": "operar",
  "status": "em-estudo",
  "created": "2026-10-16",
  "updated": "2026-10-16",
  "tags": [
    "operar",
    "conceito"
  ],
  "relations": [
    {
      "target": "conceitos/observabilidade",
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

Manter aplicações distribuídas entre máquinas.

## Como funciona

Cluster reúne plano de controle e nós. Pods agrupam containers; Deployment gerencia réplicas e atualizações; Service fornece acesso estável a um conjunto de Pods.

## No fluxo de entrega

Argo CD aplica recursos. Controladores reconciliam. O runtime no nó baixa a imagem e inicia containers.

## Exemplo

Trecho didático; não é um arquivo completo.

```text
kubectl get deployments,pods,services
kubectl rollout status deployment/portal
```

## Como verificar

Além de disponibilidade, valide endpoints, logs e comportamento.

## Conexões

[[conceitos/observabilidade]] — ajuda a compreender a próxima responsabilidade. [[mapa]] localiza esta peça no ciclo.

## Referências

- [Documentação oficial](https://kubernetes.io/docs/concepts/)
