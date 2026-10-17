---
{
  "title": "Observabilidade",
  "description": "Investigar comportamento e orientar melhorias. Entenda sua participação no ciclo de entrega.",
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
      "target": "conceitos/kubernetes",
      "kind": "observa"
    },
    {
      "target": "mapa",
      "kind": "documenta"
    }
  ]
}
---

## O problema que resolve

Investigar comportamento e orientar melhorias.

## Como funciona

Métricas resumem medidas, logs registram eventos e traces mostram trajetórias de requisições. Precisam de contexto e perguntas úteis.

## No fluxo de entrega

Sinais orientam a investigação, que gera mudança e novas verificações.

## Exemplo

Trecho didático; não é um arquivo completo.

```text
Pergunta: a latência aumentou após qual versão?
```

## Como verificar

Cruze erros, latência e mudanças; um gráfico isolado não demonstra causa.

## Conexões

[[conceitos/kubernetes]] — relação: **observa**. [[mapa]] localiza esta peça no ciclo.

## Referências

- [Documentação oficial](https://opentelemetry.io/docs/concepts/observability-primer/)
